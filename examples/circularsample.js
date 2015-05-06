// Sample routines to initialize the plot for rendering
// and add some basic functionality.

// Initialize the defaults for the chart such as
// the genome size, the div container to put the
// SVG object in, what function to call during a
// double click and the initial chart size.
var genomesize = 6264404;
var circularlayout = {genomesize: genomesize,
		      container: "#circularchart",
		      dblclick: "doubleClick",
                      w: 550, h: 550
        };

// The actual initialization call which takes two
// parameters, the layout (above) for the plot and
// the dataset to visualize (from data.js, a json
// data structure)
var cTrack = new circularTrack(circularlayout, tracks);

// If we're showing both a circular and linear chart,
// and have a linear brush, attach it (see combo plot demo)
if('undefined' !== typeof linearTrack) {
    console.log("Attaching linear track");
    cTrack.attachBrush(linearTrack);
    cTrack.showBrush();
}

if('undefined' !== typeof brush) {
    console.log("Attaching linear track brush");
    cTrack.attachBrush(brush);
}

// Now some callbacks to make the interactive functionality work.

// Attached to the onchange callback for the GC Plot checkbox,
// call the plot to add/remove the GC Plot as needed
function updateGC(cb) {
    if(cb.checked) {
	cTrack.showTrack("gcplot");
    } else {
	cTrack.hideTrack("gcplot");
    }
}

// Attached to strand track checkbox, call the plot to
// add/remove the inner stranded track
function updateStrand(cb) {
    if(cb.checked) {
	cTrack.showTrack("track1");
    } else {
	cTrack.hideTrack("track1");
    }
}

// Attached to the contig gap checkbox, call the plot to
// add/remove the contig gap squiggles
function updateGaps(cb) {
    if(cb.checked) {
	cTrack.showTrack("gapTrack");
    } else {
	cTrack.hideTrack("gapTrack");
    }
}

// Attached to the ADB glyph checkbox, call the plot to
// add/remove only the ADB type of glyph
function updateAdb(cb) {
    if(cb.checked) {
	cTrack.showGlyphTrackType("track5", "adb");
    } else {
	cTrack.hideGlyphTrackType("track5", "adb");
    }
}

// Attached to the resize plot button, call the plot to
// resize the plot to 650px diameter
function resizePlot() {
    cTrack.resize(650);
}

function saveImage() {
    cTrack.savePlot(4.0, "islandviewer.png", "tracks.css", 'png');
}

// Demo of the hover over timer, we had to
// do it this way to get around IE <9 not supporting
// parameters to the function called by setTimeout()
//
// If you have over an island, the console log will 
// display the callback parameters when the timer expires
//
// The callback for hover (along with click) are defined in
// the data definition for each track in the dataset (data.js)
var timer;
var d_callback;
function islandPopup(d) {
    d_callback = d;
    timer = setTimeout(function() {console.log(d_callback);}, 1000);
}

function islandPopupClear(d) {
    clearTimeout(timer);
}

// Callback defined at the top of this file, for
// double clicks on the plot
function doubleClick(plotid, bp) {
    // If we have an attached linear plot, we're going
    // to refocus the zoomed area, otherwise we'll just
    // alert the user that a double click happened
    if('undefined' !== typeof linearTrack) {
        var halfBP = (cTrack.brushEndBP - cTrack.brushStartBP) /2;

	var newStart = Math.max(0, (bp - halfBP));
	var newEnd = Math.min(genomesize, (bp + halfBP));

        console.log("Moving zoom area to: " + newStart + ", " + newEnd);
        cTrack.moveBrushbyBP(newStart,
                             newEnd);
        linearTrack.update(newStart, newEnd);
    } else {
      alert("Double click! From " + plotid + " at " + bp + " bp" )
      console.log("double click!");
      console.log(plotid);
      console.log(bp);

    }
}

