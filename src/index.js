
// Opt in to strict mode of JavaScript, [ref](http://is.gd/3Bg9QR)
// Use this statement, you can stay away from several frequent mistakes 
'use strict';
var $=require('jquery');
var qrcodeSource=require("./qrcode.js");

function drawQrcode(goal,task){

    var x;

    var newTask={
            render      : "canvas",
            width       : 256,
            height      : 256,
            typeNumber  : -1,
            correctLevel    : qrcodeSource.QRErrorCorrectLevel.H,
            background      : "#ffffff",
            foreground      : "#000000",
            text         :"www.panyifei.com"
    };

    for(x in task){
        newTask[x]=task[x];
    }

    var createCanvas    = function(options){
            // create the qrcode itself
            var qrcode  = new qrcodeSource.QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // create canvas element
            var canvas  = document.createElement('canvas');
            canvas.width    = options.width;
            canvas.height   = options.height;
            var ctx     = canvas.getContext('2d');

            // compute tileW/tileH based on options.width/options.height
            var tileW   = options.width  / qrcode.getModuleCount();
            var tileH   = options.height / qrcode.getModuleCount();

            // draw in the canvas
            for( var row = 0; row < qrcode.getModuleCount(); row++ ){
                for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                    ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                    var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
                    var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
                    ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
                }   
            }
            // return just built canvas
            return canvas;
        }


        var createTable = function(options){
            // create the qrcode itself
            var qrcode  = new qrcodeSource.QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();
            
            // create table element
            var $table  = $('<table></table>')
                .css("width", options.width+"px")
                .css("height", options.height+"px")
                .css("border", "0px")
                .css("border-collapse", "collapse")
                .css('background-color', options.background);

           //var t = document.createElement('table');
           // $(t).css("width", options.width+"px");
           // console.log(t);

            // compute tileS percentage
            var tileW   = options.width / qrcode.getModuleCount();
            var tileH   = options.height / qrcode.getModuleCount();

            // draw in the table
            for(var row = 0; row < qrcode.getModuleCount(); row++ ){
                var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
                
                for(var col = 0; col < qrcode.getModuleCount(); col++ ){
                    $('<td></td>')
                        .css('width', tileW+"px")
                        .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
                        .appendTo($row);
                }   
            }
            // return just built canvas
            return $table;
        }

        var element = newTask.render == "canvas" ? createCanvas(newTask) : createTable(newTask);
        console.log(element);
        $(goal).append(element);   
}


module.exports=drawQrcode;









