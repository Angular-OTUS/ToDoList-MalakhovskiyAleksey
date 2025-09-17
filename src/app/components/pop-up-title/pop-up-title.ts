import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up-title',
  imports: [],
  templateUrl: './pop-up-title.html',
  styleUrl: './pop-up-title.css'
})
export class PopUpTitle {

  @Input("text") text : string = "initial"
  @Input() x : number = 0
  @Input() top : number = 0

}
