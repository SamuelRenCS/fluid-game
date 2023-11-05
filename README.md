## Try it Out
[Link to website](https://philniko.github.io/fluid-game/empty-example/index.html)

## Inspiration
We were inspired by the properties and visuals that are associated with fluid dynamics. Wether its dropping ink in a bowl of water as a kid or studying the intricacies of its physical properties, we believe many of us have been fascinated by fluid dynamics at some point. Our goal is to provide a user friendly game to allow you to visualize some simple properties of this interesting field of physics.
## What it does
Our project consists of a simple game offered in three mode (single or multiplayer as well as a playground option) to allow you to interact with a simple modelling of an incompressible fluid. By default, the game is set to single player mode. Starting from the top left, with the arrow keys, the player can move a ball around the play area. In the centre is a single dye emitting point which projects coloured fluid in an arbitrary direction. The goal of the game is to avoid the dyed fluid. Even though the colour dissipates after some time, beware of the heavily diluted areas! The two-player game mode allows two users to, using the arrow and "wasd" keys to control two dye emitting points. The goal is to move around to spread your colour while avoiding your opponent's dye. If either player ventures into the other's fluid, they take damage which can be seen on the bottom health bars. In the playground mode, things work similarly to the multiplayer mode without the competitive component to play around with the visuals. 

If you're interested in playing our game, you can find it here: [link](https://philniko.github.io/fluid-game/empty-example/index.html).
## How we built it
We simply implemented a well known discretizing method for the Navier-Stokes equations to model incompressible fluid behaviours such as water. We then used this as a basis for the graphical component to allow the user to visually see what is happening. Since every variable ultimately evolves depending on the fluid velocity, we decided to have a single point set an initial random velocity to create fluid movement.

We created the website and interactive components using the javaScript graphics library, p5.js and simple HTML, CSS and JS for the buttons and general appearance of our website.
## Challenges we ran into
Initially, we wanted to implement an AI player for the single player mode using Machine Learning. However, we quickly realized how complex integrating machine learning in fluid-based mini games is due to the many variables involved with the fluid model. During our first implementation, the graphical component was also extremely laggy due to a quirk with the library we decided to use.
## Accomplishments that we're proud of
We are proud of adding an interactive and user-friendly element to a physical model of a very complicated physical phenomenon. 
## What we learned
We learned a lot about the lattice Boltzmann method of modelling the Navier-Stokes equations.
Working on this project also allowed us to improve our overall comfort in using p5.js.
## What's next for Fluid Fights
Our next step would be to implement an AI player using a hybrid approach combining rule-based mechanics and machine learning for realism and adaptability. We would also look in implementing a more efficient algorithm to handle the effects of user interaction in the fluid simulations. Lastly, improving the overall look and functionality of the website would be in our list of tasks to offer the players a more aesthetically pleasing and seamless experience. 
