
var audio;
var self;
var dummyAudioInterval;
var positionInterval;
var seeking = false;
var playerVar;
var MEPlayer;
var isMutedBeforeDestroy = false;
var firstTime = false;
var pauseTime;
var audioInitiallyPause = false;
var isAudio = true;
var audioCallBack;
var audioLoaded = false;
var audioLoadFirstTime = true;
var showAudioLoading = true;
var notMuted = false;
//-- Initial audio reset for interactivity pages
var initialAudioReset = false;
var intActivityAudioReset = false;
var allAssestsLoaded = false;
var scrubberBool = false;

var relativeLeft 
$(document).ready(function() {
	$("#deviceLaunch").click(function(e) {
		$("#deviceLaunch").hide();
		//model.dispatchCustomEvent("updateView");	
		//callInitialAudio();
		var introVideo = ["assets/video/common/", "1"];
		initVideos(introVideo);
		 $("#splash_content").append(videojs.video[0]);			
         videojs.play(0);
		$("#preloaderSpinner").css("display", "block");
		$("#shellDisabler").css("display", "none");
	});
	
	$('#replay_btn').click(function(e) {
		$('.ShellContantarea').scrollTop(0);

		// $(".blinkStar").removeClass("active").removeAttr("style");

		if ($(this).hasClass("disabled") || $(this).hasClass("deactive")) {
			return;
		}
			
			
			timeLineObj = null;
			TweenMax.killTweensOf($("#shell_next,.nextSelected"));
			$("#shell_next").css('-ms-transform','scale(1)')
			$("#shell_next").css('transform','scale(1)')
			$("#shell_next").css('-webkit-transform','scale(1)')
			$("#instruct_next").hide()
			model.disablePlayPauseSlider=false;
			console.log("invoked");
			controller.menuBtnsControlEnable();

			if(model.learningType=="non linear"){
				$("#shell_next").css('opacity','1');
			 $("#shell_next").removeClass('disabled');
			}else{
				$("#shell_next").addClass('disabled');
				//$("#shell_next").css('opacity','0.5');
			}
			
			$(".nextSelected").css('opacity','0');
			model.dispatchCustomEvent("updateView");	
			//callInitialAudio();
		});
	$('.footer-holder .play').click(function(e) {
		if ($(this).hasClass("disabled") || $(this).hasClass("deactive")) {
			return;
		}
		
		
		
			if ($(this).hasClass('playing')) {
				$(this).removeClass('playing')
				if( isAudio ) {
					MEPlayer.pause();
					
				}else if( isVideo) {
					videojs.pause(videoNum);
				}

				$('.footer-holder .play').removeClass('playing');
				if (timeline) {
					timeline.pause();
				}
				//clearInterval(positionInterval);
				
				if(screenType=="Canvas"){
					iframe.contentWindow.canvasAnim.stop()
				}
				
			} else {
				// console.log('33333333333');
				if(screenType=="Canvas"){
					
					iframe.contentWindow.canvasAnim.play()
				}
				
				
				$(this).addClass('playing');
				// pg_snd.resume();
				if( isAudio ) {
					MEPlayer.play();
					
				}else if( isVideo ){
					videojs.resume(videoNum);
				}
				// trackTime();
				if (timeline) {
					
					timeline.resume();
				}
			}
		
	});

	$('.footer-holder .scrubber').on('mouseup', function(e) {
		seeking = false;
		
		if(screenType=="Canvas"){
			iframe.contentWindow.canvasAnim.gotoAndPlay(relativeLeft /($('.footer-holder .scrubber').width())*iframe.contentWindow.canvasAnim.totalFrames)
		}
	});
	
	$(".dragger").draggable({  
		
            start: function(event, ui) {
				ui.position.left = 0;
				ui.position.top = 0;
				 seeking = true;
				  $('#iePatch').css("display",'block')
				 setTimeout(function(){ 
					$("#iePatch").hide()
				}, 250);
				$('.footer-holder .play').css("opacity",'1')
				$('.footer-holder .play').removeClass('deactive')
				$('.footer-holder .play').addClass('playing')
				timeline.pause();
				
				MEPlayer.pause();
				//var ct = MEPlayer.currentTime;
				//var dur = MEPlayer.duration;
            },
            stop: function(event, ui) {
				var ct = MEPlayer.currentTime;
				var dur = MEPlayer.duration;
				var currentDragTime=ui.position.left*dur/685
				console.log(ui.position.left*dur/685)
				timeline.seek(currentDragTime);
				MEPlayer.setCurrentTime(currentDragTime);
                timeline.play();
				MEPlayer.play();
				
            },
            drag: function(event, ui) {
                var changeLeft = ui.position.left - ui.originalPosition.left; 
				var newLeft = ui.originalPosition.left + changeLeft / Model.scaleFactor; 
			 
				var changeTop = ui.position.top - ui.originalPosition.top; 
				var newTop = ui.originalPosition.top + changeTop / Model.scaleFactor; 
			 
				ui.position.left = newLeft;
				ui.position.top = newTop;
				
				
				if(ui.position.top<-14){
					ui.position.top=-14
				}
				if(ui.position.top>-14){
					ui.position.top=-14
				}
				if(ui.position.left>=685){
					ui.position.left=685
				}
				if(ui.position.left<=0){
					ui.position.left=0
				}
				//$('.footer-holder .progress').animate({width:  ui.position.left+"px"});
				$('.footer-holder .progress').css({width : ui.position.left+"px"});
				
				
				
				
            }
        });
	
	$('.footer-holder .scrubber').on('mousedown', function(e) {
		 //console.log('TOK: ' + e.type + ' seeking: ' + seeking);
		 seeking = true;
		 
		 $('#iePatch').css("display",'block')
		 setTimeout(function(){ 
			$("#iePatch").hide()
		}, 250);
			$('.footer-holder .play').css("opacity",'1')
				$('.footer-holder .play').removeClass('deactive')
				$('.footer-holder .play').addClass('playing')
		if (e.type == 'mousemove' && !seeking || $(this).hasClass("deactive")) {
			// console.log('mousemove: ' + seeking);
			return;
		}

		relativeLeft = (e.pageX - $(this).offset().left)/Model.scaleFactor
		var percPos = ((relativeLeft) / (this.offsetWidth));
		percPos = percPos <= 0 ? 0 : percPos;
		if (!$('.footer-holder .play').hasClass('playing')) {
			if (isAudio) {
				MEPlayer.play();
			}
			$('.footer-holder .play').addClass('playing');
			
			// trackTime();
		}else{
			// console.log("::::");

			$('.footer-holder .play').addClass('playing');
			
		}
		if (isAudio) {
			var currTime = 0;
			if($(".pageWrapper").hasClass("RTL"))
			{
				var tmpPercPos=-(percPos-1);
				currTime = tmpPercPos * getDuration();
				
			}else{
				currTime = percPos * getDuration();
				
			}
			MEPlayer.setCurrentTime(currTime);
			MEPlayer.play();
			//console.log(currTime+"<< currTime >>")
			if (timeline) {
				//console.log(relativeLeft /($('.footer-holder .scrubber').width())*MEPlayer.duration)
				timeline.seek(relativeLeft /($('.footer-holder .scrubber').width())*MEPlayer.duration);
		if(screenType=="Canvas"){
			iframe.contentWindow.canvasAnim.gotoAndStop(relativeLeft /($('.footer-holder .scrubber').width())*iframe.contentWindow.canvasAnim.totalFrames)
		}
				
				//console.log(tmpPercPos+"::::"+relativeLeft /($('.footer-holder .scrubber').width())*MEPlayer.duration)
				timeline.resume();
			
			}
		}
		if (isVideo) {
			var currTime = percPos*videojs.duration(videoNum);
			videojs.seekAndPlay(videoNum, currTime);
		}

		
	});

});

var AudioPlayer = function() {
	// console.log('[AP] AudioPlayer');
	audioCallBack = null;
	self = this;
};

AudioPlayer.prototype.loadAudioPath = function(_path, callBack) {
	/* console.log('[AP] loadAudioPath: _path: ' + _path + '  interActivityPage: ' + interActivityPage); */
	iPadDebug('[AP] loadAudioPath: _path: ' + _path + '  interActivityPage: ' + interActivityPage);
	 //console.log('[AP] load muted: ' + isMutedBeforeDestroy);
	//-- Function to be called at the end of audio

	audioCallBack = callBack;
	self.destroyAudio();
	audioLoaded = false;
	audioLoadFirstTime = true;
	initialAudioReset = false;

	_path = _path.split('.')[0];
	var _path_mp3 = String(_path + '.mp3');
	var _path_ogg = String(_path + '.ogg');

	//-- mediaelement player stuff ------------------------------------------------//
	//-- Instantiate jPlayer
	$("#jquery_jplayer").html("");
	var audio = document.createElement("audio");
	//debugger
	audio.src = _path_mp3;
	$("#jquery_jplayer").append(audio);

	playerVar = $(audio).mediaelementplayer({
		//mode: 'shim',
		pauseOtherPlayers : false,
		alwaysShowControls : false,
		enableKeyboard : false,
		enablePluginDebug : false,
		loop : false,
		success : function(player, node) {
			MEPlayer = player;
			MEPlayer.play();
			if (notMuted) {
				MEPlayer.setMuted(true);
			} else {
				MEPlayer.setMuted(false);
			}
			if (device.Android() || device.iOS()) {
				if (interActivityPage) {
					//MEPlayer.play();
				} else {
					if (device.iOSVersion() >= 8) {
					} else {
						MEPlayer.stop();
					}
				}
			}
			MEPlayer.addEventListener('canplay', function() {
				audioLoaded = true;
				// console.log(interActivityPage+":::" + audioLoadFirstTime+":::"+allAssestsLoaded);
				if (!interActivityPage && audioLoadFirstTime && !allAssestsLoaded) {
					
					//MEPlayer.pause();
					if (device.Android() && MEPlayer.currentTime) {
						MEPlayer.setCurrentTime(0);
					} else {

						MEPlayer.stop();
					}
					if ($("#preloaderSpinner_int").css("display") == "block") {
						$("#preloaderSpinner_int").css("display", "none");

					}
					//MEPlayer.setCurrentTime(MEPlayer.duration);
					loadedAssestsCnt++;
					//alert('audio Loaded');
					// console.log("[AP] audio Load Success" + loadedAssestsCnt);
					//ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
				} else if (!interActivityPage && audioLoadFirstTime && intActivityAudioReset) {
					MEPlayer.stop();

					var dur = MEPlayer.duration;
					$('.time .played').html(getTime(dur * 1000, true));
					$('.time .duration').html(getTime(dur * 1000, true));

					$("#preloaderSpinner_int").css("display", "none");

				} else {
					if (interActivityPage && audioLoadFirstTime) {
						// console.log("[AP] canplay Success" + interActivityPage);
						if (device.IEVersion() != 9) {
							MEPlayer.play();
						}

						//MEPlayer.play();
						allAssestsLoaded = true;
					}
					
						
						// $('.footer-holder .progress, .footer-holder .loaded').css('width', '100%');
						//$('.footer-holder .progress').css('width', '100%');
					

				}
				//$('.footer-holder .play').addClass('playing');
				// Player is ready
				// MEPlayer.play();
			}, false);
			MEPlayer.addEventListener('progress', function(e) {
				//
			}, false);
			MEPlayer.addEventListener('timeupdate', function(e) {
				
					if (isAudio) {
						if(MEPlayer!=null && MEPlayer!=undefined){
							var ct = MEPlayer.currentTime;
							var dur = MEPlayer.duration;
							updateDisplayTime(ct * 1000, dur * 1000);
						}
					}
					if(ct!=0){
						$(".dragger").css('left',ct/dur*685)
					}
				
				
				var videoCrnttime = ct;
				var totalDuration = dur		
				var timeLeft = parseInt(totalDuration - videoCrnttime)	
				var sec= new Number();
				var min= new Number();	
				 sec = Math.floor( timeLeft);    
				 min = Math.floor( sec / 60 );
				min = min >= 10 ? min : '0' + min;    
				sec = Math.floor( sec % 60 );
				sec = sec >= 10 ? sec : '0' + sec;
				
				var dsec= new Number();
				var dmin= new Number();	
				 dsec = Math.floor( totalDuration );    
				 dmin = Math.floor( dsec / 60 );
				dmin = dmin >= 10 ? dmin : '0' + dmin;    
				dsec = Math.floor( dsec % 60 );
				dsec = dsec >= 10 ? dsec : '0' + dsec;		
				if(allAssestsLoaded==true && videoCrnttime>0 && model.disablePlayPauseSlider==false ){
					$('.time').html(min + ":"+ sec + " / " + dmin + ":"+ dsec)
				}
				
			}, false);
			MEPlayer.addEventListener('playing', function(e) {
				if (audioInitiallyPause == true) {
					//$('.footer-holder .progress').css('width', '100%');
					audioInitiallyPause = false;
				} else {
					//alert($('.footer-holder .play').hasClass('replay') + "::" + $('.footer-holder .play').hasClass('playing'))
					
					
					
				}
				
				
				timeline.play()
			//	$('.menuovrlay').show()
				$('.footer-holder .play').css("opacity",'1')
				$('.footer-holder .play').removeClass('deactive')
				if(model.disablePlayPauseSlider==false){
					$('.footer-holder .play').addClass('playing')
					$('.footer-holder .scrubber').removeClass('deactive')
					$('.footer-holder .audioButton').removeClass('deactive')
					$('.footer-holder .audioButton').css("opacity",'1')
					$('.footer-holder .cssshell_transcript').removeClass('disableTranscript')
					
				}else{
					hideSupportingFacts()
					transcriptCounter = 0;
					$('.audiotcb').removeClass('transcript_btn_disable');
					$('.audiotcb').addClass('cssshell_transcript');
				  
				  $('.audiotcb').removeClass('transcript_btn_disable');
				  $('.audiotcb').addClass('cssshell_transcript');
					$('#transText').mCustomScrollbar("destroy");
					//$("#transcript").css("display", "none");
					$("#transcriptButton ").removeClass("transcriptClicked")	
					$('.footer-holder .play').removeClass('playing')
					$('.footer-holder .play').css("opacity",'0.5')
					$('.footer-holder .play').addClass('deactive')
					$('.footer-holder .scrubber').addClass('deactive')
					$('.footer-holder .play').removeClass('playing')
					$('.footer-holder .audioButton').css("opacity",'0.5')
					$('.footer-holder .audioButton').addClass('deactive')
					$('.footer-holder .cssshell_transcript').addClass('disableTranscript')
				}
				
			}, false);
			MEPlayer.addEventListener('ended', function(e) {
				//$('.menuovrlay').hide()
				$('.footer-holder .play').removeClass('playing')
				if(model.disablePlayPauseSlider==false){
					$('.footer-holder .progress').css('width', '100%');
				}
				self.audioEnd(e);
			
				$('.footer-holder .play').css("opacity",'0.5')
				$('.footer-holder .play').addClass('deactive')
			}, false);
			MEPlayer.addEventListener('pause', function(e) {
				// console.log('[AP] pause listener ' + e.currentTime);
				// console.log('[AP] pause listener paused: ' + e.paused);
				// console.log('[AP] pause listener ended : ' + e.ended);
				
				if (e.ended && e.currentTime == 0) {
					//$('.footer-holder .play').removeClass('playing')
					$('.footer-holder .progress').css('width', '100%');
				}
				;
			}, false);

		}
	});
	if( MEPlayer.muted ){
		if( volume == 1 ){
			audioPlayer.toggleMuteAudio();
		}
	}else{
		if( volume == 0 ){
			audioPlayer.toggleMuteAudio();
		}
	}

	if (showAudioLoading) {

		if (interActivityPage) {
			controller.gadgetsBtnDisable();
			//console.log("audio lgadgetsBtnDisable:if::");
			intActivityAudioReset = false;
			//$("#preloaderSpinner_int").show();
			$("#preloaderSpinner_int").css("display", "block");
		} else if (intActivityAudioReset) {
			$("#preloaderSpinner_int").css("display", "block");
		} else {

			// if ($("#preloaderSpinner").css("display") == "none") {
				// $("#preloaderSpinner").css("display", "block");
				// $("#shellDisabler").css("display", "block");
			// }

			//$("#preloaderSpinner").show();
		}
	}

};
AudioPlayer.prototype.StartAnimation = function() {
	if (!isAudio) {
		self.destroyAudio();
		controller.hideAudioControls();
		controller.hidePreloader();
		controller.gadgetsBtnEnable();
		$('.footer-holder .play').addClass('playing');
		return;
	}
	MEPlayer.play();
	allAssestsLoaded = true;
	controller.hideAudioControls();
	$('.time').html("00:00 / 00:00")
};

AudioPlayer.prototype.StartNavAnimation = function() {
	if (!isAudio) {
		self.destroyAudio();
		//controller.hideAudioControls();
		controller.hidePreloader();
		return;
	}
	allAssestsLoaded = true;
	//alert(":::::1::"+MEPlayer.pa);
	MEPlayer.play();

	//controller.hideAudioControls();
};

var isCJSAnimLoaded = false;
var isSoundLoaded = false;

function cjsAnimLoadedHandler(isCJS) {
	if (isCJS) {
		isCJSAnimLoaded = true;
	}
	// console.log('[AP] isCJSAnimLoaded: ' + isCJSAnimLoaded + ' :&& isSoundLoaded: ' + isSoundLoaded);
	if (isCJSAnimLoaded && isSoundLoaded) {
	}
}

AudioPlayer.prototype.pauseAudio = function() {
	// console.log('[AP] pauseAudio');
	if (isAudio) {
		MEPlayer.pause();
	}
	
	if (timeline) {
		timeline.pause();
	
	}
	
};

AudioPlayer.prototype.toggleMuteAudio = function() {
	// var muted = !pg_snd.getMute();
	notMuted = MEPlayer.muted;
	//console.log('[AP] toggleMuteAudio notMuted: ' + notMuted);
	if (notMuted) {
		//$('.icon-volume-mute').removeClass('icon-volume-mute').addClass('icon-volume');
		$(".audioTxt2").css("display", "inline");
		$(".audioTxt1").css("display", "none");
		MEPlayer.setMuted(false);
		notMuted = MEPlayer.muted;
	} else {
		//$('.icon-volume').removeClass('icon-volume').addClass('icon-volume-mute');
		$(".audioTxt1").css("display", "inline");
		$(".audioTxt2").css("display", "none");
		MEPlayer.setMuted(true);
		notMuted = MEPlayer.muted;
	}
	// console.log('[AP] muted: ' + my_jPlayer.data("jPlayer").options.muted);
	// pg_snd.setMute(muted);
};

AudioPlayer.prototype.resumeAudio = function() {
	// console.log('[AP] resumeAudio');
	if (isAudio) {
		MEPlayer.play();
	}
	
	if (timeline) {
		timeline.resume();
	}
};
AudioPlayer.prototype.audioEnd = function(e) {

	if ( typeof audioFinish != 'undefined' && $.isFunction(audioFinish)) {
		var _audioSrc = e.srcElement.currentSrc.split("/").pop()
		audioFinish(_audioSrc);

	}

};
AudioPlayer.prototype.destroyNavAudio = function() {
	if (MEPlayer) {
		MEPlayer.pause();
		allAssestsLoaded = false;
		window.MEPlayer = null;

	}

};

AudioPlayer.prototype.destroyAudio = function() {
	// console.log('[AP] destroyAudio');
	$('.footer-holder .progress').css('width', '0px');
	$('.time .played, .time .duration').html('00:00');

	if (MEPlayer) {
		//MEPlayer.stop();
		MEPlayer.pause();
		//isMutedBeforeDestroy = MEPlayer.setMuted(true);
		window.MEPlayer = null;
		
	}

	if (!interActivityPage) {
		//$('.pgcontent').hide();
	}

	//-- Patch debug info onto title for iPad
	if ($('.page_title > p').hasClass('debug')) {
		// $('.page_title > p').text("CLEAR");
	}
};
AudioPlayer.prototype.audioReset = function() {
	

	interActivityPage = false;
	intActivityAudioReset = true;
	showAudioLoading = true;

	audioPlayer.loadAudioPath(model.audioPath + popupAudios[0]);
	controller.assignTranscript(transcript[0]);
	if (device.iOSVersion() >= 8) {
	} else {
		MEPlayer.stop();
	}
	audioInitiallyPause = true;
	initialAudioReset = true;

};

function updateDisplayTime(tt, dd) {
/* console.log("updateDisplayTime:::" + tt + "::::::::" + dd); */
	if (tt > 0) {
		if (!firstTime) {
			firstTime = true;
		}
		if(model.disablePlayPauseSlider==false){
			$('.footer-holder .progress').css({
				width : (100 * tt / dd) + '%'
			});
		}
		
		if (audioLoadFirstTime && allAssestsLoaded) {
			
			audioLoadFirstTime = false;
			if (!intActivityAudioReset) {
				if(!navigationTour){

					if(pageLoad==false){

						playAnimInit();
					}
					

				}
				if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
				} else {
					//backgroundLoader.loadNextPageAsssets();
				}
			} else {
				playAnimation("main");
			}
			if (interActivityPage) {
				controller.gadgetsBtnEnable();
				$("#preloaderSpinner_int").css("display", "none");
			} else {
				//$("#preloaderSpinner").css("display", "none");
				//$("#shellDisabler").css("display", "none");
				if (!intActivityAudioReset) {
					controller.gadgetsBtnEnable();
				}
				
					
				
			}
		}
		$('.time .played').html(getTime(tt, true));
		$('.time .duration').html(getTime(dd, true));
		if (device.AndroidPhone()) {
			if (getTime(tt, true) == getTime(dd, true)) {
				if(model.disablePlayPauseSlider==false){
					$('.footer-holder .progress').css('width', '100%');
				}
				self.audioEnd();
			}
		}
	} else {
		if (device.Firefox()) {
			audioLoaded = true;
		}

		//-- Only for Interactivity pages - audio reset
		if (initialAudioReset) {
			initialAudioReset = false;
			//$('.footer-holder .progress').css('width', '100%');
		}
	}
}

this.getDuration = function() {
	if (MEPlayer) {
		return MEPlayer.duration;
	} else {
		return 0;
	}
};

this.getTime = function(nMSec, bAsString) {
	// convert milliseconds to mm:ss, return as object literal or string
	var nSec = Math.floor(nMSec / 1000), min = Math.floor(nSec / 60), sec = nSec - (min * 60);
	//console.log(nMSec + ' :: ' + nSec);
	// if (min === 0 && sec === 0) return null; // return 0:00 as null
	return ( bAsString ? ((min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)) : {
		'min' : min,
		'sec' : sec
	});
};

this.leftPos = function(elem) {
	var curleft = 0;
	if (elem.offsetParent) {
		do {
			curleft += elem.offsetLeft;
		} while (elem = elem.offsetParent);
	}
	return curleft;
};

function iPadDebug(msg) {
	if ($('.page_title > p').hasClass('debug')) {
		$('.page_title > p').append('<br>' + msg);
	} else {
		$('.page_title').append('<p class="debug" style="color: #FF0000; text-align: left; text-shadow: 1px 1px 2px #000000; max-height: 470px; overflow-y: auto; position: absolute; top: 100px; width: 50%; z-index: 2000">Debug:<br>' + msg + '</p>');
	}
}
