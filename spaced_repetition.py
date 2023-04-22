import json
import time

SMALL = False
if SMALL:
	FILE = "data/tree_62.json"
else:
	FILE = "data/tree_2020-04.json"

with open(FILE, "r") as f: tree = json.load(f)

def setPath(tree,path):
	for key in tree:
		if len(key) == 1: continue
		tree[key]['p'] = '.'.join(path + [key])
		setPath(tree[key],path + [key])
start = time.time()
setPath(tree,[])
print('setPath',time.time() - start)

def ass (a,b):
	if a == b: return
	print('assertion error:')
	print(' ',a)
	print(' ',b)

# def getBF (tree,level): # BreadthFirst, one level at a time
# 	chars = 4*level + level - 1
# 	queue = [tree]
# 	paths = ['']
# 	i = 0
# 	while i < len(queue):
# 		node = queue[i]
# 		path = ''
# 		if len(paths) != 0: path = paths[i]
# 		for key in node:
# 			if key == 'n': continue
# 			path1 = key
# 			if path != '': path1 = path + '.' + key
# 			if len(path1) <= chars and path1 != '':
# 				queue.append(node[key])
# 				paths.append(path1)
# 		i+=1
# 	return list(filter(lambda x : len(x)==chars , paths))

# def parents(node,key):
# 	print('parents',key,node)
# 	node1 = node
# 	key1 = key
# 	res = []
# 	while node1 != tree:
# 		for k in node1:
# 			if k == 'n': continue
# 			if k == key1:
# 				res.append(key1)
# 				node1 = node1[key1]
# 				key1 = k
# 	return res

def getBF_All (node,all): # BreadthFirst, complete tree sorted by n.
	for key in node:
		if len(key) == 1: continue
		all.append([node[key]['n'],node[key]['p']])
		getBF_All(node[key],all)
start = time.time()
all = []
getBF_All(tree,all)
all.sort(reverse=True, key=lambda item: item[0])
for i in range(10):
	print(all[i])
print('getBF_All',len(all),time.time() - start)

# start = time.time()
# arr = getBF(tree,1)
# print(len(arr),time.time() - start)
# if SMALL:
# 	ass(getBF(tree,0),[])
# 	ass(getBF(tree,1),['d2d4','e2e4','g1f3','g2g3'])
# 	ass(getBF(tree,2),['d2d4.g8f6', 'd2d4.b7b5', 'e2e4.c7c5', 'e2e4.d7d5', 'e2e4.e7e5', 'e2e4.c7c6', 'e2e4.g7g6', 'g1f3.g8f6', 'g1f3.g7g6', 'g2g3.g7g6', 'g2g3.d7d5'])
# 	ass(getBF(tree,3),['d2d4.g8f6.c2c4', 'd2d4.b7b5.e2e4', 'e2e4.c7c5.g1f3', 'e2e4.d7d5.e4d5', 'e2e4.e7e5.g1f3', 'e2e4.c7c6.d2d4', 'e2e4.g7g6.d2d4', 'g1f3.g7g6.d2d4', 'g2g3.g7g6.f1g2', 'g2g3.d7d5.f1g2'])
# 	ass(getBF(tree,4),['d2d4.g8f6.c2c4.c7c5', 'd2d4.b7b5.e2e4.c8b7', 'e2e4.d7d5.e4d5.d8d5', 'e2e4.c7c6.d2d4.d7d5', 'e2e4.g7g6.d2d4.f8g7', 'g1f3.g7g6.d2d4.f8g7', 'g2g3.g7g6.f1g2.f8g7'])
# 	ass(getBF(tree,5),['d2d4.g8f6.c2c4.c7c5.d4d5', 'e2e4.d7d5.e4d5.d8d5.b1c3', 'e2e4.g7g6.d2d4.f8g7.b1c3', 'g1f3.g7g6.d2d4.f8g7.c2c4', 'g2g3.g7g6.f1g2.f8g7.d2d3'])
# 	ass(getBF(tree,6),['d2d4.g8f6.c2c4.c7c5.d4d5.e7e6', 'e2e4.d7d5.e4d5.d8d5.b1c3.d5a5', 'e2e4.g7g6.d2d4.f8g7.b1c3.d7d6', 'g1f3.g7g6.d2d4.f8g7.c2c4.d7d6'])

def getNode(tree,path):
	node = tree
	for key in path:
		if key != 'root': node = node[key]
	return node
if SMALL:
	ass(tree, getNode(tree,[]))
	ass(tree['d2d4'], getNode(tree,['d2d4']))
	ass(tree['e2e4']['e7e5'], getNode(tree,['e2e4','e7e5']))

# def getNext(tree,path): # Nästa path efter path i BreadthFirst-ordning
# 	start = time.time()
# 	keys = path.split('.')
# 	n = len(keys)
# 	keys1 = getBF(tree,n)
# 	if path in keys1:
# 		index = keys1.index(path)
# 	else:
# 		index = -1
# 	if index+1 < len(keys1):
# 		res = keys1[index+1]
# 	else:
# 		keys1 = getBF(tree, n+1)
# 		if len(keys1)==0: res = ''
# 		else: res = keys1[0]
# 	print(time.time()-start)
# 	return res

def getCard(i): # Hämta i popularitetsordning
	if i >= len(all): return ""
	return all[i][1]

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