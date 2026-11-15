// SURESHORT BOT API — Cloudflare Pages Functions (Workers runtime) + D1
// © SURESHORT BOT. Security by SURESHORT POLICE.
const H={'content-type':'application/json','access-control-allow-origin':'*','access-control-allow-headers':'*','cache-control':'no-store'};
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:H});
const enc=new TextEncoder();
const sign=async(sec,m)=>{const k=await crypto.subtle.importKey('raw',enc.encode(sec),{name:'HMAC',hash:'SHA-256'},false,['sign']);return btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign('HMAC',k,enc.encode(m)))))};
const eq=(a,b)=>{a=String(a||'');b=String(b||'');let d=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)d|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return d===0};
const KEYS=['brand','logo','owner','dev','web','tg','accent','scanSize','markets','tfs','voice','notice'];
const DEF={brand:'SURESHORT BOT',logo:'https://i.postimg.cc/pV36k05g/IMG-20261115-161332.jpg',owner:'SURESHORT',dev:'SURESHORT',web:'',tg:'',accent:'#ff2d95',scanSize:'64',markets:'BTCUSDT,ETHUSDT,BNBUSDT,SOLUSDT,XRPUSDT',tfs:'1m,5m,15m,1h',voice:'1',notice:'Educational observation only. No guaranteed results.'};
const state=l=>!l?'invalid':l.status==='revoked'?'revoked':l.status==='unused'?'unused':(l.expiry&&l.expiry<Date.now())?'expired':'active';
async function settings(db){const o={...DEF};(await db.prepare('select k,v from settings').all()).results.forEach(r=>o[r.k]=r.v);return o}
async function user(r,env){const[k,d,s]=(r.headers.get('authorization')||'').slice(7).split('.');if(!s||!eq(s,await sign(env.SECRET,k+'.'+d)))return;const l=await env.DB.prepare('select * from licenses where key=?').bind(k).first();return l&&l.device===d?l:null}
const ema=(a,n)=>{const k=2/(n+1);return a.reduce((e,x,i)=>i?x*k+e*(1-k):x,a[0])};
function rsi(c,n=14){let g=0,l=0;for(let i=c.length-n;i<c.length;i++){const d=c[i]-c[i-1];d>0?g+=d:l-=d}return l===0?100:100-100/(1+g/l)}
export async function onRequest({request:r,env}){
 if(r.method==='OPTIONS')return J({});
 const p=new URL(r.url).pathname.replace(/^\/api\//,''),db=env.DB;
 try{
 if(p==='settings')return J(await settings(db));
 if(p==='redeem'&&r.method==='POST'){
  const{key,device}=await r.json();if(!/^[A-Za-z0-9-]{8,40}$/.test(key||'')||!/^[A-Za-z0-9]{8,64}$/.test(device||''))return J({error:'Bad input'},400);
  let l=await db.prepare('select * from licenses where key=?').bind(key).first();
  if(!l)return J({error:'Invalid licence key'},403);
  if(l.status==='revoked')return J({error:'Licence revoked'},403);
  if(l.status==='unused'){const now=Date.now(),res=await db.prepare("update licenses set status='active',device=?,activated=?,expiry=? where key=? and status='unused'").bind(device,now,now+l.days*864e5,key).run();
   if(!res.meta.changes)return J({error:'Key already used'},403);l=await db.prepare('select * from licenses where key=?').bind(key).first()}
  else if(l.device!==device)return J({error:'Key already used on another device'},403);
  const st=state(l);if(st!=='active')return J({error:'Licence '+st},403);
  return J({token:key+'.'+device+'.'+await sign(env.SECRET,key+'.'+device),status:st,expiry:l.expiry});}
 if(p==='status'){const l=await user(r,env);return J({status:state(l),expiry:l&&l.expiry})}
 if(p==='analyze'){
  const l=await user(r,env);if(state(l)!=='active')return J({error:'Licence '+state(l)},403);
  const q=new URL(r.url).searchParams,s=await settings(db);
  const sym=q.get('m'),tf=q.get('tf');
  if(!s.markets.split(',').includes(sym)||!s.tfs.split(',').includes(tf))return J({error:'Bad market/timeframe'},400);
  let rows;try{const x=await fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}&interval=${tf}&limit=120`);if(!x.ok)throw 0;rows=await x.json()}catch{return J({result:'NO SIGNAL',reason:'Verified market data unavailable'})}
  const c=rows.map(k=>+k[4]);if(c.length<60)return J({result:'NO SIGNAL',reason:'Not enough data'});
  const e9=ema(c.slice(-60),9),e21=ema(c.slice(-60),21),R=rsi(c),last=c.at(-1);
  let res='NO SIGNAL',why='Indicators disagree / no clear trend';
  if(e9>e21&&last>e21&&R>50&&R<70){res='UP';why='EMA9 > EMA21, price above EMA21, RSI '+R.toFixed(1)}
  else if(e9<e21&&last<e21&&R<50&&R>30){res='DOWN';why='EMA9 < EMA21, price below EMA21, RSI '+R.toFixed(1)}
  return J({result:res,reason:why,rsi:+R.toFixed(1),price:last,source:'Binance public klines',note:'Observation only. Not financial advice.'});}
 if(p.startsWith('admin/')){
  if(!eq(r.headers.get('x-admin-key'),env.ADMIN_KEY))return J({error:'Unauthorized'},401);
  const b=r.method==='POST'?await r.json():{};
  if(p==='admin/settings'){for(const k of KEYS)if(k in b)await db.prepare('insert into settings(k,v) values(?,?) on conflict(k) do update set v=excluded.v').bind(k,String(b[k]).slice(0,500)).run();return J({ok:1,settings:await settings(db)})}
  if(p==='admin/gen'){const n=Math.min(+b.n||1,50),days=Math.min(+b.days||30,3650),out=[];for(let i=0;i<n;i++){const a=crypto.getRandomValues(new Uint8Array(12)),k='SSP-'+[...a].map(x=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[x%32]).join('').match(/.{4}/g).join('-');await db.prepare('insert into licenses(key,days,created,note) values(?,?,?,?)').bind(k,days,Date.now(),String(b.note||'').slice(0,100)).run();out.push(k)}return J({keys:out})}
  if(p==='admin/revoke'){await db.prepare("update licenses set status='revoked' where key=?").bind(b.key).run();return J({ok:1})}
  if(p==='admin/list'){const x=(await db.prepare('select * from licenses order by created desc limit 200').all()).results;return J({licenses:x.map(l=>({...l,state:state(l)})),settings:await settings(db)})}
 }
 return J({error:'Not found'},404);
 }catch(e){return J({error:'Server error'},500)}
}
