/* Pages — Standings, Fixtures, Live, Team, Players */
const { useState: uS, useMemo: uM, useEffect: uE, useRef: uR } = React;

// ── Standings ────────────────────────────────────────────────────────────
function StandingsPage({ setPage, setTeamId }) {
  const [sort, setSort] = uS({ key: 'pts', dir: 'desc' });
  const [filter, setFilter] = uS('all'); // all, home, away
  const [scope, setScope] = uS('full'); // full, last5, last10

  const sorted = uM(() => {
    const rows = [...D.STANDINGS];
    rows.sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      if (sort.key === 'team') return a.team.localeCompare(b.team) * dir;
      return (a[sort.key] - b[sort.key]) * dir;
    });
    return rows;
  }, [sort]);

  const onSort = (key) => {
    setSort(s => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }));
  };

  const Th = ({ k, children, num }) => (
    <th onClick={() => onSort(k)} className={num ? 'num' : ''}>
      {children}
      {sort.key === k && <span className="sort-arrow">{sort.dir === 'desc' ? '▼' : '▲'}</span>}
    </th>
  );

  const zoneOf = (i) => i < 2 ? 'cl' : i < 4 ? 'eu' : i >= 8 ? 'rel' : '';

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">ტურნირის ცხრილი</h1>
          <div className="page-sub">18 ტური დასრულებული · განახლდა {new Date().toLocaleDateString('ka-GE')}</div>
        </div>
        <div className="row">
          <button className="btn"><Ico name="download" size={14} />ექსპორტი</button>
          <button className="btn primary"><Ico name="filter" size={14} />ფილტრი</button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi"><span className="kpi-label">ლიდერი</span>
          <span className="kpi-value">დინამო</span>
          <span className="kpi-delta up"><Ico name="arrowUp" size={11} />+3 ქულა</span></div>
        <div className="kpi"><span className="kpi-label">ნაბიჯი ტურამდე</span>
          <span className="kpi-value">19</span>
          <span className="kpi-delta">3 მაისიდან</span></div>
        <div className="kpi"><span className="kpi-label">ჯამი გოლები</span>
          <span className="kpi-value tnum">233</span>
          <span className="kpi-delta">2.59 / მატჩი</span></div>
        <div className="kpi"><span className="kpi-label">ლიდერი ბომბარდირი</span>
          <span className="kpi-value">14</span>
          <span className="kpi-delta">გ. ჭაკვეტაძე</span></div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">სრული ცხრილი</h3>
          <div className="row">
            <span className="card-sub">10 გუნდი</span>
          </div>
        </div>
        <div className="filter-bar">
          {[['all','ყველა მატჩი'],['home','სახლში'],['away','მოწვევით']].map(([k,l])=>(
            <button key={k} className="chip" aria-pressed={filter===k} onClick={()=>setFilter(k)}>{l}</button>
          ))}
          <div style={{width:1,height:18,background:'var(--line)',margin:'0 4px'}} />
          {[['full','სრული სეზონი'],['last10','ბოლო 10'],['last5','ბოლო 5']].map(([k,l])=>(
            <button key={k} className="chip" aria-pressed={scope===k} onClick={()=>setScope(k)}>{l}</button>
          ))}
        </div>
        <div className="legend">
          <span className="legend-item"><span className="legend-dot cl"></span>ჩემპიონთა ლიგა</span>
          <span className="legend-item"><span className="legend-dot eu"></span>ევრო კონფერენცია</span>
          <span className="legend-item"><span className="legend-dot rel"></span>დაცემის ზონა</span>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{width:32}}>#</th>
              <Th k="team">გუნდი</Th>
              <Th k="p" num>თ</Th>
              <Th k="w" num>მ</Th>
              <Th k="d" num>ფ</Th>
              <Th k="l" num>წ</Th>
              <Th k="gf" num>გფ</Th>
              <Th k="ga" num>გწ</Th>
              <Th k="gd" num>±</Th>
              <th>ფორმა</th>
              <Th k="pts" num>ქულა</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const t = D.byId(row.team);
              return (
                <tr key={row.team} className="clickable"
                  onClick={() => { setTeamId(row.team); setPage('team'); }}>
                  <td className={`pos zone-${zoneOf(i)}`}>{i+1}</td>
                  <td className="strong"><div className="team-cell"><Crest team={t} /><span className="team-name">{t.name}</span></div></td>
                  <td className="num">{row.p}</td>
                  <td className="num" style={{color:'var(--success)'}}>{row.w}</td>
                  <td className="num" style={{color:'var(--text-3)'}}>{row.d}</td>
                  <td className="num" style={{color:'var(--danger)'}}>{row.l}</td>
                  <td className="num">{row.gf}</td>
                  <td className="num">{row.ga}</td>
                  <td className="num" style={{color: row.gd >= 0 ? 'var(--success)' : 'var(--danger)'}}>
                    {row.gd >= 0 ? '+' : ''}{row.gd}</td>
                  <td><FormPills form={row.form} /></td>
                  <td className="num" style={{fontSize:'var(--fs-lg)', fontWeight:700}}>{row.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Fixtures ─────────────────────────────────────────────────────────────
function FixturesPage({ setPage }) {
  const [filter, setFilter] = uS('all'); // all, upcoming, finished, live
  const [team, setTeam] = uS('all');

  const filtered = uM(() => D.FIXTURES.filter(f => {
    if (filter === 'upcoming' && f.status !== 'scheduled') return false;
    if (filter === 'finished' && f.status !== 'finished') return false;
    if (filter === 'live' && f.status !== 'live') return false;
    if (team !== 'all' && f.home !== team && f.away !== team) return false;
    return true;
  }), [filter, team]);

  const grouped = uM(() => {
    const m = new Map();
    filtered.forEach(f => {
      if (!m.has(f.round)) m.set(f.round, []);
      m.get(f.round).push(f);
    });
    return [...m.entries()].sort((a,b) => a[0]-b[0]);
  }, [filtered]);

  const fmtDate = (d) => new Date(d).toLocaleDateString('ka-GE', { day:'numeric', month:'long' });

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">მატჩების კალენდარი</h1>
          <div className="page-sub">ყველა ტურის შედეგი და განრიგი</div>
        </div>
        <button className="btn"><Ico name="download" size={14} />iCal</button>
      </div>

      <div className="card">
        <div className="filter-bar">
          {[['all','ყველა'],['upcoming','მომავალი'],['live','ლაივი'],['finished','დასრულებული']].map(([k,l])=>(
            <button key={k} className="chip" aria-pressed={filter===k} onClick={()=>setFilter(k)}>{l}</button>
          ))}
          <div className="spacer" />
          <select className="chip" value={team} onChange={e=>setTeam(e.target.value)}
            style={{padding:'2px 8px',background:'transparent',color:'var(--text-2)',border:'1px solid var(--line)'}}>
            <option value="all">ყველა გუნდი</option>
            {D.TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          {grouped.map(([round, list]) => (
            <div key={round}>
              <div className="round-head">
                <h4>ტური {round}</h4>
                <span className="date">{fmtDate(list[0].date)} – {fmtDate(list[list.length-1].date)}</span>
                {list.some(f => f.status === 'live') && <span className="badge live">LIVE</span>}
              </div>
              {list.map(f => {
                const home = D.byId(f.home), away = D.byId(f.away);
                const scoreClass = f.status === 'live' ? 'live' : f.status === 'scheduled' ? 'scheduled' : '';
                return (
                  <div key={f.id} className="fixture-row" onClick={() => f.status==='live' && setPage('live')}>
                    <div className="fix-time">{f.time}</div>
                    <div className="fix-team">
                      <Crest team={home} />
                      <span className="team-name">{home.name}</span>
                    </div>
                    <div className={`fix-score ${scoreClass}`}>
                      {f.status === 'scheduled' ? 'vs' : `${f.hs}–${f.as}`}
                    </div>
                    <div className="fix-team away">
                      <Crest team={away} />
                      <span className="team-name">{away.name}</span>
                    </div>
                    <div className="fix-meta">
                      {f.status === 'live' && <span className="live-badge">{f.minute}'</span>}
                      {f.status === 'finished' && <span>FT</span>}
                      {f.status === 'scheduled' && <span>{fmtDate(f.date)}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Live Match ───────────────────────────────────────────────────────────
function LivePage() {
  const liveMatch = D.FIXTURES.find(f => f.status === 'live');
  const [tab, setTab] = uS('events');
  if (!liveMatch) return <div className="page"><div className="page-sub">ლაივი მატჩი ვერ მოიძებნა</div></div>;
  const home = D.byId(liveMatch.home), away = D.byId(liveMatch.away);

  const stats = [
    ['ფლადენიე', 42, 58],
    ['შარჯი', 8, 11],
    ['სამიზნეში', 3, 5],
    ['კუთხური', 4, 2],
    ['ფაული', 12, 9],
    ['ყვითელი', 1, 1],
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">ლაივ მატჩი</h1>
          <div className="page-sub">ტური 18 · {liveMatch.stadium}</div>
        </div>
        <span className="badge live">LIVE · {liveMatch.minute}'</span>
      </div>

      <div className="live-hero">
        <div className="live-team">
          <Crest team={home} size="xl" />
          <h3>{home.name}</h3>
          <span className="muted mono" style={{fontSize:'var(--fs-xs)',letterSpacing:'.06em'}}>სახლის</span>
        </div>
        <div className="live-score-block">
          <div className="live-minute">{liveMatch.minute}'</div>
          <div className="live-score">
            <span>{liveMatch.hs}</span>
            <span className="live-score-sep">:</span>
            <span>{liveMatch.as}</span>
          </div>
          <span className="muted mono" style={{fontSize:'var(--fs-xs)',letterSpacing:'.06em'}}>მე-2 ტაიმი</span>
        </div>
        <div className="live-team">
          <Crest team={away} size="xl" />
          <h3>{away.name}</h3>
          <span className="muted mono" style={{fontSize:'var(--fs-xs)',letterSpacing:'.06em'}}>სტუმარი</span>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">მატჩის მოვლენები</h3>
            <div className="row">
              {[['events','მოვლენები'],['lineup','შემადგენლობა']].map(([k,l])=>(
                <button key={k} className="chip" aria-pressed={tab===k} onClick={()=>setTab(k)}>{l}</button>
              ))}
            </div>
          </div>
          {tab === 'events' && (
            <div className="events">
              {[...D.LIVE_EVENTS].reverse().map((e,i) => (
                <div key={i} className="event">
                  <div className="event-min">{e.min}'</div>
                  <div className={`event-ico ${e.type}`}>
                    {e.type==='goal'?'⚽':e.type==='yellow'?'■':e.type==='red'?'■':e.type==='sub'?'⇄':e.type==='half'?'½':'•'}
                  </div>
                  <div className="event-body">
                    <strong>{e.player}</strong>
                    {e.team && <span className="muted"> · {D.byId(e.team).name}</span>}
                    <div className="detail">{e.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'lineup' && (
            <div className="card-body padded">
              <div className="pitch">
                <div className="pitch-circle"></div>
                {[
                  {n:1, name:'მ. ლორია', x:50, y:90},
                  {n:2, name:'რ. დვალი', x:20, y:75},
                  {n:5, name:'ლ. დვალიშვილი', x:40, y:75},
                  {n:6, name:'გ. გოცირიძე', x:60, y:75},
                  {n:3, name:'დ. ხოჩოლავა', x:80, y:75},
                  {n:8, name:'ნ. გაგნიძე', x:30, y:50},
                  {n:14, name:'გ. ჩაბრაძე', x:70, y:50},
                  {n:10, name:'ლ. წულაია', x:50, y:40},
                  {n:7, name:'ი. კვერნაძე', x:25, y:25},
                  {n:11, name:'რ. ციცქიშვილი', x:75, y:25},
                  {n:9, name:'ბ. ცეცხლაძე', x:50, y:15},
                ].map(p => (
                  <div key={p.n} className="pitch-player" style={{left:`${p.x}%`,top:`${p.y}%`}}>
                    <div className="pitch-player-num">{p.n}</div>
                    <div className="pitch-player-name">{p.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'var(--s10)'}}>
          <div className="card">
            <div className="card-head"><h3 className="card-title">სტატისტიკა</h3></div>
            <div className="card-body padded">
              {stats.map(([label, h, a]) => {
                const total = h + a;
                return (
                  <div key={label} style={{marginBottom:'var(--s7)'}}>
                    <div className="statbar-label">{label}</div>
                    <div className="statbar">
                      <div className="statbar-num l">{h}</div>
                      <div className="statbar-track">
                        <div className="statbar-h" style={{width:`${(h/total)*100}%`}}></div>
                        <div className="statbar-a" style={{width:`${(a/total)*100}%`}}></div>
                      </div>
                      <div className="statbar-num r">{a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card">
            <div className="card-head"><h3 className="card-title">სტადიონი</h3><span className="card-sub">{liveMatch.stadium}</span></div>
            <div className="card-body padded" style={{fontSize:'var(--fs-md)',color:'var(--text-2)'}}>
              <div className="row" style={{justifyContent:'space-between',padding:'var(--s2) 0'}}>
                <span className="muted">დასწრება</span><strong>14,820 / 18,000</strong>
              </div>
              <div className="row" style={{justifyContent:'space-between',padding:'var(--s2) 0'}}>
                <span className="muted">ამინდი</span><strong>+18°C, მოწმენდილი</strong>
              </div>
              <div className="row" style={{justifyContent:'space-between',padding:'var(--s2) 0'}}>
                <span className="muted">მსაჯი</span><strong>გ. კრუაშვილი</strong>
              </div>
              <div className="row" style={{justifyContent:'space-between',padding:'var(--s2) 0'}}>
                <span className="muted">VAR</span><strong>ლ. ბოჭორიშვილი</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StandingsPage, FixturesPage, LivePage });
