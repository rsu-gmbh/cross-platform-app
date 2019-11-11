import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BottomBarService {

  private contentSource = new BehaviorSubject<TemplateRef<any>>(null);
  content = this.contentSource.asObservable();

  private _content: TemplateRef<any> = null;

  constructor() { }

  getContent(): TemplateRef<any> {
    return this._content;
  }

  setContent(content: TemplateRef<any>) {
    this._content = content;
    this.contentSource.next(this._content);
  }
}
