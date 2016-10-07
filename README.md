#sally.js - [sallyjs.herokuapp.com](http://sallyjs.herokuapp.com/)
Sally.js is a development tool as an angular module for Zoozler's developers. This tool is to save developers' time and avoid tedious and repeated tasks at each development.

To utilize sally, you need to install first angularjs and jquery.
```
bower install angular --save
bower install jquery --save
bower install sally --save
```
At your main angular moudule, inject sally dependency like below.
```
// path-to-main-module/ngApp.js
var app = angular.module('YourMainModule', ['sally']);

// in your html file
<script src='path-to-jquery/jquery.min.js'><script>
<script src='path-to-angularjs/angularjs.min.js'><script>
<script src='path-to-sally/sally.js'><script>
<script src='path-to-your-main-module/ngApp.js'><script>
```
See the document [sallyjs.herokuapp.com](http://sallyjs.herokuapp.com/)
 
 
## Zoozlerfy
Zoozler's brand logo has an awesome gradient colors on it. To implement it on each website, especially in copyright, it is very tedious to write html and css. This module will take care of it and automatically put gradient colors on Zoozler.

## postContact
Most websites need contact form. It's not difficult but takes time. To use time efficiently, I have built Zoozler Mail API. Thus, every website, instead of having independent back-end for contact form function, will just send request to let Zoozler Mail API will take care of contact-form function. 
