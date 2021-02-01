import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';

@Component({
  selector: 'gha-preps-message-token-detail',
  templateUrl: './preps-message-token-detail.component.html',
})
export class PrepsMessageTokenDetailComponent implements OnInit {
  prepsMessageToken: IPrepsMessageToken | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepsMessageToken }) => (this.prepsMessageToken = prepsMessageToken));
  }

  previousState(): void {
    window.history.back();
  }
}
