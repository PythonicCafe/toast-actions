function log(text, type = "message") {
  let statusLog = document.getElementById("status-log");
  statusLog.innerHTML += `<article class="${type}">${text}</article>`;
  statusLog.scrollTop = statusLog.scrollHeight;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

const slider = document.getElementById("font-size");

if (slider) {
  slider.addEventListener("input", function () {
    const size = slider.value;
    // this sets the body's font size property
    document.body.style.fontSize = size + "em";
  });
}

// Setting test toasts
async function runTest() {
  window.toastNumber++;
  log("Asking new toast");
  await window.toast.error(
    `Error #${window.toastNumber}!`,
    "Here goes the error text.",
    { timeout: 100000 }
  );
  await window.toast.warning(
    `Warning #${window.toastNumber}!`,
    `Here goes the warning text.`,
    { timeout: 5000 }
  );
  await window.toast.info(
    `Info #${window.toastNumber}!`,
    "<b>Here goes the info</b> text. <br/> Testing html true.",
    { timeout: 3000, html: true }
  );
  await window.toast.success(
    `Success #${window.toastNumber}!`,
    "<b>Here goes the success </b> text.",
    { timeout: 3000, html: true }
  );
}

async function runTestSecondary() {
  log("Asking new secondary toast");
  await window.toast.error(
    `Error #Secondary!`,
    `
     Errors can have text like this:
     TESTING_TEXTS_WITH_NO_SPACES_BETWEEN_WORDS_SCROLL_BEHAVIOUR
    `,
    { timeout: 100000 }
  );
  await window.toast.warning(
    `Warning #Secondary!`,
    `
     Here goes the warning text. Test long text. Lorem ipsum dolor sit amet,
     consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
     et dolore magna aliqua.
    `,
    { timeout: 5000 }
  );
}
async function main() {
  const statuslog = document.createElement("div");
  const transparentEffect = document.createElement("div");

  statuslog.setAttribute("id", "status-log");
  transparentEffect.setAttribute("class", "transparentEffect");
  statuslog.innerHTML = "<br><br><br><br>";
  statuslog.appendChild(transparentEffect);
  document.body.insertBefore(statuslog, document.body.firstChild);

  window.toastNumber = 0;
  log("Creating instance");
  window.toast = new ToastActions(".toast-actions");
  await runTest();
}

document.addEventListener("DOMContentLoaded", main, false);

// Toggle if user OS theme setted as dark mode
if (window.matchMedia("(prefers-color-scheme: dark)").matches) toggleTheme();
function toggleTheme() {
  document.querySelector("body").classList.toggle("dark");
}

