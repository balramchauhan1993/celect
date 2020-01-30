# celect
[![NPM version](https://github.com/balramchauhan1993/celect)](https://npmjs.org/package/jquery-editable-select)
[![NPM downloads](https://github.com/balramchauhan1993/celect)](https://npmjs.org/package/jquery-editable-select)
[![MIT License](https://github.com/balramchauhan1993/celect/blob/master/LICENSE)](LICENSE)

*celect* is a jQuery plugin that transforms a select into custom designed select of which value can be set and get easily.
Any css, style or attr change can be applied to select. Setting and getting value from select is also simple.


# Demo

See demos here: https://balramchauhan1993.github.io/index.html


# Installation

Include style and script in your page:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://raw.githubusercontent.com/balramchauhan1993/celect/master/js/celect.min.js"></script>
<link href="https://raw.githubusercontent.com/balramchauhan1993/celect/master/css/celect.min.css" rel="stylesheet">
```


# Markup

## Basic usage

```html
<select id="drpCars">
	  <option value="0">Select car</option>
		<option value="1">Audi</option>
		<option value="2">BMW</option>
		<option value="3">Citroen</option>
</select>
```
```javascript
$("#drpcar").celect();
```


### Scroll support

If the height of the list rises above 288px, a scrollbar is displayed.

You can change the max-height of the drop-down box by overriding this css rule:

```css
.select-items { max-height: 288px; }
```


## Methods

### `.celectUpdate(value);`

set the passed value for select and update the view.


```javascript
$("#drpcar").celectUpdate(2);
```

# License

Copyright (c) 2020 Balram Chauhan. Licensed under the MIT license.
