
var targetSVG = "M12 5c1.609 0 3.12 0.614 4.254 1.73 1.126 1.107 1.746 2.579 1.746 4.14s-0.62 3.030-1.745 4.139l-4.255 4.184-4.254-4.186c-1.125-1.107-1.745-2.576-1.745-4.139s0.62-3.032 1.745-4.141c1.135-1.113 2.647-1.727 4.254-1.727M12 3c-2.047 0-4.096 0.768-5.657 2.305-3.124 3.074-3.124 8.057 0 11.131l5.657 5.563 5.657-5.565c3.124-3.072 3.124-8.056 0-11.129-1.561-1.537-3.609-2.305-5.657-2.305z M12 8.499c0.668 0 1.296 0.26 1.768 0.731 0.976 0.976 0.976 2.562 0 3.537-0.473 0.472-1.1 0.731-1.768 0.731s-1.295-0.26-1.768-0.731c-0.976-0.976-0.976-2.562 0-3.537 0.473-0.471 1.101-0.731 1.768-0.731M12 7.499c-0.896 0-1.792 0.342-2.475 1.024-1.367 1.367-1.367 3.584 0 4.951 0.684 0.684 1.578 1.024 2.475 1.024s1.792-0.342 2.475-1.024c1.366-1.367 1.366-3.584 0-4.951-0.683-0.683-1.579-1.024-2.475-1.024z";

function IATAAmMapsFT() {
    this.listName = ftamMapsList;
    var collListItem;
}

// First, checks if it isn't implemented yet.
Object.defineProperty(String.prototype, "iata_string_format", {
    enumerable: false,
    value: function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    }
});

IATAAmMapsFT.prototype = {

    init: function () {
        var map = new AmCharts.AmMap();
        var amAreasArr = [];
        var amImagesArr = [];
        var amScale = 0.5;
        var amAreaUnlistedColor = "#8b8b8b";
        var selectedItemVal = "";

        for (var i = 0; i < listItemData.length; i++) {
            var oListItem = listItemData[i];

            amAreasArr.push({
                color: oListItem['Color'],
                id: oListItem['CountryCode'],
                project: oListItem['Project'],
				formalName: oListItem['CountryFormalName'],
				detail: oListItem['Detail']
            });
        }

        var dataProvider = {
            mapVar: AmCharts.maps.worldHigh,
            getAreasFromMap: false,
            autoResize: true
        };

        map.areasSettings = {
            unlistedAreasColor: amAreaUnlistedColor,
            outlineThickness: 0.1
        };

        var responsive = {
            enabled: true
        };
        map.responsive = responsive;

        map.updateSelectionProjects = function (selectedId) {
            var areas = jgn.grep(amAreasArr, function (element, index) {
                return element.project == selectedId;
            });
            map.dataProvider.areas = areas;
            map.validateData();

            return areas;
        }

        //init drop down's
        jgn.each(listItemDataProjects, function (val, text) {
            jgn('#ddlFTAirports').append(jgn('<option></option>').val(text).html(text));
            if (val === 0) {
                selectedItemVal = text;
            }
        });
        jgn("#ddlFTAirports").change(function () {
            map.updateSelectionProjects(this.value);
        });

        //assign the map data
        var amAreasArrFiltered = jgn.grep(amAreasArr, function (element, index) {
            return element.project == selectedItemVal;
        });
        dataProvider.areas = amAreasArrFiltered;
		
		map.balloonLabelFunction = adjustBalloonText;
		
        map.dataProvider = dataProvider;
        map.write("chartdivFT");
		
		
        hideLoadImage();
    },
}

function adjustBalloonText(mapObject, map){
    var value = mapObject.formalName;
	value = "<strong>" + value + "</strong>";
    if (mapObject.detail)
	{
		var details = mapObject.detail;
		if (details.length > 300)
		{
			details = details.substr(0,297) + "...";
		}
		value = value + " </br> " +  details;
	}
	console.log(value);
        return value;
   }

function hideLoadImage() {
    jgn("#imgAnimationABCMap").hide();
    jgn("#ftMapContainer").show();
    jgn("#ddlFTAirports").show();
}

function showLoadImage() {
    jgn("#imgAnimationABCMap").show();
    jgn("#ftMapContainer").hide();
    jgn("#ddlFTAirports").hide();
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function spAfterLoad() {
    imgAMmap.init();
}

//instance of the object
var imgAMmap = new IATAAmMapsFT();

// .....::::: On Document Ready :::::.....
jgn(document).ready(function () {
    showLoadImage();
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', spAfterLoad);
});


