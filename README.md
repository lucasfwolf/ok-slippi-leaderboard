# Oklahoma Ranked Slippi Leaderboard

Code powering https://lucasfwolf.github.io/ok-slippi-leaderboard/#

## Technologies

- Typescript
- [Webpack@5](https://webpack.js.org/) as module bundler
- [Eslint](http://eslint.org/) for linting
- [Tailwind](https://tailwindcss.com/) for css


Fork of [reacts-pages-boilerplate](https://github.com/rtivital/react-pages-boilerplate)

## How it works

The leaderboard is built from two programs:
* [[src/](https://github.com/Grantismo/CoSlippiLeaderboard/tree/master/src)] A static react website which displays player data 
* [[cron/](https://github.com/Grantismo/CoSlippiLeaderboard/tree/master/cron)] A cron job which pulls connect codes from a google sheet, player data from slippi, and writes that data to json files in `cron/data/`, and then redeploys the static site.

## Caveats

* The undocumented slippi api this depends on may break at any time
* This project takes extra consideration to avoid slamming the slippi servers with api calls, please be considerate of this.
* Logic for determining ranks may become out of sync with the official slippi rank logic
* I would appreciate if you keep my 'by me a coffee' link and give me credit for building this in your leaderboard.

## Getting started

- Easiest to get working on a unix system (linux/mac). On windows you can use WSL to install ubuntu. https://learn.microsoft.com/en-us/windows/wsl/install
- Clone this repository: `git clone https://github.com/Grantismo/CoSlippiLeaderboard.git` 
- (Optional) Install NVM -- instructions [here](https://github.com/creationix/nvm)
- (Optional) Run `nvm use 18.12.0`. This will ensure that you are running the supported version of Node.js.
- Install yarn `npm install --global yarn`
- Install dependencies: `yarn` (from your code directory).
- (Optional) Install the github cli tool -- instructions here https://github.com/cli/cli#installation
- (Optional) Run `gh auth login`
- Set your repoPath in settings.js and  "homepage" in package.json to your github pages url (e.g. https://grantismo.github.io/CoSlippiLeaderboard/)

### If you want to collect connect codes from a google form
- Create a google form to collect player tags from your region. ![image](https://user-images.githubusercontent.com/911232/207989907-256100e3-c215-4699-9ae7-655d5345cbd4.png)
- Link your google form to a google sheet ![image](https://user-images.githubusercontent.com/911232/207990065-aadc0a30-2561-46b7-a46e-0742af601cec.png)
- Follow directions in https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account to create a service account and credentials to read from the google sheet. Save your creds json file to `secrets/creds.json`
- Change `spreadsheetID` in settings.js to your google sheet ID

### If you want to manually populate your list of connect codes:
- Modify `getPlayerConnectCodes` to supply the list directly (see https://github.com/costasford/NorcalSlippiLeaderboard/blob/master/cron/fetchStats.ts#L11-L13)
- Delete `import { GoogleSpreadsheet } from 'google-spreadsheet';` and `import creds from '../secrets/creds.json';` from `cron/fetchStats.ts`

- Edit your crontab to run the cron job every 30 minutes. On linux `crontab -e`

### Test your cronjob
- Create dummy initial data `echo '[]' >> cron/data/players-new.json`
- Run the job `./cron/run.sh`
- A successful job should look like this: 

![image](https://user-images.githubusercontent.com/911232/209762179-e3da2be2-48d4-4c2a-a40c-c5fb3f78a8e9.png)

### Test the web app
- Run `npm start` and open http://localhost:8262/ in your browse.

### Final steps
- Commit any remaining changes 
- `git add .`
- `git commit -m "Describe your commit here"`
- Edit your crontab to run the cronjob on a reoccuring basis (every hour for example)
Example crontab:
```
# m h  dom mon dow   command
0 * * * * /bin/bash /full/path/to/your/code/CoSlippiLeaderboard/cron/run.sh
```
- You can look in cron/logs/log.txt to see the output of the latest cron run.
- That's it!
- DM me on discord if you run into problems. blorppppp#2398

## Settings

[settings.js](./settings.js) file includes all important settings that should be used to setup deployments to gh-pages:

- **title** – Base application title
- **cname** – Adds CNAME file that allows to use custom domain names with gh-pages
- **repoPath** – username.github.io/repoPath for react router to recognize gh-pages paths
- **spreadsheetID** - ID for google sheet containing player connect codes. `https://docs.google.com/spreadsheets/d/[YOUR ID]`

## scripts

- `npm start` – starts development server with webpack-dev-server
- `npm run build` – builds project to production
- `npm run deploy` – builds and deploys project to Github pages
- `./cron/run.sh` - manually runs the cron job

## Support me
☕ [buy me a coffee](https://www.buymeacoffee.com/blorppppp)
