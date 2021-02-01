import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAmortizationEntry } from 'app/shared/model/amortization-entry.model';

@Component({
  selector: 'gha-amortization-entry-detail',
  templateUrl: './amortization-entry-detail.component.html',
})
export class AmortizationEntryDetailComponent implements OnInit {
  amortizationEntry: IAmortizationEntry | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ amortizationEntry }) => (this.amortizationEntry = amortizationEntry));
  }

  previousState(): void {
    window.history.back();
  }
}
