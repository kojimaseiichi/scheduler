import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scheduler';
  activeNav = '';

  constructor(router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const frag = event.url.split('/');
        if (frag.length > 0) {
          this.activeNav = frag[1];
        } else {
          this.activeNav = '';
        }
      });
  }

}
