module.exports = function (message, screen) {
  var blessed = require('blessed');
  var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    align: 'center',
    valign: 'middle',
    content: message,
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
    }
  });

  const close = () => {
    box.destroy();
    screen.render();
  }
  // Append our box to the screen.
  box.on('click', close);
  box.key(['escape'], close);
  screen.append(box);
  box.focus();
  screen.render();
  setTimeout(close, 4000); // autoclose after 3 seconds

}
