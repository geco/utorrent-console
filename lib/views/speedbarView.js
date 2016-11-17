const blessed = require('blessed');
module.exports = function (screen) {
  const speedBar = blessed.box({
    top: '0',
    left: '0',
    width: '50%',
    height: 1,
    align: 'left  ',
    tags: true,
    style: {
      fg: 'white',
      bg: 'blue'
    }
  });
  screen.append(speedBar);
  return speedBar;
}
