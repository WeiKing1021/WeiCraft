import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from '@root/pages/welcome/welcome.component';
import {GameComponent} from '@root/pages/game/game.component';
import {FunnyComponent} from '@root/pages/funny/funny.component';

const routes: Routes = [
  // Redirect empty route to index
  { path: '', pathMatch: 'full', redirectTo: '/index' },
  { path: 'index', component: IndexComponent, data: {
      customBreadcrumb: '首頁',
    }
  },
  /*{ path: 'welcome', component: WelcomeComponent, data: {
      customBreadcrumb: '關於網站',
    }
  },
  { path: 'welcome2', component: WelcomeComponent, data: {
      customBreadcrumb: '關於網站2',
    }
  },
  { path: 'game', component: GameComponent, data: {
      customBreadcrumb: '遊戲',
    }
  },
  { path: 'funny', component: FunnyComponent, data: {
      customBreadcrumb: '純娛樂',
    }
  },*/
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
  { path: 'chat-lobby', loadChildren: () => import('./pages/chat-lobby/chat-lobby.module').then(m => m.ChatLobbyModule), data: {
      customBreadcrumb: '聊天大廳',
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

