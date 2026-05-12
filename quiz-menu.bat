@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

:MENU
cls
echo.
echo ============================================================
echo   QUIZ TDAH v1  ^|  Como sua atencao funciona?
echo ============================================================
echo.
echo   [1]  Iniciar servidor de desenvolvimento
echo   [2]  Build de producao
echo   [3]  Preview do build de producao
echo   [4]  Validar 6 arquetipos  (score-archetype-paths)
echo   [5]  Extrair conteudo do quiz  (extract-quiz-content)
echo   [6]  Auditoria de acessibilidade axe-core  (requer servidor)
echo   [7]  Instalar dependencias do quiz  (npm install)
echo   [0]  Sair
echo.
echo ============================================================
set /p CHOICE="   Escolha uma opcao: "

if "%CHOICE%"=="1" goto DEV
if "%CHOICE%"=="2" goto BUILD
if "%CHOICE%"=="3" goto PREVIEW
if "%CHOICE%"=="4" goto VALIDATE_ARC
if "%CHOICE%"=="5" goto EXTRACT
if "%CHOICE%"=="6" goto A11Y
if "%CHOICE%"=="7" goto INSTALL
if "%CHOICE%"=="0" goto EXIT

echo.
echo   Opcao invalida. Tente novamente.
timeout /t 2 >nul
goto MENU

:DEV
cls
echo.
echo   Iniciando servidor de desenvolvimento...
echo   URL: http://localhost:5173
echo   Pressione Ctrl+C para encerrar.
echo.
cd /d "%~dp0quiz"
call npx vite --port 5173
cd /d "%~dp0"
echo.
pause
goto MENU

:BUILD
cls
echo.
echo   Gerando build de producao em quiz/dist/ ...
echo.
cd /d "%~dp0quiz"
call npx vite build
cd /d "%~dp0"
echo.
pause
goto MENU

:PREVIEW
cls
echo.
echo   Servindo build de producao...
echo   URL: http://localhost:4173
echo   Pressione Ctrl+C para encerrar.
echo.
cd /d "%~dp0quiz"
call npx vite preview --port 4173
cd /d "%~dp0"
echo.
pause
goto MENU

:VALIDATE_ARC
cls
echo.
echo   Validando 6 arquetipos (similarity esperada: 10/10 cada)...
echo.
cd /d "%~dp0"
call node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
echo.
pause
goto MENU

:EXTRACT
cls
echo.
echo   Extraindo conteudo do quiz (analise estatica)...
echo.
cd /d "%~dp0"
call node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
echo.
pause
goto MENU

:A11Y
cls
echo.
echo   Auditoria de acessibilidade axe-core
echo   -----------------------------------------------
echo   ATENCAO: o servidor deve estar rodando antes.
echo   Use a opcao [1] em outro terminal se necessario.
echo.
set /p QUIZ_PORT="   Porta do servidor (default 5173): "
if "!QUIZ_PORT!"=="" set QUIZ_PORT=5173
echo.
echo   Auditando http://localhost:!QUIZ_PORT! ...
echo.
cd /d "%~dp0"
set QUIZ_URL=http://localhost:!QUIZ_PORT!
call node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
echo.
pause
goto MENU

:INSTALL
cls
echo.
echo   Instalando dependencias do quiz...
echo.
cd /d "%~dp0quiz"
call npm install
cd /d "%~dp0"
echo.
echo   Dependencias da raiz (Playwright + axe-core)...
call npm install
echo.
pause
goto MENU

:EXIT
cls
echo.
echo   Ate logo!
echo.
endlocal
exit /b 0
