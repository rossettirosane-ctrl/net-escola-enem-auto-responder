// Auto Responder para Net Escola ENEM - VERSAO 2.0 COMPLETA
console.log('🚀 AUTO RESPONDER ENEM v2.0 ATIVADO!');

const CONFIG = {
  maxTentativas: 5,
  delayInicial: 1000,
  delayMutacao: 800,
  tentativaAtual: 0
};

function encontrarEResponder() {
  CONFIG.tentativaAtual++;
  console.log(`🔍 Tentativa ${CONFIG.tentativaAtual} de encontrar questao...`);

  // Estrategia 1: Inputs radio
  let inputs = document.querySelectorAll('input[type="radio"]');
  if (inputs.length > 0) {
    console.log(`✅ ENCONTRADO: ${inputs.length} input(s) radio`);
    inputs[0].click();
    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
    console.log('✓✓✓ QUESTAO RESPONDIDA COM INPUT RADIO!');
    CONFIG.tentativaAtual = 0;
    return true;
  }

  // Estrategia 2: Buttons
  let botoes = document.querySelectorAll('button');
  for (let botao of botoes) {
    let texto = botao.textContent.toLowerCase().trim();
    if (texto.includes('a') || texto.includes('enviar') || 
        texto.includes('resposta') || texto === 'a') {
      console.log(`✅ ENCONTRADO: Botao "${botao.textContent}"`);
      botao.click();
      botao.dispatchEvent(new Event('click', { bubbles: true }));
      console.log('✓✓✓ QUESTAO RESPONDIDA COM BOTAO!');
      CONFIG.tentativaAtual = 0;
      return true;
    }
  }

  // Estrategia 3: Divs/Labels com classe alternativa
  let alternativas = document.querySelectorAll(
    '[class*="alternativa"], [class*="option"], [class*="answer"], [class*="choice"], [class*="resposta"]'
  );
  if (alternativas.length > 0) {
    console.log(`✅ ENCONTRADO: ${alternativas.length} elemento(s) alternativa`);
    for (let alt of alternativas) {
      if (alt.offsetHeight > 0) { // Verifica se é visivel
        alt.click();
        alt.dispatchEvent(new Event('click', { bubbles: true }));
        console.log('✓✓✓ QUESTAO RESPONDIDA COM ALTERNATIVA!');
        CONFIG.tentativaAtual = 0;
        return true;
      }
    }
  }

  // Estrategia 4: Procurar por labels
  let labels = document.querySelectorAll('label');
  for (let label of labels) {
    if (label.textContent.trim().match(/^[A-E]\)/)) {
      console.log(`✅ ENCONTRADO: Label com "${label.textContent}"`);
      label.click();
      label.dispatchEvent(new Event('click', { bubbles: true }));
      console.log('✓✓✓ QUESTAO RESPONDIDA COM LABEL!');
      CONFIG.tentativaAtual = 0;
      return true;
    }
  }

  // Estrategia 5: Procurar por data-attributes
  let comData = document.querySelectorAll('[data-answer], [data-option], [data-alternative]');
  if (comData.length > 0) {
    console.log(`✅ ENCONTRADO: ${comData.length} elemento(s) com data-attribute`);
    comData[0].click();
    comData[0].dispatchEvent(new Event('click', { bubbles: true }));
    console.log('✓✓✓ QUESTAO RESPONDIDA COM DATA-ATTRIBUTE!');
    CONFIG.tentativaAtual = 0;
    return true;
  }

  // Se nao encontrou
  if (CONFIG.tentativaAtual < CONFIG.maxTentativas) {
    console.log(`⏳ Nenhuma questao encontrada. Tentando novamente em ${CONFIG.delayMutacao}ms...`);
    return false;
  } else {
    console.log('⚠️ Atingiu limite de tentativas.');
    CONFIG.tentativaAtual = 0;
    return false;
  }
}

// Executar quando pagina carrega
window.addEventListener('load', function() {
  console.log('📄 PAGINA CARREGADA!');
  setTimeout(function() {
    encontrarEResponder();
  }, CONFIG.delayInicial);
});

// Executar quando DOM esta pronto
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM CARREGADO!');
  setTimeout(function() {
    encontrarEResponder();
  }, CONFIG.delayInicial / 2);
});

// Monitorar mudancas dinamicas
let debounceTimer;
const observer = new MutationObserver(function(mutations) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function() {
    console.log('🔄 MUDANCA DETECTADA NA PAGINA');
    encontrarEResponder();
  }, CONFIG.delayMutacao);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

console.log('👀 OBSERVER INICIADO! MONITORANDO PAGINA...');

// Log de debug
console.log('===============================');
console.log('AUTO RESPONDER ENEM PRONTO!');
console.log('===============================');
console.log('Procurando por:');
console.log('  - Input Radio');
console.log('  - Buttons');
console.log('  - Alternativas/Options');
console.log('  - Labels');
console.log('  - Data-attributes');
console.log('===============================');