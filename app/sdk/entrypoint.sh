#!/usr/bin/env bash
 
# docker build -r bit-build .
# docker run bit-build YOUR_BIT_TOKEN
​
set -euo pipefail
​
cd /build
​
BIT_TOKEN=${1:?"no BIT_TOKEN provided"}
​
bit config set analytics_reporting false
bit config set anonymous_reporting false
bit config set user.token ${BIT_TOKEN}
​
make reset-env
​
bit build