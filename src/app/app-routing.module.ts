import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Redirect empty route to index
  { path: '', pathMatch: 'full', redirectTo: '/index' },
  { path: 'index', component: IndexComponent, data: {
      customBreadcrumb: '首頁',
    }
  },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule), data: {
      customBreadcrumb: '關於網站',
    }
  },
  { path: 'welcome2', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule), data: {
      customBreadcrumb: '關於網站2',
    }
  },
  { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule), data: {
      customBreadcrumb: '遊戲',
    }
  },
  { path: 'funny', loadChildren: () => import('./pages/funny/funny.module').then(m => m.FunnyModule), data: {
      customBreadcrumb: '純娛樂',
    }
  },
  // Redirect others to index
  { path: '**', pathMatch: 'full', redirectTo: '/index' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
