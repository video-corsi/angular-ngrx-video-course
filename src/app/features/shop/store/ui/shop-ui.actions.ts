// features/shop/store/ui/shop-ui.actions.ts

import { createActionGroup, emptyProps } from '@ngrx/store';

export const ShopUiActions = createActionGroup({
  source: 'Shop UI',
  events: {
    'open Panel': emptyProps(),
    'close Panel': emptyProps(),
    'toggle Panel': emptyProps(),
  }
});
