import { getTheme, setTheme } from '../utils/theme';
import { DOM } from './DOM';

export const theme = {};

export const initTheme = () => {
  if (DOM.theme) DOM.theme.addEventListener('change', changeTheme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', changeTheme);
  changeTheme();
};

export const changeTheme = e => {
  if (e && (e.target.value === 'dark' || e.target.value === 'light' || e.target.value === 'system')) {
    setTheme(e.target.value);
  }

  theme.CURRENT = getTheme();

  if (theme.CURRENT === 'dark' || theme.CURRENT === 'light') {
    if (DOM.theme) DOM.theme.value = theme.CURRENT;
    theme.CURRENT === 'light' ? document.documentElement.classList.remove('dark') : document.documentElement.classList.remove('light');
    document.documentElement.style.colorScheme = theme.CURRENT;
    document.documentElement.classList.add(theme.CURRENT);
    return;
  }

  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && DOM.theme && DOM.theme.value === 'system') {
    document.documentElement.classList.remove('light');
    document.documentElement.style.colorScheme = 'dark';
    document.documentElement.classList.add('dark');
    return;
  }

  document.documentElement.classList.remove('dark');
  document.documentElement.style.colorScheme = 'light';
  document.documentElement.classList.add('light');
};
