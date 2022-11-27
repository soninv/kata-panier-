import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { ProduitsComponent } from './produits/produits.component';

const routes: Routes = [
  {
    path: 'produits',
    component: ProduitsComponent,
  },
  {
    path: 'panier',
    component: PanierComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/produits'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
