/**
 * @author  lijiancheng | lijiancheng@17guagua.com
 * @version 1.0 | 2015/12/16
 * @desc  通过 openid 查询用户 id
 * @param 参数说明
 * @example  使用示例
 */

var cookie = require('./cookie').cookie;
var ds = require('./ds').ds;

exports.queryUser = function(){

    if(!cookie.get('openid')) {
        return;
    }
    var request = ds('http://active.qxiu.com/useropenid.jsp?jsoncallback=?', {id: cookie.get('openid')});
    request.done(function(data){
        if(data.hasOwnProperty('0')) {
            window.userId = data[0].userId;
            if(!cookie.get('userid')){
                cookie.set('userid', window.userId);
            }
        }
    })
}