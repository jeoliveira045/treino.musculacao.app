import {Component, HostBinding, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: '[app-menuitem]',
  template: `
    <ng-container>
      <div *ngIf="root && item.visible !== false" class="layout-menuitem-root-text">{{item.label}}</div>
      <a *ngIf="(!item.routerLink || item.items) && item.visible !== false" [attr.href]="item.url" (click)="itemClick($event)"
            [ngClass]="item.class" [attr.target]="item.target" tabindex="0" pRipple>
            <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-item">{{item.label}}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
      </a>
      <a *ngIf="(item.routerLink && !item.items) && item.visible !== false" (click)="itemClick($event)" [ngClass]="item.class"
         [routerLink]="item.routerLink" routerLinkActive="active-route" [routerLinkActiveOptions]="item.routterLinkActiveOptions||{paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored'}"
         [attr.target]="item.target" tabindex="0" pRipple>
            <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{item.label}}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
      </a>
      <ul *ngIf="item.items && item.visible !== false" [@children]="submenuAnimation">
        <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
          <li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
        </ng-template>
      </ul>
    </ng-container>
  `,
})
export class AppMenuItemComponent implements  OnInit, OnDestroy{

  @Input() item: any

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean

  @Input() parentKey!: string;

  active = false

  menuSourceSubscription: Subscription

  menuResetSubscription: Subscription

  key: string = ""

  constructor(public layoutService: LayoutService){

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  itemClick(event: Event){
    if(this.item.disabled){
      event.preventDefault()
      return
    }

    if(this.item.command){
      this.item.command({originalEvent: event, item: this.item})
    }
    if(this.item.items){
      this.active = !this.active;
    }
    // this.menuService.onMenuStateChange({key: this.key})
  }
}
