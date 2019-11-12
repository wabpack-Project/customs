/**
 * 字符串是否含有html标签的检测
 * @param htmlStr
 */
function checkHtml(htmlStr) {
	var  reg = /<[^>]+>/g;
	return reg.test(htmlStr);
}

/**
 * 字符串转DOM
 * @param {Object} len 		Hash位数
 * */
var parseDom = function(str){
	var objEl = document.createElement("div");
	objEl.innerHTML = str;
	return objEl.childNodes;
};