import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../../../services/layout.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  imports: [
    RouterLink
  ],
  standalone: true
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
}
