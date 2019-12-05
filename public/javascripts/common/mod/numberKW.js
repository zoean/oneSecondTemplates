/*
* @author: Neurotoxin
* @E-mail: wanghongyu@17guagua.com
* @desc: 将数字转换为1k，1w，只有在数字大于位数的时候才会转换,保留1位小数
* @data: 2016.06.03
*/

exports.numberKW = function(value){
	var val = value.toString(),
      valLength = val.length;
  if(valLength >= 4 && valLength < 5){
      val = val / 1000;
      val = Number(val.toString().match(/^\d+(?:\.\d{0,1})?/));
      return val+'K';
  }else if(valLength >= 5){
      val = val / 10000;
      val = Number(val.toString().match(/^\d+(?:\.\d{0,1})?/));
      return val+'W';
  }else{
      return value;
  }
};