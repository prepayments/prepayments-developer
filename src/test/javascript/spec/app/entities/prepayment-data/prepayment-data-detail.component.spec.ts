import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../test.module';
import { PrepaymentDataDetailComponent } from 'app/entities/prepayment-data/prepayment-data-detail.component';
import { PrepaymentData } from 'app/shared/model/prepayment-data.model';

describe('Component Tests', () => {
  describe('PrepaymentData Management Detail Component', () => {
    let comp: PrepaymentDataDetailComponent;
    let fixture: ComponentFixture<PrepaymentDataDetailComponent>;
    const route = ({ data: of({ prepaymentData: new PrepaymentData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepaymentDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PrepaymentDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrepaymentDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load prepaymentData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prepaymentData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
