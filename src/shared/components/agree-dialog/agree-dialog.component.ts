import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-agree-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './agree-dialog.component.html',
})
export class AgreeDialogComponent {

  constructor(
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: { title: string, errorMessage: string } | any
  ) { }

  confirm(): void {
    this.modalRef.close(true);
  }

  close(): void {
    this.modalRef.close(false);
  }
}
