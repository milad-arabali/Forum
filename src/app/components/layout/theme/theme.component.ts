import {Component} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {
  showSidebar:boolean= true;
  constructor(public router:Router) {
  }
  changeSidebar(status: boolean) {
    this.showSidebar=status;
  }

}
