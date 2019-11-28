AnimationSheet = function(options){

//data is wraped in to the options object
"use strict";
  var _this=this;
	_this.options={
		imagePath:"",
		frameSequence:[],
		timeSlice:1000,
		height:8,
		width:8,
		imgContentHeight:0,
		imgContentWidth:0
		};
// reference for the cached image of given path 
	        
	_this.image="";
	_this.loaded=false;
	_this.imageHeight=8;
	_this.imageWidth=8;
//init is used for intialising AnimationSheet	

	_this.init=function() {
//merging used send options with defualt values
        if(!(options.frameSequence instanceof  Array)){
        	if(typeof options.frameSequence == "number"){
        		var number=options.frameSequence;
        		options.frameSequence=[];
        		for(var i=0;i<number;i++)options.frameSequence[i]=i;
        	}
        }
		$.extend(_this.options,_this.options,options);
//caching image		
    
		_this.image = new Image();
		_this.image.onload=function(e){
			_this.loaded=true;
		
		if(_this.options.imgContentHeight === 0){
		_this.imageHeight= _this.image.height;	
		}else{
			_this.imageHeight= _this.options.imgContentHeight;	
		}
		if(_this.options.imgContentWidth === 0){
		_this.imageWidth=_this.image.width;	
		}else{
			
			_this.imageWidth=_this.options.imgContentWidth;	
			
		}
			
	        
		}
		_this.image.src=_this.options.imagePath; 
	 }
//calling init method
   _this.init();
  
   return _this;
};

/**
 * Animator component is used for animation  with sprites
 * 
 * @param {Object} options
 */
/*options{}
 * 
 * currentAnimation  - specifies the which animation will play on start (AnimationSheet object)
 * canvasMode - specifies to use canvas or div for animation (boolean)
 * preffedClassName- class name for animating div or canvas
 * parentDom- parent for animating element
 * height-height of the animation element
 * width-width of the animation element
 * resizable - element is resizable of not (boolean)
 * animSheet - array of AnimationSheet objects 
 * requestAnimation - spcifies weither to use requset animation frame or setTimeOut 
 * callbacks
 * onAnimationStart - fired when animation get started
 * onFrameChange - fired on every frame change
 * onAnimationEnd - fired on end of animation
 * onAnimationPause - fired on pause of animation
 * onAnimationResume- fired on resume of animation,
 * onSequnceAnimationComplete- fired on completion of sequenceal animations
 * 
 */

Animator =function(options){
//data is wraped in to the options object	
"use strict";
var _this=this;
	_this.options={
		currentAnimation : null,
		canvasMode:true,
		currentFrame:0,
		preffedClassName:"sprites",
		parentDom:null,
		height:8,
		width:8,
		resizable:false,
		scaleX:1,
	    scaleY:1,
		animSheet:[],
		requestAnimation:false,
		onCreate : function(){},
		onAnimationStart:function(currentAnim){},
		onFrameChange:function(currentFrame,currentAnim){},
		onAnimationEnd:function(currentAnim){},
		onAnimationPause:function(currentAnim){},
		onAnimationResume:function(currentAnim){},
		onSequnceAnimationComplete:function(){}	
	 };
	_this.$el="";
	_this.width="";
	_this.height="";
	_this.tile="";
	_this.canvasContext='';
	_this.temperarySequence=[];
	_this.intervalid=null;
	_this.createInterval=null;
	_this.clearInterval=null;
	_this.intervalId=0;
	_this.testvalue=0;
	_this.presentSequnce=null;
	_this.allowContinuousPlay=false;
	_this.sequnceCount=0;
	_this.LoopCount=1;
	_this.loadInterval=null;
	_this.forcePause=false;
	
	_this.init=function(){
//merging used send options with defualt values
	$.extend(_this.options,_this.options,options);
	
try{
	//checking for parent
	_this.options.parentDom=$(_this.options.parentDom);
	if(!_this.options.parentDom) throw new AnimatorCustomExceptions.domNotFound()
	//checking for canvas suuprt
     var elem = document.createElement('canvas');
    if(!(elem.getContext && elem.getContext('2d')))_this.options.canvasMode=false;
    //checking atleast one animsheet specified or not if not throw exception
   if(_this.options.animSheet.length==0) throw new AnimatorCustomExceptions.noSequenceFound();
   //if no animation is specified  by defualt first animsheet in animsheet is set
    _this.loadInterval= setInterval(function(){
    	for(var i=0 ;i < _this.options.animSheet.length ; i++){
    		if(!_this.options.animSheet[i].loaded){
    			return false;
    		}
    	}
    	   _this.draw(0,0);
    	_this.loadInterval=clearInterval(_this.loadInterval);
     	_this.options.onCreate();
     },50);
   
    if(!_this.options.currentAnimation)_this.options.currentAnimation=_this.options.animSheet[0]; 
    _this.width= _this.options.currentAnimation.options.width;
	_this.height=_this.options.currentAnimation.options.height;
    
    //this.createInterval=(this.options.requestAnimation) ? window.requestAnimationFrame : window.setInterval;
   // this.clearInterval=(this.options.requestAnimation) ? window.cancelAnimationFrame : window.clearInterval;
    
	_this.createChild(_this.options.parentDom);
	_this.options.resizable && _this.resizeElement();
 
 // this.reverseAnimation();
    }catch(e){
    	//custom exceptions
    	if(e instanceof AnimatorCustomExceptions.noSequenceFound)
    	e.showMessage(_this.options.parentDom);
    	else if(e instanceof AnimatorCustomExceptions.domNotFound)
    	e.showMessage();
    	else  (new AnimatorCustomExceptions.commonException).showMessage(e);
    	
    	
    	
    }
    
    
  };
  
  
  // adding app resize event to element to make change in animating element
  _this.resizeElement=function(){
  	_this.$el.bind("app:resize",function(e){
  		
  		_this.adjustElement();
  	
  	});
  	_this.adjustElement();
  	
  };
  
  
  
  //function to scale element 
  _this.adjustElement=function(){
  	var width=_this.options.parentDom.width();
  		var height=_this.options.parentDom.height();
  		_this.options.scaleX=width/_this.width;
  		_this.options.scaleY=height/_this.height;
  	
   if(!_this.options.canvasMode && _this.options.resizable){  
     _this.$el.css({"transform": "scale("+_this.options.scaleX+","+_this.options.scaleY+")",
  "-webkit-transform": "scale("+_this.options.scaleX+","+_this.options.scaleY+")",
  "-moz-transform": "scale("+_this.options.scaleX+","+_this.options.scaleY+")",
  "-o-transform": "scale("+_this.options.scaleX+","+_this.options.scaleY+")",
   "-ms-transform": "scale("+_this.options.scaleX+","+_this.options.scaleY+")"
 
  });
  
  
  
  } else{  	var element=_this.$el[0];
	      	element.width=_this.width*_this.options.scaleX;
	      	element.height=_this.height*_this.options.scaleY; 
	}

};



// function to looping through the animation 
    _this._iterate=function(){
    	if(_this.options.requestAnimation){
     _this.intervalId=window.requestAnimationFrame(_this._iterate);
     }else{
     	 _this.intervalId=window.setTimeout(function(){
     	 _this._iterate();	
     	 },_this.options.currentAnimation.options.timeSlice);
     }
    _this.calculateNextTile();
    };
    
    
 // function to calculating next tile in the sequence
   _this.calculateNextTile=function(){
   	if(_this.temperarySequence.length > _this.tile){
   	var currentTile=_this.temperarySequence[_this.tile],
    	measureobject=_this.calculateLeftTop(currentTile);
_this.options.currentFrame=currentTile;
   	// top=
   	_this.draw(measureobject.x,measureobject.y);
   	_this.tile++;
   	}else{
   		_this.stop(true);
           _this.options.onAnimationEnd(_this.options.currentAnimation);
   		_this.tile=0;
   		//	this.tile=0;
   	if(_this.allowContinuousPlay){
         _this.playBackNextAnimation();
         }
        
   	}
   	
   };
   
   
   
 // function to calculating top and left of the image to display
   _this.calculateLeftTop=function(currentTile){
   	 	
   	 var left=(currentTile*_this.width)% _this.options.currentAnimation.imageWidth;
   	var  top=Math.floor((currentTile*_this.width) / _this.options.currentAnimation.imageWidth)*_this.height;
   	return {"x":left,"y":top}
   	 
   };
   
   
  // function to stop animation 
   _this.stop=function(flag){
   	if(_this.intervalId){
   			_this.intervalId=(_this.options.requestAnimation) ? window.cancelAnimationFrame(_this.intervalId)  : window.clearTimeout(_this.intervalId);
       _this.tile=0;

         if( ! flag){
      _this.presentSequnce=null;
	  _this.allowContinuousPlay=false;
	  _this.sequnceCount=0;
         }
        }
   };
   
   //function to create animating element it will create canvas or div depend on canvasMode
   
    _this.createChild=function(element){
    	
		_this.$el=(_this.options.canvasMode)?$("<canvas style='position:relative;top:0px;left:0px' class="+_this.options.preffedClassName+" width="+_this.width+" height="+_this.height+"></canvas>"): $("<div style='position:relative;top:0px;left:0px;width:"+_this.width+"px;height:"+_this.height+"px;background-image:url("+_this.options.currentAnimation.options.imagePath+"); background-position: 0px 0px;' class="+_this.options.preffedClassName+"></div>");
		element.append(_this.$el);
		(_this.options.canvasMode ) && (_this.canvasContext=_this.$el.get(0).getContext('2d'));
		if ($.browser.webkit) {
			(_this.options.canvasMode ) && (_this.canvasContext.webkitImageSmoothingEnabled = false);
            (_this.options.canvasMode ) &&  (_this.canvasContext.imageSmoothingEnabled = false);
		}
	
	};
	
	// function to start animation
	
	_this.start=function(customsequence){
		try{
		 if( customsequence ){
		for(var i=0;i<customsequence.length;i++){
			if(_this.options.currentAnimation.options.frameSequence.toString().indexOf(customsequence[i]) == -1 ) 
			throw new AnimatorCustomExceptions.noSequenceFound();
			}
		_this.temperarySequence=customsequence;
		}else{
		_this.temperarySequence=_this.options.currentAnimation.options.frameSequence;
		}
		
		if(_this.intervalId && !_this.allowContinuousPlay){
			_this.stop();
		}
		
		_this.tile=0;
		_this.forcePause=false;
		_this.options.onAnimationStart(_this.options.currentAnimation);
		if(!_this.options.canvasMode){
		_this.$el.css("background-image",'url('+_this.options.currentAnimation.options.imagePath+')');
		
		}
		 _this.width= _this.options.currentAnimation.options.width;
	      _this.height=_this.options.currentAnimation.options.height;
        _this.changeDimensions();
		 _this._iterate();
		}catch(e){
			if(e instanceof AnimatorCustomExceptions.noSequenceFound)
    	    e.showMessage(_this.options.parentDom);
		}	
	};
	
	// function to play back to back animations 
	
	_this.playBacktoBackAnimation=function(animArray,count){
	_this.presentSequnce=animArray;
	_this.allowContinuousPlay=true;
	_this.sequnceCount=0;
	_this.options.currentAnimation=_this.options.animSheet[animArray[_this.sequnceCount]];
	_this.sequnceCount=1;
	_this.start();
	};
	
	// function to pick next animation from the sequence
	_this.playBackNextAnimation=function(){
	if(_this.sequnceCount<_this.presentSequnce.length){
	_this.options.currentAnimation=_this.options.animSheet[_this.presentSequnce[_this.sequnceCount]];
	_this.sequnceCount++;	
	_this.start();
	}else{
		_this.presentSequnce=null;
	_this.allowContinuousPlay=false;
	_this.sequnceCount=0;
	_this.options.onSequnceAnimationComplete();
	}
	};
	
	// function to resume animation
	_this.resume=function(){
		if( ! _this.intervalId){
		 _this._iterate();
		_this.options.onAnimationResume(_this.options.currentAnimation);
		}
	};
	
	// function to pause animation
	_this.pause=function(){
		if(_this.intervalId){
	_this.intervalId=(_this.options.requestAnimation) ? window.cancelAnimationFrame(_this.intervalId)  : window.clearTimeout(_this.intervalId);
        _this.options.onAnimationPause(_this.options.currentAnimation);
        }
	};
	
	// function to move to particular frame in sequence
	_this.goTo=function(frameNumber){
		 _this.stop();
		var sequenceLength=_this.options.currentAnimation.options.frameSequence.length;
		for(var i=0;i<sequenceLength;i++){
			if(_this.options.currentAnimation.options.frameSequence[i] ==frameNumber){
		 var measureobject=_this.calculateLeftTop(frameNumber);
		 _this.options.currentFrame=frameNumber;
     	 _this.draw(measureobject.x,measureobject.y);
     	 _this.tile=i;
     	 return true;
      }
     }
     return false;
	};
	
	// function to reset sequence of current animation
	_this.changeSequence=function(sequence){
		_this.options.currentAnimation.options.frameSequence=sequence;
	};
	
	// function to move to particular frame in sequence and animate sequences later.
    _this.goToAndPlay=function(frameNumberArray,sequence){
        if(_this.goTo(frameNumberArray)){
            
            if($.isArray(frameNumberArray)) {
            _this.temperarySequence=frameNumberArray;
            }else{
            var index = _this.options.currentAnimation.options.frameSequence.indexOf(frameNumberArray);
            if(index != -1){
              _this.temperarySequence= _this.options.currentAnimation.options.frameSequence;
            }else{
                _this.temperarySequence=frameNumberArray;
            }
        
            }
             _this._iterate();
        }
        if(sequence){
        _this.presentSequnce=sequence;
       _this.allowContinuousPlay=true;
       _this.sequnceCount=0;
        }
    
    };
	
	 // function to animate  frame in  reverse sequence
	_this.reverseAnimation=function(){
		var arrayLength=_this.options.currentAnimation.options.frameSequence.length;
		for(var i=0;i<arrayLength;i++)
		_this.temperarySequence[arrayLength-1-i]=_this.options.currentAnimation.options.frameSequence[i];
		_this.tile=0;
		 _this._iterate();
		
	};
	
	// function for adding  new AnimationSheet object
	_this.addNewAnimationSheet=function(animobject){
		if(animobject instanceof AnimationSheet){
			var add=true;
			for(var i=0;i<_this.options.animSheet.length;i++){
				if(_this.options.animSheet[0] === animobject)add=false;
			}
			_this.options.animSheet.push(animobject);
		}
	};
	
	// function for setting current animation sheet for sequencing
	
	_this.setCurrentAnim=function(objectPos){
		try{
		if( objectPos >=0 && objectPos<_this.options.animSheet.length ){
			_this.options.currentAnimation=_this.options.animSheet[objectPos];
			if(!_this.options.canvasMode){
          _this.$el.css("background-image",'url('+_this.options.currentAnimation.options.imagePath+')'); 
         }
          _this.goTo(0);
		}else{
			throw new AnimatorCustomExceptions.domNotFound();
		}
		}catch(e){
			if(e instanceof AnimatorCustomExceptions.domNotFound)
    	    e.showMessage();
		}	
		
	};
	
	// function for get current animation sheet 
	_this.getCurrnetAnim=function(){
		return _this.options.currentAnimation;
	};
	
	// function for get current frame of current animation sheet
	_this.getCurrentFrame=function(){
		return _this.temperarySequence[_this.tile];
	};
	
	// changing the width and height of animating elment according to animation sheet height and width
	_this.changeDimensions=function(){
		 _this.width= _this.options.currentAnimation.options.width ;
	      _this.height=_this.options.currentAnimation.options.height;
	    if(!_this.options.canvasMode){  
   _this.$el.width(_this.width);
   _this.$el.height(_this.height);
   }
	      _this.adjustElement();
	     /* if(!_this.options.canvasMode){  }else{
	      	var element=_this.$el[0];
	      	element.width=_this.width*_this.options.scaleX;
	      	element.height=_this.height*_this.options.scaleY; 
	      	}*/
	};
	
	// function for drawing image on canvas or changing background position of the div
	_this.draw=function(startposx,startposy){
		
	if(_this.options.canvasMode){
		_this.canvasContext.clearRect(0,0,_this.width*_this.options.scaleX,_this.height*_this.options.scaleY);
		//_this.canvasContext.scale(_this.options.scaleX,_this.options.scaleY);
		_this.canvasContext.drawImage(_this.options.currentAnimation.image,startposx,startposy, _this.options.currentAnimation.options.width, _this.options.currentAnimation.options.height, 0, 0, _this.width*_this.options.scaleX, _this.height *_this.options.scaleY);
		//_this.canvasContext.scale(1,1);
		}else
		{
			_this.$el.css("background-position",-startposx+"px"+" "+-startposy+"px");
		}
	_this.options.onFrameChange(_this.options.currentFrame,_this.options.currentAnimation);
	};
	
	_this.init();
	return _this;
}

/**
 * custom Exception
 */
AnimatorCustomExceptions={

noSequenceFound : function(){
	this.showMessage=function(element){
	element.html("no sequence is specified for this animation");
	};
},
domNotFound : function(){
	this.showMessage=function(){
	    if(console)
	console.log("passed element is not found");
	};
},
commonException : function(){
	this.showMessage=function(e){
	    if(console)
	 console.log(e);
	};
}

}

