import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteMenuComponent } from "./shared/components/site-menu/site-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-forms-app';
}
