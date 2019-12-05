/*
* @author: Neurotoxin
* @E-mail: wanghongyu@17guagua.com
* @desc: 判断打开页面的APP平台, 0为微信, 1为微博
* @data: 2016.06.03
*/

exports.typePlatform = function(){
	var ua = window.navigator.userAgent.toLowerCase();
    wx = ua.match(/MicroMessenger/i);
    wb = ua.match(/weibo/i);
    qq = ua.match(/qq/i);
    if(wx == 'micromessenger'){
  	  return 0;
    }
    if(wb == 'weibo'){
  	  return 1;
    }
    if(qq == 'qq'){
      return 2;
    }
};