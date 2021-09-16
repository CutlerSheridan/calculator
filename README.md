# JavaScript Calculator
## A straightforward calculator

Click on numbers.  Click on operators.  Get results.

Works with mouse, keyboard, or touch controls.  Desktop- and mobile-friendly.

#### NEXT STEPS
- fix factorial button from however I fucked it up

##### TO-DO LATER
- when tab user, retain outline after button press
- fix how, if you divide by 0 by continue with another operator instead of "equals," it doesn't give error

##### DONE
- switch random() to return num between 0 and 1
- fix error when pressing two two-step operators sequentially
- make factorial errors clear upon next button press
- fix factorial so errors display correctly
- prevent zoom on double-tapped buttons on mobile
- stop depressed touch buttons from flickering upon press on mobile
- add credit footer
- clean up tester console.logs in main.js
- fix touch controls so only two-step-buttons stay highlighted / hover state is not sticky
- make mobile-friendly
- decide what to do on focus for accessibility
- get tabbing working so it doesn't auto-press buttons
- decide if worth adding a bool that toggles on if the first press is tab or an arrow key so then I can use that info to conditionalize input.preventDefault() for "enter" in useCalc(); **alternatively, don't use "enter" for "=" -- maybe not necessary as the spacebar functions as enter when tabbing through buttons**
- stop depressed two-step touch buttons from retaining more than one pressed button
- adjust ~~length of~~ result screen so errors can display
- decide for sure how long the numbers should go and update display() and improveAccuracy() accordingly
- make buttons press when you use keyboard *and release*
- settle on dark mode's hover color
- make dark mode button read clicks on icon _// this was a tough one--changed input.target to input.currentTarget in useCalc()_
- add dark mode toggleability
- put icon on dark mode button
- give it style
- ~~make line under result cross 100% of the screen for small enough screens but not for bigger screens~~
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