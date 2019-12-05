/*
* @author: Neurotoxin
* @E-mail: wanghongyu@17guagua.com
* @desc: 判断设备类型, 0为ios, 1为安卓
* @data: 2016.06.03
*/

exports.typePhone = function(){
	var ua = navigator.userAgent.toLowerCase();
    if(/iphone|ipad|ipod/.test(ua)) {
        return 0;
    }else if(/android/.test(ua)) {
        return 1;
    }else{
        return 2;
    }
};