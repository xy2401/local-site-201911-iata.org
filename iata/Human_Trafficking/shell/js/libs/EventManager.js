var EventManager = function(){
	//trace(":: Event Manager Loaded ::");
	
	this.dispatchCustomEvent = function(controlName, eventName, isBubbling, dataObj){
		//trace("***** Event Dispatched *****");
		$(eval(controlName)).trigger(
				{
					type:eventName,
					obj:dataObj
				}, isBubbling);
	}
	
	this.addControlEventListener = function(controlName, eventName, callBackFn){
		//trace("***** Event Added *****");
		//trace(controlName + " : " + eventName);
		
		$(controlName).bind(eventName, callBackFn);		
	}
	
	this.removeControlEventListener = function(controlName, eventName, callBackFn){
		//trace("***** Event Removed *****");
		$(controlName).unbind(eventName, callBackFn);
	}
}