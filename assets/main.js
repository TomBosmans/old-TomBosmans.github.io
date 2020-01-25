const storage = window.localStorage;
const setTheme = (theme) => {
  const root = document.documentElement;
  const values = getComputedStyle(root);

  root.style.setProperty('--background-color', values.getPropertyValue(`--${theme}-background-color`));
  root.style.setProperty('--background-light', values.getPropertyValue(`--${theme}-background-light`));
  root.style.setProperty('--background-lighter', values.getPropertyValue(`--${theme}-background-lighter`));
  root.style.setProperty('--background-lightest', values.getPropertyValue(`--${theme}-background-lightest`));
  root.style.setProperty('--text-color', values.getPropertyValue(`--${theme}-text-color`));
}

setTheme(storage.getItem('theme'));

window.onload = () => {
  const toggle = document.getElementById('theme-toggle');

  toggle.onclick = () => {
    const theme = toggle.checked ? 'dark' : 'light';
    setTheme(theme);
    storage.setItem('theme', theme);
  }

  if (storage.getItem('theme') === 'dark') { toggle.click(); }
}
