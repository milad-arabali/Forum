import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-reset-pass-word',
  templateUrl: './reset-pass-word.component.html',
  styleUrls: ['./reset-pass-word.component.css']
})
export class ResetPassWordComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }
}
