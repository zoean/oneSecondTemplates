var photoAnimateTemp = {
  photoCount: 7,//照片数量
  photoIndex: 0,//照片索引
  photoNextIndex: 1,//下一张照片索引
  singleAnimateCount: 5,//单张照片动效数量
  doubleAnimateCount: 3,//双张照片动效数量
  singleAnimateClass: "photo singlePhoto-",//单张照片动画 class 前缀
  doubleAnimateClass: ["photo doublePhotoFirst-","photo doublePhotoSecond-"],//双张动画 Class 前缀
  photoWrap: document.getElementById("animat_photo").getElementsByTagName("ul")[0],//外容器
  singleDoubleId:"",//单双张随机变量   0单张 1双张   
  timer:"",//定时器
  musicOnOff:true,//音乐播放器开关
  ulStr:"",
  init:function (){
    //this.fillPhotos();
    this.randomPhoto();
    this.playMusic();
  },
  fillPhotos:function (){//填充照片
    ulStr='<li><span class="photo"><span class="filter"></span><img src="img/images/pic11.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic21.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic31.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic41.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic51.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic61.png" alt=""></span></li><li><span class="photo"><span class="filter"></span><img src="img/images/pic71.png" alt=""></span></li>';
    this.photoWrap.innerHTML = ulStr; 
  },
  randomPhoto:function(){
    //单张动效随机ID--0、1、2、3、4 共5个
    var singleAnimateId = parseInt(Math.random()*(this.singleAnimateCount));
    //双张动效随机ID--0、1、2 共3个
    var doubleAnimateId = parseInt(Math.random()*(this.doubleAnimateCount));    
    var liObj = this.photoWrap.getElementsByTagName("li");
    //如果照片总数是1 运行单张动效
    if(this.photoCount == 1){
      this.singleDoubleId = 0;
    }else{
      this.singleDoubleId = parseInt(Math.random()*2);//0单张动效 1双张动效
    }
    if(this.singleDoubleId == 0){//单张
      liObj[this.photoIndex].getElementsByTagName('span')[0].setAttribute('class',this.singleAnimateClass+''+singleAnimateId);
      this.photoIndex++;
      this.photoIndex = this.photoIndex%(this.photoCount);
      //console.log(photoObj.eq(0).children('span').attr("class"));
      //console.log(this.photoIndex);      
      clearInterval(this.timer);
      that = this;
      setTimeout(function (){
        that.randomPhoto();
        that.start();
      },7000);
    }else{
      this.photoIndex++;
      this.photoIndex = this.photoIndex%(this.photoCount);
      this.photoNextIndex=this.photoIndex+1;
      this.photoNextIndex = this.photoNextIndex%(this.photoCount) ;
      //console.log(this.photoIndex+"--------"+this.photoNextIndex);
      liObj[this.photoIndex].getElementsByTagName('span')[0].setAttribute('class',this.doubleAnimateClass[0]+''+doubleAnimateId);
      liObj[this.photoNextIndex].getElementsByTagName('span')[0].setAttribute('class',this.doubleAnimateClass[1]+''+doubleAnimateId);     
      this.photoIndex=this.photoNextIndex;
      clearInterval(this.timer);
      that = this;
      setTimeout(function (){
        that.randomPhoto();
        that.start();
      },7000); 
    }
  },
  start:function(){
    clearInterval(this.timer);
    that = this;
    this.timer = setInterval(function(){
      that.randomPhoto();
    },7000);
  },
  playMusic:function (){
    var musicObj = document.getElementById("bgMusic");
    var source = musicObj.getElementsByTagName("source")[0];
    var musicController = document.getElementById("bgMusicControl");
    var that = this;   
    musicObj.play();
    musicController.addEventListener('touchstart',function (e){
      if(that.musicOnOff){
        that.musicOnOff = false;
        musicController.className = "bgMusicPause";
        musicObj.pause();
      }else{
        that.musicOnOff = true;
        musicController.className = "bgMusicPlay";
        musicObj.play();
      }
    });
    // $(".bgMusicControl").bind('touchstart',function (e){
    //   console.log("before-----"+this.musicOnOff)
    //   if(this.musicOnOff==true){
    //     this.musicOnOff = false;
    //     $(this).addClass('bgMusicPause');
    //     musicObj.pause();
    //   }else{
    //     this.musicOnOff = true;
    //     $(this).removeClass('bgMusicPause');
    //     musicObj.play();
    //   }
    //   console.log("after-----"+this.musicOnOff)
    // });
  }  
};
photoAnimateTemp.init();