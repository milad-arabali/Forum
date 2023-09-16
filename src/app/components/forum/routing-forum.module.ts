import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guard/auth.guard";
import {ForumComponent} from "./forum.component";


const routingForum: Routes = [

  {path: 'forum', canActivate: [AuthGuard], component: ForumComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routingForum)
  ]
})
export class RoutingForumModule { }
