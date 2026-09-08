// Service Worker - Background da Extensao
console.log('Background Service Worker ativado!');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extensao instalada com sucesso!');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    sendResponse({ status: 'ativo' });
  }
});