import { Injectable, ElementRef, ViewContainerRef, Renderer2, ComponentRef, signal} from '@angular/core';
import { ToastsComponent } from '../components/toasts-component/toasts-component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private   messageList : string[] = []
  public  messages$ = signal<String []>(this.messageList)
  
  public addMesssage ( message : string ) : void {
    this.messageList.unshift ( message )
    this.messages$.set ( this.messageList.filter( (message,index) => index < 1 ) )
  }

}
