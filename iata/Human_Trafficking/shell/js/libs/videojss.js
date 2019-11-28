/**
 *	videoJS will give video controller by using video-tags
 *  It can plalyed across the browsers and devices, but has some limitations are specified below.
 *  desktop-version ---------------------------->
 	* limited with max 40 video-tags/videos.
 	* max 40 multiple-videos can be played.
 *  nokia-devices ------------------------------>
 	* limited with max 3 video-tags/videos.
 	* max 3 multiple-videos can be played.
 *  blackBerry-devices ------------------------->
 	* limited with max 2 video-tags/videos.
 	* max 2 multiple-videos can be played.
 *  ipad/IOS-devices --------------------------->
 	* limited with max 1 video-tag/video.
 	* no multiple videos can be played.
 	* no volume control.
 *  video time-update interval is 100ms
 *  videoJS.isPlayArr[i]  is 'true' when videoJS.status[i] is 'started/resumed'
 *  To convert seconds to minutes use below forumula
 		currentTime is always in seconds
 		var ele = videoJS.video[0];
 		ele.currentTime %60 + ((ele.currentTime /60)*0.01);
 *	Author: Amarendhar Ganji (amarendhar.ganji@yahoo.com).
**/
VideoJS = function (root, videoJS, videoJSCtx, $) {
	videoJS.callbacks = ["videoStarted", "videoCurrentTimeStatus", "videoCompleteTimeStatus", "onEachVideoLoaded", "videosLoaded", "videosStatus"];
	/*To check the pre-loading status of the videos*/
	videoJS.timerFun = function (i) {
		videoJS.video[i].play();
		videoJS.timer[i] = setInterval(function () {
			if (videoJS.video && videoJS.video[i] && videoJS.video[i].currentTime) {
				(videoJS.timer && videoJS.timer.length) ? (clearInterval(videoJS.timer[i])) : (videoJS.noop());
				videoJS.preloaded.push(true);
				videoJS.video[i].pause();
				videoJS.video[i].volume = model.currentVolume;//1;
				var percent = parseInt((videoJS.preloaded.length/videoJS.sounds.length) * 100);
				videoJS.videosStatus(i);
				videoJS.onEachVideoLoaded(i);
				if (videoJS.preloaded.length === videoJS.sounds.length) {
					videoJS.loaded = true;
					videoJS.videosLoaded();
					// console.log('All Videos are Pre-Loaded');
				}
			}
		}, 1);
	}
	/*To initialize/load the videos*/
	videoJS.init = function (path, sounds) {
		
		videoJS.video = (videoJS.video || []);
		videoJS.timer = [];
		videoJS.preloaded = [];
		videoJS.interval = 100;
		videoJS.intervalCounter = [];
		videoJS.loaded = false;
		videoJS.isPlay = false;
		videoJS.isPlayArr = [];
		videoJS.status = [];
		if (videoJS.sounds)
		/* Create video tag and assign property and bind events ended and canplaythrough for check whether video is loaded or not */
		for (i = 0; i < videoJS.sounds.length; i++) {
			(videoJS.update && videoJS.update.length) ? (clearInterval(videoJS.update[i])) : (videoJS.update = []);
			videoJS.isPlayUpdate(i, false);
			videoJS.status[i] = false;
			if (videoJS.video && videoJS.video[i]) {
				$(videoJS.video[i]).removeAttr('status index class src id');
			} else {
				videoJS.video[i] = $('<video>', {
					id: 'video_' + i,
					class: 'video video_' + i,
					preload: 'auto',
					indx: i
				});
				videoJS.video[i] = videoJS.video[i][0];
			}
			
			videoJS.video[i].src = videoJS.path + videoJS.sounds[i] + '.mp4';
			videoJS.video[i].volume = 0;
			try {videoJS.video[i].currentTime = 0;} catch(e) {}
			$(videoJS.video[i]).attr('index', i);
			$(videoJS.video[i]).unbind().bind('ended', function () {
				var i = parseInt($(this).attr('index'));
	    		$(this).attr('status','end');
				(videoJS.update && videoJS.update.length) ? (clearInterval(videoJS.update[i])) : (videoJS.noop());
				videoJS.isPlayUpdate(i, false);
				videoJS.status[i] = 'ended';
				videoJS.videosStatus(i);
				videoJS.videoCompleteTimeStatus(i);
				$('.footer-holder .play').css("opacity",'0.5')
				$('.footer-holder .play').addClass('deactive')
				

				
			});
			videoJS.video[i].addEventListener("canplaythrough", function(){
				if (!$(this).hasClass('loaded')) {
					$(this).addClass('loaded');
				
					var i = parseInt($(this).attr('indx'));
					videoJS.preloaded.push(true);
					videoJS.video[i].volume = 1;
					var percent = parseInt((videoJS.preloaded.length/videoJS.sounds.length) * 100);
					if (videoJS.preloaded.length === videoJS.sounds.length) {
						videoJS.loaded = true;
						videoJS.videosLoaded();
					}
					// videoJS.timerFun(parseInt($(this).attr('index')));
				}
			});
		}
	}
	/*video started callback function*/
	videoJS.videoStarted = function () {};
	/*currentTime status for each 100ms(intervalTime)*/
	videoJS.videoCurrentTimeStatus = function () {

		
	}
	/*Video completed status*/
	videoJS.videoCompleteTimeStatus = function () {

}
	/*Every Video loaded status*/
	videoJS.onEachVideoLoaded = function () {};
	/*All Videos are loaded status*/
	videoJS.videosLoaded = function () {};
	/*Video state callback*/
	videoJS.videosStatus = function () {};
	/*To play the individual video*/
	videoJS.start = function (i, videoInterval, parameters) {
		var i = parseInt(i);
		videoJS.video[i].play();
		(videoJS.update && videoJS.update.length) ? (clearInterval(videoJS.update[i])) : (videoJS.update = []);
		videoJS.interval = (videoInterval || videoJS.interval);
		videoJS.intervalCounter[i] = parseInt(videoJS.video[i].currentTime * 10);
		videoJS.isPlayUpdate(i, true);
		(!videoJS.intervalCounter[i]) ? (videoJS.status[i] = 'started') : (videoJS.status[i] = 'resumed');
		videoJS.videosStatus(i);
		videoJS.videoStarted(i);
		videoJS.videoCurrentTimeStatus(i, (videoJS.interval*videoJS.intervalCounter[i])/1000 , parameters);
		videoJS.update[i] = setInterval(function () {
			videoJS.intervalCounter[i] += 1;
			// videoJS.videoCurrentTimeStatus(i, (videoJS.interval*videoJS.intervalCounter[i])/1000 , parameters);
			videoJS.videoCurrentTimeStatus(i, (videoJS.interval*parseInt(videoJS.video[i].currentTime * 10))/1000 , parameters);

			if(splashIntro==true && parseInt(videoJS.video[i].currentTime) == 37){
				$("#introPopup").fadeIn()
				$('.skipBtn').css('display','none');
				$("#helpBtn").click(function(e) {
						//helpBtn.trigger("click", this.fnClick);
						$("#helpDrp").show()
						$("#introPopup,#splashContainer").hide()
						$(".shellWrap").show()
				});
			}else{
				//	alert("In")
				}
		}, videoJS.interval);

	}
	/*To play the individual video*/
	videoJS.play = function (i, videoInterval, parameters) {
		(typeof i === 'object') ? (i = videoJS.sounds.indexOf(i[0])) : (i = i);
		/*if video existed, video will play*/
		if (videoJS.video && videoJS.video[i]) {
			$('.footer-holder .play').addClass('playing');
			try {videoJS.video[i].currentTime = 0;} catch(e) {}
			/*videoJS.start function will change videoJS.status[i] to either started/resumed*/
			videoJS.start(i, videoInterval, parameters);
			// console.log(i + ' -> play');
		}
	}
	/*To pause the individual video*/
	videoJS.pause = function (i) {
		(typeof i === 'object') ? (i = videoJS.sounds.indexOf(i[0])) : (i = i);
		/*
			videoJS.status[i]=srated/resumed, then videoJS.isPlayArr[i]=true
			i.e if video is playing, video will pause
		*/
		if (videoJS.isPlayArr[i]) {
			videoJS.video[i].pause();
			videoJS.isPlayUpdate(i, false);
			videoJS.status[i] = 'paused';
			(videoJS.update && videoJS.update.length) ? (clearInterval(videoJS.update[i])) : (videoJS.noop());
			videoJS.videosStatus(i);
			// console.log(i + ' -> pause');
		}
	}
	/*To resume the individual video*/
	videoJS.resume = function (i, videoInterval, parameters) {
		(typeof i === 'object') ? (i = videoJS.sounds.indexOf(i[0])) : (i = i);
		/*if videoJS.status[i]='paused', video will resume*/
		if (videoJS.status[i] === 'paused') {
			/*videoJS.start function will change videoJS.status[i] to either started/resumed*/
			videoJS.start(i, videoInterval, parameters);
			// console.log(i + ' -> resume');
		}
	}
	/*To stop the individual video*/
	videoJS.stop = function (i) {
		(typeof i === 'object') ? (i = videoJS.sounds.indexOf(i[0])) : (i = i);
		/*
			videoJS.status[i]=srated/resumed, then videoJS.isPlayArr[i]=true.
			videoJS.status[i]=paused,
			i.e. if video is started/resumed/paused, video will stop
		*/
		if (videoJS.isPlayArr[i] || videoJS.status[i] === 'paused') {
			videoJS.video[i].currentTime = 0;
			videoJS.video[i].pause();
			videoJS.isPlayUpdate(i, false);
			videoJS.status[i] = 'stopped';
			(videoJS.update && videoJS.update.length) ? (clearInterval(videoJS.update[i])) : (videoJS.noop());
			//videoJS.videosStatus(i);
			// console.log(i + ' -> stop');
		}
	}
	/*To play all videos */
	videoJS.playAll = function (i, videoInterval, parameters) {
		videoJS.all('play', videoInterval, parameters);
	}
	/*To pause all videos */
	videoJS.pauseAll = function (i, videoInterval, parameters) {
		videoJS.all('pause', videoInterval, parameters);
	}
	/*To resume all videos */
	videoJS.resumeAll = function (i, videoInterval, parameters) {
		videoJS.all('resume', videoInterval, parameters);
	}
	/*To stop all videos */
	videoJS.stopAll = function (i, videoInterval, parameters) {
		videoJS.all('stop', videoInterval, parameters);
	}
	/*To seek the individual video*/
	videoJS.seek = function (i, interval) {
		(typeof i === 'object') ? (i = videoJS.sounds.indexOf(i[0])) : (i = i);
		if (videoJS.video && videoJS.video[i]) {
			videoJS.video[i].currentTime = interval;
		}
	}
	/* Seek and play for individual video */
	videoJS.seekAndPlay = function (i, interval) {
		(typeof i === 'object') ? (i = videoJS.sounds.indexOf(i[0])) : (i = i);
		if (videoJS.video && videoJS.video[i]) {
			videoJS.video[i].currentTime = parseFloat(interval);
			videoJS.start(i);
		}
	}
	/* To get duration of individual video */
	videoJS.duration = function (i) {
		(typeof i === 'object') ? (i = videoJS.sounds.indexOf(i[0])) : (i = i);
		if (videoJS.video && videoJS.video[i]) {
			return videoJS.video[i].duration;
		}
	}
	/* Controls the volume */
	videoJS.volume = function (volume, index) {
		(typeof index === 'object') ? (index = videoJS.sounds.indexOf(i)) : (index = index);
		if (typeof index !== 'undefined' && videoJS.video && videoJS.video[index]) {
			videoJS.video[index].volume = parseFloat(volume);
			
		} else {
			if (videoJS.sounds)
			for (i = 0; i < videoJS.sounds.length; i++) {
				if (videoJS.video && videoJS.video[i]) {
					videoJS.video[i].volume = parseFloat(volume);
					
				}
			}
		}
	}
	videoJS.all = function (event, videoInterval, parameters) {
		if (videoJS.sounds)
		for (var i = 0; i < videoJS.sounds.length; i++) {
			videoJS[event](i, videoInterval, parameters);
		}
	}
	videoJS.noop = function () {}
	/* Check individual video is playing or not */
	videoJS.isPlayUpdate = function (i, flag) {
		videoJS.isPlayArr[i] = flag;
		(videoJS.isPlayArr.indexOf(true) !== -1) ? (videoJS.isPlay = true) : (videoJS.isPlay = false);
	}
	videoJS.destroy = function (i) {
		videoJS.stopAll();
		videoJS.video[i].remove()
	}
	return videoJS;
}

function initVideos() {
	//shell.createVideoJS();
	if (typeof arguments[0][0] === 'string' && arguments[0][1] && arguments[0][1].length) {
		for (i = 0; i < videojs.callbacks.length; i++) {
			videoJScallback.call(videojs, i);
		}
		videojs.path = arguments[0][0];
		videojs.sounds = arguments[0][1];
		videojs.init();
	}
}

function videoJScallback(i) {
	videojs[videojs.callbacks[i]] = function() {
		var fn = window[videojs.callbacks[i]]
		if ( typeof fn == 'function' )  {
			eval(videojs.callbacks[i]).apply(null, arguments); 
		}
	}
}
