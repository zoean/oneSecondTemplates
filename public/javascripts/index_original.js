function photoAnimate(){
  var photoCount = 7,//照片数量
      photoIndex = -1,//照片索引
      photoNextIndex = 1,//下一张照片索引
      singleAnimateCount = 5,//单张照片动效数量
      doubleAnimateCount = 3,//单张照片动效数量
      singleAnimateClass = "photo singlePhoto-",
      doubleAnimateClass = ["photo doublePhotoFirst-","photo doublePhotoSecond-"],
      photoWrap = $(".animat_photo ul"),//外容器
      singleDoubleId,//单双张随机变量   0单张 1双张   
      timer,//定时器
      ulStr; 
    ulStr='<li><span class="photo"><span class="filter"></span><img src="img/images/pic11.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic21.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic31.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic41.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic51.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic61.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic71.png" alt=""></span></li>';
    photoWrap.html(ulStr); 
  var photoObj = photoWrap.find("li");//照片操作对象
  function randomPhoto(){
    var singleAnimateId = parseInt(Math.random()*singleAnimateCount);
    //单张动效随机ID--0、1、2、3、4 共5个
    var doubleAnimateId = parseInt(Math.random()*doubleAnimateCount);
    //双张动效随机ID--0、1、2 共3个
    //var singleDoubleId = parseInt(Math.random()*2);//0单张 1双张
    //如果照片总数是1 运行单张动效
    if(photoCount == 1){
      singleDoubleId = 0;
    }else{
      singleDoubleId = parseInt(Math.random()*2);//0单张 1双张
    }
    //singleDoubleId = 0;
    if(singleDoubleId == 0){
      photoIndex++;
      photoIndex = photoIndex%(photoCount);
      photoObj.eq(photoIndex).children('span').attr('class',singleAnimateClass+''+singleAnimateId);
      //console.log(photoObj.eq(0).children('span').attr("class"));
      console.log(photoIndex);      
      clearInterval(timer);
      setTimeout(function (){
        randomPhoto();
        start();
      },7000);
    }else{
      photoIndex++;
      photoIndex = photoIndex%(photoCount);
      photoNextIndex=photoIndex+1;
      photoNextIndex = photoNextIndex%(photoCount) ;
      console.log(photoIndex+"--------"+photoNextIndex);
      photoObj.eq(photoIndex).children('span').attr('class',doubleAnimateClass[0]+''+doubleAnimateId);
      photoObj.eq(photoNextIndex).children('span').attr('class',doubleAnimateClass[1]+''+doubleAnimateId);
      //console.log(photoObj.eq(0).children('span').attr("class"));      
      //console.log(photoObj.eq(1).children('span').attr("class"));
      // photoIndex++;
      // photoNextIndex = photoIndex+1;
      // if(photoIndex = photoCount){
      //   photoIndex = 0;
      //   photoNextIndex = 1;        
      // } 
      // if(photoNextIndex = photoIndex) {
      //   photoIndex = 1;
      // }  
      photoIndex=photoNextIndex;
      clearInterval(timer);
      setTimeout(function (){
        randomPhoto();
        start();
      },7000); 
    }
  }
  randomPhoto();
  //单张照片动画
  // function singlePhoto(){
  //   var animiteId = parseInt(Math.random()*tempCount);//随机动作ID共4个
  //   var objClass = 'singlePhoto-' + animiteId;
  //   photoObj.eq(photoIndex).children('span').attr('class',objClass);
  //   photoIndex++;   
  //   if(photoIndex >= photoCount){
  //     photoIndex = 0; 
  //     clearInterval(timer);
  //     setTimeout(function (){
  //       singlePhoto();
  //       start();
  //     },9000);
  //   }
  // }

  // singlePhoto()
  start();
  function start(){
    clearInterval(timer);
    timer = setInterval(function(){
      randomPhoto();
    },7000);
  }
  //两张照片动画
  // function doublePhoto(){

  // }
}
photoAnimate();

// function playMusic(){
//   var onOff = true;  
//   var bgMusic = $("#bgMusic");
//   var bgMusicControl = $(".bgMusicControl");
//   bgMusicControl.bind("touchstart",function (e){
//     if(onOff == true){
//       onOff = false;
//       $(this).addClass("bgMusicPause");
//       bgMusic.pause();
//     }else{
//       onOff = true;
//       $(this).removeClass("bgMusicPause");
//       bgMusic.play();
//     }
//   });  
// }
// playMusic();