/* Public pages 2 — Tickets, Team profile, Player profile, News list, Article */
const { useState: qS, useMemo: qM } = React;
const QD = window.LIGA_DATA;

function TicketsPage({ go }) {
  const upcoming = QD.FIXTURES.filter(f => f.status === 'scheduled');
  const [matchIdx, setMatchIdx] = qS(0);
  const [tier, setTier] = qS('std');
  const [section, setSection] = qS('north');
  const m = upcoming[matchIdx];
  const home = QD.byId(m.home), away = QD.byId(m.away);

  const tiers = [
    { id:'fan', name:'Fan zone', price:15, popular:false, stock:'high', features:['სტადიონის ღია სექტორი','დასასვენებელი ზონა','სასმელი/ჭამადი ბარი'] },
    { id:'std', name:'Standard', price:35, popular:true, stock:'high', features:['კარგი ხედი','მოხვევა ცენტრალური','საწყობში დაცული ადგილი','დაბრუნების გარანტია'] },
    { id:'prm', name:'Premium', price:75, popular:false, stock:'low', features:['ცენტრალური სექცია','VIP შესვლა','უფასო პროგრამა','ბარი + სასმელი'] },
    { id:'vip', name:'VIP Lounge', price:180, popular:false, stock:'low', features:['სკაი ბოქსი','კატერინგი','ვიპ პარკინგი','მოთამაშეებთან შეხვედრა'] },
  ];

  const sections = [
    { id:'north', name:'ჩრდილოეთი', sold:false }, { id:'south', name:'სამხრეთი', sold:false },
    { id:'east', name:'აღმოსავლეთი', sold:false }, { id:'west', name:'დასავლეთი (VIP)', sold:false },
    { id:'ne', name:'ჩრ-აღმ', sold:true }, { id:'nw', name:'ჩრ-დას', sold:false },
    { id:'se', name:'სამ-აღმ', sold:false }, { id:'sw', name:'სამ-დას', sold:true },
  ];

  const fmtDate = (d) => new Date(d).toLocaleDateString('ka-GE', { weekday:'long', day:'numeric', month:'long' });

  return (
    <>
      <section className="tickets-hero">
        <div className="pub-container">
          <span className="pub-section-eyebrow">ბილეთები</span>
          <h1 style={{fontSize:'clamp(36px, 5vw, 56px)', fontWeight:900, letterSpacing:'-0.03em', margin:'8px 0 12px', lineHeight:1.05}}>
            იყავი იქ, სადაც <em style={{fontStyle:'normal',color:'var(--accent)'}}>ისტორია იწერება</em>
          </h1>
          <p style={{fontSize:16, color:'var(--text-2)', maxWidth:560, margin:0}}>
            აირჩიე მატჩი, სექცია და ბილეთის ტიპი — და მიიღე ემოცია პირდაპირ ტრიბუნიდან.
          </p>
        </div>
      </section>

      <div className="pub-container pub-section">
        <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:16, marginBottom:24}}>
          {upcoming.map((f, i) => {
            const h = QD.byId(f.home), a = QD.byId(f.away);
            return (
              <button key={f.id} onClick={()=>setMatchIdx(i)}
                style={{
                  flexShrink:0, padding:'12px 18px',
                  background: i===matchIdx ? 'var(--bg-2)' : 'var(--bg-1)',
                  border: `1px solid ${i===matchIdx ? 'var(--accent)' : 'var(--line)'}`,
                  borderRadius:'var(--r-md)', color:'inherit', cursor:'pointer',
                  font:'inherit', textAlign:'left', minWidth:200,
                }}>
                <div style={{fontSize:11, color:'var(--text-3)', fontFamily:'var(--ff-mono)', letterSpacing:'.06em', textTransform:'uppercase'}}>
                  ტური {f.round} · {fmtDate(f.date).split(',')[0]}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginTop:6, fontSize:14, fontWeight:600}}>
                  <PCrest team={h} size="sm" /> vs <PCrest team={a} size="sm" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="ticket-match">
          <div className="ticket-team-block">
            <PCrest team={home} size="xl" />
            <h2>{home.name}</h2>
            <span className="city">{home.city} · სახლის</span>
          </div>
          <div className="ticket-vs">VS</div>
          <div className="ticket-team-block">
            <PCrest team={away} size="xl" />
            <h2>{away.name}</h2>
            <span className="city">{away.city} · სტუმარი</span>
          </div>
        </div>

        <div className="ticket-info-bar">
          <div className="ticket-info"><div className="ticket-info-label">თარიღი</div><div className="ticket-info-val">{fmtDate(m.date)}</div></div>
          <div className="ticket-info"><div className="ticket-info-label">დრო</div><div className="ticket-info-val">{m.time}</div></div>
          <div className="ticket-info"><div className="ticket-info-label">სტადიონი</div><div className="ticket-info-val">{m.stadium}</div></div>
          <div className="ticket-info"><div className="ticket-info-label">ტური</div><div className="ticket-info-val">{m.round} / 27</div></div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:24, alignItems:'start'}} className="tickets-layout">
          <div>
            <h3 style={{fontSize:18, fontWeight:700, margin:'0 0 16px'}}>აირჩიე ბილეთის ტიპი</h3>
            <div className="ticket-tiers">
              {tiers.map(t => (
                <div key={t.id} className={`tier-card ${tier===t.id?'selected':''} ${t.popular?'popular':''}`} onClick={()=>setTier(t.id)}>
                  <div className="tier-name">{t.name}</div>
                  <div className="tier-price">₾{t.price}<small>/ ბილეთი</small></div>
                  <ul className="tier-features">
                    {t.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <div className={`tier-stock ${t.stock}`}>
                    <span className="dot"></span>
                    {t.stock==='high'?'ხელმისაწვდომი':'ცოტაა დარჩენილი'}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{fontSize:18, fontWeight:700, margin:'40px 0 16px'}}>აირჩიე სექცია</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:8}}>
              {sections.map(s => (
                <button key={s.id} disabled={s.sold} onClick={()=>!s.sold && setSection(s.id)}
                  style={{
                    padding:'12px 14px',
                    background: s.sold ? 'var(--bg-2)' : section===s.id ? 'rgba(232,51,109,.12)' : 'var(--bg-1)',
                    border: `1px solid ${section===s.id && !s.sold ? 'var(--accent)' : 'var(--line)'}`,
                    borderRadius:'var(--r-sm)', color: s.sold?'var(--text-4)':'inherit',
                    cursor: s.sold?'not-allowed':'pointer', font:'inherit', textAlign:'left',
                    fontSize:13, fontWeight:600,
                  }}>
                  {s.name}
                  <div style={{fontSize:10, color:'var(--text-3)', fontFamily:'var(--ff-mono)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>
                    {s.sold ? 'გაყიდულია' : 'ხელმისაწვდომი'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{position:'sticky', top:88, display:'flex', flexDirection:'column', gap:16}}>
            <div className="stadium-map">
              <div style={{fontSize:11, color:'var(--text-3)', fontFamily:'var(--ff-mono)', letterSpacing:'.08em', textTransform:'uppercase'}}>{m.stadium}</div>
              <svg className="stadium-svg" viewBox="0 0 200 200">
                <ellipse cx="100" cy="100" rx="90" ry="70" fill="var(--bg-2)" />
                <rect className="pitch-svg" x="55" y="65" width="90" height="70" rx="4" />
                <line x1="100" y1="65" x2="100" y2="135" stroke="rgba(45,212,164,.5)" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="8" fill="none" stroke="rgba(45,212,164,.5)" strokeWidth="0.5" />
                {/* Sections */}
                <path className={`stadium-section ${section==='north'?'selected':''}`} d="M30 75 Q100 30 170 75 L155 90 Q100 55 45 90 Z" onClick={()=>setSection('north')} />
                <path className={`stadium-section ${section==='south'?'selected':''}`} d="M45 110 Q100 145 155 110 L170 125 Q100 170 30 125 Z" onClick={()=>setSection('south')} />
                <path className={`stadium-section ${section==='west'?'selected':''}`} d="M30 75 Q15 100 30 125 L45 110 Q35 100 45 90 Z" onClick={()=>setSection('west')} />
                <path className={`stadium-section ${section==='east'?'selected':''}`} d="M170 75 Q185 100 170 125 L155 110 Q165 100 155 90 Z" onClick={()=>setSection('east')} />
              </svg>
              <div style={{fontSize:12, color:'var(--text-2)', textAlign:'center'}}>
                სექცია: <strong style={{color:'var(--text-1)'}}>{sections.find(s=>s.id===section)?.name || '—'}</strong>
              </div>
            </div>

            <div style={{background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r-md)', padding:20}}>
              <div style={{fontSize:11, color:'var(--text-3)', fontFamily:'var(--ff-mono)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:12}}>შენი ბილეთი</div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--line)', fontSize:13}}>
                <span style={{color:'var(--text-3)'}}>ტიპი</span>
                <strong>{tiers.find(t=>t.id===tier)?.name}</strong>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--line)', fontSize:13}}>
                <span style={{color:'var(--text-3)'}}>სექცია</span>
                <strong>{sections.find(s=>s.id===section)?.name}</strong>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--line)', fontSize:13}}>
                <span style={{color:'var(--text-3)'}}>რაოდენობა</span>
                <strong>1 ბილეთი</strong>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'14px 0 8px', fontSize:14}}>
                <span>ჯამი</span>
                <strong style={{fontSize:24, fontWeight:800, letterSpacing:'-0.02em'}}>₾{tiers.find(t=>t.id===tier)?.price}</strong>
              </div>
              <button className="pub-btn primary lg" style={{width:'100%', justifyContent:'center', marginTop:8}}>
                ბილეთის შეძენა →
              </button>
              <div style={{fontSize:11, color:'var(--text-3)', textAlign:'center', marginTop:10, fontFamily:'var(--ff-mono)', letterSpacing:'.04em'}}>
                💳 უსაფრთხო გადახდა · 📱 მობილური ბილეთი
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Team profile (fan) ──
function TeamPubPage({ teamId, go }) {
  const t = QD.byId(teamId || 'din');
  const standing = QD.STANDINGS.find(s => s.team === t.id);
  const pos = [...QD.STANDINGS].sort((a,b)=>b.pts-a.pts).findIndex(s=>s.team===t.id) + 1;
  const teamPlayers = QD.SCORERS.filter(p => p.team === t.id);
  const fixtures = QD.FIXTURES.filter(f => f.home === t.id || f.away === t.id);
  const [tab, setTab] = qS('squad');

  return (
    <>
      <section className="team-banner" style={{'--team-color': t.color}}>
        <div className="pub-container">
          <div className="team-banner-inner">
            <PCrest team={t} size="huge" />
            <div className="team-banner-info">
              <span style={{fontFamily:'var(--ff-mono)', fontSize:11, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(255,255,255,.7)'}}>
                ეროვნული ლიგა · #{pos}
              </span>
              <h1>{t.name}</h1>
              <div className="meta">
                <span>ქალაქი<strong>{t.city}</strong></span>
                <span>დაარსდა<strong>{t.founded}</strong></span>
                <span>ფორმა<strong style={{marginLeft:8}}><FormPills form={standing.form} /></strong></span>
              </div>
            </div>
            <div className="team-banner-stats">
              <div className="team-banner-stat">
                <div className="team-banner-stat-num">{standing.pts}</div>
                <div className="team-banner-stat-label">ქულა</div>
              </div>
              <div className="team-banner-stat">
                <div className="team-banner-stat-num">{standing.gd>=0?'+':''}{standing.gd}</div>
                <div className="team-banner-stat-label">გოლის სხვ.</div>
              </div>
              <div className="team-banner-stat">
                <div className="team-banner-stat-num">{standing.w}-{standing.d}-{standing.l}</div>
                <div className="team-banner-stat-label">მ-ფ-წ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="subnav">
        <div className="subnav-inner">
          {[['squad','შემადგენლობა'],['fixtures','მატჩები'],['stats','სტატისტიკა'],['about','შესახებ']].map(([k,l])=>(
            <button key={k} className="subnav-link" aria-current={tab===k?'page':undefined} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="pub-container pub-section" style={{'--team-color': t.color}}>
        {tab === 'squad' && (
          <>
            <div className="pub-section-head">
              <h2 className="pub-section-title" style={{fontSize:24}}>გუნდის შემადგენლობა</h2>
              <span style={{fontSize:13, color:'var(--text-3)'}}>{teamPlayers.length} მოთამაშე ლიდერებში</span>
            </div>
            <div className="squad-grid">
              {teamPlayers.length ? teamPlayers.map(p => (
                <div key={p.id} className="player-card" onClick={()=>go('player', p.id)}>
                  <span className="num">{p.no}</span>
                  <div className="player-portrait">{p.name.split(' ').map(s=>s[0]).join('').slice(0,2)}</div>
                  <h4>{p.name}</h4>
                  <div className="pos">{p.pos==='F'?'თავდამსხმელი':p.pos==='M'?'ნახ-ცემელი':'მცველი'}</div>
                  <div className="stats">
                    <span><strong>{p.goals}</strong>გოლი</span>
                    <span><strong>{p.assists}</strong>ასისტი</span>
                  </div>
                </div>
              )) : (
                <div style={{gridColumn:'1/-1', textAlign:'center', padding:48, color:'var(--text-3)'}}>
                  ამ გუნდის მოთამაშეების სტატისტიკა მალე გამოქვეყნდება
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'fixtures' && (
          <>
            <div className="pub-section-head"><h2 className="pub-section-title" style={{fontSize:24}}>ყველა მატჩი</h2></div>
            <div className="matches-strip">
              {fixtures.map(f => {
                const h = QD.byId(f.home), a = QD.byId(f.away);
                const isLive = f.status === 'live';
                return (
                  <div key={f.id} className="match-card" onClick={()=>go('match')}>
                    <div className="match-card-head">
                      <span>ტური {f.round}</span>
                      {isLive ? <span className="live-pill">{f.minute}'</span> : <span>{f.status==='finished'?'FT':f.time}</span>}
                    </div>
                    <div className="match-card-team winner">
                      <span className="name"><PCrest team={h} size="sm" />{h.name}</span>
                      <span className="score">{f.hs ?? '–'}</span>
                    </div>
                    <div className="match-card-team winner">
                      <span className="name"><PCrest team={a} size="sm" />{a.name}</span>
                      <span className="score">{f.as ?? '–'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === 'stats' && (
          <div className="hero-stats" style={{margin:0}}>
            <div className="hero-stat"><div className="hero-stat-num">{standing.gf}</div><div className="hero-stat-label">გოლი ჯამში</div></div>
            <div className="hero-stat"><div className="hero-stat-num">{standing.ga}</div><div className="hero-stat-label">გაცდილი</div></div>
            <div className="hero-stat"><div className="hero-stat-num">{Math.round(standing.gf/standing.p*100)/100}</div><div className="hero-stat-label">გოლი/მატჩი</div></div>
          </div>
        )}

        {tab === 'about' && (
          <div style={{maxWidth:680, fontSize:16, lineHeight:1.7, color:'var(--text-2)'}}>
            <p>{t.name} — ერთ-ერთი უძველესი და ცნობილი კლუბი საქართველოში, დაარსებულია {t.founded} წელს {t.city}-ში.</p>
            <p>კლუბის ისტორია მჭიდროდ არის დაკავშირებული საქართველოს ფეხბურთის უმნიშვნელოვანეს მომენტებთან. 2025/26 სეზონში გუნდი იბრძვის ჩემპიონობისთვის.</p>
          </div>
        )}
      </div>
    </>
  );
}

// ── Player profile ──
function PlayerPubPage({ playerId, go }) {
  const p = QD.SCORERS.find(x => x.id === playerId) || QD.SCORERS[0];
  const t = QD.byId(p.team);
  const initials = p.name.split(' ').map(s=>s[0]).join('').slice(0,2);

  return (
    <>
      <section className="player-hero" data-num={p.no} style={{'--team-color': t.color}}>
        <div className="pub-container">
          <div className="player-hero-inner">
            <div className="player-portrait-lg">{initials}</div>
            <div className="player-hero-info">
              <h1><small>#{p.no} · {t.name}</small>{p.name}</h1>
              <div className="player-hero-tags">
                <span className="player-tag">{p.pos==='F'?'თავდამსხმელი':p.pos==='M'?'ნახევრადცემელი':'მცველი'}</span>
                <span className="player-tag">{p.age} წლის</span>
                <span className="player-tag" style={{background:'var(--accent)', borderColor:'var(--accent)'}}>{p.goals} გოლი</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pub-container">
          <div className="player-stats-row">
            <div className="player-stat"><div className="player-stat-num">{p.goals}</div><div className="player-stat-label">გოლი</div></div>
            <div className="player-stat"><div className="player-stat-num">{p.assists}</div><div className="player-stat-label">ასისტი</div></div>
            <div className="player-stat"><div className="player-stat-num">{p.apps}</div><div className="player-stat-label">მატჩი</div></div>
            <div className="player-stat"><div className="player-stat-num">{p.mins}'</div><div className="player-stat-label">წუთები</div></div>
            <div className="player-stat"><div className="player-stat-num">{p.shots}</div><div className="player-stat-label">დარტყმა</div></div>
            <div className="player-stat"><div className="player-stat-num">{p.accuracy}%</div><div className="player-stat-label">სიზუსტე</div></div>
          </div>
        </div>
      </section>

      <div className="pub-container pub-section">
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:24}}>
          <div className="mc-card">
            <div className="mc-card-head"><h3>სეზონის ფორმა</h3></div>
            <div className="mc-card-body">
              <p style={{margin:'0 0 16px', color:'var(--text-2)', lineHeight:1.7}}>
                {p.name} — {t.name}-ის ერთ-ერთი ლიდერი ამ სეზონში. {p.apps} მატჩში {p.goals} გოლი და {p.assists} ასისტი.
                ყვითელი ბარათი: {p.yellow}, წითელი: {p.red}.
              </p>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12}}>
                <div style={{padding:16, background:'var(--bg-2)', borderRadius:'var(--r-sm)'}}>
                  <div style={{fontSize:11, color:'var(--text-3)', fontFamily:'var(--ff-mono)', letterSpacing:'.08em', textTransform:'uppercase'}}>გოლი/მატჩი</div>
                  <div style={{fontSize:24, fontWeight:800, marginTop:4}}>{(p.goals/p.apps).toFixed(2)}</div>
                </div>
                <div style={{padding:16, background:'var(--bg-2)', borderRadius:'var(--r-sm)'}}>
                  <div style={{fontSize:11, color:'var(--text-3)', fontFamily:'var(--ff-mono)', letterSpacing:'.08em', textTransform:'uppercase'}}>წუთი/გოლი</div>
                  <div style={{fontSize:24, fontWeight:800, marginTop:4}}>{Math.round(p.mins/p.goals)}'</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mc-card">
            <div className="mc-card-head"><h3>გუნდი</h3></div>
            <div className="mc-card-body" style={{textAlign:'center'}}>
              <div onClick={()=>go('team', t.id)} style={{cursor:'pointer'}}>
                <PCrest team={t} size="xl" />
                <h3 style={{margin:'12px 0 4px', fontSize:18}}>{t.name}</h3>
                <div style={{fontSize:12, color:'var(--text-3)', fontFamily:'var(--ff-mono)', letterSpacing:'.08em', textTransform:'uppercase'}}>{t.city} · ბრუნდება {t.founded}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── News list ──
function NewsListPage({ go }) {
  return (
    <div className="pub-container pub-section">
      <div className="pub-section-head">
        <div>
          <span className="pub-section-eyebrow">ახალი ამბები</span>
          <h2 className="pub-section-title">ყველა სტატია</h2>
        </div>
      </div>
      <div className="news-grid">
        {window.NEWS.map((n,i)=>(
          <article key={n.id} className={`news-card ${i===0?'featured':''}`} onClick={()=>go('article', n.id)}>
            <div className="news-thumb">
              <span className="news-tag">{n.tag}</span>
              <div className="news-thumb-bg" style={{background: n.img}} />
            </div>
            <div className="news-body">
              <div className="news-meta">{n.date} · {n.author}</div>
              <h3 className="news-title">{n.title}</h3>
              <p className="news-excerpt">{n.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ArticlePage({ articleId, go }) {
  const n = window.NEWS.find(x => x.id === articleId) || window.NEWS[0];
  return (
    <div className="pub-container pub-section">
      <div className="article">
        <div className="article-hero-img" style={{background: n.img}}></div>
        <span className="pub-section-eyebrow">{n.tag}</span>
        <h1>{n.title}</h1>
        <div className="article-meta">{n.date} · {n.author} · 4 წუთის წაკითხვა</div>
        <div className="article-body">
          <p>{n.excerpt} ეს არის სრული სტატია, რომელიც განიხილავს ფეხბურთის ლიგის ბოლო მოვლენებს.</p>
          <p>ბოლო ხუთ ტურში გუნდმა მნიშვნელოვანი ცვლილებები განიცადა — ახალი ფორმა, ახალი ლიდერი ბომბარდირებში და უმაღლესი ხარისხის ფეხბურთი ყოველ მატჩში.</p>
          <p>ექსპერტების შეფასებით, სეზონის ფინალი იქნება ყველაზე საინტერესო ბოლო ათი წლის განმავლობაში. ყველა კონკურენტი ცდილობს ბოლო რესურსების გამოვლენას.</p>
          <p>გუნდის მთავარი მწვრთნელი აცხადებს, რომ ეს არის ერთ-ერთი ყველაზე ძლიერი შემადგენლობა, რომელიც ოდესმე ჰქონდა კლუბს — მომზადება ბოლო ტურებისთვის გრძელდება.</p>
        </div>
      </div>
    </div>
  );
}

window.PubTicketsPage = TicketsPage;
window.PubTeamPage = TeamPubPage;
window.PubPlayerPage = PlayerPubPage;
window.PubNewsListPage = NewsListPage;
window.PubArticlePage = ArticlePage;
