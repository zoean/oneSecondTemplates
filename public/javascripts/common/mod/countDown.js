/**
 * Created by 健成 on 2015/12/12.
 * @desc 用于倒计时转换
 * @para serverTime 为服务器时间, deadline为截止时间 返回为 json
 * @example changeTimeStyle(serverTime, deadline);
 * @paraStyle  serverTime 和 deadline 格式都是 "2015-12-12 19:53:14"
 */

exports.changeTimeStyle = function (serverTime, deadline){

    var sTime = new Date(serverTime.split(' ')[0].split('-')[0],serverTime.split(' ')[0].split('-')[1],serverTime.split(' ')[0].split('-')[2], serverTime.split(' ')[1].split(':')[0], serverTime.split(' ')[1].split(':')[1], serverTime.split(' ')[1].split(':')[2]);
    var dTime = new Date(deadline.split(' ')[0].split('-')[0],deadline.split(' ')[0].split('-')[1],deadline.split(' ')[0].split('-')[2], deadline.split(' ')[1].split(':')[0], deadline.split(' ')[1].split(':')[1], deadline.split(' ')[1].split(':')[2]);

    var lastTime = dTime.getTime() - sTime.getTime(); // 格式为毫秒格式

    if(lastTime < 0){
        return {day: '00', hour: '00', minute: '00', second: '00'};
    }

    var day = Math.floor(lastTime / (24 * 60 * 60 * 1000));
    lastTime = lastTime % (24 * 60 * 60 * 1000);

    var hour = Math.floor(lastTime / (60*60*1000));
    lastTime = lastTime % (60*60*1000);

    var minute = Math.floor(lastTime / (60*1000));
    lastTime = lastTime % (60*1000);

    var second = Math.floor(lastTime / 1000);

    day < 10? day = '0' + day : day = day + '';
    hour < 10? hour = '0' + hour : hour = hour + '';
    minute < 10? minute = '0' + minute : minute = minute + '';
    second < 10? second = '0' + second: second = second + '';

    return {day: day, hour: hour, minute: minute, second: second};
}
 