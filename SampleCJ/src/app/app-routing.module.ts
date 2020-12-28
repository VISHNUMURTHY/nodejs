import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { NewWorkflowComponent } from './new-workflow/new-workflow.component';
import { FirmsListComponent } from './firms-list/firms-list.component';
import { NewFirmComponent } from './new-firm/new-firm.component';

const routes: Routes = [
  {
    path: 'user', component: UserNavigationComponent, children: [
      { path: 'work-flows', component: WorkFlowComponent },
      { path: 'new-work-flow', component: NewWorkflowComponent },
      { path: 'firms', component: FirmsListComponent },
      { path: 'new-firm', component: NewFirmComponent },
      { path: '', redirectTo: 'work-flows', pathMatch: 'full' },
      { path: '**', component: ResourceNotFoundComponent }
    ]
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', component: ResourceNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
