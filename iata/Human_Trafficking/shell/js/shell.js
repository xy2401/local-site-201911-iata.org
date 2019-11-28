// ----------------- shell level global variables are declared here ---------------- //
var controller;
// var Bookmark_location = "notSet";
var loadingDone = false;
var orientationChange = null;
var clickedBookmarkYes = false;
var navigationTour = false;
var ie8Browser = false;
var BVersion;
var BName;
var os;
var tll;
var timeline
var introPage = null;
var clickableMenu = false;
var isHelpPlayed = false;
var initPgLoadCnt = 0;
var audioPlayer = new AudioPlayer();
var pg_snd;
var isControllerInitiated = false;
var langNm;
//-- isSCORM will be true for Local and Build SCORM verison. It will be false for Build Web version
var isSCORM = "@web@";
isSCORM = isSCORM != "false" ? true : false; //
var isTranscript = true;
var isResources = true;
var isNavTour = false;
var isFunFacts = false;
var scaleShell
var splashIntro = true;
var globalTick1 = false;
var globalTick2 = false;
var globalTick3 = false;
var globalTick4 = false;
var globalTick5 = false;
var globalTick6 = false;
var screenType=""
$(document).ready(function() {
    ie8Browser = false;
    BVersion = BrowserDetect.version;
    BName = BrowserDetect.browser;
   
   
    $('.click_next_Continue').css('display', 'none');
    showNavTourLink();

   

    

    
    navigationTour = false;
    $(".Shell_menu").css('display', 'none');
    loadMainData();
    hideSupportingFacts();


    $('.shell_main').addClass('splash');
    $('.shell_wrap, .shell_header').hide();
    
    $("#layoutSetter").unbind("click").bind("click",function(){
			alert(">>")
				$( "#wrapper").css({'background-image':'url(02_JPG/'+$("#layoutPath").val()+'.jpg)'})
		});
		
		
		
		$(".transcript").draggable({  
			handle: ".transTitleBar",
            start: function(event, ui) {
				ui.position.left = 0;
				ui.position.top = 0;
            },
          
            drag: function(event, ui) {
                var changeLeft = ui.position.left - ui.originalPosition.left; 
				var newLeft = ui.originalPosition.left + changeLeft / Model.scaleFactor; 
			 
				var changeTop = ui.position.top - ui.originalPosition.top; 
				var newTop = ui.originalPosition.top + changeTop / Model.scaleFactor; 
			 
				ui.position.left = newLeft;
				ui.position.top = newTop;
				//console.log(ui.position.left+"===="+ui.position.top)
				
				if(ui.position.left>=917){
					ui.position.left=917
				}
				if(ui.position.left<=0){
					ui.position.left=0
				}
				
				if(ui.position.top>=408){
					ui.position.top=408
				}
				if(ui.position.top<=3){
					ui.position.top=3
				}
				
		
            }
        });
	
		
		$("#layoutFader").unbind("click").bind("click",function(){
			if($( ".shellWrap").css('opacity')=="1"){
				$( ".shellWrap").css('opacity','0.5')
			}else{
				$( ".shellWrap").css('opacity','1')
			}
				
		});
		
		$("#layoutHider").unbind("click").bind("click",function(){
			if($( "#wrapper").css('background-image')){
				$( "#wrapper").css({'background-image':'none'})
			}else{
				$( "#wrapper").css({'background-image':'url('+shell.layout[shell.layoutNum]+')'})
			}
				
		});

   
    $('#filler').height(($('#outer').height() - $('.shell_main').height()) / 2);

    loadUIData();
    $('#initLaunchBtn, .skipBtn').click(function() {
        splashIntro = false
        $(".shellWrap").show()
        $("#splashContainer").remove()
        $(".skipBtn").css('display','none');
		model.currPage=0
        model.dispatchCustomEvent("updateView");
    });
    $('.pageNum').val(1)
    $('.btnGo').click(function() {
        var pageNum = ($('.pageNum').val()) - 1
        model.currPage = pageNum
        model.currMod = 0;
        $('.time').html("00:00 / 00:00")
        hideSupportingFacts()
        $(".shellWrap").show()
        $("#splashContainer").remove()
        if (model.currPage == (model.modArr[model.currMod].length - 1)) {
            controller.setPageVisited();
        }
		model.disablePlayPauseSlider=false
		model.setCurrPage(pageNum,model.currMod)   
        //callInitialAudio();
        splashIntro = false
        //$("#shell_next").trigger("click", this.fnClick)	
    });
    $('.skipIntro').click(function() {
        var pageNum = 0
        model.currPage = pageNum
        model.currMod = 0;
        $('.time').html("00:00 / 00:00")
        hideSupportingFacts()
        $(".shellWrap").show()
        $("#splashContainer").remove()
        $('.skipBtn').css({'display':'none',opacity:0});
        if (model.currPage == (model.modArr[model.currMod].length - 1)) {
            controller.setPageVisited();
        }
		model.disablePlayPauseSlider=false
		model.setCurrPage(pageNum,model.currMod)   
        //callInitialAudio();
        splashIntro = false
        //$("#shell_next").trigger("click", this.fnClick)	
    });



    window.addEventListener("offline", function(e) {
        alert("Please check your network connection. This course will not be accessible while you are offline.");
    }, false);

    window.addEventListener("online", function(e) {
        alert("Your network connection is restored!");
    }, false);
	
	

});

// -------------------- **************************************  -------------------- //
function showPreloader() {
    loadingDone = true;
    initCode();
}

function initCode() {
    $("#initLaunchBtn").show();
    $(".skipBtn").css({'opacity':'0'});
}

var langNameTmp = "";

function loadUIData() {
    this.configdata = dataParser.getJson("config/config.json");
    this.deployMode = this.configdata.config.isDeploy.val;
    if (this.deployMode == "@isDeploy@") {
        this.moduleName = this.configdata.config.module.val;
        this.langName = this.configdata.config.lang.val;
    } else {
        this.moduleName = this.configdata.config.moduleDeploy.val;
        this.langName = this.configdata.config.langDeploy.val;
    }


    if (this.configdata.config.courseType.val == "scaling") {
        scaleShell = new ScalingAPI();

    }


    this.menuData = dataParser.getJson("config/" + this.moduleName + "course.json");
    this.commondataUIPath = this.menuData.config.commonDataPath.data + this.langName;
    var path = this.commondataUIPath + "userInterface.json";
    $.getJSON(path, function() {}).done(function(json) {
        UITxtData = json.ExternalData[0];
        assignUITextData();
    }).fail(function() {});
}

setLangShellImagePath = function() {
    langNameTmp = this.langName;
    if (this.langName == "en/") {
        //-- Use original path for en
        $(".IntroLogo img").attr('src', 'assets/image/common/hurix.png');
        return;
    }
    $(".IntroLogo img").attr('src', 'assets/image/common/hurix.png');
    $('img[class*="lang-"]').each(function(index) {
        langNm = langNameTmp.slice(0, -1);
        if (!$(this).hasClass('lang-' + langNm)) {
            return;
        }

        if ($(this).attr('src').indexOf('_' + langNm + '.') != -1) {
            //-- Already replaced
            return;
        }
        var tmpath = $(this).attr('src').split('.');
        if (tmpath[1] != undefined) {
            //-- Suffix lang code to image name
            $(this).attr('src', tmpath[0] + '_' + langNm + '.' + tmpath[1]);
        }
    });
};

function fnLoadNavigationTour() {
    $(".Shell_menu").css('display', 'none');
    $("#splashContainer").css('display', 'none');
    if (!isControllerInitiated) {
        isControllerInitiated = true;
        controller = new Controller();
    }
    callNavigationTourAudio();

}

function assignUITextData() {
    $.each(UITxtData, function(key, value) {
        $("." + key).html(value.text);
    });
    setLangShellImagePath();
};

function loadMainData() {
    // $('#preloaderSpinner').show();
    // $('#shellDisabler').show();

    if (!isControllerInitiated) {
        isControllerInitiated = true;
        controller = new Controller();
    }
    controller.mainLoadData();
    isTranscript = model.transcriptEnabled;
    isResources = model.resourcesEnabled;
    if (isResources == "false" || !isResources) {
        $(".resourcestat").css('display', 'none');
    } else {
        $(".resourcestat").css('display', 'table-cell');
    }

    if (isTranscript == "false" || !isTranscript) {
        if (!$("#audio_Icon").hasClass("deactive")) {
            $("#audio_Icon").addClass("deactive");
        }
    } else {
        if ($("#audio_Icon").hasClass("deactive")) {
            $("#audio_Icon").removeClass("deactive");
        }
    }
};

function beginCourse() {

    videojs = new VideoJS(window, {}, {}, window.jQuery);
    if (isSCORM) {
        model.scormHandler.initSCOjs();
        model.scormHandler.getBookmarkLocation();
        model.scormHandler.initSCO();
    } else {

        model.dispatchCustomEvent("updateView");
    }

    //$('#splashContainer').remove();
    $('.shell_wrap, .shell_header').css('display', 'block').show();
    swipeHeaderFooter();
    $('.footer-holder').css('display', 'block');
}

function beginCourseScrom() {
    $("#splashContainer").show()
    splashIntro = true
    var introVideo = ["assets/video/common/", "1"]
    initVideos(introVideo);
    $("#splash_content").append(videojs.video[0]);
    videojs.play(0);
     $(".resume").css("display", "none");
    // model.currPage = 0;
    // model.currMod = 0;
	// model.scormHandler.flushData();
	// model.dispatchCustomEvent("updateView");	
		// //callInitialAudio();
	// $("#splashContainer #skip_intro_resume").hide()
	// $("#splashContainer").hide()
	// $(".shellWrap").show()
	
}

function showFromBookMark() {
    $(".resume").css("display", "none");
    $(".shellWrap").show()
	
    splashIntro = false
    //$("#initLaunchBtn").show();
    model.dispatchCustomEvent("updateView");

    //callInitialAudio();
    clickedBookmarkYes = true;
}

var clearTimeHeader;

//swipe
function swipeHeaderFooter() {
    if (device.AndroidPhone() || device.iPhone()) {
        clearTimeout(clearTimeHeader);
        var element = $('.shell_pageLoader');
        if ((element.offsetHeight < element.scrollHeight) || (element.offsetWidth < element.scrollWidth)) {
            // your element have overflow			
            $('.shell_header').css('display', 'block');
            $('.footer-holder').css('display', 'block');
        } else {
            setHeaderHide();
        }
        var scrollTop = $('.shell_pageLoader').scrollTop();
        $('.shell_pageLoader').scroll(function() {
            scrollTop = $('.shell_pageLoader').scrollTop();
            var scrollBottom = $('.shell_pageLoader').height() + scrollTop;
            var iScrollHeight = $(".shell_pageLoader").prop("scrollHeight");
            if (scrollBottom >= (iScrollHeight - 50)) {}
            if (scrollBottom >= (iScrollHeight)) {
                $(this).css('height', '90%');
                $('.footer-holder').css('display', 'block');
            } else if (scrollTop == 0) {
                setHeaderHide();
                $('.shell_header').css('display', 'block');
                $(this).css('height', '100%');
            } else {
                $('.shell_header').css('display', 'none');
            }
        });
    }
}

function setHeaderHide() {
    $('.shell_header').css('display', 'block');
    clearTimeHeader = setTimeout(function() {
        $('.shell_header').css('display', 'none');
    }, 5000);
}

function showBuffer(isShow) {
    if (isShow) {
        clickableMenu = false;
    } else {
        clickableMenu = true;
    }
}

function loadMainTheme(stylePath, Lang) {
    var assestPreload = $.ajax(stylePath).done(function() {
        $('<link rel="stylesheet" type="text/css" href=' + stylePath + '>').appendTo("head");
        if (Lang == "ru/") {
            $('<link rel="stylesheet" type="text/css" href="css/common/shell-ru.css">').appendTo("head");
        } else if (Lang == "cn/") {}
        langNm = Lang.slice(0, -1);
        $('body').removeClass('body-lang-en').addClass('body-lang-' + langNm);
        showPreloader();
        showNavTourLink();
    });
}
//------------------------supporting facts-----------------------

 function showSupportingFacts (text,width,height) {
	$("#supportingfacts").css( "pointer-events", 'auto');
    $("#supportingfacts").addClass("supporting_facts");
    $("#supportingfacts #supportingfactstext").css('opacity', '1')
    $("#supportingfacts ,#supportingfactstext,#supporting_facts_image").css("cursor", 'pointer')
    /* $("#supportingfacts").css("display","block");
						$("#dummysupp").css("display","none"); */
    $('.contentbox .support_text1').html(text)
    /* supporting facts binding click*/
    $("#supportingfacts").unbind("click").bind("click", function() {
	
        $(".supportingcontent, .contentboxPerent").show();
        //$("#overlay_wrapper").displayShow();
        //$("#container_overlay").displayShow();
        $("#dummyback").show();
        $("#supporting_facts_image").removeClass("arrowchange").addClass("supportingfacts_selectarrow");
		
        $("#supportingfacts #supportingfactstext").css('color', '#004054')
		$(".contentboxPerent .contentbox").css('width',width+"px")
		$(".contentboxPerent .contentbox").css('height',height+"px")
		$(".contentboxPerent .contentbox").css('left',($('.contentboxPerent').width()/2)-(width/2)+"px")
		$(".contentboxPerent .contentbox").css('top',($('.contentboxPerent').height()/2)-(height/2)+"px")

        $(this).addClass("supportingfacts_selected");
        $("#supportingfactstext").addClass("bluecolor");
        $("#supporting_facts_image").removeClass("imagedown");
    });
    if (!($("#supportingfacts").hasClass("supportingfacts_selected"))) {
        $("#supportingfacts").hover(function() {
            $(this).addClass("supporting_facts");
            $("#supportingfacts").css("cursor", "pointer");
            $("#supportingfacts #supportingfactstext").css('color', '#004054')
            $("#supportingfacts").addClass('supportingfacts_normal').removeClass("supportingfacts_disabled")

        }, function() {
            //$("#supportingfacts #supportingfactstext"). css('color','white')
            $(this).removeClass("supporting_facts");
        });



    } else {

    }
    $(".exitbutton_for_support").hover(function() {
        $(".tooltipfor_close").css({
            "display": "block"
        });
    }, function() {
        $(".tooltipfor_close").css({
            "display": "none"
        });
    });


    $(".exitbutton_for_support").unbind("click").bind("click", function() {
        $(".supportingcontent, .contentboxPerent").hide();
        //$("#overlay_wrapper").displayHide();
        //$("#container_overlay").displayHide();
        $("#dummyback").hide();

        $("#supporting_facts_image").removeClass("supporting_facts_image").addClass("arrowchange");
        $("#supportingfactstext").removeClass("bluecolor");
        $("#supporting_facts_image").addClass("imagedown");
        $("#supportingfacts").removeClass("supportingfacts_selected");
        $("#supportingfacts").addClass("supportingfacts_normal");
        $("#supporting_facts_image").removeClass("arrowchange").addClass("supporting_facts_image");
        $(this).removeClass("selected_state");
        $("#supportingfacts #supportingfactstext").css('color', 'white')

    });

    $("#supportingfacts").unbind("mouseover").bind("mouseover", function() {
        if ($("#supportingfacts").hasClass("supporting_facts")) {

            $("#supportingfacts #supportingfactstext").css('color', '#004054')
        }
        if ($("#supportingfacts").hasClass("supportingfacts_selected")) {

            $("#supportingfacts #supportingfactstext").css('color', '#004054')
        }
    });

    $("#supportingfacts").unbind("mouseout").bind("mouseout", function() {
        if ($("#supportingfacts").hasClass("supportingfacts_normal")) {

            $("#supportingfacts #supportingfactstext").css('color', 'white')
        }
        if ($("#supportingfacts").hasClass("supportingfacts_selected")) {

            $("#supportingfacts #supportingfactstext").css('color', '#004054')
        }
    });




}

function hideSupportingFacts() {
	
	$("#supportingfacts").removeClass("supporting_facts");
    $("#supportingfacts #supportingfactstext").css('color', '#004054')
    $("#supportingfacts").unbind("click")
    $("#supportingfacts").unbind("hover")
    $("#supportingfacts ,#supportingfactstext,#supporting_facts_image").css("cursor", 'default')
    $("#supportingfacts").removeClass("supporting_facts").addClass('supportingfacts_disabled')
    $("#supportingfacts").css( "pointer-events", 'none');
    $('.contentbox .support_text1').html('');
    $("#supportingfacts").unbind("mouseover")
    $("#supportingfacts").unbind("mouseout")
    $("#supportingfacts #supportingfactstext").css('opacity', '0.5')

}


//----------------------------------------------------------------




function showNavTourLink() {
    if (langNm != undefined) {
        isNavTour = langNm != "en" ? false : isNavTour;
        if (isNavTour) {
            $('.navLauchTxt').css('display', 'block');
        } else {
            $('.navLauchTxt').css('display', 'none');
        }
    }
}



function createTimeLine() {
    var self = this;

    if (typeof timeline != "undefined" && timeline != null && timeline != "") {
        timeline.seek(timeline._totalDuration);
        timeline.remove();
    }
    timeline = new TimelineMax({
        paused: true,
        onStart: function() {

        },
        onUpdate: function() {

        }
    });
}