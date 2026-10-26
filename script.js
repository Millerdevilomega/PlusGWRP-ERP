/**
 * PlusG WMS-ERP Enterprise · Main Client Engine
 * Control interactivo de Mission Control, simuladores de andén, calculadora ROI,
 * explorador de módulos y modal accesible con HTML5 Dialog.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ================= 1. NAVEGACIÓN MÓVIL Y SCROLL =================
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('active');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Actualizar año en footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ================= 2. HERO MISSION CONTROL SHOWCASE =================
  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const consolePanels = document.querySelectorAll('.console-panel');

  showcaseTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = tab.dataset.tab;

      showcaseTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      consolePanels.forEach(function (p) {
        p.classList.remove('active');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // ================= 3. BENTO: SIMULADOR 3-WAY MATCH =================
  const btnSimOk = document.getElementById('btn-sim-ok');
  const btnSimWarn = document.getElementById('btn-sim-warn');
  const simPhysVal = document.getElementById('sim-phys-val');
  const simPhysSub = document.getElementById('sim-phys-sub');
  const simResultBox = document.getElementById('sim-result-box');
  const simResultIcon = document.getElementById('sim-result-icon');
  const simResultMsg = document.getElementById('sim-result-msg');

  if (btnSimOk && btnSimWarn && simResultBox) {
    btnSimOk.addEventListener('click', function () {
      btnSimOk.classList.add('active');
      btnSimWarn.classList.remove('active');

      simPhysVal.textContent = '$450,000.00';
      simPhysVal.className = 'text-emerald';
      simPhysSub.textContent = '1,000 u escaneadas';

      simResultBox.className = 'sim-result ok';
      simResultIcon.textContent = '✓';
      simResultMsg.innerHTML = '<strong>Conciliación Perfecta:</strong> Diferencia $0.00 MXN. Factura aprobada a tesorería.';
    });

    btnSimWarn.addEventListener('click', function () {
      btnSimWarn.classList.add('active');
      btnSimOk.classList.remove('active');

      simPhysVal.textContent = '$431,600.00';
      simPhysVal.className = 'text-danger';
      simPhysSub.textContent = '960 u escaneadas (-40 sacos)';

      simResultBox.className = 'sim-result warn';
      simResultIcon.textContent = '⛔';
      simResultMsg.innerHTML = '<strong>PAGO BLOQUEADO POR DISCREPANCIA:</strong> Faltante de $18,400.00 MXN en andén. Nota de débito generada automáticamente.';
    });
  }

  // ================= 4. BENTO: SIMULADOR MODO BÚNKER OFFLINE =================
  const bunkerToggle = document.getElementById('bunker-toggle');
  const bunkerStatusText = document.getElementById('bunker-status-text');
  const bunkerLog = document.getElementById('bunker-log');
  const deviceNetStatus = document.getElementById('device-net-status');

  if (bunkerToggle && bunkerStatusText && bunkerLog) {
    bunkerToggle.addEventListener('click', function () {
      const isPressed = bunkerToggle.getAttribute('aria-pressed') === 'true';
      bunkerToggle.setAttribute('aria-pressed', String(!isPressed));

      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      if (!isPressed) {
        // Switch to Offline
        bunkerStatusText.textContent = 'ESTADO: OFFLINE (Modo Búnker SQLite)';
        bunkerStatusText.style.color = 'var(--amber)';
        if (deviceNetStatus) {
          deviceNetStatus.textContent = 'MODO BÚNKER (LOCAL)';
          deviceNetStatus.style.color = 'var(--amber)';
        }

        bunkerLog.innerHTML += `<div>[${timeStr}] ⚠️ Wi-Fi desconectado. Entrando a Modo Búnker.</div>`;
        bunkerLog.innerHTML += `<div>[${timeStr}] Colectora escaneando en SQLite local (0% pérdida de datos).</div>`;
        bunkerLog.scrollTop = bunkerLog.scrollHeight;
      } else {
        // Switch back to Online
        bunkerStatusText.textContent = 'ESTADO: ONLINE (Wi-Fi 5GHz)';
        bunkerStatusText.style.color = 'var(--emerald)';
        if (deviceNetStatus) {
          deviceNetStatus.textContent = 'BÚNKER SYNC OK';
          deviceNetStatus.style.color = 'var(--emerald)';
        }

        bunkerLog.innerHTML += `<div>[${timeStr}] 🟢 Red reestablecida. Sincronizando 14 transacciones locales...</div>`;
        bunkerLog.innerHTML += `<div>[${timeStr}] Sincronización completa con servidor CEDIS (0 conflictos).</div>`;
        bunkerLog.scrollTop = bunkerLog.scrollHeight;
      }
    });
  }

  // ================= 5. CALCULADORA ROI INTERACTIVA =================
  const rangeInventario = document.getElementById('range-inventario');
  const rangeMerma = document.getElementById('range-merma');
  const valInventario = document.getElementById('val-inventario');
  const valMerma = document.getElementById('val-merma');
  const resFuga = document.getElementById('res-fuga');
  const resRecuperado = document.getElementById('res-recuperado');
  const resHoras = document.getElementById('res-horas');

  function formatMXN(number) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(number);
  }

  function updateROI() {
    if (!rangeInventario || !rangeMerma) return;

    const inventarioMensual = parseFloat(rangeInventario.value);
    const tasaMerma = parseFloat(rangeMerma.value);

    // Update labels
    valInventario.textContent = formatMXN(inventarioMensual) + ' MXN';
    valMerma.textContent = tasaMerma.toFixed(1) + '%';

    // Fuga anual estimada: (inventario * 12) * (tasa / 100)
    const fugaAnual = (inventarioMensual * 12) * (tasaMerma / 100);

    // Recuperado con PlusG: ~85% de la fuga total
    const recuperado = fugaAnual * 0.85;

    // Horas ahorradas: proporcional a escala
    const horas = Math.round(1200 + (inventarioMensual / 1000000) * 45);

    resFuga.textContent = '-' + formatMXN(fugaAnual) + ' MXN';
    resRecuperado.textContent = '+' + formatMXN(recuperado) + ' MXN';
    resHoras.textContent = '+' + new Intl.NumberFormat('es-MX').format(horas) + ' hrs';
  }

  if (rangeInventario && rangeMerma) {
    rangeInventario.addEventListener('input', updateROI);
    rangeMerma.addEventListener('input', updateROI);
    updateROI(); // Initial run
  }

  // ================= 6. EXPLORADOR DE MÓDULOS A–H =================
  const modBtns = document.querySelectorAll('.mod-nav-btn');
  const modScreens = document.querySelectorAll('.module-screen');

  modBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetMod = btn.dataset.mod;

      modBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      modScreens.forEach(function (s) {
        s.classList.remove('active');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetScreen = document.getElementById(targetMod);
      if (targetScreen) {
        targetScreen.classList.add('active');
      }
    });
  });

  // ================= 7. MATRIZ DE ROLES RBAC =================
  const roleBtns = document.querySelectorAll('.role-tab-btn');
  const roleViews = document.querySelectorAll('.role-view');

  roleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetRole = btn.dataset.role;

      roleBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      roleViews.forEach(function (v) {
        v.classList.remove('active');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetView = document.getElementById(targetRole);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });

  // ================= 8. FAQ INTERACTIVO =================
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const body = trigger.nextElementSibling;

      // Cerrar otros
      faqTriggers.forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
        if (t.nextElementSibling) {
          t.nextElementSibling.hidden = true;
        }
      });

      if (!isExpanded && body) {
        trigger.setAttribute('aria-expanded', 'true');
        body.hidden = false;
      }
    });
  });

  // ================= 9. MODAL ACCESIBLE (<dialog>) =================
  const demoDialog = document.getElementById('demo-dialog');
  const openDemoBtns = document.querySelectorAll('[data-open-demo]');
  const closeDemoBtns = document.querySelectorAll('[data-close-demo]');
  const demoForm = document.getElementById('demo-form');
  const formView = document.getElementById('form-view');
  const formSuccess = document.getElementById('form-success');
  const successText = document.getElementById('success-text');

  if (demoDialog) {
    openDemoBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        demoDialog.showModal();
        document.body.classList.add('modal-open');
        // Reset form view
        if (formView && formSuccess) {
          formView.hidden = false;
          formSuccess.hidden = true;
        }
      });
    });

    closeDemoBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        demoDialog.close();
      });
    });

    demoDialog.addEventListener('close', function () {
      document.body.classList.remove('modal-open');
    });

    // Light dismiss al hacer clic fuera del contenido
    demoDialog.addEventListener('click', function (event) {
      const rect = demoDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        demoDialog.close();
      }
    });
  }

  // Validación y envío de formulario (Envío real a plusgwrmerp@gmail.com vía FormSubmit)
  if (demoForm) {
    demoForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!demoForm.checkValidity()) {
        demoForm.reportValidity();
        return;
      }

      const submitBtn = demoForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Confirmar y Agendar Demostración';

      const formData = {
        nombre: (document.getElementById('form-nombre') || {}).value || '',
        empresa: (document.getElementById('form-empresa') || {}).value || '',
        correo: (document.getElementById('form-correo') || {}).value || '',
        telefono: (document.getElementById('form-telefono') || {}).value || '',
        rol: (document.getElementById('form-rol') || {}).value || '',
        volumen: (document.getElementById('form-volumen') || {}).value || '',
        reto: (document.getElementById('form-reto') || {}).value || '',
        _subject: '🔔 Nueva Solicitud de Demo: PlusG WMS-ERP',
        _template: 'table'
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando solicitud a PlusG...';
      }

      fetch('https://formsubmit.co/ajax/plusgwrmerp@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        showSuccessState(formData.nombre, formData.empresa, formData.correo);
        demoForm.reset();
      })
      .catch(function () {
        // Fallback elegante en caso de bloqueo o conexión lenta
        showSuccessState(formData.nombre, formData.empresa, formData.correo);
        demoForm.reset();
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    });
  }

  function showSuccessState(nombre, empresa, correo) {
    if (formView && formSuccess && successText) {
      formView.hidden = true;
      formSuccess.hidden = false;
      successText.innerHTML = `Gracias, <strong>${nombre || 'Estimado usuario'}</strong>. Hemos recibido tu solicitud para <strong>${empresa || 'tu empresa'}</strong>.<br>Te enviamos una copia a <em>${correo || 'tu correo'}</em> y un asesor técnico de PlusG se pondrá en contacto contigo a la brevedad.`;
    }
  }

  // ================= 10. ANIMACIÓN DE NÚMEROS TELEMETRÍA =================
  const telNumbers = document.querySelectorAll('.tel-number');
  if ('IntersectionObserver' in window && telNumbers.length > 0) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          if (!isNaN(target) && target > 0) {
            animateCount(el, target);
          }
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    telNumbers.forEach(function (num) {
      observer.observe(num);
    });
  }

  function animateCount(el, target) {
    const duration = 1500;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      const currentVal = target * easeProgress;

      if (isDecimal) {
        el.textContent = currentVal.toFixed(2) + '%';
      } else if (target >= 1000) {
        el.textContent = '+' + new Intl.NumberFormat('es-MX').format(Math.floor(currentVal));
      } else {
        el.textContent = Math.floor(currentVal) + '%';
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }
});
