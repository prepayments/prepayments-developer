import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompilationRequest } from 'app/shared/model/compilation-request.model';

@Component({
  selector: 'gha-compilation-request-detail',
  templateUrl: './compilation-request-detail.component.html',
})
export class CompilationRequestDetailComponent implements OnInit {
  compilationRequest: ICompilationRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compilationRequest }) => (this.compilationRequest = compilationRequest));
  }

  previousState(): void {
    window.history.back();
  }
}
