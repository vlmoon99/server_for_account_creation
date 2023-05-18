#!/bin/bash

ACCOUNT_ID="e712b1f22873d945b5193857c9d01d5a73103fda7c48daad50a93c39f1aaff30"
SERVER_URL="https://stark-everglades-95819.herokuapp.com/create-account"

curl -X POST -H "Content-Type: application/json" -d "{\"accountId\": \"$ACCOUNT_ID\"}" $SERVER_URL
