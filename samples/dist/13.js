webpackJsonp([13],{

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-tooltip-appear {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-moz-keyframes ax-tooltip-appear {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes ax-tooltip-appear {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n[data-ax6ui-tooltip] {\n  position: relative; }\n  [data-ax6ui-tooltip]:hover:before, [data-ax6ui-tooltip]:hover:after {\n    display: inline-block;\n    text-decoration: none;\n    pointer-events: none;\n    -webkit-animation: ax-tooltip-appear 0.1s cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.3s forwards;\n    -moz-animation: ax-tooltip-appear 0.1s cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.3s forwards;\n    animation: ax-tooltip-appear 0.1s cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.3s forwards; }\n  [data-ax6ui-tooltip]:hover:before {\n    position: absolute;\n    z-index: 10000001;\n    width: 0;\n    height: 0;\n    content: '';\n    opacity: 0; }\n  [data-ax6ui-tooltip]:hover:after {\n    position: absolute;\n    z-index: 10000000;\n    -webkit-font-smoothing: subpixel-antialiased;\n    text-align: center;\n    word-wrap: break-word;\n    white-space: pre;\n    content: attr(data-ax6ui-tooltip);\n    opacity: 0;\n    color: #fff;\n    font-family: inherit;\n    font-size: 11px;\n    font-weight: inherit;\n    background: rgba(1, 1, 1, 0.5);\n    line-height: 1.5em;\n    border-radius: 3px;\n    padding: 3px 7px; }\n  [data-ax6ui-tooltip]:hover:before {\n    top: auto;\n    bottom: -5px;\n    left: auto;\n    right: 50%;\n    border: 5px solid transparent;\n    border-bottom-color: rgba(1, 1, 1, 0.5);\n    -webkit-transform: translateX(50%);\n    -moz-transform: translateX(50%);\n    -ms-transform: translateX(50%);\n    -o-transform: translateX(50%);\n    transform: translateX(50%); }\n  [data-ax6ui-tooltip]:hover:after {\n    top: 100%;\n    bottom: auto;\n    left: auto;\n    right: 50%;\n    -webkit-transform: translateX(50%);\n    -moz-transform: translateX(50%);\n    -ms-transform: translateX(50%);\n    -o-transform: translateX(50%);\n    transform: translateX(50%);\n    margin: 0;\n    margin-top: 5px; }\n  [data-ax6ui-tooltip].tooltip-bottom:hover:before {\n    top: auto;\n    bottom: -5px;\n    left: auto;\n    right: 50%;\n    border: 5px solid transparent;\n    border-bottom-color: rgba(1, 1, 1, 0.5);\n    -webkit-transform: translateX(50%);\n    -moz-transform: translateX(50%);\n    -ms-transform: translateX(50%);\n    -o-transform: translateX(50%);\n    transform: translateX(50%); }\n  [data-ax6ui-tooltip].tooltip-bottom:hover:after {\n    top: 100%;\n    bottom: auto;\n    left: auto;\n    right: 50%;\n    -webkit-transform: translateX(50%);\n    -moz-transform: translateX(50%);\n    -ms-transform: translateX(50%);\n    -o-transform: translateX(50%);\n    transform: translateX(50%);\n    margin: 0;\n    margin-top: 5px; }\n  [data-ax6ui-tooltip].tooltip-top:hover:before {\n    top: -5px;\n    bottom: auto;\n    left: auto;\n    right: 50%;\n    border: 5px solid transparent;\n    border-top-color: rgba(1, 1, 1, 0.5);\n    -webkit-transform: translateX(50%);\n    -moz-transform: translateX(50%);\n    -ms-transform: translateX(50%);\n    -o-transform: translateX(50%);\n    transform: translateX(50%); }\n  [data-ax6ui-tooltip].tooltip-top:hover:after {\n    top: auto;\n    bottom: 100%;\n    left: auto;\n    right: 50%;\n    -webkit-transform: translateX(50%);\n    -moz-transform: translateX(50%);\n    -ms-transform: translateX(50%);\n    -o-transform: translateX(50%);\n    transform: translateX(50%);\n    margin: 0;\n    margin-bottom: 5px; }\n  [data-ax6ui-tooltip].tooltip-left:hover:before {\n    top: 50%;\n    bottom: auto;\n    left: -5px;\n    right: auto;\n    border: 5px solid transparent;\n    border-left-color: rgba(1, 1, 1, 0.5);\n    -webkit-transform: translateX(0) translateY(-50%);\n    -moz-transform: translateX(0) translateY(-50%);\n    -ms-transform: translateX(0) translateY(-50%);\n    -o-transform: translateX(0) translateY(-50%);\n    transform: translateX(0) translateY(-50%); }\n  [data-ax6ui-tooltip].tooltip-left:hover:after {\n    top: 50%;\n    bottom: auto;\n    left: auto;\n    right: 100%;\n    -webkit-transform: translateY(-50%);\n    -moz-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    transform: translateY(-50%);\n    margin: 0;\n    margin-right: 5px; }\n  [data-ax6ui-tooltip].tooltip-right:hover:before {\n    top: 50%;\n    bottom: auto;\n    left: auto;\n    right: -5px;\n    border: 5px solid transparent;\n    border-right-color: rgba(1, 1, 1, 0.5);\n    -webkit-transform: translateX(0) translateY(-50%);\n    -moz-transform: translateX(0) translateY(-50%);\n    -ms-transform: translateX(0) translateY(-50%);\n    -o-transform: translateX(0) translateY(-50%);\n    transform: translateX(0) translateY(-50%); }\n  [data-ax6ui-tooltip].tooltip-right:hover:after {\n    top: 50%;\n    bottom: auto;\n    left: 100%;\n    right: auto;\n    -webkit-transform: translateY(-50%);\n    -moz-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    transform: translateY(-50%);\n    margin: 0;\n    margin-left: 5px; }\n", ""]);

// exports


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(111);

var html = "\n<br/>\n<br/>\n<button data-ax6ui-tooltip=\"\uB098\uB294 \uD234\uD301\" class=\"btn\">default</button>\n<button data-ax6ui-tooltip=\"tooltip bottom\" class=\"btn tooltip-bottom\">bottom</button>\n<button data-ax6ui-tooltip=\"tooltip top\" class=\"btn tooltip-top\">top</button>\n<button data-ax6ui-tooltip=\"tooltip left\" class=\"btn tooltip-left\">left</button>\n<button data-ax6ui-tooltip=\"tooltip right\" class=\"btn tooltip-right\">right</button>\n";
var fn = {
  moduleRun: function moduleRun($body) {},
  moduleDestroy: function moduleDestroy($body) {
    $body.off("click");
  }
};

exports.default = {
  html: html,
  fn: fn
};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJVG9vbHRpcC9zdHlsZS5zY3NzP2NlZWMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSVRvb2x0aXAvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHRpcC5qcyJdLCJuYW1lcyI6WyJodG1sIiwiZm4iLCJtb2R1bGVSdW4iLCIkYm9keSIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDekJBO0FBQ0E7OztBQUdBO0FBQ0EsK0RBQWdFLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLHVDQUF1QyxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSxrQ0FBa0MsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsMEJBQTBCLHVCQUF1QixFQUFFLHlFQUF5RSw0QkFBNEIsNEJBQTRCLDJCQUEyQixxR0FBcUcsa0dBQWtHLDZGQUE2RixFQUFFLHVDQUF1Qyx5QkFBeUIsd0JBQXdCLGVBQWUsZ0JBQWdCLGtCQUFrQixpQkFBaUIsRUFBRSxzQ0FBc0MseUJBQXlCLHdCQUF3QixtREFBbUQseUJBQXlCLDRCQUE0Qix1QkFBdUIsd0NBQXdDLGlCQUFpQixrQkFBa0IsMkJBQTJCLHNCQUFzQiwyQkFBMkIscUNBQXFDLHlCQUF5Qix5QkFBeUIsdUJBQXVCLEVBQUUsdUNBQXVDLGdCQUFnQixtQkFBbUIsaUJBQWlCLGlCQUFpQixvQ0FBb0MsOENBQThDLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsRUFBRSxzQ0FBc0MsZ0JBQWdCLG1CQUFtQixpQkFBaUIsaUJBQWlCLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsZ0JBQWdCLHNCQUFzQixFQUFFLHNEQUFzRCxnQkFBZ0IsbUJBQW1CLGlCQUFpQixpQkFBaUIsb0NBQW9DLDhDQUE4Qyx5Q0FBeUMsc0NBQXNDLHFDQUFxQyxvQ0FBb0MsaUNBQWlDLEVBQUUscURBQXFELGdCQUFnQixtQkFBbUIsaUJBQWlCLGlCQUFpQix5Q0FBeUMsc0NBQXNDLHFDQUFxQyxvQ0FBb0MsaUNBQWlDLGdCQUFnQixzQkFBc0IsRUFBRSxtREFBbUQsZ0JBQWdCLG1CQUFtQixpQkFBaUIsaUJBQWlCLG9DQUFvQywyQ0FBMkMseUNBQXlDLHNDQUFzQyxxQ0FBcUMsb0NBQW9DLGlDQUFpQyxFQUFFLGtEQUFrRCxnQkFBZ0IsbUJBQW1CLGlCQUFpQixpQkFBaUIseUNBQXlDLHNDQUFzQyxxQ0FBcUMsb0NBQW9DLGlDQUFpQyxnQkFBZ0IseUJBQXlCLEVBQUUsb0RBQW9ELGVBQWUsbUJBQW1CLGlCQUFpQixrQkFBa0Isb0NBQW9DLDRDQUE0Qyx3REFBd0QscURBQXFELG9EQUFvRCxtREFBbUQsZ0RBQWdELEVBQUUsbURBQW1ELGVBQWUsbUJBQW1CLGlCQUFpQixrQkFBa0IsMENBQTBDLHVDQUF1QyxzQ0FBc0MscUNBQXFDLGtDQUFrQyxnQkFBZ0Isd0JBQXdCLEVBQUUscURBQXFELGVBQWUsbUJBQW1CLGlCQUFpQixrQkFBa0Isb0NBQW9DLDZDQUE2Qyx3REFBd0QscURBQXFELG9EQUFvRCxtREFBbUQsZ0RBQWdELEVBQUUsb0RBQW9ELGVBQWUsbUJBQW1CLGlCQUFpQixrQkFBa0IsMENBQTBDLHVDQUF1QyxzQ0FBc0MscUNBQXFDLGtDQUFrQyxnQkFBZ0IsdUJBQXVCLEVBQUU7O0FBRTFvSzs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7O0FBRUEsSUFBSUEsZ2RBQUo7QUFTQSxJQUFJQyxLQUFLO0FBQ1BDLGFBQVcsbUJBQVVDLEtBQVYsRUFBaUIsQ0FFM0IsQ0FITTtBQUlQQyxpQkFBZSx1QkFBVUQsS0FBVixFQUFpQjtBQUM5QkEsVUFBTUUsR0FBTixDQUFVLE9BQVY7QUFDRDtBQU5NLENBQVQ7O2tCQVNlO0FBQ2JMLFFBQU1BLElBRE87QUFFYkMsTUFBSUE7QUFGUyxDIiwiZmlsZSI6IjEzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJVG9vbHRpcC9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxMyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGF4LXRvb2x0aXAtYXBwZWFyIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC10b29sdGlwLWFwcGVhciB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LXRvb2x0aXAtYXBwZWFyIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbltkYXRhLWF4NnVpLXRvb2x0aXBdIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgW2RhdGEtYXg2dWktdG9vbHRpcF06aG92ZXI6YmVmb3JlLCBbZGF0YS1heDZ1aS10b29sdGlwXTpob3ZlcjphZnRlciB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvb2x0aXAtYXBwZWFyIDAuMXMgY3ViaWMtYmV6aWVyKDAuOTUsIDAuMDUsIDAuNzk1LCAwLjAzNSkgMC4zcyBmb3J3YXJkcztcXG4gICAgLW1vei1hbmltYXRpb246IGF4LXRvb2x0aXAtYXBwZWFyIDAuMXMgY3ViaWMtYmV6aWVyKDAuOTUsIDAuMDUsIDAuNzk1LCAwLjAzNSkgMC4zcyBmb3J3YXJkcztcXG4gICAgYW5pbWF0aW9uOiBheC10b29sdGlwLWFwcGVhciAwLjFzIGN1YmljLWJlemllcigwLjk1LCAwLjA1LCAwLjc5NSwgMC4wMzUpIDAuM3MgZm9yd2FyZHM7IH1cXG4gIFtkYXRhLWF4NnVpLXRvb2x0aXBdOmhvdmVyOmJlZm9yZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgei1pbmRleDogMTAwMDAwMDE7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICBbZGF0YS1heDZ1aS10b29sdGlwXTpob3ZlcjphZnRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgei1pbmRleDogMTAwMDAwMDA7XFxuICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IHN1YnBpeGVsLWFudGlhbGlhc2VkO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcXG4gICAgd2hpdGUtc3BhY2U6IHByZTtcXG4gICAgY29udGVudDogYXR0cihkYXRhLWF4NnVpLXRvb2x0aXApO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICAgIGZvbnQtc2l6ZTogMTFweDtcXG4gICAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMSwgMSwgMSwgMC41KTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIHBhZGRpbmc6IDNweCA3cHg7IH1cXG4gIFtkYXRhLWF4NnVpLXRvb2x0aXBdOmhvdmVyOmJlZm9yZSB7XFxuICAgIHRvcDogYXV0bztcXG4gICAgYm90dG9tOiAtNXB4O1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogNTAlO1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjUpO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTsgfVxcbiAgW2RhdGEtYXg2dWktdG9vbHRpcF06aG92ZXI6YWZ0ZXIge1xcbiAgICB0b3A6IDEwMCU7XFxuICAgIGJvdHRvbTogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IDUwJTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLXRvcDogNXB4OyB9XFxuICBbZGF0YS1heDZ1aS10b29sdGlwXS50b29sdGlwLWJvdHRvbTpob3ZlcjpiZWZvcmUge1xcbiAgICB0b3A6IGF1dG87XFxuICAgIGJvdHRvbTogLTVweDtcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IDUwJTtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMSwgMSwgMSwgMC41KTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7IH1cXG4gIFtkYXRhLWF4NnVpLXRvb2x0aXBdLnRvb2x0aXAtYm90dG9tOmhvdmVyOmFmdGVyIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBib3R0b206IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiA1MCU7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi10b3A6IDVweDsgfVxcbiAgW2RhdGEtYXg2dWktdG9vbHRpcF0udG9vbHRpcC10b3A6aG92ZXI6YmVmb3JlIHtcXG4gICAgdG9wOiAtNXB4O1xcbiAgICBib3R0b206IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiA1MCU7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDEsIDEsIDEsIDAuNSk7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpOyB9XFxuICBbZGF0YS1heDZ1aS10b29sdGlwXS50b29sdGlwLXRvcDpob3ZlcjphZnRlciB7XFxuICAgIHRvcDogYXV0bztcXG4gICAgYm90dG9tOiAxMDAlO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogNTAlO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7IH1cXG4gIFtkYXRhLWF4NnVpLXRvb2x0aXBdLnRvb2x0aXAtbGVmdDpob3ZlcjpiZWZvcmUge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgYm90dG9tOiBhdXRvO1xcbiAgICBsZWZ0OiAtNXB4O1xcbiAgICByaWdodDogYXV0bztcXG4gICAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDEsIDEsIDEsIDAuNSk7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApIHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApIHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApIHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKSB0cmFuc2xhdGVZKC01MCUpOyB9XFxuICBbZGF0YS1heDZ1aS10b29sdGlwXS50b29sdGlwLWxlZnQ6aG92ZXI6YWZ0ZXIge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgYm90dG9tOiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogMTAwJTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDsgfVxcbiAgW2RhdGEtYXg2dWktdG9vbHRpcF0udG9vbHRpcC1yaWdodDpob3ZlcjpiZWZvcmUge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgYm90dG9tOiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogLTVweDtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgxLCAxLCAxLCAwLjUpO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKSB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKSB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApIHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKSB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgdHJhbnNsYXRlWSgtNTAlKTsgfVxcbiAgW2RhdGEtYXg2dWktdG9vbHRpcF0udG9vbHRpcC1yaWdodDpob3ZlcjphZnRlciB7XFxuICAgIHRvcDogNTAlO1xcbiAgICBib3R0b206IGF1dG87XFxuICAgIGxlZnQ6IDEwMCU7XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJVG9vbHRpcC9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxMyIsImltcG9ydCBcIi4uLy4uL3NyYy9BWDZVSVRvb2x0aXAvc3R5bGUuc2Nzc1wiO1xuXG5sZXQgaHRtbCA9IGBcbjxici8+XG48YnIvPlxuPGJ1dHRvbiBkYXRhLWF4NnVpLXRvb2x0aXA9XCLrgpjripQg7Yi07YyBXCIgY2xhc3M9XCJidG5cIj5kZWZhdWx0PC9idXR0b24+XG48YnV0dG9uIGRhdGEtYXg2dWktdG9vbHRpcD1cInRvb2x0aXAgYm90dG9tXCIgY2xhc3M9XCJidG4gdG9vbHRpcC1ib3R0b21cIj5ib3R0b208L2J1dHRvbj5cbjxidXR0b24gZGF0YS1heDZ1aS10b29sdGlwPVwidG9vbHRpcCB0b3BcIiBjbGFzcz1cImJ0biB0b29sdGlwLXRvcFwiPnRvcDwvYnV0dG9uPlxuPGJ1dHRvbiBkYXRhLWF4NnVpLXRvb2x0aXA9XCJ0b29sdGlwIGxlZnRcIiBjbGFzcz1cImJ0biB0b29sdGlwLWxlZnRcIj5sZWZ0PC9idXR0b24+XG48YnV0dG9uIGRhdGEtYXg2dWktdG9vbHRpcD1cInRvb2x0aXAgcmlnaHRcIiBjbGFzcz1cImJ0biB0b29sdGlwLXJpZ2h0XCI+cmlnaHQ8L2J1dHRvbj5cbmA7XG5sZXQgZm4gPSB7XG4gIG1vZHVsZVJ1bjogZnVuY3Rpb24gKCRib2R5KSB7XG5cbiAgfSxcbiAgbW9kdWxlRGVzdHJveTogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgJGJvZHkub2ZmKFwiY2xpY2tcIik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHRtbDogaHRtbCxcbiAgZm46IGZuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Rvb2x0aXAuanMiXSwic291cmNlUm9vdCI6IiJ9