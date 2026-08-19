@echo off
chcp 65001 >nul 2>&1
title Food Nutrition Search - Local Server

cd /d "%~dp0"

echo.
echo ========================================
echo   Food Nutrition Search - Local Server
echo ========================================
echo.
echo   Dir: %cd%
echo   Press Ctrl+C to stop
echo.
echo ----------------------------------------
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "start.ps1"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Server failed. Exit code: %ERRORLEVEL%
    echo.
    pause
)