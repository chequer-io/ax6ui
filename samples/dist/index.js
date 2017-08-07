/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _AX6Info = __webpack_require__(2);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module AX6Util
 */

var _toString = Object.prototype.toString;
var reIsJson = /^(["'](\\.|[^"\\\n\r])*?["']|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/,
    reMs = /^-ms-/,
    reSnakeCase = /[\-_]([\da-z])/gi,
    reCamelCase = /([A-Z])/g,
    reDot = /\./,
    reInt = /[-|+]?[\D]/gi,
    reNotNum = /\D/gi,
    reMoneySplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
    reAmp = /&/g,
    reEq = /=/,
    reClassNameSplit = /[ ]+/g;

function each(O, _fn) {
  if (isNothing(O)) return [];
  var key = void 0,
      i = 0,
      l = O.length,
      isObj = l === undefined || typeof O === "function";
  if (isObj) {
    for (key in O) {
      if (typeof O[key] != "undefined") if (_fn.call(O[key], key, O[key]) === false) break;
    }
  } else {
    for (; i < l;) {
      if (typeof O[i] != "undefined") if (_fn.call(O[i], i, O[i++]) === false) break;
    }
  }
  return O;
}

function search(O, _fn) {
  if (isNothing(O)) return -1;
  if (isObject(O)) {
    for (var key in O) {
      if (typeof O[key] != "undefined" && isFunction(_fn) && _fn.call(O[key], key, O[key])) {
        return key;
        break;
      } else if (O[key] == _fn) {
        return key;
        break;
      }
    }
  } else {
    for (var i = 0, l = O.length; i < l; i++) {
      if (typeof O[i] != "undefined" && isFunction(_fn) && _fn.call(O[i], i, O[i])) {
        return i;
        break;
      } else if (O[i] == _fn) {
        return i;
        break;
      }
    }
  }
  return -1;
}

function filter(O, _fn) {
  if (isNothing(O)) return [];
  var k = void 0,
      i = 0,
      l = O.length,
      results = [],
      fnResult = void 0;
  if (isObject(O)) {
    for (k in O) {
      if (typeof O[k] != "undefined") {
        if (fnResult = _fn.call(O[k], k, O[k])) results.push(O[k]);
      }
    }
  } else {
    for (; i < l;) {
      if (typeof O[i] != "undefined") {
        if (fnResult = _fn.call(O[i], i, O[i])) results.push(O[i]);
        i++;
      }
    }
  }
  return results;
}

function toJson(O) {
  var jsonString = "";
  if (isArray(O)) {
    var i = 0,
        l = O.length;
    jsonString += "[";
    for (; i < l; i++) {
      if (i > 0) jsonString += ",";
      jsonString += toJson(O[i]);
    }
    jsonString += "]";
  } else if (isObject(O)) {
    jsonString += "{";
    var jsonObjectBody = [];
    each(O, function (key, value) {
      jsonObjectBody.push('"' + key + '": ' + toJson(value));
    });
    jsonString += jsonObjectBody.join(", ");
    jsonString += "}";
  } else if (isString(O)) {
    jsonString = '"' + O + '"';
  } else if (isNumber(O)) {
    jsonString = O;
  } else if (isUndefined(O)) {
    jsonString = "undefined";
  } else if (isFunction(O)) {
    jsonString = '"{Function}"';
  } else {
    jsonString = O;
  }
  return jsonString;
}

function parseJson(str, force) {
  if (force || reIsJson.test(str)) {
    try {
      return new Function('', 'return ' + str)();
    } catch (e) {
      return { error: 500, msg: 'syntax error' };
    }
  } else {
    return { error: 500, msg: 'syntax error' };
  }
}

function getType(O) {
  var typeName = void 0;
  if (O != null && O == O.window) {
    typeName = "window";
  } else if (!!(O && O.nodeType == 1)) {
    typeName = "element";
  } else if (!!(O && O.nodeType == 11)) {
    typeName = "fragment";
  } else if (O === null) {
    typeName = "null";
  } else if (typeof O === "undefined") {
    typeName = "undefined";
  } else if (_toString.call(O) == "[object Object]") {
    typeName = "object";
  } else if (_toString.call(O) == "[object Array]") {
    typeName = "array";
  } else if (_toString.call(O) == "[object String]") {
    typeName = "string";
  } else if (_toString.call(O) == "[object Number]") {
    typeName = "number";
  } else if (_toString.call(O) == "[object NodeList]") {
    typeName = "nodelist";
  } else if (typeof O === "function") {
    typeName = "function";
  }
  return typeName;
}

function isWindow(O) {
  return O != null && O == O.window;
}

function isElement(O) {
  return !!(O && (O.nodeType == 1 || O.nodeType == 11));
}

function isObject(O) {
  return _toString.call(O) == "[object Object]";
}

function isArray(O) {
  return _toString.call(O) == "[object Array]";
}

function isFunction(O) {
  return typeof O === "function";
}

function isString(O) {
  return _toString.call(O) == "[object String]";
}

function isNumber(O) {
  return _toString.call(O) == "[object Number]";
}

function isNodelist(O) {
  return !!(_toString.call(O) == "[object NodeList]" || typeof O !== "undefined" && O && O[0] && O[0].nodeType == 1);
}

function isUndefined(O) {
  return typeof O === "undefined";
}

function isNothing(O) {
  return typeof O === "undefined" || O === null || O === "";
}

function isDate(O) {
  return O instanceof Date && !isNaN(O.valueOf());
}

function isDateFormat(O) {
  var result = false;

  if (!O) {} else if (O instanceof Date && !isNaN(O.valueOf())) {
    result = true;
  } else {
    if (O.length > 7) {
      if (date(O) instanceof Date) {
        return true;
      }
    }
    O = O.replace(/\D/g, '');
    if (O.length > 7) {
      var mm = O.substr(4, 2),
          dd = O.substr(6, 2);

      O = date(O);
      if (O.getMonth() == mm - 1 && O.getDate() == dd) {
        result = true;
      }
    }
  }
  return result;
}

function first(O) {
  if (isObject(O)) {
    var keys = Object.keys(O);
    var item = {};
    item[keys[0]] = O[keys[0]];
    return item;
  } else if (isArray(O)) {
    return O[0];
  } else {
    console.error("AX6Util.object.first", "argument type error");
    return undefined;
  }
}

function last(O) {
  if (isObject(O)) {
    var keys = Object.keys(O);
    var item = {};
    item[keys[keys.length - 1]] = O[keys[keys.length - 1]];
    return item;
  } else if (isArray(O)) {
    return O[O.length - 1];
  } else {
    console.error("AX6Util.object.last", "argument type error");
    return undefined;
  }
}

function setCookie(cn, cv, exdays, opts) {
  var expire = void 0;
  if (typeof exdays === "number") {
    expire = new Date();
    expire.setDate(expire.getDate() + exdays);
  }
  opts = opts || {};
  return doc.cookie = [escape(cn), '=', escape(cv), expire ? "; expires=" + expire.toUTCString() : "", // use expires attribute, max-age is not supported by IE
  opts.path ? "; path=" + opts.path : "", opts.domain ? "; domain=" + opts.domain : "", opts.secure ? "; secure" : ""].join("");
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = doc.cookie.split(';'),
      i = 0,
      l = ca.length;
  for (; i < l; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
  }
  return "";
}

function alert(O) {
  win.alert(toJson(O));
  return O;
}

function left(str, pos) {
  if (typeof str === "undefined" || typeof pos === "undefined") return "";
  if (isString(pos)) {
    return str.indexOf(pos) > -1 ? str.substr(0, str.indexOf(pos)) : "";
  } else if (isNumber(pos)) {
    return str.substr(0, pos);
  } else {
    return "";
  }
}

function right(str, pos) {
  if (typeof str === "undefined" || typeof pos === "undefined") return "";
  str = '' + str;
  if (isString(pos)) {
    return str.lastIndexOf(pos) > -1 ? str.substr(str.lastIndexOf(pos) + 1) : "";
  } else if (isNumber(pos)) {
    return str.substr(str.length - pos);
  } else {
    return "";
  }
}

function camelCase(str) {
  return str.replace(reMs, "ms-").replace(reSnakeCase, function (all, letter) {
    return letter.toUpperCase();
  });
}

function snakeCase(str) {
  return camelCase(str).replace(reCamelCase, function (all, letter) {
    return "-" + letter.toLowerCase();
  });
}

function number(str, cond) {
  var result = void 0,
      pair = ('' + str).split(reDot),
      isMinus = void 0,
      returnValue = void 0;

  isMinus = Number(pair[0].replace(/,/g, "")) < 0 || pair[0] == "-0";
  returnValue = 0.0;
  pair[0] = pair[0].replace(reInt, "");

  if (pair[1]) {
    pair[1] = pair[1].replace(reNotNum, "");
    returnValue = Number(pair[0] + "." + pair[1]) || 0;
  } else {
    returnValue = Number(pair[0]) || 0;
  }
  result = isMinus ? -returnValue : returnValue;

  each(cond, function (k, c) {
    if (k == "round") {
      if (isNumber(c)) {
        if (c < 0) {
          result = +(Math.round(result + "e-" + Math.abs(c)) + "e+" + Math.abs(c));
        } else {
          result = +(Math.round(result + "e+" + c) + "e-" + c);
        }
      } else {
        result = Math.round(result);
      }
    }
    if (k == "floor") {
      result = Math.floor(result);
    }
    if (k == "ceil") {
      result = Math.ceil(result);
    } else if (k == "money") {
      result = function (val) {
        var txtNumber = '' + val;
        if (isNaN(txtNumber) || txtNumber == "") {
          return "";
        } else {
          var arrNumber = txtNumber.split('.');
          arrNumber[0] += '.';
          do {
            arrNumber[0] = arrNumber[0].replace(reMoneySplit, '$1,$2');
          } while (reMoneySplit.test(arrNumber[0]));
          if (arrNumber.length > 1) {
            return arrNumber.join('');
          } else {
            return arrNumber[0].split('.')[0];
          }
        }
      }(result);
    } else if (k == "abs") {
      result = Math.abs(Number(result));
    } else if (k == "byte") {
      result = function (val) {
        val = Number(result);
        var nUnit = "KB";
        var myByte = val / 1024;
        if (myByte / 1024 > 1) {
          nUnit = "MB";
          myByte = myByte / 1024;
        }
        if (myByte / 1024 > 1) {
          nUnit = "GB";
          myByte = myByte / 1024;
        }
        return number(myByte, { round: 1 }) + nUnit;
      }(result);
    }
  });

  return result;
}

function toArray(O) {
  if (typeof O.length != "undefined") return Array.prototype.slice.call(O);
  return [];
}

function param(O, cond) {
  var p;
  if (isString(O) && typeof cond !== "undefined" && cond == "param") {
    return O;
  } else if (isString(O) && typeof cond !== "undefined" && cond == "object" || isString(O) && typeof cond === "undefined") {
    p = {};
    each(O.split(reAmp), function () {
      var item = this.split(reEq);
      if (!p[item[0]]) p[item[0]] = item[1];else {
        if (isString(p[item[0]])) p[item[0]] = [p[item[0]]];
        p[item[0]].push(item[1]);
      }
    });
    return p;
  } else {
    p = [];
    each(O, function (k, v) {
      p.push(k + "=" + escape(v));
    });
    return p.join('&');
  }
}

function encode(s) {
  return encodeURIComponent(s);
}

function decode(s) {
  return decodeURIComponent(s);
}

function error() {
  _AX6Info2.default.onerror.apply(this, arguments);
}

function localDate(yy, mm, dd, hh, mi, ss) {
  var utcD, localD;
  localD = new Date();
  if (mm < 0) mm = 0;
  if (typeof hh === "undefined") hh = 12;
  if (typeof mi === "undefined") mi = 0;
  utcD = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));

  if (mm == 0 && dd == 1 && utcD.getUTCHours() + utcD.getTimezoneOffset() / 60 < 0) {
    utcD.setUTCHours(0);
  } else {
    utcD.setUTCHours(utcD.getUTCHours() + utcD.getTimezoneOffset() / 60);
  }
  return utcD;
}

function date(d, cond) {
  var yy = void 0,
      mm = void 0,
      dd = void 0,
      hh = void 0,
      mi = void 0,
      aDateTime = void 0,
      aTimes = void 0,
      aTime = void 0,
      aDate = void 0,
      va = void 0,
      ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i,
      ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

  if (isString(d)) {
    if (d.length == 0) {
      d = new Date();
    } else if (d.length > 15) {
      if (ISO_8601_FULL.test(d) || ISO_8601.test(d)) {
        d = new Date(d);
      } else {
        aDateTime = d.split(/ /g), aTimes, aTime, aDate = aDateTime[0].split(/\D/g), yy = aDate[0];
        mm = parseFloat(aDate[1]);
        dd = parseFloat(aDate[2]);
        aTime = aDateTime[1] || "09:00";
        aTimes = aTime.substring(0, 5).split(":");
        hh = parseFloat(aTimes[0]);
        mi = parseFloat(aTimes[1]);
        if (right(aTime, 2) === "AM" || right(aTime, 2) === "PM") hh += 12;
        d = localDate(yy, mm - 1, dd, hh, mi);
      }
    } else if (d.length == 14) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, number(va.substr(6, 2)), number(va.substr(8, 2)), number(va.substr(10, 2)), number(va.substr(12, 2)));
    } else if (d.length > 7) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, number(va.substr(6, 2)));
    } else if (d.length > 4) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
    } else if (d.length > 2) {
      va = d.replace(/\D/g, "");
      return localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
    } else {
      d = new Date();
    }
  }
  if (typeof cond === "undefined" || typeof d === "undefined") {
    return d;
  } else {
    if ("add" in cond) {
      d = function (_d, opts) {
        var yy = void 0,
            mm = void 0,
            dd = void 0,
            mxdd = void 0,
            DyMilli = 1000 * 60 * 60 * 24;

        if (typeof opts["d"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["d"] * DyMilli);
        } else if (typeof opts["m"] !== "undefined") {
          yy = _d.getFullYear();
          mm = _d.getMonth();
          dd = _d.getDate();
          yy = yy + parseInt(opts["m"] / 12);
          mm += opts["m"] % 12;
          mxdd = daysOfMonth(yy, mm);
          if (mxdd < dd) dd = mxdd;
          _d = new Date(yy, mm, dd, 12);
        } else if (typeof opts["y"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["y"] * 365 * DyMilli);
        } else if (typeof opts["h"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["h"] * 1000 * 60 * 60);
        }

        return _d;
      }(new Date(d), cond["add"]);
    }
    if ("set" in cond) {
      d = function (_d, opts) {
        var yy = void 0,
            mm = void 0,
            dd = void 0,
            processor = {
          "firstDayOfMonth": function firstDayOfMonth(date) {
            yy = date.getFullYear();
            mm = date.getMonth();
            dd = 1;
            return new Date(yy, mm, dd, 12);
          },
          "lastDayOfMonth": function lastDayOfMonth(date) {
            yy = date.getFullYear();
            mm = date.getMonth();
            dd = daysOfMonth(yy, mm);
            return new Date(yy, mm, dd, 12);
          }
        };
        if (opts in processor) {
          return processor[opts](_d);
        } else {
          return _d;
        }
      }(new Date(d), cond["set"]);
    }
    if ("return" in cond) {
      return function () {

        var fStr = cond["return"],
            nY = void 0,
            nM = void 0,
            nD = void 0,
            nH = void 0,
            nMM = void 0,
            nS = void 0,
            nDW = void 0,
            yre = void 0,
            regY = void 0,
            mre = void 0,
            regM = void 0,
            dre = void 0,
            regD = void 0,
            hre = void 0,
            regH = void 0,
            mire = void 0,
            regMI = void 0,
            sre = void 0,
            regS = void 0,
            dwre = void 0,
            regDW = void 0;

        nY = d.getUTCFullYear();
        nM = setDigit(d.getMonth() + 1, 2);
        nD = setDigit(d.getDate(), 2);
        nH = setDigit(d.getHours(), 2);
        nMM = setDigit(d.getMinutes(), 2);
        nS = setDigit(d.getSeconds(), 2);
        nDW = d.getDay();

        yre = /[^y]*(yyyy)[^y]*/gi;
        yre.exec(fStr);
        regY = RegExp.$1;
        mre = /[^m]*(MM)[^m]*/g;
        mre.exec(fStr);
        regM = RegExp.$1;
        dre = /[^d]*(dd)[^d]*/gi;
        dre.exec(fStr);
        regD = RegExp.$1;
        hre = /[^h]*(hh)[^h]*/gi;
        hre.exec(fStr);
        regH = RegExp.$1;
        mire = /[^m]*(mm)[^i]*/g;
        mire.exec(fStr);
        regMI = RegExp.$1;
        sre = /[^s]*(ss)[^s]*/gi;
        sre.exec(fStr);
        regS = RegExp.$1;
        dwre = /[^d]*(dw)[^w]*/gi;
        dwre.exec(fStr);
        regDW = RegExp.$1;

        if (regY === "yyyy") {
          fStr = fStr.replace(regY, right(nY, regY.length));
        }
        if (regM === "MM") {
          if (regM.length == 1) nM = d.getMonth() + 1;
          fStr = fStr.replace(regM, nM);
        }
        if (regD === "dd") {
          if (regD.length == 1) nD = d.getDate();
          fStr = fStr.replace(regD, nD);
        }
        if (regH === "hh") {
          fStr = fStr.replace(regH, nH);
        }
        if (regMI === "mm") {
          fStr = fStr.replace(regMI, nMM);
        }
        if (regS === "ss") {
          fStr = fStr.replace(regS, nS);
        }
        if (regDW == "dw") {
          fStr = fStr.replace(regDW, _AX6Info2.default.weekNames[nDW].label);
        }
        return fStr;
      }();
    } else {
      return d;
    }
  }
}

function dday(d, cond) {
  var memoryDay = date(d),
      DyMilli = 1000 * 60 * 60 * 24,
      today = new Date(),
      diffnum = void 0,
      thisYearMemoryDay = void 0;

  function getDayTime(_d) {
    return Math.floor(_d.getTime() / DyMilli) * DyMilli;
  }

  if (typeof cond === "undefined") {
    diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    return diffnum;
  } else {
    diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    if (cond["today"]) {
      today = date(cond.today);
      diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    }
    if (cond["thisYear"]) {
      thisYearMemoryDay = new Date(today.getFullYear(), memoryDay.getMonth(), memoryDay.getDate());
      diffnum = number((getDayTime(thisYearMemoryDay) - getDayTime(today)) / DyMilli, { floor: true });
      if (diffnum < 0) {
        thisYearMemoryDay = new Date(today.getFullYear() + 1, memoryDay.getMonth(), memoryDay.getDate());
        diffnum = number((getDayTime(thisYearMemoryDay) - getDayTime(today)) / DyMilli, { floor: true });
      }
    }
    if (cond["age"]) {
      thisYearMemoryDay = new Date(today.getFullYear(), memoryDay.getMonth(), memoryDay.getDate());
      diffnum = thisYearMemoryDay.getFullYear() - memoryDay.getFullYear();
    }

    return diffnum;
  }
}

function weeksOfMonth(d) {
  var myDate = date(d);
  return {
    year: myDate.getFullYear(),
    month: myDate.getMonth() + 1,
    count: parseInt(myDate.getDate() / 7 + 1)
  };
}

function daysOfMonth(y, m) {
  if (m == 3 || m == 5 || m == 8 || m == 10) {
    return 30;
  } else if (m == 1) {
    return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
  } else {
    return 31;
  }
}

function setDigit(num, length, padder, radix) {
  var s = num.toString(radix || 10);
  return times(padder || '0', length - s.length) + s;
}

function times(s, count) {
  return count < 1 ? '' : new Array(count + 1).join(s);
}

function findParentNode(_target, cond) {
  if (_target) {
    while (function () {
      var result = true;
      if (typeof cond === "undefined") {
        _target = _target.parentNode ? _target.parentNode : false;
      } else if (isFunction(cond)) {
        result = cond(_target);
      } else if (isObject(cond)) {
        for (var k in cond) {
          if (k === "tagname") {
            if (_target.tagName.toLocaleLowerCase() != cond[k]) {
              result = false;
              break;
            }
          } else if (k === "clazz" || k === "class_name") {
            if ("className" in _target) {
              var klasss = _target.className.split(reClassNameSplit),
                  hasClass = false;

              for (var a = 0; a < klasss.length; a++) {
                if (klasss[a] == cond[k]) {
                  hasClass = true;
                  break;
                }
              }
              result = hasClass;
            } else {
              result = false;
              break;
            }
          } else {
            // 그외 속성값들.
            if (_target.getAttribute) {
              if (_target.getAttribute(k) != cond[k]) {
                result = false;
                break;
              }
            } else {
              result = false;
              break;
            }
          }
        }
      }
      return !result;
    }()) {
      if (_target.parentNode && _target.parentNode.parentNode) {
        _target = _target.parentNode;
      } else {
        _target = false;
        break;
      }
    }
  }
  return _target;
}

function cssNumber(val) {
  var re = /\D?(\d+)([a-zA-Z%]*)/i,
      found = ('' + val).match(re),
      unit = found[2] || "px";

  return found[1] + unit;
}

function css(val) {
  var returns = void 0;
  if (isObject(val)) {
    returns = '';
    for (var k in val) {
      returns += k + ':' + val[k] + ';';
    }
    return returns;
  } else if (isString(val)) {
    returns = {};
    var valSplited = val.split(/[ ]*;[ ]*/g);
    valSplited.forEach(function (v) {
      if ((v = v.trim()) !== "") {
        var vSplited = v.split(/[ ]*:[ ]*/g);
        returns[vSplited[0]] = vSplited[1];
      }
    });
    return returns;
  }
}

function stopEvent(e) {
  // 이벤트 중지 구문
  if (!e) e = window.event;

  //e.cancelBubble is supported by IE -
  // this will kill the bubbling process.
  e.cancelBubble = true;
  e.returnValue = false;

  //e.stopPropagation works only in Firefox.
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();

  return false;
  // 이벤트 중지 구문 끝
}

var selectRange = function () {
  var processor = {
    'textRange': {
      'selectAll': function selectAll(el, range, offset) {},
      'arr': function arr(el, range, offset) {
        range.moveStart("character", offset[0]); // todo ie node select 체크필요
        range.collapse();
        range.moveEnd("character", offset[1]);
      },
      'start': function start(el, range, offset) {
        range.moveStart("character", 0);
        range.collapse();
      },
      'end': function end(el, range, offset) {
        range.moveStart("character", range.text.length);
        range.collapse();
      }
    },
    'range': {
      'selectAll': function selectAll(el, range, offset) {
        range.selectNodeContents(el);
      },
      'arr': function arr(el, range, offset) {
        if (isObject(offset[0])) {
          range.setStart(offset[0].node, offset[0].offset);
          range.setEnd(offset[1].node, offset[1].offset);
        } else {
          range.setStart(el.firstChild, offset[0]);
          range.setEnd(el.firstChild, offset[1]);
        }
      },
      'start': function start(el, range, offset) {
        range.selectNodeContents(el);
        range.collapse(true);
      },
      'end': function end(el, range, offset) {
        range.selectNodeContents(el);
        range.collapse(false);
      }
    }
  };
  return function (el, offset) {
    var range = void 0,
        rangeType = void 0,
        selection = void 0;

    if (el instanceof jQuery) {
      el = el.get(0);
    }
    if (!el) return;

    // 레인지 타입 선택
    if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(el);
      rangeType = "textRange";
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      rangeType = "range";
    }

    // range 적용
    if (typeof offset == "undefined") {
      processor[rangeType].selectAll.call(this, el, range, offset);
    } else if (isArray(offset)) {
      processor[rangeType].arr.call(this, el, range, offset);
    } else {
      for (var key in processor[rangeType]) {
        if (offset == key) {
          processor[rangeType][key].call(this, el, range, offset);
          break;
        }
      }
    }

    // 포커스 및 셀렉트
    if (doc.body.createTextRange) {
      range.select();
      el.focus();
    } else if (window.getSelection) {
      el.focus();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
}();

// https://github.com/lodash/lodash/blob/master/debounce.js
var debounce = function debounce(func, wait, options) {
  var lastArgs = void 0,
      lastThis = void 0,
      maxWait = void 0,
      result = void 0,
      timerId = void 0,
      lastCallTime = void 0;

  var lastInvokeTime = 0;
  var leading = false;
  var maxing = false;
  var trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs;
    var thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    var result = wait - timeSinceLastCall;

    return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced() {
    var time = Date.now();
    var isInvoking = shouldInvoke(time);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};

//https://github.com/lodash/lodash/blob/master/throttle.js
var throttle = function throttle(func, wait, options) {
  var leading = true;
  var trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
};

function deepCopy(obj) {
  var r = void 0,
      l = void 0;
  if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == 'object') {
    if (isArray(obj)) {
      l = obj.length;
      r = new Array(l);
      for (var i = 0; i < l; i++) {
        r[i] = deepCopy(obj[i]);
      }
      return r;
    } else {
      return Object.assign({}, obj);
    }
  }
  return obj;
}

function escapeHtml(s) {
  if (_toString.call(s) != "[object String]") return s;
  if (!s) return "";
  return s.replace(/[\<\>\&\"]/gm, function (match) {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\"":
        return "&quot;";
      default:
        return match;
    }
  });
}

function unescapeHtml(s) {
  if (_toString.call(s) != "[object String]") return s;
  if (!s) return "";
  return s.replace(/(&lt;)|(&gt;)|(&amp;)|(&quot;)/gm, function (match) {
    switch (match) {
      case "&lt;":
        return "<";
      case "&gt;":
        return ">";
      case "&amp;":
        return "&";
      case "&quot;":
        return "\"";
      default:
        return match;
    }
  });
}

/**
 * @namespace ax6string
 * @example
 * ```js
 * AX6Util.string("{0} is dead").format("A");
 * AX6Util.string("String").escape();
 * AX6Util.string("String").unescape();
 * AX6Util.string("String").encode();
 * AX6Util.string("String").decode();
 * AX6Util.string("String").left(1);
 * AX6Util.string("String").right(1);
 * AX6Util.string("String").camelCase();
 * AX6Util.string("String").snakeCase();
 * ```
 */

function string(_string) {
  return new function (_string) {
    this.value = _string;
    this.toString = function () {
      return this.value;
    };
    this.format = function () {
      var args = [];
      for (var i = 0, l = arguments.length; i < l; i++) {
        args = args.concat(arguments[i]);
      }
      return this.value.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    };
    this.escape = function () {
      return escapeHtml(this.value);
    };
    this.unescape = function () {
      return unescapeHtml(this.value);
    };
    this.encode = function () {
      return encode(this.value);
    };
    this.decode = function () {
      return decode(this.value);
    };
    this.left = function (_pos) {
      return left(this.value, _pos);
    };
    this.right = function (_pos) {
      return right(this.value, _pos);
    };
    this.camelCase = function () {
      return camelCase(this.value);
    };
    this.snakeCase = function () {
      return snakeCase(this.value);
    };
  }(_string);
}

function color(_hexColor) {

  var matchers = function () {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }();

  var convertObject = function convertObject(_color) {
    var match = void 0;
    if (match = matchers.rgb.exec(_color)) {
      return { r: match[1], g: match[2], b: match[3] };
    }
    if (match = matchers.rgba.exec(_color)) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if (match = matchers.hsl.exec(_color)) {
      return { h: match[1], s: match[2], l: match[3] };
    }
    if (match = matchers.hsla.exec(_color)) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if (match = matchers.hsv.exec(_color)) {
      return { h: match[1], s: match[2], v: match[3] };
    }
    if (match = matchers.hsva.exec(_color)) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if (match = matchers.hex8.exec(_color)) {
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
        a: parseInt(match[4] / 255, 16),
        format: "hex8"
      };
    }
    if (match = matchers.hex6.exec(_color)) {
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
        format: "hex"
      };
    }
    if (match = matchers.hex4.exec(_color)) {
      return {
        r: parseInt(match[1] + '' + match[1], 16),
        g: parseInt(match[2] + '' + match[2], 16),
        b: parseInt(match[3] + '' + match[3], 16),
        a: parseInt(match[4] + '' + match[4], 16),
        format: "hex8"
      };
    }
    if (match = matchers.hex3.exec(_color)) {
      return {
        r: parseInt(match[1] + '' + match[1], 16),
        g: parseInt(match[2] + '' + match[2], 16),
        b: parseInt(match[3] + '' + match[3], 16),
        format: "hex"
      };
    }

    return false;
  };

  function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
  }

  function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
  }

  function convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }

    return n;
  }

  function convertTo255(n) {
    return number(Math.min(255, Math.max(n, 0)), { 'round': 2 });
  }

  function convertToHex(n) {
    return setDigit(Math.round(n).toString(16), 2);
  }

  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }

    var processPercent = isPercentage(n);
    n = Math.min(max, Math.max(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
      n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
      return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return n % max / parseFloat(max);
  }

  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h = void 0,
        s = void 0,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h: h, s: s, l: l };
  }

  function hslToRgb(h, s, l) {
    var r = void 0,
        g = void 0,
        b = void 0;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
  }

  return new function (_color) {
    this._originalValue = _color;
    _color = convertObject(_color);
    this.r = _color.r;
    this.g = _color.g;
    this.b = _color.b;
    this.a = _color.a || 1;
    this._format = _color.format;
    this._hex = convertToHex(this.r) + convertToHex(this.g) + convertToHex(this.b);

    this.getHexValue = function () {
      return this._hex;
    };

    this.lighten = function (amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = rgbToHsl(this.r, this.g, this.b),
          rgb = {};

      hsl.l += amount / 100;
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;

      rgb = hslToRgb(hsl.h, convertToPercentage(hsl.s), convertToPercentage(hsl.l));

      return color('rgba(' + convertTo255(rgb.r) + ', ' + convertTo255(rgb.g) + ', ' + convertTo255(rgb.b) + ', ' + this.a + ')');
    };

    this.darken = function (amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = rgbToHsl(this.r, this.g, this.b),
          rgb = {};

      hsl.l -= amount / 100;
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;

      rgb = hslToRgb(hsl.h, convertToPercentage(hsl.s), convertToPercentage(hsl.l));

      return color('rgba(' + convertTo255(rgb.r) + ', ' + convertTo255(rgb.g) + ', ' + convertTo255(rgb.b) + ', ' + this.a + ')');
    };

    this.getBrightness = function () {
      return (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    };

    this.isDark = function () {
      return this.getBrightness() < 128;
    };

    this.isLight = function () {
      return !this.isDark();
    };

    this.getHsl = function () {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l
      };
    };
  }(_hexColor);
}

exports.default = {

  /**
   * jsonString 으로 alert 합니다.
   * @param {Object|Array|String|Number} O
   * @returns {Object|Array|String|Number} O
   * @example ```js
   * AX6Util.alert({a:1,b:2});
   * AX6Util.alert("정말?");
   * ```
   */
  alert: alert,
  /**
   * Object나 Array의 아이템으로 사용자 함수를 호출합니다.
   * @param {Object|Array} O
   * @param {Function} _fn
   * @example
   * ```js
   * var axf = AX6Util;
   * axf.each([0,1,2], function(){
   * 	// with this
   * });
   * axf.each({a:1, b:2}, function(){
   * 	// with this
   * });
   * ```
   */
  each: each,
  /**
   * 원본 아이템들을 이용하여 사용자 함수의 리턴값이 참인 아이템의 위치나 키값을 반환합니다.
   * @param {Object|Array} O
   * @param {Function|String|Number} _fn - 함수 또는 값
   * @returns {Number|String}
   * @example
   * ```js
   * var myArray = [0,1,2,3,4,5,6];
   * var myObject = {a:"123","b":"123",c:123};
   *
   * AX6Util.search(myArray,  function(){
   *    return this > 3;
   * });
   * // 4
   * AX6Util.search(myObject,  function(k, v){
   *    return v === 123;
   * });
   * // "c"
   * AX6Util.search([1,2,3,4], 3);
   * // 2
   * AX6Util.search([1,2], 4);
   * // -1
   * AX6Util.search(["name","value"], "value");
   * // 1
   * AX6Util.search(["name","value"], "values");
   * // -1
   * AX6Util.search({k1:"name",k2:"value"}, "value2");
   * // -1
   * AX6Util.search({k1:"name",k2:"value"}, "value");
   * // "k2"
   * ```
   */
  search: search,
  /**
   * 배열또는 오브젝트의 각 아이템을 인자로 하는 사용자 함수의 결과가 참인 아이템들의 배열을 반환합니다.
   * @param {Object|Array} O
   * @param {Function} _fn
   * @returns {Array}
   * @example
   * ```js
   * var aarray = [5,4,3,2,1];
   * result = AX6Util.filter( aarray, function(){
   *    return this % 2;
   * });
   * console.log(result);
   * // [5, 3, 1]
   *
   * var filObject = {a:1, s:"string", oa:{pickup:true, name:"AXISJ"}, os:{pickup:true, name:"AX5"}};
   * result = AX6Util.filter( filObject, function(){
   * 	return this.pickup;
   * });
   * console.log( AX6Util.toJson(result) );
   * // [{"pickup": , "name": "AXISJ"}, {"pickup": , "name": "AX5"}]
   * ```
   */
  filter: filter,
  /**
   * Object를 JSONString 으로 반환합니다.
   * @method AX6Util.toJson
   * @param {Object|Array} O
   * @returns {String} JSON
   * @example
   * ```js
   * var ax = AX6Util;
   * var myObject = {
   *    a:1, b:"2", c:{axj:"what", arrs:[0,2,"3"]},
   *    fn: function(abcdd){
   *        return abcdd;
   *    }
   * };
   * console.log( ax.toJson(myObject) );
   * ```
   */
  toJson: toJson,
  /**
   * 관용의 JSON Parser
   * @param {String} JSONString
   * @param {Boolean} [force] - 강제 적용 여부 (json 문자열 검사를 무시하고 오브젝트 변환을 시도합니다.)
   * @returns {Object}
   * @example
   * ```
   * console.log(AX6Util.parseJson('{"a":1}'));
   * // Object {a: 1}
   * console.log(AX6Util.parseJson("{'a':1, 'b':'b'}"));
   * // Object {a: 1, b: "b"}
   * console.log(AX6Util.parseJson("{'a':1, 'b':function(){return 1;}}", true));
   * // Object {a: 1, b: function}
   * console.log(AX6Util.parseJson("{a:1}"));
   * // Object {a: 1}
   * console.log(AX6Util.parseJson("[1,2,3]"));
   * // [1, 2, 3]
   * console.log(AX6Util.parseJson("['1','2','3']"));
   * // ["1", "2", "3"]
   * console.log(AX6Util.parseJson("[{'a':'99'},'2','3']"));
   * // [Object, "2", "3"]
   * ```
   */
  parseJson: parseJson,
  /**
   * 오브젝트의 첫번째 아이템을 반환합니다.
   * @param {Object|Array} O
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.first({a:1, b:2});
   * // Object {a: 1}
   * AX6Util.first([1,2,3,4]);
   * // 1
   * ```
   */
  first: first,
  /**
   * 오브젝트의 마지막 아이템을 반환합니다.
   * @param {Object|Array} O
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.last({a:1, b:2});
   * // Object {b: 2}
   * AX6Util.last([1,2,3,4]);
   * // 4
   * ```
   */
  last: last,
  /**
   * 문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.
   * @param {String} str - 문자열
   * @param {String|Number} pos - 찾을 문자열 또는 포지션
   * @returns {String}
   * @example
   * ```js
   * AX6Util.left("abcd.efd", 3);
   * // abc
   * AX6Util.left("abcd.efd", ".");
   * // abcd
   * ```
   */
  left: left,
  /**
   * 문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.
   * @param {String} str - 문자열
   * @param {String|Number} pos - 찾을 문자열 또는 포지션
   * @returns {String}
   * @example
   * ```js
   * AX6Util.right("abcd.efd", 3);
   * // efd
   * AX6Util.right("abcd.efd", ".");
   * // efd
   * ```
   */
  right: right,
  /**
   * 인자의 타입을 반환합니다.
   * @param {Object|Array|String|Number|Element|Etc} O
   * @returns {String} window|element|object|array|function|string|number|undefined|nodelist
   * @example
   * ```js
   * var axf = AX6Util;
   * var a = 11;
   * var b = "11";
   * console.log( axf.getType(a) );
   * console.log( axf.getType(b) );
   * ```
   */
  getType: getType,
  /**
   * 오브젝트가 window 인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isWindow: isWindow,
  /**
   * 오브젝트가 HTML 엘리먼트여부인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isElement: isElement,
  /**
   * 오브젝트가 Object인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isObject: isObject,
  /**
   * 오브젝트가 Array인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isArray: isArray,
  /**
   * 오브젝트가 Function인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isFunction: isFunction,
  /**
   * 오브젝트가 String인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isString: isString,
  /**
   * 오브젝트가 Number인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isNumber: isNumber,
  /**
   * 오브젝트가 NodeList인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isNodelist: isNodelist,
  /**
   * 오브젝트가 undefined인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isUndefined: isUndefined,
  /**
   * 오브젝트가 undefined이거나 null이거나 빈값인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  /**
   * 오브젝트가 날자값인지 판단합니다.
   * @param {Date} O
   * @returns {Boolean}
   * @example
   * ```js
   * AX6Util.isDate('2016-09-30');
   * // false
   * AX6Util.isDate( new Date('2016-09-30') );
   * // true
   * ```
   */
  isDate: isDate,
  /**
   * 오브젝트가 날짜형 변수인지 판단합니다
   */
  isDateFormat: isDateFormat,
  isNothing: isNothing,
  /**
   * 쿠키를 설정합니다.
   * @param {String} cname - 쿠키이름
   * @param {String} cvalue - 쿠키값
   * @param {Number} [exdays] - 쿠키 유지일수
   * @param {Object} [opts] - path, domain 설정 옵션
   * @example
   * ```js
   * AX6Util.setCookie("jslib", "AX5");
   * AX6Util.setCookie("jslib", "AX5", 3);
   * AX6Util.setCookie("jslib", "AX5", 3, {path:"/", domain:".axisj.com"});
   * ```
   */
  setCookie: setCookie,
  /**
   * 쿠키를 가져옵니다.
   * @param {String} cname
   * @returns {String} cookie value
   * @example
   * ```js
   * AX6Util.getCookie("jslib");
   * ```
   */
  getCookie: getCookie,
  /**
   * css형 문자열이나 특수문자가 포함된 문자열을 카멜케이스로 바꾸어 반환합니다.
   * @param {String} str
   * @returns {String}
   * @example
   * ```js
   * AX6Util.camelCase("inner-width");
   * AX6Util.camelCase("innerWidth");
   * // innerWidth
   * ```
   */
  camelCase: camelCase,
  /**
   * css형 문자열이나 카멜케이스문자열을 스네이크 케이스 문자열로 바꾸어 반환합니다.
   * @param {String} str
   * @returns {String}
   * @example
   * ```js
   * AX6Util.snakeCase("innerWidth");
   * AX6Util.snakeCase("inner-Width");
   * AX6Util.snakeCase("innerWidth");
   * // inner-width
   * ```
   */
  snakeCase: snakeCase,
  /**
   * 문자열에서 -. 을 제외한 모든 문자열을 제거하고 숫자로 반환합니다. 옵션에 따라 원하는 형식의 숫자로 변환 할 수 도 있습니다.
   * @param {String|Number} str
   * @param {Object} cond - 옵션
   * @returns {String|Number}
   * @example
   * ```js
   * var cond = {
   * 	round: {Number|Boolean} - 반올림할 자릿수,
   * 	money: {Boolean} - 통화,
   * 	abs: {Boolean} - 절대값,
   * 	byte: {Boolean} - 바이트
   * }
   *
   * console.log(AX6Util.number(123456789.678, {round:1}));
   * console.log(AX6Util.number(123456789.678, {round:1, money:true}));
   * console.log(AX6Util.number(123456789.678, {round:2, byte:true}));
   * console.log(AX6Util.number(-123456789.8888, {abs:true, round:2, money:true}));
   * console.log(AX6Util.number("A-1234~~56789.8~888PX", {abs:true, round:2, money:true}));
   *
   * //123456789.7
   * //123,456,789.7
   * //117.7MB
   * //123,456,789.89
   * //123,456,789.89
   * ```
   */
  number: number,
  /**
   * 배열 비슷한 오브젝트를 배열로 변환해줍니다.
   * @param {Object|Elements|Arguments} O
   * @returns {Array}
   * @example
   * ```js
   * AX6Util.toArray(arguments);
   * //
   * ```
   */
  toArray: toArray,
  /**
   * 오브젝트를 파라미터형식으로 또는 파라미터를 오브젝트 형식으로 변환합니다.
   * @param {Object|Array|String} O
   * @param {String} [cond] - param|object
   * @returns {Object|String}
   * @example
   * ```
   * AX6Util.param({a:1,b:'1232'}, "param");
   * AX6Util.param("a=1&b=1232", "param");
   * // "a=1&b=1232"
   * AX6Util.param("a=1&b=1232");
   * // {a: "1", b: "1232"}
   * ```
   */
  param: param,
  error: error,
  /**
   * 날짜 형식의 문자열이나 Date객체를 조건에 맞게 처리 한 후 원하는 return 값으로 반환합니다.
   * @param {String|Date} d
   * @param {Object} cond
   * @returns {Date|String}
   * @example
   * ```js
   * AX6Util.date('2013-01-01'); // Tue Jan 01 2013 23:59:00 GMT+0900 (KST)
   * AX6Util.date((new Date()), {add:{d:10}, return:'yyyy/MM/dd'}); // "2015/07/01"
   * AX6Util.date('1919-03-01', {add:{d:10}, return:'yyyy/MM/dd hh:mm:ss'}); // "1919/03/11 23:59:00"
   * ```
   */
  date: date,
  /**
   * 인자인 날짜가 오늘부터 몇일전인지 반환합니다. 또는 인자인 날짜가 가까운 미래에 몇일 후인지 반환합니다.
   * @param {String|Data} d
   * @param {Object} cond
   * @returns {Number}
   * @example
   * ```js
   * AX6Util.dday('2016-01-29');
   * // 1
   * AX6Util.dday('2016-01-29', {today:'2016-01-28'});
   * // 1
   * AX6Util.dday('1977-03-29', {today:'2016-01-28', age:true});
   * // 39
   * ```
   */
  dday: dday,
  /**
   * 년월에 맞는 날자수를 반환합니다.
   * (new Date()).getMonth() 기준으로 월값을 보냅니다. "2월" 인경우 "1" 을 넘기게 됩니다.
   * @param {Number} y
   * @param {Number} m
   * @returns {Number}
   * @examples
   * ```js
   * AX6Util.daysOfMonth(2015, 11); // 31
   * AX6Util.daysOfMonth(2015, 1); // 28
   * ```
   */
  daysOfMonth: daysOfMonth,
  /**
   * 인자인 날짜가 몇년 몇월의 몇번째 주차인지 반환합니다.
   * @param {String|Data} d
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.weeksOfMonth("2015-10-01"); // {year: 2015, month: 10, count: 1}
   * AX6Util.weeksOfMonth("2015-09-19"); // {year: 2015, month: 9, count: 3}
   * ```
   */
  weeksOfMonth: weeksOfMonth,
  /**
   * 원하는 횟수 만큼 자릿수 맞춤 문자열을 포함한 문자열을 반환합니다.
   * 문자열 길이보다 작은값을 보내면 무시됩니다.
   * @param {String|Number} num
   * @param {Number} length
   * @param {String} [padder=0]
   * @param {Number} [radix]
   * @returns {String}
   * @example
   * ```
   * AX6Util.setDigit(2016, 6)
   * // "002016"
   * AX6Util.setDigit(2016, 2)
   * // "2016"
   * ```
   */
  setDigit: setDigit,
  /**
   * 문자열을 지정된 수만큼 반복 합니다.
   * @param {String} s
   * @param {Number} count
   * @returns {string}
   * @example
   * ```
   * AX6Util.times(2016, 2)
   * //"20162016"
   * ```
   */
  times: times,
  /**
   * 타겟엘리먼트의 부모 엘리멘트 트리에서 원하는 조건의 엘리먼트를 얻습니다.
   * @param {Element} _target - target element
   * @param {Object|Function} cond - 원하는 element를 찾을 조건
   * @returns {Element}
   * @example
   * ```
   * // cond 속성정의
   * var cond = {
   * 	tagname: {String} - 태그명 (ex. a, div, span..),
   * 	clazz: {String} - 클래스명
   * 	[, 그 외 찾고 싶은 attribute명들]
   * };
   * console.log(
   * console.log(
   *    AX6Util.findParentNode(e.target, {tagname:"a", clazz:"ax-menu-handel", "data-custom-attr":"attr_value"})
   * );
   * // cond 함수로 처리하기
   * jQuery('#id').bind("click.app_expand", function(e){
   * 	var target = AX6Util.findParentNode(e.target, function(target){
   * 		if($(target).hasClass("aside")){
   * 			return true;
   * 		}
   * 		else{
   * 			return true;
   * 		}
   * 	});
   * 	//client-aside
   * 	if(target.id !== "client-aside"){
   * 		// some action
   * 	}
   * });
   * ```
   */
  findParentNode: findParentNode,
  /**
   * @param {String|Number} val
   * @returns {String}
   * @example
   * ```
   * console.log(AX6Util.cssNumber("100px"))
   * console.log(AX6Util.cssNumber("100%"))
   * console.log(AX6Util.cssNumber("100"))
   * console.log(AX6Util.cssNumber(100))
   * console.log(AX6Util.cssNumber("!!100@#"))
   * ```
   */
  cssNumber: cssNumber,
  /**
   * css string 및 object 를 넘기면 object 및 string 으로 변환되어 리턴됩니다.
   * @param {Object|String} val - CSS String or CSS Object
   * @returns {String|Object}
   * @example
   * ```
   * console.log(AX6Util.css({background: "#ccc", padding: "50px", width: "100px"}));
   * //"background:#ccc;padding:50px;width:100px;"
   * console.log(AX6Util.css('width:100px;padding: 50px; background: #ccc'));
   * // object {width: "100px", padding: "50px", background: "#ccc"}
   * ```
   */
  css: css,
  /**
   * @param {Event} e
   * @example
   * ```
   * AX6Util.stopEvent(e);
   * ```
   */
  stopEvent: stopEvent,
  /**
   * @param {Element} el
   * @param {Element} offset
   * @example
   * ```
   * AX6Util.selectRange($("#select-test-0")); // selectAll
   * AX6Util.selectRange($("#select-test-0"), "selectAll"); //selectAll
   * AX6Util.selectRange($("#select-test-0"), "start"); // focus on start
   * AX6Util.selectRange($("#select-test-0"), "end"); // focus on end
   * AX6Util.selectRange($("#select-test-0"), [1, 5]); // select 1~5
   * ```
   */
  selectRange: selectRange,
  /**
   * 지정한 시간을 지연시켜 함수를 실행합니다.
   * @param {Function} func
   * @param {Number} wait
   * @param {Object} options
   * @returns {debounced}
   * @example
   * ```js
   * // https://github.com/lodash/lodash/blob/master/debounce.js
   * var debounceFn = AX6Util.debounce(function( val ) { console.log(val); }, 300);
   * $(document.body).click(function(){
         *  debounceFn(new Date());
         * });
   * ```
   */
  debounce: debounce,
  /**
   * @param func
   * @param wait
   * @param options
   * @return {throttled}
   * @example
   * ```js
   * //https://github.com/lodash/lodash/blob/master/throttle.js
   * var throttleFn = AX6Util.throttle(function( val ) { console.log(val); }, 300);
   * $(window).scroll(function(){
     *      throttleFn(new Date());
     * });
   * ```
   */
  throttle: throttle,
  /**
   * @param {Object} obj
   * @returns {Object}
   * @example
   * ```js
   * var obj = [
   *  {name:"A", child:[{name:"a-1"}]},
   *  {name:"B", child:[{name:"b-1"}], callBack: function(){ console.log('callBack'); }}
   * ];
   * var copiedObj = AX6Util.deepCopy(obj)
   * ```
   */
  deepCopy: deepCopy,
  /**
   * HTML 문자열을 escape 처리합니다.
   * "&lt;" represents the < sign.
   * "&gt;" represents the > sign.
   * "&amp;" represents the & sign.
   * "&quot; represents the " mark.
   * [Character entity references](https://www.w3.org/TR/html401/charset.html#h-5.3)
   * @param {String} s
   * @returns {string}
   * @example
   * ```
   * AX6Util.escapeHtml('HTML <span>string</span> & "escape"')
   * //"HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;"
   * ```
   */
  escapeHtml: escapeHtml,
  /**
   * HTML 문자열을 unescape 처리합니다.
   * escapeHtml를 참고하세요.
   * @param {String} s
   * @returns {string}
   * @example
   * ```
   * AX6Util.unescapeHtml('HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;')
   * //"HTML <span>string</span> & "escape""
   * ```
   */
  unescapeHtml: unescapeHtml,
  /**
   * @param {String} tmpl
   * @param {*} args
   * @return {ax6string}
   * @example
   * ```js
   * AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format("ASP", "ASP.NET");
   * AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format(["ASP", "ASP.NET"]);
   * AX6Util.stinrg("{0} counts").format(100);
   * ```
   */
  string: string,
  /**
   * @param _hexColor
   * @return {ax5color}
   * @example
   * ```js
   * AX6Util.color("#ff3300").lighten(10).getHexValue()
   * console.log(AX6Util.color("#ff3300").darken(10).getHexValue());
   * ```
   */
  color: color
};

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = window;
var doc = win ? win.document : null;
var docElem = win ? win.document.documentElement : null;

var eventKeys = {
  BACKSPACE: 8, TAB: 9,
  RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
  HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
};
var weekNames = [{ label: "SUN" }, { label: "MON" }, { label: "TUE" }, { label: "WED" }, { label: "THU" }, { label: "FRI" }, { label: "SAT" }];
var wheelEnm = win && /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
var errorMsg = {};

var onerror = function onerror() {
  console.error(arguments);
};
var browser = function (ua, mobile, browserName, match, browser, browserVersion) {
  if (!win || !win.navigator) return {};

  ua = navigator.userAgent.toLowerCase(), mobile = ua.search(/mobile/g) != -1, browserName, match, browser, browserVersion;

  if (ua.search(/iphone/g) != -1) {
    return { name: "iphone", version: 0, mobile: true };
  } else if (ua.search(/ipad/g) != -1) {
    return { name: "ipad", version: 0, mobile: true };
  } else if (ua.search(/android/g) != -1) {
    match = /(android)[ \/]([\w.]+)/.exec(ua) || [];
    browserVersion = match[2] || "0";
    return { name: "android", version: browserVersion, mobile: mobile };
  } else {
    browserName = "";
    match = /(opr)[ \/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    browser = match[1] || "";
    browserVersion = match[2] || "0";

    if (browser == "msie") browser = "ie";
    return {
      name: browser,
      version: browserVersion,
      mobile: mobile
    };
  }
  ua = null, mobile = null, browserName = null, match = null, browser = null, browserVersion = null;
}();
var isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && win.document);
var urlUtil = function urlUtil(url, urls) {
  url = {
    href: win.location.href,
    param: win.location.search,
    referrer: doc.referrer,
    pathname: win.location.pathname,
    hostname: win.location.hostname,
    port: win.location.port
  };
  urls = url.href.split(/[\?#]/);
  url.param = url.param.replace("?", "");
  url.url = urls[0];
  if (url.href.search("#") > -1) {
    url.hashdata = urls[urls.length - 1];
  }
  urls = null;
  url.baseUrl = url.href.substr(0, url.href.indexOf("?")).replace(url.pathname, "");

  return url;
};
var getError = function getError(className, errorCode, methodName) {
  if (errorMsg && errorMsg[className]) {
    return {
      className: className,
      errorCode: errorCode,
      methodName: methodName,
      msg: errorMsg[className][errorCode]
    };
  } else {
    return { className: className, errorCode: errorCode, methodName: methodName };
  }
};
var supportTouch = win ? 'ontouchstart' in win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 : false;
var supportFileApi = win ? win.FileReader && win.File && win.FileList && win.Blob : false;

/**
 * @module AX6Info
 */
exports.default = {
  /**
   * 첫번째 자리수 동사 - (필요한것이 없을때 : 4, 실행오류 : 5)
   * 두번째 자리수 목적어 - 문자열 0, 숫자 1, 배열 2, 오브젝트 3, 함수 4, DOM 5, 파일 6, 기타 7
   * 세번째 자리수 옵션
   */
  errorMsg: errorMsg,
  /**
   * 에러 출력메세지 사용자 재 정의
   * @example
   * ```
   * AX6Info.onerror = function(){
   *  console.log(arguments);
   * }
   * ```
   */
  onerror: onerror,
  /**
   * event keyCodes
   * @example
   * ```
   * {
   * 	BACKSPACE: 8, TAB: 9,
   * 	RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
   * 	HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
   * }
   * ```
   */
  eventKeys: eventKeys,
  /**
   * week names
   * @example
   * ```
   * [
   *  {label: "SUN"},{label: "MON"},{label: "TUE"},{label: "WED"},{label: "THU"},{label: "FRI"},{label: "SAT"}
   * ]
   * console.log( weekNames[0] );
   * console.log( AX6Info.weekNames[(new Date()).getDay()].label )
   * ```
   */
  weekNames: weekNames,
  /**
   * 사용자 브라우저 식별용 오브젝트
   * @example
   * ```
   * console.log( AX6Info.browser );
   * //Object {name: "chrome", version: "39.0.2171.71", mobile: false}
   * ```
   */
  browser: browser,
  /**
   * 브라우저 여부
   */
  isBrowser: isBrowser,
  /**
   * 브라우져의 터치 가능 유무를 확인합니다.
   * @returns {boolean}
   * @example
   * ```
   * var chkFlag = AX6Info.supportTouch;
   */
  supportTouch: supportTouch,
  /**
   * HTML5 FileApi 지원여부
   */
  supportFileApi: supportFileApi,
  /**
   * 브라우저에 따른 마우스 휠 이벤트이름
   */
  wheelEnm: wheelEnm,
  /**
   * 현재 페이지의 Url 정보를 리턴합니다.
   * @example
   * ```
   * console.log( ax5.util.toJson( AX6Info.urlUtil() ) );
   * {
   *	"baseUrl": "http://ax5:2018",
   *	"href": "http://ax5:2018/samples/index.html?a=1&b=1#abc",
   *	"param": "a=1&b=1",
   *	"referrer": "",
   *	"pathname": "/samples/index.html",
   *	"hostname": "ax5",
   *	"port": "2018",
   *	"url": "http://ax5:2018/samples/index.html",
   *	"hashdata": "abc"
   * }
   * ```
   */
  urlUtil: urlUtil,
  /**
   * ax5-error-msg.js 에 정의된 ax5 error를 반환합니다.
   * @returns {Object}
   * @example
   * ```
   * console.log( AX6Info.getError("single-uploader", "460", "upload") );
   *
   * if(!this.selectedFile){
   *      if (cfg.onEvent) {
   *      	var that = {
   *      		action: "error",
   *      		error: AX6Info.getError("single-uploader", "460", "upload")
   *      	};
   *      	cfg.onEvent.call(that, that);
   *      }
   *      return this;
   * }
   * ```
   */
  getError: getError
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-event/alias,-css/showHide,-css/hiddenVisibleSelectors
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-07-14T08:07Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-event/alias,-css/showHide,-css/hiddenVisibleSelectors",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var documentElement = document.documentElement;



/*
 * Optional (non-Sizzle) selector module for custom builds.
 *
 * Note that this DOES NOT SUPPORT many documented jQuery
 * features in exchange for its smaller size:
 *
 * Attribute not equal selector
 * Positional selectors (:first; :eq(n); :odd; etc.)
 * Type selectors (:input; :checkbox; :button; etc.)
 * State-based selectors (:animated; :visible; :hidden; etc.)
 * :has(selector)
 * :not(complex selector)
 * custom selectors via Sizzle extensions
 * Leading combinators (e.g., $collection.find("> *"))
 * Reliable functionality on XML fragments
 * Requiring all parts of a selector to match elements under context
 *   (e.g., $div.find("div > *") now matches children of $div)
 * Matching against non-elements
 * Reliable sorting of disconnected nodes
 * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
 *
 * If any of these are unacceptable tradeoffs, either use Sizzle or
 * customize this stub for the project's specific needs.
 */

var hasDuplicate, sortInput,
	sortStable = jQuery.expando.split( "" ).sort( sortOrder ).join( "" ) === jQuery.expando,
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.mozMatchesSelector ||
		documentElement.oMatchesSelector ||
		documentElement.msMatchesSelector,

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	};

function sortOrder( a, b ) {

	// Flag for duplicate removal
	if ( a === b ) {
		hasDuplicate = true;
		return 0;
	}

	// Sort on method existence if only one input has compareDocumentPosition
	var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	if ( compare ) {
		return compare;
	}

	// Calculate position if both inputs belong to the same document
	compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
		a.compareDocumentPosition( b ) :

		// Otherwise we know they are disconnected
		1;

	// Disconnected nodes
	if ( compare & 1 ) {

		// Choose the first element that is related to our preferred document
		if ( a === document || a.ownerDocument === document &&
			jQuery.contains( document, a ) ) {
			return -1;
		}
		if ( b === document || b.ownerDocument === document &&
			jQuery.contains( document, b ) ) {
			return 1;
		}

		// Maintain original order
		return sortInput ?
			( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
			0;
	}

	return compare & 4 ? -1 : 1;
}

function uniqueSort( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	hasDuplicate = false;
	sortInput = !sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
}

function escape( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
}

jQuery.extend( {
	uniqueSort: uniqueSort,
	unique: uniqueSort,
	escapeSelector: escape,
	find: function( selector, context, results, seed ) {
		var elem, nodeType,
			i = 0;

		results = results || [];
		context = context || document;

		// Same basic safeguard as Sizzle
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}

		// Early return if context is not an element or document
		if ( ( nodeType = context.nodeType ) !== 1 && nodeType !== 9 ) {
			return [];
		}

		if ( seed ) {
			while ( ( elem = seed[ i++ ] ) ) {
				if ( jQuery.find.matchesSelector( elem, selector ) ) {
					results.push( elem );
				}
			}
		} else {
			jQuery.merge( results, context.querySelectorAll( selector ) );
		}

		return results;
	},
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

			// Use textContent for elements
			return elem.textContent;
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},
	contains: function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains( bup ) );
	},
	isXMLDoc: function( elem ) {

		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && ( elem.ownerDocument || elem ).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	},
	expr: {
		attrHandle: {},
		match: {
			bool: new RegExp( "^(?:checked|selected|async|autofocus|autoplay|controls|defer" +
				"|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i" ),
			needsContext: /^[\x20\t\r\n\f]*[>+~]/
		}
	}
} );

jQuery.extend( jQuery.find, {
	matches: function( expr, elements ) {
		return jQuery.find( expr, null, null, elements );
	},
	matchesSelector: function( elem, expr ) {
		return matches.call( elem, expr );
	},
	attr: function( elem, name ) {
		var fn = jQuery.expr.attrHandle[ name.toLowerCase() ],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			value = fn && hasOwn.call( jQuery.expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, jQuery.isXMLDoc( elem ) ) :
				undefined;
		return value !== undefined ? value : elem.getAttribute( name );
	}
} );



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "5px";

		// Support: IE 9 only
		// Detect misreporting of content dimensions for border-box elements (gh-3699)
		borderBoxReliableVal = divStyle.width[ 0 ] === "5";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "5px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, borderBoxReliableVal, pixelMarginRightVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:10px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		borderBoxReliable: function() {
			computeStyleTests();
			return borderBoxReliableVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && !support.borderBoxReliable() ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


support.focusin = "onfocusin" in window;


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





var readyCallbacks = [],
	whenReady = function( fn ) {
		readyCallbacks.push( fn );
	},
	executeReady = function( fn ) {

		// Prevent errors from freezing future callback execution (gh-1823)
		// Not backwards-compatible as this does not execute sync
		window.setTimeout( function() {
			fn.call( document, jQuery );
		} );
	};

jQuery.fn.ready = function( fn ) {
	whenReady( fn );
	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		whenReady = function( fn ) {
			readyCallbacks.push( fn );

			while ( readyCallbacks.length ) {
				fn = readyCallbacks.shift();
				if ( jQuery.isFunction( fn ) ) {
					executeReady( fn );
				}
			}
		};

		whenReady();
	}
} );

// Make jQuery.ready Promise consumable (gh-1778)
jQuery.ready.then = jQuery.fn.ready;

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE9-10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}



return jQuery;
} );


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jqmin = __webpack_require__(7);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $el = (0, _jqmin2.default)('<div id="test-target"></div>');

//$el.append('<p>' + info + '</p>');

function describe(state, fn) {
  // console.log(state);
  $el.append('<h2>' + state + '</h2>');
  $el.append('<div>');
  fn();
  $el.append('</div>');
}

function it(state, fn) {
  $el.append('<span>' + state + '</span>');

  var result = fn(function () {
    $el.append('<span> : ' + _AX6Util2.default.toArray(arguments).join(",") + '</span>');
  });

  if (typeof result != "undefined") {
    $el.append('<p>' + result + '</p>');
  }

  $el.append('<br/>');
}

function equal(actual, expected) {

  if (actual.toString() == expected.toString()) {
    return "<span style='color:blue;'>ok</span>";
  } else {
    return "<span style='color:red;'>not equal (" + actual + "," + expected + ")</span>";
  }
}

describe('util.date TEST', function () {
  it('util.date("2013-01-01")', function (done) {
    var date = new Date(2013, 0, 1);
    date.setHours(12);
    date.setMinutes(0);
    done(equal(_AX6Util2.default.date('2013-01-01'), date));
  });

  //Usage 02
  it('util.date((new Date()) , {add:{d:10} , return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    date.setDate(date.getDate() + 10);
    var str = date.getFullYear() + "/" + _AX6Util2.default.setDigit(date.getMonth() + 1, 2) + "/" + _AX6Util2.default.setDigit(date.getDate(), 2);

    done(equal(_AX6Util2.default.date(new Date(), { add: { d: 10 }, return: 'yyyy/MM/dd' }), str));
  });

  //Usage 03
  it('util.date("1919-03-01", {add:{d:10}, return:"yyyy/MM/dd hh:mm:ss"})', function (done) {
    done(equal(_AX6Util2.default.date("1919-03-01", {
      add: { d: 10 },
      return: "yyyy/MM/dd hh:mm:ss"
    }), '1919/03/11 12:00:00'));
  });

  //Usage 04
  it('util.date((new Date()) , {set:"firstDayOfMonth", return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    var str = date.getFullYear() + "/" + _AX6Util2.default.setDigit(date.getMonth() + 1, 2) + "/01";
    done(equal(_AX6Util2.default.date(new Date(), { set: "firstDayOfMonth", return: 'yyyy/MM/dd' }), str));
  });

  //Usage 05
  it('util.date((new Date()) , {set:"lastDayOfMonth", return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    var str = date.getFullYear() + "/" + _AX6Util2.default.setDigit(date.getMonth() + 1, 2) + "/" + _AX6Util2.default.daysOfMonth(date.getFullYear(), date.getMonth());
    done(equal(_AX6Util2.default.date(new Date(), { set: "lastDayOfMonth", return: 'yyyy/MM/dd' }), str));
  });

  //Usage 06
  it('util.date("")', function (done) {
    var date = new Date();
    done(equal(_AX6Util2.default.date(""), date));
  });

  //Usage 07
  it('util.date("1979-12-16T09:00:00") [string.length > 15]', function (done) {
    var date = new Date();
    date.setFullYear(1979, 11, 16);
    date.setHours(9, 0, 0, 0);

    done(equal(_AX6Util2.default.date("1979-12-16T09:00:00"), date));
  });

  //Usage 08
  it('util.date("20170411103317") [string.length == 14]', function (done) {
    var date = new Date(2017, 3, 11);
    date.setHours(10);
    date.setMinutes(33);
    date.setSeconds(17);
    done(equal(_AX6Util2.default.date("20170411103317"), date));
  });

  //Usage 09
  it('util.date("201704") [string.length > 7]', function (done) {
    var date = new Date(2017, 3, 12);
    date.setHours(12);
    done(equal(_AX6Util2.default.date("20170412"), date));
  });

  //Usage 10
  it('util.date("201704") [string.length > 4]', function (done) {
    var date = new Date(2017, 3);
    date.setHours(12);
    done(equal(_AX6Util2.default.date("201704"), date));
  });

  //Usage 11
  it('util.date("2017") [string.length > 2]', function (done) {
    var date = new Date(2017, 0);
    date.setHours(12);
    done(equal(_AX6Util2.default.date("2017"), date));
  });

  //Usage 12
  it('util.date("17") [string.length <= 2]', function (done) {
    var date = new Date();
    done(equal(_AX6Util2.default.date("17"), date));
  });

  //Usage 13
  it('util.date(date, {return: "yyyy-MM-dd"})', function (done) {
    var date = new Date(2017, 3, 16);
    done(equal(_AX6Util2.default.date(date, { return: "yyyy-MM-dd" }), "2017-04-16"));
  });

  //Usage 14
  it('util.date(date, {return: "yyyy-MM-dd hh:mm:ss"})', function (done) {
    var date = new Date(2017, 3, 16, 12, 30, 15);
    done(equal(_AX6Util2.default.date(date, { return: "yyyy-MM-dd hh:mm:ss" }), "2017-04-16 12:30:15"));
  });

  //Usage 15
  it('util.date(date, {return: "dw"})', function (done) {
    var date = new Date(2017, 3, 16);
    done(equal(_AX6Util2.default.date(date, { return: "dw" }), "SUN"));
  });

  //Usage 16
  it('util.date("2017-04-17 11:00:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(_AX6Util2.default.date("2017-04-17 11:00:00", { add: { h: 1 } }), date));
  });

  //Usage 17
  it('util.date("2017-04-17 11:00:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(_AX6Util2.default.date("2017-04-17 11:00:00", { add: { h: 1 } }), date));
  });

  //Usage 18
  it('util.date("2017-06-17 01:55:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 5, 17, 2, 55);
    done(equal(_AX6Util2.default.date("2017-06-17 01:55:00", { add: { h: 1 } }), date));
  });

  //Usage 19
  it('util.date("2017-04-16", {add: {d: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(_AX6Util2.default.date("2017-04-16", { add: { d: 1 } }), date));
  });

  //Usage 20
  it('util.date("2017-05-16", {add: {m: 1}})', function (done) {
    var date = new Date(2017, 5, 16, 12);
    done(equal(_AX6Util2.default.date("2017-05-16", { add: { m: 1 } }), date));
  });

  //Usage 21
  it('util.date("2017-04-22", {add: {y: 1}})', function (done) {
    var date = new Date(2018, 3, 22, 12);
    done(equal(_AX6Util2.default.date("2017-04-22", { add: { y: 1 } }), date));
  });

  //Usage 22
  it('util.date("2016-04-23", {add: {d: 1.5}, return: "dd"})', function (done) {
    var str = "25";
    done(equal(_AX6Util2.default.date("2016-04-23", { add: { d: 1.5 }, return: "dd" }), str));
  });

  /* end util.date */
});

describe('util.number TEST', function () {
  var testCases = [{
    args: [123456789.678, {
      round: 1
    }],
    expect: 123456789.7,
    explanation: 123456789.678 + ', { round: 1 }'
  }, {
    args: [123456789.678, {
      round: 1,
      money: true
    }],
    expect: '123,456,789.7',
    explanation: 123456789.678 + ', { round: 1, money: true }'
  }, {
    args: [123456789.678, {
      round: 2,
      byte: true
    }],
    expect: '117.7MB',
    explanation: 123456789.678 + ', { round: 2, byte: true }'
  }, {
    args: [-123456789.678, {
      abs: true,
      round: 2,
      money: true
    }],
    expect: '123,456,789.68',
    explanation: -123456789.678 + ',{ abs: true, round: 2, money: true }'
  }, {
    args: [-123456789.678, {
      abs: true,
      ceil: true,
      money: true
    }],
    expect: '123,456,790',
    explanation: -123456789.678 + ',{ abs: true, ceil: true, money: true }'
  }, {
    args: [-123456789.678, {
      abs: true,
      floor: true,
      money: true
    }],
    expect: '123,456,789',
    explanation: -123456789.678 + ',{ abs: true, floor: true, money: true }'
  }, {
    args: [1023, {
      byte: true
    }],
    expect: '1KB',
    explanation: 1023 + ',{byte: true}'
  }, {
    args: [1024 * 1024, {
      byte: true
    }],
    expect: '1024KB',
    explanation: 1024 * 1024 + ',{byte: true}'
  }, {
    args: [1024 * 1024 * 5, {
      byte: true
    }],
    expect: '5MB',
    explanation: 1024 * 1024 * 5 + ',{byte: true}'
  }, {
    args: [1024 * 1024 * 1024, {
      byte: true
    }],
    expect: '1024MB',
    explanation: 1024 * 1024 * 1024 + ',{byte: true}'
  }, {
    args: [1024 * 1024 * 1024 * 5, {
      byte: true
    }],
    expect: '5GB',
    explanation: 1024 * 1024 * 1024 + ',{byte: true}'
  }, {
    args: ['A-1234~~56789.8~888PX', {
      abs: true,
      round: 2,
      money: true
    }],
    expect: '123,456,789.89',
    explanation: 'A-1234~~56789.8~888PX , { abs: true, round: 2, money: true }'
  }];
  testCases.forEach(function (testCase) {
    it('util.number(' + testCase.explanation + ') expect ' + testCase.expect, function (done) {
      var actual = _AX6Util2.default.number.apply(this, testCase.args);
      done(equal(actual, testCase.expect));
    });
  });
});

(0, _jqmin2.default)("#sample-body").append($el);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQ4NjMyMWE3ODYyZjk2Njk4OTUiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVdGlsLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2SW5mby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanFtaW4vanF1ZXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsInJlSXNKc29uIiwicmVNcyIsInJlU25ha2VDYXNlIiwicmVDYW1lbENhc2UiLCJyZURvdCIsInJlSW50IiwicmVOb3ROdW0iLCJyZU1vbmV5U3BsaXQiLCJSZWdFeHAiLCJyZUFtcCIsInJlRXEiLCJyZUNsYXNzTmFtZVNwbGl0IiwiZWFjaCIsIk8iLCJfZm4iLCJpc05vdGhpbmciLCJrZXkiLCJpIiwibCIsImxlbmd0aCIsImlzT2JqIiwidW5kZWZpbmVkIiwiY2FsbCIsInNlYXJjaCIsImlzT2JqZWN0IiwiaXNGdW5jdGlvbiIsImZpbHRlciIsImsiLCJyZXN1bHRzIiwiZm5SZXN1bHQiLCJwdXNoIiwidG9Kc29uIiwianNvblN0cmluZyIsImlzQXJyYXkiLCJqc29uT2JqZWN0Qm9keSIsInZhbHVlIiwiam9pbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsInBhcnNlSnNvbiIsInN0ciIsImZvcmNlIiwidGVzdCIsIkZ1bmN0aW9uIiwiZSIsImVycm9yIiwibXNnIiwiZ2V0VHlwZSIsInR5cGVOYW1lIiwid2luZG93Iiwibm9kZVR5cGUiLCJpc1dpbmRvdyIsImlzRWxlbWVudCIsImlzTm9kZWxpc3QiLCJpc0RhdGUiLCJEYXRlIiwiaXNOYU4iLCJ2YWx1ZU9mIiwiaXNEYXRlRm9ybWF0IiwicmVzdWx0IiwiZGF0ZSIsInJlcGxhY2UiLCJtbSIsInN1YnN0ciIsImRkIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZmlyc3QiLCJrZXlzIiwiaXRlbSIsImNvbnNvbGUiLCJsYXN0Iiwic2V0Q29va2llIiwiY24iLCJjdiIsImV4ZGF5cyIsIm9wdHMiLCJleHBpcmUiLCJzZXREYXRlIiwiZG9jIiwiY29va2llIiwiZXNjYXBlIiwidG9VVENTdHJpbmciLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiZ2V0Q29va2llIiwiY25hbWUiLCJuYW1lIiwiY2EiLCJzcGxpdCIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwidW5lc2NhcGUiLCJhbGVydCIsIndpbiIsImxlZnQiLCJwb3MiLCJyaWdodCIsImxhc3RJbmRleE9mIiwiY2FtZWxDYXNlIiwiYWxsIiwibGV0dGVyIiwidG9VcHBlckNhc2UiLCJzbmFrZUNhc2UiLCJ0b0xvd2VyQ2FzZSIsIm51bWJlciIsImNvbmQiLCJwYWlyIiwiaXNNaW51cyIsInJldHVyblZhbHVlIiwiTnVtYmVyIiwiTWF0aCIsInJvdW5kIiwiYWJzIiwiZmxvb3IiLCJjZWlsIiwidmFsIiwidHh0TnVtYmVyIiwiYXJyTnVtYmVyIiwiblVuaXQiLCJteUJ5dGUiLCJ0b0FycmF5IiwiQXJyYXkiLCJzbGljZSIsInBhcmFtIiwicCIsInYiLCJlbmNvZGUiLCJzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZGVjb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwib25lcnJvciIsImFwcGx5IiwiYXJndW1lbnRzIiwibG9jYWxEYXRlIiwieXkiLCJoaCIsIm1pIiwic3MiLCJ1dGNEIiwibG9jYWxEIiwiVVRDIiwiZ2V0VVRDSG91cnMiLCJnZXRUaW1lem9uZU9mZnNldCIsInNldFVUQ0hvdXJzIiwiZCIsImFEYXRlVGltZSIsImFUaW1lcyIsImFUaW1lIiwiYURhdGUiLCJ2YSIsIklTT184NjAxIiwiSVNPXzg2MDFfRlVMTCIsInBhcnNlRmxvYXQiLCJfZCIsIm14ZGQiLCJEeU1pbGxpIiwic2V0VGltZSIsImdldFRpbWUiLCJnZXRGdWxsWWVhciIsInBhcnNlSW50IiwiZGF5c09mTW9udGgiLCJwcm9jZXNzb3IiLCJmU3RyIiwiblkiLCJuTSIsIm5EIiwibkgiLCJuTU0iLCJuUyIsIm5EVyIsInlyZSIsInJlZ1kiLCJtcmUiLCJyZWdNIiwiZHJlIiwicmVnRCIsImhyZSIsInJlZ0giLCJtaXJlIiwicmVnTUkiLCJzcmUiLCJyZWdTIiwiZHdyZSIsInJlZ0RXIiwiZ2V0VVRDRnVsbFllYXIiLCJzZXREaWdpdCIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXREYXkiLCJleGVjIiwiJDEiLCJ3ZWVrTmFtZXMiLCJsYWJlbCIsImRkYXkiLCJtZW1vcnlEYXkiLCJ0b2RheSIsImRpZmZudW0iLCJ0aGlzWWVhck1lbW9yeURheSIsImdldERheVRpbWUiLCJ3ZWVrc09mTW9udGgiLCJteURhdGUiLCJ5ZWFyIiwibW9udGgiLCJjb3VudCIsInkiLCJtIiwibnVtIiwicGFkZGVyIiwicmFkaXgiLCJ0aW1lcyIsImZpbmRQYXJlbnROb2RlIiwiX3RhcmdldCIsInBhcmVudE5vZGUiLCJ0YWdOYW1lIiwidG9Mb2NhbGVMb3dlckNhc2UiLCJrbGFzc3MiLCJjbGFzc05hbWUiLCJoYXNDbGFzcyIsImEiLCJnZXRBdHRyaWJ1dGUiLCJjc3NOdW1iZXIiLCJyZSIsImZvdW5kIiwibWF0Y2giLCJ1bml0IiwiY3NzIiwicmV0dXJucyIsInZhbFNwbGl0ZWQiLCJmb3JFYWNoIiwidHJpbSIsInZTcGxpdGVkIiwic3RvcEV2ZW50IiwiZXZlbnQiLCJjYW5jZWxCdWJibGUiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsInNlbGVjdFJhbmdlIiwiZWwiLCJyYW5nZSIsIm9mZnNldCIsIm1vdmVTdGFydCIsImNvbGxhcHNlIiwibW92ZUVuZCIsInRleHQiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJzZXRTdGFydCIsIm5vZGUiLCJzZXRFbmQiLCJmaXJzdENoaWxkIiwicmFuZ2VUeXBlIiwic2VsZWN0aW9uIiwialF1ZXJ5IiwiZ2V0IiwiYm9keSIsImNyZWF0ZVRleHRSYW5nZSIsImRvY3VtZW50IiwibW92ZVRvRWxlbWVudFRleHQiLCJnZXRTZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNlbGVjdEFsbCIsImFyciIsInNlbGVjdCIsImZvY3VzIiwicmVtb3ZlQWxsUmFuZ2VzIiwiYWRkUmFuZ2UiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0Iiwib3B0aW9ucyIsImxhc3RBcmdzIiwibGFzdFRoaXMiLCJtYXhXYWl0IiwidGltZXJJZCIsImxhc3RDYWxsVGltZSIsImxhc3RJbnZva2VUaW1lIiwibGVhZGluZyIsIm1heGluZyIsInRyYWlsaW5nIiwiVHlwZUVycm9yIiwibWF4IiwiaW52b2tlRnVuYyIsInRpbWUiLCJhcmdzIiwidGhpc0FyZyIsImxlYWRpbmdFZGdlIiwic2V0VGltZW91dCIsInRpbWVyRXhwaXJlZCIsInJlbWFpbmluZ1dhaXQiLCJ0aW1lU2luY2VMYXN0Q2FsbCIsInRpbWVTaW5jZUxhc3RJbnZva2UiLCJtaW4iLCJzaG91bGRJbnZva2UiLCJub3ciLCJ0cmFpbGluZ0VkZ2UiLCJjYW5jZWwiLCJjbGVhclRpbWVvdXQiLCJmbHVzaCIsImRlYm91bmNlZCIsImlzSW52b2tpbmciLCJ0aHJvdHRsZSIsImRlZXBDb3B5Iiwib2JqIiwiciIsImFzc2lnbiIsImVzY2FwZUh0bWwiLCJ1bmVzY2FwZUh0bWwiLCJzdHJpbmciLCJfc3RyaW5nIiwiZm9ybWF0IiwiY29uY2F0IiwiX3BvcyIsImNvbG9yIiwiX2hleENvbG9yIiwibWF0Y2hlcnMiLCJDU1NfSU5URUdFUiIsIkNTU19OVU1CRVIiLCJDU1NfVU5JVCIsIlBFUk1JU1NJVkVfTUFUQ0gzIiwiUEVSTUlTU0lWRV9NQVRDSDQiLCJyZ2IiLCJyZ2JhIiwiaHNsIiwiaHNsYSIsImhzdiIsImhzdmEiLCJoZXgzIiwiaGV4NiIsImhleDQiLCJoZXg4IiwiY29udmVydE9iamVjdCIsIl9jb2xvciIsImciLCJiIiwiaCIsImlzT25lUG9pbnRaZXJvIiwibiIsImlzUGVyY2VudGFnZSIsImNvbnZlcnRUb1BlcmNlbnRhZ2UiLCJjb252ZXJ0VG8yNTUiLCJjb252ZXJ0VG9IZXgiLCJib3VuZDAxIiwicHJvY2Vzc1BlcmNlbnQiLCJyZ2JUb0hzbCIsImhzbFRvUmdiIiwiaHVlMnJnYiIsInEiLCJ0IiwiX29yaWdpbmFsVmFsdWUiLCJfZm9ybWF0IiwiX2hleCIsImdldEhleFZhbHVlIiwibGlnaHRlbiIsImFtb3VudCIsImRhcmtlbiIsImdldEJyaWdodG5lc3MiLCJpc0RhcmsiLCJpc0xpZ2h0IiwiZ2V0SHNsIiwiZG9jRWxlbSIsImRvY3VtZW50RWxlbWVudCIsImV2ZW50S2V5cyIsIkJBQ0tTUEFDRSIsIlRBQiIsIlJFVFVSTiIsIkVTQyIsIkxFRlQiLCJVUCIsIlJJR0hUIiwiRE9XTiIsIkRFTEVURSIsIkhPTUUiLCJFTkQiLCJQQUdFVVAiLCJQQUdFRE9XTiIsIklOU0VSVCIsIlNQQUNFIiwid2hlZWxFbm0iLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJlcnJvck1zZyIsImJyb3dzZXIiLCJ1YSIsIm1vYmlsZSIsImJyb3dzZXJOYW1lIiwiYnJvd3NlclZlcnNpb24iLCJ2ZXJzaW9uIiwiaXNCcm93c2VyIiwidXJsVXRpbCIsInVybCIsInVybHMiLCJocmVmIiwibG9jYXRpb24iLCJyZWZlcnJlciIsInBhdGhuYW1lIiwiaG9zdG5hbWUiLCJwb3J0IiwiaGFzaGRhdGEiLCJiYXNlVXJsIiwiZ2V0RXJyb3IiLCJlcnJvckNvZGUiLCJtZXRob2ROYW1lIiwic3VwcG9ydFRvdWNoIiwibWF4VG91Y2hQb2ludHMiLCJtc01heFRvdWNoUG9pbnRzIiwic3VwcG9ydEZpbGVBcGkiLCJGaWxlUmVhZGVyIiwiRmlsZSIsIkZpbGVMaXN0IiwiQmxvYiIsIiRlbCIsImRlc2NyaWJlIiwic3RhdGUiLCJmbiIsImFwcGVuZCIsIml0IiwiZXF1YWwiLCJhY3R1YWwiLCJleHBlY3RlZCIsImRvbmUiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJhZGQiLCJyZXR1cm4iLCJzZXQiLCJzZXRGdWxsWWVhciIsInNldFNlY29uZHMiLCJ0ZXN0Q2FzZXMiLCJleHBlY3QiLCJleHBsYW5hdGlvbiIsIm1vbmV5IiwiYnl0ZSIsInRlc3RDYXNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFFQTs7OztBQUlBLElBQU1BLFlBQVlDLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQW5DO0FBQ0EsSUFBTUMsV0FBVyxvRUFBakI7QUFBQSxJQUNFQyxPQUFPLE9BRFQ7QUFBQSxJQUVFQyxjQUFjLGtCQUZoQjtBQUFBLElBR0VDLGNBQWMsVUFIaEI7QUFBQSxJQUlFQyxRQUFRLElBSlY7QUFBQSxJQUtFQyxRQUFRLGNBTFY7QUFBQSxJQU1FQyxXQUFXLE1BTmI7QUFBQSxJQU9FQyxlQUFlLElBQUlDLE1BQUosQ0FBVyw4QkFBWCxDQVBqQjtBQUFBLElBUUVDLFFBQVEsSUFSVjtBQUFBLElBU0VDLE9BQU8sR0FUVDtBQUFBLElBVUVDLG1CQUFtQixPQVZyQjs7QUFZQSxTQUFTQyxJQUFULENBQWNDLENBQWQsRUFBaUJDLEdBQWpCLEVBQXNCO0FBQ3BCLE1BQUlDLFVBQVVGLENBQVYsQ0FBSixFQUFrQixPQUFPLEVBQVA7QUFDbEIsTUFBSUcsWUFBSjtBQUFBLE1BQVNDLElBQUksQ0FBYjtBQUFBLE1BQWdCQyxJQUFJTCxFQUFFTSxNQUF0QjtBQUFBLE1BQ0VDLFFB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OztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFlBQVk7O0FBRXBCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixvQkFBb0I7O0FBRXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLFlBQVk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMsU0FBUztBQUNsQjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsWUFBWTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsWUFBWTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFFBQVEsTUFBTTtBQUM5QywwQkFBMEIsV0FBVyxTQUFTO0FBQzlDLG9DQUFvQyxVQUFVLFNBQVM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsUUFBUSxHQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQiwwQkFBMEIsd0JBQXdCOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsYUFBYTtBQUNwQyxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixTQUFTO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQztBQUNEOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLE9BQU87QUFDZjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxnQkFBZ0I7QUFDbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEOztBQUVBO0FBQ0E7O0FBRUEsY0FBYyxzQkFBc0I7QUFDcEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtEQUErRDtBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVUsY0FBYzs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1Q0FBdUM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVEQUF1RDtBQUM5RTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7OztBQUdEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixnQkFBZ0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLCtCQUErQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLHFDQUFxQztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFNBQVMsOEJBQThCO0FBQ3ZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxZQUFZLE9BQU87QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLFdBQVc7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCLHNCQUFzQixjQUFjO0FBQ3BDLGdCQUFnQixXQUFXLFlBQVk7QUFDdkMsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFdBQVcsU0FBUyxNQUFNLGFBQWE7QUFDNUUsYUFBYSxlQUFlO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0RBQStEO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxPQUFPOztBQUVmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQSxVQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7O0FBS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7OztBQUtEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUEsSUFBSTtBQUNKOztBQUVBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLFdBQVcsU0FBUztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7QUFLRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLEtBQUs7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLEtBQUs7QUFDTDs7QUFFQSxXQUFXO0FBQ1gsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVG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QXpGYyxFQW1HZDtBQUNFbEosVUFBTSxDQUNKLE9BQU8sSUFBUCxHQUFjLElBRFYsRUFFSjtBQUNFb0osWUFBTTtBQURSLEtBRkksQ0FEUjtBQU9FSCxZQUFRLFFBUFY7QUFRRUMsaUJBQWEsT0FBTyxJQUFQLEdBQWMsSUFBZCxHQUFxQjtBQVJwQyxHQW5HYyxFQTZHZDtBQUNFbEosVUFBTSxDQUNKLE9BQU8sSUFBUCxHQUFjLElBQWQsR0FBcUIsQ0FEakIsRUFFSjtBQUNFb0osWUFBTTtBQURSLEtBRkksQ0FEUjtBQU9FSCxZQUFRLEtBUFY7QUFRRUMsaUJBQWEsT0FBTyxJQUFQLEdBQWMsSUFBZCxHQUFxQjtBQVJwQyxHQTdHYyxFQXVIZDtBQUNFbEosVUFBTSxDQUNKLHVCQURJLEVBRUo7QUFDRTVLLFdBQUssSUFEUDtBQUVFRCxhQUFPLENBRlQ7QUFHRWdVLGFBQU87QUFIVCxLQUZJLENBRFI7QUFTRUYsWUFBUSxnQkFUVjtBQVVFQyxpQkFBYTtBQVZmLEdBdkhjLENBQWhCO0FBb0lBRixZQUFVdE0sT0FBVixDQUFrQixVQUFVMk0sUUFBVixFQUFvQjtBQUNwQ2pCLE9BQUcsaUJBQWlCaUIsU0FBU0gsV0FBMUIsR0FBd0MsV0FBeEMsR0FBc0RHLFNBQVNKLE1BQWxFLEVBQTBFLFVBQVVULElBQVYsRUFBZ0I7QUFDeEYsVUFBSUYsU0FBUyxrQkFBSzFULE1BQUwsQ0FBWTRCLEtBQVosQ0FBa0IsSUFBbEIsRUFBd0I2UyxTQUFTckosSUFBakMsQ0FBYjtBQUNBd0ksV0FBS0gsTUFBTUMsTUFBTixFQUFjZSxTQUFTSixNQUF2QixDQUFMO0FBQ0QsS0FIRDtBQUlELEdBTEQ7QUFNRCxDQTNJRDs7QUE4SUEscUJBQUUsY0FBRixFQUFrQmQsTUFBbEIsQ0FBeUJKLEdBQXpCLEUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4MCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjQ4NjMyMWE3ODYyZjk2Njk4OTUiLCJpbXBvcnQgaW5mbyBmcm9tIFwiLi9BWDZJbmZvXCI7XG5cbi8qKlxuICogQG1vZHVsZSBBWDZVdGlsXG4gKi9cblxuY29uc3QgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHJlSXNKc29uID0gL14oW1wiJ10oXFxcXC58W15cIlxcXFxcXG5cXHJdKSo/W1wiJ118Wyw6e31cXFtcXF0wLTkuXFwtK0VhZWZsbnItdSBcXG5cXHJcXHRdKSs/JC8sXG4gIHJlTXMgPSAvXi1tcy0vLFxuICByZVNuYWtlQ2FzZSA9IC9bXFwtX10oW1xcZGEtel0pL2dpLFxuICByZUNhbWVsQ2FzZSA9IC8oW0EtWl0pL2csXG4gIHJlRG90ID0gL1xcLi8sXG4gIHJlSW50ID0gL1stfCtdP1tcXERdL2dpLFxuICByZU5vdE51bSA9IC9cXEQvZ2ksXG4gIHJlTW9uZXlTcGxpdCA9IG5ldyBSZWdFeHAoJyhbMC05XSkoWzAtOV1bMC05XVswLTldWywuXSknKSxcbiAgcmVBbXAgPSAvJi9nLFxuICByZUVxID0gLz0vLFxuICByZUNsYXNzTmFtZVNwbGl0ID0gL1sgXSsvZztcblxuZnVuY3Rpb24gZWFjaChPLCBfZm4pIHtcbiAgaWYgKGlzTm90aGluZyhPKSkgcmV0dXJuIFtdO1xuICBsZXQga2V5LCBpID0gMCwgbCA9IE8ubGVuZ3RoLFxuICAgIGlzT2JqID0gbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBPID09PSBcImZ1bmN0aW9uXCI7XG4gIGlmIChpc09iaikge1xuICAgIGZvciAoa2V5IGluIE8pIHtcbiAgICAgIGlmICh0eXBlb2YgT1trZXldICE9IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIGlmIChfZm4uY2FsbChPW2tleV0sIGtleSwgT1trZXldKSA9PT0gZmFsc2UpIGJyZWFrO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKDsgaSA8IGw7KSB7XG4gICAgICBpZiAodHlwZW9mIE9baV0gIT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgaWYgKF9mbi5jYWxsKE9baV0sIGksIE9baSsrXSkgPT09IGZhbHNlKSBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE87XG59XG5cbmZ1bmN0aW9uIHNlYXJjaChPLCBfZm4pIHtcbiAgaWYgKGlzTm90aGluZyhPKSkgcmV0dXJuIC0xO1xuICBpZiAoaXNPYmplY3QoTykpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gTykge1xuICAgICAgaWYgKHR5cGVvZiBPW2tleV0gIT0gXCJ1bmRlZmluZWRcIiAmJiBpc0Z1bmN0aW9uKF9mbikgJiYgX2ZuLmNhbGwoT1trZXldLCBrZXksIE9ba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChPW2tleV0gPT0gX2ZuKSB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IE8ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodHlwZW9mIE9baV0gIT0gXCJ1bmRlZmluZWRcIiAmJiBpc0Z1bmN0aW9uKF9mbikgJiYgX2ZuLmNhbGwoT1tpXSwgaSwgT1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoT1tpXSA9PSBfZm4pIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGZpbHRlcihPLCBfZm4pIHtcbiAgaWYgKGlzTm90aGluZyhPKSkgcmV0dXJuIFtdO1xuICBsZXQgaywgaSA9IDAsIGwgPSBPLmxlbmd0aCwgcmVzdWx0cyA9IFtdLCBmblJlc3VsdDtcbiAgaWYgKGlzT2JqZWN0KE8pKSB7XG4gICAgZm9yIChrIGluIE8pIHtcbiAgICAgIGlmICh0eXBlb2YgT1trXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChmblJlc3VsdCA9IF9mbi5jYWxsKE9ba10sIGssIE9ba10pKSByZXN1bHRzLnB1c2goT1trXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoOyBpIDwgbDspIHtcbiAgICAgIGlmICh0eXBlb2YgT1tpXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChmblJlc3VsdCA9IF9mbi5jYWxsKE9baV0sIGksIE9baV0pKSByZXN1bHRzLnB1c2goT1tpXSk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cblxuZnVuY3Rpb24gdG9Kc29uKE8pIHtcbiAgbGV0IGpzb25TdHJpbmcgPSBcIlwiO1xuICBpZiAoaXNBcnJheShPKSkge1xuICAgIGxldCBpID0gMCwgbCA9IE8ubGVuZ3RoO1xuICAgIGpzb25TdHJpbmcgKz0gXCJbXCI7XG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChpID4gMCkganNvblN0cmluZyArPSBcIixcIjtcbiAgICAgIGpzb25TdHJpbmcgKz0gdG9Kc29uKE9baV0pO1xuICAgIH1cbiAgICBqc29uU3RyaW5nICs9IFwiXVwiO1xuICB9XG4gIGVsc2UgaWYgKGlzT2JqZWN0KE8pKSB7XG4gICAganNvblN0cmluZyArPSBcIntcIjtcbiAgICBsZXQganNvbk9iamVjdEJvZHkgPSBbXTtcbiAgICBlYWNoKE8sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBqc29uT2JqZWN0Qm9keS5wdXNoKCdcIicgKyBrZXkgKyAnXCI6ICcgKyB0b0pzb24odmFsdWUpKTtcbiAgICB9KTtcbiAgICBqc29uU3RyaW5nICs9IGpzb25PYmplY3RCb2R5LmpvaW4oXCIsIFwiKTtcbiAgICBqc29uU3RyaW5nICs9IFwifVwiO1xuICB9XG4gIGVsc2UgaWYgKGlzU3RyaW5nKE8pKSB7XG4gICAganNvblN0cmluZyA9ICdcIicgKyBPICsgJ1wiJztcbiAgfVxuICBlbHNlIGlmIChpc051bWJlcihPKSkge1xuICAgIGpzb25TdHJpbmcgPSBPO1xuICB9XG4gIGVsc2UgaWYgKGlzVW5kZWZpbmVkKE8pKSB7XG4gICAganNvblN0cmluZyA9IFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihPKSkge1xuICAgIGpzb25TdHJpbmcgPSAnXCJ7RnVuY3Rpb259XCInO1xuICB9XG4gIGVsc2Uge1xuICAgIGpzb25TdHJpbmcgPSBPO1xuICB9XG4gIHJldHVybiBqc29uU3RyaW5nO1xufVxuXG5cbmZ1bmN0aW9uIHBhcnNlSnNvbihzdHIsIGZvcmNlKSB7XG4gIGlmIChmb3JjZSB8fCAocmVJc0pzb24pLnRlc3Qoc3RyKSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbignJywgJ3JldHVybiAnICsgc3RyKSkoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB7ZXJyb3I6IDUwMCwgbXNnOiAnc3ludGF4IGVycm9yJ307XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiB7ZXJyb3I6IDUwMCwgbXNnOiAnc3ludGF4IGVycm9yJ307XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VHlwZShPKSB7XG4gIGxldCB0eXBlTmFtZTtcbiAgaWYgKE8gIT0gbnVsbCAmJiBPID09IE8ud2luZG93KSB7XG4gICAgdHlwZU5hbWUgPSBcIndpbmRvd1wiO1xuICB9XG4gIGVsc2UgaWYgKCEhKE8gJiYgTy5ub2RlVHlwZSA9PSAxKSkge1xuICAgIHR5cGVOYW1lID0gXCJlbGVtZW50XCI7XG4gIH1cbiAgZWxzZSBpZiAoISEoTyAmJiBPLm5vZGVUeXBlID09IDExKSkge1xuICAgIHR5cGVOYW1lID0gXCJmcmFnbWVudFwiO1xuICB9XG4gIGVsc2UgaWYgKE8gPT09IG51bGwpIHtcbiAgICB0eXBlTmFtZSA9IFwibnVsbFwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBPID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdHlwZU5hbWUgPSBcInVuZGVmaW5lZFwiO1xuICB9XG4gIGVsc2UgaWYgKF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcbiAgICB0eXBlTmFtZSA9IFwib2JqZWN0XCI7XG4gIH1cbiAgZWxzZSBpZiAoX3RvU3RyaW5nLmNhbGwoTykgPT0gXCJbb2JqZWN0IEFycmF5XVwiKSB7XG4gICAgdHlwZU5hbWUgPSBcImFycmF5XCI7XG4gIH1cbiAgZWxzZSBpZiAoX3RvU3RyaW5nLmNhbGwoTykgPT0gXCJbb2JqZWN0IFN0cmluZ11cIikge1xuICAgIHR5cGVOYW1lID0gXCJzdHJpbmdcIjtcbiAgfVxuICBlbHNlIGlmIChfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgTnVtYmVyXVwiKSB7XG4gICAgdHlwZU5hbWUgPSBcIm51bWJlclwiO1xuICB9XG4gIGVsc2UgaWYgKF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBOb2RlTGlzdF1cIikge1xuICAgIHR5cGVOYW1lID0gXCJub2RlbGlzdFwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBPID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0eXBlTmFtZSA9IFwiZnVuY3Rpb25cIjtcbiAgfVxuICByZXR1cm4gdHlwZU5hbWU7XG59XG5cblxuZnVuY3Rpb24gaXNXaW5kb3coTykge1xuICByZXR1cm4gTyAhPSBudWxsICYmIE8gPT0gTy53aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudChPKSB7XG4gIHJldHVybiAhIShPICYmIChPLm5vZGVUeXBlID09IDEgfHwgTy5ub2RlVHlwZSA9PSAxMSkpO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChPKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgT2JqZWN0XVwiO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KE8pIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBBcnJheV1cIjtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihPKSB7XG4gIHJldHVybiB0eXBlb2YgTyA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyhPKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgU3RyaW5nXVwiO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihPKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgTnVtYmVyXVwiO1xufVxuXG5mdW5jdGlvbiBpc05vZGVsaXN0KE8pIHtcbiAgcmV0dXJuICEhKF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBOb2RlTGlzdF1cIiB8fCAodHlwZW9mIE8gIT09IFwidW5kZWZpbmVkXCIgJiYgTyAmJiBPWzBdICYmIE9bMF0ubm9kZVR5cGUgPT0gMSkpO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChPKSB7XG4gIHJldHVybiB0eXBlb2YgTyA9PT0gXCJ1bmRlZmluZWRcIjtcbn1cblxuZnVuY3Rpb24gaXNOb3RoaW5nKE8pIHtcbiAgcmV0dXJuICh0eXBlb2YgTyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPID09PSBudWxsIHx8IE8gPT09IFwiXCIpO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUoTykge1xuICByZXR1cm4gKE8gaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihPLnZhbHVlT2YoKSkpO1xufVxuXG5mdW5jdGlvbiBpc0RhdGVGb3JtYXQoTykge1xuICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgaWYgKCFPKSB7XG4gIH1cbiAgZWxzZSBpZiAoTyBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKE8udmFsdWVPZigpKSkge1xuICAgIHJlc3VsdCA9IHRydWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKE8ubGVuZ3RoID4gNykge1xuICAgICAgaWYgKGRhdGUoTykgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBPID0gTy5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgIGlmIChPLmxlbmd0aCA+IDcpIHtcbiAgICAgIGxldCBtbSA9IE8uc3Vic3RyKDQsIDIpLFxuICAgICAgICBkZCA9IE8uc3Vic3RyKDYsIDIpO1xuXG4gICAgICBPID0gZGF0ZShPKTtcbiAgICAgIGlmIChPLmdldE1vbnRoKCkgPT0gKG1tIC0gMSkgJiYgTy5nZXREYXRlKCkgPT0gZGQpIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZmlyc3QoTykge1xuICBpZiAoaXNPYmplY3QoTykpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKE8pO1xuICAgIGxldCBpdGVtID0ge307XG4gICAgaXRlbVtrZXlzWzBdXSA9IE9ba2V5c1swXV07XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgZWxzZSBpZiAoaXNBcnJheShPKSkge1xuICAgIHJldHVybiBPWzBdO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJBWDZVdGlsLm9iamVjdC5maXJzdFwiLCBcImFyZ3VtZW50IHR5cGUgZXJyb3JcIik7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBsYXN0KE8pIHtcbiAgaWYgKGlzT2JqZWN0KE8pKSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhPKTtcbiAgICBsZXQgaXRlbSA9IHt9O1xuICAgIGl0ZW1ba2V5c1trZXlzLmxlbmd0aCAtIDFdXSA9IE9ba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuICBlbHNlIGlmIChpc0FycmF5KE8pKSB7XG4gICAgcmV0dXJuIE9bTy5sZW5ndGggLSAxXTtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiQVg2VXRpbC5vYmplY3QubGFzdFwiLCBcImFyZ3VtZW50IHR5cGUgZXJyb3JcIik7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRDb29raWUoY24sIGN2LCBleGRheXMsIG9wdHMpIHtcbiAgbGV0IGV4cGlyZTtcbiAgaWYgKHR5cGVvZiBleGRheXMgPT09IFwibnVtYmVyXCIpIHtcbiAgICBleHBpcmUgPSBuZXcgRGF0ZSgpO1xuICAgIGV4cGlyZS5zZXREYXRlKGV4cGlyZS5nZXREYXRlKCkgKyBleGRheXMpO1xuICB9XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICByZXR1cm4gKGRvYy5jb29raWUgPSBbXG4gICAgZXNjYXBlKGNuKSwgJz0nLCBlc2NhcGUoY3YpLFxuICAgIGV4cGlyZSA/IFwiOyBleHBpcmVzPVwiICsgZXhwaXJlLnRvVVRDU3RyaW5nKCkgOiBcIlwiLCAvLyB1c2UgZXhwaXJlcyBhdHRyaWJ1dGUsIG1heC1hZ2UgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuICAgIG9wdHMucGF0aCA/IFwiOyBwYXRoPVwiICsgb3B0cy5wYXRoIDogXCJcIixcbiAgICBvcHRzLmRvbWFpbiA/IFwiOyBkb21haW49XCIgKyBvcHRzLmRvbWFpbiA6IFwiXCIsXG4gICAgb3B0cy5zZWN1cmUgPyBcIjsgc2VjdXJlXCIgOiBcIlwiXG4gIF0uam9pbihcIlwiKSk7XG59XG5cbmZ1bmN0aW9uIGdldENvb2tpZShjbmFtZSkge1xuICBsZXQgbmFtZSA9IGNuYW1lICsgXCI9XCI7XG4gIGxldCBjYSA9IGRvYy5jb29raWUuc3BsaXQoJzsnKSwgaSA9IDAsIGwgPSBjYS5sZW5ndGg7XG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IGMgPSBjYVtpXTtcbiAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSBjID0gYy5zdWJzdHJpbmcoMSk7XG4gICAgaWYgKGMuaW5kZXhPZihuYW1lKSAhPSAtMSkgcmV0dXJuIHVuZXNjYXBlKGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCkpO1xuICB9XG4gIHJldHVybiBcIlwiO1xufVxuXG5mdW5jdGlvbiBhbGVydChPKSB7XG4gIHdpbi5hbGVydCh0b0pzb24oTykpO1xuICByZXR1cm4gTztcbn1cblxuZnVuY3Rpb24gbGVmdChzdHIsIHBvcykge1xuICBpZiAodHlwZW9mIHN0ciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcG9zID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJcIjtcbiAgaWYgKGlzU3RyaW5nKHBvcykpIHtcbiAgICByZXR1cm4gKHN0ci5pbmRleE9mKHBvcykgPiAtMSkgPyBzdHIuc3Vic3RyKDAsIHN0ci5pbmRleE9mKHBvcykpIDogXCJcIjtcbiAgfVxuICBlbHNlIGlmIChpc051bWJlcihwb3MpKSB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgcG9zKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiByaWdodChzdHIsIHBvcykge1xuICBpZiAodHlwZW9mIHN0ciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcG9zID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJcIjtcbiAgc3RyID0gJycgKyBzdHI7XG4gIGlmIChpc1N0cmluZyhwb3MpKSB7XG4gICAgcmV0dXJuIChzdHIubGFzdEluZGV4T2YocG9zKSA+IC0xKSA/IHN0ci5zdWJzdHIoc3RyLmxhc3RJbmRleE9mKHBvcykgKyAxKSA6IFwiXCI7XG4gIH1cbiAgZWxzZSBpZiAoaXNOdW1iZXIocG9zKSkge1xuICAgIHJldHVybiBzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSBwb3MpO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlTXMsIFwibXMtXCIpLnJlcGxhY2UocmVTbmFrZUNhc2UsIGZ1bmN0aW9uIChhbGwsIGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNuYWtlQ2FzZShzdHIpIHtcbiAgcmV0dXJuIGNhbWVsQ2FzZShzdHIpLnJlcGxhY2UocmVDYW1lbENhc2UsIGZ1bmN0aW9uIChhbGwsIGxldHRlcikge1xuICAgIHJldHVybiBcIi1cIiArIGxldHRlci50b0xvd2VyQ2FzZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbnVtYmVyKHN0ciwgY29uZCkge1xuICBsZXQgcmVzdWx0LCBwYWlyID0gKCcnICsgc3RyKS5zcGxpdChyZURvdCksIGlzTWludXMsIHJldHVyblZhbHVlO1xuXG4gIGlzTWludXMgPSAoTnVtYmVyKHBhaXJbMF0ucmVwbGFjZSgvLC9nLCBcIlwiKSkgPCAwIHx8IHBhaXJbMF0gPT0gXCItMFwiKTtcbiAgcmV0dXJuVmFsdWUgPSAwLjA7XG4gIHBhaXJbMF0gPSBwYWlyWzBdLnJlcGxhY2UocmVJbnQsIFwiXCIpO1xuXG4gIGlmIChwYWlyWzFdKSB7XG4gICAgcGFpclsxXSA9IHBhaXJbMV0ucmVwbGFjZShyZU5vdE51bSwgXCJcIik7XG4gICAgcmV0dXJuVmFsdWUgPSBOdW1iZXIocGFpclswXSArIFwiLlwiICsgcGFpclsxXSkgfHwgMDtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm5WYWx1ZSA9IE51bWJlcihwYWlyWzBdKSB8fCAwO1xuICB9XG4gIHJlc3VsdCA9IChpc01pbnVzKSA/IC1yZXR1cm5WYWx1ZSA6IHJldHVyblZhbHVlO1xuXG4gIGVhY2goY29uZCwgZnVuY3Rpb24gKGssIGMpIHtcbiAgICBpZiAoayA9PSBcInJvdW5kXCIpIHtcbiAgICAgIGlmIChpc051bWJlcihjKSkge1xuICAgICAgICBpZiAoYyA8IDApIHtcbiAgICAgICAgICByZXN1bHQgPSArKE1hdGgucm91bmQocmVzdWx0ICsgXCJlLVwiICsgTWF0aC5hYnMoYykpICsgXCJlK1wiICsgTWF0aC5hYnMoYykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9ICsoTWF0aC5yb3VuZChyZXN1bHQgKyBcImUrXCIgKyBjKSArIFwiZS1cIiArIGMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gTWF0aC5yb3VuZChyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoayA9PSBcImZsb29yXCIpIHtcbiAgICAgIHJlc3VsdCA9IE1hdGguZmxvb3IocmVzdWx0KTtcbiAgICB9XG4gICAgaWYgKGsgPT0gXCJjZWlsXCIpIHtcbiAgICAgIHJlc3VsdCA9IE1hdGguY2VpbChyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrID09IFwibW9uZXlcIikge1xuICAgICAgcmVzdWx0ID0gKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgdmFyIHR4dE51bWJlciA9ICcnICsgdmFsO1xuICAgICAgICBpZiAoaXNOYU4odHh0TnVtYmVyKSB8fCB0eHROdW1iZXIgPT0gXCJcIikge1xuICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBhcnJOdW1iZXIgPSB0eHROdW1iZXIuc3BsaXQoJy4nKTtcbiAgICAgICAgICBhcnJOdW1iZXJbMF0gKz0gJy4nO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGFyck51bWJlclswXSA9IGFyck51bWJlclswXS5yZXBsYWNlKHJlTW9uZXlTcGxpdCwgJyQxLCQyJyk7XG4gICAgICAgICAgfSB3aGlsZSAocmVNb25leVNwbGl0LnRlc3QoYXJyTnVtYmVyWzBdKSk7XG4gICAgICAgICAgaWYgKGFyck51bWJlci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyTnVtYmVyLmpvaW4oJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJOdW1iZXJbMF0uc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGsgPT0gXCJhYnNcIikge1xuICAgICAgcmVzdWx0ID0gTWF0aC5hYnMoTnVtYmVyKHJlc3VsdCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrID09IFwiYnl0ZVwiKSB7XG4gICAgICByZXN1bHQgPSAoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICB2YWwgPSBOdW1iZXIocmVzdWx0KTtcbiAgICAgICAgdmFyIG5Vbml0ID0gXCJLQlwiO1xuICAgICAgICB2YXIgbXlCeXRlID0gdmFsIC8gMTAyNDtcbiAgICAgICAgaWYgKG15Qnl0ZSAvIDEwMjQgPiAxKSB7XG4gICAgICAgICAgblVuaXQgPSBcIk1CXCI7XG4gICAgICAgICAgbXlCeXRlID0gbXlCeXRlIC8gMTAyNDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXlCeXRlIC8gMTAyNCA+IDEpIHtcbiAgICAgICAgICBuVW5pdCA9IFwiR0JcIjtcbiAgICAgICAgICBteUJ5dGUgPSBteUJ5dGUgLyAxMDI0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1iZXIobXlCeXRlLCB7cm91bmQ6IDF9KSArIG5Vbml0O1xuICAgICAgfSkocmVzdWx0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkoTykge1xuICBpZiAodHlwZW9mIE8ubGVuZ3RoICE9IFwidW5kZWZpbmVkXCIpIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChPKTtcbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiBwYXJhbShPLCBjb25kKSB7XG4gIHZhciBwO1xuICBpZiAoaXNTdHJpbmcoTykgJiYgdHlwZW9mIGNvbmQgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uZCA9PSBcInBhcmFtXCIpIHtcbiAgICByZXR1cm4gTztcbiAgfVxuICBlbHNlIGlmICgoaXNTdHJpbmcoTykgJiYgdHlwZW9mIGNvbmQgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uZCA9PSBcIm9iamVjdFwiKSB8fCAoaXNTdHJpbmcoTykgJiYgdHlwZW9mIGNvbmQgPT09IFwidW5kZWZpbmVkXCIpKSB7XG4gICAgcCA9IHt9O1xuICAgIGVhY2goTy5zcGxpdChyZUFtcCksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpdGVtID0gdGhpcy5zcGxpdChyZUVxKTtcbiAgICAgIGlmICghcFtpdGVtWzBdXSkgcFtpdGVtWzBdXSA9IGl0ZW1bMV07XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHBbaXRlbVswXV0pKSBwW2l0ZW1bMF1dID0gW3BbaXRlbVswXV1dO1xuICAgICAgICBwW2l0ZW1bMF1dLnB1c2goaXRlbVsxXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgZWxzZSB7XG4gICAgcCA9IFtdO1xuICAgIGVhY2goTywgZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgIHAucHVzaChrICsgXCI9XCIgKyBlc2NhcGUodikpO1xuICAgIH0pO1xuICAgIHJldHVybiBwLmpvaW4oJyYnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGUocykge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUocykge1xuICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHMpO1xufVxuXG5mdW5jdGlvbiBlcnJvcigpIHtcbiAgaW5mby5vbmVycm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGxvY2FsRGF0ZSh5eSwgbW0sIGRkLCBoaCwgbWksIHNzKSB7XG4gIHZhciB1dGNELCBsb2NhbEQ7XG4gIGxvY2FsRCA9IG5ldyBEYXRlKCk7XG4gIGlmIChtbSA8IDApIG1tID0gMDtcbiAgaWYgKHR5cGVvZiBoaCA9PT0gXCJ1bmRlZmluZWRcIikgaGggPSAxMjtcbiAgaWYgKHR5cGVvZiBtaSA9PT0gXCJ1bmRlZmluZWRcIikgbWkgPSAwO1xuICB1dGNEID0gbmV3IERhdGUoRGF0ZS5VVEMoeXksIG1tLCBkZCB8fCAxLCBoaCwgbWksIHNzIHx8IDApKTtcblxuICBpZiAobW0gPT0gMCAmJiBkZCA9PSAxICYmIHV0Y0QuZ2V0VVRDSG91cnMoKSArICh1dGNELmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MCkgPCAwKSB7XG4gICAgdXRjRC5zZXRVVENIb3VycygwKTtcbiAgfVxuICBlbHNlIHtcbiAgICB1dGNELnNldFVUQ0hvdXJzKHV0Y0QuZ2V0VVRDSG91cnMoKSArICh1dGNELmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MCkpO1xuICB9XG4gIHJldHVybiB1dGNEO1xufVxuXG5mdW5jdGlvbiBkYXRlKGQsIGNvbmQpIHtcbiAgbGV0IHl5LCBtbSwgZGQsIGhoLCBtaSxcbiAgICBhRGF0ZVRpbWUsIGFUaW1lcywgYVRpbWUsIGFEYXRlLFxuICAgIHZhLFxuICAgIElTT184NjAxID0gL15cXGR7NH0oLVxcZFxcZCgtXFxkXFxkKFRcXGRcXGQ6XFxkXFxkKDpcXGRcXGQpPyhcXC5cXGQrKT8oKFsrLV1cXGRcXGQ6XFxkXFxkKXxaKT8pPyk/KT8kL2ksXG4gICAgSVNPXzg2MDFfRlVMTCA9IC9eXFxkezR9LVxcZFxcZC1cXGRcXGRUXFxkXFxkOlxcZFxcZDpcXGRcXGQoXFwuXFxkKyk/KChbKy1dXFxkXFxkOlxcZFxcZCl8Wik/JC9pO1xuXG4gIGlmIChpc1N0cmluZyhkKSkge1xuICAgIGlmIChkLmxlbmd0aCA9PSAwKSB7XG4gICAgICBkID0gbmV3IERhdGUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZC5sZW5ndGggPiAxNSkge1xuICAgICAgaWYgKElTT184NjAxX0ZVTEwudGVzdChkKSB8fCBJU09fODYwMS50ZXN0KGQpKSB7XG4gICAgICAgIGQgPSBuZXcgRGF0ZShkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFEYXRlVGltZSA9IGQuc3BsaXQoLyAvZyksIGFUaW1lcywgYVRpbWUsXG4gICAgICAgICAgYURhdGUgPSBhRGF0ZVRpbWVbMF0uc3BsaXQoL1xcRC9nKSxcbiAgICAgICAgICB5eSA9IGFEYXRlWzBdO1xuICAgICAgICBtbSA9IHBhcnNlRmxvYXQoYURhdGVbMV0pO1xuICAgICAgICBkZCA9IHBhcnNlRmxvYXQoYURhdGVbMl0pO1xuICAgICAgICBhVGltZSA9IGFEYXRlVGltZVsxXSB8fCBcIjA5OjAwXCI7XG4gICAgICAgIGFUaW1lcyA9IGFUaW1lLnN1YnN0cmluZygwLCA1KS5zcGxpdChcIjpcIik7XG4gICAgICAgIGhoID0gcGFyc2VGbG9hdChhVGltZXNbMF0pO1xuICAgICAgICBtaSA9IHBhcnNlRmxvYXQoYVRpbWVzWzFdKTtcbiAgICAgICAgaWYgKHJpZ2h0KGFUaW1lLCAyKSA9PT0gXCJBTVwiIHx8IHJpZ2h0KGFUaW1lLCAyKSA9PT0gXCJQTVwiKSBoaCArPSAxMjtcbiAgICAgICAgZCA9IGxvY2FsRGF0ZSh5eSwgbW0gLSAxLCBkZCwgaGgsIG1pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZC5sZW5ndGggPT0gMTQpIHtcbiAgICAgIHZhID0gZC5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICBkID0gbG9jYWxEYXRlKHZhLnN1YnN0cigwLCA0KSwgdmEuc3Vic3RyKDQsIDIpIC0gMSwgbnVtYmVyKHZhLnN1YnN0cig2LCAyKSksIG51bWJlcih2YS5zdWJzdHIoOCwgMikpLCBudW1iZXIodmEuc3Vic3RyKDEwLCAyKSksIG51bWJlcih2YS5zdWJzdHIoMTIsIDIpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGQubGVuZ3RoID4gNykge1xuICAgICAgdmEgPSBkLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgIGQgPSBsb2NhbERhdGUodmEuc3Vic3RyKDAsIDQpLCB2YS5zdWJzdHIoNCwgMikgLSAxLCBudW1iZXIodmEuc3Vic3RyKDYsIDIpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGQubGVuZ3RoID4gNCkge1xuICAgICAgdmEgPSBkLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgIGQgPSBsb2NhbERhdGUodmEuc3Vic3RyKDAsIDQpLCB2YS5zdWJzdHIoNCwgMikgLSAxLCAxKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZC5sZW5ndGggPiAyKSB7XG4gICAgICB2YSA9IGQucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgICAgcmV0dXJuIGxvY2FsRGF0ZSh2YS5zdWJzdHIoMCwgNCksIHZhLnN1YnN0cig0LCAyKSAtIDEsIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGQgPSBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIGNvbmQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gZDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoXCJhZGRcIiBpbiBjb25kKSB7XG4gICAgICBkID0gKGZ1bmN0aW9uIChfZCwgb3B0cykge1xuICAgICAgICBsZXQgeXksIG1tLCBkZCwgbXhkZCxcbiAgICAgICAgICBEeU1pbGxpID0gKCgxMDAwICogNjApICogNjApICogMjQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzW1wiZFwiXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIF9kLnNldFRpbWUoX2QuZ2V0VGltZSgpICsgKG9wdHNbXCJkXCJdICogRHlNaWxsaSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRzW1wibVwiXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIHl5ID0gX2QuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICBtbSA9IF9kLmdldE1vbnRoKCk7XG4gICAgICAgICAgZGQgPSBfZC5nZXREYXRlKCk7XG4gICAgICAgICAgeXkgPSB5eSArIHBhcnNlSW50KG9wdHNbXCJtXCJdIC8gMTIpO1xuICAgICAgICAgIG1tICs9IG9wdHNbXCJtXCJdICUgMTI7XG4gICAgICAgICAgbXhkZCA9IGRheXNPZk1vbnRoKHl5LCBtbSk7XG4gICAgICAgICAgaWYgKG14ZGQgPCBkZCkgZGQgPSBteGRkO1xuICAgICAgICAgIF9kID0gbmV3IERhdGUoeXksIG1tLCBkZCwgMTIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRzW1wieVwiXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIF9kLnNldFRpbWUoX2QuZ2V0VGltZSgpICsgKChvcHRzW1wieVwiXSAqIDM2NSkgKiBEeU1pbGxpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdHNbXCJoXCJdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgX2Quc2V0VGltZShfZC5nZXRUaW1lKCkgKyAob3B0c1tcImhcIl0gKiAxMDAwICogNjAgKiA2MCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9kO1xuICAgICAgfSkobmV3IERhdGUoZCksIGNvbmRbXCJhZGRcIl0pO1xuICAgIH1cbiAgICBpZiAoXCJzZXRcIiBpbiBjb25kKSB7XG4gICAgICBkID0gKGZ1bmN0aW9uIChfZCwgb3B0cykge1xuICAgICAgICBsZXQgeXksIG1tLCBkZCxcbiAgICAgICAgICBwcm9jZXNzb3IgPSB7XG4gICAgICAgICAgICBcImZpcnN0RGF5T2ZNb250aFwiOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICB5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgbW0gPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICAgIGRkID0gMTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHl5LCBtbSwgZGQsIDEyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxhc3REYXlPZk1vbnRoXCI6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgIHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICBtbSA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgICAgZGQgPSBkYXlzT2ZNb250aCh5eSwgbW0pO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeXksIG1tLCBkZCwgMTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIGlmIChvcHRzIGluIHByb2Nlc3Nvcikge1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzb3Jbb3B0c10oX2QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfZDtcbiAgICAgICAgfVxuICAgICAgfSkobmV3IERhdGUoZCksIGNvbmRbXCJzZXRcIl0pO1xuICAgIH1cbiAgICBpZiAoXCJyZXR1cm5cIiBpbiBjb25kKSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgZlN0ciA9IGNvbmRbXCJyZXR1cm5cIl0sIG5ZLCBuTSwgbkQsIG5ILCBuTU0sIG5TLCBuRFcsXG4gICAgICAgICAgeXJlLCByZWdZLCBtcmUsIHJlZ00sIGRyZSwgcmVnRCwgaHJlLCByZWdILCBtaXJlLCByZWdNSSwgc3JlLCByZWdTLCBkd3JlLCByZWdEVztcblxuICAgICAgICBuWSA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgbk0gPSBzZXREaWdpdChkLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgICAgICAgbkQgPSBzZXREaWdpdChkLmdldERhdGUoKSwgMik7XG4gICAgICAgIG5IID0gc2V0RGlnaXQoZC5nZXRIb3VycygpLCAyKTtcbiAgICAgICAgbk1NID0gc2V0RGlnaXQoZC5nZXRNaW51dGVzKCksIDIpO1xuICAgICAgICBuUyA9IHNldERpZ2l0KGQuZ2V0U2Vjb25kcygpLCAyKTtcbiAgICAgICAgbkRXID0gZC5nZXREYXkoKTtcblxuICAgICAgICB5cmUgPSAvW155XSooeXl5eSlbXnldKi9naTtcbiAgICAgICAgeXJlLmV4ZWMoZlN0cik7XG4gICAgICAgIHJlZ1kgPSBSZWdFeHAuJDE7XG4gICAgICAgIG1yZSA9IC9bXm1dKihNTSlbXm1dKi9nO1xuICAgICAgICBtcmUuZXhlYyhmU3RyKTtcbiAgICAgICAgcmVnTSA9IFJlZ0V4cC4kMTtcbiAgICAgICAgZHJlID0gL1teZF0qKGRkKVteZF0qL2dpO1xuICAgICAgICBkcmUuZXhlYyhmU3RyKTtcbiAgICAgICAgcmVnRCA9IFJlZ0V4cC4kMTtcbiAgICAgICAgaHJlID0gL1teaF0qKGhoKVteaF0qL2dpO1xuICAgICAgICBocmUuZXhlYyhmU3RyKTtcbiAgICAgICAgcmVnSCA9IFJlZ0V4cC4kMTtcbiAgICAgICAgbWlyZSA9IC9bXm1dKihtbSlbXmldKi9nO1xuICAgICAgICBtaXJlLmV4ZWMoZlN0cik7XG4gICAgICAgIHJlZ01JID0gUmVnRXhwLiQxO1xuICAgICAgICBzcmUgPSAvW15zXSooc3MpW15zXSovZ2k7XG4gICAgICAgIHNyZS5leGVjKGZTdHIpO1xuICAgICAgICByZWdTID0gUmVnRXhwLiQxO1xuICAgICAgICBkd3JlID0gL1teZF0qKGR3KVted10qL2dpO1xuICAgICAgICBkd3JlLmV4ZWMoZlN0cik7XG4gICAgICAgIHJlZ0RXID0gUmVnRXhwLiQxO1xuXG4gICAgICAgIGlmIChyZWdZID09PSBcInl5eXlcIikge1xuICAgICAgICAgIGZTdHIgPSBmU3RyLnJlcGxhY2UocmVnWSwgcmlnaHQoblksIHJlZ1kubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ00gPT09IFwiTU1cIikge1xuICAgICAgICAgIGlmIChyZWdNLmxlbmd0aCA9PSAxKSBuTSA9IChkLmdldE1vbnRoKCkgKyAxKTtcbiAgICAgICAgICBmU3RyID0gZlN0ci5yZXBsYWNlKHJlZ00sIG5NKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnRCA9PT0gXCJkZFwiKSB7XG4gICAgICAgICAgaWYgKHJlZ0QubGVuZ3RoID09IDEpIG5EID0gZC5nZXREYXRlKCk7XG4gICAgICAgICAgZlN0ciA9IGZTdHIucmVwbGFjZShyZWdELCBuRCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ0ggPT09IFwiaGhcIikge1xuICAgICAgICAgIGZTdHIgPSBmU3RyLnJlcGxhY2UocmVnSCwgbkgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWdNSSA9PT0gXCJtbVwiKSB7XG4gICAgICAgICAgZlN0ciA9IGZTdHIucmVwbGFjZShyZWdNSSwgbk1NKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnUyA9PT0gXCJzc1wiKSB7XG4gICAgICAgICAgZlN0ciA9IGZTdHIucmVwbGFjZShyZWdTLCBuUyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ0RXID09IFwiZHdcIikge1xuICAgICAgICAgIGZTdHIgPSBmU3RyLnJlcGxhY2UocmVnRFcsIGluZm8ud2Vla05hbWVzW25EV10ubGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmU3RyO1xuICAgICAgfSkoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGRheShkLCBjb25kKSB7XG4gIGxldCBtZW1vcnlEYXkgPSBkYXRlKGQpLCBEeU1pbGxpID0gKCgxMDAwICogNjApICogNjApICogMjQsIHRvZGF5ID0gbmV3IERhdGUoKSwgZGlmZm51bSwgdGhpc1llYXJNZW1vcnlEYXk7XG5cbiAgZnVuY3Rpb24gZ2V0RGF5VGltZShfZCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKF9kLmdldFRpbWUoKSAvIER5TWlsbGkpICogRHlNaWxsaTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY29uZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGRpZmZudW0gPSBudW1iZXIoKCggZ2V0RGF5VGltZShtZW1vcnlEYXkpIC0gZ2V0RGF5VGltZSh0b2RheSkgKSAvIER5TWlsbGkpLCB7Zmxvb3I6IHRydWV9KTtcbiAgICByZXR1cm4gZGlmZm51bTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIGRpZmZudW0gPSBudW1iZXIoKCggZ2V0RGF5VGltZShtZW1vcnlEYXkpIC0gZ2V0RGF5VGltZSh0b2RheSkgKSAvIER5TWlsbGkpLCB7Zmxvb3I6IHRydWV9KTtcbiAgICBpZiAoY29uZFtcInRvZGF5XCJdKSB7XG4gICAgICB0b2RheSA9IGRhdGUoY29uZC50b2RheSk7XG4gICAgICBkaWZmbnVtID0gbnVtYmVyKCgoIGdldERheVRpbWUobWVtb3J5RGF5KSAtIGdldERheVRpbWUodG9kYXkpICkgLyBEeU1pbGxpKSwge2Zsb29yOiB0cnVlfSk7XG4gICAgfVxuICAgIGlmIChjb25kW1widGhpc1llYXJcIl0pIHtcbiAgICAgIHRoaXNZZWFyTWVtb3J5RGF5ID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgbWVtb3J5RGF5LmdldE1vbnRoKCksIG1lbW9yeURheS5nZXREYXRlKCkpO1xuICAgICAgZGlmZm51bSA9IG51bWJlcigoKCBnZXREYXlUaW1lKHRoaXNZZWFyTWVtb3J5RGF5KSAtIGdldERheVRpbWUodG9kYXkpICkgLyBEeU1pbGxpKSwge2Zsb29yOiB0cnVlfSk7XG4gICAgICBpZiAoZGlmZm51bSA8IDApIHtcbiAgICAgICAgdGhpc1llYXJNZW1vcnlEYXkgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpICsgMSwgbWVtb3J5RGF5LmdldE1vbnRoKCksIG1lbW9yeURheS5nZXREYXRlKCkpO1xuICAgICAgICBkaWZmbnVtID0gbnVtYmVyKCgoIGdldERheVRpbWUodGhpc1llYXJNZW1vcnlEYXkpIC0gZ2V0RGF5VGltZSh0b2RheSkgKSAvIER5TWlsbGkpLCB7Zmxvb3I6IHRydWV9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbmRbXCJhZ2VcIl0pIHtcbiAgICAgIHRoaXNZZWFyTWVtb3J5RGF5ID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgbWVtb3J5RGF5LmdldE1vbnRoKCksIG1lbW9yeURheS5nZXREYXRlKCkpO1xuICAgICAgZGlmZm51bSA9IHRoaXNZZWFyTWVtb3J5RGF5LmdldEZ1bGxZZWFyKCkgLSBtZW1vcnlEYXkuZ2V0RnVsbFllYXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZm51bTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3ZWVrc09mTW9udGgoZCkge1xuICBsZXQgbXlEYXRlID0gZGF0ZShkKTtcbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBteURhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICBtb250aDogbXlEYXRlLmdldE1vbnRoKCkgKyAxLFxuICAgIGNvdW50OiBwYXJzZUludChteURhdGUuZ2V0RGF0ZSgpIC8gNyArIDEpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRheXNPZk1vbnRoKHksIG0pIHtcbiAgaWYgKG0gPT0gMyB8fCBtID09IDUgfHwgbSA9PSA4IHx8IG0gPT0gMTApIHtcbiAgICByZXR1cm4gMzA7XG4gIH1cbiAgZWxzZSBpZiAobSA9PSAxKSB7XG4gICAgcmV0dXJuICgoKHkgJSA0ID09IDApICYmICh5ICUgMTAwICE9IDApKSB8fCAoeSAlIDQwMCA9PSAwKSkgPyAyOSA6IDI4O1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiAzMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREaWdpdChudW0sIGxlbmd0aCwgcGFkZGVyLCByYWRpeCkge1xuICBsZXQgcyA9IG51bS50b1N0cmluZyhyYWRpeCB8fCAxMCk7XG4gIHJldHVybiB0aW1lcygocGFkZGVyIHx8ICcwJyksIChsZW5ndGggLSBzLmxlbmd0aCkpICsgcztcbn1cblxuZnVuY3Rpb24gdGltZXMocywgY291bnQpIHtcbiAgcmV0dXJuIGNvdW50IDwgMSA/ICcnIDogbmV3IEFycmF5KGNvdW50ICsgMSkuam9pbihzKTtcbn1cblxuZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoX3RhcmdldCwgY29uZCkge1xuICBpZiAoX3RhcmdldCkge1xuICAgIHdoaWxlICgoZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICBpZiAodHlwZW9mIGNvbmQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgX3RhcmdldCA9IChfdGFyZ2V0LnBhcmVudE5vZGUpID8gX3RhcmdldC5wYXJlbnROb2RlIDogZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKGNvbmQpKSB7XG4gICAgICAgIHJlc3VsdCA9IGNvbmQoX3RhcmdldCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc09iamVjdChjb25kKSkge1xuICAgICAgICBmb3IgKGxldCBrIGluIGNvbmQpIHtcbiAgICAgICAgICBpZiAoayA9PT0gXCJ0YWduYW1lXCIpIHtcbiAgICAgICAgICAgIGlmIChfdGFyZ2V0LnRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSAhPSBjb25kW2tdKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoayA9PT0gXCJjbGF6elwiIHx8IGsgPT09IFwiY2xhc3NfbmFtZVwiKSB7XG4gICAgICAgICAgICBpZiAoXCJjbGFzc05hbWVcIiBpbiBfdGFyZ2V0KSB7XG4gICAgICAgICAgICAgIGxldCBrbGFzc3MgPSBfdGFyZ2V0LmNsYXNzTmFtZS5zcGxpdChyZUNsYXNzTmFtZVNwbGl0KSxcbiAgICAgICAgICAgICAgICBoYXNDbGFzcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwga2xhc3NzLmxlbmd0aDsgYSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtsYXNzc1thXSA9PSBjb25kW2tdKSB7XG4gICAgICAgICAgICAgICAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0ID0gaGFzQ2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHsgLy8g6re47Jm4IOyGjeyEseqwkuuTpC5cbiAgICAgICAgICAgIGlmIChfdGFyZ2V0LmdldEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICBpZiAoX3RhcmdldC5nZXRBdHRyaWJ1dGUoaykgIT0gY29uZFtrXSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgfSkoKSkge1xuICAgICAgaWYgKF90YXJnZXQucGFyZW50Tm9kZSAmJiBfdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICBfdGFyZ2V0ID0gX3RhcmdldC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIF90YXJnZXQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBfdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBjc3NOdW1iZXIodmFsKSB7XG4gIGxldCByZSA9IC9cXEQ/KFxcZCspKFthLXpBLVolXSopL2ksXG4gICAgZm91bmQgPSAoJycgKyB2YWwpLm1hdGNoKHJlKSxcbiAgICB1bml0ID0gZm91bmRbMl0gfHwgXCJweFwiO1xuXG4gIHJldHVybiBmb3VuZFsxXSArIHVuaXQ7XG59XG5cbmZ1bmN0aW9uIGNzcyh2YWwpIHtcbiAgbGV0IHJldHVybnM7XG4gIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgcmV0dXJucyA9ICcnO1xuICAgIGZvciAobGV0IGsgaW4gdmFsKSB7XG4gICAgICByZXR1cm5zICs9IGsgKyAnOicgKyB2YWxba10gKyAnOyc7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5zO1xuICB9XG4gIGVsc2UgaWYgKGlzU3RyaW5nKHZhbCkpIHtcbiAgICByZXR1cm5zID0ge307XG4gICAgbGV0IHZhbFNwbGl0ZWQgPSB2YWwuc3BsaXQoL1sgXSo7WyBdKi9nKTtcbiAgICB2YWxTcGxpdGVkLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgIGlmICgodiA9IHYudHJpbSgpKSAhPT0gXCJcIikge1xuICAgICAgICB2YXIgdlNwbGl0ZWQgPSB2LnNwbGl0KC9bIF0qOlsgXSovZyk7XG4gICAgICAgIHJldHVybnNbdlNwbGl0ZWRbMF1dID0gdlNwbGl0ZWRbMV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldHVybnM7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcEV2ZW50KGUpIHtcbiAgLy8g7J2067Kk7Yq4IOykkeyngCDqtazrrLhcbiAgaWYgKCFlKSBlID0gd2luZG93LmV2ZW50O1xuXG4gIC8vZS5jYW5jZWxCdWJibGUgaXMgc3VwcG9ydGVkIGJ5IElFIC1cbiAgLy8gdGhpcyB3aWxsIGtpbGwgdGhlIGJ1YmJsaW5nIHByb2Nlc3MuXG4gIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gIC8vZS5zdG9wUHJvcGFnYXRpb24gd29ya3Mgb25seSBpbiBGaXJlZm94LlxuICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgcmV0dXJuIGZhbHNlO1xuICAvLyDsnbTrsqTtirgg7KSR7KeAIOq1rOusuCDrgZ1cbn1cblxuY29uc3Qgc2VsZWN0UmFuZ2UgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgJ3RleHRSYW5nZSc6IHtcbiAgICAgICdzZWxlY3RBbGwnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcblxuICAgICAgfSxcbiAgICAgICdhcnInOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIG9mZnNldFswXSk7IC8vIHRvZG8gaWUgbm9kZSBzZWxlY3Qg7LK07YGs7ZWE7JqUXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKCk7XG4gICAgICAgIHJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgb2Zmc2V0WzFdKTtcbiAgICAgIH0sXG4gICAgICAnc3RhcnQnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIDApO1xuICAgICAgICByYW5nZS5jb2xsYXBzZSgpO1xuICAgICAgfSxcbiAgICAgICdlbmQnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIHJhbmdlLnRleHQubGVuZ3RoKTtcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICdyYW5nZSc6IHtcbiAgICAgICdzZWxlY3RBbGwnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsKTtcbiAgICAgIH0sXG4gICAgICAnYXJyJzogZnVuY3Rpb24gKGVsLCByYW5nZSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChpc09iamVjdChvZmZzZXRbMF0pKSB7XG4gICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQob2Zmc2V0WzBdLm5vZGUsIG9mZnNldFswXS5vZmZzZXQpO1xuICAgICAgICAgIHJhbmdlLnNldEVuZChvZmZzZXRbMV0ubm9kZSwgb2Zmc2V0WzFdLm9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZWwuZmlyc3RDaGlsZCwgb2Zmc2V0WzBdKTtcbiAgICAgICAgICByYW5nZS5zZXRFbmQoZWwuZmlyc3RDaGlsZCwgb2Zmc2V0WzFdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdzdGFydCc6IGZ1bmN0aW9uIChlbCwgcmFuZ2UsIG9mZnNldCkge1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWwpO1xuICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgICAnZW5kJzogZnVuY3Rpb24gKGVsLCByYW5nZSwgb2Zmc2V0KSB7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbiAoZWwsIG9mZnNldCkge1xuICAgIGxldCByYW5nZSwgcmFuZ2VUeXBlLCBzZWxlY3Rpb247XG5cbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgIGVsID0gZWwuZ2V0KDApO1xuICAgIH1cbiAgICBpZiAoIWVsKSByZXR1cm47XG5cbiAgICAvLyDroIjsnbjsp4Ag7YOA7J6FIOyEoO2DnVxuICAgIGlmIChkb2MuYm9keS5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICAgIHJhbmdlID0gZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGVsKTtcbiAgICAgIHJhbmdlVHlwZSA9IFwidGV4dFJhbmdlXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlVHlwZSA9IFwicmFuZ2VcIjtcbiAgICB9XG5cbiAgICAvLyByYW5nZSDsoIHsmqlcbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBwcm9jZXNzb3JbcmFuZ2VUeXBlXS5zZWxlY3RBbGwuY2FsbCh0aGlzLCBlbCwgcmFuZ2UsIG9mZnNldCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQXJyYXkob2Zmc2V0KSkge1xuICAgICAgcHJvY2Vzc29yW3JhbmdlVHlwZV0uYXJyLmNhbGwodGhpcywgZWwsIHJhbmdlLCBvZmZzZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9jZXNzb3JbcmFuZ2VUeXBlXSkge1xuICAgICAgICBpZiAob2Zmc2V0ID09IGtleSkge1xuICAgICAgICAgIHByb2Nlc3NvcltyYW5nZVR5cGVdW2tleV0uY2FsbCh0aGlzLCBlbCwgcmFuZ2UsIG9mZnNldCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDtj6zsu6TsiqQg67CPIOyFgOugie2KuFxuICAgIGlmIChkb2MuYm9keS5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgZWwuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgZWwuZm9jdXMoKTtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxuXG4gIH1cbn0pKCk7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL2RlYm91bmNlLmpzXG5jb25zdCBkZWJvdW5jZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIGxldCBsYXN0QXJncyxcbiAgICBsYXN0VGhpcyxcbiAgICBtYXhXYWl0LFxuICAgIHJlc3VsdCxcbiAgICB0aW1lcklkLFxuICAgIGxhc3RDYWxsVGltZTtcblxuICBsZXQgbGFzdEludm9rZVRpbWUgPSAwO1xuICBsZXQgbGVhZGluZyA9IGZhbHNlO1xuICBsZXQgbWF4aW5nID0gZmFsc2U7XG4gIGxldCB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIGZ1bmN0aW9uJylcbiAgfVxuICB3YWl0ID0gK3dhaXQgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBNYXRoLm1heCgrb3B0aW9ucy5tYXhXYWl0IHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgY29uc3QgYXJncyA9IGxhc3RBcmdzO1xuICAgIGNvbnN0IHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICBjb25zdCB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWU7XG4gICAgY29uc3QgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcbiAgICBjb25zdCByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gTWF0aC5taW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIGNvbnN0IHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZTtcbiAgICBjb25zdCB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKVxuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKVxuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZFxuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShEYXRlLm5vdygpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmdzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSlcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkXG59O1xuXG4vL2h0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL3Rocm90dGxlLmpzXG5jb25zdCB0aHJvdHRsZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIGxldCBsZWFkaW5nID0gdHJ1ZTtcbiAgbGV0IHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgZnVuY3Rpb24nKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gZGVlcENvcHkob2JqKSB7XG4gIGxldCByLCBsO1xuICBpZiAodHlwZW9mIG9iaiA9PSAnb2JqZWN0Jykge1xuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgIGwgPSBvYmoubGVuZ3RoO1xuICAgICAgciA9IG5ldyBBcnJheShsKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHJbaV0gPSBkZWVwQ29weShvYmpbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvYmopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHMpIHtcbiAgaWYgKF90b1N0cmluZy5jYWxsKHMpICE9IFwiW29iamVjdCBTdHJpbmddXCIpIHJldHVybiBzO1xuICBpZiAoIXMpIHJldHVybiBcIlwiO1xuICByZXR1cm4gcy5yZXBsYWNlKC9bXFw8XFw+XFwmXFxcIl0vZ20sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHN3aXRjaCAobWF0Y2gpIHtcbiAgICAgIGNhc2UgXCI8XCI6XG4gICAgICAgIHJldHVybiBcIiZsdDtcIjtcbiAgICAgIGNhc2UgXCI+XCI6XG4gICAgICAgIHJldHVybiBcIiZndDtcIjtcbiAgICAgIGNhc2UgXCImXCI6XG4gICAgICAgIHJldHVybiBcIiZhbXA7XCI7XG4gICAgICBjYXNlIFwiXFxcIlwiOlxuICAgICAgICByZXR1cm4gXCImcXVvdDtcIjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZUh0bWwocykge1xuICBpZiAoX3RvU3RyaW5nLmNhbGwocykgIT0gXCJbb2JqZWN0IFN0cmluZ11cIikgcmV0dXJuIHM7XG4gIGlmICghcykgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBzLnJlcGxhY2UoLygmbHQ7KXwoJmd0Oyl8KCZhbXA7KXwoJnF1b3Q7KS9nbSwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgc3dpdGNoIChtYXRjaCkge1xuICAgICAgY2FzZSBcIiZsdDtcIjpcbiAgICAgICAgcmV0dXJuIFwiPFwiO1xuICAgICAgY2FzZSBcIiZndDtcIjpcbiAgICAgICAgcmV0dXJuIFwiPlwiO1xuICAgICAgY2FzZSBcIiZhbXA7XCI6XG4gICAgICAgIHJldHVybiBcIiZcIjtcbiAgICAgIGNhc2UgXCImcXVvdDtcIjpcbiAgICAgICAgcmV0dXJuIFwiXFxcIlwiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQG5hbWVzcGFjZSBheDZzdHJpbmdcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogQVg2VXRpbC5zdHJpbmcoXCJ7MH0gaXMgZGVhZFwiKS5mb3JtYXQoXCJBXCIpO1xuICogQVg2VXRpbC5zdHJpbmcoXCJTdHJpbmdcIikuZXNjYXBlKCk7XG4gKiBBWDZVdGlsLnN0cmluZyhcIlN0cmluZ1wiKS51bmVzY2FwZSgpO1xuICogQVg2VXRpbC5zdHJpbmcoXCJTdHJpbmdcIikuZW5jb2RlKCk7XG4gKiBBWDZVdGlsLnN0cmluZyhcIlN0cmluZ1wiKS5kZWNvZGUoKTtcbiAqIEFYNlV0aWwuc3RyaW5nKFwiU3RyaW5nXCIpLmxlZnQoMSk7XG4gKiBBWDZVdGlsLnN0cmluZyhcIlN0cmluZ1wiKS5yaWdodCgxKTtcbiAqIEFYNlV0aWwuc3RyaW5nKFwiU3RyaW5nXCIpLmNhbWVsQ2FzZSgpO1xuICogQVg2VXRpbC5zdHJpbmcoXCJTdHJpbmdcIikuc25ha2VDYXNlKCk7XG4gKiBgYGBcbiAqL1xuXG5mdW5jdGlvbiBzdHJpbmcoX3N0cmluZykge1xuICByZXR1cm4gbmV3IChmdW5jdGlvbiAoX3N0cmluZykge1xuICAgIHRoaXMudmFsdWUgPSBfc3RyaW5nO1xuICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9O1xuICAgIHRoaXMuZm9ybWF0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoYXJndW1lbnRzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlLnJlcGxhY2UoL3soXFxkKyl9L2csIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnc1tudW1iZXJdICE9ICd1bmRlZmluZWQnID8gYXJnc1tudW1iZXJdIDogbWF0Y2g7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZXNjYXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGVzY2FwZUh0bWwodGhpcy52YWx1ZSk7XG4gICAgfTtcbiAgICB0aGlzLnVuZXNjYXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHVuZXNjYXBlSHRtbCh0aGlzLnZhbHVlKTtcbiAgICB9O1xuICAgIHRoaXMuZW5jb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGVuY29kZSh0aGlzLnZhbHVlKTtcbiAgICB9O1xuICAgIHRoaXMuZGVjb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRlY29kZSh0aGlzLnZhbHVlKTtcbiAgICB9O1xuICAgIHRoaXMubGVmdCA9IGZ1bmN0aW9uIChfcG9zKSB7XG4gICAgICByZXR1cm4gbGVmdCh0aGlzLnZhbHVlLCBfcG9zKTtcbiAgICB9O1xuICAgIHRoaXMucmlnaHQgPSBmdW5jdGlvbiAoX3Bvcykge1xuICAgICAgcmV0dXJuIHJpZ2h0KHRoaXMudmFsdWUsIF9wb3MpO1xuICAgIH07XG4gICAgdGhpcy5jYW1lbENhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY2FtZWxDYXNlKHRoaXMudmFsdWUpO1xuICAgIH07XG4gICAgdGhpcy5zbmFrZUNhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc25ha2VDYXNlKHRoaXMudmFsdWUpO1xuICAgIH07XG4gIH0pKF9zdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBjb2xvcihfaGV4Q29sb3IpIHtcblxuICBjb25zdCBtYXRjaGVycyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy12YWx1ZXMvI2ludGVnZXJzPlxuICAgIGNvbnN0IENTU19JTlRFR0VSID0gXCJbLVxcXFwrXT9cXFxcZCslP1wiO1xuXG4gICAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNudW1iZXItdmFsdWU+XG4gICAgY29uc3QgQ1NTX05VTUJFUiA9IFwiWy1cXFxcK10/XFxcXGQqXFxcXC5cXFxcZCslP1wiO1xuXG4gICAgLy8gQWxsb3cgcG9zaXRpdmUvbmVnYXRpdmUgaW50ZWdlci9udW1iZXIuICBEb24ndCBjYXB0dXJlIHRoZSBlaXRoZXIvb3IsIGp1c3QgdGhlIGVudGlyZSBvdXRjb21lLlxuICAgIGNvbnN0IENTU19VTklUID0gXCIoPzpcIiArIENTU19OVU1CRVIgKyBcIil8KD86XCIgKyBDU1NfSU5URUdFUiArIFwiKVwiO1xuXG4gICAgLy8gQWN0dWFsIG1hdGNoaW5nLlxuICAgIC8vIFBhcmVudGhlc2VzIGFuZCBjb21tYXMgYXJlIG9wdGlvbmFsLCBidXQgbm90IHJlcXVpcmVkLlxuICAgIC8vIFdoaXRlc3BhY2UgY2FuIHRha2UgdGhlIHBsYWNlIG9mIGNvbW1hcyBvciBvcGVuaW5nIHBhcmVuXG4gICAgY29uc3QgUEVSTUlTU0lWRV9NQVRDSDMgPSBcIltcXFxcc3xcXFxcKF0rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilcXFxccypcXFxcKT9cIjtcbiAgICBjb25zdCBQRVJNSVNTSVZFX01BVENINCA9IFwiW1xcXFxzfFxcXFwoXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVxcXFxzKlxcXFwpP1wiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIENTU19VTklUOiBuZXcgUmVnRXhwKENTU19VTklUKSxcbiAgICAgIHJnYjogbmV3IFJlZ0V4cChcInJnYlwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgICAgcmdiYTogbmV3IFJlZ0V4cChcInJnYmFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICAgIGhzbDogbmV3IFJlZ0V4cChcImhzbFwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgICAgaHNsYTogbmV3IFJlZ0V4cChcImhzbGFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICAgIGhzdjogbmV3IFJlZ0V4cChcImhzdlwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgICAgaHN2YTogbmV3IFJlZ0V4cChcImhzdmFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICAgIGhleDM6IC9eIz8oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkkLyxcbiAgICAgIGhleDY6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcbiAgICAgIGhleDQ6IC9eIz8oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pJC8sXG4gICAgICBoZXg4OiAvXiM/KFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KSQvXG4gICAgfTtcbiAgfSkoKTtcblxuICBjb25zdCBjb252ZXJ0T2JqZWN0ID0gZnVuY3Rpb24gKF9jb2xvcikge1xuICAgIGxldCBtYXRjaDtcbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMucmdiLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7cjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXX07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5yZ2JhLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7cjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSwgYTogbWF0Y2hbNF19O1xuICAgIH1cbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaHNsLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXX07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc2xhLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXSwgYTogbWF0Y2hbNF19O1xuICAgIH1cbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaHN2LmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXX07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc3ZhLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSwgYTogbWF0Y2hbNF19O1xuICAgIH1cbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaGV4OC5leGVjKF9jb2xvcikpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBwYXJzZUludChtYXRjaFsxXSwgMTYpLFxuICAgICAgICBnOiBwYXJzZUludChtYXRjaFsyXSwgMTYpLFxuICAgICAgICBiOiBwYXJzZUludChtYXRjaFszXSwgMTYpLFxuICAgICAgICBhOiBwYXJzZUludCgobWF0Y2hbNF0pIC8gMjU1LCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXg4XCJcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oZXg2LmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IHBhcnNlSW50KG1hdGNoWzFdLCAxNiksXG4gICAgICAgIGc6IHBhcnNlSW50KG1hdGNoWzJdLCAxNiksXG4gICAgICAgIGI6IHBhcnNlSW50KG1hdGNoWzNdLCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXhcIlxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhleDQuZXhlYyhfY29sb3IpKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogcGFyc2VJbnQobWF0Y2hbMV0gKyAnJyArIG1hdGNoWzFdLCAxNiksXG4gICAgICAgIGc6IHBhcnNlSW50KG1hdGNoWzJdICsgJycgKyBtYXRjaFsyXSwgMTYpLFxuICAgICAgICBiOiBwYXJzZUludChtYXRjaFszXSArICcnICsgbWF0Y2hbM10sIDE2KSxcbiAgICAgICAgYTogcGFyc2VJbnQobWF0Y2hbNF0gKyAnJyArIG1hdGNoWzRdLCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXg4XCJcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oZXgzLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IHBhcnNlSW50KG1hdGNoWzFdICsgJycgKyBtYXRjaFsxXSwgMTYpLFxuICAgICAgICBnOiBwYXJzZUludChtYXRjaFsyXSArICcnICsgbWF0Y2hbMl0sIDE2KSxcbiAgICAgICAgYjogcGFyc2VJbnQobWF0Y2hbM10gKyAnJyArIG1hdGNoWzNdLCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXhcIlxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNPbmVQb2ludFplcm8obikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PSBcInN0cmluZ1wiICYmIG4uaW5kZXhPZignLicpICE9IC0xICYmIHBhcnNlRmxvYXQobikgPT09IDE7XG4gIH1cblxuICBmdW5jdGlvbiBpc1BlcmNlbnRhZ2Uobikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PT0gXCJzdHJpbmdcIiAmJiBuLmluZGV4T2YoJyUnKSAhPSAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUb1BlcmNlbnRhZ2Uobikge1xuICAgIGlmIChuIDw9IDEpIHtcbiAgICAgIG4gPSAobiAqIDEwMCkgKyBcIiVcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUbzI1NShuKSB7XG4gICAgcmV0dXJuIG51bWJlcihNYXRoLm1pbigyNTUsIE1hdGgubWF4KG4sIDApKSwgeydyb3VuZCc6IDJ9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUb0hleChuKSB7XG4gICAgcmV0dXJuIHNldERpZ2l0KE1hdGgucm91bmQobikudG9TdHJpbmcoMTYpLCAyKVxuICB9XG5cbiAgZnVuY3Rpb24gYm91bmQwMShuLCBtYXgpIHtcbiAgICBpZiAoaXNPbmVQb2ludFplcm8obikpIHtcbiAgICAgIG4gPSBcIjEwMCVcIjtcbiAgICB9XG5cbiAgICBsZXQgcHJvY2Vzc1BlcmNlbnQgPSBpc1BlcmNlbnRhZ2Uobik7XG4gICAgbiA9IE1hdGgubWluKG1heCwgTWF0aC5tYXgoMCwgcGFyc2VGbG9hdChuKSkpO1xuXG4gICAgLy8gQXV0b21hdGljYWxseSBjb252ZXJ0IHBlcmNlbnRhZ2UgaW50byBudW1iZXJcbiAgICBpZiAocHJvY2Vzc1BlcmNlbnQpIHtcbiAgICAgIG4gPSBwYXJzZUludChuICogbWF4LCAxMCkgLyAxMDA7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9yc1xuICAgIGlmICgoTWF0aC5hYnMobiAtIG1heCkgPCAwLjAwMDAwMSkpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgaW50byBbMCwgMV0gcmFuZ2UgaWYgaXQgaXNuJ3QgYWxyZWFkeVxuICAgIHJldHVybiAobiAlIG1heCkgLyBwYXJzZUZsb2F0KG1heCk7XG4gIH1cblxuICBmdW5jdGlvbiByZ2JUb0hzbChyLCBnLCBiKSB7XG4gICAgciA9IGJvdW5kMDEociwgMjU1KTtcbiAgICBnID0gYm91bmQwMShnLCAyNTUpO1xuICAgIGIgPSBib3VuZDAxKGIsIDI1NSk7XG5cbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgY2FzZSByOlxuICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBnOlxuICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgYjpcbiAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBoIC89IDY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtoOiBoLCBzOiBzLCBsOiBsfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhzbFRvUmdiKGgsIHMsIGwpIHtcbiAgICBsZXQgciwgZywgYjtcblxuICAgIGggPSBib3VuZDAxKGgsIDM2MCk7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICBsID0gYm91bmQwMShsLCAxMDApO1xuXG4gICAgZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgICBpZiAodCA8IDApIHQgKz0gMTtcbiAgICAgIGlmICh0ID4gMSkgdCAtPSAxO1xuICAgICAgaWYgKHQgPCAxIC8gNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XG4gICAgICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcTtcbiAgICAgIGlmICh0IDwgMiAvIDMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGlmIChzID09PSAwKSB7XG4gICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgbGV0IHAgPSAyICogbCAtIHE7XG4gICAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMSAvIDMpO1xuICAgICAgZyA9IGh1ZTJyZ2IocCwgcSwgaCk7XG4gICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgIH1cblxuICAgIHJldHVybiB7cjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NX07XG4gIH1cblxuICByZXR1cm4gbmV3IChmdW5jdGlvbiAoX2NvbG9yKSB7XG4gICAgdGhpcy5fb3JpZ2luYWxWYWx1ZSA9IF9jb2xvcjtcbiAgICBfY29sb3IgPSBjb252ZXJ0T2JqZWN0KF9jb2xvcik7XG4gICAgdGhpcy5yID0gX2NvbG9yLnI7XG4gICAgdGhpcy5nID0gX2NvbG9yLmc7XG4gICAgdGhpcy5iID0gX2NvbG9yLmI7XG4gICAgdGhpcy5hID0gX2NvbG9yLmEgfHwgMTtcbiAgICB0aGlzLl9mb3JtYXQgPSBfY29sb3IuZm9ybWF0O1xuICAgIHRoaXMuX2hleCA9IGNvbnZlcnRUb0hleCh0aGlzLnIpICsgY29udmVydFRvSGV4KHRoaXMuZykgKyBjb252ZXJ0VG9IZXgodGhpcy5iKTtcblxuICAgIHRoaXMuZ2V0SGV4VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5faGV4O1xuICAgIH07XG5cbiAgICB0aGlzLmxpZ2h0ZW4gPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICBhbW91bnQgPSAoYW1vdW50ID09PSAwKSA/IDAgOiAoYW1vdW50IHx8IDEwKTtcbiAgICAgIGxldCBoc2wgPSByZ2JUb0hzbCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKSwgcmdiID0ge307XG5cbiAgICAgIGhzbC5sICs9IGFtb3VudCAvIDEwMDtcbiAgICAgIGhzbC5sID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgaHNsLmwpKTtcbiAgICAgIGhzbC5oID0gaHNsLmggKiAzNjA7XG5cbiAgICAgIHJnYiA9IGhzbFRvUmdiKGhzbC5oLCBjb252ZXJ0VG9QZXJjZW50YWdlKGhzbC5zKSwgY29udmVydFRvUGVyY2VudGFnZShoc2wubCkpO1xuXG4gICAgICByZXR1cm4gY29sb3IoJ3JnYmEoJyArIGNvbnZlcnRUbzI1NShyZ2IucikgKyAnLCAnICsgY29udmVydFRvMjU1KHJnYi5nKSArICcsICcgKyBjb252ZXJ0VG8yNTUocmdiLmIpICsgJywgJyArIHRoaXMuYSArICcpJyk7XG4gICAgfTtcblxuICAgIHRoaXMuZGFya2VuID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCAxMCk7XG4gICAgICBsZXQgaHNsID0gcmdiVG9Ic2wodGhpcy5yLCB0aGlzLmcsIHRoaXMuYiksIHJnYiA9IHt9O1xuXG4gICAgICBoc2wubCAtPSBhbW91bnQgLyAxMDA7XG4gICAgICBoc2wubCA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIGhzbC5sKSk7XG4gICAgICBoc2wuaCA9IGhzbC5oICogMzYwO1xuXG4gICAgICByZ2IgPSBoc2xUb1JnYihoc2wuaCwgY29udmVydFRvUGVyY2VudGFnZShoc2wucyksIGNvbnZlcnRUb1BlcmNlbnRhZ2UoaHNsLmwpKTtcblxuICAgICAgcmV0dXJuIGNvbG9yKCdyZ2JhKCcgKyBjb252ZXJ0VG8yNTUocmdiLnIpICsgJywgJyArIGNvbnZlcnRUbzI1NShyZ2IuZykgKyAnLCAnICsgY29udmVydFRvMjU1KHJnYi5iKSArICcsICcgKyB0aGlzLmEgKyAnKScpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEJyaWdodG5lc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuciAqIDI5OSArIHRoaXMuZyAqIDU4NyArIHRoaXMuYiAqIDExNCkgLyAxMDAwO1xuICAgIH07XG5cbiAgICB0aGlzLmlzRGFyayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEJyaWdodG5lc3MoKSA8IDEyODtcbiAgICB9O1xuXG4gICAgdGhpcy5pc0xpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmlzRGFyaygpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEhzbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBoc2wgPSByZ2JUb0hzbCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgIGhzbC5sID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgaHNsLmwpKTtcbiAgICAgIGhzbC5oID0gaHNsLmggKiAzNjA7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoc2wuaCxcbiAgICAgICAgczogaHNsLnMsXG4gICAgICAgIGw6IGhzbC5sXG4gICAgICB9XG4gICAgfTtcblxuICB9KShfaGV4Q29sb3IpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgLyoqXG4gICAqIGpzb25TdHJpbmcg7Jy866GcIGFsZXJ0IO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8U3RyaW5nfE51bWJlcn0gT1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fEFycmF5fFN0cmluZ3xOdW1iZXJ9IE9cbiAgICogQGV4YW1wbGUgYGBganNcbiAgICogQVg2VXRpbC5hbGVydCh7YToxLGI6Mn0pO1xuICAgKiBBWDZVdGlsLmFsZXJ0KFwi7KCV66eQP1wiKTtcbiAgICogYGBgXG4gICAqL1xuICBhbGVydDogYWxlcnQsXG4gIC8qKlxuICAgKiBPYmplY3TrgpggQXJyYXnsnZgg7JWE7J207YWc7Jy866GcIOyCrOyaqeyekCDtlajsiJjrpbwg7Zi47Lac7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gT1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBfZm5cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGF4ZiA9IEFYNlV0aWw7XG4gICAqIGF4Zi5lYWNoKFswLDEsMl0sIGZ1bmN0aW9uKCl7XG5cdFx0ICogXHQvLyB3aXRoIHRoaXNcblx0XHQgKiB9KTtcbiAgICogYXhmLmVhY2goe2E6MSwgYjoyfSwgZnVuY3Rpb24oKXtcblx0XHQgKiBcdC8vIHdpdGggdGhpc1xuXHRcdCAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGVhY2g6IGVhY2gsXG4gIC8qKlxuICAgKiDsm5Drs7gg7JWE7J207YWc65Ok7J2EIOydtOyaqe2VmOyXrCDsgqzsmqnsnpAg7ZWo7IiY7J2YIOumrO2EtOqwkuydtCDssLjsnbgg7JWE7J207YWc7J2YIOychOy5mOuCmCDtgqTqsJLsnYQg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gT1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ3xOdW1iZXJ9IF9mbiAtIO2VqOyImCDrmJDripQg6rCSXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ8U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiB2YXIgbXlBcnJheSA9IFswLDEsMiwzLDQsNSw2XTtcbiAgICogdmFyIG15T2JqZWN0ID0ge2E6XCIxMjNcIixcImJcIjpcIjEyM1wiLGM6MTIzfTtcbiAgICpcbiAgICogQVg2VXRpbC5zZWFyY2gobXlBcnJheSwgIGZ1bmN0aW9uKCl7XG5cdFx0ICogICAgcmV0dXJuIHRoaXMgPiAzO1xuXHRcdCAqIH0pO1xuICAgKiAvLyA0XG4gICAqIEFYNlV0aWwuc2VhcmNoKG15T2JqZWN0LCAgZnVuY3Rpb24oaywgdil7XG5cdFx0ICogICAgcmV0dXJuIHYgPT09IDEyMztcblx0XHQgKiB9KTtcbiAgICogLy8gXCJjXCJcbiAgICogQVg2VXRpbC5zZWFyY2goWzEsMiwzLDRdLCAzKTtcbiAgICogLy8gMlxuICAgKiBBWDZVdGlsLnNlYXJjaChbMSwyXSwgNCk7XG4gICAqIC8vIC0xXG4gICAqIEFYNlV0aWwuc2VhcmNoKFtcIm5hbWVcIixcInZhbHVlXCJdLCBcInZhbHVlXCIpO1xuICAgKiAvLyAxXG4gICAqIEFYNlV0aWwuc2VhcmNoKFtcIm5hbWVcIixcInZhbHVlXCJdLCBcInZhbHVlc1wiKTtcbiAgICogLy8gLTFcbiAgICogQVg2VXRpbC5zZWFyY2goe2sxOlwibmFtZVwiLGsyOlwidmFsdWVcIn0sIFwidmFsdWUyXCIpO1xuICAgKiAvLyAtMVxuICAgKiBBWDZVdGlsLnNlYXJjaCh7azE6XCJuYW1lXCIsazI6XCJ2YWx1ZVwifSwgXCJ2YWx1ZVwiKTtcbiAgICogLy8gXCJrMlwiXG4gICAqIGBgYFxuICAgKi9cbiAgc2VhcmNoOiBzZWFyY2gsXG4gIC8qKlxuICAgKiDrsLDsl7TrmJDripQg7Jik67iM7KCd7Yq47J2YIOqwgSDslYTsnbTthZzsnYQg7J247J6Q66GcIO2VmOuKlCDsgqzsmqnsnpAg7ZWo7IiY7J2YIOqysOqzvOqwgCDssLjsnbgg7JWE7J207YWc65Ok7J2YIOuwsOyXtOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBPXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IF9mblxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIHZhciBhYXJyYXkgPSBbNSw0LDMsMiwxXTtcbiAgICogcmVzdWx0ID0gQVg2VXRpbC5maWx0ZXIoIGFhcnJheSwgZnVuY3Rpb24oKXtcblx0XHQgKiAgICByZXR1cm4gdGhpcyAlIDI7XG5cdFx0ICogfSk7XG4gICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAqIC8vIFs1LCAzLCAxXVxuICAgKlxuICAgKiB2YXIgZmlsT2JqZWN0ID0ge2E6MSwgczpcInN0cmluZ1wiLCBvYTp7cGlja3VwOnRydWUsIG5hbWU6XCJBWElTSlwifSwgb3M6e3BpY2t1cDp0cnVlLCBuYW1lOlwiQVg1XCJ9fTtcbiAgICogcmVzdWx0ID0gQVg2VXRpbC5maWx0ZXIoIGZpbE9iamVjdCwgZnVuY3Rpb24oKXtcblx0XHQgKiBcdHJldHVybiB0aGlzLnBpY2t1cDtcblx0XHQgKiB9KTtcbiAgICogY29uc29sZS5sb2coIEFYNlV0aWwudG9Kc29uKHJlc3VsdCkgKTtcbiAgICogLy8gW3tcInBpY2t1cFwiOiAsIFwibmFtZVwiOiBcIkFYSVNKXCJ9LCB7XCJwaWNrdXBcIjogLCBcIm5hbWVcIjogXCJBWDVcIn1dXG4gICAqIGBgYFxuICAgKi9cbiAgZmlsdGVyOiBmaWx0ZXIsXG4gIC8qKlxuICAgKiBPYmplY3TrpbwgSlNPTlN0cmluZyDsnLzroZwg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAbWV0aG9kIEFYNlV0aWwudG9Kc29uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBPXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IEpTT05cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGF4ID0gQVg2VXRpbDtcbiAgICogdmFyIG15T2JqZWN0ID0ge1xuXHRcdCAqICAgIGE6MSwgYjpcIjJcIiwgYzp7YXhqOlwid2hhdFwiLCBhcnJzOlswLDIsXCIzXCJdfSxcblx0XHQgKiAgICBmbjogZnVuY3Rpb24oYWJjZGQpe1xuXHRcdCAqICAgICAgICByZXR1cm4gYWJjZGQ7XG5cdFx0ICogICAgfVxuXHRcdCAqIH07XG4gICAqIGNvbnNvbGUubG9nKCBheC50b0pzb24obXlPYmplY3QpICk7XG4gICAqIGBgYFxuICAgKi9cbiAgdG9Kc29uOiB0b0pzb24sXG4gIC8qKlxuICAgKiDqtIDsmqnsnZggSlNPTiBQYXJzZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IEpTT05TdHJpbmdcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VdIC0g6rCV7KCcIOyggeyaqSDsl6zrtoAgKGpzb24g66y47J6Q7Je0IOqygOyCrOulvCDrrLTsi5ztlZjqs6Ag7Jik67iM7KCd7Yq4IOuzgO2ZmOydhCDsi5zrj4Ttlanri4jri6QuKVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5wYXJzZUpzb24oJ3tcImFcIjoxfScpKTtcbiAgICogLy8gT2JqZWN0IHthOiAxfVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcInsnYSc6MSwgJ2InOidiJ31cIikpO1xuICAgKiAvLyBPYmplY3Qge2E6IDEsIGI6IFwiYlwifVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcInsnYSc6MSwgJ2InOmZ1bmN0aW9uKCl7cmV0dXJuIDE7fX1cIiwgdHJ1ZSkpO1xuICAgKiAvLyBPYmplY3Qge2E6IDEsIGI6IGZ1bmN0aW9ufVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcInthOjF9XCIpKTtcbiAgICogLy8gT2JqZWN0IHthOiAxfVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcIlsxLDIsM11cIikpO1xuICAgKiAvLyBbMSwgMiwgM11cbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5wYXJzZUpzb24oXCJbJzEnLCcyJywnMyddXCIpKTtcbiAgICogLy8gW1wiMVwiLCBcIjJcIiwgXCIzXCJdXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwucGFyc2VKc29uKFwiW3snYSc6Jzk5J30sJzInLCczJ11cIikpO1xuICAgKiAvLyBbT2JqZWN0LCBcIjJcIiwgXCIzXCJdXG4gICAqIGBgYFxuICAgKi9cbiAgcGFyc2VKc29uOiBwYXJzZUpzb24sXG4gIC8qKlxuICAgKiDsmKTruIzsoJ3tirjsnZgg7LKr67KI7Ke4IOyVhOydtO2FnOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBPXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuZmlyc3Qoe2E6MSwgYjoyfSk7XG4gICAqIC8vIE9iamVjdCB7YTogMX1cbiAgICogQVg2VXRpbC5maXJzdChbMSwyLDMsNF0pO1xuICAgKiAvLyAxXG4gICAqIGBgYFxuICAgKi9cbiAgZmlyc3Q6IGZpcnN0LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq47J2YIOuniOyngOuniSDslYTsnbTthZzsnYQg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gT1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLmxhc3Qoe2E6MSwgYjoyfSk7XG4gICAqIC8vIE9iamVjdCB7YjogMn1cbiAgICogQVg2VXRpbC5sYXN0KFsxLDIsMyw0XSk7XG4gICAqIC8vIDRcbiAgICogYGBgXG4gICAqL1xuICBsYXN0OiBsYXN0LFxuICAvKipcbiAgICog66y47J6Q7Je07J2YIO2KueyglSDrrLjsnpDsl7TquYzsp4Ag7J6Y65287KO86rGw64KYIOybkO2VmOuKlCDtj6zsp4DshZjquYzsp4Ag7J6Y65287KSN64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0g66y47J6Q7Je0XG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gcG9zIC0g7LC+7J2EIOusuOyekOyXtCDrmJDripQg7Y+s7KeA7IWYXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwubGVmdChcImFiY2QuZWZkXCIsIDMpO1xuICAgKiAvLyBhYmNcbiAgICogQVg2VXRpbC5sZWZ0KFwiYWJjZC5lZmRcIiwgXCIuXCIpO1xuICAgKiAvLyBhYmNkXG4gICAqIGBgYFxuICAgKi9cbiAgbGVmdDogbGVmdCxcbiAgLyoqXG4gICAqIOusuOyekOyXtOydmCDtirnsoJUg66y47J6Q7Je06rmM7KeAIOyemOudvOyjvOqxsOuCmCDsm5DtlZjripQg7Y+s7KeA7IWY6rmM7KeAIOyemOudvOykjeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIOusuOyekOyXtFxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHBvcyAtIOywvuydhCDrrLjsnpDsl7Qg65iQ64qUIO2PrOyngOyFmFxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLnJpZ2h0KFwiYWJjZC5lZmRcIiwgMyk7XG4gICAqIC8vIGVmZFxuICAgKiBBWDZVdGlsLnJpZ2h0KFwiYWJjZC5lZmRcIiwgXCIuXCIpO1xuICAgKiAvLyBlZmRcbiAgICogYGBgXG4gICAqL1xuICByaWdodDogcmlnaHQsXG4gIC8qKlxuICAgKiDsnbjsnpDsnZgg7YOA7J6F7J2EIOuwmO2ZmO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8U3RyaW5nfE51bWJlcnxFbGVtZW50fEV0Y30gT1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSB3aW5kb3d8ZWxlbWVudHxvYmplY3R8YXJyYXl8ZnVuY3Rpb258c3RyaW5nfG51bWJlcnx1bmRlZmluZWR8bm9kZWxpc3RcbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGF4ZiA9IEFYNlV0aWw7XG4gICAqIHZhciBhID0gMTE7XG4gICAqIHZhciBiID0gXCIxMVwiO1xuICAgKiBjb25zb2xlLmxvZyggYXhmLmdldFR5cGUoYSkgKTtcbiAgICogY29uc29sZS5sb2coIGF4Zi5nZXRUeXBlKGIpICk7XG4gICAqIGBgYFxuICAgKi9cbiAgZ2V0VHlwZTogZ2V0VHlwZSxcbiAgLyoqXG4gICAqIOyYpOu4jOygne2KuOqwgCB3aW5kb3cg7J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc1dpbmRvdzogaXNXaW5kb3csXG4gIC8qKlxuICAgKiDsmKTruIzsoJ3tirjqsIAgSFRNTCDsl5jrpqzrqLztirjsl6zrtoDsnbjsp4Ag7YyQ64uo7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdH0gT1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIE9iamVjdOyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIEFycmF57J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc0FycmF5OiBpc0FycmF5LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIEZ1bmN0aW9u7J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIFN0cmluZ+yduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIE51bWJlcuyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIE5vZGVMaXN07J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc05vZGVsaXN0OiBpc05vZGVsaXN0LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIHVuZGVmaW5lZOyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIHVuZGVmaW5lZOydtOqxsOuCmCBudWxs7J206rGw64KYIOu5iOqwkuyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgLyoqXG4gICAqIOyYpOu4jOygne2KuOqwgCDrgqDsnpDqsJLsnbjsp4Ag7YyQ64uo7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge0RhdGV9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuaXNEYXRlKCcyMDE2LTA5LTMwJyk7XG4gICAqIC8vIGZhbHNlXG4gICAqIEFYNlV0aWwuaXNEYXRlKCBuZXcgRGF0ZSgnMjAxNi0wOS0zMCcpICk7XG4gICAqIC8vIHRydWVcbiAgICogYGBgXG4gICAqL1xuICBpc0RhdGU6IGlzRGF0ZSxcbiAgLyoqXG4gICAqIOyYpOu4jOygne2KuOqwgCDrgqDsp5ztmJUg67OA7IiY7J247KeAIO2MkOuLqO2VqeuLiOuLpFxuICAgKi9cbiAgaXNEYXRlRm9ybWF0OiBpc0RhdGVGb3JtYXQsXG4gIGlzTm90aGluZzogaXNOb3RoaW5nLFxuICAvKipcbiAgICog7L+g7YKk66W8IOyEpOygle2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNuYW1lIC0g7L+g7YKk7J2066aEXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjdmFsdWUgLSDsv6DtgqTqsJJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtleGRheXNdIC0g7L+g7YKkIOycoOyngOydvOyImFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gcGF0aCwgZG9tYWluIOyEpOyglSDsmLXshZhcbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogQVg2VXRpbC5zZXRDb29raWUoXCJqc2xpYlwiLCBcIkFYNVwiKTtcbiAgICogQVg2VXRpbC5zZXRDb29raWUoXCJqc2xpYlwiLCBcIkFYNVwiLCAzKTtcbiAgICogQVg2VXRpbC5zZXRDb29raWUoXCJqc2xpYlwiLCBcIkFYNVwiLCAzLCB7cGF0aDpcIi9cIiwgZG9tYWluOlwiLmF4aXNqLmNvbVwifSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0Q29va2llOiBzZXRDb29raWUsXG4gIC8qKlxuICAgKiDsv6DtgqTrpbwg6rCA7KC47Ji164uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY25hbWVcbiAgICogQHJldHVybnMge1N0cmluZ30gY29va2llIHZhbHVlXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuZ2V0Q29va2llKFwianNsaWJcIik7XG4gICAqIGBgYFxuICAgKi9cbiAgZ2V0Q29va2llOiBnZXRDb29raWUsXG4gIC8qKlxuICAgKiBjc3PtmJUg66y47J6Q7Je07J2064KYIO2KueyImOusuOyekOqwgCDtj6ztlajrkJwg66y47J6Q7Je07J2EIOy5tOupnOy8gOydtOyKpOuhnCDrsJTqvrjslrQg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuY2FtZWxDYXNlKFwiaW5uZXItd2lkdGhcIik7XG4gICAqIEFYNlV0aWwuY2FtZWxDYXNlKFwiaW5uZXJXaWR0aFwiKTtcbiAgICogLy8gaW5uZXJXaWR0aFxuICAgKiBgYGBcbiAgICovXG4gIGNhbWVsQ2FzZTogY2FtZWxDYXNlLFxuICAvKipcbiAgICogY3Nz7ZiVIOusuOyekOyXtOydtOuCmCDsubTrqZzsvIDsnbTsiqTrrLjsnpDsl7TsnYQg7Iqk64Sk7J207YGsIOy8gOydtOyKpCDrrLjsnpDsl7TroZwg67CU6r647Ja0IOuwmO2ZmO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLnNuYWtlQ2FzZShcImlubmVyV2lkdGhcIik7XG4gICAqIEFYNlV0aWwuc25ha2VDYXNlKFwiaW5uZXItV2lkdGhcIik7XG4gICAqIEFYNlV0aWwuc25ha2VDYXNlKFwiaW5uZXJXaWR0aFwiKTtcbiAgICogLy8gaW5uZXItd2lkdGhcbiAgICogYGBgXG4gICAqL1xuICBzbmFrZUNhc2U6IHNuYWtlQ2FzZSxcbiAgLyoqXG4gICAqIOusuOyekOyXtOyXkOyEnCAtLiDsnYQg7KCc7Jm47ZWcIOuqqOuToCDrrLjsnpDsl7TsnYQg7KCc6rGw7ZWY6rOgIOyIq+yekOuhnCDrsJjtmZjtlanri4jri6QuIOyYteyFmOyXkCDrlLDrnbwg7JuQ7ZWY64qUIO2YleyLneydmCDsiKvsnpDroZwg67OA7ZmYIO2VoCDsiJgg64+EIOyeiOyKteuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBzdHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmQgLSDsmLXshZhcbiAgICogQHJldHVybnMge1N0cmluZ3xOdW1iZXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIHZhciBjb25kID0ge1xuXHRcdCAqIFx0cm91bmQ6IHtOdW1iZXJ8Qm9vbGVhbn0gLSDrsJjsmKzrprztlaAg7J6Q66a/7IiYLFxuXHRcdCAqIFx0bW9uZXk6IHtCb29sZWFufSAtIO2Gte2ZlCxcblx0XHQgKiBcdGFiczoge0Jvb2xlYW59IC0g7KCI64yA6rCSLFxuXHRcdCAqIFx0Ynl0ZToge0Jvb2xlYW59IC0g67CU7J207Yq4XG5cdFx0ICogfVxuICAgKlxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLm51bWJlcigxMjM0NTY3ODkuNjc4LCB7cm91bmQ6MX0pKTtcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5udW1iZXIoMTIzNDU2Nzg5LjY3OCwge3JvdW5kOjEsIG1vbmV5OnRydWV9KSk7XG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwubnVtYmVyKDEyMzQ1Njc4OS42NzgsIHtyb3VuZDoyLCBieXRlOnRydWV9KSk7XG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwubnVtYmVyKC0xMjM0NTY3ODkuODg4OCwge2Ficzp0cnVlLCByb3VuZDoyLCBtb25leTp0cnVlfSkpO1xuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLm51bWJlcihcIkEtMTIzNH5+NTY3ODkuOH44ODhQWFwiLCB7YWJzOnRydWUsIHJvdW5kOjIsIG1vbmV5OnRydWV9KSk7XG4gICAqXG4gICAqIC8vMTIzNDU2Nzg5LjdcbiAgICogLy8xMjMsNDU2LDc4OS43XG4gICAqIC8vMTE3LjdNQlxuICAgKiAvLzEyMyw0NTYsNzg5Ljg5XG4gICAqIC8vMTIzLDQ1Niw3ODkuODlcbiAgICogYGBgXG4gICAqL1xuICBudW1iZXI6IG51bWJlcixcbiAgLyoqXG4gICAqIOuwsOyXtCDruYTsirftlZwg7Jik67iM7KCd7Yq466W8IOuwsOyXtOuhnCDrs4DtmZjtlbTspI3ri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEVsZW1lbnRzfEFyZ3VtZW50c30gT1xuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwudG9BcnJheShhcmd1bWVudHMpO1xuICAgKiAvL1xuICAgKiBgYGBcbiAgICovXG4gIHRvQXJyYXk6IHRvQXJyYXksXG4gIC8qKlxuICAgKiDsmKTruIzsoJ3tirjrpbwg7YyM652866+47YSw7ZiV7Iud7Jy866GcIOuYkOuKlCDtjIzrnbzrr7jthLDrpbwg7Jik67iM7KCd7Yq4IO2YleyLneycvOuhnCDrs4DtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fFN0cmluZ30gT1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbmRdIC0gcGFyYW18b2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R8U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogQVg2VXRpbC5wYXJhbSh7YToxLGI6JzEyMzInfSwgXCJwYXJhbVwiKTtcbiAgICogQVg2VXRpbC5wYXJhbShcImE9MSZiPTEyMzJcIiwgXCJwYXJhbVwiKTtcbiAgICogLy8gXCJhPTEmYj0xMjMyXCJcbiAgICogQVg2VXRpbC5wYXJhbShcImE9MSZiPTEyMzJcIik7XG4gICAqIC8vIHthOiBcIjFcIiwgYjogXCIxMjMyXCJ9XG4gICAqIGBgYFxuICAgKi9cbiAgcGFyYW06IHBhcmFtLFxuICBlcnJvcjogZXJyb3IsXG4gIC8qKlxuICAgKiDrgqDsp5wg7ZiV7Iud7J2YIOusuOyekOyXtOydtOuCmCBEYXRl6rCd7LK066W8IOyhsOqxtOyXkCDrp57qsowg7LKY66asIO2VnCDtm4Qg7JuQ7ZWY64qUIHJldHVybiDqsJLsnLzroZwg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xEYXRlfSBkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25kXG4gICAqIEByZXR1cm5zIHtEYXRlfFN0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogQVg2VXRpbC5kYXRlKCcyMDEzLTAxLTAxJyk7IC8vIFR1ZSBKYW4gMDEgMjAxMyAyMzo1OTowMCBHTVQrMDkwMCAoS1NUKVxuICAgKiBBWDZVdGlsLmRhdGUoKG5ldyBEYXRlKCkpLCB7YWRkOntkOjEwfSwgcmV0dXJuOid5eXl5L01NL2RkJ30pOyAvLyBcIjIwMTUvMDcvMDFcIlxuICAgKiBBWDZVdGlsLmRhdGUoJzE5MTktMDMtMDEnLCB7YWRkOntkOjEwfSwgcmV0dXJuOid5eXl5L01NL2RkIGhoOm1tOnNzJ30pOyAvLyBcIjE5MTkvMDMvMTEgMjM6NTk6MDBcIlxuICAgKiBgYGBcbiAgICovXG4gIGRhdGU6IGRhdGUsXG4gIC8qKlxuICAgKiDsnbjsnpDsnbgg64Kg7Kec6rCAIOyYpOuKmOu2gO2EsCDrqofsnbzsoITsnbjsp4Ag67CY7ZmY7ZWp64uI64ukLiDrmJDripQg7J247J6Q7J24IOuCoOynnOqwgCDqsIDquYzsmrQg66+4656Y7JeQIOuqh+ydvCDtm4Tsnbjsp4Ag67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xEYXRhfSBkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuZGRheSgnMjAxNi0wMS0yOScpO1xuICAgKiAvLyAxXG4gICAqIEFYNlV0aWwuZGRheSgnMjAxNi0wMS0yOScsIHt0b2RheTonMjAxNi0wMS0yOCd9KTtcbiAgICogLy8gMVxuICAgKiBBWDZVdGlsLmRkYXkoJzE5NzctMDMtMjknLCB7dG9kYXk6JzIwMTYtMDEtMjgnLCBhZ2U6dHJ1ZX0pO1xuICAgKiAvLyAzOVxuICAgKiBgYGBcbiAgICovXG4gIGRkYXk6IGRkYXksXG4gIC8qKlxuICAgKiDrhYTsm5Tsl5Ag66ee64qUIOuCoOyekOyImOulvCDrsJjtmZjtlanri4jri6QuXG4gICAqIChuZXcgRGF0ZSgpKS5nZXRNb250aCgpIOq4sOykgOycvOuhnCDsm5TqsJLsnYQg67O064OF64uI64ukLiBcIjLsm5RcIiDsnbjqsr3smrAgXCIxXCIg7J2EIOuEmOq4sOqyjCDrkKnri4jri6QuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqIEBleGFtcGxlc1xuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLmRheXNPZk1vbnRoKDIwMTUsIDExKTsgLy8gMzFcbiAgICogQVg2VXRpbC5kYXlzT2ZNb250aCgyMDE1LCAxKTsgLy8gMjhcbiAgICogYGBgXG4gICAqL1xuICBkYXlzT2ZNb250aDogZGF5c09mTW9udGgsXG4gIC8qKlxuICAgKiDsnbjsnpDsnbgg64Kg7Kec6rCAIOuqh+uFhCDrqofsm5TsnZgg66qH67KI7Ke4IOyjvOywqOyduOyngCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfERhdGF9IGRcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogQVg2VXRpbC53ZWVrc09mTW9udGgoXCIyMDE1LTEwLTAxXCIpOyAvLyB7eWVhcjogMjAxNSwgbW9udGg6IDEwLCBjb3VudDogMX1cbiAgICogQVg2VXRpbC53ZWVrc09mTW9udGgoXCIyMDE1LTA5LTE5XCIpOyAvLyB7eWVhcjogMjAxNSwgbW9udGg6IDksIGNvdW50OiAzfVxuICAgKiBgYGBcbiAgICovXG4gIHdlZWtzT2ZNb250aDogd2Vla3NPZk1vbnRoLFxuICAvKipcbiAgICog7JuQ7ZWY64qUIO2an+yImCDrp4ztgbwg7J6Q66a/7IiYIOunnuy2pCDrrLjsnpDsl7TsnYQg7Y+s7ZWo7ZWcIOusuOyekOyXtOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIOusuOyekOyXtCDquLjsnbTrs7Tri6Qg7J6R7J2A6rCS7J2EIOuztOuCtOuptCDrrLTsi5zrkKnri4jri6QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gbnVtXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwYWRkZXI9MF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpeF1cbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIEFYNlV0aWwuc2V0RGlnaXQoMjAxNiwgNilcbiAgICogLy8gXCIwMDIwMTZcIlxuICAgKiBBWDZVdGlsLnNldERpZ2l0KDIwMTYsIDIpXG4gICAqIC8vIFwiMjAxNlwiXG4gICAqIGBgYFxuICAgKi9cbiAgc2V0RGlnaXQ6IHNldERpZ2l0LFxuICAvKipcbiAgICog66y47J6Q7Je07J2EIOyngOygleuQnCDsiJjrp4ztgbwg67CY67O1IO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBBWDZVdGlsLnRpbWVzKDIwMTYsIDIpXG4gICAqIC8vXCIyMDE2MjAxNlwiXG4gICAqIGBgYFxuICAgKi9cbiAgdGltZXM6IHRpbWVzLFxuICAvKipcbiAgICog7YOA6rKf7JeY66as66i87Yq47J2YIOu2gOuqqCDsl5jrpqzrqZjtirgg7Yq466as7JeQ7IScIOybkO2VmOuKlCDsobDqsbTsnZgg7JeY66as66i87Yq466W8IOyWu+yKteuLiOuLpC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBfdGFyZ2V0IC0gdGFyZ2V0IGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGNvbmQgLSDsm5DtlZjripQgZWxlbWVudOulvCDssL7snYQg7KGw6rG0XG4gICAqIEByZXR1cm5zIHtFbGVtZW50fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogLy8gY29uZCDsho3shLHsoJXsnZhcbiAgICogdmFyIGNvbmQgPSB7XG5cdFx0ICogXHR0YWduYW1lOiB7U3RyaW5nfSAtIO2DnOq3uOuqhSAoZXguIGEsIGRpdiwgc3Bhbi4uKSxcblx0XHQgKiBcdGNsYXp6OiB7U3RyaW5nfSAtIO2BtOuemOyKpOuqhVxuXHRcdCAqIFx0Wywg6re4IOyZuCDssL7qs6Ag7Iu27J2AIGF0dHJpYnV0ZeuqheuTpF1cblx0XHQgKiB9O1xuICAgKiBjb25zb2xlLmxvZyhcbiAgICogY29uc29sZS5sb2coXG4gICAqICAgIEFYNlV0aWwuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIHt0YWduYW1lOlwiYVwiLCBjbGF6ejpcImF4LW1lbnUtaGFuZGVsXCIsIFwiZGF0YS1jdXN0b20tYXR0clwiOlwiYXR0cl92YWx1ZVwifSlcbiAgICogKTtcbiAgICogLy8gY29uZCDtlajsiJjroZwg7LKY66as7ZWY6riwXG4gICAqIGpRdWVyeSgnI2lkJykuYmluZChcImNsaWNrLmFwcF9leHBhbmRcIiwgZnVuY3Rpb24oZSl7XG5cdFx0ICogXHR2YXIgdGFyZ2V0ID0gQVg2VXRpbC5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24odGFyZ2V0KXtcblx0XHQgKiBcdFx0aWYoJCh0YXJnZXQpLmhhc0NsYXNzKFwiYXNpZGVcIikpe1xuXHRcdCAqIFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdCAqIFx0XHR9XG5cdFx0ICogXHRcdGVsc2V7XG5cdFx0ICogXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ICogXHRcdH1cblx0XHQgKiBcdH0pO1xuXHRcdCAqIFx0Ly9jbGllbnQtYXNpZGVcblx0XHQgKiBcdGlmKHRhcmdldC5pZCAhPT0gXCJjbGllbnQtYXNpZGVcIil7XG5cdFx0ICogXHRcdC8vIHNvbWUgYWN0aW9uXG5cdFx0ICogXHR9XG5cdFx0ICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgZmluZFBhcmVudE5vZGU6IGZpbmRQYXJlbnROb2RlLFxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKFwiMTAwcHhcIikpXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKFwiMTAwJVwiKSlcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5jc3NOdW1iZXIoXCIxMDBcIikpXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKDEwMCkpXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKFwiISExMDBAI1wiKSlcbiAgICogYGBgXG4gICAqL1xuICBjc3NOdW1iZXI6IGNzc051bWJlcixcbiAgLyoqXG4gICAqIGNzcyBzdHJpbmcg67CPIG9iamVjdCDrpbwg64SY6riw66m0IG9iamVjdCDrsI8gc3RyaW5nIOycvOuhnCDrs4DtmZjrkJjslrQg66as7YS065Cp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbCAtIENTUyBTdHJpbmcgb3IgQ1NTIE9iamVjdFxuICAgKiBAcmV0dXJucyB7U3RyaW5nfE9iamVjdH1cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzKHtiYWNrZ3JvdW5kOiBcIiNjY2NcIiwgcGFkZGluZzogXCI1MHB4XCIsIHdpZHRoOiBcIjEwMHB4XCJ9KSk7XG4gICAqIC8vXCJiYWNrZ3JvdW5kOiNjY2M7cGFkZGluZzo1MHB4O3dpZHRoOjEwMHB4O1wiXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzKCd3aWR0aDoxMDBweDtwYWRkaW5nOiA1MHB4OyBiYWNrZ3JvdW5kOiAjY2NjJykpO1xuICAgKiAvLyBvYmplY3Qge3dpZHRoOiBcIjEwMHB4XCIsIHBhZGRpbmc6IFwiNTBweFwiLCBiYWNrZ3JvdW5kOiBcIiNjY2NcIn1cbiAgICogYGBgXG4gICAqL1xuICBjc3M6IGNzcyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIEFYNlV0aWwuc3RvcEV2ZW50KGUpO1xuICAgKiBgYGBcbiAgICovXG4gIHN0b3BFdmVudDogc3RvcEV2ZW50LFxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IG9mZnNldFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIikpOyAvLyBzZWxlY3RBbGxcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIiksIFwic2VsZWN0QWxsXCIpOyAvL3NlbGVjdEFsbFxuICAgKiBBWDZVdGlsLnNlbGVjdFJhbmdlKCQoXCIjc2VsZWN0LXRlc3QtMFwiKSwgXCJzdGFydFwiKTsgLy8gZm9jdXMgb24gc3RhcnRcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIiksIFwiZW5kXCIpOyAvLyBmb2N1cyBvbiBlbmRcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIiksIFsxLCA1XSk7IC8vIHNlbGVjdCAxfjVcbiAgICogYGBgXG4gICAqL1xuICBzZWxlY3RSYW5nZTogc2VsZWN0UmFuZ2UsXG4gIC8qKlxuICAgKiDsp4DsoJXtlZwg7Iuc6rCE7J2EIOyngOyXsOyLnOy8nCDtlajsiJjrpbwg7Iuk7ZaJ7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkZWJvdW5jZWR9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL2RlYm91bmNlLmpzXG4gICAqIHZhciBkZWJvdW5jZUZuID0gQVg2VXRpbC5kZWJvdW5jZShmdW5jdGlvbiggdmFsICkgeyBjb25zb2xlLmxvZyh2YWwpOyB9LCAzMDApO1xuICAgKiAkKGRvY3VtZW50LmJvZHkpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAqICBkZWJvdW5jZUZuKG5ldyBEYXRlKCkpO1xuICAgICAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBkZWJvdW5jZTogZGVib3VuY2UsXG4gIC8qKlxuICAgKiBAcGFyYW0gZnVuY1xuICAgKiBAcGFyYW0gd2FpdFxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHt0aHJvdHRsZWR9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIC8vaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi9tYXN0ZXIvdGhyb3R0bGUuanNcbiAgICogdmFyIHRocm90dGxlRm4gPSBBWDZVdGlsLnRocm90dGxlKGZ1bmN0aW9uKCB2YWwgKSB7IGNvbnNvbGUubG9nKHZhbCk7IH0sIDMwMCk7XG4gICAqICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICAgKiAgICAgIHRocm90dGxlRm4obmV3IERhdGUoKSk7XG4gICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgdGhyb3R0bGU6IHRocm90dGxlLFxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiB2YXIgb2JqID0gW1xuICAgKiAge25hbWU6XCJBXCIsIGNoaWxkOlt7bmFtZTpcImEtMVwifV19LFxuICAgKiAge25hbWU6XCJCXCIsIGNoaWxkOlt7bmFtZTpcImItMVwifV0sIGNhbGxCYWNrOiBmdW5jdGlvbigpeyBjb25zb2xlLmxvZygnY2FsbEJhY2snKTsgfX1cbiAgICogXTtcbiAgICogdmFyIGNvcGllZE9iaiA9IEFYNlV0aWwuZGVlcENvcHkob2JqKVxuICAgKiBgYGBcbiAgICovXG4gIGRlZXBDb3B5OiBkZWVwQ29weSxcbiAgLyoqXG4gICAqIEhUTUwg66y47J6Q7Je07J2EIGVzY2FwZSDsspjrpqztlanri4jri6QuXG4gICAqIFwiJmx0O1wiIHJlcHJlc2VudHMgdGhlIDwgc2lnbi5cbiAgICogXCImZ3Q7XCIgcmVwcmVzZW50cyB0aGUgPiBzaWduLlxuICAgKiBcIiZhbXA7XCIgcmVwcmVzZW50cyB0aGUgJiBzaWduLlxuICAgKiBcIiZxdW90OyByZXByZXNlbnRzIHRoZSBcIiBtYXJrLlxuICAgKiBbQ2hhcmFjdGVyIGVudGl0eSByZWZlcmVuY2VzXShodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDQwMS9jaGFyc2V0Lmh0bWwjaC01LjMpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBBWDZVdGlsLmVzY2FwZUh0bWwoJ0hUTUwgPHNwYW4+c3RyaW5nPC9zcGFuPiAmIFwiZXNjYXBlXCInKVxuICAgKiAvL1wiSFRNTCAmbHQ7c3BhbiZndDtzdHJpbmcmbHQ7L3NwYW4mZ3Q7ICZhbXA7ICZxdW90O2VzY2FwZSZxdW90O1wiXG4gICAqIGBgYFxuICAgKi9cbiAgZXNjYXBlSHRtbDogZXNjYXBlSHRtbCxcbiAgLyoqXG4gICAqIEhUTUwg66y47J6Q7Je07J2EIHVuZXNjYXBlIOyymOumrO2VqeuLiOuLpC5cbiAgICogZXNjYXBlSHRtbOulvCDssLjqs6DtlZjshLjsmpQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBBWDZVdGlsLnVuZXNjYXBlSHRtbCgnSFRNTCAmbHQ7c3BhbiZndDtzdHJpbmcmbHQ7L3NwYW4mZ3Q7ICZhbXA7ICZxdW90O2VzY2FwZSZxdW90OycpXG4gICAqIC8vXCJIVE1MIDxzcGFuPnN0cmluZzwvc3Bhbj4gJiBcImVzY2FwZVwiXCJcbiAgICogYGBgXG4gICAqL1xuICB1bmVzY2FwZUh0bWw6IHVuZXNjYXBlSHRtbCxcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0bXBsXG4gICAqIEBwYXJhbSB7Kn0gYXJnc1xuICAgKiBAcmV0dXJuIHtheDZzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuc3RyaW5nKFwiezB9IGlzIGRlYWQsIGJ1dCB7MX0gaXMgYWxpdmUhIHswfSB7Mn1cIikuZm9ybWF0KFwiQVNQXCIsIFwiQVNQLk5FVFwiKTtcbiAgICogQVg2VXRpbC5zdHJpbmcoXCJ7MH0gaXMgZGVhZCwgYnV0IHsxfSBpcyBhbGl2ZSEgezB9IHsyfVwiKS5mb3JtYXQoW1wiQVNQXCIsIFwiQVNQLk5FVFwiXSk7XG4gICAqIEFYNlV0aWwuc3RpbnJnKFwiezB9IGNvdW50c1wiKS5mb3JtYXQoMTAwKTtcbiAgICogYGBgXG4gICAqL1xuICBzdHJpbmc6IHN0cmluZyxcbiAgLyoqXG4gICAqIEBwYXJhbSBfaGV4Q29sb3JcbiAgICogQHJldHVybiB7YXg1Y29sb3J9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuY29sb3IoXCIjZmYzMzAwXCIpLmxpZ2h0ZW4oMTApLmdldEhleFZhbHVlKClcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5jb2xvcihcIiNmZjMzMDBcIikuZGFya2VuKDEwKS5nZXRIZXhWYWx1ZSgpKTtcbiAgICogYGBgXG4gICAqL1xuICBjb2xvcjogY29sb3Jcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVdGlsLmpzIiwiY29uc3Qgd2luID0gd2luZG93O1xuY29uc3QgZG9jID0gKHdpbikgPyB3aW4uZG9jdW1lbnQgOiBudWxsO1xuY29uc3QgZG9jRWxlbSA9ICh3aW4pID8gd2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IG51bGw7XG5cbmxldCBldmVudEtleXMgPSB7XG4gIEJBQ0tTUEFDRTogOCwgVEFCOiA5LFxuICBSRVRVUk46IDEzLCBFU0M6IDI3LCBMRUZUOiAzNywgVVA6IDM4LCBSSUdIVDogMzksIERPV046IDQwLCBERUxFVEU6IDQ2LFxuICBIT01FOiAzNiwgRU5EOiAzNSwgUEFHRVVQOiAzMywgUEFHRURPV046IDM0LCBJTlNFUlQ6IDQ1LCBTUEFDRTogMzJcbn07XG5sZXQgd2Vla05hbWVzID0gW1xuICB7bGFiZWw6IFwiU1VOXCJ9LFxuICB7bGFiZWw6IFwiTU9OXCJ9LFxuICB7bGFiZWw6IFwiVFVFXCJ9LFxuICB7bGFiZWw6IFwiV0VEXCJ9LFxuICB7bGFiZWw6IFwiVEhVXCJ9LFxuICB7bGFiZWw6IFwiRlJJXCJ9LFxuICB7bGFiZWw6IFwiU0FUXCJ9XG5dO1xubGV0IHdoZWVsRW5tID0gKHdpbiAmJiAoL0ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSA/IFwiRE9NTW91c2VTY3JvbGxcIiA6IFwibW91c2V3aGVlbFwiKTtcbmxldCBlcnJvck1zZyA9IHt9O1xuXG5jb25zdCBvbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmVycm9yKGFyZ3VtZW50cyk7XG59O1xuY29uc3QgYnJvd3NlciA9IChmdW5jdGlvbiAodWEsIG1vYmlsZSwgYnJvd3Nlck5hbWUsIG1hdGNoLCBicm93c2VyLCBicm93c2VyVmVyc2lvbikge1xuICBpZiAoIXdpbiB8fCAhd2luLm5hdmlnYXRvcikgcmV0dXJuIHt9O1xuXG4gIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLCBtb2JpbGUgPSAodWEuc2VhcmNoKC9tb2JpbGUvZykgIT0gLTEpLCBicm93c2VyTmFtZSwgbWF0Y2gsIGJyb3dzZXIsIGJyb3dzZXJWZXJzaW9uO1xuXG4gIGlmICh1YS5zZWFyY2goL2lwaG9uZS9nKSAhPSAtMSkge1xuICAgIHJldHVybiB7bmFtZTogXCJpcGhvbmVcIiwgdmVyc2lvbjogMCwgbW9iaWxlOiB0cnVlfVxuICB9XG4gIGVsc2UgaWYgKHVhLnNlYXJjaCgvaXBhZC9nKSAhPSAtMSkge1xuICAgIHJldHVybiB7bmFtZTogXCJpcGFkXCIsIHZlcnNpb246IDAsIG1vYmlsZTogdHJ1ZX1cbiAgfVxuICBlbHNlIGlmICh1YS5zZWFyY2goL2FuZHJvaWQvZykgIT0gLTEpIHtcbiAgICBtYXRjaCA9IC8oYW5kcm9pZClbIFxcL10oW1xcdy5dKykvLmV4ZWModWEpIHx8IFtdO1xuICAgIGJyb3dzZXJWZXJzaW9uID0gKG1hdGNoWzJdIHx8IFwiMFwiKTtcbiAgICByZXR1cm4ge25hbWU6IFwiYW5kcm9pZFwiLCB2ZXJzaW9uOiBicm93c2VyVmVyc2lvbiwgbW9iaWxlOiBtb2JpbGV9XG4gIH1cbiAgZWxzZSB7XG4gICAgYnJvd3Nlck5hbWUgPSBcIlwiO1xuICAgIG1hdGNoID0gLyhvcHIpWyBcXC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fCAvKGNocm9tZSlbIFxcL10oW1xcdy5dKykvLmV4ZWModWEpIHx8IC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHwgLyhtc2llKSAoW1xcdy5dKykvLmV4ZWModWEpIHx8IHVhLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCAmJiAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKHVhKSB8fCBbXTtcbiAgICBicm93c2VyID0gKG1hdGNoWzFdIHx8IFwiXCIpO1xuICAgIGJyb3dzZXJWZXJzaW9uID0gKG1hdGNoWzJdIHx8IFwiMFwiKTtcblxuICAgIGlmIChicm93c2VyID09IFwibXNpZVwiKSBicm93c2VyID0gXCJpZVwiO1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBicm93c2VyLFxuICAgICAgdmVyc2lvbjogYnJvd3NlclZlcnNpb24sXG4gICAgICBtb2JpbGU6IG1vYmlsZVxuICAgIH1cbiAgfVxuICB1YSA9IG51bGwsIG1vYmlsZSA9IG51bGwsIGJyb3dzZXJOYW1lID0gbnVsbCwgbWF0Y2ggPSBudWxsLCBicm93c2VyID0gbnVsbCwgYnJvd3NlclZlcnNpb24gPSBudWxsO1xufSkoKTtcbmNvbnN0IGlzQnJvd3NlciA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIHdpbi5kb2N1bWVudCk7XG5jb25zdCB1cmxVdGlsID0gZnVuY3Rpb24gKHVybCwgdXJscykge1xuICB1cmwgPSB7XG4gICAgaHJlZjogd2luLmxvY2F0aW9uLmhyZWYsXG4gICAgcGFyYW06IHdpbi5sb2NhdGlvbi5zZWFyY2gsXG4gICAgcmVmZXJyZXI6IGRvYy5yZWZlcnJlcixcbiAgICBwYXRobmFtZTogd2luLmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgIGhvc3RuYW1lOiB3aW4ubG9jYXRpb24uaG9zdG5hbWUsXG4gICAgcG9ydDogd2luLmxvY2F0aW9uLnBvcnRcbiAgfTtcbiAgdXJscyA9IHVybC5ocmVmLnNwbGl0KC9bXFw/I10vKTtcbiAgdXJsLnBhcmFtID0gdXJsLnBhcmFtLnJlcGxhY2UoXCI/XCIsIFwiXCIpO1xuICB1cmwudXJsID0gdXJsc1swXTtcbiAgaWYgKHVybC5ocmVmLnNlYXJjaChcIiNcIikgPiAtMSkge1xuICAgIHVybC5oYXNoZGF0YSA9IHVybHNbdXJscy5sZW5ndGggLSAxXTtcbiAgfVxuICB1cmxzID0gbnVsbDtcbiAgdXJsLmJhc2VVcmwgPSB1cmwuaHJlZi5zdWJzdHIoMCwgdXJsLmhyZWYuaW5kZXhPZihcIj9cIikpLnJlcGxhY2UodXJsLnBhdGhuYW1lLCBcIlwiKTtcblxuICByZXR1cm4gdXJsO1xufTtcbmNvbnN0IGdldEVycm9yID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgZXJyb3JDb2RlLCBtZXRob2ROYW1lKSB7XG4gIGlmIChlcnJvck1zZyAmJiBlcnJvck1zZ1tjbGFzc05hbWVdKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgZXJyb3JDb2RlOiBlcnJvckNvZGUsXG4gICAgICBtZXRob2ROYW1lOiBtZXRob2ROYW1lLFxuICAgICAgbXNnOiBlcnJvck1zZ1tjbGFzc05hbWVdW2Vycm9yQ29kZV1cbiAgICB9O1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiB7Y2xhc3NOYW1lOiBjbGFzc05hbWUsIGVycm9yQ29kZTogZXJyb3JDb2RlLCBtZXRob2ROYW1lOiBtZXRob2ROYW1lfTtcbiAgfVxufTtcbmNvbnN0IHN1cHBvcnRUb3VjaCA9ICh3aW4pID8gKCgnb250b3VjaHN0YXJ0JyBpbiB3aW4pIHx8IChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKSB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSkgOiBmYWxzZTtcbmNvbnN0IHN1cHBvcnRGaWxlQXBpID0gKHdpbikgPyAoIHdpbi5GaWxlUmVhZGVyICYmIHdpbi5GaWxlICYmIHdpbi5GaWxlTGlzdCAmJiB3aW4uQmxvYiApIDogZmFsc2U7XG5cbi8qKlxuICogQG1vZHVsZSBBWDZJbmZvXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIOyyq+uyiOynuCDsnpDrpqzsiJgg64+Z7IKsIC0gKO2VhOyalO2VnOqyg+ydtCDsl4bsnYTrlYwgOiA0LCDsi6TtlonsmKTrpZggOiA1KVxuICAgKiDrkZDrsojsp7gg7J6Q66as7IiYIOuqqeyggeyWtCAtIOusuOyekOyXtCAwLCDsiKvsnpAgMSwg67Cw7Je0IDIsIOyYpOu4jOygne2KuCAzLCDtlajsiJggNCwgRE9NIDUsIO2MjOydvCA2LCDquLDtg4AgN1xuICAgKiDshLjrsojsp7gg7J6Q66as7IiYIOyYteyFmFxuICAgKi9cbiAgZXJyb3JNc2c6IGVycm9yTXNnLFxuICAvKipcbiAgICog7JeQ65+sIOy2nOugpeuplOyEuOyngCDsgqzsmqnsnpAg7J6sIOygleydmFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogQVg2SW5mby5vbmVycm9yID0gZnVuY3Rpb24oKXtcbiAgICogIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBvbmVycm9yOiBvbmVycm9yLFxuICAvKipcbiAgICogZXZlbnQga2V5Q29kZXNcbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIHtcbiAgICogXHRCQUNLU1BBQ0U6IDgsIFRBQjogOSxcbiAgICogXHRSRVRVUk46IDEzLCBFU0M6IDI3LCBMRUZUOiAzNywgVVA6IDM4LCBSSUdIVDogMzksIERPV046IDQwLCBERUxFVEU6IDQ2LFxuICAgKiBcdEhPTUU6IDM2LCBFTkQ6IDM1LCBQQUdFVVA6IDMzLCBQQUdFRE9XTjogMzQsIElOU0VSVDogNDUsIFNQQUNFOiAzMlxuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgZXZlbnRLZXlzOiBldmVudEtleXMsXG4gIC8qKlxuICAgKiB3ZWVrIG5hbWVzXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBbXG4gICAqICB7bGFiZWw6IFwiU1VOXCJ9LHtsYWJlbDogXCJNT05cIn0se2xhYmVsOiBcIlRVRVwifSx7bGFiZWw6IFwiV0VEXCJ9LHtsYWJlbDogXCJUSFVcIn0se2xhYmVsOiBcIkZSSVwifSx7bGFiZWw6IFwiU0FUXCJ9XG4gICAqIF1cbiAgICogY29uc29sZS5sb2coIHdlZWtOYW1lc1swXSApO1xuICAgKiBjb25zb2xlLmxvZyggQVg2SW5mby53ZWVrTmFtZXNbKG5ldyBEYXRlKCkpLmdldERheSgpXS5sYWJlbCApXG4gICAqIGBgYFxuICAgKi9cbiAgd2Vla05hbWVzOiB3ZWVrTmFtZXMsXG4gIC8qKlxuICAgKiDsgqzsmqnsnpAg67iM65287Jqw7KCAIOyLneuzhOyaqSDsmKTruIzsoJ3tirhcbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKCBBWDZJbmZvLmJyb3dzZXIgKTtcbiAgICogLy9PYmplY3Qge25hbWU6IFwiY2hyb21lXCIsIHZlcnNpb246IFwiMzkuMC4yMTcxLjcxXCIsIG1vYmlsZTogZmFsc2V9XG4gICAqIGBgYFxuICAgKi9cbiAgYnJvd3NlcjogYnJvd3NlcixcbiAgLyoqXG4gICAqIOu4jOudvOyasOyggCDsl6zrtoBcbiAgICovXG4gIGlzQnJvd3NlcjogaXNCcm93c2VyLFxuICAvKipcbiAgICog67iM65287Jqw7KC47J2YIO2EsOy5mCDqsIDriqUg7Jyg66y066W8IO2ZleyduO2VqeuLiOuLpC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiB2YXIgY2hrRmxhZyA9IEFYNkluZm8uc3VwcG9ydFRvdWNoO1xuICAgKi9cbiAgc3VwcG9ydFRvdWNoOiBzdXBwb3J0VG91Y2gsXG4gIC8qKlxuICAgKiBIVE1MNSBGaWxlQXBpIOyngOybkOyXrOu2gFxuICAgKi9cbiAgc3VwcG9ydEZpbGVBcGk6IHN1cHBvcnRGaWxlQXBpLFxuICAvKipcbiAgICog67iM65287Jqw7KCA7JeQIOuUsOuluCDrp4jsmrDsiqQg7ZygIOydtOuypO2KuOydtOumhFxuICAgKi9cbiAgd2hlZWxFbm06IHdoZWVsRW5tLFxuICAvKipcbiAgICog7ZiE7J6sIO2OmOydtOyngOydmCBVcmwg7KCV67O066W8IOumrO2EtO2VqeuLiOuLpC5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKCBheDUudXRpbC50b0pzb24oIEFYNkluZm8udXJsVXRpbCgpICkgKTtcbiAgICoge1xuICAgKlx0XCJiYXNlVXJsXCI6IFwiaHR0cDovL2F4NToyMDE4XCIsXG4gICAqXHRcImhyZWZcIjogXCJodHRwOi8vYXg1OjIwMTgvc2FtcGxlcy9pbmRleC5odG1sP2E9MSZiPTEjYWJjXCIsXG4gICAqXHRcInBhcmFtXCI6IFwiYT0xJmI9MVwiLFxuICAgKlx0XCJyZWZlcnJlclwiOiBcIlwiLFxuICAgKlx0XCJwYXRobmFtZVwiOiBcIi9zYW1wbGVzL2luZGV4Lmh0bWxcIixcbiAgICpcdFwiaG9zdG5hbWVcIjogXCJheDVcIixcbiAgICpcdFwicG9ydFwiOiBcIjIwMThcIixcbiAgICpcdFwidXJsXCI6IFwiaHR0cDovL2F4NToyMDE4L3NhbXBsZXMvaW5kZXguaHRtbFwiLFxuICAgKlx0XCJoYXNoZGF0YVwiOiBcImFiY1wiXG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICB1cmxVdGlsOiB1cmxVdGlsLFxuICAvKipcbiAgICogYXg1LWVycm9yLW1zZy5qcyDsl5Ag7KCV7J2Y65CcIGF4NSBlcnJvcuulvCDrsJjtmZjtlanri4jri6QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBjb25zb2xlLmxvZyggQVg2SW5mby5nZXRFcnJvcihcInNpbmdsZS11cGxvYWRlclwiLCBcIjQ2MFwiLCBcInVwbG9hZFwiKSApO1xuICAgKlxuICAgKiBpZighdGhpcy5zZWxlY3RlZEZpbGUpe1xuICAgKiAgICAgIGlmIChjZmcub25FdmVudCkge1xuICAgKiAgICAgIFx0dmFyIHRoYXQgPSB7XG4gICAqICAgICAgXHRcdGFjdGlvbjogXCJlcnJvclwiLFxuICAgKiAgICAgIFx0XHRlcnJvcjogQVg2SW5mby5nZXRFcnJvcihcInNpbmdsZS11cGxvYWRlclwiLCBcIjQ2MFwiLCBcInVwbG9hZFwiKVxuICAgKiAgICAgIFx0fTtcbiAgICogICAgICBcdGNmZy5vbkV2ZW50LmNhbGwodGhhdCwgdGhhdCk7XG4gICAqICAgICAgfVxuICAgKiAgICAgIHJldHVybiB0aGlzO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgZ2V0RXJyb3I6IGdldEVycm9yXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2SW5mby5qcyIsIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2My4yLjIgLWFqYXgsLWFqYXgvanNvbnAsLWFqYXgvbG9hZCwtYWpheC9wYXJzZVhNTCwtYWpheC9zY3JpcHQsLWFqYXgvdmFyL2xvY2F0aW9uLC1hamF4L3Zhci9ub25jZSwtYWpheC92YXIvcnF1ZXJ5LC1hamF4L3hociwtbWFuaXB1bGF0aW9uL19ldmFsVXJsLC1ldmVudC9hamF4LC1hdHRyaWJ1dGVzL3Byb3AsLWF0dHJpYnV0ZXMvc3VwcG9ydCwtZGVwcmVjYXRlZCwtZWZmZWN0cywtZWZmZWN0cy9Ud2VlbiwtZWZmZWN0cy9hbmltYXRlZFNlbGVjdG9yLC13cmFwLC1kZWZlcnJlZCwtZGVmZXJyZWQvZXhjZXB0aW9uSG9vaywtcXVldWUsLXF1ZXVlL2RlbGF5LC1jb3JlL3JlYWR5LC1ldmVudC9mb2N1c2luLC1ldmVudC9hbGlhcywtY3NzL3Nob3dIaWRlLC1jc3MvaGlkZGVuVmlzaWJsZVNlbGVjdG9yc1xuICogaHR0cHM6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cHM6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IEpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTctMDctMTRUMDg6MDdaXG4gKi9cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gRm9yIENvbW1vbkpTIGFuZCBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB3aGVyZSBhIHByb3BlciBgd2luZG93YFxuXHRcdC8vIGlzIHByZXNlbnQsIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnkuXG5cdFx0Ly8gRm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBoYXZlIGEgYHdpbmRvd2Agd2l0aCBhIGBkb2N1bWVudGBcblx0XHQvLyAoc3VjaCBhcyBOb2RlLmpzKSwgZXhwb3NlIGEgZmFjdG9yeSBhcyBtb2R1bGUuZXhwb3J0cy5cblx0XHQvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIGB3aW5kb3dgLlxuXHRcdC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcblx0XHQvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvLlxuXHRcdG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmRvY3VtZW50ID9cblx0XHRcdGZhY3RvcnkoIGdsb2JhbCwgdHJ1ZSApIDpcblx0XHRcdGZ1bmN0aW9uKCB3ICkge1xuXHRcdFx0XHRpZiAoICF3LmRvY3VtZW50ICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFjdG9yeSggdyApO1xuXHRcdFx0fTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KCBnbG9iYWwgKTtcblx0fVxuXG4vLyBQYXNzIHRoaXMgaWYgd2luZG93IGlzIG5vdCBkZWZpbmVkIHlldFxufSApKCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oIHdpbmRvdywgbm9HbG9iYWwgKSB7XG5cbi8vIEVkZ2UgPD0gMTIgLSAxMyssIEZpcmVmb3ggPD0xOCAtIDQ1KywgSUUgMTAgLSAxMSwgU2FmYXJpIDUuMSAtIDkrLCBpT1MgNiAtIDkuMVxuLy8gdGhyb3cgZXhjZXB0aW9ucyB3aGVuIG5vbi1zdHJpY3QgY29kZSAoZS5nLiwgQVNQLk5FVCA0LjUpIGFjY2Vzc2VzIHN0cmljdCBtb2RlXG4vLyBhcmd1bWVudHMuY2FsbGVlLmNhbGxlciAodHJhYy0xMzMzNSkuIEJ1dCBhcyBvZiBqUXVlcnkgMy4wICgyMDE2KSwgc3RyaWN0IG1vZGUgc2hvdWxkIGJlIGNvbW1vblxuLy8gZW5vdWdoIHRoYXQgYWxsIHN1Y2ggYXR0ZW1wdHMgYXJlIGd1YXJkZWQgaW4gYSB0cnkgYmxvY2suXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFyciA9IFtdO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxudmFyIHNsaWNlID0gYXJyLnNsaWNlO1xuXG52YXIgY29uY2F0ID0gYXJyLmNvbmNhdDtcblxudmFyIHB1c2ggPSBhcnIucHVzaDtcblxudmFyIGluZGV4T2YgPSBhcnIuaW5kZXhPZjtcblxudmFyIGNsYXNzMnR5cGUgPSB7fTtcblxudmFyIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZztcblxudmFyIGhhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBmblRvU3RyaW5nID0gaGFzT3duLnRvU3RyaW5nO1xuXG52YXIgT2JqZWN0RnVuY3Rpb25TdHJpbmcgPSBmblRvU3RyaW5nLmNhbGwoIE9iamVjdCApO1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG52YXIgaXNXaW5kb3cgPSBmdW5jdGlvbiBpc1dpbmRvdyggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH07XG5cblxuXG5cblx0ZnVuY3Rpb24gRE9NRXZhbCggY29kZSwgZG9jICkge1xuXHRcdGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcblxuXHRcdHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJzY3JpcHRcIiApO1xuXG5cdFx0c2NyaXB0LnRleHQgPSBjb2RlO1xuXHRcdGRvYy5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHQgKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcblx0fVxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuLy8gRGVmaW5pbmcgdGhpcyBnbG9iYWwgaW4gLmVzbGludHJjLmpzb24gd291bGQgY3JlYXRlIGEgZGFuZ2VyIG9mIHVzaW5nIHRoZSBnbG9iYWxcbi8vIHVuZ3VhcmRlZCBpbiBhbm90aGVyIHBsYWNlLCBpdCBzZWVtcyBzYWZlciB0byBkZWZpbmUgZ2xvYmFsIG9ubHkgZm9yIHRoaXMgbW9kdWxlXG5cblxuXG52YXJcblx0dmVyc2lvbiA9IFwiMy4yLjIgLWFqYXgsLWFqYXgvanNvbnAsLWFqYXgvbG9hZCwtYWpheC9wYXJzZVhNTCwtYWpheC9zY3JpcHQsLWFqYXgvdmFyL2xvY2F0aW9uLC1hamF4L3Zhci9ub25jZSwtYWpheC92YXIvcnF1ZXJ5LC1hamF4L3hociwtbWFuaXB1bGF0aW9uL19ldmFsVXJsLC1ldmVudC9hamF4LC1hdHRyaWJ1dGVzL3Byb3AsLWF0dHJpYnV0ZXMvc3VwcG9ydCwtZGVwcmVjYXRlZCwtZWZmZWN0cywtZWZmZWN0cy9Ud2VlbiwtZWZmZWN0cy9hbmltYXRlZFNlbGVjdG9yLC13cmFwLC1kZWZlcnJlZCwtZGVmZXJyZWQvZXhjZXB0aW9uSG9vaywtcXVldWUsLXF1ZXVlL2RlbGF5LC1jb3JlL3JlYWR5LC1ldmVudC9mb2N1c2luLC1ldmVudC9hbGlhcywtY3NzL3Nob3dIaWRlLC1jc3MvaGlkZGVuVmlzaWJsZVNlbGVjdG9yc1wiLFxuXG5cdC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG5cdGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblxuXHRcdC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuXHRcdC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQXG5cdHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLFxuXG5cdC8vIE1hdGNoZXMgZGFzaGVkIHN0cmluZyBmb3IgY2FtZWxpemluZ1xuXHRybXNQcmVmaXggPSAvXi1tcy0vLFxuXHRyZGFzaEFscGhhID0gLy0oW2Etel0pL2csXG5cblx0Ly8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuXHRmY2FtZWxDYXNlID0gZnVuY3Rpb24oIGFsbCwgbGV0dGVyICkge1xuXHRcdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcblx0fTtcblxualF1ZXJ5LmZuID0galF1ZXJ5LnByb3RvdHlwZSA9IHtcblxuXHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGpRdWVyeSBiZWluZyB1c2VkXG5cdGpxdWVyeTogdmVyc2lvbixcblxuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LFxuXG5cdC8vIFRoZSBkZWZhdWx0IGxlbmd0aCBvZiBhIGpRdWVyeSBvYmplY3QgaXMgMFxuXHRsZW5ndGg6IDAsXG5cblx0dG9BcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBHZXQgdGhlIE50aCBlbGVtZW50IGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0IE9SXG5cdC8vIEdldCB0aGUgd2hvbGUgbWF0Y2hlZCBlbGVtZW50IHNldCBhcyBhIGNsZWFuIGFycmF5XG5cdGdldDogZnVuY3Rpb24oIG51bSApIHtcblxuXHRcdC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGluIGEgY2xlYW4gYXJyYXlcblx0XHRpZiAoIG51bSA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XG5cdFx0cmV0dXJuIG51bSA8IDAgPyB0aGlzWyBudW0gKyB0aGlzLmxlbmd0aCBdIDogdGhpc1sgbnVtIF07XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cblx0XHQvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRcdHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuXHRcdC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG5cdFx0cmV0LnByZXZPYmplY3QgPSB0aGlzO1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG5cdGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrICk7XG5cdH0sXG5cblx0bWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSApICk7XG5cdH0sXG5cblx0c2xpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG5cdH0sXG5cblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAwICk7XG5cdH0sXG5cblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIC0xICk7XG5cdH0sXG5cblx0ZXE6IGZ1bmN0aW9uKCBpICkge1xuXHRcdHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1sgaiBdIF0gOiBbXSApO1xuXHR9LFxuXG5cdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgMCBdIHx8IHt9LFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXG5cdFx0Ly8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgaSBdIHx8IHt9O1xuXHRcdGkrKztcblx0fVxuXG5cdC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKCBvcHRpb25zID0gYXJndW1lbnRzWyBpIF0gKSAhPSBudWxsICkge1xuXG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29weSApIHx8XG5cdFx0XHRcdFx0KCBjb3B5SXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIGNvcHkgKSApICkgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGNvcHlJc0FycmF5ICkge1xuXHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIEFycmF5LmlzQXJyYXkoIHNyYyApID8gc3JjIDogW107XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHNyYyApID8gc3JjIDoge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0fSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXG5cdGV4cGFuZG86IFwialF1ZXJ5XCIgKyAoIHZlcnNpb24gKyBNYXRoLnJhbmRvbSgpICkucmVwbGFjZSggL1xcRC9nLCBcIlwiICksXG5cblx0Ly8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcblx0aXNSZWFkeTogdHJ1ZSxcblxuXHRlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuXHR9LFxuXG5cdG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cblx0aXNGdW5jdGlvbjogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTU3LCBGaXJlZm94IDw9NTJcblx0XHQvLyBJbiBzb21lIGJyb3dzZXJzLCB0eXBlb2YgcmV0dXJucyBcImZ1bmN0aW9uXCIgZm9yIEhUTUwgPG9iamVjdD4gZWxlbWVudHNcblx0XHQvLyAoaS5lLiwgYHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm9iamVjdFwiICkgPT09IFwiZnVuY3Rpb25cImApLlxuXHRcdC8vIFdlIGRvbid0IHdhbnQgdG8gY2xhc3NpZnkgKmFueSogRE9NIG5vZGUgYXMgYSBmdW5jdGlvbi5cblx0XHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBvYmoubm9kZVR5cGUgIT09IFwibnVtYmVyXCI7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gQXMgb2YgalF1ZXJ5IDMuMCwgaXNOdW1lcmljIGlzIGxpbWl0ZWQgdG9cblx0XHQvLyBzdHJpbmdzIGFuZCBudW1iZXJzIChwcmltaXRpdmVzIG9yIG9iamVjdHMpXG5cdFx0Ly8gdGhhdCBjYW4gYmUgY29lcmNlZCB0byBmaW5pdGUgbnVtYmVycyAoZ2gtMjY2Milcblx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblx0XHRyZXR1cm4gKCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwic3RyaW5nXCIgKSAmJlxuXG5cdFx0XHQvLyBwYXJzZUZsb2F0IE5hTnMgbnVtZXJpYy1jYXN0IGZhbHNlIHBvc2l0aXZlcyAoXCJcIilcblx0XHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHRcdC8vIHN1YnRyYWN0aW9uIGZvcmNlcyBpbmZpbml0aWVzIHRvIE5hTlxuXHRcdFx0IWlzTmFOKCBvYmogLSBwYXJzZUZsb2F0KCBvYmogKSApO1xuXHR9LFxuXG5cdGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIHByb3RvLCBDdG9yO1xuXG5cdFx0Ly8gRGV0ZWN0IG9idmlvdXMgbmVnYXRpdmVzXG5cdFx0Ly8gVXNlIHRvU3RyaW5nIGluc3RlYWQgb2YgalF1ZXJ5LnR5cGUgdG8gY2F0Y2ggaG9zdCBvYmplY3RzXG5cdFx0aWYgKCAhb2JqIHx8IHRvU3RyaW5nLmNhbGwoIG9iaiApICE9PSBcIltvYmplY3QgT2JqZWN0XVwiICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHByb3RvID0gZ2V0UHJvdG8oIG9iaiApO1xuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIG5vIHByb3RvdHlwZSAoZS5nLiwgYE9iamVjdC5jcmVhdGUoIG51bGwgKWApIGFyZSBwbGFpblxuXHRcdGlmICggIXByb3RvICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIHByb3RvdHlwZSBhcmUgcGxhaW4gaWZmIHRoZXkgd2VyZSBjb25zdHJ1Y3RlZCBieSBhIGdsb2JhbCBPYmplY3QgZnVuY3Rpb25cblx0XHRDdG9yID0gaGFzT3duLmNhbGwoIHByb3RvLCBcImNvbnN0cnVjdG9yXCIgKSAmJiBwcm90by5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBmblRvU3RyaW5nLmNhbGwoIEN0b3IgKSA9PT0gT2JqZWN0RnVuY3Rpb25TdHJpbmc7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy82MTI1XG5cdFx0dmFyIG5hbWU7XG5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0dHlwZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRpZiAoIG9iaiA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIG9iaiArIFwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5IChmdW5jdGlvbmlzaCBSZWdFeHApXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cblx0XHRcdGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwoIG9iaiApIF0gfHwgXCJvYmplY3RcIiA6XG5cdFx0XHR0eXBlb2Ygb2JqO1xuXHR9LFxuXG5cdC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG5cdGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBjb2RlICkge1xuXHRcdERPTUV2YWwoIGNvZGUgKTtcblx0fSxcblxuXHQvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTVcblx0Ly8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuXHRjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG5cdH0sXG5cblx0ZWFjaDogZnVuY3Rpb24oIG9iaiwgY2FsbGJhY2sgKSB7XG5cdFx0dmFyIGxlbmd0aCwgaSA9IDA7XG5cblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBvYmogKSApIHtcblx0XHRcdGxlbmd0aCA9IG9iai5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBvYmogKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHlcblx0dHJpbTogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0cmV0dXJuIHRleHQgPT0gbnVsbCA/XG5cdFx0XHRcIlwiIDpcblx0XHRcdCggdGV4dCArIFwiXCIgKS5yZXBsYWNlKCBydHJpbSwgXCJcIiApO1xuXHR9LFxuXG5cdC8vIHJlc3VsdHMgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFrZUFycmF5OiBmdW5jdGlvbiggYXJyLCByZXN1bHRzICkge1xuXHRcdHZhciByZXQgPSByZXN1bHRzIHx8IFtdO1xuXG5cdFx0aWYgKCBhcnIgIT0gbnVsbCApIHtcblx0XHRcdGlmICggaXNBcnJheUxpa2UoIE9iamVjdCggYXJyICkgKSApIHtcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCByZXQsXG5cdFx0XHRcdFx0dHlwZW9mIGFyciA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0WyBhcnIgXSA6IGFyclxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHVzaC5jYWxsKCByZXQsIGFyciApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0aW5BcnJheTogZnVuY3Rpb24oIGVsZW0sIGFyciwgaSApIHtcblx0XHRyZXR1cm4gYXJyID09IG51bGwgPyAtMSA6IGluZGV4T2YuY2FsbCggYXJyLCBlbGVtLCBpICk7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0bWVyZ2U6IGZ1bmN0aW9uKCBmaXJzdCwgc2Vjb25kICkge1xuXHRcdHZhciBsZW4gPSArc2Vjb25kLmxlbmd0aCxcblx0XHRcdGogPSAwLFxuXHRcdFx0aSA9IGZpcnN0Lmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0Zmlyc3RbIGkrKyBdID0gc2Vjb25kWyBqIF07XG5cdFx0fVxuXG5cdFx0Zmlyc3QubGVuZ3RoID0gaTtcblxuXHRcdHJldHVybiBmaXJzdDtcblx0fSxcblxuXHRncmVwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBpbnZlcnQgKSB7XG5cdFx0dmFyIGNhbGxiYWNrSW52ZXJzZSxcblx0XHRcdG1hdGNoZXMgPSBbXSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuXHRcdFx0Y2FsbGJhY2tFeHBlY3QgPSAhaW52ZXJ0O1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIG9ubHkgc2F2aW5nIHRoZSBpdGVtc1xuXHRcdC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXG5cdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRjYWxsYmFja0ludmVyc2UgPSAhY2FsbGJhY2soIGVsZW1zWyBpIF0sIGkgKTtcblx0XHRcdGlmICggY2FsbGJhY2tJbnZlcnNlICE9PSBjYWxsYmFja0V4cGVjdCApIHtcblx0XHRcdFx0bWF0Y2hlcy5wdXNoKCBlbGVtc1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hdGNoZXM7XG5cdH0sXG5cblx0Ly8gYXJnIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1hcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgYXJnICkge1xuXHRcdHZhciBsZW5ndGgsIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRyZXQgPSBbXTtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCB0cmFuc2xhdGluZyBlYWNoIG9mIHRoZSBpdGVtcyB0byB0aGVpciBuZXcgdmFsdWVzXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggZWxlbXMgKSApIHtcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gZWxlbXMgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0XHRyZXR1cm4gY29uY2F0LmFwcGx5KCBbXSwgcmV0ICk7XG5cdH0sXG5cblx0Ly8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXG5cdGd1aWQ6IDEsXG5cblx0Ly8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XG5cdC8vIGFyZ3VtZW50cy5cblx0cHJveHk6IGZ1bmN0aW9uKCBmbiwgY29udGV4dCApIHtcblx0XHR2YXIgdG1wLCBhcmdzLCBwcm94eTtcblxuXHRcdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR0bXAgPSBmblsgY29udGV4dCBdO1xuXHRcdFx0Y29udGV4dCA9IGZuO1xuXHRcdFx0Zm4gPSB0bXA7XG5cdFx0fVxuXG5cdFx0Ly8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcblx0XHQvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApICkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBTaW11bGF0ZWQgYmluZFxuXHRcdGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDIgKTtcblx0XHRwcm94eSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGZuLmFwcGx5KCBjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KCBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSApICk7XG5cdFx0fTtcblxuXHRcdC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxuXHRcdHByb3h5Lmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCBqUXVlcnkuZ3VpZCsrO1xuXG5cdFx0cmV0dXJuIHByb3h5O1xuXHR9LFxuXG5cdG5vdzogRGF0ZS5ub3csXG5cblx0Ly8galF1ZXJ5LnN1cHBvcnQgaXMgbm90IHVzZWQgaW4gQ29yZSBidXQgb3RoZXIgcHJvamVjdHMgYXR0YWNoIHRoZWlyXG5cdC8vIHByb3BlcnRpZXMgdG8gaXQgc28gaXQgbmVlZHMgdG8gZXhpc3QuXG5cdHN1cHBvcnQ6IHN1cHBvcnRcbn0gKTtcblxuaWYgKCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdGpRdWVyeS5mblsgU3ltYm9sLml0ZXJhdG9yIF0gPSBhcnJbIFN5bWJvbC5pdGVyYXRvciBdO1xufVxuXG4vLyBQb3B1bGF0ZSB0aGUgY2xhc3MydHlwZSBtYXBcbmpRdWVyeS5lYWNoKCBcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3IgU3ltYm9sXCIuc3BsaXQoIFwiIFwiICksXG5mdW5jdGlvbiggaSwgbmFtZSApIHtcblx0Y2xhc3MydHlwZVsgXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiIF0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG59ICk7XG5cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKCBvYmogKSB7XG5cblx0Ly8gU3VwcG9ydDogcmVhbCBpT1MgOC4yIG9ubHkgKG5vdCByZXByb2R1Y2libGUgaW4gc2ltdWxhdG9yKVxuXHQvLyBgaW5gIGNoZWNrIHVzZWQgdG8gcHJldmVudCBKSVQgZXJyb3IgKGdoLTIxNDUpXG5cdC8vIGhhc093biBpc24ndCB1c2VkIGhlcmUgZHVlIHRvIGZhbHNlIG5lZ2F0aXZlc1xuXHQvLyByZWdhcmRpbmcgTm9kZWxpc3QgbGVuZ3RoIGluIElFXG5cdHZhciBsZW5ndGggPSAhIW9iaiAmJiBcImxlbmd0aFwiIGluIG9iaiAmJiBvYmoubGVuZ3RoLFxuXHRcdHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb2JqICkgfHwgaXNXaW5kb3coIG9iaiApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XG5cdFx0dHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmICggbGVuZ3RoIC0gMSApIGluIG9iajtcbn1cbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXG4vKlxuICogT3B0aW9uYWwgKG5vbi1TaXp6bGUpIHNlbGVjdG9yIG1vZHVsZSBmb3IgY3VzdG9tIGJ1aWxkcy5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBET0VTIE5PVCBTVVBQT1JUIG1hbnkgZG9jdW1lbnRlZCBqUXVlcnlcbiAqIGZlYXR1cmVzIGluIGV4Y2hhbmdlIGZvciBpdHMgc21hbGxlciBzaXplOlxuICpcbiAqIEF0dHJpYnV0ZSBub3QgZXF1YWwgc2VsZWN0b3JcbiAqIFBvc2l0aW9uYWwgc2VsZWN0b3JzICg6Zmlyc3Q7IDplcShuKTsgOm9kZDsgZXRjLilcbiAqIFR5cGUgc2VsZWN0b3JzICg6aW5wdXQ7IDpjaGVja2JveDsgOmJ1dHRvbjsgZXRjLilcbiAqIFN0YXRlLWJhc2VkIHNlbGVjdG9ycyAoOmFuaW1hdGVkOyA6dmlzaWJsZTsgOmhpZGRlbjsgZXRjLilcbiAqIDpoYXMoc2VsZWN0b3IpXG4gKiA6bm90KGNvbXBsZXggc2VsZWN0b3IpXG4gKiBjdXN0b20gc2VsZWN0b3JzIHZpYSBTaXp6bGUgZXh0ZW5zaW9uc1xuICogTGVhZGluZyBjb21iaW5hdG9ycyAoZS5nLiwgJGNvbGxlY3Rpb24uZmluZChcIj4gKlwiKSlcbiAqIFJlbGlhYmxlIGZ1bmN0aW9uYWxpdHkgb24gWE1MIGZyYWdtZW50c1xuICogUmVxdWlyaW5nIGFsbCBwYXJ0cyBvZiBhIHNlbGVjdG9yIHRvIG1hdGNoIGVsZW1lbnRzIHVuZGVyIGNvbnRleHRcbiAqICAgKGUuZy4sICRkaXYuZmluZChcImRpdiA+ICpcIikgbm93IG1hdGNoZXMgY2hpbGRyZW4gb2YgJGRpdilcbiAqIE1hdGNoaW5nIGFnYWluc3Qgbm9uLWVsZW1lbnRzXG4gKiBSZWxpYWJsZSBzb3J0aW5nIG9mIGRpc2Nvbm5lY3RlZCBub2Rlc1xuICogcXVlcnlTZWxlY3RvckFsbCBidWcgZml4ZXMgKGUuZy4sIHVucmVsaWFibGUgOmZvY3VzIG9uIFdlYktpdClcbiAqXG4gKiBJZiBhbnkgb2YgdGhlc2UgYXJlIHVuYWNjZXB0YWJsZSB0cmFkZW9mZnMsIGVpdGhlciB1c2UgU2l6emxlIG9yXG4gKiBjdXN0b21pemUgdGhpcyBzdHViIGZvciB0aGUgcHJvamVjdCdzIHNwZWNpZmljIG5lZWRzLlxuICovXG5cbnZhciBoYXNEdXBsaWNhdGUsIHNvcnRJbnB1dCxcblx0c29ydFN0YWJsZSA9IGpRdWVyeS5leHBhbmRvLnNwbGl0KCBcIlwiICkuc29ydCggc29ydE9yZGVyICkuam9pbiggXCJcIiApID09PSBqUXVlcnkuZXhwYW5kbyxcblx0bWF0Y2hlcyA9IGRvY3VtZW50RWxlbWVudC5tYXRjaGVzIHx8XG5cdFx0ZG9jdW1lbnRFbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY3VtZW50RWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2N1bWVudEVsZW1lbnQub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY3VtZW50RWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcixcblxuXHQvLyBDU1Mgc3RyaW5nL2lkZW50aWZpZXIgc2VyaWFsaXphdGlvblxuXHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI2NvbW1vbi1zZXJpYWxpemluZy1pZGlvbXNcblx0cmNzc2VzY2FwZSA9IC8oW1xcMC1cXHgxZlxceDdmXXxeLT9cXGQpfF4tJHxbXlxceDgwLVxcdUZGRkZcXHctXS9nLFxuXHRmY3NzZXNjYXBlID0gZnVuY3Rpb24oIGNoLCBhc0NvZGVQb2ludCApIHtcblx0XHRpZiAoIGFzQ29kZVBvaW50ICkge1xuXG5cdFx0XHQvLyBVKzAwMDAgTlVMTCBiZWNvbWVzIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVJcblx0XHRcdGlmICggY2ggPT09IFwiXFwwXCIgKSB7XG5cdFx0XHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udHJvbCBjaGFyYWN0ZXJzIGFuZCAoZGVwZW5kZW50IHVwb24gcG9zaXRpb24pIG51bWJlcnMgZ2V0IGVzY2FwZWQgYXMgY29kZSBwb2ludHNcblx0XHRcdHJldHVybiBjaC5zbGljZSggMCwgLTEgKSArIFwiXFxcXFwiICsgY2guY2hhckNvZGVBdCggY2gubGVuZ3RoIC0gMSApLnRvU3RyaW5nKCAxNiApICsgXCIgXCI7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXIgcG90ZW50aWFsbHktc3BlY2lhbCBBU0NJSSBjaGFyYWN0ZXJzIGdldCBiYWNrc2xhc2gtZXNjYXBlZFxuXHRcdHJldHVybiBcIlxcXFxcIiArIGNoO1xuXHR9O1xuXG5mdW5jdGlvbiBzb3J0T3JkZXIoIGEsIGIgKSB7XG5cblx0Ly8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcblx0aWYgKCBhID09PSBiICkge1xuXHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHQvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG5cdHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcblx0aWYgKCBjb21wYXJlICkge1xuXHRcdHJldHVybiBjb21wYXJlO1xuXHR9XG5cblx0Ly8gQ2FsY3VsYXRlIHBvc2l0aW9uIGlmIGJvdGggaW5wdXRzIGJlbG9uZyB0byB0aGUgc2FtZSBkb2N1bWVudFxuXHRjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09PSAoIGIub3duZXJEb2N1bWVudCB8fCBiICkgP1xuXHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cblx0XHQvLyBPdGhlcndpc2Ugd2Uga25vdyB0aGV5IGFyZSBkaXNjb25uZWN0ZWRcblx0XHQxO1xuXG5cdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRpZiAoIGNvbXBhcmUgJiAxICkge1xuXG5cdFx0Ly8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG5cdFx0aWYgKCBhID09PSBkb2N1bWVudCB8fCBhLm93bmVyRG9jdW1lbnQgPT09IGRvY3VtZW50ICYmXG5cdFx0XHRqUXVlcnkuY29udGFpbnMoIGRvY3VtZW50LCBhICkgKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXHRcdGlmICggYiA9PT0gZG9jdW1lbnQgfHwgYi5vd25lckRvY3VtZW50ID09PSBkb2N1bWVudCAmJlxuXHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBkb2N1bWVudCwgYiApICkge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRyZXR1cm4gc29ydElucHV0ID9cblx0XHRcdCggaW5kZXhPZi5jYWxsKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YuY2FsbCggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHQwO1xuXHR9XG5cblx0cmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xufVxuXG5mdW5jdGlvbiB1bmlxdWVTb3J0KCByZXN1bHRzICkge1xuXHR2YXIgZWxlbSxcblx0XHRkdXBsaWNhdGVzID0gW10sXG5cdFx0aiA9IDAsXG5cdFx0aSA9IDA7XG5cblx0aGFzRHVwbGljYXRlID0gZmFsc2U7XG5cdHNvcnRJbnB1dCA9ICFzb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcblx0cmVzdWx0cy5zb3J0KCBzb3J0T3JkZXIgKTtcblxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcblx0XHR3aGlsZSAoICggZWxlbSA9IHJlc3VsdHNbIGkrKyBdICkgKSB7XG5cdFx0XHRpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgXSApIHtcblx0XHRcdFx0aiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdHJlc3VsdHMuc3BsaWNlKCBkdXBsaWNhdGVzWyBqIF0sIDEgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9zaXp6bGUvcHVsbC8yMjVcblx0c29ydElucHV0ID0gbnVsbDtcblxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gZXNjYXBlKCBzZWwgKSB7XG5cdHJldHVybiAoIHNlbCArIFwiXCIgKS5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0dW5pcXVlU29ydDogdW5pcXVlU29ydCxcblx0dW5pcXVlOiB1bmlxdWVTb3J0LFxuXHRlc2NhcGVTZWxlY3RvcjogZXNjYXBlLFxuXHRmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdFx0dmFyIGVsZW0sIG5vZGVUeXBlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRcdC8vIFNhbWUgYmFzaWMgc2FmZWd1YXJkIGFzIFNpenpsZVxuXHRcdGlmICggIXNlbGVjdG9yIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH1cblxuXHRcdC8vIEVhcmx5IHJldHVybiBpZiBjb250ZXh0IGlzIG5vdCBhbiBlbGVtZW50IG9yIGRvY3VtZW50XG5cdFx0aWYgKCAoIG5vZGVUeXBlID0gY29udGV4dC5ub2RlVHlwZSApICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdGlmICggc2VlZCApIHtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gc2VlZFsgaSsrIF0gKSApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG5cdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0alF1ZXJ5Lm1lcmdlKCByZXN1bHRzLCBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fSxcblx0dGV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5vZGUsXG5cdFx0XHRyZXQgPSBcIlwiLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRub2RlVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHRpZiAoICFub2RlVHlwZSApIHtcblxuXHRcdFx0Ly8gSWYgbm8gbm9kZVR5cGUsIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gYXJyYXlcblx0XHRcdHdoaWxlICggKCBub2RlID0gZWxlbVsgaSsrIF0gKSApIHtcblxuXHRcdFx0XHQvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuXHRcdFx0XHRyZXQgKz0galF1ZXJ5LnRleHQoIG5vZGUgKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cblx0XHRcdC8vIFVzZSB0ZXh0Q29udGVudCBmb3IgZWxlbWVudHNcblx0XHRcdHJldHVybiBlbGVtLnRleHRDb250ZW50O1xuXHRcdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAzIHx8IG5vZGVUeXBlID09PSA0ICkge1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZVZhbHVlO1xuXHRcdH1cblxuXHRcdC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblx0Y29udGFpbnM6IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG5cdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcblx0XHRyZXR1cm4gYSA9PT0gYnVwIHx8ICEhKCBidXAgJiYgYnVwLm5vZGVUeXBlID09PSAxICYmIGFkb3duLmNvbnRhaW5zKCBidXAgKSApO1xuXHR9LFxuXHRpc1hNTERvYzogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBkb2N1bWVudEVsZW1lbnQgaXMgdmVyaWZpZWQgZm9yIGNhc2VzIHdoZXJlIGl0IGRvZXNuJ3QgeWV0IGV4aXN0XG5cdFx0Ly8gKHN1Y2ggYXMgbG9hZGluZyBpZnJhbWVzIGluIElFIC0gIzQ4MzMpXG5cdFx0dmFyIGRvY3VtZW50RWxlbWVudCA9IGVsZW0gJiYgKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApLmRvY3VtZW50RWxlbWVudDtcblx0XHRyZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xuXHR9LFxuXHRleHByOiB7XG5cdFx0YXR0ckhhbmRsZToge30sXG5cdFx0bWF0Y2g6IHtcblx0XHRcdGJvb2w6IG5ldyBSZWdFeHAoIFwiXig/OmNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyXCIgK1xuXHRcdFx0XHRcInxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZCkkXCIsIFwiaVwiICksXG5cdFx0XHRuZWVkc0NvbnRleHQ6IC9eW1xceDIwXFx0XFxyXFxuXFxmXSpbPit+XS9cblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmZpbmQsIHtcblx0bWF0Y2hlczogZnVuY3Rpb24oIGV4cHIsIGVsZW1lbnRzICkge1xuXHRcdHJldHVybiBqUXVlcnkuZmluZCggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcblx0fSxcblx0bWF0Y2hlc1NlbGVjdG9yOiBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0XHRyZXR1cm4gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdHZhciBmbiA9IGpRdWVyeS5leHByLmF0dHJIYW5kbGVbIG5hbWUudG9Mb3dlckNhc2UoKSBdLFxuXG5cdFx0XHQvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoalF1ZXJ5ICMxMzgwNylcblx0XHRcdHZhbHVlID0gZm4gJiYgaGFzT3duLmNhbGwoIGpRdWVyeS5leHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cblx0XHRcdFx0Zm4oIGVsZW0sIG5hbWUsIGpRdWVyeS5pc1hNTERvYyggZWxlbSApICkgOlxuXHRcdFx0XHR1bmRlZmluZWQ7XG5cdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cdH1cbn0gKTtcblxuXG5cbnZhciBkaXIgPSBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcblx0dmFyIG1hdGNoZWQgPSBbXSxcblx0XHR0cnVuY2F0ZSA9IHVudGlsICE9PSB1bmRlZmluZWQ7XG5cblx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICYmIGVsZW0ubm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0aWYgKCB0cnVuY2F0ZSAmJiBqUXVlcnkoIGVsZW0gKS5pcyggdW50aWwgKSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hdGNoZWQ7XG59O1xuXG5cbnZhciBzaWJsaW5ncyA9IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdO1xuXG5cdGZvciAoIDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcgKSB7XG5cdFx0aWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG5cdFx0XHRtYXRjaGVkLnB1c2goIG4gKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHJuZWVkc0NvbnRleHQgPSBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7XG5cblxuXG5mdW5jdGlvbiBub2RlTmFtZSggZWxlbSwgbmFtZSApIHtcblxuICByZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcblxufTtcbnZhciByc2luZ2xlVGFnID0gKCAvXjwoW2Etel1bXlxcL1xcMD46XFx4MjBcXHRcXHJcXG5cXGZdKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcLz8+KD86PFxcL1xcMT58KSQvaSApO1xuXG5cblxudmFyIHJpc1NpbXBsZSA9IC9eLlteOiNcXFtcXC4sXSokLztcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiAhIXF1YWxpZmllci5jYWxsKCBlbGVtLCBpLCBlbGVtICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBTaW5nbGUgZWxlbWVudFxuXHRpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gQXJyYXlsaWtlIG9mIGVsZW1lbnRzIChqUXVlcnksIGFyZ3VtZW50cywgQXJyYXkpXG5cdGlmICggdHlwZW9mIHF1YWxpZmllciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2ltcGxlIHNlbGVjdG9yIHRoYXQgY2FuIGJlIGZpbHRlcmVkIGRpcmVjdGx5LCByZW1vdmluZyBub24tRWxlbWVudHNcblx0aWYgKCByaXNTaW1wbGUudGVzdCggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xuXHR9XG5cblx0Ly8gQ29tcGxleCBzZWxlY3RvciwgY29tcGFyZSB0aGUgdHdvIHNldHMsIHJlbW92aW5nIG5vbi1FbGVtZW50c1xuXHRxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XG5cdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3QgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMTtcblx0fSApO1xufVxuXG5qUXVlcnkuZmlsdGVyID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1zLCBub3QgKSB7XG5cdHZhciBlbGVtID0gZWxlbXNbIDAgXTtcblxuXHRpZiAoIG5vdCApIHtcblx0XHRleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xuXHR9XG5cblx0aWYgKCBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5maW5kLm1hdGNoZXMoIGV4cHIsIGpRdWVyeS5ncmVwKCBlbGVtcywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdH0gKSApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGksIHJldCxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHNlbGZbIGkgXSwgdGhpcyApICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICkgKTtcblx0XHR9XG5cblx0XHRyZXQgPSB0aGlzLnB1c2hTdGFjayggW10gKTtcblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRqUXVlcnkuZmluZCggc2VsZWN0b3IsIHNlbGZbIGkgXSwgcmV0ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGxlbiA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggcmV0ICkgOiByZXQ7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgZmFsc2UgKSApO1xuXHR9LFxuXHRub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIHRydWUgKSApO1xuXHR9LFxuXHRpczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiAhIXdpbm5vdyhcblx0XHRcdHRoaXMsXG5cblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcblx0XHRcdC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cblx0XHRcdHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICkgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHRzZWxlY3RvciB8fCBbXSxcblx0XHRcdGZhbHNlXG5cdFx0KS5sZW5ndGg7XG5cdH1cbn0gKTtcblxuXG4vLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuXG5cbi8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxudmFyIHJvb3RqUXVlcnksXG5cblx0Ly8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3Ncblx0Ly8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuXHQvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcblx0Ly8gU2hvcnRjdXQgc2ltcGxlICNpZCBjYXNlIGZvciBzcGVlZFxuXHRycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKykpJC8sXG5cblx0aW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByb290ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbTtcblxuXHRcdC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gTWV0aG9kIGluaXQoKSBhY2NlcHRzIGFuIGFsdGVybmF0ZSByb290alF1ZXJ5XG5cdFx0Ly8gc28gbWlncmF0ZSBjYW4gc3VwcG9ydCBqUXVlcnkuc3ViIChnaC0yMTAxKVxuXHRcdHJvb3QgPSByb290IHx8IHJvb3RqUXVlcnk7XG5cblx0XHQvLyBIYW5kbGUgSFRNTCBzdHJpbmdzXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRpZiAoIHNlbGVjdG9yWyAwIF0gPT09IFwiPFwiICYmXG5cdFx0XHRcdHNlbGVjdG9yWyBzZWxlY3Rvci5sZW5ndGggLSAxIF0gPT09IFwiPlwiICYmXG5cdFx0XHRcdHNlbGVjdG9yLmxlbmd0aCA+PSAzICkge1xuXG5cdFx0XHRcdC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG5cdFx0XHRcdG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuXHRcdFx0aWYgKCBtYXRjaCAmJiAoIG1hdGNoWyAxIF0gfHwgIWNvbnRleHQgKSApIHtcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCkgLT4gJChhcnJheSlcblx0XHRcdFx0aWYgKCBtYXRjaFsgMSBdICkge1xuXHRcdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFsgMCBdIDogY29udGV4dDtcblxuXHRcdFx0XHRcdC8vIE9wdGlvbiB0byBydW4gc2NyaXB0cyBpcyB0cnVlIGZvciBiYWNrLWNvbXBhdFxuXHRcdFx0XHRcdC8vIEludGVudGlvbmFsbHkgbGV0IHRoZSBlcnJvciBiZSB0aHJvd24gaWYgcGFyc2VIVE1MIGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLCBqUXVlcnkucGFyc2VIVE1MKFxuXHRcdFx0XHRcdFx0bWF0Y2hbIDEgXSxcblx0XHRcdFx0XHRcdGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQsXG5cdFx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdFx0KSApO1xuXG5cdFx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwsIHByb3BzKVxuXHRcdFx0XHRcdGlmICggcnNpbmdsZVRhZy50ZXN0KCBtYXRjaFsgMSBdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcblx0XHRcdFx0XHRcdGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUHJvcGVydGllcyBvZiBjb250ZXh0IGFyZSBjYWxsZWQgYXMgbWV0aG9kcyBpZiBwb3NzaWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB0aGlzWyBtYXRjaCBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpc1sgbWF0Y2ggXSggY29udGV4dFsgbWF0Y2ggXSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmFuZCBvdGhlcndpc2Ugc2V0IGFzIGF0dHJpYnV0ZXNcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmF0dHIoIG1hdGNoLCBjb250ZXh0WyBtYXRjaCBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoI2lkKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbWF0Y2hbIDIgXSApO1xuXG5cdFx0XHRcdFx0aWYgKCBlbGVtICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxuXHRcdFx0XHRcdFx0dGhpc1sgMCBdID0gZWxlbTtcblx0XHRcdFx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3QgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKERPTUVsZW1lbnQpXG5cdFx0fSBlbHNlIGlmICggc2VsZWN0b3Iubm9kZVR5cGUgKSB7XG5cdFx0XHR0aGlzWyAwIF0gPSBzZWxlY3Rvcjtcblx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0Ly8gSEFORExFOiAkKGZ1bmN0aW9uKVxuXHRcdC8vIFNob3J0Y3V0IGZvciBkb2N1bWVudCByZWFkeVxuXHRcdH0gZWxzZSBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuXHRcdFx0cmV0dXJuIHJvb3QucmVhZHkgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHJvb3QucmVhZHkoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIEV4ZWN1dGUgaW1tZWRpYXRlbHkgaWYgcmVhZHkgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0c2VsZWN0b3IoIGpRdWVyeSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxuXG52YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cblx0Ly8gTWV0aG9kcyBndWFyYW50ZWVkIHRvIHByb2R1Y2UgYSB1bmlxdWUgc2V0IHdoZW4gc3RhcnRpbmcgZnJvbSBhIHVuaXF1ZSBzZXRcblx0Z3VhcmFudGVlZFVuaXF1ZSA9IHtcblx0XHRjaGlsZHJlbjogdHJ1ZSxcblx0XHRjb250ZW50czogdHJ1ZSxcblx0XHRuZXh0OiB0cnVlLFxuXHRcdHByZXY6IHRydWVcblx0fTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRoYXM6IGZ1bmN0aW9uKCB0YXJnZXQgKSB7XG5cdFx0dmFyIHRhcmdldHMgPSBqUXVlcnkoIHRhcmdldCwgdGhpcyApLFxuXHRcdFx0bCA9IHRhcmdldHMubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbIGkgXSApICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0bWF0Y2hlZCA9IFtdLFxuXHRcdFx0dGFyZ2V0cyA9IHR5cGVvZiBzZWxlY3RvcnMgIT09IFwic3RyaW5nXCIgJiYgalF1ZXJ5KCBzZWxlY3RvcnMgKTtcblxuXHRcdC8vIFBvc2l0aW9uYWwgc2VsZWN0b3JzIG5ldmVyIG1hdGNoLCBzaW5jZSB0aGVyZSdzIG5vIF9zZWxlY3Rpb25fIGNvbnRleHRcblx0XHRpZiAoICFybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmb3IgKCBjdXIgPSB0aGlzWyBpIF07IGN1ciAmJiBjdXIgIT09IGNvbnRleHQ7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXG5cdFx0XHRcdFx0Ly8gQWx3YXlzIHNraXAgZG9jdW1lbnQgZnJhZ21lbnRzXG5cdFx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPCAxMSAmJiAoIHRhcmdldHMgP1xuXHRcdFx0XHRcdFx0dGFyZ2V0cy5pbmRleCggY3VyICkgPiAtMSA6XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuXHRcdFx0XHRcdFx0Y3VyLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggY3VyLCBzZWxlY3RvcnMgKSApICkge1xuXG5cdFx0XHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApIDogbWF0Y2hlZCApO1xuXHR9LFxuXG5cdC8vIERldGVybWluZSB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW4gdGhlIHNldFxuXHRpbmRleDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBObyBhcmd1bWVudCwgcmV0dXJuIGluZGV4IGluIHBhcmVudFxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCB0aGlzWyAwIF0gJiYgdGhpc1sgMCBdLnBhcmVudE5vZGUgKSA/IHRoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoIDogLTE7XG5cdFx0fVxuXG5cdFx0Ly8gSW5kZXggaW4gc2VsZWN0b3Jcblx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggalF1ZXJ5KCBlbGVtICksIHRoaXNbIDAgXSApO1xuXHRcdH1cblxuXHRcdC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxuXHRcdHJldHVybiBpbmRleE9mLmNhbGwoIHRoaXMsXG5cblx0XHRcdC8vIElmIGl0IHJlY2VpdmVzIGEgalF1ZXJ5IG9iamVjdCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdXNlZFxuXHRcdFx0ZWxlbS5qcXVlcnkgPyBlbGVtWyAwIF0gOiBlbGVtXG5cdFx0KTtcblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soXG5cdFx0XHRqUXVlcnkudW5pcXVlU29ydChcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG5cdFx0XHR0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKCBzZWxlY3RvciApXG5cdFx0KTtcblx0fVxufSApO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0d2hpbGUgKCAoIGN1ciA9IGN1clsgZGlyIF0gKSAmJiBjdXIubm9kZVR5cGUgIT09IDEgKSB7fVxuXHRyZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCgge1xuXHRwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcblx0fSxcblx0cGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcblx0fSxcblx0cGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIsIHVudGlsICk7XG5cdH0sXG5cdG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXZBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRzaWJsaW5nczogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCAoIGVsZW0ucGFyZW50Tm9kZSB8fCB7fSApLmZpcnN0Q2hpbGQsIGVsZW0gKTtcblx0fSxcblx0Y2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggZWxlbS5maXJzdENoaWxkICk7XG5cdH0sXG5cdGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgaWYgKCBub2RlTmFtZSggZWxlbSwgXCJpZnJhbWVcIiApICkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uY29udGVudERvY3VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3VwcG9ydDogSUUgOSAtIDExIG9ubHksIGlPUyA3IG9ubHksIEFuZHJvaWQgQnJvd3NlciA8PTQuMyBvbmx5XG4gICAgICAgIC8vIFRyZWF0IHRoZSB0ZW1wbGF0ZSBlbGVtZW50IGFzIGEgcmVndWxhciBvbmUgaW4gYnJvd3NlcnMgdGhhdFxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IGl0LlxuICAgICAgICBpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRlbXBsYXRlXCIgKSApIHtcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtLmNvbnRlbnQgfHwgZWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBlbGVtLmNoaWxkTm9kZXMgKTtcblx0fVxufSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCB1bnRpbCwgc2VsZWN0b3IgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuXHRcdGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuXHRcdFx0aWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRtYXRjaGVkLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQgKTtcblx0fTtcbn0gKTtcbnZhciBybm90aHRtbHdoaXRlID0gKCAvW15cXHgyMFxcdFxcclxcblxcZl0rL2cgKTtcblxuXG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0ge307XG5cdGpRdWVyeS5lYWNoKCBvcHRpb25zLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10sIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuXHRcdG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcblx0fSApO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSA6XG5cdFx0alF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcblxuXHR2YXIgLy8gRmxhZyB0byBrbm93IGlmIGxpc3QgaXMgY3VycmVudGx5IGZpcmluZ1xuXHRcdGZpcmluZyxcblxuXHRcdC8vIExhc3QgZmlyZSB2YWx1ZSBmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzXG5cdFx0bWVtb3J5LFxuXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblxuXHRcdC8vIEZsYWcgdG8gcHJldmVudCBmaXJpbmdcblx0XHRsb2NrZWQsXG5cblx0XHQvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuXHRcdGxpc3QgPSBbXSxcblxuXHRcdC8vIFF1ZXVlIG9mIGV4ZWN1dGlvbiBkYXRhIGZvciByZXBlYXRhYmxlIGxpc3RzXG5cdFx0cXVldWUgPSBbXSxcblxuXHRcdC8vIEluZGV4IG9mIGN1cnJlbnRseSBmaXJpbmcgY2FsbGJhY2sgKG1vZGlmaWVkIGJ5IGFkZC9yZW1vdmUgYXMgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4ID0gLTEsXG5cblx0XHQvLyBGaXJlIGNhbGxiYWNrc1xuXHRcdGZpcmUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRW5mb3JjZSBzaW5nbGUtZmlyaW5nXG5cdFx0XHRsb2NrZWQgPSBsb2NrZWQgfHwgb3B0aW9ucy5vbmNlO1xuXG5cdFx0XHQvLyBFeGVjdXRlIGNhbGxiYWNrcyBmb3IgYWxsIHBlbmRpbmcgZXhlY3V0aW9ucyxcblx0XHRcdC8vIHJlc3BlY3RpbmcgZmlyaW5nSW5kZXggb3ZlcnJpZGVzIGFuZCBydW50aW1lIGNoYW5nZXNcblx0XHRcdGZpcmVkID0gZmlyaW5nID0gdHJ1ZTtcblx0XHRcdGZvciAoIDsgcXVldWUubGVuZ3RoOyBmaXJpbmdJbmRleCA9IC0xICkge1xuXHRcdFx0XHRtZW1vcnkgPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0XHR3aGlsZSAoICsrZmlyaW5nSW5kZXggPCBsaXN0Lmxlbmd0aCApIHtcblxuXHRcdFx0XHRcdC8vIFJ1biBjYWxsYmFjayBhbmQgY2hlY2sgZm9yIGVhcmx5IHRlcm1pbmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBtZW1vcnlbIDAgXSwgbWVtb3J5WyAxIF0gKSA9PT0gZmFsc2UgJiZcblx0XHRcdFx0XHRcdG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEp1bXAgdG8gZW5kIGFuZCBmb3JnZXQgdGhlIGRhdGEgc28gLmFkZCBkb2Vzbid0IHJlLWZpcmVcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yZ2V0IHRoZSBkYXRhIGlmIHdlJ3JlIGRvbmUgd2l0aCBpdFxuXHRcdFx0aWYgKCAhb3B0aW9ucy5tZW1vcnkgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRmaXJpbmcgPSBmYWxzZTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgaWYgd2UncmUgZG9uZSBmaXJpbmcgZm9yIGdvb2Rcblx0XHRcdGlmICggbG9ja2VkICkge1xuXG5cdFx0XHRcdC8vIEtlZXAgYW4gZW1wdHkgbGlzdCBpZiB3ZSBoYXZlIGRhdGEgZm9yIGZ1dHVyZSBhZGQgY2FsbHNcblx0XHRcdFx0aWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgdGhpcyBvYmplY3QgaXMgc3BlbnRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsaXN0ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cblx0XHRcdC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3Rcblx0XHRcdGFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblxuXHRcdFx0XHRcdC8vIElmIHdlIGhhdmUgbWVtb3J5IGZyb20gYSBwYXN0IHJ1biwgd2Ugc2hvdWxkIGZpcmUgYWZ0ZXIgYWRkaW5nXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0cXVldWUucHVzaCggbWVtb3J5ICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0KCBmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiBqUXVlcnkudHlwZSggYXJnICkgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0XHRcdFx0YWRkKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0gKSggYXJndW1lbnRzICk7XG5cblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Rcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0dmFyIGluZGV4O1xuXHRcdFx0XHRcdHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cblx0XHRcdFx0XHRcdC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuXHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcblx0XHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXgtLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDaGVjayBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0LlxuXHRcdFx0Ly8gSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHJldHVybiB3aGV0aGVyIG9yIG5vdCBsaXN0IGhhcyBjYWxsYmFja3MgYXR0YWNoZWQuXG5cdFx0XHRoYXM6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0cmV0dXJuIGZuID9cblx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggZm4sIGxpc3QgKSA+IC0xIDpcblx0XHRcdFx0XHRsaXN0Lmxlbmd0aCA+IDA7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlIGFuZCAuYWRkXG5cdFx0XHQvLyBBYm9ydCBhbnkgY3VycmVudC9wZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdC8vIENsZWFyIGFsbCBjYWxsYmFja3MgYW5kIHZhbHVlc1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhbGlzdDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmVcblx0XHRcdC8vIEFsc28gZGlzYWJsZSAuYWRkIHVubGVzcyB3ZSBoYXZlIG1lbW9yeSAoc2luY2UgaXQgd291bGQgaGF2ZSBubyBlZmZlY3QpXG5cdFx0XHQvLyBBYm9ydCBhbnkgcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHRsb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0aWYgKCAhbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhbG9ja2VkO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuXHRcdFx0XHRpZiAoICFsb2NrZWQgKSB7XG5cdFx0XHRcdFx0YXJncyA9IGFyZ3MgfHwgW107XG5cdFx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0aWYgKCAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG5cdFx0XHRmaXJlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5cbmpRdWVyeS5yZWFkeUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKCBlcnJvciApIHtcblx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdHRocm93IGVycm9yO1xuXHR9ICk7XG59O1xuXG5cblxuXG4vLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cbi8vIFRoZSB2YWx1ZS9zIGNhbiBvcHRpb25hbGx5IGJlIGV4ZWN1dGVkIGlmIGl0J3MgYSBmdW5jdGlvblxudmFyIGFjY2VzcyA9IGZ1bmN0aW9uKCBlbGVtcywgZm4sIGtleSwgdmFsdWUsIGNoYWluYWJsZSwgZW1wdHlHZXQsIHJhdyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGVsZW1zLmxlbmd0aCxcblx0XHRidWxrID0ga2V5ID09IG51bGw7XG5cblx0Ly8gU2V0cyBtYW55IHZhbHVlc1xuXHRpZiAoIGpRdWVyeS50eXBlKCBrZXkgKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXHRcdGZvciAoIGkgaW4ga2V5ICkge1xuXHRcdFx0YWNjZXNzKCBlbGVtcywgZm4sIGksIGtleVsgaSBdLCB0cnVlLCBlbXB0eUdldCwgcmF3ICk7XG5cdFx0fVxuXG5cdC8vIFNldHMgb25lIHZhbHVlXG5cdH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGJ1bGsgKSB7XG5cblx0XHRcdC8vIEJ1bGsgb3BlcmF0aW9ucyBydW4gYWdhaW5zdCB0aGUgZW50aXJlIHNldFxuXHRcdFx0aWYgKCByYXcgKSB7XG5cdFx0XHRcdGZuLmNhbGwoIGVsZW1zLCB2YWx1ZSApO1xuXHRcdFx0XHRmbiA9IG51bGw7XG5cblx0XHRcdC8vIC4uLmV4Y2VwdCB3aGVuIGV4ZWN1dGluZyBmdW5jdGlvbiB2YWx1ZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJ1bGsgPSBmbjtcblx0XHRcdFx0Zm4gPSBmdW5jdGlvbiggZWxlbSwga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gYnVsay5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdmFsdWUgKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGZuKFxuXHRcdFx0XHRcdGVsZW1zWyBpIF0sIGtleSwgcmF3ID9cblx0XHRcdFx0XHR2YWx1ZSA6XG5cdFx0XHRcdFx0dmFsdWUuY2FsbCggZWxlbXNbIGkgXSwgaSwgZm4oIGVsZW1zWyBpIF0sIGtleSApIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoIGNoYWluYWJsZSApIHtcblx0XHRyZXR1cm4gZWxlbXM7XG5cdH1cblxuXHQvLyBHZXRzXG5cdGlmICggYnVsayApIHtcblx0XHRyZXR1cm4gZm4uY2FsbCggZWxlbXMgKTtcblx0fVxuXG5cdHJldHVybiBsZW4gPyBmbiggZWxlbXNbIDAgXSwga2V5ICkgOiBlbXB0eUdldDtcbn07XG52YXIgYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHQvLyBBY2NlcHRzIG9ubHk6XG5cdC8vICAtIE5vZGVcblx0Ly8gICAgLSBOb2RlLkVMRU1FTlRfTk9ERVxuXHQvLyAgICAtIE5vZGUuRE9DVU1FTlRfTk9ERVxuXHQvLyAgLSBPYmplY3Rcblx0Ly8gICAgLSBBbnlcblx0cmV0dXJuIG93bmVyLm5vZGVUeXBlID09PSAxIHx8IG93bmVyLm5vZGVUeXBlID09PSA5IHx8ICEoICtvd25lci5ub2RlVHlwZSApO1xufTtcblxuXG5cblxuZnVuY3Rpb24gRGF0YSgpIHtcblx0dGhpcy5leHBhbmRvID0galF1ZXJ5LmV4cGFuZG8gKyBEYXRhLnVpZCsrO1xufVxuXG5EYXRhLnVpZCA9IDE7XG5cbkRhdGEucHJvdG90eXBlID0ge1xuXG5cdGNhY2hlOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgb3duZXIgb2JqZWN0IGFscmVhZHkgaGFzIGEgY2FjaGVcblx0XHR2YXIgdmFsdWUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHQvLyBJZiBub3QsIGNyZWF0ZSBvbmVcblx0XHRpZiAoICF2YWx1ZSApIHtcblx0XHRcdHZhbHVlID0ge307XG5cblx0XHRcdC8vIFdlIGNhbiBhY2NlcHQgZGF0YSBmb3Igbm9uLWVsZW1lbnQgbm9kZXMgaW4gbW9kZXJuIGJyb3dzZXJzLFxuXHRcdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHRcdC8vIEFsd2F5cyByZXR1cm4gYW4gZW1wdHkgb2JqZWN0LlxuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBvd25lciApICkge1xuXG5cdFx0XHRcdC8vIElmIGl0IGlzIGEgbm9kZSB1bmxpa2VseSB0byBiZSBzdHJpbmdpZnktZWQgb3IgbG9vcGVkIG92ZXJcblx0XHRcdFx0Ly8gdXNlIHBsYWluIGFzc2lnbm1lbnRcblx0XHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB2YWx1ZTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2Ugc2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcblx0XHRcdFx0Ly8gY29uZmlndXJhYmxlIG11c3QgYmUgdHJ1ZSB0byBhbGxvdyB0aGUgcHJvcGVydHkgdG8gYmVcblx0XHRcdFx0Ly8gZGVsZXRlZCB3aGVuIGRhdGEgaXMgcmVtb3ZlZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb3duZXIsIHRoaXMuZXhwYW5kbywge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3AsXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGUoIG93bmVyICk7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIGtleSwgdmFsdWUgXSBhcmdzXG5cdFx0Ly8gQWx3YXlzIHVzZSBjYW1lbENhc2Uga2V5IChnaC0yMjU3KVxuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRjYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggZGF0YSApIF0gPSB2YWx1ZTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQ29weSB0aGUgcHJvcGVydGllcyBvbmUtYnktb25lIHRvIHRoZSBjYWNoZSBvYmplY3Rcblx0XHRcdGZvciAoIHByb3AgaW4gZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVbIGpRdWVyeS5jYW1lbENhc2UoIHByb3AgKSBdID0gZGF0YVsgcHJvcCBdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2FjaGU7XG5cdH0sXG5cdGdldDogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0cmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMuY2FjaGUoIG93bmVyICkgOlxuXG5cdFx0XHQvLyBBbHdheXMgdXNlIGNhbWVsQ2FzZSBrZXkgKGdoLTIyNTcpXG5cdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gJiYgb3duZXJbIHRoaXMuZXhwYW5kbyBdWyBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKSBdO1xuXHR9LFxuXHRhY2Nlc3M6IGZ1bmN0aW9uKCBvd25lciwga2V5LCB2YWx1ZSApIHtcblxuXHRcdC8vIEluIGNhc2VzIHdoZXJlIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gTm8ga2V5IHdhcyBzcGVjaWZpZWRcblx0XHQvLyAgIDIuIEEgc3RyaW5nIGtleSB3YXMgc3BlY2lmaWVkLCBidXQgbm8gdmFsdWUgcHJvdmlkZWRcblx0XHQvL1xuXHRcdC8vIFRha2UgdGhlIFwicmVhZFwiIHBhdGggYW5kIGFsbG93IHRoZSBnZXQgbWV0aG9kIHRvIGRldGVybWluZVxuXHRcdC8vIHdoaWNoIHZhbHVlIHRvIHJldHVybiwgcmVzcGVjdGl2ZWx5IGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gVGhlIGVudGlyZSBjYWNoZSBvYmplY3Rcblx0XHQvLyAgIDIuIFRoZSBkYXRhIHN0b3JlZCBhdCB0aGUga2V5XG5cdFx0Ly9cblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdCggKCBrZXkgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiApICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0KCBvd25lciwga2V5ICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2hlbiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZywgb3IgYm90aCBhIGtleSBhbmQgdmFsdWVcblx0XHQvLyBhcmUgc3BlY2lmaWVkLCBzZXQgb3IgZXh0ZW5kIChleGlzdGluZyBvYmplY3RzKSB3aXRoIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gQW4gb2JqZWN0IG9mIHByb3BlcnRpZXNcblx0XHQvLyAgIDIuIEEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vXG5cdFx0dGhpcy5zZXQoIG93bmVyLCBrZXksIHZhbHVlICk7XG5cblx0XHQvLyBTaW5jZSB0aGUgXCJzZXRcIiBwYXRoIGNhbiBoYXZlIHR3byBwb3NzaWJsZSBlbnRyeSBwb2ludHNcblx0XHQvLyByZXR1cm4gdGhlIGV4cGVjdGVkIGRhdGEgYmFzZWQgb24gd2hpY2ggcGF0aCB3YXMgdGFrZW5bKl1cblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoga2V5O1xuXHR9LFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHZhciBpLFxuXHRcdFx0Y2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHRpZiAoIGNhY2hlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBrZXkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSgga2V5ICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYga2V5IGlzIGFuIGFycmF5IG9mIGtleXMuLi5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIHNldCBjYW1lbENhc2Uga2V5cywgc28gcmVtb3ZlIHRoYXQuXG5cdFx0XHRcdGtleSA9IGtleS5tYXAoIGpRdWVyeS5jYW1lbENhc2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtleSA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXG5cdFx0XHRcdC8vIElmIGEga2V5IHdpdGggdGhlIHNwYWNlcyBleGlzdHMsIHVzZSBpdC5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBjcmVhdGUgYW4gYXJyYXkgYnkgbWF0Y2hpbmcgbm9uLXdoaXRlc3BhY2Vcblx0XHRcdFx0a2V5ID0ga2V5IGluIGNhY2hlID9cblx0XHRcdFx0XHRbIGtleSBdIDpcblx0XHRcdFx0XHQoIGtleS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdICk7XG5cdFx0XHR9XG5cblx0XHRcdGkgPSBrZXkubGVuZ3RoO1xuXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlbIGkgXSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBpZiB0aGVyZSdzIG5vIG1vcmUgZGF0YVxuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHwgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICkgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDVcblx0XHRcdC8vIFdlYmtpdCAmIEJsaW5rIHBlcmZvcm1hbmNlIHN1ZmZlcnMgd2hlbiBkZWxldGluZyBwcm9wZXJ0aWVzXG5cdFx0XHQvLyBmcm9tIERPTSBub2Rlcywgc28gc2V0IHRvIHVuZGVmaW5lZCBpbnN0ZWFkXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzg2MDcgKGJ1ZyByZXN0cmljdGVkKVxuXHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHR2YXIgY2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0cmV0dXJuIGNhY2hlICE9PSB1bmRlZmluZWQgJiYgIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApO1xuXHR9XG59O1xudmFyIGRhdGFQcml2ID0gbmV3IERhdGEoKTtcblxudmFyIGRhdGFVc2VyID0gbmV3IERhdGEoKTtcblxuXG5cbi8vXHRJbXBsZW1lbnRhdGlvbiBTdW1tYXJ5XG4vL1xuLy9cdDEuIEVuZm9yY2UgQVBJIHN1cmZhY2UgYW5kIHNlbWFudGljIGNvbXBhdGliaWxpdHkgd2l0aCAxLjkueCBicmFuY2hcbi8vXHQyLiBJbXByb3ZlIHRoZSBtb2R1bGUncyBtYWludGFpbmFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIHN0b3JhZ2Vcbi8vXHRcdHBhdGhzIHRvIGEgc2luZ2xlIG1lY2hhbmlzbS5cbi8vXHQzLiBVc2UgdGhlIHNhbWUgc2luZ2xlIG1lY2hhbmlzbSB0byBzdXBwb3J0IFwicHJpdmF0ZVwiIGFuZCBcInVzZXJcIiBkYXRhLlxuLy9cdDQuIF9OZXZlcl8gZXhwb3NlIFwicHJpdmF0ZVwiIGRhdGEgdG8gdXNlciBjb2RlIChUT0RPOiBEcm9wIF9kYXRhLCBfcmVtb3ZlRGF0YSlcbi8vXHQ1LiBBdm9pZCBleHBvc2luZyBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIG9uIHVzZXIgb2JqZWN0cyAoZWcuIGV4cGFuZG8gcHJvcGVydGllcylcbi8vXHQ2LiBQcm92aWRlIGEgY2xlYXIgcGF0aCBmb3IgaW1wbGVtZW50YXRpb24gdXBncmFkZSB0byBXZWFrTWFwIGluIDIwMTRcblxudmFyIHJicmFjZSA9IC9eKD86XFx7W1xcd1xcV10qXFx9fFxcW1tcXHdcXFddKlxcXSkkLyxcblx0cm11bHRpRGFzaCA9IC9bQS1aXS9nO1xuXG5mdW5jdGlvbiBnZXREYXRhKCBkYXRhICkge1xuXHRpZiAoIGRhdGEgPT09IFwidHJ1ZVwiICkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aWYgKCBkYXRhID09PSBcImZhbHNlXCIgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aWYgKCBkYXRhID09PSBcIm51bGxcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIE9ubHkgY29udmVydCB0byBhIG51bWJlciBpZiBpdCBkb2Vzbid0IGNoYW5nZSB0aGUgc3RyaW5nXG5cdGlmICggZGF0YSA9PT0gK2RhdGEgKyBcIlwiICkge1xuXHRcdHJldHVybiArZGF0YTtcblx0fVxuXG5cdGlmICggcmJyYWNlLnRlc3QoIGRhdGEgKSApIHtcblx0XHRyZXR1cm4gSlNPTi5wYXJzZSggZGF0YSApO1xuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGRhdGFBdHRyKCBlbGVtLCBrZXksIGRhdGEgKSB7XG5cdHZhciBuYW1lO1xuXG5cdC8vIElmIG5vdGhpbmcgd2FzIGZvdW5kIGludGVybmFsbHksIHRyeSB0byBmZXRjaCBhbnlcblx0Ly8gZGF0YSBmcm9tIHRoZSBIVE1MNSBkYXRhLSogYXR0cmlidXRlXG5cdGlmICggZGF0YSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0bmFtZSA9IFwiZGF0YS1cIiArIGtleS5yZXBsYWNlKCBybXVsdGlEYXNoLCBcIi0kJlwiICkudG9Mb3dlckNhc2UoKTtcblx0XHRkYXRhID0gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcblxuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRkYXRhID0gZ2V0RGF0YSggZGF0YSApO1xuXHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgd2Ugc2V0IHRoZSBkYXRhIHNvIGl0IGlzbid0IGNoYW5nZWQgbGF0ZXJcblx0XHRcdGRhdGFVc2VyLnNldCggZWxlbSwga2V5LCBkYXRhICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkYXRhVXNlci5oYXNEYXRhKCBlbGVtICkgfHwgZGF0YVByaXYuaGFzRGF0YSggZWxlbSApO1xuXHR9LFxuXG5cdGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuXHRcdHJldHVybiBkYXRhVXNlci5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhVXNlci5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fSxcblxuXHQvLyBUT0RPOiBOb3cgdGhhdCBhbGwgY2FsbHMgdG8gX2RhdGEgYW5kIF9yZW1vdmVEYXRhIGhhdmUgYmVlbiByZXBsYWNlZFxuXHQvLyB3aXRoIGRpcmVjdCBjYWxscyB0byBkYXRhUHJpdiBtZXRob2RzLCB0aGVzZSBjYW4gYmUgZGVwcmVjYXRlZC5cblx0X2RhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuXHRcdHJldHVybiBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRfcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRkYXRhOiBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHR2YXIgaSwgbmFtZSwgZGF0YSxcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF0sXG5cdFx0XHRhdHRycyA9IGVsZW0gJiYgZWxlbS5hdHRyaWJ1dGVzO1xuXG5cdFx0Ly8gR2V0cyBhbGwgdmFsdWVzXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRcdGRhdGEgPSBkYXRhVXNlci5nZXQoIGVsZW0gKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgIWRhdGFQcml2LmdldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiApICkge1xuXHRcdFx0XHRcdGkgPSBhdHRycy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDExIG9ubHlcblx0XHRcdFx0XHRcdC8vIFRoZSBhdHRycyBlbGVtZW50cyBjYW4gYmUgbnVsbCAoIzE0ODk0KVxuXHRcdFx0XHRcdFx0aWYgKCBhdHRyc1sgaSBdICkge1xuXHRcdFx0XHRcdFx0XHRuYW1lID0gYXR0cnNbIGkgXS5uYW1lO1xuXHRcdFx0XHRcdFx0XHRpZiAoIG5hbWUuaW5kZXhPZiggXCJkYXRhLVwiICkgPT09IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUuc2xpY2UoIDUgKSApO1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFBdHRyKCBlbGVtLCBuYW1lLCBkYXRhWyBuYW1lIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRhUHJpdi5zZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9XG5cblx0XHQvLyBTZXRzIG11bHRpcGxlIHZhbHVlc1xuXHRcdGlmICggdHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhVXNlci5zZXQoIHRoaXMsIGtleSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBkYXRhO1xuXG5cdFx0XHQvLyBUaGUgY2FsbGluZyBqUXVlcnkgb2JqZWN0IChlbGVtZW50IG1hdGNoZXMpIGlzIG5vdCBlbXB0eVxuXHRcdFx0Ly8gKGFuZCB0aGVyZWZvcmUgaGFzIGFuIGVsZW1lbnQgYXBwZWFycyBhdCB0aGlzWyAwIF0pIGFuZCB0aGVcblx0XHRcdC8vIGB2YWx1ZWAgcGFyYW1ldGVyIHdhcyBub3QgdW5kZWZpbmVkLiBBbiBlbXB0eSBqUXVlcnkgb2JqZWN0XG5cdFx0XHQvLyB3aWxsIHJlc3VsdCBpbiBgdW5kZWZpbmVkYCBmb3IgZWxlbSA9IHRoaXNbIDAgXSB3aGljaCB3aWxsXG5cdFx0XHQvLyB0aHJvdyBhbiBleGNlcHRpb24gaWYgYW4gYXR0ZW1wdCB0byByZWFkIGEgZGF0YSBjYWNoZSBpcyBtYWRlLlxuXHRcdFx0aWYgKCBlbGVtICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBnZXQgZGF0YSBmcm9tIHRoZSBjYWNoZVxuXHRcdFx0XHQvLyBUaGUga2V5IHdpbGwgYWx3YXlzIGJlIGNhbWVsQ2FzZWQgaW4gRGF0YVxuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIFwiZGlzY292ZXJcIiB0aGUgZGF0YSBpblxuXHRcdFx0XHQvLyBIVE1MNSBjdXN0b20gZGF0YS0qIGF0dHJzXG5cdFx0XHRcdGRhdGEgPSBkYXRhQXR0ciggZWxlbSwga2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2UgdHJpZWQgcmVhbGx5IGhhcmQsIGJ1dCB0aGUgZGF0YSBkb2Vzbid0IGV4aXN0LlxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGUgZGF0YS4uLlxuXHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBXZSBhbHdheXMgc3RvcmUgdGhlIGNhbWVsQ2FzZWQga2V5XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5LCB2YWx1ZSApO1xuXHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSwgbnVsbCwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRkYXRhVXNlci5yZW1vdmUoIHRoaXMsIGtleSApO1xuXHRcdH0gKTtcblx0fVxufSApO1xudmFyIHBudW0gPSAoIC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvICkuc291cmNlO1xuXG52YXIgcmNzc051bSA9IG5ldyBSZWdFeHAoIFwiXig/OihbKy1dKT18KShcIiArIHBudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiICk7XG5cblxudmFyIGNzc0V4cGFuZCA9IFsgXCJUb3BcIiwgXCJSaWdodFwiLCBcIkJvdHRvbVwiLCBcIkxlZnRcIiBdO1xuXG52YXIgaXNIaWRkZW5XaXRoaW5UcmVlID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuXG5cdFx0Ly8gaXNIaWRkZW5XaXRoaW5UcmVlIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG5cdFx0Ly8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XG5cdFx0ZWxlbSA9IGVsIHx8IGVsZW07XG5cblx0XHQvLyBJbmxpbmUgc3R5bGUgdHJ1bXBzIGFsbFxuXHRcdHJldHVybiBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8XG5cdFx0XHRlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgJiZcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBjaGVjayBjb21wdXRlZCBzdHlsZVxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTQzIC0gNDVcblx0XHRcdC8vIERpc2Nvbm5lY3RlZCBlbGVtZW50cyBjYW4gaGF2ZSBjb21wdXRlZCBkaXNwbGF5OiBub25lLCBzbyBmaXJzdCBjb25maXJtIHRoYXQgZWxlbSBpc1xuXHRcdFx0Ly8gaW4gdGhlIGRvY3VtZW50LlxuXHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSAmJlxuXG5cdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApID09PSBcIm5vbmVcIjtcblx0fTtcblxudmFyIHN3YXAgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgY2FsbGJhY2ssIGFyZ3MgKSB7XG5cdHZhciByZXQsIG5hbWUsXG5cdFx0b2xkID0ge307XG5cblx0Ly8gUmVtZW1iZXIgdGhlIG9sZCB2YWx1ZXMsIGFuZCBpbnNlcnQgdGhlIG5ldyBvbmVzXG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRvbGRbIG5hbWUgXSA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcblx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSBvcHRpb25zWyBuYW1lIF07XG5cdH1cblxuXHRyZXQgPSBjYWxsYmFjay5hcHBseSggZWxlbSwgYXJncyB8fCBbXSApO1xuXG5cdC8vIFJldmVydCB0aGUgb2xkIHZhbHVlc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb2xkWyBuYW1lIF07XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcblxuXG5cblxuZnVuY3Rpb24gYWRqdXN0Q1NTKCBlbGVtLCBwcm9wLCB2YWx1ZVBhcnRzLCB0d2VlbiApIHtcblx0dmFyIGFkanVzdGVkLFxuXHRcdHNjYWxlID0gMSxcblx0XHRtYXhJdGVyYXRpb25zID0gMjAsXG5cdFx0Y3VycmVudFZhbHVlID0gdHdlZW4gP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0d2Vlbi5jdXIoKTtcblx0XHRcdH0gOlxuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wLCBcIlwiICk7XG5cdFx0XHR9LFxuXHRcdGluaXRpYWwgPSBjdXJyZW50VmFsdWUoKSxcblx0XHR1bml0ID0gdmFsdWVQYXJ0cyAmJiB2YWx1ZVBhcnRzWyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICksXG5cblx0XHQvLyBTdGFydGluZyB2YWx1ZSBjb21wdXRhdGlvbiBpcyByZXF1aXJlZCBmb3IgcG90ZW50aWFsIHVuaXQgbWlzbWF0Y2hlc1xuXHRcdGluaXRpYWxJblVuaXQgPSAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK2luaXRpYWwgKSAmJlxuXHRcdFx0cmNzc051bS5leGVjKCBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wICkgKTtcblxuXHRpZiAoIGluaXRpYWxJblVuaXQgJiYgaW5pdGlhbEluVW5pdFsgMyBdICE9PSB1bml0ICkge1xuXG5cdFx0Ly8gVHJ1c3QgdW5pdHMgcmVwb3J0ZWQgYnkgalF1ZXJ5LmNzc1xuXHRcdHVuaXQgPSB1bml0IHx8IGluaXRpYWxJblVuaXRbIDMgXTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIHR3ZWVuIHByb3BlcnRpZXMgbGF0ZXIgb25cblx0XHR2YWx1ZVBhcnRzID0gdmFsdWVQYXJ0cyB8fCBbXTtcblxuXHRcdC8vIEl0ZXJhdGl2ZWx5IGFwcHJveGltYXRlIGZyb20gYSBub256ZXJvIHN0YXJ0aW5nIHBvaW50XG5cdFx0aW5pdGlhbEluVW5pdCA9ICtpbml0aWFsIHx8IDE7XG5cblx0XHRkbyB7XG5cblx0XHRcdC8vIElmIHByZXZpb3VzIGl0ZXJhdGlvbiB6ZXJvZWQgb3V0LCBkb3VibGUgdW50aWwgd2UgZ2V0ICpzb21ldGhpbmcqLlxuXHRcdFx0Ly8gVXNlIHN0cmluZyBmb3IgZG91Ymxpbmcgc28gd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHNlZSBzY2FsZSBhcyB1bmNoYW5nZWQgYmVsb3dcblx0XHRcdHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xuXG5cdFx0XHQvLyBBZGp1c3QgYW5kIGFwcGx5XG5cdFx0XHRpbml0aWFsSW5Vbml0ID0gaW5pdGlhbEluVW5pdCAvIHNjYWxlO1xuXHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBpbml0aWFsSW5Vbml0ICsgdW5pdCApO1xuXG5cdFx0Ly8gVXBkYXRlIHNjYWxlLCB0b2xlcmF0aW5nIHplcm8gb3IgTmFOIGZyb20gdHdlZW4uY3VyKClcblx0XHQvLyBCcmVhayB0aGUgbG9vcCBpZiBzY2FsZSBpcyB1bmNoYW5nZWQgb3IgcGVyZmVjdCwgb3IgaWYgd2UndmUganVzdCBoYWQgZW5vdWdoLlxuXHRcdH0gd2hpbGUgKFxuXHRcdFx0c2NhbGUgIT09ICggc2NhbGUgPSBjdXJyZW50VmFsdWUoKSAvIGluaXRpYWwgKSAmJiBzY2FsZSAhPT0gMSAmJiAtLW1heEl0ZXJhdGlvbnNcblx0XHQpO1xuXHR9XG5cblx0aWYgKCB2YWx1ZVBhcnRzICkge1xuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbEluVW5pdCB8fCAraW5pdGlhbCB8fCAwO1xuXG5cdFx0Ly8gQXBwbHkgcmVsYXRpdmUgb2Zmc2V0ICgrPS8tPSkgaWYgc3BlY2lmaWVkXG5cdFx0YWRqdXN0ZWQgPSB2YWx1ZVBhcnRzWyAxIF0gP1xuXHRcdFx0aW5pdGlhbEluVW5pdCArICggdmFsdWVQYXJ0c1sgMSBdICsgMSApICogdmFsdWVQYXJ0c1sgMiBdIDpcblx0XHRcdCt2YWx1ZVBhcnRzWyAyIF07XG5cdFx0aWYgKCB0d2VlbiApIHtcblx0XHRcdHR3ZWVuLnVuaXQgPSB1bml0O1xuXHRcdFx0dHdlZW4uc3RhcnQgPSBpbml0aWFsSW5Vbml0O1xuXHRcdFx0dHdlZW4uZW5kID0gYWRqdXN0ZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhZGp1c3RlZDtcbn1cbnZhciByY2hlY2thYmxlVHlwZSA9ICggL14oPzpjaGVja2JveHxyYWRpbykkL2kgKTtcblxudmFyIHJ0YWdOYW1lID0gKCAvPChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSspL2kgKTtcblxudmFyIHJzY3JpcHRUeXBlID0gKCAvXiR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pICk7XG5cblxuXG4vLyBXZSBoYXZlIHRvIGNsb3NlIHRoZXNlIHRhZ3MgdG8gc3VwcG9ydCBYSFRNTCAoIzEzMjAwKVxudmFyIHdyYXBNYXAgPSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0b3B0aW9uOiBbIDEsIFwiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnPlwiLCBcIjwvc2VsZWN0PlwiIF0sXG5cblx0Ly8gWEhUTUwgcGFyc2VycyBkbyBub3QgbWFnaWNhbGx5IGluc2VydCBlbGVtZW50cyBpbiB0aGVcblx0Ly8gc2FtZSB3YXkgdGhhdCB0YWcgc291cCBwYXJzZXJzIGRvLiBTbyB3ZSBjYW5ub3Qgc2hvcnRlblxuXHQvLyB0aGlzIGJ5IG9taXR0aW5nIDx0Ym9keT4gb3Igb3RoZXIgcmVxdWlyZWQgZWxlbWVudHMuXG5cdHRoZWFkOiBbIDEsIFwiPHRhYmxlPlwiLCBcIjwvdGFibGU+XCIgXSxcblx0Y29sOiBbIDIsIFwiPHRhYmxlPjxjb2xncm91cD5cIiwgXCI8L2NvbGdyb3VwPjwvdGFibGU+XCIgXSxcblx0dHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXHR0ZDogWyAzLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiIF0sXG5cblx0X2RlZmF1bHQ6IFsgMCwgXCJcIiwgXCJcIiBdXG59O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxud3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXG53cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xud3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cblxuZnVuY3Rpb24gZ2V0QWxsKCBjb250ZXh0LCB0YWcgKSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHQvLyBVc2UgdHlwZW9mIHRvIGF2b2lkIHplcm8tYXJndW1lbnQgbWV0aG9kIGludm9jYXRpb24gb24gaG9zdCBvYmplY3RzICgjMTUxNTEpXG5cdHZhciByZXQ7XG5cblx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRyZXQgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKTtcblxuXHR9IGVsc2UgaWYgKCB0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldCA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnIHx8IFwiKlwiICk7XG5cblx0fSBlbHNlIHtcblx0XHRyZXQgPSBbXTtcblx0fVxuXG5cdGlmICggdGFnID09PSB1bmRlZmluZWQgfHwgdGFnICYmIG5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICk7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuXG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YVByaXYuc2V0KFxuXHRcdFx0ZWxlbXNbIGkgXSxcblx0XHRcdFwiZ2xvYmFsRXZhbFwiLFxuXHRcdFx0IXJlZkVsZW1lbnRzIHx8IGRhdGFQcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuXG52YXIgcmh0bWwgPSAvPHwmIz9cXHcrOy87XG5cbmZ1bmN0aW9uIGJ1aWxkRnJhZ21lbnQoIGVsZW1zLCBjb250ZXh0LCBzY3JpcHRzLCBzZWxlY3Rpb24sIGlnbm9yZWQgKSB7XG5cdHZhciBlbGVtLCB0bXAsIHRhZywgd3JhcCwgY29udGFpbnMsIGosXG5cdFx0ZnJhZ21lbnQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRub2RlcyA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdGVsZW0gPSBlbGVtc1sgaSBdO1xuXG5cdFx0aWYgKCBlbGVtIHx8IGVsZW0gPT09IDAgKSB7XG5cblx0XHRcdC8vIEFkZCBub2RlcyBkaXJlY3RseVxuXHRcdFx0aWYgKCBqUXVlcnkudHlwZSggZWxlbSApID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuXHRcdFx0Ly8gQ29udmVydCBub24taHRtbCBpbnRvIGEgdGV4dCBub2RlXG5cdFx0XHR9IGVsc2UgaWYgKCAhcmh0bWwudGVzdCggZWxlbSApICkge1xuXHRcdFx0XHRub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuXHRcdFx0Ly8gQ29udmVydCBodG1sIGludG8gRE9NIG5vZGVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0bXAgPSB0bXAgfHwgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNvbnRleHQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApICk7XG5cblx0XHRcdFx0Ly8gRGVzZXJpYWxpemUgYSBzdGFuZGFyZCByZXByZXNlbnRhdGlvblxuXHRcdFx0XHR0YWcgPSAoIHJ0YWdOYW1lLmV4ZWMoIGVsZW0gKSB8fCBbIFwiXCIsIFwiXCIgXSApWyAxIF0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0d3JhcCA9IHdyYXBNYXBbIHRhZyBdIHx8IHdyYXBNYXAuX2RlZmF1bHQ7XG5cdFx0XHRcdHRtcC5pbm5lckhUTUwgPSB3cmFwWyAxIF0gKyBqUXVlcnkuaHRtbFByZWZpbHRlciggZWxlbSApICsgd3JhcFsgMiBdO1xuXG5cdFx0XHRcdC8vIERlc2NlbmQgdGhyb3VnaCB3cmFwcGVycyB0byB0aGUgcmlnaHQgY29udGVudFxuXHRcdFx0XHRqID0gd3JhcFsgMCBdO1xuXHRcdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0XHR0bXAgPSB0bXAubGFzdENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgdG1wLmNoaWxkTm9kZXMgKTtcblxuXHRcdFx0XHQvLyBSZW1lbWJlciB0aGUgdG9wLWxldmVsIGNvbnRhaW5lclxuXHRcdFx0XHR0bXAgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRcdC8vIEVuc3VyZSB0aGUgY3JlYXRlZCBub2RlcyBhcmUgb3JwaGFuZWQgKCMxMjM5Milcblx0XHRcdFx0dG1wLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZW1vdmUgd3JhcHBlciBmcm9tIGZyYWdtZW50XG5cdGZyYWdtZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuXHRpID0gMDtcblx0d2hpbGUgKCAoIGVsZW0gPSBub2Rlc1sgaSsrIF0gKSApIHtcblxuXHRcdC8vIFNraXAgZWxlbWVudHMgYWxyZWFkeSBpbiB0aGUgY29udGV4dCBjb2xsZWN0aW9uICh0cmFjLTQwODcpXG5cdFx0aWYgKCBzZWxlY3Rpb24gJiYgalF1ZXJ5LmluQXJyYXkoIGVsZW0sIHNlbGVjdGlvbiApID4gLTEgKSB7XG5cdFx0XHRpZiAoIGlnbm9yZWQgKSB7XG5cdFx0XHRcdGlnbm9yZWQucHVzaCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udGFpbnMgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gQXBwZW5kIHRvIGZyYWdtZW50XG5cdFx0dG1wID0gZ2V0QWxsKCBmcmFnbWVudC5hcHBlbmRDaGlsZCggZWxlbSApLCBcInNjcmlwdFwiICk7XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0aWYgKCBjb250YWlucyApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIHRtcCApO1xuXHRcdH1cblxuXHRcdC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcblx0XHRpZiAoIHNjcmlwdHMgKSB7XG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gdG1wWyBqKysgXSApICkge1xuXHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFx0c2NyaXB0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnJhZ21lbnQ7XG59XG5cblxuKCBmdW5jdGlvbigpIHtcblx0dmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdGRpdiA9IGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKSxcblx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHlcblx0Ly8gQ2hlY2sgc3RhdGUgbG9zdCBpZiB0aGUgbmFtZSBpcyBzZXQgKCMxMTIxNylcblx0Ly8gU3VwcG9ydDogV2luZG93cyBXZWIgQXBwcyAoV1dBKVxuXHQvLyBgbmFtZWAgYW5kIGB0eXBlYCBtdXN0IHVzZSAuc2V0QXR0cmlidXRlIGZvciBXV0EgKCMxNDkwMSlcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjEgb25seVxuXHQvLyBPbGRlciBXZWJLaXQgZG9lc24ndCBjbG9uZSBjaGVja2VkIHN0YXRlIGNvcnJlY3RseSBpbiBmcmFnbWVudHNcblx0c3VwcG9ydC5jaGVja0Nsb25lID0gZGl2LmNsb25lTm9kZSggdHJ1ZSApLmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5jaGVja2VkO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHQvLyBNYWtlIHN1cmUgdGV4dGFyZWEgKGFuZCBjaGVja2JveCkgZGVmYXVsdFZhbHVlIGlzIHByb3Blcmx5IGNsb25lZFxuXHRkaXYuaW5uZXJIVE1MID0gXCI8dGV4dGFyZWE+eDwvdGV4dGFyZWE+XCI7XG5cdHN1cHBvcnQubm9DbG9uZUNoZWNrZWQgPSAhIWRpdi5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuZGVmYXVsdFZhbHVlO1xufSApKCk7XG5cblxudmFyXG5cdHJrZXlFdmVudCA9IC9ea2V5Lyxcblx0cm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wKXxjbGljay8sXG5cdHJ0eXBlbmFtZXNwYWNlID0gL14oW14uXSopKD86XFwuKC4rKXwpLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4vLyBTZWUgIzEzMzkzIGZvciBtb3JlIGluZm9cbmZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHR9IGNhdGNoICggZXJyICkgeyB9XG59XG5cbmZ1bmN0aW9uIG9uKCBlbGVtLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCBvbmUgKSB7XG5cdHZhciBvcmlnRm4sIHR5cGU7XG5cblx0Ly8gVHlwZXMgY2FuIGJlIGEgbWFwIG9mIHR5cGVzL2hhbmRsZXJzXG5cdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1PYmplY3QsIGRhdGEgKVxuXHRcdFx0ZGF0YSA9IGRhdGEgfHwgc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdG9uKCBlbGVtLCB0eXBlLCBzZWxlY3RvciwgZGF0YSwgdHlwZXNbIHR5cGUgXSwgb25lICk7XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCApIHtcblxuXHRcdC8vICggdHlwZXMsIGZuIClcblx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdGRhdGEgPSBzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICggZm4gPT0gbnVsbCApIHtcblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcblx0XHRcdGZuID0gZGF0YTtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gKCB0eXBlcywgZGF0YSwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdH0gZWxzZSBpZiAoICFmbiApIHtcblx0XHRyZXR1cm4gZWxlbTtcblx0fVxuXG5cdGlmICggb25lID09PSAxICkge1xuXHRcdG9yaWdGbiA9IGZuO1xuXHRcdGZuID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHQvLyBDYW4gdXNlIGFuIGVtcHR5IHNldCwgc2luY2UgZXZlbnQgY29udGFpbnMgdGhlIGluZm9cblx0XHRcdGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcblx0XHRcdHJldHVybiBvcmlnRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH07XG5cblx0XHQvLyBVc2Ugc2FtZSBndWlkIHNvIGNhbGxlciBjYW4gcmVtb3ZlIHVzaW5nIG9yaWdGblxuXHRcdGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAoIG9yaWdGbi5ndWlkID0galF1ZXJ5Lmd1aWQrKyApO1xuXHR9XG5cdHJldHVybiBlbGVtLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIHR5cGVzLCBmbiwgZGF0YSwgc2VsZWN0b3IgKTtcblx0fSApO1xufVxuXG4vKlxuICogSGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFuYWdpbmcgZXZlbnRzIC0tIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuICogUHJvcHMgdG8gRGVhbiBFZHdhcmRzJyBhZGRFdmVudCBsaWJyYXJ5IGZvciBtYW55IG9mIHRoZSBpZGVhcy5cbiAqL1xualF1ZXJ5LmV2ZW50ID0ge1xuXG5cdGdsb2JhbDoge30sXG5cblx0YWRkOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIGRhdGEsIHNlbGVjdG9yICkge1xuXG5cdFx0dmFyIGhhbmRsZU9iakluLCBldmVudEhhbmRsZSwgdG1wLFxuXHRcdFx0ZXZlbnRzLCB0LCBoYW5kbGVPYmosXG5cdFx0XHRzcGVjaWFsLCBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG5cdFx0XHRlbGVtRGF0YSA9IGRhdGFQcml2LmdldCggZWxlbSApO1xuXG5cdFx0Ly8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcblx0XHRpZiAoICFlbGVtRGF0YSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcblx0XHRpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcblx0XHRcdGhhbmRsZU9iakluID0gaGFuZGxlcjtcblx0XHRcdGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xuXHRcdFx0c2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3Rvcjtcblx0XHR9XG5cblx0XHQvLyBFbnN1cmUgdGhhdCBpbnZhbGlkIHNlbGVjdG9ycyB0aHJvdyBleGNlcHRpb25zIGF0IGF0dGFjaCB0aW1lXG5cdFx0Ly8gRXZhbHVhdGUgYWdhaW5zdCBkb2N1bWVudEVsZW1lbnQgaW4gY2FzZSBlbGVtIGlzIGEgbm9uLWVsZW1lbnQgbm9kZSAoZS5nLiwgZG9jdW1lbnQpXG5cdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZG9jdW1lbnRFbGVtZW50LCBzZWxlY3RvciApO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBoYW5kbGVyIGhhcyBhIHVuaXF1ZSBJRCwgdXNlZCB0byBmaW5kL3JlbW92ZSBpdCBsYXRlclxuXHRcdGlmICggIWhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdGhhbmRsZXIuZ3VpZCA9IGpRdWVyeS5ndWlkKys7XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdCB0aGUgZWxlbWVudCdzIGV2ZW50IHN0cnVjdHVyZSBhbmQgbWFpbiBoYW5kbGVyLCBpZiB0aGlzIGlzIHRoZSBmaXJzdFxuXHRcdGlmICggISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG5cdFx0XHRldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKCAhKCBldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSApICkge1xuXHRcdFx0ZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblxuXHRcdFx0XHQvLyBEaXNjYXJkIHRoZSBzZWNvbmQgZXZlbnQgb2YgYSBqUXVlcnkuZXZlbnQudHJpZ2dlcigpIGFuZFxuXHRcdFx0XHQvLyB3aGVuIGFuIGV2ZW50IGlzIGNhbGxlZCBhZnRlciBhIHBhZ2UgaGFzIHVubG9hZGVkXG5cdFx0XHRcdHJldHVybiB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBlbGVtLCBhcmd1bWVudHMgKSA6IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblx0XHR0ID0gdHlwZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggdC0tICkge1xuXHRcdFx0dG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bXBbIDIgXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG5cdFx0XHQvLyBUaGVyZSAqbXVzdCogYmUgYSB0eXBlLCBubyBhdHRhY2hpbmcgbmFtZXNwYWNlLW9ubHkgaGFuZGxlcnNcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBldmVudCBjaGFuZ2VzIGl0cyB0eXBlLCB1c2UgdGhlIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBjaGFuZ2VkIHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBJZiBzZWxlY3RvciBkZWZpbmVkLCBkZXRlcm1pbmUgc3BlY2lhbCBldmVudCBhcGkgdHlwZSwgb3RoZXJ3aXNlIGdpdmVuIHR5cGVcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblxuXHRcdFx0Ly8gVXBkYXRlIHNwZWNpYWwgYmFzZWQgb24gbmV3bHkgcmVzZXQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIGhhbmRsZU9iaiBpcyBwYXNzZWQgdG8gYWxsIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRoYW5kbGVPYmogPSBqUXVlcnkuZXh0ZW5kKCB7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdG9yaWdUeXBlOiBvcmlnVHlwZSxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHRcdFx0Z3VpZDogaGFuZGxlci5ndWlkLFxuXHRcdFx0XHRzZWxlY3Rvcjogc2VsZWN0b3IsXG5cdFx0XHRcdG5lZWRzQ29udGV4dDogc2VsZWN0b3IgJiYgalF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICksXG5cdFx0XHRcdG5hbWVzcGFjZTogbmFtZXNwYWNlcy5qb2luKCBcIi5cIiApXG5cdFx0XHR9LCBoYW5kbGVPYmpJbiApO1xuXG5cdFx0XHQvLyBJbml0IHRoZSBldmVudCBoYW5kbGVyIHF1ZXVlIGlmIHdlJ3JlIHRoZSBmaXJzdFxuXHRcdFx0aWYgKCAhKCBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdICkgKSB7XG5cdFx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcblx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cblx0XHRcdFx0Ly8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmICggIXNwZWNpYWwuc2V0dXAgfHxcblx0XHRcdFx0XHRzcGVjaWFsLnNldHVwLmNhbGwoIGVsZW0sIGRhdGEsIG5hbWVzcGFjZXMsIGV2ZW50SGFuZGxlICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0aWYgKCBlbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGV2ZW50SGFuZGxlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggc3BlY2lhbC5hZGQgKSB7XG5cdFx0XHRcdHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG5cdFx0XHRcdGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cblx0XHRcdGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG5cdFx0fVxuXG5cdH0sXG5cblx0Ly8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG5cdHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG5cblx0XHR2YXIgaiwgb3JpZ0NvdW50LCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuaGFzRGF0YSggZWxlbSApICYmIGRhdGFQcml2LmdldCggZWxlbSApO1xuXG5cdFx0aWYgKCAhZWxlbURhdGEgfHwgISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gT25jZSBmb3IgZWFjaCB0eXBlLm5hbWVzcGFjZSBpbiB0eXBlczsgdHlwZSBtYXkgYmUgb21pdHRlZFxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblx0XHR0ID0gdHlwZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggdC0tICkge1xuXHRcdFx0dG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bXBbIDIgXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG5cdFx0XHQvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gfHwgW107XG5cdFx0XHR0bXAgPSB0bXBbIDIgXSAmJlxuXHRcdFx0XHRuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKCBcIlxcXFwuKD86LipcXFxcLnwpXCIgKSArIFwiKFxcXFwufCQpXCIgKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIG1hdGNoaW5nIGV2ZW50c1xuXHRcdFx0b3JpZ0NvdW50ID0gaiA9IGhhbmRsZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaiBdO1xuXG5cdFx0XHRcdGlmICggKCBtYXBwZWRUeXBlcyB8fCBvcmlnVHlwZSA9PT0gaGFuZGxlT2JqLm9yaWdUeXBlICkgJiZcblx0XHRcdFx0XHQoICFoYW5kbGVyIHx8IGhhbmRsZXIuZ3VpZCA9PT0gaGFuZGxlT2JqLmd1aWQgKSAmJlxuXHRcdFx0XHRcdCggIXRtcCB8fCB0bXAudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcblx0XHRcdFx0XHQoICFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gaGFuZGxlT2JqLnNlbGVjdG9yIHx8XG5cdFx0XHRcdFx0XHRzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuXHRcdFx0Ly8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG5cdFx0XHRpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC50ZWFyZG93bi5jYWxsKCBlbGVtLCBuYW1lc3BhY2VzLCBlbGVtRGF0YS5oYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGVsZW1EYXRhLmhhbmRsZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVsZXRlIGV2ZW50c1sgdHlwZSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBkYXRhIGFuZCB0aGUgZXhwYW5kbyBpZiBpdCdzIG5vIGxvbmdlciB1c2VkXG5cdFx0aWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XG5cdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFwiaGFuZGxlIGV2ZW50c1wiICk7XG5cdFx0fVxuXHR9LFxuXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiggbmF0aXZlRXZlbnQgKSB7XG5cblx0XHQvLyBNYWtlIGEgd3JpdGFibGUgalF1ZXJ5LkV2ZW50IGZyb20gdGhlIG5hdGl2ZSBldmVudCBvYmplY3Rcblx0XHR2YXIgZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBuYXRpdmVFdmVudCApO1xuXG5cdFx0dmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLCBoYW5kbGVyUXVldWUsXG5cdFx0XHRhcmdzID0gbmV3IEFycmF5KCBhcmd1bWVudHMubGVuZ3RoICksXG5cdFx0XHRoYW5kbGVycyA9ICggZGF0YVByaXYuZ2V0KCB0aGlzLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdIHx8IFtdLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge307XG5cblx0XHQvLyBVc2UgdGhlIGZpeC1lZCBqUXVlcnkuRXZlbnQgcmF0aGVyIHRoYW4gdGhlIChyZWFkLW9ubHkpIG5hdGl2ZSBldmVudFxuXHRcdGFyZ3NbIDAgXSA9IGV2ZW50O1xuXG5cdFx0Zm9yICggaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRhcmdzWyBpIF0gPSBhcmd1bWVudHNbIGkgXTtcblx0XHR9XG5cblx0XHRldmVudC5kZWxlZ2F0ZVRhcmdldCA9IHRoaXM7XG5cblx0XHQvLyBDYWxsIHRoZSBwcmVEaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGUsIGFuZCBsZXQgaXQgYmFpbCBpZiBkZXNpcmVkXG5cdFx0aWYgKCBzcGVjaWFsLnByZURpc3BhdGNoICYmIHNwZWNpYWwucHJlRGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGhhbmRsZXJzXG5cdFx0aGFuZGxlclF1ZXVlID0galF1ZXJ5LmV2ZW50LmhhbmRsZXJzLmNhbGwoIHRoaXMsIGV2ZW50LCBoYW5kbGVycyApO1xuXG5cdFx0Ly8gUnVuIGRlbGVnYXRlcyBmaXJzdDsgdGhleSBtYXkgd2FudCB0byBzdG9wIHByb3BhZ2F0aW9uIGJlbmVhdGggdXNcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggbWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0gKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBtYXRjaGVkLmVsZW07XG5cblx0XHRcdGogPSAwO1xuXHRcdFx0d2hpbGUgKCAoIGhhbmRsZU9iaiA9IG1hdGNoZWQuaGFuZGxlcnNbIGorKyBdICkgJiZcblx0XHRcdFx0IWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cblx0XHRcdFx0Ly8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvciAyKSBoYXZlIG5hbWVzcGFjZShzKVxuXHRcdFx0XHQvLyBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cblx0XHRcdFx0aWYgKCAhZXZlbnQucm5hbWVzcGFjZSB8fCBldmVudC5ybmFtZXNwYWNlLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApIHtcblxuXHRcdFx0XHRcdGV2ZW50LmhhbmRsZU9iaiA9IGhhbmRsZU9iajtcblx0XHRcdFx0XHRldmVudC5kYXRhID0gaGFuZGxlT2JqLmRhdGE7XG5cblx0XHRcdFx0XHRyZXQgPSAoICggalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9ICkuaGFuZGxlIHx8XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlciApLmFwcGx5KCBtYXRjaGVkLmVsZW0sIGFyZ3MgKTtcblxuXHRcdFx0XHRcdGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZXZlbnQucmVzdWx0ID0gcmV0ICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcblx0XHR2YXIgaSwgaGFuZGxlT2JqLCBzZWwsIG1hdGNoZWRIYW5kbGVycywgbWF0Y2hlZFNlbGVjdG9ycyxcblx0XHRcdGhhbmRsZXJRdWV1ZSA9IFtdLFxuXHRcdFx0ZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXG5cdFx0XHRjdXIgPSBldmVudC50YXJnZXQ7XG5cblx0XHQvLyBGaW5kIGRlbGVnYXRlIGhhbmRsZXJzXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmXG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OVxuXHRcdFx0Ly8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKHRyYWMtMTMxODApXG5cdFx0XHRjdXIubm9kZVR5cGUgJiZcblxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTQyXG5cdFx0XHQvLyBTdXBwcmVzcyBzcGVjLXZpb2xhdGluZyBjbGlja3MgaW5kaWNhdGluZyBhIG5vbi1wcmltYXJ5IHBvaW50ZXIgYnV0dG9uICh0cmFjLTM4NjEpXG5cdFx0XHQvLyBodHRwczovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC10eXBlLWNsaWNrXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSBvbmx5XG5cdFx0XHQvLyAuLi5idXQgbm90IGFycm93IGtleSBcImNsaWNrc1wiIG9mIHJhZGlvIGlucHV0cywgd2hpY2ggY2FuIGhhdmUgYGJ1dHRvbmAgLTEgKGdoLTIzNDMpXG5cdFx0XHQhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgZXZlbnQuYnV0dG9uID49IDEgKSApIHtcblxuXHRcdFx0Zm9yICggOyBjdXIgIT09IHRoaXM7IGN1ciA9IGN1ci5wYXJlbnROb2RlIHx8IHRoaXMgKSB7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgY2hlY2sgbm9uLWVsZW1lbnRzICgjMTMyMDgpXG5cdFx0XHRcdC8vIERvbid0IHByb2Nlc3MgY2xpY2tzIG9uIGRpc2FibGVkIGVsZW1lbnRzICgjNjkxMSwgIzgxNjUsICMxMTM4MiwgIzExNzY0KVxuXHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSAmJiAhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgY3VyLmRpc2FibGVkID09PSB0cnVlICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlZEhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0bWF0Y2hlZFNlbGVjdG9ycyA9IHt9O1xuXHRcdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgZGVsZWdhdGVDb3VudDsgaSsrICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGkgXTtcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgY29uZmxpY3Qgd2l0aCBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKCMxMzIwMylcblx0XHRcdFx0XHRcdHNlbCA9IGhhbmRsZU9iai5zZWxlY3RvciArIFwiIFwiO1xuXG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCBzZWwsIHRoaXMgKS5pbmRleCggY3VyICkgPiAtMSA6XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQoIHNlbCwgdGhpcywgbnVsbCwgWyBjdXIgXSApLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRIYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkSGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogbWF0Y2hlZEhhbmRsZXJzIH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXG5cdFx0Y3VyID0gdGhpcztcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlclF1ZXVlO1xuXHR9LFxuXG5cdGFkZFByb3A6IGZ1bmN0aW9uKCBuYW1lLCBob29rICkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggalF1ZXJ5LkV2ZW50LnByb3RvdHlwZSwgbmFtZSwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblxuXHRcdFx0Z2V0OiBqUXVlcnkuaXNGdW5jdGlvbiggaG9vayApID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBob29rKCB0aGlzLm9yaWdpbmFsRXZlbnQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gOlxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFsgbmFtZSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgbmFtZSwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGZpeDogZnVuY3Rpb24oIG9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0cmV0dXJuIG9yaWdpbmFsRXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gP1xuXHRcdFx0b3JpZ2luYWxFdmVudCA6XG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG5cdH0sXG5cblx0c3BlY2lhbDoge1xuXHRcdGxvYWQ6IHtcblxuXHRcdFx0Ly8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuXHRcdFx0bm9CdWJibGU6IHRydWVcblx0XHR9LFxuXHRcdGZvY3VzOiB7XG5cblx0XHRcdC8vIEZpcmUgbmF0aXZlIGV2ZW50IGlmIHBvc3NpYmxlIHNvIGJsdXIvZm9jdXMgc2VxdWVuY2UgaXMgY29ycmVjdFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyAhPT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmZvY3VzICkge1xuXHRcdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNpblwiXG5cdFx0fSxcblx0XHRibHVyOiB7XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzID09PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuYmx1ciApIHtcblx0XHRcdFx0XHR0aGlzLmJsdXIoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNvdXRcIlxuXHRcdH0sXG5cdFx0Y2xpY2s6IHtcblxuXHRcdFx0Ly8gRm9yIGNoZWNrYm94LCBmaXJlIG5hdGl2ZSBldmVudCBzbyBjaGVja2VkIHN0YXRlIHdpbGwgYmUgcmlnaHRcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgJiYgbm9kZU5hbWUoIHRoaXMsIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuY2xpY2soKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBkb24ndCBmaXJlIG5hdGl2ZSAuY2xpY2soKSBvbiBsaW5rc1xuXHRcdFx0X2RlZmF1bHQ6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0cmV0dXJuIG5vZGVOYW1lKCBldmVudC50YXJnZXQsIFwiYVwiICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGJlZm9yZXVubG9hZDoge1xuXHRcdFx0cG9zdERpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCAyMCtcblx0XHRcdFx0Ly8gRmlyZWZveCBkb2Vzbid0IGFsZXJ0IGlmIHRoZSByZXR1cm5WYWx1ZSBmaWVsZCBpcyBub3Qgc2V0LlxuXHRcdFx0XHRpZiAoIGV2ZW50LnJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0ZXZlbnQub3JpZ2luYWxFdmVudC5yZXR1cm5WYWx1ZSA9IGV2ZW50LnJlc3VsdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcblxuXHQvLyBUaGlzIFwiaWZcIiBpcyBuZWVkZWQgZm9yIHBsYWluIG9iamVjdHNcblx0aWYgKCBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0ZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlLCBoYW5kbGUgKTtcblx0fVxufTtcblxualF1ZXJ5LkV2ZW50ID0gZnVuY3Rpb24oIHNyYywgcHJvcHMgKSB7XG5cblx0Ly8gQWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IHRoZSAnbmV3JyBrZXl3b3JkXG5cdGlmICggISggdGhpcyBpbnN0YW5jZW9mIGpRdWVyeS5FdmVudCApICkge1xuXHRcdHJldHVybiBuZXcgalF1ZXJ5LkV2ZW50KCBzcmMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBFdmVudCBvYmplY3Rcblx0aWYgKCBzcmMgJiYgc3JjLnR5cGUgKSB7XG5cdFx0dGhpcy5vcmlnaW5hbEV2ZW50ID0gc3JjO1xuXHRcdHRoaXMudHlwZSA9IHNyYy50eXBlO1xuXG5cdFx0Ly8gRXZlbnRzIGJ1YmJsaW5nIHVwIHRoZSBkb2N1bWVudCBtYXkgaGF2ZSBiZWVuIG1hcmtlZCBhcyBwcmV2ZW50ZWRcblx0XHQvLyBieSBhIGhhbmRsZXIgbG93ZXIgZG93biB0aGUgdHJlZTsgcmVmbGVjdCB0aGUgY29ycmVjdCB2YWx1ZS5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHNyYy5kZWZhdWx0UHJldmVudGVkIHx8XG5cdFx0XHRcdHNyYy5kZWZhdWx0UHJldmVudGVkID09PSB1bmRlZmluZWQgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9Mi4zIG9ubHlcblx0XHRcdFx0c3JjLnJldHVyblZhbHVlID09PSBmYWxzZSA/XG5cdFx0XHRyZXR1cm5UcnVlIDpcblx0XHRcdHJldHVybkZhbHNlO1xuXG5cdFx0Ly8gQ3JlYXRlIHRhcmdldCBwcm9wZXJ0aWVzXG5cdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDw9NiAtIDcgb25seVxuXHRcdC8vIFRhcmdldCBzaG91bGQgbm90IGJlIGEgdGV4dCBub2RlICgjNTA0LCAjMTMxNDMpXG5cdFx0dGhpcy50YXJnZXQgPSAoIHNyYy50YXJnZXQgJiYgc3JjLnRhcmdldC5ub2RlVHlwZSA9PT0gMyApID9cblx0XHRcdHNyYy50YXJnZXQucGFyZW50Tm9kZSA6XG5cdFx0XHRzcmMudGFyZ2V0O1xuXG5cdFx0dGhpcy5jdXJyZW50VGFyZ2V0ID0gc3JjLmN1cnJlbnRUYXJnZXQ7XG5cdFx0dGhpcy5yZWxhdGVkVGFyZ2V0ID0gc3JjLnJlbGF0ZWRUYXJnZXQ7XG5cblx0Ly8gRXZlbnQgdHlwZVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMudHlwZSA9IHNyYztcblx0fVxuXG5cdC8vIFB1dCBleHBsaWNpdGx5IHByb3ZpZGVkIHByb3BlcnRpZXMgb250byB0aGUgZXZlbnQgb2JqZWN0XG5cdGlmICggcHJvcHMgKSB7XG5cdFx0alF1ZXJ5LmV4dGVuZCggdGhpcywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIENyZWF0ZSBhIHRpbWVzdGFtcCBpZiBpbmNvbWluZyBldmVudCBkb2Vzbid0IGhhdmUgb25lXG5cdHRoaXMudGltZVN0YW1wID0gc3JjICYmIHNyYy50aW1lU3RhbXAgfHwgalF1ZXJ5Lm5vdygpO1xuXG5cdC8vIE1hcmsgaXQgYXMgZml4ZWRcblx0dGhpc1sgalF1ZXJ5LmV4cGFuZG8gXSA9IHRydWU7XG59O1xuXG4vLyBqUXVlcnkuRXZlbnQgaXMgYmFzZWQgb24gRE9NMyBFdmVudHMgYXMgc3BlY2lmaWVkIGJ5IHRoZSBFQ01BU2NyaXB0IExhbmd1YWdlIEJpbmRpbmdcbi8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi8yMDAzL1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDAzMDMzMS9lY21hLXNjcmlwdC1iaW5kaW5nLmh0bWxcbmpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBqUXVlcnkuRXZlbnQsXG5cdGlzRGVmYXVsdFByZXZlbnRlZDogcmV0dXJuRmFsc2UsXG5cdGlzUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXHRpc1NpbXVsYXRlZDogZmFsc2UsXG5cblx0cHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fSxcblx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufTtcblxuLy8gSW5jbHVkZXMgYWxsIGNvbW1vbiBldmVudCBwcm9wcyBpbmNsdWRpbmcgS2V5RXZlbnQgYW5kIE1vdXNlRXZlbnQgc3BlY2lmaWMgcHJvcHNcbmpRdWVyeS5lYWNoKCB7XG5cdGFsdEtleTogdHJ1ZSxcblx0YnViYmxlczogdHJ1ZSxcblx0Y2FuY2VsYWJsZTogdHJ1ZSxcblx0Y2hhbmdlZFRvdWNoZXM6IHRydWUsXG5cdGN0cmxLZXk6IHRydWUsXG5cdGRldGFpbDogdHJ1ZSxcblx0ZXZlbnRQaGFzZTogdHJ1ZSxcblx0bWV0YUtleTogdHJ1ZSxcblx0cGFnZVg6IHRydWUsXG5cdHBhZ2VZOiB0cnVlLFxuXHRzaGlmdEtleTogdHJ1ZSxcblx0dmlldzogdHJ1ZSxcblx0XCJjaGFyXCI6IHRydWUsXG5cdGNoYXJDb2RlOiB0cnVlLFxuXHRrZXk6IHRydWUsXG5cdGtleUNvZGU6IHRydWUsXG5cdGJ1dHRvbjogdHJ1ZSxcblx0YnV0dG9uczogdHJ1ZSxcblx0Y2xpZW50WDogdHJ1ZSxcblx0Y2xpZW50WTogdHJ1ZSxcblx0b2Zmc2V0WDogdHJ1ZSxcblx0b2Zmc2V0WTogdHJ1ZSxcblx0cG9pbnRlcklkOiB0cnVlLFxuXHRwb2ludGVyVHlwZTogdHJ1ZSxcblx0c2NyZWVuWDogdHJ1ZSxcblx0c2NyZWVuWTogdHJ1ZSxcblx0dGFyZ2V0VG91Y2hlczogdHJ1ZSxcblx0dG9FbGVtZW50OiB0cnVlLFxuXHR0b3VjaGVzOiB0cnVlLFxuXG5cdHdoaWNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0dmFyIGJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjtcblxuXHRcdC8vIEFkZCB3aGljaCBmb3Iga2V5IGV2ZW50c1xuXHRcdGlmICggZXZlbnQud2hpY2ggPT0gbnVsbCAmJiBya2V5RXZlbnQudGVzdCggZXZlbnQudHlwZSApICkge1xuXHRcdFx0cmV0dXJuIGV2ZW50LmNoYXJDb2RlICE9IG51bGwgPyBldmVudC5jaGFyQ29kZSA6IGV2ZW50LmtleUNvZGU7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIHdoaWNoIGZvciBjbGljazogMSA9PT0gbGVmdDsgMiA9PT0gbWlkZGxlOyAzID09PSByaWdodFxuXHRcdGlmICggIWV2ZW50LndoaWNoICYmIGJ1dHRvbiAhPT0gdW5kZWZpbmVkICYmIHJtb3VzZUV2ZW50LnRlc3QoIGV2ZW50LnR5cGUgKSApIHtcblx0XHRcdGlmICggYnV0dG9uICYgMSApIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggYnV0dG9uICYgMiApIHtcblx0XHRcdFx0cmV0dXJuIDM7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggYnV0dG9uICYgNCApIHtcblx0XHRcdFx0cmV0dXJuIDI7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC53aGljaDtcblx0fVxufSwgalF1ZXJ5LmV2ZW50LmFkZFByb3AgKTtcblxuLy8gQ3JlYXRlIG1vdXNlZW50ZXIvbGVhdmUgZXZlbnRzIHVzaW5nIG1vdXNlb3Zlci9vdXQgYW5kIGV2ZW50LXRpbWUgY2hlY2tzXG4vLyBzbyB0aGF0IGV2ZW50IGRlbGVnYXRpb24gd29ya3MgaW4galF1ZXJ5LlxuLy8gRG8gdGhlIHNhbWUgZm9yIHBvaW50ZXJlbnRlci9wb2ludGVybGVhdmUgYW5kIHBvaW50ZXJvdmVyL3BvaW50ZXJvdXRcbi8vXG4vLyBTdXBwb3J0OiBTYWZhcmkgNyBvbmx5XG4vLyBTYWZhcmkgc2VuZHMgbW91c2VlbnRlciB0b28gb2Z0ZW47IHNlZTpcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ3MDI1OFxuLy8gZm9yIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgYnVnIChpdCBleGlzdGVkIGluIG9sZGVyIENocm9tZSB2ZXJzaW9ucyBhcyB3ZWxsKS5cbmpRdWVyeS5lYWNoKCB7XG5cdG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXG5cdG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIixcblx0cG9pbnRlcmVudGVyOiBcInBvaW50ZXJvdmVyXCIsXG5cdHBvaW50ZXJsZWF2ZTogXCJwb2ludGVyb3V0XCJcbn0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBvcmlnIF0gPSB7XG5cdFx0ZGVsZWdhdGVUeXBlOiBmaXgsXG5cdFx0YmluZFR5cGU6IGZpeCxcblxuXHRcdGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0dmFyIHJldCxcblx0XHRcdFx0dGFyZ2V0ID0gdGhpcyxcblx0XHRcdFx0cmVsYXRlZCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXG5cdFx0XHRcdGhhbmRsZU9iaiA9IGV2ZW50LmhhbmRsZU9iajtcblxuXHRcdFx0Ly8gRm9yIG1vdXNlZW50ZXIvbGVhdmUgY2FsbCB0aGUgaGFuZGxlciBpZiByZWxhdGVkIGlzIG91dHNpZGUgdGhlIHRhcmdldC5cblx0XHRcdC8vIE5COiBObyByZWxhdGVkVGFyZ2V0IGlmIHRoZSBtb3VzZSBsZWZ0L2VudGVyZWQgdGhlIGJyb3dzZXIgd2luZG93XG5cdFx0XHRpZiAoICFyZWxhdGVkIHx8ICggcmVsYXRlZCAhPT0gdGFyZ2V0ICYmICFqUXVlcnkuY29udGFpbnMoIHRhcmdldCwgcmVsYXRlZCApICkgKSB7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBoYW5kbGVPYmoub3JpZ1R5cGU7XG5cdFx0XHRcdHJldCA9IGhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGZpeDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHR9O1xufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0b246IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBvbiggdGhpcywgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuXHR9LFxuXHRvbmU6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBvbiggdGhpcywgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgMSApO1xuXHR9LFxuXHRvZmY6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGZuICkge1xuXHRcdHZhciBoYW5kbGVPYmosIHR5cGU7XG5cdFx0aWYgKCB0eXBlcyAmJiB0eXBlcy5wcmV2ZW50RGVmYXVsdCAmJiB0eXBlcy5oYW5kbGVPYmogKSB7XG5cblx0XHRcdC8vICggZXZlbnQgKSAgZGlzcGF0Y2hlZCBqUXVlcnkuRXZlbnRcblx0XHRcdGhhbmRsZU9iaiA9IHR5cGVzLmhhbmRsZU9iajtcblx0XHRcdGpRdWVyeSggdHlwZXMuZGVsZWdhdGVUYXJnZXQgKS5vZmYoXG5cdFx0XHRcdGhhbmRsZU9iai5uYW1lc3BhY2UgP1xuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSArIFwiLlwiICsgaGFuZGxlT2JqLm5hbWVzcGFjZSA6XG5cdFx0XHRcdFx0aGFuZGxlT2JqLm9yaWdUeXBlLFxuXHRcdFx0XHRoYW5kbGVPYmouc2VsZWN0b3IsXG5cdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLW9iamVjdCBbLCBzZWxlY3Rvcl0gKVxuXHRcdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdFx0dGhpcy5vZmYoIHR5cGUsIHNlbGVjdG9yLCB0eXBlc1sgdHlwZSBdICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0aWYgKCBzZWxlY3RvciA9PT0gZmFsc2UgfHwgdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMgWywgZm5dIClcblx0XHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIHRoaXMsIHR5cGVzLCBmbiwgc2VsZWN0b3IgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuXG52YXJcblxuXHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5cblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy8zMjI5XG5cdHJ4aHRtbFRhZyA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFthLXpdW15cXC9cXDA+XFx4MjBcXHRcXHJcXG5cXGZdKilbXj5dKilcXC8+L2dpLFxuXG5cdC8qIGVzbGludC1lbmFibGUgKi9cblxuXHQvLyBTdXBwb3J0OiBJRSA8PTEwIC0gMTEsIEVkZ2UgMTIgLSAxMyBvbmx5XG5cdC8vIEluIElFL0VkZ2UgdXNpbmcgcmVnZXggZ3JvdXBzIGhlcmUgY2F1c2VzIHNldmVyZSBzbG93ZG93bnMuXG5cdC8vIFNlZSBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzE3MzY1MTIvXG5cdHJub0lubmVyaHRtbCA9IC88c2NyaXB0fDxzdHlsZXw8bGluay9pLFxuXG5cdC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxuXHRyY2hlY2tlZCA9IC9jaGVja2VkXFxzKig/OltePV18PVxccyouY2hlY2tlZC4pL2ksXG5cdHJzY3JpcHRUeXBlTWFza2VkID0gL150cnVlXFwvKC4qKS8sXG5cdHJjbGVhblNjcmlwdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZztcblxuLy8gUHJlZmVyIGEgdGJvZHkgb3ZlciBpdHMgcGFyZW50IHRhYmxlIGZvciBjb250YWluaW5nIG5ldyByb3dzXG5mdW5jdGlvbiBtYW5pcHVsYXRpb25UYXJnZXQoIGVsZW0sIGNvbnRlbnQgKSB7XG5cdGlmICggbm9kZU5hbWUoIGVsZW0sIFwidGFibGVcIiApICYmXG5cdFx0bm9kZU5hbWUoIGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiICkgKSB7XG5cblx0XHRyZXR1cm4galF1ZXJ5KCBcIj50Ym9keVwiLCBlbGVtIClbIDAgXSB8fCBlbGVtO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbi8vIFJlcGxhY2UvcmVzdG9yZSB0aGUgdHlwZSBhdHRyaWJ1dGUgb2Ygc2NyaXB0IGVsZW1lbnRzIGZvciBzYWZlIERPTSBtYW5pcHVsYXRpb25cbmZ1bmN0aW9uIGRpc2FibGVTY3JpcHQoIGVsZW0gKSB7XG5cdGVsZW0udHlwZSA9ICggZWxlbS5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICkgIT09IG51bGwgKSArIFwiL1wiICsgZWxlbS50eXBlO1xuXHRyZXR1cm4gZWxlbTtcbn1cbmZ1bmN0aW9uIHJlc3RvcmVTY3JpcHQoIGVsZW0gKSB7XG5cdHZhciBtYXRjaCA9IHJzY3JpcHRUeXBlTWFza2VkLmV4ZWMoIGVsZW0udHlwZSApO1xuXG5cdGlmICggbWF0Y2ggKSB7XG5cdFx0ZWxlbS50eXBlID0gbWF0Y2hbIDEgXTtcblx0fSBlbHNlIHtcblx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggXCJ0eXBlXCIgKTtcblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5mdW5jdGlvbiBjbG9uZUNvcHlFdmVudCggc3JjLCBkZXN0ICkge1xuXHR2YXIgaSwgbCwgdHlwZSwgcGRhdGFPbGQsIHBkYXRhQ3VyLCB1ZGF0YU9sZCwgdWRhdGFDdXIsIGV2ZW50cztcblxuXHRpZiAoIGRlc3Qubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gMS4gQ29weSBwcml2YXRlIGRhdGE6IGV2ZW50cywgaGFuZGxlcnMsIGV0Yy5cblx0aWYgKCBkYXRhUHJpdi5oYXNEYXRhKCBzcmMgKSApIHtcblx0XHRwZGF0YU9sZCA9IGRhdGFQcml2LmFjY2Vzcyggc3JjICk7XG5cdFx0cGRhdGFDdXIgPSBkYXRhUHJpdi5zZXQoIGRlc3QsIHBkYXRhT2xkICk7XG5cdFx0ZXZlbnRzID0gcGRhdGFPbGQuZXZlbnRzO1xuXG5cdFx0aWYgKCBldmVudHMgKSB7XG5cdFx0XHRkZWxldGUgcGRhdGFDdXIuaGFuZGxlO1xuXHRcdFx0cGRhdGFDdXIuZXZlbnRzID0ge307XG5cblx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IGV2ZW50c1sgdHlwZSBdLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCBkZXN0LCB0eXBlLCBldmVudHNbIHR5cGUgXVsgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyAyLiBDb3B5IHVzZXIgZGF0YVxuXHRpZiAoIGRhdGFVc2VyLmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHVkYXRhT2xkID0gZGF0YVVzZXIuYWNjZXNzKCBzcmMgKTtcblx0XHR1ZGF0YUN1ciA9IGpRdWVyeS5leHRlbmQoIHt9LCB1ZGF0YU9sZCApO1xuXG5cdFx0ZGF0YVVzZXIuc2V0KCBkZXN0LCB1ZGF0YUN1ciApO1xuXHR9XG59XG5cbi8vIEZpeCBJRSBidWdzLCBzZWUgc3VwcG9ydCB0ZXN0c1xuZnVuY3Rpb24gZml4SW5wdXQoIHNyYywgZGVzdCApIHtcblx0dmFyIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdC8vIEZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3ggb3IgcmFkaW8gYnV0dG9uLlxuXHRpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgcmNoZWNrYWJsZVR5cGUudGVzdCggc3JjLnR5cGUgKSApIHtcblx0XHRkZXN0LmNoZWNrZWQgPSBzcmMuY2hlY2tlZDtcblxuXHQvLyBGYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZCBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xuXHR9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG5cdFx0ZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRvbU1hbmlwKCBjb2xsZWN0aW9uLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApIHtcblxuXHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdGFyZ3MgPSBjb25jYXQuYXBwbHkoIFtdLCBhcmdzICk7XG5cblx0dmFyIGZyYWdtZW50LCBmaXJzdCwgc2NyaXB0cywgaGFzU2NyaXB0cywgbm9kZSwgZG9jLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBjb2xsZWN0aW9uLmxlbmd0aCxcblx0XHRpTm9DbG9uZSA9IGwgLSAxLFxuXHRcdHZhbHVlID0gYXJnc1sgMCBdLFxuXHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0aWYgKCBpc0Z1bmN0aW9uIHx8XG5cdFx0XHQoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQhc3VwcG9ydC5jaGVja0Nsb25lICYmIHJjaGVja2VkLnRlc3QoIHZhbHVlICkgKSApIHtcblx0XHRyZXR1cm4gY29sbGVjdGlvbi5lYWNoKCBmdW5jdGlvbiggaW5kZXggKSB7XG5cdFx0XHR2YXIgc2VsZiA9IGNvbGxlY3Rpb24uZXEoIGluZGV4ICk7XG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdGFyZ3NbIDAgXSA9IHZhbHVlLmNhbGwoIHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSApO1xuXHRcdFx0fVxuXHRcdFx0ZG9tTWFuaXAoIHNlbGYsIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICk7XG5cdFx0fSApO1xuXHR9XG5cblx0aWYgKCBsICkge1xuXHRcdGZyYWdtZW50ID0gYnVpbGRGcmFnbWVudCggYXJncywgY29sbGVjdGlvblsgMCBdLm93bmVyRG9jdW1lbnQsIGZhbHNlLCBjb2xsZWN0aW9uLCBpZ25vcmVkICk7XG5cdFx0Zmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0aWYgKCBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdGZyYWdtZW50ID0gZmlyc3Q7XG5cdFx0fVxuXG5cdFx0Ly8gUmVxdWlyZSBlaXRoZXIgbmV3IGNvbnRlbnQgb3IgYW4gaW50ZXJlc3QgaW4gaWdub3JlZCBlbGVtZW50cyB0byBpbnZva2UgdGhlIGNhbGxiYWNrXG5cdFx0aWYgKCBmaXJzdCB8fCBpZ25vcmVkICkge1xuXHRcdFx0c2NyaXB0cyA9IGpRdWVyeS5tYXAoIGdldEFsbCggZnJhZ21lbnQsIFwic2NyaXB0XCIgKSwgZGlzYWJsZVNjcmlwdCApO1xuXHRcdFx0aGFzU2NyaXB0cyA9IHNjcmlwdHMubGVuZ3RoO1xuXG5cdFx0XHQvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtXG5cdFx0XHQvLyBpbnN0ZWFkIG9mIHRoZSBmaXJzdCBiZWNhdXNlIGl0IGNhbiBlbmQgdXBcblx0XHRcdC8vIGJlaW5nIGVtcHRpZWQgaW5jb3JyZWN0bHkgaW4gY2VydGFpbiBzaXR1YXRpb25zICgjODA3MCkuXG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdG5vZGUgPSBmcmFnbWVudDtcblxuXHRcdFx0XHRpZiAoIGkgIT09IGlOb0Nsb25lICkge1xuXHRcdFx0XHRcdG5vZGUgPSBqUXVlcnkuY2xvbmUoIG5vZGUsIHRydWUsIHRydWUgKTtcblxuXHRcdFx0XHRcdC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cblx0XHRcdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBzY3JpcHRzLCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwoIGNvbGxlY3Rpb25bIGkgXSwgbm9kZSwgaSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cdFx0XHRcdGRvYyA9IHNjcmlwdHNbIHNjcmlwdHMubGVuZ3RoIC0gMSBdLm93bmVyRG9jdW1lbnQ7XG5cblx0XHRcdFx0Ly8gUmVlbmFibGUgc2NyaXB0c1xuXHRcdFx0XHRqUXVlcnkubWFwKCBzY3JpcHRzLCByZXN0b3JlU2NyaXB0ICk7XG5cblx0XHRcdFx0Ly8gRXZhbHVhdGUgZXhlY3V0YWJsZSBzY3JpcHRzIG9uIGZpcnN0IGRvY3VtZW50IGluc2VydGlvblxuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcblx0XHRcdFx0XHRub2RlID0gc2NyaXB0c1sgaSBdO1xuXHRcdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggbm9kZS50eXBlIHx8IFwiXCIgKSAmJlxuXHRcdFx0XHRcdFx0IWRhdGFQcml2LmFjY2Vzcyggbm9kZSwgXCJnbG9iYWxFdmFsXCIgKSAmJlxuXHRcdFx0XHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBkb2MsIG5vZGUgKSApIHtcblxuXHRcdFx0XHRcdFx0aWYgKCBub2RlLnNyYyApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBPcHRpb25hbCBBSkFYIGRlcGVuZGVuY3ksIGJ1dCB3b24ndCBydW4gc2NyaXB0cyBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5fZXZhbFVybCApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuX2V2YWxVcmwoIG5vZGUuc3JjICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdERPTUV2YWwoIG5vZGUudGV4dENvbnRlbnQucmVwbGFjZSggcmNsZWFuU2NyaXB0LCBcIlwiICksIGRvYyApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoIGVsZW0sIHNlbGVjdG9yLCBrZWVwRGF0YSApIHtcblx0dmFyIG5vZGUsXG5cdFx0bm9kZXMgPSBzZWxlY3RvciA/IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCBlbGVtICkgOiBlbGVtLFxuXHRcdGkgPSAwO1xuXG5cdGZvciAoIDsgKCBub2RlID0gbm9kZXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRpZiAoICFrZWVwRGF0YSAmJiBub2RlLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBub2RlICkgKTtcblx0XHR9XG5cblx0XHRpZiAoIG5vZGUucGFyZW50Tm9kZSApIHtcblx0XHRcdGlmICgga2VlcERhdGEgJiYgalF1ZXJ5LmNvbnRhaW5zKCBub2RlLm93bmVyRG9jdW1lbnQsIG5vZGUgKSApIHtcblx0XHRcdFx0c2V0R2xvYmFsRXZhbCggZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdH1cblx0XHRcdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggbm9kZSApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGh0bWxQcmVmaWx0ZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHJldHVybiBodG1sLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZWxlbSwgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0dmFyIGksIGwsIHNyY0VsZW1lbnRzLCBkZXN0RWxlbWVudHMsXG5cdFx0XHRjbG9uZSA9IGVsZW0uY2xvbmVOb2RlKCB0cnVlICksXG5cdFx0XHRpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gRml4IElFIGNsb25pbmcgaXNzdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuXHRcdFx0XHQhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cHM6Ly9qc3BlcmYuY29tL2dldGFsbC12cy1zaXp6bGUvMlxuXHRcdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSApO1xuXHRcdFx0c3JjRWxlbWVudHMgPSBnZXRBbGwoIGVsZW0gKTtcblxuXHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGZpeElucHV0KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvcHkgdGhlIGV2ZW50cyBmcm9tIHRoZSBvcmlnaW5hbCB0byB0aGUgY2xvbmVcblx0XHRpZiAoIGRhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRpZiAoIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0XHRzcmNFbGVtZW50cyA9IHNyY0VsZW1lbnRzIHx8IGdldEFsbCggZWxlbSApO1xuXHRcdFx0XHRkZXN0RWxlbWVudHMgPSBkZXN0RWxlbWVudHMgfHwgZ2V0QWxsKCBjbG9uZSApO1xuXG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGNsb25lQ29weUV2ZW50KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbG9uZUNvcHlFdmVudCggZWxlbSwgY2xvbmUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSwgXCJzY3JpcHRcIiApO1xuXHRcdGlmICggZGVzdEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRzZXRHbG9iYWxFdmFsKCBkZXN0RWxlbWVudHMsICFpblBhZ2UgJiYgZ2V0QWxsKCBlbGVtLCBcInNjcmlwdFwiICkgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gdGhlIGNsb25lZCBzZXRcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH0sXG5cblx0Y2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cdFx0dmFyIGRhdGEsIGVsZW0sIHR5cGUsXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWwsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKCBlbGVtID0gZWxlbXNbIGkgXSApICE9PSB1bmRlZmluZWQ7IGkrKyApIHtcblx0XHRcdGlmICggYWNjZXB0RGF0YSggZWxlbSApICkge1xuXHRcdFx0XHRpZiAoICggZGF0YSA9IGVsZW1bIGRhdGFQcml2LmV4cGFuZG8gXSApICkge1xuXHRcdFx0XHRcdGlmICggZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCB0eXBlIGluIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWxbIHR5cGUgXSApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIHNob3J0Y3V0IHRvIGF2b2lkIGpRdWVyeS5ldmVudC5yZW1vdmUncyBvdmVyaGVhZFxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDUrXG5cdFx0XHRcdFx0Ly8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG5cdFx0XHRcdFx0ZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdICkge1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRkZXRhY2g6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gcmVtb3ZlKCB0aGlzLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yICk7XG5cdH0sXG5cblx0dGV4dDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnRleHQoIHRoaXMgKSA6XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoIGVsZW0sIHRhcmdldC5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGJlZm9yZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YWZ0ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSB0aGlzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0Ly8gUHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcblx0XHRcdFx0ZWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRkYXRhQW5kRXZlbnRzID0gZGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZmFsc2UgOiBkYXRhQW5kRXZlbnRzO1xuXHRcdGRlZXBEYXRhQW5kRXZlbnRzID0gZGVlcERhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGRhdGFBbmRFdmVudHMgOiBkZWVwRGF0YUFuZEV2ZW50cztcblxuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuXHRcdH0gKTtcblx0fSxcblxuXHRodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pbm5lckhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuXHRcdFx0XHQhd3JhcE1hcFsgKCBydGFnTmFtZS5leGVjKCB2YWx1ZSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuaHRtbFByZWZpbHRlciggdmFsdWUgKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF0gfHwge307XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdFx0ZWxlbS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtID0gMDtcblxuXHRcdFx0XHQvLyBJZiB1c2luZyBpbm5lckhUTUwgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdXNlIHRoZSBmYWxsYmFjayBtZXRob2Rcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5hcHBlbmQoIHZhbHVlICk7XG5cdFx0XHR9XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHRyZXBsYWNlV2l0aDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGlnbm9yZWQgPSBbXTtcblxuXHRcdC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIG5vbi1pZ25vcmVkIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmICggalF1ZXJ5LmluQXJyYXkoIHRoaXMsIGlnbm9yZWQgKSA8IDAgKSB7XG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cdFx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQoIGVsZW0sIHRoaXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gRm9yY2UgY2FsbGJhY2sgaW52b2NhdGlvblxuXHRcdH0sIGlnbm9yZWQgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCgge1xuXHRhcHBlbmRUbzogXCJhcHBlbmRcIixcblx0cHJlcGVuZFRvOiBcInByZXBlbmRcIixcblx0aW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxuXHRpbnNlcnRBZnRlcjogXCJhZnRlclwiLFxuXHRyZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcbn0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGVsZW1zLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG5cdFx0XHRsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDEsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgaSA8PSBsYXN0OyBpKysgKSB7XG5cdFx0XHRlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSggdHJ1ZSApO1xuXHRcdFx0alF1ZXJ5KCBpbnNlcnRbIGkgXSApWyBvcmlnaW5hbCBdKCBlbGVtcyApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdC8vIC5nZXQoKSBiZWNhdXNlIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdHB1c2guYXBwbHkoIHJldCwgZWxlbXMuZ2V0KCkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHJldCApO1xuXHR9O1xufSApO1xudmFyIHJtYXJnaW4gPSAoIC9ebWFyZ2luLyApO1xuXG52YXIgcm51bW5vbnB4ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSg/IXB4KVthLXolXSskXCIsIFwiaVwiICk7XG5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seSwgRmlyZWZveCA8PTMwICgjMTUwOTgsICMxNDE1MClcblx0XHQvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcblx0XHQvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcblx0XHR2YXIgdmlldyA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcblxuXHRcdGlmICggIXZpZXcgfHwgIXZpZXcub3BlbmVyICkge1xuXHRcdFx0dmlldyA9IHdpbmRvdztcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlldy5nZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG5cdH07XG5cblxuXG4oIGZ1bmN0aW9uKCkge1xuXG5cdC8vIEV4ZWN1dGluZyBib3RoIHBpeGVsUG9zaXRpb24gJiBib3hTaXppbmdSZWxpYWJsZSB0ZXN0cyByZXF1aXJlIG9ubHkgb25lIGxheW91dFxuXHQvLyBzbyB0aGV5J3JlIGV4ZWN1dGVkIGF0IHRoZSBzYW1lIHRpbWUgdG8gc2F2ZSB0aGUgc2Vjb25kIGNvbXB1dGF0aW9uLlxuXHRmdW5jdGlvbiBjb21wdXRlU3R5bGVUZXN0cygpIHtcblxuXHRcdC8vIFRoaXMgaXMgYSBzaW5nbGV0b24sIHdlIG5lZWQgdG8gZXhlY3V0ZSBpdCBvbmx5IG9uY2Vcblx0XHRpZiAoICFkaXYgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGl2LnN0eWxlLmNzc1RleHQgPVxuXHRcdFx0XCJib3gtc2l6aW5nOmJvcmRlci1ib3g7XCIgK1xuXHRcdFx0XCJwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO1wiICtcblx0XHRcdFwibWFyZ2luOmF1dG87Ym9yZGVyOjFweDtwYWRkaW5nOjFweDtcIiArXG5cdFx0XHRcInRvcDoxJTt3aWR0aDo1MCVcIjtcblx0XHRkaXYuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0dmFyIGRpdlN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiApO1xuXHRcdHBpeGVsUG9zaXRpb25WYWwgPSBkaXZTdHlsZS50b3AgIT09IFwiMSVcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHksIEZpcmVmb3ggPD0zIC0gNDRcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnRWYWwgPSBkaXZTdHlsZS5tYXJnaW5MZWZ0ID09PSBcIjJweFwiO1xuXHRcdGJveFNpemluZ1JlbGlhYmxlVmFsID0gZGl2U3R5bGUud2lkdGggPT09IFwiNXB4XCI7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA5IG9ubHlcblx0XHQvLyBEZXRlY3QgbWlzcmVwb3J0aW5nIG9mIGNvbnRlbnQgZGltZW5zaW9ucyBmb3IgYm9yZGVyLWJveCBlbGVtZW50cyAoZ2gtMzY5OSlcblx0XHRib3JkZXJCb3hSZWxpYWJsZVZhbCA9IGRpdlN0eWxlLndpZHRoWyAwIF0gPT09IFwiNVwiO1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seVxuXHRcdC8vIFNvbWUgc3R5bGVzIGNvbWUgYmFjayB3aXRoIHBlcmNlbnRhZ2UgdmFsdWVzLCBldmVuIHRob3VnaCB0aGV5IHNob3VsZG4ndFxuXHRcdGRpdi5zdHlsZS5tYXJnaW5SaWdodCA9IFwiNTAlXCI7XG5cdFx0cGl4ZWxNYXJnaW5SaWdodFZhbCA9IGRpdlN0eWxlLm1hcmdpblJpZ2h0ID09PSBcIjVweFwiO1xuXG5cdFx0ZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblxuXHRcdC8vIE51bGxpZnkgdGhlIGRpdiBzbyBpdCB3b3VsZG4ndCBiZSBzdG9yZWQgaW4gdGhlIG1lbW9yeSBhbmRcblx0XHQvLyBpdCB3aWxsIGFsc28gYmUgYSBzaWduIHRoYXQgY2hlY2tzIGFscmVhZHkgcGVyZm9ybWVkXG5cdFx0ZGl2ID0gbnVsbDtcblx0fVxuXG5cdHZhciBwaXhlbFBvc2l0aW9uVmFsLCBib3hTaXppbmdSZWxpYWJsZVZhbCwgYm9yZGVyQm94UmVsaWFibGVWYWwsIHBpeGVsTWFyZ2luUmlnaHRWYWwsXG5cdFx0cmVsaWFibGVNYXJnaW5MZWZ0VmFsLFxuXHRcdGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSxcblx0XHRkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cblx0Ly8gRmluaXNoIGVhcmx5IGluIGxpbWl0ZWQgKG5vbi1icm93c2VyKSBlbnZpcm9ubWVudHNcblx0aWYgKCAhZGl2LnN0eWxlICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0Ly8gU3R5bGUgb2YgY2xvbmVkIGVsZW1lbnQgYWZmZWN0cyBzb3VyY2UgZWxlbWVudCBjbG9uZWQgKCM4OTA4KVxuXHRkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcImNvbnRlbnQtYm94XCI7XG5cdGRpdi5jbG9uZU5vZGUoIHRydWUgKS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiXCI7XG5cdHN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlID0gZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID09PSBcImNvbnRlbnQtYm94XCI7XG5cblx0Y29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcImJvcmRlcjowO3dpZHRoOjEwcHg7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4O1wiICtcblx0XHRcInBhZGRpbmc6MDttYXJnaW4tdG9wOjFweDtwb3NpdGlvbjphYnNvbHV0ZVwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG5cdGpRdWVyeS5leHRlbmQoIHN1cHBvcnQsIHtcblx0XHRib3JkZXJCb3hSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIGJvcmRlckJveFJlbGlhYmxlVmFsO1xuXHRcdH0sXG5cdFx0Ym94U2l6aW5nUmVsaWFibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBib3hTaXppbmdSZWxpYWJsZVZhbDtcblx0XHR9LFxuXHRcdHBpeGVsUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBwaXhlbFBvc2l0aW9uVmFsO1xuXHRcdH0sXG5cdFx0cGl4ZWxNYXJnaW5SaWdodDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHBpeGVsTWFyZ2luUmlnaHRWYWw7XG5cdFx0fSxcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiByZWxpYWJsZU1hcmdpbkxlZnRWYWw7XG5cdFx0fVxuXHR9ICk7XG59ICkoKTtcblxuXG5mdW5jdGlvbiBjdXJDU1MoIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuXHR2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuXG5cdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA1MStcblx0XHQvLyBSZXRyaWV2aW5nIHN0eWxlIGJlZm9yZSBjb21wdXRlZCBzb21laG93XG5cdFx0Ly8gZml4ZXMgYW4gaXNzdWUgd2l0aCBnZXR0aW5nIHdyb25nIHZhbHVlc1xuXHRcdC8vIG9uIGRldGFjaGVkIGVsZW1lbnRzXG5cdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdGNvbXB1dGVkID0gY29tcHV0ZWQgfHwgZ2V0U3R5bGVzKCBlbGVtICk7XG5cblx0Ly8gZ2V0UHJvcGVydHlWYWx1ZSBpcyBuZWVkZWQgZm9yOlxuXHQvLyAgIC5jc3MoJ2ZpbHRlcicpIChJRSA5IG9ubHksICMxMjUzNylcblx0Ly8gICAuY3NzKCctLWN1c3RvbVByb3BlcnR5KSAoIzMxNDQpXG5cdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0cmV0ID0gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF07XG5cblx0XHRpZiAoIHJldCA9PT0gXCJcIiAmJiAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcblx0XHRcdHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcblx0XHQvLyBBbmRyb2lkIEJyb3dzZXIgcmV0dXJucyBwZXJjZW50YWdlIGZvciBzb21lIHZhbHVlcyxcblx0XHQvLyBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzLlxuXHRcdC8vIFRoaXMgaXMgYWdhaW5zdCB0aGUgQ1NTT00gZHJhZnQgc3BlYzpcblx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuXHRcdGlmICggIXN1cHBvcnQucGl4ZWxNYXJnaW5SaWdodCgpICYmIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiBybWFyZ2luLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0d2lkdGggPSBzdHlsZS53aWR0aDtcblx0XHRcdG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG5cdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG5cdFx0XHRyZXQgPSBjb21wdXRlZC53aWR0aDtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG5cdFx0XHRzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdFx0Ly8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cblx0XHRyZXQgKyBcIlwiIDpcblx0XHRyZXQ7XG59XG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuXG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblxuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWVcblx0XHRcdFx0Ly8gdG8gbWlzc2luZyBkZXBlbmRlbmN5KSwgcmVtb3ZlIGl0LlxuXHRcdFx0XHRkZWxldGUgdGhpcy5nZXQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldCA9IGhvb2tGbiApLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH07XG59XG5cblxudmFyXG5cblx0Ly8gU3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZVxuXHQvLyBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcblx0Ly8gU2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG5cdHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcblx0cmN1c3RvbVByb3AgPSAvXi0tLyxcblx0Y3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXG5cdGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcblx0XHRsZXR0ZXJTcGFjaW5nOiBcIjBcIixcblx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdH0sXG5cblx0Y3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiTW96XCIsIFwibXNcIiBdLFxuXHRlbXB0eVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLnN0eWxlO1xuXG4vLyBSZXR1cm4gYSBjc3MgcHJvcGVydHkgbWFwcGVkIHRvIGEgcG90ZW50aWFsbHkgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG5mdW5jdGlvbiB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHtcblxuXHQvLyBTaG9ydGN1dCBmb3IgbmFtZXMgdGhhdCBhcmUgbm90IHZlbmRvciBwcmVmaXhlZFxuXHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIENoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lWyAwIF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoIDEgKSxcblx0XHRpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcblx0XHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRcdHJldHVybiBuYW1lO1xuXHRcdH1cblx0fVxufVxuXG4vLyBSZXR1cm4gYSBwcm9wZXJ0eSBtYXBwZWQgYWxvbmcgd2hhdCBqUXVlcnkuY3NzUHJvcHMgc3VnZ2VzdHMgb3IgdG9cbi8vIGEgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5LlxuZnVuY3Rpb24gZmluYWxQcm9wTmFtZSggbmFtZSApIHtcblx0dmFyIHJldCA9IGpRdWVyeS5jc3NQcm9wc1sgbmFtZSBdO1xuXHRpZiAoICFyZXQgKSB7XG5cdFx0cmV0ID0galF1ZXJ5LmNzc1Byb3BzWyBuYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHx8IG5hbWU7XG5cdH1cblx0cmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApIHtcblxuXHQvLyBBbnkgcmVsYXRpdmUgKCsvLSkgdmFsdWVzIGhhdmUgYWxyZWFkeSBiZWVuXG5cdC8vIG5vcm1hbGl6ZWQgYXQgdGhpcyBwb2ludFxuXHR2YXIgbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKTtcblx0cmV0dXJuIG1hdGNoZXMgP1xuXG5cdFx0Ly8gR3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgXCJzdWJ0cmFjdFwiLCBlLmcuLCB3aGVuIHVzZWQgYXMgaW4gY3NzSG9va3Ncblx0XHRNYXRoLm1heCggMCwgbWF0Y2hlc1sgMiBdIC0gKCBzdWJ0cmFjdCB8fCAwICkgKSArICggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApIDpcblx0XHR2YWx1ZTtcbn1cblxuZnVuY3Rpb24gYm94TW9kZWxBZGp1c3RtZW50KCBlbGVtLCBkaW1lbnNpb24sIGJveCwgaXNCb3JkZXJCb3gsIHN0eWxlcywgY29tcHV0ZWRWYWwgKSB7XG5cdHZhciBpID0gZGltZW5zaW9uID09PSBcIndpZHRoXCIgPyAxIDogMCxcblx0XHRleHRyYSA9IDAsXG5cdFx0ZGVsdGEgPSAwO1xuXG5cdC8vIEFkanVzdG1lbnQgbWF5IG5vdCBiZSBuZWNlc3Nhcnlcblx0aWYgKCBib3ggPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGZvciAoIDsgaSA8IDQ7IGkgKz0gMiApIHtcblxuXHRcdC8vIEJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpblxuXHRcdGlmICggYm94ID09PSBcIm1hcmdpblwiICkge1xuXHRcdFx0ZGVsdGEgKz0galF1ZXJ5LmNzcyggZWxlbSwgYm94ICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlIGdldCBoZXJlIHdpdGggYSBjb250ZW50LWJveCwgd2UncmUgc2Vla2luZyBcInBhZGRpbmdcIiBvciBcImJvcmRlclwiIG9yIFwibWFyZ2luXCJcblx0XHRpZiAoICFpc0JvcmRlckJveCApIHtcblxuXHRcdFx0Ly8gQWRkIHBhZGRpbmdcblx0XHRcdGRlbHRhICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG5cdFx0XHQvLyBGb3IgXCJib3JkZXJcIiBvciBcIm1hcmdpblwiLCBhZGQgYm9yZGVyXG5cdFx0XHRpZiAoIGJveCAhPT0gXCJwYWRkaW5nXCIgKSB7XG5cdFx0XHRcdGRlbHRhICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cblx0XHRcdC8vIEJ1dCBzdGlsbCBrZWVwIHRyYWNrIG9mIGl0IG90aGVyd2lzZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXh0cmEgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblxuXHRcdC8vIElmIHdlIGdldCBoZXJlIHdpdGggYSBib3JkZXItYm94IChjb250ZW50ICsgcGFkZGluZyArIGJvcmRlciksIHdlJ3JlIHNlZWtpbmcgXCJjb250ZW50XCIgb3Jcblx0XHQvLyBcInBhZGRpbmdcIiBvciBcIm1hcmdpblwiXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gRm9yIFwiY29udGVudFwiLCBzdWJ0cmFjdCBwYWRkaW5nXG5cdFx0XHRpZiAoIGJveCA9PT0gXCJjb250ZW50XCIgKSB7XG5cdFx0XHRcdGRlbHRhIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3IgXCJjb250ZW50XCIgb3IgXCJwYWRkaW5nXCIsIHN1YnRyYWN0IGJvcmRlclxuXHRcdFx0aWYgKCBib3ggIT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRcdGRlbHRhIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWNjb3VudCBmb3IgcG9zaXRpdmUgY29udGVudC1ib3ggc2Nyb2xsIGd1dHRlciB3aGVuIHJlcXVlc3RlZCBieSBwcm92aWRpbmcgY29tcHV0ZWRWYWxcblx0aWYgKCAhaXNCb3JkZXJCb3ggJiYgY29tcHV0ZWRWYWwgPj0gMCApIHtcblxuXHRcdC8vIG9mZnNldFdpZHRoL29mZnNldEhlaWdodCBpcyBhIHJvdW5kZWQgc3VtIG9mIGNvbnRlbnQsIHBhZGRpbmcsIHNjcm9sbCBndXR0ZXIsIGFuZCBib3JkZXJcblx0XHQvLyBBc3N1bWluZyBpbnRlZ2VyIHNjcm9sbCBndXR0ZXIsIHN1YnRyYWN0IHRoZSByZXN0IGFuZCByb3VuZCBkb3duXG5cdFx0ZGVsdGEgKz0gTWF0aC5tYXgoIDAsIE1hdGguY2VpbChcblx0XHRcdGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXSAtXG5cdFx0XHRjb21wdXRlZFZhbCAtXG5cdFx0XHRkZWx0YSAtXG5cdFx0XHRleHRyYSAtXG5cdFx0XHQwLjVcblx0XHQpICk7XG5cdH1cblxuXHRyZXR1cm4gZGVsdGE7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIGRpbWVuc2lvbiwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBjb21wdXRlZCBzdHlsZVxuXHR2YXIgc3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBkaW1lbnNpb24sIHN0eWxlcyApLFxuXHRcdGlzQm9yZGVyQm94ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHR2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3g7XG5cblx0Ly8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cblx0aWYgKCBybnVtbm9ucHgudGVzdCggdmFsICkgKSB7XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxuXG5cdC8vIENoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXG5cdC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcblx0dmFsdWVJc0JvcmRlckJveCA9IHZhbHVlSXNCb3JkZXJCb3ggJiZcblx0XHQoIHN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUoKSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIGRpbWVuc2lvbiBdICk7XG5cblx0Ly8gRmFsbCBiYWNrIHRvIG9mZnNldFdpZHRoL0hlaWdodCB3aGVuIHZhbHVlIGlzIFwiYXV0b1wiXG5cdC8vIFRoaXMgaGFwcGVucyBmb3IgaW5saW5lIGVsZW1lbnRzIHdpdGggbm8gZXhwbGljaXQgc2V0dGluZyAoZ2gtMzU3MSlcblx0aWYgKCB2YWwgPT09IFwiYXV0b1wiICkge1xuXHRcdHZhbCA9IGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXTtcblx0fVxuXG5cdC8vIE5vcm1hbGl6ZSBcIlwiIGFuZCBhdXRvXG5cdHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG5cblx0Ly8gQWRqdXN0IGZvciB0aGUgZWxlbWVudCdzIGJveCBtb2RlbFxuXHRyZXR1cm4gKCB2YWwgK1xuXHRcdGJveE1vZGVsQWRqdXN0bWVudChcblx0XHRcdGVsZW0sXG5cdFx0XHRkaW1lbnNpb24sXG5cdFx0XHRleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXG5cdFx0XHR2YWx1ZUlzQm9yZGVyQm94LFxuXHRcdFx0c3R5bGVzLFxuXG5cdFx0XHQvLyBQcm92aWRlIHRoZSBjdXJyZW50IGNvbXB1dGVkIHNpemUgdG8gcmVxdWVzdCBzY3JvbGwgZ3V0dGVyIGNhbGN1bGF0aW9uIChnaC0zNTg5KVxuXHRcdFx0dmFsXG5cdFx0KVxuXHQpICsgXCJweFwiO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gQWRkIGluIHN0eWxlIHByb3BlcnR5IGhvb2tzIGZvciBvdmVycmlkaW5nIHRoZSBkZWZhdWx0XG5cdC8vIGJlaGF2aW9yIG9mIGdldHRpbmcgYW5kIHNldHRpbmcgYSBzdHlsZSBwcm9wZXJ0eVxuXHRjc3NIb29rczoge1xuXHRcdG9wYWNpdHk6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0XHRcdFx0Ly8gV2Ugc2hvdWxkIGFsd2F5cyBnZXQgYSBudW1iZXIgYmFjayBmcm9tIG9wYWNpdHlcblx0XHRcdFx0XHR2YXIgcmV0ID0gY3VyQ1NTKCBlbGVtLCBcIm9wYWNpdHlcIiApO1xuXHRcdFx0XHRcdHJldHVybiByZXQgPT09IFwiXCIgPyBcIjFcIiA6IHJldDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGFkZCBcInB4XCIgdG8gdGhlc2UgcG9zc2libHktdW5pdGxlc3MgcHJvcGVydGllc1xuXHRjc3NOdW1iZXI6IHtcblx0XHRcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IHRydWUsXG5cdFx0XCJjb2x1bW5Db3VudFwiOiB0cnVlLFxuXHRcdFwiZmlsbE9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcImZsZXhHcm93XCI6IHRydWUsXG5cdFx0XCJmbGV4U2hyaW5rXCI6IHRydWUsXG5cdFx0XCJmb250V2VpZ2h0XCI6IHRydWUsXG5cdFx0XCJsaW5lSGVpZ2h0XCI6IHRydWUsXG5cdFx0XCJvcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJvcmRlclwiOiB0cnVlLFxuXHRcdFwib3JwaGFuc1wiOiB0cnVlLFxuXHRcdFwid2lkb3dzXCI6IHRydWUsXG5cdFx0XCJ6SW5kZXhcIjogdHJ1ZSxcblx0XHRcInpvb21cIjogdHJ1ZVxuXHR9LFxuXG5cdC8vIEFkZCBpbiBwcm9wZXJ0aWVzIHdob3NlIG5hbWVzIHlvdSB3aXNoIHRvIGZpeCBiZWZvcmVcblx0Ly8gc2V0dGluZyBvciBnZXR0aW5nIHRoZSB2YWx1ZVxuXHRjc3NQcm9wczoge30sXG5cblx0Ly8gR2V0IGFuZCBzZXQgdGhlIHN0eWxlIHByb3BlcnR5IG9uIGEgRE9NIE5vZGVcblx0c3R5bGU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSwgZXh0cmEgKSB7XG5cblx0XHQvLyBEb24ndCBzZXQgc3R5bGVzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCB8fCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcblx0XHR2YXIgcmV0LCB0eXBlLCBob29rcyxcblx0XHRcdG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApLFxuXHRcdFx0aXNDdXN0b21Qcm9wID0gcmN1c3RvbVByb3AudGVzdCggbmFtZSApLFxuXHRcdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lLiBXZSBkb24ndFxuXHRcdC8vIHdhbnQgdG8gcXVlcnkgdGhlIHZhbHVlIGlmIGl0IGlzIGEgQ1NTIGN1c3RvbSBwcm9wZXJ0eVxuXHRcdC8vIHNpbmNlIHRoZXkgYXJlIHVzZXItZGVmaW5lZC5cblx0XHRpZiAoICFpc0N1c3RvbVByb3AgKSB7XG5cdFx0XHRuYW1lID0gZmluYWxQcm9wTmFtZSggb3JpZ05hbWUgKTtcblx0XHR9XG5cblx0XHQvLyBHZXRzIGhvb2sgZm9yIHRoZSBwcmVmaXhlZCB2ZXJzaW9uLCB0aGVuIHVucHJlZml4ZWQgdmVyc2lvblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgd2UncmUgc2V0dGluZyBhIHZhbHVlXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdFx0Ly8gQ29udmVydCBcIis9XCIgb3IgXCItPVwiIHRvIHJlbGF0aXZlIG51bWJlcnMgKCM3MzQ1KVxuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICYmICggcmV0ID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiYgcmV0WyAxIF0gKSB7XG5cdFx0XHRcdHZhbHVlID0gYWRqdXN0Q1NTKCBlbGVtLCBuYW1lLCByZXQgKTtcblxuXHRcdFx0XHQvLyBGaXhlcyBidWcgIzkyMzdcblx0XHRcdFx0dHlwZSA9IFwibnVtYmVyXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IG51bGwgYW5kIE5hTiB2YWx1ZXMgYXJlbid0IHNldCAoIzcxMTYpXG5cdFx0XHRpZiAoIHZhbHVlID09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCB0aGUgdW5pdCAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxuXHRcdFx0aWYgKCB0eXBlID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWx1ZSArPSByZXQgJiYgcmV0WyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBvcmlnTmFtZSBdID8gXCJcIiA6IFwicHhcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBiYWNrZ3JvdW5kLSogcHJvcHMgYWZmZWN0IG9yaWdpbmFsIGNsb25lJ3MgdmFsdWVzXG5cdFx0XHRpZiAoICFzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSAmJiB2YWx1ZSA9PT0gXCJcIiAmJiBuYW1lLmluZGV4T2YoIFwiYmFja2dyb3VuZFwiICkgPT09IDAgKSB7XG5cdFx0XHRcdHN0eWxlWyBuYW1lIF0gPSBcImluaGVyaXRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCwgdXNlIHRoYXQgdmFsdWUsIG90aGVyd2lzZSBqdXN0IHNldCB0aGUgc3BlY2lmaWVkIHZhbHVlXG5cdFx0XHRpZiAoICFob29rcyB8fCAhKCBcInNldFwiIGluIGhvb2tzICkgfHxcblx0XHRcdFx0KCB2YWx1ZSA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIGV4dHJhICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdGlmICggaXNDdXN0b21Qcm9wICkge1xuXHRcdFx0XHRcdHN0eWxlLnNldFByb3BlcnR5KCBuYW1lLCB2YWx1ZSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0eWxlWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIG5vbi1jb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5nZXQoIGVsZW0sIGZhbHNlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdGhlcndpc2UganVzdCBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHN0eWxlIG9iamVjdFxuXHRcdFx0cmV0dXJuIHN0eWxlWyBuYW1lIF07XG5cdFx0fVxuXHR9LFxuXG5cdGNzczogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGV4dHJhLCBzdHlsZXMgKSB7XG5cdFx0dmFyIHZhbCwgbnVtLCBob29rcyxcblx0XHRcdG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApLFxuXHRcdFx0aXNDdXN0b21Qcm9wID0gcmN1c3RvbVByb3AudGVzdCggbmFtZSApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lLiBXZSBkb24ndFxuXHRcdC8vIHdhbnQgdG8gbW9kaWZ5IHRoZSB2YWx1ZSBpZiBpdCBpcyBhIENTUyBjdXN0b20gcHJvcGVydHlcblx0XHQvLyBzaW5jZSB0aGV5IGFyZSB1c2VyLWRlZmluZWQuXG5cdFx0aWYgKCAhaXNDdXN0b21Qcm9wICkge1xuXHRcdFx0bmFtZSA9IGZpbmFsUHJvcE5hbWUoIG9yaWdOYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gVHJ5IHByZWZpeGVkIG5hbWUgZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgbmFtZVxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWwgPSBob29rcy5nZXQoIGVsZW0sIHRydWUsIGV4dHJhICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcblx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcblx0XHRpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcblx0XHRcdHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIE1ha2UgbnVtZXJpYyBpZiBmb3JjZWQgb3IgYSBxdWFsaWZpZXIgd2FzIHByb3ZpZGVkIGFuZCB2YWwgbG9va3MgbnVtZXJpY1xuXHRcdGlmICggZXh0cmEgPT09IFwiXCIgfHwgZXh0cmEgKSB7XG5cdFx0XHRudW0gPSBwYXJzZUZsb2F0KCB2YWwgKTtcblx0XHRcdHJldHVybiBleHRyYSA9PT0gdHJ1ZSB8fCBpc0Zpbml0ZSggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgZGltZW5zaW9uICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIGRpbWVuc2lvbiBdID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkLCBleHRyYSApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0Ly8gQ2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG5cdFx0XHRcdC8vIGJ1dCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0XG5cdFx0XHRcdHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmXG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCtcblx0XHRcdFx0XHQvLyBUYWJsZSBjb2x1bW5zIGluIFNhZmFyaSBoYXZlIG5vbi16ZXJvIG9mZnNldFdpZHRoICYgemVyb1xuXHRcdFx0XHRcdC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHVubGVzcyBkaXNwbGF5IGlzIGNoYW5nZWQuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0XHRcdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYSBkaXNjb25uZWN0ZWQgbm9kZVxuXHRcdFx0XHRcdC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cblx0XHRcdFx0XHQoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoIHx8ICFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICkgP1xuXHRcdFx0XHRcdFx0c3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBkaW1lbnNpb24sIGV4dHJhICk7XG5cdFx0XHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRcdFx0Z2V0V2lkdGhPckhlaWdodCggZWxlbSwgZGltZW5zaW9uLCBleHRyYSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSB7XG5cdFx0XHR2YXIgbWF0Y2hlcyxcblx0XHRcdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0XHRcdGlzQm9yZGVyQm94ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0c3VidHJhY3QgPSBleHRyYSAmJiBib3hNb2RlbEFkanVzdG1lbnQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRkaW1lbnNpb24sXG5cdFx0XHRcdFx0ZXh0cmEsXG5cdFx0XHRcdFx0aXNCb3JkZXJCb3gsXG5cdFx0XHRcdFx0c3R5bGVzXG5cdFx0XHRcdCk7XG5cblx0XHRcdC8vIEFjY291bnQgZm9yIHVucmVsaWFibGUgYm9yZGVyLWJveCBkaW1lbnNpb25zIGJ5IGNvbXBhcmluZyBvZmZzZXQqIHRvIGNvbXB1dGVkIGFuZFxuXHRcdFx0Ly8gZmFraW5nIGEgY29udGVudC1ib3ggdG8gZ2V0IGJvcmRlciBhbmQgcGFkZGluZyAoZ2gtMzY5OSlcblx0XHRcdGlmICggaXNCb3JkZXJCb3ggJiYgIXN1cHBvcnQuYm9yZGVyQm94UmVsaWFibGUoKSApIHtcblx0XHRcdFx0c3VidHJhY3QgLT0gTWF0aC5jZWlsKFxuXHRcdFx0XHRcdGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXSAtXG5cdFx0XHRcdFx0cGFyc2VGbG9hdCggc3R5bGVzWyBkaW1lbnNpb24gXSApIC1cblx0XHRcdFx0XHRib3hNb2RlbEFkanVzdG1lbnQoIGVsZW0sIGRpbWVuc2lvbiwgXCJib3JkZXJcIiwgZmFsc2UsIHN0eWxlcyApIC1cblx0XHRcdFx0XHQwLjVcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCB0byBwaXhlbHMgaWYgdmFsdWUgYWRqdXN0bWVudCBpcyBuZWVkZWRcblx0XHRcdGlmICggc3VidHJhY3QgJiYgKCBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiZcblx0XHRcdFx0KCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgIT09IFwicHhcIiApIHtcblxuXHRcdFx0XHRlbGVtLnN0eWxlWyBkaW1lbnNpb24gXSA9IHZhbHVlO1xuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5jc3MoIGVsZW0sIGRpbWVuc2lvbiApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApO1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmNzc0hvb2tzLm1hcmdpbkxlZnQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5MZWZ0LFxuXHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdHJldHVybiAoIHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIgKSApIHx8XG5cdFx0XHRcdGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG5cdFx0XHRcdFx0c3dhcCggZWxlbSwgeyBtYXJnaW5MZWZ0OiAwIH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblx0XHRcdFx0XHR9IClcblx0XHRcdFx0KSArIFwicHhcIjtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKCB7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpID0gMCxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fSxcblxuXHRcdFx0XHQvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcblx0XHRcdFx0cGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdCggXCIgXCIgKSA6IFsgdmFsdWUgXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgNDsgaSsrICkge1xuXHRcdFx0XHRleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG5cdFx0XHRcdFx0cGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggIXJtYXJnaW4udGVzdCggcHJlZml4ICkgKSB7XG5cdFx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXS5zZXQgPSBzZXRQb3NpdGl2ZU51bWJlcjtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHRcdHZhciBzdHlsZXMsIGxlbixcblx0XHRcdFx0bWFwID0ge30sXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIG5hbWUgKSApIHtcblx0XHRcdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICk7XG5cdFx0XHRcdGxlbiA9IG5hbWUubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdG1hcFsgbmFtZVsgaSBdIF0gPSBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lWyBpIF0sIGZhbHNlLCBzdHlsZXMgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBtYXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lLCB2YWx1ZSApIDpcblx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApO1xuXHRcdH0sIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9XG59ICk7XG5cblxudmFyIGJvb2xIb29rLFxuXHRhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEF0dHJpYnV0ZSBob29rcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgbG93ZXJjYXNlIHZlcnNpb25cblx0XHQvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IHVuZGVmaW5lZCApO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0cmV0dXJuIHJldCA9PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJlxuXHRcdFx0XHRcdG5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdHZhciBuYW1lLFxuXHRcdFx0aSA9IDAsXG5cblx0XHRcdC8vIEF0dHJpYnV0ZSBuYW1lcyBjYW4gY29udGFpbiBub24tSFRNTCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnNcblx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuXHRcdFx0YXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblxuXHRcdGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHR3aGlsZSAoICggbmFtZSA9IGF0dHJOYW1lc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIG5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSG9va3MgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xuYm9vbEhvb2sgPSB7XG5cdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuXHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcblxualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cblx0YXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciByZXQsIGhhbmRsZSxcblx0XHRcdGxvd2VyY2FzZU5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAoICFpc1hNTCApIHtcblxuXHRcdFx0Ly8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuXHRcdFx0aGFuZGxlID0gYXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdO1xuXHRcdFx0YXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdID0gcmV0O1xuXHRcdFx0cmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuXHRcdFx0XHRsb3dlcmNhc2VOYW1lIDpcblx0XHRcdFx0bnVsbDtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IGhhbmRsZTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fTtcbn0gKTtcblxuXG5cblxuXHQvLyBTdHJpcCBhbmQgY29sbGFwc2Ugd2hpdGVzcGFjZSBhY2NvcmRpbmcgdG8gSFRNTCBzcGVjXG5cdC8vIGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNzdHJpcC1hbmQtY29sbGFwc2UtYXNjaWktd2hpdGVzcGFjZVxuXHRmdW5jdGlvbiBzdHJpcEFuZENvbGxhcHNlKCB2YWx1ZSApIHtcblx0XHR2YXIgdG9rZW5zID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblx0XHRyZXR1cm4gdG9rZW5zLmpvaW4oIFwiIFwiICk7XG5cdH1cblxuXG5mdW5jdGlvbiBnZXRDbGFzcyggZWxlbSApIHtcblx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlICYmIGVsZW0uZ2V0QXR0cmlidXRlKCBcImNsYXNzXCIgKSB8fCBcIlwiO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCBnZXRDbGFzcyggdGhpcyApICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGN1clZhbHVlID0gZ2V0Q2xhc3MoIGVsZW0gKTtcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggY3VyVmFsdWUgKSArIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblx0XHRcdFx0XHRcdGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcblx0XHRcdFx0XHRcdFx0Y3VyICs9IGNsYXp6ICsgXCIgXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0gc3RyaXBBbmRDb2xsYXBzZSggY3VyICk7XG5cdFx0XHRcdFx0aWYgKCBjdXJWYWx1ZSAhPT0gZmluYWxWYWx1ZSApIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsIGZpbmFsVmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRyZW1vdmVDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGN1clZhbHVlLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5yZW1vdmVDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgZ2V0Q2xhc3MoIHRoaXMgKSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiB0aGlzLmF0dHIoIFwiY2xhc3NcIiwgXCJcIiApO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlICkge1xuXHRcdFx0Y2xhc3NlcyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXG5cdFx0XHRcdC8vIFRoaXMgZXhwcmVzc2lvbiBpcyBoZXJlIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgYWRkQ2xhc3MpXG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcIiBcIiArIHN0cmlwQW5kQ29sbGFwc2UoIGN1clZhbHVlICkgKyBcIiBcIiApO1xuXG5cdFx0XHRcdGlmICggY3VyICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKCBjbGF6eiA9IGNsYXNzZXNbIGorKyBdICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSAqYWxsKiBpbnN0YW5jZXNcblx0XHRcdFx0XHRcdHdoaWxlICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApID4gLTEgKSB7XG5cdFx0XHRcdFx0XHRcdGN1ciA9IGN1ci5yZXBsYWNlKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIsIFwiIFwiICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0gc3RyaXBBbmRDb2xsYXBzZSggY3VyICk7XG5cdFx0XHRcdFx0aWYgKCBjdXJWYWx1ZSAhPT0gZmluYWxWYWx1ZSApIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsIGZpbmFsVmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR0b2dnbGVDbGFzczogZnVuY3Rpb24oIHZhbHVlLCBzdGF0ZVZhbCApIHtcblx0XHR2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdGlmICggdHlwZW9mIHN0YXRlVmFsID09PSBcImJvb2xlYW5cIiAmJiB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlVmFsID8gdGhpcy5hZGRDbGFzcyggdmFsdWUgKSA6IHRoaXMucmVtb3ZlQ2xhc3MoIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyhcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCB0aGlzLCBpLCBnZXRDbGFzcyggdGhpcyApLCBzdGF0ZVZhbCApLFxuXHRcdFx0XHRcdHN0YXRlVmFsXG5cdFx0XHRcdCk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY2xhc3NOYW1lLCBpLCBzZWxmLCBjbGFzc05hbWVzO1xuXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdFx0Ly8gVG9nZ2xlIGluZGl2aWR1YWwgY2xhc3MgbmFtZXNcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdHNlbGYgPSBqUXVlcnkoIHRoaXMgKTtcblx0XHRcdFx0Y2xhc3NOYW1lcyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRcdFx0d2hpbGUgKCAoIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXNbIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0XHQvLyBDaGVjayBlYWNoIGNsYXNzTmFtZSBnaXZlbiwgc3BhY2Ugc2VwYXJhdGVkIGxpc3Rcblx0XHRcdFx0XHRpZiAoIHNlbGYuaGFzQ2xhc3MoIGNsYXNzTmFtZSApICkge1xuXHRcdFx0XHRcdFx0c2VsZi5yZW1vdmVDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGYuYWRkQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUb2dnbGUgd2hvbGUgY2xhc3MgbmFtZVxuXHRcdFx0fSBlbHNlIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdFx0Y2xhc3NOYW1lID0gZ2V0Q2xhc3MoIHRoaXMgKTtcblx0XHRcdFx0aWYgKCBjbGFzc05hbWUgKSB7XG5cblx0XHRcdFx0XHQvLyBTdG9yZSBjbGFzc05hbWUgaWYgc2V0XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiwgY2xhc3NOYW1lICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzcyBuYW1lIG9yIGlmIHdlJ3JlIHBhc3NlZCBgZmFsc2VgLFxuXHRcdFx0XHQvLyB0aGVuIHJlbW92ZSB0aGUgd2hvbGUgY2xhc3NuYW1lIChpZiB0aGVyZSB3YXMgb25lLCB0aGUgYWJvdmUgc2F2ZWQgaXQpLlxuXHRcdFx0XHQvLyBPdGhlcndpc2UgYnJpbmcgYmFjayB3aGF0ZXZlciB3YXMgcHJldmlvdXNseSBzYXZlZCAoaWYgYW55dGhpbmcpLFxuXHRcdFx0XHQvLyBmYWxsaW5nIGJhY2sgdG8gdGhlIGVtcHR5IHN0cmluZyBpZiBub3RoaW5nIHdhcyBzdG9yZWQuXG5cdFx0XHRcdGlmICggdGhpcy5zZXRBdHRyaWJ1dGUgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIixcblx0XHRcdFx0XHRcdGNsYXNzTmFtZSB8fCB2YWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0XHRcdFx0XCJcIiA6XG5cdFx0XHRcdFx0XHRkYXRhUHJpdi5nZXQoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0aGFzQ2xhc3M6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgY2xhc3NOYW1lLCBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCI7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdCggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBnZXRDbGFzcyggZWxlbSApICkgKyBcIiBcIiApLmluZGV4T2YoIGNsYXNzTmFtZSApID4gLTEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59ICk7XG5cblxuXG5cbnZhciBycmV0dXJuID0gL1xcci9nO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHZhbDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBob29rcywgcmV0LCBpc0Z1bmN0aW9uLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXTtcblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyBlbGVtLnR5cGUgXSB8fFxuXHRcdFx0XHRcdGpRdWVyeS52YWxIb29rc1sgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cblx0XHRcdFx0aWYgKCBob29rcyAmJlxuXHRcdFx0XHRcdFwiZ2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0XHQoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgXCJ2YWx1ZVwiICkgKSAhPT0gdW5kZWZpbmVkXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXQgPSBlbGVtLnZhbHVlO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSBtb3N0IGNvbW1vbiBzdHJpbmcgY2FzZXNcblx0XHRcdFx0aWYgKCB0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHJldHVybiByZXQucmVwbGFjZSggcnJldHVybiwgXCJcIiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSGFuZGxlIGNhc2VzIHdoZXJlIHZhbHVlIGlzIG51bGwvdW5kZWYgb3IgbnVtYmVyXG5cdFx0XHRcdHJldHVybiByZXQgPT0gbnVsbCA/IFwiXCIgOiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdHZhciB2YWw7XG5cblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlLmNhbGwoIHRoaXMsIGksIGpRdWVyeSggdGhpcyApLnZhbCgpICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWwgPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVHJlYXQgbnVsbC91bmRlZmluZWQgYXMgXCJcIjsgY29udmVydCBudW1iZXJzIHRvIHN0cmluZ1xuXHRcdFx0aWYgKCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdFx0dmFsID0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsICs9IFwiXCI7XG5cblx0XHRcdH0gZWxzZSBpZiAoIEFycmF5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHR2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCI7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIHRoaXMudHlwZSBdIHx8IGpRdWVyeS52YWxIb29rc1sgdGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cblx0XHRcdC8vIElmIHNldCByZXR1cm5zIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIG5vcm1hbCBzZXR0aW5nXG5cdFx0XHRpZiAoICFob29rcyB8fCAhKCBcInNldFwiIGluIGhvb2tzICkgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0dmFsSG9va3M6IHtcblx0XHRvcHRpb246IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdFx0dmFyIHZhbCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIFwidmFsdWVcIiApO1xuXHRcdFx0XHRyZXR1cm4gdmFsICE9IG51bGwgP1xuXHRcdFx0XHRcdHZhbCA6XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTEwIC0gMTEgb25seVxuXHRcdFx0XHRcdC8vIG9wdGlvbi50ZXh0IHRocm93cyBleGNlcHRpb25zICgjMTQ2ODYsICMxNDg1OClcblx0XHRcdFx0XHQvLyBTdHJpcCBhbmQgY29sbGFwc2Ugd2hpdGVzcGFjZVxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI3N0cmlwLWFuZC1jb2xsYXBzZS13aGl0ZXNwYWNlXG5cdFx0XHRcdFx0c3RyaXBBbmRDb2xsYXBzZSggalF1ZXJ5LnRleHQoIGVsZW0gKSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c2VsZWN0OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgdmFsdWUsIG9wdGlvbiwgaSxcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4LFxuXHRcdFx0XHRcdG9uZSA9IGVsZW0udHlwZSA9PT0gXCJzZWxlY3Qtb25lXCIsXG5cdFx0XHRcdFx0dmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuXHRcdFx0XHRcdG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdGlmICggaW5kZXggPCAwICkge1xuXHRcdFx0XHRcdGkgPSBtYXg7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpID0gb25lID8gaW5kZXggOiAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgc2VsZWN0ZWQgb3B0aW9uc1xuXHRcdFx0XHRmb3IgKCA7IGkgPCBtYXg7IGkrKyApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdFx0XHRcdC8vIElFOC05IGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuXHRcdFx0XHRcdGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuXG5cdFx0XHRcdFx0XHRcdC8vIERvbid0IHJldHVybiBvcHRpb25zIHRoYXQgYXJlIGRpc2FibGVkIG9yIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdFx0XHRcdFx0IW9wdGlvbi5kaXNhYmxlZCAmJlxuXHRcdFx0XHRcdFx0XHQoICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fFxuXHRcdFx0XHRcdFx0XHRcdCFub2RlTmFtZSggb3B0aW9uLnBhcmVudE5vZGUsIFwib3B0Z3JvdXBcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEdldCB0aGUgc3BlY2lmaWMgdmFsdWUgZm9yIHRoZSBvcHRpb25cblx0XHRcdFx0XHRcdHZhbHVlID0galF1ZXJ5KCBvcHRpb24gKS52YWwoKTtcblxuXHRcdFx0XHRcdFx0Ly8gV2UgZG9uJ3QgbmVlZCBhbiBhcnJheSBmb3Igb25lIHNlbGVjdHNcblx0XHRcdFx0XHRcdGlmICggb25lICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE11bHRpLVNlbGVjdHMgcmV0dXJuIGFuIGFycmF5XG5cdFx0XHRcdFx0XHR2YWx1ZXMucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBvcHRpb25TZXQsIG9wdGlvbixcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdHZhbHVlcyA9IGpRdWVyeS5tYWtlQXJyYXkoIHZhbHVlICksXG5cdFx0XHRcdFx0aSA9IG9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG5cblx0XHRcdFx0XHRpZiAoIG9wdGlvbi5zZWxlY3RlZCA9XG5cdFx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggalF1ZXJ5LnZhbEhvb2tzLm9wdGlvbi5nZXQoIG9wdGlvbiApLCB2YWx1ZXMgKSA+IC0xXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRvcHRpb25TZXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG5cdFx0XHRcdGlmICggIW9wdGlvblNldCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxualF1ZXJ5LmVhY2goIFsgXCJyYWRpb1wiLCBcImNoZWNrYm94XCIgXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdID0ge1xuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtLmNoZWNrZWQgPSBqUXVlcnkuaW5BcnJheSggalF1ZXJ5KCBlbGVtICkudmFsKCksIHZhbHVlICkgPiAtMSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0aWYgKCAhc3VwcG9ydC5jaGVja09uICkge1xuXHRcdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XG5cdFx0fTtcblx0fVxufSApO1xuXG5cblxuXG4vLyBSZXR1cm4galF1ZXJ5IGZvciBhdHRyaWJ1dGVzLW9ubHkgaW5jbHVzaW9uXG5cblxudmFyIHJmb2N1c01vcnBoID0gL14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvLFxuXHRzdG9wUHJvcGFnYXRpb25DYWxsYmFjayA9IGZ1bmN0aW9uKCBlICkge1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH07XG5cbmpRdWVyeS5leHRlbmQoIGpRdWVyeS5ldmVudCwge1xuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzICkge1xuXG5cdFx0dmFyIGksIGN1ciwgdG1wLCBidWJibGVUeXBlLCBvbnR5cGUsIGhhbmRsZSwgc3BlY2lhbCwgbGFzdEVsZW1lbnQsXG5cdFx0XHRldmVudFBhdGggPSBbIGVsZW0gfHwgZG9jdW1lbnQgXSxcblx0XHRcdHR5cGUgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwidHlwZVwiICkgPyBldmVudC50eXBlIDogZXZlbnQsXG5cdFx0XHRuYW1lc3BhY2VzID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcIm5hbWVzcGFjZVwiICkgPyBldmVudC5uYW1lc3BhY2Uuc3BsaXQoIFwiLlwiICkgOiBbXTtcblxuXHRcdGN1ciA9IGxhc3RFbGVtZW50ID0gdG1wID0gZWxlbSA9IGVsZW0gfHwgZG9jdW1lbnQ7XG5cblx0XHQvLyBEb24ndCBkbyBldmVudHMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGZvY3VzL2JsdXIgbW9ycGhzIHRvIGZvY3VzaW4vb3V0OyBlbnN1cmUgd2UncmUgbm90IGZpcmluZyB0aGVtIHJpZ2h0IG5vd1xuXHRcdGlmICggcmZvY3VzTW9ycGgudGVzdCggdHlwZSArIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGUuaW5kZXhPZiggXCIuXCIgKSA+IC0xICkge1xuXG5cdFx0XHQvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXG5cdFx0XHRuYW1lc3BhY2VzID0gdHlwZS5zcGxpdCggXCIuXCIgKTtcblx0XHRcdHR5cGUgPSBuYW1lc3BhY2VzLnNoaWZ0KCk7XG5cdFx0XHRuYW1lc3BhY2VzLnNvcnQoKTtcblx0XHR9XG5cdFx0b250eXBlID0gdHlwZS5pbmRleE9mKCBcIjpcIiApIDwgMCAmJiBcIm9uXCIgKyB0eXBlO1xuXG5cdFx0Ly8gQ2FsbGVyIGNhbiBwYXNzIGluIGEgalF1ZXJ5LkV2ZW50IG9iamVjdCwgT2JqZWN0LCBvciBqdXN0IGFuIGV2ZW50IHR5cGUgc3RyaW5nXG5cdFx0ZXZlbnQgPSBldmVudFsgalF1ZXJ5LmV4cGFuZG8gXSA/XG5cdFx0XHRldmVudCA6XG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCB0eXBlLCB0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIgJiYgZXZlbnQgKTtcblxuXHRcdC8vIFRyaWdnZXIgYml0bWFzazogJiAxIGZvciBuYXRpdmUgaGFuZGxlcnM7ICYgMiBmb3IgalF1ZXJ5IChhbHdheXMgdHJ1ZSlcblx0XHRldmVudC5pc1RyaWdnZXIgPSBvbmx5SGFuZGxlcnMgPyAyIDogMztcblx0XHRldmVudC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiICk7XG5cdFx0ZXZlbnQucm5hbWVzcGFjZSA9IGV2ZW50Lm5hbWVzcGFjZSA/XG5cdFx0XHRuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKCBcIlxcXFwuKD86LipcXFxcLnwpXCIgKSArIFwiKFxcXFwufCQpXCIgKSA6XG5cdFx0XHRudWxsO1xuXG5cdFx0Ly8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXG5cdFx0ZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuXHRcdGlmICggIWV2ZW50LnRhcmdldCApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGVsZW07XG5cdFx0fVxuXG5cdFx0Ly8gQ2xvbmUgYW55IGluY29taW5nIGRhdGEgYW5kIHByZXBlbmQgdGhlIGV2ZW50LCBjcmVhdGluZyB0aGUgaGFuZGxlciBhcmcgbGlzdFxuXHRcdGRhdGEgPSBkYXRhID09IG51bGwgP1xuXHRcdFx0WyBldmVudCBdIDpcblx0XHRcdGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEsIFsgZXZlbnQgXSApO1xuXG5cdFx0Ly8gQWxsb3cgc3BlY2lhbCBldmVudHMgdG8gZHJhdyBvdXRzaWRlIHRoZSBsaW5lc1xuXHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiBzcGVjaWFsLnRyaWdnZXIgJiYgc3BlY2lhbC50cmlnZ2VyLmFwcGx5KCBlbGVtLCBkYXRhICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBldmVudCBwcm9wYWdhdGlvbiBwYXRoIGluIGFkdmFuY2UsIHBlciBXM0MgZXZlbnRzIHNwZWMgKCM5OTUxKVxuXHRcdC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFpc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcblx0XHRcdGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XG5cdFx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggY3VyICk7XG5cdFx0XHRcdHRtcCA9IGN1cjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG5cdFx0XHRpZiAoIHRtcCA9PT0gKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggY3VyID0gZXZlbnRQYXRoWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0bGFzdEVsZW1lbnQgPSBjdXI7XG5cdFx0XHRldmVudC50eXBlID0gaSA+IDEgP1xuXHRcdFx0XHRidWJibGVUeXBlIDpcblx0XHRcdFx0c3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBqUXVlcnkgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gKCBkYXRhUHJpdi5nZXQoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJlxuXHRcdFx0XHRkYXRhUHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBhY2NlcHREYXRhKCBjdXIgKSApIHtcblx0XHRcdFx0ZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZXZlbnQudHlwZSA9IHR5cGU7XG5cblx0XHQvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuXHRcdFx0aWYgKCAoICFzcGVjaWFsLl9kZWZhdWx0IHx8XG5cdFx0XHRcdHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSApICYmXG5cdFx0XHRcdGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGV2ZW50LlxuXHRcdFx0XHQvLyBEb24ndCBkbyBkZWZhdWx0IGFjdGlvbnMgb24gd2luZG93LCB0aGF0J3Mgd2hlcmUgZ2xvYmFsIHZhcmlhYmxlcyBiZSAoIzYxNzApXG5cdFx0XHRcdGlmICggb250eXBlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBlbGVtWyB0eXBlIF0gKSAmJiAhaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHR0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cblx0XHRcdFx0XHRpZiAoIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRcdFx0XHRsYXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBzdG9wUHJvcGFnYXRpb25DYWxsYmFjayApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW1bIHR5cGUgXSgpO1xuXG5cdFx0XHRcdFx0aWYgKCBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0XHRcdFx0bGFzdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgc3RvcFByb3BhZ2F0aW9uQ2FsbGJhY2sgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRcdFx0aWYgKCB0bXAgKSB7XG5cdFx0XHRcdFx0XHRlbGVtWyBvbnR5cGUgXSA9IHRtcDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQucmVzdWx0O1xuXHR9LFxuXG5cdC8vIFBpZ2d5YmFjayBvbiBhIGRvbm9yIGV2ZW50IHRvIHNpbXVsYXRlIGEgZGlmZmVyZW50IG9uZVxuXHQvLyBVc2VkIG9ubHkgZm9yIGBmb2N1cyhpbiB8IG91dClgIGV2ZW50c1xuXHRzaW11bGF0ZTogZnVuY3Rpb24oIHR5cGUsIGVsZW0sIGV2ZW50ICkge1xuXHRcdHZhciBlID0galF1ZXJ5LmV4dGVuZChcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoKSxcblx0XHRcdGV2ZW50LFxuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRpc1NpbXVsYXRlZDogdHJ1ZVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggZSwgbnVsbCwgZWxlbSApO1xuXHR9XG5cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIHR5cGUsIGRhdGEsIHRoaXMgKTtcblx0XHR9ICk7XG5cdH0sXG5cdHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXTtcblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmV2ZW50LnRyaWdnZXIoIHR5cGUsIGRhdGEsIGVsZW0sIHRydWUgKTtcblx0XHR9XG5cdH1cbn0gKTtcblxuXG5zdXBwb3J0LmZvY3VzaW4gPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG52YXJcblx0cmJyYWNrZXQgPSAvXFxbXFxdJC8sXG5cdHJDUkxGID0gL1xccj9cXG4vZyxcblx0cnN1Ym1pdHRlclR5cGVzID0gL14oPzpzdWJtaXR8YnV0dG9ufGltYWdlfHJlc2V0fGZpbGUpJC9pLFxuXHRyc3VibWl0dGFibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxrZXlnZW4pL2k7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFyYW1zKCBwcmVmaXgsIG9iaiwgdHJhZGl0aW9uYWwsIGFkZCApIHtcblx0dmFyIG5hbWU7XG5cblx0aWYgKCBBcnJheS5pc0FycmF5KCBvYmogKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBhcnJheSBpdGVtLlxuXHRcdGpRdWVyeS5lYWNoKCBvYmosIGZ1bmN0aW9uKCBpLCB2ICkge1xuXHRcdFx0aWYgKCB0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KCBwcmVmaXggKSApIHtcblxuXHRcdFx0XHQvLyBUcmVhdCBlYWNoIGFycmF5IGl0ZW0gYXMgYSBzY2FsYXIuXG5cdFx0XHRcdGFkZCggcHJlZml4LCB2ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gSXRlbSBpcyBub24tc2NhbGFyIChhcnJheSBvciBvYmplY3QpLCBlbmNvZGUgaXRzIG51bWVyaWMgaW5kZXguXG5cdFx0XHRcdGJ1aWxkUGFyYW1zKFxuXHRcdFx0XHRcdHByZWZpeCArIFwiW1wiICsgKCB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiAmJiB2ICE9IG51bGwgPyBpIDogXCJcIiApICsgXCJdXCIsXG5cdFx0XHRcdFx0dixcblx0XHRcdFx0XHR0cmFkaXRpb25hbCxcblx0XHRcdFx0XHRhZGRcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cblx0fSBlbHNlIGlmICggIXRyYWRpdGlvbmFsICYmIGpRdWVyeS50eXBlKCBvYmogKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqWyBuYW1lIF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cblx0XHRhZGQoIHByZWZpeCwgb2JqICk7XG5cdH1cbn1cblxuLy8gU2VyaWFsaXplIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMgb3IgYSBzZXQgb2Zcbi8vIGtleS92YWx1ZXMgaW50byBhIHF1ZXJ5IHN0cmluZ1xualF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuXHR2YXIgcHJlZml4LFxuXHRcdHMgPSBbXSxcblx0XHRhZGQgPSBmdW5jdGlvbigga2V5LCB2YWx1ZU9yRnVuY3Rpb24gKSB7XG5cblx0XHRcdC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgdXNlIGl0cyByZXR1cm4gdmFsdWVcblx0XHRcdHZhciB2YWx1ZSA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZU9yRnVuY3Rpb24gKSA/XG5cdFx0XHRcdHZhbHVlT3JGdW5jdGlvbigpIDpcblx0XHRcdFx0dmFsdWVPckZ1bmN0aW9uO1xuXG5cdFx0XHRzWyBzLmxlbmd0aCBdID0gZW5jb2RlVVJJQ29tcG9uZW50KCBrZXkgKSArIFwiPVwiICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KCB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICk7XG5cdFx0fTtcblxuXHQvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIGEgKSB8fCAoIGEuanF1ZXJ5ICYmICFqUXVlcnkuaXNQbGFpbk9iamVjdCggYSApICkgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgdGhlIGZvcm0gZWxlbWVudHNcblx0XHRqUXVlcnkuZWFjaCggYSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRhZGQoIHRoaXMubmFtZSwgdGhpcy52YWx1ZSApO1xuXHRcdH0gKTtcblxuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gSWYgdHJhZGl0aW9uYWwsIGVuY29kZSB0aGUgXCJvbGRcIiB3YXkgKHRoZSB3YXkgMS4zLjIgb3Igb2xkZXJcblx0XHQvLyBkaWQgaXQpLCBvdGhlcndpc2UgZW5jb2RlIHBhcmFtcyByZWN1cnNpdmVseS5cblx0XHRmb3IgKCBwcmVmaXggaW4gYSApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXgsIGFbIHByZWZpeCBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSByZXN1bHRpbmcgc2VyaWFsaXphdGlvblxuXHRyZXR1cm4gcy5qb2luKCBcIiZcIiApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRzZXJpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnkucGFyYW0oIHRoaXMuc2VyaWFsaXplQXJyYXkoKSApO1xuXHR9LFxuXHRzZXJpYWxpemVBcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gQ2FuIGFkZCBwcm9wSG9vayBmb3IgXCJlbGVtZW50c1wiIHRvIGZpbHRlciBvciBhZGQgZm9ybSBlbGVtZW50c1xuXHRcdFx0dmFyIGVsZW1lbnRzID0galF1ZXJ5LnByb3AoIHRoaXMsIFwiZWxlbWVudHNcIiApO1xuXHRcdFx0cmV0dXJuIGVsZW1lbnRzID8galF1ZXJ5Lm1ha2VBcnJheSggZWxlbWVudHMgKSA6IHRoaXM7XG5cdFx0fSApXG5cdFx0LmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdHlwZSA9IHRoaXMudHlwZTtcblxuXHRcdFx0Ly8gVXNlIC5pcyggXCI6ZGlzYWJsZWRcIiApIHNvIHRoYXQgZmllbGRzZXRbZGlzYWJsZWRdIHdvcmtzXG5cdFx0XHRyZXR1cm4gdGhpcy5uYW1lICYmICFqUXVlcnkoIHRoaXMgKS5pcyggXCI6ZGlzYWJsZWRcIiApICYmXG5cdFx0XHRcdHJzdWJtaXR0YWJsZS50ZXN0KCB0aGlzLm5vZGVOYW1lICkgJiYgIXJzdWJtaXR0ZXJUeXBlcy50ZXN0KCB0eXBlICkgJiZcblx0XHRcdFx0KCB0aGlzLmNoZWNrZWQgfHwgIXJjaGVja2FibGVUeXBlLnRlc3QoIHR5cGUgKSApO1xuXHRcdH0gKVxuXHRcdC5tYXAoIGZ1bmN0aW9uKCBpLCBlbGVtICkge1xuXHRcdFx0dmFyIHZhbCA9IGpRdWVyeSggdGhpcyApLnZhbCgpO1xuXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdFx0XHRyZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0fSApLmdldCgpO1xuXHR9XG59ICk7XG5cblxuLy8gU3VwcG9ydDogU2FmYXJpIDggb25seVxuLy8gSW4gU2FmYXJpIDggZG9jdW1lbnRzIGNyZWF0ZWQgdmlhIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudFxuLy8gY29sbGFwc2Ugc2libGluZyBmb3JtczogdGhlIHNlY29uZCBvbmUgYmVjb21lcyBhIGNoaWxkIG9mIHRoZSBmaXJzdCBvbmUuXG4vLyBCZWNhdXNlIG9mIHRoYXQsIHRoaXMgc2VjdXJpdHkgbWVhc3VyZSBoYXMgdG8gYmUgZGlzYWJsZWQgaW4gU2FmYXJpIDguXG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3MzM3XG5zdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCA9ICggZnVuY3Rpb24oKSB7XG5cdHZhciBib2R5ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICkuYm9keTtcblx0Ym9keS5pbm5lckhUTUwgPSBcIjxmb3JtPjwvZm9ybT48Zm9ybT48L2Zvcm0+XCI7XG5cdHJldHVybiBib2R5LmNoaWxkTm9kZXMubGVuZ3RoID09PSAyO1xufSApKCk7XG5cblxuLy8gQXJndW1lbnQgXCJkYXRhXCIgc2hvdWxkIGJlIHN0cmluZyBvZiBodG1sXG4vLyBjb250ZXh0IChvcHRpb25hbCk6IElmIHNwZWNpZmllZCwgdGhlIGZyYWdtZW50IHdpbGwgYmUgY3JlYXRlZCBpbiB0aGlzIGNvbnRleHQsXG4vLyBkZWZhdWx0cyB0byBkb2N1bWVudFxuLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xualF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcblx0aWYgKCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0a2VlcFNjcmlwdHMgPSBjb250ZXh0O1xuXHRcdGNvbnRleHQgPSBmYWxzZTtcblx0fVxuXG5cdHZhciBiYXNlLCBwYXJzZWQsIHNjcmlwdHM7XG5cblx0aWYgKCAhY29udGV4dCApIHtcblxuXHRcdC8vIFN0b3Agc2NyaXB0cyBvciBpbmxpbmUgZXZlbnQgaGFuZGxlcnMgZnJvbSBiZWluZyBleGVjdXRlZCBpbW1lZGlhdGVseVxuXHRcdC8vIGJ5IHVzaW5nIGRvY3VtZW50LmltcGxlbWVudGF0aW9uXG5cdFx0aWYgKCBzdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCApIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoIFwiXCIgKTtcblxuXHRcdFx0Ly8gU2V0IHRoZSBiYXNlIGhyZWYgZm9yIHRoZSBjcmVhdGVkIGRvY3VtZW50XG5cdFx0XHQvLyBzbyBhbnkgcGFyc2VkIGVsZW1lbnRzIHdpdGggVVJMc1xuXHRcdFx0Ly8gYXJlIGJhc2VkIG9uIHRoZSBkb2N1bWVudCdzIFVSTCAoZ2gtMjk2NSlcblx0XHRcdGJhc2UgPSBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIFwiYmFzZVwiICk7XG5cdFx0XHRiYXNlLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuXHRcdFx0Y29udGV4dC5oZWFkLmFwcGVuZENoaWxkKCBiYXNlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudDtcblx0XHR9XG5cdH1cblxuXHRwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKTtcblx0c2NyaXB0cyA9ICFrZWVwU2NyaXB0cyAmJiBbXTtcblxuXHQvLyBTaW5nbGUgdGFnXG5cdGlmICggcGFyc2VkICkge1xuXHRcdHJldHVybiBbIGNvbnRleHQuY3JlYXRlRWxlbWVudCggcGFyc2VkWyAxIF0gKSBdO1xuXHR9XG5cblx0cGFyc2VkID0gYnVpbGRGcmFnbWVudCggWyBkYXRhIF0sIGNvbnRleHQsIHNjcmlwdHMgKTtcblxuXHRpZiAoIHNjcmlwdHMgJiYgc2NyaXB0cy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5KCBzY3JpcHRzICkucmVtb3ZlKCk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgcGFyc2VkLmNoaWxkTm9kZXMgKTtcbn07XG5cblxualF1ZXJ5Lm9mZnNldCA9IHtcblx0c2V0T2Zmc2V0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgaSApIHtcblx0XHR2YXIgY3VyUG9zaXRpb24sIGN1ckxlZnQsIGN1ckNTU1RvcCwgY3VyVG9wLCBjdXJPZmZzZXQsIGN1ckNTU0xlZnQsIGNhbGN1bGF0ZVBvc2l0aW9uLFxuXHRcdFx0cG9zaXRpb24gPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSxcblx0XHRcdGN1ckVsZW0gPSBqUXVlcnkoIGVsZW0gKSxcblx0XHRcdHByb3BzID0ge307XG5cblx0XHQvLyBTZXQgcG9zaXRpb24gZmlyc3QsIGluLWNhc2UgdG9wL2xlZnQgYXJlIHNldCBldmVuIG9uIHN0YXRpYyBlbGVtXG5cdFx0aWYgKCBwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdGVsZW0uc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cdFx0fVxuXG5cdFx0Y3VyT2Zmc2V0ID0gY3VyRWxlbS5vZmZzZXQoKTtcblx0XHRjdXJDU1NUb3AgPSBqUXVlcnkuY3NzKCBlbGVtLCBcInRvcFwiICk7XG5cdFx0Y3VyQ1NTTGVmdCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwibGVmdFwiICk7XG5cdFx0Y2FsY3VsYXRlUG9zaXRpb24gPSAoIHBvc2l0aW9uID09PSBcImFic29sdXRlXCIgfHwgcG9zaXRpb24gPT09IFwiZml4ZWRcIiApICYmXG5cdFx0XHQoIGN1ckNTU1RvcCArIGN1ckNTU0xlZnQgKS5pbmRleE9mKCBcImF1dG9cIiApID4gLTE7XG5cblx0XHQvLyBOZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlclxuXHRcdC8vIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuXHRcdGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG5cdFx0XHRjdXJQb3NpdGlvbiA9IGN1ckVsZW0ucG9zaXRpb24oKTtcblx0XHRcdGN1clRvcCA9IGN1clBvc2l0aW9uLnRvcDtcblx0XHRcdGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1clRvcCA9IHBhcnNlRmxvYXQoIGN1ckNTU1RvcCApIHx8IDA7XG5cdFx0XHRjdXJMZWZ0ID0gcGFyc2VGbG9hdCggY3VyQ1NTTGVmdCApIHx8IDA7XG5cdFx0fVxuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0aW9ucyApICkge1xuXG5cdFx0XHQvLyBVc2UgalF1ZXJ5LmV4dGVuZCBoZXJlIHRvIGFsbG93IG1vZGlmaWNhdGlvbiBvZiBjb29yZGluYXRlcyBhcmd1bWVudCAoZ2gtMTg0OClcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGpRdWVyeS5leHRlbmQoIHt9LCBjdXJPZmZzZXQgKSApO1xuXHRcdH1cblxuXHRcdGlmICggb3B0aW9ucy50b3AgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLnRvcCA9ICggb3B0aW9ucy50b3AgLSBjdXJPZmZzZXQudG9wICkgKyBjdXJUb3A7XG5cdFx0fVxuXHRcdGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy5sZWZ0ID0gKCBvcHRpb25zLmxlZnQgLSBjdXJPZmZzZXQubGVmdCApICsgY3VyTGVmdDtcblx0XHR9XG5cblx0XHRpZiAoIFwidXNpbmdcIiBpbiBvcHRpb25zICkge1xuXHRcdFx0b3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1ckVsZW0uY3NzKCBwcm9wcyApO1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdC8vIG9mZnNldCgpIHJlbGF0ZXMgYW4gZWxlbWVudCdzIGJvcmRlciBib3ggdG8gdGhlIGRvY3VtZW50IG9yaWdpblxuXHRvZmZzZXQ6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdFx0Ly8gUHJlc2VydmUgY2hhaW5pbmcgZm9yIHNldHRlclxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiBvcHRpb25zID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHR0aGlzIDpcblx0XHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0XHRqUXVlcnkub2Zmc2V0LnNldE9mZnNldCggdGhpcywgb3B0aW9ucywgaSApO1xuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlY3QsIHdpbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF07XG5cblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB6ZXJvcyBmb3IgZGlzY29ubmVjdGVkIGFuZCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpIGVsZW1lbnRzIChnaC0yMzEwKVxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHRcdC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGFcblx0XHQvLyBkaXNjb25uZWN0ZWQgbm9kZSBpbiBJRSB0aHJvd3MgYW4gZXJyb3Jcblx0XHRpZiAoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IGRvY3VtZW50LXJlbGF0aXZlIHBvc2l0aW9uIGJ5IGFkZGluZyB2aWV3cG9ydCBzY3JvbGwgdG8gdmlld3BvcnQtcmVsYXRpdmUgZ0JDUlxuXHRcdHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdHdpbiA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldztcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiByZWN0LnRvcCArIHdpbi5wYWdlWU9mZnNldCxcblx0XHRcdGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldFxuXHRcdH07XG5cdH0sXG5cblx0Ly8gcG9zaXRpb24oKSByZWxhdGVzIGFuIGVsZW1lbnQncyBtYXJnaW4gYm94IHRvIGl0cyBvZmZzZXQgcGFyZW50J3MgcGFkZGluZyBib3hcblx0Ly8gVGhpcyBjb3JyZXNwb25kcyB0byB0aGUgYmVoYXZpb3Igb2YgQ1NTIGFic29sdXRlIHBvc2l0aW9uaW5nXG5cdHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICF0aGlzWyAwIF0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIG9mZnNldFBhcmVudCwgb2Zmc2V0LCBkb2MsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0cGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblxuXHRcdC8vIHBvc2l0aW9uOmZpeGVkIGVsZW1lbnRzIGFyZSBvZmZzZXQgZnJvbSB0aGUgdmlld3BvcnQsIHdoaWNoIGl0c2VsZiBhbHdheXMgaGFzIHplcm8gb2Zmc2V0XG5cdFx0aWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJmaXhlZFwiICkge1xuXG5cdFx0XHQvLyBBc3N1bWUgcG9zaXRpb246Zml4ZWQgaW1wbGllcyBhdmFpbGFiaWxpdHkgb2YgZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG5cdFx0XHRvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XG5cblx0XHRcdC8vIEFjY291bnQgZm9yIHRoZSAqcmVhbCogb2Zmc2V0IHBhcmVudCwgd2hpY2ggY2FuIGJlIHRoZSBkb2N1bWVudCBvciBpdHMgcm9vdCBlbGVtZW50XG5cdFx0XHQvLyB3aGVuIGEgc3RhdGljYWxseSBwb3NpdGlvbmVkIGVsZW1lbnQgaXMgaWRlbnRpZmllZFxuXHRcdFx0ZG9jID0gZWxlbS5vd25lckRvY3VtZW50O1xuXHRcdFx0b2Zmc2V0UGFyZW50ID0gZWxlbS5vZmZzZXRQYXJlbnQgfHwgZG9jLmRvY3VtZW50RWxlbWVudDtcblx0XHRcdHdoaWxlICggb2Zmc2V0UGFyZW50ICYmXG5cdFx0XHRcdCggb2Zmc2V0UGFyZW50ID09PSBkb2MuYm9keSB8fCBvZmZzZXRQYXJlbnQgPT09IGRvYy5kb2N1bWVudEVsZW1lbnQgKSAmJlxuXHRcdFx0XHRqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkge1xuXG5cdFx0XHRcdG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBvZmZzZXRQYXJlbnQgJiYgb2Zmc2V0UGFyZW50ICE9PSBlbGVtICYmIG9mZnNldFBhcmVudC5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBJbmNvcnBvcmF0ZSBib3JkZXJzIGludG8gaXRzIG9mZnNldCwgc2luY2UgdGhleSBhcmUgb3V0c2lkZSBpdHMgY29udGVudCBvcmlnaW5cblx0XHRcdFx0cGFyZW50T2Zmc2V0ID0galF1ZXJ5KCBvZmZzZXRQYXJlbnQgKS5vZmZzZXQoKTtcblx0XHRcdFx0cGFyZW50T2Zmc2V0LnRvcCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwiYm9yZGVyVG9wV2lkdGhcIiwgdHJ1ZSApO1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQubGVmdCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwiYm9yZGVyTGVmdFdpZHRoXCIsIHRydWUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTdWJ0cmFjdCBwYXJlbnQgb2Zmc2V0cyBhbmQgZWxlbWVudCBtYXJnaW5zXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogb2Zmc2V0LnRvcCAtIHBhcmVudE9mZnNldC50b3AgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpblRvcFwiLCB0cnVlICksXG5cdFx0XHRsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0IC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIsIHRydWUgKVxuXHRcdH07XG5cdH0sXG5cblx0Ly8gVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gZG9jdW1lbnRFbGVtZW50IGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6XG5cdC8vIDEpIEZvciB0aGUgZWxlbWVudCBpbnNpZGUgdGhlIGlmcmFtZSB3aXRob3V0IG9mZnNldFBhcmVudCwgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm5cblx0Ly8gICAgZG9jdW1lbnRFbGVtZW50IG9mIHRoZSBwYXJlbnQgd2luZG93XG5cdC8vIDIpIEZvciB0aGUgaGlkZGVuIG9yIGRldGFjaGVkIGVsZW1lbnRcblx0Ly8gMykgRm9yIGJvZHkgb3IgaHRtbCBlbGVtZW50LCBpLmUuIGluIGNhc2Ugb2YgdGhlIGh0bWwgbm9kZSAtIGl0IHdpbGwgcmV0dXJuIGl0c2VsZlxuXHQvL1xuXHQvLyBidXQgdGhvc2UgZXhjZXB0aW9ucyB3ZXJlIG5ldmVyIHByZXNlbnRlZCBhcyBhIHJlYWwgbGlmZSB1c2UtY2FzZXNcblx0Ly8gYW5kIG1pZ2h0IGJlIGNvbnNpZGVyZWQgYXMgbW9yZSBwcmVmZXJhYmxlIHJlc3VsdHMuXG5cdC8vXG5cdC8vIFRoaXMgbG9naWMsIGhvd2V2ZXIsIGlzIG5vdCBndWFyYW50ZWVkIGFuZCBjYW4gY2hhbmdlIGF0IGFueSBwb2ludCBpbiB0aGUgZnV0dXJlXG5cdG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudDtcblxuXHRcdFx0d2hpbGUgKCBvZmZzZXRQYXJlbnQgJiYgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2N1bWVudEVsZW1lbnQ7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbi8vIENyZWF0ZSBzY3JvbGxMZWZ0IGFuZCBzY3JvbGxUb3AgbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuXHR2YXIgdG9wID0gXCJwYWdlWU9mZnNldFwiID09PSBwcm9wO1xuXG5cdGpRdWVyeS5mblsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdmFsICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBtZXRob2QsIHZhbCApIHtcblxuXHRcdFx0Ly8gQ29hbGVzY2UgZG9jdW1lbnRzIGFuZCB3aW5kb3dzXG5cdFx0XHR2YXIgd2luO1xuXHRcdFx0aWYgKCBpc1dpbmRvdyggZWxlbSApICkge1xuXHRcdFx0XHR3aW4gPSBlbGVtO1xuXHRcdFx0fSBlbHNlIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0d2luID0gZWxlbS5kZWZhdWx0Vmlldztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHdpbiA/IHdpblsgcHJvcCBdIDogZWxlbVsgbWV0aG9kIF07XG5cdFx0XHR9XG5cblx0XHRcdGlmICggd2luICkge1xuXHRcdFx0XHR3aW4uc2Nyb2xsVG8oXG5cdFx0XHRcdFx0IXRvcCA/IHZhbCA6IHdpbi5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHR0b3AgPyB2YWwgOiB3aW4ucGFnZVlPZmZzZXRcblx0XHRcdFx0KTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbVsgbWV0aG9kIF0gPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSwgbWV0aG9kLCB2YWwsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fTtcbn0gKTtcblxuLy8gU3VwcG9ydDogU2FmYXJpIDw9NyAtIDkuMSwgQ2hyb21lIDw9MzcgLSA0OVxuLy8gQWRkIHRoZSB0b3AvbGVmdCBjc3NIb29rcyB1c2luZyBqUXVlcnkuZm4ucG9zaXRpb25cbi8vIFdlYmtpdCBidWc6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTA4NFxuLy8gQmxpbmsgYnVnOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD01ODkzNDdcbi8vIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBwZXJjZW50IHdoZW4gc3BlY2lmaWVkIGZvciB0b3AvbGVmdC9ib3R0b20vcmlnaHQ7XG4vLyByYXRoZXIgdGhhbiBtYWtlIHRoZSBjc3MgbW9kdWxlIGRlcGVuZCBvbiB0aGUgb2Zmc2V0IG1vZHVsZSwganVzdCBjaGVjayBmb3IgaXQgaGVyZVxualF1ZXJ5LmVhY2goIFsgXCJ0b3BcIiwgXCJsZWZ0XCIgXSwgZnVuY3Rpb24oIGksIHByb3AgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJvcCBdID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnBpeGVsUG9zaXRpb24sXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdFx0Y29tcHV0ZWQgPSBjdXJDU1MoIGVsZW0sIHByb3AgKTtcblxuXHRcdFx0XHQvLyBJZiBjdXJDU1MgcmV0dXJucyBwZXJjZW50YWdlLCBmYWxsYmFjayB0byBvZmZzZXRcblx0XHRcdFx0cmV0dXJuIHJudW1ub25weC50ZXN0KCBjb21wdXRlZCApID9cblx0XHRcdFx0XHRqUXVlcnkoIGVsZW0gKS5wb3NpdGlvbigpWyBwcm9wIF0gKyBcInB4XCIgOlxuXHRcdFx0XHRcdGNvbXB1dGVkO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcbn0gKTtcblxuXG4vLyBDcmVhdGUgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGgsIGhlaWdodCwgd2lkdGgsIG91dGVySGVpZ2h0IGFuZCBvdXRlcldpZHRoIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IEhlaWdodDogXCJoZWlnaHRcIiwgV2lkdGg6IFwid2lkdGhcIiB9LCBmdW5jdGlvbiggbmFtZSwgdHlwZSApIHtcblx0alF1ZXJ5LmVhY2goIHsgcGFkZGluZzogXCJpbm5lclwiICsgbmFtZSwgY29udGVudDogdHlwZSwgXCJcIjogXCJvdXRlclwiICsgbmFtZSB9LFxuXHRcdGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuXG5cdFx0Ly8gTWFyZ2luIGlzIG9ubHkgZm9yIG91dGVySGVpZ2h0LCBvdXRlcldpZHRoXG5cdFx0alF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuXHRcdFx0XHRleHRyYSA9IGRlZmF1bHRFeHRyYSB8fCAoIG1hcmdpbiA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdHJ1ZSA/IFwibWFyZ2luXCIgOiBcImJvcmRlclwiICk7XG5cblx0XHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIGRvYztcblxuXHRcdFx0XHRpZiAoIGlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyAkKCB3aW5kb3cgKS5vdXRlcldpZHRoL0hlaWdodCByZXR1cm4gdy9oIGluY2x1ZGluZyBzY3JvbGxiYXJzIChnaC0xNzI5KVxuXHRcdFx0XHRcdHJldHVybiBmdW5jTmFtZS5pbmRleE9mKCBcIm91dGVyXCIgKSA9PT0gMCA/XG5cdFx0XHRcdFx0XHRlbGVtWyBcImlubmVyXCIgKyBuYW1lIF0gOlxuXHRcdFx0XHRcdFx0ZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSxcblx0XHRcdFx0XHQvLyB3aGljaGV2ZXIgaXMgZ3JlYXRlc3Rcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwic2Nyb2xsXCIgKyBuYW1lIF0sIGRvY1sgXCJzY3JvbGxcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJvZmZzZXRcIiArIG5hbWUgXSwgZG9jWyBcIm9mZnNldFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblxuXHRcdFx0XHRcdC8vIEdldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnQsIHJlcXVlc3RpbmcgYnV0IG5vdCBmb3JjaW5nIHBhcnNlRmxvYXRcblx0XHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcblxuXHRcdFx0XHRcdC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSApO1xuXHRcdFx0fSwgdHlwZSwgY2hhaW5hYmxlID8gbWFyZ2luIDogdW5kZWZpbmVkLCBjaGFpbmFibGUgKTtcblx0XHR9O1xuXHR9ICk7XG59ICk7XG5cblxuLy8gUmVnaXN0ZXIgYXMgYSBuYW1lZCBBTUQgbW9kdWxlLCBzaW5jZSBqUXVlcnkgY2FuIGJlIGNvbmNhdGVuYXRlZCB3aXRoIG90aGVyXG4vLyBmaWxlcyB0aGF0IG1heSB1c2UgZGVmaW5lLCBidXQgbm90IHZpYSBhIHByb3BlciBjb25jYXRlbmF0aW9uIHNjcmlwdCB0aGF0XG4vLyB1bmRlcnN0YW5kcyBhbm9ueW1vdXMgQU1EIG1vZHVsZXMuIEEgbmFtZWQgQU1EIGlzIHNhZmVzdCBhbmQgbW9zdCByb2J1c3Rcbi8vIHdheSB0byByZWdpc3Rlci4gTG93ZXJjYXNlIGpxdWVyeSBpcyB1c2VkIGJlY2F1c2UgQU1EIG1vZHVsZSBuYW1lcyBhcmVcbi8vIGRlcml2ZWQgZnJvbSBmaWxlIG5hbWVzLCBhbmQgalF1ZXJ5IGlzIG5vcm1hbGx5IGRlbGl2ZXJlZCBpbiBhIGxvd2VyY2FzZVxuLy8gZmlsZSBuYW1lLiBEbyB0aGlzIGFmdGVyIGNyZWF0aW5nIHRoZSBnbG9iYWwgc28gdGhhdCBpZiBhbiBBTUQgbW9kdWxlIHdhbnRzXG4vLyB0byBjYWxsIG5vQ29uZmxpY3QgdG8gaGlkZSB0aGlzIHZlcnNpb24gb2YgalF1ZXJ5LCBpdCB3aWxsIHdvcmsuXG5cbi8vIE5vdGUgdGhhdCBmb3IgbWF4aW11bSBwb3J0YWJpbGl0eSwgbGlicmFyaWVzIHRoYXQgYXJlIG5vdCBqUXVlcnkgc2hvdWxkXG4vLyBkZWNsYXJlIHRoZW1zZWx2ZXMgYXMgYW5vbnltb3VzIG1vZHVsZXMsIGFuZCBhdm9pZCBzZXR0aW5nIGEgZ2xvYmFsIGlmIGFuXG4vLyBBTUQgbG9hZGVyIGlzIHByZXNlbnQuIGpRdWVyeSBpcyBhIHNwZWNpYWwgY2FzZS4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pyYnVya2UvcmVxdWlyZWpzL3dpa2kvVXBkYXRpbmctZXhpc3RpbmctbGlicmFyaWVzI3dpa2ktYW5vblxuXG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRkZWZpbmUoIFwianF1ZXJ5XCIsIFtdLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4galF1ZXJ5O1xuXHR9ICk7XG59XG5cblxuXG5cbnZhclxuXG5cdC8vIE1hcCBvdmVyIGpRdWVyeSBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfalF1ZXJ5ID0gd2luZG93LmpRdWVyeSxcblxuXHQvLyBNYXAgb3ZlciB0aGUgJCBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfJCA9IHdpbmRvdy4kO1xuXG5qUXVlcnkubm9Db25mbGljdCA9IGZ1bmN0aW9uKCBkZWVwICkge1xuXHRpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LiQgPSBfJDtcblx0fVxuXG5cdGlmICggZGVlcCAmJiB3aW5kb3cualF1ZXJ5ID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LmpRdWVyeSA9IF9qUXVlcnk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5O1xufTtcblxuLy8gRXhwb3NlIGpRdWVyeSBhbmQgJCBpZGVudGlmaWVycywgZXZlbiBpbiBBTURcbi8vICgjNzEwMiNjb21tZW50OjEwLCBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzU1Nylcbi8vIGFuZCBDb21tb25KUyBmb3IgYnJvd3NlciBlbXVsYXRvcnMgKCMxMzU2NilcbmlmICggIW5vR2xvYmFsICkge1xuXHR3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG59XG5cblxuXG5cblxudmFyIHJlYWR5Q2FsbGJhY2tzID0gW10sXG5cdHdoZW5SZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRyZWFkeUNhbGxiYWNrcy5wdXNoKCBmbiApO1xuXHR9LFxuXHRleGVjdXRlUmVhZHkgPSBmdW5jdGlvbiggZm4gKSB7XG5cblx0XHQvLyBQcmV2ZW50IGVycm9ycyBmcm9tIGZyZWV6aW5nIGZ1dHVyZSBjYWxsYmFjayBleGVjdXRpb24gKGdoLTE4MjMpXG5cdFx0Ly8gTm90IGJhY2t3YXJkcy1jb21wYXRpYmxlIGFzIHRoaXMgZG9lcyBub3QgZXhlY3V0ZSBzeW5jXG5cdFx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0Zm4uY2FsbCggZG9jdW1lbnQsIGpRdWVyeSApO1xuXHRcdH0gKTtcblx0fTtcblxualF1ZXJ5LmZuLnJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuXHR3aGVuUmVhZHkoIGZuICk7XG5cdHJldHVybiB0aGlzO1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIElzIHRoZSBET00gcmVhZHkgdG8gYmUgdXNlZD8gU2V0IHRvIHRydWUgb25jZSBpdCBvY2N1cnMuXG5cdGlzUmVhZHk6IGZhbHNlLFxuXG5cdC8vIEEgY291bnRlciB0byB0cmFjayBob3cgbWFueSBpdGVtcyB0byB3YWl0IGZvciBiZWZvcmVcblx0Ly8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcblx0cmVhZHlXYWl0OiAxLFxuXG5cdHJlYWR5OiBmdW5jdGlvbiggd2FpdCApIHtcblxuXHRcdC8vIEFib3J0IGlmIHRoZXJlIGFyZSBwZW5kaW5nIGhvbGRzIG9yIHdlJ3JlIGFscmVhZHkgcmVhZHlcblx0XHRpZiAoIHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZW1lbWJlciB0aGF0IHRoZSBET00gaXMgcmVhZHlcblx0XHRqUXVlcnkuaXNSZWFkeSA9IHRydWU7XG5cblx0XHQvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxuXHRcdGlmICggd2FpdCAhPT0gdHJ1ZSAmJiAtLWpRdWVyeS5yZWFkeVdhaXQgPiAwICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHdoZW5SZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdHJlYWR5Q2FsbGJhY2tzLnB1c2goIGZuICk7XG5cblx0XHRcdHdoaWxlICggcmVhZHlDYWxsYmFja3MubGVuZ3RoICkge1xuXHRcdFx0XHRmbiA9IHJlYWR5Q2FsbGJhY2tzLnNoaWZ0KCk7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRcdFx0ZXhlY3V0ZVJlYWR5KCBmbiApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHdoZW5SZWFkeSgpO1xuXHR9XG59ICk7XG5cbi8vIE1ha2UgalF1ZXJ5LnJlYWR5IFByb21pc2UgY29uc3VtYWJsZSAoZ2gtMTc3OClcbmpRdWVyeS5yZWFkeS50aGVuID0galF1ZXJ5LmZuLnJlYWR5O1xuXG4vKipcbiAqIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xuXHRqUXVlcnkucmVhZHkoKTtcbn1cblxuLy8gQ2F0Y2ggY2FzZXMgd2hlcmUgJChkb2N1bWVudCkucmVhZHkoKSBpcyBjYWxsZWRcbi8vIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuLy8gU3VwcG9ydDogSUU5LTEwIG9ubHlcbi8vIE9sZGVyIElFIHNvbWV0aW1lcyBzaWduYWxzIFwiaW50ZXJhY3RpdmVcIiB0b28gc29vblxuaWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHxcblx0KCBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIiAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsICkgKSB7XG5cblx0Ly8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IHJlYWR5XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBqUXVlcnkucmVhZHkgKTtcblxufSBlbHNlIHtcblxuXHQvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblxuXHQvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xufVxuXG5cblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pxbWluL2pxdWVyeS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IiwiaW1wb3J0ICQgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vc3JjL0FYNlV0aWxcIjtcblxuXG5sZXQgJGVsID0gJCgnPGRpdiBpZD1cInRlc3QtdGFyZ2V0XCI+PC9kaXY+Jyk7XG5cbi8vJGVsLmFwcGVuZCgnPHA+JyArIGluZm8gKyAnPC9wPicpO1xuXG5mdW5jdGlvbiBkZXNjcmliZShzdGF0ZSwgZm4pIHtcbiAgLy8gY29uc29sZS5sb2coc3RhdGUpO1xuICAkZWwuYXBwZW5kKCc8aDI+JyArIHN0YXRlICsgJzwvaDI+Jyk7XG4gICRlbC5hcHBlbmQoJzxkaXY+Jyk7XG4gIGZuKCk7XG4gICRlbC5hcHBlbmQoJzwvZGl2PicpO1xufVxuXG5mdW5jdGlvbiBpdChzdGF0ZSwgZm4pIHtcbiAgJGVsLmFwcGVuZCgnPHNwYW4+JyArIHN0YXRlICsgJzwvc3Bhbj4nKTtcblxuICBsZXQgcmVzdWx0ID0gZm4oZnVuY3Rpb24gKCkge1xuICAgICRlbC5hcHBlbmQoJzxzcGFuPiA6ICcgKyB1dGlsLnRvQXJyYXkoYXJndW1lbnRzKS5qb2luKFwiLFwiKSArICc8L3NwYW4+Jyk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2YgcmVzdWx0ICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAkZWwuYXBwZW5kKCc8cD4nICsgcmVzdWx0ICsgJzwvcD4nKTtcbiAgfVxuXG4gICRlbC5hcHBlbmQoJzxici8+Jyk7XG59XG5cbmZ1bmN0aW9uIGVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpIHtcblxuICBpZiAoYWN0dWFsLnRvU3RyaW5nKCkgPT0gZXhwZWN0ZWQudG9TdHJpbmcoKSkge1xuICAgIHJldHVybiBcIjxzcGFuIHN0eWxlPSdjb2xvcjpibHVlOyc+b2s8L3NwYW4+XCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiPHNwYW4gc3R5bGU9J2NvbG9yOnJlZDsnPm5vdCBlcXVhbCAoXCIgKyBhY3R1YWwgKyBcIixcIiArIGV4cGVjdGVkICsgXCIpPC9zcGFuPlwiO1xuICB9XG59XG5cblxuZGVzY3JpYmUoJ3V0aWwuZGF0ZSBURVNUJywgZnVuY3Rpb24gKCkge1xuICBpdCgndXRpbC5kYXRlKFwiMjAxMy0wMS0wMVwiKScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDEzLCAwLCAxKTtcbiAgICBkYXRlLnNldEhvdXJzKDEyKTtcbiAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoJzIwMTMtMDEtMDEnKSwgZGF0ZSkpO1xuICB9KTtcblxuXG4gIC8vVXNhZ2UgMDJcbiAgaXQoJ3V0aWwuZGF0ZSgobmV3IERhdGUoKSkgLCB7YWRkOntkOjEwfSAsIHJldHVybjpcInl5eXkvTU0vZGRcIn0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMTApO1xuICAgIHZhciBzdHIgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi9cIiArIHV0aWwuc2V0RGlnaXQoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyBcIi9cIiArIHV0aWwuc2V0RGlnaXQoZGF0ZS5nZXREYXRlKCksIDIpO1xuXG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoKG5ldyBEYXRlKCkpLCB7YWRkOiB7ZDogMTB9LCByZXR1cm46ICd5eXl5L01NL2RkJ30pLCBzdHIpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAwM1xuICBpdCgndXRpbC5kYXRlKFwiMTkxOS0wMy0wMVwiLCB7YWRkOntkOjEwfSwgcmV0dXJuOlwieXl5eS9NTS9kZCBoaDptbTpzc1wifSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMTkxOS0wMy0wMVwiLCB7XG4gICAgICBhZGQ6IHtkOiAxMH0sXG4gICAgICByZXR1cm46IFwieXl5eS9NTS9kZCBoaDptbTpzc1wiXG4gICAgfSksICcxOTE5LzAzLzExIDEyOjAwOjAwJykpO1xuICB9KTtcblxuICAvL1VzYWdlIDA0XG4gIGl0KCd1dGlsLmRhdGUoKG5ldyBEYXRlKCkpICwge3NldDpcImZpcnN0RGF5T2ZNb250aFwiLCByZXR1cm46XCJ5eXl5L01NL2RkXCJ9KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBzdHIgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi9cIiArIHV0aWwuc2V0RGlnaXQoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyBcIi8wMVwiO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKChuZXcgRGF0ZSgpKSwge3NldDogXCJmaXJzdERheU9mTW9udGhcIiwgcmV0dXJuOiAneXl5eS9NTS9kZCd9KSwgc3RyKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMDVcbiAgaXQoJ3V0aWwuZGF0ZSgobmV3IERhdGUoKSkgLCB7c2V0OlwibGFzdERheU9mTW9udGhcIiwgcmV0dXJuOlwieXl5eS9NTS9kZFwifSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICB2YXIgc3RyID0gZGF0ZS5nZXRGdWxsWWVhcigpICsgXCIvXCIgKyB1dGlsLnNldERpZ2l0KGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpICsgXCIvXCIgKyB1dGlsLmRheXNPZk1vbnRoKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZSgobmV3IERhdGUoKSksIHtzZXQ6IFwibGFzdERheU9mTW9udGhcIiwgcmV0dXJuOiAneXl5eS9NTS9kZCd9KSwgc3RyKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMDZcbiAgaXQoJ3V0aWwuZGF0ZShcIlwiKScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiXCIpLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMDdcbiAgaXQoJ3V0aWwuZGF0ZShcIjE5NzktMTItMTZUMDk6MDA6MDBcIikgW3N0cmluZy5sZW5ndGggPiAxNV0nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKDE5NzksIDExLCAxNik7XG4gICAgZGF0ZS5zZXRIb3Vycyg5LCAwLCAwLCAwKTtcblxuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMTk3OS0xMi0xNlQwOTowMDowMFwiKSwgZGF0ZSkpO1xuICB9KTtcblxuICAvL1VzYWdlIDA4XG4gIGl0KCd1dGlsLmRhdGUoXCIyMDE3MDQxMTEwMzMxN1wiKSBbc3RyaW5nLmxlbmd0aCA9PSAxNF0nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMywgMTEpO1xuICAgIGRhdGUuc2V0SG91cnMoMTApO1xuICAgIGRhdGUuc2V0TWludXRlcygzMyk7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKDE3KTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjIwMTcwNDExMTAzMzE3XCIpLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMDlcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTcwNFwiKSBbc3RyaW5nLmxlbmd0aCA+IDddJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDMsIDEyKTtcbiAgICBkYXRlLnNldEhvdXJzKDEyKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjIwMTcwNDEyXCIpLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMTBcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTcwNFwiKSBbc3RyaW5nLmxlbmd0aCA+IDRdJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDMpO1xuICAgIGRhdGUuc2V0SG91cnMoMTIpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNzA0XCIpLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMTFcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTdcIikgW3N0cmluZy5sZW5ndGggPiAyXScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDE3LCAwKTtcbiAgICBkYXRlLnNldEhvdXJzKDEyKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjIwMTdcIiksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAxMlxuICBpdCgndXRpbC5kYXRlKFwiMTdcIikgW3N0cmluZy5sZW5ndGggPD0gMl0nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjE3XCIpLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMTNcbiAgaXQoJ3V0aWwuZGF0ZShkYXRlLCB7cmV0dXJuOiBcInl5eXktTU0tZGRcIn0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDMsIDE2KTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShkYXRlLCB7cmV0dXJuOiBcInl5eXktTU0tZGRcIn0pLCBcIjIwMTctMDQtMTZcIikpO1xuICB9KTtcblxuICAvL1VzYWdlIDE0XG4gIGl0KCd1dGlsLmRhdGUoZGF0ZSwge3JldHVybjogXCJ5eXl5LU1NLWRkIGhoOm1tOnNzXCJ9KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDE3LCAzLCAxNiwgMTIsIDMwLCAxNSk7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoZGF0ZSwge3JldHVybjogXCJ5eXl5LU1NLWRkIGhoOm1tOnNzXCJ9KSwgXCIyMDE3LTA0LTE2IDEyOjMwOjE1XCIpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAxNVxuICBpdCgndXRpbC5kYXRlKGRhdGUsIHtyZXR1cm46IFwiZHdcIn0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDMsIDE2KTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShkYXRlLCB7cmV0dXJuOiBcImR3XCJ9KSwgXCJTVU5cIikpO1xuICB9KTtcblxuICAvL1VzYWdlIDE2XG4gIGl0KCd1dGlsLmRhdGUoXCIyMDE3LTA0LTE3IDExOjAwOjAwXCIsIHthZGQ6IHtoOiAxfX0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDMsIDE3LCAxMik7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIyMDE3LTA0LTE3IDExOjAwOjAwXCIsIHthZGQ6IHtoOiAxfX0pLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMTdcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTctMDQtMTcgMTE6MDA6MDBcIiwge2FkZDoge2g6IDF9fSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMywgMTcsIDEyKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjIwMTctMDQtMTcgMTE6MDA6MDBcIiwge2FkZDoge2g6IDF9fSksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAxOFxuICBpdCgndXRpbC5kYXRlKFwiMjAxNy0wNi0xNyAwMTo1NTowMFwiLCB7YWRkOiB7aDogMX19KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDE3LCA1LCAxNywgMiwgNTUpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNy0wNi0xNyAwMTo1NTowMFwiLCB7YWRkOiB7aDogMX19KSwgZGF0ZSkpO1xuICB9KTtcblxuICAvL1VzYWdlIDE5XG4gIGl0KCd1dGlsLmRhdGUoXCIyMDE3LTA0LTE2XCIsIHthZGQ6IHtkOiAxfX0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDMsIDE3LCAxMik7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIyMDE3LTA0LTE2XCIsIHthZGQ6IHtkOiAxfX0pLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMjBcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTctMDUtMTZcIiwge2FkZDoge206IDF9fSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgNSwgMTYsIDEyKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjIwMTctMDUtMTZcIiwge2FkZDoge206IDF9fSksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAyMVxuICBpdCgndXRpbC5kYXRlKFwiMjAxNy0wNC0yMlwiLCB7YWRkOiB7eTogMX19KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDE4LCAzLCAyMiwgMTIpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNy0wNC0yMlwiLCB7YWRkOiB7eTogMX19KSwgZGF0ZSkpO1xuICB9KTtcblxuICAvL1VzYWdlIDIyXG4gIGl0KCd1dGlsLmRhdGUoXCIyMDE2LTA0LTIzXCIsIHthZGQ6IHtkOiAxLjV9LCByZXR1cm46IFwiZGRcIn0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgc3RyID0gXCIyNVwiO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNi0wNC0yM1wiLCB7YWRkOiB7ZDogMS41fSwgcmV0dXJuOiBcImRkXCJ9KSwgc3RyKSk7XG4gIH0pO1xuXG4gIC8qIGVuZCB1dGlsLmRhdGUgKi9cblxufSk7XG5cbmRlc2NyaWJlKCd1dGlsLm51bWJlciBURVNUJywgZnVuY3Rpb24gKCkge1xuICB2YXIgdGVzdENhc2VzID0gW1xuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgMTIzNDU2Nzg5LjY3OCxcbiAgICAgICAge1xuICAgICAgICAgIHJvdW5kOiAxXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6IDEyMzQ1Njc4OS43LFxuICAgICAgZXhwbGFuYXRpb246IDEyMzQ1Njc4OS42NzggKyAnLCB7IHJvdW5kOiAxIH0nXG4gICAgfSxcbiAgICB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIDEyMzQ1Njc4OS42NzgsXG4gICAgICAgIHtcbiAgICAgICAgICByb3VuZDogMSxcbiAgICAgICAgICBtb25leTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnMTIzLDQ1Niw3ODkuNycsXG4gICAgICBleHBsYW5hdGlvbjogMTIzNDU2Nzg5LjY3OCArICcsIHsgcm91bmQ6IDEsIG1vbmV5OiB0cnVlIH0nXG4gICAgfSxcbiAgICB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIDEyMzQ1Njc4OS42NzgsXG4gICAgICAgIHtcbiAgICAgICAgICByb3VuZDogMixcbiAgICAgICAgICBieXRlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6ICcxMTcuN01CJyxcbiAgICAgIGV4cGxhbmF0aW9uOiAxMjM0NTY3ODkuNjc4ICsgJywgeyByb3VuZDogMiwgYnl0ZTogdHJ1ZSB9J1xuICAgIH0sXG4gICAge1xuICAgICAgYXJnczogW1xuICAgICAgICAtMTIzNDU2Nzg5LjY3OCxcbiAgICAgICAge1xuICAgICAgICAgIGFiczogdHJ1ZSxcbiAgICAgICAgICByb3VuZDogMixcbiAgICAgICAgICBtb25leTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnMTIzLDQ1Niw3ODkuNjgnLFxuICAgICAgZXhwbGFuYXRpb246IC0xMjM0NTY3ODkuNjc4ICsgJyx7IGFiczogdHJ1ZSwgcm91bmQ6IDIsIG1vbmV5OiB0cnVlIH0nXG4gICAgfSxcbiAgICB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIC0xMjM0NTY3ODkuNjc4LFxuICAgICAgICB7XG4gICAgICAgICAgYWJzOiB0cnVlLFxuICAgICAgICAgIGNlaWw6IHRydWUsXG4gICAgICAgICAgbW9uZXk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogJzEyMyw0NTYsNzkwJyxcbiAgICAgIGV4cGxhbmF0aW9uOiAtMTIzNDU2Nzg5LjY3OCArICcseyBhYnM6IHRydWUsIGNlaWw6IHRydWUsIG1vbmV5OiB0cnVlIH0nXG4gICAgfSxcbiAgICB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIC0xMjM0NTY3ODkuNjc4LFxuICAgICAgICB7XG4gICAgICAgICAgYWJzOiB0cnVlLFxuICAgICAgICAgIGZsb29yOiB0cnVlLFxuICAgICAgICAgIG1vbmV5OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6ICcxMjMsNDU2LDc4OScsXG4gICAgICBleHBsYW5hdGlvbjogLTEyMzQ1Njc4OS42NzggKyAnLHsgYWJzOiB0cnVlLCBmbG9vcjogdHJ1ZSwgbW9uZXk6IHRydWUgfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgMTAyMyxcbiAgICAgICAge1xuICAgICAgICAgIGJ5dGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogJzFLQicsXG4gICAgICBleHBsYW5hdGlvbjogMTAyMyArICcse2J5dGU6IHRydWV9J1xuICAgIH0sXG4gICAge1xuICAgICAgYXJnczogW1xuICAgICAgICAxMDI0ICogMTAyNCxcbiAgICAgICAge1xuICAgICAgICAgIGJ5dGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogJzEwMjRLQicsXG4gICAgICBleHBsYW5hdGlvbjogMTAyNCAqIDEwMjQgKyAnLHtieXRlOiB0cnVlfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgMTAyNCAqIDEwMjQgKiA1LFxuICAgICAgICB7XG4gICAgICAgICAgYnl0ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnNU1CJyxcbiAgICAgIGV4cGxhbmF0aW9uOiAxMDI0ICogMTAyNCAqIDUgKyAnLHtieXRlOiB0cnVlfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgMTAyNCAqIDEwMjQgKiAxMDI0LFxuICAgICAgICB7XG4gICAgICAgICAgYnl0ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnMTAyNE1CJyxcbiAgICAgIGV4cGxhbmF0aW9uOiAxMDI0ICogMTAyNCAqIDEwMjQgKyAnLHtieXRlOiB0cnVlfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgMTAyNCAqIDEwMjQgKiAxMDI0ICogNSxcbiAgICAgICAge1xuICAgICAgICAgIGJ5dGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogJzVHQicsXG4gICAgICBleHBsYW5hdGlvbjogMTAyNCAqIDEwMjQgKiAxMDI0ICsgJyx7Ynl0ZTogdHJ1ZX0nXG4gICAgfSxcbiAgICB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgICdBLTEyMzR+fjU2Nzg5Ljh+ODg4UFgnLFxuICAgICAgICB7XG4gICAgICAgICAgYWJzOiB0cnVlLFxuICAgICAgICAgIHJvdW5kOiAyLFxuICAgICAgICAgIG1vbmV5OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6ICcxMjMsNDU2LDc4OS44OScsXG4gICAgICBleHBsYW5hdGlvbjogJ0EtMTIzNH5+NTY3ODkuOH44ODhQWCAsIHsgYWJzOiB0cnVlLCByb3VuZDogMiwgbW9uZXk6IHRydWUgfSdcbiAgICB9XG4gIF07XG4gIHRlc3RDYXNlcy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXN0Q2FzZSkge1xuICAgIGl0KCd1dGlsLm51bWJlcignICsgdGVzdENhc2UuZXhwbGFuYXRpb24gKyAnKSBleHBlY3QgJyArIHRlc3RDYXNlLmV4cGVjdCwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgIHZhciBhY3R1YWwgPSB1dGlsLm51bWJlci5hcHBseSh0aGlzLCB0ZXN0Q2FzZS5hcmdzKTtcbiAgICAgIGRvbmUoZXF1YWwoYWN0dWFsLCB0ZXN0Q2FzZS5leHBlY3QpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuXG4kKFwiI3NhbXBsZS1ib2R5XCIpLmFwcGVuZCgkZWwpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=