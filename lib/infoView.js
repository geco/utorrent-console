var blessed = require('blessed');

module.exports = function (message, screen) {
  var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '90%',
    height: '90%',
    align: 'left',
    content: message,
    tags: true,
    scrollable: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'green',
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
