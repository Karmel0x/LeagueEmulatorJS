# League game server emulator
Yet another LoL server,
created with the help of the [LeagueSandbox](https://github.com/LeagueSandbox/GameServer) code,
written in JavaScript ([nodejs](https://nodejs.org/en/)).  
This project is being created as just for fun and learn and will be discontinued soon or will be developed very rarely,
anyway making it in JS is not the best idea.  
At the moment, it ~~does not support multiplayer~~ and there is no game flow yet.  

# Installation
```
# download and install git (optional) - https://git-scm.com/download
# download and install nodejs - https://nodejs.org/en/download/
git clone https://github.com/Karmel0x/LeagueEmulatorJS
cd LeagueEmulatorJS
cd packages
git clone https://github.com/Karmel0x/enetcppjs
git clone https://github.com/Karmel0x/navmeshcppjs
cd ..
npm install
```

# Usage
```
npm run dev
```
```
# download game client (4.20) here - https://github.com/LeagueSandbox/GameServer#manual-setup-windowsmac
# copy runGame.bat from apps to client directory and run
# say `.help` ingame to get list of available commands
```

# Tools
### [LeaguePacketInspector](https://github.com/Karmel0x/LeaguePacketInspector)
