import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveCheckboxComponent } from './reactive-checkbox/reactive-checkbox.component';
import { TemplateCheckboxComponent } from './template-checkbox/template-checkbox.component';

const routes: Routes = [
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path:'home', component:HomeComponent},
      {path:'reactive-checkbox', component:ReactiveCheckboxComponent},
      {path:'template-checkbox', component: TemplateCheckboxComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
