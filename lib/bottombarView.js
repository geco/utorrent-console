const blessed = require('blessed');
module.exports = function (screen, align, position, content) {
  const bottomBar = blessed.box({
    top: position,
    left: 0,
    align: align,
    width: '100%',
    height: 1,
    tags: true,
    style: {
      fg: 'white',
      bg: 'red'
    }
  });
  bottomBar.setContent(content)
  screen.append(bottomBar);
}
