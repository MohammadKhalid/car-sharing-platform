import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from "./payments.component";
import { PaymentsRoutingModule } from "./payments-routing.module";
import { MatCardModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FlexLayoutModule,
    PaymentsRoutingModule
  ],
  declarations: [PaymentsComponent]
})
export class PaymentsModule { }
