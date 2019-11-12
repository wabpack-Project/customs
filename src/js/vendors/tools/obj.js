// 赋值对象
// Json序列化克隆对象
var deepClone = function(obj){
	return JSON.parse(JSON.stringify(obj));
};

// 新建对象
function newObj(obj) {
	var datas = [];
	for (key in obj) {
		var data = {};//每次循环的时候，新建对象
		data.name = key;
		datas.push(data);
	}
	console.log(datas);
	return datas;
};

