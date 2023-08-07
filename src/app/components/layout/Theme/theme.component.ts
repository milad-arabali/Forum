import {Component} from '@angular/core';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {
  showSidebar:boolean= true;
  changeSidebar(status: boolean) {
    this.showSidebar=status;
  }

}
