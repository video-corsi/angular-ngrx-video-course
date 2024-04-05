// core/store/auth/auth.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    // NEW
    'syncWithLocalStorage': props<{ token: string | null, displayName: string | null}>(),
    'login': props<{ username: string, password: string }>(),
    'login success': props<{ token: string }>(),
    'login fail': emptyProps(),
    'logout': emptyProps(),
    'get profile': props<{ token: string }>(),
    'get profile success': props<{ displayName: string }>(),
    'get profile fail': emptyProps()
  }
});
