// Generated by CoffeeScript 2.5.1
var N;

import _ from 'https://cdn.skypack.dev/lodash';

import {
  ass,
  log,
  range
} from '../js/utils.js';

import {
  global
} from '../js/globals.js';

// Kortet är implementerat med en hash:
// q: question. "e2e4.e7e5.g1f3"
// a: answers. ["b8c6,g8f6"] Sorterade i fallande popularitetsordning.
// p: popularity. 12345 (antal partier som spelat detta drag)

// Eventuellt kan denna hash ersättas med ett enda index.
// Övriga data kan enkelt utvinnas mha global.tree.arr
N = 3; // antal boxar

export var SpacedRepetition = class SpacedRepetition {
  constructor(opening) {
    this.reset = this.reset.bind(this);
    this.lengths = this.lengths.bind(this);
    this.pick = this.pick.bind(this);
    this.add = this.add.bind(this);
    this.current = this.current.bind(this);
    this.correct = this.correct.bind(this);
    this.wrong = this.wrong.bind(this);
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.opening = opening;
    this.maximum = [
      4,
      16,
      64 //_.map range(N),(i) => N**i # cirka 1+3+9+27+81==121 kort i systemet
    ];
    //@reset()
    this.load();
  }

  reset() {
    var g, i, j, len, ref, results;
    g = global;
    this.boxes = _.map(this.maximum, function(item) {
      return [];
    });
    this.bindex = -1;
    this.qindex = 0;
    this.start = g.tree.getStart(this.opening);
    this.stopp = g.tree.getStopp(this.opening, this.start);
    console.log('start', this.start, 'stopp', this.stopp);
    this.questions = g.tree.getQuestions(this.start, this.stopp); // array med index till stora arrayen
    //console.log 'getQuestions',g.questions, new Date()-start
    console.log('arr.length ' + g.tree.arr.length);
    console.log('questions.length ' + this.questions.length);
    this.qindex = 0;
    this.path = g.tree.getPath(this.questions[this.qindex]);
    this.answers = g.tree.getAnswers(this.questions[this.qindex], this.stopp);
    ref = range(5);
    //console.log 'getAnswers',g.answers
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      this.add({
        p: g.tree.arr[this.questions[this.qindex]][3],
        q: g.tree.getPath(this.questions[this.qindex]),
        a: g.tree.getAnswers(this.questions[this.qindex], this.stopp)
      });
      results.push(this.qindex++);
    }
    return results;
  }

  lengths() {
    return _.map(this.boxes, (box) => {
      return box.length;
    });
  }

  pick() { // Hämtar ett kort från den box som är relativt mest fylld.
    var g, res;
    res = _.map(this.boxes, (box, i) => {
      return [box.length / this.maximum[i], i];
    });
    res.sort();
    this.bindex = _.last(res)[1];
    g = global;
    this.answers = this.current().a;
    console.log('');
    console.log(this.current().q);
    console.log('popularity:', this.current().p);
    console.log('answers:', this.answers.join(' '));
    return console.log('boxes:', this.lengths(), 'bindex:', this.bindex);
  }

  add(card) {
    return this.boxes[0].push(card);
  }

  current() { // returnerar nuvarande kort.
    if (this.bindex === -1) {
      return null;
    } else {
      return this.boxes[this.bindex][0];
    }
  }

  correct() { // flyttar kortet till nästa box
    var card;
    if (this.bindex === -1) {
      return;
    }
    card = this.boxes[this.bindex].shift();
    if (this.bindex + 1 < this.boxes.length) {
      this.boxes[this.bindex + 1].push(card);
    } else {
      console.log(card, ' is done.');
    }
    this.bindex = -1;
    return this.save();
  }

  wrong() { // flyttar kortet till box 0
    var card;
    if (this.bindex === -1) {
      return;
    }
    card = this.boxes[this.bindex].shift();
    this.boxes[0].push(card);
    this.bindex = -1;
    return this.save();
  }

  load() { // from localStorage
    var data;
    data = localStorage[this.opening];
    if (data) {
      data = JSON.parse(data);
      this.boxes = data.boxes;
      this.bindex = data.bindex;
      this.qindex = data.qindex;
      return console.log('load:', this.opening, this.lengths()); //JSON.stringify {boxes:@boxes,bindex:@bindex,qindex:global.qindex}
    } else {
      this.reset();
      return console.log('load: no data');
    }
  }

  save() { // to localStorage
    localStorage[this.opening] = JSON.stringify({
      boxes: this.boxes,
      bindex: this.bindex,
      qindex: this.qindex
    });
    return console.log('save:', this.opening, this.lengths()); //JSON.stringify {boxes:@boxes,bindex:@bindex,qindex:@qindex}
  }

};


//sr = new SpacedRepetition()
// lägg till fler kort och popularity
// card1 = {q:'e2e4', a:['e7e5']}
// card2 = {q:'e2e4.e7e5', a:['g1f3']}
// console.log card1,card2
// sr.add card1
// sr.add card2
// ass [2,0,0,0,0], sr.lengths()
//ass card1,sr.pick()
// ass [2,0,0,0,0], sr.lengths()
//ass 'e2e4 is pending',sr.pick()

// sr.correct()
// ass [1,1,0,0,0], sr.lengths()
// ass -1, sr.index
// sr.correct()
// ass -1, sr.index
// ass [1,1,0,0,0], sr.lengths()

// ass card2,sr.pick()
// sr.correct()
// ass [0,2,0,0,0], sr.lengths()

//ass card1,sr.pick()
// sr.correct()
// ass [0,1,1,0,0], sr.lengths()

//ass card2,sr.pick()
// sr.correct()
// ass [0,0,2,0,0], sr.lengths()

//ass card1,sr.pick()
// sr.correct()
// ass [0,0,1,1,0], sr.lengths()

//ass card2,sr.pick()
// sr.correct()
// ass [0,0,0,2,0], sr.lengths()

// ass card1,sr.pick()
// sr.correct()
// ass [0,0,0,1,1], sr.lengths()

// ass card2,sr.pick()
// sr.correct()
// ass [0,0,0,0,2], sr.lengths()

// ass card1,sr.pick()
// sr.correct()
// ass [0,0,0,0,1], sr.lengths()

// ass card2,sr.pick()
// sr.wrong()
// ass [1,0,0,0,0], sr.lengths()

// for i in range 4
// 	sr.pick()
// 	sr.correct()

// ass [0,0,0,0,1], sr.lengths()
// sr.pick()
// sr.correct()
// ass [0,0,0,0,0], sr.lengths()
// ass "",sr.pick()

//log sr

// breadthFirstSearch = (tree,level,result,path) =>
// 	for key,node of tree
// 		if key != "n"
// 			path1 = path + "." + key
// 			if level == 0 then result.push path1
// 			breadthFirstSearch node,level-1,result,path1

// result = []
// breadthFirstSearch tree,1,result,""
// log result

// traverseBreadthFirst = (tree,) =>
// 	result = []
// 	queue = []
// 	queue.push tree
// 	while queue.length > 0
// 		node = queue.shift()
// 		for key,value of node
// 			if key != "n"
// 				queue.push value
// 				result.push key
// 	return result

// this function returns the next node of the tree, given the current node, using breadthfirst search
//queue = []
//paths = []
// f = (tree,level) =>
// 	chars = 4*(level+1) + level
// 	queue = [tree]
// 	paths = [""]
// 	i = 0
// 	path = ''
// 	while i < queue.length
// 		node = queue[i]
// 		path = paths[i]
// 		for key of node
// 			if key != 'n'
// 				if path==""
// 					path1 = key
// 				else
// 					path1 = path + '.' + key
// 				if path1.length < chars
// 					queue.push node[key]
// 					paths.push path1
// 		i+=1
// 	paths

//log 'f',f tree,1
//log paths

// getNode = (tree,keys) =>
// 	node = tree
// 	for key in keys
// 		node = node[key]
// 	log 'getNode',keys, _.keys node
// 	node

// g = (tree,path) => gg tree,path.split '.'

// gg = (tree,keys) =>
// 	log 'A',keys
// 	path = keys.join '.'
// 	log 'B',path
// 	node = getNode tree,keys.slice 0,keys.length
// 	log node
// 	keys = f node,keys.length+1
// 	log 'C'
// 	index = keys.indexOf path
// 	log 'D',index
// 	if index == -1
// 		return gg tree, keys.slice 0,keys.length-2
// 	else
// 		return keys[index+1]

// ass "d2d4", g tree,""
// ok ass "e2e4", g tree,"d2d4"
// ok ass "g1f3", g tree,"e2e4"
// ok ass "d2d4.g8f6", g tree,"g2g3"
//ass "d2d4.b7b5.e2e4", g tree,"d2d4.g8f6.c2c4"
// ass "e2e4.c7c5.g1f3", g tree,"d2d4.b7b5.e2e4"
// ass "", g tree, "d2d4.g8f6.c2c4.c7c5.d4d5.e7e6.b1c3.e6d5.c4d5.g7g6.g1f3.d7d6.c1f4.f8g7.d1a4.c8d7.a4b3.d8c7.e2e4"

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2VkX3JlcGV0aXRpb24uanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcc3BhY2VkX3JlcGV0aXRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksR0FBWjtFQUFnQixLQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBLG1CQUZBOzs7Ozs7Ozs7QUFZQSxDQUFBLEdBQUksRUFaSjs7QUFhQSxPQUFBLElBQWEsbUJBQU4sTUFBQSxpQkFBQTtFQUVOLFdBQWMsUUFBQSxDQUFBO1FBS2QsQ0FBQSxZQUFBLENBQUE7UUF1QkEsQ0FBQSxjQUFBLENBQUE7UUFFQSxDQUFBLFdBQUEsQ0FBQTtRQVlBLENBQUEsVUFBQSxDQUFBO1FBRUEsQ0FBQSxjQUFBLENBQUE7UUFHQSxDQUFBLGNBQUEsQ0FBQTtRQVFBLENBQUEsWUFBQSxDQUFBO1FBT0EsQ0FBQSxXQUFBLENBQUE7UUFXQSxDQUFBLFdBQUEsQ0FBQTtJQXpFZSxJQUFDLENBQUE7SUFDZixJQUFDLENBQUEsT0FBRCxHQUFXO01BQUMsQ0FBRDtNQUFHLEVBQUg7TUFBTSxFQUFOO01BQWI7O0lBRUUsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQUhhOztFQUtkLEtBQVEsQ0FBQSxDQUFBO0FBQ1QsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUUsQ0FBQSxHQUFJO0lBQ0osSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFDLENBQUMsR0FBRixDQUFNLElBQUMsQ0FBQSxPQUFQLEVBQWdCLFFBQUEsQ0FBQyxJQUFELENBQUE7YUFBVTtJQUFWLENBQWhCO0lBQ1QsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFDO0lBQ1gsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUVWLElBQUMsQ0FBQSxLQUFELEdBQVMs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dGVudCI6WyJpbXBvcnQgXyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9sb2Rhc2gnXHJcbmltcG9ydCB7YXNzLGxvZyxyYW5nZX0gZnJvbSAnLi4vanMvdXRpbHMuanMnXHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5cclxuIyBLb3J0ZXQgw6RyIGltcGxlbWVudGVyYXQgbWVkIGVuIGhhc2g6XHJcbiMgcTogcXVlc3Rpb24uIFwiZTJlNC5lN2U1LmcxZjNcIlxyXG4jIGE6IGFuc3dlcnMuIFtcImI4YzYsZzhmNlwiXSBTb3J0ZXJhZGUgaSBmYWxsYW5kZSBwb3B1bGFyaXRldHNvcmRuaW5nLlxyXG4jIHA6IHBvcHVsYXJpdHkuIDEyMzQ1IChhbnRhbCBwYXJ0aWVyIHNvbSBzcGVsYXQgZGV0dGEgZHJhZylcclxuXHJcbiMgRXZlbnR1ZWxsdCBrYW4gZGVubmEgaGFzaCBlcnPDpHR0YXMgbWVkIGV0dCBlbmRhIGluZGV4LlxyXG4jIMOWdnJpZ2EgZGF0YSBrYW4gZW5rZWx0IHV0dmlubmFzIG1oYSBnbG9iYWwudHJlZS5hcnJcclxuXHJcbk4gPSAzICMgYW50YWwgYm94YXJcclxuZXhwb3J0IGNsYXNzIFNwYWNlZFJlcGV0aXRpb25cclxuXHJcblx0Y29uc3RydWN0b3IgOiAoQG9wZW5pbmcpIC0+XHJcblx0XHRAbWF4aW11bSA9IFs0LDE2LDY0XSAjXy5tYXAgcmFuZ2UoTiksKGkpID0+IE4qKmkgIyBjaXJrYSAxKzMrOSsyNys4MT09MTIxIGtvcnQgaSBzeXN0ZW1ldFxyXG5cdFx0I0ByZXNldCgpXHJcblx0XHRAbG9hZCgpXHJcblxyXG5cdHJlc2V0IDogPT5cclxuXHRcdGcgPSBnbG9iYWxcclxuXHRcdEBib3hlcyA9IF8ubWFwIEBtYXhpbXVtLCAoaXRlbSkgLT4gW11cclxuXHRcdEBiaW5kZXggPSAtMVxyXG5cdFx0QHFpbmRleCA9IDBcclxuXHJcblx0XHRAc3RhcnQgPSBnLnRyZWUuZ2V0U3RhcnQgQG9wZW5pbmdcclxuXHRcdEBzdG9wcCA9IGcudHJlZS5nZXRTdG9wcCBAb3BlbmluZyxAc3RhcnRcclxuXHRcdGNvbnNvbGUubG9nICdzdGFydCcsQHN0YXJ0LCAnc3RvcHAnLEBzdG9wcFxyXG5cclxuXHRcdEBxdWVzdGlvbnMgPSBnLnRyZWUuZ2V0UXVlc3Rpb25zIEBzdGFydCxAc3RvcHAgIyBhcnJheSBtZWQgaW5kZXggdGlsbCBzdG9yYSBhcnJheWVuXHJcblx0XHQjY29uc29sZS5sb2cgJ2dldFF1ZXN0aW9ucycsZy5xdWVzdGlvbnMsIG5ldyBEYXRlKCktc3RhcnRcclxuXHRcdGNvbnNvbGUubG9nICdhcnIubGVuZ3RoICcrZy50cmVlLmFyci5sZW5ndGhcclxuXHRcdGNvbnNvbGUubG9nICdxdWVzdGlvbnMubGVuZ3RoICcrQHF1ZXN0aW9ucy5sZW5ndGhcclxuXHJcblx0XHRAcWluZGV4ID0gMFxyXG5cdFx0QHBhdGggPSBnLnRyZWUuZ2V0UGF0aCBAcXVlc3Rpb25zW0BxaW5kZXhdXHJcblx0XHRAYW5zd2VycyA9IGcudHJlZS5nZXRBbnN3ZXJzIEBxdWVzdGlvbnNbQHFpbmRleF0sQHN0b3BwXHJcblx0XHQjY29uc29sZS5sb2cgJ2dldEFuc3dlcnMnLGcuYW5zd2Vyc1xyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgNVxyXG5cdFx0XHRAYWRkIHtwOmcudHJlZS5hcnJbQHF1ZXN0aW9uc1tAcWluZGV4XV1bM10sIHE6Zy50cmVlLmdldFBhdGgoQHF1ZXN0aW9uc1tAcWluZGV4XSksIGE6IGcudHJlZS5nZXRBbnN3ZXJzKEBxdWVzdGlvbnNbQHFpbmRleF0sQHN0b3BwKX1cclxuXHRcdFx0QHFpbmRleCsrXHJcblxyXG5cdGxlbmd0aHMgOiA9PiBfLm1hcCBAYm94ZXMsIChib3gpID0+IGJveC5sZW5ndGhcclxuXHJcblx0cGljayA6ID0+ICMgSMOkbXRhciBldHQga29ydCBmcsOlbiBkZW4gYm94IHNvbSDDpHIgcmVsYXRpdnQgbWVzdCBmeWxsZC5cclxuXHRcdHJlcyA9IF8ubWFwIEBib3hlcywgKGJveCxpKSA9PiBbYm94Lmxlbmd0aC9AbWF4aW11bVtpXSwgaV1cclxuXHRcdHJlcy5zb3J0KClcclxuXHRcdEBiaW5kZXggPSBfLmxhc3QocmVzKVsxXVxyXG5cdFx0ZyA9IGdsb2JhbFxyXG5cdFx0QGFuc3dlcnMgPSBAY3VycmVudCgpLmFcclxuXHRcdGNvbnNvbGUubG9nICcnXHJcblx0XHRjb25zb2xlLmxvZyBAY3VycmVudCgpLnFcclxuXHRcdGNvbnNvbGUubG9nICdwb3B1bGFyaXR5OicsIEBjdXJyZW50KCkucFxyXG5cdFx0Y29uc29sZS5sb2cgJ2Fuc3dlcnM6JyxAYW5zd2Vycy5qb2luICcgJ1xyXG5cdFx0Y29uc29sZS5sb2cgJ2JveGVzOicsIEBsZW5ndGhzKCksICdiaW5kZXg6JyxAYmluZGV4XHJcblxyXG5cdGFkZCA6IChjYXJkKSA9PiBAYm94ZXNbMF0ucHVzaCBjYXJkXHJcblxyXG5cdGN1cnJlbnQgOiA9PiAjIHJldHVybmVyYXIgbnV2YXJhbmRlIGtvcnQuXHJcblx0XHRpZiBAYmluZGV4ID09IC0xIHRoZW4gbnVsbCBlbHNlIEBib3hlc1tAYmluZGV4XVswXVxyXG5cclxuXHRjb3JyZWN0IDogPT4gIyBmbHl0dGFyIGtvcnRldCB0aWxsIG7DpHN0YSBib3hcclxuXHRcdGlmIEBiaW5kZXggPT0gLTEgdGhlbiByZXR1cm5cclxuXHRcdGNhcmQgPSBAYm94ZXNbQGJpbmRleF0uc2hpZnQoKVxyXG5cdFx0aWYgQGJpbmRleCsxIDwgQGJveGVzLmxlbmd0aCB0aGVuIEBib3hlc1tAYmluZGV4KzFdLnB1c2ggY2FyZFxyXG5cdFx0ZWxzZSBjb25zb2xlLmxvZyBjYXJkLCcgaXMgZG9uZS4nXHJcblx0XHRAYmluZGV4ID0gLTFcclxuXHRcdEBzYXZlKClcclxuXHJcblx0d3JvbmcgOiA9PiAjIGZseXR0YXIga29ydGV0IHRpbGwgYm94IDBcclxuXHRcdGlmIEBiaW5kZXggPT0gLTEgdGhlbiByZXR1cm5cclxuXHRcdGNhcmQgPSBAYm94ZXNbQGJpbmRleF0uc2hpZnQoKVxyXG5cdFx0QGJveGVzWzBdLnB1c2ggY2FyZFxyXG5cdFx0QGJpbmRleCA9IC0xXHJcblx0XHRAc2F2ZSgpXHJcblxyXG5cdGxvYWQ6ID0+ICMgZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdGRhdGEgPSBsb2NhbFN0b3JhZ2VbQG9wZW5pbmddXHJcblx0XHRpZiBkYXRhXHJcblx0XHRcdGRhdGEgPSBKU09OLnBhcnNlIGRhdGFcclxuXHRcdFx0QGJveGVzID0gZGF0YS5ib3hlc1xyXG5cdFx0XHRAYmluZGV4ID0gZGF0YS5iaW5kZXhcclxuXHRcdFx0QHFpbmRleCA9IGRhdGEucWluZGV4XHJcblx0XHRcdGNvbnNvbGUubG9nICdsb2FkOicsQG9wZW5pbmcsIEBsZW5ndGhzKCkgI0pTT04uc3RyaW5naWZ5IHtib3hlczpAYm94ZXMsYmluZGV4OkBiaW5kZXgscWluZGV4Omdsb2JhbC5xaW5kZXh9XHJcblx0XHRlbHNlXHJcblx0XHRcdEByZXNldCgpXHJcblx0XHRcdGNvbnNvbGUubG9nICdsb2FkOiBubyBkYXRhJ1xyXG5cdHNhdmU6ID0+ICMgdG8gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2VbQG9wZW5pbmddID0gSlNPTi5zdHJpbmdpZnkge2JveGVzOkBib3hlcyxiaW5kZXg6QGJpbmRleCxxaW5kZXg6QHFpbmRleH1cclxuXHRcdGNvbnNvbGUubG9nICdzYXZlOicsQG9wZW5pbmcsQGxlbmd0aHMoKSAjSlNPTi5zdHJpbmdpZnkge2JveGVzOkBib3hlcyxiaW5kZXg6QGJpbmRleCxxaW5kZXg6QHFpbmRleH1cclxuXHJcbiNzciA9IG5ldyBTcGFjZWRSZXBldGl0aW9uKClcclxuIyBsw6RnZyB0aWxsIGZsZXIga29ydCBvY2ggcG9wdWxhcml0eVxyXG4jIGNhcmQxID0ge3E6J2UyZTQnLCBhOlsnZTdlNSddfVxyXG4jIGNhcmQyID0ge3E6J2UyZTQuZTdlNScsIGE6WydnMWYzJ119XHJcbiMgY29uc29sZS5sb2cgY2FyZDEsY2FyZDJcclxuIyBzci5hZGQgY2FyZDFcclxuIyBzci5hZGQgY2FyZDJcclxuIyBhc3MgWzIsMCwwLDAsMF0sIHNyLmxlbmd0aHMoKVxyXG4jYXNzIGNhcmQxLHNyLnBpY2soKVxyXG4jIGFzcyBbMiwwLDAsMCwwXSwgc3IubGVuZ3RocygpXHJcbiNhc3MgJ2UyZTQgaXMgcGVuZGluZycsc3IucGljaygpXHJcblxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyBbMSwxLDAsMCwwXSwgc3IubGVuZ3RocygpXHJcbiMgYXNzIC0xLCBzci5pbmRleFxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyAtMSwgc3IuaW5kZXhcclxuIyBhc3MgWzEsMSwwLDAsMF0sIHNyLmxlbmd0aHMoKVxyXG5cclxuIyBhc3MgY2FyZDIsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDIsMCwwLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDEsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDEsMSwwLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDIsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMiwwLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDEsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMSwxLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDIsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMCwyLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiMgYXNzIGNhcmQxLHNyLnBpY2soKVxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyBbMCwwLDAsMSwxXSwgc3IubGVuZ3RocygpXHJcblxyXG4jIGFzcyBjYXJkMixzci5waWNrKClcclxuIyBzci5jb3JyZWN0KClcclxuIyBhc3MgWzAsMCwwLDAsMl0sIHNyLmxlbmd0aHMoKVxyXG5cclxuIyBhc3MgY2FyZDEsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMCwwLDFdLCBzci5sZW5ndGhzKClcclxuXHJcbiMgYXNzIGNhcmQyLHNyLnBpY2soKVxyXG4jIHNyLndyb25nKClcclxuIyBhc3MgWzEsMCwwLDAsMF0sIHNyLmxlbmd0aHMoKVxyXG5cclxuIyBmb3IgaSBpbiByYW5nZSA0XHJcbiMgXHRzci5waWNrKClcclxuIyBcdHNyLmNvcnJlY3QoKVxyXG5cclxuIyBhc3MgWzAsMCwwLDAsMV0sIHNyLmxlbmd0aHMoKVxyXG4jIHNyLnBpY2soKVxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyBbMCwwLDAsMCwwXSwgc3IubGVuZ3RocygpXHJcbiMgYXNzIFwiXCIsc3IucGljaygpXHJcblxyXG4jbG9nIHNyXHJcblxyXG4jIGJyZWFkdGhGaXJzdFNlYXJjaCA9ICh0cmVlLGxldmVsLHJlc3VsdCxwYXRoKSA9PlxyXG4jIFx0Zm9yIGtleSxub2RlIG9mIHRyZWVcclxuIyBcdFx0aWYga2V5ICE9IFwiblwiXHJcbiMgXHRcdFx0cGF0aDEgPSBwYXRoICsgXCIuXCIgKyBrZXlcclxuIyBcdFx0XHRpZiBsZXZlbCA9PSAwIHRoZW4gcmVzdWx0LnB1c2ggcGF0aDFcclxuIyBcdFx0XHRicmVhZHRoRmlyc3RTZWFyY2ggbm9kZSxsZXZlbC0xLHJlc3VsdCxwYXRoMVxyXG5cclxuIyByZXN1bHQgPSBbXVxyXG4jIGJyZWFkdGhGaXJzdFNlYXJjaCB0cmVlLDEscmVzdWx0LFwiXCJcclxuIyBsb2cgcmVzdWx0XHJcblxyXG4jIHRyYXZlcnNlQnJlYWR0aEZpcnN0ID0gKHRyZWUsKSA9PlxyXG4jIFx0cmVzdWx0ID0gW11cclxuIyBcdHF1ZXVlID0gW11cclxuIyBcdHF1ZXVlLnB1c2ggdHJlZVxyXG4jIFx0d2hpbGUgcXVldWUubGVuZ3RoID4gMFxyXG4jIFx0XHRub2RlID0gcXVldWUuc2hpZnQoKVxyXG4jIFx0XHRmb3Iga2V5LHZhbHVlIG9mIG5vZGVcclxuIyBcdFx0XHRpZiBrZXkgIT0gXCJuXCJcclxuIyBcdFx0XHRcdHF1ZXVlLnB1c2ggdmFsdWVcclxuIyBcdFx0XHRcdHJlc3VsdC5wdXNoIGtleVxyXG4jIFx0cmV0dXJuIHJlc3VsdFxyXG5cclxuIyB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIG5leHQgbm9kZSBvZiB0aGUgdHJlZSwgZ2l2ZW4gdGhlIGN1cnJlbnQgbm9kZSwgdXNpbmcgYnJlYWR0aGZpcnN0IHNlYXJjaFxyXG4jcXVldWUgPSBbXVxyXG4jcGF0aHMgPSBbXVxyXG4jIGYgPSAodHJlZSxsZXZlbCkgPT5cclxuIyBcdGNoYXJzID0gNCoobGV2ZWwrMSkgKyBsZXZlbFxyXG4jIFx0cXVldWUgPSBbdHJlZV1cclxuIyBcdHBhdGhzID0gW1wiXCJdXHJcbiMgXHRpID0gMFxyXG4jIFx0cGF0aCA9ICcnXHJcbiMgXHR3aGlsZSBpIDwgcXVldWUubGVuZ3RoXHJcbiMgXHRcdG5vZGUgPSBxdWV1ZVtpXVxyXG4jIFx0XHRwYXRoID0gcGF0aHNbaV1cclxuIyBcdFx0Zm9yIGtleSBvZiBub2RlXHJcbiMgXHRcdFx0aWYga2V5ICE9ICduJ1xyXG4jIFx0XHRcdFx0aWYgcGF0aD09XCJcIlxyXG4jIFx0XHRcdFx0XHRwYXRoMSA9IGtleVxyXG4jIFx0XHRcdFx0ZWxzZVxyXG4jIFx0XHRcdFx0XHRwYXRoMSA9IHBhdGggKyAnLicgKyBrZXlcclxuIyBcdFx0XHRcdGlmIHBhdGgxLmxlbmd0aCA8IGNoYXJzXHJcbiMgXHRcdFx0XHRcdHF1ZXVlLnB1c2ggbm9kZVtrZXldXHJcbiMgXHRcdFx0XHRcdHBhdGhzLnB1c2ggcGF0aDFcclxuIyBcdFx0aSs9MVxyXG4jIFx0cGF0aHNcclxuXHJcbiNsb2cgJ2YnLGYgdHJlZSwxXHJcbiNsb2cgcGF0aHNcclxuXHJcbiMgZ2V0Tm9kZSA9ICh0cmVlLGtleXMpID0+XHJcbiMgXHRub2RlID0gdHJlZVxyXG4jIFx0Zm9yIGtleSBpbiBrZXlzXHJcbiMgXHRcdG5vZGUgPSBub2RlW2tleV1cclxuIyBcdGxvZyAnZ2V0Tm9kZScsa2V5cywgXy5rZXlzIG5vZGVcclxuIyBcdG5vZGVcclxuXHJcbiMgZyA9ICh0cmVlLHBhdGgpID0+IGdnIHRyZWUscGF0aC5zcGxpdCAnLidcclxuXHJcbiMgZ2cgPSAodHJlZSxrZXlzKSA9PlxyXG4jIFx0bG9nICdBJyxrZXlzXHJcbiMgXHRwYXRoID0ga2V5cy5qb2luICcuJ1xyXG4jIFx0bG9nICdCJyxwYXRoXHJcbiMgXHRub2RlID0gZ2V0Tm9kZSB0cmVlLGtleXMuc2xpY2UgMCxrZXlzLmxlbmd0aFxyXG4jIFx0bG9nIG5vZGVcclxuIyBcdGtleXMgPSBmIG5vZGUsa2V5cy5sZW5ndGgrMVxyXG4jIFx0bG9nICdDJ1xyXG4jIFx0aW5kZXggPSBrZXlzLmluZGV4T2YgcGF0aFxyXG4jIFx0bG9nICdEJyxpbmRleFxyXG4jIFx0aWYgaW5kZXggPT0gLTFcclxuIyBcdFx0cmV0dXJuIGdnIHRyZWUsIGtleXMuc2xpY2UgMCxrZXlzLmxlbmd0aC0yXHJcbiMgXHRlbHNlXHJcbiMgXHRcdHJldHVybiBrZXlzW2luZGV4KzFdXHJcblxyXG4jIGFzcyBcImQyZDRcIiwgZyB0cmVlLFwiXCJcclxuIyBvayBhc3MgXCJlMmU0XCIsIGcgdHJlZSxcImQyZDRcIlxyXG4jIG9rIGFzcyBcImcxZjNcIiwgZyB0cmVlLFwiZTJlNFwiXHJcbiMgb2sgYXNzIFwiZDJkNC5nOGY2XCIsIGcgdHJlZSxcImcyZzNcIlxyXG4jYXNzIFwiZDJkNC5iN2I1LmUyZTRcIiwgZyB0cmVlLFwiZDJkNC5nOGY2LmMyYzRcIlxyXG4jIGFzcyBcImUyZTQuYzdjNS5nMWYzXCIsIGcgdHJlZSxcImQyZDQuYjdiNS5lMmU0XCJcclxuIyBhc3MgXCJcIiwgZyB0cmVlLCBcImQyZDQuZzhmNi5jMmM0LmM3YzUuZDRkNS5lN2U2LmIxYzMuZTZkNS5jNGQ1Lmc3ZzYuZzFmMy5kN2Q2LmMxZjQuZjhnNy5kMWE0LmM4ZDcuYTRiMy5kOGM3LmUyZTRcIlxyXG4iXX0=
//# sourceURL=c:\github\2023-022-ChessOpenings-SpacedRepetition\coffee\spaced_repetition.coffee