var blessed = require('blessed');

module.exports = function (err, settings, screen) {
  var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '70%',
    height: '70%',
    content: JSON.stringify(settings),
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'blue',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });

  // Append our box to the screen.
  box.on('click', function() {
    box.destroy();
    screen.render();
  });
  box.key(['escape'], function(ch, key) {
    box.destroy();
    screen.render();
  });
  screen.append(box);
  box.focus();
  screen.render();

}
