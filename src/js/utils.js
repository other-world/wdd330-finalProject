// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML += template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooterMenu(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#tert-header");
  renderWithTemplate(headerTemplate, headerElement);
  
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#tert-footer");
  renderWithTemplate(footerTemplate, footerElement);

  const menuTemplate = await loadTemplate("../partials/menu.html");
  const menuElement = document.querySelector("#navMenu");
  renderWithTemplate(menuTemplate, menuElement);
}

export function getDates() {
    const yr = new Date().getFullYear();
    const lastModified = new Date(document.lastModified);
    const author = "Jamie Cummings";
    const place = "Utah, USA";

    // \u00A9 is the unicode for the copywrite symbol
    document.querySelector("#copywrite").innerHTML = `\u00A9 ${yr} | ${author}`;
    document.querySelector("#modified").innerHTML = `Last Modified ${lastModified.toDateString()}`;
}