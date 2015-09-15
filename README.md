frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.


Instructions:

## Starting the game ##
1) Begin game by navigating to index.html either locally or using pyhthon's SimpleHTTPServer to start a static server
and navigate to localhost with the port chosen

## Playing the game ##
2) The game starts with a score of zero and the default game winning score is 10.
3) A collision with an enemy bug reduces your score by one and sends you back to your starting position.
4) Watch out, a collision with a bug will anger the bug and cause its speed to increase permanently until
the end of the game.
5) Reaching the strip of water at the top of the game board increases your score by one, after which, you are
returned to your starting position.
6) The game will not allow your score to go negative and will display a warning, while keeping your score at
zero until you attain a positive score.