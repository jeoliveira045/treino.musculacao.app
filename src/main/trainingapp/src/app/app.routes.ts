import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ClienteListComponent} from "./pages/cliente/cliente-list/cliente-list.component";
import {ClienteFormComponent} from "./pages/cliente/cliente-form/cliente-form.component";
import {ExercicioListComponent} from "./pages/exercicio/exercicio-list/exercicio-list.component";
import {ExercicioFormComponent} from "./pages/exercicio/exercicio-form/exercicio-form.component";
import {TreinoListComponent} from "./pages/treino/treino-list/treino-list.component";
import {TreinoFormComponent} from "./pages/treino/treino-form/treino-form.component";

export const routes: Routes = [
  {
    path: 'cliente',
    children:[
      {
        path: 'list',
        component: ClienteListComponent
      },
      {
        path: 'form',
        component: ClienteFormComponent,
        children:[
          {
            path:"detail/:id",
            component: ClienteFormComponent
          },
          {
            path:"new",
            component:ClienteFormComponent
          }
        ]
      }
    ]
  },
  {
    path: 'exercicio',
    children:  [
      {
        path: 'list',
        component: ExercicioListComponent
      },
      {
        path: 'form',
        component: ExercicioFormComponent,
        children:[
          {
            path:"detail/:id",
            component: ExercicioFormComponent
          },
          {
            path:"new",
            component:ExercicioFormComponent
          }
        ]
      }
    ]
  },
  {
    path:'treino',
    children:[
      {
        path: 'list',
        component: TreinoListComponent
      },
      {
        path: 'form',
        component: TreinoFormComponent,
        children:[
          {
            path:"detail/:id",
            component: TreinoFormComponent
          },
          {
            path:"new",
            component:TreinoFormComponent
          }
        ]
      }
    ]
  },
  {
    path:'', redirectTo: "cliente/list", pathMatch: "full"
  }
];
