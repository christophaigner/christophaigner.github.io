const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";
const QUERY_KEY = "(prefers-color-scheme: dark)";

const themes = {
  LIGHT: "light",
  DARK: "dark",
};

initTheme();

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme) {
    // Storage theme
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia(QUERY_KEY).matches) {
    // system theme
    setTheme(themes.DARK);
  } else {
    // Default theme
    setTheme(themes.LIGHT);
  }

  // Watch for system theme changes
  window.matchMedia(QUERY_KEY).addEventListener("change", (e) => {
    const newTheme = e.matches ? themes.DARK : themes.LIGHT;
    setTheme(newTheme);
  });
}

function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(newTheme) {
  document.documentElement.setAttribute(THEME_ATTR, newTheme);
  showSnowflakesIfNecessary(newTheme);
}

function showSnowflakesIfNecessary(newTheme) {
  if (newTheme !== themes.DARK || !isWinter()) {
    return;
  }

  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const bottomEnd = (scrollHeight / clientHeight) * 100 + 10;

  const snowflakes = document.getElementsByClassName("snowflake");
  for (let snowflake of snowflakes) {
    snowflake.style.display = "inline";
    snowflake.style.setProperty("--bottom-end", bottomEnd + 'vh');
  }
}

function isWinter() {
  const currentDate = new Date();
  return [0, 1, 9, 10, 11].includes(currentDate.getMonth());
}

function updateProgressBar() {
  if (document.getElementById("progress-bar") == null) {
    return;
  }
  let docElem = document.documentElement,
    docBody = document.body,
    scrollTop = docElem["scrollTop"] || docBody["scrollTop"],
    scrollBottom =
      (docElem["scrollHeight"] || docBody["scrollHeight"]) - window.innerHeight,
    scrollPercent = (scrollTop / scrollBottom) * 100 + "%";

  document
    .getElementById("progress-bar")
    .style.setProperty("--scrollAmount", scrollPercent);
}

document.addEventListener("scroll", updateProgressBar);
