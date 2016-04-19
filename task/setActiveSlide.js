  function setActiveSlide() {
    index=1;
    timer1=1;
    timer2=2;
$("#lunbo").click(function(){
   clearInterval(timer1);
   clearInterval(timer2);
     $("div").remove("#list");
     var newlist=$("<div id='list' style='left:-400px' ><img src='5.png'><img src='1.png'><img src='2.png'><img src='3.png'><img src='4.png'><img src='5.png'><img src='1.png'></div>");
     $("#container").prepend(newlist);
     $("#auto").click(function(){
      clearInterval(timer1);
        clearInterval(timer2);
        autoSlider();
        })
     $("#click").click(function(){
        clearInterval(timer1);
        clearInterval(timer2);
            slider();
     })
     });
$("#fade").click(function(){
        clearInterval(timer1);
        clearInterval(timer2);
  $("div").remove("#list");
      var newlist=$("<div id='list' ><ul><li><img  src='1.png'></li><li><img src='2.png'></li><li><img  src='3.png'></li><li><img src='4.png'></li><li><img  src='5.png'></li></ul></div>");
      $("#container").prepend(newlist);
       $("#auto").click(function(){
        clearInterval(timer1);
        clearInterval(timer2);
         autoPlay();
     })
     $("#click").click(function(){
        clearInterval(timer1);
        clearInterval(timer2);
            noAuto();

     })
 })
}
  $(document).ready(function(){

    setActiveSlide();
})
