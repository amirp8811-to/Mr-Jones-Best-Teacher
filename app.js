/**
 * WJEC GCSE Computer Science - Unit 1 Study App
 * Pure JS SPA: hash routes, localStorage progress, search.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "wjec-unit1-study-v1";
  var THEME_KEY = "wjec-unit1-theme";
  var QUIZ_STATE_KEY = "wjec-unit1-quiz-state";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function initTheme() {
    var savedTheme = localStorage.getItem(THEME_KEY);
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeToggle(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") || "light";
    var next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeToggle(next);
  }

  function updateThemeToggle(theme) {
    var btn = $("#theme-toggle");
    if (btn) {
      if (theme === "dark") {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
      } else {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
      }
    }
  }

  function stripHtml(html) {
    return String(html || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function flattenSubtopics() {
    var list = [];
    (window.TOPICS || []).forEach(function (topic) {
      (topic.subtopics || []).forEach(function (st) {
        list.push({ topic: topic, sub: st });
      });
    });
    return list;
  }

  function findSubtopic(id) {
    var hit = null;
    (window.TOPICS || []).some(function (topic) {
      return (topic.subtopics || []).some(function (st) {
        if (st.id === id) {
          hit = { topic: topic, sub: st };
          return true;
        }
        return false;
      });
    });
    return hit;
  }

  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultProgress();
      var p = JSON.parse(raw);
      return {
        notesRead: p.notesRead || {},
        quizBest: p.quizBest || {},
        flashSeen: p.flashSeen || {}
      };
    } catch (e) {
      return defaultProgress();
    }
  }

  function defaultProgress() {
    return { notesRead: {}, quizBest: {}, flashSeen: {} };
  }

  function saveProgress(p) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch (e) {
      /* quota or private mode */
    }
  }

  function saveQuizState(state) {
    try {
      var stateToSave = {
        subId: state.subId,
        topicId: state.topicId,
        index: state.index,
        score: state.score,
        streak: state.streak,
        hearts: state.hearts,
        xpSession: state.xpSession
      };
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      /* quota or private mode */
    }
  }

  function loadQuizState() {
    try {
      var raw = localStorage.getItem(QUIZ_STATE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function clearQuizState() {
    try {
      localStorage.removeItem(QUIZ_STATE_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  function totalSubtopics() {
    return flattenSubtopics().length;
  }

  function pctNotes(p) {
    var t = totalSubtopics();
    if (!t) return 0;
    var n = Object.keys(p.notesRead).filter(function (k) {
      return p.notesRead[k];
    }).length;
    return Math.round((n / t) * 100);
  }

  function pctQuiz(p) {
    var pairs = flattenSubtopics();
    var sum = 0;
    var count = 0;
    pairs.forEach(function (x) {
      var quiz = (window.QUIZZES || {})[x.sub.id];
      if (!quiz || !quiz.length) return;
      count++;
      var best = p.quizBest[x.sub.id];
      var score = best && typeof best.score === "number" ? best.score : 0;
      sum += score / quiz.length;
    });
    if (!count) return 0;
    return Math.round((sum / count) * 100);
  }

  function pctFlash(p) {
    var pairs = flattenSubtopics();
    var sum = 0;
    var count = 0;
    pairs.forEach(function (x) {
      var cards = x.sub.flashcards || [];
      if (!cards.length) return;
      count++;
      var seen = p.flashSeen[x.sub.id] || 0;
      sum += Math.min(1, seen / cards.length);
    });
    if (!count) return 0;
    return Math.round((sum / count) * 100);
  }

  function overallPct(p) {
    var a = pctNotes(p);
    var b = pctQuiz(p);
    var c = pctFlash(p);
    return Math.round((a + b + c) / 3);
  }

  function parseRoute() {
    var h = (location.hash || "#/dashboard").replace(/^#/, "");
    var parts = h.split("/").filter(Boolean);
    var name = parts[0] || "dashboard";
    var r = { name: name, topicId: null, subId: null };
    if (name === "topic") r.topicId = parts[1] || null;
    else if (name === "notes" || name === "quiz" || name === "flash") r.subId = parts[1] || null;
    return r;
  }

  function nav(to) {
    location.hash = to;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function shell(contentHtml) {
    return (
      '<div class="shell">' +
      '<header class="shell-header">' +
      '<a href="#/dashboard" class="brand">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' +
      '<span>Unit 1 Study</span>' +
      '<span class="brand-badge">WJEC GCSE CS</span>' +
      "</a>" +
      '<div class="nav-actions">' +
      '<div class="search-wrap">' +
      '<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>' +
      '<input type="search" id="global-search" placeholder="Search topics, notes, terms…" autocomplete="off" />' +
      '<div class="search-results" id="search-results" role="listbox"></div>' +
      "</div>" +
      '<button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>' +
      '</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" id="btn-dash">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>' +
      ' Dashboard' +
      '</button>' +
      "</div>" +
      "</header>" +
      '<main class="view">' +
      contentHtml +
      "</main>" +
      '<p class="footer-hint">Content is study-focused - always check wording against your teacher and the official WJEC specification.</p>' +
      "</div>"
    );
  }

  /** Minimal chrome for lesson-style quiz (Duolingo-like flow). */
  function shellQuiz(contentHtml) {
    return (
      '<div class="shell shell--quiz">' +
      '<header class="shell-header shell-header--quiz">' +
      '<a href="#/dashboard" class="brand">' +
      '<span>Unit 1</span>' +
      '<span class="brand-badge">Practice</span>' +
      "</a>" +
      '<button type="button" class="btn btn-ghost btn-sm" id="btn-dash">📊 Menu</button>' +
      "</header>" +
      '<main class="view view--quiz">' +
      contentHtml +
      "</main>" +
      "</div>"
    );
  }

  function renderDashboard(p) {
    var topics = window.TOPICS || [];
    var overall = overallPct(p);
    var cards = topics
      .map(function (t) {
        var subs = t.subtopics || [];
        var read = subs.filter(function (s) {
          return p.notesRead[s.id];
        }).length;
        var qSubs = subs.filter(function (s) {
          return (window.QUIZZES || {})[s.id] && (window.QUIZZES || {})[s.id].length;
        });
        var qDone = qSubs.filter(function (s) {
          var q = (window.QUIZZES || {})[s.id];
          var b = p.quizBest[s.id];
          return b && b.score === q.length;
        }).length;
        return (
          '<article class="card card-interactive" tabindex="0" role="link" data-topic="' +
          esc(t.id) +
          '">' +
          '<div class="topic-icon" aria-hidden="true">' +
          '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>' +
          "</div>" +
          "<h2>Topic " +
          esc(t.number) +
          ": " +
          esc(t.title) +
          "</h2>" +
          "<p>" +
          subs.length +
          " sub-topics · Notes read " +
          read +
          "/" +
          subs.length +
          " · Quizzes perfected " +
          qDone +
          "/" +
          qSubs.length +
          "</p>" +
          '<div class="bar-track"><div class="bar-fill" style="width:' +
          (subs.length ? Math.round((read / subs.length) * 100) : 0) +
          '%"></div></div>' +
          "</article>"
        );
      })
      .join("");

    return (
      shell(
        '<h1 class="page-title">Dashboard</h1>' +
          '<p class="page-sub">Unit 1 - Understanding Computer Science · Digital exam · 1h30 · 80 marks · 50%</p>' +
          '<section class="progress-overview">' +
          '<div class="card stat-card"><div class="label">Overall study mix</div><div class="value">' +
          overall +
          '%</div><div class="bar-track"><div class="bar-fill" style="width:' +
          overall +
          '%"></div></div></div>' +
          '<div class="card stat-card"><div class="label">Notes opened</div><div class="value">' +
          pctNotes(p) +
          '%</div><p style="font-size:0.8rem;color:var(--text-muted);margin:0">Open each sub-topic notes view to tick progress.</p></div>' +
          '<div class="card stat-card"><div class="label">Quiz mastery</div><div class="value">' +
          pctQuiz(p) +
          '%</div><p style="font-size:0.8rem;color:var(--text-muted);margin:0">Best scores averaged across available quizzes.</p></div>' +
          '<div class="card stat-card"><div class="label">Flashcards touched</div><div class="value">' +
          pctFlash(p) +
          '%</div><p style="font-size:0.8rem;color:var(--text-muted);margin:0">Flip cards to register familiarity.</p></div>' +
          "</section>" +
          '<h2 class="page-title" style="font-size:1.15rem;margin-top:0.5rem">Topics</h2>' +
          '<div class="grid-topics">' +
          cards +
          "</div>"
      )
    );
  }

  function findTopic(topicId) {
    var topics = window.TOPICS || [];
    for (var ti = 0; ti < topics.length; ti++) {
      if (topics[ti].id === topicId) return topics[ti];
    }
    return null;
  }

  function renderTopic(topicId, p) {
    var topic = findTopic(topicId);
    if (!topic) {
      return shell('<p class="empty-state">Topic not found.</p>');
    }
    var subs = (topic.subtopics || [])
      .map(function (s) {
        var q = (window.QUIZZES || {})[s.id];
        var qn = q && q.length ? q.length : 0;
        var best = p.quizBest[s.id];
        var fc = (s.flashcards || []).length;
        var seen = Math.min(fc, p.flashSeen[s.id] || 0);
        var noteDone = p.notesRead[s.id] ? "✓ Read" : "○ Open";
        return (
          '<article class="card">' +
          "<h3>" +
          esc(s.title) +
          "</h3>" +
          "<p>" +
          (qn ? qn + " quiz questions · " : "No quiz bank · ") +
          fc +
          " flashcards</p>" +
          '<div class="bar-track" title="Blended progress: notes, quiz, flashcards"><div class="bar-fill" style="width:' +
          Math.round(
            (((p.notesRead[s.id] ? 1 : 0) + (qn && best ? best.score / qn : 0) + (fc ? seen / fc : 0)) / 3) * 100
          ) +
          '%"></div></div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.75rem">' +
          '<button type="button" class="btn btn-primary btn-sm" data-notes="' +
          esc(s.id) +
          '">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' +
          ' Read Notes' +
          '</button>' +
          (qn
            ? '<button type="button" class="btn btn-ghost btn-sm" data-quiz="' + esc(s.id) + '">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>' +
            ' Take Quiz' +
            '</button>'
            : '<button type="button" class="btn btn-ghost btn-sm" disabled>Quiz</button>') +
          (fc
            ? '<button type="button" class="btn btn-ghost btn-sm" data-flash="' + esc(s.id) + '">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>' +
            ' Flashcards' +
            '</button>'
            : '<button type="button" class="btn btn-ghost btn-sm" disabled>Flashcards</button>') +
          '<span style="margin-left:auto;font-size:0.8rem;color:var(--text-muted);align-self:center">' +
          noteDone +
          "</span>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    return shell(
      '<nav class="breadcrumb"><a href="#/dashboard">Dashboard</a> / Topic ' +
        esc(topic.number) +
        "</nav>" +
        '<h1 class="page-title">' +
        esc(topic.icon + " Topic " + topic.number + ": " + topic.title) +
        "</h1>" +
        '<p class="page-sub">Pick a sub-topic to revise - legal, social, ethical, environmental, and professional impacts are integrated across Unit 1.</p>' +
        '<div class="grid-subtopics">' +
        subs +
        "</div>"
    );
  }

  function renderNotes(subId, p) {
    var hit = findSubtopic(subId);
    if (!hit) return shell('<p class="empty-state">Notes not found.</p>');
    p.notesRead[subId] = true;
    saveProgress(p);

    var html =
      '<nav class="breadcrumb"><a href="#/dashboard">Dashboard</a> / <a href="#/topic/' +
      esc(hit.topic.id) +
      '">Topic ' +
      esc(hit.topic.number) +
      '</a> / Notes</nav>' +
      '<h1 class="page-title">' +
      esc(hit.sub.title) +
      "</h1>" +
      '<p class="page-sub">' +
      esc(hit.topic.title) +
      "</p>" +
      '<div class="card"><div class="prose">' +
      hit.sub.notesHtml +
      "</div></div>" +
      '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1rem">' +
      '<button type="button" class="btn btn-ghost" data-back-topic="' +
      esc(hit.topic.id) +
      '">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path><path d="M9 18h6"></path></svg>' +
      ' Back to Topic' +
      '</button>' +
      ((window.QUIZZES || {})[subId] && (window.QUIZZES || {})[subId].length
        ? '<button type="button" class="btn btn-primary" data-quiz="' + esc(subId) + '">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>' +
        ' Take Quiz' +
        '</button>'
        : "") +
      ((hit.sub.flashcards || []).length
        ? '<button type="button" class="btn btn-primary" data-flash="' + esc(subId) + '">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>' +
        ' Flashcards' +
        '</button>'
        : "") +
      "</div>";

    return shell(html);
  }

  function renderQuiz(subId, p) {
    var hit = findSubtopic(subId);
    var questions = (window.QUIZZES || {})[subId] || [];
    if (!hit || !questions.length) {
      return shell('<p class="empty-state">No quiz for this sub-topic yet.</p>');
    }

    var savedState = loadQuizState();
    var useSaved = savedState && savedState.subId === subId;

    window.__quizState = {
      subId: subId,
      topicId: hit.topic.id,
      questions: questions,
      index: useSaved ? savedState.index : 0,
      score: useSaved ? savedState.score : 0,
      phase: "answer",
      streak: useSaved ? savedState.streak : 0,
      hearts: useSaved ? savedState.hearts : 5,
      xpSession: useSaved ? savedState.xpSession : 0,
      selectedMcq: null,
      multiSelect: [],
      tfPick: null,
      orderArr: null,
      answered: false,
      progress: p
    };

    var n = questions.length;
    return shellQuiz(
      '<div class="quiz-flow" id="quiz-flow">' +
        '<div class="quiz-flow-top">' +
        '<div class="quiz-duo-bar">' +
        '<div class="quiz-duo-track" aria-hidden="true"><div id="quiz-progress-fill" class="quiz-duo-fill" style="width:0%"></div></div>' +
        '<div class="quiz-duo-stats">' +
        '<span id="quiz-xp" class="quiz-chip">0 XP</span>' +
        '<span id="quiz-streak" class="quiz-chip quiz-chip--fire">🔥 0</span>' +
        '<span id="quiz-hearts" class="quiz-hearts" aria-label="Lives"></span>' +
        "</div>" +
        "</div>" +
        '<p class="quiz-subline"><span id="q-idx">1</span> / ' +
        n +
        " · " +
        esc(hit.sub.title) +
        "</p>" +
        "</div>" +
        '<div class="quiz-flow-stage">' +
        '<button type="button" class="quiz-icon-close" id="quiz-exit" aria-label="Close quiz">✕</button>' +
        '<div id="quiz-celebrate" class="quiz-celebrate" aria-hidden="true"></div>' +
        '<div class="quiz-mascot" id="quiz-mascot" aria-hidden="true">🦉</div>' +
        '<div id="quiz-card" class="quiz-duo-card"></div>' +
        '<div id="quiz-feedback" class="quiz-feedback quiz-feedback--slide" style="display:none" role="status"></div>' +
        "</div>" +
        '<footer class="quiz-flow-footer">' +
        '<button type="button" class="quiz-footer-btn" id="quiz-primary" disabled>CHECK</button>' +
        "</footer>" +
        "</div>"
    );
  }

  function inferQuizType(q) {
    if (q.type) return q.type;
    if (q.options && q.options.length) return "mcq";
    return "short";
  }

  function shuffleCopy(arr) {
    var a = (arr || []).slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function arraysEqualStrings(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (String(a[i]) !== String(b[i])) return false;
    }
    return true;
  }

  function checkOrderQuestion(q, state) {
    return arraysEqualStrings(state.orderArr, q.correctOrder);
  }

  function checkMatchQuestion(q, card) {
    var rows = q.prompts ? q.prompts.length : 0;
    for (var i = 0; i < rows; i++) {
      var sel = card.querySelector(".match-select[data-row=\"" + i + '"]');
      if (!sel) return false;
      var v = parseInt(sel.value, 10);
      if (isNaN(v) || v !== q.correct[i]) return false;
    }
    return true;
  }

  function buildOrderItemsHtml(items) {
    return (items || [])
      .map(function (label, idx) {
        return (
          '<li class="order-item" data-idx="' +
          idx +
          '">' +
          '<span class="order-label">' +
          esc(label) +
          "</span>" +
          '<span class="order-ctrls">' +
          '<button type="button" class="order-btn" data-order-up="' +
          idx +
          '" aria-label="Move up">↑</button>' +
          '<button type="button" class="order-btn" data-order-down="' +
          idx +
          '" aria-label="Move down">↓</button>' +
          "</span>" +
          "</li>"
        );
      })
      .join("");
  }

  function normalizeShortAnswer(s, q) {
    var mode = (q.normalize || "trim").toLowerCase();
    s = String(s == null ? "" : s).trim();
    if (mode === "lower") s = s.toLowerCase();
    s = s.replace(/\s+/g, "");
    return s;
  }

  function checkShortAnswer(q, raw) {
    var user = normalizeShortAnswer(raw, q);
    var alts = q.answers || (q.answer ? [q.answer] : []);
    for (var i = 0; i < alts.length; i++) {
      if (user === normalizeShortAnswer(alts[i], q)) return true;
    }
    if (q.acceptNumeric) {
      var n = parseInt(String(raw).trim(), 10);
      if (!isNaN(n)) {
        for (i = 0; i < alts.length; i++) {
          var m = parseInt(String(alts[i]).trim(), 10);
          if (!isNaN(m) && m === n) return true;
        }
      }
    }
    return false;
  }

  function readBitRow(root, sel, blankAsZero) {
    var els = root.querySelectorAll(sel);
    var s = "";
    for (var i = 0; i < els.length; i++) {
      var v = (els[i].value || "").trim();
      if (v === "") {
        if (blankAsZero) v = "0";
        else return null;
      }
      if (v !== "0" && v !== "1") return null;
      s += v;
    }
    return s;
  }

  function checkBinaryAdd(q, card) {
    var w = (q.a && q.a.length) || q.width || 8;
    var sumGot = readBitRow(card, '.bit-in[data-line="sum"]', false);
    var carGot = readBitRow(card, '.bit-in[data-line="carry"]', true);
    if (sumGot === null || carGot === null) return false;
    if (sumGot.length !== w || carGot.length !== w) return false;
    return sumGot === q.sum && carGot === q.carry;
  }

  function countKeywordHits(text, words) {
    var t = String(text || "").toLowerCase();
    var c = 0;
    for (var i = 0; i < words.length; i++) {
      if (t.indexOf(String(words[i]).toLowerCase()) !== -1) c++;
    }
    return c;
  }

  function checkBinaryShift(q, card) {
    var w = q.bits || (q.pattern && q.pattern.length) || 4;
    var bitsGot = readBitRow(card, '.bit-in[data-line="result"]', false);
    if (bitsGot === null || bitsGot.length !== w) return false;
    if (bitsGot !== q.resultBits) return false;
    var ta = $("#quiz-shift-explain", card);
    var minHits = typeof q.keywordsMin === "number" ? q.keywordsMin : 2;
    var hits = countKeywordHits(ta ? ta.value : "", q.keywords || []);
    return hits >= minHits;
  }

  function renderBitRow(label, bits, editable, lineAttr) {
    var w = bits ? bits.length : lineAttr ? lineAttr.w : 8;
    var cells = "";
    for (var i = 0; i < w; i++) {
      if (editable) {
        cells +=
          '<input type="text" inputmode="numeric" class="bit-in" data-line="' +
          esc(lineAttr.name) +
          '" maxlength="1" aria-label="' +
          esc(label + " bit " + (i + 1)) +
          '" />';
      } else {
        cells += '<span class="bit-out">' + esc(bits.charAt(i)) + "</span>";
      }
    }
    return (
      '<div class="bit-row">' +
      '<span class="bit-label">' +
      esc(label) +
      "</span>" +
      '<div class="bit-cells">' +
      cells +
      "</div>" +
      "</div>"
    );
  }

  function buildQuizMarkup(state) {
    var q = state.questions[state.index];
    var qt = inferQuizType(q);

    if (qt === "mcq") {
      var tileClass = q.tiles === false ? "" : " quiz-options--tiles";
      var opts = (q.options || []).map(function (opt, i) {
        return (
          '<button type="button" class="quiz-option quiz-option--pick" data-opt="' +
          i +
          '">' +
          esc(opt) +
          "</button>"
        );
      });
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        '<div class="quiz-options' +
        tileClass +
        '">' +
        opts.join("") +
        "</div>"
      );
    }

    if (qt === "multiSelect") {
      var tileClass = q.tiles === false ? "" : " quiz-options--tiles";
      var opts = (q.options || []).map(function (opt, i) {
        return (
          '<button type="button" class="quiz-option quiz-option--pick" data-multiopt="' +
          i +
          '">' +
          esc(opt) +
          "</button>"
        );
      });
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        '<p class="quiz-hint">Select all that apply.</p>' +
        '<div class="quiz-options' +
        tileClass +
        '">' +
        opts.join("") +
        "</div>"
      );
    }

    if (qt === "tf") {
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        '<div class="quiz-tf-row">' +
        '<button type="button" class="quiz-tf-btn" data-tf="true">TRUE</button>' +
        '<button type="button" class="quiz-tf-btn" data-tf="false">FALSE</button>' +
        "</div>"
      );
    }

    if (qt === "fillBlank") {
      return (
        '<p class="quiz-duo-prompt quiz-duo-prompt--inline">' +
        esc(q.before || "") +
        '<input type="text" id="quiz-blank-input" class="quiz-blank-input" autocomplete="off" spellcheck="false" />' +
        esc(q.after || "") +
        "</p>" +
        (q.hint ? '<p class="quiz-hint">' + esc(q.hint) + "</p>" : "")
      );
    }

    if (qt === "order") {
      var items = state.orderArr || [];
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        '<p class="quiz-hint">Tap arrows until the list matches the usual sequence.</p>' +
        '<ol class="order-list" id="order-list">' +
        buildOrderItemsHtml(items) +
        "</ol>"
      );
    }

    if (qt === "match") {
      var choices = q.choices || [];
      var optsHtml = choices
        .map(function (c, ci) {
          return '<option value="' + ci + '">' + esc(c) + "</option>";
        })
        .join("");
      var rows = (q.prompts || [])
        .map(function (p, ri) {
          return (
            '<div class="match-row">' +
            '<span class="match-prompt">' +
            esc(p) +
            "</span>" +
            '<select class="match-select" data-row="' +
            ri +
            '" aria-label="Match for ' +
            esc(p) +
            '">' +
            '<option value="-1">Choose…</option>' +
            optsHtml +
            "</select>" +
            "</div>"
          );
        })
        .join("");
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        '<div class="match-block">' +
        rows +
        "</div>"
      );
    }

    if (qt === "short") {
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        (q.hint ? '<p class="quiz-hint">' + esc(q.hint) + "</p>" : "") +
        '<label class="visually-hidden" for="quiz-short-input">' +
        esc(q.inputLabel || "Your answer") +
        "</label>" +
        '<input type="text" id="quiz-short-input" class="quiz-text-input quiz-text-input--wide" autocomplete="off" />'
      );
    }

    if (qt === "binaryAdd") {
      var wa = q.a || "";
      var wb = q.b || "";
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        '<p class="quiz-hint">Only 0 or 1 in sum cells. Empty carry cells count as 0.</p>' +
        '<div class="binary-workspace">' +
        renderBitRow("A", wa, false) +
        renderBitRow("B", wb, false) +
        renderBitRow("Sum", null, true, { name: "sum", w: wa.length }) +
        renderBitRow("Carry", null, true, { name: "carry", w: wa.length }) +
        "</div>"
      );
    }

    if (qt === "binaryShift") {
      var pat = q.pattern || "0000";
      var bw = q.bits || pat.length;
      var op =
        q.shift === "asr"
          ? "arithmetic shift right"
          : q.shift === "lsl"
            ? "logical shift left"
            : q.shift === "lsr"
              ? "logical shift right"
              : "shift";
      return (
        '<p class="quiz-duo-prompt">' +
        esc(q.q) +
        "</p>" +
        '<p class="quiz-hint">' +
        esc("One " + op + " on this " + bw + "-bit pattern.") +
        "</p>" +
        '<div class="shift-row"><span class="quiz-hint">Pattern</span> <span class="shift-pattern">' +
        esc(pat) +
        "</span></div>" +
        renderBitRow("Result", null, true, { name: "result", w: bw }) +
        '<label class="quiz-hint" for="quiz-shift-explain">' +
        esc(q.explainLabel || "What changes about the value?") +
        "</label>" +
        '<textarea id="quiz-shift-explain" class="quiz-textarea" rows="3"></textarea>' +
        (q.keywordHint
          ? '<p class="quiz-hint">' + esc(q.keywordHint) + "</p>"
          : '<p class="quiz-hint">Use two+ keywords from your notes (e.g. halve, LSB, sign).</p>')
      );
    }

    return (
      '<p class="quiz-duo-prompt">' +
      esc(q.q) +
      "</p>" +
      '<p class="quiz-hint">Unsupported question format.</p>'
    );
  }

  function renderFlash(subId, p) {
    var hit = findSubtopic(subId);
    var cards = (hit && hit.sub.flashcards) || [];
    if (!hit || !cards.length) {
      return shell('<p class="empty-state">No flashcards for this sub-topic.</p>');
    }

    window.__flashState = {
      subId: subId,
      topicId: hit.topic.id,
      cards: cards,
      index: 0,
      flipped: false,
      progress: p
    };

    var html =
      '<nav class="breadcrumb"><a href="#/dashboard">Dashboard</a> / <a href="#/topic/' +
      esc(hit.topic.id) +
      '">Topic ' +
      esc(hit.topic.number) +
      '</a> / Flashcards</nav>' +
      '<h1 class="page-title">Flashcards · ' +
      esc(hit.sub.title) +
      "</h1>" +
      '<p class="page-sub">Tap the card to flip. Use buttons to navigate.</p>' +
      '<div class="flash-progress" id="flash-progress"></div>' +
      '<div class="flash-stage"><div class="flash-card" id="flash-card" role="button" tabindex="0" aria-label="Flip card">' +
      '<div class="flash-face front" id="flash-front"></div>' +
      '<div class="flash-face back" id="flash-back"></div>' +
      "</div></div>" +
      '<div class="flash-controls">' +
      '<button type="button" class="btn btn-ghost btn-sm" id="flash-prev">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>' +
      ' Previous' +
      '</button>' +
      '<button type="button" class="btn btn-primary btn-sm" id="flash-flip">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path></svg>' +
      ' Flip Card' +
      '</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" id="flash-next">' +
      'Next ' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>' +
      '</button>' +
      "</div>" +
      '<p style="text-align:center;font-size:0.85rem;color:var(--text-muted);margin-top:0.75rem">Tip: recall the definition aloud before flipping.</p>' +
      '<div style="margin-top:1rem"><button type="button" class="btn btn-ghost" id="flash-exit">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path><path d="M9 18h6"></path></svg>' +
      ' Back to Topic' +
      '</button></div>';

    return shell(html);
  }

  function render() {
    var p = loadProgress();
    var route = parseRoute();
    var html = "";

    if (route.name === "topic" && route.topicId) {
      html = renderTopic(route.topicId, p);
    } else if (route.name === "notes" && route.subId) {
      html = renderNotes(route.subId, p);
    } else if (route.name === "quiz" && route.subId) {
      html = renderQuiz(route.subId, p);
    } else if (route.name === "flash" && route.subId) {
      html = renderFlash(route.subId, p);
    } else {
      html = renderDashboard(p);
    }

    var app = $("#app");
    app.innerHTML = html;
    app.classList.toggle("app--quiz", route.name === "quiz");

    bindChrome();
    if (route.name === "quiz" && route.subId && window.__quizState) {
      bindQuiz();
    }
    if (route.name === "flash" && route.subId && window.__flashState) {
      bindFlash();
    }

    requestAnimationFrame(function () {
      app.querySelectorAll(".bar-fill").forEach(function (el) {
        var w = el.style.width;
        el.style.width = "0%";
        requestAnimationFrame(function () {
          el.style.width = w;
        });
      });
    });
  }

  var __chromeBound = false;

  function bindChrome() {
    var dash = $("#btn-dash");
    if (dash) {
      dash.onclick = function () {
        nav("#/dashboard");
      };
    }

    var themeToggle = $("#theme-toggle");
    if (themeToggle) {
      themeToggle.onclick = toggleTheme;
    }

    var input = $("#global-search");
    var results = $("#search-results");
    if (!input || !results) return;

    function closeResults() {
      results.classList.remove("is-open");
      results.innerHTML = "";
    }

    function openResults() {
      results.classList.add("is-open");
    }

    function runSearch(q) {
      q = (q || "").trim().toLowerCase();
      if (!q) {
        closeResults();
        return;
      }
      var items = [];
      flattenSubtopics().forEach(function (x) {
        var blob =
          (x.topic.title + " " + x.sub.title + " " + stripHtml(x.sub.notesHtml)).toLowerCase();
        (x.sub.flashcards || []).forEach(function (f) {
          blob += " " + String(f.term + " " + f.definition).toLowerCase();
        });
        if (blob.indexOf(q) !== -1) {
          items.push(x);
        }
      });
      if (!items.length) {
        results.innerHTML = '<button type="button" disabled>No matches</button>';
        openResults();
        return;
      }
      results.innerHTML = items
        .slice(0, 24)
        .map(function (x) {
          return (
            '<button type="button" data-goto-notes="' +
            esc(x.sub.id) +
            '"><strong>' +
            esc(x.sub.title) +
            '</strong><span class="meta">Topic ' +
            esc(x.topic.number) +
            " · " +
            esc(x.topic.title) +
            "</span></button>"
          );
        })
        .join("");
      openResults();
    }

    input.oninput = function () {
      clearTimeout(input._s);
      input._s = setTimeout(function () {
        runSearch(input.value);
      }, 160);
    };
    input.onfocus = function () {
      if (input.value.trim()) runSearch(input.value);
    };

    if (!__chromeBound) {
      __chromeBound = true;
      document.addEventListener("click", function (e) {
        var sr = $("#search-results");
        var si = $("#global-search");
        if (sr && si && !sr.contains(e.target) && e.target !== si) {
          sr.classList.remove("is-open");
        }
      });
      document.addEventListener("click", function (e) {
        var btn = e.target.closest && e.target.closest("button[data-goto-notes]");
        if (!btn) return;
        nav("#/notes/" + btn.getAttribute("data-goto-notes"));
        var sr = $("#search-results");
        if (sr) {
          sr.classList.remove("is-open");
          sr.innerHTML = "";
        }
      });
      $("#app").addEventListener("click", function (e) {
        var topicCard = e.target.closest && e.target.closest("[data-topic]");
        if (topicCard) {
          nav("#/topic/" + topicCard.getAttribute("data-topic"));
          return;
        }
        var notesBtn = e.target.closest && e.target.closest("[data-notes]");
        if (notesBtn) {
          nav("#/notes/" + notesBtn.getAttribute("data-notes"));
          return;
        }
        var quizBtn = e.target.closest && e.target.closest("[data-quiz]");
        if (quizBtn) {
          nav("#/quiz/" + quizBtn.getAttribute("data-quiz"));
          return;
        }
        var flashBtn = e.target.closest && e.target.closest("[data-flash]");
        if (flashBtn) {
          nav("#/flash/" + flashBtn.getAttribute("data-flash"));
          return;
        }
        var back = e.target.closest && e.target.closest("[data-back-topic]");
        if (back) {
          nav("#/topic/" + back.getAttribute("data-back-topic"));
        }
      });
    }
  }

  function checkFillBlank(q, card) {
    var inp = $("#quiz-blank-input", card);
    return checkShortAnswer(
      { answers: q.answers, normalize: q.normalize || "lower", acceptNumeric: q.acceptNumeric },
      inp ? inp.value : ""
    );
  }

  function renderQuizHearts(n) {
    var filled = Math.max(0, Math.min(5, n));
    var s = "";
    for (var i = 0; i < 5; i++) {
      s += i < filled ? '<span class="heart heart--on">♥</span>' : '<span class="heart">♡</span>';
    }
    return s;
  }

  function bindQuiz() {
    var state = window.__quizState;
    var card = $("#quiz-card");
    var flow = card ? card.closest(".quiz-flow") : $("#quiz-flow");
    var feedback = $("#quiz-feedback");
    var primary = $("#quiz-primary");
    var idxEl = $("#q-idx");
    var progFill = $("#quiz-progress-fill");
    var streakEl = $("#quiz-streak");
    var xpEl = $("#quiz-xp");
    var heartsEl = $("#quiz-hearts");
    var mascot = $("#quiz-mascot");
    var celebrate = $("#quiz-celebrate");
    var footer = flow ? flow.querySelector(".quiz-flow-footer") : document.querySelector(".quiz-flow-footer");
    var quizCardDelegated = false;

    function updateHud() {
      var total = state.questions.length;
      var pct = total ? Math.round(((state.index + 1) / total) * 100) : 0;
      if (progFill) progFill.style.width = pct + "%";
      if (idxEl) idxEl.textContent = String(state.index + 1);
      if (streakEl) streakEl.textContent = state.streak + " streak";
      if (xpEl) xpEl.textContent = state.xpSession + " XP";
      if (heartsEl) heartsEl.innerHTML = renderQuizHearts(state.hearts);
    }

    function setMascot(mode) {
      if (!mascot) return;
      if (mode === "ok") mascot.textContent = "✓";
      else if (mode === "bad") mascot.textContent = "×";
      else mascot.textContent = "";
    }

    function pulseCelebrate(ok) {
      if (!celebrate) return;
      celebrate.textContent = ok ? "Nice!" : "Keep going!";
      celebrate.classList.add("quiz-celebrate--show", ok ? "quiz-celebrate--ok" : "quiz-celebrate--bad");
      setTimeout(function () {
        celebrate.classList.remove("quiz-celebrate--show", "quiz-celebrate--ok", "quiz-celebrate--bad");
      }, 900);
    }

    function updatePrimaryEnabled() {
      if (!primary) return;
      if (state.phase === "feedback") {
        primary.disabled = false;
        primary.textContent = "→ CONTINUE";
        primary.classList.add("quiz-footer-btn--continue");
        return;
      }
      primary.textContent = "✓ CHECK ANSWER";
      primary.classList.remove("quiz-footer-btn--continue");
      var q = state.questions[state.index];
      var qt = inferQuizType(q);
      var en = true;
      if (qt === "mcq") en = state.selectedMcq !== null;
      else if (qt === "multiSelect") en = state.multiSelect.length > 0;
      else if (qt === "tf") en = state.tfPick !== null;
      else if (qt === "short") {
        var si = $("#quiz-short-input", card);
        en = !!(si && si.value.trim());
      } else if (qt === "fillBlank") {
        var bi = $("#quiz-blank-input", card);
        en = !!(bi && bi.value.trim());
      } else if (qt === "match") {
        en = true;
        var rows = q.prompts ? q.prompts.length : 0;
        for (var i = 0; i < rows; i++) {
          var sel = card.querySelector(".match-select[data-row=\"" + i + '"]');
          if (!sel || parseInt(sel.value, 10) < 0) {
            en = false;
            break;
          }
        }
      } else if (qt === "binaryAdd" || qt === "binaryShift" || qt === "order") {
        en = true;
      }
      primary.disabled = !en;
    }

    function syncOrderList() {
      var ol = $("#order-list");
      if (ol && state.orderArr) ol.innerHTML = buildOrderItemsHtml(state.orderArr);
    }

    function runValidation() {
      var q = state.questions[state.index];
      var qt = inferQuizType(q);
      var ok = false;
      if (qt === "mcq") {
        ok = state.selectedMcq === q.correct;
      } else if (qt === "multiSelect") {
        var correctArr = q.correct || [];
        var selectedArr = state.multiSelect || [];
        if (correctArr.length === selectedArr.length) {
          ok = correctArr.every(function (val) {
            return selectedArr.indexOf(val) !== -1;
          });
        }
      } else if (qt === "tf") {
        ok = state.tfPick === q.correct;
      } else if (qt === "short") {
        var inp = $("#quiz-short-input", card);
        ok = checkShortAnswer(q, inp ? inp.value : "");
      } else if (qt === "fillBlank") {
        ok = checkFillBlank(q, card);
      } else if (qt === "binaryAdd") {
        ok = checkBinaryAdd(q, card);
      } else if (qt === "binaryShift") {
        ok = checkBinaryShift(q, card);
      } else if (qt === "order") {
        ok = checkOrderQuestion(q, state);
      } else if (qt === "match") {
        ok = checkMatchQuestion(q, card);
      }
      return ok;
    }

    function buildWrongMessage(ok) {
      if (ok) return state.questions[state.index].explain || "Great work!";
      var q = state.questions[state.index];
      var qt = inferQuizType(q);
      var msg = "";
      
      if (qt === "mcq") {
        msg += "<strong>Correct answer:</strong> " + (q.options[q.correct] || "") + "";
      } else if (qt === "tf") {
        msg += "<strong>Correct answer:</strong> " + (q.correct ? "TRUE" : "FALSE") + "";
      } else if (qt === "short") {
        var answers = q.answers || (q.answer ? [q.answer] : []);
        msg += "<strong>Correct answer" + (answers.length > 1 ? "s" : "") + ":</strong> " + answers.join(", ") + "";
      } else if (qt === "fillBlank") {
        var answers = q.answers || (q.answer ? [q.answer] : []);
        msg += "<strong>Correct word" + (answers.length > 1 ? "s" : "") + ":</strong> " + answers.join(", ") + "";
      } else if (qt === "binaryShift") {
        var res = readBitRow(card, '.bit-in[data-line="result"]', false);
        var ta = $("#quiz-shift-explain", card);
        var minHits = typeof q.keywordsMin === "number" ? q.keywordsMin : 2;
        var hits = countKeywordHits(ta ? ta.value : "", q.keywords || []);
        msg += "<strong>Correct result:</strong> " + q.resultBits + "";
        if (res === null) msg += "<br><em>Enter only 0 or 1 in every result cell.</em>";
        else if (res !== q.resultBits) msg += "<br><em>Your result was: " + res + "</em>";
        else if (hits < minHits) msg += "<br><em>Bits are right - say more about the effect (halve / multiply, LSB lost, sign).</em>";
      } else if (qt === "binaryAdd") {
        msg += "<strong>Correct sum:</strong> " + q.sum + "<br><strong>Correct carry:</strong> " + q.carry + " (MSB left; empty carry = 0)";
      } else if (qt === "order") {
        msg += "<strong>Correct order:</strong><br>" + (q.correctOrder || []).join("<br>↓ ");
      } else if (qt === "match") {
        msg += "Check your matches against the correct pairings. ";
      }
      
      if (q.explain) msg += "<br><br>" + q.explain;
      return msg.trim();
    }

    function addHintSection(q) {
      var hit = findSubtopic(state.subId);
      if (!hit || !hit.sub.notesHtml) return;
      
      // Extract a relevant hint from the notes
      var notesHtml = hit.sub.notesHtml;
      var hintText = "";
      
      // Extract first paragraph or key concept from notes
      var tempDiv = document.createElement("div");
      tempDiv.innerHTML = notesHtml;
      var firstP = tempDiv.querySelector("p");
      if (firstP) {
        hintText = firstP.textContent.trim();
      } else {
        hintText = tempDiv.textContent.trim().substring(0, 200) + "...";
      }
      
      if (!hintText) return;
      
      var hintSection = document.createElement("div");
      hintSection.className = "quiz-hint-section";
      hintSection.innerHTML = "<h4>Key Concept</h4><p>" + hintText.substring(0, 150) + "...</p>";
      
      // Insert after feedback
      if (feedback && feedback.parentNode) {
        feedback.parentNode.insertBefore(hintSection, feedback.nextSibling);
      }
    }

    function applyFeedback(ok) {
      var q = state.questions[state.index];
      var qt = inferQuizType(q);
      state.phase = "feedback";
      state.answered = true;
      feedback.style.display = "block";
      feedback.innerHTML = buildWrongMessage(ok);
      feedback.classList.toggle("is-correct", ok);
      feedback.classList.toggle("is-wrong", !ok);
      card.classList.toggle("quiz-duo-card--shake", !ok);
      card.classList.toggle("quiz-duo-card--pop", ok);
      setMascot(ok ? "ok" : "bad");
      pulseCelebrate(ok);
      
      // Add hint section when wrong
      if (!ok) {
        addHintSection(q);
      }
      
      // Remove existing hint section when showing new question
      var existingHint = card.querySelector(".quiz-hint-section");
      if (existingHint) {
        existingHint.remove();
      }
      if (qt === "mcq") {
        card.querySelectorAll(".quiz-option--pick").forEach(function (b, bi) {
          b.disabled = true;
          if (bi === q.correct) {
            b.classList.add("correct");
            b.innerHTML = "✓ " + b.innerHTML;
          }
          else if (state.selectedMcq === bi) {
            b.classList.add("wrong");
            b.innerHTML = "✗ " + b.innerHTML;
          }
        });
      } else if (qt === "multiSelect") {
        card.querySelectorAll(".quiz-option--pick").forEach(function (b, bi) {
          b.disabled = true;
          var isCorrect = (q.correct || []).indexOf(bi) !== -1;
          var isSelected = (state.multiSelect || []).indexOf(bi) !== -1;
          if (isCorrect) {
            b.classList.add("correct");
            b.innerHTML = "✓ " + b.innerHTML;
          } else if (isSelected) {
            b.classList.add("wrong");
            b.innerHTML = "✗ " + b.innerHTML;
          }
        });
      } else if (qt === "tf") {
        card.querySelectorAll(".quiz-tf-btn").forEach(function (b) {
          b.disabled = true;
          var v = b.getAttribute("data-tf") === "true";
          if (v === q.correct) {
            b.classList.add("correct");
            b.innerHTML = "✓ " + b.innerHTML;
          }
          else if (v === state.tfPick && !ok) {
            b.classList.add("wrong");
            b.innerHTML = "✗ " + b.innerHTML;
          }
        });
      } else if (qt === "short" || qt === "fillBlank") {
        var inp = qt === "short" ? $("#quiz-short-input", card) : $("#quiz-blank-input", card);
        if (inp && !ok) {
          inp.style.borderColor = "var(--danger)";
          inp.style.backgroundColor = "#fee2e2";
        }
      }
      lockInputs();
      if (ok) {
        state.streak++;
        state.xpSession += 10 + Math.min(state.streak, 6) * 2;
        state.score++;
      } else {
        state.streak = 0;
        state.hearts = Math.max(0, state.hearts - 1);
      }
      updateHud();
      updatePrimaryEnabled();
    }

    function lockInputs() {
      card.querySelectorAll(".quiz-option, .quiz-tf-btn, .match-select, .bit-in, input, textarea, .order-btn").forEach(function (el) {
        el.disabled = true;
      });
    }

    function runCheck() {
      if (state.phase !== "answer") return;
      var ok = runValidation();
      applyFeedback(ok);
      setTimeout(function () {
        card.classList.remove("quiz-duo-card--shake", "quiz-duo-card--pop");
      }, 500);
    }

    function goContinue() {
      if (state.index + 1 >= state.questions.length) {
        var total = state.questions.length;
        var prev = state.progress.quizBest[state.subId];
        if (!prev || state.score > prev.score) {
          state.progress.quizBest[state.subId] = {
            score: state.score,
            total: total,
            at: Date.now()
          };
        }
        saveProgress(state.progress);
        clearQuizState();
        if (footer) footer.style.display = "none";
        if (primary) primary.style.display = "none";
        if (feedback) feedback.style.display = "none";
        setMascot("ok");
        if (mascot) mascot.textContent = "✓";
        if (celebrate) {
          celebrate.textContent = "Lesson complete!";
          celebrate.classList.add("quiz-celebrate--show", "quiz-celebrate--ok");
        }
        card.innerHTML =
          '<div class="quiz-complete">' +
          "<h2>Lesson complete</h2>" +
          "<p>You scored <strong>" +
          state.score +
          "</strong> / " +
          total +
          ".</p>" +
          "<p class=\"quiz-complete-xp\">+" +
          state.xpSession +
          " XP this run</p>" +
          '<button type="button" class="quiz-footer-btn quiz-footer-btn--solo" id="quiz-finish">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path><path d="M9 18h6"></path></svg>' +
          ' Back to Topic' +
          '</button>' +
          "</div>";
        $("#quiz-finish").addEventListener("click", function () {
          nav("#/topic/" + state.topicId);
        });
        if (progFill) progFill.style.width = "100%";
        return;
      }
      state.index++;
      state.phase = "answer";
      state.selectedMcq = null;
      state.multiSelect = [];
      state.tfPick = null;
      state.orderArr = null;
      saveQuizState(state);
      showQuestion();
    }

    function showQuestion() {
      state.phase = "answer";
      state.answered = false;
      state.selectedMcq = null;
      state.multiSelect = [];
      state.tfPick = null;
      var q = state.questions[state.index];
      var qt = inferQuizType(q);
      if (qt === "order") {
        state.orderArr = shuffleCopy(q.items || []);
        var guard = 0;
        while (arraysEqualStrings(state.orderArr, q.correctOrder) && guard++ < 12) {
          state.orderArr = shuffleCopy(q.items || []);
        }
      } else {
        state.orderArr = null;
      }
      card.innerHTML = buildQuizMarkup(state);
      feedback.style.display = "none";
      feedback.textContent = "";
      feedback.classList.remove("is-correct", "is-wrong");
      setMascot("neutral");
      updateHud();
      updatePrimaryEnabled();
      var si = $("#quiz-short-input", card);
      if (si) {
        si.addEventListener("input", updatePrimaryEnabled);
        si.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && state.phase === "answer" && !primary.disabled) runCheck();
        });
      }
      var bi = $("#quiz-blank-input", card);
      if (bi) {
        bi.addEventListener("input", updatePrimaryEnabled);
        bi.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && state.phase === "answer" && !primary.disabled) runCheck();
        });
      }
      card.querySelectorAll(".match-select").forEach(function (sel) {
        sel.addEventListener("change", updatePrimaryEnabled);
      });
      card.querySelectorAll(".bit-in").forEach(function (inp) {
        inp.addEventListener("input", updatePrimaryEnabled);
      });
      var ta = $("#quiz-shift-explain", card);
      if (ta) ta.addEventListener("input", updatePrimaryEnabled);
    }

    $("#quiz-exit").addEventListener("click", function () {
      clearQuizState();
      nav("#/topic/" + state.topicId);
    });

    if (primary) {
      primary.addEventListener("click", function () {
        if (state.phase === "feedback") {
          goContinue();
          return;
        }
        runCheck();
      });
    }

    if (!quizCardDelegated) {
      quizCardDelegated = true;
      card.addEventListener("click", function (e) {
        if (state.phase !== "answer") return;
        var q = state.questions[state.index];
        var qt = inferQuizType(q);
        var up = e.target.closest && e.target.closest("[data-order-up]");
        var dn = e.target.closest && e.target.closest("[data-order-down]");
        if (up && qt === "order") {
          var ui = parseInt(up.getAttribute("data-order-up"), 10);
          if (ui > 0 && state.orderArr) {
            var tu = state.orderArr[ui - 1];
            state.orderArr[ui - 1] = state.orderArr[ui];
            state.orderArr[ui] = tu;
            syncOrderList();
          }
          return;
        }
        if (dn && qt === "order") {
          var di = parseInt(dn.getAttribute("data-order-down"), 10);
          if (state.orderArr && di < state.orderArr.length - 1) {
            var td = state.orderArr[di + 1];
            state.orderArr[di + 1] = state.orderArr[di];
            state.orderArr[di] = td;
            syncOrderList();
          }
          return;
        }
        var opt = e.target.closest && e.target.closest(".quiz-option--pick");
        if (opt && qt === "mcq") {
          var oi = parseInt(opt.getAttribute("data-opt"), 10);
          state.selectedMcq = oi;
          card.querySelectorAll(".quiz-option--pick").forEach(function (b) {
            b.classList.remove("quiz-option--picked");
          });
          opt.classList.add("quiz-option--picked");
          updatePrimaryEnabled();
          return;
        }
        if (opt && qt === "multiSelect") {
          var mi = parseInt(opt.getAttribute("data-multiopt"), 10);
          var idx = state.multiSelect.indexOf(mi);
          if (idx === -1) {
            state.multiSelect.push(mi);
            opt.classList.add("quiz-option--picked");
          } else {
            state.multiSelect.splice(idx, 1);
            opt.classList.remove("quiz-option--picked");
          }
          updatePrimaryEnabled();
          return;
        }
        var tf = e.target.closest && e.target.closest(".quiz-tf-btn");
        if (tf && qt === "tf") {
          state.tfPick = tf.getAttribute("data-tf") === "true";
          card.querySelectorAll(".quiz-tf-btn").forEach(function (b) {
            b.classList.remove("quiz-tf-btn--picked");
          });
          tf.classList.add("quiz-tf-btn--picked");
          updatePrimaryEnabled();
        }
      });
    }

    showQuestion();
  }

  function bindFlash() {
    var state = window.__flashState;
    var cardEl = $("#flash-card");
    var front = $("#flash-front");
    var back = $("#flash-back");
    var prog = $("#flash-progress");

    function updateCard() {
      var c = state.cards[state.index];
      front.textContent = c.term;
      back.textContent = c.definition;
      cardEl.classList.toggle("is-flipped", state.flipped);
      prog.textContent = "Card " + (state.index + 1) + " / " + state.cards.length;
    }

    function bumpSeen() {
      var cur = state.progress.flashSeen[state.subId] || 0;
      state.progress.flashSeen[state.subId] = Math.max(cur, state.index + 1);
      saveProgress(state.progress);
    }

    function flip() {
      state.flipped = !state.flipped;
      if (state.flipped) bumpSeen();
      updateCard();
    }

    cardEl.addEventListener("click", flip);
    cardEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flip();
      }
    });
    $("#flash-flip").addEventListener("click", function (e) {
      e.stopPropagation();
      flip();
    });
    $("#flash-prev").addEventListener("click", function (e) {
      e.stopPropagation();
      state.index = (state.index - 1 + state.cards.length) % state.cards.length;
      state.flipped = false;
      updateCard();
    });
    $("#flash-next").addEventListener("click", function (e) {
      e.stopPropagation();
      state.index = (state.index + 1) % state.cards.length;
      state.flipped = false;
      updateCard();
    });
    $("#flash-exit").addEventListener("click", function () {
      nav("#/topic/" + state.topicId);
    });

    updateCard();
  }

  window.addEventListener("hashchange", render);
  if (!location.hash) location.hash = "#/dashboard";
  initTheme();
  render();
})();