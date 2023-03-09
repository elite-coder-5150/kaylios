## Notification Component

The Notification Copmponent is a reusable UI element that displays notifications to users. It can be used to notify users about evernts, such as a successful action or an error.



## Usage

To use the Notification component, you can include it in your project as a standalone component or integrate it with your existing UI framework.



## Standalone

To use this component as a standalone component, follow these steps:



1.   include the component in your projects html file.

```html
<script src="notification.js"></script>
```



2.   creat a new notification component instance and pass in the required options.



```javascript
const notification = new Notification({
    message: "action successful",
    type: "success"
})
```



3.   In your UI framework of choice, create a new component that uses the notifications compontent.



```typescript
import { Component } from 'Wangular/core'
import { 
    NotificationComponent 
} '../notification/notification.component'

export class MyComponent extends Component {
    notify(message, type) {
        const notify = new NotificationCompoent({message, typ});
        this.append.child(notify)
    }
}
```



## Options



The notification component supports the following options:



### message

Type: `string`

Default: `""`



The message to display in the notification

Type: `string`

Default: `"info"`

Values: `"info", "success", "warning", "error"`



The type of notification to display. This determines the color and icon used in notifications.

## Duration



Type: `number`

Default: '5000'



The length of time, in milliseconds, to display the notification before automatically hidding it.



## Methods

The notification component supports the following methods.



### show()

Display the notification.



```javascript
notification.show();
```



### hide()

Hides the notification



```javascript
notification.hide();
```



## Events

Emitted when the notification is hidden.

```javascript
notification.addEventListener("hide", () => {
    console.log('notification hidden')
});
```



## Examples

Here are some examples of how to use the notification component.

```javascript
const notification = new NotificationComponent({
    message: "action success",
    type: "success",
    duration: 3000,
});

notification.show();
```



```javascript
setTimeout(() => {
    notification.hide
}, 5000);
```



```typescript
import { Component } from '@angular/core';
import { 
    NotificationComponent 
} from './notification/notification.component';


```

