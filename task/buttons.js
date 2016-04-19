  $("#buttons span").each(function(){
      $(this).click(function(){
       var myIndex=$(this).attr("index");
       $("ul li").fadeOut();
       $("ul li").eq((myIndex-1)).fadeIn(1000);
       index=myIndex;
       showButtonFade();
        });
        });
