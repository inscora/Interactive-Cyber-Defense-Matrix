# Interactive OWASP Chart

## How the Files Work Together

### index.html

Within the body tag, we set up the two column grid by applying the class `grid`. 

Underneath the body, mapping to the two columns, there is a section tag with an empty `ul`, and an inline svg that builds the chart. 

The empty `ul` will hold the checkboxes after they are created in the scripts.js file. 

If another solution is needed, the svg will need to be amended to add an additional grouping, `g` tag with a unique id, underneath the `labels` grouping. It will require two parts: A new `rect` tag, and a new `text` tag. The `x` and `y` values will need to be calculated for positioning, but the rest of the attributes are fairly standard and can be copied. 

### styles.css

`.grid` creates the grid within the body tag and sets the size of the checkboxes column to set width and then creates an automatic sizing for the chart. 

`g.hide-solution` looks specifically for a grouping tag, `g`, that has the class `hide-solution` set, and will then apply the `display: none` style, hiding both the rectangle and the text nodes. 

### script.js

`SOLUTIONS` is an array data structure that holds the id that matches the one added in the svg, and the label to set as the label for the corresponding text box. 

`HIDE_CLASS_NAME` matches the css stylesheet. 

`SOLUTIONS` gets iterated, creating the `li` tags, which in turn hold the checkboxes, that will be appended to the empty `ul` from `index.html`. 

First, we store the `ul` element we will be appending to, and then the `g` tag by finding the currennt id we are iterating on. 

Second, because the groupings are desired to be hidden by default, we toggle `HIDE_CLASS_NAME` to add it to the `g` element. It adds because we don't have any class name in the svg, as this is an implementation detail we want to control in the javascript rather than the html directly. 

Third, we create the elements we want to add to the `ul`: `li`, `label`, and `input`. We then set the appropriate attributes including using the id with `-checkbox` appended, before appending it to the document in two steps: First the children of the `li`, and then the `li` to the `ul`.

Finally, we add an event listener on the `input` element we created to add the interactivity of hiding/showing the groupings based on the state of the checkbox. When the checkbox is in a checked state, the grouping will show and vice versa.