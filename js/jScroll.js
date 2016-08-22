;(function(){
	var ScrollPage = function(page){
		this.__sections = document.getElementsByClassName(page);
		this.__scrollContainer = document.getElementsByClassName('scroll-container')[0];

		this.__transformY = 0;
		this.__pageNum = 0;	//初始化页面数量
		this.__scrollNum = 40;	//初始化触发页面滚动的条件值
		this.__scrollIndex = 0;	//初始化当前页面的索引
		this.__listIndex = 0;	//初始化当前list的索引
		

		this.__position = {	//获取页面的宽度和高度
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		};
	};

	ScrollPage.prototype = {
		constructor: ScrollPage,
		init: function(){
			this.__pageNum = this.__sections.length;
			this.eventFunc();
		},
		eventFunc: function(){
			for(var i = 0,l = this.__pageNum;i < l;i++){
				/*绑定touchstart事件*/
				this.__sections[i].addEventListener('touchstart',function(event){
					event.preventDefault();
					if(!event.changedTouches.length){
						return;
					}
					this.__touch = event.changedTouches[0];
					this.__startX = this.__touch.pageX;
			        this.__startY = this.__touch.pageY;
				}.bind(this),false);

				/*绑定touchend事件*/
				this.__sections[i].addEventListener('touchend',function(event){
					event.preventDefault();
					if(!event.changedTouches.length){
						return;
					}
					this.__touch = event.changedTouches[0];
					this.__endX = this.__touch.pageX;
			        this.__endY = this.__touch.pageY;

			        this.__tmpX = this.__startX - this.__endX;
			        this.__tmpY = this.__startY - this.__endY;
			        if(Math.abs(this.__tmpY) >= this.__scrollNum && this.__tmpY > 0){	//触发往上滑动
			        	this.transformFunc('up');
			        }else if(Math.abs(this.__tmpY) >= this.__scrollNum && this.__tmpY < 0){	//触发往下滑动
			        	this.transformFunc('down');
			        }
				}.bind(this),false);
			}
		},
		transformFunc: function(direct){
			switch(direct){
				case 'up':
					if(this.__scrollIndex === (this.__pageNum - 1)){	//若已经是最后一张，则下滑不发生滚动,发生图片偏离事件
						return;
					}else{
						this.__scrollIndex++;
						this.__transformY = parseInt(-this.__scrollIndex*this.__position.height) + 'px';
						this.__scrollContainer.style.tansform = 'translate3d(0px,'+ this.__transformY + ',0px)';
						this.__scrollContainer.style.webkitTransform = 'translate3d(0px,'+ this.__transformY + ',0px)';
					}
				break;
				case 'down':
					if(this.__scrollIndex === 0){	//若已经是第一张，则上滑不发生滚动
						/*if(this.__sections[this.__scrollIndex].className.indexOf('j-no-scroll') > -1){
							return;
						}else{
							this.__scrollIndex = this.__pageNum - 1;
							this.__transformY = parseInt(-this.__scrollIndex*this.__position.height) + 'px';
							this.__scrollContainer.style.tansform = 'translate3d(0px,'+ this.__transformY+',0px)';
							this.__scrollContainer.style.webkitTransform = 'translate3d(0px,'+ this.__transformY+',0px)';
						}*/
						return;
					}else{
						this.__scrollIndex--;
						this.__transformY = parseInt(-this.__scrollIndex*this.__position.height) + 'px';
						this.__scrollContainer.style.tansform = 'translate3d(0px,'+ this.__transformY+',0px)';
						this.__scrollContainer.style.webkitTransform = 'translate3d(0px,'+ this.__transformY+',0px)';
					}
				break;
			}
		}
	};

	window.ScrollPage = ScrollPage;
})();