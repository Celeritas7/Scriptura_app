@echo off
title Scriptura local server
REM Double-click to run Scriptura locally. Leave this window open while testing.
REM Put this file in the Scriptura_app folder, next to index.html.
cd /d "%~dp0"

if not exist "index.html" (
  echo Could not find index.html
  echo Put this .bat in the Scriptura_app folder, next to index.html.
  echo Current folder: %CD%
  pause
  goto :eof
)

REM --- Find a Python: PATH / py launcher first, then common install locations ---
set "PY="
for %%P in (
  "python.exe"
  "py.exe"
  "%USERPROFILE%\anaconda3\python.exe"
  "%USERPROFILE%\miniconda3\python.exe"
  "%USERPROFILE%\AppData\Local\anaconda3\python.exe"
  "%USERPROFILE%\AppData\Local\miniconda3\python.exe"
  "%LOCALAPPDATA%\Programs\Python\Python313\python.exe"
  "%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
  "%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
  "C:\ProgramData\anaconda3\python.exe"
  "C:\ProgramData\miniconda3\python.exe"
) do (
  if not defined PY (
    "%%~P" -c "import sys" >nul 2>nul && set "PY=%%~P"
  )
)
if not defined PY (
  echo.
  echo Could not find Python. Install it from python.org ^(tick "Add to PATH"^),
  echo or open "Anaconda Prompt", cd to this folder, and run:
  echo     python -m http.server 5144
  echo then open http://localhost:5144/index.html
  echo.
  pause
  goto :eof
)

REM --- Tiny server: no caching (edits show on refresh), free port, opens browser once ready ---
set "SRV=%TEMP%\scriptura_serve.py"
> "%SRV%"  echo import http.server, functools, sys, webbrowser
>> "%SRV%" echo class H(http.server.SimpleHTTPRequestHandler):
>> "%SRV%" echo     def end_headers(self):
>> "%SRV%" echo         self.send_header('Cache-Control', 'no-store')
>> "%SRV%" echo         super().end_headers()
>> "%SRV%" echo     def log_message(self, *a): pass
>> "%SRV%" echo H.extensions_map.update({'.js': 'text/javascript', '.jsx': 'text/javascript', '.css': 'text/css'})
>> "%SRV%" echo root = sys.argv[1]
>> "%SRV%" echo srv = None
>> "%SRV%" echo for port in range(5144, 5160):
>> "%SRV%" echo     try:
>> "%SRV%" echo         srv = http.server.ThreadingHTTPServer(('127.0.0.1', port), functools.partial(H, directory=root))
>> "%SRV%" echo         break
>> "%SRV%" echo     except OSError:
>> "%SRV%" echo         pass
>> "%SRV%" echo if srv is None:
>> "%SRV%" echo     sys.exit('No free port between 5144 and 5159.')
>> "%SRV%" echo url = 'http://localhost:%%d/' %% port
>> "%SRV%" echo print('  Open:    ' + url)
>> "%SRV%" echo print('  (Close this window to stop.)')
>> "%SRV%" echo print()
>> "%SRV%" echo webbrowser.open(url)
>> "%SRV%" echo try:
>> "%SRV%" echo     srv.serve_forever()
>> "%SRV%" echo except KeyboardInterrupt:
>> "%SRV%" echo     pass

echo.
echo   Scriptura - local server
echo   Python:  %PY%
echo   Folder:  %CD%
"%PY%" "%SRV%" "%CD%"

echo.
echo Server stopped.
pause
