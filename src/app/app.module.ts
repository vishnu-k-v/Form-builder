import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { RouterModule, Routes, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { FormdesignComponent } from './formdesign/formdesign.component';
import { FormdataService } from './services/formdata.service';


const appRoutes: Routes = [
  { path: '', component: FormbuilderComponent },
   { path: 'form', component: FormdesignComponent },
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes) ,
  DndModule],
  declarations: [ AppComponent, HelloComponent, FormbuilderComponent, FormdesignComponent, ],
  bootstrap:    [ AppComponent ],
  providers: [FormdataService]
})
export class AppModule { }
