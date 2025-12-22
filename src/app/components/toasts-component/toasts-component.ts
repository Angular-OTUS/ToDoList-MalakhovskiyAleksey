import { Component, inject, Input } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toasts-component',
  imports: [AsyncPipe],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.css'
})
export class ToastsComponent {

  toastService = inject ( ToastService )

  messageList$ = toObservable ( this.toastService.messages$ )

  @Input() display = ""

  
}
