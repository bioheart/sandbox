// PRESET COMPARISON DATASETS
const PRESETS = {
  longArray: {
    a: `[
  { "id": "3001487", "name": "SportyBet" },
  { "id": "3000547", "name": "Tempobet" },
  { "id": "3001522", "name": "Rowilong" },
  { "id": "3000719", "name": "PMU" },
  { "id": "3001017", "name": "MrGreen" },
  { "id": "3001506", "name": "Morrisvee" },
  { "id": "3000245", "name": "Coral" },
  { "id": "3001505", "name": "Kero Gaming" },
  { "id": "3000048", "name": "BetVictor" },
  { "id": "3001406", "name": "No Account Bet" },
  { "id": "3001458", "name": "Cyprus BS" },
  { "id": "3000735", "name": "Dafabet Sports" },
  { "id": "3000911", "name": "PlanetWin365" },
  { "id": "3000039", "name": "Svenska Spel" },
  { "id": "3001483", "name": "Esportesdasorte" },
  { "id": "3000555", "name": "Betradar" },
  { "id": "3001328", "name": "Pokerstars" },
  { "id": "3000294", "name": "Betfred" },
  { "id": "3001213", "name": "BTI Demo" },
  { "id": "3001536", "name": "Bet Boys" },
  { "id": "3000326", "name": "Betway" },
  { "id": "3001152", "name": "BetsAPI" },
  { "id": "3000424", "name": "888Sport" },
  { "id": "3001347", "name": "OMC derived odds" },
  { "id": "3000001", "name": "Danske Spil" },
  { "id": "3001554", "name": "Thescore" },
  { "id": "3001348", "name": "OMC derived odds stage" },
  { "id": "3001517", "name": "nVenue" },
  { "id": "3000347", "name": "Sportsbet.com.au" },
  { "id": "3001507", "name": "Worldsportsbetting" },
  { "id": "3001404", "name": "Leapbit" },
  { "id": "3000469", "name": "Marathon" },
  { "id": "3000181", "name": "Bet365" },
  { "id": "3000995", "name": "Stoiximan.gr" },
  { "id": "3001495", "name": "HSL Horse Racing Virtuals" },
  { "id": "3001425", "name": "OddsMatrix DIY Excel File" },
  { "id": "3000400", "name": "Eurobet.it" },
  { "id": "3001537", "name": "Betradar UOF EM" },
  { "id": "3000287", "name": "Boyle Sports" },
  { "id": "3001363", "name": "OMC model-driven odds" },
  { "id": "3000825", "name": "Kiron" },
  { "id": "3001540", "name": "Admiral.hr" },
  { "id": "3000727", "name": "Sisal.it" },
  { "id": "3001175", "name": "Fanduel" },
  { "id": "3001364", "name": "OMC model-driven odds stage" },
  { "id": "3000945", "name": "Betradar UOF" },
  { "id": "3000716", "name": "ParionsSport" },
  { "id": "3001157", "name": "eFortuna.ro" },
  { "id": "3001437", "name": "Maxbet" },
  { "id": "3000062", "name": "Skybet" },
  { "id": "3000336", "name": "BetClic" },
  { "id": "3000068", "name": "Ladbrokes" },
  { "id": "3001380", "name": "Powbet" },
  { "id": "3001358", "name": "ESPN.com" },
  { "id": "3001342", "name": "Raybet8" },
  { "id": "3000979", "name": "Oddsmatrix Scores" },
  { "id": "3001374", "name": "N1bet" },
  { "id": "3001435", "name": "20Bet" },
  { "id": "3000823", "name": "Bovada.lv" },
  { "id": "3000113", "name": "Paddy Power" },
  { "id": "3001455", "name": "Doradobet" },
  { "id": "3000485", "name": "Betaland" },
  { "id": "3001414", "name": "Bet-at-home DIY" },
  { "id": "3001490", "name": "FSB Tech" },
  { "id": "3000740", "name": "VBet" },
  { "id": "3000715", "name": "32Red Bet" },
  { "id": "3001493", "name": "HollywoodBets" },
  { "id": "3001006", "name": "GG.bet" },
  { "id": "3001550", "name": "Betano.br" },
  { "id": "3001551", "name": "1st Group" },
  { "id": "3000973", "name": "Bet365 Live" },
  { "id": "3001375", "name": "888sport.ro" },
  { "id": "3001459", "name": "Exefeed" },
  { "id": "3000943", "name": "Betradar Stats" },
  { "id": "3001237", "name": "Betano.de" },
  { "id": "3001135", "name": "SuperBet.ro" },
  { "id": "3001303", "name": "Grosvenor" },
  { "id": "3001008", "name": "OddsMatrix DIY" },
  { "id": "3000343", "name": "188Bet" },
  { "id": "3001218", "name": "Dafabet OW Sports" },
  { "id": "3001456", "name": "PSK" },
  { "id": "3001332", "name": "Ngenge Specials" },
  { "id": "3000271", "name": "10Bet.co.uk" },
  { "id": "3000028", "name": "Expekt" },
  { "id": "3000841", "name": "Novibet" },
  { "id": "3001117", "name": "Price Boost Manual" },
  { "id": "3001356", "name": "Draftkings" },
  { "id": "3001469", "name": "SIS" },
  { "id": "3000490", "name": "Racebets" },
  { "id": "3001427", "name": "Betinvest" },
  { "id": "3000474", "name": "Tipico" },
  { "id": "3000900", "name": "Betfair Sportsbook" },
  { "id": "3000345", "name": "Tipsport" },
  { "id": "3001423", "name": "Tippmix.hu" },
  { "id": "3000042", "name": "SNAI.it" },
  { "id": "3000049", "name": "Fonbet" },
  { "id": "3000821", "name": "Betcity" },
  { "id": "3000867", "name": "CMD368.com" },
  { "id": "3001027", "name": "Lvbet" },
  { "id": "3000012", "name": "SportingBet" },
  { "id": "3000319", "name": "Betsson Sportsbook" },
  { "id": "3001273", "name": "Forex" },
  { "id": "3001401", "name": "Rivalry" },
  { "id": "3001500", "name": "Daznbet" },
  { "id": "3000368", "name": "SBOBET" },
  { "id": "3001278", "name": "BetBazar" },
  { "id": "3001513", "name": "HSL Horse Racing Virtuals Stage" },
  { "id": "3000107", "name": "Pinnacle Sports" },
  { "id": "3001480", "name": "Mozzartbet.com" },
  { "id": "3001508", "name": "Interbet" },
  { "id": "3000015", "name": "Unibet" },
  { "id": "3000006", "name": "BWin" },
  { "id": "3001489", "name": "PA Betting" },
  { "id": "3000004", "name": "Interwetten" },
  { "id": "3001381", "name": "BetMGM" },
  { "id": "3000359", "name": "Nike.sk" },
  { "id": "3000508", "name": "Betonline" },
  { "id": "3000569", "name": "ESPNBet.com" },
  { "id": "3000920", "name": "1xBet" },
  { "id": "3000996", "name": "Betano.ro" },
  { "id": "3000021", "name": "William Hill" },
  { "id": "3000460", "name": "Giocodigitale.it" }
]`,
    b: `[
  { "id": "3001487", "name": "SportyBet" },
  { "id": "3000547", "name": "Tempobet" },
  { "id": "3001522", "name": "Rowilong" },
  { "id": "3000719", "name": "PMU" },
  { "id": "3001017", "name": "MrGreen" },
  { "id": "3001506", "name": "Morrisvee" },
  { "id": "3000245", "name": "Coral" },
  { "id": "3001505", "name": "Kero Gaming" },
  { "id": "3000048", "name": "BetVictor" },
  { "id": "3001406", "name": "No Account Bet" },
  { "id": "3001458", "name": "Cyprus BS" },
  { "id": "3000735", "name": "Dafabet Sports" },
  { "id": "3000911", "name": "PlanetWin365" },
  { "id": "3000039", "name": "Svenska Spel" },
  { "id": "3001483", "name": "Esportesdasorte" },
  { "id": "3000555", "name": "Betradar" },
  { "id": "3001328", "name": "Pokerstars" },
  { "id": "3000294", "name": "Betfred" },
  { "id": "3001213", "name": "BTI Demo" },
  { "id": "3001536", "name": "Bet Boys" },
  { "id": "3000326", "name": "Betway" },
  { "id": "3001152", "name": "BetsAPI" },
  { "id": "3000424", "name": "888Sport" },
  { "id": "3001347", "name": "OMC derived odds" },
  { "id": "3000001", "name": "Danske Spil" },
  { "id": "3001554", "name": "Thescore" },
  { "id": "3001348", "name": "OMC derived odds stage" },
  { "id": "3001517", "name": "nVenue" },
  { "id": "3000347", "name": "Sportsbet.com.au" },
  { "id": "3001507", "name": "Worldsportsbetting" },
  { "id": "3001404", "name": "Leapbit" },
  { "id": "3000469", "name": "Marathon" },
  { "id": "3000181", "name": "Bet365" },
  { "id": "3000995", "name": "Stoiximan.gr" },
  { "id": "3001495", "name": "HSL Horse Racing Virtuals" },
  { "id": "3001425", "name": "OddsMatrix DIY Excel File" },
  { "id": "3000400", "name": "Eurobet.it" },
  { "id": "3001537", "name": "Betradar UOF EM" },
  { "id": "3000287", "name": "Boyle Sports" },
  { "id": "3001363", "name": "OMC model-driven odds" },
  { "id": "3000825", "name": "Kiron" },
  { "id": "3001540", "name": "Admiral.hr" },
  { "id": "3000727", "name": "Sisal.it" },
  { "id": "3001175", "name": "Fanduel" },
  { "id": "3001364", "name": "OMC model-driven odds stage" },
  { "id": "3000945", "name": "Betradar UOF" },
  { "id": "3000716", "name": "ParionsSport" },
  { "id": "3001157", "name": "eFortuna.ro" },
  { "id": "3001437", "name": "Maxbet" },
  { "id": "3000062", "name": "Skybet" },
  { "id": "3000336", "name": "BetClic" },
  { "id": "3000068", "name": "Ladbrokes" },
  { "id": "3001380", "name": "Powbet" },
  { "id": "3001358", "name": "ESPN.com" },
  { "id": "3001342", "name": "Raybet8" },
  { "id": "3000979", "name": "Oddsmatrix Scores" },
  { "id": "3001374", "name": "N1bet" },
  { "id": "3001435", "name": "20Bet" },
  { "id": "3000823", "name": "Bovada.lv" },
  { "id": "3000113", "name": "Paddy Power" },
  { "id": "3001455", "name": "Doradobet" },
  { "id": "3000485", "name": "Betaland" },
  { "id": "3001414", "name": "Bet-at-home DIY" },
  { "id": "3001490", "name": "FSB Tech" },
  { "id": "3000740", "name": "VBet" },
  { "id": "3000715", "name": "32Red Bet" },
  { "id": "3001493", "name": "HollywoodBets" },
  { "id": "3001006", "name": "GG.bet" },
  { "id": "3001550", "name": "Betano.br" },
  { "id": "3001551", "name": "1st Group" },
  { "id": "3000973", "name": "Bet365 Live" },
  { "id": "3001375", "name": "888sport.ro" },
  { "id": "3001459", "name": "Exefeed" },
  { "id": "3000943", "name": "Betradar Stats" },
  { "id": "3001237", "name": "Betano.de" },
  { "id": "3001135", "name": "SuperBet.ro" },
  { "id": "3001303", "name": "Grosvenor" },
  { "id": "3001008", "name": "OddsMatrix DIY" },
  { "id": "3000343", "name": "188Bet" },
  { "id": "3001218", "name": "Dafabet OW Sports" },
  { "id": "3001456", "name": "PSK" },
  { "id": "3001332", "name": "Ngenge Specials" },
  { "id": "3000271", "name": "10Bet.co.uk" },
  { "id": "3000028", "name": "Expekt" },
  { "id": "3000841", "name": "Novibet" },
  { "id": "3001117", "name": "Price Boost Manual" },
  { "id": "3001356", "name": "Draftkings" },
  { "id": "3001469", "name": "SIS" },
  { "id": "3000490", "name": "Racebets" },
  { "id": "3001427", "name": "Betinvest" },
  { "id": "3000474", "name": "Tipico" },
  { "id": "3000900", "name": "Betfair Sportsbook" },
  { "id": "3000345", "name": "Tipsport" },
  { "id": "3001423", "name": "Tippmix.hu" },
  { "id": "3000042", "name": "SNAI.it" },
  { "id": "3000049", "name": "Fonbet" },
  { "id": "3000821", "name": "Betcity" },
  { "id": "3000867", "name": "CMD368.com" },
  { "id": "3001027", "name": "Lvbet" },
  { "id": "3000012", "name": "SportingBet" },
  { "id": "3000319", "name": "Betsson Sportsbook" },
  { "id": "3001273", "name": "Forex" },
  { "id": "3001401", "name": "Rivalry" },
  { "id": "3001500", "name": "Daznbet" },
  { "id": "3000368", "name": "SBOBET" },
  { "id": "3001278", "name": "BetBazar" },
  { "id": "3001513", "name": "HSL Horse Racing Virtuals Stage" },
  { "id": "3000107", "name": "Pinnacle Sports" },
  { "id": "3001480", "name": "Mozzartbet.com" },
  { "id": "3001508", "name": "Interbet" },
  { "id": "3000015", "name": "Unibet" },
  { "id": "3000006", "name": "BWin" },
  { "id": "3001489", "name": "PA Betting" },
  { "id": "3000996", "name": "Betano.ro" },
  { "id": "3000021", "name": "William Hill" },
  { "id": "3000460", "name": "Giocodigitale.it" }
]`
  },
  api: {
    a: `{
  "status": "success",
  "version": "1.0.0",
  "deprecated_field": "v1_only",
  "data": {
    "total_users": 150,
    "limit": 10,
    "items": [
      { "id": 1, "name": "Item A" }
    ]
  }
}`,
    b: `{
  "status": "success",
  "version": "1.0.2",
  "deprecated_field": "v1_only",
  "data": {
    "total_users": 150,
    "items": [
      { "id": 1, "name": "Item A" }
    ]
  }
}`
  },
  profile: {
    a: `{
  "id": 10842,
  "username": "somchai_j",
  "email": "somchai@example.com",
  "role": "developer",
  "is_active": true,
  "legacy_code": "OLD_992",
  "profile": {
    "city": "Bangkok",
    "salary": 45000,
    "skills": [
      "JavaScript",
      "Python"
    ]
  }
}`,
    b: `{
  "id": 10842,
  "username": "somchai_j",
  "email": "somchai.j@example.com",
  "role": "senior_developer",
  "is_active": true,
  "profile": {
    "city": "Bangkok",
    "salary": 55000,
    "skills": [
      "JavaScript",
      "Python",
      "TypeScript"
    ],
    "country": "Thailand"
  }
}`
  },
  config: {
    a: `{
  "app_name": "Sandbox App",
  "port": 8080,
  "debug": true,
  "database": {
    "host": "localhost",
    "port": 5432,
    "ssl": false
  },
  "features": {
    "dark_mode": true,
    "legacy_auth": true
  }
}`,
    b: `{
  "app_name": "Sandbox App",
  "port": 9000,
  "debug": false,
  "database": {
    "host": "db.internal",
    "port": 5432,
    "ssl": true
  },
  "features": {
    "dark_mode": true,
    "oauth2": true
  }
}`
  }
};

// DOM ELEMENTS
const jsonInputA = document.getElementById('jsonInputA');
const jsonInputB = document.getElementById('jsonInputB');
const highlightA = document.getElementById('highlightA');
const highlightB = document.getElementById('highlightB');
const lineNumsA = document.getElementById('lineNumsA');
const lineNumsB = document.getElementById('lineNumsB');
const statsA = document.getElementById('statsA');
const statsB = document.getElementById('statsB');

const addedGroup = document.getElementById('addedGroup');
const addedCount = document.getElementById('addedCount');
const addedPrevBtn = document.getElementById('addedPrevBtn');
const addedNextBtn = document.getElementById('addedNextBtn');

const removedGroup = document.getElementById('removedGroup');
const removedCount = document.getElementById('removedCount');
const removedPrevBtn = document.getElementById('removedPrevBtn');
const removedNextBtn = document.getElementById('removedNextBtn');

const changedGroup = document.getElementById('changedGroup');
const changedCount = document.getElementById('changedCount');
const changedPrevBtn = document.getElementById('changedPrevBtn');
const changedNextBtn = document.getElementById('changedNextBtn');

const identicalBadge = document.getElementById('identicalBadge');

const presetSelect = document.getElementById('presetSelect');
const prettifyBothBtn = document.getElementById('prettifyBothBtn');
const swapPanesBtn = document.getElementById('swapPanesBtn');
const clearBothBtn = document.getElementById('clearBothBtn');
const clearABtn = document.getElementById('clearABtn');
const clearBBtn = document.getElementById('clearBBtn');
const pasteABtn = document.getElementById('pasteABtn');
const pasteBBtn = document.getElementById('pasteBBtn');

const diffModeBtn = document.getElementById('diffModeBtn');
const editModeBtn = document.getElementById('editModeBtn');
const changesListViewBtn = document.getElementById('changesListViewBtn');

const prevDiffBtn = document.getElementById('prevDiffBtn');
const nextDiffBtn = document.getElementById('nextDiffBtn');
const diffStepCounter = document.getElementById('diffStepCounter');

const paneContainerA = document.getElementById('paneContainerA');
const paneContainerB = document.getElementById('paneContainerB');
const changesListContainer = document.getElementById('changesListContainer');
const changesListContent = document.getElementById('changesListContent');
const changesSummaryText = document.getElementById('changesSummaryText');

const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeSunIcon = document.getElementById('themeSunIcon');
const themeMoonIcon = document.getElementById('themeMoonIcon');

let currentViewMode = 'diff'; // 'diff', 'edit', or 'list'
let currentDiffResult = null;
let isSyncingScroll = false;
let globalDiffIndex = -1;
let jumpIndices = { added: -1, removed: -1, changed: -1 };

// ROBUST INITIALIZATION
function initApp() {
  lucide.createIcons();
  updateThemeIcons();

  // Load initial preset (Long Array example)
  presetSelect.value = 'longArray';
  jsonInputA.value = PRESETS.longArray.a;
  jsonInputB.value = PRESETS.longArray.b;

  updateStats();
  compareJSONs();
  setMode('diff');
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  initApp();
} else {
  window.addEventListener('DOMContentLoaded', initApp);
}

// THEME TOGGLE
themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
  showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
});

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    themeSunIcon.classList.remove('hidden');
    themeMoonIcon.classList.add('hidden');
  } else {
    themeSunIcon.classList.add('hidden');
    themeMoonIcon.classList.remove('hidden');
  }
}

// SYNCHRONIZED SCROLL WITH GUARD TO PREVENT SCROLL FEEDBACK LOOPS
function syncScroll(source, target1, target2) {
  if (isSyncingScroll) return;
  isSyncingScroll = true;
  if (target1) target1.scrollTop = source.scrollTop;
  if (target2) target2.scrollTop = source.scrollTop;
  requestAnimationFrame(() => {
    isSyncingScroll = false;
  });
}

highlightA.addEventListener('scroll', () => syncScroll(highlightA, lineNumsA, highlightB));
highlightB.addEventListener('scroll', () => syncScroll(highlightB, lineNumsB, highlightA));
jsonInputA.addEventListener('scroll', () => syncScroll(jsonInputA, lineNumsA, jsonInputB));
jsonInputB.addEventListener('scroll', () => syncScroll(jsonInputB, lineNumsB, jsonInputA));

// REAL-TIME INPUT EVENT LISTENERS
jsonInputA.addEventListener('input', () => {
  updateStats();
  compareJSONs();
});

jsonInputB.addEventListener('input', () => {
  updateStats();
  compareJSONs();
});

// PRESETS SELECTOR
presetSelect.addEventListener('change', (e) => {
  const presetKey = e.target.value;
  if (PRESETS[presetKey]) {
    jsonInputA.value = PRESETS[presetKey].a;
    jsonInputB.value = PRESETS[presetKey].b;
    updateStats();
    compareJSONs();
    showToast(`Loaded ${e.target.options[e.target.selectedIndex].text}`, 'info');
  }
});

// ACTION BUTTON LISTENERS
prettifyBothBtn.addEventListener('click', () => {
  try {
    if (jsonInputA.value.trim()) {
      jsonInputA.value = JSON.stringify(parseLooseJSON(jsonInputA.value), null, 2);
    }
    if (jsonInputB.value.trim()) {
      jsonInputB.value = JSON.stringify(parseLooseJSON(jsonInputB.value), null, 2);
    }
    updateStats();
    compareJSONs();
    showToast('Formatted both JSON inputs', 'success');
  } catch (e) {
    showToast('Format error: Invalid JSON syntax', 'error');
  }
});

swapPanesBtn.addEventListener('click', () => {
  const temp = jsonInputA.value;
  jsonInputA.value = jsonInputB.value;
  jsonInputB.value = temp;
  updateStats();
  compareJSONs();
  showToast('Swapped JSON A and JSON B', 'info');
});

clearBothBtn.addEventListener('click', () => {
  jsonInputA.value = '';
  jsonInputB.value = '';
  updateStats();
  compareJSONs();
  showToast('Cleared both JSON inputs', 'info');
});

clearABtn.addEventListener('click', () => {
  jsonInputA.value = '';
  updateStats();
  compareJSONs();
});

clearBBtn.addEventListener('click', () => {
  jsonInputB.value = '';
  updateStats();
  compareJSONs();
});

pasteABtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      jsonInputA.value = text;
      updateStats();
      compareJSONs();
      setMode('diff');
      showToast('Pasted into JSON A', 'success');
    }
  } catch (err) {
    showToast('Clipboard access denied', 'error');
  }
});

pasteBBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      jsonInputB.value = text;
      updateStats();
      compareJSONs();
      setMode('diff');
      showToast('Pasted into JSON B', 'success');
    }
  } catch (err) {
    showToast('Clipboard access denied', 'error');
  }
});

// JUMP TO SPECIFIC DIFF TYPE (ADDED / REMOVED / MODIFIED)
if (addedCount) addedCount.addEventListener('click', () => jumpToDiff('added', 1));
if (addedNextBtn) addedNextBtn.addEventListener('click', () => jumpToDiff('added', 1));
if (addedPrevBtn) addedPrevBtn.addEventListener('click', () => jumpToDiff('added', -1));

if (removedCount) removedCount.addEventListener('click', () => jumpToDiff('removed', 1));
if (removedNextBtn) removedNextBtn.addEventListener('click', () => jumpToDiff('removed', 1));
if (removedPrevBtn) removedPrevBtn.addEventListener('click', () => jumpToDiff('removed', -1));

if (changedCount) changedCount.addEventListener('click', () => jumpToDiff('changed', 1));
if (changedNextBtn) changedNextBtn.addEventListener('click', () => jumpToDiff('changed', 1));
if (changedPrevBtn) changedPrevBtn.addEventListener('click', () => jumpToDiff('changed', -1));

function jumpToDiff(type, direction = 1) {
  if (!currentDiffResult || !currentDiffResult.resultA || !currentDiffResult.resultB) return;
  const { resultA, resultB } = currentDiffResult;

  const matches = [];
  const total = Math.max(resultA.length, resultB.length);

  for (let idx = 0; idx < total; idx++) {
    const itemA = resultA[idx] || {};
    const itemB = resultB[idx] || {};

    if (
      (type === 'added' && itemB.type === 'added') ||
      (type === 'removed' && itemA.type === 'removed') ||
      (type === 'changed' && (itemA.type === 'changed' || itemB.type === 'changed'))
    ) {
      matches.push(idx);
    }
  }

  if (matches.length === 0) {
    showToast(`No ${type} differences found`, 'info');
    return;
  }

  const currentIdx = jumpIndices[type];
  let nextIdx = 0;
  if (currentIdx === -1) {
    nextIdx = direction > 0 ? 0 : matches.length - 1;
  } else {
    nextIdx = (currentIdx + direction + matches.length) % matches.length;
  }
  jumpIndices[type] = nextIdx;

  const targetLineIdx = matches[nextIdx];
  scrollToLineIdx(targetLineIdx);

  // Sync globalDiffIndex & step counter
  const allMatches = getAllDiffMatches();
  const globalIdx = allMatches.indexOf(targetLineIdx);
  if (globalIdx !== -1) {
    globalDiffIndex = globalIdx;
    updateStepCounter(globalIdx + 1, allMatches.length);
  }

  showToast(`Jumped ${direction > 0 ? '⬇' : '⬆'} to ${type} diff ${nextIdx + 1}/${matches.length} (Line ${targetLineIdx + 1})`, 'success');
}

// GLOBAL STEP NAVIGATION ARROWS CONTROLLER (ALL DIFFS STEP UP / STEP DOWN ⬇⬆)
if (prevDiffBtn) prevDiffBtn.addEventListener('click', () => stepDiff(-1));
if (nextDiffBtn) nextDiffBtn.addEventListener('click', () => stepDiff(1));

function getAllDiffMatches() {
  if (!currentDiffResult || !currentDiffResult.resultA || !currentDiffResult.resultB) return [];
  const { resultA, resultB } = currentDiffResult;
  const matches = [];
  const total = Math.max(resultA.length, resultB.length);

  for (let idx = 0; idx < total; idx++) {
    const itemA = resultA[idx] || {};
    const itemB = resultB[idx] || {};
    if ((itemA.type && itemA.type !== 'equal') || (itemB.type && itemB.type !== 'equal')) {
      matches.push(idx);
    }
  }
  return matches;
}

function stepDiff(direction) {
  const matches = getAllDiffMatches();
  if (matches.length === 0) {
    showToast('No differences to navigate', 'info');
    updateStepCounter(0, 0);
    return;
  }

  if (globalDiffIndex === -1) {
    globalDiffIndex = direction > 0 ? 0 : matches.length - 1;
  } else {
    globalDiffIndex = (globalDiffIndex + direction + matches.length) % matches.length;
  }

  const targetLineIdx = matches[globalDiffIndex];
  scrollToLineIdx(targetLineIdx);
  updateStepCounter(globalDiffIndex + 1, matches.length);

  const itemA = currentDiffResult.resultA[targetLineIdx] || {};
  const itemB = currentDiffResult.resultB[targetLineIdx] || {};
  const diffType = itemA.type && itemA.type !== 'equal' && itemA.type !== 'gap' ? itemA.type : itemB.type;

  showToast(`Step ${direction > 0 ? '⬇' : '⬆'} ${globalDiffIndex + 1}/${matches.length} (${diffType} on Line ${targetLineIdx + 1})`, 'info');
}

function scrollToLineIdx(targetLineIdx) {
  const elemA = highlightA.children[targetLineIdx];
  const elemB = highlightB.children[targetLineIdx];

  const targetOffsetTop = elemA ? Math.max(0, elemA.offsetTop - 100) : Math.max(0, targetLineIdx * 24 - 100);

  if (currentViewMode === 'edit') {
    jsonInputA.scrollTop = targetOffsetTop;
    jsonInputB.scrollTop = targetOffsetTop;
    lineNumsA.scrollTop = targetOffsetTop;
    lineNumsB.scrollTop = targetOffsetTop;
  } else {
    highlightA.scrollTop = targetOffsetTop;
    highlightB.scrollTop = targetOffsetTop;
    lineNumsA.scrollTop = targetOffsetTop;
    lineNumsB.scrollTop = targetOffsetTop;
  }

  if (elemA) flashElement(elemA);
  if (elemB) flashElement(elemB);
}

function updateStepCounter(current, total) {
  if (diffStepCounter) {
    diffStepCounter.textContent = `${current} / ${total}`;
  }
}

function flashElement(el) {
  if (!el) return;
  el.classList.add('ring-2', 'ring-indigo-500', 'font-bold');
  setTimeout(() => {
    el.classList.remove('ring-2', 'ring-indigo-500', 'font-bold');
  }, 1800);
}

// MODE SWITCHER CONTROLLER
diffModeBtn.addEventListener('click', () => setMode('diff'));
editModeBtn.addEventListener('click', () => setMode('edit'));
changesListViewBtn.addEventListener('click', () => setMode('list'));

highlightA.addEventListener('click', () => setMode('edit'));
highlightB.addEventListener('click', () => setMode('edit'));

function setMode(mode) {
  currentViewMode = mode;

  const btnActive = 'px-2.5 py-1 text-xs font-medium rounded-md text-indigo-600 dark:text-neonCyan bg-slate-100 dark:bg-slate-850 shadow-sm transition flex items-center gap-1';
  const btnInactive = 'px-2.5 py-1 text-xs font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition flex items-center gap-1';

  diffModeBtn.className = mode === 'diff' ? btnActive : btnInactive;
  editModeBtn.className = mode === 'edit' ? btnActive : btnInactive;
  changesListViewBtn.className = mode === 'list' ? btnActive : btnInactive;

  if (mode === 'diff') {
    paneContainerA.classList.remove('hidden');
    paneContainerB.classList.remove('hidden');
    changesListContainer.classList.add('hidden');

    highlightA.classList.remove('hidden');
    jsonInputA.classList.add('hidden');

    highlightB.classList.remove('hidden');
    jsonInputB.classList.add('hidden');
    
    compareJSONs();
  } else if (mode === 'edit') {
    paneContainerA.classList.remove('hidden');
    paneContainerB.classList.remove('hidden');
    changesListContainer.classList.add('hidden');

    highlightA.classList.add('hidden');
    jsonInputA.classList.remove('hidden');

    highlightB.classList.add('hidden');
    jsonInputB.classList.remove('hidden');

    jsonInputA.focus();
  } else if (mode === 'list') {
    paneContainerA.classList.add('hidden');
    paneContainerB.classList.add('hidden');
    changesListContainer.classList.remove('hidden');
    renderChangesList();
  }
}

// MAIN COMPARISON ENGINE
function compareJSONs() {
  const textA = jsonInputA.value;
  const textB = jsonInputB.value;

  let objA = null;
  let objB = null;
  let parseErrA = false;
  let parseErrB = false;

  if (textA.trim()) {
    try {
      objA = parseLooseJSON(textA);
    } catch (e) {
      parseErrA = true;
    }
  }

  if (textB.trim()) {
    try {
      objB = parseLooseJSON(textB);
    } catch (e) {
      parseErrB = true;
    }
  }

  if (parseErrA || parseErrB) {
    updateLineNums(lineNumsA, textA.split('\n').length);
    updateLineNums(lineNumsB, textB.split('\n').length);
    highlightA.innerHTML = syntaxHighlight(textA);
    highlightB.innerHTML = syntaxHighlight(textB);
    updateBadges(0, 0, 0, false, parseErrA || parseErrB);
    updateStepCounter(0, 0);
    return;
  }

  // Prettify strings for line-by-line diffing if valid JSON
  const formattedA = objA !== null ? JSON.stringify(objA, null, 2) : textA;
  const formattedB = objB !== null ? JSON.stringify(objB, null, 2) : textB;

  const linesA = formattedA.split('\n');
  const linesB = formattedB.split('\n');

  // Compute Line-by-Line LCS Diff Alignment
  const diffResult = alignDiffLines(linesA, linesB);
  currentDiffResult = { objA, objB, ...diffResult };

  // Render Aligned Diff Highlights & Line Numbers
  renderSideBySideDiff(diffResult);

  // Update Badges & Step Counter
  const isIdentical = textA.trim() !== '' && textB.trim() !== '' && diffResult.addedCount === 0 && diffResult.removedCount === 0 && diffResult.changedCount === 0;
  updateBadges(diffResult.addedCount, diffResult.removedCount, diffResult.changedCount, isIdentical, false);

  const allMatches = getAllDiffMatches();
  globalDiffIndex = -1;
  jumpIndices = { added: -1, removed: -1, changed: -1 };
  updateStepCounter(0, allMatches.length);

  if (currentViewMode === 'list') {
    renderChangesList();
  }
}

// ALIGN LINE-BY-LINE MYERS / LCS DIFF ALGORITHM
function alignDiffLines(linesA, linesB) {
  const n = linesA.length;
  const m = linesB.length;

  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (linesA[i].trim() === linesB[j].trim()) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const resultA = [];
  const resultB = [];
  let i = 0, j = 0;

  let addedCount = 0;
  let removedCount = 0;
  let changedCount = 0;

  while (i < n && j < m) {
    if (linesA[i].trim() === linesB[j].trim()) {
      resultA.push({ type: 'equal', text: linesA[i] });
      resultB.push({ type: 'equal', text: linesB[j] });
      i++;
      j++;
    } else {
      const keyA = extractJsonKey(linesA[i]);
      const keyB = extractJsonKey(linesB[j]);

      if (keyA && keyB && keyA === keyB) {
        resultA.push({ type: 'changed', text: linesA[i] });
        resultB.push({ type: 'changed', text: linesB[j] });
        changedCount++;
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        resultA.push({ type: 'removed', text: linesA[i] });
        resultB.push({ type: 'gap', text: '' });
        removedCount++;
        i++;
      } else {
        resultA.push({ type: 'gap', text: '' });
        resultB.push({ type: 'added', text: linesB[j] });
        addedCount++;
        j++;
      }
    }
  }

  while (i < n) {
    resultA.push({ type: 'removed', text: linesA[i] });
    resultB.push({ type: 'gap', text: '' });
    removedCount++;
    i++;
  }

  while (j < m) {
    resultA.push({ type: 'gap', text: '' });
    resultB.push({ type: 'added', text: linesB[j] });
    addedCount++;
    j++;
  }

  return { resultA, resultB, addedCount, removedCount, changedCount };
}

function extractJsonKey(line) {
  const match = line.match(/"([^"]+)"\s*:/);
  return match ? match[1] : null;
}

// RENDER SIDE-BY-SIDE ALIGNED DIFF PANES
function renderSideBySideDiff({ resultA, resultB }) {
  let htmlA = '';
  let htmlB = '';
  let lineNumA = 1;
  let lineNumB = 1;

  let numsHTMLA = '';
  let numsHTMLB = '';

  const totalLines = Math.max(resultA.length, resultB.length);

  for (let idx = 0; idx < totalLines; idx++) {
    const itemA = resultA[idx] || { type: 'gap', text: '' };
    const itemB = resultB[idx] || { type: 'gap', text: '' };

    // Left Pane Line
    if (itemA.type === 'gap') {
      htmlA += `<span class="inline-block w-full min-h-[24px] diff-line-gap">&nbsp;</span>\n`;
      numsHTMLA += `<span class="text-slate-300 dark:text-slate-700">-</span><br>`;
    } else {
      let cls = '';
      if (itemA.type === 'removed') cls = 'diff-line-removed';
      else if (itemA.type === 'changed') cls = 'diff-line-changed';
      const highlighted = syntaxHighlight(itemA.text);
      htmlA += `<span class="inline-block w-full px-1 rounded ${cls}">${highlighted || ' '}</span>\n`;
      numsHTMLA += `${lineNumA++}<br>`;
    }

    // Right Pane Line
    if (itemB.type === 'gap') {
      htmlB += `<span class="inline-block w-full min-h-[24px] diff-line-gap">&nbsp;</span>\n`;
      numsHTMLB += `<span class="text-slate-300 dark:text-slate-700">-</span><br>`;
    } else {
      let cls = '';
      if (itemB.type === 'added') cls = 'diff-line-added';
      else if (itemB.type === 'changed') cls = 'diff-line-changed';
      const highlighted = syntaxHighlight(itemB.text);
      htmlB += `<span class="inline-block w-full px-1 rounded ${cls}">${highlighted || ' '}</span>\n`;
      numsHTMLB += `${lineNumB++}<br>`;
    }
  }

  highlightA.innerHTML = htmlA;
  highlightB.innerHTML = htmlB;
  lineNumsA.innerHTML = numsHTMLA;
  lineNumsB.innerHTML = numsHTMLB;
}

// RENDER DETAILED CHANGES LIST
function renderChangesList() {
  if (!currentDiffResult) {
    changesListContent.innerHTML = '<div class="text-slate-400 p-4 text-center">No comparison data available</div>';
    return;
  }

  const { addedCount, removedCount, changedCount, resultA, resultB } = currentDiffResult;
  const total = addedCount + removedCount + changedCount;
  changesSummaryText.textContent = `${total} total difference${total === 1 ? '' : 's'} detected`;

  if (total === 0) {
    changesListContent.innerHTML = `
      <div class="flex flex-col items-center justify-center p-8 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-center">
        <i data-lucide="check-circle-2" class="w-8 h-8 text-emerald-500 mb-2"></i>
        <div class="font-bold text-emerald-800 dark:text-emerald-300 text-sm">JSON Documents are Identical!</div>
        <div class="text-xs text-emerald-600 dark:text-emerald-400 mt-1">No structural or value differences found between Left and Right JSON.</div>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  let html = '';

  for (let idx = 0; idx < resultA.length; idx++) {
    const itemA = resultA[idx];
    const itemB = resultB[idx];

    if (itemA.type === 'changed' || itemB.type === 'changed') {
      html += `
        <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 flex items-start gap-2.5">
          <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 shrink-0 mt-0.5">~ MODIFIED</span>
          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row gap-2 mt-1 text-[11px]">
              <div class="flex-1 bg-rose-100/60 dark:bg-rose-950/60 p-2 rounded border border-rose-200 dark:border-rose-900/40">
                <span class="text-[10px] font-bold text-rose-700 dark:text-rose-400 block mb-0.5">OLD (JSON A):</span>
                <code class="text-rose-800 dark:text-rose-300 font-mono">${itemA.text.trim()}</code>
              </div>
              <div class="flex-1 bg-emerald-100/60 dark:bg-emerald-950/60 p-2 rounded border border-emerald-200 dark:border-emerald-900/40">
                <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">NEW (JSON B):</span>
                <code class="text-emerald-800 dark:text-emerald-300 font-mono">${itemB.text.trim()}</code>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (itemA.type === 'removed') {
      html += `
        <div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 flex items-start gap-2.5">
          <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 shrink-0 mt-0.5">- REMOVED</span>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-rose-900 dark:text-rose-200 font-mono line-through">${itemA.text.trim()}</div>
          </div>
        </div>
      `;
    } else if (itemB.type === 'added') {
      html += `
        <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-2.5">
          <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 shrink-0 mt-0.5">+ ADDED</span>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-emerald-900 dark:text-emerald-200 font-mono">${itemB.text.trim()}</div>
          </div>
        </div>
      `;
    }
  }

  changesListContent.innerHTML = html;
  lucide.createIcons();
}

// SYNTAX HIGHLIGHTER
function syntaxHighlight(jsonStr) {
  if (!jsonStr) return '';
  const safeStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safeStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (match.startsWith('"')) {
      if (match.endsWith(':')) cls = 'json-key';
      else cls = 'json-string';
    } else if (match === 'true' || match === 'false') cls = 'json-boolean';
    else if (match === 'null') cls = 'json-null';
    return `<span class="${cls}">${match}</span>`;
  });
}

// RELAXED JS/JSON PARSER
function parseLooseJSON(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  try { return JSON.parse(trimmed); } catch (e) {}
  try {
    const sanitized = trimmed.replace(/:\s*undefined\b/g, ': null').replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(sanitized);
  } catch (e) {}
  try {
    const fn = new Function(`"use strict"; return (${trimmed});`);
    const res = fn();
    if (res !== undefined) return res;
  } catch (e) {}
  throw new SyntaxError('Invalid JSON format');
}

// STATS & LINE NUMBERS UPDATES
function updateStats() {
  const bytesA = new Blob([jsonInputA.value]).size;
  const bytesB = new Blob([jsonInputB.value]).size;

  statsA.textContent = bytesA < 1024 ? `(${bytesA} B)` : `(${(bytesA / 1024).toFixed(2)} KB)`;
  statsB.textContent = bytesB < 1024 ? `(${bytesB} B)` : `(${(bytesB / 1024).toFixed(2)} KB)`;
}

function updateLineNums(container, count) {
  let nums = '';
  for (let i = 1; i <= count; i++) {
    nums += `${i}<br>`;
  }
  container.innerHTML = nums;
}

function updateBadges(added, removed, changed, isIdentical, isError) {
  if (isError) {
    addedGroup.className = 'hidden';
    removedGroup.className = 'hidden';
    changedGroup.className = 'hidden';
    identicalBadge.className = 'flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-100 dark:bg-rose-950/90 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30';
    identicalBadge.querySelector('span').textContent = '✕ Syntax Error';
    return;
  }

  if (isIdentical) {
    addedGroup.className = 'hidden';
    removedGroup.className = 'hidden';
    changedGroup.className = 'hidden';
    identicalBadge.className = 'flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30';
    identicalBadge.querySelector('span').textContent = '✓ 100% Identical Documents';
    return;
  }

  identicalBadge.className = 'hidden';

  addedGroup.className = added > 0 ? 'flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30' : 'hidden';
  addedCount.textContent = `+ ${added} Added`;

  removedGroup.className = removed > 0 ? 'flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-100 dark:bg-rose-950/90 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30' : 'hidden';
  removedCount.textContent = `- ${removed} Removed`;

  changedGroup.className = changed > 0 ? 'flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-950/90 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30' : 'hidden';
  changedCount.textContent = `~ ${changed} Modified`;
}

// TOAST NOTIFICATION SYSTEM
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');

  let bgBorder = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
  let icon = 'info';

  if (type === 'success') {
    bgBorder = 'bg-emerald-50 dark:bg-emerald-950/95 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200';
    icon = 'check-circle-2';
  } else if (type === 'error') {
    bgBorder = 'bg-rose-50 dark:bg-rose-950/95 border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-200';
    icon = 'alert-triangle';
  }

  toast.className = `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium shadow-xl backdrop-blur-md animate-toast pointer-events-auto ${bgBorder}`;
  toast.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i><span>${message}</span>`;

  toastContainer.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s ease-out';
    setTimeout(() => toast.remove(), 200);
  }, 2500);
}
