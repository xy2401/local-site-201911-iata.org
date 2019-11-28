jgn(function () {
    jgn("div[id$='pnlRHCRelatedLinksTitle']").remove();
    jgn("div[id$='RichHtmlFieldIATAHighlightInformation__ControlWrapper_RichHtmlField']").remove();

    jgn("#ndc-latest-tabs-latest").tabs({
        classes: {
            "ui-tabs-tab": "ndc-latest-tabs-tab-latest",
        }
    });

    var latestProfileTemplate = jgn("#NDCLatestProfileTemplate").html();
    var latestProductTemplate = jgn("#NDCLatestProductTemplate").html();

    jgn.each(NDCLatestProducts, function (index, product) {
        var lpTemplate = latestProductTemplate.replaceAll("{PLAYER_TITLE}", product.airlineName);

        lpTemplate = lpTemplate.replaceAll("{PLAYER_ID}", product.airlineId);

        lpTemplate = lpTemplate.replaceAll("{TITLE}", product.productName);
        lpTemplate = lpTemplate.replaceAll("{SRC}", "/_layouts/15/iata/ndc/images/products/" + product.productName.replaceAll(" ", "") + ".png");
        lpTemplate = lpTemplate.replaceAll("{DATE}", product.createdDate);
        jgn("#ndc-tab-latest-products").append(jgn(lpTemplate));
    });

    if (NDCLatestConnections) {
        var latestConnectionTemplate = jgn("#NDCLatestConnectionTemplate").html();

        jgn.each(NDCLatestConnections, function (index, connection) {
            var lpTemplate = latestConnectionTemplate.replaceAll("{PLAYER_TITLE}", connection.playerName);

            var typeImageUrl = "/_layouts/15/iata/ndc/images/";
            switch (connection.playerType) {
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

            lpTemplate = lpTemplate.replaceAll("{PLAYER_SRC}", typeImageUrl);
            lpTemplate = lpTemplate.replaceAll("{PLAYER_ID}", connection.playerId);
            lpTemplate = lpTemplate.replaceAll("{C_PLAYER_TITLE}", connection.connectedPlayerName);

            var cTypeImageUrl = "/_layouts/15/iata/ndc/images/";
            switch (connection.connectedPlayerType) {
                case "Airline":
                default:
                    cTypeImageUrl += "airlines-b.png";
                    break;
                case "Seller":
                    cTypeImageUrl += "seller-b.png";
                    break;
                case "Aggregator":
                    cTypeImageUrl += "aggregators-b.png";
                    break;
            }

            lpTemplate = lpTemplate.replaceAll("{C_PLAYER_SRC}", cTypeImageUrl);
            lpTemplate = lpTemplate.replaceAll("{C_PLAYER_ID}", connection.connectedPlayerId);
            lpTemplate = lpTemplate.replaceAll("{DATE}", connection.createdDate);
            jgn("#ndc-tab-latest-connections").append(jgn(lpTemplate));
        });
    }

    if (NDCLatestProfiles) {
        jgn.each(NDCLatestProfiles, function (index, profile) {
            var lpTemplate = latestProfileTemplate.replaceAll("{TITLE}", profile.name);

            var typeImageUrl = "/_layouts/15/iata/ndc/images/";
            switch (profile.type) {
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

            lpTemplate = lpTemplate.replaceAll("{SRC}", typeImageUrl);
            lpTemplate = lpTemplate.replaceAll("{PLAYER_ID}", profile.id);
            lpTemplate = lpTemplate.replaceAll("{DATE}", profile.lastUpdated);
            jgn("#ndc-tab-latest-profiles").append(jgn(lpTemplate));
        });
    }
});