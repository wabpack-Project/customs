// 判断对象是否为空
var isEmptyObj = function (obj) {
	if (JSON.stringify(obj) === "{}"){
		return true;
	}
	return false;
};

/**
 * 判断数据类型
 * @param {Object} len 		Hash位数
 * */
var isObjFunc = function(type) {
	var _toString = Object.prototype.toString;
	return function() {
		return _toString.call(arguments[0]) === '[object ' + type + ']'
	}
};

// 判断是函数（方法）
var isFunction = function() {
	return isObjFunc("Function")(arguments[0]);
};

// 判断是字符串
var isString = function() {
	return isObjFunc("String")(arguments[0]);
};

// 判断是对象
var isObject = function() {
	return isObjFunc("Object")(arguments[0]);
};

// 判断是jq对象
var isJqObject = function (obj) {
	if (obj instanceof jQuery){
		return true;
	}
};
