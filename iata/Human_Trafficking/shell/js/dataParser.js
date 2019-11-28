function dataParser() {
	if (arguments.callee.instance) {
		return arguments.callee.instance;
	}
	this.eventsObj = [];
	arguments.callee.instance = this;
}

dataParser.getInstance = function() {
	var singletonClass = new SingletonClass();
	return singletonClass;
};

dataParser.getJson = function(_jsonPath) {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		jsonhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE
		jsonhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	jsonhttp.open("GET", _jsonPath, false);
	jsonhttp.send();
	jsonDoc = jsonhttp.responseText;
	return JSON.parse(jsonDoc);
};

dataParser.getXml = function(_xmlPath) {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", _xmlPath, false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	return xmlDoc;
};
