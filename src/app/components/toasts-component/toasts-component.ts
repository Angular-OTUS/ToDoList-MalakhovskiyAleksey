import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toasts-component',
  imports: [],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.css'
})
export class ToastsComponent {

  toastService = inject ( ToastService )

  messageList  = this.toastService.getList().reverse()

  @Input() display = ""

  
}
