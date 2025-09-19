import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toasts-component',
  imports: [],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.css'
})
export class ToastsComponent implements OnInit {

  toastService : ToastService = inject ( ToastService )

  messageList : string[] = this.toastService.getList().reverse()

  showTime : number = 5000

  @Input() display : string = ""

  ngOnInit(): void {
    setTimeout(() => this.display = 'none', this.showTime)
  }

  
}
