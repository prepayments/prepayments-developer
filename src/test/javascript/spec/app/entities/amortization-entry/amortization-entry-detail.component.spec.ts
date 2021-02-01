import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../test.module';
import { AmortizationEntryDetailComponent } from 'app/entities/amortization-entry/amortization-entry-detail.component';
import { AmortizationEntry } from 'app/shared/model/amortization-entry.model';

describe('Component Tests', () => {
  describe('AmortizationEntry Management Detail Component', () => {
    let comp: AmortizationEntryDetailComponent;
    let fixture: ComponentFixture<AmortizationEntryDetailComponent>;
    const route = ({ data: of({ amortizationEntry: new AmortizationEntry(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [AmortizationEntryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AmortizationEntryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AmortizationEntryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load amortizationEntry on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.amortizationEntry).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
