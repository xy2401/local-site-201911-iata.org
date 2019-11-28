jgn(function(){jgn(document).keypress(function(event){if(event.which=='13'){event.preventDefault();}});var comparitionItem="<li><a href='javascript:goToComparitionPage();'><div style='margin-right:5px;' class='icon'><img style='margin-top:2px; margin-left:9px' src='/_layouts/15/iata/ndc/images/Comparison.png' height='28' width='28'></div><div id='ndc-comparition-count'></div><div style='display:inline-block; margin:10px'>Comparison list</div></a></li>"
jgn(".topLinks").prepend(comparitionItem);setComparitionCountValue();});String.prototype.replaceAll=function(search,replacement){var target=this;return target.split(search).join(replacement);};function goToPlayer(id){window.open("matchmaker-profile.aspx?playerid="+id,"_self");}
function setComparitionCountValue(){try{var items=JSON.parse(localStorage.getItem('NDCComparitionBascket'))||[];if(items.length>0)
jgn("#ndc-comparition-count").html(items.length);else
jgn("#ndc-comparition-count").html("");}catch(e){}}
function addToComparitionBasket(id){try{if(id==-1)
id=getQueryString("playerid");var oldItems=JSON.parse(localStorage.getItem('NDCComparitionBascket'))||[];if(oldItems.length>=10){alert('There are already 10 items added to the comparison basket. Please remove some before adding others.');}
else{var itemExist=false;jgn(oldItems).each(function(index,item){if(item==id){itemExist=true;return;}});if(!itemExist){oldItems.push(id);localStorage.setItem('NDCComparitionBascket',JSON.stringify(oldItems));setComparitionCountValue();alert('The item was successfuly added to the comparison page.')}
else{alert('The item is already added to the comparison page.')}}}catch(e){}}
function removeFromComparition(id){try{var oldItems=JSON.parse(localStorage.getItem('NDCComparitionBascket'))||[];var newItmes=[];jgn(oldItems).each(function(index,item){if(item!=id){newItmes.push(item)}});localStorage.setItem('NDCComparitionBascket',JSON.stringify(newItmes));jgn(".ndc_player_"+id).remove();setComparitionCountValue();}catch(e){}
goToComparitionPage();}
function clearComparison(){try{var newItmes=[];localStorage.setItem('NDCComparitionBascket',JSON.stringify(newItmes));jgn(".ndc_comparison_all_players").remove();jgn(".ndc-comparition-with-items").hide();jgn(".ndc-comparition-with-no-items").show();setComparitionCountValue();}catch(e){}
goToComparitionPage();}
function isAddedToComparison(id){try{var oldItems=JSON.parse(localStorage.getItem('NDCComparitionBascket'))||[];var added=false;jgn(oldItems).each(function(index,item){if(item==id){added=true;}});return added;}catch(e){return false}}
function goToComparitionPage(){try{var items=JSON.parse(localStorage.getItem('NDCComparitionBascket'))||[];if(items.length==0){alert("There are no profiles added to the comparison basket.");}
else{var param="";jgn(items).each(function(index,item){param+=item+"|";});window.open("matchmaker-comparison.aspx?playerids="+param,"_self");}}catch(e){}}
function getQueryString(queryString){var params=document.URL.split("?")[1].split("&");for(var i=0;i<params.length;i++){var query=params[i].split("=");var req=query[0];var result=query[1];if(req==queryString)
return result;}}
function expandContent(box){var image=jgn(box).children(".imageWrapper").children()[0];if(jgn(image).hasClass("ndc-player-box-image-down")){jgn(image).removeClass("ndc-player-box-image-down");jgn(box).next(".ndc-player-box-content").hide();}
else{jgn(image).addClass("ndc-player-box-image-down");jgn(box).next(".ndc-player-box-content").show();}}