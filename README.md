# Sample-bot
Simple example for implement discord bot by using discord.js

**[NODEJS](https://nodejs.org/en/) must be installed**

# Getting started
```javascript
$ git clone https://github.com/up2code/sample-bot.git
$ npm install
```
Find or create your discord bot token [here](https://discordapp.com/developers/applications/me)
and replace at this login parameter to your token
```javascript
botRem.login('YOUR BOT TOKEN HERE!!!');
```
Make sure you have assign your bot in to your server. You can use below URL for bot to login into your server. Replace <CLIENT ID> to your bot client id. You can found in your discord app info [here](https://discordapp.com/developers/applications/me)
```
https://discordapp.com/oauth2/authorize?&client_id=<CLIENT ID>&scope=bot&permissions=0
```
Edit code as your want. When everything is done, Let's TRY!!
```javascript
$ node myBot.js
```
