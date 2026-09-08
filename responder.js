console.log('✓ Ativado');
setTimeout(function(){
var r=document.querySelectorAll('input[type="radio"]');
if(r.length>0){r[0].click();r[0].checked=true;console.log('✓✓✓ RESPONDIDO');}
var b=document.querySelectorAll('button');
for(var i=0;i<b.length;i++){if(b[i].textContent.toLowerCase().includes('a')){b[i].click();console.log('✓✓✓ RESPONDIDO');break;}}
},2000);
new MutationObserver(function(){
var r=document.querySelectorAll('input[type="radio"]');
if(r.length>0 && !r[0].checked){r[0].click();r[0].checked=true;}
}).observe(document.body,{childList:true,subtree:true});