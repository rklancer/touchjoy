Touchjoy
========

Touchjoy is a simple "joystick" demo web app for touch devices. Included is example Python server
code that accepts POST requests from the web app. It has been succesfully uploaded to a
[Rascal](http://rascalmicro.com/) board and then used during a Mini Maker Faire to allow members of
the public to drive a robot using their own phone.

The web app sends POST requests at some settable rate, with parameters `x` and `y` set to the
x and y position of the joystick "knob" within the unit circle. It POSTs the coordinates (0, 0) when
the  user lifts their finger from the knob, and then ceases further POSTs until the user drags the
knob away from the center again. (This is one of several reasons this is demo code -- we do not
implement a robust protocol to make sure the server acknowledges that the joystick has been returned
to center!)

See video of Touchjoy being used to drive a robot base (not at the Faire)
[here](http://youtu.be/I-g5E0_8iuw).

The joystick app itself is in `index.html` and the associated files in `css/` and `js/`.

An example formatted for use on the Rascal board lives in `rascal/`.

Written by Richard Klancer <rpk@pobox.com>. MIT Licensed.
