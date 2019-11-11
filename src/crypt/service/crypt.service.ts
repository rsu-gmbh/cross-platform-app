import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Crypta, CryptaContainer, CryptItem } from '../interface/crypta.interface';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  encrypt(message: string, password: string) {
    return CryptoJS.AES.encrypt(message, password).toString();
  }

  decrypt(secret: string, password: string) {
    const bytes = CryptoJS.AES.decrypt(secret, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  }


}
