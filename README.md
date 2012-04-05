#Keymapper JS

Keymapper allows you to easily map JavaScript functions to keystrokes and sets of keystrokes. Keymapper was created to ease the pain of tying actions to keystrokes and to provide a uniform way of creating keyboard shortcuts for web apps.

Additionally, Keymapper offers utility functions for converting keyboard integer codes to more understandable terms and reverting letters, numbers, or verbose keystroke names to their respective integer codes.

Keymapper is a jQuery plugin.

Version: 0.3.0

## The keymapper function

```javascript
$(selector).keymapper(keys, onDown[, onUp ]);
```
### keys

This is either a letter, number, or verbose keystroke name or an array of letters, numbers, or keystroke names.

```javascript
// single keystroke
$(selector).keymapper('b', callback);

// multiple keystrokes
$(selector).keymapper(['control', 'shift', 'a'], callback);
```

### onDown(event)

This is a callback for the onKeyDown event. The 'event' argument is the event object passed to the onKeyDown event handler.

```javascript
$(selector).keymapper('a', function(e) {
	// code to be executed while all keys in set are pressed
});
```

### onUp(event)

This is a callback for the onKeyUp event. The 'event' argument is the event object passed to the onKeyUp event handler.

```javascript
$(selector).keymapper('a', function(e) {
	// ondown
}, function(e){
	// code to be executed when set of keys no longer matches a set of callbacks
});
```

## Utility functions

### $.keys.map(keystroke)

```javascript
$.keys.map(16);
// returns 'shift'
$.keys.map(13);
// returns 'enter'
$.keys.map(99999);
// returns false
```

### $.keys.reverse(keyname)

```javascript
$.keys.reverse('shift');
// returns 16
$.keys.reverse('enter');
// returns 13
$.keys.reverse('xxxxx');
// returns false

// Useful example:
$(selector).keyup(function(e){
	if(e.which == $.keys.reverse('enter')) {
		// do something on keypress enter
	}
});
```
## Getting involved
Getting involved is pretty low-stress. Here's how to jump in:

If you see something sketchy or think of something that you wish was within the capabilities of this plugin, add it as an issue. If you would like to help out, try tackling an open issue.

NOTE: All open issues have been moved to this Issues tab
- Windows (and Linux?) support
	- Should only need more or remapped keys
	- Need simple way to detect and branch for OS differences
	- needs to be arbitrary, unobtrusive, and configurable (if windows|linux: use control, else: command)
- ~~Need to limit callbacks in some way~~ (as of 0.3.0)
	- ~~If you hold down whatever keys, the callbacks will continuously fire~~
	- ~~They should only fire once~~

