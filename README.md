# uTorrent Console
Finally manage your __<a href="http://www.utorrent.com/" title="uTorrent" target="_blank">uTorrent</a>__ from console thanks to __<a href="https://nodejs.org" title="Node.js" target="_blank">Node.js</a>__.

#### Features:
- Monitor torrents __realtime__ (size, progress, speed, eta, seeds/peers, availability and so on)
- View uTorrent settings

##### Coming soon:
- Add torrent/magnet
- Delete torrent
- Torrent details and chart
- Save (encrypted) credentials
- (__new__) Edit uTorrent settings

## Installation
If you are using nvm:
```sh
$ npm install -g utorrent-console
```
Otherwise:
```sh
$ sudo npm install -g utorrent-console
```

## Run
```sh
$ utconsole
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
