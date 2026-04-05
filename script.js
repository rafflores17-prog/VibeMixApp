let categoriaAtual = "motivacao";

// BANCO DE FRASES (Pode adicionar quantas quiser)
let frases = {
  motivacao: [
    "🔥 Grandes conquistas exigem disciplina diária e foco constante.",
    "💪 Você é mais forte do que pensa, mais capaz do que imagina.",
    "🚀 O sucesso é construído nos dias em que você não quer continuar.",
    "✨ Pequenos passos hoje geram grandes resultados amanhã.",
    "🏆 A vitória pertence a quem persiste."
  ],
  zoeira: [
    "😂 Eu não sou preguiçoso, estou em modo economia de energia.",
    "🤣 Trabalhar não mata, mas pra que arriscar?",
    "😎 Minha cama me entende melhor que muita gente.",
    "🤣 Hoje eu tô tipo Wi-Fi ruim: sem conexão com nada."
  ],
  bomdia: [
    "🌅 Bom dia! Que seu dia seja leve e cheio de coisas boas.",
    "☀️ Acorda pra vencer hoje!",
    "🌻 Que hoje seja melhor que ontem."
  ],
  indireta: [
    "😏 Nem tudo que parece é… e nem todo mundo é de verdade.",
    "👀 Tem gente que muda quando precisa.",
    "🤐 Ficar quieto às vezes é a melhor resposta."
  ]
};

// GERAR FRASE (Corrigido para não travar)
function gerarFrase() {
  let lista = frases[categoriaAtual];
  let random = lista[Math.floor(Math.random() * lista.length)];
  
  // Animação suave na troca de frase
  let elementoTexto = document.getElementById("textoFrase");
  elementoTexto.style.opacity = 0;
  
  setTimeout(() => {
    elementoTexto.innerText = random;
    elementoTexto.style.opacity = 1;
  }, 200);

  atualizarView();
}

// ATUALIZAR CATEGORIA
function mudarCategoria(cat, elementoBotao) {
  categoriaAtual = cat;
  
  // Atualiza o visual do menu
  let botoes = document.querySelectorAll(".menu button");
  botoes.forEach(b => b.classList.remove("ativo"));
  elementoBotao.classList.add("ativo");

  gerarFrase();
}

// COMPARTILHAR WHATSAPP
function compartilhar() {
  let texto = document.getElementById("textoFrase").innerText;
  // Dica Web2App: Algumas WebViews exigem intent:// em vez de https://wa.me/
  let url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(texto);
  window.open(url, "_blank");
}

// FAVORITOS: SALVAR
function salvarFavorito() {
  let texto = document.getElementById("textoFrase").innerText;
  let fav = JSON.parse(localStorage.getItem("favoritos") || "[]");

  if (!fav.includes(texto)) {
    fav.push(texto);
    localStorage.setItem("favoritos", JSON.stringify(fav));
    alert("Frase salva nos favoritos! ❤️");
  } else {
    alert("Você já favoritou essa frase! 😉");
  }
}

// FAVORITOS: ABRIR E LISTAR
function abrirFavoritos() {
  let fav = JSON.parse(localStorage.getItem("favoritos") || "[]");
  let listaHtml = "";

  if (fav.length === 0) {
    listaHtml = "<p style='color:#ccc; font-size:14px;'>Nenhum favorito salvo ainda.</p>";
  } else {
    fav.forEach((f, index) => {
      listaHtml += `
        <div class="fav-item">
          <p>${f}</p>
          <button onclick="removerFavorito(${index})">❌</button>
        </div>
      `;
    });
  }

  document.getElementById("listaFavoritos").innerHTML = listaHtml;
  document.getElementById("modalFavoritos").style.display = "flex";
}

// FAVORITOS: REMOVER
function removerFavorito(index) {
  let fav = JSON.parse(localStorage.getItem("favoritos") || "[]");
  fav.splice(index, 1);
  localStorage.setItem("favoritos", JSON.stringify(fav));
  abrirFavoritos(); // Atualiza a lista na hora
}

// FAVORITOS: FECHAR
function fecharFavoritos() {
  document.getElementById("modalFavoritos").style.display = "none";
}

// CONTADOR DE VIEWS (Contagem de frases lidas na sessão)
let viewsSessao = 0;
function atualizarView() {
  viewsSessao++;
  document.getElementById("views").innerText = "Lidas hoje: " + viewsSessao;
}

// INICIAR
window.onload = () => {
  gerarFrase();
};
