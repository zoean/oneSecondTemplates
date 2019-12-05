wx.miniProgram.getEnv(function(res) {
    console.log(res.miniprogram); // true
  });
window.onload = function(){
    loaded();
}

 var myScroll;
var scrollWrap = $('#wrapper')
  function loaded() {
    //console.log($('#inner'));
    //图片没有下载完成前，先显示默认图片
    var everyTime = 3;
    var imgObj = $('#inner ul li img');
    var imgCount = $('.showimg').length;
    var forLength = 0;//加载几轮照片
    var modNum = 0;//余数（最后一次加载几张照片）
    var startY = 0;
    var endY = 0;
    var curMod = 1;
    if(imgCount <= everyTime){
      setImgSrc(0,imgCount);
    }else{
      if(imgCount%everyTime == 0){//如果能整除
      forLength = imgCount/everyTime;
      }else{
        forLength = parseInt(imgCount/everyTime);
        modNum = imgCount%everyTime;
      }
      setImgSrc(0,everyTime);
    }     
    console.log('一共几轮'+ forLength);
    console.log('最后一轮几张' + modNum); 
    function setImgSrc(start,end){
      var i = start;
      if(i<end){
        var thisImgSrc = imgObj.eq([i]).attr('loadSrc');
        imgObj.eq([i]).attr('src',thisImgSrc);
        //imgObj.eq([i]).prev().html(thisImgSrc);
        imgObj.eq([i]).parent('div').attr('style',"height:auto");
        imgObj[i].onload = function(){
            i++;
            console.log('加载完成' + i);
            setImgSrc(i,end);            
            myScroll.refresh();
        }        
      }            
    }
    myScroll = new IScroll('#wrapper',{
      click: true,
      taps:true,
      preventDefault: true
    });
    myScroll.on('scrollStart',function (){
      startY = this.y;
    });
    myScroll.on('scrollEnd',function (){
      endY = this.y;
      if(startY > endY){
        console.log(forLength);
        if(curMod < forLength){//如果当前没到最后一轮
        console.log('第------'+curMod+'------轮');         
          //console.log(curMod * everyTime + '----------' + Number(curMod * everyTime + everyTime));
          setImgSrc(curMod * everyTime,Number(curMod * everyTime + everyTime));
          curMod++;                  
        }else{  //最后一轮或只有一轮
          console.log('最后一轮或只有一轮')        
          if(forLength !=0){//是最后一轮且不止一轮 
            if(modNum > 0){//如果余数不是0
              console.log('有余数的最后一轮'+　(curMod));
              console.log(curMod * everyTime + '------------'+Number(curMod * everyTime + modNum))
              setImgSrc(curMod * everyTime,Number(curMod * everyTime + modNum));
            }else{
              console.log('无余数的最后一轮' + (curMod));
            }            
          }else{//只有一轮就不再调用
            console.log('我就一波');
          }          
        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
      var audio = document.getElementById('bgMusic');
      audio.play();
      document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
      }, false);
    }
    audioAutoPlay();
  });