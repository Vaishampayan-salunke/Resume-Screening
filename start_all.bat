@echo off
echo ========================================================
echo Launching TalentLens AI Career Intelligence Platform
echo Starting Backend (FastAPI ML) + Frontend (Vite React)
echo ========================================================

start "TalentLens Backend (Port 8000)" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --reload --port 8000"
timeout /t 2 >nul
start "TalentLens Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo TalentLens is launching!
echo Frontend: http://localhost:5173
echo Backend API Docs: http://localhost:8000/docs
echo.
pause
