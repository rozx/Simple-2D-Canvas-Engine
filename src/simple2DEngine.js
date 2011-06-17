			var IMAGE = 0 , TEXT = 1;
			var MAXFPS = 120;
			
			function Director(){
				

				
				this.MaxFPS = MAXFPS;
				this.ShowFPS = true;
				this.Scene = new Scene();
				this.Canvas = undefined;
				this.Context = undefined;
				this.FPS = 0;
				this.FramesDone = 0;
				
				
				
				this.initTimer = function (DirectorElementName){
				
					setInterval(DirectorElementName + ".CountFPS()", 1000);
					setInterval(DirectorElementName + ".Draw()", parseInt(1000 / this.MaxFPS));
					
				}
				
				
				this.setCanvas = function(ElementCanvas){
					this.Canvas = ElementCanvas;
					this.Context = ElementCanvas.getContext("2d");
					
					this.Scene.Width = this.Canvas.width;
					this.Scene.Height = this.Canvas.height;
					
					console.log("Canvas Setting Done!");
					console.log(this.Context);
				};
				
				this.setShowFPS = function (IsShow){
					this.ShowFPS = IsShow;
				};
				
				this.Draw = function(){
					this.FramesDone++;
					
					if(this.Context){
						
						//Sprites Speed++
					
						for(var i=0;i<this.Scene.Sprites.length;i++){
							if(this.Scene.Sprites[i]){
								this.Scene.Sprites[i].x+= this.Scene.Sprites[i].SpeedX / this.MaxFPS;
								this.Scene.Sprites[i].y+= this.Scene.Sprites[i].SpeedY / this.MaxFPS;
							}
						}
						
					
						this.Context.fillStyle = "black";  
						
						this.Context.fillRect(0,0,this.Canvas.width,this.Canvas.height);
						
						if(this.ShowFPS){
						
							this.Context.fillStyle = "white";
							this.Context.font = 'bold 15px sans-serif';   
							this.Context.textBaseline = "top";   
							this.Context.fillText("FPS:" + this.FPS, 0, 0);   
						}
						
						for(var i=0;i<this.Scene.Sprites.length;i++){
							if(this.Scene.Sprites[i]){
								
								switch(this.Scene.Sprites[i].SpriteType){
									case IMAGE:
										if(this.Scene.Sprites[i].img.complete){
											this.Context.drawImage(this.Scene.Sprites[i].img,this.Scene.Sprites[i].x,this.Scene.Sprites[i].y);
										}
									break;
									
									case TEXT:
									this.Context.fillStyle = this.Scene.Sprites[i].Color;
									this.Context.font = this.Scene.Sprites[i].Style + " " + this.Scene.Sprites[i].Size + "px " + this.Scene.Sprites[i].Font;
									this.Context.fillText(this.Scene.Sprites[i].Text,this.Scene.Sprites[i].x,this.Scene.Sprites[i].y);
									
									break;
									//alert(this.Scene.Sprites[i].img);
								}
							}
						}
					// Call Collition detection method
						this.Scene.CollideDetect();
							
					
					
					}  
				};
				
				this.CountFPS = function(){
					this.FPS = this.FramesDone;
					this.FramesDone = 0;
					
					
					//console.log("FPS:" + this.FPS);
				};
				
				
				//Timer Setting
				//this.CountFPSTimer = setInterval(this.CountFPS(), 1000);
				//this.DrawTimer = setInterval(this.Draw(), parseInt(1000 / this.MaxFPS));
				
				
			}
			
			function Scene(){
				
				this.Width = undefined;
				this.Height = undefined;
				
				this.Sprites = [];
				
				
				this.CollideDetect = function(){
					
						for(var i=0;i<this.Sprites.length;i++){
							if(this.Sprites[i]){
								
								
								if(this.Sprites[i].x < 0 || (this.Sprites[i].x + this.Sprites[i].Width) > this.Width ){
									
									
									if(this.Sprites[i].OnCollideXEdge){
										this.Sprites[i].OnCollideXEdge();
									}
								}
								
								if(this.Sprites[i].y < 0 || (this.Sprites[i].y + this.Sprites[i].Height) > this.Height ){
									
									
									if(this.Sprites[i].OnCollideYEdge){
										this.Sprites[i].OnCollideYEdge();
									}
								}
						}
					};
				}
				
				this.appendSprite = function(Sprite,Zid){
					if(this.Sprites[Zid]){
						this.appendSprite(Sprite,Zid + 1);
						
					} else {
						this.Sprites[Zid] = Sprite; 
					
					}
					
				};
					
				this.getSpriteById = function(SpriteId){
					for(var i = 0; i<this.Sprites.length;i++){
						if(this.Sprites[i] && this.Sprites[i].id==SpriteId){
							{return this.Sprites[i]};
						}
					}
				};
				
				this.removeSpriteById = function(SpriteId){
					for(var i = 0; i<this.Sprites.length;i++){
						if(this.Sprites[i] && this.Sprites[i].id==SpriteId){
							this.Sprites[i] = undefined;
						}
					}
				}

			}
			
			function Sprite(){
				
				this.id = undefined;
				this.SpriteType = undefined;
				
				
				this.Width = undefined;
				this.Height = undefined;
				this.x = 0;
				this.y = 0;
				this.SpeedX = 0;
				this.SpeedY = 0;
				
				// For Text
				this.Text = undefined;
				this.Color = undefined;
				this.Font = undefined;
				this.Size = undefined;
				this.Style = undefined;
				
				// For Image
				
				this.img = undefined;
				
				//Collision detection
				
				this.OnCollideXEdge = undefined;
				this.OnCollideYEdge = undefined;
				
				
				this.Create = function(id) {
					this.id = id;
				};
				
				this.SetPos = function(x,y){
					this.x = x;
					this.y = y;
				};
				
				this.CreateNewText= function(text, font, color, size , style) {
					this.Color = color;
					this.Font = font;   
					//this.Context.textBaseline = "top";   
					this.Text = text;   
					this.SpriteType = TEXT;
					this.Size = size;
					this.Style = style;
					
					
					this.Width = parseInt((text.length * this.Size) / 2);
					this.Height = this.Size;
				}
				
				
				this.CreateNewImg= function(src) {
				
					if(this.id){
						
						/*
						
						var MyBody = document.getElementsByTagName("body")[0];
						var NewImg = document.createElement("img");
						
						
						NewImg.id = this.id;
						NewImg.src=src;		
						
						NewImg.width = 0;
						NewImg.height = 0;
					
						MyBody.appendChild(NewImg);
						*/
						
						
						this.img = new Image();
						this.img.src = src;
						
						this.img.onload =this.ImageFinishLoading(this.img.width,this.img.height);
						this.SpriteType = IMAGE;
					}
				};
				
				this.ImageFinishLoading = function(w,h){
					
						this.Width = w;
						this.Height = h;
						
						console.log(w + ":" + h);
				};
				
				
				this.SetSpeed = function(SpeedX,SpeedY) {
					this.SpeedX = SpeedX;
					this.SpeedY = SpeedY;
				}
				
				
			}
