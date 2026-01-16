import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import { NzButtonComponent } from "ng-zorro-antd/button";
import {NzResultModule, NzResultStatusType} from "ng-zorro-antd/result";
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  template: `
    <div class="flex flex-col items-center justify-center w-full">
      <nz-result class="flex-col items-center justify-center" [nzStatus]="code" [nzTitle]="title" [nzSubTitle]="subTitle">
        <div nz-result-extra>
          <button class="radius-8-input" nz-button nzType="primary" nzSize="large" (click)="back()">Вернуться на главную</button>
        </div>
      </nz-result>
    </div>
  `,
  imports: [
    NzResultModule,
    NzButtonComponent
  ]
})
export class ErrorComponent implements OnInit {
  code!: NzResultStatusType;
  title!: string;
  subTitle!: string;
  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.modalService.closeAll();
    this.activatedRoute.data.subscribe(({title, subTitle}) => {
      console.log(this.activatedRoute.routeConfig?.path)
      this.code = this.activatedRoute.routeConfig?.path as NzResultStatusType;
      this.title = title;
      this.subTitle = subTitle;
    });
  }

  back = (): void => window.history.back();
}
