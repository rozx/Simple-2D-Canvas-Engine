Simple2D
========

#### JavaScript 2D Engine ####

Simple2D is a JavaScript based 2D engine, using canvas in HTML5, so before trying it, make sure to upgrade your browser.

**features:**

* collition system.
* sprites system.
* packaged event system.
* and more.

### Usage ###

include it in your html:

	<script src="js/S2D.js"></script>

to initlize the engine:

	<script>
		var Canvas = document.getElementById("Canvas");
		var S2De = new S2D();
		S2De.init2D(Canvas);
		S2De.initTimer("S2De");

	</script>

that's it!

### Examples ###

**!!!NEW VERSION!!!**

coming soon : D


**OLD VERSION**

* [Collition Demo(Using Collition Detection System)](http://rozx.github.com/Examples/Collition%20Demo.html)
* [Mario Demo(Using Sprite Frames System)](http://rozx.github.com/Examples/Mario Demo - By Simple Canvas 2D Engine.html)
* [Mario Demo2(Using Event System)](http://rozx.github.com/Examples/MarioDemo2.html)
* [Mario Demo3](http://rozx.github.com/Examples/MarioDemo3.html)
* [Missle Demo](http://rozx.github.com/Examples/missle.html)


### Update log ###
**version 0.1a**

* [+]`S2D.Missle`, Missle system online!
* [+]`S2D.Event`, packaged some events.
* [+]`S2D.Mouse`
* [+]`S2D.canvas.parent`, normally, it will be the S2D.


**version 0.1**

* [+]Brand New Version!
* [+]Rewrite all functions.
* [+]Much more easier to use!
* [!]to do list: missle,rotation,event system.


**version 0.07rc1**

* [+]New Missle system(Not finished)
* [+]Some small changes
* [+]New Missle Demo(Not finished)

**version 0.06a**

* [-]Bugs Fixed.
* [+]New Demo, WEEEEEEEEEEEEEEEEEEEEEEEEE!

**version 0.06**

* [+]Packaged event funcions.
* [+]some small changes.
* [+]Added Mario demo 2 using key event functions.

**version 0.05**

* [+]Sprite got Frame system.
* [+]Sprite got updating method.
* [-]fixed bugs.
* [?]known issues: cant get image width and height when creating.
* [+]added Mario demo.
* More : check README 


