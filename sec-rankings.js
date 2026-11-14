/* Everything Roll Tide V1.7 — SEC standings and AP rankings at kickoff (offline dated snapshots). */
(function(){
  'use strict';
  var sec=[
    ['Georgia',6,1,8,1,1,1],
    ['Alabama',5,2,7,2,7,3],
    ['Kentucky',5,2,7,2,13,11],
    ['Tennessee',4,2,7,2,9,8],
    ['Texas',4,2,7,2,8,6],
    ['Ole Miss',4,3,6,3,19,19],
    ['South Carolina',4,3,6,3,20,17],
    ['LSU',3,3,6,3,24,21],
    ['Missouri',3,3,6,3,null,22],
    ['Oklahoma',3,3,5,4,null,null],
    ['Auburn',3,4,5,4,null,null],
    ['Florida',3,4,5,4,null,null],
    ['Mississippi State',2,5,4,5,null,null],
    ['Texas A&M',1,5,4,5,null,null],
    ['Vanderbilt',1,5,4,5,null,null],
    ['Arkansas',1,5,3,6,null,null]
  ];
  var pollForGames={
    'Sep 05':{week:2,bama:13,opp:null},
    'Sep 12':{week:3,bama:12,opp:null},
    'Sep 19':{week:4,bama:10,opp:null},
    'Sep 26':{week:5,bama:8,opp:null},
    'Oct 03':{week:6,bama:7,opp:16},
    'Oct 10':{week:7,bama:6,opp:2},
    'Oct 17':{week:8,bama:6,opp:14},
    'Oct 24':{week:9,bama:13,opp:null},
    'Nov 07':{week:11,bama:9,opp:15},
    'Nov 14':{week:12,bama:7,opp:null}
  };
  var main=document.querySelector('main');
  var schedule=document.getElementById('schedule');
  var games=document.getElementById('gameList');
  if(!main || !schedule || !games || document.getElementById('secRankings')) return;
  function openSEC(){
    if(typeof go==='function')go('secRankings');
    else {
      document.querySelectorAll('.screen').forEach(function(e){e.classList.toggle('active',e.id==='secRankings')});
      document.querySelectorAll('[data-tab]').forEach(function(e){e.classList.toggle('active',e.dataset.tab==='secRankings')});
      window.scrollTo(0,0);
    }
  }
  function escapeText(s){return String(s).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]});}
  var standings=document.createElement('section');
  standings.id='secRankings';
  standings.className='screen';
  standings.innerHTML=
    '<p class="eyetext">2026 · SEC Football</p>'+
    '<h1 class="page-title">🏆 SEC Standings &amp; National Rankings</h1>'+
    '<p class="section-intro">All 16 Southeastern Conference teams, ordered as published by the SEC. Standings are a <strong>November 14, 2026 pre-game snapshot</strong>; they will not change automatically when games finish.</p>'+
    '<div class="ert-sec-overview">'+
      '<div><small>Alabama SEC record</small><strong>5–2</strong><span>Tied with Kentucky by league record</span></div>'+
      '<div><small>AP Top 25 · Nov 8</small><strong>#7</strong><span>Alabama national poll ranking</span></div>'+
      '<div><small>CFP · Nov 10</small><strong>#3</strong><span>Alabama playoff committee ranking</span></div>'+
    '</div>'+
    '<div class="ert-sec-controls">'+
      '<label for="ertSecSearch">Find an SEC team</label>'+
      '<input id="ertSecSearch" type="search" placeholder="Search Georgia, Alabama, Auburn..." autocomplete="off" />'+
      '<button id="ertSecScheduleBtn" type="button">📅 Open Game Schedule</button>'+
    '</div>'+
    '<div class="ert-sec-table-wrap"><table class="ert-sec-table" aria-label="Southeastern Conference standings with AP and playoff rankings"><thead><tr><th scope="col" aria-label="Conference position">#</th><th scope="col">Team</th><th scope="col" aria-label="SEC conference record">SEC</th><th scope="col" aria-label="Overall record">OVR</th><th scope="col" aria-label="AP national ranking">AP</th><th scope="col" aria-label="College Football Playoff ranking">CFP</th></tr></thead><tbody id="ertSecRows"></tbody></table></div>'+
    '<p class="ert-sec-footnote"># = position by conference winning percentage; SEC = conference win-loss record; OVR = overall win-loss record; T means teams have the same conference winning percentage, <strong>not</strong> an official championship tiebreak. AP = national Associated Press Top 25 poll of Nov 8; CFP = national selection committee ranking of Nov 10. NR = not ranked in that poll. Rankings and records are separate measures.</p>'+
    '<div class="ert-sec-sources"><a href="https://www.secsports.com/standings/football" target="_blank" rel="noopener noreferrer">Official SEC standings ↗</a><a href="https://www.warrennolan.com/fbs/2026/polls/week/12" target="_blank" rel="noopener noreferrer">Nov 8 AP Top 25 ↗</a><a href="https://collegefootballplayoff.com/news/2026/11/10/rankings" target="_blank" rel="noopener noreferrer">Nov 10 CFP Top 25 ↗</a></div>';
  main.appendChild(standings);
  function renderStandings(){
    var q=standings.querySelector('#ertSecSearch').value.trim().toLowerCase();
    var rows=sec.filter(function(r){return r[0].toLowerCase().includes(q)});
    standings.querySelector('#ertSecRows').innerHTML=rows.length?rows.map(function(r){
      var pct=r[1]/(r[1]+r[2]),above=sec.filter(function(v){return v[1]/(v[1]+v[2])>pct+0.0000001}).length;
      var tied=sec.filter(function(v){return Math.abs(v[1]/(v[1]+v[2])-pct)<0.0000001}).length>1;
      var place=(tied?'T-':'')+(above+1);
      return '<tr'+(r[0]==='Alabama'?' class="ert-sec-alabama"':'')+'><td class="ert-sec-place">'+place+'</td><td class="ert-sec-team">'+escapeText(r[0])+(r[0]==='Alabama'?' 🐘':'')+'</td><td>'+r[1]+'–'+r[2]+'</td><td>'+r[3]+'–'+r[4]+'</td><td>'+(r[5]?'#'+r[5]:'NR')+'</td><td>'+(r[6]?'#'+r[6]:'NR')+'</td></tr>';
    }).join(''):'<tr><td colspan="6">No SEC teams match that search.</td></tr>';
  }
  standings.querySelector('#ertSecSearch').addEventListener('input',renderStandings);
  standings.querySelector('#ertSecScheduleBtn').addEventListener('click',function(){if(typeof go==='function')go('schedule');});
  renderStandings();
  var tabs=document.querySelector('.tabs');
  if(tabs){
    var tab=document.createElement('button');tab.type='button';tab.className='tab';tab.dataset.tab='secRankings';tab.textContent='🏆 SEC Rankings';
    tabs.appendChild(tab);tab.addEventListener('click',openSEC);
  }
  var scheduleIntro=schedule.querySelector('.section-intro');
  if(scheduleIntro){
    var box=document.createElement('div');
    box.className='ert-sec-schedule-link';
    box.innerHTML='<strong>🏆 SEC Rankings</strong><span>All 16 teams • conference records, AP Top 25 and CFP ranks</span><button type="button" id="ertSecJump">View SEC Rankings →</button>';
    scheduleIntro.insertAdjacentElement('afterend',box);
    box.querySelector('#ertSecJump').addEventListener('click',openSEC);
  }
  var home=document.querySelector('#home .feature-links');
  if(home){
    var shortcut=document.createElement('button');
    shortcut.type='button';shortcut.className='feature-link';
    shortcut.innerHTML='<span class="feature-icon">🏆</span><strong>SEC Rankings</strong><small>All 16 SEC teams, conference records, AP and CFP ranks</small>';
    home.appendChild(shortcut);shortcut.addEventListener('click',openSEC);
  }
  function decorateGames(){
    var cards=games.querySelectorAll('.game');
    cards.forEach(function(card){
      if(card.dataset.ertRanked==='yes')return;
      var dateEl=card.querySelector('.gamedate'),opponentEl=card.querySelector('.opponent');
      if(!dateEl || !opponentEl)return;
      // Original game cards uppercase the month, while the archive uses title-case keys.
      var displayDate=dateEl.textContent.trim().slice(0,6);
      var dateKey=displayDate.charAt(0)+displayDate.slice(1).toLowerCase();
      var opponent=opponentEl.textContent.trim();
      var poll=pollForGames[dateKey];
      var info=document.createElement('div');
      info.className='ert-game-ranking';
      if(poll){
        var source='https://www.warrennolan.com/fbs/2026/polls/week/'+poll.week;
        info.innerHTML='<span class="ert-game-ranking-label">AP ranks for game week:</span> '+
          '<strong>#'+poll.bama+' Alabama</strong> <span class="ert-vs">vs</span> <strong>'+(poll.opp?'#'+poll.opp:'NR')+' '+escapeText(opponent)+'</strong>'+
          ' <a href="'+source+'" target="_blank" rel="noopener noreferrer" aria-label="See AP poll used for '+escapeText(opponent)+' game">Poll source ↗</a>';
      }else{
        info.innerHTML='<span class="ert-game-ranking-label">Game-week AP ranking:</span> <strong>Not in this dated snapshot</strong>'+
          ' <a href="https://apnews.com/hub/ap-top-25-college-football-poll" target="_blank" rel="noopener noreferrer">Check latest AP poll ↗</a>';
      }
      var location=card.querySelector('.gamelocation');
      if(location)location.insertAdjacentElement('afterend',info);
      else card.appendChild(info);
      card.dataset.ertRanked='yes';
    });
  }
  decorateGames();
  var observer=new MutationObserver(function(list){
    if(list.some(function(m){return m.target===games && m.addedNodes.length>0;}))decorateGames();
  });
  observer.observe(games,{childList:true});
  window.openTideSECStandings=openSEC;
})();