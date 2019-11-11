import { Injectable } from "@angular/core";
import { CryptService } from "./crypt.service";
import {
  CryptaContainer,
  CryptItem,
  Crypta,
  CryptContainerMap
} from "../interface/crypta.interface";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs";
import { PersistanceService } from "src/persist/persistance.service";
import { AppStoreService } from "src/common/app-store.service";

@Injectable({
  providedIn: "root"
})
export class CryptaService {
  private containerSource = new BehaviorSubject<CryptaContainer[]>(null);
  containers = this.containerSource.asObservable();

  private selectedContainer: number;
  private itemSource = new BehaviorSubject<CryptItem[]>(null);

  private appStoreKey = "crypta";
  _crypta: Crypta;

  constructor(
    private cryptService: CryptService,
    private persistanceService: PersistanceService,
    private appStore: AppStoreService
  ) {
    this._crypta = {
      nextContainerId: 1,
      containers: [],
      containerMap: {}
    };
    this.load();
  }

  load() {
    try {
      console.log("LOAD");
      this.persistanceService.get(1).subscribe(
        crypta => {
          if (crypta) {
            this._crypta = crypta;
            this.appStore.set(this.appStoreKey, JSON.stringify(crypta));
            this.containerSource.next(this.getContainers());
          }
        },
        error => {
          // load crypta from app store
          console.log("ERROR ", error);
          const cryptaString = this.appStore.get(this.appStoreKey);
          if (cryptaString) {
            this._crypta = JSON.parse(cryptaString);
          }
          this.containerSource.next(this.getContainers());
        }
      );
    } catch (err) {
      console.log("API NOT WORKING");
      console.log(err);
    }
  }

  addCryptaContainer(
    password: string,
    title: string,
    description: string
  ): CryptaContainer {
    const containerId = this._crypta.nextContainerId++;

    const container: CryptaContainer = {
      id: containerId,
      title: title,
      description: description,
      hash: this.cryptService.encrypt(title, password),
      nextItemId: 1,
      items: [],
      itemMap: {},
      locked: true
    };

    let newContainerMap = { ...this._crypta.containerMap };
    newContainerMap[containerId] = container;

    this._crypta = {
      ...this._crypta,
      containers: [...this._crypta.containers, container.id],
      containerMap: newContainerMap
    };

    this.save();
    this.containerSource.next(this.getContainers());

    return container;
  }

  addCryptItem(containerId: number, title: string, secret: string) {
    const container = this.getContainer(containerId);
    if (container.locked) {
      return null;
    }

    const itemId = container.nextItemId++;
    const item = {
      id: itemId,
      title: title,
      secret: this.cryptService.encrypt(secret, container.pw),
      locked: true
    };

    const newItemMap = { ...container.itemMap };
    newItemMap[item.id] = item;

    const newContainer = {
      ...container,
      items: [...container.items, item.id],
      itemMap: newItemMap
    };

    let newContainerMap = { ...this._crypta.containerMap };
    newContainerMap[newContainer.id] = newContainer;

    this._crypta = {
      ...this._crypta,
      containerMap: newContainerMap
    };

    this.save();
    this.containerSource.next(this.getContainers());

    return item;
  }

  getContainer(id: number): CryptaContainer {
    return this._crypta.containerMap[id];
  }

  getContainers(): CryptaContainer[] {
    if (this._crypta.containers.length > 0) {
      return this._crypta.containers.map(
        containerId => this._crypta.containerMap[containerId]
      );
    } else {
      return [];
    }
  }

  getItemsAsObservable(containerId: number): Observable<CryptItem[]> {
    this.selectedContainer = containerId;
    this.itemSource.next(this.getItems(this.selectedContainer));
    return this.itemSource.asObservable();
  }

  getItems(containerId: number): CryptItem[] {
    const container = this.getContainer(containerId);
    return container.items.map(itemId => container.itemMap[itemId]);
  }

  getItem(containerId: number, itemId: number) {
    const container = this.getContainer(containerId);
    return container.itemMap[itemId];
  }

  validate(container: CryptaContainer, password: string) {
    const title = this.cryptService.decrypt(container.hash, password);

    return title == container.title;
  }

  unlockContainer(id: number, password: string): boolean {
    const container = this.getContainer(id);
    if (!container.locked) {
      return false;
    }

    if (this.validate(container, password)) {
      container.pw = password;
      container.locked = false;
      return true;
    }
    return false;
  }

  lockAll() {
    this.getContainers().forEach(container => {
      this.lockContainer(container.id);
    });
  }

  lockContainer(id: number): boolean {
    let container = this.getContainer(id);
    if (!container.locked) {
      this.getItems(container.id).forEach(item => {
        this.lockItem(container.id, item.id);
      });
      delete container.pw;
      container.locked = true;
      return true;
    }
    return false;
  }

  unlockItem(containerId: number, itemId: number): boolean {
    const container = this.getContainer(containerId);
    let item = this.getItem(containerId, itemId);

    if (item.locked) {
      item.secret = this.cryptService.decrypt(item.secret, container.pw);
      item.locked = false;
      this.itemSource.next(this.getItems(this.selectedContainer));
      return true;
    }
    return false;
  }

  lockItem(containerId: number, itemId: number): boolean {
    const container = this.getContainer(containerId);
    const item = this.getItem(containerId, itemId);
    container.itemMap[itemId] = this.lockCryptItem(item, container.pw);

    this.itemSource.next(this.getItems(containerId));
    return false;
  }

  getLockedCrypta(): Crypta {
    // reassign and lock containers
    const crypta = { ...this._crypta, containerMap: {} };
    this._crypta.containers.forEach(containerId => {
      const container = this._crypta.containerMap[containerId];
      crypta.containerMap[containerId] = this.lockCryptContainer(container);
    });
    return crypta;
  }

  lockCryptContainer(container: CryptaContainer): CryptaContainer {
    if (!container.locked) {
      // reassign and lock items
      const newContainer = {
        ...container,
        itemMap: {}
      };
      container.items.forEach(itemId => {
        const item = container.itemMap[itemId];
        newContainer.itemMap[itemId] = this.lockCryptItem(item, container.pw);
      });
      delete newContainer.pw;
      newContainer.locked = true;
      return newContainer;
    }
    return container;
  }

  lockCryptItem(item: CryptItem, pw: string): CryptItem {
    if (!item.locked) {
      const newItem = { ...item };
      newItem.secret = this.cryptService.encrypt(item.secret, pw);
      newItem.locked = true;
      return newItem;
    }
    return item;
  }

  save() {
    const crypta = this.getLockedCrypta();
    this.appStore.set(this.appStoreKey, JSON.stringify(crypta));
    this.persistanceService.save(crypta).subscribe(
      result => console.log("saved", result),
      error => {
        // could not save over network
      }
    );
  }
}
