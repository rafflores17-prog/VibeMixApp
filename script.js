let categoriaAtual = "motivacao";

let frases = {

motivacao: [
"🔥 Grandes conquistas exigem persistência diária.",
"💪 Você é mais forte do que imagina.",
"🚀 O sucesso nasce da disciplina.",
"✨ Continue mesmo sem motivação.",
"🌟 Tudo começa com um passo."
],

zoeira: [
"😂 Eu não sou preguiçoso, estou no modo economia de energia.",
"🤣 Trabalhar? Só se for deitado.",
"😎 A vida tá difícil, mas eu tô mais ainda.",
"😂 Se conselho fosse bom, vendia.",
"🤣 Eu tentando ser fitness, mas o lanche me ama."
],

bomdia: [
"🌅 Bom dia! Que seu dia seja leve e cheio de coisas boas.",
"☀️ Acorda pra vencer hoje!",
"🌻 Que hoje seja melhor que ontem.",
"🙏 Gratidão por mais um dia.",
"✨ Comece o dia com energia positiva."
],

indireta: [
"😏 Engraçado como muda quando precisa.",
"👀 Nem tudo é como parece.",
"🤐 Melhor ficar quieto mesmo.",
"😌 Eu observo tudo em silêncio.",
"🔥 A verdade sempre aparece."
]

};

function mudarCategoria(cat){
  categoriaAtual = cat;
  gerarFrase();
}

function gerarFrase(){
  let lista = frases[categoriaAtual];
  let random = lista[Math.floor(Math.random() * lista.length)];

  document.getElementById("textoFrase").innerText = random;
}

function compartilhar(){
  let texto = document.getElementById("textoFrase").innerText;

  if(navigator.share){
    navigator.share({ text: texto });
  } else {
    navigator.clipboard.writeText(texto);
    alert("Copiado!");
  }
}
