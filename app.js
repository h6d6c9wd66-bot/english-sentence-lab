const DATA = window.ESL_DATA;
const STORAGE_KEY = "english-sentence-lab-v1";

const defaultState = {
  theme: "system",
  savedSentences: {},
  customSentences: {},
  savedWords: {},
  wordLookupCache: {},
  reviews: {},
  speakingStats: {},
  dailyPlan: { date: "", ids: [], seenIds: [], cycle: 1 },
  aiEndpoint: ""
};

let state = loadState();
let activeSentenceForAi = null;
let activeTrainingSentence = null;
let activeWord = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const PHRASE_BANK = {
  "looking for": { ipa: "/ˈlʊkɪŋ fɔːr/", pos: "词块", meaning: "正在寻找", inSentence: "把 looking for 当成一个整体，表示正在找某人或某物。", collocations: ["looking for a place", "looking for my keys", "looking for help"], example: "I'm looking for a nearby coffee shop." },
  "coffee shop": { ipa: "/ˈkɔːfi ʃɑːp/", pos: "名词短语", meaning: "咖啡店", inSentence: "coffee shop 是固定搭配，表示可以买咖啡、坐下休息的店。", collocations: ["nearby coffee shop", "small coffee shop", "favorite coffee shop"], example: "There is a coffee shop nearby." },
  "nearby coffee shop": { ipa: "/ˌnɪrˈbaɪ ˈkɔːfi ʃɑːp/", pos: "名词短语", meaning: "附近的咖啡店", inSentence: "nearby 放在名词前，修饰 coffee shop。", collocations: ["nearby restaurant", "nearby hotel", "nearby station"], example: "I'm looking for a nearby coffee shop." },
  "on my way": { ipa: "/ɑːn maɪ weɪ/", pos: "固定表达", meaning: "我在路上", inSentence: "回答别人问你在哪里、多久到时非常常用。", collocations: ["I'm on my way", "on my way home", "on my way to work"], example: "I'm on my way to the station." },
  "i'd like to": { ipa: "/aɪd laɪk tuː/", pos: "固定句型", meaning: "我想要/我想做", inSentence: "比 I want 更礼貌，常用于餐厅、酒店、购物。", collocations: ["I'd like to order", "I'd like to check in", "I'd like to know"], example: "I'd like to check in." },
  "can i get": { ipa: "/kæn aɪ ɡet/", pos: "固定句型", meaning: "我可以要……吗", inSentence: "服务场景里非常自然的点餐、索要、请求表达。", collocations: ["Can I get the bill?", "Can I get a receipt?", "Can I get this to go?"], example: "Can I get the bill?" },
  "could you": { ipa: "/kʊd juː/", pos: "礼貌请求", meaning: "你能不能……", inSentence: "比 Can you 更礼貌，适合请求别人帮忙。", collocations: ["Could you help me?", "Could you take a photo?", "Could you repeat that?"], example: "Could you help me?" },
  "let me know": { ipa: "/let mi noʊ/", pos: "固定表达", meaning: "告诉我，让我知道", inSentence: "用于让对方有消息后通知你。", collocations: ["let me know if", "please let me know", "let me know when"], example: "Let me know if you need anything." },
  "sounds good": { ipa: "/saʊndz ɡʊd/", pos: "固定表达", meaning: "听起来不错，可以", inSentence: "用于同意建议或表示方案可以。", collocations: ["That sounds good", "sounds great", "sounds like a plan"], example: "That sounds good." },
  "think about": { ipa: "/θɪŋk əˈbaʊt/", pos: "动词短语", meaning: "考虑", inSentence: "think about it 表示考虑一下这件事。", collocations: ["think about it", "think about your idea", "think about moving"], example: "I'll think about it." },
  "check in": { ipa: "/tʃek ɪn/", pos: "动词短语", meaning: "办理入住/登记", inSentence: "酒店、机场常用表达。", collocations: ["check in at the hotel", "check in online", "check in early"], example: "I'd like to check in." },
  "check out": { ipa: "/tʃek aʊt/", pos: "动词短语", meaning: "退房/结账/查看", inSentence: "酒店退房或购物结账时常用。", collocations: ["check out of the hotel", "check out this place", "checkout counter"], example: "I'd like to check out." },
  "take a photo": { ipa: "/teɪk ə ˈfoʊtoʊ/", pos: "动词短语", meaning: "拍照", inSentence: "英语里拍照常说 take a photo。", collocations: ["take a photo of me", "take some photos", "take a quick photo"], example: "Could you take a photo of me?" },
  "feel like": { ipa: "/fiːl laɪk/", pos: "固定表达", meaning: "想要，感觉想", inSentence: "I feel like doing 表示我想做某事。", collocations: ["feel like going out", "feel like eating", "feel like talking"], example: "I don't feel like going out." },
  "to go": { ipa: "/tuː ɡoʊ/", pos: "餐厅表达", meaning: "打包带走", inSentence: "点餐时 this to go 表示这个打包。", collocations: ["for here or to go", "get this to go", "coffee to go"], example: "Can I get this to go?" },
  "less spicy": { ipa: "/les ˈspaɪsi/", pos: "形容词短语", meaning: "不那么辣", inSentence: "点餐时用来调整口味。", collocations: ["make it less spicy", "a little less spicy", "less sweet"], example: "Can you make it less spicy?" },
  "ready to order": { ipa: "/ˈredi tuː ˈɔːrdər/", pos: "固定表达", meaning: "准备好点餐", inSentence: "餐厅里告诉服务员可以点餐了。", collocations: ["We're ready to order", "Are you ready to order?", "ready to pay"], example: "We're ready to order now." }
};

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

function renderClickableSentence(container, sentence) {
  container.innerHTML = "";
  sentenceTokens(sentence).forEach((token) => container.append(token));
}

function getAllSentences() {
  return [...DATA.sentences, ...Object.values(state.customSentences || {})];
}

function getSentenceById(id) {
  return getAllSentences().find((sentence) => sentence.id === id);
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseRegex(phrase) {
  const pattern = phrase.split(/\s+/).map(escapeRegex).join("\\s+");
  return new RegExp(`(^|[^a-z'])(${pattern})(?=$|[^a-z'])`, "i");
}

function detectPhraseMatches(sentence) {
  const matches = Object.keys(PHRASE_BANK)
    .filter((phrase) => phraseRegex(phrase).test(sentence))
    .sort((a, b) => b.length - a.length)
    .slice(0, 6);
  return matches.map((phrase) => ({ phrase, info: PHRASE_BANK[phrase] }));
}

function renderPhrasePanel(container, sentence) {
  const matches = detectPhraseMatches(sentence);
  container.innerHTML = "";
  if (!matches.length) return;
  container.innerHTML = `
    <h3>识别词块</h3>
    <div class="phrase-chip-row">
      ${matches.map(({ phrase, info }) => `<button class="phrase-chip" data-phrase="${escapeHtml(phrase)}" type="button">${escapeHtml(phrase)} · ${escapeHtml(info.meaning)}</button>`).join("")}
    </div>
  `;
  container.querySelectorAll("[data-phrase]").forEach((button) => {
    button.addEventListener("click", () => openWord(button.dataset.phrase));
  });
}

function stableDailyRank(id, date, cycle) {
  const seed = `${date}-${cycle}-${id}`;
  return seed.split("").reduce((hash, char) => ((hash * 33) + char.charCodeAt(0)) % 1000003, 5381);
}

function createDailyPlan() {
  const date = todayKey();
  const all = DATA.sentences;
  const validIds = new Set(all.map((sentence) => sentence.id));
  const previous = state.dailyPlan || {};
  let seenIds = Array.isArray(previous.seenIds)
    ? previous.seenIds.filter((id) => validIds.has(id))
    : [];
  let cycle = Number(previous.cycle) || 1;
  const picked = [];

  while (picked.length < Math.min(10, all.length)) {
    let pool = all.filter((sentence) => !seenIds.includes(sentence.id) && !picked.includes(sentence.id));
    if (!pool.length) {
      seenIds = [];
      cycle += 1;
      pool = all.filter((sentence) => !picked.includes(sentence.id));
    }
    pool.sort((a, b) => stableDailyRank(a.id, date, cycle) - stableDailyRank(b.id, date, cycle));
    const next = pool[0];
    if (!next) break;
    picked.push(next.id);
    seenIds.push(next.id);
  }

  state.dailyPlan = { date, ids: picked, seenIds, cycle };
  saveState();
  return state.dailyPlan;
}

function getDailyPlan() {
  const date = todayKey();
  const plan = state.dailyPlan || {};
  const validIds = new Set(DATA.sentences.map((sentence) => sentence.id));
  const hasValidPlan = plan.date === date
    && Array.isArray(plan.ids)
    && plan.ids.length
    && plan.ids.every((id) => validIds.has(id));
  return hasValidPlan ? plan : createDailyPlan();
}

function getDailySentences() {
  const plan = getDailyPlan();
  return plan.ids.map((id) => DATA.sentences.find((sentence) => sentence.id === id)).filter(Boolean);
}

function renderDailyPlanStatus() {
  const plan = getDailyPlan();
  const total = DATA.sentences.length;
  const learned = Math.min(plan.seenIds.length, total);
  const daysLeft = Math.max(0, Math.ceil((total - learned) / 10));
  $("#dailyPlanStatus").textContent = `正式每日计划：第 ${plan.cycle} 轮 · 今日 10 句已固定 · 本轮已安排 ${learned}/${total} 句 · 约 ${daysLeft} 天后进入下一轮`;
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
  $("#trainingCategory").innerHTML = DATA.categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");
}

function renderHome() {
  const category = $("#categoryFilter").value || "全部";
  const level = $("#levelFilter").value || "全部";
  const source = category === "全部" && level === "全部" ? getDailySentences() : DATA.sentences;
  const list = source.filter((item) => {
    return (category === "全部" || item.category === category) && (level === "全部" || item.level === level);
  });
  renderSentenceList($("#sentenceList"), list);
  updateTodayMastery(list);
  renderDailyPlanStatus();
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

function fallbackWordInfo(word, meaning = "词典中暂未收录") {
  return {
    ipa: "暂无",
    pos: "未知词性",
    meaning,
    inSentence: meaning.includes("正在") ? "正在查询这个词的中文意思。" : `可先理解为：${meaning}`,
    collocations: [word],
    example: `${word}.`
  };
}

async function lookupOnlineWord(word) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en-US|zh-CN`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Word lookup failed: ${response.status}`);
  const data = await response.json();
  const meaning = data?.responseData?.translatedText?.trim();
  if (!meaning || meaning.toLowerCase() === word.toLowerCase()) {
    throw new Error("Word lookup returned empty result");
  }
  return {
    ipa: "暂无",
    pos: "在线查询",
    meaning,
    inSentence: `这个词在当前结果里可理解为：${meaning}`,
    collocations: [word],
    example: `${word}.`
  };
}

function renderWordDialog(word, dict) {
  const saved = Boolean(state.savedWords[word]);
  $("#wordContent").innerHTML = `
    <p class="section-kicker">点词查词</p>
    <h2>${escapeHtml(word)}</h2>
    <p class="muted">${escapeHtml(dict.ipa)} · ${escapeHtml(dict.pos)}</p>
    <div class="dict-grid">
      <div class="dict-row"><b>中文意思</b>${escapeHtml(dict.meaning)}</div>
      <div class="dict-row"><b>当前句子中的含义</b>${escapeHtml(dict.inSentence)}</div>
      <div class="dict-row"><b>常见搭配</b>${dict.collocations.map((x) => `<span class="tag">${escapeHtml(x)}</span>`).join(" ")}</div>
      <div class="dict-row"><b>例句</b>${escapeHtml(dict.example)}</div>
    </div>
    <div class="card-actions">
      <button class="ghost-btn" id="speakWordBtn" type="button">发音</button>
      <button class="ghost-btn" id="saveWordBtn" type="button">${saved ? "已收藏" : "收藏到单词库"}</button>
    </div>
  `;
  if (!$("#wordDialog").open) $("#wordDialog").showModal();
  $("#speakWordBtn").addEventListener("click", () => speak(word, 0.82));
  $("#saveWordBtn").addEventListener("click", () => {
    if (state.savedWords[word]) {
      delete state.savedWords[word];
    } else {
      state.savedWords[word] = { word, addedAt: Date.now(), mastered: false, category: word.includes(" ") ? "词块" : "默认" };
    }
    saveState();
    renderWords();
    openWord(word);
  });
}

function openWord(word) {
  activeWord = word;
  const dict = DATA.dictionary[word] || PHRASE_BANK[word] || state.wordLookupCache[word];
  if (dict) {
    renderWordDialog(word, dict);
    return;
  }
  renderWordDialog(word, fallbackWordInfo(word, "正在联网查询中文意思..."));
  lookupOnlineWord(word)
    .then((onlineDict) => {
      state.wordLookupCache[word] = onlineDict;
      saveState();
      renderWords();
      if (activeWord === word) renderWordDialog(word, onlineDict);
    })
    .catch(() => {
      if (activeWord === word) {
        renderWordDialog(word, fallbackWordInfo(word, "暂时查不到中文意思，请稍后再试"));
      }
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

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function analyzeSimpleGrammar(sentence) {
  const clean = sentence.trim().replace(/\s+/g, " ");
  const lower = clean.toLowerCase();
  const pieces = [];
  if (/^(i|you|he|she|we|they|it)\b/i.test(clean)) {
    pieces.push("开头是主语，先说明谁在做或处于什么状态。");
  }
  if (/\b(am|is|are|was|were)\s+\w+ing\b/i.test(clean)) {
    pieces.push("使用 be + doing，表达“正在发生”的动作。");
  }
  if (/\b(could|can|would|may)\s+you\b/i.test(clean)) {
    pieces.push("使用 Could/Can you 开头，是请求别人帮忙的句型。Could 更礼貌。");
  }
  if (/\bi'd like to\b/i.test(lower)) {
    pieces.push("I'd like to 是服务场景里很自然的“我想要/我想做”。");
  }
  if (/\bthere is\b|\bthere are\b/i.test(lower)) {
    pieces.push("There is/are 用来表达“有……”，先把存在的信息说出来。");
  }
  if (!pieces.length) {
    pieces.push("可以先按“主语 + 动作/状态 + 细节”的顺序理解，不要逐字从中文硬翻。");
  }
  return pieces;
}

function renderLabMessage(message) {
  $("#labOutput").innerHTML = `<div class="result-card"><p class="muted">${escapeHtml(message)}</p></div>`;
}

async function callAi(mode, text) {
  const endpoint = (state.aiEndpoint || "").trim();
  if (!endpoint) throw new Error("missing endpoint");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, text })
  });
  if (!response.ok) throw new Error(`AI request failed: ${response.status}`);
  return response.json();
}

async function callOnlineTranslate(input) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=zh-CN|en-US`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Online translation failed: ${response.status}`);
  const data = await response.json();
  const english = data?.responseData?.translatedText?.trim();
  if (!english) throw new Error("Online translation returned empty result");
  const alternatives = (data.matches || [])
    .map((item) => item.translation)
    .filter((item) => item && item.trim() && item.trim().toLowerCase() !== english.toLowerCase())
    .slice(0, 3);
  return {
    english,
    note: "在线翻译结果。建议再结合语法解释理解整句，不要只背单词。",
    alternatives,
    grammar: analyzeSimpleGrammar(english)
  };
}

function fallbackTranslate(input) {
  const matches = DATA.expressionLab.translations.filter((item) =>
    item.triggers.some((trigger) => input.includes(trigger))
  );
  return matches[0] || DATA.expressionLab.fallbackTranslation;
}

function generatedGrammar(sentence, source) {
  const notes = analyzeSimpleGrammar(sentence);
  const phrases = detectPhraseMatches(sentence).map((item) => item.phrase);
  const words = sentence.trim().split(/\s+/);
  const first = words[0] || sentence;
  const rest = words.slice(1).join(" ");
  return {
    structure: rest ? [[first, "句子开头：先说主语、请求或核心信息"], [rest, "后面补充动作、对象和细节"]] : [[sentence, "完整表达"]],
    why: notes.join(" "),
    compare: `这句来自你的${source}结果，建议按整句和词块记忆，不要逐字硬翻。`,
    chunks: phrases.length ? phrases : [sentence],
    natural: phrases.length ? phrases.map((phrase) => PHRASE_BANK[phrase].example) : [sentence]
  };
}

function findSentenceByText(text) {
  const normalized = text.trim().toLowerCase();
  return getAllSentences().find((sentence) => sentence.text.trim().toLowerCase() === normalized);
}

function saveLabSentence(english, translation, source, button) {
  const cleanEnglish = english.trim();
  const cleanTranslation = translation.trim() || "我的表达";
  if (!cleanEnglish) return;
  let sentence = findSentenceByText(cleanEnglish);
  if (!sentence) {
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sentence = {
      id,
      text: cleanEnglish,
      translation: cleanTranslation,
      category: "我的表达",
      level: "L2",
      pattern: detectPhraseMatches(cleanEnglish)[0]?.phrase || cleanEnglish,
      grammar: generatedGrammar(cleanEnglish, source)
    };
    state.customSentences[id] = sentence;
  }
  state.savedSentences[sentence.id] = { id: sentence.id, addedAt: Date.now(), custom: true };
  ensureReview(sentence);
  saveState();
  renderAll();
  button.textContent = "已收藏到句库";
  button.disabled = true;
}

function renderTranslationResult(result, source) {
  const top = {
    english: result.english || result.corrected || "",
    note: result.note || result.explanation || "",
    alternatives: result.alternatives || [],
    grammar: result.grammar || []
  };
  const alternatives = top.alternatives || [];
  const grammar = top.grammar.length ? top.grammar : analyzeSimpleGrammar(top.english);
  $("#labOutput").innerHTML = `
    <article class="result-card">
      <p class="section-kicker">中文 → 英文 · ${source}</p>
      <p class="result-main clickable-result" id="labEnglishResult"></p>
      <p class="muted">${escapeHtml(top.note)}</p>
      <div class="card-actions">
        <button class="ghost-btn" id="speakLabResult" type="button">朗读</button>
        <button class="ghost-btn" id="showLabGrammar" type="button">查看语法</button>
        <button class="ghost-btn" id="saveLabSentenceBtn" type="button">收藏到句库</button>
      </div>
      <div class="phrase-panel" id="labPhrasePanel"></div>
      ${alternatives.length ? `<h3>类似表达</h3><ul class="result-list">${alternatives.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}
      <div class="grammar-panel" id="labGrammar"></div>
    </article>
  `;
  renderClickableSentence($("#labEnglishResult"), top.english);
  renderPhrasePanel($("#labPhrasePanel"), top.english);
  $("#speakLabResult").addEventListener("click", () => speak(top.english));
  const saveButton = $("#saveLabSentenceBtn");
  const existing = findSentenceByText(top.english);
  if (existing && state.savedSentences[existing.id]) {
    saveButton.textContent = "已收藏到句库";
    saveButton.disabled = true;
  }
  saveButton.addEventListener("click", () => saveLabSentence(top.english, $("#zhInput").value.trim(), source, saveButton));
  $("#showLabGrammar").addEventListener("click", () => {
    const panel = $("#labGrammar");
    panel.classList.toggle("open");
    panel.innerHTML = `<div class="grammar-block"><h4>语法拆解</h4><ul class="result-list">${grammar.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>`;
  });
}

async function translateChinese() {
  const input = $("#zhInput").value.trim();
  if (!input) {
    renderLabMessage("先输入一句中文。");
    return;
  }
  renderLabMessage(state.aiEndpoint ? "正在用 AI 翻译..." : "正在联网翻译...");
  if (state.aiEndpoint) {
    try {
      const result = await callAi("translate", input);
      renderTranslationResult(result, "AI");
      return;
    } catch {
      renderLabMessage("AI 暂时不可用，正在改用在线翻译...");
    }
  }
  try {
    const result = await callOnlineTranslate(input);
    renderTranslationResult(result, "在线翻译");
  } catch {
    renderTranslationResult(fallbackTranslate(input), "本地备用");
  }
}

function fallbackCorrect(input) {
  let corrected = input.replace(/\s+/g, " ");
  const notes = [];
  DATA.expressionLab.corrections.forEach((rule) => {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(corrected)) {
      rule.pattern.lastIndex = 0;
      corrected = corrected.replace(rule.pattern, rule.replace);
      notes.push(rule.note);
    }
  });
  if (!/[.!?]$/.test(corrected)) corrected += ".";
  if (!notes.length) {
    notes.push("没有发现明显基础语法错误。可以继续检查语气是否自然、表达是否更像母语者。");
  }
  return { corrected, explanation: notes.join(" "), grammar: notes };
}

function applyLanguageToolCorrections(text, matches) {
  let corrected = text;
  matches
    .filter((match) => match.replacements && match.replacements.length)
    .sort((a, b) => b.offset - a.offset)
    .forEach((match) => {
      const replacement = match.replacements[0].value;
      corrected = `${corrected.slice(0, match.offset)}${replacement}${corrected.slice(match.offset + match.length)}`;
    });
  if (!/[.!?]$/.test(corrected)) corrected += ".";
  return corrected;
}

async function callOnlineCorrect(input) {
  const body = new URLSearchParams({ text: input, language: "en-US" });
  const response = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  if (!response.ok) throw new Error(`Online correction failed: ${response.status}`);
  const data = await response.json();
  const matches = data.matches || [];
  let corrected = applyLanguageToolCorrections(input, matches);
  const notes = matches.length
    ? matches.slice(0, 6).map((match) => {
      const suggestion = match.replacements?.[0]?.value ? ` 建议：${match.replacements[0].value}` : "";
      return `${match.message}${suggestion}`;
    })
    : [];
  const local = fallbackCorrect(corrected);
  const localIsOnlyGeneric = local.grammar.length === 1 && local.grammar[0].includes("没有发现明显基础语法错误");
  if (!localIsOnlyGeneric) {
    corrected = local.corrected;
    notes.push(...local.grammar);
  }
  if (!notes.length) {
    notes.push("在线检查没有发现明显语法或拼写问题。可以继续关注表达是否足够自然。");
  }
  return {
    corrected,
    explanation: notes.join(" "),
    grammar: notes
  };
}

function renderCorrectionResult(result, source) {
  const corrected = result.corrected || result.english || "";
  const notes = Array.isArray(result.grammar) && result.grammar.length
    ? result.grammar
    : [result.explanation || result.note || "已给出更自然的表达。"];
  const alternatives = result.alternatives || [];
  $("#labOutput").innerHTML = `
    <article class="result-card">
      <p class="section-kicker">英文纠错 · ${source}</p>
      <h3>建议表达</h3>
      <p class="result-main clickable-result" id="correctedEnglishResult"></p>
      <div class="card-actions">
        <button class="ghost-btn" id="speakCorrected" type="button">朗读</button>
        <button class="ghost-btn" id="showCorrectGrammar" type="button">查看语法</button>
        <button class="ghost-btn" id="saveCorrectedSentenceBtn" type="button">收藏到句库</button>
      </div>
      <div class="phrase-panel" id="correctPhrasePanel"></div>
      <h3>为什么</h3>
      <ul class="result-list">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      ${alternatives.length ? `<h3>类似表达</h3><ul class="result-list">${alternatives.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}
      <div class="grammar-panel" id="correctGrammar"></div>
    </article>
  `;
  renderClickableSentence($("#correctedEnglishResult"), corrected);
  renderPhrasePanel($("#correctPhrasePanel"), corrected);
  $("#speakCorrected").addEventListener("click", () => speak(corrected));
  const saveButton = $("#saveCorrectedSentenceBtn");
  const existing = findSentenceByText(corrected);
  if (existing && state.savedSentences[existing.id]) {
    saveButton.textContent = "已收藏到句库";
    saveButton.disabled = true;
  }
  saveButton.addEventListener("click", () => {
    const original = $("#enInput").value.trim();
    saveLabSentence(corrected, original ? `纠错前：${original}` : "我的英文表达", source, saveButton);
  });
  $("#showCorrectGrammar").addEventListener("click", () => {
    const panel = $("#correctGrammar");
    panel.classList.toggle("open");
    panel.innerHTML = `<div class="grammar-block"><h4>语法拆解</h4><ul class="result-list">${analyzeSimpleGrammar(corrected).map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>`;
  });
}

async function correctEnglish() {
  const input = $("#enInput").value.trim();
  if (!input) {
    renderLabMessage("先输入一句英文。");
    return;
  }
  renderLabMessage(state.aiEndpoint ? "正在用 AI 纠错..." : "正在联网纠错...");
  if (state.aiEndpoint) {
    try {
      const result = await callAi("correct", input);
      renderCorrectionResult(result, "AI");
      return;
    } catch {
      renderLabMessage("AI 暂时不可用，正在改用在线纠错...");
    }
  }
  try {
    const result = await callOnlineCorrect(input);
    renderCorrectionResult(result, "在线纠错");
  } catch {
    renderCorrectionResult(fallbackCorrect(input), "本地备用");
  }
}

function getTrainingPool() {
  const category = $("#trainingCategory").value || "全部";
  return DATA.sentences.filter((sentence) => category === "全部" || sentence.category === category);
}

function pickTrainingSentence() {
  const pool = getTrainingPool();
  if (!pool.length) return null;
  const scored = pool.map((sentence) => {
    const stat = state.speakingStats[sentence.id] || { fast: 0, slow: 0, wrong: 0, attempts: 0 };
    const need = stat.wrong * 4 + stat.slow * 2 - stat.fast + (stat.attempts ? 0 : 5);
    return { sentence, need };
  });
  scored.sort((a, b) => b.need - a.need);
  const slice = scored.slice(0, Math.min(12, scored.length));
  return slice[Math.floor(Math.random() * slice.length)].sentence;
}

function renderTrainingStats() {
  const stats = Object.values(state.speakingStats);
  $("#spokenCount").textContent = stats.reduce((sum, item) => sum + (item.attempts || 0), 0);
  $("#fluentCount").textContent = stats.reduce((sum, item) => sum + (item.fast || 0), 0);
  $("#stuckCount").textContent = stats.reduce((sum, item) => sum + (item.wrong || 0), 0);
  $("#trainingCount").textContent = `${getTrainingPool().length} 句`;
}

function renderTrainingPrompt() {
  activeTrainingSentence = pickTrainingSentence();
  renderTrainingStats();
  const answer = $("#trainingAnswer");
  answer.classList.remove("open");
  if (!activeTrainingSentence) {
    $("#trainingPrompt").textContent = "这个分类还没有训练句。";
    $("#trainingEnglish").textContent = "";
    $("#trainingPattern").textContent = "";
    return;
  }
  $("#trainingScene").textContent = activeTrainingSentence.category;
  $("#trainingLevel").textContent = activeTrainingSentence.level;
  $("#trainingPrompt").textContent = activeTrainingSentence.translation;
  $("#trainingEnglish").textContent = activeTrainingSentence.text;
  $("#trainingPattern").textContent = `核心句型：${activeTrainingSentence.pattern}`;
}

function revealTrainingAnswer() {
  $("#trainingAnswer").classList.add("open");
}

function scoreTraining(score) {
  if (!activeTrainingSentence) return;
  const stat = state.speakingStats[activeTrainingSentence.id] || { attempts: 0, fast: 0, slow: 0, wrong: 0 };
  stat.attempts += 1;
  stat[score] += 1;
  stat.lastScore = score;
  stat.lastPracticed = Date.now();
  state.speakingStats[activeTrainingSentence.id] = stat;

  ensureReview(activeTrainingSentence);
  const review = state.reviews[activeTrainingSentence.id];
  if (score === "fast") {
    review.stage = Math.max(review.stage, 5);
    review.mastery = Math.min(100, Math.max(review.mastery, 70) + 8);
  } else if (score === "slow") {
    review.stage = Math.max(review.stage, 4);
    review.mastery = Math.min(100, Math.max(review.mastery, 48) + 4);
  } else {
    review.stage = Math.max(1, Math.min(review.stage, 3));
    review.mastery = Math.max(0, review.mastery - 8);
    review.due = todayKey();
  }
  saveState();
  renderTrainingPrompt();
  renderAll();
}

function renderReviews() {
  const due = Object.values(state.reviews)
    .map((review) => ({ review, sentence: getSentenceById(review.sentenceId) }))
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
    .map((id) => getSentenceById(id))
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
    const dict = DATA.dictionary[word] || PHRASE_BANK[word] || state.wordLookupCache[word] || {};
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
  if (!list.length) {
    $("#todayMastery").textContent = "0%";
    $("#todayBar").style.width = "0%";
    return;
  }
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
  renderTrainingStats();
}

function bindEvents() {
  $("#categoryFilter").addEventListener("change", renderHome);
  $("#levelFilter").addEventListener("change", renderHome);
  $("#trainingCategory").addEventListener("change", renderTrainingPrompt);
  $("#revealTrainingBtn").addEventListener("click", revealTrainingAnswer);
  $("#speakTrainingBtn").addEventListener("click", () => {
    if (activeTrainingSentence) speak(activeTrainingSentence.text);
  });
  $("#nextTrainingBtn").addEventListener("click", renderTrainingPrompt);
  $$("[data-training-score]").forEach((btn) => {
    btn.addEventListener("click", () => scoreTraining(btn.dataset.trainingScore));
  });
  $("#sentenceSearch").addEventListener("input", renderSavedSentences);
  $("#wordSearch").addEventListener("input", renderWords);
  $("#translateBtn").addEventListener("click", translateChinese);
  $("#correctBtn").addEventListener("click", correctEnglish);
  $("#aiEndpointInput").value = state.aiEndpoint || "";
  $("#saveAiEndpointBtn").addEventListener("click", () => {
    state.aiEndpoint = $("#aiEndpointInput").value.trim();
    saveState();
    renderLabMessage(state.aiEndpoint ? "AI 接口已保存，将优先使用 AI。" : "已清空 AI 接口，将使用在线翻译和在线纠错。");
  });
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
renderTrainingPrompt();
renderAll();
