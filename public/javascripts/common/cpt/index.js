var photoAnimateTemp = {
  photoCount: $("#animat_photo ul").attr("long"),//照片数量
  photoIndex: 0,//照片索引
  photoNextIndex: 1,//下一张照片索引
  singleAnimateCount: 5,//单张照片动效数量
  doubleAnimateCount: 3,//双张照片动效数量
  singleAnimateClass: "photo singlePhoto-",//单张照片动画 class 前缀
  doubleAnimateClass: ["photo doublePhotoFirst-","photo doublePhotoSecond-"],//双张动画 Class 前缀
  photoWrap: document.getElementById("animat_photo").getElementsByTagName("ul")[0],//外容器
  singleDoubleId:"",//单双张随机变量   0单张 1双张
  timer:"",//定时器  
  ulStr:"",
  saveImgSrc : $('#saveImgSrc').find('li'),
    saveSingleDoubleId:'',//保存上次动效是一张还是双张
    singleAnimateId:0, //上次单张动画id
    doubleAnimateId:0,// 上次双张动画id
    imgarr:'',
  init:function (){
    //console.log(this.photoCount)
      var that = this;
      var imgArr = []
      $.getJSON('https://cgi.guagua.cn/post/info?id='+tempId+'&callback=?',function(data){
          console.log(data);
          for(var i = 0; i < data.content.list.length; i++){
              imgArr.push(data.content.list[i].resUrl+"!viewWidth");
          }
          that.imgarr = imgArr;
          that.randomPhoto();
          that.loadImg();
      })
  },
    loadImg:function(){
        var saveImgSrc = $('#saveImgSrc');
        var loopNum = 0;
        loadimg(loopNum,that.imgarr.length);
        function loadimg(num,length){
            if(num < length){
                saveImgSrc.append('<li><img id="imgLoad'+num+'" src='+that.imgarr[num]+' alt=""> </li>');
                var loadImgEle = saveImgSrc.find('li').eq(num).find('img');
                loadImgEle.load(function(){
                    loopNum++;
                    console.log('图片下载完成');
                    loadimg(loopNum,that.imgarr.length);
                })
            }else{
                return;
            }
        }
    },
  randomPhoto:function(){
    //单张动效随机ID--0、1、2、3、4 共5个
    //var singleAnimateId = parseInt(Math.random()*(this.singleAnimateCount));
    //双张动效随机ID--0、1、2 共3个
    //var doubleAnimateId = parseInt(Math.random()*(this.doubleAnimateCount));


    var liObj = this.photoWrap.getElementsByTagName("li");
    var spanObj = $('.photo');
    //如果照片总数是1 运行单张动效
    if(this.photoCount == 1){
      this.singleDoubleId = 0;
    }else{
        this.singleDoubleId = parseInt(Math.random()*2);//0单张 1双张
    }
      spanObj.eq(0).find('img').attr('src','');
      spanObj.eq(1).find('img').attr('src','');
      spanObj.eq(0).attr('style','height:4rem;padding:0;');
      spanObj.eq(1).attr('style','height:4rem;padding:0;');

    if(this.singleDoubleId == 0){//单张
        var loadimg = $('#loadimgWrap').find('img').eq(0)[0];
        if(this.saveSingleDoubleId == ''){
            spanObj.eq(0).attr('class',this.singleAnimateClass+''+this.singleAnimateId);
            var loadImgSrc = this.imgarr[this.photoIndex];
            console.log(this.imgarr)
            console.log(this.photoIndex)

            console.log(loadImgSrc)
            loadimg.src = loadImgSrc;
            loadimg.setAttribute('class','loadimg');
            loadimg.onload = function(){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc);
            }
            // spanObj.eq(0).attr('style','height:auto;padding:0;');
            this.saveSingleDoubleId = 1;
        }else if(this.saveSingleDoubleId == 2){
            this.photoIndex = this.photoIndex + 2
            this.photoIndex = this.photoIndex%(this.photoCount);
            spanObj.eq(0).attr('class',this.singleAnimateClass+''+this.singleAnimateId);
            var loadImgSrc = this.imgarr[this.photoIndex];
            loadimg.src = loadImgSrc;
            loadimg.setAttribute('class','loadimg');
            if(loadimg.complete){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc);
            }
            loadimg.onload = function(){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc);
            }
            this.saveSingleDoubleId = 1;
        }else if(this.saveSingleDoubleId == 1){
            this.photoIndex++;
            this.photoIndex = this.photoIndex%(this.photoCount);
            spanObj.eq(0).attr('class',this.singleAnimateClass+''+this.singleAnimateId);
            var loadImgSrc = this.imgarr[this.photoIndex];

            loadimg.src = loadImgSrc;
            loadimg.setAttribute('class','loadimg');
            if(loadimg.complete){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc);
            }
            loadimg.onload = function(){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                //console.log('ooo')
                spanObj.eq(0).find('img').attr('src',loadImgSrc);
            }
            // if(loadimg.complete){
            //     console.log('ccc')
            //     spanObj.eq(0).find('img').attr('src',loadImgSrc);
            //     spanObj.eq(0).height('auto')
            //     // spanObj.eq(0).attr('style','height:auto;padding:0;')
            // }else{
            //
            // }
            this.saveSingleDoubleId = 1;
        }
        // spanObj.eq(0).height('4rem')

        this.singleAnimateId++;
        if(this.singleAnimateId == 5){
            this.singleAnimateId = 0
        }
      clearInterval(this.timer);
      that = this;
      setTimeout(function (){
        that.randomPhoto();
        that.start();
      },8000);
    }else{
        var loadimg_1 = $('#loadimgWrap').find('img').eq(0)[0];
        var loadimg_2 = $('#loadimgWrap').find('img').eq(1)[0];

        if(this.saveSingleDoubleId == ''){//第一次动画如果是双张时
            this.photoIndex = this.photoIndex%(this.photoCount);
            this.photoNextIndex=this.photoIndex+1;
            this.photoNextIndex = this.photoNextIndex%(this.photoCount);
            //决定是哪个动效
            spanObj.eq(0).attr('class','').attr('class',this.doubleAnimateClass[0]+''+this.doubleAnimateId);
            spanObj.eq(1).attr('class','').attr('class',this.doubleAnimateClass[1]+''+this.doubleAnimateId);

            var loadImgSrc_1 = this.imgarr[this.photoIndex];
            var loadImgSrc_2 = this.imgarr[this.photoNextIndex];
            console.log(this.imgarr)
            console.log(this.photoIndex);
            console.log(this.photoNextIndex)
            loadimg_1.src = loadImgSrc_1;
            loadimg_2.src = loadImgSrc_2;
            loadimg_1.setAttribute('class','loadimg');
            loadimg_2.setAttribute('class','loadimg');
            loadimg_1.onload = function(){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc_1);
            }
            loadimg_2.onload = function(){
                spanObj.eq(1).attr('style','height:auto;padding:0;')
                spanObj.eq(1).find('img').attr('src',loadImgSrc_2);
            }


            this.saveSingleDoubleId = 2;
        }else if(this.saveSingleDoubleId == 2){//上次动画是双张时
            this.photoIndex = this.photoIndex + 2;
            this.photoIndex = this.photoIndex%(this.photoCount);
            this.photoNextIndex=this.photoIndex+1;
            this.photoNextIndex = this.photoNextIndex%(this.photoCount) ;
            //决定是哪个动效
            spanObj.eq(0).attr('class','').attr('class',this.doubleAnimateClass[0]+''+this.doubleAnimateId);
            spanObj.eq(1).attr('class','').attr('class',this.doubleAnimateClass[1]+''+this.doubleAnimateId);

            var loadImgSrc_1 = this.imgarr[this.photoIndex];
            var loadImgSrc_2 = this.imgarr[this.photoNextIndex];
            loadimg_1.src = loadImgSrc_1;
            loadimg_2.src = loadImgSrc_2;
            loadimg_1.setAttribute('class','loadimg');
            loadimg_2.setAttribute('class','loadimg');
            if(loadimg_1.complete){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc_1);
                // spanObj.eq(0).attr('style','height:auto;padding:0;');
            }
            loadimg_1.onload = function(){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc_1);
                // spanObj.eq(0).attr('style','height:auto;padding:0;');
                // spanObj.eq(0).height('auto');
            }

            if(loadimg_2.complete){
                spanObj.eq(1).attr('style','height:auto;padding:0;');
                spanObj.eq(1).find('img').attr('src',loadImgSrc_2);

            }
            loadimg_2.onload = function(){
                spanObj.eq(1).attr('style','height:auto;padding:0;');
                spanObj.eq(1).find('img').attr('src',loadImgSrc_2);
                // spanObj.eq(1).height('auto');
            }
            this.saveSingleDoubleId = 2;
        }else if(this.saveSingleDoubleId == 1){//上次动画是单张时
            this.photoIndex++;
            this.photoIndex = this.photoIndex%(this.photoCount);
            this.photoNextIndex=this.photoIndex+1;
            this.photoNextIndex = this.photoNextIndex%(this.photoCount) ;

            //决定是哪个动效
            spanObj.eq(0).attr('class','').attr('class',this.doubleAnimateClass[0]+''+this.doubleAnimateId);
            spanObj.eq(1).attr('class','').attr('class',this.doubleAnimateClass[1]+''+this.doubleAnimateId);


            var loadImgSrc_1 = this.imgarr[this.photoIndex];
            var loadImgSrc_2 = this.imgarr[this.photoNextIndex];
            loadimg_1.src = loadImgSrc_1;
            loadimg_2.src = loadImgSrc_2;
            loadimg_1.setAttribute('class','loadimg');
            loadimg_2.setAttribute('class','loadimg');
            if(loadimg_1.complete){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc_1);
                // spanObj.eq(0).attr('style','height:auto;padding:0;');
            }
            loadimg_1.onload = function(){
                spanObj.eq(0).attr('style','height:auto;padding:0;');
                spanObj.eq(0).find('img').attr('src',loadImgSrc_1);
                // spanObj.eq(0).attr('style','height:auto;padding:0;');
                // spanObj.eq(0).height('auto')
            }

            if(loadimg_2.complete){
                spanObj.eq(1).attr('style','height:auto;padding:0;');
                spanObj.eq(1).find('img').attr('src',loadImgSrc_2);
                // spanObj.eq(1).attr('style','height:auto;padding:0;')
            }
            loadimg_2.onload = function(){
                spanObj.eq(1).attr('style','height:auto;padding:0;');
                spanObj.eq(1).find('img').attr('src',loadImgSrc_2);
                // spanObj.eq(1).attr('style','height:auto;padding:0;')
                // spanObj.eq(1).height('auto')
            }
            // spanObj.eq(0).attr('style','height:auto;padding:0;');
            // spanObj.eq(1).attr('style','height:auto;padding:0;')
            this.saveSingleDoubleId = 2;
        }
        this.doubleAnimateId++;
        if(this.doubleAnimateId == 3){
            this.doubleAnimateId = 0
        }

      // this.photoIndex=this.photoNextIndex;
      clearInterval(this.timer);
      that = this;
      setTimeout(function (){
        // spanObj.eq(0).find('img').attr('src','images/static.png');
        // spanObj.eq(1).find('img').attr('src','images/static.png');
        that.randomPhoto();
        that.start();
      },8000); 
    }
  },
  start:function(){
    clearInterval(this.timer);
    that = this;
    this.timer = setInterval(function(){
      that.randomPhoto();
    },8000);
  }
};
photoAnimateTemp.init();