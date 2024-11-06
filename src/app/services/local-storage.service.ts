import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private readonly encryptService: CryptoService) { }

  public get(key: string, encrypt: boolean = true) {
    if(encrypt) {
      return this.encryptService.decrypt(localStorage.getItem(key))
    } else {
      return localStorage.getItem(key);
    }
  }

  public save(key: string, item: string, encrypt: boolean = true) {
    if(encrypt) {
      localStorage.setItem(key, this.encryptService.encrypt(item));
    } else {
      localStorage.setItem(key, item);
    }
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
