import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourcesPageRoutingModule } from './cources-routing.module';

import { CourcesPage } from './cources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourcesPageRoutingModule
  ],
  declarations: [CourcesPage]
})
export class CourcesPageModule {}
