var globalColorCode;
var Model = function() 
{
	this.globalThemeColorCode = '';
	this.currPage = 0;
	this.currMod = 0;
	this.modArr = [];
	this.scaleFactor
	//13, 6, 2
	this.disablePlayPauseSlider=false
	this.visitedArr = [];
	this.events_Obj = [];
	this.scormHandler = new SCORMHandler();
	this.blinkStarArr=['0','0','0','0']
	//-- learningType: possible values: linear, non-linear;
	this.learningType = "linear";
	//this.learningType = "linear";
	this.firstTimeVisited = false;
	this.compleTeArr = [];
	this.configdata = dataParser.getJson("config/config.json");
	this.Pagination=this.configdata.config.Pagination.val;

	this.deployMode = this.configdata.config.isDeploy.val;
	if (this.deployMode == "@isDeploy@") 
	{
		this.moduleName = this.configdata.config.module.val;
		this.langName = this.configdata.config.lang.val;
	}
	else 
	{
		this.moduleName = this.configdata.config.moduleDeploy.val;
		this.langName = this.configdata.config.langDeploy.val;
	}

	this.menuData = dataParser.getJson("config/" + this.moduleName + "course.json");
	this.pagePath = this.menuData.config.pagePath.data + this.moduleName;
	this.audioPath = this.menuData.config.audioPath.data + this.moduleName + this.langName;
	this.commonaudioPath = this.menuData.config.commonaudioPath.data + this.langName;

	try 
	{
		this.imagePath = this.menuData.config.imagePath.data;
	} 
	catch(err) 
	{
		this.imagePath = "";
	}

	this.videoPath = this.menuData.config.videoPath.data + this.moduleName + this.langName;
	this.dataPath = this.menuData.config.dataPath.data + this.moduleName + this.langName;
	this.scriptPath = this.menuData.config.scriptPath.data + this.moduleName + this.langName;
	this.CSSPath = this.menuData.config.cssPath.data + this.moduleName + this.langName;
	this.commondataPath = this.menuData.config.commonDataPath.data + this.langName;
	this.mainData = this.menuData.config.maindata.data;
	
	try 
	{
		this.transcriptEnabled = this.menuData.config.transcriptEnable.data;
	}
	catch(err) 
	{
		this.transcriptEnabled = false;
	}
	
	try 
	{
		this.resourcesEnabled = this.menuData.config.resourcesEnable.data;
	}
	catch(err) 
	{
		this.resourcesEnabled = false;
	}
	
	
};




Model.prototype.init = function() 
{		
	 
	
	//Bookmark_location="4||0||0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0||1,-1,1,0"
	if (Bookmark_location != "" && Bookmark_location != undefined && Bookmark_location != "undefined" && Bookmark_location != "null" && Bookmark_location != null && Bookmark_location != "notSet") 
	{
		var arr = Bookmark_location.split("||");

		this.currPage = Number(arr[0]);
		this.currMod = Number(arr[1]);
		this.visitedArr[0] = arr[2].split(',');
		this.compleTeArr[0] = arr[2].split(',');
		model.blinkStarArr=[]
		model.blinkStarArr = arr[3].split(',');
		controller.retriveBlinkStar()
		if (this.currPage == 0) 
		{
			
			//$("#splashContainer").show()
			// var introVideo = ["assets/video/common/", "1"]
			// initVideos(introVideo);
			// $("#splash_content").append(videojs.video[0]);
			// videojs.play(0);
			$(".resume").css("display", "block");			
			//$("#preloaderSpinner").css("display", "none");
			$('#shellDisabler').hide();
			$(".yes_btn").on("click", showFromBookMark);
			$(".no_btn").on("click", beginCourseScrom);
		}
		else 
		{

			$(".resume").css("display", "block");			
			//$("#preloaderSpinner").css("display", "none");
			$('#shellDisabler').hide();
			$(".yes_btn").on("click", showFromBookMark);
			$(".no_btn").on("click", beginCourseScrom);
		}
		
		if (device.AndroidPhone() || device.AndroidTablet() || device.iPhone() || device.iPad()) 
		{
			$('#deviceLaunch').hide()
		}
	} 
	else 
	{
		
	
		
		if(splashIntro==true){
			$("#splashContainer").show()
			var introVideo = ["assets/video/common/", "1"]
			initVideos(introVideo);
			$("#splash_content").append(videojs.video[0]);
			if (!device.AndroidPhone() && !device.AndroidTablet() && !device.iPhone() && !device.iPad() &&  !device.Chrome()) {
				videojs.play(0);
			}else{
				$('#deviceLaunch').show()
			}
		}else{
			$(".shellWrap").show()
			$("#splashContainer").hide()
			$("#splashContainer").remove()
				if (device.AndroidPhone() || device.AndroidTablet() || device.iPhone() || device.iPad()) 
				{
					$('#deviceLaunch').show()

				}else{
					this.dispatchCustomEvent("updateView");
				}
			
		}
		
	}
};


Model.prototype.nextPage = function(_control) 
{
	if (this.currMod == (this.modArr.length - 1) && this.currPage == (this.modArr[this.currMod].length - 1)) 
	{
		//-- Last page disable
		return;
	}
	
	if (this.visitedArr[this.currMod][this.currPage] == 0 && model.learningType != "non-linear") 
	{
		return;
	}

	if (this.currPage == this.modArr[this.currMod].length - 1) 
	{
		this.currPage = 0;
		this.currMod++;
		
	}
	else 
	{
		// if (this.currPage == 2) {
		// 	this.currPage = 4;
		// 	$("#next_title span").html("Check your understanding")			
		// } else if (this.currPage == 8){
		// 	this.currPage = 14;
		// 	$("#next_title span").html("Key Learning Points")	
		// }else{
		// 	this.currPage++;
		// 	console.log(this.currPage,"next")			
		// } 
		this.currPage++
	}

	
	model.disablePlayPauseSlider=false;
	controller.menuBtnsControlEnable();
	hideSupportingFacts()
	this.dispatchCustomEvent("updateView");
	if (this.currPage == (this.modArr[0].length - 1)) {
		$("#shell_next").css("pointer-events", "none")
	} else {
		$("#shell_next").css("pointer-events", "auto")
	}
};

Model.prototype.prevPage = function(_control) 
{
	// if (this.currPage == 0 && model.currMod == 0 || this.currPage == 1)
	if (this.currPage == 0 && model.currMod == 0) 
	{
		return;
	}
	if (this.currPage == 0) 
	{
		this.currMod--;
		this.currPage = this.modArr[this.currMod].length - 1;
	}
	else 
	{
		// if (this.currPage == 4) {
		// 	this.currPage = 2;
		// 	$("#back_title span").html("What is human trafficking?");
		// 	console.log(this.currPage, "prev")
		// } else if (this.currPage == 14) {
		// 	this.currPage = 8;
		// 	$("#back_title span").html("Are these signs of trafficking?")
		// }else{
		// 	this.currPage--;
		// 	console.log(this.currPage, "prev")
		// } 
		this.currPage--;
		if (this.currPage == (this.modArr[0].length - 1)) {
			$("#shell_next").css("pointer-events", "none")
		} else {
			$("#shell_next").css("pointer-events", "auto")
		}
	}
	
	hideSupportingFacts()
	model.disablePlayPauseSlider=false;
	controller.menuBtnsControlEnable();
	this.dispatchCustomEvent("updateView");
	
};


Model.prototype.setPageVisited = function(page, mod) 
{
	
	if (this.visitedArr[this.currMod][this.currPage] == 0 || this.visitedArr[this.currMod][this.currPage] == '0' || this.visitedArr[this.currMod][this.currPage] == 1 || this.visitedArr[this.currMod][this.currPage] == '1') 
	{
		//this.visitedArr[this.currMod][this.currPage] = 2;
		this.firstTimeVisited = true;
	}
	else 
	{
		this.firstTimeVisited = false;
	}
};
Model.prototype.setPagePartiallyVisited = function(page, mod) 
{
	if (this.visitedArr[this.currMod][this.currPage] == 0 || this.visitedArr[this.currMod][this.currPage] == '0') 
	{
		this.visitedArr[this.currMod][this.currPage] = 1;
		this.firstTimeVisited = true;
	}
	else 
	{
		this.firstTimeVisited = false;
	}
};
Model.prototype.setCurrPage = function(page, mod) 
{	
$('.time').html("00:00 / 00:00")
	this.currPage = page;
	this.currMod = mod;
	hideSupportingFacts()
		model.disablePlayPauseSlider=false;
	controller.menuBtnsControlEnable();
	this.dispatchCustomEvent("updateView");
	
	
	
};

Model.prototype.addCustomEvent = function(evet, callback) 
{
	this.events_Obj.push({
		"eventName" : evet,
		"funcCallBack" : callback
	});
};

Model.prototype.dispatchCustomEvent = function(arg) 
{
	if( isVideo )
	{
		clearInterval(videojs.update[videoNum]);
		isVideo = false;
		videoNum = 0;
	}
	for (var i = 0; i < this.events_Obj.length; i++) 
	{
		if (this.events_Obj[i].eventName == arg) 
		{
			this.events_Obj[i].funcCallBack();
			break;
		}
	}
};
