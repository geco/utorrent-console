# uTorrent Console
Finally manage your __<a href="http://www.utorrent.com/" title="uTorrent" target="_blank">uTorrent</a>__ from __console__ thanks to __<a href="https://nodejs.org" title="Node.js" target="_blank">Node.js</a>__.
<br>Why? Because uTorrent is the best torrent server in the world and thanks to this package it can be managed from the Linux Console.

![utorrent-console](https://raw.githubusercontent.com/utorrent-console/master/img/screenshot.jpg)



#### Features:
- Monitor torrents realtime (size, progress, speed, eta, seeds/peers, availability and so on)
- Torrent trasfer rate chart (download and upload)
- Add Torrent from URL
- Add Magnet Link
- Delete torrent (and data)
- View uTorrent settings
- Start (force) torrent
- Stop torrent

##### Coming soon:
- Torrent contents file list
- Save and re-use credentials (encrypted)
- Edit uTorrent settings

## Installation
If you already have installed uTorrent server you can jump to step "Install utorrent-console".<br>

- Download right package from <a href="http://www.utorrent.com/intl/en/downloads/linux" title="uTorrent downloads page" target="_blank">uTorrent downloads page</a>.
- Decompress the archive in a folder of your choice:
```sh
$ tar zxvf utserver.tar.gz
```
Launch uTorrent server in background:
```sh
$ cd your-folder
$ ./utserver &
```
- __Install utorrent-console__
  - If you are using nvm (Node Version Manager):
  ```sh
  $ npm install -g utorrent-console
  ```
  - Otherwise:
  ```sh
  $ sudo npm install -g utorrent-console
  ```
- Run utorrent-console:
```sh
$ utconsole
```
- Enjoy!

## Update (to latest version)
- If you are using nvm:
```sh
$ npm update -g utorrent-console
```
- Otherwise:
```sh
$ sudo npm update -g utorrent-console
```
### FAQ
1. Why doesn't the Linux console render __lines__ correctly on __Ubuntu__?
  - You need to install the `ncurses-base` package and the `ncurses-term` package
2. Why doesn't the Linux console render __lines__ correctly through __Putty__?
  - After loggin in, you need to set the environment variable TERM to "linux":
  ```sh
  $ export TERM="linux"
  ```
  - Otherwise, to automate it, in the Putty config options, under Connection->Data there is a setting called "Terminal-type string". You can set your TERM there to "linux" and putty instructs SSH to set that environment variable
3. How can I paste from clipboard?
  - If your favorite keyboard/mouse shortcut doesn't work, try SHIFT+INS

## Contribute (developers)
```sh
$ git clone https://github.com/geco/utorrent-console.git
$ npm install
$ npm start
```
#### Example API outputs:
- <a href="https://github.com/geco/utorrent-console/blob/master/outputs/getSettings.json" target="_blank">Get uTorrent settings</a>


## About
This package uses the __<a href="https://github.com/geco/library-utorrent" title="uTorrent library" target="_blank">uTorrent Node.js Library</a>__, based on the __<a href="http://help.utorrent.com/customer/portal/topics/664593/articles" title="uTorrent Web API" target="_blank">uTorrent Web API</a>__.


## License
MIT &copy; 2016
