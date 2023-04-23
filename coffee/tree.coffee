import {ass,log,range,spaceShip} from '../js/utils.js'
import {global} from '../js/globals.js'
import _ from 'https://cdn.skypack.dev/lodash'

SIZE = 0

export getPath = (i) =>
	res = []
	while i >= 0
		res.push global.arr[i][0]
		i = global.arr[i][2]
	_.reverse(res).join '.'

export getStart = (path) =>
	keys = path.split '.'
	j = 0
	for i in range keys.length
		key = keys[i]
		while global.arr[j][0] != key or global.arr[j][1] != i
			j += 1
			if j>=global.arr.length then return -1
	j

export getStopp = (path,index) =>
	keys = path.split '.'
	j = index + 1
	while global.arr[j][1] >= keys.length
		j += 1
	j

export getQuestions = (start,stopp) =>
	res = _.map range(start,stopp), (i) => [global.arr[i], getPath(i)]
	res.sort (a,b) => spaceShip(b[0][3],a[0][3]) or spaceShip(b[1],a[1])
	res

# sök igenom hela arr[start:stopp] efter alla rader med rätt level och sortera
export facit = (i,stopp) =>
	level = global.arr[i][1]
	res = global.arr.slice i,stopp
	res = _.filter res, (item) => item[1] == level+1
	res.sort (a,b) => spaceShip b[3], a[3]
	res

export testTree = =>

	if SIZE == 0
		ass "d2d4", getPath 0
		ass "d2d4.g8f6", getPath 1
		ass "g2g3.d7d5.f1g2", getPath 60

		ass 22, getStart "e2e4"
		ass 32, getStart "e2e4.e7e5"
		ass -1, getStart "e2e4.e7e5.g1f3.b8c6.f1c4"

		ass 42, getStopp "e2e4",22
		ass 34, getStopp "e2e4.e7e5",32

		questions = getQuestions 32,34

		ass [['e7e5', 1, 22, 9], 'e2e4.e7e5'], questions[0]
		ass [['g1f3', 2, 32, 6], 'e2e4.e7e5.g1f3'], _.last questions

		ass facit(22,42), [['c7c5', 1, 22, 14], ['g7g6', 1, 22, 13], ['d7d5', 1, 22, 9], ['e7e5', 1, 22, 9], ['c7c6', 1, 22, 6]]
		ass facit(32,34), [['g1f3', 2, 32, 6]]

	if SIZE == 1
		ass "d2d4", getPath 0
		ass "d2d4.d7d5", getPath 1
		ass "e2e4.e7e5.g1f3.b8c6.f1c4", getPath 2557
		ass "e2e4.e7e5.g1f3.b8c6.f1c4.f8c5.b2b4.c5b4.c2c3.b4e7.d2d4.c6a5", getPath 2611
		ass "e2e4.e7e5.g1f3.b8c6.d2d4", getPath 2612
		ass "c2c3", getPath global.arr.length-1
		ass 2557, getStart "e2e4.e7e5.g1f3.b8c6.f1c4"
		ass 2612, getStopp "e2e4.e7e5.g1f3.b8c6.f1c4",2557
		questions = getQuestions 2557,2612
		ass [['f1c4', 4, 2419, 134], 'e2e4.e7e5.g1f3.b8c6.f1c4'], questions[0] # nix
		ass [['b4a5', 9, 2607, 5], 'e2e4.e7e5.g1f3.b8c6.f1c4.f8c5.b2b4.c5b4.c2c3.b4a5'], _.last questions # nix
		ass facit(2557,2612), [['g8f6', 5, 2557, 60], ['f8c5', 5, 2557, 60]]

	if SIZE == 2
		ass "e2e4.c7c5.g1f3.e7e6.d2d4.c5d4.f3d4.a7a6.f1d3.d8c7.e1g1.b8c6.d4c6.d7c6.b1d2", getPath 100
		ass "e2e4.d7d5.e4d5.g8f6.g1f3.f6d5", getPath 10000
		ass 4585, getStart "e2e4.e7e5.g1f3.b8c6.f1c4"
		ass 4900, getStopp "e2e4.e7e5.g1f3.b8c6.f1c4",4585
		questions = getQuestions 4585,4900
		ass [['f1c4', 4, 4012, 1036], 'e2e4.e7e5.g1f3.b8c6.f1c4'], questions[0]
		ass [['a7a6', 5, 4585, 5], 'e2e4.e7e5.g1f3.b8c6.f1c4.a7a6'], _.last questions
		ass facit(4585,4900), [['g8f6', 5, 4585, 529], ['f8c5', 5, 4585, 454], ['f8e7', 5, 4585, 19], ['g7g6', 5, 4585, 12], ['f7f5', 5, 4585, 8], ['d7d6', 5, 4585, 8], ['a7a6', 5, 4585, 5]]

	console.log 'testTree done.'
