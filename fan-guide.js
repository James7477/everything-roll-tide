/* Everything Roll Tide Fan Guide V1.4 — isolated enhancement loaded after the existing app. */
(function () {
  'use strict';
  const official = {
    depth: 'https://www.si.com/college/alabama/football/alabama-football-announces-2026-depth-chart',
    roster: 'https://rolltide.com/sports/football/roster/2026',
    stat: 'https://www.cbssports.com/college-football/teams/BAMA/alabama-crimson-tide/stats/',
    staff: 'https://rolltide.com/sports/football/coaches',
    medicine: 'https://rolltide.com/sports/football/roster/staff/jeff-allen/1497',
    stadium: 'https://rolltide.com/sports/2016/6/10/facilities-bryant-denny-html',
    map: 'https://rolltide.com/documents/download/2026/1/6/2026_Alabama_Football_Saban_Field_at_Bryant-Denny_Stadium_Map__Without_Tiers_.pdf',
    numbering: 'https://rolltide.com/sports/2025/12/15/2026-saban-field-at-bryant-denny-stadium-gate-and-section-numbering',
    tickets: 'https://rolltide.com/sports/2016/6/10/tickets-m-footbl-html'
  };
  // September 4, 2026 Yea Alabama opening-game depth chart, transcribed from Alabama on SI.
  // Listed order is not an injury-adjusted in-season lineup. Some slots were officially "OR" competitions.
  const depth = [
    ['Offense','QB','Keelon Russell','Austin Mack','Jett Thomalla'],
    ['Offense','RB','Daniel Hill','Trae’shawn Brown','Kevin Riley · EJ Crowell (OR competition)'],
    ['Offense','WR-Z','Rico Scott','Cederian Morgan',''],
    ['Offense','WR-X','Ryan Coleman-Williams','Derek Meadows',''],
    ['Offense','WR-H','Lotzeir Brooks','Tyler Henderson',''],
    ['Offense','TE-Y','Kaleb Edwards','Josh Ford','Danny Lewis Jr. (OR competition)'],
    ['Offense','TE-H','Marshall Pritchett','Jay Lindsey','Mack Sutter'],
    ['Offense','LT','Jackson Lloyd','Tyrell Miller',''],
    ['Offense','LG','William Sanders','Mal Waldrep Jr.','Kaden Strayhorn (OR competition)'],
    ['Offense','C','Racin Delgatty','Casey Poe',''],
    ['Offense','RG','Michael Carroll','Ethan Fields',''],
    ['Offense','RT','Jayvin James','Nick Brooks',''],
    ['Defense','Bandit','Devan Thompkins','Desmond Umeozulu','Fatutoa Henry'],
    ['Defense','NT','Terrance Green','London Simmons','Isaia Faga'],
    ['Defense','DT','Kedrick Bingley-Jones','Devan Thompkins','Edric Hill (OR competition)'],
    ['Defense','Wolf','Yhonzae Pierre','Justin Hill','Jah-Marien Latham'],
    ['Defense','Stinger','Caleb Woodson','Xavier Griffin',''],
    ['Defense','Mike','Luke Metz','QB Reese','Abduall Sanders Jr.'],
    ['Defense','CB (1)','Zabien Brown','Zyan Gibson',''],
    ['Defense','CB (2)','Dijon Lee Jr.','Carmelo O’Neal',''],
    ['Defense','FS','Bray Hubbard','Zavier Mincey',''],
    ['Defense','SS','Keon Sabb','Dre Kirkpatrick Jr.','Ivan Taylor'],
    ['Defense','Husky','Red Morgan','Chuck McDonald III','Dre Kirkpatrick Jr.'],
    ['Special Teams','Kickoff','Lorcan Quinn','Conor Talty',''],
    ['Special Teams','Punter','Alex Asparuhov','Adam Watford','Anderson Green'],
    ['Special Teams','Snapper','Ethan Stangle','Alex Rozier',''],
    ['Special Teams','Punt Return','Ryan Coleman-Williams','Dijon Lee Jr.','Rico Scott'],
    ['Special Teams','Kick Return','Lotzeir Brooks','Trae’shawn Brown','Dijon Lee Jr.']
  ];
  const ticketRows = [
    ['East Carolina',60,30],['Florida State',150,125],['South Carolina',125,100],
    ['Georgia',225,225],['Texas A&M',200,200],['UT Chattanooga',60,30],['Auburn',205,205]
  ];
  const capacities = [
    ['1929–45',12000],['1946–60',31000],['1961–65',43000],['1966–87',59000],
    ['1988–97',70123],['1998–05',83818],['2006–09',92138],['2010–19',101821],['2020–now',100077]
  ];
  const root = document.querySelector('main');
  if (!root || document.getElementById('fanGuide')) return;
  // Keep the top-level app HTML as the source of truth; this module adds a new normal tab/screen.
  function link(url,label) {return '<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>';}
  const screen = document.createElement('section');
  screen.className='screen';screen.id='fanGuide';
  screen.innerHTML = `
    <p class="eyetext">V1.4 · Fan Guide</p><h1 class="page-title">🏟 The Complete Tide Guide</h1>
    <p class="guide-intro">First and second strings, the people behind the team, Bryant–Denny Stadium through the years, and an interactive seat-and-ticket guide. Dated facts are labeled, and official sources are one tap away.</p>
    <div class="guide-quicklinks">
      <button type="button" data-jump="guide-depth">🏈 Two-Deep</button><button type="button" data-jump="guide-people">🩺 Team Support</button><button type="button" data-jump="guide-stadium">🏟 Stadium History</button><button type="button" data-jump="guide-seats">🪑 Find My Section</button><button type="button" data-jump="guide-tickets">🎫 Ticket Prices</button>
    </div>
    <section id="guide-depth" class="guide-panel">
      <h2 class="guide-sub" style="margin-top:0">🏈 First & Second String — 2026</h2>
      <p class="guide-intro">Opening-week depth chart released September 4, 2026. These are listed players in the published order, <strong>not a claim about this week's injury-adjusted starters</strong>. Some positions are co-listed as “OR.”</p>
      <div class="guide-controls" id="depthFilters"><button type="button" data-depth="Offense" class="active">Offense</button><button type="button" data-depth="Defense">Defense</button><button type="button" data-depth="Special Teams">Special Teams</button></div>
      <input id="depthSearch" class="guide-input" placeholder="Find a player or position…" aria-label="Search depth chart" />
      <div id="guideDepthCount" class="guide-stat-summary" aria-live="polite"></div>
      <div class="guide-position-grid" id="guideDepthList"></div>
      <div class="guide-note">Individual stats below use the app's <strong>November 3, 2026</strong> verified snapshot where available. Offensive linemen usually have no traditional individual yardage/tackle statistics. If a figure is missing, it is <em>not</em> a zero. ${link(official.depth,'See original two-deep')} ${link(official.stat,'Check more recent player statistics')}</div>
    </section>
    <section id="guide-people" class="section guide-panel">
      <h2 class="guide-sub" style="margin-top:0">🩺 Who Keeps the Tide Running?</h2>
      <p>Football takes far more than 11 players on the field. Alabama lists coaches and specialists in football operations, but <strong>does not publish one verified total</strong> for every person needed behind the scenes on a given game day.</p>
      <div class="guide-ops-grid">
        <div class="guide-op"><b>🩺 Sports medicine</b><span>Jeff Allen — Associate Athletics Director, Sports Medicine (Football). Jeremy Gsell — Associate Head Athletic Trainer for Football. Injury evaluation, rehabilitation and coordinated medical care.</span></div>
        <div class="guide-op"><b>💪 Sports performance</b><span>David Ballou — Director, Sports Performance. Coaches and performance staff manage strength, conditioning, testing and athlete preparation.</span></div>
        <div class="guide-op"><b>🎯 Coaches & strategy</b><span>Head coach Kalen DeBoer; offensive coordinator Ryan Grubb; defensive coordinator Kane Wommack, plus position coaches, analysts and scouting support.</span></div>
        <div class="guide-op"><b>📋 Football operations & personnel</b><span>Courtney Morgan — General Manager; Bob Welton — Director, Player Personnel. Recruiting, roster building, administrative and football support functions.</span></div>
        <div class="guide-op"><b>🏈 Equipment & field crews</b><span>Uniforms, helmets, pads, footballs, sideline technology, field setup, and loading equipment before away trips. Specific current football-only staffing totals are not publicly verified here.</span></div>
        <div class="guide-op"><b>📹 Video, nutrition & travel</b><span>Film and video analysis, sports nutrition, academic support, travel planning, meals, buses, hotels, communications and game operations all contribute.</span></div>
      </div>
      <p class="guide-note">Jeff Allen's biography references <strong>27 athletic trainers across Alabama's athletics programs</strong>, not 27 assigned to football. That distinction matters. ${link(official.staff,'2026 official football staff')} ${link(official.medicine,'Jeff Allen biography')}</p>
    </section>
    <section id="guide-stadium" class="section guide-panel">
      <h2 class="guide-sub" style="margin-top:0">🏟 Bryant–Denny: 1929 to Today</h2>
      <p>The stadium opened on October 5, 1929 against Ole Miss with 12,000 seats. The field was dedicated as <strong>Saban Field</strong> in 2024. Following the 2020 renovation, the official capacity is <strong>100,077</strong>.</p>
      <div id="guideCapacityBars"></div>
      <div class="guide-note"><b>Stadium milestones:</b> 1946 — 31,000 seats; 1988 — west upper deck; 1998 — east upper deck; 2006 — north end-zone improvements; 2010 — south end-zone expansion to 101,821; 2020 — $107 million renovation with upgraded clubs, locker rooms, video boards and team spaces; 2024 — Saban Field dedication; 2026 — gates and sections renumbered.</div>
      <div class="guide-links">${link(official.stadium,'Official stadium history')} ${link(official.numbering,'2026 gate/section changes')}</div>
    </section>
    <section id="guide-seats" class="section guide-panel">
      <h2 class="guide-sub" style="margin-top:0">🪑 Where Is My Seat?</h2>
      <p class="guide-intro">Enter the <strong>2026 section number</strong> plus the row and seat shown on your ticket. We'll highlight the approximate section area; for the exact block, row, and gate, open Alabama's official stadium chart or consult your ticket.</p>
      <div class="guide-two-cols">
        <div>
          <div class="guide-seat-entries">
            <label>Section<input id="seatSection" list="seatSections" class="guide-input" inputmode="text" placeholder="e.g. 112 or 823" autocomplete="off"><datalist id="seatSections"></datalist></label>
            <label>Row<input id="seatRow" class="guide-input" maxlength="12" placeholder="e.g. 22"></label>
            <label>Seat<input id="seatNumber" class="guide-input" maxlength="12" placeholder="e.g. 8"></label>
          </div>
          <button type="button" id="seatFindButton" class="guide-cta">Locate My Section</button>
          <div class="guide-seat-results" id="seatLookupResult" aria-live="polite">Your section area will appear here.</div>
          <div class="guide-links">${link(official.map,'View full official 2026 seating chart')} ${link(official.numbering,'Old-to-new section lookup')}</div>
          <div class="guide-note">The diagram is our original <strong>orientation schematic</strong>, not a measured seating plan. Individual rows and seats are not mapped to coordinates. Upper and lower sections were renumbered for 2026; row and seat numbers did not change.</div>
        </div>
        <div class="guide-panel" style="padding:10px">
          <svg class="guide-stadium-svg" viewBox="0 0 520 590" role="img" aria-label="Approximate north, south, east, west stadium section guide; section marker appears after a search" id="seatSchematic">
            <defs><linearGradient id="guideRing" x1="0" x2="1"><stop offset="0" stop-color="#D0D3D9"/><stop offset="1" stop-color="#9299A7"/></linearGradient></defs>
            <ellipse cx="260" cy="294" rx="225" ry="260" fill="none" stroke="url(#guideRing)" stroke-width="36" opacity=".9"/>
            <ellipse cx="260" cy="294" rx="166" ry="206" fill="none" stroke="#a92149" stroke-width="43"/>
            <rect x="197" y="166" width="126" height="256" rx="6" fill="#537D68" stroke="#e0efdd" stroke-width="3"/>
            <path d="M 260 175 L 260 415 M 200 294 L 320 294 M 200 235 L 320 235 M 200 353 L 320 353" stroke="#eff7ef" stroke-width="2" opacity=".8"/>
            <text x="260" y="125" text-anchor="middle" fill="white" font-size="17" font-weight="bold">NORTH</text><text x="260" y="496" text-anchor="middle" fill="white" font-size="17" font-weight="bold">SOUTH</text>
            <text x="56" y="294" transform="rotate(-90 56 294)" text-anchor="middle" fill="white" font-size="16" font-weight="bold">WEST</text>
            <text x="464" y="294" transform="rotate(90 464 294)" text-anchor="middle" fill="white" font-size="16" font-weight="bold">EAST</text>
            <text x="260" y="285" text-anchor="middle" fill="white" font-size="14" font-weight="bold">ALABAMA</text><text x="260" y="304" text-anchor="middle" fill="white" font-size="12">FIELD</text>
            <circle id="seatMarker" cx="-30" cy="-30" r="14" fill="#ffe38c" stroke="#64152b" stroke-width="4"/><text id="seatMarkerLabel" x="-30" y="-30" font-size="14" fill="white" font-weight="900" text-anchor="middle"></text>
            <text x="260" y="576" text-anchor="middle" font-size="13" fill="#cfd3dc">Crimson = lower · Gray = upper · Not to scale</text>
          </svg>
        </div>
      </div>
    </section>
    <section id="guide-tickets" class="section guide-panel">
      <h2 class="guide-sub" style="margin-top:0">🎫 2026 Single-Game Ticket Price Guide</h2>
      <p>Published Alabama Athletics <b>face prices</b> by opponent and seating level (before sales tax). These are <b>not live listings</b> and do not guarantee any tickets remain available.</p>
      <div style="overflow-x:auto"><table class="guide-prices"><thead><tr><th>Home opponent</th><th>Lower</th><th>Upper</th></tr></thead><tbody id="guideTickets"></tbody></table></div>
      <p class="guide-note">Resale prices can change throughout the day and may include service fees. Check Alabama's official ticket office or its linked authorized SeatGeek marketplace before purchasing.</p>
      <div class="guide-links">${link(official.tickets,'Official prices, availability and buying options')} ${link(official.map,'View seats before buying')}</div>
    </section>
  `;
  root.appendChild(screen);
  const tabs = document.querySelector('.tabs');
  if (tabs) {
    const b=document.createElement('button');b.className='tab guide-nav-link';b.textContent='🏟 Fan Guide';b.type='button';b.dataset.tab='fanGuide';tabs.appendChild(b);
    b.addEventListener('click',()=>activate());
  }
  const bottom=document.querySelector('.bottom-nav');
  if(bottom){const b=document.createElement('button');b.className='navitem';b.type='button';b.dataset.tab='fanGuide';b.innerHTML='<span>🏟</span>Guide';bottom.appendChild(b);b.addEventListener('click',()=>activate());}
  const home=document.querySelector('#home .feature-links');
  if(home){const b=document.createElement('button');b.className='feature-link';b.type='button';b.innerHTML='<span class="feature-icon">🏟🎫</span><strong>Stadium, Seats &amp; Tickets</strong><small>Two-deep roster, section finder, prices and stadium history</small>';home.appendChild(b);b.addEventListener('click',()=>activate());}
  function activate(){if(typeof window.go==='function')window.go('fanGuide');else{document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id==='fanGuide'));document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x.dataset.tab==='fanGuide'));window.scrollTo(0,0);}}
  screen.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'})));
  const sane=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function matchingStat(name) {
    const strip=s=>String(s).toLowerCase().normalize('NFKD').replace(/[‘’']/g,'').replace(/[^a-z0-9]/g,'');
    const matches=typeof playerStatDetails!=='undefined'?playerStatDetails:{};
    const key=Object.keys(matches).find(k=>strip(k)===strip(name));
    return key ? matches[key].join(' · ') : null;
  }
  let activeUnit='Offense';
  function renderDepth(){
    const q=screen.querySelector('#depthSearch').value.trim().toLowerCase();
    const rows=depth.filter(d=>d[0]===activeUnit&&d.slice(1).join(' ').toLowerCase().includes(q));
    screen.querySelector('#guideDepthCount').textContent=rows.length+' position groups · '+activeUnit+' · published opening-week chart, Sep 4, 2026';
    screen.querySelector('#guideDepthList').innerHTML=rows.length?rows.map(d=>{
      const person=(name,label)=>{const stats=matchingStat(name);return name?'<div class="guide-person"><small>'+label+'</small><b>'+sane(name)+'</b><div class="guide-stat">'+(stats?sane(stats)+' <span style="opacity:.7">(Nov 3)</span>':'No individually verified figures in offline snapshot; check current player stats.')+'</div></div>':'';};
      return '<article class="guide-position"><h4>'+sane(d[1])+'</h4>'+person(d[2],'1st listed')+person(d[3],'2nd listed')+(d[4]?'<div class="guide-person"><small>Additional / OR</small><b>'+sane(d[4])+'</b></div>':'')+'</article>';
    }).join(''):'<p class="guide-note">No players or positions match that search in the selected unit.</p>';
  }
  screen.querySelectorAll('[data-depth]').forEach(b=>b.addEventListener('click',()=>{
    activeUnit=b.dataset.depth;screen.querySelectorAll('[data-depth]').forEach(btn=>btn.classList.toggle('active',btn===b));renderDepth();
  }));
  screen.querySelector('#depthSearch').addEventListener('input',renderDepth);
  renderDepth();
  screen.querySelector('#guideCapacityBars').innerHTML=capacities.map(([label,n])=>'<div class="guide-capacity"><span class="year">'+label+'</span><div class="capacity-track"><span style="width:'+(n/101821*100).toFixed(1)+'%"></span></div><span class="count">'+n.toLocaleString()+'</span></div>').join('');
  screen.querySelector('#guideTickets').innerHTML=ticketRows.map(([game,lower,upper])=>'<tr><td>'+sane(game)+'</td><td>$'+lower+'</td><td>$'+upper+'</td></tr>').join('');
  const datalist=screen.querySelector('#seatSections');for(let n=101;n<=142;n++){datalist.appendChild(new Option(String(n),String(n)));}for(let n=801;n<=860;n++){datalist.appendChild(new Option(String(n),String(n)));}
  function locateSeat(){
    const raw=screen.querySelector('#seatSection').value.trim().toUpperCase();
    const row=screen.querySelector('#seatRow').value.trim();const seat=screen.querySelector('#seatNumber').value.trim();
    const result=screen.querySelector('#seatLookupResult');const marker=screen.querySelector('#seatMarker'), label=screen.querySelector('#seatMarkerLabel');
    marker.setAttribute('cx','-30');marker.setAttribute('cy','-30');label.textContent='';
    if(!raw){result.textContent='Enter the section printed on your ticket first.';return;}
    if(!/^[0-9A-Z-]{1,12}$/.test(raw)){result.textContent='Please enter a valid section label from your ticket.';return;}
    const section=Number(raw);const lower=/^\d{3}$/.test(raw)&&section>=101&&section<=142,upper=/^\d{3}$/.test(raw)&&section>=801&&section<=860;
    const location=lower?(section<=113?'west':section<=121?'north':section<=134?'east':'south'):upper?(section<=817?'west':section<=829?'north':section<=847?'east':'south'):null;
    const seatLine=(row?' · Row '+sane(row):'')+(seat?' · Seat '+sane(seat):'');
    if(!location){result.innerHTML='<strong>Section '+sane(raw)+seatLine+'</strong><br>This section is not on the simplified lower/upper-bowl sketch (it may be premium or a different label). Use the official 2026 chart to locate your section and gate.';return;}
    // Evenly spaced schematic sector centers. Orientation only, not precise seat location.
    const frac=lower?(section-101)/41:(section-801)/59;
    const angle=(122+frac*356)*Math.PI/180,rx=lower?166:225,ry=lower?206:260;
    const x=260+rx*Math.cos(angle),y=294+ry*Math.sin(angle);
    marker.setAttribute('cx',x.toFixed(1));marker.setAttribute('cy',y.toFixed(1));
    label.setAttribute('x',x.toFixed(1));label.setAttribute('y',(y-21).toFixed(1));label.textContent=raw;
    result.innerHTML='<strong>Section '+sane(raw)+seatLine+'</strong><br>Approximate '+location+' '+(lower?'lower':'upper')+' bowl. The yellow dot shows the section area only. Check your mobile ticket for entry gate and the official chart for the exact section.';
  }
  screen.querySelector('#seatFindButton').addEventListener('click',locateSeat);
  screen.querySelectorAll('#seatSection,#seatRow,#seatNumber').forEach(el=>el.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();locateSeat();}}));
})();