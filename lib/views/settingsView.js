var blessed = require('blessed');
const infoView = require('./infoView')
const errorView = require('./errorView')
const setSettings = require('../actions/setSettings')

module.exports = function (err, settings, screen, credentials, cb) {
  if (!settings || !settings.settings) return;
  var settingValuesOriginal = {}
  var settingsNames = ['dir_active_download','dir_completed_download','max_dl_rate','max_ul_rate','max_active_downloads', 'max_active_torrent', 'ul_slots_per_torrent','conns_per_torrent','conns_globally','seed_ratio','seed_time','seed_num']
  var form = blessed.form({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '80%',
    keys: true,
    tags: true,
    border: {
      type: 'line'
    },
    label : 'Settings',
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
  var submit = blessed.button({
    parent: form,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    top: '100%-7',
    left: '100%-15',
    name: 'submit',
    content: 'Update values',
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
    top: '100%-7',
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
  var inputUrls = {}
  var position = 0;
  settingsNames.forEach((settingName) => {
    var tmpValue = settings.settings.find(el => el[0] == settingName);
    if (tmpValue && tmpValue.length > 1)  {
      position += 2;
      var settingValue = tmpValue[2] || '';
      settingValuesOriginal[settingName] = settingValue;
      inputUrls[settingName] = blessed.textbox({
        parent: form,
        keys: true,
        inputOnFocus: true,
        shrink: true,
        style: {
          bg: 'black',
          fg: 'white'
        },
        top:position,
        left: '40%+1',
        width: '50%',
        height: 1,
        value: settingValue
      });
      blessed.text({
        parent: form,
        style: {
          bg: 'blue',
          fg: 'white'
        },
        top:position,
        left: '2',
        width: '40%-2',
        height: 1,
        content: settingName
      });
      inputUrls[settingName].key(['escape'], function(ch, key) {
        screen.remove(form)
        screen.render();
      });
    }
  })
  submit.on('press', function() {
    form.submit();
  });

  cancel.on('press', function() {
    form.destroy();
    screen.render();
    cb();
  });

  form.on('submit', function(data) {
    var changed = [];
    var message = '';
    Object.keys(settingValuesOriginal).forEach((settingName) => {
      if (settingValuesOriginal[settingName] != inputUrls[settingName].content) {
        changed.push({old: settingValuesOriginal[settingName], name: settingName, value: inputUrls[settingName].content})
        message += 'Changed "' + settingName + '" ('+settingValuesOriginal[settingName]+ ' => '+ inputUrls[settingName].content+')\n';
      }
    })
    changed.forEach((el) => {
      setSettings(credentials, el.name, el.value, (err, result) => {
        if (err || (result && result.error)) {
          return errorView(err || result.error, screen);
        }
      })
    })
    form.destroy();
    screen.render();
    cb();
    //infoView(message, screen)
  });

  form.key(['escape'], function(ch, key) {
    form.destroy();
    screen.render();
    cb();
  });
  screen.append(form);
  form.focus();
  if (inputUrls['dir_active_download']) (inputUrls['dir_active_download']).focus();
    else if (inputUrls['max_dl_rate']) (inputUrls['dir_active_download']).focus(); // second tentative
  screen.render();

}
