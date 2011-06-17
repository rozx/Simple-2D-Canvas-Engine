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
				
				
				this.InitTimer = function (DirectorElementName){
				
					setInterval(DirectorElementName + ".CountFPS()", 1000);
					setInterval(DirectorElementName + ".Draw()", parseInt(1000 / this.MaxFPS));
					
				}
				
				
				this.SetCanvas = function(ElementCanvas){
					this.Canvas = ElementCanvas;
					this.Context = ElementCanvas.getContext("2d");
					
					this.Scene.Width = this.Canvas.width;
					this.Scene.Height = this.Canvas.height;
					
					
					
					console.log("Canvas Setting Done!");
					console.log(this.Context);
				};
				
				this.SetShowFPS = function (IsShow){
					this.ShowFPS = IsShow;
				};
				
				this.OnMouseMove = function(func){
					
					this.Canvas.addEventListener("mousemove",func);
					
				};
				
				
				this.GetMousePosXY= function(e){
				
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
				
					this.Scene.Mouse.X = x - this.Canvas.offsetLeft;
					this.Scene.Mouse.Y = y - this.Canvas.offsetTop;
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
					
						if(this.Scene.isCollideDetct)	this.Scene.CollideDetect();
							
					
					
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
				this.isCollideDetct = true;
				
				this.Mouse = function(){
					this.X = undefined;
					this.Y = undefined;
					this.width = 32;
					this.height = 32;
				};
				
				
				this.CollideDetect = function(){
					
						var TempCDSprites = [];
						var i=0, TempIndex = 0;
						
						while(i<this.Sprites.length){
							if(this.Sprites[i] && this.Sprites[i].isCollide){
								TempCDSprites[TempIndex] = this.Sprites[i];
								TempIndex++;
							}
							
							i++;
						}
						 
					
						for(var i=0;i<TempIndex;i++){
								
							if(TempCDSprites[i].x < 0 || (TempCDSprites[i].x + TempCDSprites[i].Width) > this.Width ){
									
									
								if(TempCDSprites[i].OnCollideXEdge){
									TempCDSprites[i].OnCollideXEdge();
								}
							}
								
							if(TempCDSprites[i].y < 0 || (TempCDSprites[i].y + TempCDSprites[i].Height) > this.Height ){
								
								if(TempCDSprites[i].OnCollideYEdge){
									TempCDSprites[i].OnCollideYEdge();
								}
							}
							
							
							
							for(var Ci=0;Ci<TempIndex;Ci++){
								if(Ci!=i){
									
									var XCollide = (Math.abs((TempCDSprites[i].x + TempCDSprites[i].Width / 2) - 
										(TempCDSprites[Ci].x + TempCDSprites[Ci].Width / 2)) < 
										Math.abs((TempCDSprites[i].Width + TempCDSprites[Ci].Width) / 2) 
										);
									var YCollide = (Math.abs((TempCDSprites[i].y + TempCDSprites[i].Height / 2) -
										(TempCDSprites[Ci].y + TempCDSprites[Ci].Height / 2)) <
										Math.abs((TempCDSprites[i].Height + TempCDSprites[Ci].Height) / 2)
										);
									
									
									if(XCollide && YCollide) {
										if(TempCDSprites[i].OnCollided) TempCDSprites[i].OnCollided(TempCDSprites[Ci]);
									}
									
									
							}
							
						}
						
						
					}
				};
				
				this.appendSprite = function(Sprite,Zid){
					if(this.Sprites[Zid]){
						this.appendSprite(Sprite,Zid + 1);
						
					} else {
						this.Sprites[Zid] = Sprite; 
						this.Sprites[Zid].Zid = Zid;
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
				
				this.Zid = undefined;
				this.id = undefined;
				this.SpriteType = undefined;
				
				this.isCollide = false;
				
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
				
				this.OnCollided = undefined;
				
				
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
				};
				
				this.SetText = function(txt) {
					this.Text = txt;
					this.Width = parseInt((txt.length * this.Size) / 2);
				};
				
				
				
				
			}
			
			
			function RectInsects(Rect1,Rect2){
				
				
			};