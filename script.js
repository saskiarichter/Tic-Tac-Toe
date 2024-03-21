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

function init(){
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
                cell.textContent = 'O';
            } else if (fields[index] === 'cross') {
                cell.textContent = 'X';
            }
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    container.innerHTML = '';
    container.appendChild(table);
}