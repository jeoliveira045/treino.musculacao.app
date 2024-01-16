import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cliente', loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule)},
  { path: 'exercicio', loadChildren: () => import('./modules/exercicio/exercicio.module').then(m => m.ExercicioModule)},
  { path: 'treino', loadChildren: () => import('./modules/treino/treino.module').then(m => m.TreinoModule) },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
