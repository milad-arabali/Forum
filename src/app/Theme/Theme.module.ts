import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeComponent } from './theme.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";


@NgModule(
  {
    declarations:[
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ThemeComponent
  ],
    imports: [
      CommonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatButtonModule,
      MatToolbarModule,
      RouterLink,
      MatMenuModule
    ],
    exports: [
      ThemeComponent
    ]
  }
)
export class ThemeModule{

}
