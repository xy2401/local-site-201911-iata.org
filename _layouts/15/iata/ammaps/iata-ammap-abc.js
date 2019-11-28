
//var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
//var targetSVG = "M12 5c1.609 0 3.12 0.614 4.254 1.73 1.126 1.107 1.746 2.579 1.746 4.14s-0.62 3.030-1.745 4.139l-4.255 4.184-4.254-4.186c-1.125-1.107-1.745-2.576-1.745-4.139s0.62-3.032 1.745-4.141c1.135-1.113 2.647-1.727 4.254-1.727M12 3c-2.047 0-4.096 0.768-5.657 2.305-3.124 3.074-3.124 8.057 0 11.131l5.657 5.563 5.657-5.565c3.124-3.072 3.124-8.056 0-11.129-1.561-1.537-3.609-2.305-5.657-2.305z M12 8.499c0.668 0 1.296 0.26 1.768 0.731 0.976 0.976 0.976 2.562 0 3.537-0.473 0.472-1.1 0.731-1.768 0.731s-1.295-0.26-1.768-0.731c-0.976-0.976-0.976-2.562 0-3.537 0.473-0.471 1.101-0.731 1.768-0.731M12 7.499c-0.896 0-1.792 0.342-2.475 1.024-1.367 1.367-1.367 3.584 0 4.951 0.684 0.684 1.578 1.024 2.475 1.024s1.792-0.342 2.475-1.024c1.366-1.367 1.366-3.584 0-4.951-0.683-0.683-1.579-1.024-2.475-1.024z";
var targetSVG = "M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z";

function IATAAmMapsABC() {
    this.listName = abcamMapsList;
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

IATAAmMapsABC.prototype = {

    init: function () {
        var map = new AmCharts.AmMap();
        var amAreasArr = [];
        var amImagesArr = [];
        var amScale = 0.5;
        var amAreaUnlistedColor = "#8b8b8b";
        var amAreaRollOverColor = "#a7cc73";
        var amAreaRollOverOutlineColor = "#FFFFFF";
        var amAreaSelectedColor = "#eee5bf";
        var htmlPopUp = "{0}-{1}<br>" +
						"<strong>Scheme: </strong>{2}<br>" +
						"<strong> Based on: </strong>{3}<br>" +
						"<strong> Biometrics: </strong>{4}<br>" +
						"<strong> Eligibility: </strong>{5}<br>" +
						"<strong> Location: </strong>{6}<br>" +
						"<strong> Terminal: </strong>";

        for (var i = 0; i < listItemData.length; i++) {
            var oListItem = listItemData[i];
            amImagesArr.push({
                color: oListItem['AreaColor'],
                id: oListItem['Id'],
                svgPath: targetSVG,
                scale: amScale,
                //label:oListItem.get_item('Title'),
                latitude: oListItem['Latitude'],
                longitude: oListItem['Longitude'],
                title: oListItem['IATACode'] + " - " + oListItem['Title'],
                description: oListItem['LocationDetails'],
                countryCode: oListItem['CountryCode'],
                statusABC: oListItem['Status'],
                iataCode: oListItem['IATACode']
            });

        }

        var lookup = [];
        for (var i = 0, len = amImagesArr.length; i < len; i++) {
            lookup[amImagesArr[i].id] = amImagesArr[i];
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

        map.updateSelectionAirports = function (selectedId) {
            var areas = [];
            var images = [];
            if (selectedId === -1) {
                images = amImagesArr;
            }
            else {
                areas.push({
                    id: lookup[selectedId].countryCode,
                    showAsSelected: true,
                    selectedColor: amAreaSelectedColor
                });
                images.push({
                    color: lookup[selectedId].color,
                    id: lookup[selectedId].id,
                    svgPath: lookup[selectedId].svgPath,
                    scale: amScale,
                    latitude: lookup[selectedId].latitude,
                    longitude: lookup[selectedId].longitude,
                    title: lookup[selectedId].title,
                    description: lookup[selectedId].description
                });
            }
            map.dataProvider.areas = areas;
            dataProvider.images = images;
            map.validateData();
            return areas;
        }

        map.updateSelectionStatus = function (selectedVal) {
            var images;
            if (selectedVal === "-1") {
                images = amImagesArr;
            }
            else {
                images = jgn.grep(amImagesArr, function (element, index) {
                    return element.statusABC == selectedVal;
                });
            }
            dataProvider.images = images;
            map.validateData();
            return images;
        }

        dataProvider.images = amImagesArr;
        map.dataProvider = dataProvider;
        map.write("chartdiv");

        //init drop down's
        var dupes = {};
        var distinctStatus = [];
        jgn('#ddlABCAirports').append(jgn('<option></option>').val(-1).html("All"));
        var x = sortByKey(amImagesArr, "iataCode");
        jgn.each(x, function (val, text) {
            jgn('#ddlABCAirports').append(jgn('<option></option>').val(text.id).html(text.iataCode + "-" + text.title));
            if (!dupes[text.statusABC]) {
                dupes[text.statusABC] = true;
                distinctStatus.push(text);
            }
        });
        jgn("#ddlABCAirports").change(function () {
            map.updateSelectionAirports(parseInt(this.value));
        });


        jgn('#ddlABCSystems').append(jgn('<option></option>').val(-1).html("All"));
        jgn.each(distinctStatus, function (val, text) {
            jgn('#ddlABCSystems').append(jgn('<option></option>').val(text.statusABC).html(text.statusABC));
        });
        jgn("#ddlABCSystems").change(function () {
            map.updateSelectionStatus(this.value);
        });

        hideLoadImage();
    },
}

function hideLoadImage() {
    jgn("#imgAnimationABCMap").hide();
    jgn("#abcMapContainer").show();
    jgn("#ddlABCAirports").show();
    jgn("#ddlABCSystems").show();
}

function showLoadImage() {
    jgn("#imgAnimationABCMap").show();
    jgn("#abcMapContainer").hide();
    jgn("#ddlABCAirports").hide();
    jgn("#ddlABCSystems").hide();
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
var imgAMmap = new IATAAmMapsABC();

// .....::::: On Document Ready :::::.....
jgn(document).ready(function () {
    showLoadImage();
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', spAfterLoad);
});


