import _ from 'https://cdn.skypack.dev/lodash'
import {ass,lerp,param,range,hexToBase64} from '../js/utils.js'
# import cryptoJs from 'https://cdn.skypack.dev/crypto-js'
import {Square} from '../js/square.js'
import {Button} from '../js/button.js'
import {coords,clickString,global,toObjectNotation,toUCI} from '../js/globals.js'
import {dumpState} from '../js/globals.js'

SIZE = global.SIZE

export class Board
	constructor: ->
		@squares = []
		@clickedSquares = []
		@pieces = ""
		@flipped = false
		for i in range 64
			do (i) => @squares.push new Square i, => @click i

		@buttons = []
		x0 = 1.5
		x1 = 3.5
		x2 = 5.5
		x3 = 7.5
		@buttons.push new Button x0*SIZE, 9.5*SIZE, 'correct', => clickString 'correct'
		@buttons.push new Button x1*SIZE, 9.5*SIZE, 'wrong', => clickString 'wrong'
		@buttons.push new Button x2*SIZE, 9.5*SIZE, 'link',  =>
		@buttons.push new Button x3*SIZE, 9.5*SIZE, 'debug', =>

	click : (i) =>
		g = global
		if @flipped then i = 63-i
		col = i %% 8
		row = 7-i // 8
		sq = g.chess.board()[row][col]
		color = "wb"[g.chess.history().length %% 2] # förväntad färg på pjäsen

		if @clickedSquares.length == 0
			if sq != null and sq.color == color then @clickedSquares.push i
		else
			if i == @clickedSquares[0]
				@clickedSquares = []
			else
				@clickedSquares.push i
				move = toObjectNotation @clickedSquares
				uci = toUCI @clickedSquares
				if g.chess.move move # accepera draget
					g.stack.push g.currNode
					# console.log uci,global.currNode
					if uci not of g.currNode
						g.currNode[uci] = {}
						g.count++
					g.currNode = g.currNode[uci]
				@clickedSquares = []

	draw : =>

		@buttons[3].text = if global.count>0 then 'save ' + global.count else ""

		for button in @buttons
			button.draw()

		# if not global.tree then return

		fill 'white'
		textSize SIZE*0.3

		#push()
		#textAlign LEFT,CENTER
		#text global.name,0.05*SIZE, 0.3*SIZE
		#pop()

		for i in range 8
			for j in range 8
				piece = global.chess.board()[7-i][j]
				@squares[i*8+j].draw piece, @flipped, i*8+j==@clickedSquares[0]

		stroke 'black'
		noFill()
		rect SIZE*4.5,SIZE*4.5,SIZE*8,SIZE*8

		@littera()

		#push()
		#textAlign CENTER,CENTER

		#text global.version, 7.5*SIZE, 10*SIZE
		#textAlign RIGHT,CENTER

		# textSize 20
		# n = global.stack.length
		# if n == 0 then score = '0'
		# if n%2 == 0 then fill 'white' else fill 'black'
		# text 1+n//2, 9.4*SIZE, 0.3*SIZE

		#pop()
		# @showChildren()

	littera : =>
		noStroke()
		fill 'black'
		textSize SIZE*0.3
		letters = if @flipped then "hgfedcba" else "abcdefgh"
		digits = if @flipped then  "12345678" else "87654321"

		for i in range 8
			text letters[i],SIZE*(i+1),SIZE*8.8
			text digits[i],SIZE*0.15,SIZE*(i+1)

	flip : => @flipped = not @flipped
