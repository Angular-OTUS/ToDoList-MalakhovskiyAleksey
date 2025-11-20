import { Component, inject, OnInit, signal } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { TabsModule } from 'primeng/tabs'
import { CommonModule } from '@angular/common'
import { MegaMenuItem } from 'primeng/api'
import { MegaMenu } from 'primeng/megamenu'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TabsModule,CommonModule,MegaMenu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  protected readonly title = signal('otus-tut')
 
  router = inject(Router)
  items: MegaMenuItem[] | undefined;

  ngOnInit() {

    this.items = [
            {
                label: 'Backlog',
                command: () => {
                    this.router.navigate(["tasks"]);
                }
            },
            {
                label: 'Board',
                command: () => {
                    this.router.navigate(["board"]);
                }
            },
            
        ];

  }

}
