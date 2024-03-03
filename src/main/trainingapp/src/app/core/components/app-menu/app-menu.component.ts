import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit} from "@angular/core";
import {LayoutService} from "../../../services/layout.service";
import {AppMenuItemComponent} from "../app-menuitem/app-menuitem.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.component.html',
  standalone: true,
  imports: [
    AppMenuItemComponent,
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppMenuComponent implements OnInit {
  constructor(public layoutService: LayoutService){

  }

  model: any[] = []

  ngOnInit(){
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Cliente', icon: 'pi pi-fw pi-user', routerLink: ['cliente/list'] },
          { label: 'Exercicios', icon: 'pi pi-fw pi-play', routerLink: ['exercicio/list'] },
        ]
      }
      ]
  }
}
