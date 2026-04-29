// Mock data for ფეხბურთის ლიგა
window.LIGA_DATA = (function() {
  const TEAMS = [
    { id: 'din', short: 'DIN', name: 'დინამო თბილისი', city: 'თბილისი', founded: 1925, color: '#0d4eaf' },
    { id: 'tor', short: 'TOR', name: 'ტორპედო ქუთაისი', city: 'ქუთაისი', founded: 1946, color: '#e63946' },
    { id: 'sab', short: 'SAB', name: 'საბურთალო', city: 'თბილისი', founded: 1999, color: '#f7b500' },
    { id: 'din-bat', short: 'DBT', name: 'დინამო ბათუმი', city: 'ბათუმი', founded: 1923, color: '#1f7a8c' },
    { id: 'lok', short: 'LOK', name: 'ლოკომოტივი', city: 'თბილისი', founded: 1936, color: '#2d6a4f' },
    { id: 'tel', short: 'TEL', name: 'ტელავი', city: 'თელავი', founded: 1939, color: '#7b2cbf' },
    { id: 'sam', short: 'SAM', name: 'სამტრედია', city: 'სამტრედია', founded: 1936, color: '#bc4749' },
    { id: 'gag', short: 'GAG', name: 'გაგრა', city: 'თბილისი', founded: 2004, color: '#e07856' },
    { id: 'kol', short: 'KOL', name: 'კოლხეთი', city: 'ფოთი', founded: 1913, color: '#0a9396' },
    { id: 'shu', short: 'SHU', name: 'შუქურა', city: 'ცხაკაია', founded: 1953, color: '#5a189a' },
  ];

  // Standings — realistic distribution after 18 rounds
  const STANDINGS = [
    { team: 'din', p: 18, w: 13, d: 3, l: 2, gf: 38, ga: 12, form: ['W','W','W','D','W'] },
    { team: 'sab', p: 18, w: 12, d: 4, l: 2, gf: 35, ga: 14, form: ['W','D','W','W','W'] },
    { team: 'tor', p: 18, w: 11, d: 3, l: 4, gf: 31, ga: 17, form: ['W','L','W','W','D'] },
    { team: 'din-bat', p: 18, w: 9, d: 5, l: 4, gf: 27, ga: 19, form: ['D','W','W','D','W'] },
    { team: 'lok', p: 18, w: 8, d: 4, l: 6, gf: 22, ga: 21, form: ['L','W','D','W','L'] },
    { team: 'gag', p: 18, w: 7, d: 4, l: 7, gf: 21, ga: 24, form: ['W','L','D','W','L'] },
    { team: 'tel', p: 18, w: 6, d: 5, l: 7, gf: 19, ga: 22, form: ['D','W','L','D','W'] },
    { team: 'sam', p: 18, w: 5, d: 4, l: 9, gf: 17, ga: 28, form: ['L','L','D','W','L'] },
    { team: 'kol', p: 18, w: 3, d: 5, l: 10, gf: 13, ga: 31, form: ['L','L','D','L','D'] },
    { team: 'shu', p: 18, w: 2, d: 3, l: 13, gf: 10, ga: 38, form: ['L','L','L','D','L'] },
  ].map(s => ({ ...s, pts: s.w*3 + s.d, gd: s.gf - s.ga }));

  // Fixtures — past + upcoming
  const FIXTURES = [
    // Past (round 17)
    { id: 'm17-1', round: 17, date: '2026-04-19', time: '17:00', home: 'din', away: 'shu', hs: 4, as: 0, status: 'finished', stadium: 'ბორის პაიჭაძე' },
    { id: 'm17-2', round: 17, date: '2026-04-19', time: '19:30', home: 'sab', away: 'kol', hs: 3, as: 1, status: 'finished', stadium: 'მიხეილ მესხი' },
    { id: 'm17-3', round: 17, date: '2026-04-20', time: '17:00', home: 'tor', away: 'sam', hs: 2, as: 1, status: 'finished', stadium: 'რამაზ შენგელია' },
    { id: 'm17-4', round: 17, date: '2026-04-20', time: '19:30', home: 'din-bat', away: 'tel', hs: 2, as: 2, status: 'finished', stadium: 'ბათუმის არენა' },
    { id: 'm17-5', round: 17, date: '2026-04-21', time: '19:00', home: 'lok', away: 'gag', hs: 1, as: 1, status: 'finished', stadium: 'მიხეილ მესხი' },
    // Round 18
    { id: 'm18-1', round: 18, date: '2026-04-26', time: '17:00', home: 'din', away: 'tor', hs: 2, as: 1, status: 'finished', stadium: 'ბორის პაიჭაძე' },
    { id: 'm18-2', round: 18, date: '2026-04-26', time: '19:30', home: 'kol', away: 'shu', hs: 1, as: 0, status: 'finished', stadium: 'ფაზისი' },
    { id: 'm18-3', round: 18, date: '2026-04-27', time: '19:00', home: 'sab', away: 'din-bat', hs: 1, as: 1, status: 'finished', stadium: 'მიხეილ მესხი' },
    { id: 'm18-4', round: 18, date: '2026-04-28', time: '19:00', home: 'tel', away: 'lok', hs: 0, as: 1, status: 'live', minute: 67, stadium: 'თემურ სტეფანია' },
    { id: 'm18-5', round: 18, date: '2026-04-28', time: '21:30', home: 'gag', away: 'sam', hs: null, as: null, status: 'scheduled', stadium: 'მიხეილ მესხი' },
    // Round 19
    { id: 'm19-1', round: 19, date: '2026-05-03', time: '17:00', home: 'sam', away: 'din', hs: null, as: null, status: 'scheduled', stadium: 'ერისთავი' },
    { id: 'm19-2', round: 19, date: '2026-05-03', time: '19:30', home: 'tor', away: 'sab', hs: null, as: null, status: 'scheduled', stadium: 'რამაზ შენგელია' },
    { id: 'm19-3', round: 19, date: '2026-05-04', time: '17:00', home: 'shu', away: 'tel', hs: null, as: null, status: 'scheduled', stadium: 'ცხაკაია არენა' },
    { id: 'm19-4', round: 19, date: '2026-05-04', time: '19:30', home: 'din-bat', away: 'kol', hs: null, as: null, status: 'scheduled', stadium: 'ბათუმის არენა' },
    { id: 'm19-5', round: 19, date: '2026-05-05', time: '19:00', home: 'lok', away: 'gag', hs: null, as: null, status: 'scheduled', stadium: 'მიხეილ მესხი' },
    // Round 20
    { id: 'm20-1', round: 20, date: '2026-05-10', time: '17:00', home: 'din', away: 'din-bat', hs: null, as: null, status: 'scheduled', stadium: 'ბორის პაიჭაძე' },
    { id: 'm20-2', round: 20, date: '2026-05-10', time: '19:30', home: 'sab', away: 'lok', hs: null, as: null, status: 'scheduled', stadium: 'მიხეილ მესხი' },
    { id: 'm20-3', round: 20, date: '2026-05-11', time: '19:00', home: 'gag', away: 'tor', hs: null, as: null, status: 'scheduled', stadium: 'მიხეილ მესხი' },
    { id: 'm20-4', round: 20, date: '2026-05-11', time: '21:00', home: 'tel', away: 'sam', hs: null, as: null, status: 'scheduled', stadium: 'თემურ სტეფანია' },
    { id: 'm20-5', round: 20, date: '2026-05-12', time: '19:00', home: 'kol', away: 'shu', hs: null, as: null, status: 'scheduled', stadium: 'ფაზისი' },
  ];

  // Top scorers
  const SCORERS = [
    { id: 'p1', name: 'გიორგი ჭაკვეტაძე', team: 'din', pos: 'F', no: 9, age: 26, goals: 14, assists: 6, apps: 17, mins: 1480, yellow: 2, red: 0, shots: 48, accuracy: 62 },
    { id: 'p2', name: 'ხვიჩა კვარაცხელია', team: 'sab', pos: 'M', no: 11, age: 25, goals: 12, assists: 9, apps: 18, mins: 1620, yellow: 3, red: 0, shots: 41, accuracy: 58 },
    { id: 'p3', name: 'ლუკა ლოჩოშვილი', team: 'tor', pos: 'F', no: 7, age: 24, goals: 11, assists: 4, apps: 18, mins: 1580, yellow: 4, red: 0, shots: 39, accuracy: 56 },
    { id: 'p4', name: 'ბუდუ ზივზივაძე', team: 'din-bat', pos: 'F', no: 19, age: 31, goals: 9, assists: 3, apps: 16, mins: 1340, yellow: 1, red: 0, shots: 32, accuracy: 53 },
    { id: 'p5', name: 'ნიკა გაგნიძე', team: 'din', pos: 'M', no: 8, age: 23, goals: 8, assists: 7, apps: 18, mins: 1620, yellow: 5, red: 0, shots: 28, accuracy: 50 },
    { id: 'p6', name: 'ზურიკო დავითაშვილი', team: 'sab', pos: 'F', no: 10, age: 25, goals: 7, assists: 5, apps: 17, mins: 1450, yellow: 2, red: 0, shots: 30, accuracy: 47 },
    { id: 'p7', name: 'სანდრო ალთუნაშვილი', team: 'tor', pos: 'M', no: 6, age: 27, goals: 6, assists: 8, apps: 18, mins: 1620, yellow: 6, red: 1, shots: 22, accuracy: 45 },
    { id: 'p8', name: 'ოთარ ყიფიანი', team: 'lok', pos: 'F', no: 21, age: 22, goals: 6, assists: 2, apps: 15, mins: 1180, yellow: 1, red: 0, shots: 26, accuracy: 42 },
    { id: 'p9', name: 'ნოდარ ყავთარაძე', team: 'gag', pos: 'F', no: 17, age: 28, goals: 5, assists: 4, apps: 17, mins: 1390, yellow: 3, red: 0, shots: 24, accuracy: 40 },
    { id: 'p10', name: 'გრიგოლ ჩაბრაძე', team: 'tel', pos: 'M', no: 14, age: 24, goals: 5, assists: 3, apps: 18, mins: 1530, yellow: 4, red: 0, shots: 19, accuracy: 38 },
    { id: 'p11', name: 'დათო ხოჭოლავა', team: 'din-bat', pos: 'M', no: 10, age: 26, goals: 4, assists: 6, apps: 17, mins: 1490, yellow: 2, red: 0, shots: 18, accuracy: 36 },
    { id: 'p12', name: 'მირიან გვარდიოლა', team: 'sam', pos: 'F', no: 9, age: 25, goals: 4, assists: 1, apps: 16, mins: 1320, yellow: 3, red: 0, shots: 21, accuracy: 35 },
  ];

  // Live match events for tel vs lok
  const LIVE_EVENTS = [
    { min: 12, type: 'goal', team: 'lok', player: 'ოთარ ყიფიანი', detail: 'მოედნიდან 18 მ.' },
    { min: 23, type: 'yellow', team: 'tel', player: 'გრიგოლ ჩაბრაძე', detail: 'უხეში თამაში' },
    { min: 34, type: 'sub', team: 'tel', player: 'რევაზ მამუჩაშვილი', detail: 'შეცვალა: ბ. ცეცხლაძე' },
    { min: 41, type: 'shot', team: 'tel', player: 'გრიგოლ ჩაბრაძე', detail: 'ბოძი' },
    { min: 45, type: 'half', team: null, player: 'პირველი ტაიმი', detail: '0–1' },
    { min: 52, type: 'yellow', team: 'lok', player: 'გია გელაშვილი', detail: 'ხელით თამაში' },
    { min: 58, type: 'corner', team: 'tel', player: 'ანგარიში 4–2', detail: 'კუთხური' },
    { min: 64, type: 'sub', team: 'lok', player: 'ვახო ჯიქია', detail: 'შეცვალა: ო. ყიფიანი' },
    { min: 67, type: 'shot', team: 'tel', player: 'ლევან წულაია', detail: 'მკლავამდე' },
  ];

  // Generate season form for chart
  const seasonChart = STANDINGS.map(s => {
    const pts = [];
    let total = 0;
    for (let i = 0; i < 18; i++) {
      const r = Math.random();
      const teamStrength = s.pts / 18 / 3;
      if (r < teamStrength * 0.7) total += 3;
      else if (r < teamStrength * 0.85 + 0.2) total += 1;
      pts.push(total);
    }
    pts[17] = s.pts; // ensure end matches
    return { team: s.team, pts };
  });

  return { TEAMS, STANDINGS, FIXTURES, SCORERS, LIVE_EVENTS, seasonChart, byId: (id) => TEAMS.find(t => t.id === id) };
})();
