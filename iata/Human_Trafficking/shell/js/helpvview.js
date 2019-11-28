$(function() {
	//Preloader.init($('body'), preloadingDone, $('.page_preloader'))
	//imageLoader.load($('.pageWrapper'), controller.loadStyles);

});

function preloadingDone() {
	//controller.hidePreloader();
	//audioPlayer.loadAudioPath("media/audio/mute_long.mp3", audioFinish);
	pageLoad=true;
	initAnimStates();
	$('.content_blocker').show();
}

function audioFinish() {
	scrubberBool = true;
	//audioComp = true;
	//ClickFn();
}

var anim_seq = new Array("$('#animEl_1')", "$('#animEl_2')", "$('#animEl_3')", "$('#animEl_4')", "$('#animEl_5')");
var tabArr = new Array("$('#tab_1')", "$('#tab_2')", "$('#tab_3')", "$('#tab_4')", "$('#tab_5')");
var anim_len = anim_seq.length;
var tab_clicked;
var prevtab;
var tabsno=5;
var clickfn = false;
var scrubberBool=false;
var tab_id;
var helpUsed=false;
var helpCurrentBtn="";
var helpLastBtn="";
var $wrapper = $("#wrapper");
// var overImageArray=["url(shell/images/menu_selected.png","url(shell/images/exit_selected.png","url(shell/images/references_selected.png","url(shell/images/print_selected.png","url(shell/images/help_selected.png","url(shell/images/replay_selected.png","url(shell/images/play_selected.png","url(shell/images/help_SF_ico_hover.png","url(shell/images/help_AT_ico_hover.png","url(shell/images/help_slider_ico_hover.png","url(shell/images/audio-on_selected.png","url(shell/images/back_selected.png","url(shell/images/help_pageCount_ico_hover.png","url(shell/images/next_selected.png"];

var outImageArray=["url(shell/images/menu_normal.png","url(shell/images/exit_normal.png","url(shell/images/references_normal.png","url(shell/images/print_normal.png","url(shell/images/help_normal.png","url(shell/images/replay_normal.png","url(shell/images/play_normal.png","url(shell/images/help_SF_ico.png","url(shell/images/help_AT_ico.png","url(shell/images/help_slider_ico.png","url(shell/images/audio-on_normal.png","url(shell/images/back_normal.png","url(shell/images/help_pageCount_ico.png","url(shell/images/next_normal.png"]

$(document).ready(function() {
	//var self = this;
	
	$( ".step" ).hover(function() {
			
			//$(this).find(".btn_Inside").addClass('hover2')
		}, function() {
           
		   //	$(this).find(".btn_Inside").removeClass('hover2')
		}
	);
	$('.step').click(function() {
		if(!$(this).hasClass('disabledcls')){
			 $(".step").removeClass("disabledcls");
			 $(".tab").removeClass("disabledcls");
			 $(this).addClass('disabledcls');
			 var clickID = $(this).attr('id').slice(4)
			
			 resetClick();
			 $('.helpText,.icon').css('opacity','0.5')
			  $("#step"+clickID+" .helpText").css('opacity','1')
			   $("#step"+clickID+" .icon").css('opacity','1')
			 $('#box'+clickID).css('display','block');
			 $('#box'+clickID).css('pointer-events','none');
			 helpLastBtn=helpCurrentBtn
			 helpCurrentBtn=clickID
		}
		helpUsed=true
		 
		$('#step'+helpLastBtn+" .helpText ").css('cursor','pointer')
		$('#step'+helpCurrentBtn+" .helpText ").css('cursor','default')
		$('#icon'+helpLastBtn).css('background-image',outImageArray[helpLastBtn-1]);
		// $('#icon'+helpCurrentBtn).css('background-image',overImageArray[helpCurrentBtn-1]);
		$('#step'+helpLastBtn).css('pointer-events','auto');
		$('#step'+helpCurrentBtn).css('pointer-events','none');
				   
	});
	// $(".step").mouseover(function(){
					
	// 	 var clickID = $(this).attr('id').slice(4)
	// 	//  $('#icon'+clickID).css('background-image',overImageArray[clickID-1]);
	// 	 if( helpUsed==true  ){
	// 	  $("#step"+clickID+" .helpText").css('opacity','1')
	// 	   $("#step"+clickID+" .icon").css('opacity','1')
		   
	// 	 }
				

	// });

	// $(".step").mouseout(function(){
		
	// 	  var clickID = $(this).attr('id').slice(4)
	// 	  console.log(helpCurrentBtn+">>>"+(clickID))
	// 	  if( helpUsed==true && (helpCurrentBtn) === (clickID)){
	// 		$('#icon'+clickID).css('background-image',overImageArray[clickID-1]);
	// 		 $("#step"+clickID+" .helpText").css('opacity','1')
	// 	   $("#step"+clickID+" .icon").css('opacity','1')
	// 	  }else{
	// 		$('#icon'+clickID).css('background-image',outImageArray[clickID-1]);
	// 		if(helpUsed==true){
	// 			$('#icon'+clickID).css('background-image',outImageArray[clickID-1]);
	// 		 $("#step"+clickID+" .helpText").css('opacity','0.5')
	// 	   $("#step"+clickID+" .icon").css('opacity','0.5')
	// 		}
		
		   
	// 	}
		 
	// });
				
	 $("#tab8").mouseover(function(){
		 $('#icon_image1').css('background-image','url(shell/images/up_arrow_blue.png');
	});

	 $("#tab8").mouseout(function(){
		 $('#icon_image1').css('background-image','url(shell/images/up_arrow_white.png');

	});



	 $("#tab9").mouseover(function(){
		 $('#icon_image2').css('background-image','url(shell/images/up_arrow_blue.png');


	});

	 $("#tab9").mouseout(function(){
		 $('#icon_image2').css('background-image','url(shell/images/up_arrow_white.png');

	});			
	
				
	$('.tab ').unbind('click ').bind('click ',function(){
		 if(!$(this).hasClass('disabledcls')){
			 $(".tab").removeClass("disabledcls");
			  $(".step").removeClass("disabledcls");
			 $(this).addClass('disabledcls');
			 var clickID = $(this).attr('id').slice(3)
			 resetClick();
			 $('#box'+clickID).css('display','block');
			 $('#box'+clickID).css('pointer-events','none');
		 }
    });
	
	$('#help_close_button').unbind('click').bind('click', function(){
		$("#helpDrp").hide()
		$("#shell_back").css('pointer-events', 'auto');
		$("#shell_next").css('pointer-events', 'auto');
			$("#helpbtn").removeClass("active");
			// $("#helpbtn span").css('transform', 'rotate(0deg)');
			if ($("#helpDrp").hasClass("mCustomScrollbar")) {
				$('#helpDrp').mCustomScrollbar("destroy");
			}
			
			if(splashIntro==true){
				model.currPage = 0
				model.currMod = 0;
				$('.time').html("00:00 / 00:00")
				hideSupportingFacts()
				if (model.currPage == (model.modArr[model.currMod].length - 1)) {
					controller.setPageVisited();
				}
				model.dispatchCustomEvent("updateView");	
				callInitialAudio();
			}else{
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioResume();
				}
			}
			splashIntro=false
			controller.menuBtnsControlEnable();
			ishelpOpen = false;
			helpUsed=false;
		setTimeout(function(){ 
			$('.helpText,.icon').css('opacity','1')
			$('.box').css({'display':'none'})
			$('.text').css({'cursor':'pointer'})
			$('.step').css('pointer-events', 'auto')
			$('.step').removeClass('disabledcls')
			
			for(i=1; i<=14;i++){
				$('#icon'+i).css('background-image',outImageArray[i-1]);
			}
			
		}, 1000);
		helpAudioEle.pause();
		$('#helpbtn.highlight').removeClass('highlight');
		$('#helpbtn.highlightback').removeClass('highlightback');
		$('.grayoverlay').hide();
	});
	




});

function resetClick(){
	for(var i = 0;i<18;i++){
		$('#box'+i).css('display','none');
	}
}




