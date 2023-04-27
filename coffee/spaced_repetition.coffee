import _ from 'https://cdn.skypack.dev/lodash'
import {ass,log,range} from '../js/utils.js'

# Kortet är implementerat med en hash:
# q: question. "e2e4.e7e5.g1f3"
# a: answers. ["b8c6,g8f6"] Sorterade i fallande popularitetsordning.
# p: popularity. 12345 (antal partier som spelat detta drag)

# Eventuellt kan denna hash ersättas med ett enda index.
# Övriga data kan enkelt utvinnas mha global.tree.arr
export class SpacedRepetition

	constructor : (@path) ->
		@maximum = [1,3,9,27,81] # cirka 1+3+9+27+81==121 kort i systemet
		@boxes = _.map @maximum, (item) -> []
		@index = -1

	lengths : => _.map @boxes, (box) => box.length

	pick : => # Hämtar ett kort från den box som är relativt mest fylld.
		res = _.map @boxes, (box,i) => [box.length/@maximum[i], i]
		res.sort()
		@index = _.last(res)[1]

	add : (card) => @boxes[0].push card

	current : => # returnerar nuvarande kort.
		if @index == -1 then null else @boxes[@index][0]

	correct : => # flyttar kortet till nästa box
		if @index == -1 then return
		card = @boxes[@index].shift()
		if @index+1 < @boxes.length then @boxes[@index+1].push card
		else console.log card,' is done.'
		@index = -1

	wrong : => # flyttar kortet till box 0
		if @index == -1 then return
		card = @boxes[@index].shift()
		@boxes[0].push card
		@index = -1

	load: => # from localStorage
	save: => # to localStorage

#sr = new SpacedRepetition()
# lägg till fler kort och popularity
# card1 = {q:'e2e4', a:['e7e5']}
# card2 = {q:'e2e4.e7e5', a:['g1f3']}
# console.log card1,card2
# sr.add card1
# sr.add card2
# ass [2,0,0,0,0], sr.lengths()
#ass card1,sr.pick()
# ass [2,0,0,0,0], sr.lengths()
#ass 'e2e4 is pending',sr.pick()

# sr.correct()
# ass [1,1,0,0,0], sr.lengths()
# ass -1, sr.index
# sr.correct()
# ass -1, sr.index
# ass [1,1,0,0,0], sr.lengths()

# ass card2,sr.pick()
# sr.correct()
# ass [0,2,0,0,0], sr.lengths()

#ass card1,sr.pick()
# sr.correct()
# ass [0,1,1,0,0], sr.lengths()

#ass card2,sr.pick()
# sr.correct()
# ass [0,0,2,0,0], sr.lengths()

#ass card1,sr.pick()
# sr.correct()
# ass [0,0,1,1,0], sr.lengths()

#ass card2,sr.pick()
# sr.correct()
# ass [0,0,0,2,0], sr.lengths()

# ass card1,sr.pick()
# sr.correct()
# ass [0,0,0,1,1], sr.lengths()

# ass card2,sr.pick()
# sr.correct()
# ass [0,0,0,0,2], sr.lengths()

# ass card1,sr.pick()
# sr.correct()
# ass [0,0,0,0,1], sr.lengths()

# ass card2,sr.pick()
# sr.wrong()
# ass [1,0,0,0,0], sr.lengths()

# for i in range 4
# 	sr.pick()
# 	sr.correct()

# ass [0,0,0,0,1], sr.lengths()
# sr.pick()
# sr.correct()
# ass [0,0,0,0,0], sr.lengths()
# ass "",sr.pick()

#log sr

# breadthFirstSearch = (tree,level,result,path) =>
# 	for key,node of tree
# 		if key != "n"
# 			path1 = path + "." + key
# 			if level == 0 then result.push path1
# 			breadthFirstSearch node,level-1,result,path1

# result = []
# breadthFirstSearch tree,1,result,""
# log result

# traverseBreadthFirst = (tree,) =>
# 	result = []
# 	queue = []
# 	queue.push tree
# 	while queue.length > 0
# 		node = queue.shift()
# 		for key,value of node
# 			if key != "n"
# 				queue.push value
# 				result.push key
# 	return result

# this function returns the next node of the tree, given the current node, using breadthfirst search
#queue = []
#paths = []
# f = (tree,level) =>
# 	chars = 4*(level+1) + level
# 	queue = [tree]
# 	paths = [""]
# 	i = 0
# 	path = ''
# 	while i < queue.length
# 		node = queue[i]
# 		path = paths[i]
# 		for key of node
# 			if key != 'n'
# 				if path==""
# 					path1 = key
# 				else
# 					path1 = path + '.' + key
# 				if path1.length < chars
# 					queue.push node[key]
# 					paths.push path1
# 		i+=1
# 	paths

#log 'f',f tree,1
#log paths

# getNode = (tree,keys) =>
# 	node = tree
# 	for key in keys
# 		node = node[key]
# 	log 'getNode',keys, _.keys node
# 	node

# g = (tree,path) => gg tree,path.split '.'

# gg = (tree,keys) =>
# 	log 'A',keys
# 	path = keys.join '.'
# 	log 'B',path
# 	node = getNode tree,keys.slice 0,keys.length
# 	log node
# 	keys = f node,keys.length+1
# 	log 'C'
# 	index = keys.indexOf path
# 	log 'D',index
# 	if index == -1
# 		return gg tree, keys.slice 0,keys.length-2
# 	else
# 		return keys[index+1]

# ass "d2d4", g tree,""
# ok ass "e2e4", g tree,"d2d4"
# ok ass "g1f3", g tree,"e2e4"
# ok ass "d2d4.g8f6", g tree,"g2g3"
#ass "d2d4.b7b5.e2e4", g tree,"d2d4.g8f6.c2c4"
# ass "e2e4.c7c5.g1f3", g tree,"d2d4.b7b5.e2e4"
# ass "", g tree, "d2d4.g8f6.c2c4.c7c5.d4d5.e7e6.b1c3.e6d5.c4d5.g7g6.g1f3.d7d6.c1f4.f8g7.d1a4.c8d7.a4b3.d8c7.e2e4"
