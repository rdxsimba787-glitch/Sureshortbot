/* SURESHORT BOT — User Engine. © SURESHORT BOT. SECURITY BY SURESHORT POLICE. */
(async()=>{
if(window.__SSB){window.__SSB.toggle();return}
const A=(document.currentScript||{}).src?new URL(document.currentScript.src).origin:'';
console.log('%cSECURITY BY SURESHORT POLICE','color:#ff2d95;font-weight:bold');
console.log([...'SECURITY BY SURESHORT POLICE'].map(c=>c.charCodeAt(0).toString(2).padStart(8,0)).join(' '));
const api=async(p,o={})=>{try{return await(await fetch(A+'/api/'+p,o)).json()}catch{return{error:'Network error'}}};
const S=await api('settings');
let dev=localStorage.ssbDev||(localStorage.ssbDev=[...crypto.getRandomValues(new Uint8Array(12))].map(x=>x.toString(16).padStart(2,'0')).join(''));
let tok=localStorage.ssbTok||'',st={status:'none'},lang='bn',vOn=S.voice==='1';
const host=document.createElement('div');host.style.cssText='position:fixed;z-index:2147483647;top:0;left:0';
const R=host.attachShadow({mode:'open'});document.body.appendChild(host);
const ac=S.accent||'#ff2d95',sz=+S.scanSize||64;
R.innerHTML=`<style>
*{box-sizing:border-box;font-family:system-ui,sans-serif}
#f{position:fixed;right:16px;bottom:90px;width:${sz}px;height:${sz}px;border-radius:50%;background:url(${S.logo}) center/cover #000;border:2px solid ${ac};box-shadow:0 0 18px ${ac};touch-action:none;animation:fl 3s ease-in-out infinite;cursor:grab}
@keyframes fl{50%{transform:translateY(-6px)}}
#p{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,380px);max-height:88vh;overflow:auto;display:none;color:#fff;padding:16px;border-radius:22px;background:linear-gradient(145deg,rgba(255,45,149,.18),rgba(0,0,0,.88));backdrop-filter:blur(18px);border:1px solid ${ac}88;box-shadow:0 0 30px ${ac}66}
h2{margin:0;font-size:17px;color:${ac}}.hd{display:flex;gap:10px;align-items:center;margin-bottom:10px}.hd img{width:42px;height:42px;border-radius:50%;border:1px solid ${ac}}
select,input,button{width:100%;padding:11px;margin:5px 0;border-radius:12px;border:1px solid ${ac}66;background:#0008;color:#fff;font-size:14px}
button{background:${ac};border:0;font-weight:700}button.g{background:#fff1;border:1px solid ${ac}66}
.r{display:flex;gap:6px}.s{font-size:12px;opacity:.9}.st{font-size:13px;margin:3px 0;animation:in .4s}@keyframes in{from{opacity:0;transform:translateX(-8px)}}
#res{font-size:30px;font-weight:800;text-align:center;margin:10px 0;text-shadow:0 0 14px ${ac}}
.ft{font-size:10px;opacity:.6;text-align:center;margin-top:8px}.x{float:right;width:34px;padding:4px;margin:0}
#ld{display:none;text-align:center}#ld img{width:70px;border-radius:50%;animation:sp 1.4s linear infinite;box-shadow:0 0 20px ${ac}}@keyframes sp{to{transform:rotate(360deg)}}
</style>
<div id=f></div>
<div id=p><button class="x g" id=cl>✕</button>
<div class=hd><img src="${S.logo}"><div><h2>${S.brand}</h2><div class=s>Security by SURESHORT POLICE</div></div></div>
<div class=s id=ls></div>
<div id=lg><input id=k placeholder="Licence key (SSP-XXXX-XXXX-XXXX)"><button id=lb>Activate</button>
<div class=r><button class=g id=bw>Buy Website</button><button class=g id=bt>Buy Telegram</button></div></div>
<div id=an style="display:none"><select id=m>${S.markets.split(',').map(x=>`<option>${x}</option>`)}</select>
<select id=t>${S.tfs.split(',').map(x=>`<option>${x}</option>`)}</select>
<div class=r><button class=g id=vb></button><button class=g id=lb2>বাংলা</button></div>
<button id=go>Start Analysis</button><div id=ld><img src="${S.logo}"></div><div id=sg></div><div id=res></div></div>
<div class=s>${S.notice}</div>
<div class=ft>© ${S.owner} · Dev: ${S.dev} · SECURITY BY SURESHORT POLICE</div></div>`;
const $=i=>R.getElementById(i),P=$('p');
const say=t=>{if(!vOn||!speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=lang==='bn'?'bn-BD':'en-US';speechSynthesis.speak(u)};
const open=u=>u?window.open(u,'_blank','noopener'):alert('Link not set by admin');
$('bw').onclick=()=>open(S.web);$('bt').onclick=()=>open(S.tg);
const ui=()=>{const ok=st.status==='active';$('lg').style.display=ok?'none':'';$('an').style.display=ok?'':'none';
$('ls').textContent='Licence: '+st.status.toUpperCase()+(st.expiry?' · until '+new Date(st.expiry).toLocaleDateString():'');
$('vb').textContent='Voice: '+(vOn?'ON':'OFF');$('lb2').textContent=lang==='bn'?'বাংলা':'English'};
$('vb').onclick=()=>{vOn=!vOn;ui()};$('lb2').onclick=()=>{lang=lang==='bn'?'en':'bn';ui()};
const chk=async()=>{if(!tok)return;const r=await api('status',{headers:{authorization:'Bearer '+tok}});st=r;ui()};
$('lb').onclick=async()=>{const r=await api('redeem',{method:'POST',body:JSON.stringify({key:$('k').value.trim(),device:dev})});
if(r.token){tok=localStorage.ssbTok=r.token;st=r}else{st={status:'invalid'};alert(r.error)}ui()};
$('go').onclick=async()=>{
const b=$('go');b.disabled=true;$('res').textContent='';$('sg').innerHTML='';$('ld').style.display='block';
say(lang==='bn'?'সুরশর্ট বট মার্কেট বিশ্লেষণ শুরু হয়েছে।':'SURESHORT BOT Market Analysis Started.');
const req=api('analyze?m='+$('m').value+'&tf='+$('t').value,{headers:{authorization:'Bearer '+tok}});
for(const s of['Connecting to verified data source…','Reading candles…','Calculating EMA trend…','Checking RSI momentum…','Validating conditions…']){const d=document.createElement('div');d.className='st';d.textContent='✔ '+s;$('sg').appendChild(d);await new Promise(r=>setTimeout(r,700))}
const r=await req;$('ld').style.display='none';b.disabled=false;
if(r.error){$('res').textContent='ERROR';if(/revoked|expired/.test(r.error)){st.status=r.error.split(' ')[1];ui()}alert(r.error);return}
$('res').textContent=r.result;$('res').style.color=r.result==='UP'?'#3f9':r.result==='DOWN'?'#f55':'#ccc';
const d=document.createElement('div');d.className='s';d.textContent=r.reason+' · '+(r.note||'');$('sg').appendChild(d);
say(lang==='bn'?(r.result==='NO SIGNAL'?'কোনো সিগনাল নেই।':'ফলাফল: '+(r.result==='UP'?'আপ':'ডাউন')):'Result: '+r.result)};
const F=$('f');let mv=0,ox,oy;
F.onpointerdown=e=>{mv=0;ox=e.clientX;oy=e.clientY;F.setPointerCapture(e.pointerId)};
F.onpointermove=e=>{if(!F.hasPointerCapture(e.pointerId))return;if(Math.abs(e.clientX-ox)+Math.abs(e.clientY-oy)>6)mv=1;if(mv){F.style.right=F.style.bottom='auto';F.style.left=Math.max(0,Math.min(innerWidth-sz,e.clientX-sz/2))+'px';F.style.top=Math.max(0,Math.min(innerHeight-sz,e.clientY-sz/2))+'px'}};
F.onpointerup=()=>{if(!mv)tg()};
const tg=()=>P.style.display=P.style.display==='block'?'none':'block';
$('cl').onclick=tg;window.__SSB={toggle:tg};ui();chk();
})();
