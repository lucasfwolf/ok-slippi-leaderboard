import { getPlayerDataThrottled } from './slippi'
import * as syncFs from 'fs';
import * as path from 'path';
import util from 'util';
import * as settings from '../settings'

import { exec } from 'child_process';
const fs = syncFs.promises;
const execPromise = util.promisify(exec);

const getPlayerConnectCodes = async (): Promise<string[]> => { 
	return ['KNEE#994','DONG#457', 'BRUH#128', 'SHIT#636', 'JCLOUD#0', 
  'GOKU#958', 'SLED#237' , 'CATS#733', 'RUFI#0', 'CU#502'
 , 'OHKO#209', 'HIMB#0', 'ISLE#254', 'BAPS#637' , 'JETT#328'
, 'RATT#138' , 'UBE#0', 'COOL#232' , 'EKO#736', 'AMY#404', 'JJM#586', 
'NUFF#931', 'ZOO#409', 'FARM#158', 'ANXY#837', 'HI#128', 'BEN#3000', 'KAPT#967'
, 'TIA#112', 'VINC#595', 'SOCK#573', 'TSM#116', 'JENN#329', 'SPAR#454',
'JPRO#349', 'PKLE#166', 'RADI#0', 'SAM#711', 'STEW#742', 'DRAG#674'] 
};

const getPlayers = async () => {
  const codes = await getPlayerConnectCodes()
  console.log(`Found ${codes.length} player codes`)
  const allData = codes.map(code => getPlayerDataThrottled(code))
  const results = await Promise.all(allData.map(p => p.catch(e => e)));
  const validResults = results.filter(result => !(result instanceof Error));
  const unsortedPlayers = validResults
    .filter((data: any) => data?.data?.getConnectCode?.user)
    .map((data: any) => data.data.getConnectCode.user);
  return unsortedPlayers.sort((p1, p2) =>
    p2.rankedNetplayProfile.ratingOrdinal - p1.rankedNetplayProfile.ratingOrdinal)
}

async function main() {
  console.log('Starting player fetch.');
  const players = await getPlayers();
  if(!players.length) {
    console.log('Error fetching player data. Terminating.')
    return
  }
  console.log('Player fetch complete.');
  // rename original to players-old
  const newFile = path.join(__dirname, 'data/players-new.json')
  const oldFile = path.join(__dirname, 'data/players-old.json')
  const timestamp = path.join(__dirname, 'data/timestamp.json')

  await fs.rename(newFile, oldFile)
  console.log('Renamed existing data file.');
  await fs.writeFile(newFile, JSON.stringify(players));
  await fs.writeFile(timestamp, JSON.stringify({updated: Date.now()}));
  console.log('Wrote new data file and timestamp.');
  const rootDir = path.normalize(path.join(__dirname, '..'))
  console.log(rootDir)
  // if no current git changes
  const { stdout, stderr } = await execPromise(`git -C ${rootDir} status --porcelain`);
  if(stdout || stderr) {
    console.log('Pending git changes... aborting deploy');
    return
  }
  console.log('Deploying.');
  const { stdout: stdout2, stderr: stderr2 } = await execPromise(`npm run --prefix ${rootDir} deploy`);
  console.log(stdout2);
  if(stderr2) {
    console.error(stderr2);
  }
  console.log('Deploy complete.');
}

main();
