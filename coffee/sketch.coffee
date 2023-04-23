import _ from 'https://cdn.skypack.dev/lodash'
import {ass,log,range} from '../js/utils.js'
import {Board} from '../js/board.js'
import {Button} from '../js/button.js'
import {clickString,global,loadTree} from '../js/globals.js'
import {SpacedRepetition} from '../js/spaced_repetition.js'
import {getPath,testTree} from '../js/tree.js'

SIZE = global.SIZE
released = true # prevention of touch bounce

window.preload = =>
	global.arr = loadJSON './data/arr-2014-08.json' # SIZE = 0
	#global.arr = loadJSON './data/arr-2016-02.json' # SIZE = 1
	#global.arr = loadJSON './data/arr-2019-06.json' # SIZE = 2
	for letter in "rnbqkp"
		global.pics[letter] = loadImage './images/b' + letter + '.png'
	for letter in "RNBQKP"
		global.pics[letter] = loadImage './images/w' + letter.toLowerCase() + '.png'

window.setup = =>
	createCanvas SIZE*10.3, SIZE*11
	textAlign CENTER,CENTER
	rectMode CENTER
	global.board = new Board()
	global.chess = new Chess()
	global.arr = global.arr.arr
	testTree()
	console.log global.arr.length
#	loadTree 0
	xdraw()

xdraw = =>
	background 'gray'
	textSize SIZE
	global.board.draw()
	for button in global.buttons
		button.draw()

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