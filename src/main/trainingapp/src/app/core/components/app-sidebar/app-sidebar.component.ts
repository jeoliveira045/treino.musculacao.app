import {Component, ElementRef} from "@angular/core";
import {LayoutService} from "../../../services/layout.service";
import {AppMenuComponent} from "../app-menu/app-menu.component";
import {CommonModule} from "@angular/common";

@Component({
  selector:'app-sidebar',
  templateUrl: 'app-sidebar.component.html',
  standalone: true,
  imports: [
    AppMenuComponent

  ]
})
export class AppSidebarComponent{

  constructor(public layoutService: LayoutService, public el: ElementRef) {

  }

}

