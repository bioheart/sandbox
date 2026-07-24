// DEFAULT AI AGENT RULE SETS (RULES & PERSONALIZATION DATASETS)
let RULE_DATASETS = {
  gemini: {
    title: "Gemini Agent",
    rules: {
      title: "Gemini Global Rules (AGENTS.md)",
      filename: "AGENTS.md",
      content: `# Global Rules for Gemini & Antigravity Agents

## Think Before Acting

Understand the user request before making changes.

Inspect the relevant files, existing code, README, project structure, comments, types, interfaces, API usage, and nearby implementation patterns before asking questions or editing files.

Do not guess when the answer can be found in the repository.

Prefer small, focused, safe changes that directly solve the request.

Do not make unrelated changes.

## Ask Only When Necessary

Do not ask too many clarification questions.

Ask the user only when the answer is required to proceed safely, such as:

* The requirement is ambiguous and different interpretations would change the implementation.
* There is a risk of deleting, overwriting, or reverting user work.
* A business/product decision is required and cannot be inferred from existing code.
* Credentials, environment access, private data, or unavailable information is required.
* The action is destructive or risky.

Do not ask if a safe and reasonable assumption can be made from the existing code or context.

When assumptions are needed, proceed with the safest minimal change and mention the assumption in the final handoff.

When questions are necessary, ask them together, keep them short, and limit them to the minimum required.

Default behavior: investigate first, proceed when safe, ask only when blocked.

## Editing Permission

When the user explicitly asks to implement, fix, update, remove, or refactor code, that request grants permission to make the necessary focused file changes within the requested scope.

Do not ask for confirmation again before editing those files.

Ask before actions outside the requested scope or actions that are destructive, difficult to reverse, or may significantly modify the environment, such as installing dependencies, deleting existing files, running migrations, staging, committing, pushing, or starting external services.

## Command Safety

Do not run, start, build, install, test, lint, type-check, or launch an application unless the user explicitly asks.

Safe read-only inspection commands may be run without confirmation.

The user's explicit request for a code change permits focused edits within that scope. Additional confirmation is not required for normal source-file edits.

Always ask before commands that install dependencies, modify the environment, delete or move existing files, run migrations, stage, commit, push, start services, or control a browser.

Temporary files created by the agent during the current task may be removed during cleanup without asking.

## Git Safety

When working inside a Git repository, check the initial \`git status\` before making changes.

Remember which files were already modified before your work.

Do not overwrite, delete, revert, stage, commit, or push changes unless the user explicitly asks.

Before the final handoff, check \`git status\` again when working inside a Git repository and confirm that only intended changes remain.

## Prefer Inline and Existing Tools

Prefer existing repository tools and standard shell commands before writing custom scripts.

These rules apply to Python, Node.js, shell scripts, and other scripting languages.

Avoid creating temporary script files when the same task can be performed safely with an inline command.

Prefer, in this order:

1. Existing read-only shell commands such as \`rg\`, \`grep\`, \`find\`, \`sed\`, or \`git\`.
2. \`python -c\` for short and simple Python operations.
3. A Python heredoc such as \`python - <<'PY'\` for multiline logic that does not need to be saved.
4. A temporary script file only when inline execution would be difficult to read, unsafe because of quoting, repeatedly reused, or necessary for debugging.

Do not create one-off files such as \`inspect_*.py\`, \`analyze_*.py\`, \`check_*.py\`, or \`verify_*.py\` merely for convenience.

Inline Python commands are still subject to the normal Command Safety rules. Do not use them to modify project files or the environment unless that action is permitted by the user's request.

If a temporary script is genuinely necessary, give it a clearly temporary name and remove it before the final handoff.

## Cleanup

Cleanup is mandatory before final handoff.

Remove temporary/debug files created by the agent during the current task, including one-off scripts, debug images, generated test outputs, scratch files, temporary logs, and generated test artifacts.

Temporary files include patterns such as:

* \`debug_*\`
* \`temp_*\`
* \`scratch_*\`
* \`test_output_*\`
* \`verify_*.py\`
* \`check_*.py\`
* \`crop_*.py\`
* \`inspect_*.py\`
* \`analyze_*.py\`

The agent may delete temporary/debug files that it created during the current task without asking.

Do not delete files that existed before the task unless the user explicitly asks.

If unsure whether a file is temporary or part of the real project, ask before deleting it.

Never stage temporary/debug files.

## Generated and Minified Files

Do not edit generated or minified build output files unless the user explicitly asks.

Avoid editing files in:

* \`dist\`
* \`build\`
* \`coverage\`
* \`.next\`
* \`.nuxt\`
* generated bundles
* \`index.min.*.js\`
* minified \`.js\` or \`.css\` files

Change the source files instead.

## Final Handoff

Before saying the task is complete, provide a concise final handoff with:

* Summary of what changed
* Files changed
* Verification performed
* Cleanup result
* Current \`git status\` summary

If anything could not be verified or cleaned up, explain why.
Keep the final handoff proportional to the task. For very small changes, combine the required information into a few concise sentences.

## Browser Verification Rule

- Do not run browser verification, browser automation, or Chrome DevTools MCP checks unless explicitly requested by the user.
- By default, perform browser verification ONLY for the specific turn/request where the user explicitly requested it.
- Do NOT automatically continue browser verification in subsequent prompts, UNLESS the user explicitly instructs to keep verifying continuously or for the rest of the session (e.g., 'verify ต่อไปเรื่อยๆ' or 'verify ทั้ง session').`
    },
    personalize: {
      title: "Gemini Personalization Profile",
      filename: "Gemini_Personalization.md",
      content: `# Gemini Agent Personal Instructions & Profile

## User Profile
- **Name**: Bioheart / Tae
- **Role**: Lead AI Systems & Full-Stack Architect
- **Primary Tech Stack**: JavaScript (ES6+), HTML5, Tailwind CSS, Python, Node.js
- **Location & Timezone**: Thailand (GMT+7)
- **Preferred Communication**: Thai (Primary) & English (Code/Technical)

## Personalization & Pair-Programming Preferences

* **Aesthetic Standard**: High visual excellence. Dark mode glows, vibrant curated colors, smooth micro-animations, no browser default plain styles.
* **Proactive Efficiency**: Always inspect repository files, git status, and docstrings before suggesting changes.
* **Clean Code Philosophy**: Modular, readable, type-safe code with zero debug pollution left behind.`
    }
  },
  chatgpt: {
    title: "ChatGPT",
    rules: {
      title: "ChatGPT System Rules",
      filename: "ChatGPT_System_Rules.md",
      content: `# ChatGPT Custom System Rules

## Role & Persona

You are an expert Senior Full-Stack Software Engineer and Pair-Programming AI Assistant. You write clean, production-ready, maintainable code following modern software design patterns.

## Communication Style

* **Be Concise**: Provide direct, focused answers without unnecessary fluff or excessive pleasantries.
* **Format with Markdown**: Use clear headings, bullet points, and code blocks with exact language syntax highlighting.
* **Explain Rationale**: Briefly explain *why* a specific approach or refactoring was chosen.

## Code Quality & Guidelines

* **Surgical Edits**: Prefer minimal, safe changes over rewriting whole files.
* **Type Safety**: Use standard type annotations (TypeScript / Python Type Hints) whenever applicable.
* **Modern Best Practices**:
  * Use ES6+ modern JavaScript syntax (\`const\`, \`let\`, Arrow Functions, Async/Await).
  * Follow single-responsibility principles for functions and components.
  * Avoid global scope pollution.
* **Error Handling**: Include robust error handling (\`try/catch\`) and informative error messages rather than swallowing exceptions.`
    },
    personalize: {
      title: "ChatGPT Personal Instructions",
      filename: "ChatGPT_Personal_Instructions.md",
      content: `# ChatGPT Personal Instructions

## What would you like ChatGPT to know about you?
- Full-stack developer building modern web applications, AI tools, and interactive dashboards.
- Prefers concise code snippets formatted with clean markdown syntax highlighting.

## How would you like ChatGPT to respond?
- Professional, efficient, and direct. Skip introductory filler sentences ("Sure, here is...") and jump straight into code solution and brief explanation.`
    }
  },
  claude: {
    title: "Claude AI",
    rules: {
      title: "Claude System Guidelines",
      filename: "Claude_System_Guidelines.md",
      content: `# Claude AI System Guidelines & Coding Standards

## Core Principles

- **Directness & Precision**: Answer user prompts directly, prioritizing correctness and code readability.
- **No Unrequested Refactoring**: Modify only code related to the user request. Do not format or refactor unrelated code blocks.
- **Preserve Documentation**: Retain all docstrings, comments, and inline type definitions present in existing source files.

## Technical Execution Rules

- **Strict Validation**: Verify inputs and parameters before property dereferencing to prevent null pointer errors.
- **Inline Shell Utilities**: Prefer built-in shell utilities (\`rg\`, \`grep\`, \`git\`) over creating temporary scratch scripts.
- **Clean Handoff**: Provide a concise summary of modified files and verification results at the conclusion of every turn.`
    },
    personalize: {
      title: "Claude Personalization Context",
      filename: "Claude_Personalization.md",
      content: `# Claude AI Personalization Context

## Custom Instructions
- Senior Architect working on AI agent integration, reactive interfaces, and developer productivity tooling.
- Always provide clean, complete, copy-pasteable code blocks with necessary imports.`
    }
  }
};

// CATEGORY TAGS FOR FILTERING
const CATEGORIES = ['All', 'Think', 'Command Safety', 'Git Safety', 'Browser Verification', 'Cleanup', 'Formatting', 'Profile'];

// APP STATE
let currentPlatform = 'gemini';
let currentSubtab = 'rules'; // 'rules' or 'personalize'
let currentViewMode = 'rendered'; // 'rendered' or 'raw'
let isAuthenticated = false;

// AUTH CONFIG — SHA-256 hash of the passcode (default: "bioheart")
// To change passcode: run in console: crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_NEW_PASSCODE')).then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))
const AUTH_PASSCODE_HASH = '8e1049064c2ccd119eda8418c783b98aa0fdf257660e5c9423ee070fa824c77a';

// DOM ELEMENTS
const tabGemini = document.getElementById('tabGemini');
const tabChatGPT = document.getElementById('tabChatGPT');
const tabClaude = document.getElementById('tabClaude');
const categoryTagsContainer = document.getElementById('categoryTagsContainer');

const subtabRulesBtn = document.getElementById('subtabRulesBtn');
const subtabPersonalizeBtn = document.getElementById('subtabPersonalizeBtn');

const activeDocumentTitle = document.getElementById('activeDocumentTitle');
const renderedContainer = document.getElementById('renderedContainer');
const rawContainer = document.getElementById('rawContainer');
const rawTextarea = document.getElementById('rawTextarea');

const viewRenderedBtn = document.getElementById('viewRenderedBtn');
const viewRawBtn = document.getElementById('viewRawBtn');

const saveRulesBtn = document.getElementById('saveRulesBtn');
const saveDefaultBtn = document.getElementById('saveDefaultBtn');
const copyRulesBtn = document.getElementById('copyRulesBtn');
const downloadRulesBtn = document.getElementById('downloadRulesBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const resetRulesBtn = document.getElementById('resetRulesBtn');
const searchInput = document.getElementById('searchInput');

const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeSunIcon = document.getElementById('themeSunIcon');
const themeMoonIcon = document.getElementById('themeMoonIcon');

// AUTH DOM ELEMENTS
const authLockBtn = document.getElementById('authLockBtn');
const authLockIcon = document.getElementById('authLockIcon');
const authStatusText = document.getElementById('authStatusText');
const authModal = document.getElementById('authModal');
const authPasswordInput = document.getElementById('authPasswordInput');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authCancelBtn = document.getElementById('authCancelBtn');
const authError = document.getElementById('authError');

// INITIALIZATION
async function initApp() {
  lucide.createIcons();
  updateThemeIcons();
  renderCategoryTags();
  
  // Try fetching project rules-store.json database
  try {
    const res = await fetch('./rules-store.json');
    if (res.ok) {
      const jsonStore = await res.json();
      if (jsonStore && typeof jsonStore === 'object') {
        RULE_DATASETS = jsonStore;
      }
    }
  } catch (err) {
    console.log('Loaded built-in default rule datasets');
  }

  loadSavedRules();
  loadPlatform('gemini', 'rules');

  // Restore session auth if previously authenticated
  if (sessionStorage.getItem('agent_rules_auth') === 'true') {
    isAuthenticated = true;
  }
  updateAuthUI();
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  initApp();
} else {
  window.addEventListener('DOMContentLoaded', initApp);
}

// LOAD SAVED RULES FROM LOCALSTORAGE
function loadSavedRules() {
  Object.keys(RULE_DATASETS).forEach(platform => {
    ['rules', 'personalize'].forEach(subtab => {
      const saved = localStorage.getItem(`agent_rules_${platform}_${subtab}`);
      if (saved && RULE_DATASETS[platform] && RULE_DATASETS[platform][subtab]) {
        RULE_DATASETS[platform][subtab].content = saved;
      }
    });
  });
}

// ─── AUTH SYSTEM ───────────────────────────────────────────────
async function hashPasscode(passcode) {
  const encoder = new TextEncoder();
  const data = encoder.encode(passcode);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = [...new Uint8Array(hashBuffer)];
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function updateAuthUI() {
  const editButtons = [saveRulesBtn, saveDefaultBtn, resetRulesBtn, exportJsonBtn];

  if (isAuthenticated) {
    // UNLOCKED STATE
    if (authLockIcon) authLockIcon.setAttribute('data-lucide', 'unlock');
    if (authStatusText) authStatusText.textContent = 'Admin';
    if (authLockBtn) {
      authLockBtn.className = 'px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl transition active:scale-95 flex items-center gap-1.5 shadow-sm';
    }
    editButtons.forEach(btn => {
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      }
    });
    if (rawTextarea) rawTextarea.readOnly = false;
  } else {
    // LOCKED STATE
    if (authLockIcon) authLockIcon.setAttribute('data-lucide', 'lock');
    if (authStatusText) authStatusText.textContent = 'View Only';
    if (authLockBtn) {
      authLockBtn.className = 'px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700/60 rounded-xl transition active:scale-95 flex items-center gap-1.5 shadow-sm';
    }
    editButtons.forEach(btn => {
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.4';
        btn.style.pointerEvents = 'none';
      }
    });
    if (rawTextarea) rawTextarea.readOnly = true;
  }
  lucide.createIcons();
}

function showAuthModal() {
  if (authModal) {
    authModal.classList.remove('hidden');
    if (authPasswordInput) { authPasswordInput.value = ''; authPasswordInput.focus(); }
    if (authError) authError.classList.add('hidden');
  }
}

function hideAuthModal() {
  if (authModal) authModal.classList.add('hidden');
}

// Auth Lock Button Click
if (authLockBtn) {
  authLockBtn.addEventListener('click', () => {
    if (isAuthenticated) {
      // Lock it back
      isAuthenticated = false;
      sessionStorage.removeItem('agent_rules_auth');
      updateAuthUI();
      setViewMode('rendered'); // Force back to preview when locking
      showToast('Locked. Switched to View Only mode.', 'info');
    } else {
      showAuthModal();
    }
  });
}

// Auth Submit
if (authSubmitBtn) {
  authSubmitBtn.addEventListener('click', async () => {
    const input = authPasswordInput ? authPasswordInput.value : '';
    if (!input) return;
    const hashed = await hashPasscode(input);
    if (hashed === AUTH_PASSCODE_HASH) {
      isAuthenticated = true;
      sessionStorage.setItem('agent_rules_auth', 'true');
      hideAuthModal();
      updateAuthUI();
      showToast('Unlocked! Admin editing enabled.', 'success');
    } else {
      if (authError) authError.classList.remove('hidden');
      if (authPasswordInput) { authPasswordInput.value = ''; authPasswordInput.focus(); }
    }
  });
}

// Auth Cancel
if (authCancelBtn) {
  authCancelBtn.addEventListener('click', hideAuthModal);
}

// Enter key in password input
if (authPasswordInput) {
  authPasswordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); authSubmitBtn.click(); }
  });
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

// PLATFORM TAB SELECTION
tabGemini.addEventListener('click', () => loadPlatform('gemini', currentSubtab));
tabChatGPT.addEventListener('click', () => loadPlatform('chatgpt', currentSubtab));
tabClaude.addEventListener('click', () => loadPlatform('claude', currentSubtab));

// SUB-TAB SELECTION (GLOBAL RULES VS PERSONALIZATION)
subtabRulesBtn.addEventListener('click', () => setSubtab('rules'));
subtabPersonalizeBtn.addEventListener('click', () => setSubtab('personalize'));

function setSubtab(subtabKey) {
  currentSubtab = subtabKey;
  const btnActive = 'px-3 py-1 text-xs font-bold rounded-lg text-indigo-600 dark:text-neonCyan bg-slate-100 dark:bg-slate-800 shadow-sm transition flex items-center gap-1.5';
  const btnInactive = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition flex items-center gap-1.5';

  subtabRulesBtn.className = subtabKey === 'rules' ? btnActive : btnInactive;
  subtabPersonalizeBtn.className = subtabKey === 'personalize' ? btnActive : btnInactive;

  loadPlatform(currentPlatform, subtabKey);
}

function loadPlatform(platformKey, subtabKey = 'rules') {
  currentPlatform = platformKey;
  currentSubtab = subtabKey;

  const platformData = RULE_DATASETS[platformKey];
  if (!platformData) return;
  const activeDataset = platformData[subtabKey];
  if (!activeDataset) return;

  // Update Sidebar tab button styles
  const activeClass = 'flex items-center gap-3 p-3 rounded-xl text-left transition font-semibold text-xs border bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-neonCyan shadow-sm';
  const inactiveClass = 'flex items-center gap-3 p-3 rounded-xl text-left transition font-semibold text-xs border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400';

  tabGemini.className = platformKey === 'gemini' ? activeClass : inactiveClass;
  tabChatGPT.className = platformKey === 'chatgpt' ? activeClass : inactiveClass;
  tabClaude.className = platformKey === 'claude' ? activeClass : inactiveClass;

  activeDocumentTitle.textContent = `${platformData.title} • ${activeDataset.title}`;
  rawTextarea.value = activeDataset.content;

  const storagePathText = document.getElementById('storagePathText');
  if (storagePathText) {
    if (platformKey === 'gemini' && subtabKey === 'rules') {
      storagePathText.textContent = `Project File: ./ai-agent-rules/rules-store.json • Target Machine File: /Users/bioheart/.gemini/config/AGENTS.md`;
    } else {
      storagePathText.textContent = `Project File: ./ai-agent-rules/rules-store.json • Section: ${platformKey}.${subtabKey}`;
    }
  }

  renderMarkdown();
}

// VIEW MODE SWITCHER (PREVIEW VS RAW)
viewRenderedBtn.addEventListener('click', () => setViewMode('rendered'));
viewRawBtn.addEventListener('click', () => {
  if (!isAuthenticated) {
    showToast('Unlock Admin mode first to access Raw Editor.', 'error');
    return;
  }
  setViewMode('raw');
});

function setViewMode(mode) {
  currentViewMode = mode;
  const btnActive = 'px-2.5 py-1 text-xs font-semibold rounded-md text-indigo-600 dark:text-neonCyan bg-slate-100 dark:bg-slate-800 shadow-sm transition flex items-center gap-1';
  const btnInactive = 'px-2.5 py-1 text-xs font-semibold rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition flex items-center gap-1';

  viewRenderedBtn.className = mode === 'rendered' ? btnActive : btnInactive;
  viewRawBtn.className = mode === 'raw' ? btnActive : btnInactive;

  if (mode === 'rendered') {
    renderedContainer.classList.remove('hidden');
    rawContainer.classList.add('hidden');
    // Update active dataset content from textarea if edited in raw mode
    if (RULE_DATASETS[currentPlatform] && RULE_DATASETS[currentPlatform][currentSubtab]) {
      RULE_DATASETS[currentPlatform][currentSubtab].content = rawTextarea.value;
    }
    renderMarkdown();
  } else {
    renderedContainer.classList.add('hidden');
    rawContainer.classList.remove('hidden');
    rawTextarea.value = RULE_DATASETS[currentPlatform][currentSubtab].content;
  }
}

// RAW TEXTAREA LIVE UPDATE
rawTextarea.addEventListener('input', () => {
  if (RULE_DATASETS[currentPlatform] && RULE_DATASETS[currentPlatform][currentSubtab]) {
    RULE_DATASETS[currentPlatform][currentSubtab].content = rawTextarea.value;
  }
});

// SAVE RULES CONTROLLER
if (saveRulesBtn) {
  saveRulesBtn.addEventListener('click', () => {
    const activeDataset = RULE_DATASETS[currentPlatform][currentSubtab];
    const content = rawTextarea.value || activeDataset.content;
    if (activeDataset) {
      activeDataset.content = content;
      localStorage.setItem(`agent_rules_${currentPlatform}_${currentSubtab}`, content);
      renderMarkdown();
      showToast(`Saved ${activeDataset.title}!`, 'success');
    }
  });
}

// SET AS CUSTOM DEFAULT CONTROLLER WITH CONFIRMATION POPUP
if (saveDefaultBtn) {
  saveDefaultBtn.addEventListener('click', () => {
    const activeDataset = RULE_DATASETS[currentPlatform][currentSubtab];
    if (!activeDataset) return;
    const content = rawTextarea.value || activeDataset.content;

    if (confirm(`Set current content as your default baseline for ${activeDataset.title}?\n\nFuture clicks on "Reset" will restore to this baseline.`)) {
      activeDataset.content = content;
      localStorage.setItem(`agent_rules_${currentPlatform}_${currentSubtab}`, content);
      localStorage.setItem(`agent_rules_default_${currentPlatform}_${currentSubtab}`, content);
      renderMarkdown();
      showToast(`Set default baseline for ${activeDataset.title}!`, 'success');
    }
  });
}

// RESET RULES CONTROLLER (RESET TO CUSTOM DEFAULT OR SYSTEM DEFAULT)
if (resetRulesBtn) {
  resetRulesBtn.addEventListener('click', () => {
    const activeDataset = RULE_DATASETS[currentPlatform][currentSubtab];
    const customDefault = localStorage.getItem(`agent_rules_default_${currentPlatform}_${currentSubtab}`);
    const msg = customDefault ? `Reset ${activeDataset.title} back to your saved custom default?` : `Reset ${activeDataset.title} back to built-in system default?`;
    if (confirm(msg)) {
      if (customDefault) {
        localStorage.setItem(`agent_rules_${currentPlatform}_${currentSubtab}`, customDefault);
      } else {
        localStorage.removeItem(`agent_rules_${currentPlatform}_${currentSubtab}`);
      }
      location.reload();
    }
  });
}

// EXPORT ENTIRE PROJECT JSON STORE CONTROLLER
if (exportJsonBtn) {
  exportJsonBtn.addEventListener('click', () => {
    const jsonString = JSON.stringify(RULE_DATASETS, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rules-store.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported rules-store.json for repository commit!', 'success');
  });
}

// SEARCH FILTER
searchInput.addEventListener('input', () => {
  renderMarkdown();
});

// RENDER MARKDOWN WITH GFM THEME & SECTION COPY BUTTONS
function renderMarkdown() {
  const activeDataset = RULE_DATASETS[currentPlatform] ? RULE_DATASETS[currentPlatform][currentSubtab] : null;
  let content = activeDataset ? activeDataset.content : '';
  const query = searchInput.value.trim().toLowerCase();

  if (query) {
    const lines = content.split('\n');
    const filteredLines = lines.filter(line => line.toLowerCase().includes(query) || line.startsWith('#'));
    content = filteredLines.join('\n');
  }

  // Configure Marked GFM options
  marked.setOptions({
    gfm: true,
    breaks: true
  });

  const parsedHTML = marked.parse(content);
  renderedContainer.innerHTML = parsedHTML;

  // Add Copy Section Button to every H2 heading inside preview
  const h2Elements = renderedContainer.querySelectorAll('h2');
  h2Elements.forEach(h2 => {
    h2.className += ' flex items-center justify-between group cursor-pointer';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'opacity-0 group-hover:opacity-100 transition px-2 py-1 text-xs text-indigo-600 dark:text-neonCyan bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 rounded-lg flex items-center gap-1 font-mono shrink-0 ml-2';
    copyBtn.innerHTML = `<i data-lucide="copy" class="w-3 h-3"></i><span>Copy Section</span>`;
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rawTitle = h2.innerText.replace('Copy Section', '').trim();
      let sectionText = `## ${rawTitle}\n`;
      let next = h2.nextElementSibling;
      while (next && next.tagName !== 'H1' && next.tagName !== 'H2') {
        sectionText += (next.innerText || '') + '\n';
        next = next.nextElementSibling;
      }
      navigator.clipboard.writeText(sectionText.trim());
      showToast(`Copied "${rawTitle}" section!`, 'success');
    });
    h2.appendChild(copyBtn);
  });

  lucide.createIcons();
}

// CATEGORY TAGS RENDERER
function renderCategoryTags() {
  categoryTagsContainer.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-neonCyan border border-slate-200 dark:border-slate-700/60 transition active:scale-95';
    btn.textContent = cat === 'All' ? '#All' : `#${cat}`;
    btn.addEventListener('click', () => {
      searchInput.value = cat === 'All' ? '' : cat;
      renderMarkdown();
    });
    categoryTagsContainer.appendChild(btn);
  });
}

// COPY RULES TO CLIPBOARD
copyRulesBtn.addEventListener('click', async () => {
  const activeDataset = RULE_DATASETS[currentPlatform][currentSubtab];
  const content = rawTextarea.value || (activeDataset ? activeDataset.content : '');
  if (!content) return;
  try {
    await navigator.clipboard.writeText(content);
    showToast(`Copied ${activeDataset.title} to clipboard!`, 'success');
  } catch (err) {
    showToast('Clipboard copy failed', 'error');
  }
});

// DOWNLOAD MARKDOWN FILE
downloadRulesBtn.addEventListener('click', () => {
  const activeDataset = RULE_DATASETS[currentPlatform][currentSubtab];
  if (!activeDataset) return;
  const blob = new Blob([activeDataset.content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', activeDataset.filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Downloaded ${activeDataset.filename}`, 'success');
});

// TOAST SYSTEM
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
