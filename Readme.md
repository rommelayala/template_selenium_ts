# Template Automation Testing - Selenium WebDriver + Cucumber + TypeScript

Este proyecto es una plantilla (template) profesional para la automatización de pruebas E2E utilizando **Selenium WebDriver**, **Cucumber** y **TypeScript**.

## 🚀 Características
- **BDD con Cucumber**: Pruebas escritas en lenguaje natural (Gherkin).
- **TypeScript**: Tipado estático para un código más robusto y mantenible.
- **Page Object Model (POM)**: Arquitectura organizada para facilitar la reutilización de código.
- **Reportes HTML**: Generación automática de reportes en la carpeta `docs/`.
- **CI/CD con GitHub Actions**: Ejecución automática de pruebas y despliegue de reportes en GitHub Pages.

## 🛠️ Requisitos
- Node.js (v18 o superior)
- Navegador Google Chrome instalado

## 📦 Instalación
```bash
npm install
```

## 📋 Comandos de Ejecución
- **Ejecutar todos los tests:**
  ```bash
  npm run test:e2e
  ```
- **Ejecutar en modo Headless (para CI):**
  ```bash
  npm run test:e2e:headless
  ```

## 📁 Estructura del Proyecto
- `src/features/`: Archivos `.feature` (Gherkin).
- `src/steps/`: Definiciones de pasos (Step Definitions).
- `src/pages/`: Page Objects (Lógica de interacción con la web).
- `src/hooks/`: Setup y teardown del navegador.
- `.agent/`: Skills y configuración de inteligencia para el asistente.
- `docs/`: Reportes HTML generados (listos para GitHub Pages).
- `.github/workflows/`: Configuración de automatización para GitHub.

## 🤖 Integración Continua (CI/CD)
El proyecto incluye un workflow de GitHub Actions que:
1. Ejecuta los tests en cada `push` o `pull_request`.
2. Publica los reportes automáticamente en la rama de **GitHub Pages**.

---
*Mantenido con ❤️ por Rommel & Cielo* ✨

