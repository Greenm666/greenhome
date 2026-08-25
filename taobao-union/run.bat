@echo off
chcp 65001 >nul
echo ================================================
echo   淘宝联盟选品助手 (open.taobao.com)
echo ================================================
echo.

set KEYWORD=%~1
if "%KEYWORD%"=="" set KEYWORD=低卡调味

set COUNT=%~2
if "%COUNT%"=="" set COUNT=5

echo   关键词: %KEYWORD%
echo   数量: %COUNT%
echo.

node "%~dp0index.js" "%KEYWORD%" %COUNT%

echo.
pause