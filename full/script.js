(function(){
  var d=document.documentElement; d.classList.add('js');
  var cfg=window.SITE_CONFIG||{};
  var name=(cfg.productName||'VitalOps').trim();
  var powered=(cfg.poweredBy||'Texoma Healthcare Group').trim();
  function setText(sel,val){document.querySelectorAll(sel).forEach(function(el){el.textContent=val;});}
  setText('[data-product]',name); setText('[data-powered]',powered);
  document.title=document.title.replace(/VitalOps/g,name);
  var md=document.querySelector('meta[name=description]'); if(md) md.setAttribute('content',md.getAttribute('content').replace(/VitalOps/g,name));
  var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
  // Demo CTA
  var email=(cfg.demoEmail||'').trim();
  if(email){
    var href='mailto:'+email+'?subject='+encodeURIComponent(name+' demo request');
    document.querySelectorAll('.js-demo').forEach(function(a){a.setAttribute('href',href);});
  }else{
    var note=document.getElementById('demo-note');
    var main=document.querySelector('.js-demo-main');
    if(main&&note){main.addEventListener('click',function(e){e.preventDefault();note.hidden=false;});}
  }
  // Nav background
  var nav=document.querySelector('.nav');
  function onScroll(){nav.classList.toggle('scrolled',window.scrollY>20);}
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  // Reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  els.forEach(function(e){io.observe(e);});
})();
