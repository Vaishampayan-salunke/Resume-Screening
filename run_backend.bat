@echo off
echo ========================================================
echo Starting TalentLens FastAPI ML Backend Server on Port 8000
echo ========================================================
cd /d "%~dp0backend"
python -m uvicorn main:app --reload --port 8000
pause
