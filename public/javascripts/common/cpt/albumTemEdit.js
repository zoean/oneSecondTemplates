//viewType 0 edit 1 preview 2 share  xudongming
//编辑
var albumTempEdit = {
	albumId:queryString("id"),
	albumType:albumType,//相册类型
	wrapObj:$(".tem_wrap"),//父级元素
	editBarStr : '<ul id="albumEdit"><li><span>模板</span></li><li><span>音乐</span></li><li><span>添加</span></li><li><span>保存</span></li></ul>',//编辑导向条html
	editSubObj:"",//编辑item 0 模板 1音乐 2添加 3保存
	editTempStr : '<div id="editTemp" class="editItem"><s class="close"></s><div id="tempWrap"><ul></ul></div></div>',//编辑模板
	editMusicStr : '<div id="editMusic" class="editItem"><s class="close"></s><div id="musicWrap"><ul></ul></div></div>',//编辑音乐
	tempUrl:"https://cgi.guagua.cn/template/list?jsonp=?",//模板接口
	musicUrl:"https://cgi.guagua.cn/song/list?jsonp=?",//音乐接口
	updateUrl:"https://cgi.guagua.cn/post/update",
	albumUrl:"https://cgi.guagua.cn/post/info?jsonp=?",
	musicWrapHeight:"0",//音乐列表高度
	musicWrapBaseHeight:"1.8",//单位rem    
	curTempId:selectTemplateId,//当前模板ID
	curMusicId:selectSongId,//当前背景乐ID
	templateId:queryString("templateId"),
	tempMusicId:queryString("tempMusicId"),
	musicOnOff:true,//音乐播放器开关，默认播放
	musicObj:$("#bgMusic")[0],
	musicController:$("#bgMusicControl")[0],
	init:function (){
		var that = this;
		this.getAlbumInfo();
		this.wrapObj.append(this.editBarStr);//相册编辑条
		this.wrapObj.append(this.editTempStr);//模板编辑
		this.wrapObj.append(this.editMusicStr);//音乐编辑
		if(that.albumType == 0){			
      var myScrollTemp;
		}
		//点任意位置关闭选模板、选音乐面板
		$(document).click(function (){
			console.log(that.albumType)
			if(that.albumType == 0){
                $('#wrapper').css({
                    'overflow':'auto'
                })
				myScroll.enable();   //-----------------------启用iscroll
				myScroll.refresh();
			}   
    	$("#editTemp").animate({
          height:"0rem",
          opacity:"0"
      });
      $('#editMusic').animate({
          height:"0rem",
          opacity:"0"
      });
    });
		this.editSubObj = this.wrapObj.find("#albumEdit").find("li");
		//编辑模板
		this.editSubObj[0].addEventListener('click',function (event){
      event.stopPropagation();
			that.getTempData();			
			that.closeItem();
            //.............分割线......
			if(that.albumType == 0){          
          myScrollTemp = new IScroll('#tempWrap',{
              click: true,
              taps:true,
              preventDefault: true,
              scrollX:true
          });
			}
            //.........分割线.......
		});
		//编辑音乐
		this.editSubObj[1].addEventListener('click',function (event){
			if(that.albumType == 0){
				myScroll.disable();  //--------------禁用iscroll
				$('#wrapper').css({
					'overflow':'hidden'
				})
			}
      event.stopPropagation();


			that.getMusicData();
			that.closeItem();

		});
		//添加照片

		//添加照片 touchstart改click
		// this.editSubObj[2].addEventListener('click',function (e){
		// 	that.gotoEditPhoto();
		// });
     $(".tem_wrap").find("#albumEdit").find("li").eq(2).unbind('click').bind('click',function(event){
         event.stopPropagation();
        // $(".tem_wrap").find("#albumEdit").find("li").eq(2).unbind('click');
        that.gotoEditPhoto();
		});
		//保存 传参用 curTempId curTempId 预览用 templateID tempMusicId
		this.editSubObj[3].addEventListener('click',function(event){
		  event.stopPropagation();
		  that.getAlbumInfo();//这里调用是为了填充未进行修改的模板或ID
			console.log(that.curMusicId)
		  wx.miniProgram.redirectTo({url: '../edit-album/edit-album?id='+that.albumId + '&templateId=' + that.curTempId + '&tempMusicId=' + that.curMusicId + '&viewType=1'});
		});
    document.addEventListener('visibilitychange',function (e){
        //var isvisibility = document.visibilityState;
        var musicContral = document.hidden ? true : false;
      var bgMusicConClass = $('#bgMusicControl').attr('class');
	  var ua = navigator.userAgent.toLowerCase();

	  if (/iphone|ipad|ipod/.test(ua)) {
          if(musicContral){
              if(bgMusicConClass == 'bgMusicPause'){
                  //如果音乐处于暂停状态切后台，不做处理
              }else{
                  $("#bgMusic")[0].pause();
              }
          }else{
              if(bgMusicConClass == 'bgMusicPause'){//如果音乐处于暂停状态切后台，不做处理
              }else{
                  setTimeout(function(){
                      $("#bgMusic")[0].play()
                  },300)
              }
          }
	  } else if (/android/.test(ua)) {
          if(musicContral){
              if(bgMusicConClass == 'bgMusicPause'){
                  //如果音乐处于暂停状态切后台，不做处理
              }else{
                  $("#bgMusic")[0].pause();
              }
          } else{
              if(bgMusicConClass == 'bgMusicPause'){//如果音乐处于暂停状态切后台，不做处理
              }else{
                  setTimeout(function(){
                      $("#bgMusic")[0].play()
                  },300)
              }
          }
          // if(isvisibility == 'hidden'){
          //     $("#bgMusic")[0].pause();
          // } else if(isvisibility == 'visible '){
          //     setTimeout(function(){
          //         $("#bgMusic")[0].play()
          //     },300)
          // }
	  }
    });
  },
  playMusic:function (){
        var that = this;
        $.getJSON(this.musicUrl,function (json){
            var musicList = json.content;
            var musicLength = json.content.length;
            // var curMusicTime = queryString('curMusicTime');
            // console.log(curMusicTime)
            var objId;
            if(musicList && musicList.length>0){
                for(var i=0;i < musicList.length;i++){
                    if(musicList[i].id == that.curMusicId){
                        that.musicObj.src = musicList[i].songUrl;
                        $("#musicWrap ul li").eq(i).attr("class","cur");
                        setTimeout(function(){
                            // if(that.curMusicTime != undefined){
                            // 	that.musicObj.currentTime = curMusicTime;
                            // }
                            that.musicObj.play();
                        },150);
                        that.musicOnOff = true;
                        that.musicController.className = "bgMusicPlay";
                    }
                }
            }
        });
        this.musicController.addEventListener('touchstart',function (e){
            if(that.musicOnOff){
                that.musicController.className = "bgMusicPause";
                that.musicObj.pause();
            }else{
                that.musicController.className = "bgMusicPlay";
                that.musicObj.play();
            }
            that.musicOnOff = !that.musicOnOff;
        });
    },
	gotoEditPhoto:function (){//添加
		if(this.albumType==0){//0 图文 1音乐		
		console.log('../edit-photo-teletext/edit-photo-teletext?id='+this.albumId + '&templateId=' + this.curTempId + '&tempMusicId=' +this.curMusicId  + '&viewType=0?addSave=true');	
				wx.miniProgram.redirectTo({url: '../edit-photo-teletext/edit-photo-teletext?id='+this.albumId + '&templateId=' + this.curTempId + '&tempMusicId=' +this.curMusicId  + '&viewType=0?addSave=true'});//如果带addSave hide时不清空url，否则返回空白页面
		}else{
				wx.miniProgram.redirectTo({url: '../edit-photo-music/edit-photo-music?id='+this.albumId + '&templateId=' + this.curTempId + '&tempMusicId=' +this.curMusicId  + '&viewType=0?addSave=true'});//如果带addSave hide时不清空url，否则返回空白页面
		}		
		// if(this.albumType==0){//0 图文 1音乐			
		// 		wx.miniProgram.redirectTo({url: '../edit-photo-teletext/edit-photo-teletext?id='+this.albumId});
		// }else{
		// 		wx.miniProgram.redirectTo({url: '../edit-photo-music/edit-photo-music?id='+this.albumId});
		// }	
	},
	getAlbumInfo:function (){
		var that = this;
		// this.albumUrl = this.albumUrl + "&id="+ this.albumId;
		// $.getJSON(this.albumUrl,function (json){
		// 	if(json){
		// 		that.albumType = json.content.postType;
		// 		that.curTempId = initTemplateId;
				if(that.tempMusicId != undefined){//如果参数有临时音乐id
					that.curMusicId = that.tempMusicId;
				}else{
					that.curMusicId = that.curMusicId;
				};	
				if(that.templateId != undefined){//如果参数有临时模板id
					that.curTempId = that.templateId;
				}else{
					that.curTempId = that.curTempId;
				};
				// console.log(that.curTempId)
				that.playMusic();
			// }
		// });
	},
	getTempData:function (){//获取模板列表并编辑模板
		this.tempUrl = this.tempUrl + "&type="+this.albumType;
		var that = this;
        //loaded = null;  //.....................................................页面可滑动初始化函数为空
		$.getJSON(this.tempUrl,function (json){
			var tempList = json.content;
			var str = "";		
			var tempId = queryString("templateId");//临时模板ID
			var highLightIndex = that.curTempId;
			if(tempId){
				highLightIndex = tempId;
			}else{
				highLightIndex = that.curTempId;
			}
			if(tempList&&tempList.length>0){
				for(i in tempList){
					if(tempList[i].id == highLightIndex){
						str += '<li class="cur" id="'+tempList[i].id+'"><img src="'+tempList[i].picUrl+'" alt=""><p>'+tempList[i].templateName+'</p></li>';
					}else{
						str += '<li id="'+tempList[i].id+'"><img src="'+tempList[i].picUrl+'" alt=""><p>'+tempList[i].templateName+'</p></li>';
					}					
				}
			}
			$("#tempWrap ul").html(str);
			$("#tempWrap ul li").unbind('click').click(function(){				
				$("#tempWrap ul li").attr("class","");
				$(this).attr("class","cur");
				that.curTempId = $(this).attr("id");
				that.closeObjItem("#editTemp");
				// setTimeout(function(){
				// 选择模板预览
				$(this).attr("id");
                if(that.tempMusicId != undefined){//如果参数有临时音乐id
                    that.curMusicId = that.tempMusicId;
                }else{
                    that.curMusicId = that.curMusicId;
                };
        wx.miniProgram.redirectTo({url: '../edit-album/edit-album?id='+that.albumId + '&templateId=' + that.curTempId + '&tempMusicId=' +that.curMusicId  + '&viewType=0'});
				// },200)
			});
		});
		$("#editTemp").animate({
			height:"4.67rem",
			opacity:"1"
		});
	},
	getMusicData:function (){
		console.log(this.curMusicId + '=============');
		var that = this;
        //loaded = null;  //.....................................................页面可滑动初始化函数为空
		$.getJSON(this.musicUrl,function (json){
			var musicList = json.content;
			var musicLength = json.content.length;	
			var str = "";
			var lineCount = Math.ceil(musicList.length/2);//根据音乐条数计算
			that.musicWrapHeight = 1.07 + that.musicWrapBaseHeight*lineCount + 0.8;
			$("#musicWrap ul").height(that.musicWrapHeight+'rem');
			if(that.musicWrapHeight > 8){
				that.musicWrapHeight = 8;
				$("#musicWrap").scroll(function(event) {
					/* Act on the event */
					event.stopPropagation();
				});
			}
			//console.log("g "+that.musicWrapHeight)
			if(musicList && musicList.length>0){
				for(var i=0;i<musicList.length;i++){
					var musicInfo = musicList[i].songName;
					var musicArry = musicInfo.split("-");
					var musicName = $.trim(musicArry[1]);
					var musicSinger = $.trim(musicArry[0]);
					if(musicList[i].id == that.curMusicId){
						str += '<li class="cur" index="'+i+'" id="'+musicList[i].id+'" music="'+musicList[i].songUrl+'"><h3>'+subString(musicName,14,true)+'</h3><p>'+subString(musicSinger,18,true)+'</p></li>';
					}else{
						str += '<li id="'+musicList[i].id+'" index="'+i+'" music="'+musicList[i].songUrl+'"><h3>'+subString(musicName,14,true)+'</h3><p>'+subString(musicSinger,18,true)+'</p></li>';
					}
				}
			}
			//音乐列表加载完成后初始化iscroll
      if(that.albumType == 0){
        myScrollTemp = new IScroll('#musicWrap',{
            click: true,
            taps:true,
            preventDefault: true,
            scrollY:true
        });
			}
			$("#musicWrap ul").html(str);
			$("#editMusic").animate({
				height:that.musicWrapHeight + "rem",
				opacity:"1",
			});
			$("#musicWrap ul li").click(function(){
				$(this).attr("class","cur");
				that.curMusicId  = $(this).attr("id");
                that.tempMusicId = $(this).attr("id");
				that.musicObj.src = $(this).attr("music");
				setTimeout(function(){					
					that.musicObj.play();
				},150);
				that.musicOnOff = true;
				that.musicController.className = "bgMusicPlay";
				if(that.albumType == 0){
                    $('#wrapper').css({
                        'overflow':'auto'
                    })
					myScroll.enable();  //------------选择音乐关闭弹框 启用iscroll
					myScroll.refresh();
				}  
				that.closeObjItem("#editMusic");
			});
		});		
	},
	closeItem:function (){
		var that = this;
		$(".editItem s").click(function (){
			//console.log(1)
			$(this).parent("div").animate({height: 0, opacity: 0});
			if(that.albumType == 0){
                $('#wrapper').css({
                    'overflow':'auto'
                })
				myScroll.enable();  //----------点击关闭弹框按钮启用iscroll
				myScroll.refresh();
			}    
		});
	},
	closeObjItem:function (obj){
		$(obj).animate({height: 0, opacity: 0});
	}
};
//分享
var previewShare = {
	albumId:queryString("id"),
	wrapObj:$(".tem_wrap"),//父级元素
    musicObj:$("#bgMusic")[0],
	shareBarStr : '<div id="previewShare"><h2>分享</h2></div>',
	init: function (){
		var that = this;
		albumTempEdit.playMusic();//音乐控制
		this.wrapObj.append(this.shareBarStr);
		$("#previewShare h2").click(function (){
			wx.miniProgram.navigateTo({url: '../share-album/share-album?id='+that.albumId});
		});
        document.addEventListener('visibilitychange',function (e){
            var musicContral = document.hidden ? true : false;
            var bgMusicConClass = $('#bgMusicControl').attr('class');
            if(musicContral){
                if(bgMusicConClass == 'bgMusicPause'){

                }else{
                    that.musicObj.pause();
                }
            }else{
                if(bgMusicConClass == 'bgMusicPause'){

                }else{
                    that.musicObj.play();
                }
            }
            var currentTime = that.musicObj.currentTime;
            //console.log('-------------'+currentTime)
            //wx.miniProgram.redirectTo({url: '../edit-album/edit-album?id='+that.albumId + '&templateId=' + that.curTempId + '&tempMusicId=' +that.curMusicId  + '&viewType=0'});
            //console.log('-------------'+currentTime)
        });
	}
};
//首页跳转
var shareEdit = {
	albumId:queryString("id"),
	wrapObj:$(".tem_wrap"),//父级元素,
    musicObj:$("#bgMusic")[0],
	shareBarStr : '<div id="shareEdit"><h2>我要制作</h2></div>',
	init: function (){
		var that = this;
		albumTempEdit.playMusic();//音乐控制
		this.wrapObj.append(this.shareBarStr);
		$("#shareEdit h2").click(function (){
			wx.miniProgram.redirectTo({url: '../homePage/homepage'});
		});
        document.addEventListener('visibilitychange',function (e){
            var musicContral = document.hidden ? true : false;
            var bgMusicConClass = $('#bgMusicControl').attr('class');
            if(musicContral){
                if(bgMusicConClass == 'bgMusicPause'){

                }else{
                    that.musicObj.pause();
                }
            }else{
                if(bgMusicConClass == 'bgMusicPause'){

                }else{
                    that.musicObj.play()
                }
            }
            var currentTime = that.musicObj.currentTime;
            //console.log('-------------'+currentTime)
            //wx.miniProgram.redirectTo({url: '../edit-album/edit-album?id='+that.albumId + '&templateId=' + that.curTempId + '&tempMusicId=' +that.curMusicId  + '&viewType=0'});
            //console.log('-------------'+currentTime)
        });
	}
};
var viewType = queryString("viewType");
if(viewType == 0){//编辑、选模板
	albumTempEdit.init();

}else if(viewType == 1){//分享 、保存
	previewShare.init();
}else{//分享+制作
	shareEdit.init();
}