var express = require('express');
var router = express.Router();
var https = require('https');
var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');
logger.level = 'debug';

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug('*****************************************************');
  logger.debug('*****************************************************');
  logger.debug('*****************************************************');
  logger.debug('**************开始打log******************');
  logger.debug('带参----------'+req.originalUrl);//获取原始请求URL
  console.log('带参----------'+req.originalUrl);
  var resGlobal = res;
  // var id = req.param("id");
  // var tempId = req.param("templateId");//临时模板
  var id = req.query.id;
  var tempId = req.query.templateId;//临时id
  var model = req.query.model;
  var system = req.query.system;
  var version = req.query.version;  
  logger.debug('用户访问的机型、系统、微信版本号是-------'+model+'---'+system+'---'+version);  
  logger.debug("当前访问的相册ID是query方式获取-------" + req.query.id);
  logger.debug("当前访问的相册ID是model方式获取-------" + req.param("id"));
  console.log('****************$'+ id);
  logger.debug('请求的接口是------'+'https://cgi.guagua.cn/post/info?id=' + id +'&randomKey=1');
  console.log('请求的接口是------'+'https://cgi.guagua.cn/post/info?id=' + id +'&randomKey=1');
  var reqget = https.get('https://cgi.guagua.cn/post/info?id=' + id +'&randomKey=1',
    function(req, res) {    
      var chunks = [];

      //var chunks = '';
      //req.setEncoding('utf8');
      req.on('data',function(chunk){  
        //chunk.setEncoding('utf8');
        chunks.push(chunk); 
        logger.debug('每一段数据原始buffer####'+chunk); 
        console.log(chunk);
        //chunks += chunk;
      });  
      req.on('end',function(){
        logger.debug('接收完成后的数组');
        logger.debug(dataObj);
          console.log('接收完成后的数组');
          console.log(dataObj);
        var dataObj = Buffer.concat(chunks);        
        logger.debug('连接数组后');
        logger.debug(dataObj); 
        console.log('buffer连接后'+dataObj);
        dataObj.toString('utf8');               
        logger.debug('toString utf8编码后的数据');
        logger.debug(dataObj); 
        dataObj = JSON.parse(dataObj);        
        logger.debug('转换成JSON后的完整数据');
        logger.debug(dataObj);
          console.log('转换成JSON后的完整数据');
          console.log(dataObj);
        try{
          logger.debug('try一try我不502');
          if(dataObj.content) {
            var templateId = dataObj.content.templateId;
            logger.debug('接口里的模板ID----' + templateId);  
            logger.debug('临时模板ID----' + tempId);
            console.log('接口里的模板ID----' + templateId);
            console.log('临时模板ID----' + tempId);
            if (tempId && tempId != undefined){//如果querystring没有临时选择模板id
            logger.debug('走临时模板Id---------'+ 'template_' +tempId + '相册Id--------'+id);
            console.log('走临时模板Id---------'+ 'template_' +tempId + '相册Id--------'+id);
            resGlobal.render('template_' + tempId, dataObj.content);
            }else{
              resGlobal.render('template_' + templateId, dataObj.content);
              logger.debug('走接口模板Id' + 'template_' + templateId+ '相册Id--------'+id);
                console.log('走接口模板Id' + 'template_' + templateId+ '相册Id--------'+id);
            }
          }else {
            resGlobal.render('template_404');
          }
        }catch(err){
          logger.debug('可能...又502了');
          logger.debug(err);
          logger.debug(err.message);
        }
      });
      req.on('error',function (e){
      	console.log('出错啦！-----' + e.message);
        logger.debug('出错啦！-----'+e.message);
      });
      reqget.end();
    });
});
module.exports = router;
