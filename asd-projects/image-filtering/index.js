// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify);
    applyFilterNoBackground(reddify);
    // applyFilterNoBackground(decreaseBlue);
    applyFilter(decreaseBlue);
    applyFilter(increaseGreenByBlue);

    

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(filterFunction){
    for(var i = 0; i < image.length; i ++){
        for(var c = 0; c < image[i].length; c++){
            var rgbString = image[i][c];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
             rgbString = rgbArrayToString(rgbNumbers);
             image[i][c] = rgbString;
      }
    }
}
// TODO 6: Create the applyFilterNoBackground function must be identical to applyfilter funciton,,
function applyFilterNoBackground(filterFunction){
    var grey = image[0][0];
      for(var i = 0; i < image.length; i ++){
        for(var c = 0; c < image[i].length; c++){
            if(image[i][c] !== grey){
                var rgbString = image[i][c];
                var rgbNumbers = rgbStringToArray(rgbString);
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[i][c] = rgbString;
            }
      }
    }
  
 }
function decreaseBlue(array){
    array[BLUE] = keepInBounds(array[BLUE] - 50);

}
function increaseGreenByBlue(img){
    img[GREEN] = keepInBounds(img[BLUE] + img[GREEN]);

}

// TODO 3 & 5: Create filter functions

function reddify(arr){
   arr[RED] = 200;
}

function keepInBounds(num){ 

    return Math.max(Math.min(num,255),0);
}
console.log(keepInBounds(-30)); // should print 0
console.log(keepInBounds(300)); // should print 255
console.log(keepInBounds(127)); // should print 127 



// CHALLENGE code goes below here




