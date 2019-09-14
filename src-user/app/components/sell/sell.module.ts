import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellRoutingModule } from './sell-routing.module';
import { SellComponent } from './sell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatRadioModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SellRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [SellComponent],
  declarations: [SellComponent]
})
export class SellModule { }
