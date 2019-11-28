var pageLoad = false;
var StartPage = true;
var ExternalData;
var currentExtDataPath;
var ExternalDataLoad = false;
var PreAssests = "";
var interActivityPage = false;
var transcript = [];
var titlesArr = [];
var mobTitlesArr = [];
var testTitlesArr = [];
var canvas = false;
var totalScripts;
var preMenu = "";
var preMenuID = "";
var timeLineObj
var isGlossaryOpen = false
var ishelpOpen = false
var isMenuOpen = false
var isResourcesOpen = false
var loadedAssestsCnt = 0;
var assestCnt = 0;
var modCompleted = false;
var nxtBakDisable = false;
var moduleTitle = false;
var pageTitle = false;
var modTitleTimer;
var pageTitleTimer;
var pageTitleTxt;
var moduleTitleTxt;
var titleDuration = 1000;
var FFData;
var FFDataArr = [];
var FFRandomArr = [];
var videoBack = false;
var FFDataCnt = 0;
var FFVideo;
var resourceTitlesArr = [];
var resourceIconArr = [];
var resourceDataArr = [];
var pageLoadingAnim = false;
var UITxtData;
var audTiming = [];
var txtLen = 29;
var directionSide = "left";
var volume = 1;
var videojs = null;
var isVideo = false;
var videoNum = 0;
var transcriptCounter = 0;
var topicTittles = []
var preloadAudio = [];
var loaded = 0;
var helpAudioEle = null;

function preloadAudios(url) {
	var audio = document.getElementById('preloadAudioPlayer');
	audio.addEventListener('canplay', loadedAudio, false);
	audio.setAttribute('src', model.audioPath + url);
	audio.onerror = function () {
		let s = "";
		let err = audio.error;

		switch (err.code) {
			case MediaError.MEDIA_ERR_ABORTED:
				s += "The user canceled the audio.";
				break;
			case MediaError.MEDIA_ERR_NETWORK:
				s += "A network error occurred while fetching the audio.";
				break;
			case MediaError.MEDIA_ERR_DECODE:
				s += "An error occurred while decoding the audio.";
				break;
			case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
				s += "The audio is missing or is in a format not supported by your browser.";
				break;
			default:
				s += "An unknown error occurred.";
				break;
		}

		let message = err.message;

		if (message && message.length) {
			s += " " + message;
		}
		loadedAudio()
		//console.log("<strong>Error " + err.code + ":</strong> " + s + "<br>");
	};
}


function loadedAudio() {
	loaded++;
	//console.log(loaded+"===="+preloadAudio.length)
	if (loaded == preloadAudio.length) {
		audioLoaded = true
		//console.log("All audios are preloaded now.")
		loaded = 0
		preloadAudio = []
		controller.loadExternalData();

		pageContiner.load(model.pagePath + model.modArr[model.currMod][model.currPage].path, function () {
			if (model.langName == "ar/") {
				$(".pageWrapper").addClass("RTL");
				directionSide = "right";
			}

		});

	} else {
		preloadAudios(preloadAudio[loaded])
	}
}
var Controller = function () {
	this.buttonState = {
		"next": true,
		"back": true,
		"menu": true,
		"glossary": true,
		"resources": true,
		"exit": true
	};

	/*****buttons****/
	nextBtn = this.assignControls($("#shell_next"));
	backBtn = this.assignControls($("#shell_back"));
	gadgetsBtn = this.assignControls($("#gadgetsButn"));
	modTitleBtn = this.assignHOver($("#modTitle"));
	pageTitleBtn = this.assignHOver($("#modTitle"));
	//-- Fun Fact updates

	//-- END: Fun Fact updates
	replay_btn = this.assignControls($("#replay_btn"));
	glossaryBtn = this.assignControls($("#glossarybtn"));
	glossaryCloseBtn = this.assignControls($("#glossaryCloseBtn"));
	Resourcebtn = this.assignControls($("#Resourcesbtn"));
	helpBtn = this.assignControls($("#helpbtn"));
	helpCloseBtn = this.assignControls($("#help_close_button"));
	resourceCloseBtn = this.assignControls($("#resource_close"));
	noteBtn = this.assignControls($("#shell_note"));
	muteBtn = this.assignControls($("#shell_mute"));
	audioBtn = this.assignControls($("#audio_Icon"));
	transcriptBtn = this.assignControls($("#shell_transcript"));
	glossaryBtn_phone = this.assignControls($("#shell_glossary_phone"));
	resourcesBtn_phone = this.assignControls($("#Resourcesbtn_phone"));
	helpBtn_phone = this.assignControls($("#helpbtn_phone"));
	noteBtn_phone = this.assignControls($("#shell_note_phone"));
	transcript_phone = this.assignControls($("#shell_transcript_phone"));
	menuBtn = this.assignControls($("#menubtn"));
	menuBtn_pop = this.assignControls($("#shell_hot_menu_pop"));
	exitBtn = this.assignControls($("#shell_exit"));
	yesBtn = this.assignControls($("#shell_yes_btn"));
	noBtn = this.assignControls($("#shell_no_btn"));
	/*****buttons popup****/
	glossaryPop = this.assignControls($("#shell_g_ppopup"));
	resourcesPop = this.assignControls($("#shell_r_ppopup"));
	helpPop = this.assignControls($("#shell_h_ppopup"));
	notePop = this.assignControls($("#shell_n_ppopup"));
	popup_disable_bg = this.assignControls($("#shell_popup_bg"));
	menupop = this.assignControls($("#shell_menu_pop"));
	exitPop = this.assignControls($("#shell_e_ppopup"));
	/*****popup close button****/
	popG_Close = this.assignControls($("#shell_g_close"));
	popR_Close = this.assignControls($("#shell_r_close"));
	popH_Close = this.assignControls($("#shell_h_close"));
	popN_Close = this.assignControls($("#shell_n_close"));
	popE_Close = this.assignControls($("#shell_e_close"));
	popM_Close = this.assignControls($("#shell_m_close"));
	pageContiner = $("#shell_pageLoader");
	menuCourseTitle = $("#modTitle");
	$('#shell_n_popup_content').on('input paste focus', this.saveNoteData);
	audioControls = $("#shell_audio_pd");
	videoObject = null;
	VideoControls = null;
	defaultVideo = null;
	videoPauseState = false;
	videoObject_JQ = null;
	isDisableTranscript = false;
	this.menuUpdateBy = "system";
	//used when menu needs to updated, when user press next back and menu is open;
	if (!device.Android() && !device.iPhone() && !device.iPad()) {
		$(".shell_exit").show();
		$(".shell_exit_icon").show();
	} else {
		$(".shell_exit").hide();
		$(".shell_exit_icon").hide();
	}
	//===============
	model = new Model();
	model.addCustomEvent("updateView", this.updateViewNow);
	menu = new Menu(model.menuData);
	menu.addCustomEvent("menuReady", this.updateModel);
	// model.init();




};
Controller.prototype.setLangImagePath = function () {
	if (model.langName == "en/") {
		//-- Use original path for en
		return;
	}
	$('.pageWrapper img[class*="lang-"]').each(function (index) {
		var langNm = model.langName.slice(0, -1);
		// console.log('[Controller]setLangImagePath: hasClass >>>>> lang-' + langNm + ' ??? ' + $(this).hasClass('lang-' + langNm));
		if (!$(this).hasClass('lang-' + langNm)) {
			//-- The required lang-xx Class is not found in the image
			return;
		}
		// console.log('[Controller]setLangImagePath: orig : ' + $(this).attr('src'));
		if ($(this).attr('src').indexOf('_' + langNm + '.') != -1) {
			//-- Already replaced
			return;
		}
		var tmpath = $(this).attr('src').split('.');
		if (tmpath[1] != undefined) {
			//-- Suffix lang code to image name
			$(this).attr('src', tmpath[0] + '_' + langNm + '.' + tmpath[1]);
			// console.log('[Controller]setLangImagePath: lang : ' + $(this).attr('src'));
		}
	});
};
Controller.prototype.assignControls = function (_btn) {
	// console.log('[Controller] assignControls _btn: ' + _btn.attr('id'));

	_btn.on("click", this.fnClick);
	return _btn;
};
Controller.prototype.assignHOver = function (_btn) {
	if (device.iPhone() || device.Android() || device.iPad()) {
		_btn.on("touchstart", this.fnMouseOver);
	} else {
		_btn.on("mouseover", this.fnMouseOver);
		_btn.on("mouseout", this.fnMouseOut);
	}
	return _btn;
};



Controller.prototype.updateViewNow = function () {
	// console.log('[Controller] updateViewNow');
	//console.log(":::modCompleted::::"+modCompleted);
	screenType = ""
	$('.footer-holder .playButton').removeClass("forcePause")
	//backgroundLoader.loadMute();

	audioPlayer.destroyAudio();
	$(".NavTour").css("display", "none");
	$("#preloaderSpinner").show();
	$('#shellDisabler').show();
	$(".scrubber .dragger").css("left", "0px");
	$(".shell_pageHolder").css("background", "none");
	nxtBakDisable = false;
	controller.gadgetsBtnDisable();
	pageLoad = false;
	pageLoadingAnim = false;
	interActivityPage = false;
	intActivityAudioReset = false;
	showAudioLoading = true;

	controller.setPageVisitedInitial();
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
	transcriptBtn.css("opacity", "1");
	transcriptBtn.removeClass(transcriptBtn.attr("class"));
	isDisableTranscript = false;
	showBuffer(true);

	videoObject = null;
	orientationChange = undefined;
	//function defined in pages if page needed orientationChange event
	//====================Course title in menu==================
	//______________________________for em dash isssue__________________________
	//var tempText = model.menuData.structure.module[model.currMod].page[model.currPage].title;

	var tempText = titlesArr[model.currPage].text;
	//console.log(tempText)


	//debugger
	updateNextBackTitle(model.currPage)
	var titleText = tempText.replace("@emdash", "<span class='emdash'>&mdash;</span>");
	titleText = titleText.replace("@endash", "<span class='endash'>&ndash;</span>");
	$(".CourseTitle-TT").css("display", "none");
	$(".PageTitle-TT").html(titleText.trim());
	pageTitleTxt = titleText;
	var totalTextLen = Number($(".course_title").text().length) + Number(titleText.length);
	menuCourseTitle.html(topicTittles[model.currPage].module);
	$(".menu_course_title").html(topicTittles[model.currPage].module)
	pageContiner.find("div").remove();
	pageContiner.html("");
	$('.footer-holder .scrubber').unbind("RESET_SLIDER");

	function updateNextBackTitle(_pageId) {
		if (titlesArr[_pageId - 1]) {
			//console.log("actpageID",_pageId,"currentpageID",_pageId-1)
			var pageID = _pageId - 1
			// if (pageID == 3) {
			// 	pageID = 2;
			// } else if (pageID == 13) {
			// 	pageID = 8;
			// } else {
			// 	pageID = _pageId - 1
			// }
			var tempText = titlesArr[pageID].text
			var titleText = tempText.replace("@emdash", "<span class='emdash'>&mdash;</span>");
			titleText = titleText.replace("@endash", "<span class='endash'>&ndash;</span>");
			$("#back_title span").html(titleText.trim());
		}
		if (titlesArr[_pageId + 1]) {
			var pageID = _pageId + 1
			// if (pageID ==  3){
			// 	pageID = 4;
			// } else if (pageID == 9){
			// 	pageID = 14;
			// }else{
			// 	pageID = _pageId + 1
			// }
			$("#next_title span").html("Key Learning Points")
			var tempText = titlesArr[pageID].text
			var titleText = tempText.replace("@emdash", "<span class='emdash'>&mdash;</span>");
			titleText = titleText.replace("@endash", "<span class='endash'>&ndash;</span>");
			$("#next_title span").html(titleText.trim());

		}
	}

	$("#shell_back,#shell_next").hover(function () {
		var self = this;
		TweenMax.to($(self).find(".nxtBackTitle"), 0.3, {
			css: {
				width: "300px"
			},
			onComplete: function () {
				$(self).find(".nxtBackTitleTxt").css("opacity", "1")
			}
		}, 0.3);

		$(self).find(".nxtBackTitleTxt").css("opacity", 0)
		TweenMax.to($(self).find(".nxtBackTitle"), 0.3, {
			css: {
				width: "300px"
			},
			onComplete: function () {
				$(self).find(".nxtBackTitleTxt").css("opacity", 1)
			}
		}, 0.3);

	}, function () {
		var self = this;
		$(self).find(".nxtBackTitleTxt").css("opacity", 0)
		TweenMax.to($(self).find(".nxtBackTitle"), 0.3, {
			css: {
				width: "4px"
			},
			onComplete: function () {
				$(self).find(".nxtBackTitleTxt").css("opacity", 0)
			}
		}, 0.3);
		//	$(this).find(".btn_Inside").removeClass('hover2')
	});

	// }

	// console.log(model.visitedArr[model.currMod][model.currPage])
	// if(model.visitedArr[model.currMod][model.currPage]==1){
	// nextBtn.css('opacity','1')
	// nextBtn.removeClass('disabled');
	// $(".next .nextSelected").css('opacity','0')

	// }
	//=============================================================
	menu.updateMenu(model.currPage, model.currMod, model.visitedArr);
	TweenMax.killTweensOf($("#shell_next,.next .nextSelected"));
	timeLineObj = null

	$(".next .nextSelected").css('opacity', '0')
	$("#shell_next").css('-ms-transform', 'scale(1)')
	$("#shell_next").css('transform', 'scale(1)')
	$("#shell_next").css('-webkit-transform', 'scale(1)')

	//====================Enable disable next back button=========
	if ((model.currPage == 0) && model.currMod == 0) {
		backBtn.addClass('disabled');
	} else {
		backBtn.removeClass('disabled');
	}
	$("#instruct_next").hide()
	if (model.learningType == "linear") {
		nextBtn.addClass('disabled');
		//nextBtn.css('opacity','0.5')

	} else {
		nextBtn.css('opacity', '1')
		nextBtn.removeClass('disabled');
	}


	if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
		nextBtn.addClass('disabled');
		//nextBtn.css('opacity','0.5')

	}


	//============Displaying current page of total page====
	var tempTotalPage = 0;
	var tempCurrPage = 0;
	for (var i = 0; i < model.modArr.length; i++) {
		if (model.currMod == i) {
			tempCurrPage = tempTotalPage + model.currPage + 1;
		}
		tempTotalPage += model.modArr[i].length;
	}

	tempCurrPage = tempCurrPage > 9 ? tempCurrPage : ('0' + tempCurrPage);
	tempTotalPage = tempTotalPage > 9 ? tempTotalPage : ('0' + tempTotalPage);

	if (model.Pagination == "module level") {
		if ($("body").hasClass("RTL")) {


			$(".page-no").html("<span class='pageNoLeft'>" + (tempTotalPage) + "</span>" + "<span class='pageNoRight'> " + (tempCurrPage <= 9 ? "0" + tempCurrPage : tempCurrPage) + "</span>");

		} else {
			$(".page-no").html("<span class='pageNoLeft'>" + (tempCurrPage) + "</span>" + "<span class='pageNoRight'> " + (tempTotalPage <= 9 ? "0" + tempTotalPage : tempTotalPage) + "</span>");
		}
	} else {
		if ($("body").hasClass("RTL")) {

			$(".page-no").html("<span class='pageNoLeft'>" + (model.modArr[model.currMod].length) + "</span>" + "<span class='pageNoRight'> " + (tempCurrPage <= 9 ? "0" + tempCurrPage : tempCurrPage) + "</span>");

		} else {
			// console.log(model.currMod)
			$(".page-no").html("<span class='pageNoLeft'>" + (tempCurrPage) + "</span>" + "<span class='pageNoRight'> " + (model.modArr[model.currMod].length <= 9 ? "0" + model.modArr[model.currMod].length : model.modArr[model.currMod].length) + "</span>");
		}
		$(".shell_pageHolder_bg_image").css('display', 'none');
	}
	controller.calculateAssests();
	modCompletion()

};

function modCompletion() {
	var tempCourseFinish = 0;
	var tempTotalPage = 0;
	for (var i = 0; i < model.visitedArr.length; i++) {
		tempTotalPage += model.visitedArr[i].length;
		for (var j = 0; j < (model.visitedArr[i].length); j++) {
			if (model.visitedArr[i][j] == 1 || model.visitedArr[i][j] == '1') {
				tempCourseFinish++;
			}
		}
	}
	var ModPercentage = Math.round((tempCourseFinish / (tempTotalPage)) * 100);
	/* console.log(model.visitedArr+":::"+tempCourseFinish+"::ModPercentage:::"+ModPercentage); */
	if (ModPercentage == 100) {
		modCompleted = true;
		model.scormHandler.setComplete();
		/* console.log("Module is completed") */
	}
	if (isSCORM) {
		model.scormHandler.getValue();
	}

}

function countWords(str) {
	str = str.replace(/(^\s*)|(\s*$)/gi, "");
	str = str.replace(/[ ]{2,}/gi, " ");
	str = str.replace(/\n /, "\n");
	return str.split(' ').length;
}

function addtitle(str) {
	var tempStr = "";
	var finalStr = "";
	var emptyStr = " ";
	if (moduleTitle) {
		var limitedLen = 25;
		var titleTextLen = 0;
	}
	if (pageTitle) {
		if (!device.MobileDevice()) {
			var limitedLen = 68;
			var titleTextLen = Number($(".course_title").text().length);
		} else {
			var limitedLen = 25;
			var titleTextLen = 0;
		}
	}

	for (var i = 0; i < str.length; i++) {
		tempStr += emptyStr + str[i];
		var tempStrLength = titleTextLen + tempStr.length;
		if (tempStrLength < limitedLen) {
			finalStr = tempStr;
		}

	}
	if (finalStr != tempStr) {
		finalStr = finalStr + " ...";
	}
	return finalStr;
}

Controller.prototype.assignTranscript = function (myPage) {
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
	$('#transText').html(myPage);
	$("#transText").scrollTop(0);
	$('#transText').mCustomScrollbar();
	$('#transText').mCustomScrollbar("update");

};
//function for close transcript popup
//Controller.prototype.hidetranscript= function() {
function hidetranscript() {
	toggleTranscript();
	$('.audiotcb').removeClass('transcript_btn_disable');
	$('.audiotcb').addClass('cssshell_transcript');
}

Controller.prototype.hidetranscriptPage = function () {
	$("#transcript").css("display", "none");
	transOpened = false;

	$('.transcript_btn').removeClass('GadgetDisable');
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
};

Controller.prototype.TranscriptDisableFn = function () {
	//function assignTranscript(myPage) {
	//$(".transcript_btn").css("opacity","0.5")
	muteBtn.css("opacity", "0.7");
	muteBtn.removeClass(transcriptBtn.attr("class"));
	muteBtn.addClass("GadgetDisable");
	transcriptBtn.css("opacity", "0.7");
	transcriptBtn.removeClass(transcriptBtn.attr("class"));
	transcriptBtn.addClass("GadgetDisable");
	$("#transcript").css("display", "none");
	isDisableTranscript = true;
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
};

//HelpViewController
function helpViewController(openHelpViewFlag){
	if(openHelpViewFlag){
		if(helpAudioEle == null){
			helpAudioEle = document.createElement("audio");
			helpAudioEle.preLoad = true;
			helpAudioEle.type = "audio/mp3";
			helpAudioEle.src = 'shell/audio/HT_00b.mp3';			
		}

		//helpAudioEle.currentTime = 0;
		helpAudioEle.play();	
		
			//  kill code start
			// TweenMax.to($("#helpDrp").find(".helpcaptainImg"), 0, { css: { opacity: "0", left: "0", } }, 0);
			// TweenMax.to($("#helpDrp").find(".bubble"), 0, { css: { opacity: "0" } }, 0);
			//TweenMax.to($("#helpDrp").find(".helpcaptainAnimation"), 0, { css: { display: "block", } }, 0);
			TweenMax.to($("#helpDrp").find(".helpscreen_window"), 0, { css: { display: "block", } }, 0);
			TweenMax.to($("#helpDrp").find(".middletextbox"), 0, { css: { display: "block", } }, 0);
			//  kill code end

			helpAudioEle.ontimeupdate = function(){
				var _time = helpAudioEle.currentTime;
				console.log("timeee ->>>>>",_time)

				// if (_time >= 0.5 &&  _time <= 2){
				// 	TweenMax.to($("#helpDrp").find(".helpcaptainImg"), 0.5, { css: { opacity: "1", left: "130px", }}, 0.5);
				// 	TweenMax.to($("#helpDrp").find(".bubble"), 0.5, { css: { opacity: "1" } }, 0.5);
				// }
				// else if (_time >= 13.017) {
				// 	TweenMax.to($("#helpDrp").find(".helpcaptainAnimation"), 0.5, { css: { display: "none", } }, 0.6);
				// 	TweenMax.to($("#helpDrp").find(".helpscreen_window"), 0.5, { css: { display: "block", } }, -0.5);
				// 	TweenMax.to($("#helpDrp").find(".middletextbox"), 0.5, { css: { display: "block", } }, -0.5);
				// }

				if (_time >= 0.5 && _time <= 2) {
					TweenMax.to($("#helpDrp").find(".helpscreen_window"), 0.5, { css: { display: "block", } }, -0.5);
					TweenMax.to($("#helpDrp").find(".middletextbox"), 0.5, { css: { display: "block", } }, -0.5);
				}
			}
	}else{		
		helpAudioEle.pause();
	}
	
}
//HelpViewController-- End

function toggleTranscript() {
	// console.log("[Controller] isDisableTranscript: " + isDisableTranscript);
	transcriptCounter++;
	$('.transcript_btn').addClass('transcript_btn_disable');
	$('.audiotcb').addClass('transcript_btn_disable');
	$('.audiotcb').removeClass('cssshell_transcript');
	if (isDisableTranscript) {
		return;
	}


	if ($("#transcript").css("display") == "block") {
		$("#instruct_next").css("bottom", "50px")

		$('#transText').mCustomScrollbar("destroy");
		$("#transcript").css("display", "none");

		$("#transcriptButton").removeClass("transcriptClicked")
	} else {
		$("#instruct_next").css("bottom", "50px")
		if ($(".pageWrapper").hasClass("RTL")) {
			$("#shell_transcript span").css('transform', 'rotate(-90deg)');
		} else {
			$("#shell_transcript span").css('transform', 'rotate(90deg)');
		}
		$("#transText").scrollTop(0);
		$('#transText').mCustomScrollbar();
		$('#transText').mCustomScrollbar("update");
		$("#transcript").css("display", "block");
		$("#transcript").css("left", "741px")
		$("#transcript").css("top", "408px")
		$("#transcriptButton ").addClass("transcriptClicked")
	}

	if (transcriptCounter == 2) {
		$('.audiotcb').removeClass('transcript_btn_disable');
		$('.audiotcb').addClass('cssshell_transcript');
		$('.audiotcb').css('cursor', 'pointer');
		transcriptCounter = 0;
	} else if (transcriptCounter == 1) {
		$('.transcript_btn').addClass('transcript_btn_disable');
		$('.audiotcb').css('cursor', 'default');
		$('.audiotcb').removeClass('cssshell_transcript');
	}

}

function hideResource() {
	document.getElementById("transcript").style.visibility = "visible";
}


Controller.prototype.manageModClick = function (id) {
	menu.manageModClick(id);
};

function NexDisable() {
	nextBtn.addClass('disabled');
	model.NextDisable = true;
}

Controller.prototype.NexDisableAssment = function () {
	nextBtn.addClass('disabled');
	model.NextDisable = true;
};
Controller.prototype.setPageVisited = function (isDontAnimate) {
	if (isDontAnimate == null || isDontAnimate == undefined) {
		isDontAnimate = false;
		model.setPageVisited();
	} else {
		isDontAnimate = true;
	}
	if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
		// console.log('[Controller] setPageVisited ================ A disabled');
		nextBtn.addClass('disabled');
	} else if (model.visitedArr[model.currMod][model.currPage] == 0 && model.learningType != "non-linear") {
		// console.log('[Controller] setPageVisited ================ B disabled');
		nextBtn.addClass('disabled');

	} else {
		// console.log('[Controller] setPageVisited ================ C enabled');


		if (isDontAnimate){
			nextBtn.removeClass('disabled')
			return	
		}
		nextBtn.removeClass('disabled').addClass('blink');
		$("#instruct_next").show()

		TweenMax.killTweensOf($("#shell_next,.next .nextSelected"));
		$(".next .nextSelected").css('opacity', '0');
		//$(".nxtBackTitleTxt").css('opacity', '1');
		$(".nextSelected").css('scale', '1');


		timeLineObj = null
		timeLineObj = new TimelineMax({
			delay: 0.5,
			repeat: 0,
			yoyo: false
		})



		TweenMax.to($("#shell_next").find(".nxtBackTitle"), 0.3, {
			css: {
				width: "300px"
			},
			onComplete: function () {
				$("#shell_next").find(".nxtBackTitleTxt").css("opacity", "1")
			}
		}, 0.3);

		setTimeout(function () {
			$("#shell_next").find(".nxtBackTitleTxt").css("opacity", 0)
			TweenMax.to($("#shell_next").find(".nxtBackTitle"), 0.3, {
				css: {
					width: "4px"
				},
				onComplete: function () {
					$("#shell_next").find(".nxtBackTitleTxt").css("opacity", 0)
				}
			}, 0.3);
		}, 1500)


		model.compleTeArr[model.currPage] = 1;
		if (isSCORM) {
			//model.scormHandler.getValue();
		}
	}
	if ($("#transcript").css("display") == "block") {
		$("#instruct_next").css("bottom", "50px")
	} else {
		$("#instruct_next").css("bottom", "50px")
	}
	menu.updateMenu(model.currPage, model.currMod, model.visitedArr);




};
Controller.prototype.setPageVisitedInitial = function () {

	model.setPagePartiallyVisited();
	if (isSCORM) {
		model.scormHandler.getValue();
	}
	menu.updateMenu(model.currPage, model.currMod, model.visitedArr);
	//setPageVisited(true);
	$("#helpbtn.highlight").removeClass("highlight");
	$("#helpbtn.highlightback").removeClass("highlightback");
};
Controller.prototype.updateModel = function () {
	model.modArr = menu.modArr;
	for (var i = 0; i < model.modArr.length; i++) {
		//model.visitedArr[i] = 0;
		model.visitedArr[i] = new Array();
		for (var j = 0; j < model.modArr[i].length; j++) {
			model.visitedArr[i][j] = 0;
		}
	}
};
Controller.prototype.calculateAssests = function () {
	allAssestsLoaded = false;
	//console.log("calculateAssests")
	preloadAudio = (model.menuData.structure.module[model.currMod].page[model.currPage].audio).split(",");


	preloadAudios(preloadAudio[0]);



};

function callInitialAudio() {
	//console.log('[Controller] callInitialAudio: ');

	if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
		var currentAudios = model.menuData.structure.module[model.currMod].page[model.currPage].audio.split(",");
		//-- Conclusion page audio
		if (model.menuData.structure.module[model.currMod].page[model.currPage].data_audioTime) {
			audTiming = model.menuData.structure.module[model.currMod].page[model.currPage].data_audioTime.split(",");
			if (modCompleted) {
				var currentAudio = currentAudios[0];
			} else {
				if (currentAudios[1] != undefined) {
					var currentAudio = currentAudios[1];
				} else {
					var currentAudio = currentAudios[0];
				}
			}
		} else {
			var currentAudio = model.menuData.structure.module[model.currMod].page[model.currPage].audio;
		}
	} else {
		var currentAudio = model.menuData.structure.module[model.currMod].page[model.currPage].audio;
	}

	if (currentAudio != "") {
		isAudio = true;
		if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
			if (model.menuData.structure.module[model.currMod].page[model.currPage].data_audioTime) {
				audioPlayer.loadAudioPath(model.commonaudioPath + currentAudio);
			} else {
				audioPlayer.loadAudioPath(model.audioPath + currentAudio);
			}
		} else {
			audioPlayer.loadAudioPath(model.audioPath + currentAudio);
		}

	} else {
		isAudio = false;

	}



}

function audioLoadPath() {
	//console.log('[Controller] audioLoadPath: ' + pageLoad + "::::" + ExternalDataLoad + "::::" + audioLoaded + ":::" + currentExtDataPath);


	controller.assignExternalData();




};
Controller.prototype.loadExternalData = function () {

	ExternalDataLoad = false;
	currentExtDataPath = model.menuData.structure.module[model.currMod].page[model.currPage].data;
	if (currentExtDataPath == "") {
		ExternalDataLoad = true;
	} else {
		//-- Conclusion page data
		var path = "";
		if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
			if (model.menuData.structure.module[model.currMod].page[model.currPage].data_audioTime) {
				path = model.commondataPath + currentExtDataPath;
			} else {
				path = model.dataPath + currentExtDataPath;
			}
		} else {
			path = model.dataPath + currentExtDataPath;
		}
		//-- Debug: Delete this after rolling out changes to all files --//
		//path = model.dataPath + currentExtDataPath;
		//---------------------------------------------------------------//
		$.getJSON(path, function () {}).done(function (json) {
			ExternalData = json.ExternalData[0];
			ExternalDataLoad = true;
			audioLoadPath();
		}).fail(function () {
			// console.log("[Controller] loadExternalData error");
		}).always(function () {
			// console.log("[Controller] loadExternalData complete");
		});
	}
};
Controller.prototype.mainLoadData = function () {


	var path = model.dataPath + model.mainData;

	///  modified ---- 6/7/2017 11:37 AM - the menuData JSON placed in side config
	var newPath = "config/" + model.mainData;

	$.getJSON(newPath, function () {}).done(function (json) {
		mainData = json.ExternalData[0];
		controller.assignMainData();
		menu.createMenu();
		var imagePreload = new ImagePreload();
		var imgList = shell_imageData.concat(screen_imageData);
		imagePreload.imgPreload(imgList);
		imagePreload.imgPreloaded = function () {
			console.log('Images are loaded = ' + imagePreload.imgLoaded);
			beginCourse();
		}



	}).fail(function () {
		// console.log("[Controller] loadMainData error");
	});

};



Controller.prototype.assignMainData = function () {

	$.each(mainData, function (key, value) {
		if (key == "MenuData") {
			$.each(value, function (key, value) {

				var tempModuleHolder = value.title;
				$.each(value.lessons, function (key, value) {

					topicTittles.push({
						"module": String(tempModuleHolder),
						"text": value.text
					});
					titlesArr.push({
						"module": String(tempModuleHolder).split(' ').join(''),
						"text": value.text
					});
					mobTitlesArr.push({
						"module": String(tempModuleHolder).split(' ').join(''),
						"text": value.text
					});
					testTitlesArr.push({
						"module": tempModuleHolder,
						"text": value.text
					});
				});
			});

		} else if (key == "ResourcesData") {
			$.each(mainData.ResourcesData[0], function (key, value) {
				resourceTitlesArr.push(value.title);
				resourceIconArr.push(value.icon);
				resourceDataArr.push(value.documentPath);
			});
		} else if (key == "course_title") {
			moduleTitleTxt = value.text;
			$("." + key).html(value.text);
		}
	});

};

Controller.prototype.assignExternalData = function () {
	if (currentExtDataPath != "") {
		$.each(ExternalData, function (key, value) {
			if (key == "transcript") {
				transcript = value.text;
			} else {
				$("." + key).html(value.text);
			}

		});
	}
};
Controller.prototype.managePageClick = function (p, m) {
	audioPlayer.destroyAudio();
	//gadgetsBtn.trigger("click", this.fnClick);
	$("#gadgetsButn").removeClass("open close");
	$('#Menudrp').animate({
		'left': '-562px'
	});
	isMenuOpen = false
	controller.menuBtnsControlEnable();
	$(".ShellOverlay.menuovrlay").css("display", "none");
	model.setCurrPage(p, m);
	//console.log(model.currPage + "::" + (model.modArr[model.currMod].length));
	if (model.currPage == (model.modArr[model.currMod].length - 1)) {
		controller.setPageVisited();
	}
	//callInitialAudio();
	// menuBtn.trigger("click", this.fnClick);
};
Controller.prototype.audioPause = function () {
	if (isAudio) {
		audioPlayer.pauseAudio();
		if (screenType == "Canvas") {
			iframe.contentWindow.canvasAnim.stop()
		}

	} else if (isVideo) {
		videojs.pause(videoNum);
	}

	if ($('.footer-holder .play').hasClass('playing')) {
		$('.footer-holder .playButton').addClass("forcePause")
	}


	//$('.footer-holder .play').removeClass('playing')
	if (videoObject != null) {
		if (device.iPhone()) {
			videoObject_JQ.hide();
		} else {
			videoPauseState = videoObject.paused;
			videoObject.pause();
			videoObject.controls = false;
		}
	}
};
var st;
Controller.prototype.videoCurrentTimeStatus = function (videoIndex, videoCurrentTime, parametersArray) {
	var duration = videojs.duration(videoIndex);
	var widVal = (videoCurrentTime / duration)
	$('.scrubber').show();
	$('.footer-holder .progress').css({
		width: (widVal * 100) + '%'
	});

	console.log("videoIndex-->", videoIndex)
	$('.footer-holder .dragger').css({
		left: (widVal * 100) + '%'
	});

	var position = (widVal * 100)
	// satyajit 9/19/2017 4:55 PM
	$('.handle').css('left', (position - 0.5) + '%')
	$('.handle').css('display', 'block');
	$('#footer_blocker').css('display', 'none');

	_cTime = parseInt(videoCurrentTime);
	var hours = parseInt(_cTime / 3600);
	var minutes = parseInt((_cTime % 3600) / 60);
	var seconds = parseInt(_cTime % 60);
	if (('' + minutes).length == 1) minutes = '0' + minutes;
	if (('' + seconds).length == 1) seconds = '0' + seconds;

	$('.time').html(minutes + ':' + seconds)

	if (position > 98) {
		//$('.handle').css('display', 'none');
		//$('.handle').css('background-color', '#169eda');
	}
	else {
		//$('.handle').css('display', 'block');
		//$('.handle').css('background-color', '#E91E63');
	}
	$(".moveVideoTime,.playButton").removeClass('disabled').css('opacity', 1);

};
Controller.prototype.audioResume = function () {
	if (isMenuOpen) return;
	if (isAudio) {
		audioPlayer.resumeAudio();
		if (screenType == "Canvas") {
			iframe.contentWindow.canvasAnim.play()
		}
	} else if (isVideo) {
		videojs.resume(videoNum);
	}
	$('.footer-holder .playButton').removeClass("forcePause")
	//$('.footer-holder .play').addClass('playing')

	if (videoObject != null) {
		if (device.iPhone()) {
			videoObject_JQ.show();
		} else {
			videoObject.controls = true;
			if (!videoPauseState) {
				videoObject.play();
			}
		}
	}

};
Controller.prototype.menuBtnsControlEnable = function () {


	if (model.disablePlayPauseSlider == false) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#Resourcesbtn"), $("#helpbtn"), $("#replay_btn"), $("#replay_btn"), $("#audio_Icon"), $(".cssResourcesbtn"), $(".printpagebutton"), $("#shell_transcript"), $(".transcriptButton")];

	} else {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $("#Resourcesbtn"), $("#helpbtn"), $("#replay_btn"), $("#replay_btn"), $(".cssResourcesbtn"), $(".printpagebutton")];
		$("#transcript").css("display", "none");
	}

	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].removeClass("deactive");
		//shellButtons[i].css("opacity","1");
	}



	if (!nxtBakDisable) {

		controller.nextBackEnable();
	}
	console.log("menuBtnsControlEnable")

};
Controller.prototype.menuBtnsControlDisable = function () {




	if (model.disablePlayPauseSlider == false) {

		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#Resourcesbtn"), $("#helpbtn"), $("#replay_btn"), $("#replay_btn"), $("#audio_Icon"), $(".cssResourcesbtn"), $(".printpagebutton"), $("#shell_transcript"), $(".transcriptButton")];

	} else {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $("#Resourcesbtn"), $("#helpbtn"), $("#replay_btn"), $("#audio_Icon"), $(".cssResourcesbtn"), $(".printpagebutton")];

	}
	//hidetranscript()
	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].addClass("deactive");
	}




};

Controller.prototype.audioMuteToggle = function () {
	if (!isVideo) {
		audioPlayer.toggleMuteAudio();
	}
};
Controller.prototype.gadgetsBtnDisable = function () {
	if (!$("#gadgetsButn").hasClass("disabled")) {
		$("#gadgetsButn").addClass("disabled");
		$("#gadgetsButn").css("cursor", "default");
	}
	if (!$("#shell_exit").hasClass("disabled")) {
		$("#shell_exit").addClass("disabled");
		$("#shell_exit").css("cursor", "default");
	}
	//controller.menuBtnsControlDisable();
};
Controller.prototype.gadgetsBtnEnable = function () {
	if ($("#gadgetsButn").hasClass("disabled")) {
		$("#gadgetsButn").removeClass("disabled");
		$("#gadgetsButn").css("cursor", "pointer");
	}
	if ($("#shell_exit").hasClass("disabled")) {
		$("#shell_exit").removeClass("disabled");
		$("#shell_exit").css("cursor", "pointer");
	}
	//controller.menuBtnsControlEnable();
};
Controller.prototype.hidePreloader = function () {
	// pagePreloader.hide();
	showBuffer(false);
};
Controller.prototype.hideAudioControls = function () {
	if (isAudio) {
		//$('.f3').css('display', 'block');
		$(".scrubber").css('display', 'block');
		$(".played").css('display', 'inline');
		$(".duration").css('display', 'inline');
		$(".time_seperator").css('display', 'inline');
		$("#divider").css('display', 'inline');

		if ($('.footer-holder .play').hasClass("disabled")) {
			$('.footer-holder .play').removeClass("disabled");
		}
		if ($(".time").hasClass("noneScrub_event")) {
			$(".time").removeClass("noneScrub_event");
		}
		//$('.footer-holder .play').css('display', 'block');
	} else if (isVideo) {
		//$('.f3').css('display', 'block');
		$(".scrubber").css('display', 'block');
		$(".played").css('display', 'inline');
		$(".duration").css('display', 'inline');
		$(".time_seperator").css('display', 'inline');
		$("#divider").css('display', 'inline');

		if ($('.footer-holder .play').hasClass("disabled")) {
			$('.footer-holder .play').removeClass("disabled");
		}
		if ($(".time").hasClass("noneScrub_event")) {
			$(".time").removeClass("noneScrub_event");
		}
		//$('.footer-holder .play').css('display', 'block');
	} else {
		//$('.f3').css('display', 'none');
		controller.TranscriptDisableFn();
		$(".scrubber").css('display', 'none');
		$(".played").css('display', 'none');
		$(".duration").css('display', 'none');
		$(".time_seperator").css('display', 'none');
		$("#divider").css('display', 'none');
		if (!$('.footer-holder .play').hasClass("disabled")) {
			$('.footer-holder .play').addClass("disabled");
		}
		if (!$(".time").hasClass("noneScrub_event")) {
			$(".time").addClass("noneScrub_event");
		}

		//$('.footer-holder .play').css('display', 'none');
	}
};
Controller.prototype.removePreAssests = function (filename, filetype) {
	if (PreAssests == "") {
		return;
	}
	var filetype = "css";
	var filename = PreAssests;
	var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
	var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i >= 0; i--) {
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
	}
	//this.removePreAssestsJS();
};
Controller.prototype.removePreAssestsJS = function (filename, filetype) {
	if (PreAssests == "") {
		return;
	}
	var filetype = "js";
	var filename = PreAssests.split(".")[0] + "." + filetype;
	var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
	var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i >= 0; i--) {
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
	}
};
Controller.prototype.loadAssests = function () {
	//-- Triggered from HTML pg script

	controller.setLangImagePath();
	var loadfiles = 0;
	totalScripts = (model.modArr[model.currMod][model.currPage].scripts).split(",");
	// console.log("[Controller] loadAssests complete" + totalScripts);
	if (totalScripts.length == 1) {
		if (searchPath(totalScripts[0]) == -1) {
			var scriptPath = model.scriptPath + totalScripts[0].trim();
		} else {
			var scriptPath = totalScripts[0].trim();
		}
		console.log("[Controller] loadAssests scriptPath" + scriptPath);
		$.getScript("" + scriptPath).done(function (script, textStatus) {

		});

	} else {
		controller.loadAdditionalAssests();
	}



};
Controller.prototype.loadAdditionalAssests = function () {
	var scriptPath = "";
	var loadfiles = 0;
	var totalScripts = (model.modArr[model.currMod][model.currPage].scripts).split(",");
	for (var i = 0; i < totalScripts.length; i++) {
		if (searchPath(totalScripts[i]) == -1) {
			//var scriptPath = model.scriptPath + totalScripts[i].trim();
		} else {
			scriptPath = totalScripts[i].trim();
		}
		if (scriptPath != "") {
			$.getScript("" + scriptPath).done(function (script, textStatus) {
				loadfiles++;
				if (loadfiles == (totalScripts.length - 1)) {
					controller.loadMainAssests();

				}

			});
		}
	}

};
Controller.prototype.loadMainAssests = function () {
	var scriptPath = "";
	var totalScripts = (model.modArr[model.currMod][model.currPage].scripts).split(",");
	if (searchPath(totalScripts[totalScripts.length - 1]) == -1) {
		scriptPath = model.scriptPath + totalScripts[totalScripts.length - 1].trim();
	}
	if (scriptPath != "") {
		$.getScript("" + scriptPath).done(function (script, textStatus) {
			//console.log(textStatus + ":::::::::" + script);
		});
	}
};

Controller.prototype.loadStyles = function () {
	var totalPreAssests = PreAssests.split(".css");
	for (var i = 0; i < totalPreAssests.length; i++) {
		if (totalPreAssests[i] != "") {
			PreAssests = totalPreAssests[i] + ".css";
			controller.removePreAssests();
		}
	}
	PreAssests = "";
	styleLoading(0);
};

function styleLoading(loadCnt) {
	var totalStyles = (model.modArr[model.currMod][model.currPage].styles).split(",");
	var loadfiles = loadCnt;
	var stylePath = "";
	if (searchPath(totalStyles[loadfiles]) == -1) {
		stylePath = model.CSSPath + totalStyles[loadfiles].trim();
	} else {
		stylePath = totalStyles[loadfiles].trim();
	}

	var assestPreload = $.ajax(stylePath).done(function () {
		$('<link rel="stylesheet" type="text/css" href=' + stylePath + '>').appendTo("head");

		loadfiles++;
		if (loadfiles == (totalStyles.length)) {
			pageLoadingAnim = true;
			preloadingDone()
			controller.assignTranscript(transcript[0]);
			$('.footer-holder .play').css("opacity", '1')
			$('.footer-holder .play').removeClass('deactive')
			if (model.disablePlayPauseSlider == false) {
				$('.footer-holder .play').addClass('playing')
				$('.footer-holder .scrubber').removeClass('deactive')
				$('.footer-holder .audioButton').removeClass('deactive')
				$('.footer-holder .audioButton').css("opacity", '1')
				$('.footer-holder .cssshell_transcript').removeClass('disableTranscript')
				$(".scrubber .dragger").show()
			} else {
				hideSupportingFacts()
				transcriptCounter = 0;
				$(".scrubber .dragger").hide()
				$('.audiotcb').removeClass('transcript_btn_disable');
				$('.audiotcb').addClass('cssshell_transcript');

				$('.audiotcb').removeClass('transcript_btn_disable');
				$('.audiotcb').addClass('cssshell_transcript');
				$('#transText').mCustomScrollbar("destroy");
				//$("#transcript").css("display", "none");
				$("#transcriptButton ").removeClass("transcriptClicked")
				$('.footer-holder .play').removeClass('playing')
				$('.footer-holder .play').css("opacity", '0.5')
				$('.footer-holder .play').addClass('deactive')
				$('.footer-holder .scrubber').addClass('deactive')
				$('.footer-holder .play').removeClass('playing')
				$('.footer-holder .audioButton').css("opacity", '0.5')
				$('.footer-holder .audioButton').addClass('deactive')
				$('.footer-holder .cssshell_transcript').addClass('disableTranscript')
			}

			setTimeout(function () {

				if (model.disablePlayPauseSlider == true) {
					$('.transcript').css('display', 'none');
				}
			}, 500);


		} else {

			styleLoading(loadfiles);
		}
	});
	PreAssests += totalStyles[loadfiles].trim();
	setTimeout(function () {
		$("#preloaderSpinner").css("display", "none");
		$("#shellDisabler").css("display", "none");
		callInitialAudio();
		audioPlayer.StartAnimation();
	}, 1000);

}

function searchPath(path) {
	var str = "/";
	var index = path.search(str);
	return index;
}


Controller.prototype.fnClick = function (e) {
	e.stopPropagation();

	//alert("audioPause")

	if ($(this).hasClass("GadgetDisable")) {
		return;
	}
	if ($(this).hasClass("disabled") || $(this).hasClass("deactive")) {
		return;
	} else {
		$(this).toggleClass('open');
	}
	if ($(this).hasClass("funfactdisabled")) {
		return;
	}
	// console.log('[Controller] @ ' + e.currentTarget.id);
	switch (e.currentTarget.id) {
		case "shell_next":
			//$('.transcript').css('display','none'); 
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');

			}
			
			model.nextPage();

			$('.time').html("00:00 / 00:00")
			hideSupportingFacts()
			//console.log(model.currPage + "::" + model.modArr[model.currMod].length);
			if (model.currPage == (model.modArr[model.currMod].length - 1)) {
				controller.setPageVisited();
			}
			/* transcriptCounter = 0;
		$('.audiotcb').removeClass('transcript_btn_disable');
		$('.audiotcb').addClass('cssshell_transcript'); */
			//callInitialAudio();
			$("#helpbtn.highlight").removeClass("highlight");
			$("#helpbtn.highlightback").removeClass("highlightback");
			if (isGlossaryOpen == true) {
				glossaryBtn.trigger("click", this.fnClick);
			}
			break;
		case "shell_back":
			$('.time').html("00:00 /  00:00")
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			model.prevPage();
			//callInitialAudio();

			break;
			//case "shell_menu":
		case "help_close_button":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			if(helpAudioEle){
				// pause audio
				helpAudioEle.pause();				
			}

			

			break;
		case "gadgetsButn":

			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			if ($("#gadgetsButn").hasClass("close")) {
				$("#gadgetsButn").removeClass("close");

				isMenuOpen = false;
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioResume();
				}
				$("#gadgetsButn").removeClass("open close");
				$('#Menudrp').animate({
					'left': '-562px'
				});
				controller.menuBtnsControlEnable();
				$('.ShellMenuWrapper .hasSubMenu ul').show();

				$(".ShellOverlay.menuovrlay").css("display", "none");
			} else {
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioPause();
				}
				$('.ShellMenuWrapper .hasSubMenu ul').show();
				isMenuOpen = true;
				//controller.menuBtnsControlDisable();
				$('#Menudrp').animate({
					'left': '0px'
				});
				$("#list").scrollTop(0);
				$('#list').mCustomScrollbar();
				$('#list').mCustomScrollbar("update");
				$("#gadgetsButn").addClass("close");

				$(".ShellOverlay.menuovrlay").css("display", "none");
			}

			break;
		case "resource_close":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			menuControl(Resourcebtn, $("#Resourcesbtn"));


			$("#RsourcesDrp").hide()
			if (!$("#Resourcesbtn").hasClass("active")) {
				$("#Resourcesbtn").addClass("active");
				if ($(".pageWrapper").hasClass("RTL")) {
					$("#Resourcesbtn span").css('transform', 'rotate(-90deg)');
				} else {
					$("#Resourcesbtn span").css('transform', 'rotate(90deg)');
				}
				controller.audioPause();
				//controller.menuBtnsControlDisable();
				isResourcesOpen = true
			} else {
				$("#Resourcesbtn").removeClass("active");
				$("#Resourcesbtn span").css('transform', 'rotate(0deg)');
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioResume();
				}
				isResourcesOpen = false
				//controller.menuBtnsControlEnable();
			}
			break;
		case "glossaryCloseBtn":
		case "glossarybtn":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			menuControl(glossaryBtn, $("#glossarybtn"));

			if (!device.MobileDevice()) {
				$("#glossaryDrp").slideToggle("slow", function () {
					if (preMenu == "" || preMenuID == "") {
						$("#Shell_menu").slideToggle("slow", function () {
							//controller.gadgetsBtnEnable();
						});
					}
				});
			} else {
				$("#glossaryDrp").toggle('slide', {
					direction: directionSide
				}, 500);
			}
			if (!$("#glossarybtn").hasClass("active")) {
				$("#glossarybtn").addClass("active");
				if ($(".pageWrapper").hasClass("RTL")) {
					$("#glossarybtn span").css('transform', 'rotate(-90deg)');
				} else {
					$("#glossarybtn span").css('transform', 'rotate(90deg)');
				}
				$("#alphbet_wraper").scrollTop(0);
				$('#alphbet_wraper').mCustomScrollbar();
				$(".glossList").scrollTop(0);
				$('.glossList').mCustomScrollbar();
				controller.audioPause();
				isGlossaryOpen = true
				//controller.menuBtnsControlDisable();
			} else {
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioResume();
				}
				isGlossaryOpen = false
				controller.menuBtnsControlEnable();
				$("#glossarybtn").removeClass("active");
				$("#glossarybtn span").css('transform', 'rotate(0deg)');
				if ($("#alphbet_wraper").hasClass("mCustomScrollbar")) {
					$('#alphbet_wraper').mCustomScrollbar("destroy");
				}
				if ($(".glossList").hasClass("mCustomScrollbar")) {
					$('.glossList').mCustomScrollbar("destroy");
				}
			}
			break;
		case "Resourcesbtn":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			menuControl(Resourcebtn, $("#Resourcesbtn"));


			$("#RsourcesDrp").show()

			if (!$("#Resourcesbtn").hasClass("active")) {
				$("#Resourcesbtn").addClass("active");
				if ($(".pageWrapper").hasClass("RTL")) {
					$("#Resourcesbtn span").css('transform', 'rotate(-90deg)');
				} else {
					$("#Resourcesbtn span").css('transform', 'rotate(90deg)');
				}
				controller.audioPause();
				//controller.menuBtnsControlDisable();
				isResourcesOpen = true
			} else {
				$("#Resourcesbtn").removeClass("active");
				$("#Resourcesbtn span").css('transform', 'rotate(0deg)');
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioResume();
				}
				isResourcesOpen = false
				//controller.menuBtnsControlEnable();
			}
			break;
		case "helpbtn":
			menuControl(helpBtn, $("#helpbtn"));
			$("#helpDrp").show()
			if (!$("#helpbtn").hasClass("active")) {
				$("#helpbtn").addClass("active");
				if ($("#helpbtn").hasClass("active")) {
					$("#gadgetsButn").removeClass("open close");
					$('#Menudrp').animate({
						'left': '-562px'
					});
				}
				// if ($(".pageWrapper").hasClass("RTL")) {
				// 	$("#helpbtn span").css('transform', 'rotate(-90deg)');
				// } else {
				// 	$("#helpbtn span").css('transform', 'rotate(90deg)');
				// }
				if ($("#helpbtn").hasClass("active")) {
					$("#shell_back").css('pointer-events', 'none');
					$("#shell_next").css('pointer-events', 'none');
					$('#helpbtn.highlight').removeClass('highlight');
					$('#helpbtn.highlightback').removeClass('highlightback');
					$('.grayoverlay').hide();
				} 
				controller.audioPause();
				//controller.menuBtnsControlDisable();
				ishelpOpen = true
			} else {
				$("#helpDrp").hide()
				$("#helpbtn").removeClass("active");
								
				$("#helpbtn span").css('transform', 'rotate(0deg)');
				if ($("#helpDrp").hasClass("mCustomScrollbar")) {
					$('#helpDrp').mCustomScrollbar("destroy");
				}
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioResume();
				}
				//controller.menuBtnsControlEnable();
				ishelpOpen = false;
			}
			helpViewController(ishelpOpen)
			break;
		case "shell_mute":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			controller.audioMuteToggle();
			if (!$("#shell_mute").hasClass("active")) {
				$("#shell_mute").addClass("active");
				if ($("#audio_Icon").hasClass("icon-soundOn")) {
					$("#audio_Icon").removeClass("icon-soundOn").addClass("icon-soundOff");
				}

				$("#audio_Icon").addClass("icon-soundOff");
				if ($(".pageWrapper").hasClass("RTL")) {
					$("#shell_mute span").css('transform', 'rotate(-90deg)');
				} else {
					$("#shell_mute span").css('transform', 'rotate(90deg)');
				}
			} else {
				$("#shell_mute").removeClass("active");
				if ($("#audio_Icon").hasClass("icon-soundOff")) {
					$("#audio_Icon").removeClass("icon-soundOff").addClass("icon-soundOn");
				}
				$("#shell_mute span").css('transform', 'rotate(0deg)');
			}
			gadgetsBtn.trigger("click", this.fnClick);
			break;
		case "audio_Icon":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			controller.audioMuteToggle();
			if (!$("#shell_mute").hasClass("active")) {
				$("#shell_mute").addClass("active");
				if ($("#audio_Icon").hasClass("icon-soundOn")) {
					$("#audio_Icon").removeClass("icon-soundOn").addClass("icon-soundOff");
					if (videojs) {
						videojs.volume(0);
					}
					volume = 0;
				} else {
					$("#audio_Icon").addClass("icon-soundOn").removeClass("icon-soundOff");
					if (videojs) {
						videojs.volume(1);
					}
					volume = 1;
				}

				if ($(".pageWrapper").hasClass("RTL")) {
					$("#shell_mute span").css('transform', 'rotate(-90deg)');
				} else {
					$("#shell_mute span").css('transform', 'rotate(90deg)');
				}
			} else {
				$("#shell_mute").removeClass("active");
				if ($("#audio_Icon").hasClass("icon-soundOff")) {
					$("#audio_Icon").removeClass("icon-soundOff").addClass("icon-soundOn");
					if (videojs) {
						videojs.volume(1);
					}
					volume = 1;
				}
				$("#shell_mute span").css('transform', 'rotate(0deg)');
			}
			break;
		case "shell_transcript":
			toggleTranscript();
			break;
		case "shell_glossary_phone":

			glossaryBtn.trigger("click", this.fnClick);
			break;
		case "Resourcesbtn_phone":


			resourcesBtn.trigger("click", this.fnClick);
			break;
		case "helpbtn_phone":

			helpBtn.trigger("click", this.fnClick);
			break;
		case "shell_note_phone":

			noteBtn.trigger("click", this.fnClick);
			break;
		case "shell_transcript_phone":


			transcriptBtn.trigger("click", this.fnClick);
			break;
		case "shell_exit":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			if (isMenuOpen == true) {
				$("#gadgetsButn").trigger('click');
			}
			if (!modCompleted) {
				$(".exitInsTxt").html(UITxtData.exitInsTxt.alt_text);
				$(".yesTxt").html(UITxtData.yesTxt.alt_text);
				$(".noTxt").html(UITxtData.noTxt.alt_text);
			} else {
				$(".exitInsTxt").html(UITxtData.exitInsTxt.text);
				$(".yesTxt").html(UITxtData.yesTxt.text);
				$(".noTxt").html(UITxtData.noTxt.text);
			}
			exitPop.show();
			popup_disable_bg.show();

			controller.audioPause();
			break;

		case "shell_yes_btn":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			finish();
			window.top.close();
			popup_disable_bg.show();
			break;
		case "shell_no_btn":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			exitPop.hide();

			popup_disable_bg.hide();

			if ($('.footer-holder .play').hasClass("playing")) {
				controller.audioResume();
			}
			break;
		case "shell_g_close":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			glossaryPop.hide();
			popup_disable_bg.hide();
			$("#shell_GlossaryAlphabets").scrollTop(0);
			if ($("#transText").hasClass("mCustomScrollbar")) {
				$('#shell_GlossaryAlphabets').mCustomScrollbar("destroy");
			}
			if ($(".gadeget_item").css("left") == "0px") {} else if ($('.navigator .play').hasClass('playing')) { // || pg_snd.position == null) {
				controller.audioResume();
			}
			controller.gadgetsBtnEnable();
			break;
		case "shell_r_close":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			resourcesPop.hide();
			popup_disable_bg.hide();
			if ($(".gadeget_item").css("left") == "0px") {} else if ($('.navigator .play').hasClass('playing')) { // || pg_snd.position == null) {
				controller.audioResume();
			}
			//controller.gadgetsBtnEnable();
			break;
		case "shell_h_close":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			helpPop.hide();
			popup_disable_bg.hide();
			if ($('.navigator .play').hasClass('playing')) { // || pg_snd.position == null) {
				controller.audioResume();
			}
			break;
		case "shell_n_close":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			notePop.hide();
			popup_disable_bg.hide();
			controller.audioResume();
			break;
		case "shell_e_close":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			exitPop.hide();
			popup_disable_bg.hide();
			controller.audioResume();
			break;
		case "shell_m_close":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			hotBtn.trigger("click", this.fnClick);
			if ($(".gadeget_item").css("left") == "0px") {} else if ($('.navigator .play').hasClass('playing')) {
				controller.audioResume();
			}
			//controller.gadgetsBtnEnable();
			break;
		case "contnuBtn":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			$(".NV_tour_overlay").css("display", "none");
			controller.audioResume();
			break;

		case "menubtn":
			if ($(".grid-menu").hasClass('active')) {
				$(".grid-menu").trigger('click');
			}
			if (!device.MobileDevice()) {
				$("#Menudrp").slideToggle("slow", function () {
					if (preMenu == "" || preMenuID == "") {
						$("#Shell_menu").slideToggle("slow", function () {
							//iPadDebug1(pageLoad+"::Here2::"+showAudioLoading);
							if (pageLoadingAnim) {
								controller.gadgetsBtnEnable();
							}
							/*if(pageLoad)
							 {
							 controller.gadgetsBtnEnable();

							 }*/
						});
						//iPadDebug1("::Here2::");

					} else {
						//iPadDebug1("::Here1::")
					}
				});
			} else {
				$("#Menudrp").toggle('slide', {
					direction: directionSide
				}, 500);
			}
			menuControl(menuBtn, $("#menubtn"));
			if (!$("#menubtn").hasClass("active")) {
				$("#menubtn").addClass("active");
				if ($(".pageWrapper").hasClass("RTL")) {
					$("#menubtn span").css('transform', 'rotate(-90deg)');
				} else {
					$("#menubtn span").css('transform', 'rotate(90deg)');
				}
				$("#shell_mod_0_pages").scrollTop(0);
				$(".ShellMenuWrapper").mCustomScrollbar();
				$(".ShellMenuWrapper").mCustomScrollbar("update");

			} else {
				if ($(".ShellMenuWrapper").hasClass("mCustomScrollbar")) {
					$(".ShellMenuWrapper").mCustomScrollbar("destroy");
				}
				$("#menubtn").removeClass("active");
				$("#menubtn span").css('transform', 'rotate(0deg)');

			}

			break;
		default:
			//code to be executed if n is different from case 1 and 2
	}

};



function menuControl(currEventID, currID) {

	if (preMenu == currEventID || preMenu == "") {
		//return;

	} else {
		if (preMenuID.hasClass("active")) {

			preMenu.trigger("click", this.fnClick);

		}
	}
	preMenu = currEventID;
	preMenuID = currID;

}

function resetMenu() {
	if (preMenu == "" || preMenuID == "") {
		return;
	} else {
		if (preMenuID.hasClass("active")) {

			preMenu.trigger("click", this.fnClick);
		}
	}
	preMenu = "";
	preMenuID = "";
}

Controller.prototype.menuBtnsControlToggle = function () {
	if (!nxtBakDisable) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}
	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive");
		} else {
			shellButtons[i].addClass("deactive");
		}
	}
	if (!device.MobileDevice()) {
		if ($("#transcript").hasClass("deactive")) {
			// $("#transcript").draggable({
			// disabled : true
			// });

		} else {
			if (!device.AndroidPhone() && !device.AndroidTablet()) {
				// $("#transcript").draggable({
				// disabled : false
				// });
			}
		}
	};
};

Controller.prototype.nextBackDisable = function () {
	nxtBakDisable = true;
	var shellButtons = [$("#shell_next"), $("#shell_back")];
	for (var i = 0; i < shellButtons.length; i++) {
		if (!shellButtons[i].hasClass("deactive")) {
			shellButtons[i].addClass("deactive");
		}
	}

};
Controller.prototype.nextBackEnable = function () {
	nxtBakDisable = false;
	var shellButtons = [$("#shell_next"), $("#shell_back")];
	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive");
			shellButtons[i].css("opacity", "1");
		}
	}


};
Controller.prototype.retriveBlinkStar = function () {
	for (var i = 0; i < model.blinkStarArr.length; i++) {
		if (model.blinkStarArr[i] == '1') {
			console.log(i + "----")

			TweenMax.to($(".star" + i), .2, {
				css: {
					scaleX: 0.9,
					scaleY: 0.9
				}
			});

			$(".star" + i).addClass("active");
		}
	}

};
Controller.prototype.blinkStar = function (whichStar) {
	TweenMax.to($("#bigStar"), 0, {
		css: {
			"opacity": 1,
			"scale": 0,
			"top": "280px",
			"left": "0px"
		},
	})
	TweenMax.killTweensOf($(".iataStars .blinkStar"));

	//Remove later 
	// var _left = whichStar == 0 ? "840px" : "920px"
	var _left = 0

	if (whichStar == 0) {

		_left = "860px"; //DNDStar1

	} else if (whichStar == 1) {

		_left = "940px"; //MCQ2

	} else if (whichStar == 2) {

		_left = "1000px" //MMCQ3

	} else {

		_left = "1050px"; //MMCQ4

	}

	//if(model.blinkStarArr[whichStar]=="0"){

	//BigStar
	TweenMax.to($("#bigStar"), 1, {
		css: {
			scale: 1,
			opacity: 1
		},
		onComplete: function () {
			TweenMax.to($("#bigStar"), 1, {
				css: {
					// transform: "matrix(0.2, 0, 0, 0.2, 440, -238)", opacity: 0
					left: _left,
					top: "39px",
					scale: 0.2
				},
				onComplete: function () {
					TweenMax.to($(".star" + whichStar), .2, {
						css: {
							scaleX: 1,
							scaleY: 1
						}
					});
					$("#bigStar").removeAttr("style");
					TweenMax.to($("#bigStar"), 0, {
						css: {
							"opacity": 1,
							"scale": 0,
							"top": "280px",
							"left": "0px"
						},
					})
				}

			}, 2);
			$("#bigStar").removeAttr("style");
		}

	}, 1);

	// TweenMax.to($(".star"+whichStar), .2, {css:{scaleX:0.9, scaleY:0.9}});
	$(".star" + whichStar).addClass("active");
	model.blinkStarArr[whichStar] = '1'
	//}
};

Controller.prototype.blinkStarWrong = function (whichStar) {


	if (model.blinkStarArr[whichStar] != "1" && model.blinkStarArr[whichStar] != "-1") {
		model.blinkStarArr[whichStar] = "-1"
	}
};

var imageLoader = new Object();
imageLoader.counter = 0;
imageLoader.imgArr = [];
imageLoader.callbackFn = undefined;
imageLoader.randVal = 0;

imageLoader.load = function (obj, callbackFn) {
	this.callbackFn = callbackFn;
	this.imgArr = [];
	this.counter = 0;
	for (var i = 0; i < obj.find("img").length; i++) {
		this.imgArr.push(obj.find("img").attr("src"));
	}
	this.startLoading();
};

imageLoader.startLoading = function () {
	if (this.imgArr[this.counter] != undefined) {
		var imgObjs = new Image();
		imgObjs.src = this.imgArr[this.counter];
		imgObjs.onload = this.onFileLoad;
		imgObjs.onerror = this.onFileLoadFail;
	} else {
		imageLoader.callbackFn();
		//loadedAssestsCnt++;
		//ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
	}
};