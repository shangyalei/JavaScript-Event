//自建程序池
function on(ele,type,fn){
	
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}
	
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];
		//和run方法建立关联，并解决this关键字
		//写在这里只会执行一次
		ele.attachEvent("on"+type,function(){run.call(ele)});	
	}
	//解决重复绑定
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);
}

function run(e){
	e=e||window.event;
	var type=e.type;
	if(window.event){
		e.target=e.srcElement;
		e.stopPropagation=function(){e.cancelBubble=true;};
		e.preventDefault=function(){e.returnValue=false;};
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	}
	//this就是ele 
	var a=this["aEvent"+type];
	if(a)//此处花括号可以省略
		for(var i=0;i<a.length;i++)//此处花括号可以省略
			//放在数组里面依次执行，解决顺序问题
			if(typeof a[i]=="function"){
				a[i].call(this,e);
			}else{
				a.splice(i,1);
				i--;
			}
	}

function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	var a=ele["aEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				//i--;
				return;
			}
		}
	}
}
