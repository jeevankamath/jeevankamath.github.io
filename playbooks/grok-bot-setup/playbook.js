(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
// copy buttons
$$('.copy').forEach(c=>{const b=$('.copy-btn',c),l=$('.copy-label',c);if(!navigator.clipboard)return;b.hidden=false;l.setAttribute('role','status');
 b.addEventListener('click',()=>navigator.clipboard.writeText($('code',c).innerText).then(()=>{l.textContent='Copied ✓';b.textContent='Copied';setTimeout(()=>{l.textContent='Copy and paste';b.textContent='Copy'},1600)}))});
// checklists
const K='jk-grokbot-ck';let st={};try{st=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
$$('.checklist').forEach(cl=>{const boxes=$$('input',cl),cnt=$('.ck-count',cl),rs=$('.ck-reset',cl);rs.hidden=false;
 const up=()=>{cnt.textContent=boxes.filter(b=>b.checked).length+' of '+boxes.length+' done'};
 boxes.forEach(b=>{b.checked=!!st[b.dataset.ck];b.addEventListener('change',()=>{st[b.dataset.ck]=b.checked;try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}up()})});
 rs.addEventListener('click',()=>{boxes.forEach(b=>{b.checked=false;st[b.dataset.ck]=false});try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}up()});up()});
// toc active
const links=$$('.toc a'),map=new Map(links.map(a=>[a.hash.slice(1),a]));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.removeAttribute('aria-current'));const a=map.get(e.target.id);a&&a.setAttribute('aria-current','true')}}),{rootMargin:'-20% 0px -70% 0px'});
$$('main h2[id]').forEach(h=>io.observe(h));
// mobile toc
const tb=$('.mtoc-btn'),toc=$('#toc');const close=()=>{toc.classList.remove('open');tb.setAttribute('aria-expanded','false')};
tb.addEventListener('click',()=>{const o=toc.classList.toggle('open');tb.setAttribute('aria-expanded',o)});
links.forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{e.key==='Escape'&&close()});
// progress + back to top
const bar=$('.progress span'),top=$('.totop'),foot=$('.foot');let footVis=false;
new IntersectionObserver(([e])=>{footVis=e.isIntersecting;onS()}).observe(foot);
function onS(){const d=document.documentElement,p=d.scrollTop/(d.scrollHeight-d.clientHeight||1);bar.style.width=(p*100)+'%';top.classList.toggle('show',d.scrollTop>innerHeight&&!footVis)}
addEventListener('scroll',onS,{passive:true});onS();
})();
