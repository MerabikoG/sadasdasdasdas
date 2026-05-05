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

// ── Home (League Hub) ──
function HomePage({ go }) {
  const COMPS = [
    {
      id: 'regional', name: 'რეგიონული ლიგა', color: '#e8336d',
      flat: ['ა ჯგუფი', 'ბ ჯგუფი', 'გ ჯგუფი'],
    },
    {
      id: 'u19', name: '19-წლამდე ლიგა', color: '#f5a524', badge: 'U19',
      tiers: [
        { name: 'ოქროს ლიგა',    color: '#f5a524', subs: ['ზედა ჯგუფი', 'ქვედა ჯგუფი'] },
        { name: 'ვერცხლის ლიგა', color: '#9ca3af', subs: ['ზედა ჯგუფი', 'ქვედა ჯგუფი'] },
      ],
    },
    {
      id: 'u17', name: '17-წლამდე ლიგა', color: '#2dd4a4', badge: 'U17',
      tiers: [
        { name: 'ოქროს ლიგა',    color: '#f5a524', subs: ['ზედა ჯგუფი', 'ქვედა ჯგუფი'] },
        { name: 'ვერცხლის ლიგა', color: '#9ca3af', subs: ['ზედა ჯგუფი', 'ქვედა ჯგუფი'] },
      ],
    },
    {
      id: 'bronze', name: 'ბრინჯაოს ლიგა', color: '#cd7f32',
      flat: ['ა ჯგუფი', 'ბ ჯგუფი', 'გ ჯგუფი', 'ზედა ჯგუფი', 'ქვედა ჯგუფი'],
    },
    {
      id: 'u15', name: '15-წლამდე ლიგა', color: '#a855f7', badge: 'U15',
      tiers: [
        { name: 'ოქროს ლიგა',    color: '#f5a524', subs: ['ზედა ჯგუფი', 'ქვედა ჯგუფი'] },
        { name: 'ვერცხლის ლიგა', color: '#9ca3af', subs: ['ზედა ჯგუფი', 'ქვედა ჯგუფი'] },
        { name: 'ბრინჯაოს ლიგა', color: '#cd7f32', subs: ['ა ჯგუფი', 'ბ ჯგუფი', 'გ ჯგუფი', 'ზედა ჯგუფი', 'ქვედა ჯგუფი'] },
      ],
    },
  ];

  const Chev = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );

  return (
    <>
      <section className="hub-hero">
        <div className="pub-container">
          <span className="pub-section-eyebrow">სეზონი 2025/26 · ყველა შეჯიბრება</span>
          <h1 className="hub-title">ლიგები</h1>
        </div>
      </section>

      <div className="pub-container hub-body">
        <div className="hub-grid">
          {COMPS.map(comp => (
            <div key={comp.id} className="hub-card" style={{'--cc': comp.color}}>
              <div className="hub-card-head">
                <span className="hub-card-name">{comp.name}</span>
                {comp.badge && <span className="hub-age-badge">{comp.badge}</span>}
              </div>
              <div className="hub-card-body">
                {comp.flat && comp.flat.map(g => (
                  <button key={g} className="hub-row" onClick={()=>{}}>
                    <span>{g}</span><Chev />
                  </button>
                ))}
                {comp.tiers && comp.tiers.map(tier => (
                  <div key={tier.name} className="hub-tier-block">
                    <button className="hub-tier-head" style={{color: tier.color}} onClick={()=>{}}>
                      <span className="hub-tier-dot" style={{background: tier.color}} />
                      <span>{tier.name}</span>
                      <Chev />
                    </button>
                    {tier.subs.map(g => (
                      <button key={g} className="hub-sub-row" onClick={()=>{}}>
                        <span>{g}</span><Chev />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
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
