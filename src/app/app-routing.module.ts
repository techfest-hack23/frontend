import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
    { path: 'messages', loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule) },
    { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then((m) => m.CalendarModule) },
    { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) },
    { path: 'providers', loadChildren: () => import('./providers/providers.module').then((m) => m.ProvidersModule) },
    { path: 'clients', loadChildren: () => import('./clients/clients.module').then((m) => m.ClientsModule) },
    { path: 'settomgs', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule) },
  ]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
