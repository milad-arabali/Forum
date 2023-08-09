import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
constructor( translate: TranslateService) {
  translate.addLangs(['fa', 'klingon']);
  translate.setDefaultLang('fa');
  translate.use('fa');
}
}
