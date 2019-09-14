import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatProgressSpinnerModule, MatIconModule, MatTabsModule, MatButtonModule } from '@angular/material';
import { UICarouselModule } from 'ui-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatProgressSpinnerModule,
    UICarouselModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
