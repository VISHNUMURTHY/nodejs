import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { SortPipe } from './shared/pipes/sort.pipe';
import { NewWorkflowComponent } from './new-workflow/new-workflow.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { DependentsComponent } from './dependents/dependents.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { DynamicElementsFormComponent } from './dynamic-elements-form/dynamic-elements-form.component';
import { MultiSwitchCasePipe } from './shared/pipes/multi-switch-case.pipe';
import { DynamicDialogFormComponent } from './common/dynamic-dialog-form/dynamic-dialog-form.component';
import { AlertMessagesComponent } from './common/alert-messages/alert-messages.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FilesDropZoneDirective } from './shared/directives/files-drop-zone.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserNavigationComponent,
    ResourceNotFoundComponent,
    WorkFlowComponent,
    SortPipe,
    NewWorkflowComponent,
    QuestionnaireComponent,
    AttachmentsComponent,
    DependentsComponent,
    PersonalInfoComponent,
    FileUploadComponent,
    ThemePickerComponent,
    DynamicElementsFormComponent,
    MultiSwitchCasePipe,
    DynamicDialogFormComponent,
    AlertMessagesComponent,
    FilesDropZoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatMomentDateModule
  ],
  providers: [SortPipe, {
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }],
  entryComponents: [DynamicDialogFormComponent, FileUploadComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
