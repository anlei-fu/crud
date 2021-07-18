import { Enums } from "./Enums";
import * as dateUtility from "./DateUtil";
import utils from "./common";
import common from "./common";

/**
 * Dispatch func
 * 
 * @param {String} source 
 * @param {FormatConfig} config 
 * @returns {String}
 */
function format(source, config) {
	try {
		if(source==undefined||source==="")
		return "";

		if(!config)
		  return source;

		if (!config) {
			return source;
		} else if (config.type == "enum") {
			return formatEnum(source, config.pattern);
		} else if (config.placeholder) {
			return formtEmptyContent(source);
		} else if (config.type == "date") {
			return formatDate(source, config.pattern);
		}  else if (config.type == "number") {
			return formatNumber(source);
		} else if (config.type == "money") {
			return formatMoney(source);
		}
		else {
			return source;
		}
	} catch (err) {
		if(process.env.NODE_ENV == "development"){
			console.error(`format failed`);
			console.error("source:");
			console.error(source);
			console.error("config:");
			console.error(config);
		}
		return source;
	}
}

/**
 * format enum item
 * 
 * @param {String?} value 
 * @param {String} type 
 * @returns {String}
 */
function formatEnum(value, type) {
	if (isNullOrEmpty(value)) {
		return "---";
	}

	if ((value + "").trim() == "*") {
		return "所有";
	}

	let item= common.getSingleEnum(type, value);
	return item?item.label:"";
}

/**
 * Format empty content
 * 
 * @param {String} content 
 * @returns {String}
 */
function formtEmptyContent(content) {
	return (typeof content == 'undefined' || content.trim() == "") ? "---" : content.trim();
}

/**
 * Format date to string
 * 
 * @param {Date|String} date 
 * @param {String} format 
 * @returns {String}
 */
function formatDate(date, format="yyyy-MM-dd hh:mm:ss") {
	if (date == undefined) {
		return "";
	}

	date = date instanceof Date ? date : new Date(date);
	if(!date){
		if(process.env.NODE_ENV == "development"){
			console.error(`unexcepted date(${date}) and pattern(${format})`);
		}

		return date;
	}

	return dateUtility.ToString(date, format, false);
}

/**
 * Format number ,if empty set '0'
 * 
 * @param {String|Number} value 
 * @returns {String}
 */
function formatNumber(value) {
	return value ? ((value + "").trim() == "" ? 0 : value) : 0;
}

/**
 * Format undefine to empty string
 * 
 * @param {String} str 
 * @returns {String}
 */
function isNullOrEmpty(str) {
	return str == undefined || (str + "").trim() == "";
}

/**
 * Format currency
 * 
 * @param {Number} amount 
 * @param {Number} round 
 * @param {String} decimal 
 * @param {String} thousands 
 * @returns {String}
 */
function formatMoney(amount, round = 2, decimal = ".", thousands = ",") {
	try {
		round = Math.abs(round);
		round = isNaN(round) ? 2 : round;
		let negativeSign = amount < 0 ? "-" : "";
		let integer = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(round)).toString();
		let first2 = (integer.length > 3) ? integer.length % 3 : 0;

		return negativeSign + (first2 ? integer.substr(0, first2) + thousands : '') // first 2 or 1
			+ integer.substr(first2).replace(/(\d{3})(?=\d)/g, "$1" + thousands)  // 1000,
			+ (round ? decimal + Math.abs(amount - integer).toFixed(round).slice(2) : ""); //after point
	} catch (e) {
		console.log(e)
	}
}

export {
	format
};
