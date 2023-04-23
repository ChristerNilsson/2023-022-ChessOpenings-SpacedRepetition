import json
import time

# arr innehåller [uci, level, parent, n]
# ["e2e4",0,-1,112345]

SIZE = 0

if SIZE == 0: FILE = "data/arr-2014-08.json"
if SIZE == 1: FILE = "data/arr-2016-02.json"
if SIZE == 2: FILE = "data/arr-2019-06.json"

start = time.time()
with open(FILE, "r") as f:
	arr = json.load(f)['arr']
print('load',time.time() - start)

def ass (a,b):
	if a == b: return
	print('assertion error:')
	print(' ',a)
	print(' ',b)

def getPath(i):
	res = []
	while i >= 0:
		res.append(arr[i][0])
		i = arr[i][2]
	return '.'.join(reversed(res))
start = time.time()
if SIZE == 0:
	ass("d2d4",getPath(0))
	ass("d2d4.g8f6",getPath(1))
	ass("g2g3.d7d5.f1g2",getPath(60))
if SIZE == 1:
	ass("d2d4", getPath(0))
	ass("d2d4.d7d5", getPath(1))
	ass("e2e4.e7e5.g1f3.b8c6.f1c4", getPath(2557))
	ass("e2e4.e7e5.g1f3.b8c6.f1c4.f8c5.b2b4.c5b4.c2c3.b4e7.d2d4.c6a5", getPath(2611))
	ass("e2e4.e7e5.g1f3.b8c6.d2d4", getPath(2612))
	ass("c2c3", getPath(len(arr)-1))
if SIZE == 2:
	ass("e2e4.c7c5.g1f3.e7e6.d2d4.c5d4.f3d4.a7a6.f1d3.d8c7.e1g1.b8c6.d4c6.d7c6.b1d2", getPath(100))
	ass("e2e4.d7d5.e4d5.g8f6.g1f3.f6d5", getPath(10000))
print('getPath',time.time() - start)

def getStart (path):
	keys = path.split('.')
	j = 0
	for i in range(len(keys)):
		key = keys[i]
		while arr[j][0] != key or arr[j][1] != i:
			j += 1
			if j>=len(arr): return -1
	return j
start = time.time()
if SIZE == 0:
	ass(22,getStart("e2e4"))
	ass(32,getStart("e2e4.e7e5"))
	ass(-1,getStart("e2e4.e7e5.g1f3.b8c6.f1c4"))
if SIZE == 1: ass(2557,getStart("e2e4.e7e5.g1f3.b8c6.f1c4"))
if SIZE == 2: ass(4585, getStart("e2e4.e7e5.g1f3.b8c6.f1c4"))
print('getStart',time.time() - start)

def getStopp (path,index):
	keys = path.split('.')
	j = index + 1
	while arr[j][1] >= len(keys): j += 1
	return j
start = time.time()
if SIZE == 0:
	ass(42,getStopp("e2e4",22))
	ass(34,getStopp("e2e4.e7e5",32))
if SIZE == 1: ass(2612,getStopp("e2e4.e7e5.g1f3.b8c6.f1c4",2557))
if SIZE == 2: ass(4900,getStopp("e2e4.e7e5.g1f3.b8c6.f1c4",4585))
print('getStopp',time.time() - start)

def getQuestions(start,stopp):
	res = [[arr[i],getPath(i)] for i in range(start,stopp)]
	res.sort(key = lambda item:[item[0][3],item[1]])
	return list(reversed(res))
start = time.time()
if SIZE == 0:
	questions = getQuestions(32,34)
	ass([['e7e5', 1, 22, 9], 'e2e4.e7e5'],questions[0])
	ass([['g1f3', 2, 32, 6], 'e2e4.e7e5.g1f3'],questions[-1])
if SIZE == 1:
	questions = getQuestions(2557,2612)
	ass([['f1c4', 4, 2419, 134], 'e2e4.e7e5.g1f3.b8c6.f1c4'],questions[0])
	ass([['b4a5', 9, 2607, 5], 'e2e4.e7e5.g1f3.b8c6.f1c4.f8c5.b2b4.c5b4.c2c3.b4a5'],questions[-1])
if SIZE == 2:
	questions = getQuestions(4585,4900)
	ass([['f1c4', 4, 4012, 1036], 'e2e4.e7e5.g1f3.b8c6.f1c4'],questions[0])
	ass([['a7a6', 5, 4585, 5], 'e2e4.e7e5.g1f3.b8c6.f1c4.a7a6'],questions[-1])
print('getQuestions',time.time() - start)

# sök igenom hela arr[start:stopp] efter alla rader med rätt level och sortera
def facit(arr,i,stopp):
	level = arr[i][1]
	res = [item for item in arr[i:stopp] if item[1] == level+1] # borde man inte kolla att man inte hamnar utanför trädet?
	res.sort(key = lambda item: -item[3])
	return res
start = time.time()
if SIZE == 0:
	ass(facit(arr,22,42), [['c7c5', 1, 22, 14], ['g7g6', 1, 22, 13], ['d7d5', 1, 22, 9], ['e7e5', 1, 22, 9], ['c7c6', 1, 22, 6]])
	ass(facit(arr,32,34), [['g1f3', 2, 32, 6]])
if SIZE == 1: ass(facit(arr,2557,2612), [['g8f6', 5, 2557, 60], ['f8c5', 5, 2557, 60]])
if SIZE == 2: ass(facit(arr,4585,4900), [['g8f6', 5, 4585, 529], ['f8c5', 5, 4585, 454], ['f8e7', 5, 4585, 19], ['g7g6', 5, 4585, 12], ['f7f5', 5, 4585, 8], ['d7d6', 5, 4585, 8], ['a7a6', 5, 4585, 5]])
print('facit',time.time() - start)
