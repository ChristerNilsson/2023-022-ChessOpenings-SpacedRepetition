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
				@currIndex = i
				return @boxes[@currIndex][0]
		for i in range @boxes.length
			box = @boxes[i]
			if box.length > 0
				@currIndex = i
				return @boxes[@currIndex][0]
		""

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

for i in range 4
	sr.pick()
	sr.correct()

ass [0,0,0,0,1], sr.lengths()
sr.pick()
sr.correct()
ass [0,0,0,0,0], sr.lengths()
ass "",sr.pick()

log sr

tree = {
	"n": 138,
	"d2d4": {
		"n": 26,
		"g8f6": {
			"n": 14,
			"c2c4": {
				"n": 11,
				"c7c5": {
					"n": 6,
					"d4d5": {
						"n": 6,
						"e7e6": {
							"n": 6,
							"b1c3": {
								"n": 6,
								"e6d5": {
									"n": 6,
									"c4d5": {
										"n": 6,
										"g7g6": {
											"n": 5,
											"g1f3": {
												"n": 5,
												"d7d6": {
													"n": 5,
													"c1f4": {
														"n": 5,
														"f8g7": {
															"n": 5,
															"d1a4": {
																"n": 5,
																"c8d7": {
																	"n": 5,
																	"a4b3": {
																		"n": 5,
																		"d8c7": {
																			"n": 5,
																			"e2e4": {
																				"n": 5
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		"b7b5": {
			"n": 6,
			"e2e4": {
				"n": 5,
				"c8b7": {
					"n": 5
				}
			}
		}
	},
	"e2e4": {
		"n": 58,
		"c7c5": {
			"n": 14,
			"g1f3": {
				"n": 7
			}
		},
		"d7d5": {
			"n": 9,
			"e4d5": {
				"n": 8,
				"d8d5": {
					"n": 8,
					"b1c3": {
						"n": 6,
						"d5a5": {
							"n": 6,
							"d2d4": {
								"n": 6,
								"g8f6": {
									"n": 6
								}
							}
						}
					}
				}
			}
		},
		"e7e5": {
			"n": 9,
			"g1f3": {
				"n": 6
			}
		},
		"c7c6": {
			"n": 6,
			"d2d4": {
				"n": 6,
				"d7d5": {
					"n": 6
				}
			}
		},
		"g7g6": {
			"n": 13,
			"d2d4": {
				"n": 11,
				"f8g7": {
					"n": 11,
					"b1c3": {
						"n": 6,
						"d7d6": {
							"n": 6
						}
					}
				}
			}
		}
	},
	"g1f3": {
		"n": 17,
		"g8f6": {
			"n": 5
		},
		"g7g6": {
			"n": 9,
			"d2d4": {
				"n": 8,
				"f8g7": {
					"n": 8,
					"c2c4": {
						"n": 6,
						"d7d6": {
							"n": 5,
							"b1c3": {
								"n": 5,
								"b8d7": {
									"n": 5,
									"e2e4": {
										"n": 5,
										"c7c6": {
											"n": 5,
											"f1e2": {
												"n": 5
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"g2g3": {
		"n": 28,
		"g7g6": {
			"n": 6,
			"f1g2": {
				"n": 6,
				"f8g7": {
					"n": 6,
					"d2d3": {
						"n": 6
					}
				}
			}
		},
		"d7d5": {
			"n": 8,
			"f1g2": {
				"n": 8
			}
		}
	}
}

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
f = (tree,level) =>
	chars = 4*(level+1) + level
	queue = [tree]
	paths = [""]
	i = 0
	path = ''
	while i < queue.length
		node = queue[i]
		path = paths[i]
		for key of node
			if key != 'n'
				if path==""
					path1 = key
				else
					path1 = path + '.' + key
				if path1.length < chars
					queue.push node[key]
					paths.push path1
		i+=1
	paths

#log 'f',f tree,1
#log paths

getNode = (tree,keys) =>
	node = tree
	for key in keys
		node = node[key]
	log 'getNode',keys, _.keys node
	node

g = (tree,path) => gg tree,path.split '.'

gg = (tree,keys) =>
	log 'A',keys
	path = keys.join '.'
	log 'B',path
	node = getNode tree,keys.slice 0,keys.length
	log node
	keys = f node,keys.length+1
	log 'C'
	index = keys.indexOf path
	log 'D',index
	if index == -1
		return gg tree, keys.slice 0,keys.length-2
	else
		return keys[index+1]

ass "d2d4", g tree,""
# ok ass "e2e4", g tree,"d2d4"
# ok ass "g1f3", g tree,"e2e4"
# ok ass "d2d4.g8f6", g tree,"g2g3"
#ass "d2d4.b7b5.e2e4", g tree,"d2d4.g8f6.c2c4"
# ass "e2e4.c7c5.g1f3", g tree,"d2d4.b7b5.e2e4"
# ass "", g tree, "d2d4.g8f6.c2c4.c7c5.d4d5.e7e6.b1c3.e6d5.c4d5.g7g6.g1f3.d7d6.c1f4.f8g7.d1a4.c8d7.a4b3.d8c7.e2e4"
