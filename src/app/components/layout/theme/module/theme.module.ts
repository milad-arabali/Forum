import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { FooterComponent } from '../footer/footer.component';
import { ThemeComponent } from '../theme.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {TimePipe} from "../../../../../share/pipe/time.pipe";
import {TranslateModule} from "@ngx-translate/core";





@NgModule(
  {
    declarations:[
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ThemeComponent,
      TimePipe
  ],
    imports: [
      CommonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatButtonModule,
      MatToolbarModule,
      RouterLink,
      MatMenuModule,
      RouterOutlet,
      TranslateModule,


    ],
      exports: [
          ThemeComponent,
          TimePipe
      ]
  }
)
export class ThemeModule{

}
