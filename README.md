# qrcode

A cortex package  used to set the QR code.

## Install

```bash
$ cortex install qrcode --save
```




## Usage

```js
var qrcode = require('qrcode');
```



```js
qrcode("#ec",{text:"www.dazhongdianping.com"});
qrcode("#table",{render:"table",text:"www.baidu.com"});
```

## qrcode(selector,options);
<!-- 
Simply list arguments
直接列出参数
-->
- selector `String` a selector by jquery
- options `object` description of the task
    - render `String` choose which style to show the result,you can choose from "table" and "canvas"
    - text `String` the message you want to hide in the qrcode
	
