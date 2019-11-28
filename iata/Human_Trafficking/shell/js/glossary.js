
var model1;
model1 = new Model();
var firstActive = true;
var Glossary = {
	data : dataParser.getJson(model1.commondataPath + "glossary.json"),
	deviceType : "",

	myConfig : {
		useCaching : true,
		language : "en"
	},


	createGlossary : function() {
		Glossary.deviceType = device.iPhone() || device.AndroidPhone() ? "mobile" : "noMobile";
		var numAlphabets = Glossary.data.alphabet.length;
		for (var i = 0; i < numAlphabets; i++) {
			var currAlp = Glossary.data.alphabet[i].letter;
			if (Glossary.data.alphabet[i].word.length == 0) {
				$("#alphbet_wraper").append("<li class='disabled' id  ='" + "shell_alph_" + i + "'>" + currAlp + "</li>");
			} else {
				$("#alphbet_wraper").append("<li class='active' id  ='" + "shell_alph_" + i + "'>" + currAlp + "</li>");
				if (firstActive) {
					firstActive = false;
					$('#alphbet_wraper').on('click', '.active', Glossary.generateWords);
					$('#shell_alph_' + i).trigger("click", Glossary.generateWords);
					$('#shell_alph_' + i).addClass("shell_g_letterSelected");
				}
			}
		}
	},

	generateWords : function() {
		var currNode = parseInt(this.id.split("shell_alph_")[1]);
		var numWords = Glossary.data.alphabet[currNode].word.length;
		$('#GlossaryDescription').html("");

		if (Glossary.deviceType != "mobile") {

		}

		for (var i = 0; i < numWords; i++) {
			var currWord = Glossary.data.alphabet[currNode].word[i];
			if (currWord.length > 20 && Glossary.deviceType != "mobile") {
				//var charArray=currWord.split("");
				currWord = currWord.slice(0, 20) + "...";
			}

			$("#shell_GlossaryAlphabets div").removeClass("shell_g_letterSelected");
			if (Glossary.deviceType == "mobile") {
				var description = Glossary.data.alphabet[currNode].description[0];
				$("#shell_GlossaryWords").append("<div class='shell_d_name'>" + description + "</div>");
			}
			var description = Glossary.data.alphabet[currNode].description[i];
			var currentWord = Glossary.data.alphabet[currNode].word[i];
			$('#GlossaryDescription').append("<li><h3>" + currentWord + "</h3><div class='itemDescription'>" + description + "</div></li>");
		}

		$(this).addClass("shell_g_letterSelected");

		if (Glossary.deviceType == "mobile") {
			$("#shell_GlossaryWords").accordion({
				heightStyle : "content"
			});
			return;
		}


	},

	generateDescription : function() {
		var currAlpNode = parseInt(this.id.split("_")[2]);
		var currWordNode = parseInt(this.id.split("_")[3]);

		var description = Glossary.data.alphabet[currAlpNode].description[currWordNode];
		var currentWord = Glossary.data.alphabet[currAlpNode].word[currWordNode];

		$('#GlossaryDescription').html("<b>" + currentWord + "</b>" + "<br/>" + description);

		$("#shell_GlossaryWords div").removeClass("shell_g_wordSelected");
		$(this).addClass("shell_g_wordSelected");
	}
};

$(function() {
	Glossary.createGlossary();
});
