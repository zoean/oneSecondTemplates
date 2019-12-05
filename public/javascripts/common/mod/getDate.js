/**
 * @author  lijiancheng | lijiancheng@17guagua.com
 * @version 1.0 | 2016/1/7
 * @desc  用途说明
 * @param time 为 1450843200000 毫秒格式
 * @example  getDate(1450843200000)  返回 '2016-01-01 05:03:03'
 */

exports.getDate = function(time){
    var html = '';
    var date = new Date(time);
    var addZero = function(num){
        return num<10? '0' + num : num;
    }
    html += date.getFullYear() + '-';
    html += addZero(date.getMonth() + 1) + '-';
    html += addZero(date.getDate()) + ' ';
    html += addZero(date.getHours()) + ':';
    html += addZero(date.getMinutes()) + ':';
    html += addZero(date.getSeconds());
    return html;
};
 