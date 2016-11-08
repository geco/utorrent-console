const blessed = require('blessed');
module.exports = function (screen) {
  const bottomBar = blessed.box({
    top: '100%-1',
    left: 0,
    width: '100%',
    height: 1,
    tags: true,
    style: {
      fg: 'white',
      bg: 'red'
    }
  });
  bottomBar.setContent('s: settings    p: start    f: force start    o: stop    q: quit')
  screen.append(bottomBar);
}
