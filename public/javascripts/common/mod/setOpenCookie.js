/**
 * @author  lijiancheng | lijiancheng@17guagua.com
 * @version 1.0 | 2015/12/21
 * @desc  用途说明
 * @param 参数说明
 * @example  使用示例
 */
var cookie = require('./cookie').cookie;
var queryString = require('./queryString').queryString;

var setOpenCookie = function(){
    this.init();
};
setOpenCookie.prototype = {
    init: function(){
        var openid = queryString('openid'),
            openkey = queryString('openkey'),
            userid = queryString('userid'),
            roomid = queryString('roomid');

        openid && cookie.set('openid', openid, {path: '/'});
        openkey && cookie.set('openkey', openkey, {path: '/'});
        userid && cookie.set('userid', userid, {path: '/'});
        roomid && cookie.set('roomid', roomid, {path: '/'});
    }
}
exports.setOpenCookie = setOpenCookie;