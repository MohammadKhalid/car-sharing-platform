import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from "./favourites.component";
import { FavouritesRoutingModule } from "./favourites-routing.module";
import { MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FavouritesRoutingModule,
    FlexLayoutModule,
    MatIconModule
  ],
  declarations: [FavouritesComponent]
})
export class FavouritesModule { }
