/*
		=================================
		=	Simple 2D Engine	=
		=	Author : Rozx		=
		=	Version 0.2		=
		=================================
*/




function S2D(){
	
	// Proporties
	
	this.maxFPS = 120;
	this.canvas = undefined;
	this.context = undefined;
	this.__FramesDone = 0;
	this.FPS = this.maxFPS;
	this.backgroundColor = "black";
	this.showFPS = true;
	this.scene = undefined;
	this.mouse = undefined;
	
	
	// Timers
	
	this.FPSTimer = undefined;
	this.drawTimer = undefined;
	
	// Objects
	
	
	// Functions
	

	this.init2D = function(canvas) {
		
		this.canvas = canvas;
		this.canvas.parent = this;
		this.context = canvas.getContext("2d");
		this.scene = new S2D.Scene();
		this.scene.width = this.canvas.width;
		this.scene.height = this.canvas.height;
		this.mouse = new S2D.Mouse();
		this.mouse.parent = this;
		
		
		
		if(!this.context) console.warn("Fail to initialize context , Sorry : <");
		
		this.canvas.addEventListener("mousemove",this.mouse.getMousePos, false);
		
		
		console.log("initialize complete!(S2D.Engine)");	

	};
	
	this.initTimer = function(en) {
	
		this.FPSTimer = window.setInterval(en + ".FramesDone()",1000);
		this.drawTimer = window.setInterval(en + ".draw()",parseInt(1000 / this.maxFPS));
		
	};
	

	
	this.setting = function(inp){
		
		if(inp.backgroundColor) this.backgroundColor = inp.backgroundColor;
		if(inp.maxFPS) {
			this.maxFPS = inp.maxFPS;
			clearInterval(this.drawTimer);
			this.drawTimer = setInterval(this.draw(),parseInt(1000 / this.MaxFPS));
			
			console.log("reset MaxFPS!(S2D.Engine)");		
		}
		
		if(inp.canvas){
			this.canvas = inp.canvas;
			this.context = this.canvas.getContext("2d");
			
			console.log("reset canvas!(S2D.Engine)");		
		}
		
		if(inp.showFPS != undefined) this.showFPS = inp.showFPS;
		
	};
	
	
	this.FramesDone = function(){
		
		this.FPS = this.__FramesDone;
		this.__FramesDone = 0 ;
		
	};
	
	
	this.draw = function(){
	
		if(this.context){
		
			this.__FramesDone++;
	
			this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
						
			this.context.save();
			
			// bg
			this.context.fillStyle = this.backgroundColor;  
						
			this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
			
			// FPS
			
			if(this.showFPS){
				this.context.fillStyle = "white";
				this.context.font = 'bold 15px sans-serif';   
				this.context.textBaseline = "top";   
				this.context.fillText("FPS:" + this.FPS, 0, 0);   
			}
			
			// Draw Content
			//----------------------------------------
			
			for(var i=0;i<this.scene.objects.length;i++){
				
				
				if(this.scene.objects[i]){
				
					if(this.scene.objects[i].speed.x != 0) this.scene.objects[i].x += (this.scene.objects[i].speed.x / this.maxFPS);
					if(this.scene.objects[i].speed.y != 0) this.scene.objects[i].y += (this.scene.objects[i].speed.y / this.maxFPS);
					
					if(this.scene.objects[i].onDraw) this.scene.objects[i].onDraw(this.context);
					if(this.scene.objects[i].onFrameUpdate) this.scene.objects[i].onFrameUpdate();
				}
				
			}
			
			this.scene.collitionDetect();
			
			
			//-----------------------------------------
			
			
			
			// end of drawing
			
			this.context.restore();
		
		}
	
	};
		
}

		S2D.Mouse = function(){
			this.x = 0;
			this.y = 0;
			this.parent = undefined;
		
			this.getMousePos = function(e){
			
				if (e.pageX != undefined && e.pageY != undefined) {
							x = e.pageX;
							y = e.pageY;
						}
						else {
							x = e.clientX + document.body.scrollLeft +
								document.documentElement.scrollLeft;
							y = e.clientY + document.body.scrollTop +
								document.documentElement.scrollTop;
						}
				
					this.parent.mouse.x = x - this.offsetLeft;
					this.parent.mouse.y = y - this.offsetTop;
				
			};
		
		};


	S2D.Scene = function (){
		
		
		this.objects = [];
		this.missles = [];
		this.width = 0;
		this.height = 0;
		
		
		this.appendObject = function (ob,zid) {
			
				if(!zid) zid=0;
			
				if(this.objects[zid]) {
				
					this.appendObject(ob,zid + 1);
				
				} else {
				
					this.objects[zid] = ob;
					this.objects[zid].id = zid;
					if(!this.objects[zid].parent) this.objects[zid].parent = this;
					
					console.log("appended new sprite!(S2D.Scene)");
					
					
				
				}
			
		};
		
		this.removeObject = function (did)	{
			delete this.objects[did];
		};
		
		
		this.appendMissle = function(ms){
			this.missles.push(ms);
			ms.id = this.missles.length - 1;
			ms.parent = this;
			
			console.log("Missle appended.(S2D.Scene)");
		};
		
		this.removeMissle = function(id){
			
			delete this.missles[id];
			
			console.log("Missle deleted(S2D.Scene)");
			
		};
		
		
		this.collitionDetect = function(){
			
						var TempCDSprites = [];
						var i=0, TempIndex = 0;
						
						while(i<this.objects.length){
							if(this.objects[i] && this.objects[i].isCollide){
								TempCDSprites[TempIndex] = this.objects[i];
								TempIndex++;
							}
							
							i++;
						}
						 
					
						for(var i=0;i<TempIndex;i++){
								
							if(TempCDSprites[i].x < 0 || (TempCDSprites[i].x + TempCDSprites[i].width) > this.width ){

								if(TempCDSprites[i].onCollideXEdge){
										TempCDSprites[i].onCollideXEdge();
								}
							}
								
							if(TempCDSprites[i].y < 0 || (TempCDSprites[i].y + TempCDSprites[i].height) > this.height ){
								
								if(TempCDSprites[i].onCollideYEdge){
										TempCDSprites[i].onCollideYEdge();
								}
							}
							
							
							
							for(var Ci=0;Ci<TempIndex;Ci++){
								if(Ci!=i){
									
									var XCollide = (Math.abs((TempCDSprites[i].x + TempCDSprites[i].width / 2) - 
										(TempCDSprites[Ci].x + TempCDSprites[Ci].width / 2)) <= 
										Math.abs((TempCDSprites[i].width + TempCDSprites[Ci].width) / 2) 
										);
									var YCollide = (Math.abs((TempCDSprites[i].y + TempCDSprites[i].height / 2) -
										(TempCDSprites[Ci].y + TempCDSprites[Ci].height / 2)) <=
										Math.abs((TempCDSprites[i].height + TempCDSprites[Ci].height) / 2)
										);
									
									
									if(XCollide && YCollide) {
										
										if(TempCDSprites[i].onCollided) TempCDSprites[i].onCollided(TempCDSprites[i],TempCDSprites[Ci]);

										TempCDSprites[i].notCollided = false;
										
									} else {
										TempCDSprites[i].notCollided = true;
									}
								}
							
						}
						
						
					}
			
		};
		
		
	};
	
	S2D.Speed = function(){
		
		this.x = 0;
		this.y = 0;
		
		this.setSpeed = function(s){
			if(s.x) this.x = s.x;
			if(s.y) this.y = s.y;
			
			console.log("Set Speed.(S2D.Speed)");
			
		};
		
		
	
	};
	
	
	
	S2D.Object2D = function(){
		
		this.name = undefined;
		this.id = undefined;
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;
		this.parent = undefined;
		this.childObjects = [];
		this.angel = 0;
		this.isCollide = false;
		this.visiable = true;
		this.notCollided = true;
		this.speed = new S2D.Speed();
		
		
		this.onFrameUpdate = undefined;
		
		this.onDraw = undefined;
		
		this.onIntersect = undefined;
		
		this.setPos = function(p){
		
			this.x = p.x;
			this.y = p.y;
		
		};
		
		this.onCollided = undefined;
		
		this.onCollideXEdge = undefined;
		
		this.onCollideYEdge = undefined;
		
		
	};
	
	S2D.Sprite = function(){
		
		S2D.Object2D.call(this);
		
		this.frames = [];
		this.currentFrame = 0;
		
		
		this.create = function(src){
			this.frames[0] = new Image();
			this.frames[0].src = src;
			
			this.width = this.frames[0].width;
			this.height = this.frames[0].height;
			
			console.log("New sprite created!(S2D.sprite)");
		};
		
		this.onDraw = function(ctx){
		
			if(this.frames[this.currentFrame].complete && this.visiable){
				
				ctx.drawImage(this.frames[this.currentFrame],this.x,this.y );
			}
		};
		
		this.appendFrame = function(src){
			var ___img = new Image();
			___img.src = src;
			
			this.frames.push (___img);
		};
		
		this.removeFrame = function(did){
			delete (this.frames[did]);
		};
		
		this.setPlayingFrame = function(f){
			
			if(!this.frames[f]) console.warn("frame " + f + "does not exist!(S2D.sprite)");
			
			this.currentFrame = f;
			
			this.width = this.frames[f].width;
			this.height = this.frames[f].height;
			
		};
		
		this.getImg = function(){
		
			return this.frames[this.currentFrame];
			
		};
		
	
	}
	
	S2D.Text = function (){
		
		S2D.Object2D.call(this);
		
		this.text = undefined;
		this.color = undefined;
		this.style = undefined;
		this.size = undefined;
		this.font = undefined;
		
		
		this.create = function(t) {
		
		if(t.text) this.text = t.text;
		if(t.color) this.color = t.color;
		if(t.style) this.style = t.style;
		if(t.size) this.size = t.size;
		if(t.font) this.font = t.font;
		
		console.log("TextObject setting done!(S2D.TextObject)");
		
		};
		
		this.setting = this.create;
		
		
		this.onDraw = function(ctx){
		
			if(this.visiable){
			
			ctx.fillStyle = this.color;
			ctx.font = this.style + " " + this.size + "px " + this.font;
			ctx.fillText(this.text,this.x,this.y);
			
			}
		
		}
	
	};
	
	S2D.Shape = function (){
		
		S2D.Object2D.call(this);
		
		var CIRCLE = 1, RECTANGLE = 2, LINE = 3;
		
		this.type = 0;
		this.shapeV = undefined;
		this.color;
		
		
		this.create = function(t){
			
			switch(t.type){
				
				case ("circle" || 1):
					this.type = 1;
					if(t.radius){
						this.width = t.radius;
					
					} else if(t.x1 && t.x2 && t.y1 && t.y2) {
						this.width = Math.sqrt(Math.pow((t.x2 - t.x1),2) + Math.pow((t.y2 - t.y1), 2))
					}
					
					this.height = this.width;
					this.x = t.x1;
					this.y = t.y1;
					
					break;
				case ("rectangle" || 2):
					this.type = 2;
					
					if(t.width && t.height){
						this.width = t.width;
						this.height = t.height;
					} else if(t.x1 && t.x2 && t.y1 && t.y2){
						this.width = Math.abs(t.x2 - t.x1);
						this.height = Math.abs(t.y2 - t.y1);
					}
					
					this.x = t.x1;
					this.y = t.y1;
					
					break;
				case ("line" || 3):
					this.type = 3;
					
					if(t.x1 && t.x2 && t.y1 && t.y2){
						this.width = Math.abs(t.x2 - t.x1);
						this.height = Math.abs(t.y2 - t.y1);
					}
					
					this.x = t.x1;
					this.y = t.y1;
					
					
					break;
			}
			
			this.color = t.color || "white";
			this.shapeV = t;
		
		};
		
		this.onDraw = function(ctx){
			
			switch(this.type){
			
				case CIRCLE:
					
						ctx.fillStyle=this.color;
						ctx.beginPath();
						ctx.arc(this.x,this.y,this.width,0,Math.PI*2,true);
						ctx.closePath();
						ctx.fill();
						break;
				case RECTANGLE:
					
						ctx.fillStyle=this.color;
						ctx.fillRect(this.x,this.y,this.width,this.height);
						break;
				
				case LINE:
				
						ctx.beginPath();
						ctx.moveTo(this.x,this.y);
						ctx.lineTo(this.shapeV.x2,this.shapeV.y2);
						ctx.strokeStyle = this.color;
						ctx.stroke();
						break;


			}
		
		};
		
		this.transform = function(t){
			
			switch(this.type){
				case 1:
					if(t.radius){
						this.width = t.radius;
					
					} else if(t.x1 && t.x2 && t.y1 && t.y2) {
						this.width = Math.sqrt(Math.pow((t.x2 - t.x1),2) + Math.pow((t.y2 - t.y1), 2))
					}
					
					this.height = this.width;
					this.x = t.x1;
					this.y = t.y1;
				break;
				
				case 2:
					if(t.width && t.height){
						this.width = t.width;
						this.height = t.height;
					} else if(t.x1 && t.x2 && t.y1 && t.y2){
						this.width = Math.abs(t.x2 - t.x1);
						this.height = Math.abs(t.y2 - t.y1);
					}
					
					this.x = t.x1;
					this.y = t.y1;
				break;
				
				case 3:
					if(t.x1 && t.x2 && t.y1 && t.y2){
						this.width = Math.abs(t.x2 - t.x1);
						this.height = Math.abs(t.y2 - t.y1);
					}
					
					this.x = t.x1;
					this.y = t.y1;
				break;
					
			}
		};
		
		
	};
	
	S2D.Missle = function (){
		
		
		this.id = undefined;
		this.missles = [];
		this.parent = undefined;
		this.autoRelease = true;
		this.x = 0;
		this.y = 0;
		this.speed = new S2D.Speed();
		
		
		this.setPos = function(p){
		
			this.x = p.x;
			this.y = p.y;
		
		};
		
		this.init = function(sprite,ar) {
		
			if(!ar) ar = true;
			
			this.autoRelease = ar;
			
			if(sprite.frames[0]){
			
				this.missles[0] = sprite;
				this.missles[0].name = "OriginMissleSprite";
				this.missles[0].parent = this;
				this.missles[0].visible = false;
		
			
				console.log("initialize complete!(S2D.Missle)");
			} else {
			
				console.warn("initialize faild!Object is not a sprite!(S2D.Missle)");
			}
		
		};
		
		this.create = function(num,func) {
			
			if(this.missles[0] && this.parent) {
			
				var ___created = 0;
				var ___mid = 0;
			
				while(___created < num){
				
					while(this.missles[___mid]){
				
							___mid++;
					}
				
					this.missles[___mid] = new S2D.Sprite();
					this.missles[___mid].create(this.missles[0].getImg().src);
					this.missles[___mid].name = "missle[" + this.id + "," + ___mid + "]"
					this.missles[___mid].parent = this;
					this.missles[___mid].x = this.x;
					this.missles[___mid].y = this.y;
					this.missles[___mid].speed.setSpeed({x: this.speed.x, y: this.speed.y});
				
				
					if(this.autoRelease) this.missles[___mid].onFrameUpdate = function(func){
			
						if(func) func();
				
						if ((this.x > this.parent.parent.width) || (this.x + this.width < 0)) this.parent.delete(___mid);
						if ((this.y > this.parent.parent.height) || (this.y + this.height < 0)) this.parent.delete(___mid);
			
					};
				
						this.parent.appendObject(this.missles[___mid]);
						___created++;
						
				}
			
				console.log("Created " + num + " new missles(S2D.Missle)");
			} else {
			
				console.warn("failed to create missles!not initialized yet or not appended to scene!(S2D.Missle)");
			}
			
		};
		
		this.delete = function (mid) {
			
			this.missles[mid].onFrameUpdate = undefined;
			
			delete this.missles[mid];
			this.missles[mid] = undefined;
			
			
			console.log("Deleted missle(S2D.Missle)");
		};
		
		
		this.setOnCollidedEvent = function(func) {
			
			for(var i=1;i<this.missles.length;i++){
				
				this.missles[i].isCollide = true;
				
				if(func.Y || func.onCollideYEdge) this.missles[i].onCollideYEdge = func.Y || func.onCollideYEdge;
				if(func.X || func.onCollideXEdge)	this.missles[i].onCollideXEdge = func.X || func.onCollideXEdge;
				if(func.Object || func.onCollided)	this.missles[i].onCollided = func.Object || func.onCollided;
				
				console.log("Event binded!(S2D.missle)");
			}
		
		};
		
	
	};
	
	
	S2D.Event = function(Engine){
		
		this.parent = Engine;
		
		this.addEvent = function(ev,func){
			
			console.log("New event has been added: " + ev + "(S2D.Event)");
		
			switch(ev){
			
				case "onkeydown","keydown":
							
					document.getElementsByTagName("body")[0].onkeydown = func;
					break;
				
				case "onkeyup","keyup":
				
					document.getElementsByTagName("body")[0].onkeyup = func;
					break;
						
				case "onkeypress","keypress":
							
					document.getElementsByTagName("body")[0].onkeypress = func;
					break;
					
				default :
					this.parent.canvas.addEventListener(ev, func, false);
			
			};
		
		};
	
	};
	
	



