import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {PrimeNGConfig} from "primeng/api";
import {AppLayoutComponent} from "./core/components/app-layout/app-layout.component";
import {environment} from "../environments/environment.development";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, AppLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {
    this.primengConfig.ripple=true
  }
}
