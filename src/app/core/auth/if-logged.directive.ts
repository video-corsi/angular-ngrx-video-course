// core/auth/if-logged.directive.ts
import {
  booleanAttribute,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.feature';

@Directive({
  selector: '[appIfLogged]',
  standalone: true
})
export class IfLoggedDirective {
  store = inject(Store);
  view = inject(ViewContainerRef)
  tpl = inject(TemplateRef)
  hideIfLogged = input(false, { transform: booleanAttribute, alias: 'appIfLogged' })
  isLogged = this.store.selectSignal(selectIsLogged);

  constructor() {
    effect(() => {
      this.view.clear()

      // shop if logged
      if (this.isLogged() && !this.hideIfLogged())  {
        this.view.createEmbeddedView(this.tpl)
      }

      // show if not logged (when hideIfLogged is true)
      if (!this.isLogged() && this.hideIfLogged())  {
        this.view.createEmbeddedView(this.tpl)
      }
    });
  }

}
