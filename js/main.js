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
  width = $background.width();
  $background.height(width).css('border-radius', width/2);
  width = $knob.width();
  $knob.height($knob.width()).css('border-radius', width/2);

  alert("hello again");
  dragInfo.element = $knob[0];

  $background.bind('mousedown', function(evt) { return false; });
  $knob.bind('touchstart mousedown', wrapForTouch(dragStart));
  $(document).bind('touchmove mousemove', wrapForTouch(drag));
  $knob.bind('touchend mouseup', wrapForTouch(dragEnd));
});



