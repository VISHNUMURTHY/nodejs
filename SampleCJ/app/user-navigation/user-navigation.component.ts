import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NAVIGATION_LINKS } from '../constants/app.constants';
import { HandSetService } from '../shared/services/hand-set.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss']
})
export class UserNavigationComponent implements OnInit {
  isHandset$: Observable<boolean>;
  navigationLinks: any[] = [];
  headerTitle: string = '';

  constructor(private handSet: HandSetService, private router: Router) { 
    this.isHandset$ = this.handSet.isHandset$;
  }

  ngOnInit() {
    this.isHandset$.subscribe((handSet: boolean) => {
      if (handSet)
        this.navigationLinks = NAVIGATION_LINKS;
      else
        this.navigationLinks = NAVIGATION_LINKS.filter(e => e.title !='Preferences');
    });
  }

  getHeaderTitle(): string {
    let url = this.router.url.split("/")[2];
    NAVIGATION_LINKS.forEach(el => {
      if (el.link === url) {
        this.headerTitle = el.title;
      }
    });
    return this.headerTitle;
  }

}
