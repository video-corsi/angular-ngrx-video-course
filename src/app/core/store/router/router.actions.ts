// core/store/router/router.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const RouterActions = createActionGroup({
  source: 'Router',
  events: {
    'go': props<{ path: string }>(),
    'back': emptyProps,
    'forward': emptyProps,
  }
})
