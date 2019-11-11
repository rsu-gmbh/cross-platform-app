import { Injectable } from "@angular/core";
import { NotificationService } from "./notification/notification.service";

@Injectable({
  providedIn: "root"
})
export class AppStoreService {
  constructor(private notificationService: NotificationService) {
    if (!this.isAvailable()) {
      throw new Error("Localstorage is not available");
    }
  }

  isAvailable() {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (ex) {
      return false;
    }
  }

  set(key: string, value: string) {
    this.notificationService.notify("SET " + key);
    return localStorage.setItem(key, value);
  }

  get(key: string) {
    this.notificationService.notify("GET " + key);
    return localStorage.getItem(key);
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }
}
