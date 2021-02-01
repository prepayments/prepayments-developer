import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrepaymentData } from 'app/shared/model/prepayment-data.model';

@Component({
  selector: 'gha-prepayment-data-detail',
  templateUrl: './prepayment-data-detail.component.html',
})
export class PrepaymentDataDetailComponent implements OnInit {
  prepaymentData: IPrepaymentData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentData }) => (this.prepaymentData = prepaymentData));
  }

  previousState(): void {
    window.history.back();
  }
}
