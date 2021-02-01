import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../test.module';
import { CompilationRequestDetailComponent } from 'app/entities/compilation-request/compilation-request-detail.component';
import { CompilationRequest } from 'app/shared/model/compilation-request.model';

describe('Component Tests', () => {
  describe('CompilationRequest Management Detail Component', () => {
    let comp: CompilationRequestDetailComponent;
    let fixture: ComponentFixture<CompilationRequestDetailComponent>;
    const route = ({ data: of({ compilationRequest: new CompilationRequest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [CompilationRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CompilationRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CompilationRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load compilationRequest on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.compilationRequest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
