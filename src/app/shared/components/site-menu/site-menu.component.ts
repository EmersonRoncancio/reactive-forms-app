import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { reactiveRoutes } from '../../../reactive/reactive.routes';

interface MenuItem {
  path: string;
  title: string;
}

const reactiveMenuItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-site-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteMenuComponent {

  menuItems: MenuItem[] = reactiveMenuItems
  .filter(item => item.path !== '**')
  .map(item => {
    return {
      path: `reactive/${item.path}`,
      title: item.path ?? ''
    }
  })

 }
