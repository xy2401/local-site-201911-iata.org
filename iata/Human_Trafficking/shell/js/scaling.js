var ScalingAPI = function () {
	var scalingObj = {		
		init: function () {
			var self = this;			
			window.onload = self.doScaling;
			window.onresize = self.doScaling;
			self.doScaling();
		},
		/*
		 * 4/23/2015 6:41 PM
		 * This metohd is being used to scale the element "wrapper_parent" added in index.html
		*/
		doScaling : function () {
			var winHeight =  window.innerHeight;
			var winWidth = window.innerWidth;	
			var offset= 0, 
				containerTop = 0, 
				containerLeft = 0, 
				RESIZE_RATIO = winWidth/winHeight, 
				containerView = $('#wrapper'), 
				containerViewParent = $('#wrapper_parent'), 
				parentWidth = 0, 
				parentHeight = 0, 
				parentMarginTop = 0, 
				ASPECT_RATIO = containerView.width()/containerView.height(), 
				containerScale = 1;
			 
			containerView.css({
				'-webkit-transform':'scale(' + containerScale + ')', 
				'-moz-transform':'scale(' + containerScale + ')', 
				'-ms-transform':'scale(' + containerScale + ')', 
				'-o-transform':'scale(' + containerScale + ')'
			});
			containerViewParent.css({
				width: '0px', 
				height: '0px', 
				top: '50%', 
				left: '0px'
			});
			var widthDiff = (containerView.width() - winWidth)/winWidth * 100;
			var heightDiff = ((containerView.height()) - winHeight)/winHeight * 100;			
			(widthDiff > heightDiff) ? (containerScale = winWidth/containerView.width()) : (containerScale =  winHeight/(containerView.height()));
			
			// $(".shellWrap,.headerRight,.headerLeft,.mobileMenu").css("display",'block')
			// $(".grid-menu").css("display",'none')
			// $(".mobileMenu").css("bottom",'0px')
			// $(".transcriptButton").css("float",'left')
			// $(".transcriptButton").css("height",'30px')
			// $(".transcriptButton").css("background-color",'#445463')
			// $(".transcriptButton").css("margin-top",'5px')
			// $(".transcriptButton").css("margin-left",'6px')
			// $(".transcriptButton").css("width",'30px')
			// $("#wrapper").css("width",'1024px')
			// $("#wrapper").css("height",'690px')
			
			if(containerScale > 1){
				containerScale = 1;
			}
			containerView.css({
				'-webkit-transform':'scale(' + containerScale + ')', 
				'-moz-transform':'scale(' + containerScale + ')', 
				'-ms-transform':'scale(' + containerScale + ')', 
				'-o-transform':'scale(' + containerScale + ')'
			});			
			parentWidth = Math.round(containerView.width() * containerScale);
			parentHeight = Math.round(containerView.height() * containerScale);
			
			parentMarginTop = (parentHeight/2)
			
			containerViewParent.css({
				height: parentHeight + 'px', 
				width: parentWidth + 'px',
				marginTop: -parentMarginTop + 'px',
			});
			window.scrollTo(0,0);
			Model.scaleFactor = containerScale;
		}
	}
	scalingObj.init();
	return scalingObj;
}