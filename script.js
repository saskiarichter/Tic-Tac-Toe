let fields = [
    null,
    null,
    'circle',
    'cross',
    null,
    null,
    null,
    null,
    null,
];

function init() {
    render();
}


function render() {
    const container = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;
            if (fields[index] === 'circle') {
                cell.innerHTML = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                cell.innerHTML = generateCrossSVG();
            }
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    container.innerHTML = '';
    container.appendChild(table);
}

function generateCircleSVG() {
    const color = '#00B0EF';
    const diameter = 56; // Durchmesser = Radius * 2 + Stroke Width
    const strokeWidth = 3; // Stroke Width
    const animationDuration = 0.125; // Animation Geschwindigkeit in Sekunden (125ms)

    const svgCode = `
        <svg width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${diameter / 2}" cy="${diameter / 2}" r="${(diameter - strokeWidth) / 2}" fill="none" stroke="${color}" stroke-width="${strokeWidth}">
                <animate attributeName="r" from="0" to="${(diameter - strokeWidth) / 2}" dur="${animationDuration}s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}

function generateCrossSVG() {
    const color = '#FFC000'; 
    const diameter = 56;
    const strokeWidth = 3; 
    const animationDuration = 0.125; 

    const svgCode = `
        <svg width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}" xmlns="http://www.w3.org/2000/svg">
            <line x1="${strokeWidth}" y1="${diameter - strokeWidth}" x2="${diameter - strokeWidth}" y2="${strokeWidth}" stroke="${color}" stroke-width="${strokeWidth}">
                <animate attributeName="opacity" from="0" to="1" dur="${animationDuration}s" fill="freeze" />
            </line>
            <line x1="${diameter - strokeWidth}" y1="${diameter - strokeWidth}" x2="${strokeWidth}" y2="${strokeWidth}" stroke="${color}" stroke-width="${strokeWidth}">
                <animate attributeName="opacity" from="0" to="1" dur="${animationDuration}s" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}