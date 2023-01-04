# ToastActions

Simple & customizable multi/single-toast picker, written in vanilla JS

## Installation

```bash
# yarn or npm
yarn add toast-actions
```

Or direct import in HTML

```html
<!-- Add to head HTML tag -->
<link rel="stylesheet" href="/dist/toast-actions.min.css" />
<!-- Add to the bottom of body HTML tag -->
<script src="/dist/toast-actions.min.js"></script>

<!-- or directly from unpkg -->
<link
  rel="stylesheet"
  href="https://unpkg.com/toast-actions@latest/dist/toast-actions.min.css"
/>
<script src="https://unpkg.com/toast-actions@latest/dist/toast-actions.min.js"></script>
```

## Run

```js
import ToastActions from "toast-actions";

// Only this lines when included with script HTML tag
window.toast = new ToastActions(".toast-actions");
window.addEventListener("load", async () => {
  await window.toast.success(
    "Title example!",
    "Text Example",
  );
})
```

More examples in `example/index.html`

## References

Styles and design refrences
- [Boostrap toast styles](https://getbootstrap.com/docs/5.2/components/toasts/#examples)
