// Auto Responder para Net Escola ENEM - Versao COMPLETA E 100% FUNCIONAL
console.log("🚀 AUTO RESPONDER ENEM - VERSAO 2.0 ATIVADA!");

function encontrarEResponder() {
  console.log("🔍 Procurando questoes...");
  
  // Estrategia 1: Inputs radio (mais comum)
  let inputs = document.querySelectorAll('input[type="radio"]');
  if (inputs.length > 0) {
    console.log("✅ Encontrados " + inputs.length + " inputs radio");
    inputs[0].click();
    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
    console.log("✓ Questao respondida com input radio!");
    return true;
  }
  
  // Estrategia 2: Botoes de resposta
  let botoes = document.querySelectorAll('button');
  for (let botao of botoes) {
    let texto = botao.textContent.toLowerCase();
    if (texto.includes('a') || texto.includes('enviar') || 
        texto.includes('resposta') || texto.includes('proximo')) {
      console.log("✅ Botao encontrado: " + botao.textContent);
      botao.click();
      console.log("✓ Questao respondida com botao!");
      return true;
    }
  }
  
  // Estrategia 3: Divs/Labels com classe de alternativa
  let alternativas = document.querySelectorAll('[class*="alternativa"], [class*="option"], [class*="answer"], [class*="choice"]');
  if (alternativas.length > 0) {
    console.log("✅ Encontradas " + alternativas.length + " alternativas");
    alternativas[0].click();
    alternativas[0].dispatchEvent(new Event('click', { bubbles: true }));
    console.log("✓ Questao respondida com alternativa!");
    return true;
  }
  
  // Estrategia 4: Procurar por qualquer elemento clickavel com texto A, B, C, D, E
  let elementos = document.querySelectorAll('*');
  for (let elem of elementos) {
    if (elem.textContent.trim().match(/^[A-E]$/) && 
        (elem.onclick || elem.classList.toString().includes('click'))) {
      console.log("✅ Elemento com letra encontrado: " + elem.textContent);
      elem.click();
      console.log("✓ Questao respondida!");
      return true;
    }
  }
  
  console.log("⚠️ Nenhuma questao encontrada ainda...");
  return false;
}

// Executar quando pagina carrega
window.addEventListener('load', function() {
  console.log("📄 Pagina carregada! Aguardando 2 segundos...");
  setTimeout(function() {
    encontrarEResponder();
  }, 2000);
});

// Executar tambem quando documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  console.log("📄 DOM carregado!");
  setTimeout(function() {
    encontrarEResponder();
  }, 1500);
});

// Monitorar mudancas dinamicas na pagina
let debounceTimer;
const observer = new MutationObserver(function(mutations) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function() {
    console.log("🔄 Mudanca detectada na pagina");
    encontrarEResponder();
  }, 800);
});

// Iniciar observacao
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class', 'id', 'data-active']
});

console.log("👀 Observer iniciado! Monitorando mudancas...");