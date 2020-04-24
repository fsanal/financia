#!/bin/bash
trap 'kill $BGPID; exit' INT
cd back-server
python3 server.py &
BGPID=$!
cd ../front-server
npm start
