#!/bin/bash
pip3.7 install -r requirements.txt
python3 install.py
cd front-server
npm install
cd ../cors-anywhere
npm install
