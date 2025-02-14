        const facultySubjectMapping = {
            'OS': 'Mr.K.Swaroop',
            'SMDS': 'Dr.P.Sri Charani',
            'OT': 'Dr.P.L.R Kameswari',
            'IDS': 'Mr.Nirmal Gaud',
            'SE': 'Mrs.S.Anusha',
            'OS LAB': 'Mr.K.Swaroop',
            'DSP LAB': 'Mrs.R.Sarada',
            'FSD': 'Dr.A.Sri Krishna',
            'DT&I': 'Mr.SK M Pasha',
            'FSD LAB': 'Mrs.S.Anusha',
            'COUN': 'Department Faculty',
            'LIB': 'Library',
            'CODING':'Class Incharge'
        };

        const subjects = Object.keys(facultySubjectMapping);

        window.onload = function() {
            document.querySelectorAll('.subject-select').forEach(select => {
                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    select.appendChild(option);
                });
            });
        };
        function generateTimetable() {
    const newWindow = window.open('', '_blank');
    const style = `
        <style>
            table.faculty-table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 20px;
            }
            table.faculty-table, table.faculty-table th, table.faculty-table td {
                border: 1px solid black;
            }
            table.faculty-table th, table.faculty-table td {
                padding: 8px;
                text-align: center;
            }
            table.faculty-table caption {
                margin-bottom: 10px;
                font-size: 1.2em;
                font-weight: bold;
            }
        </style>
    `;
    newWindow.document.write(style);
    const facultyData = {};
    subjects.forEach(subject => {
        facultyData[facultySubjectMapping[subject]] = [];
    });

    const timetable = document.getElementById('main-table');
    const rows = timetable.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const day = row.querySelector('th').innerText;
        const periods = row.querySelectorAll('td select');
        periods.forEach((period, periodIndex) => {
            const subject = period.value;
            if (subject) {
                const faculty = facultySubjectMapping[subject];
                const time = getTimeForPeriod(periodIndex + 1);
                facultyData[faculty].push({ day, period: periodIndex + 1, time, subject });
            }
        });
    });
    let htmlContent = '';
    for (const [faculty, data] of Object.entries(facultyData)) {
        htmlContent += `<table class="faculty-table">`;
        htmlContent += `<caption><strong><em>${faculty}</em></strong>'s <strong><em>Timetable</em></strong></caption>`;
        htmlContent += `<tr>
            <th>Day</th>
            <th>1 (8.50-9.40 a.m)</th>
            <th>2 (9.40-10.30 a.m)</th>
            <th>3 (10.50-11.40 a.m)</th>
            <th>4 (11.40-12.30 p.m)</th>
            <th>LUNCH (12.30-1.10 p.m)</th>
            <th>5 (1.10-2.00 p.m)</th>
            <th>6 (2.00-2.50 p.m)</th>
            <th>7 (2.50-3.40 p.m)</th>
            <th>8 (3.40-4.30 p.m)</th>
        </tr>`;
        const dayRows = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        dayRows.forEach(day => {
            htmlContent += `<tr>`;
            htmlContent += `<td>${day}</td>`;
            for (let i = 0; i <= 8; i++) {
                const periodData = data.find(d => d.day === day && d.period === (i + 1));
                htmlContent += `<td>${periodData ? periodData.subject : ''}</td>`;
            }
            htmlContent += `</tr>`;
        });

        htmlContent += `</table>`;
    }
    newWindow.document.write(htmlContent);
    newWindow.document.close();
}

function getTimeForPeriod(period) {
    const times = [
        '8.50-9.40 a.m',
        '9.40-10.30 a.m',
        '10.50-11.40 a.m',
        '11.40-12.30 p.m',
        '1.10-2.00 p.m',
        '2.00-2.50 p.m',
        '2.50-3.40 p.m',
        '3.40-4.30 p.m',
    ];
    return times[period - 1] || '';
}