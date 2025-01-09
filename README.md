# okiya

This is an implementation of Okiya, using boardgame.io.

See <https://blueorangegames.eu/wp-content/uploads/2017/12/OKIYA_rules_ML.pdf>

## Rules

### Components
- 8 red geisha tokens
- 8 black geisha tokens
- 16 imperial garden tiles, consisting of 4 sets.


Each set is composed of 4 tiles which all show the same plant species: Maple leaf, Cherry
tree, Pine tree, Iris. 

Each tile of the set always shows one particularity : Rising Sun, Tanzaku (Japanese flag), Birds, Rain. 

### Aim of the game
In order to receive the grace of the emperor you have to be the first
to realize one of the three winning conditions:
- Realize a row of 4 geishas of your color in the imperial garden (it can be a vertical,
horizontal or diagonal row)
- Realize a square (2x2) of four geishas of your color in the imperial garden
- Block your opponent, so that he can’t move anymore.

### Setup
Shuffle the 16 garden tiles carefully, and randomly put them face up into
a square of 4x4. Each player takes the 8 geisha tokens of his color. The
players place their geisha tokens on opposite sides of the garden

### how to play
In the first game the first player is chosen
randomly. In the next rounds it is always the
one who has lost the previous game. The first
player chooses a tile from the garden. It has to
be a border tile (that means that the starting
player is not allowed to choose one of the 4
middle tiles in the first turn). The active player
removes the chosen tile and puts it face up
on the table. Then he places one of his geisha
tokens on this position.
The garden tile which is taken out of the
garden defines the rules for the second player.
The next player must place his geisha token
according to the rules. He can only remove
a tile which shows the same vegetation.
The next player removes a garden tile
according to the rules and replaces it with
a geisha token of his own. He places the
removed tile face up on the table. Again this
tile defines the rules for the other player.

The game continues like this until one player
achieves one of the three winning conditions:

1. Realization of a vertical, horizontal or
diagonal row of 4 geishas of his color.
2. Realization of a square of 4 geishas of your
color.
3. Block your opponent, so that he can’t move
anymore

![gif](https://i.imgur.com/1ZyCqW2.gif)

## Difference from Original Game

This adaptation uses 4 Card Suites (Hearts, Spades, Clubs, Diamonds) and 4 colors.

## How to run?

```
npm install
npm start
```

## License

Licensed under the [MIT License](https://nemo.mit-license.org/). See LICENSE file for details.