import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ThemeComponent } from './theme.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {TranslateModule} from "@ngx-translate/core";
import {FooterModule} from "./footer/footer.module";
import {HeaderModule} from "./header/header.module";
import {MainModule} from "./main/main.module";







@NgModule(
  {
    declarations:[
    ThemeComponent,
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
      FooterModule,
      HeaderModule,
      MainModule

    ],
      exports: [
          ThemeComponent,

      ]
  }
)
export class ThemeModule{

}
