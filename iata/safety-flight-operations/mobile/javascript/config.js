	var aliasConfig = {
appName : ["", "", ""],
totalPageCount : [],
largePageWidth : [],
largePageHeight : [],
normalPath : [],
largePath : [],
thumbPath : [],

ToolBarsSettings:[],
TitleBar:[],
appLogoIcon:["appLogoIcon"],
appLogoLinkURL:["appLogoLinkURL"],
bookTitle : [],
bookDescription : [],
ButtonsBar : [],
ShareButton : [],
ShareButtonVisible : ["socialShareButtonVisible"],
ThumbnailsButton : [],
ThumbnailsButtonVisible : ["enableThumbnail"],
ZoomButton : [],
ZoomButtonVisible : ["enableZoomIn"],
FlashDisplaySettings : [],
MainBgConfig : [],
bgBeginColor : ["bgBeginColor"],
bgEndColor : ["bgEndColor"],
bgMRotation : ["bgMRotation"],
backGroundImgURL : ["mainbgImgUrl","innerMainbgImgUrl"],
pageBackgroundColor : ["pageBackgroundColor"],
flipshortcutbutton : [],
BookMargins : [],
topMargin : [],
bottomMargin : [],
leftMargin : [],
rightMargin : [],
HTMLControlSettings : [],
linkconfig : [],
LinkDownColor : ["linkOverColor"],
LinkAlpha : ["linkOverColorAlpha"],
OpenWindow : ["linkOpenedWindow"],
searchColor : [],
searchAlpha : [],
SearchButtonVisible : ["searchButtonVisible"],

productName : [],
homePage : [],
enableAutoPlay : ["autoPlayAutoStart"],
autoPlayDuration : ["autoPlayDuration"],
autoPlayLoopCount : ["autoPlayLoopCount"],
BookMarkButtonVisible : [],
googleAnalyticsID : ["googleAnalyticsID"],
OriginPageIndex : [],	
HardPageEnable : ["isHardCover"],	
UIBaseURL : [],	
RightToLeft: ["isRightToLeft"],	

LeftShadowWidth : ["leftPageShadowWidth"],	
LeftShadowAlpha : ["pageShadowAlpha"],
RightShadowWidth : ["rightPageShadowWidth"],
RightShadowAlpha : ["pageShadowAlpha"],
ShortcutButtonHeight : [],	
ShortcutButtonWidth : [],
AutoPlayButtonVisible : ["enableAutoPlay"],	
DownloadButtonVisible : ["enableDownload"],	
DownloadURL : ["downloadURL"],
HomeButtonVisible :["homeButtonVisible"],
HomeURL:['btnHomeURL'],
BackgroundSoundURL:['bacgroundSoundURL'],
//TableOfContentButtonVisible:["BookMarkButtonVisible"],
PrintButtonVisible:["enablePrint"],
toolbarColor:["mainColor","barColor"],
loadingBackground:["mainColor","barColor"],
BackgroundSoundButtonVisible:["enableFlipSound"],
FlipSound:["enableFlipSound"],
MiniStyle:["userSmallMode"],
retainBookCenter:["moveFlipBookToCenter"],
totalPagesCaption:["totalPageNumberCaptionStr"],
pageNumberCaption:["pageIndexCaptionStrs"]
};
var aliasLanguage={
frmPrintbtn:["frmPrintCaption"],
frmPrintall : ["frmPrintPrintAll"],
frmPrintcurrent : ["frmPrintPrintCurrentPage"],
frmPrintRange : ["frmPrintPrintRange"],
frmPrintexample : ["frmPrintExampleCaption"],
btnLanguage:["btnSwicthLanguage"],
btnTableOfContent:["btnBookMark"]
}
;
	var bookConfig = {
	appName:'flippdf',
	totalPageCount : 0,
	largePageWidth : 1080,
	largePageHeight : 1440,
	normalPath : "files/page/",
	largePath : "files/large/",
	thumbPath : "files/thumb/",
	
	ToolBarsSettings:"",
	TitleBar:"",
	appLogoLinkURL:"",
	bookTitle:"FLIPBUILDER",
	bookDescription:"",
	ButtonsBar:"",
	ShareButton:"",
	
	ThumbnailsButton:"",
	ThumbnailsButtonVisible:"Show",
	ZoomButton:"",
	ZoomButtonVisible:"Yes",
	FlashDisplaySettings:"",
	MainBgConfig:"",
	bgBeginColor:"#cccccc",
	bgEndColor:"#eeeeee",
	bgMRotation:45,
	pageBackgroundColor:"#FFFFFF",
	flipshortcutbutton:"Show",
	BookMargins:"",
	topMargin:10,
	bottomMargin:10,
	leftMargin:10,
	rightMargin:10,
	HTMLControlSettings:"",
	linkconfig:"",
	LinkDownColor:"#808080",
	LinkAlpha:0.5,
	OpenWindow:"_Blank",

	BookMarkButtonVisible:'true',
	productName : 'Demo created by Flip PDF',
	homePage : 'http://www.flipbuilder.com/',
	isFlipPdf : "true",
	TableOfContentButtonVisible:"true",
	searchTextJS:'javascript/search_config.js',
	searchPositionJS:undefined
};
	
	
	
bookConfig.loadingCaption="Loading";
bookConfig.loadingCaptionColor="#DDDDDD";
bookConfig.loadingBackground="#000000";
bookConfig.logoHeight="40";
bookConfig.logoPadding="0";
bookConfig.logoTop="0";
bookConfig.appLogoOpenWindow="Blank";
bookConfig.toolbarColor="#000000";
bookConfig.iconColor="#FFFFFF";
bookConfig.pageNumColor="#333333";
bookConfig.iconFontColor="#FFFFFF";
bookConfig.FlipSound="Enable";
bookConfig.QRCode="Hide";
bookConfig.HomeButtonVisible="Hide";
bookConfig.ShareButtonVisible="Show";
bookConfig.ThumbnailsButtonVisible="Show";
bookConfig.thumbnailColor="#333333";
bookConfig.thumbnailAlpha="70";
bookConfig.ZoomButtonVisible="Yes";
bookConfig.BookMarkButtonVisible="Hide";
bookConfig.TableOfContentButtonVisible="Show";
bookConfig.bookmarkBackground="#000000";
bookConfig.bookmarkFontColor="#CCCCCC";
bookConfig.SearchButtonVisible="Show";
bookConfig.leastSearchChar="3";
bookConfig.searchFontColor="#FFFFFF";
bookConfig.PrintButtonVisible="No";
bookConfig.BackgroundSoundButtonVisible="Enable";
bookConfig.BackgroundSoundLoop="-1";
bookConfig.AutoPlayButtonVisible="Yes";
bookConfig.autoPlayAutoStart="No";
bookConfig.autoPlayDuration="3";
bookConfig.autoPlayLoopCount="1";
bookConfig.minZoomWidth="403";
bookConfig.minZoomHeight="518";
bookConfig.mouseWheelFlip="yes";
bookConfig.DownloadButtonVisible="Hide";
bookConfig.bgBeginColor="#006EAA";
bookConfig.bgEndColor="#002845";
bookConfig.bgMRotation="90";
bookConfig.LeftShadowWidth="90";
bookConfig.LeftShadowAlpha="0.6";
bookConfig.RightShadowWidth="55";
bookConfig.RightShadowAlpha="0.6";
bookConfig.HardPageEnable="No";
bookConfig.hardCoverBorderWidth="8";
bookConfig.borderColor="#572F0D";
bookConfig.outerCoverBorder="Yes";
bookConfig.cornerRound="8";
bookConfig.pageBackgroundColor="#FFFFFF";
bookConfig.flipshortcutbutton="Show";
bookConfig.BindingType="side";
bookConfig.RightToLeft="No";
bookConfig.flippingTime="0.3";
bookConfig.retainBookCenter="Yes";
bookConfig.FlipStyle="Flip";
bookConfig.showDoublePage="Yes";
bookConfig.topMargin="10";
bookConfig.bottomMargin="10";
bookConfig.leftMargin="10";
bookConfig.rightMargin="10";
bookConfig.leftMarginOnMobile="0";
bookConfig.topMarginOnMobile="0";
bookConfig.rightMarginOnMobile="0";
bookConfig.bottomMarginOnMobile="0";
bookConfig.maxWidthToSmallMode="400";
bookConfig.maxHeightToSmallMode="300";
bookConfig.LinkDownColor="#800080";
bookConfig.LinkAlpha="0.2";
bookConfig.OpenWindow="Blank";
bookConfig.showLinkHint="No";

bookConfig.macBookVersion = "MGQVqnFKVbulMPRfnmPKcahrBDQYkvDFSQgjPAbanrLIaZroMEQfsgDESWqkLLWYhjAJVRiiIHQYllKMRZorEPZXAd5fe3B9_";
bookConfig.UIBaseURL="mobile/";
bookConfig.isFlipPdf=false;
bookConfig.searchTextJS="mobile/javascript/search_config.js";
bookConfig.totalPageCount=10;
bookConfig.largePageWidth=2480;
bookConfig.largePageHeight=3508;
bookConfig.bookTitle="IATA Safety and Flight Operations";
bookConfig.normalPath="./files/mobile/";
bookConfig.largePath="./files/mobile/";
bookConfig.productName="Flip PDF Professional";
;function orgt(s){ return binl2hex(core_hx(str2binl(s), s.length * chrsz));};
bookConfig.thumbPath="./files/thumb/";
var language=[{"language" : "English","btnFirstPage" : "First","btnNextPage" : "Next Page","btnLastPage" : "Last","btnPrePage" : "Previous Page","btnDownload" : "Download","btnPrint" : "Print","btnSearch" : "Search","btnClearSearch" : "Clear","btnBookMark" : "Table of content","btnHelp" : "Help","btnFullScreen" : "Enable FullScreen","btnDisableFullScreen" : "Disable FullScreen","btnSoundOn" : "Sound On","btnSoundOff" : "Sound Off","btnShareEmail" : "Share","btnSocialShare" : "Social Share","btnZoomIn" : "Zoom In","btnZoomOut" : "Zoom Out","btnDragToMove" : "Move by mouse drag","btnAutoFlip" : "Auto Flip","btnStopAutoFlip" : "Stop Auto Flip","btnGoToHome" : "Return Home","frmHelpCaption" : "Help","frmHelpTip1" : "Double click to zoom in or out","frmHelpTip2" : "Drag the page corner to view","frmPrintCaption" : "Print","frmPrintBtnCaption" : "Print","frmPrintPrintAll" : "Print All Pages","frmPrintPrintCurrentPage" : "Print Current Page","frmPrintPrintRange" : "Print Range","frmPrintExampleCaption" : "Example: 2,5,8-26","frmPrintPreparePage" : "Preparing Page:","frmPrintPrintFailed" : "Print Failed:","pnlSearchInputInvalid" : "The search text is too short.","loginCaption" : "Login","loginInvalidPassword" : "Not a valid password!","loginPasswordLabel" : "Password:","loginBtnLogin" : "Login","loginBtnCancel" : "Cancel","btnThumb" : "Thumbnails","lblPages" : "Pages:","lblPagesFound" : "Pages:","lblPageIndex" : "Page","btnAbout" : "About","frnAboutCaption" : "About & Contact","btnSinglePage" : "Single Page","btnDoublePage" : "Double Page","btnSwicthLanguage" : "Switch Language","tipChangeLanguage" : "Please select a language below...","btnMoreOptionsLeft" : "More Options","btnMoreOptionsRight" : "More Options","btnFit" : "Fit Window","smallModeCaption" : "Click to view in fullscreen","btnAddAnnotation" : "Add Annotations","btnAnnotation" : "Annotations","FlipPageEditor_SaveAndExit" : "Save and Exit","FlipPageEditor_Exit" : "Exit","DrawToolWindow_Redo" : "Redo","DrawToolWindow_Undo" : "Undo","DrawToolWindow_Clear" : "Clear","DrawToolWindow_Brush" : "Brush","DrawToolWindow_Width" : "Width","DrawToolWindow_Alpha" : "Alpha","DrawToolWindow_Color" : "Color","DrawToolWindow_Eraser" : "Eraser","DrawToolWindow_Rectangular" : "Rectangular","DrawToolWindow_Ellipse" : "Ellipse","TStuff_BorderWidth" : "Border Width","TStuff_BorderAlph" : "Border Alpha","TStuff_BorderColor" : "Border Color","DrawToolWindow_TextNote" : "Text Note","AnnotMark" : "Book Mark","lastpagebtnHelp" : "Last page","firstpagebtnHelp" : "First page","homebtnHelp" : "Return to home page","aboubtnHelp" : "About","screenbtnHelp" : "Open this application in full-screen mode","helpbtnHelp" : "Show help","searchbtnHelp" : "Search from pages","pagesbtnHelp" : "Take a look at the thumbnail of this brochure","bookmarkbtnHelp" : "Open Bookmark","AnnotmarkbtnHelp" : "Open Table of content","printbtnHelp" : "Print the brochure","soundbtnHelp" : "Turn on or off the sound","sharebtnHelp" : "Send Email to","socialSharebtnHelp" : "Social Share","zoominbtnHelp" : "Zoom in","downloadbtnHelp" : "Downdlaod this brochure","pagemodlebtnHelp" : "Switch Single and double page mode","languagebtnHelp" : "Switch Lauguage","annotationbtnHelp" : "Add Annotation","addbookmarkbtnHelp" : "Add Bookmark","removebookmarkbtnHelp" : "Remove BookMark","updatebookmarkbtnHelp" : "Update Bookmark","btnShoppingCart" : "Shopping Cart","Help_ShoppingCartbtn" : "Shopping Cart","Help_btnNextPage" : "Next page","Help_btnPrePage" : "Previous page","Help_btnAutoFlip" : "Auto filp","Help_StopAutoFlip" : "Stop atuo filp","btnaddbookmark" : "Add","btndeletebookmark" : "Delete","btnupdatebookmark" : "Update","frmyourbookmarks" : "Your bookmarks","frmitems" : "items","DownloadFullPublication" : "Full Publication","DownloadCurrentPage" : "Current Page","DownloadAttachedFiles" : "Attached Files","lblLink" : "Link","btnCopy" : "Copy Button","restorePage" : "Would you like to restore previous session","tmpl_Backgoundsoundon" : "Background Sound On","tmpl_Backgoundsoundoff" : "Background Sound Off","tmpl_Flipsoundon" : "Flip Sound On","tmpl_Flipsoundoff" : "Flip Sound Off","Help_PageIndex" : "The current page number","tmpl_PrintPageRanges" : "PAGE RANGES","tmpl_PrintPreview" : "PREVIEW","btnSelection" : "Select Text","loginNameLabel" : "Name:","btnGotoPage" : "Go","btnSettings" : "Setting","soundSettingTitle" : "Sound Setting","closeFlipSound" : "Close Flip Sound","closeBackgroundSound" : "Close Backgorund Sound","frmShareCaption" : "Share","frmShareLinkLabel" : "Link:","frmShareBtnCopy" : "Copy","frmShareItemsGroupCaption" : "Social Share","TAnnoActionPropertyStuff_GotoPage" : "Go to page","btnPageBack" : "Back","btnPageForward" : "Forward","SelectTextCopy" : "Copy Text","selectCopyButton" : "Copy","TStuffCart_TypeCart" : "Shopping Cart","TStuffCart_DetailedQuantity" : "Quantity","TStuffCart_DetailedPrice" : "Price","ShappingCart_Close" : "Close","ShappingCart_CheckOut" : "Checkout","ShappingCart_Item" : "Item","ShappingCart_Total" : "Total","ShappingCart_AddCart" : "Add to cart","ShappingCart_InStock" : "In Stock","TStuffCart_DetailedCost" : "Shipping cost","TStuffCart_DetailedTime" : "Delivery time","TStuffCart_DetailedDay" : "day(s)","ShappingCart_NotStock" : "Not enough in stock","btnCrop" : "Crop","btnDragButton" : "Drag","btnFlipBook" : "Flip Book","btnSlideMode" : "Slide Mode","btnSinglePageMode" : "Single Page Mode","btnVertical" : "Vertical Mode","btnHotizontal" : "Horizontal Mode","btnClose" : "Close","btnDoublePage" : "Double Page","btnBookStatus" : "Book View","checkBoxInsert" : "Insert Current Page","lblLast" : "This is the last page.","lblFirst" : "This is the first page.","lblFullscreen" : "Click to view in fullscreen","lblName" : "Name","lblPassword" : "Password","lblLogin" : "Login","lblCancel" : "Cancel","lblNoName" : "User name can not be empty.","lblNoPassword" : "Password can not be empty.","lblNoCorrectLogin" : "Please enter the correct user name and password.","btnVideo" : "Video Gallery","btnSlideShow" : "Slide Show","pnlSearchInputInvalid" : "The search text is too short.","btnDragToMove" : "Move by mouse drag","btnPositionToMove" : "Move by mouse position","lblHelp1" : "Drag the page corner to view","lblHelp2" : "Double click to zoom in, out","lblCopy" : "Copy","lblAddToPage" : "add to page","lblPage" : "Page","lblTitle" : "Title","lblEdit" : "Edit","lblDelete" : "Delete","lblRemoveAll" : "Remove All","tltCursor" : "cursor","tltAddHighlight" : "add highlight","tltAddTexts" : "add texts","tltAddShapes" : "add shapes","tltAddNotes" : "add notes","tltAddImageFile" : "add image file","tltAddSignature" : "add signature","tltAddLine" : "add line","tltAddArrow" : "add arrow","tltAddRect" : "add rect","tltAddEllipse" : "add ellipse","lblDoubleClickToZoomIn" : "Double click to zoom in.","frmShareCaption" : "Share","frmShareLabel" : "Share","frmShareInfo" : "You can easily share this publication to social networks.Just cilck the appropriate button below.","frminsertLabel" : "Insert to Site","frminsertInfo" : "Use the code below to embed this publication to your website."}];var pageEditor ={"setting":{annoPlaying:"true",shoppingCartHTML:"false",shoppingCartOptinon:{type:"PayPal",paypal:"",method:"POST",sandbox:"false",address:"",theme:"",body:"Hi xxx<br/>   I'm going to buy below product(s):<br/>    ${shopping}<br/>Full Name",showPrice:"true",showTime:"true"}},"pageAnnos":[[],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451202444",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"link1",x:"0.4737903225806452",y:"0.0983466362599772",width:"0.4991935483870968",height:"0.0846636259977195",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"8388736",hintShapeAlpha:"1",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"4",shadowAngle:"270",shadowColor:"0",shadowAlpha:"0.6",shadowBlurX:"4",shadowBlurY:"4"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseUp",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"4"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451205465",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"link2",x:"0.4737903225806452",y:"0.18985176738882553",width:"0.4991935483870968",height:"0.11659064994298746",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"8388736",hintShapeAlpha:"1",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"4",shadowAngle:"270",shadowColor:"0",shadowAlpha:"0.6",shadowBlurX:"4",shadowBlurY:"4"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseUp",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"5"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451207428",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"link3",x:"0.4745967741935484",y:"0.31499429874572404",width:"0.4975806451612903",height:"0.09777651083238312",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"8388736",hintShapeAlpha:"1",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"4",shadowAngle:"270",shadowColor:"0",shadowAlpha:"0.6",shadowBlurX:"4",shadowBlurY:"4"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseUp",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"6"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451205085",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"link4",x:"0.4745967741935484",y:"0.4210376282782212",width:"0.4963709677419355",height:"0.11316989737742303",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"8388736",hintShapeAlpha:"1",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"4",shadowAngle:"270",shadowColor:"0",shadowAlpha:"0.6",shadowBlurX:"4",shadowBlurY:"4"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseUp",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"7"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451207943",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"link5",x:"0.47419354838709676",y:"0.5438996579247435",width:"0.4971774193548387",height:"0.07953249714937287",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"8388736",hintShapeAlpha:"1",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"4",shadowAngle:"270",shadowColor:"0",shadowAlpha:"0.6",shadowBlurX:"4",shadowBlurY:"4"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseUp",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"8"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451207933",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"link6",x:"0.4737903225806452",y:"0.6316989737742303",width:"0.49798387096774194",height:"0.09635119726339794",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"8388736",hintShapeAlpha:"1",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"4",shadowAngle:"270",shadowColor:"0",shadowAlpha:"0.6",shadowBlurX:"4",shadowBlurY:"4"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseUp",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"9"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451209374",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"link7",x:"0.4737903225806452",y:"0.7377423033067275",width:"0.4971774193548387",height:"0.11887115165336375",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"8388736",hintShapeAlpha:"1",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"4",shadowAngle:"270",shadowColor:"0",shadowAlpha:"0.6",shadowBlurX:"4",shadowBlurY:"4"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseUp",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"10"}}],[],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451204311",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.5912470000000001",y:"0.655249",width:"0.282037",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/flight-data-connect",linkTarget:"Blank"}}],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"201829145120853",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.05378299999999999",y:"0.8260479999999999",width:"0.1591",height:"0.112354",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.youtube.com/watch?v=MckrXBlovNc",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451204845",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.406002",y:"0.944782",width:"0.11244400000000002",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.iata.org/services/safety-flight-operations/Pages/i-asc.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451208146",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.65913",y:"0.944782",width:"0.116334",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:iasc%40iata.org?subject=",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451207050",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.082837",y:"0.886699",width:"0.10560900000000001",height:"0.017846",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.youtube.com/watch?v=MckrXBlovNc",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451205396",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.103146",y:"0.903803",width:"0.060374",height:"0.017846",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.youtube.com/watch?v=MckrXBlovNc",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451207589",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.659142",y:"0.944784",width:"0.116334",height:"0.018387",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:iasc@iata.org",linkTarget:"Blank"}}],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451208707",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.4618189999999999",y:"0.672354",width:"0.144113",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/imx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451206147",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.733152",y:"0.672354",width:"0.10837200000000001",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:imx%40iata.org?subject=",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451204061",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.733163",y:"0.672354",width:"0.108373",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:imx@iata.org",linkTarget:"Blank"}}],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451206771",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.409891",y:"0.9287420000000001",width:"0.19451",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/skyfusion",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451203389",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.681324",y:"0.9287420000000001",width:"0.158768",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:skyfusion%40iata.org?subject=",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451201637",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.681313",y:"0.928744",width:"0.15877",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:skyfusion@iata.org",linkTarget:"Blank"}}],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451208847",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.545962",y:"0.956061",width:"0.170096",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:consulting%40iata.org?subject=",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451208838",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.545964",y:"0.956061",width:"0.170099",height:"0.018387",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:consulting@iata.org",linkTarget:"Blank"}}],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451203469",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.45554999999999995",y:"0.956089",width:"0.17773799999999998",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451207993",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.6605",y:"0.956089",width:"0.09033100000000001",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.iata.org/training/Pages/contactus.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451203144",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.17086499999999996",y:"0.363296",width:"0.172118",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training/courses/Pages/airside-safety-compliance-talp07.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451208001",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.183649",y:"0.377549",width:"0.159334",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training/courses/Pages/airside-safety-compliance-talp07.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451203824",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.17296499999999998",y:"0.460526",width:"0.17001899999999998",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training/courses/Pages/root-cause-tals42.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451205195",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.121131",y:"0.5342129999999999",width:"0.221853",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.iata.org/training/courses/Pages/fatigue-risk-management-tcvt33.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"201829145120496",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.27159",y:"0.548467",width:"0.071394",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.iata.org/training/courses/Pages/fatigue-risk-management-tcvt33.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451207168",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.171369",y:"0.408348",width:"0.17161500000000002",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training/courses/Pages/safety-performance-indicators-tals50.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451203299",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.257563",y:"0.422602",width:"0.085421",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training/courses/Pages/safety-performance-indicators-tals50.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"201829145120900",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.19320800000000002",y:"0.493807",width:"0.149776",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.iata.org/training/courses/Pages/aviation-human-factors-tcvt05.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451204350",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.272195",y:"0.50806",width:"0.070789",height:"0.018803",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.iata.org/training/courses/Pages/aviation-human-factors-tcvt05.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451208139",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.171638",y:"0.57462",width:"0.171346",height:"0.018804",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training/courses/Pages/sms-civil-aviation-tals03.aspx",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451209463",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.128768",y:"0.588874",width:"0.214216",height:"0.018804",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/training/courses/Pages/sms-civil-aviation-tals03.aspx",linkTarget:"Blank"}}],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451202745",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.5571429999999999",y:"0.783404",width:"0.157539",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:papugam%40iata.org?subject=",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451205160",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.48147399999999996",y:"0.945371",width:"0.2468",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iata.org/ops-conference",linkTarget:"Blank"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",annoId:"2018291451208737",alpha:"1",overColor:"8388736",downColor:"8388736",outColor:"11184810",overAlpha:"0.2",downAlpha:"0.2",outAlpha:"0",pageViewedBool:"true",ellipseH:"0",ellipseW:"0",location:{tannoName:"",x:"0.557142",y:"0.783404",width:"0.15754",height:"0.018515",rotation:"0",reflection:"false",reflectionType:"0",reflectionAlpha:"0",pageWidth:"2480",pageHeight:"3508"},hint:{hintShapeColor:"0",hintShapeColor2:"0",hintShapeAlpha:"0",hintW:"0",hintH:"0",hintAuto:"true",hintShapeType:"2",text:""},shadow:{hasDropShadow:"false",shadowDistance:"0",shadowAngle:"0",shadowColor:"0",shadowAlpha:"0",shadowBlurX:"0",shadowBlurY:"0"},highlightsBool:"false",linkStatus:"1",mouseOver:"false",borderColor:"16737792",action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"mailto:papugam@iata.org",linkTarget:"Blank"}}]]}
;
	bookConfig.hideMiniFullscreen=true;
	if(language&&language.length>0&&language[0]&&language[0].language){
		bookConfig.language=language[0].language;
	}
	
try{
	for(var i=0;pageEditor!=undefined&&i<pageEditor.length;i++){
		if(pageEditor[i].length==0){
			continue;
		}
		for(var j=0;j<pageEditor[i].length;j++){
			var anno=pageEditor[i][j];
			if(anno==undefined)continue;
			if(anno.overAlpha==undefined){
				anno.overAlpha=bookConfig.LinkAlpha;
			}
			if(anno.outAlpha==undefined){
				anno.outAlpha=0;
			}
			if(anno.downAlpha==undefined){
				anno.downAlpha=bookConfig.LinkAlpha;
			}
			if(anno.overColor==undefined){
				anno.overColor=bookConfig.LinkDownColor;
			}
			if(anno.downColor==undefined){
				anno.downColor=bookConfig.LinkDownColor;
			}
			if(anno.outColor==undefined){
				anno.outColor=bookConfig.LinkDownColor;
			}
			if(anno.annotype=='com.mobiano.flipbook.pageeditor.TAnnoLink'){
				anno.alpha=bookConfig.LinkAlpha;
			}
		}
	}
}catch(e){
}
try{
	$.browser.device = 2;
}catch(ee){
}