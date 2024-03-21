let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let nextSymbol = 'cross';

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
            cell.onclick = function() { handleClick(index, this); };
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    container.innerHTML = '';
    container.appendChild(table);
}

function handleClick(index, element) {
    if (!fields[index]) {
        fields[index] = nextSymbol;
        element.innerHTML = nextSymbol === 'circle' ? generateCircleSVG() : generateCrossSVG();
        nextSymbol = nextSymbol === 'circle' ? 'cross' : 'circle'; // Wechseln Sie das nächste Symbol
        element.onclick = null; // Entferne den Eventlistener, um weitere Klicks zu verhindern
        
        const winningCombination = checkGameStatus();
        if (winningCombination) {
            // Das Spiel ist vorbei, zeichne eine Linie
            drawWinningLine(winningCombination);
        }
    }
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

function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Gewinnkombinationen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Gewinnkombinationen
        [0, 4, 8], [2, 4, 6]             // Diagonale Gewinnkombinationen
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Das Spiel ist vorbei, es gibt einen Gewinner
            return combination; // Rückgabe der siegreichen Kombination
        }
    }

    // Es gibt keinen Gewinner, das Spiel geht weiter
    return null;
}

function drawWinningLine(combination) {
    const [a, b, c] = combination;
    const cells = document.querySelectorAll('td');

    // Die Koordinaten der ersten und letzten Zelle der Gewinnkombination erhalten
    const firstCell = cells[a].getBoundingClientRect();
    const lastCell = cells[c].getBoundingClientRect();

    // SVG-Element erstellen und hinzufügen
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`);
    svg.setAttribute('style', 'position: absolute; top: 0; left: 0; pointer-events: none;');

    // Linie zeichnen
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', firstCell.left + firstCell.width / 2);
    line.setAttribute('y1', firstCell.top + firstCell.height / 2);
    line.setAttribute('x2', lastCell.left + lastCell.width / 2);
    line.setAttribute('y2', lastCell.top + lastCell.height / 2);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '5'); // Dicke der Linie anpassen

    // Linie zum SVG-Element hinzufügen
    svg.appendChild(line);

    // SVG-Element dem Container hinzufügen
    document.getElementById('content').appendChild(svg);
}



