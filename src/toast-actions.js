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
      let closeButton = event.target.closest(".t-close");
      if (closeButton) {
        event.preventDefault();
        event.stopPropagation();
        this.close(closeButton.closest(".t-container"));
      }
    }
  }

  _getInnerContainers() {
    return this.container.querySelectorAll(".t-container");
  }

  _animateRemoveContainer(toastContainer) {
    toastContainer.style.animation = "t-fade-out .4s";
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
    div.classList = "t-container";
    div.style.display = "block";
    div.innerHTML = html;
    div.style.animation = "t-fade-in .4s";
    div.addEventListener("click", async function (event) {
      await self.handleEvent("click", event);
    });
    this.container.appendChild(div);
    this.close(div, timeout);
  }

  success(title, message, { timeout = 3000, html = false } = {}) {
    this.show("t-status--success ", title, message, { timeout, html });
  }

  info(title, message, { timeout = 3000, html = false } = {}) {
    this.show("t-status--info", title, message, { timeout, html });
  }

  warning(title, message, { timeout = 3000, html = false } = {}) {
    this.show("t-status--warning", title, message, { timeout, html });
  }

  error(title, message, { timeout = 3000, html = false } = {}) {
    this.show("t-status--error", title, message, { timeout, html });
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
        <div>
          <div class="t-header">
            <div class="t-header__main">
              <div class="t-status {{ type }}"></div>
              <div>
                {{ title }}
              </div>
            </div>
            <button class="t-close">&#x2715</button>
          </div>
          <div class="t-message">
            {% if html %}{{ message|safe }}{% else %}{{ message }}{% endif %}
          </div>
        </div>
        `;
    return nunjucks.compile(template);
  }
}
