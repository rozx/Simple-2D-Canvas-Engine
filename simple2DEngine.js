			function Director(){
				this.MaxFPS = 60;
				this.ShowFPS = true;
				this.Scene = new Scene();
				this.Canvas = undefined;
				this.Context = undefined;
				this.FPS = 0;
				this.FramesDone = 0;
				
				this.initTimer = function (DirectorElementName){
				
					setInterval(DirectorElementName + ".CountFPS()", 100);
					setInterval(DirectorElementName + ".Draw()", parseInt(100 / this.MaxFPS));
					
				}
				
				
				this.setCanvas = function(ElementCanvas){
					this.Canvas = ElementCanvas;
					this.Context = ElementCanvas.getContext("2d");
					
					console.log("Canvas Setting Done!");
					console.log(this.Context);
				};
				
				this.setShowFPS = function (IsShow){
					this.ShowFPS = IsShow;
				};
				
				this.Draw = function(){
					this.FramesDone++;
					
					if(this.Context){

					
					
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
								this.Context.drawImage(this.Scene.Sprites[i].img,this.Scene.Sprites[i].x,this.Scene.Sprites[i].y);
								//alert(this.Scene.Sprites[i].img);
							}
						}
						
					}  
				};
				
				this.CountFPS = function(){
					this.FPS = this.FramesDone;
					this.FramesDone = 0;
					
					//console.log("FPS:" + this.FPS);
				};
				
				
			}
			
			function Scene(){
				this.Sprites = [];
				
				this.appendSprite = function(Sprite,Zid){
					if(this.Sprites[Zid]){
						this.appednSprite(Sprite,Zid + 1);
						
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
				this.img = undefined;
				this.x = 0;
				this.y = 0;
				this.SpeedX = 0;
				this.SpeedY = 0;
				
				this.Create = function(id) {
					this.id = id;
				};
				
				this.SetPos = function(x,y){
					this.x = x;
					this.y = y;
				};
				
				
				this.CreateNewImg= function(src) {
				
					if(this.id){
				
						var MyBody = document.getElementsByTagName("body")[0];
						var NewImg = document.createElement("img");
						NewImg.src=src;
						NewImg.width = 0;
						NewImg.height = 0;
						NewImg.id = this.id;
					
					
						MyBody.appendChild(NewImg);
					
						this.img = new Image();
						this.img.src = src;
					}
				};
			}
