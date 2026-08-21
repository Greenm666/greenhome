@echo off
chcp 65001 >nul
echo ========================================
echo   京东联盟选品助手 - 一键运行
echo ========================================
echo.

if "%1"=="" (
    set KEYWORD=低卡调味
) else (
    set KEYWORD=%1
)

if "%2"=="" (
    set COUNT=5
) else (
    set COUNT=%2
)

echo 关键词: %KEYWORD%
echo 数量: %COUNT%
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %ERRORLEVEL%==0 (
    node index.js "%KEYWORD%" %COUNT%
) else (
    "C:\Program Files\nodejs\node.exe" index.js "%KEYWORD%" %COUNT%
)

echo.
pause