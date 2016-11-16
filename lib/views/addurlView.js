var blessed = require('blessed')
module.exports = function (screen, flavour, submitCb) {

    var form = blessed.form({
      parent: screen,
      keys: true,
      top: 'center',
      left: 'center',
      width: '95%',
      height: '70%',
      bg: 'blue',
      border: {
        type: 'line'
      },
      label: 'Insert ' + flavour + ' (SHIFT+INS usually paste from clipboard)'
    });

    var submit = blessed.button({
      parent: form,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      top: '100%-5',
      left: '100%-10',
      name: 'submit',
      content: 'Add',
      style: {
        bg: 'black',
        focus: {
          bg: 'green'
        },
        hover: {
          bg: 'green'
        }
      }
    });

    var cancel = blessed.button({
      parent: form,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: '50',
      top: '100%-5',
      name: 'cancel',
      content: 'Cancel',
      style: {
        bg: 'black',
        focus: {
          bg: 'red'
        },
        hover: {
          bg: 'red'
        }
      }
    });
    var inputUrl = blessed.textarea({
      parent: form,
      keys: true,
      inputOnFocus: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      top: '20%',
      left: 'center',
      width: '95%',
      height: '60%',
      style: {
        bg: 'black',
        fg: 'white'
      }
    });


    submit.on('press', function() {
      form.submit();
    });

    cancel.on('press', function() {
      submitCb(null);
      screen.remove(form)
      screen.render()
    });

    form.on('submit', function(data) {
      var torrentUrl = inputUrl.content;
      if (!torrentUrl) return;
      submitCb(torrentUrl);
      screen.remove(form)
      screen.render();
    });

    inputUrl.key(['escape'], function(ch, key) {
      submitCb(null);
      screen.remove(form)
      screen.render();
    });
    form.key(['escape'], function(ch, key) {
      submitCb(null);
      screen.remove(form)
      screen.render();
    });
    screen.append(form)
    form.focus()
    inputUrl.focus()
    screen.render();
}
