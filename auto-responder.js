// Auto responder para Net Escola ENEM

function responderQuestao() {
  // Procura por buttons de resposta
  const botoes = document.querySelectorAll('button[class*="btn"], button[class*="answer"], input[type="radio"]');
  
  if (botoes.length > 0) {
    console.log('✓ Questao encontrada! Respondendo...');
    // Clica no primeiro botao/input
    botoes[0].click();
  }
}

// Executa quando a pagina carrega
window.addEventListener('load', function() {
  console.log('Net Escola carregado!');
  setTimeout(responderQuestao, 500);
});

// Tambem monitora mudancas dinamicas
const observer = new MutationObserver(responderQuestao);
observer.observe(document.body, { childList: true, subtree: true });
