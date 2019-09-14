import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
