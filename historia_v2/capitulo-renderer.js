// ═══════════════════════════════════════════════════
//  CAPITULO-RENDERER.JS
//  Renderizador compartido para todos los capítulos
//  Lee el objeto CAPITULO del archivo cap_XX.js
// ═══════════════════════════════════════════════════
//
//  FORMATO DE contenido[] en cap_XX.js:
//
//  "[P5]"            → marcador de página PÁGINA 5
//  "[LOC]texto"      → ubicación en cursiva
//  "[OPEN]texto"     → línea de apertura en negrita
//  "[HOOK]texto"     → gancho final del capítulo
//  "[HR]"            → separador horizontal
//  "[HTML]<div>..."  → HTML crudo (intercapítulos, recuadros)
//  "—diálogo"        → párrafo de diálogo
//  "texto normal"    → párrafo narrativo
//
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  if (typeof CAPITULO === 'undefined') {
    console.error('capitulo-renderer: no se encontró el objeto CAPITULO');
    return;
  }

  // ── Cabecera ──────────────────────────────────────
  var h1  = document.querySelector('.chapter-header h1');
  var h2  = document.querySelector('.chapter-header h2');
  var sub = document.querySelector('.chapter-header .chapter-subtitle');

  if (h1)  h1.textContent  = 'CAPÍTULO ' + CAPITULO.numero;
  if (h2) {
    if (CAPITULO.subtituloHtml) {
      h2.innerHTML = CAPITULO.subtituloHtml;
    } else {
      h2.textContent = CAPITULO.titulo;
    }
  }
  if (sub) sub.textContent = 'Páginas ' + CAPITULO.paginas;

  document.title = 'Capítulo ' + CAPITULO.numero + ': ' + CAPITULO.titulo
                 + ' — El ascenso de la antigua reina';

  // ── Contenido ─────────────────────────────────────
  var container = document.querySelector('.chapter-content');
  if (!container) { console.error('capitulo-renderer: no se encontró .chapter-content'); return; }

  (CAPITULO.contenido || []).forEach(function (texto) {

    // [P5] → marcador de página
    if (/^\[P\d+\]$/.test(texto)) {
      var num = texto.match(/\[P(\d+)\]/)[1];
      var div = document.createElement('div');
      div.className = 'page-marker';
      div.innerHTML = '<h3>PÁGINA ' + num + '</h3>';
      container.appendChild(div);
      return;
    }

    // [LOC]texto → marcador de ubicación
    if (texto.indexOf('[LOC]') === 0) {
      var p = document.createElement('p');
      p.className = 'location-marker';
      p.innerHTML = '<em>' + texto.slice(5).replace(/\n/g, '<br>') + '</em>';
      container.appendChild(p);
      return;
    }

    // [OPEN]texto → línea de apertura en negrita
    if (texto.indexOf('[OPEN]') === 0) {
      var p = document.createElement('p');
      p.className = 'opening-line';
      p.innerHTML = '<strong>' + texto.slice(6) + '</strong>';
      container.appendChild(p);
      return;
    }

    // [HOOK]texto → gancho final
    if (texto.indexOf('[HOOK]') === 0) {
      var p = document.createElement('p');
      p.className = 'hook final-hook';
      p.textContent = texto.slice(6);
      container.appendChild(p);
      return;
    }

    // [HTML]... → HTML crudo (intercapítulos, recuadros especiales)
    if (texto.indexOf('[HTML]') === 0) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = texto.slice(6);
      while (wrapper.firstChild) {
        container.appendChild(wrapper.firstChild);
      }
      return;
    }

    // [HR] → separador
    if (texto === '[HR]') {
      container.appendChild(document.createElement('hr'));
      return;
    }

    // "—..." → diálogo
    if (texto.charAt(0) === '—') {
      var p = document.createElement('p');
      p.className = 'dialogue';
      p.textContent = texto;
      container.appendChild(p);
      return;
    }

    // Párrafo normal
    var p = document.createElement('p');
    p.textContent = texto;
    container.appendChild(p);
  });

  // ── Navegación ────────────────────────────────────
  var nav = document.querySelector('.chapter-navigation');
  if (nav && CAPITULO.nav) {
    nav.innerHTML = '';
    if (CAPITULO.nav.anterior) {
      var a = document.createElement('a');
      a.href = CAPITULO.nav.anterior.href;
      a.className = 'nav-button';
      a.textContent = CAPITULO.nav.anterior.label;
      nav.appendChild(a);
    }
    var idx = document.createElement('a');
    idx.href = 'index.html';
    idx.className = 'nav-button';
    idx.textContent = 'Índice';
    nav.appendChild(idx);
    if (CAPITULO.nav.siguiente) {
      var a = document.createElement('a');
      a.href = CAPITULO.nav.siguiente.href;
      a.className = 'nav-button';
      a.textContent = CAPITULO.nav.siguiente.label;
      nav.appendChild(a);
    }
  }
});
