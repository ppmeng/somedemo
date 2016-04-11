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
function positionmessage() {
    if(!document.getElementById) return false;
    if(!document.getElementById("girl")) false;
    var girl = document.getElementById("girl");
    girl.style.position = "absolute";
    girl.style.left = "0";
    girl.style.top = "0";
    moveElement("girl", 386, 200, 20);
    if(!document.getElementById("boy")) false;
    var boy = document.getElementById("boy");
    boy.style.position = "absolute";
    boy.style.left = "860px";
    boy.style.top = "440px";
    moveElement("boy", 500, 200, 20);
}
addLoadEvent(positionmessage);
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