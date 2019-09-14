import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDe6galtm6BnVZE-8PfF7v8YtZzSeyO9S0",
      libraries: ["places"]
    }),
    GooglePlaceModule,
    MatButtonModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
