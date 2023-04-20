// Generated by CoffeeScript 2.5.1
var modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

import _ from 'https://cdn.skypack.dev/lodash';

import {
  createSignal,
  createEffect,
  createMemo
} from "https://cdn.skypack.dev/solid-js@1.2.6";

import {
  createStore
} from "https://cdn.skypack.dev/solid-js@1.2.6/store";

import h from "https://cdn.skypack.dev/solid-js@1.2.6/h";

import {
  render
} from "https://cdn.skypack.dev/solid-js@1.2.6/web";

export var signal = createSignal;

export var effect = createEffect;

export var memo = createMemo;

export var param = {};

param.String = (v) => {
  if (!_.isString(v)) {
    return console.log((new Error(v + " is not a String")).stack);
  } else {
    return v;
  }
};

param.Number = (v) => {
  if (!_.isNumber(v)) {
    return console.log((new Error(v + " is not a Number")).stack);
  } else {
    return v;
  }
};

param.Integer = (v) => {
  if (!_.isInteger(v)) {
    return console.log((new Error(v + " is not an Integer")).stack);
  } else {
    return v;
  }
};

param.Boolean = (v) => {
  if (!_.isBoolean(v)) {
    return console.log((new Error(v + " is not a Boolean")).stack);
  } else {
    return v;
  }
};

param.Object = (v) => {
  if (!_.isObject(v)) {
    return console.log((new Error(v + " is not an Object")).stack);
  } else {
    return v;
  }
};

param.Array = (v) => {
  if (!_.isArray(v)) {
    return console.log((new Error(v + " is not an Array")).stack);
  } else {
    return v;
  }
};

param.Function = (v) => {
  if (!_.isFunction(v)) {
    return console.log((new Error(v + " is not a Function")).stack);
  } else {
    return v;
  }
};

param.Test = (test, msg = '') => {
  if (!test) {
    return console.log((new Error("param.Test failed:" + msg)).stack);
  }
};

param.Compact = (types, args) => {
  var i, j, ref, results;
  results = [];
  for (i = j = 0, ref = args.length - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
    if (types[i] === 'S') {
      param.String(args[i]);
    }
    if (types[i] === 'N') {
      param.Number(args[i]);
    }
    if (types[i] === 'I') {
      param.Integer(args[i]);
    }
    if (types[i] === 'B') {
      param.Boolean(args[i]);
    }
    if (types[i] === 'O') {
      param.Object(args[i]);
    }
    if (types[i] === 'A') {
      param.Array(args[i]);
    }
    if (types[i] === 'F') {
      results.push(param.Function(args[i]));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

export var N = 8;

export var hexToBase64 = (str) => {
  return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
};

export var ass = (a, b) => {
  if (!_.isEqual(a, b)) {
    log('assert failure:');
    log(a);
    return log(b);
  }
};

export var lerp = (a, b, ratio) => {
  param.Number(a);
  param.Number(b);
  param.Number(ratio);
  return param.Number(a + (b - a) * ratio);
};

export var split = function(s) {
  param.String(s);
  return param.Array(s === "" ? [] : s.split(" ")); // there is a bug in split
};

export var col = (n) => {
  return modulo(n, N);
};

export var row = (n) => {
  return Math.floor(n / N);
};

export var sum = (arr) => {
  return arr.reduce(((a, b) => {
    return a + b;
  }), 0);
};

export var r4r = (a) => {
  return render(a, document.getElementById("app"));
};

export var spaceShip = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

export var map = _.map;

export var range = _.range;

export var log = console.log;

export var abs = Math.abs;

export var a = (...a) => {
  return h("a", a);
};

export var button = (...a) => {
  return h("button", a);
};

export var circle = (...a) => {
  return h("circle", a);
};

export var defs = (...a) => {
  return h("defs", a);
};

export var div = (...a) => {
  return h("div", a);
};

export var ellipse = (...a) => {
  return h("ellipse", a);
};

export var figure = (...a) => {
  return h("figure", a);
};

export var figCaption = (...a) => {
  return h("figCaption", a);
};

export var form = (...a) => {
  return h("form", a);
};

export var g = (...a) => {
  return h("g", a);
};

export var h1 = (...a) => {
  return h("h1", a);
};

export var h3 = (...a) => {
  return h("h3", a);
};

export var header = (...a) => {
  return h("header", a);
};

export var img = (...a) => {
  return h("img", a);
};

export var input = (...a) => {
  return h("input", a);
};

export var li = (...a) => {
  return h("li", a);
};

export var linearGradient = (...a) => {
  return h("linearGradient", a);
};

export var option = (...a) => {
  return h("option", a);
};

export var p = (...a) => {
  return h("p", a);
};

export var table = (...a) => {
  return h("table", a);
};

export var tr = (...a) => {
  return h("tr", a);
};

export var td = (...a) => {
  return h("td", a);
};

export var rect = (...a) => {
  return h("rect", a);
};

export var select = (...a) => {
  return h("select", a);
};

export var stop = (...a) => {
  return h("stop", a);
};

export var strong = (...a) => {
  return h("strong", a);
};

export var svg = (...a) => {
  return h("svg", a);
};

export var text = (...a) => {
  return h("text", a);
};

export var ul = (...a) => {
  return h("ul", a);
};

export var Position = function(index) {
  return `${"abcdefgh"[col(index)]}${"87654321"[row(index)]}`;
};

export var createLocalStore = (name, init) => {
  var localState, setState, state;
  localState = localStorage.getItem(name);
  [state, setState] = createStore(localState ? JSON.parse(localState) : init);
  createEffect(() => {
    return localStorage.setItem(name, JSON.stringify(state));
  });
  return [state, setState];
};

export var removeIndex = (array, index) => {
  var b;
  // [...array.slice 0, index, ...array.slice index + 1]
  a = array.slice(0, index);
  b = array.slice(index + 1);
  console.log(a.concat(b));
  return a.concat(b);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcdXRpbHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxZQUFUO0VBQXVCLFlBQXZCO0VBQXFDLFVBQXJDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsV0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBTyxNQUFBLEdBQVM7O0FBQ2hCLE9BQUEsSUFBTyxNQUFBLEdBQVM7O0FBQ2hCLE9BQUEsSUFBTyxJQUFBLEdBQU87O0FBRWQsT0FBQSxJQUFPLEtBQUEsR0FBUSxDQUFBOztBQUNmLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBQyxDQUFELENBQUEsR0FBQTtFQUFPLElBQUcsQ0FBSSxDQUFDLENBQUMsUUFBRixDQUFXLENBQVgsQ0FBUDtXQUF5QixPQUFPLENBQUMsR0FBUixDQUFZLENBQUMsSUFBSSxLQUFKLENBQVUsQ0FBQSxHQUFJLGtCQUFkLENBQUQsQ0FBa0MsQ0FBQyxLQUEvQyxFQUF6QjtHQUFBLE1BQUE7V0FBbUYsRUFBbkY7O0FBQVA7O0FBQ2YsS0FBSyxDQUFDLE1BQU4sR0FBZSxDQUFDLENBQUQsQ0FBQSxHQUFBO0VBQU8sSUFBRyxDQUFJLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBWCxDQUFQO1dBQXlCLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBQyxJQUFJLEtBQUosQ0FBVSxDQUFBLEdBQUksa0JBQWQsQ0FBRCxDQUFrQyxDQUFDLEtBQS9DLEVBQXpCO0dBQUEsTUFBQTtXQUFtRixFQUFuRjs7QUFBUDs7QUFDZixLQUFLLENBQUMsT0FBTixHQUFnQixDQUFDLENBQUQsQ0FBQSxHQUFBO0VBQU8sSUFBRyxDQUFJLENBQUMsQ0FBQyxTQUFGLENBQVksQ0FBWixDQUFQO1dB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QUMsVUFBQSxHQUFhLFlBQVksQ0FBQyxPQUFiLENBQXFCLElBQXJCO0VBQ2IsQ0FBQyxLQUFELEVBQVEsUUFBUixDQUFBLEdBQW9CLFdBQUEsQ0FBZSxVQUFILEdBQW1CLElBQUksQ0FBQyxLQUFMLENBQVcsVUFBWCxDQUFuQixHQUE4QyxJQUExRDtFQUNwQixZQUFBLENBQWEsQ0FBQSxDQUFBLEdBQUE7V0FBTSxZQUFZLENBQUMsT0FBYixDQUFxQixJQUFyQixFQUEyQixJQUFJLENBQUMsU0FBTCxDQUFlLEtBQWYsQ0FBM0I7RUFBTixDQUFiO1NBQ0EsQ0FBQyxLQUFELEVBQVEsUUFBUjtBQUp5Qjs7QUFNMUIsT0FBQSxJQUFPLFdBQUEsR0FBYyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQUEsR0FBQTtBQUNyQixNQUFBLENBQUE7O0VBQ0MsQ0FBQSxHQUFJLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLEtBQWY7RUFDSixDQUFBLEdBQUksS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFBLEdBQVEsQ0FBcEI7RUFDSixPQUFPLENBQUMsR0FBUixDQUFZLENBQUMsQ0FBQyxNQUFGLENBQVMsQ0FBVCxDQUFaO1NBQ0EsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxDQUFUO0FBTG9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvbG9kYXNoJ1xyXG5pbXBvcnQgeyBjcmVhdGVTaWduYWwsIGNyZWF0ZUVmZmVjdCwgY3JlYXRlTWVtbyB9IGZyb20gXCJodHRwczovL2Nkbi5za3lwYWNrLmRldi9zb2xpZC1qc0AxLjIuNlwiXHJcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gIGZyb20gXCJodHRwczovL2Nkbi5za3lwYWNrLmRldi9zb2xpZC1qc0AxLjIuNi9zdG9yZVwiXHJcbmltcG9ydCBoIGZyb20gXCJodHRwczovL2Nkbi5za3lwYWNrLmRldi9zb2xpZC1qc0AxLjIuNi9oXCJcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcImh0dHBzOi8vY2RuLnNreXBhY2suZGV2L3NvbGlkLWpzQDEuMi42L3dlYlwiXHJcblxyXG5leHBvcnQgc2lnbmFsID0gY3JlYXRlU2lnbmFsXHJcbmV4cG9ydCBlZmZlY3QgPSBjcmVhdGVFZmZlY3RcclxuZXhwb3J0IG1lbW8gPSBjcmVhdGVNZW1vXHJcblxyXG5leHBvcnQgcGFyYW0gPSB7fVxyXG5wYXJhbS5TdHJpbmcgPSAodikgPT4gaWYgbm90IF8uaXNTdHJpbmcgdiB0aGVuIGNvbnNvbGUubG9nIChuZXcgRXJyb3IgdiArIFwiIGlzIG5vdCBhIFN0cmluZ1wiKS5zdGFjayBlbHNlIHZcclxucGFyYW0uTnVtYmVyID0gKHYpID0+IGlmIG5vdCBfLmlzTnVtYmVyIHYgdGhlbiBjb25zb2xlLmxvZyAobmV3IEVycm9yIHYgKyBcIiBpcyBub3QgYSBOdW1iZXJcIikuc3RhY2sgZWxzZSB2XHJcbnBhcmFtLkludGVnZXIgPSAodikgPT4gaWYgbm90IF8uaXNJbnRlZ2VyIHYgdGhlbiBjb25zb2xlLmxvZyAobmV3IEVycm9yIHYgKyBcIiBpcyBub3QgYW4gSW50ZWdlclwiKS5zdGFjayBlbHNlIHZcclxucGFyYW0uQm9vbGVhbiA9ICh2KSA9PiBpZiBub3QgXy5pc0Jvb2xlYW4gdiB0aGVuIGNvbnNvbGUubG9nIChuZXcgRXJyb3IgdiArIFwiIGlzIG5vdCBhIEJvb2xlYW5cIikuc3RhY2sgZWxzZSB2XHJcbnBhcmFtLk9iamVjdCA9ICh2KSA9PiBpZiBub3QgXy5pc09iamVjdCB2IHRoZW4gY29uc29sZS5sb2cgKG5ldyBFcnJvciB2ICsgXCIgaXMgbm90IGFuIE9iamVjdFwiKS5zdGFjayBlbHNlIHZcclxucGFyYW0uQXJyYXkgPSAodikgPT4gaWYgbm90IF8uaXNBcnJheSB2IHRoZW4gY29uc29sZS5sb2cgKG5ldyBFcnJvciB2ICsgXCIgaXMgbm90IGFuIEFycmF5XCIpLnN0YWNrIGVsc2UgdlxyXG5wYXJhbS5GdW5jdGlvbiA9ICh2KSA9PiBpZiBub3QgXy5pc0Z1bmN0aW9uIHYgdGhlbiBjb25zb2xlLmxvZyAobmV3IEVycm9yIHYgKyBcIiBpcyBub3QgYSBGdW5jdGlvblwiKS5zdGFjayBlbHNlIHZcclxucGFyYW0uVGVzdCA9ICh0ZXN0LG1zZz0nJykgPT4gaWYgbm90IHRlc3QgdGhlbiBjb25zb2xlLmxvZyAobmV3IEVycm9yIFwicGFyYW0uVGVzdCBmYWlsZWQ6XCIgKyBtc2cpLnN0YWNrXHJcbnBhcmFtLkNvbXBhY3QgPSAodHlwZXMsYXJncykgPT5cclxuXHRmb3IgaSBpbiBbMC4uYXJncy5sZW5ndGgtMV1cclxuXHRcdGlmIHR5cGVzW2ldID09ICdTJyB0aGVuIHBhcmFtLlN0cmluZyBhcmdzW2ldXHJcblx0XHRpZiB0eXBlc1tpXSA9PSAnTicgdGhlbiBwYXJhbS5OdW1iZXIgYXJnc1tpXVxyXG5cdFx0aWYgdHlwZXNbaV0gPT0gJ0knIHRoZW4gcGFyYW0uSW50ZWdlciBhcmdzW2ldXHJcblx0XHRpZiB0eXBlc1tpXSA9PSAnQicgdGhlbiBwYXJhbS5Cb29sZWFuIGFyZ3NbaV1cclxuXHRcdGlmIHR5cGVzW2ldID09ICdPJyB0aGVuIHBhcmFtLk9iamVjdCBhcmdzW2ldXHJcblx0XHRpZiB0eXBlc1tpXSA9PSAnQScgdGhlbiBwYXJhbS5BcnJheSBhcmdzW2ldXHJcblx0XHRpZiB0eXBlc1tpXSA9PSAnRicgdGhlbiBwYXJhbS5GdW5jdGlvbiBhcmdzW2ldXHJcblxyXG5leHBvcnQgTiA9IDhcclxuXHJcbmV4cG9ydCBoZXhUb0Jhc2U2NCA9IChzdHIpID0+XHJcblx0YnRvYSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsXHJcblx0XHRzdHIucmVwbGFjZSgvXFxyfFxcbi9nLCBcIlwiKS5yZXBsYWNlKC8oW1xcZGEtZkEtRl17Mn0pID8vZywgXCIweCQxIFwiKS5yZXBsYWNlKC8gKyQvLCBcIlwiKS5zcGxpdChcIiBcIikpXHJcblxyXG5leHBvcnQgYXNzID0gKGEsYikgPT5cclxuXHRpZiBub3QgXy5pc0VxdWFsIGEsYlxyXG5cdFx0bG9nICdhc3NlcnQgZmFpbHVyZTonXHJcblx0XHRsb2cgYVxyXG5cdFx0bG9nIGJcclxuXHJcbmV4cG9ydCBsZXJwID0gKGEsYixyYXRpbykgPT4gXHJcblx0cGFyYW0uTnVtYmVyIGFcclxuXHRwYXJhbS5OdW1iZXIgYlxyXG5cdHBhcmFtLk51bWJlciByYXRpb1xyXG5cdHBhcmFtLk51bWJlciBhICsgKGItYSkqcmF0aW9cclxuXHJcbmV4cG9ydCBzcGxpdCA9IChzKSAtPlxyXG5cdHBhcmFtLlN0cmluZyBzXHJcblx0cGFyYW0uQXJyYXkgaWYgcz09XCJcIiB0aGVuIFtdIGVsc2Ugcy5zcGxpdCBcIiBcIiAjIHRoZXJlIGlzIGEgYnVnIGluIHNwbGl0XHJcblxyXG5leHBvcnQgY29sID0gKG4pID0+IG4gJSUgTlxyXG5leHBvcnQgcm93ID0gKG4pID0+IG4gLy8gTlxyXG5leHBvcnQgc3VtID0gKGFycikgPT4gYXJyLnJlZHVjZSgoKGEsIGIpID0+IGEgKyBiKSwgMClcclxuZXhwb3J0IHI0ciA9IChhKSA9PiByZW5kZXIgYSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhcHBcIlxyXG5leHBvcnQgc3BhY2VTaGlwID0gKGEsYikgPT4gaWYgYSA8IGIgdGhlbiAtMSBlbHNlIGlmIGEgPiBiIHRoZW4gMSBlbHNlIDBcclxuXHJcbmV4cG9ydCBtYXAgPSBfLm1hcFxyXG5leHBvcnQgcmFuZ2UgPSBfLnJhbmdlXHJcbmV4cG9ydCBsb2cgPSBjb25zb2xlLmxvZ1xyXG5leHBvcnQgYWJzID0gTWF0aC5hYnNcclxuXHJcbmV4cG9ydCBhID0gKGEuLi4pID0+IGggXCJhXCIsIGFcclxuZXhwb3J0IGJ1dHRvbiA9IChhLi4uKSA9PiBoIFwiYnV0dG9uXCIsIGFcclxuZXhwb3J0IGNpcmNsZSA9IChhLi4uKSA9PiBoIFwiY2lyY2xlXCIsIGFcclxuZXhwb3J0IGRlZnMgPSAoYS4uLikgPT4gaCBcImRlZnNcIiwgYVxyXG5leHBvcnQgZGl2ID0gKGEuLi4pID0+IGggXCJkaXZcIiwgYVxyXG5leHBvcnQgZWxsaXBzZSA9IChhLi4uKSA9PiBoIFwiZWxsaXBzZVwiLCBhXHJcbmV4cG9ydCBmaWd1cmUgPSAoYS4uLikgPT4gaCBcImZpZ3VyZVwiLCBhXHJcbmV4cG9ydCBmaWdDYXB0aW9uID0gKGEuLi4pID0+IGggXCJmaWdDYXB0aW9uXCIsIGFcclxuZXhwb3J0IGZvcm0gPSAoYS4uLikgPT4gaCBcImZvcm1cIiwgYVxyXG5leHBvcnQgZyA9IChhLi4uKSA9PiBoIFwiZ1wiLCBhXHJcbmV4cG9ydCBoMSA9IChhLi4uKSA9PiBoIFwiaDFcIiwgYVxyXG5leHBvcnQgaDMgPSAoYS4uLikgPT4gaCBcImgzXCIsIGFcclxuZXhwb3J0IGhlYWRlciA9IChhLi4uKSA9PiBoIFwiaGVhZGVyXCIsYVxyXG5leHBvcnQgaW1nID0gKGEuLi4pID0+IGggXCJpbWdcIiwgYVxyXG5leHBvcnQgaW5wdXQgPSAoYS4uLikgPT4gaCBcImlucHV0XCIsIGFcclxuZXhwb3J0IGxpID0gKGEuLi4pID0+IGggXCJsaVwiLCBhXHJcbmV4cG9ydCBsaW5lYXJHcmFkaWVudCA9IChhLi4uKSA9PiBoIFwibGluZWFyR3JhZGllbnRcIiwgYVxyXG5leHBvcnQgb3B0aW9uID0gKGEuLi4pID0+IGggXCJvcHRpb25cIiwgYVxyXG5leHBvcnQgcCA9IChhLi4uKSA9PiBoIFwicFwiLCBhXHJcbmV4cG9ydCB0YWJsZSA9IChhLi4uKSA9PiBoIFwidGFibGVcIiwgYVxyXG5leHBvcnQgdHIgPSAoYS4uLikgPT4gaCBcInRyXCIsIGFcclxuZXhwb3J0IHRkID0gKGEuLi4pID0+IGggXCJ0ZFwiLCBhXHJcbmV4cG9ydCByZWN0ICAgPSAoYS4uLikgPT4gaCBcInJlY3RcIixhXHJcbmV4cG9ydCBzZWxlY3QgPSAoYS4uLikgPT4gaCBcInNlbGVjdFwiLCBhXHJcbmV4cG9ydCBzdG9wID0gKGEuLi4pID0+IGggXCJzdG9wXCIsIGFcclxuZXhwb3J0IHN0cm9uZyA9IChhLi4uKSA9PiBoIFwic3Ryb25nXCIsIGFcclxuZXhwb3J0IHN2ZyA9IChhLi4uKSA9PiBoIFwic3ZnXCIsIGFcclxuZXhwb3J0IHRleHQgICA9IChhLi4uKSA9PiBoIFwidGV4dFwiLGFcclxuZXhwb3J0IHVsID0gKGEuLi4pID0+IGggXCJ1bFwiLCBhXHJcblxyXG5leHBvcnQgUG9zaXRpb24gPSAoaW5kZXgpIC0+IFwiI3tcImFiY2RlZmdoXCJbY29sIGluZGV4XX0je1wiODc2NTQzMjFcIltyb3cgaW5kZXhdfVwiXHJcblxyXG5leHBvcnQgY3JlYXRlTG9jYWxTdG9yZSA9IChuYW1lLGluaXQpID0+XHJcblx0bG9jYWxTdGF0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtIG5hbWVcclxuXHRbc3RhdGUsIHNldFN0YXRlXSA9IGNyZWF0ZVN0b3JlIGlmIGxvY2FsU3RhdGUgdGhlbiBKU09OLnBhcnNlIGxvY2FsU3RhdGUgZWxzZSBpbml0XHJcblx0Y3JlYXRlRWZmZWN0ICgpID0+IGxvY2FsU3RvcmFnZS5zZXRJdGVtIG5hbWUsIEpTT04uc3RyaW5naWZ5IHN0YXRlXHJcblx0W3N0YXRlLCBzZXRTdGF0ZV1cclxuXHJcbmV4cG9ydCByZW1vdmVJbmRleCA9IChhcnJheSwgaW5kZXgpID0+XHJcblx0IyBbLi4uYXJyYXkuc2xpY2UgMCwgaW5kZXgsIC4uLmFycmF5LnNsaWNlIGluZGV4ICsgMV1cclxuXHRhID0gYXJyYXkuc2xpY2UgMCwgaW5kZXggXHJcblx0YiA9IGFycmF5LnNsaWNlIGluZGV4ICsgMVxyXG5cdGNvbnNvbGUubG9nIGEuY29uY2F0IGJcclxuXHRhLmNvbmNhdCBiXHJcbiJdfQ==
//# sourceURL=c:\github\2023-019-ChessTree\coffee\utils.coffee