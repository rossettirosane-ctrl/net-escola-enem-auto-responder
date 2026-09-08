console.log('✓ Responder ativado - Versao 3.0');

function responderQuestao() {
  console.log('🔍 Procurando questao...');
  
  // Estrategia 1: Encontrar input radio e clicar
  var radios = document.querySelectorAll('input[type="radio"]');
  if(radios.length > 0) {
    console.log('✓ Encontrado ' + radios.length + ' radio(s)');
    radios[0].click();
    radios[0].checked = true;
    
    // Dispara evento de mudança
    var event = new Event('change', { bubbles: true });
    radios[0].dispatchEvent(event);
    
    console.log('✓✓✓ RESPONDIDO COM RADIO!');
    return true;
  }
  
  // Estrategia 2: Procurar pelo label pai do radio
  var labels = document.querySelectorAll('label');
  for(var i = 0; i < labels.length; i++) {
    if(labels[i].textContent.includes('A)') || labels[i].textContent.includes('16')) {
      console.log('✓ Encontrado label com alternativa');
      labels[i].click();
      console.log('✓✓✓ RESPONDIDO COM LABEL!');
      return true;
    }
  }
  
  // Estrategia 3: Procurar por div com classe que contenha radio
  var divs = document.querySelectorAll('div[class*="option"], div[class*="answer"], div[class*="radio"]');
  for(var i = 0; i < divs.length; i++) {
    if(divs[i].offsetHeight > 0) {
      console.log('✓ Encontrado div com opcao');
      divs[i].click();
      console.log('✓✓✓ RESPONDIDO COM DIV!');
      return true;
    }
  }
  
  // Estrategia 4: Procurar botoes "Verificar" ou "Enviar"
  var botoes = document.querySelectorAll('button');
  for(var i = 0; i < botoes.length; i++) {
    var texto = botoes[i].textContent.toLowerCase();
    if(texto.includes('verificar') || texto.includes('enviar') || texto.includes('proximo')) {
      console.log('✓ Encontrado botao: ' + botoes[i].textContent);
      botoes[i].click();
      console.log('✓✓✓ RESPONDIDO COM BOTAO!');
      return true;
    }
  }
  
  console.log('⚠ Nenhuma questao encontrada');
  return false;
}

// Executar quando a página carrega
console.log('⏳ Aguardando 1 segundo...');
setTimeout(responderQuestao, 1000);

// Monitorar mudanças na página
var tentativas = 0;
var observer = new MutationObserver(function() {
  tentativas++;
  if(tentativas > 50) {
    console.log('Limite de tentativas atingido');
    return;
  }
  console.log('🔄 Mudança detectada - tentativa ' + tentativas);
  responderQuestao();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

console.log('👀 Observer iniciado');