# Branch SiphoningStrike
Lol version 1.0.0.126  
- Only necessary packets to load game and move character has been updated to this version, most of them are still 4.20  
- Probably packet id sequence should be used instead of static ids

# Runing
```
# download and install git (optional) - https://git-scm.com/download
# download and install nodejs - https://nodejs.org/en/download/
git clone https://github.com/Karmel0x/enetcppjs
cd enetcppjs
git checkout 9d1eb919f299a317112fa3bba42ef4e2546b7702
cd ..
git clone https://github.com/Karmel0x/navmeshcppjs
git clone https://github.com/Karmel0x/LeagueEmulatorJS
cd LeagueEmulatorJS
git checkout SiphoningStrike
npm i three ws
node main
```
