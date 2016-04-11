function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}


function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}


function prepareSlideshow() {
	//确保浏览器支持DOM
	if (!document.getElementById || !document.getElementsByTagName) {
		return false;
	}
	//确保元素存在
	if (!document.getElementById("linklist")) return false;
	//若用户支持JS脚本，则创建图片节点
	var imgelem = document.createElement("img");
	imgelem.setAttribute("id", "preview");
	imgelem.setAttribute("src", "../img/donghua.png");
	imgelem.setAttribute("alt", "beauty girl");
	
	var divelem = document.createElement("div");
	divelem.setAttribute("id", "slideshow");
	divelem.appendChild(imgelem); 
	//在moveElement函数里面若检验elem属性采用第二种方法，下面两行代码可舍去
	/*
	*preview.style.top = "0px";
	*preview.style.left = "0px";
	*/
	//获取所有链接
	var linklist = document.getElementById("linklist");
	insertAfter(divelem, linklist);
	var links = linklist.getElementsByTagName("a");
	links[0].onmouseover = function() {
		moveElement("preview", -100, 0, 10);
	}
	links[1].onmouseover = function() {
		moveElement("preview", -200, 0, 10);
	}
	links[2].onmouseover = function() {
		moveElement("preview", -300, 0 , 10);
	}
}
addLoadEvent(prepareSlideshow);


function moveElement(element, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(element)) return false;
	var elem = document.getElementById(element);
	
	//给elem增加一个属性来使每个元素在移动前都获得一个名为movement的属性来使img复位
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	//验证elem是否存在left和top属性
	//下面是第一种和之前验证DOM一样，没有属性的时候直接结束而不会产生报错
	//if (!elem.style.left || !elem.style.top) return false;
	//下面是第二种方法：分别检验，若没有该属性就直接赋值为初始值，此时可以将之前的赋值删去
	if (!elem.style.left) elem.style.left = "0px";
	if (!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;
	if (xpos == final_x && ypos == final_y) {
		return true;
	}

	//增加dist使切换更加顺畅
	if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos) / 10);
		xpos = xpos + dist;
	}
	if (ypos < final_y) {
        dist = Math.ceil((final_y -ypos) / 10);
		ypos = ypos + dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos - final_x) / 10);
		xpos = xpos - dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos - final_y) / 10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = function() {
		moveElement(element, final_x, final_y, interval);
	}
	//第一次移动之后elem即可获得movement属性
	elem.movement = setTimeout(repeat, interval);
}


