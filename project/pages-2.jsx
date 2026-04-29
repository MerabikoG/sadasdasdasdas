/* Pages — Team detail, Players stats */
const { useState: ___uS, useMemo: ___uM } = React;

function TeamPage({ teamId, setTeamId, setPage }) {
  const t = D.byId(teamId || 'din');
  const standing = D.STANDINGS.find(s => s.team === t.id);
  const pos = D.STANDINGS.sort((a,b)=>b.pts-a.pts).findIndex(s=>s.team===t.id) + 1;
  const teamFixtures = D.FIXTURES.filter(f => f.home === t.id || f.away === t.id);
  const teamPlayers = D.SCORERS.filter(p => p.team === t.id);

  const fmtDate = (d) => new Date(d).toLocaleDateString('ka-GE', { day:'numeric', month:'short' });

  return (
    <div className="page">
      <div className="team-header" style={{'--team-color': t.color}}>
        <Crest team={t} size="xl" />
        <div className="team-header-info">
          <h2>{t.name}</h2>
          <div className="team-header-meta">
            <span><span className="muted">ქალაქი</span><strong>{t.city}</strong></span>
            <span><span className="muted">დაარსდა</span><strong>{t.founded}</strong></span>
            <span><span className="muted">პოზიცია</span><strong>#{pos}</strong></span>
            <span><span className="muted">ქულა</span><strong>{standing.pts}</strong></span>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'var(--s5)',alignItems:'flex-end'}}>
          <FormPills form={standing.form} />
          <span className="muted mono" style={{fontSize:'var(--fs-xs)'}}>ბოლო 5 მატჩი</span>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi"><span className="kpi-label">მოგება</span><span className="kpi-value tnum">{standing.w}</span><span className="kpi-delta up">{Math.round(standing.w/standing.p*100)}% მატჩი</span></div>
        <div className="kpi"><span className="kpi-label">ფრე</span><span className="kpi-value tnum">{standing.d}</span><span className="kpi-delta">{Math.round(standing.d/standing.p*100)}%</span></div>
        <div className="kpi"><span className="kpi-label">წაგება</span><span className="kpi-value tnum">{standing.l}</span><span className="kpi-delta down">{Math.round(standing.l/standing.p*100)}%</span></div>
        <div className="kpi"><span className="kpi-label">გოლის სხვაობა</span><span className="kpi-value tnum">{standing.gd>=0?'+':''}{standing.gd}</span><span className="kpi-delta">{standing.gf} : {standing.ga}</span></div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">მატჩები</h3>
            <span className="card-sub">{teamFixtures.length} მატჩი</span>
          </div>
          <div>
            {teamFixtures.map(f => {
              const home = D.byId(f.home), away = D.byId(f.away);
              const isHome = f.home === t.id;
              const opp = isHome ? away : home;
              const result = f.status === 'finished'
                ? (isHome ? (f.hs > f.as ? 'W' : f.hs === f.as ? 'D' : 'L')
                          : (f.as > f.hs ? 'W' : f.as === f.hs ? 'D' : 'L'))
                : null;
              return (
                <div key={f.id} className="fixture-row" style={{gridTemplateColumns:'48px 28px 1fr 60px 100px'}}>
                  <div className="fix-time">{fmtDate(f.date)}</div>
                  <div>{result && <span className={`form-cell ${result}`}>{result}</span>}</div>
                  <div className="fix-team">
                    <span className="muted mono" style={{fontSize:'var(--fs-xs)',width:14}}>{isHome?'H':'A'}</span>
                    <Crest team={opp} />
                    <span className="team-name">{opp.name}</span>
                  </div>
                  <div className={`fix-score ${f.status==='live'?'live':f.status==='scheduled'?'scheduled':''}`}>
                    {f.status==='scheduled'?'vs':`${f.hs}–${f.as}`}
                  </div>
                  <div className="fix-meta">
                    {f.status==='live'?<span className="live-badge">{f.minute}'</span>:f.status==='finished'?'FT':'მოლოდინში'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'var(--s10)'}}>
          <div className="card">
            <div className="card-head"><h3 className="card-title">საუკეთესო მოთამაშეები</h3></div>
            <table className="tbl">
              <tbody>
                {teamPlayers.length ? teamPlayers.map(p => (
                  <tr key={p.id}>
                    <td className="strong" style={{width:'60%'}}>
                      <div className="team-cell">
                        <div className="crest" style={{background:t.color,fontSize:9}}>{p.no}</div>
                        <div>
                          <div>{p.name}</div>
                          <div className="muted mono" style={{fontSize:'var(--fs-xs)'}}>{p.pos==='F'?'თავდამსხმელი':p.pos==='M'?'ნახევრადცემელი':'მცველი'} · {p.age} წ.</div>
                        </div>
                      </div>
                    </td>
                    <td className="num">{p.goals} <span className="muted" style={{fontSize:'var(--fs-xs)'}}>გ</span></td>
                    <td className="num">{p.assists} <span className="muted" style={{fontSize:'var(--fs-xs)'}}>ა</span></td>
                  </tr>
                )) : <tr><td className="muted center" style={{padding:'var(--s10)'}}>მონაცემი არ არის</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="card">
            <div className="card-head"><h3 className="card-title">გადარჩევა</h3></div>
            <div className="card-body padded" style={{display:'flex',flexDirection:'column',gap:'var(--s5)'}}>
              {D.TEAMS.filter(x => x.id !== t.id).slice(0,4).map(x => (
                <button key={x.id} className="row" style={{padding:'var(--s4) var(--s3)',border:0,background:'transparent',cursor:'pointer',color:'inherit',font:'inherit',width:'100%'}}
                  onClick={()=>setTeamId(x.id)}>
                  <Crest team={x} />
                  <span style={{fontSize:'var(--fs-md)'}}>{x.name}</span>
                  <span className="spacer"></span>
                  <Ico name="chevronRight" size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Players ──────────────────────────────────────────────────────────────
function PlayersPage({ setPage, setTeamId }) {
  const [sort, setSort] = ___uS({ key: 'goals', dir: 'desc' });
  const [pos, setPos] = ___uS('all');

  const sorted = ___uM(() => {
    let rows = [...D.SCORERS];
    if (pos !== 'all') rows = rows.filter(p => p.pos === pos);
    rows.sort((a,b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      if (sort.key === 'name') return a.name.localeCompare(b.name) * dir;
      return (a[sort.key] - b[sort.key]) * dir;
    });
    return rows;
  }, [sort, pos]);

  const onSort = (key) => setSort(s => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }));
  const Th = ({ k, children, num }) => (
    <th onClick={() => onSort(k)} className={num ? 'num' : ''}>
      {children}
      {sort.key === k && <span className="sort-arrow">{sort.dir === 'desc' ? '▼' : '▲'}</span>}
    </th>
  );

  const maxGoals = Math.max(...D.SCORERS.map(p => p.goals));

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">მოთამაშის სტატისტიკა</h1>
          <div className="page-sub">სეზონის ლიდერები ყველა კატეგორიაში</div>
        </div>
        <button className="btn"><Ico name="download" size={14} />CSV</button>
      </div>

      <div className="kpi-grid">
        <div className="kpi"><span className="kpi-label">მოთამაშე</span><span className="kpi-value">{D.SCORERS.length}</span><span className="kpi-delta">სტატისტიკაში</span></div>
        <div className="kpi"><span className="kpi-label">ჯამური გოლი</span><span className="kpi-value tnum">{D.SCORERS.reduce((a,p)=>a+p.goals,0)}</span><span className="kpi-delta">სეზონში</span></div>
        <div className="kpi"><span className="kpi-label">ჯამური ასისტი</span><span className="kpi-value tnum">{D.SCORERS.reduce((a,p)=>a+p.assists,0)}</span><span className="kpi-delta">სეზონში</span></div>
        <div className="kpi"><span className="kpi-label">საშ. სიზუსტე</span><span className="kpi-value tnum">{Math.round(D.SCORERS.reduce((a,p)=>a+p.accuracy,0)/D.SCORERS.length)}%</span><span className="kpi-delta">დარტყმის</span></div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">ბომბარდირები</h3>
          <span className="card-sub">{sorted.length} მოთამაშე</span>
        </div>
        <div className="filter-bar">
          {[['all','ყველა'],['F','თავდამსხმელი'],['M','ნახევრადცემელი'],['D','მცველი']].map(([k,l])=>(
            <button key={k} className="chip" aria-pressed={pos===k} onClick={()=>setPos(k)}>{l}</button>
          ))}
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{width:32}}>#</th>
              <Th k="name">მოთამაშე</Th>
              <th>გუნდი</th>
              <Th k="goals" num>გოლი</Th>
              <th style={{width:80}}>გრაფი</th>
              <Th k="assists" num>ა</Th>
              <Th k="apps" num>მ</Th>
              <Th k="mins" num>წთ</Th>
              <Th k="shots" num>დარ</Th>
              <Th k="accuracy" num>სიზ%</Th>
              <Th k="yellow" num>🟨</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p,i) => {
              const team = D.byId(p.team);
              return (
                <tr key={p.id} className="clickable" onClick={()=>{setTeamId(p.team);setPage('team')}}>
                  <td className="pos">{i+1}</td>
                  <td className="strong">
                    <div className="team-cell">
                      <div className="crest" style={{background:team.color,fontSize:9}}>{p.no}</div>
                      <div>
                        <div>{p.name}</div>
                        <div className="muted mono" style={{fontSize:'var(--fs-xs)'}}>{p.pos==='F'?'F':p.pos==='M'?'M':'D'} · {p.age}წ</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="team-cell"><Crest team={team} /><span style={{fontSize:'var(--fs-sm)'}}>{team.short}</span></div>
                  </td>
                  <td className="num" style={{fontWeight:700,fontSize:'var(--fs-lg)'}}>{p.goals}</td>
                  <td>
                    <div className="minibar"><div className="minibar-fill" style={{width:`${p.goals/maxGoals*100}%`}}></div></div>
                  </td>
                  <td className="num">{p.assists}</td>
                  <td className="num">{p.apps}</td>
                  <td className="num">{p.mins}</td>
                  <td className="num">{p.shots}</td>
                  <td className="num"><span className={`badge ${p.accuracy>=55?'success':p.accuracy>=45?'warn':'danger'}`}>{p.accuracy}%</span></td>
                  <td className="num">{p.yellow}{p.red?<span style={{color:'var(--danger)',marginLeft:4}}>+R</span>:''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { TeamPage, PlayersPage });
