import {ass,log,range,split,param,hexToBase64,spaceShip} from '../js/utils.js'
import {Button} from '../js/button.js'
import _ from 'https://cdn.skypack.dev/lodash'

export global = {

	#name : 'bishop',
	name : 'tree',
	arr : [],

	version:'ver: B',
	board:null,
	child:0, # move under consideration
	children: [], # sorted list of [value,san,uci]
	SIZE:50, # of square
	pics:{}, # 12 pjäser
	# data:null,
	buttons:[],
	database: {}, # fen => value
	#currNode:null, # pekar in i ett träd
	#count: 0, # räknar antal nya drag i trädet
	stack:[] # innehåller aktuell gren
}

export coords = (uci) =>
	param.String uci
	c0 = "abcdefgh".indexOf uci[0]
	r0 = "12345678".indexOf uci[1]
	c1 = "abcdefgh".indexOf uci[2]
	r1 = "12345678".indexOf uci[3]
	param.Array [c0+8*r0, c1+8*r1]
ass [8,24], coords "a2a4"

export toUCI = ([from,to]) =>
	param.Integer from
	param.Integer to
	c0 = "abcdefgh"[from%8]
	r0 = "12345678"[from//8]
	c1 = "abcdefgh"[to%8]
	r1 = "12345678"[to//8]
	param.String c0+r0+c1+r1
ass "e2e4", toUCI [12,28]

export toObjectNotation = ([from,to]) =>
	param.Integer from
	param.Integer to
	uci = toUCI [from,to]
	from = uci.slice 0,2
	to = uci.slice 2,4
	param.Object {from, to}
ass {from:'e2', to:'e4'}, toObjectNotation [12,28]

export empty = (n) =>
	param.Integer n
	param.String (1+n//8).toString()

undo = => 
	if global.stack.length == 0 then return
	global.chess.undo()
	global.currNode = global.stack.pop()
	# makeChildren()

export dumpState = =>
	console.log 'STATE ########'
	console.log '  stack',global.stack
	console.log '  currNode',global.currNode
	console.log '  history',global.chess.history()

link = => 'https://lichess.org/analysis/' + global.chess.fen()

correctAnswer = =>
	global.spacedRepetition.correct()
	getNextQuestion()

wrongAnswer = =>
	global.spacedRepetition.wrong()
	getNextQuestion()

getNextQuestion = =>
	sr = global.spacedRepetition
	if sr.boxes[0].length == 0
		for i in range 5
			sr.add {q:g.tree.getPath(global.questions[global.index]), a: g.tree.facit(global.questions[global.index],global.stopp)}
			global.index++
	sr.pick()
	global.chess.reset()
	moves = sr.current().q.split '.'
	for move in moves
		global.chess.move {from: move.slice(0,2), to:move.slice(2,4)}
	global.board.flipped = moves.length%2 == 1

export clickString = (key) =>
	param.String key
	if key == 'flip' then global.board.flip()
	else if key == 'link' then window.open link(), '_blank'
	else if key == 'up'   then global.child = (global.child-1) %% global.children.length
	else if key == 'down' then global.child = (global.child+1) %% global.children.length
	else if key == 'undo' then undo()
	else if key == 'left' then undo()
	else if key == 'right'
		console.log global.children,global.child
		[value,san,uci] = global.children[global.child]
		console.log 'move',[value,san,uci]
		global.chess.move san
		global.stack.push global.currNode
		global.currNode = global.currNode[uci]
		makeChildren()
	else if key == 'save' then download global.tree, global.name + '.json'
	else if key == 'correct' then correctAnswer()
	else if key == 'wrong' then wrongAnswer()
	else console.log 'unknown key in clickString',key
