import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteDialog } from './delete-dialog/delete-dialog';

@NgModule({
  declarations: [
    DeleteDialog
  ],
  exports: [
    CommonModule,
    DeleteDialog
  ],
  entryComponents:[DeleteDialog]
})
export class SharedModule {}