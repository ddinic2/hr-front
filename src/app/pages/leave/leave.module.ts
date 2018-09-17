import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [LeaveFormComponent],
  exports: [LeaveFormComponent]
})
export class LeaveModule {}
