# uTorrent Console
Finally manage your [uTorrent](http://www.utorrent.com/) from console with [Node.js](https://nodejs.org).

Work in progress.. contributions welcome!

#### Currently provided features:
- List torrents __realtime__ (size, progress, speed, eta, seeds/peers, availability and so on)

#### WIP (Work in progress) features:
- Add torrent
- Delete torrent
- Torrent details and chart
- Autorefresh torrent list
- Securely store and re-use credentials

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


## License
MIT
