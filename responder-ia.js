console.log('✓ Auto Responder IA v2.0 ATIVADO');

const API_KEY = 'AIzaSyDyWBW6VqJyW3B4Qv4Z7K8L9M0N1O2P3Q4R'; // Chave Gemini gratuita

async function extrairQuestao() {
  console.log('🔍 Extraindo questao da página...');
  
  try {
    // Procura pelo texto da questão
    let enunciado = '';
    let alternativas = [];
    
    // Estrategia 1: Procurar por div com classe questao/enunciado
    let divQuestao = document.querySelector('[class*="questao"], [class*="enunciado"], [class*="question"]');
    if(divQuestao) {
      enunciado = divQuestao.innerText || divQuestao.textContent;
    }
    
    // Se não encontrou, procura por todo o texto antes das alternativas
    if(!enunciado) {
      let todosTextos = document.querySelectorAll('p, div, span');
      for(let i = 0; i < todosTextos.length; i++) {
        let texto = todosTextos[i].textContent;
        if(texto.length > 50 && !texto.includes('A)') && !texto.includes('B)')) {
          enunciado = texto;
          break;
        }
      }
    }
    
    // Procura pelas alternativas (A, B, C, D, E)
    let labels = document.querySelectorAll('label');
    for(let label of labels) {
      let texto = label.textContent.trim();
      if(texto.match(/^[A-E]\)/)) {
        alternativas.push(texto);
      }
    }
    
    // Se não encontrou labels, procura por divs com alternativas
    if(alternativas.length === 0) {
      let divs = document.querySelectorAll('div');
      for(let div of divs) {
        let texto = div.textContent.trim();
        if(texto.match(/^[A-E]\)/) && texto.length < 200) {
          alternativas.push(texto);
        }
      }
    }
    
    console.log('📄 Enunciado encontrado:', enunciado.substring(0, 100) + '...');
    console.log('📋 Alternativas:', alternativas);
    
    if(enunciado && alternativas.length > 0) {
      return { enunciado, alternativas };
    }
    
    return null;
  } catch(e) {
    console.error('❌ Erro ao extrair questao:', e);
    return null;
  }
}

async function pegarRespostaIA(enunciado, alternativas) {
  console.log('🧠 Consultando IA para resposta...');
  
  try {
    const prompt = `Você é um especialista em ENEM. Leia a questão abaixo e escolha a alternativa CORRETA.

Questão:
${enunciado}

Alternativas:
${alternativas.join('\n')}

Responda APENAS com a letra da alternativa correta (A, B, C, D ou E) sem explicação.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    if(!response.ok) {
      console.error('❌ Erro da API:', response.status);
      return null;
    }
    
    const data = await response.json();
    const resposta = data.candidates[0].content.parts[0].text.trim().toUpperCase();
    
    console.log('✓ Resposta da IA:', resposta);
    return resposta.charAt(0); // Retorna apenas a letra (A, B, C, D ou E)
  } catch(e) {
    console.error('❌ Erro ao consultar IA:', e);
    return null;
  }
}

async function selecionarAlternativa(letra) {
  console.log('⚙️ Selecionando alternativa:', letra);
  
  try {
    // Procura pelo label com a letra correta
    let labels = document.querySelectorAll('label');
    for(let label of labels) {
      if(label.textContent.includes(letra + ')')) {
        console.log('✓ Encontrado label:', label.textContent);
        label.click();
        
        // Também marca o input radio associado
        let radio = label.querySelector('input[type="radio"]');
        if(radio) {
          radio.click();
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        console.log('✓✓✓ ALTERNATIVA', letra, 'SELECIONADA!');
        return true;
      }
    }
    
    // Se não encontrou por label, procura por radio direto
    let radios = document.querySelectorAll('input[type="radio"]');
    let letraIndex = letra.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3, E=4
    if(radios[letraIndex]) {
      radios[letraIndex].click();
      radios[letraIndex].checked = true;
      radios[letraIndex].dispatchEvent(new Event('change', { bubbles: true }));
      console.log('✓✓✓ ALTERNATIVA', letra, 'SELECIONADA COM RADIO!');
      return true;
    }
    
    return false;
  } catch(e) {
    console.error('❌ Erro ao selecionar alternativa:', e);
    return false;
  }
}

async function responderComIA() {
  console.log('\n========== INICIANDO RESPOSTA COM IA ==========');
  
  // Extrai a questão
  const questao = await extrairQuestao();
  if(!questao) {
    console.log('⚠️ Não conseguiu extrair a questão');
    return;
  }
  
  // Consulta IA para resposta
  const letra = await pegarRespostaIA(questao.enunciado, questao.alternativas);
  if(!letra) {
    console.log('⚠️ IA não conseguiu responder');
    return;
  }
  
  // Seleciona a alternativa
  const sucesso = await selecionarAlternativa(letra);
  if(sucesso) {
    console.log('\n🎉 QUESTÃO RESPONDIDA COM SUCESSO!');
    console.log('========================================\n');
  }
}

// Executar quando a página carrega
window.addEventListener('load', function() {
  console.log('📄 Página carregada!');
  setTimeout(responderComIA, 2000);
});

// Monitorar mudanças (nova questão)
let tentativas = 0;
new MutationObserver(function() {
  tentativas++;
  if(tentativas % 5 === 0) { // A cada 5 mudanças
    console.log('🔄 Detectada mudança na página - verificando nova questão');
    responderComIA();
  }
}).observe(document.body, {
  childList: true,
  subtree: true
});

console.log('✓ Sistema pronto para responder questões com IA!');