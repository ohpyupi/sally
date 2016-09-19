#Sally
 It is a private development package that includes a variety of tools that I use frequently.
 
## Zoozlerfy
It will add Zoozler's copyright text with (1) gradient colors on Zoozler, (2) automatically updated current year, and (3) link to terms of service of Zoozler.

```
<body>

...

<footer>
 <h1 id='target'></h1>
</footer>
<script src='bower_compoenents/sally/dist/js/jquery.min.js'></script>
<script src='bower_compoenents/sally/dist/js/zoozle.js'></script>
<script>
  $('#target').zoozlerfy();
</script>
</body>
```

![alt text](http://res.cloudinary.com/zoozler/image/upload/v1474311625/zoozler-copyright_imgxlp.png "Example of Zoozlerfy()")

