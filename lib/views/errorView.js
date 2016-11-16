var blessed = require('blessed');

module.exports = function (err, screen, terminate) {
  var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    align: 'center',
    valign: 'middle',
    content: err.message || require('util').inspect(err),
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'red',
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
    if (terminate) return process.exit(0);
    box.destroy();
    screen.render();

  });
  box.key(['escape'], function(ch, key) {
    if (terminate) return process.exit(0);
    box.destroy();
    screen.render();
  });
  screen.append(box);
  box.focus();
  screen.render();

}
