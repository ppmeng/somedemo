function addEventLoad(func) {
    var oldonload = window.onload;
    if (typeof oldonload != "function") {
    	window.onload = func;
    }
    else {
    	window.onload = function () {
    		oldonload();
    		func();
    	}
    }
}

function addEventHandler(elenode, event, handler) {
    if (elenode.addEventListener) {
    	elenode.addEventListener(event, handler, false);
    }
    else if (elenode.attachEvent) {
    	elenode.attachEvent("on" + event, handler);
    }
    else {
    	elenode["on" + event] = handler;
    }
}

function buttonHandler() {
	var button = document.getElementsByTagName("button");
	for ( var i = 0 ; i < button.length; i++) {
		if (button[i].parentNode.getAttribute("id") == "insertSort") {
			addEventHandler(button[i], "click", function(){ 
			    insertSort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "binarySort") {
            addEventHandler(button[i], "click", function(){
			    binarySort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "shellSort") {
			addEventHandler(button[i], "click", function(){
                shellSort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "simpleSort") {
			addEventHandler(button[i], "click", function(){
                simpleSort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "heapSort") {
			addEventHandler(button[i], "click", function(){
                heapSort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "bubbleSort") {
			addEventHandler(button[i], "click", function(){
                bubbleSort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "quickSort") {
			addEventHandler(button[i], "click", function(){
                quickSort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "mergeSort") {
			addEventHandler(button[i], "click", function(){
                mergeSort(randomnum());
			});
		}
		else if (button[i].parentNode.getAttribute("id") == "radixSort") {
			addEventHandler(button[i], "click", function(){
                radixSort(randomnum());
			});
		}
	}
}
addEventLoad(buttonHandler);

//随机生成数据
function randomnum() {
	var sortlist = [];
    for (var i = 0; i < 10; i++) {
        sortlist[i] = Math.ceil(Math.random() * 90 + 10);
    }
    return sortlist;
}


//直接插入排序
function insertSort(sortlist) {

	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("insertSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
    
    //直接插入排序算法
	var temp, i, j;
	for (i = 1; i < sortlist.length; i++) {
		temp = sortlist[i];
		j = i - 1;
		while (j >= 0 &&　temp < sortlist[j]) {
			sortlist[j + 1] = sortlist[j];
			j--; 
		}
		sortlist[j + 1] = temp;
		//创建新节点并输出每次排序后的结果
		var newli = document.createElement("li");
		newli.innerHTML = "第" + i + "趟排序结果为：" + sortlist;
		nowul.appendChild(newli);
	}
}

//折半插入排序
function binarySort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("binarySort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
    
    //折半插入算法
    for (var i = 1; i < sortlist.length; i++) {
        var low = 0, high = i - 1, mid;
        var temp = sortlist[i];
        while (low <= high) {
        	mid = Math.floor((low + high) / 2); 
        	if (temp < sortlist[mid]) {
        		high = mid - 1;
        	}
        	else {
        		low = mid + 1;
        	}
        }
        for (var j = i - 1; j > high; j--) {
        	sortlist[j + 1] = sortlist[j];
        }
        sortlist[high + 1] = temp;
        //创建新节点并输出每次排序后的结果
        var newli = document.createElement("li");
		newli.innerHTML = "第" + i + "趟排序结果为：" + sortlist;
		nowul.appendChild(newli);
    }	
}

//希尔排序
function shellSort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("shellSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);

	//希尔排序算法


}

//简单选择排序
function simpleSort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("simpleSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
    
    //简单选择排序算法
	for (var i = 0; i < sortlist.length; i++) {
		var temp;
		var minele = i;
		//选出最小元素
		for (var k = minele + 1; k < sortlist.length; k++) {
		    if (sortlist[minele] > sortlist[k]) {
		    	minele = k;
		    }
        }
        //将最小元素和无序列表的首个数字交换
       temp = sortlist[i];
		sortlist[i] = sortlist[minele];
		sortlist[minele] = temp;
        //创建节点并输出每趟排序后数据
		var newli = document.createElement("li");
		newli.innerHTML = "第" + (i+1) + "趟排序结果为：" + sortlist;
		nowul.appendChild(newli);		
	}
}

//堆排序
function heapSort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("heapSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
}

//冒泡排序
function bubbleSort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("bubbleSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
    for (var i = sortlist.length; i >=2; i--) {
        for (var j = 0; j < i; j++) {
			var temp;
			if (sortlist[j] > sortlist[j + 1]) {
	            temp = sortlist[j + 1];
	            sortlist[j + 1] = sortlist[j];
	            sortlist[j] = temp;
			}
		}
		//创建节点并输出每趟排序后数据
		var newli = document.createElement("li");
		newli.innerHTML = "第" + (sortlist.length - i + 1) + "趟排序结果为：" + sortlist;
		nowul.appendChild(newli);
	}	
}

//快速排序
function quickSort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("quickSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
    
    //初始化传入数据
    var count = 0;
	var sort = function(arr, left, right) {
		if (left < right) {
	        var stop = recurse(arr, left, right);
	        sort(arr, left, stop -1);
            sort(arr, stop + 1, right);
        }
    };
    sort(sortlist, 0, sortlist.length - 1);
        
    function recurse(arr, left, right) {
    	count++;
        var temp = arr[left];
		while (left != right) {
		    while (right > left && arr[right] >= temp) {
		    	right--;
		    }
		    if (right > left) {
		    	arr[left] = arr[right];
		    	left++;
		    }
		    while (left < right && arr[left] <= temp) {
		    	left++;
		    }
		    if (left < right) {
		        arr[right] = arr[left];
		    	right--;
		    }
		}
		arr[left] = temp;
	
	    //创建节点并输出每趟排序后数据
	    var newli = document.createElement("li");
	    newli.innerHTML = "第" + count + "趟排序结果为：" + arr;
	    var nowul = document.getElementById("quickSort").getElementsByTagName("ul")[0];
	    nowul.appendChild(newli);

	    return left;
	}
}


//归并排序
function mergeSort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("mergeSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
}

//基数排序
function radixSort(sortlist) {
	
	//清空ul并输出原始数据
	var firstli = document.createElement("li");
	firstli.innerHTML = "原始数据为：" + sortlist;
	var nowul = document.getElementById("radixSort").getElementsByTagName("ul")[0];
	nowul.innerHTML = "";
	nowul.appendChild(firstli);
}
