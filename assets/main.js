let storage = window.localStorage;
let root = document.documentElement;
let values = getComputedStyle(root);
let setTheme = (theme) => {
  root.style.setProperty('--background-color', values.getPropertyValue(`--${theme}-background-color`));
  root.style.setProperty('--background-light', values.getPropertyValue(`--${theme}-background-light`));
  root.style.setProperty('--background-lighter', values.getPropertyValue(`--${theme}-background-lighter`));
  root.style.setProperty('--background-lightest', values.getPropertyValue(`--${theme}-background-lightest`));
  root.style.setProperty('--text-color', values.getPropertyValue(`--${theme}-text-color`));
  storage.setItem('theme', theme);
}

setTheme(storage.getItem('theme'));

window.onload = () => {
  let toggle = document.getElementById('theme-toggle');

  toggle.onclick = () => {
    let theme = toggle.checked ? 'dark' : 'light';
    setTheme(theme);
  }

  if (storage.getItem('theme') === 'dark') { toggle.click(); }
}
