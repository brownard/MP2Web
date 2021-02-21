import { createAction } from '@ngrx/store';

import { WebChannelPrograms, WebProgramBasic } from '../../models/programs';
import { EpgState } from './epg.reducers';

export const updateGuide = createAction(
  '[TV EPG] Update Guide',
  (guideState: Partial<EpgState>) => ({ guideState })
);

export const updateGuideSuccess = createAction(
  '[TV EPG] Update Guide Success',
  (programs: WebChannelPrograms<WebProgramBasic>[]) => ({ programs })
);
