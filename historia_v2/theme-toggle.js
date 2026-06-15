// ==========================================
// SISTEMA UNIVERSAL DE DESARROLLO
// El Reino de los Osamentales - Historia V2
// ==========================================

// ==========================================
// SISTEMA DE TEMAS
// ==========================================

// Función para alternar entre modo día y noche
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ==========================================
// SISTEMA DE SUBTÍTULOS DE DESARROLLO
// ==========================================

// Función para mostrar/ocultar subtítulos de desarrollo
function toggleDevSubtitles() {
    const body = document.body;
    const isHidden = body.classList.contains('dev-subtitles-hidden');

    if (isHidden) {
        body.classList.remove('dev-subtitles-hidden');
        localStorage.setItem('devSubtitles', 'visible');
    } else {
        body.classList.add('dev-subtitles-hidden');
        localStorage.setItem('devSubtitles', 'hidden');
    }
}

// ==========================================
// SISTEMA DE TRACKING DE PERSONAJES
// ==========================================

// Función para mostrar/ocultar panel de personajes
function toggleCharacterPanel() {
    const panel = document.getElementById('characterPanel');
    if (!panel) return;

    panel.classList.toggle('active');

    // Cargar contenido si es la primera vez
    if (panel.classList.contains('active') && !panel.dataset.loaded) {
        loadCharacterData();
        panel.dataset.loaded = 'true';
    }
}

// Función para cambiar tabs del panel de personajes
function switchCharacterTab(tabName) {
    // Actualizar tabs
    document.querySelectorAll('.character-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Actualizar contenido
    updateCharacterContent(tabName);
}

// ==========================================
// DATOS DE PERSONAJES POR CAPÍTULO
// ==========================================

// Función para obtener datos de personajes según el capítulo actual
function getChapterCharacterData() {
    const currentPage = window.location.pathname;
    const chapterMatch = currentPage.match(/capitulo_(\d+(?:_\d+)?)/);

    if (!chapterMatch) return {};

    const chapter = chapterMatch[1];

    // Datos específicos por capítulo
    const chapterData = {
        '01': {
            "Maya Park": {
                appearances: ["inicio", "valle", "final"],
                duration: "35min",
                role: "Protagonista investigadora",
                status: "active",
                arc: "Descubrimiento del misterio",
                progress: 100,
                relationships: ["Jung-ho (hermano)", "Suscriptores (audiencia)"],
                description: "YouTuber documentando su último día libre"
            },
            "Jung-ho Park": {
                appearances: ["mencionado", "flashbacks"],
                duration: "8min",
                role: "Víctima inicial",
                status: "dead",
                arc: "Catalizador del misterio",
                progress: 100,
                relationships: ["Maya (hermana)", "Valle (activó)"],
                description: "Genio que desató el poder ancestral"
            }
        },

        '02': {
            "Dr. Park Sung-min": {
                appearances: ["06:45"],
                duration: "5min",
                role: "Sismólogo",
                status: "active",
                arc: "Detector de patrones anómalos",
                progress: 100,
                relationships: ["General Kim (reporta)"],
                description: "Descubre terremotos precisos cada 3h 17min"
            },
            "General Thomas Kim": {
                appearances: ["09:30", "11:45"],
                duration: "15min",
                role: "Comandante militar",
                status: "active",
                arc: "Líder enfrentando lo imposible",
                progress: 60,
                relationships: ["Sarah Chen (subordinada)", "Trevor Williams (consulta)", "Morrison (ordena)", "Dr. Park (recibe reportes)"],
                description: "Veterano militar procesando amenaza sobrenatural"
            },
            "Mayor Sarah Chen": {
                appearances: ["09:30", "11:45"],
                duration: "12min",
                role: "Analista militar",
                status: "active",
                arc: "Testigo de lo imposible",
                progress: 70,
                relationships: ["General Kim (superior)", "Equipo técnico (coordina)"],
                description: "15 años de compostura militar puestos a prueba"
            },
            "Henry Lee": {
                appearances: ["09:35", "10:15", "11:15", "11:30", "12:00"],
                duration: "25min",
                role: "Oficial novato",
                status: "active",
                arc: "Despertar a la realidad sobrenatural",
                progress: 85,
                relationships: ["Sargento Choi (superior)", "Morrison (toma comando)", "Maya (busca)"],
                description: "5 días de policía, transformado por lo que ve"
            },
            "Sargento Choi": {
                appearances: ["09:35"],
                duration: "3min",
                role: "Supervisor policial",
                status: "active",
                arc: "Veterano inquieto",
                progress: 40,
                relationships: ["Henry Lee (supervisado)", "Comando central (coordina)"],
                description: "20 años de experiencia, visiblemente preocupado"
            },
            "Maya Park": {
                appearances: ["video 18:30 (día anterior)", "mencionada múltiples veces"],
                duration: "8min (video)",
                role: "YouTuber investigadora",
                status: "missing",
                arc: "Catalizador del despertar",
                progress: 90,
                relationships: ["Jung-ho (hermano muerto)", "Henry (la busca)", "Audiencia global (2.3M)"],
                description: "850K suscriptores, primera en responder al llamado"
            },
            "Jung-ho Park": {
                appearances: ["mencionado", "video anterior"],
                duration: "5min (video)",
                role: "Genio matemático",
                status: "dead",
                arc: "El que despertó a la Reina",
                progress: 100,
                relationships: ["Maya (hermana)", "La Reina (despertó)", "Patrón 2,847 (decodificó)"],
                description: "IQ 187, resolvió el acertijo cósmico"
            },
            "Trevor Williams": {
                appearances: ["11:00", "11:45"],
                duration: "8min",
                role: "Agente DEA/Científico",
                status: "active",
                arc: "Analista del polvo de hueso",
                progress: 75,
                relationships: ["General Kim (consulta)", "Muestras globales (estudia)", "Fenómeno mundial (rastrea)"],
                description: "Experto en sustancias, detecta patrón global"
            },
            "Capitán Morrison": {
                appearances: ["11:30", "12:00"],
                duration: "10min",
                role: "Fuerzas especiales",
                status: "active",
                arc: "Veterano de lo imposible",
                progress: 60,
                relationships: ["Henry (toma comando)", "Osamentales (clasifica)", "Situación global (conoce)"],
                description: "Ya tiene clasificados los Osamentales Rastreros"
            },
            "Dr. Jason Lee": {
                appearances: ["intercapítulo forense"],
                duration: "2min",
                role: "Médico forense",
                status: "active",
                arc: "Científico que confirma lo alienígena",
                progress: 90,
                relationships: ["Comisión Valle Oscuro (reporta)", "ADN no-terrestre (descubre)"],
                description: "Confirma que el ADN no es de este planeta"
            },
            "Daniel Kim": {
                appearances: ["mencionado como propietario granja"],
                duration: "1min",
                role: "Agricultor víctima",
                status: "missing",
                arc: "Primera víctima del valle",
                progress: 100,
                relationships: ["Granja (propietario)", "Patrones óseos (origen)"],
                description: "Desaparecido, su granja es escena del crimen"
            },
            "Osamentales Rastreros": {
                appearances: ["09:30", "10:15", "11:15", "12:00"],
                duration: "20min",
                role: "Entidades esqueléticas",
                status: "active",
                arc: "Constructores del trono",
                progress: 70,
                relationships: ["La Reina (sirven)", "Torre ósea (construyen)", "Patrón 2,847 (siguen)"],
                description: "12+ criaturas, 3m largo, columnas alargadas"
            },
            "La Reina de los Osamentales": {
                appearances: ["mencionada", "influencia"],
                duration: "continua",
                role: "Entidad cósmica",
                status: "awakening",
                arc: "Despertar tras 230 millones de años",
                progress: 40,
                relationships: ["Jung-ho (despertada por)", "Maya (primera en responder)", "2,847 descendientes (busca)", "Trono óseo (espera)"],
                description: "Entidad fragmentada, esperando reunificación"
            }
        }

        // Más capítulos se pueden agregar aquí...
    };

    return chapterData[chapter] || {};
}

// ==========================================
// FUNCIONES DE MANEJO DE CONTENIDO
// ==========================================

// Función para cargar datos de personajes
function loadCharacterData() {
    updateCharacterContent('appearances');
}

// Función para actualizar contenido del panel
function updateCharacterContent(tabName) {
    const content = document.getElementById('characterContent');
    if (!content) return;

    let html = '';

    switch(tabName) {
        case 'appearances':
            html = generateAppearancesContent();
            break;
        case 'arcs':
            html = generateArcsContent();
            break;
        case 'relations':
            html = generateRelationsContent();
            break;
    }

    content.innerHTML = html;
}

function generateAppearancesContent() {
    let html = '';
    const characterData = getChapterCharacterData();

    if (Object.keys(characterData).length === 0) {
        return '<div class="character-item" style="text-align: center; color: #888;">No hay datos de personajes disponibles para este capítulo.</div>';
    }

    Object.entries(characterData).forEach(([name, data]) => {
        const statusClass = data.status === 'missing' ? 'status-missing' :
                          data.status === 'active' ? 'status-active' :
                          data.status === 'dead' ? 'status-missing' :
                          data.status === 'awakening' ? 'status-mentioned' : 'status-mentioned';

        html += `
            <div class="character-item">
                <div class="character-name">${name}</div>
                <div class="character-appearances">
                    📍 ${data.appearances.join(', ')} (${data.duration})
                </div>
                <div class="character-status ${statusClass}">
                    ${data.status.toUpperCase()}
                </div>
                <div style="font-size: 0.8em; color: #888; margin-top: 5px;">
                    ${data.description}
                </div>
            </div>
        `;
    });
    return html;
}

function generateArcsContent() {
    let html = '';
    const characterData = getChapterCharacterData();

    if (Object.keys(characterData).length === 0) {
        return '<div class="character-item" style="text-align: center; color: #888;">No hay datos de arcos disponibles para este capítulo.</div>';
    }

    Object.entries(characterData).forEach(([name, data]) => {
        html += `
            <div class="character-item">
                <div class="character-name">${name}</div>
                <div style="margin: 10px 0;">
                    <div style="font-size: 0.9em; margin-bottom: 5px;">${data.arc}</div>
                    <div style="background: #333; height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #cd853f; height: 100%; width: ${data.progress}%; transition: width 0.3s ease;"></div>
                    </div>
                    <div style="font-size: 0.8em; color: #888; margin-top: 3px;">${data.progress}% completado</div>
                </div>
                <div style="font-size: 0.8em; color: #888;">
                    Rol: ${data.role}
                </div>
            </div>
        `;
    });
    return html;
}

function generateRelationsContent() {
    let html = '';
    const characterData = getChapterCharacterData();

    if (Object.keys(characterData).length === 0) {
        return '<div class="character-item" style="text-align: center; color: #888;">No hay datos de relaciones disponibles para este capítulo.</div>';
    }

    Object.entries(characterData).forEach(([name, data]) => {
        if (data.relationships && data.relationships.length > 0) {
            html += `
                <div class="character-item">
                    <div class="character-name">${name}</div>
                    <div style="margin-top: 8px;">
            `;
            data.relationships.forEach(rel => {
                html += `<div style="font-size: 0.8em; color: #888; margin: 2px 0;">🔗 ${rel}</div>`;
            });
            html += `
                    </div>
                </div>
            `;
        }
    });
    return html;
}

// ==========================================
// FUNCIONES DE AUTO-INICIALIZACIÓN
// ==========================================

// Función para agregar botones automáticamente
function addDevButtons() {
    // Solo agregar si no existen ya
    if (!document.querySelector('.theme-toggle')) {
        addThemeButton();
    }
    if (!document.querySelector('.dev-toggle')) {
        addDevButton();
    }
    if (!document.querySelector('.character-toggle')) {
        addCharacterButton();
    }
    if (!document.querySelector('.character-panel')) {
        addCharacterPanel();
    }
}

function addThemeButton() {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.onclick = toggleTheme;
    themeToggle.title = 'Cambiar tema día/noche';
    themeToggle.innerHTML = `
        <span class="theme-icon-sun">☀️</span>
        <span class="theme-icon-moon">🌙</span>
    `;
    document.body.appendChild(themeToggle);
}

function addDevButton() {
    const devToggle = document.createElement('div');
    devToggle.className = 'dev-toggle';
    devToggle.onclick = toggleDevSubtitles;
    devToggle.title = 'Mostrar/Ocultar subtítulos de desarrollo';
    devToggle.innerHTML = `<span class="dev-icon">🔧</span>`;
    document.body.appendChild(devToggle);
}

function addCharacterButton() {
    const characterToggle = document.createElement('div');
    characterToggle.className = 'character-toggle';
    characterToggle.onclick = toggleCharacterPanel;
    characterToggle.title = 'Tracking de personajes';
    characterToggle.innerHTML = `<span class="character-icon">👥</span>`;
    document.body.appendChild(characterToggle);
}

function addCharacterPanel() {
    const panel = document.createElement('div');
    panel.className = 'character-panel';
    panel.id = 'characterPanel';
    panel.innerHTML = `
        <div class="character-panel-header">
            TRACKING DE PERSONAJES
        </div>
        <div class="character-tabs">
            <button class="character-tab active" onclick="switchCharacterTab('appearances')">Apariciones</button>
            <button class="character-tab" onclick="switchCharacterTab('arcs')">Arcos</button>
            <button class="character-tab" onclick="switchCharacterTab('relations')">Relaciones</button>
        </div>
        <div class="character-content" id="characterContent">
            <!-- Contenido dinámico -->
        </div>
    `;
    document.body.appendChild(panel);
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

// Cargar tema y configuraciones guardadas al iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tema
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Cargar estado de subtítulos de desarrollo
    const devSubtitlesState = localStorage.getItem('devSubtitles') || 'visible';
    if (devSubtitlesState === 'hidden') {
        document.body.classList.add('dev-subtitles-hidden');
    }

    // Agregar botones de desarrollo si no existen (para capítulos sin ellos)
    // Solo en páginas de capítulos
    if (window.location.pathname.includes('capitulo_')) {
        // Esperar un poco para que se cargue el DOM completo
        setTimeout(addDevButtons, 100);
    }
});