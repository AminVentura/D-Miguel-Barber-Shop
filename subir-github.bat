@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Inicializando repositorio...
git init
if errorlevel 1 goto error

echo Agregando archivos...
git add .
if errorlevel 1 goto error

echo Creando commit...
git commit -m "Primera subida: sitio web D'Miguel Barber Shop"
if errorlevel 1 goto error

echo Configurando rama main...
git branch -M main
if errorlevel 1 goto error

echo Conectando con GitHub...
git remote add origin https://github.com/AminVentura/dmiguel-barber-shop.git
if errorlevel 1 (
    echo El remote ya existe. Si quieres cambiarlo: git remote set-url origin https://github.com/AminVentura/dmiguel-barber-shop.git
)

echo Subiendo a GitHub...
git push -u origin main
if errorlevel 1 goto error

echo.
echo Listo. Tu sitio esta en: https://github.com/AminVentura/dmiguel-barber-shop
goto end

:error
echo.
echo Hubo un error. Revisa que Git este instalado y que el repo exista en GitHub.
pause
exit /b 1

:end
pause
