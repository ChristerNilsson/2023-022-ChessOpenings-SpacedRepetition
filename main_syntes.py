import time
import json
import chess.pgn
from os import scandir

# Läser ett antal pgn-filer, som kan innehålla flera partier.
# Uppdaterar tree.json med antal partier

CUTOFF = 5 # min antal partier för att spara ett drag

board = None

def propagate(tree):
	for key in tree:
		if key == 'n': continue
		propagate(tree[key])
		if len(tree[key]) == 1: # dvs bara n, inga drag
			tree['n'] += 1
		else:
			tree['n'] += tree[key]['n']

def prune(tree,n):
	for key in list(tree.keys()):
		if key == 'n': continue
		prune(tree[key], n)
		if tree[key]['n'] < n:
			del tree[key]

def maxDepth(tree):
	res = 0
	for key in tree:
		if key != 'n': res = max(res, maxDepth(tree[key]))
	return res + 1

def countNodes(tree):
	res = 1
	for key in tree:
		if key != 'n':
			res += countNodes(tree[key])
	return res

def traversePGN(node,t,level=0):
	if len(node.variations) > 1: print("node.variations > 1")
	for variation in node.variations:
		key = variation.move.uci()
		board.push(variation.move)
		if key not in t:
			t[key] = {'n':0}
		traversePGN(variation,t[key],level+1)
		board.pop()

def readPGN(filename):
	start = time.time()
	pgn = open('original/' + filename + '.pgn')
	for i in range(1000000):
		game = chess.pgn.read_game(pgn)
		if game == None: break
		if 'abandoned' in game.headers['Termination']: continue
		print(i,game.headers['White'],'-',game.headers['Black'])
		traversePGN(game,tree)
	print()
	print('readPGN:',filename,i,'partier', round(time.time() - start,3),'s')

def cpu (prompt,f) :
	start = time.time()
	print(prompt, f(),round(time.time() - start, 3), 's')

def save(tree):
	with open("data/tree1.json", "w") as f: f.write(json.dumps(tree).replace(" ", ""))

# with open("data/tree.json", "r") as f: tree = json.load(f)
tree = {'n':0}

print()
board = chess.Board()
#                                                   === sekunder ===   kB    nodes  nodes  depth depth
#                                    pgnSize  games read  prop prune tree   before  after before after nodes/s
#readPGN('lichess_elite_2014-08') #   0.1 MB    137    1   0.0   0.0    1    10737     62    298    20
#readPGN('lichess_elite_2016-02') #  10.0 MB  13149  107   1.1   1.4   60   914356   3918    256    28     36
#readPGN('lichess_elite_2019-06') #  65.0 MB  76808  767  10.4  16.0  341           22536                  29
#readPGN('lichess_elite_2019-11') # 137.0 MB 163429 1580  14.4  18.7  694           45868                  29
#readPGN('lichess_elite_2020-01') # 206.0 MB 248213 1965  16.7  95.5 1037           68756                  35 # prune killed 99.6% of the nodes
#readPGN('lichess_elite_2020-05') # 313.0 MB 369771 3033  23.8  78.3 1591 26270541 105197    404    51     35 # zippat 255kB
#readPGN('lichess_elite_2020-04') # 356.0 MB 423017 3281  28.1  97.6 1795          118744                  36 # prune killed 99.6%

# totalt 3.05 GB cirka 18MB 10h

cpu('propagate',lambda : propagate(tree))
cpu('countNodes before', lambda : countNodes(tree))
cpu('maxDepth before', lambda : maxDepth(tree))
cpu('prune',lambda : prune(tree,CUTOFF))
cpu('maxDepth after', lambda : maxDepth(tree))
cpu('countNodes after', lambda : countNodes(tree))
cpu('save',lambda : save(tree))
