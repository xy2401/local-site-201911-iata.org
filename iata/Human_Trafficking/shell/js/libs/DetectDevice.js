var device = {
	Android : function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry : function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS : function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod|Mac/i) ? true : false;
	},
	Windows : function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},

	AndroidPhone : function() {
		var userAgent = navigator.userAgent.toLowerCase();
		if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1)) {
			return true;
		} else {
			return false;
		}
	},
	AndroidTablet : function() {
		var userAgent = navigator.userAgent.toLowerCase();
		if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1)) {
			return true;
		} else {
			return false;
		}
	},
	iPhone : function() {
		return navigator.userAgent.match(/iPhone/i) ? true : false;
	},
	iPad : function() {
		return navigator.userAgent.match(/iPad/i) ? true : false;
	},
	MobileDevice : function() {
		return device.AndroidPhone() || device.iPhone() ? true : false;
	},
	Firefox : function() {
		return navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? true : false;
	},
	Chrome : function() {
		return navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ? true : false;
	},
	iOSVersion : function() {
		if (navigator.userAgent.match(/iPhone|iPad|iPod|/i)) {
			var userOS = 'iOS';
			var uaindex = navigator.userAgent.indexOf('OS');
			if (userOS === 'iOS' && uaindex > -1) {
				userOSver = navigator.userAgent.substr(uaindex + 3, 3).replace('_', '.');
				return userOSver;
			}
		}
	},
	IE : function() {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			return true;
		} else {

			return false;
		}
	},
	IEVersion : function() {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
				return rv;
			}
		} else {

			return false;
		}
	}
};
