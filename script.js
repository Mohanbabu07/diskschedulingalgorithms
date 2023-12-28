function find_fcfs(no_of_request, requestString, init) {
    let head_movements = 0;
    let temp = -1;
    for (let i = 0; i < no_of_request; i++) {
        if (temp == -1) {
            if (requestString[i] > init) {
                head_movements += requestString[i] - init;
                console.log(`Subtracting ${requestString[i]} - ${init} : `);
                temp = requestString[i];
            } else {
                head_movements += init - requestString[i];
                console.log(`Subtracting ${init} - ${requestString[i]} : `);
                temp = requestString[i];
            }
        } else {
            if (requestString[i] > temp) {
                head_movements += requestString[i] - temp;
                console.log(`Subtracting ${requestString[i]} - ${temp} : `);
                temp = requestString[i];
            } else {
                head_movements += temp - requestString[i];
                console.log(`Subtracting ${temp} - ${requestString[i]} : `);
                temp = requestString[i];
            }
        }
    }
    return head_movements;
}

function find_sstf(no_of_request, requestString, init) {
    let head_movements = 0;
    let temp = init;
    let min_dis_idx;
    for (let i = 0; i < no_of_request - 1; i++) {
        min_dis_idx = i;
        for (let j = i + 1; j < no_of_request; j++) {
            if (Math.abs(requestString[min_dis_idx] - temp) >= Math.abs(requestString[j] - temp)) {
                min_dis_idx = j;
            }
        }
        head_movements += Math.abs(requestString[min_dis_idx] - temp);
        temp = requestString[min_dis_idx];
        if (min_dis_idx != i) {
            let temp1 = requestString[min_dis_idx];
            requestString[min_dis_idx] = requestString[i];
            requestString[i] = temp1;
        }
    }
    head_movements += Math.abs(requestString[no_of_request - 1] - temp);
    console.log("Modifies=[ " + requestString.join(" ") + " ]");
    return head_movements;
}
function find_scan(no_of_request, requestString, init, max_c, dir) {
    let head_movements = 0;
    let min_dis_idx;
    let scanOrder = new Array(no_of_request + 2);
    let scanOrd_idx = 0;

    for (let i = 0; i < no_of_request - 1; i++) {
        min_dis_idx = i;
        for (let j = i + 1; j < no_of_request; j++) {
            if (requestString[min_dis_idx] >= requestString[j]) {
                min_dis_idx = j;
            }
        }
        if (min_dis_idx != i) {
            let temp = requestString[min_dis_idx];
            requestString[min_dis_idx] = requestString[i];
            requestString[i] = temp;
        }
    }

    if (dir == 1) {
        scanOrder[scanOrd_idx++] = init;
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (requestString[i] < init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
        scanOrder[scanOrd_idx++] = 0;
        for (let i = 0; i < no_of_request; i++) {
            if (requestString[i] >= init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
    } else {
        scanOrder[scanOrd_idx++] = init;
        for (let i = 0; i < no_of_request; i++) {
            if (requestString[i] >= init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
        scanOrder[scanOrd_idx++] = max_c;
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (requestString[i] < init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
    }

    for (let i = 0; i < scanOrd_idx - 1; i++) {
        head_movements += Math.abs(scanOrder[i + 1] - scanOrder[i]);
    }

    console.log("Modifies=[ " + scanOrder.join(" ") + " ]");
    return head_movements-2;
}
function find_look(no_of_request, requestString, init, dir) {
    let head_movements = 0;
    let min_dis_idx;
    let scanOrder = [];
    let scanOrd_idx = 0;
    for (let i = 0; i < no_of_request - 1; i++) {
        min_dis_idx = i;
        for (let j = i + 1; j < no_of_request; j++) {
            if (requestString[min_dis_idx] >= requestString[j]) {
                min_dis_idx = j;
            }
        }
        if (min_dis_idx != i) {
            let temp = requestString[min_dis_idx];
            requestString[min_dis_idx] = requestString[i];
            requestString[i] = temp;
        }
    }
    if (dir == 1) {
        scanOrder[scanOrd_idx++] = init;
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (requestString[i] < init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
        for (let i = 0; i < no_of_request; i++) {
            if (requestString[i] >= init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
    } else {
        scanOrder[scanOrd_idx++] = init;
        for (let i = 0; i < no_of_request; i++) {
            if (requestString[i] >= init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (requestString[i] < init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
    }
    for (let i = 0; i < scanOrd_idx - 1; i++) {
        head_movements += Math.abs(scanOrder[i + 1] - scanOrder[i]);
    }
    console.log("Modifies=[ " + scanOrder.join(" ") + " ]");
    return head_movements;
}

function find_c_scan(no_of_request, requestString, init, max_c, dir) {
    let head_movements = 0;
    let scanOrder = new Array(no_of_request + 3).fill(0);
    let scanOrd_idx = 0;

    // Copy the requestString array to avoid modifying the original
    let sortedRequestString = [...requestString];

    // Sort the request strings in ascending order
    sortedRequestString.sort((a, b) => a - b);

    if (dir == 1) {
        scanOrder[scanOrd_idx++] = init;
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (sortedRequestString[i] < init) {
                scanOrder[scanOrd_idx++] = sortedRequestString[i];
            }
        }
        scanOrder[scanOrd_idx++] = 0;
        scanOrder[scanOrd_idx++] = max_c;
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (sortedRequestString[i] >= init) {
                scanOrder[scanOrd_idx++] = sortedRequestString[i];
            }
        }
    } else {
        scanOrder[scanOrd_idx++] = init;
        for (let i = 0; i < no_of_request; i++) {
            if (sortedRequestString[i] >= init) {
                scanOrder[scanOrd_idx++] = sortedRequestString[i];
            }
        }
        scanOrder[scanOrd_idx++] = max_c;
        scanOrder[scanOrd_idx++] = 0;
        for (let i = 0; i < no_of_request; i++) {
            if (sortedRequestString[i] < init) {
                scanOrder[scanOrd_idx++] = sortedRequestString[i];
            }
        }
    }

    // Calculate head movements
    for (let i = 0; i < scanOrd_idx - 1; i++) {
        head_movements += Math.abs(scanOrder[i + 1] - scanOrder[i]);
    }

    console.log("Modified=[ " + scanOrder.join(" ") + " ]");

    return head_movements-2;
}


function find_c_look(no_of_request, requestString, init, dir) {
    let head_movements = 0;
    let min_dis_idx;
    let scanOrder = [];
    let scanOrd_idx = 0;
    for (let i = 0; i < no_of_request - 1; i++) {
        min_dis_idx = i;
        for (let j = i + 1; j < no_of_request; j++) {
            if (requestString[min_dis_idx] >= requestString[j]) {
                min_dis_idx = j;
            }
        }
        if (min_dis_idx != i) {
            let temp = requestString[min_dis_idx];
            requestString[min_dis_idx] = requestString[i];
            requestString[i] = temp;
        }
    }
    if (dir == 1) {
        scanOrder[scanOrd_idx++] = init;
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (requestString[i] < init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
        for (let i = no_of_request - 1; i >= 0; i--) {
            if (requestString[i] >= init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
    } else {
        scanOrder[scanOrd_idx++] = init;
        for (let i = 0; i < no_of_request; i++) {
            if (requestString[i] >= init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
        for (let i = 0; i < no_of_request; i++) {
            if (requestString[i] < init) {
                scanOrder[scanOrd_idx++] = requestString[i];
            }
        }
    }
    for (let i = 0; i < scanOrd_idx - 1; i++) {
        head_movements += Math.abs(scanOrder[i + 1] - scanOrder[i]);
    }
    console.log("Modifies=[ " + scanOrder.join(" ") + " ]");
    return head_movements;
}

function runAlgorithms() {
    // Get input values
    const algorithm = document.getElementById('algorithm').value;
    const no_of_request = parseInt(document.getElementById('no_of_request').value);
    const requestString = document.getElementById('requestString').value.split(',').map(Number);
    const init = parseInt(document.getElementById('init').value);
    const max_c = parseInt(document.getElementById('max_c').value) || 0;
    const direction = parseInt(document.getElementById('direction').value) || 0;

    const fcfsResult = find_fcfs(no_of_request, requestString, init);
    const sstfResult = find_sstf(no_of_request, requestString, init);
    const scanResult = find_scan(no_of_request, requestString, init, max_c, direction);
    const lookResult = find_look(no_of_request, requestString, init, direction);
    const cScanResult = find_c_scan(no_of_request, requestString, init, max_c, direction);
    const cLookResult = find_c_look(no_of_request, requestString, init, direction);

    // Hide all result paragraphs
    document.getElementById('fcfsResult').style.display = 'none';
    document.getElementById('sstfResult').style.display = 'none';
    document.getElementById('scanResult').style.display = 'none';
    document.getElementById('lookResult').style.display = 'none';
    document.getElementById('cScanResult').style.display = 'none';
    document.getElementById('cLookResult').style.display = 'none';

    // Call the selected algorithm and update result
    let result = 0;
    switch (algorithm) {
        case 'fcfs':
            result = fcfsResult;
            document.getElementById('fcfsResult').innerText = `FCFS Result: ${result}`;
            document.getElementById('fcfsResult').style.display = 'block';
            break;
        case 'sstf':
            result = sstfResult;
            document.getElementById('sstfResult').innerText = `SSTF Result: ${result}`;
            document.getElementById('sstfResult').style.display = 'block';
            break;
        case 'scan':
            result = scanResult;
            document.getElementById('scanResult').innerText = `SCAN Result: ${result}`;
            document.getElementById('scanResult').style.display = 'block';
            break;
        case 'look':
            result = lookResult;
            document.getElementById('lookResult').innerText = `LOOK Result: ${result}`;
            document.getElementById('lookResult').style.display = 'block';
            break;
        case 'cScan':
            result = cScanResult;
            document.getElementById('cScanResult').innerText = `C-SCAN Result: ${result}`;
            document.getElementById('cScanResult').style.display = 'block';
            break;
        case 'cLook':
            result = cLookResult;
            document.getElementById('cLookResult').innerText = `C-LOOK Result: ${result}`;
            document.getElementById('cLookResult').style.display = 'block';
            break;
        default:
            console.error('Invalid algorithm selected');
            return;
    }
    const algorithmLabels = ['FCFS', 'SSTF', 'SCAN', 'LOOK', 'C-SCAN', 'C-LOOK'];
    const algorithmResults = [fcfsResult, sstfResult, scanResult, lookResult, cScanResult, cLookResult];

    // Create a bar chart
    const ctx = document.getElementById('algorithmChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: algorithmLabels,
            datasets: [{
                label: 'Head Movements',
                data: algorithmResults,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}