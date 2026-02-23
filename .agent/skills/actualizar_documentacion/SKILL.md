---
name: actualizar_documentacion
description: Mantenimiento simple de la documentación y tareas del proyecto.
path: /.agent/skills/actualizar_documentacion/SKILL.md
---

# Gestión de Documentación Simplificada

Esta skill asegura que el progreso del proyecto sea visible mediante el uso de un archivo de tareas simple.

## Registro de Tareas (`todo.md`)

Para este proyecto de template, usaremos un archivo `todo.md` en la raíz para listar lo pendiente.

### Reglas:
1. **Simplicidad:** Lista las funcionalidades que quieres automatizar.
2. **Estado:** Usa `[ ]` para pendiente y `[x]` para completado.
3. **Foco en Testing:** Cada tarea debe representar un escenario `.feature` o una mejora en el framework (ej. "Añadir soporte para Safari", "Automatizar flujo de Checkout").

## Documentación de Código
- Mantén el `Readme.md` actualizado con instrucciones de instalación y uso básicas.
- Los comentarios en el código deben explicar el "por qué" de las acciones complejas en los Page Objects.

## Trazabilidad (Opcional)
Si necesitas saber qué tests cubren qué parte del sistema, simplemente añade una nota en el `todo.md` indicando el archivo `.feature` correspondiente.
