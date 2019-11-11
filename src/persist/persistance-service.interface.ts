import { Crypta } from "src/crypt/interface/crypta.interface";
import { Observable } from "rxjs";

export interface PersistanceServiceInterface {
  save(crypta: Crypta): Observable<boolean>;
  delete(cryptaId: number): Observable<boolean>;
  update(crypta: Crypta): Observable<boolean>;
  get(cryptaId: number): Observable<Crypta | null>;
  getAll(): Observable<Crypta[] | null>;
}
