#!/bin/bash
cd /home/kavia/workspace/code-generation/interactive-snake-and-ladder-platform-ad9e138e/snake_and_ladder_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

