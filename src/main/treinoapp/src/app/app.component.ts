import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig, TreeNode} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {
    this.primengConfig.ripple=true
  }


}
