# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Game Logic](#GameLogic)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).



## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).


## Game Logic

 * Display the cards on the page
    *  Shuffle the list of cards using the provided "shuffle" method below
    *  Loop through each card and create its HTML
    *  Add each card's HTML to the page
 * Set up the event listener for a card. If a card is clicked:
   - Display the card's symbol (put this functionality in another function that you call from this one)
   - Add the card to a *list* of *open* cards
   - If the list already has another card, check to see if the two cards match
     + If the cards do match, lock the cards in the open position
     + If the cards do not match, remove the cards from the list and hide the card's symbol
     + Increment the move counter and display it on the page 
     + If all cards have matched, display a message with the final score