function autoPlay(){
         timer1=setInterval( function(){
          if(index==5)
      {
        index=1;
      $("ul li").eq(4).fadeOut();
      $("ul li").eq(0).fadeIn(1000);
      }
      else{
    $("ul li").eq((index-1)).fadeOut().next().fadeIn(1000);
      index+=1;
      }
      showButtonFade();

      },2000);
         function showButtonFade(){
      $("#buttons span").eq((index-1)).addClass("on").siblings().removeClass("on");
         }
    }
