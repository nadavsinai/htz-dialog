# htz dialog

Accessible dialog and modal windows with simple DOM and JavaScript APIs with 
backed in support for navigating between related dialogs within the same wrapper.

### Installation
```bash
jspm install github:haaretz/htz-dialog
```

### Usage
For convenience, dialogs can be set up and controlled using either the JavaScript or the DOM API, 
and the use of JavaScipt is required only in initializing dialog instances:

```js
import htzDialog from 'htz-dialog';

// The #foo element is not the modal itself, but its wrapper.
htzDialog(document.getElementById('dialog'));
```

For better accessibly, the content blocked by dialogs must be assigned an `aria-hidden` attribute
with a value of `true` whenever the dialog is active. The is automatically taken care of by the 
module, but does have implications on markup structure. Since the blocked element is `aria-hidden`,
the dialog blocking it must reside NEXT to it, rather than inside it, as would often be the 
intuitive structure.

Modal-type dialogs (ones that completely block the entire UI, rather than a single element), 
therefore, would normally need to be placed at root level, making it harder to use them when 
templating components, as we'd usually like to manage the component and its modal in the same 
place.

The module allows us to do that by specifying a container to which the dialog should be moved to,
either by passing a parameter when initializing the dialog, or using the DOM API.


### Parameters

|Parameter | HTML Attribute | Default | Notes |
| --- | --- | --- | --- |
| `wrapper` | --- | --- | An html element containing a dialog(s) |
| `dialogClass` | --- | `js-dialog` | The class used as a javascript hook for dialog windows within the wrapper |
| `elemToHide` | `data-htz-dialog-elem-to-hide='<element-id>'` | `page-wrapper` | Determines the element which will be concealed by the dialog. Should be place on the wrapper |
| `appendTo` | `data-htz-dialog-append-to='<element-id>'` | --- | Determines the element to which the dialog will be appended to (if at all) |

### HTML Structure

```html
<div id="page-wrapper">
  <!-- Some page content -->
  <section id="has-dialog">
    <div id="conceal">
      <!-- component content -->
      <button type="button" data-htz-dialog-show="dialog">Open dialog</button>
    </div>
    <div id="dialog" data-htz-dialog-hide data-htz-dialog-elem-to-hide="conceal" tabindex="-1" aria-hidden="true">
      <div class="js-dialog__content" role="dialog">
        <h3>Dialog Title</h3>
        <p>Dialog textual content with a <a href="#!">link</a> and some text.</p>
        <button type="button" data-htz-dialog-next>Continue to 2nd dialog</button>
        <button type="button" data-htz-dialog-hide>close</button>
      </div>
      <div class="js-dialog__content" role="dialog">
        <h3>Title of second dialog</h3>
        <p>Dialog textual content with a <a href="#!">link</a> and some text.</p>
        <button type="button" data-htz-dialog-prev>Back to 1st dialog</button>
        <button type="button" data-htz-dialog-hide>close</button>
      </div>
    </div>
  </section>

  <section id="has-modal">
    <!-- component content -->
    <button type="button" data-htz-dialog-show="modal">Open dialog</button>
    <div id="modal" data-htz-append-to="modals" data-htz-dialog-hide tabindex="-1" aria-hidden="true">
      <div class="js-dialog__content" role="dialog">
        <h1>Modal Title</h1>
        <p>Modal textual content with a <a href="#!">link</a> and some text.</p>
        <button type="button" data-htz-dialog-hide>close</button>
      </div>
    </div>
  </section>

  <!-- More page content -->

</div>

<div id="modals">
  <!-- The `modal` element will be appended here when initialized -->
</div>
```

### DOM API
| Attribute | Action | Notes |
| --- | --- | --- |
| `data-htz-dialog-show='dialog-id'` | Reveals the specified dialog on click |
| `data-htz-dialog-hide[='dialog-id']` | Hides the specified dialog on click | When located inside a dialog, clicking the element will close the dialog it is placed in even without explicitly providing a a dialog's `id` |
| `data-htz-dialog-next` | Navigates to the next related dialog on click, if one exists | By default, each dialog within the wrapper is identified by the `js-dialog` class. |
| `data-htz-dialog-prev` | Navigates to the previous related dialog on click, if one exists | By default, each dialog within the wrapper is identified by the `js-dialog` class. |

### Instance JavaScript API
| Method | Description |
| --- | --- |
| `show()` | Reveal dialog.
| `hide()` | Hide dialog.
| `isVisible()` | Returns a boolean indicating if the dialog is open.
| `next()` | Move to next dialog in wrapper, if one exists.
| `prev()` | Move to previous dialog in wrapper, if one exists.

### Static Methods
| Method | Parameters | Description |
| --- | --- | --- |
| `instance` | `dialog`: A dialog wrapper (`HTMLElement`) or the `id` of one. | Returns an object with the API methods associated with a specific instance. |


### Events
Htz-dialog emits events on state changes to easily allow hooking custom behaviour.

| Event Name | Description | Properties |
| --- | --- | --- |
| `dialog:show-before` | Fired whenever a dialog is being revealed.<br /> Stops execution if any of its handlers calls `event.preventDefault` | `details.dialog` - The wrapper element containing dialog(s) being revealed. |
| `dialog:show-after` | Fired whenever a dialog is being revealed. | `details.dialog` - The wrapper element containing dialog(s) being revealed. |
| `dialog:hide-before` | Fired whenever a dialog is being hidden.<br /> Stops execution if any of its handlers calls `event.preventDefault` | `details.dialog` - The wrapper element containing dialog(s) being hidden. |
| `dialog:hide-after` | Fired whenever a dialog is being hidden | `details.dialog` - The wrapper element containing dialog(s) being hidden. |
| `dialog:focus-dialog-before` | Fired whenever a dialog window inside the wrapper is focused.<br /> Stops execution if any of its handlers calls `event.preventDefault`  | `details.wrapper` - The wrapper element containing the focused dialog.<br />`details.dialog` - The focused dialog element. |
| `dialog:focus-dialog-after` | Fired whenever a dialog window inside the wrapper is focused. | `details.wrapper` - The wrapper element containing the focused dialog.<br />`details.dialog` - The focused dialog element. |

### CSS
The module comes with absolutly no styling, but it is recommended that dialogs are `display: none` by default:
```css
.dialog-wrapper-class[aria-hidden="true"] {
  display: none;
}
```
