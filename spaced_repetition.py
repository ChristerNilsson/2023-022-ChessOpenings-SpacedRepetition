import json
import time

SMALL = False
if SMALL:
	FILE = "data/tree_62.json"
else:
	FILE = "data/tree_2020-04.json"

with open(FILE, "r") as f: tree = json.load(f)

paths = [] # [['e2e4',-1],['e7e5',0]]

def ass (a,b):
	if a == b: return
	print('assertion error:')
	print(' ',a)
	print(' ',b)

# Kan eventuellt skapas redan vid inläsning av pgn-filerna
def setPath(tree,index):
	for key in tree:
		if len(key) == 1: continue
		n = len(paths)
		paths.append([key,index])
		tree[key]['p'] = n
		setPath(tree[key], n)
start = time.time()
setPath(tree,-1)
print('setPath',len(paths),time.time() - start)

def getPath(i):
	res = []
	while i >= 0:
		res.append(paths[i][0])
		i = paths[i][1]
	return '.'.join(reversed(res))
if SMALL:
	ass("d2d4",getPath(0))
	ass("d2d4.g8f6",getPath(1))
	ass("g2g3.d7d5.f1g2",getPath(60))
else:
	ass("e2e4", getPath(0))
	ass("e2e4.c7c5", getPath(1))
	ass("b1a3.e7e5", getPath(len(paths)-1))
z=99

def getBF_All (node,all): # BreadthFirst, complete tree sorted by n.
	for key in node:
		if len(key) == 1: continue
		nk = node[key]
		all.append([nk['n'],nk['p']])
		getBF_All(nk,all)
start = time.time()
all = []
getBF_All(tree,all)
all.sort(reverse=True, key=lambda item: item[0])
for i in range(10):
	print(all[i][0],getPath(all[i][1]))
print('getBF_All',len(all),time.time() - start)

def getNode(tree,path):
	node = tree
	for key in path:
		if key != 'root': node = node[key]
	return node
if SMALL:
	ass(tree, getNode(tree,[]))
	ass(tree['d2d4'], getNode(tree,['d2d4']))
	ass(tree['e2e4']['e7e5'], getNode(tree,['e2e4','e7e5']))

def getCard(i): # Hämta i popularitetsordning
	if i >= len(all): return ""
	return getPath(all[i][1])

if SMALL:
	ass("e2e4", getCard(0))
	ass("g2g3", getCard(1))
	ass("d2d4", getCard(2))
	ass("g1f3", getCard(3))
	ass("d2d4.g8f6", getCard(4))
	ass("e2e4.c7c5", getCard(5))
	ass("g1f3.g7g6.d2d4.f8g7.c2c4.d7d6.b1c3.b8d7.e2e4.c7c6.f1e2", getCard(-1))
	ass("", getCard(len(all)))
else:
	ass("e2e4", getCard(0))
	ass("d2d4", getCard(1))
	ass("d2d4.g8f6", getCard(2))
	ass("e2e4.c7c5", getCard(3))
	ass("e2e4.c7c5.g1f3", getCard(4))
	ass("g1f3", getCard(5))

def facit(path):
	keys = path.split('.')
	node = getNode(tree,keys)
	keys = node.keys()
	arr = [[node[key]['n'],key] for key in keys if len(key)!=1]
	arr.sort(reverse=True)
	return arr
if SMALL:
	pass
else:
	ass(facit('e2e4.e7e5.g1f3.b8c6.f1c4'), [[3066, 'g8f6'], [2984, 'f8c5'], [203, 'f8e7'], [60, 'd7d6'], [36, 'a7a6'], [32, 'g7g6'], [31, 'c6d4'], [13, 'f7f5'], [11, 'h7h6'], [7, 'g8e7']])
	ass(facit('e2e4'),[[75916, 'c7c5'], [36195, 'e7e5'], [22688, 'e7e6'], [19176, 'c7c6'], [10628, 'd7d6'], [8267, 'd7d5'], [7232, 'g7g6'], [6407, 'g8f6'], [3200, 'b8c6'], [1130, 'b7b6'], [311, 'a7a6'], [113, 'f7f6'], [90, 'b8a6'], [90, 'a7a5'], [87, 'h7h5'], [56, 'f7f5'], [35, 'g8h6'], [26, 'h7h6'], [22, 'g7g5'], [15, 'b7b5']])