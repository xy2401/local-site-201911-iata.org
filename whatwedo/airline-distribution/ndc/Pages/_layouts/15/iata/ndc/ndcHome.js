jgn(function () {
    jgn("#ndc-browse-tabs").tabs({
        classes: {
            "ui-tabs": "ndc-tabs",
            "ui-tabs-nav": "ndc-tabs-nav",
            "ui-tabs-tab": "ndc-tabs-tab",
            "ui-tabs-panel": "ndc-tabs-panel"
        }
    });

    jgn("#ndc-players-airlines-count").text("(" + AirlinesCount + ")");
    jgn("#ndc-players-sellers-count").text("(" + SellersCount + ")");
    jgn("#ndc-players-aggregators-count").text("(" + AggregatorsCount + ")");

    var productTemplate = jgn("#NDCProductTemplate").html();
    var latestProductTemplate = jgn("#NDCLatestProductTemplate").html();

    NDCProducts.sort(function (a, b) { return ((a.Name < b.Name) ? -1 : ((a.Name > b.Name) ? 1 : 0)); });

    jgn.each(NDCProducts, function (index, product) {
        var prdTemplate = productTemplate.replaceAll("{TITLE}", product.name);
        var prdTemplate = prdTemplate.replaceAll("{SRC}", "/_layouts/15/iata/ndc/images/products/" + product.name.replaceAll(" ", "") + ".png");
        jgn("#ndc-tab-products").append(jgn(prdTemplate));
    });
});

function openAdvancedSearchBox(selectedValue, type) {
    jgn("select#ndc-search-box-players").val(selectedValue);
    jgn(".ndc-dialog-box-line-extra-filter-info-container").hide();

    jgn(".ndc-search-box-checkbox").prop("indeterminate", true)

    switch (selectedValue) {
        case "Airline":
            jgn(".ndc-a-search-sellers").hide();
            jgn(".ndc-a-search-aggregators").hide();
            jgn(".ndc-a-search-airlines").show();
            break;
        case "Seller":
            jgn(".ndc-a-search-airlines").hide();
            jgn(".ndc-a-search-aggregators").hide();
            jgn(".ndc-a-search-sellers").show();
            break;
        case "Aggregator":
            jgn(".ndc-a-search-sellers").hide();
            jgn(".ndc-a-search-airlines").hide();
            jgn(".ndc-a-search-aggregators").show();
            break;
    }

    //jgn(".ndc-dialog-box-line-extra-filter").show();

    loadAdvancedSearchCRFilters();

    if (type == 2) {
        jgn("select#ndc-search-box-countries").val(window.selectedCountryForAdvancedSearch);
        var region = "";
        jgn(window.ndcLocations).each(function (index, location) {
            if (location.country == window.selectedCountryForAdvancedSearch) {
                region = location.region;
                return;
            }
        });

        if (region != "") {
            jgn("select#ndc-search-box-regions").val(region);
        }

        if (jgn("select#ndc-search-box-countries").find(":selected").length == 0) {
            jgn("select#ndc-search-box-countries").val("Select Country");
        }
        if (jgn("select#ndc-search-box-regions").find(":selected").length == 0) {
            jgn("select#ndc-search-box-regions").val("Select Region");
        }
    }

    jgn("#ndc-advanced-srchbox").val("");
    jgn("#NDCAdvancedSearchForm").dialog({
        width: 650,
        height: 440
    });

    if (type == 1) {
        loadAdvancedSearchFilters();
    }

    jgn("select#ndc-search-box-players").unbind("change");
    jgn("select#ndc-search-box-players").change(function () {
        var playerType = jgn('#ndc-search-box-players').find(":selected").text();
        if (playerType == "Select Players") {
            jgn(".ndc-dialog-box-line-extra-filter").hide();
            jgn(".ndc-dialog-box-line-extra-filter-info-container").show();
        }
        else {
            loadAdvancedSearchFilters();
            jgn(".ndc-dialog-box-line-extra-filter-info-container").hide();

            switch (playerType) {
                case "Airline":
                    jgn(".ndc-a-search-sellers").hide();
                    jgn(".ndc-a-search-aggregators").hide();
                    jgn(".ndc-a-search-airlines").show();
                    break;
                case "Seller":
                    jgn(".ndc-a-search-airlines").hide();
                    jgn(".ndc-a-search-aggregators").hide();
                    jgn(".ndc-a-search-sellers").show();
                    break;
                case "Aggregator":
                    jgn(".ndc-a-search-sellers").hide();
                    jgn(".ndc-a-search-airlines").hide();
                    jgn(".ndc-a-search-aggregators").show();
                    break;
            }
        }
    });
    jgn(".ui-dialog[aria-describedby='NDCAdvancedSearchForm']").show();
}

function openLatestInformationBox() {
    jgn("#NDCLatestInfo").dialog({
        width: 800,
        height: 650
    });
}

function filterCountries() {
    window.ndcCountries = [];
    var country = jgn("#ndc-search-box-countries").val();
    var region = jgn("#ndc-search-box-regions").val();
    jgn("#ndc-search-box-countries").empty();
    jgn("#ndc-search-box-countries").append(new Option("Select Country", "Select Country"));
    jgn(window.ndcLocations).each(function (index, location) {
        if (region == "Select Region" || location.region == region) {
            jgn("#ndc-search-box-countries").append(new Option(location.country, location.country, location.country == country, location.country == country));

        }
    })
}


function filterRegions() {
    window.ndcCountries = [];
    var country = jgn("#ndc-search-box-countries").val();
    jgn("#ndc-search-box-regions").empty();
    jgn("#ndc-search-box-regions").append(new Option("Select Region", "Select Region"));
    jgn(window.ndcLocations).each(function (index, location) {
        if (country == "Select Country" || location.country == country) {
            jgn("#ndc-search-box-regions").append(new Option(location.region, location.region, country != "Select Country", country != "Select Country"));
        }
    })
}

function loadAdvancedSearchCRFilters() {
    window.ndcLocations = [];
    window.ndcRegions = [];
    jgn("#ndc-search-box-regions").empty();
    jgn("#ndc-search-box-countries").empty();
    jgn("#ndc-search-box-products").empty();
    if (NDCProfiles) {
        jgn.each(NDCProfiles, function (index, player) {
            var locationExists = false;
            jgn(window.ndcLocations).each(function (index, location) {
                if (location.region == player.region && location.country == player.country) {
                    locationExists = true;
                    return;
                }
            })
            if (!locationExists && player.country && player.country.trim() != "")
                window.ndcLocations.push({ region: player.region, country: player.country });

            var regionExists = false;
            jgn(window.ndcRegions).each(function (index, region) {
                if (region == player.region) {
                    regionExists = true;
                    return;
                }
            })
            if (!regionExists && player.region && player.region.trim() != "")
                window.ndcRegions.push(player.region);
        });
    }

    window.ndcRegions.sort();
    window.ndcLocations.sort(function (a, b) { return ((a.country < b.country) ? -1 : ((a.country > b.country) ? 1 : 0)); });

    jgn("#ndc-search-box-regions").append(new Option("Select Region", "Select Region"));
    jgn(window.ndcRegions).each(function (index, region) {
        jgn("#ndc-search-box-regions").append(new Option(region, region));
    })

    jgn("#ndc-search-box-countries").append(new Option("Select Country", "Select Country"));
    jgn(window.ndcLocations).each(function (index, location) {
        jgn("#ndc-search-box-countries").append(new Option(location.country, location.country));
    })

    jgn("#ndc-search-box-products").append(new Option("Products and Services", "Products and Services"));
    jgn(NDCProducts).each(function (index, product) {
        jgn("#ndc-search-box-products").append(new Option(product.name, product.name));
    })

    jgn("#ndc-search-box-regions").change(filterCountries);
    jgn("#ndc-search-box-countries").change(filterRegions);
}

function loadAdvancedSearchFilters() {
    var typeOfFares = [];
    var typeOfSellers = [];
    var servicing = [];
    var schema = [];
    var fopAccepted = [];
    var ndcScope = [];
    jgn("#ndc-search-box-sellerType").empty();
    jgn("#ndc-search-box-typeOfFares").empty();
    jgn("#ndc-search-box-schema").empty();
    jgn("#ndc-search-box-fopAccepted").empty();
    jgn("#ndc-search-box-ndcServicing").empty();

    if (NDCProfiles) {
        jgn.each(NDCProfiles, function (index, player) {
            var itemExists = false;
            if (player.capabilities) {
                jgn(player.capabilities.typesOrFares).each(function (index, fare) {
                    itemExists = false;
                    jgn(typeOfFares).each(function (index, item) {
                        if (item == fare) {
                            itemExists = true;
                        }
                    })

                    if (!itemExists && fare && fare.trim() != "")
                        typeOfFares.push(fare);
                });

                itemExists = false;
                jgn(player.sellerType).each(function (index, stype) {
                    itemExists = false;
                    jgn(typeOfSellers).each(function (index, item) {
                        if (item == stype) {
                            itemExists = true;
                        }
                    })

                    if (!itemExists && stype && stype.trim() != "")
                        typeOfSellers.push(stype);
                });

                itemExists = false;
                jgn(servicing).each(function (index, item) {
                    if (item == player.capabilities.servicing) {
                        itemExists = true;
                        return;
                    }
                })
                if (!itemExists && player.capabilities.servicing && player.capabilities.servicing.trim() != "")
                    servicing.push(player.capabilities.servicing);
            }

            itemExists = false;
            jgn(player.schemaVersion).each(function (index, schemaV) {
                itemExists = false;
                jgn(schema).each(function (index, item) {
                    if (item == schemaV) {
                        itemExists = true;
                    }
                })

                if (!itemExists && schemaV && schemaV.trim() != "")
                    schema.push(schemaV);
            });

            if (player.capabilities) {
                jgn(player.capabilities.paymentForms).each(function (index, pForm) {
                    itemExists = false;
                    jgn(fopAccepted).each(function (index, item) {
                        if (item == pForm) {
                            itemExists = true;
                        }
                    })
                    if (!itemExists && pForm && pForm.trim() != "")
                        fopAccepted.push(pForm);
                })
            }
        });
    }

    typeOfSellers.sort();
    typeOfFares.sort();
    schema.sort(function (a, b) { return ((a < b) ? 1 : ((a > b) ? -1 : 0)); });
    fopAccepted.sort();
    servicing.sort();

    jgn("#ndc-search-box-sellerType").append(new Option("Type of Seller", "Type of Seller"));
    jgn(typeOfSellers).each(function (index, item) {
        jgn("#ndc-search-box-sellerType").append(new Option(item, item));
    })

    jgn("#ndc-search-box-typeOfFares").append(new Option("Type of Fares", "Type of Fares"));
    jgn(typeOfFares).each(function (index, item) {
        jgn("#ndc-search-box-typeOfFares").append(new Option(item, item));
    })

    jgn("#ndc-search-box-schema").append(new Option("Standard", "Standard"));
    jgn(schema).each(function (index, item) {
        jgn("#ndc-search-box-schema").append(new Option(item, item));
    })

    jgn("#ndc-search-box-fopAccepted").append(new Option("Forms of Payment Accepted", "Forms of Payment Accepted"));
    jgn(fopAccepted).each(function (index, item) {
        jgn("#ndc-search-box-fopAccepted").append(new Option(item, item));
    })

    jgn("#ndc-search-box-ndcServicing").append(new Option("Servicing", "Servicing"));
    jgn(servicing).each(function (index, item) {
        jgn("#ndc-search-box-ndcServicing").append(new Option(item, item));
    })
}

function browseByProduct(product) {
    var NDCPlayersFilter = {
        Name: "",
        Type: "",
        Product: product,
        Region: "",
        Country: "",
        TypeOfFares: "",
        AirlineProfile: false,
        Personalisation: false,
        RichContent: false,
        SellerType: "",
        //IncentivesForTA: false,
        Schema: "",
        FOPAccepted: "",
        IgnoreCheckboxes: true,
        Servicing:"",
    }

    showFilteredPlayers(NDCPlayersFilter);
}

function searchFromMap(type) {
    var NDCPlayersFilter = {
        Name: "",
        Type: type,
        Product: "",
        Region: "",
        Country: window.selectedCountryForAdvancedSearch,
        TypeOfFares: "",
        AirlineProfile: false,
        Personalisation: false,
        RichContent: false,
        //IncentivesForTA: false,
        Schema: "",
        SellerType: "",
        FOPAccepted: "",
        IgnoreCheckboxes: true,
        Servicing: "",
    }

    showFilteredPlayers(NDCPlayersFilter);
}

function searchByAll() {
    var NDCPlayersFilter = {
        Name: jgn("#ndc-advanced-srchbox").val(),
        Type: jgn('#ndc-search-box-players').find(":selected").text() == "Select Players" ? "" : jgn('#ndc-search-box-players').find(":selected").text(),
        Product: jgn('#ndc-search-box-products').find(":selected").text() == "Products and Services" ? "" : jgn('#ndc-search-box-products').find(":selected").text(),
        Region: jgn('#ndc-search-box-regions').find(":selected").text() == "Select Region" ? "" : jgn('#ndc-search-box-regions').find(":selected").text(),
        Country: jgn('#ndc-search-box-countries').find(":selected").text() == "Select Country" ? "" : jgn('#ndc-search-box-countries').find(":selected").text(),
        TypeOfFares: jgn('#ndc-search-box-typeOfFares').find(":selected").text() == "Type of Fares" ? "" : jgn('#ndc-search-box-typeOfFares').find(":selected").text(),
        Servicing: jgn('#ndc-search-box-ndcServicing').find(":selected").text() == "Servicing" ? "" : jgn('#ndc-search-box-ndcServicing').find(":selected").text(),
        AirlineProfile: jgn("#ndc-search-box-airlineProfile").prop("indeterminate") ? null : jgn("#ndc-search-box-airlineProfile").is(':checked'),
        Personalisation: jgn("#ndc-search-box-personalisation").prop("indeterminate") ? null : jgn("#ndc-search-box-personalisation").is(':checked'),
        RichContent: jgn("#ndc-search-box-richContent").prop("indeterminate") ? null : jgn("#ndc-search-box-richContent").is(':checked'),
        //IncentivesForTA: jgn("#ndc-search-box-incentiveForTA").prop("indeterminate") ? null : jgn("#ndc-search-box-incentiveForTA").is(':checked'),
        Schema: jgn('#ndc-search-box-schema').find(":selected").text() == "Standard" ? "" : jgn('#ndc-search-box-schema').find(":selected").text(),
        FOPAccepted: jgn('#ndc-search-box-fopAccepted').find(":selected").text() == "Forms of Payment Accepted" ? "" : jgn('#ndc-search-box-fopAccepted').find(":selected").text(),
        SellerType: jgn('#ndc-search-box-sellerType').find(":selected").text() == "Type of Seller" ? "" : jgn('#ndc-search-box-sellerType').find(":selected").text(),
        IgnoreCheckboxes: false,
    }

    jgn(".ui-dialog[aria-describedby='NDCAdvancedSearchForm']").hide();

    showFilteredPlayers(NDCPlayersFilter);
}

function showFilteredPlayers(filter) {
    jgn("#ndc-players-box-search-result").show();
    jgn("#ndc-player-box-content-search-result").empty();
    jgn("#ndc-player-box-content-search-result-none").hide();
    var players = [];
    jgn(NDCProfiles).each(function (index, player) {
        var toAdd = true;
        toAdd = toAdd && (filter.Name == "" || (filter.Name != "" && player.name.toLowerCase().indexOf(filter.Name.toLowerCase()) > -1))
        toAdd = toAdd && (filter.Type == "" || (filter.Type != "" && player.type === filter.Type))
        toAdd = toAdd && (filter.Region == "" || (filter.Region != "" && player.region === filter.Region))
        toAdd = toAdd && (filter.Country == "" || (filter.Country != "" && player.country === filter.Country))
        //toAdd = toAdd && (filter.Schema == "" || (filter.Schema != "" && player.schemaVersion == filter.Schema))
        toAdd = toAdd && (filter.Servicing == "" || (filter.Servicing != "" && player.capabilities && player.capabilities.servicing == filter.Servicing))

        var addFares = false;
        if (player.capabilities) {
            jgn(player.capabilities.typesOrFares).each(function (index, fare) {
                if (fare == filter.TypeOfFares) {
                    addFares = true;
                    return;
                }
            })
        }
        toAdd = toAdd && (filter.TypeOfFares == "" || (filter.TypeOfFares != "" && addFares))

        var addsTypes = false;
        jgn(player.sellerType).each(function (index, fare) {
            if (fare == filter.SellerType) {
                addsTypes = true;
                return;
            }
        })
        toAdd = toAdd && (filter.SellerType == "" || (filter.SellerType != "" && addsTypes))

        var addSchema = false;
        jgn(player.schemaVersion).each(function (index, schemaV) {
            if (schemaV == filter.Schema) {
                addSchema = true;
                return;
            }
        })
        toAdd = toAdd && (filter.Schema == "" || (filter.Schema != "" && addSchema))

        var addFop = false;
        if (player.capabilities) {
            jgn(player.capabilities.paymentForms).each(function (index, pForm) {
                if (pForm == filter.FOPAccepted) {
                    addFop = true;
                    return;
                }
            })
        }
        toAdd = toAdd && (filter.FOPAccepted == "" || (filter.FOPAccepted != "" && addFop))

        if (!filter.IgnoreCheckboxes) {
            toAdd = toAdd && (filter.AirlineProfile == null || (player.capabilities && player.capabilities.airlineProfile === filter.AirlineProfile))
            toAdd = toAdd && (filter.RichContent == null || (player.capabilities && player.capabilities.richContent === filter.RichContent))
            toAdd = toAdd && (filter.Personalisation == null || (player.capabilities && player.capabilities.personalization === filter.Personalisation))
            //toAdd = toAdd && (filter.IncentivesForTA == null || (player.capabilities && player.capabilities.publicIncentiveSchemesForSellers === filter.IncentivesForTA))
        }

        if (toAdd && filter.Product != "") {
            toAdd = false;
            jgn(player.products).each(function (index, pr) {
                if (pr.name == filter.Product) {
                    toAdd = true;
                    return;
                }
            })
        }

        if (toAdd) {
            players.push(player);
        }
    });

    var cTemplate = jgn("#NDCResultTemplate").html();
    window.resultItemTemplate = cTemplate;

    if (players.length == 0) {
        jgn("#ndc-player-box-content-search-result-none").show();
        jgn("#ndc-contact-export-excel").hide();
    }
    else {
        players.sort(function (a, b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
        
        window.searchResults = players;
        jgn(players).each(function (index, player) {

            if (isAddedToComparison(player.id)) {
                jgn("#ndc-connectedPlayer-comparison-" + player.id).addClass("ndc-disabled-button");
            }

            var connTemplate = cTemplate.replaceAll("{TITLE}", player.name);
            connTemplate = connTemplate.replaceAll("{TYPE}", player.type);
            connTemplate = connTemplate.replaceAll("{LOCATION}", player.region + " - " + player.country);
            connTemplate = connTemplate.replaceAll("{ID}", player.id);

            var typeImageUrl = "/_layouts/15/iata/ndc/images/";
            switch (player.type) {
                case "Airline":
                default:
                    typeImageUrl += "airlines-b.png";
                    break;
                case "Seller":
                    typeImageUrl += "seller-b.png";
                    break;
                case "Aggregator":
                    typeImageUrl += "aggregators-b.png";
                    break;
            }

            connTemplate = connTemplate.replaceAll("{PLAYER_ID}", player.id);
            connTemplate = connTemplate.replaceAll("{SRC}", typeImageUrl);

            jgn("#ndc-player-box-content-search-result").append(jgn(connTemplate));

            jgn("#ndc-connectedPlayer-contact-" + player.id).on("click", function () {
                openContact(player.id, player.name);
            });
            jgn("#ndc-contact-export-excel").show();
        });
    }
    jgn("#ndc-player-box-content-search-result").show();
    jgn("#ndc-player-box-search-result").show();
}

function stringToCSVCell(str) 
{
	var mustQuote = (str.includes(",") || str.includes("\"") || str.includes("\r") || str.includes("\n") );
	
	if (mustQuote) 
	{
		var sb = "\"";
		
		for (i = 0; i < str.length; i++) 
        {
            sb += str[i];
            if (str[i] == '"') sb += "\"";
        }
		
		sb += "\"";
		
		return sb.toString();
	}

	return str;
}

function exportSearchResultsToExcel() {

    //var players = "data:text/csv;charset=utf-8,Name,Type,Location\n";
    var players = "Name,Type,Region,Country\n";

    jgn(window.searchResults).each(function (index, player)
	{
		players += stringToCSVCell(player.name) + "," + stringToCSVCell(player.type) + "," + stringToCSVCell(player.region) + "," + stringToCSVCell(player.country) + "\n";
    });

    //var encodedUri = encodeURI(players);
    //var link = document.createElement("a");
    //link.setAttribute("href", encodedUri);
    //link.setAttribute("download", "search_results.csv");
    //link.style.visibility = 'hidden';
    //document.body.appendChild(link);
    //link.click();
    //document.body.removeChild(link);


    var blob = new Blob([players], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, "search_results.csv")
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "search_results.csv");
            link.style = "visibility:hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}