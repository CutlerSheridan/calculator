# JavaScript Calculator
## A straightforward calculator

Click on numbers.  Click on operators.  Get results.

### NEXT STEPS
- give it style
- make line under result cross 100% of the screen for small enough screens but not for bigger screens

### TO-DO LATER
- add dark mode toggle
- make mobile-friendly
- add touch controls
- decide for sure how long the numbers should go and update display() and improveAccuracy() accordingly
- decide if worth adding a bool that toggles on if the first press is tab or an arrow key so then I can use that info to conditionalize input.preventDefault() for "enter" in useCalc(); alternatively, don't use "enter" for "=" -- ahh maybe not necessary as the spacebar functions as enter when tabbing through buttons
-add credit footer

### DONE
- make enter key work as "=" regardless of focused button
- add keyboard inputs
- deal with answers too long ~~(display msg for x seconds before clearing?)~~
- add error message if dividing by 0
- fix pressing decimal after equals not keeping decimal if result was decimal
- fix decimals w/o ints operating on decimals w/o ints ~~not returning result~~ not _displaying_ result
- round long decimal answers
- add ability after "equals" to just type a new number to start fresh
- get backspace working if it's an equals result
- get rand working
- get x! working
- get invert working (maybe these are all a single thing)
- get % working both solo and as mid-equation operator
- figure out why "equals" works the first time, then performs the same operation on the result
- make two step operator work with result of equals instead of adding the last number