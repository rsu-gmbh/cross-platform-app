import { Injectable } from "@angular/core";
import { PersistanceServiceInterface } from "../persistance-service.interface";
import { Crypta } from "src/crypt/interface/crypta.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { JsonstoreSettingsService } from "./jsonstore-settings.service";

@Injectable({
  providedIn: "root"
})
export class JsonstorePersistanceService
  implements PersistanceServiceInterface {
  constructor(
    private http: HttpClient,
    private settingsService: JsonstoreSettingsService
  ) {}

  save(crypta: Crypta): Observable<boolean> {
    if (this.hasValidSetting()) {
      return this.http.put<boolean>(
        this.settingsService.getActiveSetting().apiUrl,
        crypta,
        { headers: this.settingsService.getHeaders() }
      );
    }

    throw new Error("Setting not valid!");
  }
  delete(cryptaId: number): Observable<boolean> {
    throw new Error("Method not implemented.");
  }
  update(crypta: Crypta): Observable<boolean> {
    if (this.hasValidSetting()) {
      return this.http.put<boolean>(
        this.settingsService.getActiveSetting().apiUrl,
        crypta,
        { headers: this.settingsService.getHeaders() }
      );
    }

    throw new Error("Setting not valid!");
  }
  get(cryptaId: number): Observable<Crypta> {
    if (this.hasValidSetting()) {
      return this.http.get<Crypta>(
        this.settingsService.getActiveSetting().apiUrl,
        { headers: this.settingsService.getHeaders() }
      );
    }
    throw new Error("Setting not valid!");
  }
  getAll(): Observable<Crypta[]> {
    if (this.hasValidSetting()) {
      return this.http.get<Crypta[]>(
        this.settingsService.getActiveSetting().apiUrl,
        { headers: this.settingsService.getHeaders() }
      );
    }
    throw new Error("Setting not valid!");
  }

  private hasValidSetting(): boolean {
    const setting = this.settingsService.getActiveSetting();
    return setting && setting.apiUrl != "" && setting.apiKey != "";
  }
}
