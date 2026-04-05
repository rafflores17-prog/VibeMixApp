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
    "😎 Status: Em busca da minha dignidade perdida."
  ],
  bomdia: [
    "🌅 Que o seu café seja forte e a sua determinação maior ainda!",
    "☀️ Bom dia! Hoje é um novo dia para brilhar.",
    "🌻 Acorde com gratidão e o resto acontece."
  ],
  indireta: [
    "😏 Não sou Google, mas você só me procura quando precisa.",
    "🤐 Algumas pessoas são como nuvens: quando somem, o dia clareia.",
    "😌 Maturidade é ignorar o que não te acrescenta."
  ],
  status: [
    "📱 Vivendo momentos, não apenas postando stories.",
    "✨ Menos padrão, mais essência.",
    "🔥 Brilhe sem precisar apagar a luz de ninguém."
  ]
};

// Gera a frase com efeito suave
function gerarFrase() {
  const lista = bancoFrases[categoriaAtual];
  const fraseAleatoria = lista[Math.floor(Math.random() * lista.length)];
  const pFrase = document.getElementById("textoFrase");
  
  pFrase.style.opacity = 0;
  setTimeout(() => {
    pFrase.innerText = fraseAleatoria;
    pFrase.style.opacity = 1;
    contadorSessao++;
    document.getElementById("views").innerText = "Lidas: " + contadorSessao;
  }, 200);
}

function mudarCategoria(cat, btn) {
  categoriaAtual = cat;
  document.querySelectorAll('.menu button').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  gerarFrase();
}

// CORREÇÃO DO WHATSAPP AQUI
function compartilhar() {
  const frase = document.getElementById("textoFrase").innerText;
  const linkApp = "https://fflores17-prog.github.io/VibeMix/"; // Seu link
  
  // Formatação limpa para o WhatsApp
  const mensagem = `*VibeMix:* \n\n"${frase}"\n\nVeja mais no app: ${linkApp}`;
  
  // Codifica para evitar erros de caracteres estranhos
  const msgFinal = encodeURIComponent(mensagem);
  
  // Tenta abrir o protocolo direto do app primeiro
  window.location.href = `whatsapp://send?text=${msgFinal}`;
}

function salvarFavorito() {
  const texto = document.getElementById("textoFrase").innerText;
  let favs = JSON.parse(localStorage.getItem("vibemix_favs") || "[]");
  
  if (!favs.includes(texto)) {
    favs.push(texto);
    localStorage.setItem("vibemix_favs", JSON.stringify(favs));
    alert("❤️ Salva nos favoritos!");
  } else {
    alert("✨ Já está salva!");
  }
}

function abrirFavoritos() {
  const favs = JSON.parse(localStorage.getItem("vibemix_favs") || "[]");
  const container = document.getElementById("listaFavoritos");
  container.innerHTML = favs.length ? "" : "<p style='color:#666'>Nada salvo ainda...</p>";

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
  let favs = JSON.parse(localStorage.getItem("vibemix_favs") || "[]");
  favs.splice(i, 1);
  localStorage.setItem("vibemix_favs", JSON.stringify(favs));
  abrirFavoritos();
}

function fecharFavoritos() {
  document.getElementById("modalFavoritos").style.display = "none";
}

window.onload = gerarFrase;
