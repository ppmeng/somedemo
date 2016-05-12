function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof oldonload != "function") {
		window.onload = func;
	}else {
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
	}else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	//若没有样式则赋值，有则添加
	if (!element.className) {
		element.className = value;
	}else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}


//index.html
function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    
    var linkurl;
    for (var i = 0; i < links.length; i++) {
    	//console.log(window.location.href);
    	linkurl = links[i].getAttribute("href");
    	//console.log(window.location.href.slice(64));
    	//console.log(linkurl.indexOf(window.location.href));
    	//console.log(window.location.href.indexOf(linkurl));
    	if (window.location.href.indexOf(linkurl) !== -1) {
            addClass(links[i],"here");
            //每个页面增加一个id，改变header的背景图片
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
    	}
    }
}
addLoadEvent(highlightPage);

function prepareSlideshow() {
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");

	var frame = document.createElement("img");
	frame.setAttribute("src", "images/frame.gif");
	frame.setAttribute("id", "frame");
	slideshow.appendChild(frame);

	var preview = document.createElement("img");
	//相对于html文件定位图片位置
	preview.setAttribute("src", "images/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id", "preview");

	slideshow.appendChild(preview);
	intro.appendChild(slideshow);

	var links = intro.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function () {
			destination = this.getAttribute("href");

			if (destination.indexOf("index.html" != -1)) {
				moveElement("preview", 0, 0, 5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview", -300, 0, 5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview", -450, 0, 5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview", -600, 0, 5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);

function moveElement(elementId, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementId)) return false;

	var elem = document.getElementById(elementId);
	
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
        elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		var dist = Math.ceil((final_x - xpos) / 10);
		xpos += dist;
	}
	if (xpos > final_x) {
		var dist = Math.ceil((xpos - final_x) / 10);
		xpos -= dist;
	}
	if (ypos < final_y) {
		var dist = Math.ceil((final_y - ypos) / 10);
		ypos += dist;
	}
	if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y) / 10);
		ypos -= dist;
	}

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
	var repeat = function() {
		moveElement(elementId, final_x, final_y, interval);
	}
	elem.movement = setTimeout(repeat, interval);
}

//about.html
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		}else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");

	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
        //console.log(sectionId);
		var eachSection = document.getElementById(sectionId);
		if (!eachSection) continue;
        eachSection.style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function () {
			showSection(this.destination);
		}
    }
}
addLoadEvent(prepareInternalnav);

//photos.html
function preparePlaceholder() {
    if (!document.getElementById) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    
    //占位符
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    insertAfter(placeholder, gallery);
    
    //图片描述
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var text = document.createTextNode("Choose an image");
    description.appendChild(text);
    insertAfter(description, gallery);
}
addLoadEvent(preparePlaceholder);

function prepareGallery(){
	if (!document.getElementsByTagName) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
   
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
        	return !showPic(this);
        }
    } 
}
addLoadEvent(prepareGallery);

function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
    var placeholder = document.getElementById("placeholder");
    var source = whichpic.getAttribute("href");
    placeholder.setAttribute("src", source);

    if (!document.getElementById("description")) return false;
    var description = document.getElementById("description");
    if (whichpic.getAttribute("title")) {
    	var text = whichpic.getAttribute("title");
    }else {
    	var text = "";
    }
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return true;
}

/*若没有thead，tbody标签干扰也可以直接使用css3中的nth-of-type(odd)...*/
function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var  tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++) {
		var odd = false;
	    var rows = tables[i].getElementsByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
            	addClass(rows[j], "odd");
            	odd = false;
            }else {
            	odd = true;
            }
		}
	}
}
addLoadEvent(stripeTables);

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
    	rows[i].oldClassName = rows[i].className;
    	rows[i].onmouseover = function () {
    		addClass(this, "highlight");
    	}
    	rows[i].onmouseout = function() {
    		this.className = this.oldClassName;
    	}
    }
}
addLoadEvent(highlightRows);

function displayAbbreviations() {
	if ((!document.getElementsByTagName) || (!document.createElement) || (!document.createTextNode))
		return false;

	//读出所有abbr，用数组保存
	if (!document.getElementsByTagName("abbr")) return false;
	var abbreviations = document.getElementsByTagName("abbr");
	var defs = new Array();
	for (var i = 0; i < abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		if (current_abbr.childNodes.length < 1) return false;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
    
    //穿件定义列表
	var dlist = document.createElement("dl");
	for (var key in defs) {
        var definition = defs[key];
        
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key + "：");
        dtitle.appendChild(dtitle_text);

        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);

        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
	}

    //若定义列表不空则创建标题
	if (dlist.childNodes.length < 1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	//添加列表
	var articles = document.getElementsByTagName("article");
	if (articles.length < 1) return false;
	articles[0].appendChild(header);
	articles[0].appendChild(dlist);
}
addLoadEvent(displayAbbreviations);

//兼容低版本浏览器使得点击label文本框获得焦点
function focusLabels() {
	if (!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	
	for (var i = 0; i < labels.length; i++) {
		if (!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function () {
			var id = this.getAttribute("for");
			//console.log(i);不知道为什么i=3
			//console.log(id);
            if (!document.getElementById(id)) return false;
            var elem = document.getElementById(id);
            //elem.placeholder = "";
            elem.focus();
		}
	}
	/*若有默认值时在默认值后面获得焦点
	document.getElementById("name").focus();
    var input = document.getElementById("name");
    var val = input.value;
	input.value = "";
	input.value = val;*/
}
addLoadEvent(focusLabels);

//兼容所有不支持HTML5的浏览器
function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName("article")[0];
			if (submitFormWithAjax(this, article)) return false;
            return true;
		}
	}
}   
addLoadEvent(prepareForms);

function resetFields(whichform) {
	//支持placeholder保持原来特性不再进行
	if (!document.createElement) return false;
    if ("placeholder" in document.createElement("input")) return false;
    //遍历表单内元素
    for (var i = 0; i < whichform.elements.length; i++) {
    	var element = whichform.elements[i];
    	//console.log(i);
    	//若是提交按钮跳过
    	if (element.type == "submit") continue;
    	var check = element.placeholder || element.getAttribute("placeholder");
    	//若没有placeholder属性跳过
    	if (!check) continue;
    	//统一placeholder颜色
    	addClass(element, "placeholder");
    	//获得焦点时placeholder文字消失
        element.onfocus = function() {
        	var text = this.placeholder || this.getAttribute("placeholder");
            if (this.value == text) {
            	this.value = "";
            }
        }
        //失去焦点时placeholder显示
        element.onblur = function() {
        	if (this.value == "") {
        		this.value = this.placeholder || this.getAttribute("placeholder");
        	}
        }
        element.onblur();
    }
}

//验证表单
function validateForm(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		//刚开始使用required属性，结果发现IE识别不了
		if (element.className.indexOf("required") != -1) {
			if (!isFilled(element)) {
				alert("Please fill in the " +element.name+ " field.");
				return false;
			}
		}
		//IE不能识别type="email"的情况故只能用name
		if (element.name == "email") {
			if (!isEmail(element)) {
				alert("The " +element.name+ " must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function isFilled(field) {
	//去除所有空格后表单元素长度为0 
	if (field.value.replace(" ", "").length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != placeholder);
}

function isEmail(field) {
	var apos = field.value.indexOf("@");
	var dotpos = field.value.indexOf(".");
	if (apos < 1 || dotpos - apos < 2) {
		return false;
	}else {
		return true;
	}
}

function getHTTPObject() {
	if (window.XMLHttpObject) {
		return new XMLHttpObject();
	}else if (window.ActiveObject) {
		//for IE6,IE5
		return new ActiveObject();
	}
}

function displayAjaxLoading(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src", "images/loading.gif");
	content.setAttribute("alt", "Loading...");
	element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
	var request = getHTTPObject();
	if (!request) return false;
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for (var i = 0; i < whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
	}
	data = dataParts.join("&");
	//True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
	request.open("POST", whichform.getAttribute("action"), true);
	//表示请求中包含URL编码的表单
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {
    	if (request.readyState == 4) {
    		//服务器接受请求或者本地响应成功
    		if (request.status == 200 || request.status == 0) {
    			var matches = request.reponseText.match(/<article>([\s\S])<\/article>/);
    			if (matches.length > 0) {
                    thetarget.innerHTML = matches[1];
    			}else {
    				thetarget.innerHTML = "<p> Oops, there was an error. Sorry.</p>";
    			}
    		}else {
    			thetarget.innerHTML = "<p>"+ request.statusText +"</p>";
    		}
    	}
    };
    request.send(data);
    return true;
}