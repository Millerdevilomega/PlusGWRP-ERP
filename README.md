# PlusG WMS-ERP Enterprise · Landing Page de Alto Rendimiento

Landing page interactiva de grado industrial para presentar **PlusG WMS-ERP Enterprise v1.0**.
Construida con los más altos estándares modernos de diseño SaaS (Dark Industrial, Bento Grid 2.0, Glassmorphism, Micro-interacciones y Telemetría en tiempo real) sin frameworks pesados ni dependencias externas: corre 100% nativa en cualquier navegador moderno.

---

## 🚀 Arquitectura y Componentes Implementados

1. **Header Sticky con Glassmorphism & Telemetría:**
   - Marca PlusG con badge de pulso en vivo (`● V1.0 ENTERPRISE`).
   - Navegación rápida, botón de acceso directo a la calculadora ROI y CTA modal "Agendar Demo".
   - Menú responsive fluido para dispositivos móviles.

2. **Hero Mission Control Center (Doble Consola Interactiva):**
   - **Consola Web Central (Desktop):** 4 pestañas interactivas en tiempo real:
     - `01 Andén en Vivo:` Monitoreo de andenes activos, progreso de recepción y escaneo de tarimas.
     - `02 Conciliación 3-Way Match:` Cruce visual entre Orden de Compra, CFDI 4.0 del SAT y Conteo Físico en andén.
     - `03 Racks 3D & FEFO:` Mapa topográfico de bahías con semáforo FEFO y bloqueo automático de cuarentenas.
     - `04 Despacho & POD:` Monitoreo de flota, custodia de carga y prueba de entrega digital.
   - **Terminal Ruda / Colectora Móvil (Handheld):**
     - Simulación de pistola industrial de uso rudo con animación de escáner láser, lectura de código de barras GS1/LPN y confirmación táctil de picking.

3. **Ticker de Telemetría Comprobada:**
   - Contadores numéricos animados con `IntersectionObserver`:
     - `+140,000` Tarimas y pallets auditados.
     - `$0.00` Mermas fiscales no detectadas.
     - `100%` Operación continua en Modo Búnker (Offline).
     - `99.98%` Exactitud de Inventario (ERI).

4. **Radiografía del Dolor (Diagnóstico Operativo & Financiero):**
   - 3 tarjetas con comparativa dinámica *"Sin PlusG vs Con PlusG"*:
     - *Descuadre ciego de inventario* (Kardex inmutable).
     - *Pagos a ciegas a proveedores* (Bloqueo 3-Way Match).
     - *Andén paralizado por caída de red* (Modo Búnker Offline).

5. **Bento Grid de Grado Industrial:**
   - **Simulador Interactivo 3-Way Match:** Botones para probar el caso de *"Conciliación Perfecta ($0.00)"* vs *"Faltante en Andén (-$18,400.00)"* demostrando el bloqueo automático de pago a tesorería.
   - **Simulador de Modo Búnker Offline:** Interruptor interactivo para apagar la red; observa cómo la terminal pasa a almacenamiento SQLite local y sincroniza al reconectar sin perder datos.
   - **Algoritmo FEFO & Cuarentena:** Bloques de rotación por fecha de caducidad.
   - **Doble Credencial Forense:** Validación criptográfica de 2 factores para cualquier ajuste.
   - **Picking Anti-Aplastamiento:** Organización inteligente de tarimas por peso y fragilidad.

6. **Calculadora Interactiva de Retorno de Inversión (ROI):**
   - Deslizadores (*sliders*) en tiempo real para:
     - Valor del inventario o facturación mensual ($1M a $60M+ MXN).
     - Estimación de merma y descuadre actual (0.5% a 6.0%).
   - Cálculo automático de fuga anual sin control, capital recuperado con PlusG y horas operativas ahorradas.

7. **Ecosistema Modular A–H (Interactive Screen Showcase):**
   - Selector lateral para los 8 módulos centrales con previsualizaciones y especificaciones técnicas:
     - *Módulo A:* Compras y SAT CFDI 4.0 (Listas negras Art. 69-B, retenciones).
     - *Módulo B:* Recepción y Andén (Conteo ciego y cross-docking).
     - *Módulo C:* Inventario, Racks 3D y FEFO (Rotación ABC y cuarentenas).
     - *Módulo D:* Picking Inteligente Anti-Aplastamiento (Rutas óptimas).
     - *Módulo E:* Flotilla y Última Milla (App conductor y firma POD).
     - *Módulo F:* Logística Inversa (Reclamos a proveedores a $0.00).
     - *Módulo G:* Auditoría y Kardex (Sello criptográfico SHA-256).
     - *Módulo H:* Centro Ejecutivo de KPIs (OTIF, Fill Rate y ERI).

8. **Matriz de Seguridad y Gobernanza RBAC:**
   - Pestañas interactivas para los 6 perfiles corporativos:
     - *Director General / CFO*
     - *Gerente de Compras & Finanzas*
     - *Jefe de CEDIS / Almacén*
     - *Operador de Montacargas / Picking*
     - *Chofer de Reparto / Última Milla*
     - *Auditor Interno & Fiscal*
   - Detalle claro de qué puede ver/ejecutar cada uno y qué protecciones de sistema tiene bloqueadas.

9. **Estándares y Certificaciones:**
   - SAT CFDI 4.0 / Complemento Carta Porte 3.0.
   - NOM-251-SSA1-2009 (Inocuidad alimentaria).
   - APICS / ASCM SCOR Model.
   - Hardware industrial Zebra y Honeywell.

10. **Preguntas Frecuentes (FAQ) Interactivas:**
    - Acordeón accesible con respuestas a objeciones críticas de TI y directores (caídas de red, integración con SAP/Oracle/Excel, terminales Android compatibles, tiempos de implementación y candados anti-maquillaje).

11. **Modal Accesible de Demostración (`<dialog>`):**
    - Elemento HTML5 nativo `<dialog>` con efecto backdrop blur.
    - Soporte de *light dismiss* (cerrar al hacer clic fuera) y tecla `Escape`.
    - Formulario validado con campos corporativos y pantalla animada de confirmación.

---

## 🛠️ Archivos del Proyecto

| Archivo | Función |
|---|---|
| `index.html` | Estructura semántica completa, accesibilidad ARIA y contenido |
| `styles.css` | Sistema de diseño Dark Industrial, Bento Grid, animaciones y responsive |
| `script.js` | Motores interactivos (Showcase, 3-Way Match, Modo Búnker, ROI, Módulos, RBAC, Modal) |
| `assets/logo.svg` | Identidad visual vectorial de PlusG |
| `README.md` | Documentación técnica y guía de personalización |

---

## 💻 Cómo Probarla Localmente

1. Abre la carpeta `paginaweb` en tu equipo.
2. Haz doble clic en `index.html` para abrirlo directamente en tu navegador preferido.

O levanta un servidor local rápido con PowerShell:

```powershell
cd "C:\Users\PC FACTOR BLACK\Desktop\paginaweb"
python -m http.server 8080
```
Y visita: `http://localhost:8080`
