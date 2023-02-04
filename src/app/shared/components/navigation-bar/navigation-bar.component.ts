import { Component } from '@angular/core';
import { NavigationBar } from './interfaces/navigation-bar.interface';
import { faCalendarDays, faItalic } from '@fortawesome/free-solid-svg-icons';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from '../../modules/tooltip/tooltip.module';

@Component({
  standalone: true,
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  imports: [NgForOf, RouterLink, FontAwesomeModule, TooltipModule],
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  navigationBar: NavigationBar[] = [
    {
      icon: faCalendarDays,
      label: 'Calendar',
      routerLink: '/app/calendar',
    },
    {
      icon: faItalic,
      label: 'Inputs',
      routerLink: '/app/inputs',
    },
  ];
}
