from mcts import mcts
from enum import Enum
from random import shuffle

class Attributes(Enum):
	sun = 1
	flag = 2
	bird = 3
	rain = 4

	star = 5
	tree = 6
	leaf = 7
	tulip = 8

class Card():
	def __init__(self, attr1, attr2):
		# print(attr1, attr2)
		self.attr1 = attr1
		self.attr2 = attr2
	
	def __str__(self):
		return str(self.attr1) +","+ str(self.attr2)

class State:
	GAME_START = 0

	def __init__(self):
		cards = []
		for attr1 in range(1,5):
			for attr2 in range (5,9):
				cards.append(Card(attr1, attr2))

		shuffle(cards)

		self.grid = [ [cards[i*4 + j] for j in range(0,4)] for i in range(0,4)]
		self.currentTurn = self.GAME_START
		self.currentPlayer = 0
		self.display()

	def display(self):
		for ii in range(0,4):
			for jj in range(0,4):
				print(self.grid[ii][jj], end=' ', flush=True)
			print()

	def getPossibleActions(self):
		if(self.currentTurn == self.GAME_START):
			actions = [[(i,j) for j in range(0,4)] for i in range(0,4)]
		else:
			actions = []
			for ii in range(0,4):
				for jj in range(0,4):
					gridcard=grid[ii][jj]
					if (gridcard.__class__ == Card and gridcard.attr1 == self.lastCard.attr1 or gridself.lastCard.attr2 == self.lastCard.attr2 or gridself.lastCard.attr1 == self.lastCard.attr2 or gridself.lastCard.attr2 == self.lastCard.attr1):
						actions.append((ii,jj))

		return actions

	def takeAction(action):
		i,j = action
		
		self.lastCard = grid[i][j]
		self.currentTurn = action
		self.currentPlayer += 1
		self.currentPlayer = self.currentPlayer%2
		
		grid[i][j] = self.currentPlayer

		# TODO: Detect a win condition
	def isTerminal():
		return len(self.getPossibleActions) == 0

		# TODO: Return a reward in case of a win condition
	def getReward():
		pass

initialState = State()

mcts = mcts(timeLimit=1000)
# bestAction = mcts.search(initialState=initialState)