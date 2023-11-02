export const setTheme = theme => {
  if (!theme) return;
  if (typeof theme === 'string') {
    localStorage.setItem('theme', theme.toLowerCase());
  }
};

export const getTheme = () => localStorage.getItem('theme')
