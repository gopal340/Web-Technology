@echo off
REM Auto Git Sync Script for WT CEER Project
REM This script automatically commits and pushes changes to GitHub

echo ========================================
echo   WT CEER - Auto Git Sync
echo ========================================
echo.

REM Add all changes
echo [1/3] Adding all changes...
git add .

REM Commit with timestamp
echo [2/3] Committing changes...
set timestamp=%date% %time%
git commit -m "Auto-sync: %timestamp%"

REM Push to GitHub
echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo   Sync Complete!
echo ========================================
echo.
pause
