// ================= CONFIG =================
let categoriaAtual = "motivacao";

// ================= BANCO GRANDE =================
let frases = {

motivacao: [
"🔥 Grandes conquistas exigem disciplina diária e foco constante.",
"💪 Você é mais forte do que pensa, mais capaz do que imagina.",
"🚀 O sucesso é construído nos dias em que você não quer continuar.",
"✨ Pequenos passos hoje geram grandes resultados amanhã.",
"🌟 Continue mesmo cansado, mas nunca desista."
],

zoeira: [
"😂 Eu não sou preguiçoso, só economizo energia.",
"🤣 Trabalhar não mata, mas pra que arriscar?",
"😎 Minha cama me entende melhor que muita gente.",
"😂 Hoje eu tô tipo Wi-Fi ruim: sem conexão com nada.",
"🤣 Eu tentando ser fitness… mas o lanche não deixa."
],

bomdia: [
"🌅 Bom dia! Que seu dia seja leve, produtivo e cheio de coisas boas.",
"☀️ Acorda com fé que hoje é dia de vitória!",
"🌻 Que seu dia seja iluminado e cheio de paz.",
"🙏 Mais um dia, mais uma chance de vencer.",
"✨ Comece o dia acreditando que tudo pode dar certo."
],

indireta: [
"😏 Nem tudo que parece é… e nem todo mundo é de verdade.",
"👀 Tem gente que muda quando precisa… curioso né?",
"🤐 Ficar quieto às vezes é a melhor resposta.",
"😌 Eu observo tudo, só não falo nada.",
"🔥 A verdade sempre aparece, cedo ou tarde."
]

};

// ================= FRASES ONLINE =================
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

// ================= GERAR FRASE =================
async function gerarFrase(){

  // tenta API
  let online = await pegarFraseOnline();

  if(online){
    document.getElementById("textoFrase").innerText = online;
    salvarView();
    return;
  }

  // fallback local
  let lista = frases[categoriaAtual];
  let random = lista[Math.floor(Math.random() * lista.length)];

  document.getElementById("textoFrase").innerText = random;

  salvarView();
}

// ================= COMPARTILHAR =================
function compartilhar(){
  let texto = document.getElementById("textoFrase").innerText;

  let url = "https://wa.me/?text=" + encodeURIComponent(texto);

  window.open(url, "_blank");
}

// ================= FAVORITOS =================
function salvarFavorito(){
  let texto = document.getElementById("textoFrase").innerText;

  let fav = JSON.parse(localStorage.getItem("favoritos") || "[]");

  fav.push(texto);

  localStorage.setItem("favoritos", JSON.stringify(fav));

  alert("Salvo nos favoritos ❤️");
}

// ================= CONTADOR =================
function salvarView(){
  let views = localStorage.getItem("views") || 0;
  views++;
  localStorage.setItem("views", views);

  document.getElementById("views").innerText = "🔥 " + views + " visualizações";
}

// ================= TROCAR CATEGORIA =================
function mudarCategoria(cat){
  categoriaAtual = cat;
  gerarFrase();
}

// ================= INICIAR =================
window.onload = () => {
  gerarFrase();
};
