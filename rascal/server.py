def interpret_joystick_command(x, y):
  """Accepts a joystick position (x, y) where x and y represent a point within the unit circle.
     Returns a tuple (left, right) of the corresponding motor speeds for a left and right motor in
     a differential drive setup. For convenient use with the MDC2200, left and right are integers 
     in the range -1000..1000"""

  from math import atan2, sin, cos, pi, sqrt
  angle = atan2(y, x) - pi/4

  # interpret the distance from the
  speed = sqrt(x*x + y*y)
  if speed > 1.0:
    raise ValueError("Joystick input outside the unit circle")
  
  left = sin(angle)
  right = cos(angle)
  # scale the motor speeds so that, if the joystick is pushed to its maximum distance from the
  # center, the faster motor is at max speed regardless of the angle
  scale = 1000 * speed / max(abs(left), abs(right))
  return (int(scale * left + 0.5), int(scale * right + 0.5))
