import { Crypta } from "src/crypt/interface/crypta.interface";
import { Observable, ReplaySubject } from "rxjs";
import { PersistanceServiceInterface } from "./persistance-service.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PersistanceService implements PersistanceServiceInterface {
  private sub = new ReplaySubject<boolean>(1);
  private nullSub = new ReplaySubject<null>(1);

  constructor() {
    this.sub.next(false);
    this.nullSub.next(null);
  }

  save(crypta: Crypta): Observable<boolean> {
    return this.sub.asObservable();
  }
  delete(cryptaId: number): Observable<boolean> {
    return this.sub.asObservable();
  }
  update(crypta: Crypta): Observable<boolean> {
    return this.sub.asObservable();
  }
  get(cryptaId: number): Observable<Crypta | null> {
    return this.nullSub.asObservable();
  }
  getAll(): Observable<Crypta[] | null> {
    return this.nullSub.asObservable();
  }
}
