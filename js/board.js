// Generated by CoffeeScript 2.5.1
var SIZE,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

import _ from 'https://cdn.skypack.dev/lodash';

import {
  ass,
  lerp,
  param,
  range,
  hexToBase64
} from '../js/utils.js';

import {
  // import cryptoJs from 'https://cdn.skypack.dev/crypto-js'
  Square
} from '../js/square.js';

import {
  Button
} from '../js/button.js';

import {
  coords,
  clickString,
  global,
  toObjectNotation,
  toUCI
} from '../js/globals.js';

import {
  dumpState
} from '../js/globals.js';

SIZE = global.SIZE;

export var Board = class Board {
  constructor() {
    var i, k, len, ref, x0, x1, x2, x3;
    this.click = this.click.bind(this);
    this.draw = this.draw.bind(this);
    //push()
    //textAlign CENTER,CENTER

    //text global.version, 7.5*SIZE, 10*SIZE
    //textAlign RIGHT,CENTER

    // textSize 20
    // n = global.stack.length
    // if n == 0 then score = '0'
    // if n%2 == 0 then fill 'white' else fill 'black'
    // text 1+n//2, 9.4*SIZE, 0.3*SIZE

    //pop()
    // @showChildren()
    this.littera = this.littera.bind(this);
    this.flip = this.flip.bind(this);
    this.squares = [];
    this.clickedSquares = [];
    this.pieces = "";
    this.flipped = false;
    ref = range(64);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      ((i) => {
        return this.squares.push(new Square(i, () => {
          return this.click(i);
        }));
      })(i);
    }
    this.buttons = [];
    x0 = 1.5;
    x1 = 3.5;
    x2 = 5.5;
    x3 = 7.5;
    this.buttons.push(new Button(x0 * SIZE, 9.5 * SIZE, 'correct', () => {
      return clickString('correct');
    }));
    this.buttons.push(new Button(x1 * SIZE, 9.5 * SIZE, 'wrong', () => {
      return clickString('wrong');
    }));
    this.buttons.push(new Button(x2 * SIZE, 9.5 * SIZE, 'link', () => {}));
    this.buttons.push(new Button(x3 * SIZE, 9.5 * SIZE, 'debug', () => {}));
  }

  click(i) {
    var col, color, g, move, row, sq, uci;
    g = global;
    if (this.flipped) {
      i = 63 - i;
    }
    col = modulo(i, 8);
    row = 7 - Math.floor(i / 8);
    sq = g.chess.board()[row][col];
    color = "wb"[modulo(g.chess.history().length, 2)];
    if (this.clickedSquares.length === 0) {
      if (sq !== null && sq.color === color) {
        return this.clickedSquares.push(i);
      }
    } else {
      if (i === this.clickedSquares[0]) {
        return this.clickedSquares = [];
      } else {
        this.clickedSquares.push(i);
        move = toObjectNotation(this.clickedSquares);
        uci = toUCI(this.clickedSquares);
        if (g.chess.move(move)) { // accepera draget
          g.stack.push(g.currNode);
          // console.log uci,global.currNode
          if (!(uci in g.currNode)) {
            g.currNode[uci] = {};
            g.count++;
          }
          g.currNode = g.currNode[uci];
        }
        return this.clickedSquares = [];
      }
    }
  }

  draw() {
    var button, i, j, k, l, len, len1, len2, m, piece, ref, ref1, ref2;
    this.buttons[3].text = global.count > 0 ? 'save ' + global.count : "";
    ref = this.buttons;
    for (k = 0, len = ref.length; k < len; k++) {
      button = ref[k];
      button.draw();
    }
    // if not global.tree then return
    fill('white');
    textSize(SIZE * 0.3);
    ref1 = range(8);
    //push()
    //textAlign LEFT,CENTER
    //text global.name,0.05*SIZE, 0.3*SIZE
    //pop()
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      i = ref1[l];
      ref2 = range(8);
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        j = ref2[m];
        piece = global.chess.board()[7 - i][j];
        this.squares[i * 8 + j].draw(piece, this.flipped, i * 8 + j === this.clickedSquares[0]);
      }
    }
    stroke('black');
    noFill();
    rect(SIZE * 4.5, SIZE * 4.5, SIZE * 8, SIZE * 8);
    return this.littera();
  }

  littera() {
    var digits, i, k, len, letters, ref, results;
    noStroke();
    fill('black');
    textSize(SIZE * 0.3);
    letters = this.flipped ? "hgfedcba" : "abcdefgh";
    digits = this.flipped ? "12345678" : "87654321";
    ref = range(8);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      text(letters[i], SIZE * (i + 1), SIZE * 8.8);
      results.push(text(digits[i], SIZE * 0.15, SIZE * (i + 1)));
    }
    return results;
  }

  flip() {
    return this.flipped = !this.flipped;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLElBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVEsR0FBUjtFQUFZLElBQVo7RUFBaUIsS0FBakI7RUFBdUIsS0FBdkI7RUFBNkIsV0FBN0I7Q0FBQSxNQUFBOztBQUVBLE9BQUE7O0VBQVEsTUFBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0VBQWUsV0FBZjtFQUEyQixNQUEzQjtFQUFrQyxnQkFBbEM7RUFBbUQsS0FBbkQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxTQUFSO0NBQUEsTUFBQTs7QUFFQSxJQUFBLEdBQU8sTUFBTSxDQUFDOztBQUVkLE9BQUEsSUFBYSxRQUFOLE1BQUEsTUFBQTtFQUNOLFdBQWEsQ0FBQSxDQUFBO0FBQ2QsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7UUFpQkMsQ0FBQSxZQUFBLENBQUE7UUEwQkEsQ0FBQSxXQUFBLENBQUEsZ0JBM0NEOzs7Ozs7Ozs7Ozs7Ozs7UUFzRkMsQ0FBQSxjQUFBLENBQUE7UUFXQSxDQUFBLFdBQUEsQ0FBQTtJQWpHQyxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLGNBQUQsR0FBa0I7SUFDbEIsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxPQUFELEdBQVc7QUFDWDtJQUFBLEtBQUEscUNBQUE7O01BQ0ksQ0FBQSxDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQUEsQ0FBQSxHQUFBO2lCQUFHLElBQUMs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QSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtJQUFFLFFBQUEsQ0FBQTtJQUNBLElBQUEsQ0FBSyxPQUFMO0lBQ0EsUUFBQSxDQUFTLElBQUEsR0FBSyxHQUFkO0lBQ0EsT0FBQSxHQUFhLElBQUMsQ0FBQSxPQUFKLEdBQWlCLFVBQWpCLEdBQWlDO0lBQzNDLE1BQUEsR0FBWSxJQUFDLENBQUEsT0FBSixHQUFrQixVQUFsQixHQUFrQztBQUUzQztBQUFBO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxJQUFBLENBQUssT0FBTyxDQUFDLENBQUQsQ0FBWixFQUFnQixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFyQixFQUEyQixJQUFBLEdBQUssR0FBaEM7bUJBQ0EsSUFBQSxDQUFLLE1BQU0sQ0FBQyxDQUFELENBQVgsRUFBZSxJQUFBLEdBQUssSUFBcEIsRUFBeUIsSUFBQSxHQUFLLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBOUI7SUFGRCxDQUFBOztFQVBTOztFQVdWLElBQU8sQ0FBQSxDQUFBO1dBQUcsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFJLElBQUMsQ0FBQTtFQUFuQjs7QUFuR0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9sb2Rhc2gnXHJcbmltcG9ydCB7YXNzLGxlcnAscGFyYW0scmFuZ2UsaGV4VG9CYXNlNjR9IGZyb20gJy4uL2pzL3V0aWxzLmpzJ1xyXG4jIGltcG9ydCBjcnlwdG9KcyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9jcnlwdG8tanMnXHJcbmltcG9ydCB7U3F1YXJlfSBmcm9tICcuLi9qcy9zcXVhcmUuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7Y29vcmRzLGNsaWNrU3RyaW5nLGdsb2JhbCx0b09iamVjdE5vdGF0aW9uLHRvVUNJfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5pbXBvcnQge2R1bXBTdGF0ZX0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuXHJcblNJWkUgPSBnbG9iYWwuU0laRVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvYXJkXHJcblx0Y29uc3RydWN0b3I6IC0+XHJcblx0XHRAc3F1YXJlcyA9IFtdXHJcblx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cdFx0QHBpZWNlcyA9IFwiXCJcclxuXHRcdEBmbGlwcGVkID0gZmFsc2VcclxuXHRcdGZvciBpIGluIHJhbmdlIDY0XHJcblx0XHRcdGRvIChpKSA9PiBAc3F1YXJlcy5wdXNoIG5ldyBTcXVhcmUgaSwgPT4gQGNsaWNrIGlcclxuXHJcblx0XHRAYnV0dG9ucyA9IFtdXHJcblx0XHR4MCA9IDEuNVxyXG5cdFx0eDEgPSAzLjVcclxuXHRcdHgyID0gNS41XHJcblx0XHR4MyA9IDcuNVxyXG5cdFx0QGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIHgwKlNJWkUsIDkuNSpTSVpFLCAnY29ycmVjdCcsID0+IGNsaWNrU3RyaW5nICdjb3JyZWN0J1xyXG5cdFx0QGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIHgxKlNJWkUsIDkuNSpTSVpFLCAnd3JvbmcnLCA9PiBjbGlja1N0cmluZyAnd3JvbmcnXHJcblx0XHRAYnV0dG9ucy5wdXNoIG5ldyBCdXR0b24geDIqU0laRSwgOS41KlNJWkUsICdsaW5rJywgID0+XHJcblx0XHRAYnV0dG9ucy5wdXNoIG5ldyBCdXR0b24geDMqU0laRSwgOS41KlNJWkUsICdkZWJ1ZycsID0+XHJcblxyXG5cdGNsaWNrIDogKGkpID0+XHJcblx0XHRnID0gZ2xvYmFsXHJcblx0XHRpZiBAZmxpcHBlZCB0aGVuIGkgPSA2My1pXHJcblx0XHRjb2wgPSBpICUlIDhcclxuXHRcdHJvdyA9IDctaSAvLyA4XHJcblx0XHRzcSA9IGcuY2hlc3MuYm9hcmQoKVtyb3ddW2NvbF1cclxuXHRcdGNvbG9yID0gXCJ3YlwiW2cuY2hlc3MuaGlzdG9yeSgpLmxlbmd0aCAlJSAyXSAjIGbDtnJ2w6RudGFkIGbDpHJnIHDDpSBwasOkc2VuXHJcblxyXG5cdFx0aWYgQGNsaWNrZWRTcXVhcmVzLmxlbmd0aCA9PSAwXHJcblx0XHRcdGlmIHNxICE9IG51bGwgYW5kIHNxLmNvbG9yID09IGNvbG9yIHRoZW4gQGNsaWNrZWRTcXVhcmVzLnB1c2ggaVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRpZiBpID09IEBjbGlja2VkU3F1YXJlc1swXVxyXG5cdFx0XHRcdEBjbGlja2VkU3F1YXJlcyA9IFtdXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMucHVzaCBpXHJcblx0XHRcdFx0bW92ZSA9IHRvT2JqZWN0Tm90YXRpb24gQGNsaWNrZWRTcXVhcmVzXHJcblx0XHRcdFx0dWNpID0gdG9VQ0kgQGNsaWNrZWRTcXVhcmVzXHJcblx0XHRcdFx0aWYgZy5jaGVzcy5tb3ZlIG1vdmUgIyBhY2NlcGVyYSBkcmFnZXRcclxuXHRcdFx0XHRcdGcuc3RhY2sucHVzaCBnLmN1cnJOb2RlXHJcblx0XHRcdFx0XHQjIGNvbnNvbGUubG9nIHVjaSxnbG9iYWwuY3Vyck5vZGVcclxuXHRcdFx0XHRcdGlmIHVjaSBub3Qgb2YgZy5jdXJyTm9kZVxyXG5cdFx0XHRcdFx0XHRnLmN1cnJOb2RlW3VjaV0gPSB7fVxyXG5cdFx0XHRcdFx0XHRnLmNvdW50KytcclxuXHRcdFx0XHRcdGcuY3Vyck5vZGUgPSBnLmN1cnJOb2RlW3VjaV1cclxuXHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cclxuXHRkcmF3IDogPT5cclxuXHJcblx0XHRAYnV0dG9uc1szXS50ZXh0ID0gaWYgZ2xvYmFsLmNvdW50PjAgdGhlbiAnc2F2ZSAnICsgZ2xvYmFsLmNvdW50IGVsc2UgXCJcIlxyXG5cclxuXHRcdGZvciBidXR0b24gaW4gQGJ1dHRvbnNcclxuXHRcdFx0YnV0dG9uLmRyYXcoKVxyXG5cclxuXHRcdCMgaWYgbm90IGdsb2JhbC50cmVlIHRoZW4gcmV0dXJuXHJcblxyXG5cdFx0ZmlsbCAnd2hpdGUnXHJcblx0XHR0ZXh0U2l6ZSBTSVpFKjAuM1xyXG5cclxuXHRcdCNwdXNoKClcclxuXHRcdCN0ZXh0QWxpZ24gTEVGVCxDRU5URVJcclxuXHRcdCN0ZXh0IGdsb2JhbC5uYW1lLDAuMDUqU0laRSwgMC4zKlNJWkVcclxuXHRcdCNwb3AoKVxyXG5cclxuXHRcdGZvciBpIGluIHJhbmdlIDhcclxuXHRcdFx0Zm9yIGogaW4gcmFuZ2UgOFxyXG5cdFx0XHRcdHBpZWNlID0gZ2xvYmFsLmNoZXNzLmJvYXJkKClbNy1pXVtqXVxyXG5cdFx0XHRcdEBzcXVhcmVzW2kqOCtqXS5kcmF3IHBpZWNlLCBAZmxpcHBlZCwgaSo4K2o9PUBjbGlja2VkU3F1YXJlc1swXVxyXG5cclxuXHRcdHN0cm9rZSAnYmxhY2snXHJcblx0XHRub0ZpbGwoKVxyXG5cdFx0cmVjdCBTSVpFKjQuNSxTSVpFKjQuNSxTSVpFKjgsU0laRSo4XHJcblxyXG5cdFx0QGxpdHRlcmEoKVxyXG5cclxuXHRcdCNwdXNoKClcclxuXHRcdCN0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cclxuXHRcdCN0ZXh0IGdsb2JhbC52ZXJzaW9uLCA3LjUqU0laRSwgMTAqU0laRVxyXG5cdFx0I3RleHRBbGlnbiBSSUdIVCxDRU5URVJcclxuXHJcblx0XHQjIHRleHRTaXplIDIwXHJcblx0XHQjIG4gPSBnbG9iYWwuc3RhY2subGVuZ3RoXHJcblx0XHQjIGlmIG4gPT0gMCB0aGVuIHNjb3JlID0gJzAnXHJcblx0XHQjIGlmIG4lMiA9PSAwIHRoZW4gZmlsbCAnd2hpdGUnIGVsc2UgZmlsbCAnYmxhY2snXHJcblx0XHQjIHRleHQgMStuLy8yLCA5LjQqU0laRSwgMC4zKlNJWkVcclxuXHJcblx0XHQjcG9wKClcclxuXHRcdCMgQHNob3dDaGlsZHJlbigpXHJcblxyXG5cdGxpdHRlcmEgOiA9PlxyXG5cdFx0bm9TdHJva2UoKVxyXG5cdFx0ZmlsbCAnYmxhY2snXHJcblx0XHR0ZXh0U2l6ZSBTSVpFKjAuM1xyXG5cdFx0bGV0dGVycyA9IGlmIEBmbGlwcGVkIHRoZW4gXCJoZ2ZlZGNiYVwiIGVsc2UgXCJhYmNkZWZnaFwiXHJcblx0XHRkaWdpdHMgPSBpZiBAZmxpcHBlZCB0aGVuICBcIjEyMzQ1Njc4XCIgZWxzZSBcIjg3NjU0MzIxXCJcclxuXHJcblx0XHRmb3IgaSBpbiByYW5nZSA4XHJcblx0XHRcdHRleHQgbGV0dGVyc1tpXSxTSVpFKihpKzEpLFNJWkUqOC44XHJcblx0XHRcdHRleHQgZGlnaXRzW2ldLFNJWkUqMC4xNSxTSVpFKihpKzEpXHJcblxyXG5cdGZsaXAgOiA9PiBAZmxpcHBlZCA9IG5vdCBAZmxpcHBlZFxyXG4iXX0=
//# sourceURL=c:\github\2023-022-ChessOpenings-SpacedRepetition\coffee\board.coffee