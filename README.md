# express-minecraft-inventory


## Issues

As firefox doesn't allow custom scrollbars to the extent of other browser, the scrollbars look very different.
As of now, there's no way for me to style it the way I want in css. 

Priority: *Very low*

Solutions:

1. To create the same style, it may be doable in javascript.
2. To fix the shared-inventory padding problem, change background-color to transparent, change ::after width and add another div to the inventory to act as the correct gray background.



## Wishbox

Custom caret for input texts

Priority: *Very low*

Solutions:

1. Create a span with contenteditable & thus enable the creation of a custom caret with JS & CSS.
2. You could possibly add one with ::before/::after & switch the position of the caret with JS.