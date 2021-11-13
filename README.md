# Pairs game

## Description

This is a classic memory game where the player tries to find as many pairs cards as possible in the shortest time. 


## MVP

The MVP includes the following items:

- Splash screen
- Play button
- 16 cards
- When playing the score updates and time counts down.
- When time is up, the pop up displays to announce the end of the game and shows the player's score.


## Backlog / nice to have

- Initial settings of the game - difficulty (number of cards, time)
- The player can select among 3 levels of difficulty before the start of the game:
  - Easy level --> 16 cards
  - Medium level --> 36 cards
  - Hard level --> 64 cards
- Also the player can choose the time limit for the game - one, two or three minutes
- Depending on the selected number of cards there are 2, 4 or 6 (un)lucky cards hidden among the rest of the cards (e.g. for total of 16 cards, there is 1 green card and 1 red card with the value of +/- 50 points). 
- Cards devided in sections with different values
- Game audio
- When the game is over, display a window to enter the player's name to be a part of the list of 10 best players.


## Data structure ??
class Player {
properties: life, direction.
Methods: goRight, goLeft
}

class Enemy {
properties: direction.
Methods: _appear, _move
}

class Game { properties: player, enemies. Methods:
\_start
\_update
\_paint
}


## States & States Transitions

Definition of the different states and their transition (transition functions):

- splashScreen - Instructions; Play button
- gameScreen - Game itself
- scoreScreen - Once time is up / all cards revealed, the final score appears


## Links

Design [here](https://www.canva.com/design/DAEutK1Y8ps/jbv-dcAjTEiAqXYam6hKDw/view?utm_content=DAEutK1Y8ps&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)

You can play here. --> ADD A LINK
