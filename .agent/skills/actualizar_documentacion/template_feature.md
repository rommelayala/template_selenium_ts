# [Emoji] [Nombre del Escenario/Feature]

## 📝 Descripción
Descripción detallada de la funcionalidad que se está automatizando. Qué valor aporta al negocio y qué flujo cubre.

## 📦 Estructura de Automatización
```
src/
├── features/
│   └── [feature_name].feature    # Escenarios en Gherkin
├── steps/
│   └── [step_name].ts            # Definiciones de pasos
├── pages/
│   └── [page_name].ts            # Page Objects (POM)
├── hooks/
│   └── hooks.ts                   # Setup/Teardown
├── support/
│   └── world.ts                  # Contexto global
├── .agent/
│   └── skills/                   # Inteligencia del asistente
└── docs/
    └── report-[timestamp].html   # Reporte generado
```

## ⚙️ Configuración y Locators
- **Página principal**: [URL]
- **Elementos clave**:
    - `input_user`: `#login-username`
    - `btn_submit`: `//button[@type='submit']`

## 🔄 Flujo del Test (Gherkin)
1. **Dado** que el usuario está en la página de inicio.
2. **Cuando** ingresa credenciales válidas.
3. **Entonces** debería ver el dashboard principal.

## 🧪 Estado de Ejecución
- **Entorno local**: ✅ Pasado (`docs/index.html`)
- **GitHub Actions**: ✅ Pasado
- **Reporte Online**: [Cielo Testing Portal](https://rommelayala.github.io/template_selenium_ts/)
