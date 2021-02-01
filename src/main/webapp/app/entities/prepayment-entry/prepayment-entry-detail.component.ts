import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrepaymentEntry } from 'app/shared/model/prepayment-entry.model';

@Component({
  selector: 'gha-prepayment-entry-detail',
  templateUrl: './prepayment-entry-detail.component.html',
})
export class PrepaymentEntryDetailComponent implements OnInit {
  prepaymentEntry: IPrepaymentEntry | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentEntry }) => (this.prepaymentEntry = prepaymentEntry));
  }

  previousState(): void {
    window.history.back();
  }
}
