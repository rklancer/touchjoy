// Just do the dead simplest thing right now -- we have one draggable element, and no encapsulation
var dragInfo = {};

function dragStart(evt) {
  dragInfo.dragging = true;
  evt.preventDefault();

  var offset = $(dragInfo.element).offset();

  dragInfo.x = evt.pageX;
  dragInfo.y = evt.pageY;
  dragInfo.top = offset.top;
  dragInfo.left = offset.left;
}

function drag(evt) {
  if ( ! dragInfo.dragging ) return;
  evt.preventDefault();

  var offset = $(dragInfo.element).offset(),
      dx = evt.pageX - dragInfo.x;
      dy = evt.pageY - dragInfo.y;

  dragInfo.x = evt.pageX;
  dragInfo.y = evt.pageY;
  offset.left += dx;
  offset.top += dy;

  $(dragInfo.element).offset(offset);
}

function dragEnd(evt) {
  dragInfo.dragging = false;
  drag(evt);
}

function adjustAspectRatios() {
  makeCircular($('#background'));
  makeCircular($('#knob'));
}

function makeCircular($el) {
  var width = $el.width();
  // Android 2 browser doesn't seem to understand percentage border-radius, so we need to set it
  // via an inline style once we know the width
  $el.css({
    height: width,
    borderRadius: width/2
  });
}

function wrapForTouch(f) {
  return function(evt) {
    if (evt.originalEvent && evt.originalEvent.touches && evt.originalEvent.touches.length === 1) {
      evt.pageX = evt.originalEvent.touches[0].pageX;
      evt.pageY = evt.originalEvent.touches[0].pageY;
    }
    return f(evt);
  }
}

$(function() {
	var $background = $('#background'),
	    $knob = $('#knob'), 
      width;

	// make background and knob circular
  makeCircular($background);
  makeCircular($knob);

  dragInfo.element = $knob[0];

  $knob.bind('touchstart mousedown', wrapForTouch(dragStart));
  $(document).bind('touchmove mousemove', wrapForTouch(drag));
  $knob.bind('touchend mouseup', wrapForTouch(dragEnd));

  $background.bind('mousedown', function(evt) { return false; });
  $(window).bind('resize', adjustAspectRatios);
});



