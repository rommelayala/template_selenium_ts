# Matriz de Trazabilidad de Requerimientos (RTM)

Esta matriz vincula los Requerimientos del Negocio con los componentes de software implementados y sus casos de prueba correspondientes (Pruebas Unitarias o Integración).

| ID Req | Descripción del Requerimiento | Componente(s) Clave (Source) | Test Unitario (Lógica) | Test Integración / API | Cubierto por.. |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **...** | Descripción detallada del requerimiento (qué debe hacer el sistema). | `app/api/endpoints.py`<br>`app/core/logic.py` | `tests/core/test_logic.py` (Describe qué prueba) | `tests/api/test_endpoints.py` (Describe el endpoint probado) | 🟡/✅<br>(Unitario/Integracion) |
| **Importar CSV-01** | Verificar el estado de la DB - muestra el estado de la carga de csv por año y muestra los datos agrupados por  |  |  | N/A | 🔴 **Sin Test** |

## Leyenda de Estado
- ✅ **Cubierto**: Tiene test automatizado que pasa (Unit o Integ).
- 🟡 **Parcial**: Implementado manual, pero falta uno de los tests automatizados clave.
- 🔴 **Sin Test**: Funcionalidad crítica sin red de seguridad automatizada.
