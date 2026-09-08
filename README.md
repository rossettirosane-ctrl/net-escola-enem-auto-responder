# 🎓 Auto Responder ENEM v2.0

**Extensão Chrome que responde AUTOMATICAMENTE questões do ENEM no Net Escola**

## ⚡ Como Instalar (Passo a Passo)

### 1️⃣ Clonar/Baixar
```bash
git clone https://github.com/rossettirosane-ctrl/net-escola-enem-auto-responder.git
```
Ou baixe o ZIP: https://github.com/rossettirosane-ctrl/net-escola-enem-auto-responder

### 2️⃣ Abrir Chrome Extensions
- Abra o Chrome
- Digite na barra: `chrome://extensions/`
- Pressione Enter

### 3️⃣ Ativar Modo Desenvolvedor
- Canto superior direito: **"Modo de desenvolvedor"**
- Clique para **ativar** (fica azul)

### 4️⃣ Carregar Extensão
- Clique em **"Carregar extensão não empacotada"**
- Selecione a **PASTA** do projeto
- ✅ Pronto!

## 🚀 Como Usar

1. Abra o **Net Escola**: https://www.netescola.com.br
2. Clique em uma **questão do ENEM**
3. **Aguarde 2 segundos**
4. A questão será respondida **AUTOMATICAMENTE** ⚡

## 📋 Arquivos da Extensão

```
.
├── manifest.json          ✅ Configuração principal
├── auto-responder.js      ✅ Script que responde
├── background.js          ✅ Serviço em background
├── README.md              ✅ Este arquivo
└── icons/                 ✅ Ícones da extensão
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## 🔍 Debugar (Se não funcionar)

1. Abra a questão no Net Escola
2. Pressione **F12** (DevTools)
3. Vá em **Console**
4. Procure por mensagens como:
   - `✅ ENCONTRADO`
   - `✓✓✓ QUESTAO RESPONDIDA`
   - Se não aparecer, a estrutura do site mudou

## ⚠️ IMPORTANTE

> ⚠️ **AVISO LEGAL**
> - Use apenas para **estudar**
> - Verifique os **Termos de Serviço** do Net Escola
> - Confirme com seu **professor/orientador**
> - Uso indevido pode resultar em **suspensão**

## 🆘 Problemas?

### Extensão não carrega
- Verifique se o `manifest.json` está correto
- Certifique-se de ter ativado "Modo de desenvolvedor"
- Recarregue a página (F5)

### Questão não é respondida
- Abra o Console (F12)
- Verifique as mensagens de log
- A estrutura HTML do site pode ter mudado

### Como corrigir
1. Inspecione o elemento (F12)
2. Procure pelo seletor CSS correto
3. Atualize o arquivo `auto-responder.js`

---

**Desenvolvido com ❤️ para estudantes ENEM** 🚀
