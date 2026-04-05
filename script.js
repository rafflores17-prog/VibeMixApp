let categoriaAtual = "motivacao";

// ================= BANCO GRANDE =================
let frases = {

motivacao: [
"🔥 Grandes conquistas exigem disciplina diária e foco constante.",
"💪 Você é mais forte do que pensa, mais capaz do que imagina.",
"🚀 O sucesso é construído nos dias em que você não quer continuar.",
"✨ Pequenos passos hoje geram grandes resultados amanhã.",
"🌟 Continue mesmo cansado, mas nunca desista.",
"🔥 Nada muda se você não mudar.",
"💡 Você não precisa ser perfeito, só precisa começar.",
"🏆 A vitória pertence a quem persiste."
],

zoeira: [
"😂 Eu não sou preguiçoso, estou em modo economia de energia.",
"🤣 Trabalhar não mata, mas pra que arriscar?",
"😎 Minha cama me entende melhor que muita gente.",
"😂 Eu tentando ser fitness, mas o lanche me ama.",
"🤣 Hoje eu tô tipo Wi-Fi ruim: sem conexão com nada."
],

bomdia: [
"🌅 Bom dia! Que seu dia seja leve e cheio de coisas boas.",
"☀️ Acorda pra vencer hoje!",
"🌻 Que hoje seja melhor que ontem.",
"🙏 Gratidão por mais um dia.",
"✨ Comece o dia com energia positiva."
],

indireta: [
"😏 Nem tudo que parece é… e nem todo mundo é de verdade.",
"👀 Tem gente que muda quando precisa.",
"🤐 Ficar quieto às vezes é a melhor resposta.",
"😌 Eu observo tudo em silêncio.",
"🔥 A verdade sempre aparece."
]

};

// ================= API =================
async function pegarFraseOnline(){
  try {
    let res = await fetch("https://type.fit/api/quotes");
    let data = await res.json();
    let random = data[Math.floor(Math.random() * data.length)];
    return "✨ " + random.text;
  } catch {
    return null;
  }
}

// ================= GERAR =================
async function gerarFrase(){

  let online = await pegarFraseOnline();

  if(online){
    document.getElementById("textoFrase").innerText = online;
    salvarView();
    return;
  }

  let lista = frases[categoriaAtual];
  let random = lista[Math.floor(Math.random() * lista.length)];

  document.getElementById("textoFrase").innerText = random;

  salvarView();
}

// ================= WHATS =================
function compartilhar(){
  let texto = document.getElementById("textoFrase").innerText;
  let url = "https://wa.me/?text=" + encodeURIComponent(texto);
  window.open(url, "_blank");
}

// ================= FAVORITOS =================
function salvarFavorito(){
  let texto = document.getElementById("textoFrase").innerText;

  let fav = JSON.parse(localStorage.getItem("favoritos") || "[]");

  if(!fav.includes(texto)){
    fav.push(texto);
  }

  localStorage.setItem("favoritos", JSON.stringify(fav));

  alert("Salvo ❤️");
}

// ================= VIEWS =================
function salvarView(){
  let views = localStorage.getItem("views") || 0;
  views++;
  localStorage.setItem("views", views);

  document.getElementById("views").innerText = "🔥 " + views + " visualizações";
}

// ================= CATEGORIA =================
function mudarCategoria(cat){
  categoriaAtual = cat;
  gerarFrase();
}

// ================= INIT =================
window.onload = () => {
  gerarFrase();
};
