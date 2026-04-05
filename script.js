// NAVEGAÇÃO
function abrir(id){
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
}

function voltar(){
  abrir('home');
}

// FRASES
let frases = [
  "Você é mais forte do que imagina.",
  "Tudo pode mudar em um dia.",
  "Confie no seu processo.",
  "Grandes coisas levam tempo.",
  "Continue, mesmo sem motivação.",
  "Você já venceu muita coisa até aqui."
];

let ultimaFrase = "";

function gerarFrase(){
  let nova;

  do {
    nova = frases[Math.floor(Math.random() * frases.length)];
  } while(nova === ultimaFrase);

  ultimaFrase = nova;

  document.getElementById("textoFrase").innerText = nova;
}

function copiarFrase(){
  let texto = document.getElementById("textoFrase").innerText;
  navigator.clipboard.writeText(texto);
  alert("Frase copiada!");
}

// SORTE DO DIA
let sortes = [
  "Hoje será um dia incrível.",
  "Uma surpresa está chegando.",
  "Algo bom vai acontecer.",
  "Evite decisões impulsivas hoje.",
  "Alguém pensa em você."
];

function gerarSorte(){
  let hoje = new Date().toDateString();
  let salva = localStorage.getItem("sorte_"+hoje);

  if(!salva){
    salva = sortes[Math.floor(Math.random() * sortes.length)];
    localStorage.setItem("sorte_"+hoje, salva);
  }

  document.getElementById("textoSorte").innerText = salva;
}
