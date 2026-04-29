/* Public pages — Home, Match Center, Tickets, Team, Player, News */
const { useState: pS, useMemo: pM, useEffect: pE } = React;
const PD = window.LIGA_DATA;

// ── Crest helper for public ──
const PCrest = ({ team, size = 'md' }) => {
  const t = typeof team === 'string' ? PD.byId(team) : team;
  if (!t) return null;
  const cls = `pcrest ${size}`;
  return <div className={cls} style={{ background: t.color }}>{t.short}</div>;
};

// ── News mock ──
const NEWS = [
  { id:'n1', tag:'ანალიზი', date:'27 აპრილი', author:'გ. მამარდაშვილი', title:'დინამოს მე-15 ჩემპიონობა — რას ვხედავთ ბოლო 10 ტურში', excerpt:'ლიდერის ფორმა და გასაღები მატჩები სეზონის ბოლომდე.', img:'linear-gradient(135deg, #0d4eaf 0%, #07080c 70%), radial-gradient(circle at 70% 30%, #e8336d 0%, transparent 40%)', team:'din' },
  { id:'n2', tag:'ტრანსფერი', date:'27 აპრილი', author:'რედაქცია', title:'ჭაკვეტაძე — სალარდე ლიდერი ბომბარდირთა შორის', excerpt:'14 გოლი 17 მატჩში.', img:'linear-gradient(135deg, #e63946 0%, #07080c 70%)', team:'tor' },
  { id:'n3', tag:'მატჩის წინ', date:'28 აპრილი', author:'ლ. ცეცხლაძე', title:'ტელავი vs ლოკომოტივი — ლაივი ახლა', excerpt:'რეიტინგის ბრძოლა გაგრძელდება.', img:'linear-gradient(135deg, #7b2cbf 0%, #07080c 70%)', team:'tel' },
  { id:'n4', tag:'ინტერვიუ', date:'26 აპრილი', author:'რედაქცია', title:'ხვიჩა კვარაცხელია: "ვიბრძოლებთ ბოლომდე"', excerpt:'საბურთალოს კაპიტანი მიზნებზე.', img:'linear-gradient(135deg, #f7b500 0%, #07080c 70%)', team:'sab' },
];

// ── Footer ──
function Footer() {
  return (
    <footer className="pub-footer">
      <div className="pub-container">
        <div className="pub-footer-inner">
          <div className="pub-footer-col">
            <div className="pub-brand" style={{marginBottom:12}}>
              <div className="pub-brand-mark">ლ</div>
              <div className="pub-brand-name">ლიგა<small>EROVNULI LIGA</small></div>
            </div>
            <p style={{fontSize:13, color:'var(--text-3)', maxWidth:280, margin:0}}>
              საქართველოს ფეხბურთის უმაღლესი ლიგის ოფიციალური საიტი. სეზონი 2025/26.
            </p>
          </div>
          <div className="pub-footer-col">
            <h5>ტურნირი</h5>
            <a>ცხრილი</a><a>კალენდარი</a><a>ბომბარდირები</a><a>გუნდები</a>
          </div>
          <div className="pub-footer-col">
            <h5>კომპანია</h5>
            <a>ჩვენ შესახებ</a><a>კონტაქტი</a><a>კარიერა</a><a>პრესა</a>
          </div>
          <div className="pub-footer-col">
            <h5>დაგვიკავშირდი</h5>
            <a>Facebook</a><a>Instagram</a><a>YouTube</a><a>X / Twitter</a>
          </div>
        </div>
        <div className="pub-footer-bottom">
          <span>© 2026 EROVNULI LIGA · ყველა უფლება დაცულია</span>
          <span>ვერსია 4.2 · ka-GE</span>
        </div>
      </div>
    </footer>
  );
}

// ── Home ──
function HomePage({ go }) {
  const live = PD.FIXTURES.find(f => f.status === 'live');
  const upcoming = PD.FIXTURES.filter(f => f.status === 'scheduled').slice(0, 4);
  const recent = PD.FIXTURES.filter(f => f.status === 'finished').slice(-4).reverse();
  const top5 = [...PD.STANDINGS].sort((a,b)=>b.pts-a.pts).slice(0,5);
  const liveHome = live && PD.byId(live.home);
  const liveAway = live && PD.byId(live.away);

  const fmtDate = (d) => new Date(d).toLocaleDateString('ka-GE', { day:'numeric', month:'short' });

  return (
    <>
      <section className="hero">
        <div className="pub-container">
          <div className="hero-inner">
            <div>
              <span className="pub-section-eyebrow">სეზონი 2025/26 · ტური 18</span>
              <h1 className="hero-headline">
                ერთი ლიგა.<br />
                ათი გუნდი.<br />
                <em>ერთი თასი.</em>
              </h1>
              <p className="hero-sub">
                ყოველი მატჩი, ყოველი გოლი, ყოველი ემოცია. ეროვნული ლიგის ოფიციალური სახლი —
                ცხრილები, განრიგი, ლაივი და ბილეთები ერთ ადგილას.
              </p>
              <div className="hero-cta">
                <button className="pub-btn primary lg" onClick={()=>go('tickets')}>ბილეთის შეძენა</button>
                <button className="pub-btn ghost lg" onClick={()=>go('match')}>ლაივი მატჩის ნახვა →</button>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-num">90</div>
                  <div className="hero-stat-label">მატჩი სეზონში</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">233</div>
                  <div className="hero-stat-label">გატანილი გოლი</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">428კ</div>
                  <div className="hero-stat-label">სტადიონის დასწრება</div>
                </div>
              </div>
            </div>

            {live && (
              <div className="featured-match" onClick={()=>go('match')} style={{cursor:'pointer'}}>
                <div className="featured-tag">ლაივი ახლა · {live.minute}'</div>
                <div className="featured-teams">
                  <div className="featured-team">
                    <PCrest team={liveHome} size="lg" />
                    <h4>{liveHome.name}</h4>
                  </div>
                  <div className="featured-vs">
                    <span>{live.hs}</span><span>:</span><span>{live.as}</span>
                  </div>
                  <div className="featured-team">
                    <PCrest team={liveAway} size="lg" />
                    <h4>{liveAway.name}</h4>
                  </div>
                </div>
                <div className="featured-meta">
                  <span>{live.stadium}</span>
                  <span className="featured-min">მე-2 ტაიმი · {live.minute}'</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pub-section tight">
        <div className="pub-container">
          <div className="pub-section-head">
            <div>
              <span className="pub-section-eyebrow">მე-18 ტური</span>
              <h2 className="pub-section-title">მიმდინარე და დაგეგმილი მატჩები</h2>
            </div>
            <a className="pub-link" onClick={()=>go('match')}>ყველა მატჩი →</a>
          </div>
          <div className="matches-strip">
            {[live, ...upcoming, ...recent].filter(Boolean).slice(0,8).map(f => {
              const h = PD.byId(f.home), a = PD.byId(f.away);
              const isLive = f.status === 'live';
              const isDone = f.status === 'finished';
              const homeWin = isDone && f.hs > f.as;
              const awayWin = isDone && f.as > f.hs;
              return (
                <div key={f.id} className="match-card" onClick={()=>go('match')}>
                  <div className="match-card-head">
                    <span>ტური {f.round} · {fmtDate(f.date)}</span>
                    {isLive ? <span className="live-pill">{f.minute}'</span> : <span>{isDone ? 'FT' : f.time}</span>}
                  </div>
                  <div className={`match-card-team ${homeWin?'winner':isDone?'':isLive?'winner':'scheduled'}`}>
                    <span className="name"><PCrest team={h} size="sm" />{h.name}</span>
                    <span className="score">{f.hs ?? '–'}</span>
                  </div>
                  <div className={`match-card-team ${awayWin?'winner':isDone?'':isLive?'winner':'scheduled'}`}>
                    <span className="name"><PCrest team={a} size="sm" />{a.name}</span>
                    <span className="score">{f.as ?? '–'}</span>
                  </div>
                  <div className="match-card-foot">
                    <span>{f.stadium}</span>
                    {isLive && <span style={{color:'var(--live)'}}>● ლაივი</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pub-section">
        <div className="pub-container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:32}} className="home-2col">
            <div>
              <div className="pub-section-head">
                <div><span className="pub-section-eyebrow">ცხრილი</span>
                <h2 className="pub-section-title" style={{fontSize:24}}>TOP 5</h2></div>
              </div>
              <div className="standings-mini">
                <table>
                  <thead><tr><th></th><th>გუნდი</th><th className="num">მ</th><th className="num">±</th><th className="num">ქ</th></tr></thead>
                  <tbody>
                    {top5.map((s,i) => {
                      const t = PD.byId(s.team);
                      return (
                        <tr key={s.team} onClick={()=>go('team', s.team)}>
                          <td className="pos">{i+1}</td>
                          <td><div className="team"><PCrest team={t} size="sm" />{t.name}</div></td>
                          <td className="num">{s.p}</td>
                          <td className="num" style={{color: s.gd>=0?'var(--success)':'var(--danger)'}}>{s.gd>=0?'+':''}{s.gd}</td>
                          <td className="num" style={{fontSize:14}}>{s.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="pub-section-head">
                <div><span className="pub-section-eyebrow">ბომბარდირები</span>
                <h2 className="pub-section-title" style={{fontSize:24}}>ლიდერები</h2></div>
                <a className="pub-link">ყველა →</a>
              </div>
              <div className="standings-mini">
                <table>
                  <thead><tr><th></th><th>მოთამაშე</th><th>გუნდი</th><th className="num">ა</th><th className="num">გოლი</th></tr></thead>
                  <tbody>
                    {PD.SCORERS.slice(0,5).map((p,i)=>{
                      const t = PD.byId(p.team);
                      return (
                        <tr key={p.id} onClick={()=>go('player', p.id)}>
                          <td className="pos">{i+1}</td>
                          <td><div className="team">
                            <div className="pcrest sm" style={{background:t.color}}>{p.no}</div>
                            {p.name}
                          </div></td>
                          <td><PCrest team={t} size="sm" /></td>
                          <td className="num">{p.assists}</td>
                          <td className="num" style={{fontSize:16}}>{p.goals}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pub-section">
        <div className="pub-container">
          <div className="pub-section-head">
            <div><span className="pub-section-eyebrow">ახალი ამბები</span>
            <h2 className="pub-section-title">სათაური დღეს</h2></div>
            <a className="pub-link" onClick={()=>go('news')}>ყველა →</a>
          </div>
          <div className="news-grid">
            {NEWS.map((n,i) => (
              <article key={n.id} className={`news-card ${i===0?'featured':''}`} onClick={()=>go('article', n.id)}>
                <div className="news-thumb">
                  <span className="news-tag">{n.tag}</span>
                  <div className="news-thumb-bg" style={{background: n.img}} />
                </div>
                <div className="news-body">
                  <div className="news-meta">{n.date} · {n.author}</div>
                  <h3 className="news-title">{n.title}</h3>
                  {i===0 && <p className="news-excerpt">{n.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── Match Center ──
function MatchPage({ go }) {
  const m = PD.FIXTURES.find(f => f.status === 'live');
  const home = PD.byId(m.home), away = PD.byId(m.away);
  const [tab, setTab] = pS('events');

  const stats = [
    ['ფლადენიე', 42, 58, '%'],
    ['შარჯი', 8, 11, ''],
    ['სამიზნეში', 3, 5, ''],
    ['კუთხური', 4, 2, ''],
    ['ფაული', 12, 9, ''],
    ['ყვითელი ბ.', 1, 1, ''],
    ['პასი', 287, 412, ''],
    ['პასის სიზუსტე', 78, 84, '%'],
  ];

  return (
    <>
      <section className="mc-hero">
        <div className="pub-container">
          <div className="mc-hero-inner">
            <div className="mc-team">
              <PCrest team={home} size="huge" />
              <h1>{home.name}</h1>
            </div>
            <div className="mc-score-block">
              <div className="mc-status">ლაივი · {m.minute}'</div>
              <div className="mc-score">
                <span>{m.hs}</span><span className="sep">:</span><span>{m.as}</span>
              </div>
            </div>
            <div className="mc-team">
              <PCrest team={away} size="huge" />
              <h1>{away.name}</h1>
            </div>
          </div>
          <div className="mc-meta">
            <span>ტური <strong>{m.round}</strong></span>
            <span>სტადიონი <strong>{m.stadium}</strong></span>
            <span>დასწრება <strong>14,820</strong></span>
            <span>მსაჯი <strong>გ. კრუაშვილი</strong></span>
          </div>
        </div>
      </section>

      <div className="pub-container">
        <div className="mc-tabs">
          {[['events','ქრონიკა'],['stats','სტატისტიკა'],['lineup','შემადგენლობა'],['h2h','პირისპირ']].map(([k,l])=>(
            <button key={k} className="mc-tab" aria-current={tab===k} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>

        <div className="mc-grid">
          <div className="mc-card">
            <div className="mc-card-head"><h3>მატჩის ქრონიკა</h3><span style={{fontSize:12,color:'var(--text-3)',fontFamily:'var(--ff-mono)'}}>{m.minute}' / 90'</span></div>
            <div className="mc-card-body dense">
              <div className="timeline">
                {[...PD.LIVE_EVENTS].reverse().map((e,i) => {
                  const sideClass = e.team === m.home ? 'home' : e.team === m.away ? 'away' : 'center';
                  const teamShort = e.team ? PD.byId(e.team).short : '';
                  return (
                    <div key={i} className={`tl-event ${sideClass}`}>
                      <div className="tl-min">{e.min}'<small>{e.min<=45?'1-ლი':'მე-2'}</small></div>
                      <div className="tl-detail">
                        <div className={`tl-icon ${e.type}`}>
                          {e.type==='goal'?'⚽':e.type==='yellow'?'■':e.type==='red'?'■':e.type==='sub'?'⇄':e.type==='half'?'½':'•'}
                        </div>
                        <div className="tl-text">
                          <strong>{e.player}</strong>
                          <small>{e.detail}</small>
                        </div>
                      </div>
                      <div className="tl-side">{teamShort}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mc-card">
            <div className="mc-card-head"><h3>გასაღები სტატისტიკა</h3></div>
            <div className="mc-card-body dense">
              {stats.map(([label, h, a, suf]) => {
                const total = h + a;
                return (
                  <div key={label} className="bigstat">
                    <div className="bigstat-label">{label}</div>
                    <div className="bigstat-row">
                      <div className="bigstat-num l">{h}{suf}</div>
                      <div className="bigstat-track">
                        <div className="bigstat-h" style={{width:`${(h/total)*100}%`}}></div>
                      </div>
                      <div className="bigstat-num r">{a}{suf}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.PubHomePage = HomePage;
window.PubMatchPage = MatchPage;
window.PubFooter = Footer;
window.PCrest = PCrest;
window.NEWS = NEWS;
