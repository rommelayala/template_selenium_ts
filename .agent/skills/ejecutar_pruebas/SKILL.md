---
name: ejecutar_pruebas
description: Ejecución de la suite de pruebas E2E con Selenium, Cucumber y TypeScript.
path: /.agent/skills/ejecutar_pruebas/SKILL.md
---

# Instrucciones para ejecutar pruebas E2E

Esta habilidad describe cómo ejecutar las pruebas automatizadas utilizando Selenium WebDriver y Cucumber.

## Comandos Disponibles

### 1. Ejecutar todos los tests E2E
Este comando lanza todos los escenarios definidos en los archivos `.feature`.
```bash
npm run test:e2e
```

### 2. Ejecutar tests en modo Headless (Sin interfaz)
Ideal para entornos de CI/CD.
```bash
npm run test:e2e:headless
```

### 3. Ejecutar un feature específico
Cucumber permite filtrar por la ruta del archivo.
```bash
npx cucumber-js src/features/nombre_del_feature.feature
```

## Estructura de Tests

### 1. Ubicación de Archivos
- **Features:** `src/features/` (Archivos Gherkin `.feature`).
- **Steps:** `src/steps/` (Definición de pasos en TypeScript).
- **Pages:** `src/pages/` (Page Object Model).
- **Hooks:** `src/hooks/` (Setup y Teardown del driver).

### 2. Creación de un nuevo Test
1.  Define el escenario en un archivo `.feature` dentro de `src/features/`.
2.  Implementa los pasos en un archivo `.ts` dentro de `src/steps/` (puedes reusar pasos existentes).
3.  Crea o actualiza el Page Object en `src/pages/` para interactuar con los elementos de la web.

## Reportes
Los resultados se generan automáticamente en la carpeta `docs/`.
- El archivo tendrá un nombre con timestamp: `docs/report-YYYY-MM-DD_HH-MM-SS.html`.

## Notas Adicionales
- Asegúrate de tener los drivers actualizados (chromedriver se gestiona vía `package.json`).
- Si fallan los tests por timeout, revisa la configuración en `src/support/world.ts` o los waits en `BasePage.ts`.
