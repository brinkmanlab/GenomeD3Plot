GenomeD3Plot
============

GenomeD3Plot (formerly Islandplot) is an SVG based genome viewer written in javascript using D3

There are three pieces to the package, a circular genome viewer, a linear
genome viewer and a linear brush element.  Simply include the js files for
the elements you need in your page and you're ready to go.  

Both view types take the same data format, a javascript data structure, with
a few extra tags for each type.  Tracks can not be added after creation of the initial plot objects (but they can be initialized as visible: false) and in the linear plot they can not be reordered

The circular viewer was written first, hence why you might find the configuration options
seem more aimed towards it as their default, most options have a linear_ prefixed
version for the linear viewer.

Examples
========

Demo of the circular plot can be found at [this gist](http://bl.ocks.org/lairdm/6a770c94c6793eee660d).

Demo of the linear plot can be found at [this gist](http://bl.ocks.org/lairdm/c6c235dbfa6e6ee61565).

A demo of the circular and linear plots with their panning features linked together can be found at [this gist](http://bl.ocks.org/lairdm/3a38883488d71623901c).

Available track types
=====================

* block track (simply start and end basepairs for each element)
* stranded track (allowing visualizing of the forward or reverse strand)
* plot track (for visualizing things such as average GC content)
* glyph track (for visualizing specific features at a given point)

Data format
===========

The data passed in must be an array of track objects (see included data.js for sample data).  Each track has the format of:

```
{ 
  trackName: "track1",
  trackType: "stranded",
  visible: true,
  inner_radius: 125,
  outer_radius: 175,
  items: [
          {id: 1, start:0, end:30000, name:"island0", strand: -1},
           ...
         ]
}
```

trackName and trackType are mandatory.  visible defaults to true and is optional.  For all track types except the plot type, items is an array of objects, where each object is a track element with a start and end bp location.  For plot type tracks its simply an array of points for the track and the bp_per_element tag must be included, which is the number of bp between data points in the set.

Track colours and functionality can be customized via CSS, elements will have classes such as track1_pos for the forward (positive) strand elements of track1.  Use something like Chrome's element inspector to examine all the CSS classes that are added to visualization elements.

For glyph tracks the shapes allowed are standard SVG shapes.

Creating plots
==============

Tracks also require a second object to be passed on when creating them, the layout of the track.  The minimum needed is the genomesize (in bp) and the div to create the object in.  Additional configuration options such as margin sizes can also be configured.

```
var circularlayout = {genomesize: 6264404,
                      container: "#circularchart",
        };

var cTrack = new circularTrack(circularlayout, tracks);
```

The two arguments are the layout and the track data.

Manipulating plots
==================

You may also make JS calls to manipulate visualized tracks, the basic functionality is to show and hide a track, this is done via the name in the trackName element of the track.

```
cTrack.showTrack("track1");

cTrack.hideTrack("track1");
```

For glyph tracks the format is slightly different, you must specify which glyph type in the track is to be shown or hidden.

```
cTrack.showGlyphTrackType("track5", "adb");

cTrack.hideGlyphTrackType("track5", "adb");
```

There is also functionality to alter the radius of where a track is in a circular plot.  This is done by track id rather than name so a call to findTrackbyName must be done first:

```
var id = cTrack.findTrackbyName('track1');
cTrack.moveTrack(id, newInnerRadius, newOuterRadius);
```

Attaching a brush
=================

For zooming and resizing the linear track there's a brush element made to work with the track.  Once the linear track is made the brush can "attach" to it.

```
var linearTrack = new genomeTrack(linearlayout, tracks);
var brush = new linearBrush(contextLayout,linearTrack);
```

There's also a polar brush element in the circular plot type that can be attached to a linear plot, so when the polar brush is moved on the ciruclar plot it will update the linear track.

```
var cTrack = new circularTrack(circularlayout, tracks);
cTrack.attachBrush(linearTrack);
```

Both the linear and circular plots allow multiple callbacks if there is more than one element you need to alter when either the linear or circular brushes are altered.  Simply make multiple calls to attachBrush() in either plot type and the callbacks will each be called on update. 

```
cTrack.attachBrush(linearTrack);
cTrack.attachBrush(someOtherObj);
```

Updating the view
=================

The callback used when "attaching" a brush can either be a plot object or your own object, if creating your own callback listener it must implement two callback functions.  When an update occurs the plot will call callbackObj.update(newStartBP, newEndBP) and when the drag or zoom is finished it will call callbackObj.update_finished(newStartBP, newEndBP)

Stranded/Block Track configuration options
==========================================

```
var tracks = [
	      { trackName: "track1",
		trackType: "stranded", [or "track" for non-stranded]
		visible: true,
		inner_radius: 125,
		outer_radius: 175,
		mouseclick: 'islandPopup',
		mouseover_callback: 'islandPopup',
		mouseout_callback: 'islandPopupClear',
		linear_mouseclick: 'linearPopup',
		showLabels: true,
		showTooltip: true,
		items: [
                         {id: 1, start:0, end:30000, name:"island0", strand: -1},
                          ...
                       ]
               }
              ]
```

inner_radius: The inner radius of arcs, in px, for the track.
outer_radius: The outer radius of arcs, in px, for the track. For stranded tracks each strand is half the radius between inner and outer radius

mouseclick: Callback for mouse clicks on arcs in a circular plot. Either a function(d) or an object, if an object is given callbackObj.mouseclick(d) will be called where d is the element in the items array.

linear_mouseclick: Same as mouseclick but for a linear plot

mouseover: Callback for a mouse over event for a circular plot, same as mouseclick, if an obj callbackObj.mouseover(d) is called otherwise callback(d)

linear_mouseover: Same as mouseover but for a linear plot

mouseout: Callback for a mouseout event for a circular plot, same as mouseclick, if an obj callbackObj.mouseout(d) is called otherwise callback(d)

linear_mouseout: Same as mouseout but for a linear plot

showLabels: Show the name element in an item on a linear plot if the plot is zoomed sufficiently so the text will fit in the element

showTooltip: Show a hoverover tooltip on a linear plot of the name element in the item when the mouse is over the element.

Plot configuration options
==========================

```
	      { trackName: "track4",
		trackType: "plot",
		visible: true,
		plot_min: 0.4891,
		plot_max: 0.7274,
		plot_mean: 0.66558768401076,
		bp_per_element: 10000,
	        plot_width: 50,
		plot_radius: 100,
	        linear_plot_width: 50,
		linear_plot_height: 100,
		items: [
                        ...
                       ]
              }
```

plot_min: The minimum value in the set of element
plot_max: The maximum value in the set of element
plot_mean: The mean value of the set of elements, if omited a mean value line isn't shown

bp_per_element: The number of bp between each element in the items list, number of items * bp_per_element should equal the genome size

plot_witdh: Number of px between the inner and outer radius of the plot
plot_radius: The radius of the plot, the plot will extend plot_width/2 in either direction

linear_plot_width: Number of px between the top and bottom of a the plot on a linear plot
linear_plot_height: The number of pixels from the top of a linear plot for the centre of a plot, the plot will extend plot_width/2 in either direction

Glyph configuration options
===========================

```
	      { trackName: "track5",
		trackType: 'glyph',
		glyphType: 'circle',
		radius: 75,
		pixel_spacing: 8,
		linear_pixel_spacing: 8,
	        glyph_buffer: 8,
	        linear_glyph_buffer: 8,
		glyphSize: 20,
		linear_glyphSize: 20,
		linear_height: 100,
		items: [
			{id: 1, bp: 100, type: 'vfdb'},
                        ...
                       ]
              }
```

glyphType: The type of glyph, any valid SVG shape is allowed
radius: The starting radius on a circular plot the glyphs will begin stacking

pixel_spacing: The minimum number of pixels between glyphs on a circular plot before glyphs are stacked
glyph_buffer: If a glyph is stacked, how many px to put between them

linear_pixel_spacing: The minimum number of pixels between glyphs on a linear plot before glyphs are stacked
linear_glyph_buffer: If a glyph is stacked on a linear plot, how many px to put between them

glyphSize: Size of a glyph on a circular plot
linear_glyphSize: Size of a glyph on a linear plot

linear_height: Distance from the top, in px, that a glyph track will start displaying on a linear track
linear_invert: true or false, if false glyphs will begin stacking down on a linear track. If true glyphs will stack upwards

