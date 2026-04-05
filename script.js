let categoriaAtual = "motivacao";
let contadorSessao = 0;

const bancoFrases = {
  motivacao: [
    "🔥 O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "🚀 Sua única limitação é aquela que você impõe em sua mente.",
    "💪 Não pare quando estiver cansado, pare quando tiver terminado.",
    "✨ Grandes coisas nunca vêm de zonas de conforto."
  ],
  zoeira: [
    "😂 Meu plano era ser rico, mas meu plano de dados acabou antes.",
    "🤣 Se ferrar fosse dinheiro, eu seria o Elon Musk.",
    "😎 Status: Em busca da minha dignidade perdida no final de semana."
  ],
  bomdia: [
    "🌅 Que o seu café seja forte e a sua segunda-feira seja curta!",
    "☀️ Bom dia! Hoje é um novo dia para cometer erros antigos.",
    "🌻 Acorde com determinação e durma com satisfação."
  ],
  indireta: [
    "😏 Não sou Google, mas você só me procura quando precisa.",
    "🤐 Algumas pessoas são como nuvens: quando somem, o dia fica lindo.",
    "😌 Maturidade é ver a indireta e não dar palco para o show."
  ],
  status: [
    "📱 Vivendo momentos, não apenas postando histórias.",
    "✨ Menos perfeição, mais autenticidade.",
    "🔥 Onde quer que você vá, leve sua própria luz."
  ]
};

function gerarFrase() {
  const lista = bancoFrases[categoriaAtual];
  const fraseAleatoria = lista[Math.floor(Math.random() * lista.length)];
  
  const pFrase = document.getElementById("textoFrase");
  pFrase.style.opacity = 0;
  
  setTimeout(() => {
    pFrase.innerText = fraseAleatoria;
    pFrase.style.opacity = 1;
    contarView();
  }, 150);
}

function mudarCategoria(cat, btn) {
  categoriaAtual = cat;
  document.querySelectorAll('.menu button').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  gerarFrase();
}

function contarView() {
  contadorSessao++;
  document.getElementById("views").innerText = "Lidas: " + contadorSessao;
}

function compartilhar() {
  const texto = document.getElementById("textoFrase").innerText;
  const link = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto + " \n\nEnviado por 🔥 VibeMix")}`;
  window.open(link, "_blank");
}

function salvarFavorito() {
  const texto = document.getElementById("textoFrase").innerText;
  let favs = JSON.parse(localStorage.getItem("meusFavoritos") || "[]");
  
  if (!favs.includes(texto)) {
    favs.push(texto);
    localStorage.setItem("meusFavoritos", JSON.stringify(favs));
    alert("❤️ Salva nos favoritos!");
  } else {
    alert("✨ Já está nos seus favoritos!");
  }
}

function abrirFavoritos() {
  const favs = JSON.parse(localStorage.getItem("meusFavoritos") || "[]");
  const container = document.getElementById("listaFavoritos");
  container.innerHTML = favs.length ? "" : "<p>Você ainda não salvou frases.</p>";

  favs.forEach((f, i) => {
    container.innerHTML += `
      <div class="fav-item">
        <span>${f}</span>
        <button onclick="removerFavorito(${i})">🗑️</button>
      </div>`;
  });
  document.getElementById("modalFavoritos").style.display = "flex";
}

function removerFavorito(i) {
  let favs = JSON.parse(localStorage.getItem("meusFavoritos") || "[]");
  favs.splice(i, 1);
  localStorage.setItem("meusFavoritos", JSON.stringify(favs));
  abrirFavoritos();
}

function fecharFavoritos() {
  document.getElementById("modalFavoritos").style.display = "none";
}

// Inicia com uma frase
window.onload = gerarFrase;
