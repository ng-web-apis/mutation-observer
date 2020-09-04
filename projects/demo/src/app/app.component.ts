import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    toggled = false;

    disabled: true | null = null;

    title = 'title';

    text = 'text';

    ignored = 'Ignored aria-label attribute';

    toggleDOM() {
        this.toggled = !this.toggled;
    }

    toggleAttr() {
        this.disabled = !this.disabled || null;
    }

    log(entries: MutationRecord[]) {
        console.log(entries);
    }
}
