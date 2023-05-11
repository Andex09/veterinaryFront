import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPetComponent } from './components/add-edit-pet/add-edit-pet.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { ShowPetComponent } from './components/show-pet/show-pet.component';

const routes: Routes = [
  { path: '', redirectTo: 'petList', pathMatch: 'full' },
  { path: 'petList', component: PetListComponent },
  { path: 'addPet', component: AddEditPetComponent },
  { path: 'showPet/:id', component: ShowPetComponent },
  { path: 'editPet/:id', component: AddEditPetComponent },
  { path: '**', redirectTo: 'petList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
