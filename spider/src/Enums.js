import Vue from "vue";

var vueCache = new Vue({
	data: {
		cache: {},
	},
});
var CACHE = vueCache.cache;

export function Enums() {}

Enums.prototype.set = function (data) {
	if (!data || !Array.isArray(data) || data.length == 0) {
		return false;
	}

	data.forEach(function (item) {
		// bug point 
		item.value = parseInt(item.value);
		if (!CACHE[item.type]) {
			CACHE[item.type] = [];
		}

		CACHE[item.type].push(item);
	});

	return true;
};

Enums.prototype.clear = function () {
	CACHE = {};
};

Enums.prototype.get = function (type) {
	return  CACHE[type] ||[];
};

Enums.prototype.getMany = function (types) {
	if (!types) {
		return CACHE;
	}

	var result = [];
	types.split(",").forEach(function (item) {
		result.push(CACHE[item]);
	});

	return result;
};

Enums.prototype.getLabel = function (type, value) {
	for (const item of this.get(type)) {
		if (item.value ==parseInt(value)) {
			return item.label;
		}
	}

	return value;
};
Enums.prototype.getColor = function (type, value) {
	for (const item of this.get(type)) {
		if (item.value ==parseInt(value)) {
			return item.color;
		}
	}

	return value;
};
