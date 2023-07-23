import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeComponent } from './theme.component';


@NgModule(
  {
    declarations:[
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ThemeComponent
  ],
    imports:[
      CommonModule
    ],
    exports: [
      ThemeComponent
    ]
  }
)
export class ThemeModule{

}
