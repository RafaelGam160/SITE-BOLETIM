let notas = [];

function adicionarNota() {
  const nome = document.getElementById('nomeAluno').value;
  const disciplina = document.getElementById('disciplina').value;
  const nota = parseFloat(document.getElementById('nota').value);

  if (!nome || !disciplina || isNaN(nota)) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  notas.push(nota);

  // Mostrar resultado
  document.getElementById('resAluno').textContent = nome;
  document.getElementById('resDisciplina').textContent = disciplina;

  const listaNotas = document.getElementById('listaNotas');
  listaNotas.innerHTML = '';
  notas.forEach((n, i) => {
    const li = document.createElement('li');
    li.textContent = `Nota ${i + 1}: ${n}`;
    listaNotas.appendChild(li);
  });

  const media = notas.reduce((a, b) => a + b, 0) / notas.length;
  document.getElementById('mediaFinal').textContent = media.toFixed(2);
  document.getElementById('statusFinal').textContent = media >= 6 ? 'Aprovado ✅' : 'Reprovado ❌';

  document.getElementById('resultado').style.display = 'block';
}

function reiniciarBoletim() {
  document.getElementById('boletimForm').reset();
  document.getElementById('resultado').style.display = 'none';
  document.getElementById('listaNotas').innerHTML = '';
  notas = [];
}

function enviarParaOutraPagina() {
  const nome = document.getElementById('nomeAluno').value;
  const disciplina = document.getElementById('disciplina').value;

  if (!nome || !disciplina || notas.length === 0) {
    alert('Preencha os dados e adicione pelo menos uma nota!');
    return;
  }

  const media = notas.reduce((a, b) => a + b, 0) / notas.length;
  const status = media >= 6 ? 'Aprovado ✅' : 'Reprovado ❌';

  const boletim = {
    aluno: nome,
    disciplina: disciplina,
    notas: [...notas],
    media: media.toFixed(2),
    status: status,
    data: new Date().toLocaleString()
  };

  const boletins = JSON.parse(localStorage.getItem('boletins')) || [];
  boletins.push(boletim);
  localStorage.setItem('boletins', JSON.stringify(boletins));

  window.location.href = 'pagina2.html';
}


