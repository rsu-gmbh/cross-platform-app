import { Injectable } from "@angular/core";
import { JsonstoreSetting } from "./jsonstore-setting";
import { HttpHeaders } from "@angular/common/http";
import { AppStoreService } from "src/common/app-store.service";

@Injectable({
  providedIn: "root"
})
export class JsonstoreSettingsService {
  appStoreKey = "jsonStore";

  settings: {
    [key: string]: JsonstoreSetting;
  } = {};

  activeSetting: JsonstoreSetting;

  constructor(private appStore: AppStoreService) {}

  addSetting(setting: JsonstoreSetting) {
    this.settings[setting.id] = setting;
    this.save();
  }

  activateSetting(id: string) {
    if (this.settings[id]) {
      this.activeSetting = this.settings[id];
    }
    this.save();
  }

  getActiveSetting(): JsonstoreSetting {
    this.load();
    return this.activeSetting;
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.getActiveSetting().apiKey
    });

    return headers;
  }

  private save() {
    const settings = JSON.stringify(this.toJson());
    this.appStore.set(this.appStoreKey, settings);
  }

  private load() {
    const jsonSettings = this.appStore.get(this.appStoreKey);
    this.loadFromJson(jsonSettings);
  }

  private toJson() {
    return {
      settings: this.settings,
      activeSetting: this.activeSetting
    };
  }

  private loadFromJson(settingsString) {
    const jsonSettings = JSON.parse(settingsString);
    if (jsonSettings && jsonSettings.settings) {
      this.settings = jsonSettings.settings;
      this.activeSetting = jsonSettings.activeSetting;
    }
  }
}
