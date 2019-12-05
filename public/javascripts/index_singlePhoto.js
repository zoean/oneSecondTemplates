function photoAnimate(){
  var photoCount = 3,//照片数量
      photoIndex = 0,//照片索引
      tempCount = 5,//动效数量
      photoWrap = $(".animat_photo ul"),//外容器      
      timer,
      ulStr;//定时器 
    ulStr='<li class="odd"><span><img src="img/images/pic5.png" alt=""></span></li><li class="odd"><span><img src="img/images/pic6.png" alt=""></span></li><li class="odd"><span><img src="img/images/pic7.png" alt=""></span></li>';
    photoWrap.html(ulStr); 
    var photoObj = photoWrap.find("li");//照片操作对象
  //单张照片动画
  function singlePhoto(){
    var animiteId = parseInt(Math.random()*tempCount);//随机动作ID共4个
    var objClass = 'singlePhoto-' + animiteId;
    photoObj.eq(photoIndex).children('span').attr('class',objClass);
    photoIndex++;   
    if(photoIndex >= photoCount){
      photoIndex = 0; 
      clearInterval(timer);
      setTimeout(function (){
        singlePhoto();
        start();
      },9000);
    }
  }
  singlePhoto()
  start();
  function start(){
    clearInterval(timer);
    timer = setInterval(function(){
      singlePhoto();
    },9000);
  }
  //两张照片动画
  // function doublePhoto(){

  // }
}
photoAnimate();

function playMusic(){
  var onOff = true;  
  var bgMusic = $("#bgMusic");
  var bgMusicControl = $(".bgMusicControl");
  bgMusicControl.bind("touchstart",function (e){
    if(onOff == true){
      onOff = false;
      $(this).addClass("bgMusicPause");
      bgMusic.pause();
    }else{
      onOff = true;
      $(this).removeClass("bgMusicPause");
      bgMusic.play();
    }
  });  
}
playMusic();