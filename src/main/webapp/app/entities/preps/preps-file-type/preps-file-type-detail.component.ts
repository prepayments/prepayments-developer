import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPrepsFileType } from 'app/shared/model/preps/preps-file-type.model';

@Component({
  selector: 'gha-preps-file-type-detail',
  templateUrl: './preps-file-type-detail.component.html',
})
export class PrepsFileTypeDetailComponent implements OnInit {
  prepsFileType: IPrepsFileType | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepsFileType }) => (this.prepsFileType = prepsFileType));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
