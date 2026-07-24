// PRESET SAMPLES
const PRESETS = {
  keyvalue: `name: Somchai Jaidee\nage: 29\nis_developer: true\nskills: JavaScript, Python, HTML\ncity: Bangkok\nsalary: 45000\nproject_completed: null`,
  csv: `id,name,role,department,active\n101,Alice Smith,Frontend Lead,Engineering,true\n102,Bob Johnson,UI Designer,Design,true\n103,Charlie Brown,QA Analyst,Quality,false`,
  lines: `Apple iPhone 15 Pro\nSamsung Galaxy S24 Ultra\nGoogle Pixel 8 Pro\nMacBook Pro M3\niPad Air 5`,
  stringified: `{\\"event\\": \\"user_signup\\", \\"user_id\\": 98412, \\"metadata\\": {\\"source\\": \\"facebook_ads\\", \\"campaign\\": \\"summer_sale\\"}, \\"timestamp\\": 1721838000}`,
  log: `[INFO] 2026-07-24 16:20:00 - User user_88 logged in from IP 192.168.1.50 status=success duration=12ms`,
  json: `{\n  "name": "Somchai Jaidee",\n  "age": 29,\n  "is_developer": true,\n  "skills": [\n    "JavaScript",\n    "Python",\n    "HTML"\n  ],\n  "city": "Bangkok",\n  "salary": 45000,\n  "project_completed": null\n}`
};

// DOM ELEMENTS
const textInput = document.getElementById('textInput');
const jsonOutput = document.getElementById('jsonOutput');
const jsonEditor = document.getElementById('jsonEditor');
const jsonEditorWrapper = document.getElementById('jsonEditorWrapper');
const inputTextLineNums = document.getElementById('inputTextLineNums');
const jsonLineNums = document.getElementById('jsonLineNums');
const modeSelect = document.getElementById('modeSelect');
const presetSelect = document.getElementById('presetSelect');
const statusBadge = document.getElementById('statusBadge');
const statusBadgeText = document.getElementById('statusBadgeText');
const errorAlert = document.getElementById('errorAlert');
const errorMessage = document.getElementById('errorMessage');
const textCharStats = document.getElementById('textCharStats');
const detectedFormatBadge = document.getElementById('detectedFormatBadge');
const jsonStats = document.getElementById('jsonStats');
const convertTime = document.getElementById('convertTime');
const prettifyBtn = document.getElementById('prettifyBtn');
const minifyBtn = document.getElementById('minifyBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const swapBtn = document.getElementById('swapBtn');
const pasteTextBtn = document.getElementById('pasteTextBtn');
const autoTypeCast = document.getElementById('autoTypeCast');
const skipEmpty = document.getElementById('skipEmpty');
const codeViewBtn = document.getElementById('codeViewBtn');
const treeViewBtn = document.getElementById('treeViewBtn');
const codeViewContainer = document.getElementById('codeViewContainer');
const treeViewContainer = document.getElementById('treeViewContainer');
const treeViewContent = document.getElementById('treeViewContent');

const toggleEditModeBtn = document.getElementById('toggleEditModeBtn');
const editModeLabel = document.getElementById('editModeLabel');

const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeSunIcon = document.getElementById('themeSunIcon');
const themeMoonIcon = document.getElementById('themeMoonIcon');

let currentParsedData = null;
let isMinified = false;
let activeView = 'code'; // 'code' or 'tree'
let isEditMode = false;  // Right pane edit mode toggle

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  updateThemeIcons();
  textInput.value = PRESETS.keyvalue;
  updateInputStatsAndLines();
  convertTextToJSON();
});

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

// EDIT MODE TOGGLE
if (toggleEditModeBtn) {
  toggleEditModeBtn.addEventListener('click', () => {
    isEditMode = !isEditMode;
    updateEditModeUI();
  });
}

function updateEditModeUI() {
  if (!jsonEditor || !toggleEditModeBtn || !editModeLabel) return;

  if (isEditMode) {
    toggleEditModeBtn.className = 'flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-indigo-400 dark:border-cyan-500/50 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-neonCyan shadow-sm transition active:scale-95';
    editModeLabel.textContent = 'Editing Active';
    jsonEditor.readOnly = false;
    jsonEditor.focus();
    showToast('JSON Edit Mode Enabled (Syncing to Left Text)', 'info');
  } else {
    toggleEditModeBtn.className = 'flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition active:scale-95';
    editModeLabel.textContent = 'Edit JSON';
    jsonEditor.readOnly = true;
    showToast('JSON Edit Mode Disabled', 'info');
  }
}

// EVENT LISTENERS (LEFT PANE)
textInput.addEventListener('focus', () => {
  if (isEditMode) {
    isEditMode = false;
    updateEditModeUI();
  }
});

textInput.addEventListener('input', () => {
  updateInputStatsAndLines();
  convertTextToJSON();
});

textInput.addEventListener('scroll', () => {
  inputTextLineNums.scrollTop = textInput.scrollTop;
});

// EVENT LISTENERS (RIGHT PANE - JSON EDITOR)
if (jsonEditor) {
  jsonEditor.addEventListener('focus', () => {
    if (!isEditMode) {
      isEditMode = true;
      updateEditModeUI();
    }
  });

  jsonEditor.addEventListener('scroll', () => {
    jsonOutput.scrollTop = jsonEditor.scrollTop;
    jsonOutput.scrollLeft = jsonEditor.scrollLeft;
    jsonLineNums.scrollTop = jsonEditor.scrollTop;
  });

  jsonEditor.addEventListener('input', () => {
    if (!isEditMode) {
      isEditMode = true;
      updateEditModeUI();
    }
    handleJSONEditorInput();
  });
}

if (jsonEditorWrapper) {
  jsonEditorWrapper.addEventListener('click', () => {
    if (!isEditMode) {
      isEditMode = true;
      updateEditModeUI();
    }
  });
}

modeSelect.addEventListener('change', () => {
  if (isEditMode && currentParsedData !== null) {
    syncRightToLeft(currentParsedData, modeSelect.value);
  } else {
    convertTextToJSON();
  }
});

const resetModeBtn = document.getElementById('resetModeBtn');
if (resetModeBtn) {
  resetModeBtn.addEventListener('click', () => {
    modeSelect.value = 'auto';
    convertTextToJSON();
    showToast('Reset mode to Auto Smart Detect', 'info');
  });
}

autoTypeCast.addEventListener('change', () => convertTextToJSON());
skipEmpty.addEventListener('change', () => convertTextToJSON());

presetSelect.addEventListener('change', (e) => {
  const selected = e.target.value;
  if (PRESETS[selected]) {
    textInput.value = PRESETS[selected];
    if (selected === 'csv') modeSelect.value = 'csv';
    else if (selected === 'lines') modeSelect.value = 'lines';
    else if (selected === 'stringified') modeSelect.value = 'auto';
    else if (selected === 'keyvalue') modeSelect.value = 'kv';
    else if (selected === 'json') modeSelect.value = 'json';
    else modeSelect.value = 'auto';

    if (isEditMode) {
      isEditMode = false;
      updateEditModeUI();
    }

    updateInputStatsAndLines();
    convertTextToJSON();
    showToast(`Loaded ${e.target.options[e.target.selectedIndex].text}`, 'info');
  }
});

prettifyBtn.addEventListener('click', () => {
  isMinified = false;
  renderJSONOutput();
  showToast('JSON Formatted (2 spaces)', 'success');
});

minifyBtn.addEventListener('click', () => {
  isMinified = true;
  renderJSONOutput();
  showToast('JSON Minified', 'success');
});

copyBtn.addEventListener('click', () => {
  const rawText = jsonEditor ? jsonEditor.value : JSON.stringify(currentParsedData, null, 2);
  if (!rawText) return;
  navigator.clipboard.writeText(rawText).then(() => {
    showToast('Copied JSON to clipboard!', 'success');
  }).catch(() => {
    showToast('Failed to copy', 'error');
  });
});

downloadBtn.addEventListener('click', () => {
  const rawText = jsonEditor ? jsonEditor.value : JSON.stringify(currentParsedData, null, 2);
  if (!rawText.trim()) {
    showToast('Nothing to download', 'error');
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(rawText);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `data_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Downloaded JSON file', 'success');
});

clearBtn.addEventListener('click', () => {
  textInput.value = '';
  if (jsonEditor) jsonEditor.value = '';
  jsonOutput.innerHTML = '';
  if (detectedFormatBadge) detectedFormatBadge.classList.add('hidden');
  updateInputStatsAndLines();
  convertTextToJSON();
  showToast('Cleared input text', 'info');
});

swapBtn.addEventListener('click', () => {
  const jsonText = jsonEditor ? jsonEditor.value : JSON.stringify(currentParsedData, null, 2);
  if (jsonText.trim()) {
    textInput.value = jsonText;
    if (isEditMode) {
      isEditMode = false;
      updateEditModeUI();
    }
    updateInputStatsAndLines();
    convertTextToJSON();
    showToast('Swapped JSON into Text Input', 'info');
  }
});

pasteTextBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      textInput.value = text;
      updateInputStatsAndLines();
      convertTextToJSON();
      showToast('Pasted from clipboard', 'success');
    }
  } catch (err) {
    showToast('Cannot access clipboard. Please press Ctrl+V', 'error');
  }
});

codeViewBtn.addEventListener('click', () => {
  activeView = 'code';
  codeViewBtn.className = 'px-2 py-0.5 text-[11px] font-medium rounded-md text-indigo-600 dark:text-neonCyan bg-slate-100 dark:bg-slate-850 shadow-sm transition';
  treeViewBtn.className = 'px-2 py-0.5 text-[11px] font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition';
  codeViewContainer.classList.remove('hidden');
  treeViewContainer.classList.add('hidden');
});

treeViewBtn.addEventListener('click', () => {
  activeView = 'tree';
  treeViewBtn.className = 'px-2 py-0.5 text-[11px] font-medium rounded-md text-indigo-600 dark:text-neonCyan bg-slate-100 dark:bg-slate-850 shadow-sm transition';
  codeViewBtn.className = 'px-2 py-0.5 text-[11px] font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition';
  treeViewContainer.classList.remove('hidden');
  codeViewContainer.classList.add('hidden');
  renderTreeView();
});

// CORE TEXT TO JSON CONVERSION ENGINE (LEFT -> RIGHT)
function convertTextToJSON() {
  const startTime = performance.now();
  const rawText = textInput.value;
  const mode = modeSelect.value;
  const shouldCast = autoTypeCast.checked;
  const shouldSkipEmpty = skipEmpty.checked;

  hideError();
  currentParsedData = null;

  if (!rawText.trim()) {
    currentParsedData = {};
    renderJSONOutput();
    updateStatus(true, 'Empty Input');
    if (detectedFormatBadge) detectedFormatBadge.classList.add('hidden');
    setConvertTime(0);
    return;
  }

  try {
    let result = null;
    let detectedName = '';

    if (mode === 'auto') {
      const detectRes = autoDetectConvert(rawText, shouldCast, shouldSkipEmpty);
      result = detectRes.data;
      detectedName = detectRes.detectedType;
    } else if (mode === 'json') {
      result = parseLooseJSON(rawText);
      detectedName = 'Raw JSON';
    } else if (mode === 'kv') {
      result = parseKeyValueText(rawText, shouldCast, shouldSkipEmpty);
      detectedName = 'Key-Value';
    } else if (mode === 'lines') {
      result = parseLineArray(rawText, shouldCast, shouldSkipEmpty);
      detectedName = 'Line Array';
    } else if (mode === 'csv') {
      result = parseCSVText(rawText, shouldCast);
      detectedName = 'CSV Table';
    } else if (mode === 'escape') {
      result = rawText; // Will be JSON stringified
      detectedName = 'String Escape';
    }

    if (detectedFormatBadge) {
      detectedFormatBadge.textContent = mode === 'auto' ? `Auto: ${detectedName}` : `Mode: ${detectedName}`;
      detectedFormatBadge.classList.remove('hidden');
    }

    currentParsedData = result;
    updateStatus(true, `Valid JSON (${detectedName})`);
    renderJSONOutput();
  } catch (err) {
    showError(err.message || 'Failed to parse text into JSON');
    updateStatus(false, 'Parse Error');
    if (detectedFormatBadge) detectedFormatBadge.classList.add('hidden');
    currentParsedData = { error: err.message || 'Parse Error', raw_text: rawText };
    renderJSONOutput();
  }

  const duration = (performance.now() - startTime).toFixed(1);
  setConvertTime(duration);
}

// HANDLE DIRECT EDITING IN RIGHT PANE (RIGHT -> LEFT REVERSE SYNC TO PLAIN TEXT)
function handleJSONEditorInput() {
  const startTime = performance.now();
  const rawJSON = jsonEditor.value;

  // Sync Scroll Positions
  jsonOutput.scrollTop = jsonEditor.scrollTop;
  jsonOutput.scrollLeft = jsonEditor.scrollLeft;
  jsonLineNums.scrollTop = jsonEditor.scrollTop;

  // Update Stats & Line Numbers
  const lines = rawJSON.split('\n');
  updateJSONLineNums(lines.length);
  updateOutputByteStats(new Blob([rawJSON]).size);

  if (!rawJSON.trim()) {
    jsonOutput.innerHTML = '';
    currentParsedData = {};
    textInput.value = '';
    updateInputStatsAndLines();
    updateStatus(true, 'Empty JSON');
    hideError();
    setConvertTime(0);
    return;
  }

  // Live Syntax Highlight Layer
  jsonOutput.innerHTML = syntaxHighlightJSON(rawJSON);

  // Validate & Reverse Sync to Left Pane Text
  try {
    const parsed = parseLooseJSON(rawJSON);
    currentParsedData = parsed;
    updateStatus(true, 'Valid JSON');
    hideError();

    // Reverse Sync back to Left Pane (formatted as Plain Text / Key-Value / CSV)
    syncRightToLeft(parsed, modeSelect.value);

    if (activeView === 'tree') {
      renderTreeView();
    }
  } catch (err) {
    updateStatus(false, 'Parse Error');
    showError(err.message || 'Invalid JSON syntax');
  }

  const duration = (performance.now() - startTime).toFixed(1);
  setConvertTime(duration);
}

// SYNC RIGHT PANE JSON BACK TO LEFT PANE PLAIN TEXT
function syncRightToLeft(data, mode) {
  if (data === null || data === undefined) return;

  if (mode === 'lines' && Array.isArray(data)) {
    // Format JSON array back to line-by-line text list
    textInput.value = data.map(item => (typeof item === 'object' ? JSON.stringify(item) : String(item))).join('\n');
  } else if (mode === 'csv' && Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    // Format JSON array of objects back to CSV headers & rows
    const keys = Object.keys(data[0]);
    const lines = [keys.join(',')];
    data.forEach(row => {
      const vals = keys.map(k => {
        const val = row[k] !== undefined ? row[k] : '';
        return String(val).includes(',') ? `"${val}"` : String(val);
      });
      lines.push(vals.join(','));
    });
    textInput.value = lines.join('\n');
  } else if (mode === 'escape' && typeof data === 'string') {
    textInput.value = data;
  } else if (mode === 'json') {
    // Direct raw JSON formatting back to Left Pane
    textInput.value = JSON.stringify(data, null, 2);
  } else if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    // Format JSON object back to Key-Value plain text lines (name: Somchai)
    textInput.value = jsonToKeyValue(data);
  } else if (Array.isArray(data) && data.every(item => typeof item !== 'object')) {
    // Array of primitives -> line by line
    textInput.value = data.map(item => (item === null ? 'null' : String(item))).join('\n');
  } else {
    // Fallback if data is raw primitive or non-standard structure
    textInput.value = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
  }

  updateInputStatsAndLines();
}

// HELPER: CONVERT JSON OBJECT TO KEY-VALUE PLAIN TEXT LINES
function jsonToKeyValue(data) {
  const lines = [];
  for (const [k, v] of Object.entries(data)) {
    if (k === '_unstructured' && Array.isArray(v)) {
      v.forEach(line => lines.push(String(line)));
    } else if (Array.isArray(v)) {
      const formattedArray = v.map(item => (item === null ? 'null' : String(item))).join(', ');
      lines.push(`${k}: ${formattedArray}`);
    } else if (v === null || v === undefined) {
      lines.push(`${k}: null`);
    } else {
      lines.push(`${k}: ${v}`);
    }
  }
  return lines.join('\n');
}

// RELAXED JS / JSON PARSER (HANDLES undefined, UNQUOTED KEYS, SINGLE QUOTES & TRAILING COMMAS)
function parseLooseJSON(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();

  // 1. Standard JSON.parse
  try {
    return JSON.parse(trimmed);
  } catch (e) {}

  // 2. Pre-sanitize undefined -> null & trailing commas
  try {
    const sanitized = trimmed
      .replace(/:\s*undefined\b/g, ': null')
      .replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(sanitized);
  } catch (e) {}

  // 3. Relaxed JS Object Evaluation via Function
  try {
    const fn = new Function(`"use strict"; return (${trimmed});`);
    const result = fn();
    if (result !== undefined) return result;
  } catch (e) {}

  throw new SyntaxError('Unexpected token or invalid JSON format');
}

// AUTO DETECT CONVERSION LOGIC WITH DETECTED TYPE RETURN
function autoDetectConvert(text, shouldCast, shouldSkipEmpty) {
  const trimmed = text.trim();

  // 1. Try standard or relaxed JSON parse
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      const data = parseLooseJSON(trimmed);
      return { data, detectedType: 'Raw JSON' };
    } catch (e) {}
  }

  // 2. Try unescaping JSON string (e.g. "{\"a\": 1}")
  if (trimmed.includes('\\"') || trimmed.includes('\\n')) {
    try {
      const unescaped = trimmed.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      if (unescaped.startsWith('{') || unescaped.startsWith('[')) {
        const data = parseLooseJSON(unescaped);
        return { data, detectedType: 'Stringified JSON' };
      }
    } catch (e) {}
  }

  // 3. Check if CSV (has header row and comma/tab delimiters in line 1)
  const lines = trimmed.split(/\r?\n/).filter(l => shouldSkipEmpty ? l.trim() !== '' : true);
  if (lines.length > 1 && (lines[0].includes(',') || lines[0].includes('\t'))) {
    try {
      const csvResult = parseCSVText(text, shouldCast);
      if (Array.isArray(csvResult) && csvResult.length > 0 && typeof csvResult[0] === 'object') {
        return { data: csvResult, detectedType: 'CSV Table' };
      }
    } catch (e) {}
  }

  // 4. Check if Key-Value pairs (lines with : or =)
  let kvMatches = 0;
  lines.forEach(line => {
    if (/^[\w\-\s.]+[:=->]\s*/.test(line.trim())) kvMatches++;
  });

  if (kvMatches >= Math.max(1, Math.floor(lines.length * 0.4))) {
    return { data: parseKeyValueText(text, shouldCast, shouldSkipEmpty), detectedType: 'Key-Value' };
  }

  // 5. Fallback: Array of lines or raw string
  if (lines.length > 1) {
    return { data: parseLineArray(text, shouldCast, shouldSkipEmpty), detectedType: 'Line Array' };
  }

  // Default cast single string or return literal
  return { data: shouldCast ? autoCastValue(trimmed) : trimmed, detectedType: 'Text Literal' };
}

// KEY-VALUE PARSER
function parseKeyValueText(text, shouldCast, shouldSkipEmpty) {
  const lines = text.split(/\r?\n/);
  const result = {};

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed && shouldSkipEmpty) return;
    if (!trimmed) return;

    // Match key: value or key = value or key -> value
    const delimiterMatch = trimmed.match(/^([^:=->]+)[:=->]\s*(.*)$/);

    if (delimiterMatch) {
      const key = delimiterMatch[1].trim();
      let rawVal = delimiterMatch[2].trim();

      // Handle array values like "a, b, c"
      let val = rawVal;
      if (rawVal.includes(',') && !rawVal.startsWith('[') && !rawVal.startsWith('{')) {
        val = rawVal.split(',').map(s => s.trim()).filter(Boolean);
        if (shouldCast) val = val.map(autoCastValue);
      } else if (shouldCast) {
        val = autoCastValue(rawVal);
      }

      result[key] = val;
    } else {
      // Lines without delimiter placed in a "_raw_lines" or unmapped key
      if (!result._unstructured) result._unstructured = [];
      result._unstructured.push(shouldCast ? autoCastValue(trimmed) : trimmed);
    }
  });

  return result;
}

// LINE ARRAY PARSER
function parseLineArray(text, shouldCast, shouldSkipEmpty) {
  const lines = text.split(/\r?\n/);
  const arr = [];
  lines.forEach(line => {
    const item = line.trim();
    if (!item && shouldSkipEmpty) return;
    arr.push(shouldCast ? autoCastValue(item) : item);
  });
  return arr;
}

// CSV / DELIMITED PARSER
function parseCSVText(text, shouldCast) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^["']|["']$/g, ''));

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delimiter).map(c => c.trim().replace(/^["']|["']$/g, ''));
    const rowObj = {};
    headers.forEach((h, idx) => {
      const raw = cols[idx] !== undefined ? cols[idx] : '';
      rowObj[h] = shouldCast ? autoCastValue(raw) : raw;
    });
    rows.push(rowObj);
  }
  return rows;
}

// AUTO TYPE CAST HELPER
function autoCastValue(val) {
  if (typeof val !== 'string') return val;
  const lower = val.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  if (lower === 'null' || lower === 'nil' || lower === 'none') return null;
  if (lower === 'undefined') return undefined;

  // Numeric check
  if (/^-?\d+(\.\d+)?$/.test(val) && Math.abs(Number(val)) < Number.MAX_SAFE_INTEGER) {
    return Number(val);
  }

  // Strip outer quotes if string wrapped
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }

  return val;
}

// RENDER JSON OUTPUT & SYNTAX HIGHLIGHTING
function renderJSONOutput() {
  if (currentParsedData === null) {
    jsonOutput.innerHTML = '';
    if (jsonEditor && !isEditMode) jsonEditor.value = '';
    updateJSONLineNums(1);
    updateOutputByteStats(0);
    return;
  }

  const jsonStr = isMinified ? JSON.stringify(currentParsedData) : JSON.stringify(currentParsedData, null, 2);
  
  if (jsonEditor && !isEditMode) {
    jsonEditor.value = jsonStr;
  }
  
  updateOutputByteStats(new Blob([jsonStr]).size);

  // Syntax highlight
  const highlightedHTML = syntaxHighlightJSON(jsonStr);
  jsonOutput.innerHTML = highlightedHTML;

  // Update Output Line Numbers
  const lineCount = jsonStr.split('\n').length;
  updateJSONLineNums(lineCount);

  if (activeView === 'tree') {
    renderTreeView();
  }
}

// SYNTAX HIGHLIGHTER
function syntaxHighlightJSON(jsonString) {
  if (!jsonString) return '';
  
  // Escape HTML entities first
  const safeStr = jsonString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return safeStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\.|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-boolean';
    } else if (/null/.test(match)) {
      cls = 'json-null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

// INTERACTIVE COLLAPSIBLE & EDITABLE TREE VIEW
function renderTreeView() {
  treeViewContent.innerHTML = '';
  if (currentParsedData === null) return;
  treeViewContent.appendChild(buildTreeNode('root', currentParsedData, true, []));
  lucide.createIcons();
}

function buildTreeNode(key, value, isLast = true, path = []) {
  const container = document.createElement('div');
  container.className = 'font-mono text-xs leading-6 my-0.5';

  const type = Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value);

  if (type === 'object' || type === 'array') {
    const isArray = type === 'array';
    const keys = isArray ? value : Object.keys(value);
    const count = isArray ? value.length : keys.length;
    const openChar = isArray ? '[' : '{';
    const closeChar = isArray ? ']' : '}';

    const header = document.createElement('div');
    header.className = 'flex items-center gap-1 hover:bg-slate-200/60 dark:hover:bg-slate-900/60 rounded px-1 -ml-1 transition group';

    const toggleBtn = document.createElement('span');
    toggleBtn.className = 'tree-toggle text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-neonCyan';
    toggleBtn.innerHTML = `<i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>`;

    const keySpan = document.createElement('span');
    keySpan.className = 'json-key font-semibold select-none';
    keySpan.title = 'Key is locked (Read-only)';
    keySpan.textContent = key === 'root' ? '' : `"${key}": `;

    const metaSpan = document.createElement('span');
    metaSpan.className = 'text-slate-500 text-[11px] font-sans';
    metaSpan.textContent = `${openChar} ${count} ${isArray ? 'items' : 'keys'} ${closeChar}`;

    header.appendChild(toggleBtn);
    if (key !== 'root') header.appendChild(keySpan);
    header.appendChild(metaSpan);

    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'tree-node border-l border-slate-300 dark:border-slate-800/80 pl-3 ml-2 mt-0.5';

    if (isArray) {
      value.forEach((item, idx) => {
        childrenContainer.appendChild(buildTreeNode(idx, item, idx === value.length - 1, [...path, idx]));
      });
    } else {
      const entries = Object.entries(value);
      entries.forEach(([k, v], idx) => {
        childrenContainer.appendChild(buildTreeNode(k, v, idx === entries.length - 1, [...path, k]));
      });
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = childrenContainer.classList.contains('hidden');
      if (isCollapsed) {
        childrenContainer.classList.remove('hidden');
        toggleBtn.classList.remove('collapsed');
      } else {
        childrenContainer.classList.add('hidden');
        toggleBtn.classList.add('collapsed');
      }
    });

    container.appendChild(header);
    container.appendChild(childrenContainer);
  } else {
    // Primitive values (Editable Value, Locked Key)
    const row = document.createElement('div');
    row.className = 'flex items-center gap-1.5 pl-5 hover:bg-slate-200/40 dark:hover:bg-slate-900/40 rounded px-1 transition';

    const keySpan = document.createElement('span');
    keySpan.className = 'json-key select-none';
    keySpan.title = 'Key is locked (Read-only)';
    keySpan.textContent = key === 'root' ? '' : `"${key}": `;

    // Editable Value Element
    const valSpan = document.createElement('span');
    valSpan.setAttribute('contenteditable', 'true');
    valSpan.setAttribute('spellcheck', 'false');
    valSpan.title = 'Click to edit value (Key is locked)';

    let baseClass = 'hover:bg-slate-200/80 dark:hover:bg-slate-800/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 cursor-text transition-all font-semibold ';

    if (type === 'string') {
      valSpan.className = baseClass + 'json-string';
      valSpan.textContent = `"${value}"`;
    } else if (type === 'number') {
      valSpan.className = baseClass + 'json-number';
      valSpan.textContent = value;
    } else if (type === 'boolean') {
      valSpan.className = baseClass + 'json-boolean';
      valSpan.textContent = value;
    } else {
      valSpan.className = baseClass + 'json-null';
      valSpan.textContent = 'null';
    }

    // Save tree value edit event
    const saveTreeValueEdit = () => {
      let rawText = valSpan.textContent.trim();
      // Strip outer quotes if string
      if (type === 'string' && rawText.startsWith('"') && rawText.endsWith('"')) {
        rawText = rawText.slice(1, -1);
      }

      const newValue = autoCastValue(rawText);

      // Update data object at path
      updateDataAtPath(currentParsedData, path, newValue);

      // Update JSON Code View & Editor
      const jsonStr = isMinified ? JSON.stringify(currentParsedData) : JSON.stringify(currentParsedData, null, 2);
      if (jsonEditor) jsonEditor.value = jsonStr;
      jsonOutput.innerHTML = syntaxHighlightJSON(jsonStr);

      // Update Line Numbers & Stats
      updateStatus(true, 'Valid JSON');
      hideError();
      updateOutputByteStats(new Blob([jsonStr]).size);
      updateJSONLineNums(jsonStr.split('\n').length);

      // Reverse Sync back to Left Pane Text
      syncRightToLeft(currentParsedData, modeSelect.value);
    };

    valSpan.addEventListener('blur', saveTreeValueEdit);
    valSpan.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        valSpan.blur();
      }
    });

    row.appendChild(keySpan);
    row.appendChild(valSpan);
    if (!isLast) {
      const comma = document.createElement('span');
      comma.className = 'json-punct select-none';
      comma.textContent = ',';
      row.appendChild(comma);
    }

    container.appendChild(row);
  }

  return container;
}

// HELPER: MUTATE OBJECT AT SPECIFIC PATH
function updateDataAtPath(obj, path, newValue) {
  if (!obj || !path || path.length === 0) return;
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = newValue;
}

// STATS & LINE NUMBERS UPDATES
function updateInputStatsAndLines() {
  const text = textInput.value;
  const lines = text.split('\n');
  const charCount = text.length;
  const lineCount = lines.length;

  textCharStats.textContent = `(${charCount.toLocaleString()} chars, ${lineCount.toLocaleString()} lines)`;

  // Update Input Line numbers
  let numsHTML = '';
  for (let i = 1; i <= lineCount; i++) {
    numsHTML += `${i}<br>`;
  }
  inputTextLineNums.innerHTML = numsHTML;
}

function updateJSONLineNums(count) {
  let numsHTML = '';
  for (let i = 1; i <= count; i++) {
    numsHTML += `${i}<br>`;
  }
  jsonLineNums.innerHTML = numsHTML;
}

function updateOutputByteStats(bytes) {
  if (bytes < 1024) {
    jsonStats.textContent = `(${bytes} B)`;
  } else {
    jsonStats.textContent = `(${(bytes / 1024).toFixed(2)} KB)`;
  }
}

function setConvertTime(ms) {
  convertTime.textContent = `Converted in ${ms}ms`;
}

function updateStatus(isValid, text) {
  if (isValid) {
    statusBadge.className = 'flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30';
    statusBadgeText.textContent = text;
  } else {
    statusBadge.className = 'flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30';
    statusBadgeText.textContent = text;
  }
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorAlert.classList.remove('hidden');
  lucide.createIcons();
}

function hideError() {
  errorAlert.classList.add('hidden');
}

// TOAST NOTIFICATIONS SYSTEM
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
