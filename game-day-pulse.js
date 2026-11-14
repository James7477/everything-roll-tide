/* Everything Roll Tide V1.8: sourced pregame estimates and betting-market splits. */
(function(){
'use strict';
const schedule=document.getElementById('schedule'),gameList=document.getElementById('gameList');
if(!schedule||!gameList||document.getElementById('ertMatchupPulse'))return;
const DK='https://dknetwork.draftkings.com/draftkings-sportsbook-betting-splits/?itm_content=NCAA+Football&tb_edate=n30days&tb_eg=87637';
const ESPN='https://www.espn.com/college-football/game/_/gameId/401856889/alabama-vanderbilt';
const matchupData=[
 {id:'vandy',name:'Vanderbilt',date:'Nov 14, 2026',iso:'2026-11-14',site:'at Vanderbilt · Nashville',
  model:{bama:94.8,opp:5.2,source:'ESPN Analytics pregame matchup predictor',url:ESPN},
  market:{captured:'Nov 14, 2026 · 11:05 AM Eastern',source:'DraftKings betting splits',rows:[
   {title:'Moneyline',a:['Alabama −700',98,94],b:['Vanderbilt +500',2,6]},
   {title:'Point spread',a:['Alabama −14 (−112)',86,88],b:['Vanderbilt +14 (−108)',14,12]},
   {title:'Total points',a:['Over 47.5 (−115)',81,75],b:['Under 47.5 (−105)',19,25]}
  ]}},
 {id:'chatt',name:'Chattanooga',date:'Nov 21, 2026',iso:'2026-11-21',site:'vs Chattanooga · Tuscaloosa',model:null,market:null},
 {id:'auburn',name:'Auburn',date:'Nov 28, 2026',iso:'2026-11-28',site:'vs Auburn · Tuscaloosa',model:null,market:null}
];
const clean=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const panel=document.createElement('section');panel.id='ertMatchupPulse';panel.className='ert-pulse';panel.setAttribute('aria-label','Game day win probability and betting market');
panel.innerHTML='<div class="ert-pulse-head"><div><h2>🎯 Game Day Matchup Pulse</h2><p>Predicted win chance and what people are betting on</p></div><span class="ert-pulse-stamp">V1.8 · DATED SNAPSHOTS</span></div>'+
 '<div class="ert-pulse-picker"><label for="ertPulseGame">Choose a matchup</label><select id="ertPulseGame">'+
 matchupData.map(g=>'<option value="'+g.id+'">'+clean(g.date)+' · '+clean(g.site)+'</option>').join('')+
 '</select></div><div id="ertPulseDetails" aria-live="polite"></div>'+
 '<p class="ert-pulse-explain"><b>What do the numbers mean?</b> Win probability is a separate analytical prediction. <b>Bets %</b> is the percentage of wagers placed on a selection, and <b>Money %</b> is the percentage of dollars wagered on that selection. Betting popularity does not predict results. These are pregame snapshots, not live data or advice to bet. This app does not accept wagers.</p>';
gameList.insertAdjacentElement('beforebegin',panel);
const selector=panel.querySelector('#ertPulseGame'),details=panel.querySelector('#ertPulseDetails');
function render(){
 const g=matchupData.find(x=>x.id===selector.value)||matchupData[0];
 let html='<div class="ert-pulse-match">🏈 Alabama '+clean(g.site)+' · '+clean(g.date)+'</div>';
 if(!g.model&&!g.market){
  html+='<div class="ert-pulse-empty"><b>Verified win estimates and betting figures are not available in this version for this matchup.</b><p>No invented percentages or odds. The links below let fans check newly published information, but this app does not automatically refresh betting lines.</p></div>';
 }else{
  if(Date.now()>new Date(g.iso+'T11:45:00-06:00').getTime()){
   html+='<p class="ert-pulse-warning">⚠️ Pregame archive. These figures are historical—not an in-game forecast or live betting market.</p>';
  }
  if(g.model){
   html+='<div class="ert-pulse-prediction"><h3>📈 Pregame win probability</h3>'+
    '<div class="ert-pulse-chances"><span>🐘 Alabama '+g.model.bama.toFixed(1)+'%</span><span>'+clean(g.name)+' '+g.model.opp.toFixed(1)+'%</span></div>'+
    '<div class="ert-pulse-meter" role="progressbar" aria-label="Alabama win probability" aria-valuenow="'+g.model.bama+'" aria-valuemin="0" aria-valuemax="100"><span style="width:'+g.model.bama+'%"></span></div>'+
    '<p class="ert-pulse-micro">'+clean(g.model.source)+' · this is an estimate, not a guaranteed result.</p></div>';
  }
  if(g.market){
   html+='<div class="ert-pulse-market"><h3>📊 Where the public bets are going</h3>'+
    '<p class="ert-pulse-source">'+clean(g.market.source)+' · captured '+clean(g.market.captured)+'</p>'+
    '<div class="ert-pulse-columns">'+g.market.rows.map(m=>
      '<article class="ert-pulse-market-card"><h4>'+clean(m.title)+'</h4>'+
      [m.a,m.b].map(side=>'<div class="ert-pulse-market-side"><b>'+clean(side[0])+'</b><span>'+side[1]+'% bets · '+side[2]+'% money</span></div>').join('')+'</article>'
    ).join('')+'</div></div>';
  }
 }
 html+='<div class="ert-pulse-links">'+(g.model?'<a href="'+clean(g.model.url)+'" target="_blank" rel="noopener noreferrer">ESPN prediction ↗</a>':'')+
 '<a href="'+DK+'" target="_blank" rel="noopener noreferrer">Latest published betting splits ↗</a>'+
 '<a href="https://rolltide.com/sports/football/schedule" target="_blank" rel="noopener noreferrer">Official game schedule ↗</a></div>';
 details.innerHTML=html;
}
let today;
try{const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const find=k=>parts.find(x=>x.type===k).value;today=find('year')+'-'+find('month')+'-'+find('day');}
catch(e){today=new Date().toISOString().slice(0,10);}
const next=matchupData.find(x=>x.iso>=today)||matchupData[matchupData.length-1];
selector.value=next.id;selector.addEventListener('change',render);render();
const secLink=schedule.querySelector('.ert-sec-schedule-link');
if(secLink){
 const b=document.createElement('button');b.type='button';b.className='ert-pulse-jump';b.textContent='🎯 Win Odds & Betting';
 secLink.appendChild(b);b.addEventListener('click',()=>panel.scrollIntoView({behavior:'smooth',block:'start'}));
}
})();