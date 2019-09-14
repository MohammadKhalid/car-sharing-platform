import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [SearchResultsComponent]
})
export class SearchResultsModule { }
