@echo off
echo Initializing Git repository...
git init
git add .
git commit -m "Initial commit of Mobile Cart Bot with RAG and Amazon integration"
git branch -M main
git remote add origin https://github.com/Gowthamkumar598/mobile-bot.git
echo Pushing to GitHub...
git push -u origin main
pause
