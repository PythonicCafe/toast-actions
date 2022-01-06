import nunjucks from "nunjucks";

export class ToastActions {
  constructor(selector) {
    /*
      This class will always append a child to the selector above, and
      will show a toast message.
    */

    this.container =
      typeof selector === "string"
      ? document.querySelector(selector)
      : selector;
  }

  async handleEvent(eventType, event) {
    if (eventType == "click") {
      let closeButton = event.target.closest(".toast-close");
      if (closeButton) {
        event.preventDefault();
        event.stopPropagation();
        this.close(closeButton.closest(".toast-container"));
      }
    }
  }

  _getInnerContainers() {
    return this.container.querySelectorAll(".toast-container");
  }

  _animateRemoveContainer(toastContainer) {
    toastContainer.style.animation = "ta-fade-out .4s";
    toastContainer.onanimationend = function () {
      toastContainer.remove();
    };
  }

  close(container = null, timeout = null) {
    if (!container) {
      const allContainers = this._getInnerContainers();
      container = allContainers[allContainers.length - 1];
    }

    if (!timeout) {
      this._animateRemoveContainer(container);
    } else {
      const self = this;
      setTimeout(function () {
        self._animateRemoveContainer(container);
      }, timeout);
    }
  }

  _show(html, timeout) {
    const self = this,
      div = document.createElement("div");
    div.classList = "toast-container";
    div.style.display = "block";
    div.innerHTML = html;
    div.style.animation = "ta-fade-in .4s";
    div.addEventListener("click", async function (event) {
      await self.handleEvent("click", event);
    });
    this.container.appendChild(div);
    this.close(div, timeout);
  }

  success(title, message, { timeout = 3000, html = false } = {}) {
    this.show("success ", title, message, { timeout, html });
  }

  info(title, message, { timeout = 3000, html = false } = {}) {
    this.show("info", title, message, { timeout, html });
  }

  warning(title, message, { timeout = 3000, html = false } = {}) {
    this.show("warning", title, message, { timeout, html });
  }

  error(title, message, { timeout = 3000, html = false } = {}) {
    this.show("error", title, message, { timeout, html });
  }

  show(type, title, message, { timeout = 3000, html = false } = {}) {
    const renderedHtml = this.getTemplate().render({
      type: type,
      title: title,
      message: message,
      html: html,
    });
    this._show(renderedHtml, timeout);
  }

  getTemplate() {
    const template = `
        <div class="toast-content">
          <div class="toast-header">
            <button class="toast-close">&#x2715</button>
            <div class="status {{ type }}"></div>
            <div class="toast-title">
              {{ title }}
            </div>
          </div>
          <div class="toast-message">
            {% if html %}{{ message|safe }}{% else %}{{ message }}{% endif %}
          </div>
        </div>
        `;
    return nunjucks.compile(template);
  }
}
