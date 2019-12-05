/*
* @author: Neurotoxin
* @E-mail: wanghongyu@17guagua.com
* @desc: 默认配置文件
* @data: 2016.09.07
*/
exports.config = {
	downLoadUrl: {
        android: 'http://d.img005.com/guagua/Community_2.0.0.0_29.apk',
        ios: 'https://itunes.apple.com/app/id1094991400'
	},
	apiHost: {
        host: 'http://ext.event.17.guagua.cn/1/parasol/'
	},
  cdnHost:{
      host: 'http://mhall.guagua.cn/appPage/'
  },
	streamUrl: {
        ks: {
            hld: 'http://ksdownhls.guagua.cn/live/userid/index.m3u8',
            rtmp: 'rtmp://ksdownrtmp.guagua.cn/live/userid'
        },
		dinion: {
			hls: 'http://ksdownhls.guagua.cn/live/userid/index.m3u8',
			rtmp: 'rtmp://ksdownrtmp.guagua.cn/live/userid'
		},
		ws: {
			hls: 'http://pull-live-hls.ws.cloudpool.com.cn/oflaDemo/userid/playlist.m3u8',
			rtmp: 'rtmp://pull-live.ws.cloudpool.com.cn/oflaDemo/userid',
			hdl: 'http://pull-live-hdl.ws.cloudpool.com.cn/oflaDemo/userid.flv'
		}
	},
    oemid: 0, // 22 web pc | 23 web android | 24 web ios
    version: '2.0.3'
};