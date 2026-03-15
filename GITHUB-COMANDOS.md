# Subir D'Miguel Barber Shop a GitHub

## 1. Crear el repositorio en GitHub

1. Entra en **https://github.com** e inicia sesión.
2. Clic en **"+"** (arriba derecha) → **"New repository"**.
3. **Repository name:** `dmiguel-barber-shop` (o el nombre que quieras).
4. Descripción opcional: *Sitio web D'Miguel Barber Shop - Washington Heights NYC*.
5. Elige **Public**.
6. **No** marques "Add a README" (el proyecto ya tiene archivos).
7. Clic en **"Create repository"**.

---

## 2. Comandos en la terminal (en la carpeta del proyecto)

Abre **PowerShell** o **CMD**, ve a la carpeta del proyecto y ejecuta:

```bash
cd "C:\Users\Amin\OneDrive\Desktop\D'Miguel Barber Shop"

git init
git add .
git commit -m "Primera subida: sitio web D'Miguel Barber Shop"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/dmiguel-barber-shop.git
git push -u origin main
```

**Importante:** Sustituye `TU-USUARIO` por tu usuario de GitHub y `dmiguel-barber-shop` por el nombre exacto del repositorio que creaste.

---

## Ejemplo si tu usuario es "amin2025" y el repo "dmiguel-barber-shop"

```bash
cd "C:\Users\Amin\OneDrive\Desktop\D'Miguel Barber Shop"
git init
git add .
git commit -m "Primera subida: sitio web D'Miguel Barber Shop"
git branch -M main
git remote add origin https://github.com/amin2025/dmiguel-barber-shop.git
git push -u origin main
```

Si GitHub te pide usuario y contraseña, usa tu **usuario** y un **Personal Access Token** (no la contraseña normal). Crear token: GitHub → Settings → Developer settings → Personal access tokens.

---

## Actualizar el sitio después de cambios

```bash
git add .
git commit -m "Descripción del cambio"
git push
```
