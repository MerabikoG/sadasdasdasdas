/* global React, ReactDOM */
const { useState, useMemo, useEffect, useRef } = React;
const D = window.LIGA_DATA;

// ── Icon set (line, monoline) ─────────────────────────────────────────────
const Ico = ({ name, size = 16 }) => {
  const paths = {
    table: 'M3 4h18M3 9h18M3 14h18M3 19h18',
    calendar: 'M3 6h18M3 6v14a1 1 0 001 1h16a1 1 0 001-1V6M8 3v4M16 3v4',
    team: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21v-1a5 5 0 015-5h8a5 5 0 015 5v1',
    stats: 'M3 21V3M3 21h18M7 16v-5M11 16v-9M15 16v-3M19 16v-7',
    live: 'M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0M12 12m-7 0a7 7 0 1014 0 7 7 0 10-14 0',
    search: 'M11 11m-7 0a7 7 0 1014 0 7 7 0 10-14 0M21 21l-4.5-4.5',
    bell: 'M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 004 0',
    arrowUp: 'M12 19V5M5 12l7-7 7 7',
    arrowDown: 'M12 5v14M5 12l7 7 7-7',
    arrowRight: 'M5 12h14M13 5l7 7-7 7',
    chevronRight: 'M9 6l6 6-6 6',
    filter: 'M3 6h18M6 12h12M10 18h4',
    download: 'M12 3v12M5 10l7 7 7-7M3 21h18',
    close: 'M18 6L6 18M6 6l12 12',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
};

const Crest = ({ team, size = 'md' }) => {
  const t = typeof team === 'string' ? D.byId(team) : team;
  if (!t) return null;
  const cls = size === 'lg' ? 'crest lg' : size === 'xl' ? 'crest xl' : 'crest';
  return <div className={cls} style={{ background: t.color }} aria-hidden="true">{t.short}</div>;
};

const FormPills = ({ form }) => (
  <div className="form">
    {form.map((r, i) => <span key={i} className={`form-cell ${r}`}>{r}</span>)}
  </div>
);

const NAV = [
  { id: 'standings', label: 'ტურნირის ცხრილი', icon: 'table', section: 'ტურნირი' },
  { id: 'fixtures', label: 'მატჩები', icon: 'calendar', section: 'ტურნირი' },
  { id: 'live', label: 'ლაივ მატჩი', icon: 'live', section: 'ტურნირი', badge: 'live', badgeText: 'LIVE' },
  { id: 'team', label: 'გუნდები', icon: 'team', section: 'ანალიტიკა' },
  { id: 'players', label: 'მოთამაშეები', icon: 'stats', section: 'ანალიტიკა' },
];

function Sidebar({ page, setPage }) {
  const sections = ['ტურნირი', 'ანალიტიკა'];
  return (
    <aside className="sidebar" aria-label="ნავიგაცია">
      <div className="brand">
        <div className="brand-mark">ლ</div>
        <div>
          <div className="brand-name">ლიგა</div>
          <div className="brand-sub">სეზონი 2025/26</div>
        </div>
      </div>
      {sections.map(sec => (
        <div className="nav-section" key={sec}>
          <div className="nav-section-label">{sec}</div>
          {NAV.filter(n => n.section === sec).map(item => (
            <button key={item.id} className="nav-item"
              aria-current={page === item.id ? 'page' : undefined}
              onClick={() => setPage(item.id)}>
              <Ico name={item.icon} />
              <span>{item.label}</span>
              {item.badge && <span className={`nav-badge ${item.badge}`}>{item.badgeText}</span>}
            </button>
          ))}
        </div>
      ))}
      <div className="spacer" />
      <div className="nav-section">
        <div className="nav-section-label">სხვა</div>
        <button className="nav-item"><Ico name="download" /><span>გადმოწერა</span></button>
      </div>
    </aside>
  );
}

function TopNav({ page, setPage }) {
  return (
    <nav className="topnav" aria-label="ნავიგაცია">
      <div className="brand">
        <div className="brand-mark">ლ</div>
        <div>
          <div className="brand-name">ლიგა</div>
        </div>
      </div>
      <div className="topnav-links">
        {NAV.map(item => (
          <button key={item.id} className="topnav-link"
            aria-current={page === item.id ? 'page' : undefined}
            onClick={() => setPage(item.id)}>
            <Ico name={item.icon} size={14} />
            <span>{item.label}</span>
            {item.badge && <span className={`nav-badge ${item.badge}`}>{item.badgeText}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
}

function TopBar({ page, setTeamId }) {
  const titles = {
    standings: 'ტურნირის ცხრილი',
    fixtures: 'მატჩების კალენდარი',
    live: 'ლაივ მატჩი',
    team: 'გუნდის გვერდი',
    players: 'მოთამაშის სტატისტიკა',
  };
  return (
    <div className="topbar">
      <div className="crumbs">
        <span>ერევნული ლიგა</span>
        <span className="sep">/</span>
        <strong>{titles[page]}</strong>
      </div>
      <div className="row">
        <div className="search">
          <Ico name="search" size={14} />
          <input placeholder="ძიება გუნდი, მოთამაშე..." />
          <kbd>⌘K</kbd>
        </div>
        <button className="icon-btn" aria-label="შეტყობინებები"><Ico name="bell" size={15} /><span className="dot"></span></button>
        <div className="avatar" aria-label="პროფილი">გ</div>
      </div>
    </div>
  );
}

Object.assign(window, { Ico, Crest, FormPills, Sidebar, TopNav, TopBar, NAV });
