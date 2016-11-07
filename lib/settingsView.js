var blessed = require('blessed');

module.exports = function (err, settings, screen) {
  var content = ''
  + 'Build: ' + settings.build + '\n'
  + 'Active download folder: '+settings.settings.find(el => el[0] == 'dir_active_download')[2] + '\n'
  + 'Complete download folder: '+settings.settings.find(el => el[0] == 'dir_completed_download')[2] + '\n'
  + 'Max download rate (KB/s - 0 unlimited): '+settings.settings.find(el => el[0] == 'max_dl_rate')[2] + '\n'
  + 'Max upload rate (KB/s - 0 unlimited): '+settings.settings.find(el => el[0] == 'max_ul_rate')[2] + '\n'
  + 'Max active torrents: '+settings.settings.find(el => el[0] == 'max_active_torrent')[2] + '\n'
  + 'Max active downloads: '+settings.settings.find(el => el[0] == 'max_active_downloads')[2] + '\n'
  + 'Upnp enabled: '+settings.settings.find(el => el[0] == 'upnp')[2] + '\n'
  + 'Dht enabled: '+settings.settings.find(el => el[0] == 'dht')[2] + '\n'
  ;
  var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '70%',
    height: '70%',
    content: content,
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
