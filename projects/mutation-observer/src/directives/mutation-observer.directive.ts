import {Attribute, Directive, ElementRef, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {MutationObserverService} from '../services/mutation-observer.service';
import {MUTATION_OBSERVER_INIT} from '../tokens/mutation-observer-init';
import {mutationObserverInitFactory} from '../utils/mutation-observer-init-factory';

// @dynamic
@Directive({
    selector: '[waMutationObserver]',
    outputs: ['waMutationObserver'],
    providers: [
        MutationObserverService,
        {
            provide: MUTATION_OBSERVER_INIT,
            deps: [ElementRef],
            useFactory: mutationObserverInitFactory,
        },
    ],
})
export class MutationObserverDirective {
    constructor(
        @Inject(MutationObserverService)
        readonly waMutationObserver: Observable<ReadonlyArray<MutationRecord>>,
        @Attribute('attributeFilter') _1: unknown,
        @Attribute('attributeOldValue') _2: unknown,
        @Attribute('attributes') _3: unknown,
        @Attribute('characterData') _4: unknown,
        @Attribute('characterDataOldValue') _5: unknown,
        @Attribute('childList') _6: unknown,
        @Attribute('subtree') _7: unknown,
    ) {}
}
