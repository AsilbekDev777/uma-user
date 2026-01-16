import {Injectable, Type} from "@angular/core";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Injectable({providedIn: 'root'})
export class ModalService {
  constructor(private readonly modalService: NzModalService) {
  }

  open<T>(component: Type<T>, params?: any, width?: number | string, closable?: boolean, maskClosable?: boolean): NzModalRef {
    return this.modalService.create({
      nzFooter: null,
      nzClosable: closable ?? true,
      nzMaskClosable: maskClosable ?? true,
      nzContent: component,
      nzCentered: false,
      nzData: params,
      nzWidth: width ? width : 600
    });
  }
}
