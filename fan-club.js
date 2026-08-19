(function(){
'use strict';
if((location.pathname.replace(/\/$/,'')||'/')!=='/fan-club')return;

var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';

function mount(){
  var card=document.querySelector('.wo-tier-grid .wo-tier-card');
  if(!card)return;
  var emailInput=card.querySelector('input[type="email"]');
  var button=card.querySelector('[data-wo-fanclub-submit]');
  if(!emailInput||!button)return;

  if(!card.querySelector('.mp-tier-perks')){
    var list=document.createElement('ul');
    list.className='mp-tier-perks';
    ['Early pages and development notes','Members-only behind-the-scenes updates','First notice when ShatterKid or Bone Grice goes on sale'].forEach(function(text){
      var li=document.createElement('li');li.textContent=text;list.appendChild(li);
    });
    var p=card.querySelector('p');
    if(p)p.after(list);
  }

  if(!card.querySelector('.mp-fanclub-status')){
    var status=document.createElement('div');
    status.className='mp-fanclub-status';
    status.setAttribute('role','status');
    button.after(status);
  }
  var statusEl=card.querySelector('.mp-fanclub-status');
  function setStatus(text,kind){statusEl.textContent=text;statusEl.className='mp-fanclub-status'+(kind?' '+kind:'');}

  var busy=false;
  function submit(event){
    if(event)event.preventDefault();
    if(busy)return;
    var email=String(emailInput.value||'').trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setStatus('Enter a valid email address.','error');emailInput.focus();return;}
    busy=true;var original=button.textContent;button.textContent='Joining…';setStatus('');
    fetch(API+'/public/fan-club/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({storeId:STORE_ID,email:email})})
      .then(function(response){return response.json().then(function(data){return {ok:response.ok,data:data};});})
      .then(function(result){
        busy=false;button.textContent=original;
        if(!result.ok){setStatus(result.data&&result.data.error||'Something went wrong. Try again.','error');return;}
        emailInput.value='';
        setStatus(result.data.alreadySubscribed?"You're already on the list — thanks!":"You're in! We'll email you the moment there's news.",'success');
      })
      .catch(function(){busy=false;button.textContent=original;setStatus('Could not reach the server. Try again in a moment.','error');});
  }
  button.addEventListener('click',submit);
  emailInput.addEventListener('keydown',function(event){if(event.key==='Enter')submit(event);});
}

if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount,{once:true});
})();
