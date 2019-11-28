ImagePreload = function(){
	var obj = {
		initialize: function () {
			var self = this;
			self.imgLoaded = false;
			self.render();
		},
		render: function () {
			var self = this;
			
		},
		imgPreload : function(imgList) {
			var self = this, imgArrList = imgList, imgArrLoad = [], deferedArr = [], deferedState = [], imgArrPathList = [];
			self.imgLoaded = false;
			for (i = 0; i < imgArrList.length; i++) {
				imgArrLoad[i] = new Image;
				imgArrPathList[i] = imgArrList[i];
				imgArrLoad[i].src = imgArrList[i];
				deferedArr[i] = $.Deferred();
				deferedArr[i].promise().then(
					function (index, html) {
						deferedState[index] = deferedArr[index].state();
						var percent = parseInt((deferedState.length/imgArrList.length) * 100);
						$('#preload #percent').html(percent + '%');
						//console.log('image-' + index + ' = ' + html + '-' + 'loaded percent is ' + percent + '%');
					}, function () {console.log('image not loaded');}
				)
				imgArrLoad[i].onload = function () {
					var index = imgArrPathList.indexOf($(this.outerHTML).attr('src'));
					deferedArr[index].resolve(index, this.outerHTML);
				}
			}
			$.when.apply($, deferedArr).done(function () {
				console.log('All images are loaded');
				self.imgLoaded = true;
				self.imgPreloaded();
				$('#preload').hide()
			})
		},
		imgPreloaded: function () {
			var self = this;
			// console.log('Images are loaded');
		},
		showScreenPreload : function(){
			
		},
		hideScreenPreload : function(){
			
			
		}
	}
	obj.initialize();
	return {
		imgPreload : obj.imgPreload,
		imgPreloaded : obj.imgPreloaded,
		imgLoaded : obj.imgLoaded
	}
}
