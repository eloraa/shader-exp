import { animateFavicon } from '../utils/favicon';
import { initTheme } from './theme';
export const APP = {};

export const init = () => {
  initTheme();
  animateFavicon()
};

