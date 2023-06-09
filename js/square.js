// Generated by CoffeeScript 2.5.1
var SIZE, pics, width,
  indexOf = [].indexOf;

import {
  global
} from '../js/globals.js';

import {
  param
} from '../js/utils.js';

SIZE = global.SIZE;

pics = global.pics;

width = global.width;

export var Square = class Square {
  constructor(i, onclick) {
    this.draw = this.draw.bind(this);
    this.inside = this.inside.bind(this);
    this.i = i;
    this.onclick = onclick;
    param.Integer(this.i);
    this.x = this.i % 8;
    this.y = 7 - Math.floor(this.i / 8);
    this.w = SIZE;
    this.h = SIZE;
    this.col = 'white';
  }

  draw(piece, flipped, selected) {
    var key, ref, ref1, x, y;
    param.Test(piece === null || (ref = piece.type, indexOf.call('rnbqkp', ref) >= 0) && (ref1 = piece.color, indexOf.call('bw', ref1) >= 0));
    param.Boolean(flipped);
    if ((this.x + this.y) % 2 === 1) {
      fill('gray');
    } else {
      fill('lightgray');
    }
    if (selected) {
      fill('green');
    }
    [x, y] = flipped ? [7 - this.x, 7 - this.y] : [this.x, this.y];
    noStroke();
    rect(SIZE * (x + 1), SIZE * (y + 1), SIZE, SIZE);
    if (!piece) {
      return;
    }
    key = piece.type.toLowerCase();
    if (piece.color === 'w') {
      key = key.toUpperCase();
    }
    return image(pics[key], SIZE * (x + 0.5), SIZE * (y + 0.5), SIZE, SIZE);
  }

  inside(mx, my) {
    var res, x, y;
    param.Number(mx);
    param.Number(my);
    x = (this.x + 1) * SIZE;
    y = (this.y + 1) * SIZE;
    res = (x - this.w / 2 < mx && mx < x + this.w / 2) && (y - this.h / 2 < my && my < y + this.h / 2);
    return param.Boolean(res);
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3F1YXJlLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNxdWFyZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxLQUFSO0NBQUEsTUFBQTs7QUFFQSxJQUFBLEdBQU8sTUFBTSxDQUFDOztBQUNkLElBQUEsR0FBTyxNQUFNLENBQUM7O0FBQ2QsS0FBQSxHQUFRLE1BQU0sQ0FBQzs7QUFFZixPQUFBLElBQWEsU0FBTixNQUFBLE9BQUE7RUFDTixXQUFhLEVBQUEsU0FBQSxDQUFBO1FBUWIsQ0FBQSxXQUFBLENBQUE7UUFhQSxDQUFBLGFBQUEsQ0FBQTtJQXJCYyxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFDakIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFDLENBQUEsQ0FBZjtJQUNBLElBQUMsQ0FBQSxDQUFELEdBQUssSUFBQyxDQUFBLENBQUQsR0FBRztJQUNSLElBQUMsQ0FBQSxDQUFELEdBQUssQ0FBQSxjQUFJLElBQUMsQ0FBQSxJQUFHO0lBQ2IsSUFBQyxDQUFBLENBQUQsR0FBSztJQUNMLElBQUMsQ0FBQSxDQUFELEdBQUs7SUFDTCxJQUFDLENBQUEsR0FBRCxHQUFPO0VBTks7O0VBUWIsSUFBTyxDQUFDLEtBQUQsRUFBTyxPQUFQLEVBQWUsUUFBZixDQUFBO0FBQ1IsUUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUE7SUFBRSxLQUFLLENBQUMsSUFBTixDQUFXLEtBQUEsS0FBTyxJQUFQLFdBQWUsS0FBSyxDQUFDLG1CQUFRLFVBQWQsVUFBQSxZQUEyQixLQUFLLENBQUMsb0JBQVMsTUFBZixXQUFyRDtJQUNBLEtBQUssQ0FBQyxPQUFOLENBQWMsT0FBZDtJQUNBLElBQUcsQ0FBQyxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFMLENBQUEsR0FBVSxDQUFWLEtBQWUsQ0FBbEI7TUFBeUIsSUFBQSxDQUFLLE1BQUwsRUFBekI7S0FBQSxNQUFBO01BQTBDLElBQUEsQ0FBSyxXQUFMLEVBQTFDOztJQUNBLElBQUcsUUFBSDtNQUFpQixJQUFBLENBQUssT0FBTCxFQUFqQjs7SUFDQSxDQUFDLENBQUQsRUFBRyxDQUFILENBQUEsR0FBVyxPQUFILEdBQWdCLENBQUMsQ0FBQSxHQUFFLElBQUMsQ0FBQSxDQUFKLEVBQU0sQ0FBQSxHQUFFLElBQUMsQ0FBQSxDQUFULENBQWhCLEdBQWlDLENBQUMsSUFBQyxDQUFBLENBQUYsRUFBSSxJQUFDLENBQUEsQ0FBTDtJQUN6QyxRQUFBLENBQUE7SUFDQSxJQUFBLENBQUssSUFBQSxHQUFLLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBVixFQUFnQixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFyQixFQUEyQixJQUEzQixFQUFnQyxJQUFoQztJQUNBLElBQUcsQ0FBSSxLQUFQO0FBQWtCLGFBQWxCOztJQUNBLEdBQUEsR0FBTSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVgsQ0FBQTtJQUNOLElBQUcsS0FBSyxDQUFDLEtBQU4sS0FBZSxHQUFsQjtNQUEyQixHQUFBLEdBQU0sR0FBRyxDQUFDLFdBQUosQ0FBQSxFQUFqQzs7V0FDQSxLQUFBLENBQU0sSUFBSSxDQUFDLEdBQUQsQ0FBVixFQUFnQixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsR0FBSCxDQUFyQixFQUE2QixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsR0FBSCxDQUFsQyxFQUEwQyxJQUExQyxFQUErQyxJQUEvQztFQVhNOztFQWFQLE1BQVMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFBO0FBQ1YsUUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBO0lBQUUsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiO0lBQ0EsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiO0lBQ0EsQ0FBQSxHQUFJLENBQUMsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFKLENBQUEsR0FBTztJQUNYLENBQUEsR0FBSSxDQUFDLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBSixDQUFBLEdBQU87SUFDWCxHQUFBLEdBQU0sQ0FBQSxDQUFBLEdBQUUsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFMLEdBQVMsRUFBVCxJQUFTLEVBQVQsR0FBYyxDQUFBLEdBQUUsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFuQixDQUFBLElBQXlCLENBQUEsQ0FBQSxHQUFFLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBTCxHQUFTLEVBQVQsSUFBUyxFQUFULEdBQWMsQ0FBQSxHQUFFLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBbkI7V0FDL0IsS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUFkO0VBTlE7O0FBdEJIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4uL2pzL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7cGFyYW19IGZyb20gJy4uL2pzL3V0aWxzLmpzJ1xyXG5cclxuU0laRSA9IGdsb2JhbC5TSVpFXHJcbnBpY3MgPSBnbG9iYWwucGljc1xyXG53aWR0aCA9IGdsb2JhbC53aWR0aFxyXG5cclxuZXhwb3J0IGNsYXNzIFNxdWFyZVxyXG5cdGNvbnN0cnVjdG9yOiAoQGksQG9uY2xpY2spIC0+XHJcblx0XHRwYXJhbS5JbnRlZ2VyIEBpXHJcblx0XHRAeCA9IEBpJThcclxuXHRcdEB5ID0gNyAtIEBpLy84XHJcblx0XHRAdyA9IFNJWkVcclxuXHRcdEBoID0gU0laRVxyXG5cdFx0QGNvbCA9ICd3aGl0ZSdcclxuXHJcblx0ZHJhdyA6IChwaWVjZSxmbGlwcGVkLHNlbGVjdGVkKSA9PlxyXG5cdFx0cGFyYW0uVGVzdCBwaWVjZT09bnVsbCBvciBwaWVjZS50eXBlIGluICdybmJxa3AnIGFuZCBwaWVjZS5jb2xvciBpbiAnYncnXHJcblx0XHRwYXJhbS5Cb29sZWFuIGZsaXBwZWRcclxuXHRcdGlmIChAeCtAeSkgJSAyID09IDEgdGhlbiBmaWxsICdncmF5JyBlbHNlIGZpbGwgJ2xpZ2h0Z3JheSdcclxuXHRcdGlmIHNlbGVjdGVkIHRoZW4gZmlsbCAnZ3JlZW4nXHJcblx0XHRbeCx5XSA9IGlmIGZsaXBwZWQgdGhlbiBbNy1AeCw3LUB5XSBlbHNlIFtAeCxAeV1cclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdHJlY3QgU0laRSooeCsxKSxTSVpFKih5KzEpLFNJWkUsU0laRVxyXG5cdFx0aWYgbm90IHBpZWNlIHRoZW4gcmV0dXJuIFxyXG5cdFx0a2V5ID0gcGllY2UudHlwZS50b0xvd2VyQ2FzZSgpXHJcblx0XHRpZiBwaWVjZS5jb2xvciA9PSAndycgdGhlbiBrZXkgPSBrZXkudG9VcHBlckNhc2UoKVxyXG5cdFx0aW1hZ2UgcGljc1trZXldLFNJWkUqKHgrMC41KSxTSVpFKih5KzAuNSksU0laRSxTSVpFXHJcblxyXG5cdGluc2lkZSA6IChteCxteSkgPT5cclxuXHRcdHBhcmFtLk51bWJlciBteFxyXG5cdFx0cGFyYW0uTnVtYmVyIG15XHJcblx0XHR4ID0gKEB4KzEpKlNJWkVcclxuXHRcdHkgPSAoQHkrMSkqU0laRVxyXG5cdFx0cmVzID0geC1Ady8yIDwgbXggPCB4K0B3LzIgYW5kIHktQGgvMiA8IG15IDwgeStAaC8yXHJcblx0XHRwYXJhbS5Cb29sZWFuIHJlc1xyXG4iXX0=
//# sourceURL=c:\github\2023-022-ChessOpenings-SpacedRepetition\coffee\square.coffee