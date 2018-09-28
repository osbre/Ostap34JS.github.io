function filterSelection(c) {
    var x = document.getElementsByClassName("filterDiv");

    // if it seems to be all, we show all blocks

    if (c == "all") c = "filterDiv";
    for (var i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");

        // else we just show certain blocks
        
        if (x[i].classList.contains(c)) w3AddClass(x[i], "show");
    }
}

// Add a class to Element
function w3AddClass(element, name) {
    if (!element.classList.contains(name)) {
      element.classList.add(name);
    }
}

// Remove a class from Element
function w3RemoveClass(element, name) {
    if (element.classList.contains(name)) {
      element.classList.remove(name);
    }
}
