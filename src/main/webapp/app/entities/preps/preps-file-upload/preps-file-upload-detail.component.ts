import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';

@Component({
  selector: 'gha-preps-file-upload-detail',
  templateUrl: './preps-file-upload-detail.component.html',
})
export class PrepsFileUploadDetailComponent implements OnInit {
  prepsFileUpload: IPrepsFileUpload | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepsFileUpload }) => (this.prepsFileUpload = prepsFileUpload));
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
