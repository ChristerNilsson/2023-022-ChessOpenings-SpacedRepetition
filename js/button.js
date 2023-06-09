// Generated by CoffeeScript 2.5.1
import {
  global
} from '../js/globals.js';

import {
  param,
  range
} from '../js/utils.js';

export var Button = class Button {
  constructor(x1, y1, text1, onclick) {
    this.draw = this.draw.bind(this);
    this.inside = this.inside.bind(this);
    this.x = x1;
    this.y = y1;
    this.text = text1;
    this.onclick = onclick;
    param.Compact("NNSF", arguments);
    this.w = 1.7 * global.SIZE;
    this.h = 0.7 * global.SIZE;
    this.bg = 'lightgray';
    this.fg = 'black';
    this.align = CENTER;
  }

  draw() {
    var x;
    noStroke();
    fill(this.bg);
    rect(this.x, this.y, this.w, this.h * 0.65);
    if (this.align === LEFT) {
      x = this.x - 0.45 * this.w;
    } else {
      x = this.x;
    }
    fill(this.fg);
    push();
    textSize(0.4 * global.SIZE);
    textAlign(this.align);
    noStroke();
    text(this.text, x, this.y + 0.05 * global.SIZE);
    return pop();
  }

  inside(x, y) {
    param.Number(x);
    param.Number(y);
    return param.Boolean((this.x - this.w / 2 < x && x < this.x + this.w / 2) && (this.y - this.h / 2 < y && y < this.y + this.h / 2));
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXGJ1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsS0FBUjtFQUFjLEtBQWQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxTQUFOLE1BQUEsT0FBQTtFQUNOLFdBQWEsR0FBQSxJQUFBLE9BQUEsU0FBQSxDQUFBO1FBUWIsQ0FBQSxXQUFBLENBQUE7UUFjQSxDQUFBLGFBQUEsQ0FBQTtJQXRCYyxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBSyxJQUFDLENBQUE7SUFDMUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFkLEVBQXFCLFNBQXJCO0lBQ0EsSUFBQyxDQUFBLENBQUQsR0FBSyxHQUFBLEdBQU0sTUFBTSxDQUFDO0lBQ2xCLElBQUMsQ0FBQSxDQUFELEdBQUssR0FBQSxHQUFNLE1BQU0sQ0FBQztJQUNsQixJQUFDLENBQUEsRUFBRCxHQUFNO0lBQ04sSUFBQyxDQUFBLEVBQUQsR0FBTTtJQUNOLElBQUMsQ0FBQSxLQUFELEdBQVM7RUFORzs7RUFRYixJQUFPLENBQUEsQ0FBQTtBQUNSLFFBQUE7SUFBRSxRQUFBLENBQUE7SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLEVBQU47SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUSxJQUFDLENBQUEsQ0FBVCxFQUFXLElBQUMsQ0FBQSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFqQjtJQUVBLElBQUcsSUFBQyxDQUFBLEtBQUQsS0FBUSxJQUFYO01BQXFCLENBQUEsR0FBRSxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUEsR0FBSyxJQUFDLENBQUEsRUFBaEM7S0FBQSxNQUFBO01BQXVDLENBQUEsR0FBRSxJQUFDLENBQUEsRUFBMUM7O0lBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxFQUFOO0lBQ0EsSUFBQSxDQUFBO0lBQ0EsUUFBQSxDQUFTLEdBQUEsR0FBSSxNQUFNLENBQUMsSUFBcEI7SUFDQSxTQUFBLENBQVUsSUFBQyxDQUFBLEtBQVg7SUFDQSxRQUFBLENBQUE7SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLElBQU4sRUFBWSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFBLEdBQUssTUFBTSxDQUFDLElBQTdCO1dBQ0EsR0FBQSxDQUFBO0VBWk07O0VBY1AsTUFBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQUE7SUFDUixLQUFLLENBQUMsTUFBTixDQUFhLENBQWI7SUFDQSxLQUFLLENBQUMsTUFBTixDQUFhLENBQWI7V0FDQSxLQUFLLENBQUMsT0FBTixDQUFjLENBQUEsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQU4sR0FBVSxDQUFWLElBQVUsQ0FBVixHQUFjLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFwQixDQUFBLElBQTBCLENBQUEsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQU4sR0FBVSxDQUFWLElBQVUsQ0FBVixHQUFjLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFwQixDQUF4QztFQUhROztBQXZCSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5pbXBvcnQge3BhcmFtLHJhbmdlfSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25cclxuXHRjb25zdHJ1Y3RvcjogKEB4LEB5LEB0ZXh0LEBvbmNsaWNrKSAtPlxyXG5cdFx0cGFyYW0uQ29tcGFjdCBcIk5OU0ZcIixhcmd1bWVudHNcclxuXHRcdEB3ID0gMS43ICogZ2xvYmFsLlNJWkVcclxuXHRcdEBoID0gMC43ICogZ2xvYmFsLlNJWkVcclxuXHRcdEBiZyA9ICdsaWdodGdyYXknXHJcblx0XHRAZmcgPSAnYmxhY2snXHJcblx0XHRAYWxpZ24gPSBDRU5URVJcclxuXHJcblx0ZHJhdyA6ID0+XHJcblx0XHRub1N0cm9rZSgpXHJcblx0XHRmaWxsIEBiZ1xyXG5cdFx0cmVjdCBAeCxAeSxAdyxAaCowLjY1XHJcblxyXG5cdFx0aWYgQGFsaWduPT1MRUZUIHRoZW4geD1AeC0wLjQ1KkB3IGVsc2UgeD1AeFxyXG5cdFx0ZmlsbCBAZmdcclxuXHRcdHB1c2goKVxyXG5cdFx0dGV4dFNpemUgMC40Kmdsb2JhbC5TSVpFXHJcblx0XHR0ZXh0QWxpZ24gQGFsaWduXHJcblx0XHRub1N0cm9rZSgpXHJcblx0XHR0ZXh0IEB0ZXh0LCB4LEB5KzAuMDUqZ2xvYmFsLlNJWkVcclxuXHRcdHBvcCgpXHJcblxyXG5cdGluc2lkZSA6ICh4LHkpID0+XHJcblx0XHRwYXJhbS5OdW1iZXIgeFxyXG5cdFx0cGFyYW0uTnVtYmVyIHlcclxuXHRcdHBhcmFtLkJvb2xlYW4gQHgtQHcvMiA8IHggPCBAeCtAdy8yIGFuZCBAeS1AaC8yIDwgeSA8IEB5K0BoLzJcclxuIl19
//# sourceURL=c:\github\2023-022-ChessOpenings-SpacedRepetition\coffee\button.coffee