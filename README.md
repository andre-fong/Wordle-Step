# Wordle-Step

A spin on the classical Wordle puzzle game.

Play it here: https://wordle-step.vercel.app/

## How To Play

* Take all of classic Wordle's rules, but,
* Wordles get more challenging with every stage you beat.
* Leftover guesses become bonus guesses for the next stage.

## How It Was Built

### Technologies & Frameworks

* React + Next.js
* TypeScript
* Sass

### Things I Learned

While this wasn't my first rodeo with React and Next.js, it was my first time creating a web 
game from scratch and it was a lot of fun! As my second decently-sized web project, I'm proud of the 
result and learned a whole lot, ranging from:

* Developing for mobile responsiveness and UX (especially important for a game with many moving parts)
* The joys of developing with TypeScript (!!)
* Deepening my React proficiency with context and custom hooks
* Configuring and deploying a Next.js project on Vercel

### Challenges I Faced

* I had to figure out a way to generate random words that weren't crazy obscure (who's gonna guess a word like "Ducat") but still allow them to be guessed by the player. To solve this, I used [random-words](https://www.npmjs.com/package/random-words) to generate words for the game and parsed through a 370,000+ line txt file of English words to create the game dictionary.
* Parsing through said txt file worked in development but failed in production, causing the game dictionary to be empty on Vercel. The file on my Windows laptop had words separated by a Carriage Return and Line Feed (CR + LF) character, while the file in production was only separated by LF. Splitting the file's contents with CR + LF in production would therefore produce an empty list of valid words. I fixed this by conditionally splitting the file based on the environment.
* Testing the game because I'm bad at Wordle.

## What's Next For Wordle Step

If there are any suggestions, errors, or improvements I can make, please flag them to me w/ a PR or issue!
Looking to modify difficulty of randomly generated answers in the future.
