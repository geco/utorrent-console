var blessed = require('blessed')
module.exports = function (screen, label, submitCb) {

    var form = blessed.form({
      parent: screen,
      keys: true,
      top: 'center',
      left: 'center',
      width: '80%',
      height: '30%',
      bg: 'red',
      border: {
        type: 'line'
      },
      label: label
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
      left: '100%-20',
      name: 'submit',
      content: 'Confirm',
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
          bg: 'green'
        },
        hover: {
          bg: 'green'
        }
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
      submitCb(true);
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
    screen.render();
}
