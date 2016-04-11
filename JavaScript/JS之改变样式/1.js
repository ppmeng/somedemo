function styleHeaderSiblings(node, theClass) {
    if (!document.getElementsByTagName) return false;
    var elemlist = document.getElementsByTagName(node);
    var elem;
    for (var i = 0; i < elemlist.length; i++) {
    	elem = getNextElement(elemlist[i].nextSibling);
    	addClass(elem, theClass);
    	//elem.setAttribute("class", "intro");
    	//elem.className = "intro";
    }
}
function getNextElement(node) {
	if (node.nodeType == 1) {
		return node;
	}
	if (node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null; 
}
function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	}
	else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
addLoadEvent(styleHeaderSiblings("h1", "intro"));
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

//若浏览器不支持CSS3则显示下面样式
function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var table = document.getElementsByTagName("table");
    var odd;
    for (var i = 0 ; i < table.length; i++) {
    	var rows = table[i].getElementsByTagName("tr");
    	for (var j = 0; j < rows.length; j++) {
    		if (odd == true) {
    			//rows[j].style.backgroundColor = "#CCCCFF";
    			addClass(rows[j], "odd");
    			//分别尝试上面两行代码，发现chrome下第二种样式会被CSS3样式取代
    			odd = false;
    		}
    		else {
    			odd = true;
    		}
    	}
    }
}
addLoadEvent(stripeTables);

function highlightRows() {
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].onmouseover = function() {
			this.style.fontWeight = "bold";
		}
		rows[i].onmouseout = function() {
			this.style.fontWeight = "normal";
		}
	}
}
addLoadEvent(highlightRows);