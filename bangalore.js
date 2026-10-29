/* Bangalore journey: crossfade landmark + sky, swap rider stage per section, HUD.
   Vanilla JS, IntersectionObserver only, about 2KB. */
(function(){
  var body=document.body,bgs=document.querySelectorAll('.scene-bg'),rider=document.getElementById('rider');
  var secs=document.querySelectorAll('section[data-scene]'),stops=document.querySelectorAll('.hud-stops a');
  var label=document.getElementById('hud-label');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var names={'cubbon-park':'Cubbon Park','town-hall':'Town Hall','mg-road':'MG Road','metro-station':'Metro station',
    'vidhana-soudha':'Vidhana Soudha','nandi-hills':'Nandi Hills','it-park':'IT park','dusk':'Skyline at dusk'};
  var sky={'nandi-hills':'sunrise','it-park':'afternoon','dusk':'dusk'};
  if(!rider||!('IntersectionObserver' in window))return;
  function show(sec){
    var b=sec.getAttribute('data-scene'),r=sec.getAttribute('data-rider'),n=+sec.getAttribute('data-stop');
    var bgKey=b==='dusk'?'it-park':b;
    bgs.forEach(function(i){i.classList.toggle('on',i.getAttribute('data-bg')===bgKey)});
    body.setAttribute('data-sky',sky[b]||'day');body.setAttribute('data-bg',bgKey);
    if(window.__dc)window.__dc.show(sec,bgKey,n);
    body.setAttribute('data-stage',sec.getAttribute('data-stage'));
    if(rider.getAttribute('data-rider')!==r){
      rider.setAttribute('data-rider',r);
      if(!reduce){rider.classList.remove('pop');void rider.offsetWidth;rider.classList.add('pop');}
    }
    label.innerHTML='<span class="hud-n">Stop '+n+'</span><span class="hud-name"> · '+names[b]+'</span>';
    stops.forEach(function(a){a.classList.toggle('passed',+a.getAttribute('data-stop')<=n)});
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)show(e.target)})},
    {rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){io.observe(s)});
  if(reduce)return;
  var t;window.addEventListener('scroll',function(){
    body.classList.add('moving');clearTimeout(t);t=setTimeout(function(){body.classList.remove('moving')},300);
  },{passive:true});
})();

/* Day cycle + traffic: interpolate sky, landmark tint and night level between section centres. No libraries. */
(function(){
  var root=document.documentElement.style,body=document.body;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // sky top, sky bottom, landmark multiply tint, landmark opacity, night (lights) 0..1, road brightness
  var K={'cubbon-park':['#f2b766','#ffe0a3','#ffd9a0',.55,.2,.9],   // early morning before sunrise, golden
    'town-hall':['#8fc4f2','#d6ecff','#f4f1ea',.6,0,1],            // late morning
    'mg-road':['#5aa6ea','#bfe0ff','#ffffff',.6,0,1],              // afternoon
    'metro-station':['#7d8794','#b1b7bf','#a9b0ba',.65,.1,.85],    // early evening, cloudy grey
    'vidhana-soudha':['#3f2f6e','#a37fbf','#9b86c4',.55,.45,.7],   // evening, dusky violet (sky only)
    'nandi-hills':['#ef9f45','#ffd38a','#f2b46a',.6,.1,.95],       // golden hour
    'it-park':['#0b1430','#1f3a5f','#3b4a72',.75,1,.55],           // night
    'dusk':['#0b1430','#1f3a5f','#3b4a72',.75,1,.55]};            // closing stays night
  var secs=[].slice.call(document.querySelectorAll('section[data-scene]'));
  function hex(h){return [1,3,5].map(function(i){return parseInt(h.substr(i,2),16)})}
  function mix(a,b,t){a=hex(a);b=hex(b);return 'rgb('+a.map(function(v,i){return Math.round(v+(b[i]-v)*t)}).join(',')+')'}
  function apply(a,b,t){
    root.setProperty('--sky-top',mix(a[0],b[0],t));root.setProperty('--sky-bot',mix(a[1],b[1],t));
    root.setProperty('--tint',mix(a[2],b[2],t));
    ['--lo','--night','--rb'].forEach(function(k,i){root.setProperty(k,(a[i+3]+(b[i+3]-a[i+3])*t).toFixed(3))});
  }
  // traffic: [sprite, frame width, lane fraction, scale, left-bound, seconds, first stop it appears at, parked x]
  var V=[['bicycle',24,.1,1,0,38,1,.3],['scooter',24,.55,.75,1,30,1,.62],['auto',26,.08,1,0,32,2,.55],
    ['motorbike',26,.5,.75,1,24,3,.18],['car-white',36,.12,1,0,28,3,.8],['scooter',24,.58,.75,1,27,4,.4],
    ['auto',26,.52,.75,1,34,5,.9],['bicycle',24,.1,1,0,44,5,.68],['car-yellow-taxi',36,.5,.75,1,30,6,.05],
    ['motorbike',26,.14,1,0,22,7,.42],['scooter',24,.1,1,0,26,7,.92],['auto',26,.6,.75,1,29,7,.27],
    ['car-white',36,.48,.75,1,33,7,.75],['motorbike',26,.12,1,0,25,7,.06]];
  var tr=document.getElementById('traffic');if(!tr)return;
  var lamps=[.12,.32,.52,.72,.92].map(function(x){var d=document.createElement('i');d.className='lamp';d.style.setProperty('--x',x);tr.appendChild(d);return d});
  var vs=V.map(function(v,i){var d=document.createElement('i');d.className='veh'+(v[4]?' l':'');
    var st=d.style;st.setProperty('--img','url(art/vehicle-'+v[0]+'.svg)');st.setProperty('--w',v[1]);st.setProperty('--f',v[2]);
    st.setProperty('--s',v[3]);st.setProperty('--dur',v[5]+'s');st.setProperty('--delay',(-v[5]*((i*0.37)%1)).toFixed(1)+'s');
    st.setProperty('--park',v[7]);d.dataset.min=v[6];tr.appendChild(d);return d});
  function density(stop){vs.forEach(function(d){d.classList.toggle('on',+d.dataset.min<=stop)})}
  function centre(s){var r=s.getBoundingClientRect();return r.top+r.height/2}
  function tick(){
    var y=innerHeight/2,i=0,t=0,c=secs.map(centre);
    if(y<=c[0]){i=0;t=0}else if(y>=c[c.length-1]){i=c.length-1;t=0}
    else{for(i=0;i<c.length-1&&!(y>=c[i]&&y<c[i+1]);i++);t=(y-c[i])/(c[i+1]-c[i]);t=t*t*(3-2*t)}
    var a=K[secs[i].dataset.scene],b=K[(secs[i+1]||secs[i]).dataset.scene];apply(a,b,t);
  }
  window.__dc={show:function(sec,bgKey,n){
    root.setProperty('--tint-mask','url(art/bg-'+bgKey+'.svg)');density(n);
    if(reduce){var k=K[sec.dataset.scene];apply(k,k,0)}}};
  root.setProperty('--tint-mask','url(art/bg-cubbon-park.svg)');density(1);
  if(reduce){apply(K['cubbon-park'],K['cubbon-park'],0);return}
  var q=false;function on(){if(!q){q=true;requestAnimationFrame(function(){q=false;tick()})}}
  addEventListener('scroll',on,{passive:true});addEventListener('resize',on);tick();
})();
