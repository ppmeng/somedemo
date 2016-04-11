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
	preview.style.top = "0px";
	preview.style.left = "0px";
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
function moveElement(element, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(element)) return false;
	var elem = document.getElementById(element);
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		xpos++;
	}
	if (ypos < final_y) {
		ypos++;
	}
	if (xpos > final_x) {
		xpos--;
	}
	if (ypos > final_y) {
		ypos--;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = function() {
		moveElement(element, final_x, final_y, interval);
	}
	movement = setTimeout(repeat, interval);
}
addLoadEvent(prepareSlideshow);
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