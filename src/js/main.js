import { loadHeaderFooterMenu, getDates } from "./utils.js";
import { menu } from "./menu.js";

import "../css/base.css";
import "../css/base-large.css";

async function init() {
  await loadHeaderFooterMenu();
  getDates();
  menu();
}

init();

