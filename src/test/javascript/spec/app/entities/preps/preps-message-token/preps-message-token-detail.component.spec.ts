import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { PrepsMessageTokenDetailComponent } from 'app/entities/preps/preps-message-token/preps-message-token-detail.component';
import { PrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';

describe('Component Tests', () => {
  describe('PrepsMessageToken Management Detail Component', () => {
    let comp: PrepsMessageTokenDetailComponent;
    let fixture: ComponentFixture<PrepsMessageTokenDetailComponent>;
    const route = ({ data: of({ prepsMessageToken: new PrepsMessageToken(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsMessageTokenDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PrepsMessageTokenDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrepsMessageTokenDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load prepsMessageToken on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prepsMessageToken).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
