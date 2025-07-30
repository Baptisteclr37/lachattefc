const select = document.getElementById('journee-select');
const output = document.getElementById('output');

function chargerCSV(gid) {
  const url = 'https://corsproxy.io/?https://docs.google.com/spreadsheets/d/e/2PACX-1vSuc-XJn1YmTCl-5WtrYeOKBS8nfTnRsFCfeNMRvzJcbavfGIX9SUSQdlZnVNPQtapcgr2m4tAwYznB/pub?gid=' + gid + '&single=true&output=csv';

  Papa.parse(url, {
    download: true,
    header: false,
    complete: function(results) {
      const data = results.data;
      output.innerHTML = '';
      let html = '<table>';
      data.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
          html += '<td>' + cell.replace(/\((\d+)pt\)/g, '<br>($1pt)') + '</td>';
        });
        html += '</tr>';
      });
      html += '</table>';
      output.innerHTML = html;
    },
    error: function(err) {
      output.textContent = 'Erreur : ' + err.message;
    }
  });
}

select.addEventListener('change', () => {
  chargerCSV(select.value);
});

// Chargement initial
chargerCSV(select.value);
