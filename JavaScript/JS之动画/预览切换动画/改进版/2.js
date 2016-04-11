function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof oldonload != "function") {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}


function prepareSlideshow() {
	//确保浏览器支持DOM
	if (!document.getElementById || !document.getElementsByTagName) {
		return false;
	}
	//确保元素存在
	if (!document.getElementById("linklist") || !document.getElementById("preview")) {
		return false;
	}
	//为图片应用样式以便后期使用
	var preview = document.getElementById("preview");
	preview.style.position = "absolute";
	//preview.style.top = "0px";
	//preview.style.left = "0px";

	//获取所有链接
	var linklist = document.getElementById("linklist");
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
	if (!elem.style.left) elem.style.left = "0px";
	if (!elem.style.top) elem.style.top = "0px";
 	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos)/10);
		xpos += dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_y - ypos)/10);
		ypos += dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos - final_x)/10);
		xpos-= dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos - final_y)/10)
		ypos-=dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = function() {
		moveElement(element, final_x, final_y, interval);
	}
	//第一次移动之后elem即可获得movement属性
	elem.movement = setTimeout(repeat, interval);
}
