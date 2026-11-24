(function(){
var b=document.querySelector('.burger'),n=document.getElementById('nav');
if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Close menu':'Open menu');});
function $(i){return document.getElementById(i);}
var f=$('cform');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var fm=$('fm');
 if($('website').value)return;
 if(!f.checkValidity()){fm.hidden=false;fm.textContent='Please fill in your name, a valid email and a message, and tick the agreement box.';return;}
 var body='Name: '+$('name').value+'\nEmail: '+$('email').value+'\nTopic: '+$('topic').value+'\n\n'+$('message').value;
 location.href='mailto:'+f.getAttribute('data-to')+'?subject='+encodeURIComponent(f.getAttribute('data-brand')+': '+$('topic').value)+'&body='+encodeURIComponent(body);
 fm.hidden=false;fm.textContent='Your email app should open with the message ready to send. If nothing happens, write to us directly at '+f.getAttribute('data-to')+'.';});
var c=$('cookie'),k=null;try{k=localStorage.getItem('ck_'+location.hostname);}catch(e){}
if(c&&!k)c.classList.add('show');
if(c)c.querySelectorAll('button').forEach(function(bt){bt.addEventListener('click',function(){try{localStorage.setItem('ck_'+location.hostname,bt.getAttribute('data-cookie'));}catch(e){}c.classList.remove('show');});});
var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();

(function(){
function $(i){return document.getElementById(i);}
function n(i){var v=parseFloat($(i).value);return isNaN(v)?0:v;}
var BANDS=[[70,"First / A"],[60,"Upper second / B"],[50,"Lower second / C"],[40,"Third / D"],[0,"Below pass"]];
function band(x){for(var i=0;i<BANDS.length;i++){if(x>=BANDS[i][0])return BANDS[i][1];}return BANDS[4][1];}
function gradeOut(){var w=n('gdWeight'),got=n('gdGot'),target=n('gdTarget'),o=$('gdOut');
 if(w<=0||w>=100){o.innerHTML='<h4>Check the weighting</h4><p>Enter how much of the module the work you have already done is worth, as a number between 1 and 99.</p>';return;}
 var carried=got*w/100,remain=100-w,need=(target-carried)/remain*100;
 var html='<h4>To finish on '+target+'%</h4><span class="big">'+(need<=0?'Already there':(need>100?'Not reachable':need.toFixed(1)+'%'))+'</span>';
 html+='<p style="margin:.1em 0 .8em">'+(need<=0?'The marks you already hold are enough, even with nothing further.':(need>100?'Even a perfect result in everything remaining would leave you short of '+target+'%.':'You need '+need.toFixed(1)+'% in the remaining '+remain+'% of the module.'))+'</p>';
 html+='<dl class="kv"><dt>Secured so far</dt><dd>'+carried.toFixed(1)+' of 100</dd><dt>Still to play for</dt><dd>'+remain+'% of the module</dd><dt>Current standing</dt><dd>'+band(got)+'</dd></dl>';
 if(need>100)html+='<p><span class="tag warn">Out of reach</span><br>'+target+'% is no longer possible from here. The best you can finish on is '+(carried+remain).toFixed(1)+'%. Talk to your tutor about whether any of the earlier work can be resubmitted.</p>';
 else if(need>85)html+='<p><span class="tag warn">Tight</span><br>This needs a very strong result. Treat the remaining assessment as the whole module and plan backwards from the deadline.</p>';
 else if(need>0)html+='<p><span class="tag">Workable</span><br>That is a realistic target. Check the marking criteria for the remaining assessment and write to them explicitly.</p>';
 html+='<p style="font-size:.88rem;margin:.4em 0 0;color:#5C6373">Rounding rules, resit caps and penalties vary between institutions. Your handbook is the authority.</p>';
 o.innerHTML=html;}
['gdWeight','gdGot','gdTarget'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',gradeOut);});
if($('gdWeight'))gradeOut();
function planOut(){var wk=n('cdWeeks'),sub=n('cdSubs'),hrs=n('cdHours'),o=$('cdOut');
 if(!(wk>0&&sub>0&&hrs>0)){o.innerHTML='<h4>Fill in all three</h4><p>Weeks left, how many subjects, and the hours a week you can genuinely give it.</p>';return;}
 var per=hrs/sub,sess=Math.max(1,Math.round(per/1.5)),total=wk*hrs;
 var p1=Math.max(1,Math.round(wk*0.45)),p2=Math.max(1,Math.round(wk*0.35)),p3=Math.max(1,wk-p1-p2);
 var html='<h4>'+total+' hours between now and the exams</h4><dl class="kv"><dt>Per subject, per week</dt><dd>'+per.toFixed(1)+' hours</dd><dt>Sessions a week each</dt><dd>about '+sess+' of 90 minutes</dd><dt>Weeks left</dt><dd>'+wk+'</dd></dl>';
 html+='<p><b>Three phases</b></p><ul><li><b>Weeks 1 to '+p1+' &mdash; cover the ground.</b> First pass through every topic, making the condensed notes you will actually revise from.</li>';
 html+='<li><b>Weeks '+(p1+1)+' to '+(p1+p2)+' &mdash; test yourself.</b> Closed-book questions on the material from phase one. Note what you get wrong and go back to those topics only.</li>';
 html+='<li><b>Last '+p3+' week'+(p3===1?'':'s')+' &mdash; full papers, timed.</b> Whole papers under exam conditions, then mark them honestly against the scheme.</li></ul>';
 if(per<2)html+='<p><span class="tag warn">Thin</span><br>Under two hours a week per subject is not much. Either find more time or decide now which topics you are choosing not to cover.</p>';
 else if(hrs>25)html+='<p><span class="tag warn">Ambitious</span><br>Over 25 hours a week is hard to sustain for '+wk+' weeks. Build in one day off or you will lose the last fortnight to exhaustion.</p>';
 else html+='<p><span class="tag">Sustainable</span><br>That is a load most people can hold for '+wk+' weeks, as long as one day a week stays clear.</p>';
 o.innerHTML=html;}
['cdWeeks','cdSubs','cdHours'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',planOut);});
if($('cdWeeks'))planOut();
function tc(s){return (s||'').trim();}
function initials(a){var p=tc(a).split(/\s+/);if(p.length<2)return tc(a);var last=p.pop();return last+', '+p.map(function(x){return x.charAt(0).toUpperCase()+'.';}).join(' ');}
function full(a){var p=tc(a).split(/\s+/);if(p.length<2)return tc(a);var last=p.pop();return last+', '+p.join(' ')+'.';}
function citeOut(){var st=$('ctStyle').value,au=tc($('ctAuthor').value),ti=tc($('ctTitle').value),yr=tc($('ctYear').value),pub=tc($('ctPub').value),o=$('ctOut');
 if(!au||!ti){o.innerHTML='<h4>Author and title needed</h4><p>Type at least the author name and the title. Year and publisher sharpen the result.</p>';return;}
 var y=yr||'n.d.',P=pub||'[publisher not given]',ref='',inl='',note='';
 var surname=tc(au).split(/\s+/).pop();
 if(st==='apa'){ref=initials(au)+' ('+y+'). <i>'+ti+'</i>. '+P+'.';inl='('+surname+', '+y+')';note='Seventh edition style. Reference list is alphabetical by surname, with a hanging indent.';}
 else if(st==='mla'){ref=full(au)+' <i>'+ti+'</i>. '+P+', '+y+'.';inl='('+surname+')';note='Ninth edition style. The list is headed Works Cited and page numbers go in the in-text citation, not the entry.';}
 else if(st==='harvard'){ref=initials(au)+' '+y+'. <i>'+ti+'</i>. '+P+'.';inl='('+surname+' '+y+')';note='Harvard varies between institutions more than any other style. Check your own handbook for punctuation.';}
 else{ref=tc(au)+', <i>'+ti+'</i> ('+P+', '+y+').';inl='<sup>1</sup> '+tc(au)+', <i>'+ti+'</i>, 00.';note='Notes-and-bibliography style. The first footnote is full, later ones shortened to surname, short title and page.';}
 o.innerHTML='<h4>'+$('ctStyle').options[$('ctStyle').selectedIndex].text+'</h4><p style="margin:0 0 .3em;font-size:.84rem;color:#5C6373">Reference list entry</p><div class="cite">'+ref+'</div><p style="margin:0 0 .3em;font-size:.84rem;color:#5C6373">In the text</p><div class="cite">'+inl+'</div><p style="margin:0">'+note+'</p>';}
['ctStyle','ctAuthor','ctTitle','ctYear','ctPub'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',citeOut);});
if($('ctStyle'))citeOut();
})();
