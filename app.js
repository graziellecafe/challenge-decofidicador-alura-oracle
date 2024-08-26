//* função para exibir textos de saída 
const exibirTextoSaida = (tag, texto) => {
  const textoSaida = document.querySelector(tag);
  textoSaida.innerHTML = texto;       
}

const output = () => {
  document.getElementById("coffee-img").style.display = "none";
  exibirTextoSaida("h3", " " );
  
  const copiarTexto = document.getElementById("botaoCopiar");
  copiarTexto.style.visibility = "visible";
  copiarTexto.style.pointerEvents = "auto";

  document.getElementById("textoOutput").style.visibility = "visible";
}

const removerDiacriticos = (str) => {
  return str
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-zA-Z\s]/g, "");
}

const criptografar = () => {
  const inputTexto = document.querySelector("#inputTexto").value;

  if (inputTexto.trim() != ""){
      const textoCriptografado = removerDiacriticos(inputTexto.toLowerCase())
              .replace(/e/g, "enter")
              .replace(/i/g, "imes")
              .replace(/a/g, "ai")
              .replace(/o/g, "ober")
              .replace(/u/g, "ufat");
          
          exibirTextoSaida("h2", textoCriptografado);
          output();

          document.getElementById("inputTexto").value = ""; 
  } else {
      alert("Digite um texto válido para ser criptografado.")
      return 1;
  }
}

const descriptografar = () => {
  const inputTexto = document.querySelector("#inputTexto").value;

  if (inputTexto.trim() != ""){
      const textoDescriptografado = inputTexto.toLowerCase()
              .replace(/enter/g, "e")
              .replace(/imes/g, "i")
              .replace(/ai/g, "a")
              .replace(/ober/g, "o")
              .replace(/ufat/g, "u");
          
          exibirTextoSaida("h2", textoDescriptografado);
          output();

          document.getElementById("inputTexto").value = ""; 
  } else {
      alert("Digite um texto válido para ser descriptografado")
      return 1;
  }
}

const botaoCopiarTexto = async () => {
  const textoCopiado = document.getElementById("textoOutput").innerText;

  try {
      await navigator.clipboard.writeText(textoCopiado);
      document.getElementById("textoOutput").innerText = "";
      document.getElementById("textoOutput").style.visibility = "hidden";
      alert("Copiado para área de transferência.");
      location.reload();
  } catch (err) {
      console.error("Erro ao copiar o texto: ", err);
      alert("Erro ao copiar o texto");
  }
}

document.getElementById("btnCriptografar").addEventListener("click", criptografar);
document.getElementById("btnDescriptografar").addEventListener("click", descriptografar);
document.getElementById("botaoCopiar").addEventListener("click", botaoCopiarTexto);
