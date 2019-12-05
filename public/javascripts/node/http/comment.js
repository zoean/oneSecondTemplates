var http = require('http');
var querystring = require('querystring');
var postData = querystring.stringify({
	'content':'一起期待下一期的课程',
	'cid':348
})
var options = {
	hostname:'www.imooc.com',
	port:80,
	path:'course/document',
	method:'POST',
	headers:{
		'Accept': ',text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
	'Accept-Encoding': 'gzip, deflate, br',
	'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
	'Connection': 'keep-alive',
	'Cookie': 'imooc_uuid=2ffffdf5-6821-43d4-982c-876732909900; imooc_isnew_ct=1540274602; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1540274605; loginstate=1; apsid=RhNjY4ZTgzNmEzYjg0YmZjOWY3YTI2MDE5NGRmM2IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANzAzMDkzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4aWFvbGl5YW5AYWxpeXVuLmNvbQAAAAAAAAAAAAAAADk1MDQzMzE0YjZkMDc0MDczNWM4YWJmMGUzYWY5NTcxsLnOW7C5zls%3DZj; PHPSESSID=pn473pp5lru56qef3ehiqmm033; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1540274610; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1540274610; zg_did=%7B%22did%22%3A%20%221669f878bf79a-04c958413e2303-5c10301c-1fa400-1669f878bf8121%22%7D; imooc_isnew=2; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; IMCDNS=0; mc_channel=banner; mc_marking=4b4bfe198fe63577412d847639db3f97; cninfo=banner-4b4bfe198fe63577412d847639db3f97; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1541129509; cvde=5bceb9aa0273e-391; zg_f375fe2f71e542a4b890d9a620f9fb32=%7B%22sid%22%3A%201541129476828%2C%22updated%22%3A%201541129563355%2C%22info%22%3A%201540882863356%2C%22superProperty%22%3A%20%22%7B%5C%22%E5%BA%94%E7%94%A8%E5%90%8D%E7%A7%B0%5C%22%3A%20%5C%22%E6%85%95%E8%AF%BE%E7%BD%91%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1%5C%22%2C%5C%22%E5%B9%B3%E5%8F%B0%5C%22%3A%20%5C%22web%5C%22%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22cuid%22%3A%20%22tC1oAtE1WQU%2C%22%7D',
	'Host': 'www.imooc.com',
	'Referer': 'https://www.imooc.com/qa/348/t/0',
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
	'X-Requested-With': 'XMLHttpRequest'
	}
}
var req = http.request(options, function (res){
	console.log('Status:' + res.statusCode);
	console.log('headers:' + JSON.stringify(res.headers));
	res.on('data',function (chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});
	res.on('end',function (){
		console.log('評論完畢')
	});
})
req.on('error',function (e){
	console.log('Error:' + e.message)
});
req.write(postData);
req.end();