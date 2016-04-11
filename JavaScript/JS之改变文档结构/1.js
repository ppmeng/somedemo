//显示缩略语列表
function displayAbbreviations() {
	//检查
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
		return false;
	}
	//取得所有缩略词
	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length == 0) return false;
	var defs = new Array();
    
    //遍历所有缩略词
	for (var i = 0; i < abbreviations.length; i++) {
		var current_abbr = abbreviations[i]
		//兼容低版本IE（IE6）
		if (current_abbr.childNodes.length < 1) continue;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	for (key in defs) {
		//创建定义标题
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //dtitle.innerHTML = key;
        
        //创建定义描述
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(defs[key]);
		ddesc.appendChild(ddesc_text);
		//ddesc.innerHTML = defs[key];
        
        //添加到定义列表
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	//若dl没有子节点立即退出
	if (dlist.childNodes.length < 1) return false;

	//创建定义列表标题
	var abbrheader = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	abbrheader.appendChild(header_text);

	//添加到body之后
	document.body.appendChild(abbrheader);
	document.body.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);

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


//显示文献来源链接
function displayCitations() {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
			return false;
	}
	var quotes = document.getElementsByTagName("blockquote");
	for (var i = 0; i < quotes.length; i++) {
		//没有cite属性
		if (!quotes[i].getAttribute("cite")) continue;
		var cite_url = quotes[i].getAttribute("cite");

		//得到quotes[i]中最后一个元素节点并将source插入
		var quotesChildren = quotes[i].getElementsByTagName("*");
		if (quotesChildren.length < 1) continue;
	    var elem = quotesChildren[quotesChildren.length - 1];

	    var source = document.createElement("a");
		source.setAttribute("href", cite_url);
		source.setAttribute("target", "_blank");
		var url_text = document.createTextNode("source" + (i + 1));
		source.appendChild(url_text);
		//source.innerHTML = "source" + (i+1);
        //定义上标元素
        var superscript = document.createElement("sup");
        superscript.appendChild(source);
		elem.appendChild(superscript);
	}
}
addLoadEvent(displayCitations);

//显示快捷键清单
function displayAccesskeys() {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
		return false;
	}
	var navigation = document.getElementById("navigation");
	var links = navigation.getElementsByTagName("a");
	if (links.length < 1) return false;
	var keylist = document.createElement("ul");
	for (var i = 0 ; i < links.length; i++) {
		if (!links[i].getAttribute("accesskey")) continue;
		var key = links[i].getAttribute("accesskey");
		var key_text = links[i].lastChild.nodeValue;
        var keyli = document.createElement("li");
        keyli.innerHTML = key + "：" + key_text;       
        keylist.appendChild(keyli);
	}
	var header = document.createElement("h2");
	header.innerHTML = "Accesskey";
	document.body.appendChild(header);
	document.body.appendChild(keylist);
}
addLoadEvent(displayAccesskeys);