(function(){
  document.documentElement.classList.remove('no-js');
  var c=window.SITE_CONFIG||{};
  var name=(c.productName||"").trim()||"Our app";
  var powered=(c.poweredBy||"").trim();
  document.querySelectorAll('[data-product]').forEach(function(e){e.textContent=name;});
  document.querySelectorAll('[data-initial]').forEach(function(e){e.textContent=name.charAt(0).toUpperCase();});
  if(powered){document.querySelectorAll('[data-powered]').forEach(function(e){e.textContent=powered;});}
  document.title=name+" — Your field team, in sync";
  var y=document.getElementById('yr'); if(y){y.textContent=new Date().getFullYear();}
  // Favicon with the product initial
  try{
    var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5eead4"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="url(#g)"/><text x="32" y="44" font-family="Arial,Helvetica,sans-serif" font-size="36" font-weight="700" fill="#04121a" text-anchor="middle">'+name.charAt(0).toUpperCase()+'</text></svg>';
    var l=document.querySelector('link[rel="icon"]'); if(l){l.href='data:image/svg+xml,'+encodeURIComponent(svg);}
  }catch(e){}
  // Demo links
  var email=(c.demoEmail||"").trim();
  document.querySelectorAll('.js-demo').forEach(function(a){
    if(email){a.href='mailto:'+email+'?subject='+encodeURIComponent('Demo request: '+name);}
  });
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Reveal
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -10% 0px',threshold:.1});
    els.forEach(function(e){io.observe(e);});
  }else{els.forEach(function(e){e.classList.add('in');});}
  // Words light up as they pass the middle of the screen
  var words=[].slice.call(document.querySelectorAll('.w'));
  var stage=document.querySelector('[data-tilt]');
  var laptop=stage&&stage.querySelector('.laptop');
  var phone=stage&&stage.querySelector('.phone-hero');
  function frame(){
    var vh=window.innerHeight;
    words.forEach(function(w){var r=w.getBoundingClientRect();var mid=r.top+r.height/2;if(mid<vh*0.66){w.classList.add('on');}});
    if(laptop&&!reduce){
      var r=stage.getBoundingClientRect();
      var p=Math.min(1,Math.max(0,(vh-r.top)/(vh*0.9)));
      laptop.style.setProperty('--tilt',(14-14*p).toFixed(2)+'deg');
      phone.style.setProperty('--lift',(-24*p).toFixed(1)+'px');
    }
    ticking=false;
  }
  var ticking=false;
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(frame);}}
  if(reduce){words.forEach(function(w){w.classList.add('on');});}
  else{frame();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);}
})();
