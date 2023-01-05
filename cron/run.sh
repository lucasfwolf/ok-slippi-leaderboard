#!/bin/bash -l
PATH="/home/lucasfwolf/.vscode-server/bin/e8a3071ea4344d9d48ef8a4df2c097372b0c5161/bin/remote-cli:/home/lucasfwolf/.nvm/versions/node/v18.12.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program"
DIR_PATH=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$DIR_PATH/.." 
"/home/lucasfwolf/.nvm/versions/node/v18.12.0/bin/node" --loader ts-node/esm --no-warnings cron/fetchStats.ts 2>&1 | tee cron/logs/log.txt
