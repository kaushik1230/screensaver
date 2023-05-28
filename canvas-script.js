window.onload=function(){
    var canvas=document.getElementById("chart");
    var context=canvas.getContext("2d");

    var maxRadius=40;
    var noOfBall=2000;
    canvas.width=window.innerWidth;   
    canvas.height=window.innerHeight;

    var mouse={
        x:undefined,
        y:undefined
    }

    var colorArray=[
        '#F23D5E',
        '#306073',
        '#639AA6',
        '#B4D2D9',
        '#8C6330',
    ];

    window.addEventListener('mousemove',function(event)
    {
        mouse.x=event.x;
        mouse.y=event.y;
       
    })

    window.addEventListener('resize',function(){
        canvas.width=window.innerWidth;   
        canvas.height=window.innerHeight;

        init();
    });
    

    function Circle(x,y,dx,dy,radius){
        this.x=x;
        this.y=y;
        this.dx=dx;
        this.dy=dy;
        this.radius=radius;
        this.minRadius=radius;
        this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
        this.draw=function(){
            context.beginPath();
            context.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
            context.fillStyle=this.color;
            context.fill();
        }
        this.update=function(){
            if(this.x+this.radius>innerWidth||this.x-this.radius<0)
            {
                this.dx=-this.dx;
            }
            if(this.y+this.radius>innerHeight||this.y-this.radius<0)
            {
                this.dy=-this.dy;
            }
            this.x+=this.dx;
            this.y+=this.dy;

            //interactivity
            if(mouse.x-this.x<50 && mouse.x-this.x>-50
                && mouse.y-this.y<50 && mouse.y-this.y>-50){
                    if(this.radius<maxRadius)
                    {
                    this.radius+=1;
                    }
            }else if( this.radius>this.minRadius)
            {
             this.radius-=1;
            }
        }
    }
    var circleArray=[];
    for(var i=0;i<noOfBall;i++)
    {
     var radius=Math.random()*3+1;
     var x=Math.random()*(innerWidth-radius*2)+radius;
    
     var y=Math.random()*(innerHeight-radius*2)+radius;
    
     var dx=(Math.random()-0.5);
     var dy=(Math.random()-0.5);
     
     circleArray.push(new Circle(x,y,dx,dy,radius));
    }
    function init(){
        
        circleArray=[];
        for(var i=0;i<noOfBall;i++)
        {
         var radius=Math.random()*3+1;
         var x=Math.random()*(innerWidth-radius*2)+radius;
        
         var y=Math.random()*(innerHeight-radius*2)+radius;
        
         var dx=(Math.random()-0.5);
         var dy=(Math.random()-0.5);
         
         circleArray.push(new Circle(x,y,dx,dy,radius));
        }
    }

   
  
    function animate(){
       
      context.clearRect(0,0,innerWidth,innerHeight);
        
      for(var i=0;i<noOfBall;i++)
      {
       
        circleArray[i].update();
        circleArray[i].draw();
      }
      requestAnimationFrame(animate);
    }
    animate();
    init();
}