import {Component} from '@angular/core';
import * as moment from 'jalali-moment';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  todayJalali: any = moment().locale('fa').format('YYYY/M/D');
   a:Date = new Date();
constructor(translate: TranslateService) {
  translate.addLangs(['fa', 'klingon']);
  translate.setDefaultLang('fa');
  translate.use('fa');
}


}
