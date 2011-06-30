/*
		===================================
		=				Simple 2D Engine					=
		=				Author : Rozx							=
		=				Version 0.1								=
		===================================
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
	
	
	// Timers
	
	this.FPSTimer = undefined;
	this.drawTimer = undefined;
	
	// Objects
	
	
	// Functions
	

	this.init2D = function(canvas) {
		
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.scene = new S2D.Scene();
		
		
		if(!this.context) console.warn("Fail to initialize context , Sorry : <");
		
		console.log("initialize complete!(S2D.Engine)");	

	};
	
	this.initTimer = function(en) {
	
		this.FPSTimer = window.setInterval(en + ".FramesDone()",1000);
		this.drawTimer = window.setInterval(en + ".draw()",parseInt(1000 / this.maxFPS));
		
	};
	

	
	this.setting = function(inp){
		
		if(inp.backgroundColor) this.backgroundColor = inp.backgroundColor;
		if(inp.MaxFPS) {
			this.MaxFPS = inp.MaxFPS;
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


	S2D.Scene = function (){
		
		
		this.objects = [];
		
		this.appendObject = function (ob,zid) {
			
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
			delete this.Objects[did];
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
										
												if(TempCDSprites[i].OnCollided) TempCDSprites[i].onCollided(TempCDSprites[i],TempCDSprites[Ci]);

										TempCDSprites[i].notCollided = false;
									} else {
										TempCDSprites[i].notCollided = true;
								}
									
									
							}
							
						}
						
						
					}
			
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
		
	
	}
	
	S2D.TextObject = function (){
		
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



