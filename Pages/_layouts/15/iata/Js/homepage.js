var iataJQ = jQuery.noConflict();
iataJQ(document).ready(function(){
	iataJQ('#carouselText').slick({
		dots:false,
		prevArrow:".carouselPrev",
		nextArrow:".carouselNext",
		slide:".carousel_el"
	});
	iataJQ('#carousel').slick({
		dots:true,
		prevArrow:"#carouselNav .prev",
		nextArrow:"#carouselNav .next",
		slide:".carousel_el"
	});
	iataJQ(window).resize(function () {
		setTimeout(setButtonsAlignment, 500);
	});
	setTimeout(setButtonsAlignment, 500);
});
function setButtonsAlignment(){
	var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;

	if (inDesignMode != "1"){
	if(iataJQ(".icon.icon-minimenu").css("display") == "none") {
		if(iataJQ(".pressRelease .grid2_3").offset().top == iataJQ(".pressRelease .grid1_3").offset().top){
			iataJQ(".pressRelease .grid1_3").css("height", (iataJQ(".pressRelease .grid2_3").height() - parseInt(iataJQ(".pressRelease .grid1_3 .soloTeaser").css("padding-bottom")) - 1) + "px");
			iataJQ(".pressRelease .grid1_3 .soloTeaser").css("height", "100%");
			iataJQ(".pressRelease .grid1_3 span.button").offset({ top: iataJQ(".pressRelease .grid2_3 span.button").offset().top });
		}
		if(iataJQ(".reportsRelease .grid2_3").offset().top == iataJQ(".reportsRelease .grid1_3").offset().top){
			iataJQ(".reportsRelease .grid1_3").css("height", (iataJQ(".reportsRelease .grid2_3").height() - 1) + "px");
			iataJQ(".reportsRelease .grid1_3 .soloTeaser").css("height", "100%");
			iataJQ(".reportsRelease .grid1_3 span.button").offset({ top: iataJQ(".reportsRelease .grid2_3 span.button").offset().top });
		}
	}
	}
}
/*
var j182 = jQuery.noConflict();
j182(document).ready(function () {

    j182('#homeSlider').slides({
        generateNextPrev: false,
        play: 9000,
        pause: 2500,
        hoverPause: true,
        effect: 'fade'
    });

    j182('#accordion1').show();
    j182('#accordion2').show();
    j182('#accordion3').show();

    j182('#accordion1').accordion({
        heightStyle: "content"
    });

    j182('#accordion2').accordion({
        heightStyle: "content"
    });

    j182('#accordion3').accordion({
        heightStyle: "content"
    });


    j182('#inFocusSlides').slides({
        generateNextPrev: true,        
        effect: 'slide',
        pagination: false,
        generatePagination: false
    });
        
    //j182('#imgHome').attr("src", "/Style%20Library/IATA.org-v1/Core/Images/Icons/home-active.png");
});
*/
