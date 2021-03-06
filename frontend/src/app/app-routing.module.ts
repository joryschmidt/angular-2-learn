import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import {  
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule
} from '@angular/material';

const MatModules = [
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule
];

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ListComponent ,
    CreateComponent,
    EditComponent
  ],
  imports: [RouterModule.forRoot(routes), ...MatModules, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
