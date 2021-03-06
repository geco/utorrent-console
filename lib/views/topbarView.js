const blessed = require('blessed');
module.exports = function (screen) {
  const topBar = blessed.box({
    top: '0',
    left: '50%',
    width: '50%',
    height: 1,
    align: 'right',
    tags: true,
    style: {
      fg: 'white',
      bg: 'blue'
    }
  });
  screen.append(topBar);
  return topBar;
}
