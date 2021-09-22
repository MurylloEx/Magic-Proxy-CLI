# Magic-Proxy-CLI
A simple reverse proxy that runs like a webserver and support HTTP, WebSocket and VHosts.

<p align="center">
  <img src="https://badgen.net/npm/v/magic-proxy-cli"/>
  <img src="https://badgen.net/npm/dt/magic-proxy-cli"/>
  <img src="https://badgen.net/npm/license/magic-proxy-cli"/>
  <img src="https://badgen.net/npm/types/magic-proxy-cli"/>
  <img src="https://badgen.net/badge/author/MurylloEx/red?icon=label"/>
</p>

## Getting started into Magic Proxy CLI!

<p align="justify">This is a CLI version of Magic Reverse Proxy package. You can create your HTTP, HTTPS, WS and WSS tunnels for differents domains, configure your own certificate and adjust your settings to allow unknown hosts, HSTS policy, HTTPS, HTTP, SNI proxy rules and specific users to access your custom settings using credentials, like a router system.</p>

## Installation

<p align="center">
  <img src="https://nodei.co/npm/magic-proxy-cli.png?downloads=true&downloadRank=true&stars=true" alt="Installation"/>
</p>

<p align="justify">You must run the following terminal command.<p>

```
npm install -g magic-proxy-cli --save
```

## How to use?

To enable all features and access Magic Proxy panel you just need to run the command:

```
magicproxy
```

After type and run the command, the Magic Proxy will start one webserver running locally in **port 3000**. When it start at first time, you will receive a welcome message and get a special account with name **admin** and a security token in UUID format. You should save it and access the panel to create your own account in users page. The message looks like:

**NOTE:** if you have any problems with Magic Proxy credentials generation or proxy not working, you can try run it using a privileged user, specially when setting low ports like 80, 443 because they are privileged ports. See [Why are ports below 1024 privileged?](https://stackoverflow.com/questions/10182798/why-are-ports-below-1024-privileged) for more informations.

<p align="center">
  <img src="https://i.imgur.com/o1ac3kS.png" alt="Screenshot"/>
<p>

## Screenshots of webpanel

<p align="center">
  <img src="https://i.imgur.com/YiuXZdt.png" alt="Screenshot"/>
  <img src="https://i.imgur.com/lzXLHin.png" alt="Screenshot"/>
  <img src="https://i.imgur.com/b3mOPdk.png" alt="Screenshot"/>
  <img src="https://i.imgur.com/vW2mNEV.png" alt="Screenshot"/>
  <img src="https://i.imgur.com/ZCXFIu4.png" alt="Screenshot"/>
  <img src="https://i.imgur.com/xqZsgx4.png" alt="Screenshot"/>
<p>