function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
    
    if (document.getElementById("description")) {
	    var text = whichpic.getAttribute("title");
	    var description = document.getElementById("description");
        description.firstChild.nodeValue = text;
        //description.innerHTML = text;
    }
    return true;
}

function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return !showPic(this);
        }
    }
}

function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "img/0.jpg");
    placeholder.setAttribute("alt", "图片集封面");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var des_text = document.createTextNode("任意点击图片欣赏萌妹子");
    description.appendChild(des_text);
    
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild === targetElement) {
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
//共享onload事件
/*方法一
*window.onload = prepareGallery;
*/

/*方法二
window.onload = function() {
	prepareGallery();
}*/

//方法三
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
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);


