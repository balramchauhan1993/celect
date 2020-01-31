# celect
[![celect version](https://img.shields.io/github/package-json/v/balramchauhan1993/celect)](https://github.com/balramchauhan1993/celect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/balramchauhan1993/celect/blob/master/LICENSE)

*celect* is a jQuery plugin that transforms a select into custom designed select, of which value can be set and get easily. Any css, style or attr change can be applied to select. Setting and getting value from select is also simple.


# Demo

See demos here:  
[Single select](https://balramchauhan1993.github.io/celect-single.html)  
[Multi select](https://balramchauhan1993.github.io/celect-multi.html)


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
<select id="drpcar">
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


### `.celect();`

While initializing like above optional parameter can be passed for creating multi-select like below:


```javascript
$("#drpcar").celect({multi:true,searchable:true,title:'Select Bikes'});
```

Search and title will work with multi-select only and for single select no paramter is required while initializing.


### `.celectUpdate(value);`

Set the passed parameter value for select and update the view. this passed value can be passed as an array to update multi-select.


```javascript
$("#drpcar").celectUpdate(2);
$("#drpcar").celectUpdate([2,5,9]);
```


### `.celectGet();`

Above function will return the selected value(s) for select. In case of multi-select it will return array of values.


```javascript
$("#drpcar").celectGet();
```

# License

Copyright (c) 2020 balramchauhan1993. Licensed under the MIT license.
