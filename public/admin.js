/* SURESHORT BOT — Admin Engine. © SURESHORT BOT. SECURITY BY SURESHORT POLICE. */
(async()=>{
if(window.__SSA)return;window.__SSA=1;
const A=new URL(document.currentScript.src).origin;
const key=prompt('SURESHORT ADMIN KEY');if(!key){window.__SSA=0;return}
const api=async(p,b)=>{try{return await(await fetch(A+'/api/'+p,{method:b?'POST':'GET',headers:{'x-admin-key':key},body:b?JSON.stringify(b):undefined})).json()}catch{return{error:'Network error'}}};
let d=await api('admin/list');if(d.error){alert(d.error);window.__SSA=0;return}
const h=document.createElement('div');h.style.cssText='position:fixed;inset:0;z-index:2147483647';
const R=h.attachShadow({mode:'open'});document.body.appendChild(h);
const F=['brand','logo','owner','dev','web','tg','accent','scanSize','markets','tfs','voice','notice'];
const draw=()=>{R.innerHTML=`<style>*{box-sizing:border-box;font-family:system-ui}div.w{position:absolute;inset:0;overflow:auto;background:#000e;color:#fff;padding:14px}
h2{color:#ff2d95}input,button,select{width:100%;padding:10px;margin:4px 0;border-radius:10px;border:1px solid #ff2d9566;background:#111;color:#fff}button{background:#ff2d95;border:0;font-weight:700}
label{font-size:11px;opacity:.7}.l{font-size:12px;border-bottom:1px solid #fff2;padding:6px 0;word-break:break-all}</style>
<div class=w><h2>SURESHORT ADMIN · Security by SURESHORT POLICE</h2><button id=x>Close</button>
<h3>Settings (auto-sync to users)</h3>${F.map(f=>`<label>${f}</label><input id=s_${f} value="${(d.settings[f]||'').replace(/"/g,'&quot;')}">`).join('')}
<button id=sv>Save settings</button>
<h3>Generate licences</h3><input id=n type=number value=1 placeholder="How many"><input id=dy type=number value=30 placeholder="Days valid after activation"><input id=nt placeholder="Note"><button id=gn>Generate</button><div id=out></div>
<h3>Licences (${d.licenses.length})</h3>${d.licenses.map(l=>`<div class=l><b>${l.key}</b> · ${l.state.toUpperCase()} · ${l.days}d${l.device?' · dev '+l.device.slice(0,6):''}${l.expiry?' · exp '+new Date(l.expiry).toLocaleDateString():''}${l.state!=='revoked'?` <button data-r="${l.key}">Revoke</button>`:''}</div>`).join('')}</div>`;
R.getElementById('x').onclick=()=>{h.remove();window.__SSA=0};
R.getElementById('sv').onclick=async()=>{const b={};F.forEach(f=>b[f]=R.getElementById('s_'+f).value);const r=await api('admin/settings',b);alert(r.ok?'Saved':r.error)};
R.getElementById('gn').onclick=async()=>{const r=await api('admin/gen',{n:+R.getElementById('n').value,days:+R.getElementById('dy').value,note:R.getElementById('nt').value});if(r.keys){d=await api('admin/list');draw();R.getElementById('out').textContent=r.keys.join('  ')}else alert(r.error)};
R.querySelectorAll('[data-r]').forEach(b=>b.onclick=async()=>{if(confirm('Revoke '+b.dataset.r+'?')){await api('admin/revoke',{key:b.dataset.r});d=await api('admin/list');draw()}})};
draw();
})();
