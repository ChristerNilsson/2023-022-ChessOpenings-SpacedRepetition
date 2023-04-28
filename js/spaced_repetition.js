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
    this.reset();
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
    data = JSON.parse(localStorage[this.opening]);
    if (data) {
      this.boxes = data.boxes;
      this.bindex = data.bindex;
      this.qindex = data.qindex;
      return console.log('load:', this.opening, this.lengths()); //JSON.stringify {boxes:@boxes,bindex:@bindex,qindex:global.qindex}
    } else {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2VkX3JlcGV0aXRpb24uanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcc3BhY2VkX3JlcGV0aXRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksR0FBWjtFQUFnQixLQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBLG1CQUZBOzs7Ozs7Ozs7QUFZQSxDQUFBLEdBQUksRUFaSjs7QUFhQSxPQUFBLElBQWEsbUJBQU4sTUFBQSxpQkFBQTtFQUVOLFdBQWMsUUFBQSxDQUFBO1FBS2QsQ0FBQSxZQUFBLENBQUE7UUF1QkEsQ0FBQSxjQUFBLENBQUE7UUFFQSxDQUFBLFdBQUEsQ0FBQTtRQVlBLENBQUEsVUFBQSxDQUFBO1FBRUEsQ0FBQSxjQUFBLENBQUE7UUFHQSxDQUFBLGNBQUEsQ0FBQTtRQVFBLENBQUEsWUFBQSxDQUFBO1FBT0EsQ0FBQSxXQUFBLENBQUE7UUFTQSxDQUFBLFdBQUEsQ0FBQTtJQXZFZSxJQUFDLENBQUE7SUFDZixJQUFDLENBQUEsT0FBRCxHQUFXO01BQUMsQ0FBRDtNQUFHLEVBQUg7TUFBTSxFQUFOOztJQUNYLElBQUMsQ0FBQSxLQUFELENBQUE7SUFDQSxJQUFDLENBQUEsSUFBRCxDQUFBO0VBSGE7O0VBS2QsS0FBUSxDQUFBLENBQUE7QUFDVCxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7SUFBRSxDQUFBLEdBQUk7SUFDSixJQUFDLENBQUEsS0FBRCxHQUFTLENBQUMsQ0FBQyxHQUFGLENBQU0sSUFBQyxDQUFBLE9BQVAsRUFBZ0IsUUFBQSxDQUFDLElBQUQsQ0FBQTthQUFVO0lBQVYsQ0FBaEI7SUFDVCxJQUFDLENBQUEsTUFBRCxHQUFVLENBQUM7SUFDWCxJQUFDLENBQUEsTUFBRCxHQUFVO0lBRVYsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVAsQ0FBZ0IsSUFBQyxDQUFBLE9BQWpCO0lBQ1QsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVAsQ0FBZ0IsSUFBQyxDQUFBLE9BQWpCLEVBQXlCLElBQUMsQ0FBQSxLQUExQjtJQUNULE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWixFQUFvQixJQUFDLENBQUEsS0FBckIsRUFBNEIsT0FBNUIsRUFBb0MsSUFBQyxDQUFBLEtBQXJDO0lBRUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVAsQ0FBb0IsSUFBQyxDQUFBLEtBQXJCLEVBQTJCLElBQUMsQ0FBQSxLQUE1QixFQVRmOztJQVdFLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBQSxHQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQXJDO0lBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBQSxHQUFvQixJQUFDLENBQUEsU0FBUyxDQUFDLE1BQTNDO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFQLENBQWUsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFDLENBQUEsTUFBRixDQUF6QjtJQUNSLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFQLENBQWtCLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBQyxDQUFBLE1BQUYsQ0FBNUIsRUFBc0MsSUFBQyxDQUFBLEtBQXZDO0FBRVg7O0FBQUE7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUMsQ0FBQSxHQUFELENBQUs7UUFBQyxDQUFBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFDLENBQUEsTUFBRixDQUFYLENBQXFCLENBQUMsQ0FBRCxDQUFsQztRQUF1QyxDQUFBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFQLENBQWUsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFDLENBQUEsTUFBRixDQUF6QixDQUF6QztRQUE4RSxDQUFBLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFQLENBQWtCLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBQyxDQUFBLE1BQUYsQ0FBNUIsRUFBc0MsSUFBQyxDQUFBLEtBQXZDO01BQWpGLENBQUw7bUJBQ0EsSUFBQyxDQUFBLE1BQUQ7SUFGRCxDQUFBOztFQW5CTzs7RUF1QlIsT0FBVSxDQUFBLENBQUE7V0FBRyxDQUFDLENBQUMsR0FBRixDQUFNLElBQUMsQ0FBQSxLQUFQLEVBQWMsQ0FBQyxHQUFELENBQUEsR0FBQTthQUFTLEdBQUcsQ0FBQztJQUFiLENBQWQ7RUFBSDs7RUFFVixJQUFPLENBQUEsQ0FBQSxFQUFBO0FBQ1IsUUFBQSxDQUFBLEVBQUE7SUFBRSxHQUFBLEdBQU0sQ0FBQyxDQUFDLEdBQUYsQ0FBTSxJQUFDLENBQUEsS0FBUCxFQUFjLENBQUMsR0FBRCxFQUFLLENBQUwsQ0FBQSxHQUFBO2FBQVcsQ0FBQyxHQUFHLENBQUMsTUFBSixHQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBRCxDQUFwQixFQUF5QixDQUF6QjtJQUFYLENBQWQ7SUFDTixHQUFHLENBQUMsSUFBSixDQUFBO0lBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFDLENBQUMsSUFBRixDQUFPLEdBQVAsQ0FBVyxDQUFDLENBQUQ7SUFDckIsQ0FBQSxHQUFJO0lBQ0osSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsT0FBRCxDQUFBLENBQVUsQ0FBQztJQUN0QixPQUFPLENBQUMsR0FBUixDQUFZLEVBQVo7SUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBVSxDQUFDLENBQXZCO0lBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBVSxDQUFDLENBQXRDO0lBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXVCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLEdBQWQsQ0FBdkI7V0FDQSxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVosRUFBc0IsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUF0QixFQUFrQyxTQUFsQyxFQUE0QyxJQUFDLENBQUEsTUFBN0M7RUFWTTs7RUFZUCxHQUFNLENBQUMsSUFBRCxDQUFBO1dBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxDQUFELENBQUcsQ0FBQyxJQUFWLENBQWUsSUFBZjtFQUFWOztFQUVOLE9BQVUsQ0FBQSxDQUFBLEVBQUE7SUFDVCxJQUFHLElBQUMsQ0FBQSxNQUFELEtBQVcsQ0FBQyxDQUFmO2FBQXNCLEtBQXRCO0tBQUEsTUFBQTthQUFnQyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQUMsQ0FBQSxNQUFGLENBQVMsQ0FBQyxDQUFELEVBQS9DOztFQURTOztFQUdWLE9BQVUsQ0FBQSxDQUFBLEVBQUE7QUFDWCxRQUFBO0lBQUUsSUFBRyxJQUFDLENBQUEsTUFBRCxLQUFXLENBQUMsQ0FBZjtBQUFzQixhQUF0Qjs7SUFDQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFDLENBQUEsTUFBRixDQUFTLENBQUMsS0FBaEIsQ0FBQTtJQUNQLElBQUcsSUFBQyxDQUFBLE1BQUQsR0FBUSxDQUFSLEdBQVksSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUF0QjtNQUFrQyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQUMsQ0FBQSxNQUFELEdBQVEsQ0FBVCxDQUFXLENBQUMsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBbEM7S0FBQSxNQUFBO01BQ0ssT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaLEVBQWlCLFdBQWpCLEVBREw7O0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFDO1dBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQU5TOztFQVFWLEtBQVEsQ0FBQSxDQUFBLEVBQUE7QUFDVCxRQUFBO0lBQUUsSUFBRyxJQUFDLENBQUEsTUFBRCxLQUFXLENBQUMsQ0FBZjtBQUFzQixhQUF0Qjs7SUFDQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFDLENBQUEsTUFBRixDQUFTLENBQUMsS0FBaEIsQ0FBQTtJQUNQLElBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBRCxDQUFHLENBQUMsSUFBVixDQUFlLElBQWY7SUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLENBQUM7V0FDWCxJQUFDLENBQUEsSUFBRCxDQUFBO0VBTE87O0VBT1IsSUFBTSxDQUFBLENBQUEsRUFBQTtBQUNQLFFBQUE7SUFBRSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxZQUFZLENBQUMsSUFBQyxDQUFBLE9BQUYsQ0FBdkI7SUFDUCxJQUFHLElBQUg7TUFDQyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQztNQUNkLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxDQUFDO01BQ2YsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLENBQUM7YUFDZixPQUFPLENBQUMsR0FBUixDQUFZLE9BQVosRUFBb0IsSUFBQyxDQUFBLE9BQXJCLEVBQThCLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBOUIsRUFKRDtLQUFBLE1BQUE7YUFNQyxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVosRUFORDs7RUFGSzs7RUFTTixJQUFNLENBQUEsQ0FBQSxFQUFBO0lBQ0wsWUFBWSxDQUFDLElBQUMsQ0FBQSxPQUFGLENBQVosR0FBeUIsSUFBSSxDQUFDLFNBQUwsQ0FBZTtNQUFDLEtBQUEsRUFBTSxJQUFDLENBQUEsS0FBUjtNQUFjLE1BQUEsRUFBTyxJQUFDLENBQUEsTUFBdEI7TUFBNkIsTUFBQSxFQUFPLElBQUMsQ0FBQTtJQUFyQyxDQUFmO1dBQ3pCLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWixFQUFvQixJQUFDLENBQUEsT0FBckIsRUFBNkIsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUE3QixFQUZLO0VBQUE7O0FBekVBOztBQWJQIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvbG9kYXNoJ1xyXG5pbXBvcnQge2Fzcyxsb2cscmFuZ2V9IGZyb20gJy4uL2pzL3V0aWxzLmpzJ1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuXHJcbiMgS29ydGV0IMOkciBpbXBsZW1lbnRlcmF0IG1lZCBlbiBoYXNoOlxyXG4jIHE6IHF1ZXN0aW9uLiBcImUyZTQuZTdlNS5nMWYzXCJcclxuIyBhOiBhbnN3ZXJzLiBbXCJiOGM2LGc4ZjZcIl0gU29ydGVyYWRlIGkgZmFsbGFuZGUgcG9wdWxhcml0ZXRzb3JkbmluZy5cclxuIyBwOiBwb3B1bGFyaXR5LiAxMjM0NSAoYW50YWwgcGFydGllciBzb20gc3BlbGF0IGRldHRhIGRyYWcpXHJcblxyXG4jIEV2ZW50dWVsbHQga2FuIGRlbm5hIGhhc2ggZXJzw6R0dGFzIG1lZCBldHQgZW5kYSBpbmRleC5cclxuIyDDlnZyaWdhIGRhdGEga2FuIGVua2VsdCB1dHZpbm5hcyBtaGEgZ2xvYmFsLnRyZWUuYXJyXHJcblxyXG5OID0gMyAjIGFudGFsIGJveGFyXHJcbmV4cG9ydCBjbGFzcyBTcGFjZWRSZXBldGl0aW9uXHJcblxyXG5cdGNvbnN0cnVjdG9yIDogKEBvcGVuaW5nKSAtPlxyXG5cdFx0QG1heGltdW0gPSBbNCwxNiw2NF0gI18ubWFwIHJhbmdlKE4pLChpKSA9PiBOKippICMgY2lya2EgMSszKzkrMjcrODE9PTEyMSBrb3J0IGkgc3lzdGVtZXRcclxuXHRcdEByZXNldCgpXHJcblx0XHRAbG9hZCgpXHJcblxyXG5cdHJlc2V0IDogPT5cclxuXHRcdGcgPSBnbG9iYWxcclxuXHRcdEBib3hlcyA9IF8ubWFwIEBtYXhpbXVtLCAoaXRlbSkgLT4gW11cclxuXHRcdEBiaW5kZXggPSAtMVxyXG5cdFx0QHFpbmRleCA9IDBcclxuXHJcblx0XHRAc3RhcnQgPSBnLnRyZWUuZ2V0U3RhcnQgQG9wZW5pbmdcclxuXHRcdEBzdG9wcCA9IGcudHJlZS5nZXRTdG9wcCBAb3BlbmluZyxAc3RhcnRcclxuXHRcdGNvbnNvbGUubG9nICdzdGFydCcsQHN0YXJ0LCAnc3RvcHAnLEBzdG9wcFxyXG5cclxuXHRcdEBxdWVzdGlvbnMgPSBnLnRyZWUuZ2V0UXVlc3Rpb25zIEBzdGFydCxAc3RvcHAgIyBhcnJheSBtZWQgaW5kZXggdGlsbCBzdG9yYSBhcnJheWVuXHJcblx0XHQjY29uc29sZS5sb2cgJ2dldFF1ZXN0aW9ucycsZy5xdWVzdGlvbnMsIG5ldyBEYXRlKCktc3RhcnRcclxuXHRcdGNvbnNvbGUubG9nICdhcnIubGVuZ3RoICcrZy50cmVlLmFyci5sZW5ndGhcclxuXHRcdGNvbnNvbGUubG9nICdxdWVzdGlvbnMubGVuZ3RoICcrQHF1ZXN0aW9ucy5sZW5ndGhcclxuXHJcblx0XHRAcWluZGV4ID0gMFxyXG5cdFx0QHBhdGggPSBnLnRyZWUuZ2V0UGF0aCBAcXVlc3Rpb25zW0BxaW5kZXhdXHJcblx0XHRAYW5zd2VycyA9IGcudHJlZS5nZXRBbnN3ZXJzIEBxdWVzdGlvbnNbQHFpbmRleF0sQHN0b3BwXHJcblx0XHQjY29uc29sZS5sb2cgJ2dldEFuc3dlcnMnLGcuYW5zd2Vyc1xyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgNVxyXG5cdFx0XHRAYWRkIHtwOmcudHJlZS5hcnJbQHF1ZXN0aW9uc1tAcWluZGV4XV1bM10sIHE6Zy50cmVlLmdldFBhdGgoQHF1ZXN0aW9uc1tAcWluZGV4XSksIGE6IGcudHJlZS5nZXRBbnN3ZXJzKEBxdWVzdGlvbnNbQHFpbmRleF0sQHN0b3BwKX1cclxuXHRcdFx0QHFpbmRleCsrXHJcblxyXG5cdGxlbmd0aHMgOiA9PiBfLm1hcCBAYm94ZXMsIChib3gpID0+IGJveC5sZW5ndGhcclxuXHJcblx0cGljayA6ID0+ICMgSMOkbXRhciBldHQga29ydCBmcsOlbiBkZW4gYm94IHNvbSDDpHIgcmVsYXRpdnQgbWVzdCBmeWxsZC5cclxuXHRcdHJlcyA9IF8ubWFwIEBib3hlcywgKGJveCxpKSA9PiBbYm94Lmxlbmd0aC9AbWF4aW11bVtpXSwgaV1cclxuXHRcdHJlcy5zb3J0KClcclxuXHRcdEBiaW5kZXggPSBfLmxhc3QocmVzKVsxXVxyXG5cdFx0ZyA9IGdsb2JhbFxyXG5cdFx0QGFuc3dlcnMgPSBAY3VycmVudCgpLmFcclxuXHRcdGNvbnNvbGUubG9nICcnXHJcblx0XHRjb25zb2xlLmxvZyBAY3VycmVudCgpLnFcclxuXHRcdGNvbnNvbGUubG9nICdwb3B1bGFyaXR5OicsIEBjdXJyZW50KCkucFxyXG5cdFx0Y29uc29sZS5sb2cgJ2Fuc3dlcnM6JyxAYW5zd2Vycy5qb2luICcgJ1xyXG5cdFx0Y29uc29sZS5sb2cgJ2JveGVzOicsIEBsZW5ndGhzKCksICdiaW5kZXg6JyxAYmluZGV4XHJcblxyXG5cdGFkZCA6IChjYXJkKSA9PiBAYm94ZXNbMF0ucHVzaCBjYXJkXHJcblxyXG5cdGN1cnJlbnQgOiA9PiAjIHJldHVybmVyYXIgbnV2YXJhbmRlIGtvcnQuXHJcblx0XHRpZiBAYmluZGV4ID09IC0xIHRoZW4gbnVsbCBlbHNlIEBib3hlc1tAYmluZGV4XVswXVxyXG5cclxuXHRjb3JyZWN0IDogPT4gIyBmbHl0dGFyIGtvcnRldCB0aWxsIG7DpHN0YSBib3hcclxuXHRcdGlmIEBiaW5kZXggPT0gLTEgdGhlbiByZXR1cm5cclxuXHRcdGNhcmQgPSBAYm94ZXNbQGJpbmRleF0uc2hpZnQoKVxyXG5cdFx0aWYgQGJpbmRleCsxIDwgQGJveGVzLmxlbmd0aCB0aGVuIEBib3hlc1tAYmluZGV4KzFdLnB1c2ggY2FyZFxyXG5cdFx0ZWxzZSBjb25zb2xlLmxvZyBjYXJkLCcgaXMgZG9uZS4nXHJcblx0XHRAYmluZGV4ID0gLTFcclxuXHRcdEBzYXZlKClcclxuXHJcblx0d3JvbmcgOiA9PiAjIGZseXR0YXIga29ydGV0IHRpbGwgYm94IDBcclxuXHRcdGlmIEBiaW5kZXggPT0gLTEgdGhlbiByZXR1cm5cclxuXHRcdGNhcmQgPSBAYm94ZXNbQGJpbmRleF0uc2hpZnQoKVxyXG5cdFx0QGJveGVzWzBdLnB1c2ggY2FyZFxyXG5cdFx0QGJpbmRleCA9IC0xXHJcblx0XHRAc2F2ZSgpXHJcblxyXG5cdGxvYWQ6ID0+ICMgZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdGRhdGEgPSBKU09OLnBhcnNlIGxvY2FsU3RvcmFnZVtAb3BlbmluZ11cclxuXHRcdGlmIGRhdGFcclxuXHRcdFx0QGJveGVzID0gZGF0YS5ib3hlc1xyXG5cdFx0XHRAYmluZGV4ID0gZGF0YS5iaW5kZXhcclxuXHRcdFx0QHFpbmRleCA9IGRhdGEucWluZGV4XHJcblx0XHRcdGNvbnNvbGUubG9nICdsb2FkOicsQG9wZW5pbmcsIEBsZW5ndGhzKCkgI0pTT04uc3RyaW5naWZ5IHtib3hlczpAYm94ZXMsYmluZGV4OkBiaW5kZXgscWluZGV4Omdsb2JhbC5xaW5kZXh9XHJcblx0XHRlbHNlXHJcblx0XHRcdGNvbnNvbGUubG9nICdsb2FkOiBubyBkYXRhJ1xyXG5cdHNhdmU6ID0+ICMgdG8gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2VbQG9wZW5pbmddID0gSlNPTi5zdHJpbmdpZnkge2JveGVzOkBib3hlcyxiaW5kZXg6QGJpbmRleCxxaW5kZXg6QHFpbmRleH1cclxuXHRcdGNvbnNvbGUubG9nICdzYXZlOicsQG9wZW5pbmcsQGxlbmd0aHMoKSAjSlNPTi5zdHJpbmdpZnkge2JveGVzOkBib3hlcyxiaW5kZXg6QGJpbmRleCxxaW5kZXg6QHFpbmRleH1cclxuXHJcbiNzciA9IG5ldyBTcGFjZWRSZXBldGl0aW9uKClcclxuIyBsw6RnZyB0aWxsIGZsZXIga29ydCBvY2ggcG9wdWxhcml0eVxyXG4jIGNhcmQxID0ge3E6J2UyZTQnLCBhOlsnZTdlNSddfVxyXG4jIGNhcmQyID0ge3E6J2UyZTQuZTdlNScsIGE6WydnMWYzJ119XHJcbiMgY29uc29sZS5sb2cgY2FyZDEsY2FyZDJcclxuIyBzci5hZGQgY2FyZDFcclxuIyBzci5hZGQgY2FyZDJcclxuIyBhc3MgWzIsMCwwLDAsMF0sIHNyLmxlbmd0aHMoKVxyXG4jYXNzIGNhcmQxLHNyLnBpY2soKVxyXG4jIGFzcyBbMiwwLDAsMCwwXSwgc3IubGVuZ3RocygpXHJcbiNhc3MgJ2UyZTQgaXMgcGVuZGluZycsc3IucGljaygpXHJcblxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyBbMSwxLDAsMCwwXSwgc3IubGVuZ3RocygpXHJcbiMgYXNzIC0xLCBzci5pbmRleFxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyAtMSwgc3IuaW5kZXhcclxuIyBhc3MgWzEsMSwwLDAsMF0sIHNyLmxlbmd0aHMoKVxyXG5cclxuIyBhc3MgY2FyZDIsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDIsMCwwLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDEsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDEsMSwwLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDIsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMiwwLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDEsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMSwxLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiNhc3MgY2FyZDIsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMCwyLDBdLCBzci5sZW5ndGhzKClcclxuXHJcbiMgYXNzIGNhcmQxLHNyLnBpY2soKVxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyBbMCwwLDAsMSwxXSwgc3IubGVuZ3RocygpXHJcblxyXG4jIGFzcyBjYXJkMixzci5waWNrKClcclxuIyBzci5jb3JyZWN0KClcclxuIyBhc3MgWzAsMCwwLDAsMl0sIHNyLmxlbmd0aHMoKVxyXG5cclxuIyBhc3MgY2FyZDEsc3IucGljaygpXHJcbiMgc3IuY29ycmVjdCgpXHJcbiMgYXNzIFswLDAsMCwwLDFdLCBzci5sZW5ndGhzKClcclxuXHJcbiMgYXNzIGNhcmQyLHNyLnBpY2soKVxyXG4jIHNyLndyb25nKClcclxuIyBhc3MgWzEsMCwwLDAsMF0sIHNyLmxlbmd0aHMoKVxyXG5cclxuIyBmb3IgaSBpbiByYW5nZSA0XHJcbiMgXHRzci5waWNrKClcclxuIyBcdHNyLmNvcnJlY3QoKVxyXG5cclxuIyBhc3MgWzAsMCwwLDAsMV0sIHNyLmxlbmd0aHMoKVxyXG4jIHNyLnBpY2soKVxyXG4jIHNyLmNvcnJlY3QoKVxyXG4jIGFzcyBbMCwwLDAsMCwwXSwgc3IubGVuZ3RocygpXHJcbiMgYXNzIFwiXCIsc3IucGljaygpXHJcblxyXG4jbG9nIHNyXHJcblxyXG4jIGJyZWFkdGhGaXJzdFNlYXJjaCA9ICh0cmVlLGxldmVsLHJlc3VsdCxwYXRoKSA9PlxyXG4jIFx0Zm9yIGtleSxub2RlIG9mIHRyZWVcclxuIyBcdFx0aWYga2V5ICE9IFwiblwiXHJcbiMgXHRcdFx0cGF0aDEgPSBwYXRoICsgXCIuXCIgKyBrZXlcclxuIyBcdFx0XHRpZiBsZXZlbCA9PSAwIHRoZW4gcmVzdWx0LnB1c2ggcGF0aDFcclxuIyBcdFx0XHRicmVhZHRoRmlyc3RTZWFyY2ggbm9kZSxsZXZlbC0xLHJlc3VsdCxwYXRoMVxyXG5cclxuIyByZXN1bHQgPSBbXVxyXG4jIGJyZWFkdGhGaXJzdFNlYXJjaCB0cmVlLDEscmVzdWx0LFwiXCJcclxuIyBsb2cgcmVzdWx0XHJcblxyXG4jIHRyYXZlcnNlQnJlYWR0aEZpcnN0ID0gKHRyZWUsKSA9PlxyXG4jIFx0cmVzdWx0ID0gW11cclxuIyBcdHF1ZXVlID0gW11cclxuIyBcdHF1ZXVlLnB1c2ggdHJlZVxyXG4jIFx0d2hpbGUgcXVldWUubGVuZ3RoID4gMFxyXG4jIFx0XHRub2RlID0gcXVldWUuc2hpZnQoKVxyXG4jIFx0XHRmb3Iga2V5LHZhbHVlIG9mIG5vZGVcclxuIyBcdFx0XHRpZiBrZXkgIT0gXCJuXCJcclxuIyBcdFx0XHRcdHF1ZXVlLnB1c2ggdmFsdWVcclxuIyBcdFx0XHRcdHJlc3VsdC5wdXNoIGtleVxyXG4jIFx0cmV0dXJuIHJlc3VsdFxyXG5cclxuIyB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIG5leHQgbm9kZSBvZiB0aGUgdHJlZSwgZ2l2ZW4gdGhlIGN1cnJlbnQgbm9kZSwgdXNpbmcgYnJlYWR0aGZpcnN0IHNlYXJjaFxyXG4jcXVldWUgPSBbXVxyXG4jcGF0aHMgPSBbXVxyXG4jIGYgPSAodHJlZSxsZXZlbCkgPT5cclxuIyBcdGNoYXJzID0gNCoobGV2ZWwrMSkgKyBsZXZlbFxyXG4jIFx0cXVldWUgPSBbdHJlZV1cclxuIyBcdHBhdGhzID0gW1wiXCJdXHJcbiMgXHRpID0gMFxyXG4jIFx0cGF0aCA9ICcnXHJcbiMgXHR3aGlsZSBpIDwgcXVldWUubGVuZ3RoXHJcbiMgXHRcdG5vZGUgPSBxdWV1ZVtpXVxyXG4jIFx0XHRwYXRoID0gcGF0aHNbaV1cclxuIyBcdFx0Zm9yIGtleSBvZiBub2RlXHJcbiMgXHRcdFx0aWYga2V5ICE9ICduJ1xyXG4jIFx0XHRcdFx0aWYgcGF0aD09XCJcIlxyXG4jIFx0XHRcdFx0XHRwYXRoMSA9IGtleVxyXG4jIFx0XHRcdFx0ZWxzZVxyXG4jIFx0XHRcdFx0XHRwYXRoMSA9IHBhdGggKyAnLicgKyBrZXlcclxuIyBcdFx0XHRcdGlmIHBhdGgxLmxlbmd0aCA8IGNoYXJzXHJcbiMgXHRcdFx0XHRcdHF1ZXVlLnB1c2ggbm9kZVtrZXldXHJcbiMgXHRcdFx0XHRcdHBhdGhzLnB1c2ggcGF0aDFcclxuIyBcdFx0aSs9MVxyXG4jIFx0cGF0aHNcclxuXHJcbiNsb2cgJ2YnLGYgdHJlZSwxXHJcbiNsb2cgcGF0aHNcclxuXHJcbiMgZ2V0Tm9kZSA9ICh0cmVlLGtleXMpID0+XHJcbiMgXHRub2RlID0gdHJlZVxyXG4jIFx0Zm9yIGtleSBpbiBrZXlzXHJcbiMgXHRcdG5vZGUgPSBub2RlW2tleV1cclxuIyBcdGxvZyAnZ2V0Tm9kZScsa2V5cywgXy5rZXlzIG5vZGVcclxuIyBcdG5vZGVcclxuXHJcbiMgZyA9ICh0cmVlLHBhdGgpID0+IGdnIHRyZWUscGF0aC5zcGxpdCAnLidcclxuXHJcbiMgZ2cgPSAodHJlZSxrZXlzKSA9PlxyXG4jIFx0bG9nICdBJyxrZXlzXHJcbiMgXHRwYXRoID0ga2V5cy5qb2luICcuJ1xyXG4jIFx0bG9nICdCJyxwYXRoXHJcbiMgXHRub2RlID0gZ2V0Tm9kZSB0cmVlLGtleXMuc2xpY2UgMCxrZXlzLmxlbmd0aFxyXG4jIFx0bG9nIG5vZGVcclxuIyBcdGtleXMgPSBmIG5vZGUsa2V5cy5sZW5ndGgrMVxyXG4jIFx0bG9nICdDJ1xyXG4jIFx0aW5kZXggPSBrZXlzLmluZGV4T2YgcGF0aFxyXG4jIFx0bG9nICdEJyxpbmRleFxyXG4jIFx0aWYgaW5kZXggPT0gLTFcclxuIyBcdFx0cmV0dXJuIGdnIHRyZWUsIGtleXMuc2xpY2UgMCxrZXlzLmxlbmd0aC0yXHJcbiMgXHRlbHNlXHJcbiMgXHRcdHJldHVybiBrZXlzW2luZGV4KzFdXHJcblxyXG4jIGFzcyBcImQyZDRcIiwgZyB0cmVlLFwiXCJcclxuIyBvayBhc3MgXCJlMmU0XCIsIGcgdHJlZSxcImQyZDRcIlxyXG4jIG9rIGFzcyBcImcxZjNcIiwgZyB0cmVlLFwiZTJlNFwiXHJcbiMgb2sgYXNzIFwiZDJkNC5nOGY2XCIsIGcgdHJlZSxcImcyZzNcIlxyXG4jYXNzIFwiZDJkNC5iN2I1LmUyZTRcIiwgZyB0cmVlLFwiZDJkNC5nOGY2LmMyYzRcIlxyXG4jIGFzcyBcImUyZTQuYzdjNS5nMWYzXCIsIGcgdHJlZSxcImQyZDQuYjdiNS5lMmU0XCJcclxuIyBhc3MgXCJcIiwgZyB0cmVlLCBcImQyZDQuZzhmNi5jMmM0LmM3YzUuZDRkNS5lN2U2LmIxYzMuZTZkNS5jNGQ1Lmc3ZzYuZzFmMy5kN2Q2LmMxZjQuZjhnNy5kMWE0LmM4ZDcuYTRiMy5kOGM3LmUyZTRcIlxyXG4iXX0=
//# sourceURL=c:\github\2023-022-ChessOpenings-SpacedRepetition\coffee\spaced_repetition.coffee