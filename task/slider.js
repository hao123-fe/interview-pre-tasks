function slider(){
   var container=document.getElementById("container");
   var list=document.getElementById("list");
   var buttons=document.getElementById("buttons").getElementsByTagName("span");
   var prev=document.getElementById("prev");
   var next=document.getElementById("next");
 function showButton(){
   for( var i=0;i<buttons.length ; i++){
     if(buttons[i].className="on")
     {
       buttons[i].className='' ;
     }
     buttons[index-1].className="on";
   }
   }
  for(var i=0;i<buttons.length; i++)
         buttons[i].onclick=function(){
       if(this.className=="on"){
         return;}
         var myindex=parseInt(this.getAttribute("index"));
         var offset=-400*(myindex-index);
         animate(offset);
         index=myindex;
         showButton();



     }


  function animate(offset){
  var newleft=parseInt(list.style.left) + offset;
   var time=400;
   var interval=10;
   var hoop=time/interval;
   var speed=offset/hoop;
   var newleft=parseInt(list.style.left) + offset;
    function go(){
      if((speed < 0 && parseInt(list.style.left)  >  newleft  ) ||  (speed > 0 && parseInt(list.style.left)  < newleft )){

           list.style.left=parseInt(list.style.left)  + speed +"px";
           setTimeout(go,10);
      }
        else{
            list.style.left=newleft +"px";
     if(newleft<-2000){
       list.style.left= -400 + "px";
     }
     if(newleft>-400){
       list.style.left= -2000 + "px";
     }

        }
    }
    go();

    }

   next.onclick=function(){
     if(index==5)
     {
       index=1;
     }
     else{
     index+=1;
     }

     showButton();
       animate(-400);


   }
   prev.onclick=function(){
     if(index==1)
     {
       index=5;
     }
     else{
     index-=1;
     }
     showButton();
        animate(400);

   }

 }
