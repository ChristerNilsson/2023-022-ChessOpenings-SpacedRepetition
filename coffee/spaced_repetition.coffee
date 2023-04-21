# Anki har fem boxar.
# Den första innehåller de nyaste uppgifterna.
# När man svarat rätt, flyttas kortet till nästa box.
# Efter femte boxen, tas kortet bort.
# När man svarar fel, flyttas kortet tillbaka till första boxen.
# Korten i varje box ligger i en kö.
# Varje låda har ett maxantal. Default: [5,10,20,40,80]
# Korten i högsta lådan ligger därmed längst i tid räknat.

import _ from 'https://cdn.skypack.dev/lodash'
import {ass,log,range} from '../js/utils.js'

export class SpacedRepetition

	constructor : () ->
		# @root = ""
		# @latest = ""
		@maximum = [5,10,20,40,80]
		@boxes = _.map @maximum, (item) -> []
		@currIndex = -1

	lengths : -> _.map @boxes, (box) => box.length

	# Hämtar från första box som är överfull.
	# Om ingen box är överfull, hämtas från första box som inte är tom.
	pick : ->
		if @currIndex != -1
			return @boxes[@currIndex][0] + " is pending"
		@currIndex = -1
		for i in range @boxes.length
			box = @boxes[i]
			if box.length >= @maximum[box]
				@currIndex=i
				break
		for i in range @boxes.length
			box = @boxes[i]
			if box.length > 0
				@currIndex=i
				break
		if @currIndex==-1 then return ""
		@boxes[@currIndex][0]

	add : (card) => @boxes[0].push card

	correct : =>
		if @currIndex == -1 then return
		card = @boxes[@currIndex].shift()
		if @currIndex < @boxes.length-1 then @boxes[@currIndex+1].push card
		@currIndex = -1

	wrong : =>
		if @currIndex == -1 then return
		card = @boxes[@currIndex].shift()
		@boxes[0].push card
		@currIndex = -1

	load : () ->

	save:()->

sr = new SpacedRepetition()
sr.add 'e2e4'
sr.add 'e2e4.e7e5'
ass [2,0,0,0,0], sr.lengths()
ass 'e2e4',sr.pick()
ass [2,0,0,0,0], sr.lengths()
ass 'e2e4 is pending',sr.pick()

sr.correct()
ass [1,1,0,0,0], sr.lengths()
ass -1, sr.currIndex
sr.correct()
ass -1, sr.currIndex
ass [1,1,0,0,0], sr.lengths()

ass "e2e4.e7e5",sr.pick()
sr.correct()
ass [0,2,0,0,0], sr.lengths()

ass "e2e4",sr.pick()
sr.correct()
ass [0,1,1,0,0], sr.lengths()

ass "e2e4.e7e5",sr.pick()
sr.correct()
ass [0,0,2,0,0], sr.lengths()

ass "e2e4",sr.pick()
sr.correct()
ass [0,0,1,1,0], sr.lengths()

ass "e2e4.e7e5",sr.pick()
sr.correct()
ass [0,0,0,2,0], sr.lengths()

ass "e2e4",sr.pick()
sr.correct()
ass [0,0,0,1,1], sr.lengths()

ass "e2e4.e7e5",sr.pick()
sr.correct()
ass [0,0,0,0,2], sr.lengths()

ass "e2e4",sr.pick()
sr.correct()
ass [0,0,0,0,1], sr.lengths()

ass "e2e4.e7e5",sr.pick()
sr.wrong()
ass [1,0,0,0,0], sr.lengths()

sr.pick()
sr.correct()
sr.pick()
sr.correct()
sr.pick()
sr.correct()
sr.pick()
sr.correct()
ass [0,0,0,0,1], sr.lengths()
sr.pick()
sr.correct()
ass "",sr.pick()

console.log sr