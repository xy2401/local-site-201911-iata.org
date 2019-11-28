
var markerArr = [];
var currAudioIndex = -1;
var isPgAnimInit = false;
var audioComp = false;
//var timeLineAnim = new TimelineLite();

function initAnimStates() {
	$(".scrubber").css('display', 'none');
	$(".played").css('display', 'none');
	$(".duration").css('display', 'none');
	$(".time_seperator").css('display', 'none');
	$("#divider").css('display', 'none');
	$('.content_blocker').hide();
	isPgAnimInit = false;
	if (model.currPage != 0) {
		//hideIText($('.click_next_Continue'));
	}
}

function playAnimInit() {
	// console.log('## isPgAnimInit: ' + isPgAnimInit);
	if (!isPgAnimInit) {
		isPgAnimInit = true;
		$('.pageWrapper, .shell_audio_nav, .shell_topbar').show();
		$('.shell_all_audio').show();
		playAnimation("main");
	} else {
		
		if (interActivityPage) {
			playAnimation('interActivity');
		} else {
			playAnimation("interActivityReset");
		}
	}
	
}

function playCJSAnimFrom(percPos) {
	//-- Used as a hook for CreateJS animations
	var anim_ifrm = document.getElementById('anim_iframe');
	if (anim_ifrm) {
		var anim_ref = anim_ifrm.exportRoot ? anim_ifrm.exportRoot : anim_ifrm.contentWindow.exportRoot;
		if (anim_ref) {
			// console.log('[AU] anim_ref: ' + anim_ref + ' %: ' + percPos);
			// console.log('[AU] %: ' + percPos);
			if (!isNaN(parseInt(percPos))) {
				anim_ref.gotoAndPlay(anim_ref.timeline.duration * percPos);
			} else if (percPos == 'pause') {
				anim_ref.stop();
			} else if (percPos == 'resume') {
				anim_ref.play();
			} else if (percPos == 'play') {
				anim_ref.gotoAndPlay(0);
			}
		}
	}
}

function animateIn(el) {
	// TweenLite.set(el, {
		// clearProps : 'opacity'
	// });
	var tl = new TimelineLite({
		paused : true
	}).to(el, .5, {
		opacity : 1
	});
	return tl;
}

function animateChangeColor(el, colorRange) {
	TweenLite.set(el, {
		clearProps : ''
	});
	var tl = new TimelineLite({
		paused : true
	}).to(el, .5, {
		color : colorRange
	});
	return tl;
}

function animateOut(el) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 1, {
		opacity : 0,
		autoAlpha : 1
	});
	return tl;
}

function animateOut(el, dur) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, dur, {
		opacity : 0,
		autoAlpha : 1
	});
	return tl;
}

function animateIn_show(el) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	var tl = new TimelineLite({
		paused : true
	}).from(el, .5, {
		autoAlpha : 0,
		//left : "200px",
		display : 'none'
	});
	return tl;
}

function animateOut_hide(el) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 1, {
		opacity : 0,
		//left : "-200px",
		display : 'none'
	});
	return tl;
}

function animateInLeft_show(el, pos) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	var tl = new TimelineLite({
		paused : true
	}).from(el, .2, {
		autoAlpha : 0,
		left : pos + "px",
		display : 'none'
	});
	return tl;

}

function animateOutLeft_hide(el, pos) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	var tl = new TimelineLite({
		paused : true
	}).from(el, .0, {
		autoAlpha : .2,
		left : pos + "px",
		display : 'none'
	});
	return tl;
}

function animateDown(el, topPos) {
	TweenLite.set(el, {
		clearProps : 'opacity'
	});
	var tl = new TimelineLite({
		paused : true
	}).from(el, 1, {
		top : topPos,
		autoAlpha : 0
	}, "feature-=0.25");
	return tl;
	/**TweenMax.to(myElement, 1, {width:"50%", height:"300px", backgroundColor:"#ff0000", delay:1});*/
}

function animateDown1(el, topPos) {
	TweenLite.set(el, {
		//clearProps : 'opacity'
	});
	var tl = new TimelineLite({
		paused : true
	}).from(el, 1, {
		top : topPos,
		autoAlpha : 0
	}, "feature-=0.25");
	return tl;
	/**TweenMax.to(myElement, 1, {width:"50%", height:"300px", backgroundColor:"#ff0000", delay:1});*/
}

function animateInFromLeft(el) {
	TweenLite.set(el, {
		clearProps : 'width'
	});
	var tl = new TimelineLite({
		paused : true
	}).from(el, 1, {
		width : 0
	});
	return tl;
}

var tween1;
function animateScale(el) {
	if (tween1) {
		tween1.kill();
		tween1 = null;
	}
	tween1 = TweenMax.to(el, 0.5, {
		backgroundColor : "#FFFF00",
		scaleX : 1.1,
		scaleY : 1.1,
		force3D : true,
		yoyo : true,
		repeat : -1
	});

}

var tween2;
function animateHighligh(el) {
	if (tween2) {
		tween2.kill();
		tween2 = null;
	}
	tween2 = TweenMax.fromTo(el, 0.2, {
		backgroundColor : "#f60"
	}, {
		backgroundColor : "#9FA617",
		repeat : -1,
		yoyo : true
	});
}

function animateOutRemove(el, callBack, param) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 0.2, {
		opacity : 0,
		display : 'none',
		width : "0px",
		//left:"50%",
		onComplete : function() {

			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}

function animateOutRemove1(el, callBack, param, pos) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 0.5, {
		opacity : 0,
		display : 'none',
		left : "-250px",
		onComplete : function() {

			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}

function animateInRemove(el, callBack, param) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 0, {
		opacity : 1,
		display : 'block',

		onComplete : function() {
			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}

function animateInLeft1(el, callBack, param, pos) {
	var tl = new TimelineLite({
		paused : true
	}).from(el, 0.5, {
		display : 'block',
		opacity : 1,
		left : pos + "px"
	}).to(el, 0.5, {
		opacity : 1,
		display : 'block',

		//zIndex:100,

		/*marginRight:"100px",*/
		onComplete : function() {
			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}

function m_animateInLeft1(el, callBack, param, pos) {
	var tl = new TimelineLite({
		paused : true
	})./*from(el,0.5,{display : 'block',opacity : 1,left:pos+"px"}).*/to(el, 0.5, {
		opacity : 1,
		display : 'block',
		left : "-100px", //pos+"px",
		//zIndex:100,

		/*marginRight:"100px",*/
		onComplete : function() {
			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}

function animateInRight(el, callBack, param, pos) {
	var tl = new TimelineLite({
		paused : true
	}).from(el, 0.5, {
		display : 'block',
		opacity : 1,
		right : pos + "px"
	}).to(el, 0.5, {
		opacity : 1,
		display : 'block',
		/*right:pos+"px",*/
		/*zIndex:100,*/

		/*marginRight:"100px",*/
		onComplete : function() {
			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}

function m_animateInRight(el, callBack, param, pos) {
	var tl = new TimelineLite({
		paused : true
	})./*from(el,0.5,{display : 'block',opacity : 1,right:pos+"px"}).*/to(el, 0.5, {
		opacity : 1,
		display : 'block',
		left : '100px', //"px",
		/*zIndex:100,*/

		/*marginRight:"100px",*/
		onComplete : function() {
			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}

function animateOutRight(el, pos) {
	var tl = new TimelineLite({
		paused : true
	})./*from(el,0.5,{display : 'block',opacity : 1,right:pos+"px"}).*/to(el, 0.5, {
		opacity : 0,
		display : 'none',
		right : "150px",//pos+"px",
		/*zIndex:100,*/

		/*marginRight:"100px",*/
		/*onComplete : function() {
		 if (callBack == '') {

		 } else {
		 if (param == undefined) {
		 } else {
		 if (param[0]) {
		 window[callBack](param);
		 }
		 }
		 }
		 tl.kill();
		 }*/
	});
	return tl;
}

function animateScaleOut(el) {
	//TweenMax.to(el, 1.2, {scaleX:1, scaleY:1});
	var tl = new TimelineLite({
		//paused : true
	}).to(el, 1, {
		scaleX : 1,
		scaleY : 1,
		backgroundColor : "#249fe9"
	});
	return tl;
}

function animateOutDisplayNone(el) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 1, {
		opacity : 0,
		display : 'none'
	});
	return tl;
}

function DisplayBlock(el) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 1, {
		display : 'Block'
	});
	return tl;
}

function animateRotate(el, ang) {
	var tl = new TimelineLite();
	tl.from(el, .5, {
		scale : 0,
		opacity : 0.3,
		rotation : ang
	}, 1);
	return tl;
}

function animateLineVSpin(el) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	var tl = new TimelineLite();
	tl.to(el, 1, {
		rotation : 360
		//ease : Elastic.easeOut
	}, 1);
	return tl;
}

/*function animateHighligh(el) {

 TweenMax.fromTo(el, 0.7, {
 boxShadow: "0px 0px 0px 0px rgba(0,255,0,0.3)"}, {
 boxShadow: "0px 0px 20px 10px rgba(0,255,0,0.7)",
 repeat: -1,
 yoyo: true

 });​
 }*/

function animateSpinQ(el) {
	var tl = new TimelineLite();
	tl.to(el, 0.3, {
		autoAlpha : 1
	});
	tl.to(el, 7, {
		scale : 1,
		ease : Linear.easeNone,
		autoRound : false
	}, 0);
	tl.to(el, 6, {
		rotation : 360.2
	}, 1);
	tl.to(el, 0.3, {
		x : 60,
		ease : Power1.easeInOut
	}, 2.2);
	tl.to(el, 1.8, {
		x : 0,
		ease : Elastic.easeOut
	}, 2.5);
	tl.to(el, 3, {
		rotationX : 360,
		ease : Elastic.easeOut
	}, 3.5);
	return tl;
}

function updateSlider() {
	/*  Debug feature: can add this onUpdate of TL to view the progress of animation
	* 	tll = new TimelineLite({
	*	  onUpdate : updateSlider
	*	});
	* * */
	//console.log(tll)
	// console.log('UUU: ' + tll.progress() * 100);
	// console.log('[AU] isAudio: ' + isAudio);
	if (!isAudio && !isVideo) {
		var prog = tll.progress();
		var dur = tll.totalDuration();
		updateDisplayTime(prog * 10000, dur * 1000);
		$('.footer-holder .progress').css({
			width : (prog * 100) + '%'
		});
	};
	//
	// var progPerc = prog * 100;
	// $('#slider').addClass('change').attr('data-time', (Math.round(prog * dur) + '/' + dur + ' : ' + Math.round(progPerc)) + '%');
	// $('#slider').css({
	// width : progPerc + '%'
	// });
	$('.content_blocker').show();
}

function animCompleted() {
	//controller.setPageVisited();
	if (!isAudio) {
		// console.log('animCompleted!!!!');
		// $('.footer-holder .play').removeClass('playing').addClass('replay');
		// $('.footer-holder .progress').css('width', '100%');
	}
	$('.content_blocker').hide();
}

function animateInLeft(el, pos) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	if ($(".pageWrapper").hasClass("RTL")) {
		var tl = new TimelineLite({
			paused : true
		}).from(el, .2, {
			autoAlpha : 0,
			right : pos + "px"
		});
	} else {
		var tl = new TimelineLite({
			paused : true
		}).from(el, .2, {
			autoAlpha : 0,
			left : pos + "px"
		});
	}
	return tl;
}

function animateOutLeft(el, pos) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	var tl = new TimelineLite({
		paused : true
	}).from(el, .0, {
		autoAlpha : .2,
		left : pos + "px"
	});
	return tl;
}

function leftPos(elem) {
	var curleft = 0;
	if (elem.offsetParent) {
		do {
			curleft += elem.offsetLeft;
		} while (elem = elem.offsetParent);
	}
	return curleft;
}

