
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

    const listaBoletins = document.getElementById('listaBoletins');

    function exibirBoletins() {
      listaBoletins.innerHTML = '';
      const boletins = JSON.parse(localStorage.getItem('boletins')) || [];

      if (boletins.length === 0) {
        listaBoletins.innerHTML = '<p class="sem-boletins">Nenhum boletim encontrado.</p>';
        return;
      }

      boletins.forEach((boletim, index) => {
        const div = document.createElement('div');
        div.className = 'boletim';
        div.innerHTML = `
          <strong>#${index + 1}</strong>
          <strong>Aluno:</strong> ${boletim.aluno}
          <strong>Disciplina:</strong> ${boletim.disciplina}
          <strong>Notas:</strong>
          <ul>
            ${boletim.notas.map((n, i) => `<li>Nota ${i + 1}: ${n}</li>`).join('')}
          </ul>
          <strong>Média Final:</strong> ${boletim.media}
          <strong>Status:</strong> ${boletim.status}
          <strong>Registrado em:</strong> ${boletim.data}
        `;
        listaBoletins.appendChild(div);
      });
    }

    function limparHistorico() {
      const confirmar = confirm('Tem certeza que deseja apagar todos os boletins?');
      if (confirmar) {
        localStorage.removeItem('boletins');
        exibirBoletins();
      }
    }

    function exportarPDF() {
      const element = document.getElementById('listaBoletins');
      const opt = {
        margin:       0.5,
        filename:     'boletins_escolares.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    }

    // Carrega boletins ao iniciar
    exibirBoletins();
