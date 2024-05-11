# League game server emulator
Yet another lol server,
created with the help of the [LeagueSandbox](https://github.com/LeagueSandbox/GameServer) code,
written in JavaScript ([nodejs](https://nodejs.org/en/)).  
This project is being created as just for fun and learn and will be discontinued soon or will be developed very rarely,
anyway making it in JS is not the best idea.  
At the moment, it ~~does not support multiplayer~~ and there is no game flow yet.  

# Runing
```
# download and install git (optional) - https://git-scm.com/download
# download and install nodejs - https://nodejs.org/en/download/

git clone https://github.com/Karmel0x/LeagueEmulatorJS
cd LeagueEmulatorJS

git clone https://github.com/Karmel0x/enetcppjs

cd enetcppjs
git checkout enet-1.2.5
cd ..

git clone https://github.com/Karmel0x/navmeshcppjs

npm install
npm run dev
```
```
# download game client
# copy runLol.bat to client directory and run
# say `.help` ingame to get list of available commands
```

# Tools
### Packet inspector
```
# download replay from /issues/2 and put to ./temp/replays/
npm run pi
# open browser at http://127.0.0.1/
```
