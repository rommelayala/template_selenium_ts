const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const MAX_REPORTS = 20; // Número máximo de reportes a mantener

function manageReports() {
    if (!fs.existsSync(DOCS_DIR)) {
        console.log('La carpeta docs no existe.');
        return;
    }

    // 1. Leer archivos de la carpeta docs
    const files = fs.readdirSync(DOCS_DIR)
        .filter(file => file.startsWith('report-') && file.endsWith('.html'))
        .map(file => ({
            name: file,
            path: path.join(DOCS_DIR, file),
            time: fs.statSync(path.join(DOCS_DIR, file)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time); // Ordenar por fecha descendente

    console.log(`Encontrados ${files.length} reportes.`);

    // 2. Depurar reportes antiguos (80/20: solo mantenemos los más recientes)
    if (files.length > MAX_REPORTS) {
        const toDelete = files.slice(MAX_REPORTS);
        console.log(`Depurando ${toDelete.length} reportes antiguos...`);
        toDelete.forEach(file => {
            fs.unlinkSync(file.path);
            console.log(`Eliminado: ${file.name}`);
        });
    }

    // 3. Generar el index.html con un diseño premium
    const remainingFiles = files.slice(0, MAX_REPORTS);
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Reportes E2E</title>
    <style>
        :root {
            --primary: #6366f1;
            --bg: #0f172a;
            --card: #1e293b;
            --text: #f8fafc;
        }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            margin: 0;
        }
        h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--primary); }
        p { color: #94a3b8; margin-bottom: 2rem; }
        .list {
            width: 100%;
            max-width: 800px;
            display: grid;
            gap: 1rem;
        }
        .item {
            background: var(--card);
            padding: 1.2rem;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: transform 0.2s, background 0.2s;
            text-decoration: none;
            color: inherit;
            border: 1px solid #334155;
        }
        .item:hover {
            transform: translateY(-3px);
            background: #334155;
            border-color: var(--primary);
        }
        .name { font-weight: 600; font-size: 1.1rem; }
        .date { font-size: 0.9rem; color: #94a3b8; }
        .badge {
            background: #065f46;
            color: #34d399;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
        }
        footer { margin-top: 3rem; font-size: 0.8rem; color: #475569; }
    </style>
</head>
<body>
    <h1>Cielo Testing Portal</h1>
    <p>Historial automático de reportes de ejecución E2E</p>
    
    <div class="list">
        ${remainingFiles.map(f => `
            <a href="${f.name}" class="item">
                <div>
                    <div class="name">${f.name}</div>
                    <div class="date">${new Date(f.time).toLocaleString()}</div>
                </div>
                <div class="badge">Success</div>
            </a>
        `).join('')}
    </div>

    <footer>Mantenido con ❤️ por Rommel & Cielo</footer>
</body>
</html>
    `;

    fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), htmlContent);
    console.log('index.html generado con éxito en /docs.');
}

manageReports();
