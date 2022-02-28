import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/chat',
    pathMatch: 'full'
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {
      page: 'chat'
    }
  },
  { path: '**', redirectTo: '/chat' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
