var Menu = function(data) {
	//public
	this.modArr = [];
	this.visitedArr = [];
	//private
	xmlData = data;
	cMode = 0;
	this.pageCounter = 1;
	eventsObj = [];
	this.prevMod_mod = null;
	this.prevPage_page = "blank";
	this.prevPage_mod = "";
};

Menu.prototype.createMenu = function() {
	var structureTag = xmlData.structure;
	var tModules = structureTag.module.length;
	for (var i = 0; i < tModules; i++) {
		this.createModule($("#Menudrp"), structureTag.module[i], i);
		cMode++;
	}
	this.dispatchCustomEvent("menuReady");

	//-- Debug Feature - Toggle title when menu icon in popup header is clicked
	$('#shell_menu_pop .shell_popup_header h2').click(function() {
		var isTitle = false;
		if ($('div[class^="shell_menu_mod_page_title_"]').attr('title') !== undefined) {
			isTitle = true;
		}
	});

	$(".ShellOverlay.menuovrlay").unbind("click").bind("click", function () {
		
		$("#gadgetsButn").trigger('click');
	});
};

Menu.prototype.createModule = function(htmlTag, jsonTag, index) {
	var id = "shell_mod_" + index;
	this.createPage($("#Menudrp"), jsonTag);
};

Menu.prototype.createPage = function(pContiner, jsonTag) {
	var tPages = jsonTag.page.length;
	this.modArr[cMode] = [];
	var pTag = jsonTag.page;
	var ptemp = pContiner.append("<div class='menu_course_title'></div><ol id='list' class='popScroller'>");
	var splitPages = Math.round(tPages / 2);
	var temp = 0;
	for (var i = 0; i < tPages; i++) {
		
			if($("#"+titlesArr[i].module+"_click").hasClass("hasSubMenu")){
				var pageID = "shell_menu_mod_" + cMode + "_page_" + i;
				$("#"+titlesArr[i].module+"_click ul").append("<li id='" + pageID + "' data-page='" + i + "' data-mod='" + cMode + "' class='icon-fullyCompleted'><a href='#'>" + titlesArr[i].text + "</a><span class='menuSeperatorLine'></span></li>");
			}else{
				$("#list").append("<li id='"+titlesArr[i].module+"_click' class='hasSubMenu off'><a href='#'>"+testTitlesArr[i].module+"<div class='menu-item-arrow-parent'><span class='menu-item-arrow'></span></div></a><ul></ul></li>");
				var pageID = "shell_menu_mod_" + cMode + "_page_" + i;
				
				$("#"+titlesArr[i].module+"_click ul").append("<li id='" + pageID + "' data-page='" + i + "' data-mod='" + cMode + "' class='icon-fullyCompleted'><a href='#'>" + titlesArr[i].text + "</a><span class='menuSeperatorLine'></span></li>");
			}
		
		this.modArr[cMode].push({
			"path" : pTag[i].path,
			"audio" : pTag[i].audio,
			"data" : pTag[i].data,
			"styles" : pTag[i].styles,
			"scripts" : pTag[i].scripts
		});
		//console.log(this.modArr[cMode])
		//-- Debug Feature - Add path as data so that it can be added as title
		$("#" + pageID).attr('data-path', pTag[i].path);
	
		// $("#" + pageID).attr('title', pTag[i].getAttribute("path"));

		$("#" + pageID).on("click", function() {
			if ($(this).hasClass("shell_menu_mod_page_title_dsbl_style") || $(this).hasClass("Active")) {

				return;
			}
			controller.managePageClick($(this).data("page"), $(this).data("mod"));
			$('.Active').append('<div id="tickmark"></div>');
		});
		this.pageCounter++;
	}
	controlMenu();
};

Menu.prototype.menuPageNo = function(pageNo) {
	if (pageNo <= 9) {
		return "0" + pageNo;
	} else {
		return pageNo;
	}
};

Menu.prototype.updateMenu = function(page, mod, visitedArr) {
	for (var i = 0; i < visitedArr.length; i++) {
		for (var j = 0; j < this.modArr[i].length; j++) {
			var node_1 = $("#shell_menu_mod_" + i + "_page_" + j);
			node_1.removeClass(node_1.attr("class"));
			if ((visitedArr[i][j] == 1 || visitedArr[i][j] == '1')) {
				node_1.addClass("icon-partialcompleted");
			} else if ((visitedArr[i][j] == 2 || visitedArr[i][j] == '2')) {
				node_1.addClass("icon-fullyCompleted");
			} else if ((visitedArr[i][j] == 0 || visitedArr[i][j] == '0')) {
				node_1.addClass("icon-notcompleted");
			} else {
				if (visitedArr[i][j - 1] == 1 || visitedArr[i][j - 1] == '1') {
					node_1.addClass("icon-partialcompleted");
				} else {
					node_1.addClass("icon-partialcompleted");
				}
			}
		}
	}
	
	//on last page of current mod enable next module
	var node_0 = $("#shell_mod_" + (mod + 1) + "_title");
	if (visitedArr[mod].join().indexOf('0') == -1) {
		node_0.removeClass(node_0.attr("class"));
		node_0.addClass("icon-notcompleted");
	}
	//======================
	var pageClick = page;
	var modClick = mod;
	//remove the previous page click state and add normal state
	if (this.prevPage_page != null) {
		if (this.prevPage_page == pageClick && this.prevPage_mod == modClick) {
			//donothing
		} else {
			var prevNod = $("#shell_menu_mod_" + this.prevPage_mod + "_page_" + this.prevPage_page);

			prevNod.removeClass(prevNod.attr("class"));

		}
	}
	//add click state to current page
	var currNod = $("#shell_menu_mod_" + modClick + "_page_" + pageClick);
	currNod.removeClass(currNod.attr("class"));
	currNod.addClass("Active");
	if ((visitedArr[mod][page] == 1 || visitedArr[mod][page] == '1')) {
		currNod.addClass("icon-partialcompleted");
	} else if ((visitedArr[mod][page] == 2 || visitedArr[mod][page] == '2')) {
		currNod.addClass("icon-fullyCompleted");
	} else if ((visitedArr[mod][page] == 0 || visitedArr[mod][page] == '0')) {
		currNod.addClass("icon-notcompleted");
	}

	this.prevPage_page = page;
	this.prevPage_mod = mod;
	//this.manageModClick(mod);
	applyColor();
	
};

Menu.prototype.manageModClick = function(modID) {
	var modNode = $("#shell_mod_" + modID + "_title");
	if (modNode.hasClass("shell_menu_mod_title_nml_style")) {
		modNode.removeClass("shell_menu_mod_title_nml_style");
		modNode.find("span").eq(0).removeClass("shell_menu_mod_indent_nml");
		modNode.find("span").eq(1).removeClass("shell_menu_mod_text_nml");
		modNode.addClass("shell_menu_mod_title_clk_style");
		modNode.find("span").eq(0).addClass("shell_menu_mod_indent_clk");
		modNode.find("span").eq(1).addClass("shell_menu_mod_text_clk");
	} else {
		modNode.removeClass("shell_menu_mod_title_clk_style");
		modNode.find("span").eq(0).removeClass("shell_menu_mod_indent_clk");
		modNode.find("span").eq(1).removeClass("shell_menu_mod_text_clk");
		modNode.addClass("shell_menu_mod_title_nml_style");
		modNode.find("span").eq(0).addClass("shell_menu_mod_indent_nml");
		modNode.find("span").eq(1).addClass("shell_menu_mod_text_nml");
	}

	//related menu pages show/hide
	
	if (this.prevMod_mod == null) {
		this.prevMod_mod = modID;
		$("#shell_mod_" + modID + "_pages").show();
	} else {
		if (modID != this.prevMod_mod) {
			$("#shell_mod_" + modID + "_pages").show();
			$("#shell_mod_" + this.prevMod_mod + "_pages").hide();
			$("#shell_mod_" + this.prevMod_mod + "_title").removeClass("shell_menu_mod_title_clk_style");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(0).removeClass("shell_menu_mod_indent_clk");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(1).removeClass("shell_menu_mod_text_clk");
			$("#shell_mod_" + this.prevMod_mod + "_title").addClass("shell_menu_mod_title_nml_style");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(0).addClass("shell_menu_mod_indent_nml");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(1).addClass("shell_menu_mod_text_nml");
		} else {
			if (controller.menuUpdateBy == "self") {
				$("#shell_mod_" + modID + "_pages").toggle();

			} else {
				$("#shell_mod_" + modID + "_pages").show();
			}
		}
		this.prevMod_mod = modID;
	}
	if (controller)/*To avoid error when its custom call for page load below line throw error*/
		controller.menuUpdateBy = "system";
};
/******************************************************************************************/

Menu.prototype.addCustomEvent = function(evet, callback) {
	eventsObj.push({
		"eventName" : evet,
		"funcCallBack" : callback
	});
};

Menu.prototype.dispatchCustomEvent = function(arg) {
	for (var i = 0; i < eventsObj.length; i++) {
		if (eventsObj[i].eventName == arg) {
			eventsObj[i].funcCallBack();
			break;
		}
	}
};




//menu events
function controlMenu(){
	//adjust height
	var tempHeightHolder = $(window).height();
	
	


	$(".ShellMenuWrapper ol li.hasSubMenu a").on("click",function(){
		var tempId = $(this);

		$(".ShellMenuWrapper li.hasSubMenu").each(function(){
			if($(this).attr("id") != tempId.parent("li").attr("id")){
				$(this).find("ul").hide();
				$(this).removeClass("on").addClass("off");
			}
					
		});
		
		$(this).parent("li").find("ul").toggle('slide', {direction : directionSide},300, function(){
			if(tempId.parent("li").find("ul").css("display") == "block"){
				tempId.parent("li").addClass("on").removeClass("off");
				
			}else{
				tempId.parent("li").removeClass("on").addClass("off");
			}
		});

		setTimeout(function(){
			$(".ShellMenuWrapper").mCustomScrollbar("scrollTo","bottom",{scrollInertia:0});
		},300);
	});

	$(".grid-menu").click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
		$(".mobileMenu").slideToggle(500, function() {
			var op = $(".grid-menu").hasClass("active");
			if (!op) {
				$(".mobileMenu").removeAttr('style');
			}
		});
	});



	$(".ShellMenuWrapper ol li.hasSubMenu.on a").on("click", function(){
		//$(this).parent(".on").removeClass("on").addClass("off");
	});

	applyColor();
}
