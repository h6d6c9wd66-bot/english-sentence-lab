const DATA = window.ESL_DATA;
const STORAGE_KEY = "english-sentence-lab-v1";

const defaultState = {
  theme: "system",
  savedSentences: {},
  savedWords: {},
  reviews: {}
};

let state = loadState();
let activeSentenceForAi = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return JSON.parse(JSON.stringify(defaultState));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function speak(text, rate = 0.88) {
  if (!("speechSynthesis" in window)) {
    alert("当前浏览器不支持 TTS 发音。");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  speechSynthesis.speak(utterance);
}

function normalizeWord(word) {
  return word.toLowerCase().replace(/^[^a-z']+|[^a-z']+$/g, "").replace(/'s$/, "");
}

function sentenceTokens(sentence) {
  return sentence.split(/(\s+)/).map((part) => {
    if (/^\s+$/.test(part)) return document.createTextNode(part);
    const clean = normalizeWord(part);
    if (!clean) return document.createTextNode(part);
    const btn = document.createElement("button");
    btn.className = "word-token";
    btn.type = "button";
    btn.textContent = part;
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      openWord(clean);
    });
    return btn;
  });
}

function getDailySentences() {
  const daySeed = Number(todayKey().replaceAll("-", ""));
  const list = [...DATA.sentences];
  list.sort((a, b) => {
    const hash = (id) => id.split("").reduce((sum, char) => sum + char.charCodeAt(0), daySeed);
    return (hash(a.id) * 37) % 101 - (hash(b.id) * 37) % 101;
  });
  return list.slice(0, 10);
}

function getSentenceMastery(sentenceId) {
  const review = state.reviews[sentenceId];
  if (!review) return 0;
  return Math.min(100, review.mastery || 0);
}

function ensureReview(sentence) {
  if (!state.reviews[sentence.id]) {
    state.reviews[sentence.id] = {
      sentenceId: sentence.id,
      stage: 1,
      mastery: 15,
      due: addDays(1),
      intervalIndex: 0,
      attempts: [],
      longTerm: false
    };
  }
  saveState();
}

function renderFilters() {
  $("#categoryFilter").innerHTML = DATA.categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");
  $("#levelFilter").innerHTML = DATA.levels.map((level) => `<option value="${level}">${level}</option>`).join("");
}

function renderHome() {
  const category = $("#categoryFilter").value || "全部";
  const level = $("#levelFilter").value || "全部";
  const list = getDailySentences().filter((item) => {
    return (category === "全部" || item.category === category) && (level === "全部" || item.level === level);
  });
  renderSentenceList($("#sentenceList"), list);
  updateTodayMastery(list);
}

function renderSentenceList(container, list, options = {}) {
  const template = $("#sentenceTemplate");
  container.innerHTML = "";
  list.forEach((sentence) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector(".category").textContent = sentence.category;
    node.querySelector(".level").textContent = sentence.level;

    const line = node.querySelector(".sentence-line");
    sentenceTokens(sentence.text).forEach((token) => line.append(token));
    line.addEventListener("click", () => speak(sentence.text));

    node.querySelector(".translation").textContent = sentence.translation;

    const star = node.querySelector(".star-btn");
    const saved = Boolean(state.savedSentences[sentence.id]);
    star.classList.toggle("saved", saved);
    star.textContent = saved ? "★" : "☆";
    star.addEventListener("click", () => toggleSentence(sentence));

    const mastery = getSentenceMastery(sentence.id);
    node.querySelector(".mastery-label b").textContent = `${mastery}%`;
    node.querySelector(".mastery-row .progress-track i").style.width = `${mastery}%`;

    const grammar = node.querySelector(".grammar-panel");
    grammar.innerHTML = grammarHtml(sentence);
    node.querySelector(".grammar-btn").addEventListener("click", () => {
      grammar.classList.toggle("open");
    });
    node.querySelector(".ai-btn").addEventListener("click", () => openAi(sentence));
    node.querySelector(".review-btn").addEventListener("click", () => {
      ensureReview(sentence);
      renderAll();
      alert("已加入复习。");
    });

    if (options.compact) {
      node.querySelector(".review-btn").textContent = "复习";
    }
    container.append(node);
  });
}

function grammarHtml(sentence) {
  const g = sentence.grammar;
  const pieces = g.structure.map(([text, role]) => `<div class="piece"><strong>${text}</strong><span>${role}</span></div>`).join("");
  const chunks = g.chunks.map((item) => `<span class="tag">${item}</span>`).join(" ");
  const natural = g.natural.map((item) => `<li>${item}</li>`).join("");
  return `
    <div class="grammar-block">
      <h4>句子结构</h4>
      <div class="structure">${pieces}</div>
    </div>
    <div class="grammar-block">
      <h4>语法解释</h4>
      <p class="muted">${g.why}</p>
      <p class="muted">${g.compare}</p>
    </div>
    <div class="grammar-block">
      <h4>固定搭配</h4>
      <div>${chunks}</div>
    </div>
    <div class="grammar-block">
      <h4>自然表达</h4>
      <ul class="muted">${natural}</ul>
    </div>
  `;
}

function toggleSentence(sentence) {
  if (state.savedSentences[sentence.id]) {
    delete state.savedSentences[sentence.id];
  } else {
    state.savedSentences[sentence.id] = { id: sentence.id, addedAt: Date.now() };
    ensureReview(sentence);
  }
  saveState();
  renderAll();
}

function openWord(word) {
  const dict = DATA.dictionary[word] || {
    ipa: "暂无",
    pos: "Unknown",
    meaning: "词典中暂未收录",
    inSentence: "后续可接入在线词典或 AI 词义分析。",
    collocations: ["coming soon"],
    example: "This word will be added later."
  };
  const saved = Boolean(state.savedWords[word]);
  $("#wordContent").innerHTML = `
    <p class="section-kicker">点词查词</p>
    <h2>${word}</h2>
    <p class="muted">${dict.ipa} · ${dict.pos}</p>
    <div class="dict-grid">
      <div class="dict-row"><b>中文意思</b>${dict.meaning}</div>
      <div class="dict-row"><b>当前句子中的含义</b>${dict.inSentence}</div>
      <div class="dict-row"><b>常见搭配</b>${dict.collocations.map((x) => `<span class="tag">${x}</span>`).join(" ")}</div>
      <div class="dict-row"><b>例句</b>${dict.example}</div>
    </div>
    <div class="card-actions">
      <button class="ghost-btn" id="speakWordBtn" type="button">发音</button>
      <button class="ghost-btn" id="saveWordBtn" type="button">${saved ? "已收藏" : "收藏到单词库"}</button>
    </div>
  `;
  $("#wordDialog").showModal();
  $("#speakWordBtn").addEventListener("click", () => speak(word, 0.82));
  $("#saveWordBtn").addEventListener("click", () => {
    if (state.savedWords[word]) {
      delete state.savedWords[word];
    } else {
      state.savedWords[word] = { word, addedAt: Date.now(), mastered: false, category: "默认" };
    }
    saveState();
    renderWords();
    openWord(word);
  });
}

function openAi(sentence) {
  activeSentenceForAi = sentence;
  $("#aiSentenceTitle").textContent = sentence.text;
  $("#aiQuestion").value = "";
  $("#aiAnswer").textContent = "你可以问这一句里的词、冠词、时态、语序或为什么这样表达。";
  $("#aiDialog").showModal();
}

function answerQuestion(sentence, question) {
  const q = question.toLowerCase();
  if (!question.trim()) return "先输入一个具体问题，比如“为什么这里用 looking？”";
  if (q.includes("looking") || q.includes("进行")) {
    return "这里用 looking 是因为说话人正在找东西，强调“现在正在发生”。如果说 I look for，听起来像习惯或一般事实，不像当下正在找。";
  }
  if (q.includes(" a ") || q.includes("加a") || q.includes("冠词")) {
    return "a 表示“任意一个”。比如 a coffee shop 不是指定某一家咖啡店，而是附近随便一家能喝咖啡的店。英语里可数名词单数通常需要 a、the 或其他限定词。";
  }
  if (q.includes("nearby")) {
    return "nearby 放在句尾时表示“在附近”，补充说明位置。nearby coffee shop 也可以表示“附近的咖啡店”，但在这句里把 nearby 放后面更像自然口语补充。";
  }
  if (q.includes("why") || q.includes("为什么")) {
    return sentence.grammar.why + " " + sentence.grammar.compare;
  }
  return `这句的核心表达是“${sentence.pattern}”。先记住整块表达，不要逐字翻译。它的自然说法包括：${sentence.grammar.natural.join(" / ")}。`;
}

function renderReviews() {
  const due = Object.values(state.reviews)
    .map((review) => ({ review, sentence: DATA.sentences.find((s) => s.id === review.sentenceId) }))
    .filter((item) => item.sentence && item.review.due <= todayKey());

  $("#reviewCount").textContent = `${due.length} 条`;
  const box = $("#reviewList");
  box.innerHTML = "";
  due.forEach(({ sentence, review }) => {
    const card = document.createElement("article");
    card.className = "sentence-card";
    card.innerHTML = `
      <div class="card-top"><span class="tag">${sentence.level}</span><span class="tag">${sentence.category}</span></div>
      <button class="sentence-line" type="button">${sentence.text}</button>
      <p class="translation">${sentence.translation}</p>
      <div class="stage-row" aria-label="五阶段掌握">
        ${[1, 2, 3, 4, 5].map((n) => `<button class="stage-btn ${review.stage >= n ? "active" : ""}" data-stage="${n}" type="button">L${n}</button>`).join("")}
      </div>
      <div class="card-actions">
        <button class="ghost-btn" data-score="fast" type="button">快速答对</button>
        <button class="ghost-btn" data-score="slow" type="button">想了一会</button>
        <button class="ghost-btn" data-score="wrong" type="button">答错</button>
      </div>
      <p class="muted">7天验证包含：翻译、听力、语法理解、造句、场景应用。通过后会提高掌握度，失败则重新进入学习状态。</p>
    `;
    card.querySelector(".sentence-line").addEventListener("click", () => speak(sentence.text));
    card.querySelectorAll("[data-score]").forEach((btn) => {
      btn.addEventListener("click", () => scoreReview(sentence, btn.dataset.score));
    });
    card.querySelectorAll("[data-stage]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.reviews[sentence.id].stage = Number(btn.dataset.stage);
        state.reviews[sentence.id].mastery = Math.max(state.reviews[sentence.id].mastery, Number(btn.dataset.stage) * 18);
        saveState();
        renderAll();
      });
    });
    box.append(card);
  });
}

function scoreReview(sentence, score) {
  const review = state.reviews[sentence.id];
  const step = DATA.reviewSteps[review.intervalIndex] || 90;
  const delta = score === "fast" ? 16 : score === "slow" ? 8 : -12;
  review.mastery = Math.max(0, Math.min(100, review.mastery + delta));
  review.attempts.push({ date: todayKey(), score, step, mastery: review.mastery });

  if (score === "fast") {
    review.intervalIndex = Math.min(DATA.reviewSteps.length - 1, review.intervalIndex + 1);
    review.due = addDays(DATA.reviewSteps[review.intervalIndex]);
  } else if (score === "slow") {
    review.due = addDays(Math.max(1, Math.floor(step / 2)));
  } else {
    review.intervalIndex = Math.max(0, review.intervalIndex - 1);
    review.due = addDays(1);
  }

  const passedRequired = [1, 3, 7, 14, 30].every((days) =>
    review.attempts.some((a) => a.score !== "wrong" && a.step === days)
  );
  if (review.mastery >= 80 && review.stage >= 5 && passedRequired) {
    review.longTerm = true;
  }

  saveState();
  renderAll();
}

function renderSavedSentences() {
  const q = $("#sentenceSearch").value.trim().toLowerCase();
  const list = Object.keys(state.savedSentences)
    .map((id) => DATA.sentences.find((s) => s.id === id))
    .filter(Boolean)
    .filter((s) => !q || `${s.text} ${s.translation} ${s.category}`.toLowerCase().includes(q));
  renderSentenceList($("#savedSentences"), list, { compact: true });
}

function renderWords() {
  const q = $("#wordSearch").value.trim().toLowerCase();
  const words = Object.keys(state.savedWords).filter((word) => !q || word.includes(q));
  const box = $("#savedWords");
  box.innerHTML = "";
  words.forEach((word) => {
    const dict = DATA.dictionary[word] || {};
    const item = state.savedWords[word];
    const card = document.createElement("article");
    card.className = "word-card";
    card.innerHTML = `
      <div class="word-head">
        <div>
          <div class="word-title">${word}</div>
          <div class="word-meta">${dict.ipa || ""} · ${dict.pos || "Unknown"}</div>
        </div>
        <button class="mini-btn" data-action="speak" type="button">发音</button>
      </div>
      <p class="muted">${dict.meaning || "暂无释义"} · ${dict.inSentence || ""}</p>
      <div class="card-actions">
        <button class="ghost-btn" data-action="master" type="button">${item.mastered ? "已掌握" : "标记掌握"}</button>
        <button class="ghost-btn" data-action="delete" type="button">删除</button>
      </div>
    `;
    card.querySelector('[data-action="speak"]').addEventListener("click", () => speak(word, 0.82));
    card.querySelector('[data-action="master"]').addEventListener("click", () => {
      item.mastered = !item.mastered;
      saveState();
      renderWords();
    });
    card.querySelector('[data-action="delete"]').addEventListener("click", () => {
      delete state.savedWords[word];
      saveState();
      renderWords();
    });
    box.append(card);
  });
}

function updateTodayMastery(list) {
  if (!list.length) return;
  const avg = Math.round(list.reduce((sum, item) => sum + getSentenceMastery(item.id), 0) / list.length);
  $("#todayMastery").textContent = `${avg}%`;
  $("#todayBar").style.width = `${avg}%`;
}

function setView(view) {
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  $$(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `${view}View`));
  $("#homeFilters").style.display = view === "home" ? "grid" : "none";
}

function applyTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const finalTheme = state.theme === "system" ? (prefersDark ? "dark" : "light") : state.theme;
  document.documentElement.dataset.theme = finalTheme;
  $("#themeIcon").textContent = finalTheme === "dark" ? "☼" : "◐";
}

function renderAll() {
  renderHome();
  renderReviews();
  renderSavedSentences();
  renderWords();
}

function bindEvents() {
  $("#categoryFilter").addEventListener("change", renderHome);
  $("#levelFilter").addEventListener("change", renderHome);
  $("#sentenceSearch").addEventListener("input", renderSavedSentences);
  $("#wordSearch").addEventListener("input", renderWords);
  $("#closeWordDialog").addEventListener("click", () => $("#wordDialog").close());
  $("#closeAiDialog").addEventListener("click", () => $("#aiDialog").close());
  $("#askAiBtn").addEventListener("click", () => {
    $("#aiAnswer").textContent = answerQuestion(activeSentenceForAi, $("#aiQuestion").value);
  });
  $("#themeToggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    state.theme = current === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
  });
  $$(".tab").forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

renderFilters();
bindEvents();
applyTheme();
renderAll();
