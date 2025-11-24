import { Injectable, ElementRef, ViewContainerRef, Renderer2, ComponentRef} from '@angular/core';
import { ToastsComponent } from '../components/toasts-component/toasts-component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  messageList : string[] = []

  public  getList() : string[] {
    return this.messageList
  }

  public addMesssage ( message : string ) : void {
    this.messageList.unshift ( message )
  }

}
