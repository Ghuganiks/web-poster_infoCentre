import home from "./views/home.js";
import pincode from "./views/pincode.js";
import desires from "./views/desires.js";
import {
  convertAnimation,
  createCanvas,
  createFloatingFolders,
  createFolders,
} from "./utils.js";
import finish from "./views/finish.js";

const routes = {
  "/": { title: "Home", render: home },
  "/pincode": { title: "Pincode", render: pincode },
  "/desires": { title: "Desires", render: desires },
  "/finish": { title: "Finish", render: finish },
};

function router() {
  let view = routes[location.pathname];

  if (view) {
    document.title = view.title;
    app.innerHTML = view.render();
  } else {
    history.replaceState("", "", "/");
    router();
  }
  if (location.pathname == "/") {
    createFolders();
    createCanvas();
  }
  if (location.pathname == "/desires") {
    createFloatingFolders();
  }
  if (location.pathname == "/finish") {
    convertAnimation();
  }
}

// Handle navigation
window.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState("", "", e.target.href);
    router();
  }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);

