#!/bin/bash

node ./tests/integration/mockApp/index.js &
echo $! > pid
sleep 3
npm run test:int || ( ( kill -SIGINT `cat pid` || true ) && ( rm pid || true ) && exit 1 )
( kill -SIGINT `cat pid` || true ) && rm pid