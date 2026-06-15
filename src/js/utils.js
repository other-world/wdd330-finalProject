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
  const menuElement = document.querySelector("#tert-menu");
  renderWithTemplate(footerTemplate, footerElement);
}