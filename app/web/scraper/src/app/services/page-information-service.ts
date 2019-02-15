import { Output, EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PageInformationService {
    private data: string;
    private info = new BehaviorSubject<string>('');

    constructor() {
      this.data = '';
    }

    setMockInformation(s: string) {
      this.data += s;
      this.info.next(this.data);
    }
    getPageInformation() {
      return this.data;
    }

    getInfo() {
      return this.info.asObservable();
    }
 }
