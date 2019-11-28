/*
* @apply theme to the shell based on color configured in course config
*
*/

function applyColor() 
{
	$('.progress').css('background-color', globalColorCode);
	//$('.progress').css('opacity', '0.6');
	$('.Footer').css('background-color', globalColorCode);
	$('.page-no').css('color','#666666');
	$('.menu-item-arrow').css('color', globalColorCode);
	$('.courseTitle').css('color', globalColorCode);
	$('.pageTitle').css('color', globalColorCode);
	$('.transTitleBar').css('background-color', globalColorCode);
	$('.glossaryHeader').css('background-color', globalColorCode);
	$('.glossaryHeader').css('color', '#ffffff');
	$('#gadgetsButn span').css('background-color', globalColorCode);
	$('.exit li').css('background-color', globalColorCode);
	$('.exitPopupWrap:after').css('background', globalColorCode);
	$('.Glossary .alphbet_wraper li.active').css('background-color', globalColorCode);
	$('.Course_Exit').css('color', globalColorCode);
	$('.helpTxt').css('color', globalColorCode);
	$('.ShellMenuWrapper #list li.Active a').css('border-left-color', globalColorCode);
	$('.ShellMenuWrapper ol li.hasSubMenu > a').css('border-bottom-color', globalColorCode);
	$('.ShellMenuWrapper ol li a').css('border-bottom-color', globalColorCode);
	$('#instruct_next').css('background-color', globalColorCode);
	$('.ntrowrapp').css('background-color', globalColorCode);
	$('.resource_header').css('background-color', globalColorCode);
	$('#resource_close').css('background-color', globalColorCode);
	$('.Glossary .glossaryHeader').css('background-color', globalColorCode);
	$('#help_header').css('background-color', globalColorCode);
	$('.headerLeft .seperator').css('background-color', globalColorCode);
	$('.headerRight .seperator').css('background-color', globalColorCode);
	$('.transcriptButton').css('background-color', globalColorCode);
	$('.loader').css('border-top-color', globalColorCode);
	$('.ShellMenuWrapper #list li.Active a').css('border-left-color', globalColorCode);
	$('.component_button').css('background-color', globalColorCode);
	$('.component_radio .icon, .component_checkbox .icon').css('border-color', globalColorCode);
}
