function  noAuto(){

 $("#next").click(function(){
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

      })

    $("#prev").click(function(){
      if(index==1)
      {
        index=5;
      $("ul li").fadeOut();
      $("ul li").eq(4).fadeIn(1000);
      }
      else{
    $("ul li").eq((index-1)).fadeOut().prev().fadeIn(1000);
      index-=1;
      }
      showButtonFade();
      })

    function showButtonFade(){
      $("#buttons span").eq((index-1)).addClass("on").siblings().removeClass("on");
         }
     $("#buttons span").each(function(){
      $(this).click(function(){
       var myIndex=$(this).attr("index");
       $("ul li").fadeOut();
       $("ul li").eq((myIndex-1)).fadeIn(1000);
       index=myIndex;
       showButtonFade();
        });
        });
   }
