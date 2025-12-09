import { Component, inject, Input } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toasts-component',
  imports: [AsyncPipe],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.css'
})
export class ToastsComponent {

  toastService = inject ( ToastService )

  messageList$ = this.toastService.messages$.asObservable()

  @Input() display = ""

  
}
