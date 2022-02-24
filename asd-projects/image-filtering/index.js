// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function applyFilter(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here

    

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(){
    for(var i = 0; i < image.length; i ++){
        for(var c = 0; c < image[i].length; c++){
            var rgbString = image[i][c];
            var rgbNumbers = rgbStringToArray(rgbString)
            rgbArrayToString(rgbNumbers)
          
        }
    }


}


// TODO 6: Create the applyFilterNoBackground function


// TODO 3 & 5: Create filter functions


// CHALLENGE code goes below here
