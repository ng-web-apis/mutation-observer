import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MutationObserverModule} from '../../module';

describe('MutationObserverDirective', () => {
    @Component({
        template: `
            <section *ngIf="observe" childList (waMutationObserver)="onMutation()">
                Content
                <div
                    *ngIf="child"
                    attributeFilter="title"
                    [title]="title"
                    [attr.aria-label]="label"
                    (waMutationObserver)="onAttributes()"
                >
                    Child
                </div>
            </section>
        `,
    })
    class TestComponent {
        onMutation = jasmine.createSpy('onMutation');
        onAttributes = jasmine.createSpy('onAttributes');
        observe = true;
        child = true;
        title = 'title';
        label = 'label';
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MutationObserverModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        testComponent.onMutation.calls.reset();
        testComponent.onAttributes.calls.reset();
    });

    afterAll(() => {
        testComponent.observe = false;
        fixture.detectChanges();
    });

    it('Emits intersections', done => {
        expect(testComponent.onMutation).not.toHaveBeenCalled();

        testComponent.child = false;
        fixture.detectChanges();

        setTimeout(() => {
            expect(testComponent.onMutation).toHaveBeenCalled();
            done();
        }, 100);
    });

    it('Watches attributes', done => {
        expect(testComponent.onAttributes).not.toHaveBeenCalled();

        testComponent.title = 'test';
        fixture.detectChanges();

        setTimeout(() => {
            expect(testComponent.onAttributes).toHaveBeenCalled();
            done();
        }, 100);
    });

    it('Ignores unwatched attributes', done => {
        expect(testComponent.onAttributes).not.toHaveBeenCalled();

        testComponent.label = 'test';
        fixture.detectChanges();

        setTimeout(() => {
            expect(testComponent.onAttributes).not.toHaveBeenCalled();
            done();
        }, 100);
    });
});
