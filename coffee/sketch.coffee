import _ from 'https://cdn.skypack.dev/lodash'
import {ass,log,range} from '../js/utils.js'
import {Board} from '../js/board.js'
import {Button} from '../js/button.js'
import {clickString,global} from '../js/globals.js'
import {SpacedRepetition} from '../js/spaced_repetition.js'
import {Tree} from '../js/tree.js'

SIZE = global.SIZE
released = true # prevention of touch bounce
arr = null

window.preload = =>
	#arr = loadJSON './data/arr-2014-08.json' # SIZE = 0
	#arr = loadJSON './data/arr-2016-02.json' # SIZE = 1
	#arr = loadJSON './data/arr-2019-06.json' # SIZE = 2
	arr = loadJSON './data/arr.json'

	for letter in "rnbqkp"
		global.pics[letter] = loadImage './images/b' + letter + '.png'
	for letter in "RNBQKP"
		global.pics[letter] = loadImage './images/w' + letter.toLowerCase() + '.png'

window.setup = =>
	createCanvas SIZE*10.3, SIZE*11
	textAlign CENTER,CENTER
	rectMode CENTER

	g = global

	g.tree = new Tree arr.arr
	g.board = new Board()
	g.chess = new Chess()
	# g.tree.test()

	g.spacedRepetition = new SpacedRepetition()
	sr = g.spacedRepetition
	g.path1 ='e2e4.e7e5.g1f3.b8c6.f1c4' # får ej vara ''
	g.start = g.tree.getStart g.path1
	g.stopp = g.tree.getStopp g.path1,g.start
	console.log 'start',g.start, 'stopp',g.stopp

	start = new Date()
	g.questions = g.tree.getQuestions g.start,g.stopp # array med index till stora arrayen
	console.log 'getQuestions',g.questions.length, new Date()-start

	g.index = 0
	g.path = g.tree.getPath g.questions[g.index]
	g.answers = g.tree.facit g.questions[g.index],g.stopp
	console.log 'facit',g.answers
	for i in range 5
		sr.add {q:g.tree.getPath(g.questions[g.index]), a: g.tree.facit(g.questions[g.index],g.stopp)}
		g.index++
	sr.pick()

	g.chess.reset()
	moves = sr.current().q.split '.'
	for move in moves
		g.chess.move {from: move.slice(0,2), to:move.slice(2,4)}
	g.board.flipped = moves.length%2 == 1

	xdraw()

drawSpacedRepetition = =>
	g = global
	sr = g.spacedRepetition
	textAlign LEFT,CENTER
	for box,i in sr.boxes
		fill if i == sr.currIndex then 'white' else 'black'
		text box.length,40+40*i,500
	text 'currIndex '+sr.currIndex,220,500
	text 'start '+g.start,390,500
	current = sr.current()
	if current
		for move,i in g.chess.history()
			x = 450+i%2 * 35
			y = 35 + floor(i/2) * 20
			fill 'black'
			if i%2==0 then text i/2+1, x-20, y
			fill if i < g.path1.split('.').length then 'lightgray' else ['white','black'][i%2]
			text move, x,y
		text 'questions.length '+g.questions.length, 200,520
		text 'popularity '+g.tree.arr[g.questions[sr.currIndex]][3], 390,520

		for answer,i in current.a
			if i==0 then text answer[0], 40 + 40*i, 540
			else if current.a[i][3] / current.a[i-1][3] >= 0.8
				text answer[0], 40 + 40*i, 540
			else break

#		text current.a[0][0], 40,540

	text 'arr.length '+g.tree.arr.length, 40,520

xdraw = =>
	background 'gray'
	textSize SIZE
	global.board.draw()
	for button in global.buttons
		button.draw()
	drawSpacedRepetition()

# window.keyPressed = =>
# 	if key == 'ArrowLeft' then clickString 'left'
# 	if key == 'ArrowRight'  then clickString 'right'
# 	if key == 'ArrowUp'  then clickString 'up'
# 	if key == 'ArrowDown' then clickString 'down'
# 	if key == ' ' then clickString 'flip'
# 	if key == 'Home' then clickString 'first'
# 	xdraw()
# 	return false

window.mousePressed = =>
	if not released then return
	released =false
	for button in global.buttons.concat global.board.buttons
		if button.inside mouseX,mouseY
			button.onclick()
			xdraw()
			return false
	for square in global.board.squares
		if square.inside mouseX,mouseY
			square.onclick()
			xdraw()
			return false
	false

window.mouseReleased = =>
	released = true
	false