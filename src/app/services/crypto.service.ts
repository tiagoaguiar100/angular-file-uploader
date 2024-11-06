import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  key = Math.random() * 1000;

  constructor() { }

  encrypt(dataToEncrypt: string): string {
    return CryptoJS.AES.encrypt(dataToEncrypt, this.key.toString()).toString();
  }

  decrypt(dataToDecrypt: string | null) {
    if(!dataToDecrypt) {
      return null;
    }
    return CryptoJS.AES.decrypt(dataToDecrypt, this.key.toString()).toString(CryptoJS.enc.Utf8);
  }
}
