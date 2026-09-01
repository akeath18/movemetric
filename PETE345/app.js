(function () {
  const DATA = window.PETE345_DATA;
  const STORAGE_KEY = "movemetric-pete345-course-v1";
  const app = document.getElementById("app");

  const blank = () => ({
    studentName: "",
    pretestStarted: false,
    pretestFinished: false,
    pretestIndex: 0,
    pretestAnswers: {},
    confidence: {},
    modules: {},
    startedAt: null,
    lastVisit: null
  });

  let state = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved ? Object.assign(blank(), saved) : blank();
    } catch (_) {
      return blank();
    }
  }

  function save() {
    state.lastVisit = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function moduleState(id) {
    if (!state.modules[id]) state.modules[id] = { lessons: {}, labs: {}, gate: { answers: {}, attempts: 0, submitted: false, score: 0, passed: false } };
    return state.modules[id];
  }

  function scores() {
    return DATA.modules.map(module => {
      const items = DATA.pretest.filter(q => q.m === module.id);
      const correct = items.filter(q => state.pretestAnswers[q.id] === q.a).length;
      return { id: module.id, correct, total: 3, percent: Math.round(correct / 3 * 100) };
    });
  }

  function prescription(id) {
    const score = scores().find(s => s.id === id)?.correct || 0;
    if (score === 3) return { key: "accelerated", label: "Gate first", detail: "Pretest indicates readiness. Attempt the competency gate now; use the lecture and lab if needed." };
    if (score === 2) return { key: "targeted", label: "Targeted review", detail: "Complete the lecture and lab, concentrating on the missed concept, before the competency gate." };
    return { key: "required", label: "Complete module", detail: "Build the full foundation through the lecture, application, lab, and competency gate." };
  }

  function moduleComplete(id) {
    return !!moduleState(id).gate.passed;
  }

  function lessonComplete(module) {
    const ms = moduleState(module.id);
    return module.lessons.every((_, index) => ms.lessons[index]);
  }

  function labsComplete(module) {
    const ms = moduleState(module.id);
    return module.labs.every((_, index) => ms.labs[index]?.done);
  }

  function gateOpen(module) {
    return prescription(module.id).key === "accelerated" || (lessonComplete(module) && labsComplete(module));
  }

  function courseProgress() {
    return DATA.modules.filter(m => moduleComplete(m.id)).length;
  }

  function go(hash) {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function header(active) {
    const progress = courseProgress();
    return `
      <header class="topbar">
        <a class="mm-brand" href="https://movemetric.org" aria-label="MoveMetric home"><span class="mm-dot"></span><span>move<b>metric</b></span></a>
        <div class="course-wordmark"><span>PETE 345</span><strong>Movement Learning Lab</strong></div>
        <nav aria-label="Course navigation">
          <a class="${active === "home" ? "active" : ""}" href="#/home">Course</a>
          <a class="${active === "pretest" ? "active" : ""}" href="#/pretest">Pretest</a>
          <a class="${active === "path" ? "active" : ""}" href="#/path">My path</a>
        </nav>
        <div class="header-progress" title="Modules mastered"><span>${progress}/10</span><i><b style="width:${progress * 10}%"></b></i></div>
      </header>`;
  }

  function home() {
    const answered = Object.keys(state.pretestAnswers).length;
    const primary = state.pretestFinished ? { label: "Open my learning path", hash: "#/path" } : state.pretestStarted ? { label: `Continue pretest (${answered}/30)`, hash: "#/pretest" } : { label: "Start the baseline pretest", hash: "#/pretest" };
    return `${header("home")}
      <main>
        <section class="course-hero">
          <div class="hero-grid-lines" aria-hidden="true"></div>
          <div class="hero-copy">
            <div class="eyebrow"><span>Self-paced course</span><i></i><span>Competency based</span></div>
            <h1>Learn to see<br><em>movement differently.</em></h1>
            <p>${esc(DATA.course.throughline)}</p>
            <label class="student-name"><span>Your name (optional)</span><input data-student-name value="${esc(state.studentName)}" placeholder="Enter your name" autocomplete="name"></label>
            <div class="hero-actions">
              <button class="button primary" data-go="${primary.hash}">${primary.label}<span>→</span></button>
              <a class="button ghost" href="#course-map">Explore the modules</a>
            </div>
            <div class="hero-facts"><div><strong>10</strong><span>learning modules</span></div><div><strong>16</strong><span>guided lectures</span></div><div><strong>80%</strong><span>mastery threshold</span></div></div>
          </div>
          <div class="hero-system" aria-label="Course reasoning system">
            <div class="system-label">Your reasoning loop</div>
            ${["Observe","Explain","Decide","Verify"].map((word, i) => `<div class="system-step s${i + 1}"><span>0${i + 1}</span><strong>${word}</strong></div>`).join("")}
            <div class="system-core"><span>PETE</span><strong>345</strong><small>MOVE → LEARN → APPLY</small></div>
          </div>
        </section>

        <section class="orientation">
          <div class="orientation-intro"><span class="section-label">How the course adapts</span><h2>Your pretest changes where you begin—not what you can become.</h2></div>
          <div class="orientation-steps">
            <article><span>01</span><h3>Diagnose</h3><p>Thirty applied questions map your current knowledge across every course module.</p></article>
            <article><span>02</span><h3>Prescribe</h3><p>Each module becomes full study, targeted review, or a direct competency-gate attempt.</p></article>
            <article><span>03</span><h3>Practice</h3><p>Short lectures, teaching cases, and hands-on labs turn terminology into professional decisions.</p></article>
            <article><span>04</span><h3>Demonstrate</h3><p>Score at least 80% on every module gate. Review and retry whenever evidence says you need it.</p></article>
          </div>
        </section>

        <section class="course-map" id="course-map">
          <div class="map-heading"><div><span class="section-label">Course map</span><h2>Foundation to professional judgment.</h2></div><p>Four phases gradually move from precise description to evidence-based decisions you can defend.</p></div>
          <div class="phase-track"><span class="phase describe">Describe <small>Modules 1–2</small></span><span class="phase explain">Explain <small>Modules 3–5</small></span><span class="phase prescribe">Prescribe <small>Modules 6–8</small></span><span class="phase defend">Defend <small>Modules 9–10</small></span></div>
          <div class="module-grid">
            ${DATA.modules.map(module => `<article class="module-tile phase-${module.phase.toLowerCase()}">
              <div class="tile-top"><span>Module ${String(module.id).padStart(2,"0")}</span><i>${module.weeks}</i></div>
              <h3>${esc(module.title)}</h3><p>${esc(module.purpose)}</p>
              <div class="tile-foot"><span>${module.lessons.length} lecture${module.lessons.length > 1 ? "s" : ""} · ${module.labs.length} lab${module.labs.length > 1 ? "s" : ""}</span><button data-module="${module.id}" aria-label="Open ${esc(module.title)}">↗</button></div>
            </article>`).join("")}
          </div>
        </section>

        <section class="privacy-strip"><div><span>Public course · no login required</span><h2>Your work stays with you.</h2></div><p>Progress is saved in this browser on this device. Use the printable learning report to share results with your instructor.</p></section>
      </main>${footer()}`;
  }

  function pretest() {
    if (state.pretestFinished) return resultsView();
    const q = DATA.pretest[state.pretestIndex];
    const selected = state.pretestAnswers[q.id];
    const confidence = state.confidence[q.id];
    const answered = Object.keys(state.pretestAnswers).length;
    const canNext = selected !== undefined && confidence !== undefined;
    return `${header("pretest")}
      <main class="test-page">
        <aside class="test-rail">
          <span class="rail-kicker">Knowledge map</span><h2>Baseline pretest</h2><p>Answer without outside help. Honest evidence creates a better route.</p>
          <div class="rail-progress"><strong>${answered}<small>/30</small></strong><span>answered</span><i><b style="width:${answered / 30 * 100}%"></b></i></div>
          <ol>${DATA.modules.map(m => {
            const count = DATA.pretest.filter(q => q.m === m.id && state.pretestAnswers[q.id] !== undefined).length;
            return `<li class="${m.id === q.m ? "current" : ""} ${count === 3 ? "done" : ""}"><span>${String(m.id).padStart(2,"0")}</span><div><strong>${esc(m.short)}</strong><small>${count}/3</small></div></li>`;
          }).join("")}</ol>
        </aside>
        <section class="question-panel">
          <div class="question-meta"><span class="question-kind ${q.t.toLowerCase()}">${q.t}</span><span>Module ${q.m} · Question ${q.id} of 30</span></div>
          <h1>${esc(q.q)}</h1>
          <div class="answer-list" role="radiogroup" aria-label="Answer choices">
            ${q.o.map((option, index) => `<button class="answer ${selected === index ? "selected" : ""}" data-answer="${index}" role="radio" aria-checked="${selected === index}"><span>${String.fromCharCode(65 + index)}</span><strong>${esc(option)}</strong><i></i></button>`).join("")}
          </div>
          <div class="confidence-box ${selected === undefined ? "disabled" : ""}"><div><strong>How sure are you?</strong><p>Confidence helps flag misconceptions, not just gaps.</p></div><div class="confidence-list">
            ${[[1,"Guessing"],[2,"Somewhat sure"],[3,"Very sure"]].map(([level,label]) => `<button ${selected === undefined ? "disabled" : ""} class="${confidence === level ? "selected" : ""}" data-confidence="${level}"><span>${level}</span>${label}</button>`).join("")}
          </div></div>
          <div class="test-nav"><button class="link-button" data-test-prev ${state.pretestIndex === 0 ? "disabled" : ""}>← Previous</button><button class="button primary" data-test-next ${!canNext ? "disabled" : ""}>${state.pretestIndex === 29 ? "Build my learning path" : "Next question"}<span>→</span></button></div>
          ${!canNext ? `<p class="next-hint">Choose an answer and confidence level to continue.</p>` : ""}
        </section>
      </main>`;
  }

  function resultsView() {
    const allScores = scores();
    const total = allScores.reduce((sum, item) => sum + item.correct, 0);
    const pct = Math.round(total / 30 * 100);
    const highMisses = DATA.pretest.filter(q => state.pretestAnswers[q.id] !== q.a && state.confidence[q.id] === 3).length;
    const ordered = [...DATA.modules].sort((a,b) => {
      const rank = key => ({required:0,targeted:1,accelerated:2})[prescription(key).key];
      return rank(a.id) - rank(b.id) || a.id - b.id;
    });
    return `${header("pretest")}
      <main class="results-page">
        <section class="result-hero"><div><span class="section-label">Baseline complete</span><h1>${state.studentName ? `${esc(state.studentName)}, your` : "Your"} learning path is ready.</h1><p>This is a planning snapshot, not a grade. Every module still ends in demonstrated competency.</p><div class="result-actions"><button class="button primary" data-go="#/path">Open my path <span>→</span></button><button class="button ghost light" data-print>Print results</button></div></div><div class="score-orbit" style="--score:${pct * 3.6}deg"><div><strong>${pct}<sup>%</sup></strong><span>${total} / 30</span></div></div></section>
        <section class="result-body">
          <div class="signal-row"><div><span>Required modules</span><strong>${allScores.filter(s => s.correct < 2).length}</strong></div><div><span>Targeted review</span><strong>${allScores.filter(s => s.correct === 2).length}</strong></div><div><span>Gate-first modules</span><strong>${allScores.filter(s => s.correct === 3).length}</strong></div><div><span>High-confidence errors</span><strong>${highMisses}</strong></div></div>
          <div class="path-heading"><div><span class="section-label">Prescribed sequence</span><h2>Begin with the areas that need the most support.</h2></div><p>Foundational modules come first when scores tie. A 3/3 lets you attempt the gate first; it does not certify mastery.</p></div>
          <div class="prescription-list">${ordered.map((module,index) => {
            const s = allScores.find(x => x.id === module.id); const p = prescription(module.id);
            return `<article class="prescription ${p.key}"><span class="path-number">${String(index+1).padStart(2,"0")}</span><div class="path-copy"><small>Module ${String(module.id).padStart(2,"0")}</small><h3>${esc(module.title)}</h3><p>${esc(p.detail)}</p></div><div class="path-status"><strong>${s.correct}/3</strong><span>${p.label}</span><button data-module="${module.id}">Open →</button></div></article>`;
          }).join("")}</div>
        </section>
      </main>${footer()}`;
  }

  function pathView() {
    if (!state.pretestFinished) return pretestInvite();
    const allScores = scores();
    const complete = courseProgress();
    const ordered = [...DATA.modules].sort((a,b) => {
      const rank = id => ({required:0,targeted:1,accelerated:2})[prescription(id).key];
      return rank(a.id) - rank(b.id) || a.id - b.id;
    });
    return `${header("path")}
      <main class="dashboard-page">
        <section class="dashboard-head"><div><span class="section-label">Personal learning path</span><h1>${state.studentName ? `Welcome back, ${esc(state.studentName)}.` : "Your course dashboard."}</h1><p>Complete the prescribed work, submit evidence from each lab, and earn 80% or better on every competency gate.</p></div><div class="mastery-total"><strong>${complete}<small>/10</small></strong><span>modules mastered</span><i><b style="width:${complete * 10}%"></b></i></div></section>
        <section class="dashboard-body">
          <div class="dashboard-toolbar"><div><span>YOUR PRESCRIBED ORDER</span><p>Based on your ${allScores.reduce((s,x)=>s+x.correct,0)}/30 baseline result</p></div><div><button class="small-button" data-copy-report>Copy progress report</button><button class="small-button quiet" data-print>Print</button></div></div>
          <div class="learning-route">${ordered.map((module,index) => {
            const p = prescription(module.id); const ms = moduleState(module.id); const passed = ms.gate.passed; const lessonDone = lessonComplete(module); const labDone = labsComplete(module);
            return `<article class="route-card ${p.key} ${passed ? "mastered" : ""}"><div class="route-order"><span>${String(index+1).padStart(2,"0")}</span><i></i></div><div class="route-main"><div class="route-meta"><span>Module ${String(module.id).padStart(2,"0")} · ${module.weeks}</span><b>${passed ? "Mastered" : p.label}</b></div><h2>${esc(module.title)}</h2><p>${esc(module.purpose)}</p><div class="route-checks"><span class="${lessonDone ? "done" : ""}">Lecture ${lessonDone ? "complete" : "pending"}</span><span class="${labDone ? "done" : ""}">Lab ${labDone ? "complete" : "pending"}</span><span class="${passed ? "done" : ""}">Gate ${passed ? `${ms.gate.score}/5 passed` : "pending"}</span></div></div><div class="route-action"><div class="baseline-score"><strong>${allScores.find(s=>s.id===module.id).correct}/3</strong><span>pretest</span></div><button class="button ${passed ? "ghost" : "primary"}" data-module="${module.id}">${passed ? "Review module" : "Continue"}<span>→</span></button></div></article>`;
          }).join("")}</div>
          <div class="dashboard-note"><strong>Progress is saved on this device.</strong><p>No account is required. If you switch browsers or devices, your progress will not follow automatically. Copy or print your report before clearing browser data.</p></div>
        </section>
      </main>${footer()}`;
  }

  function pretestInvite() {
    return `${header("path")}<main class="empty-state"><div><span class="section-label">One step first</span><h1>Build your baseline before opening a prescribed path.</h1><p>The 30-question pretest takes about 20 minutes and determines whether each module begins with full study, targeted review, or a direct competency-gate attempt.</p><button class="button primary" data-go="#/pretest">Start the pretest <span>→</span></button></div></main>${footer()}`;
  }

  function moduleView(id) {
    const module = DATA.modules.find(m => m.id === Number(id));
    if (!module) return home();
    const ms = moduleState(module.id);
    const p = state.pretestFinished ? prescription(module.id) : {key:"required",label:"Complete module",detail:"Complete the learning sequence and competency gate."};
    const open = state.pretestFinished && gateOpen(module);
    const passed = ms.gate.passed;
    return `${header("path")}
      <main class="module-page">
        <aside class="module-sidebar">
          <a href="#/path" class="back-path">← My learning path</a>
          <div class="module-index">Module ${String(module.id).padStart(2,"0")}</div><h2>${esc(module.title)}</h2><p>${module.weeks} · ${module.phase} phase</p>
          <div class="prescription-badge ${p.key}"><strong>${p.label}</strong><span>${esc(p.detail)}</span></div>
          <nav><button data-scroll="overview">Overview</button>${module.lessons.map((l,i)=>`<button data-scroll="lesson-${i}"><span class="check-dot ${ms.lessons[i] ? "done" : ""}"></span>Lecture ${i+1}</button>`).join("")}<button data-scroll="lab"><span class="check-dot ${labsComplete(module) ? "done" : ""}"></span>Lab work</button><button data-scroll="gate"><span class="check-dot ${passed ? "done" : ""}"></span>Competency gate</button></nav>
        </aside>
        <section class="module-content">
          <section class="module-banner" id="overview"><div><span>${module.phase.toUpperCase()} · ${module.weeks}</span><h1>${esc(module.title)}</h1><p>${esc(module.purpose)}</p></div><div class="module-status-ring ${passed ? "passed" : ""}"><strong>${passed ? "✓" : module.id}</strong><span>${passed ? "Mastered" : "In progress"}</span></div></section>
          <section class="outcomes-block"><span class="content-kicker">By the end, you can…</span><div>${module.outcomes.map((outcome,i)=>`<article><span>0${i+1}</span><p>${esc(outcome)}</p></article>`).join("")}</div></section>
          ${module.lessons.map((lesson,index) => lectureBlock(module, lesson, index, !!ms.lessons[index])).join("")}
          <section class="lab-section" id="lab"><div class="section-title"><div><span class="content-kicker">Practice with evidence</span><h2>Applied lab work</h2></div><p>${module.labs.length} lab${module.labs.length>1?"s":""} · complete all before the gate</p></div>
            ${module.labs.map((lab,index)=>labBlock(module, lab, index, ms.labs[index])).join("")}
          </section>
          ${gateBlock(module, ms, open)}
          <div class="module-bottom-nav"><button class="link-button" data-module="${Math.max(1,module.id-1)}" ${module.id===1?"disabled":""}>← Previous module</button><button class="button ${passed ? "primary" : "ghost"}" data-go="#/path">Return to my path <span>→</span></button></div>
        </section>
      </main>`;
  }

  function lectureBlock(module, lesson, index, done) {
    return `<section class="lecture-block" id="lesson-${index}">
      <div class="lecture-number"><span>Lecture ${String(index+1).padStart(2,"0")}</span><i></i></div>
      <div class="lecture-title"><div><span class="content-kicker">Big idea</span><h2>${esc(lesson.title)}</h2></div><button class="completion-button ${done ? "done" : ""}" data-lesson="${module.id}:${index}">${done ? "✓ Lecture reviewed" : "Mark lecture reviewed"}</button></div>
      <p class="big-idea">${esc(lesson.bigIdea)}</p>
      <div class="learning-pair"><article class="concept-card"><span>01 · MODEL</span><h3>${esc(lesson.modelTitle)}</h3><ol>${lesson.model.map((item,i)=>`<li><b>${String(i+1).padStart(2,"0")}</b><p>${esc(item)}</p></li>`).join("")}</ol></article><article class="concept-card mechanism"><span>02 · MECHANISM</span><h3>${esc(lesson.mechanismTitle)}</h3><ol>${lesson.mechanism.map((item,i)=>`<li><b>${String(i+1).padStart(2,"0")}</b><p>${esc(item)}</p></li>`).join("")}</ol></article></div>
      <div class="teaching-translation"><div><span class="content-kicker">Teaching translation</span><h3>Moves you can use Monday</h3></div><ul>${lesson.teacherMoves.map(move=>`<li>${esc(move)}</li>`).join("")}</ul></div>
      <div class="case-prompt"><span>APPLIED CASE</span><p>${esc(lesson.case)}</p><small>Reason through it: Observe → Explain → Decide → Verify</small></div>
    </section>`;
  }

  function labBlock(module, lab, index, saved) {
    saved = saved || {notes:"",safety:false,done:false};
    return `<article class="lab-card ${saved.done ? "complete" : ""}"><div class="lab-head"><div><span>Lab ${index+1}</span><h3>${esc(lab.title)}</h3></div><strong>${saved.done ? "✓ Complete" : "Evidence required"}</strong></div><div class="lab-layout"><div><h4>Materials</h4><p>${esc(lab.materials)}</p><h4>Safety check</h4><label class="safety-check"><input type="checkbox" data-lab-safety="${module.id}:${index}" ${saved.safety ? "checked" : ""}><span></span><p>${esc(lab.safety)}</p></label></div><div><h4>Procedure</h4><ol>${lab.steps.map(step=>`<li>${esc(step)}</li>`).join("")}</ol></div></div><div class="lab-evidence"><label for="lab-${module.id}-${index}"><strong>Evidence note</strong><span>${esc(lab.evidence)}</span></label><textarea id="lab-${module.id}-${index}" data-lab-notes="${module.id}:${index}" placeholder="Record your observation, result, or decision here…">${esc(saved.notes)}</textarea><div><small>${saved.notes.length} characters · safety confirmation required</small><button class="completion-button ${saved.done ? "done" : ""}" data-lab-complete="${module.id}:${index}" ${(!saved.safety || saved.notes.trim().length < 20) ? "disabled" : ""}>${saved.done ? "✓ Lab evidence saved" : "Complete this lab"}</button></div></div></article>`;
  }

  function gateQuestions(module) {
    return [...DATA.pretest.filter(q=>q.m===module.id).map(q=>({q:q.q,o:q.o,a:q.a,x:q.x})), ...DATA.gateExtra[module.id]];
  }

  function gateBlock(module, ms, open) {
    const gate = ms.gate; const items = gateQuestions(module);
    if (!state.pretestFinished) return `<section class="gate-section locked" id="gate"><div class="gate-lock">LOCKED</div><h2>Complete the baseline pretest first.</h2><p>Your pretest determines which learning work is required before this competency gate.</p><button class="button primary" data-go="#/pretest">Open pretest <span>→</span></button></section>`;
    if (!open) return `<section class="gate-section locked" id="gate"><div class="gate-lock">LOCKED</div><h2>Finish the lecture and lab evidence first.</h2><p>The gate opens when every lecture is marked reviewed and every lab includes a safety confirmation plus an evidence note.</p><div class="unlock-list"><span class="${lessonComplete(module)?"done":""}">Lecture sequence</span><span class="${labsComplete(module)?"done":""}">Lab evidence</span></div></section>`;
    return `<section class="gate-section ${gate.passed ? "passed" : ""}" id="gate"><div class="section-title"><div><span class="content-kicker">Demonstrate competency</span><h2>Module ${module.id} mastery gate</h2></div><p>Pass with 4 of 5 correct · unlimited attempts</p></div>
      ${gate.passed ? `<div class="mastery-banner"><span>✓</span><div><strong>Competency demonstrated</strong><p>You scored ${gate.score}/5 (${gate.score*20}%) on attempt ${gate.attempts}. This module is complete.</p></div><button class="button ghost light" data-gate-retry="${module.id}">Practice again</button></div>` : ""}
      <div class="gate-questions">${items.map((q,index)=>{
        const selected=gate.answers[index]; const correct=gate.submitted && selected===q.a; const wrong=gate.submitted && selected!==undefined && selected!==q.a;
        return `<article class="gate-question ${correct?"correct":""} ${wrong?"wrong":""}"><span>Question ${index+1}</span><h3>${esc(q.q)}</h3><div>${q.o.map((option,oi)=>`<button data-gate-answer="${module.id}:${index}:${oi}" class="${selected===oi?"selected":""} ${gate.submitted&&oi===q.a?"best":""}" ${gate.submitted?"disabled":""}><span>${String.fromCharCode(65+oi)}</span>${esc(option)}</button>`).join("")}</div>${gate.submitted?`<p class="gate-feedback"><strong>${selected===q.a?"Correct.":"Review:"}</strong> ${esc(q.x)}</p>`:""}</article>`;
      }).join("")}</div>
      <div class="gate-submit">${gate.submitted&&!gate.passed?`<div><strong>${gate.score}/5 · Not yet</strong><p>Review the feedback, return to the relevant lecture, then try again.</p></div><button class="button primary" data-gate-retry="${module.id}">Review and retry <span>↻</span></button>`:`<div><strong>${gate.passed?"Optional practice":"Ready to submit?"}</strong><p>${gate.passed?"A new attempt will not remove your mastery record.":"You need at least 4 correct answers."}</p></div><button class="button primary" data-gate-submit="${module.id}" ${Object.keys(gate.answers).length<5||gate.submitted?"disabled":""}>Score this gate <span>→</span></button>`}</div>
    </section>`;
  }

  function footer() {
    return `<footer class="course-footer"><div><a class="mm-brand" href="https://movemetric.org"><span class="mm-dot"></span><span>move<b>metric</b></span></a><p>Data-driven tools for modern physical education.</p></div><div><strong>PETE 345</strong><span>Kinesiology & Efficiency of Human Movement</span></div><div><a href="#/home">Course home</a><a href="#/path">My path</a><a href="https://movemetric.org/privacy.html">Privacy</a></div></footer>`;
  }

  function reportText() {
    const allScores=scores();
    return [`PETE 345 Learning Progress — ${state.studentName || "Student"}`,`Baseline: ${allScores.reduce((s,x)=>s+x.correct,0)}/30`,`Modules mastered: ${courseProgress()}/10`,...DATA.modules.map(m=>{const ms=moduleState(m.id);return `Module ${m.id}: ${ms.gate.passed?`MASTERED (${ms.gate.score}/5, attempt ${ms.gate.attempts})`:`${prescription(m.id).label} — in progress`}`;}),"Note: device-saved student report; verify with submitted lab evidence and course records."].join("\n");
  }

  function render() {
    const hash = window.location.hash || "#/home";
    if (hash.startsWith("#/module/")) app.innerHTML = moduleView(hash.split("/")[2]);
    else if (hash === "#/pretest") { if (!state.pretestStarted) { state.pretestStarted = true; save(); } app.innerHTML = pretest(); }
    else if (hash === "#/path") app.innerHTML = pathView();
    else app.innerHTML = home();
    bind();
  }

  function bind() {
    const nameInput=app.querySelector("[data-student-name]"); if(nameInput) nameInput.addEventListener("input",()=>{state.studentName=nameInput.value;save();});
    app.querySelectorAll("[data-scroll]").forEach(el=>el.addEventListener("click",()=>document.getElementById(el.dataset.scroll)?.scrollIntoView({behavior:"smooth"})));
    app.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>go(el.dataset.go)));
    app.querySelectorAll("[data-module]").forEach(el=>el.addEventListener("click",()=>go(`#/module/${el.dataset.module}`)));
    app.querySelectorAll("[data-answer]").forEach(el=>el.addEventListener("click",()=>{const q=DATA.pretest[state.pretestIndex];state.pretestAnswers[q.id]=Number(el.dataset.answer);save();render();}));
    app.querySelectorAll("[data-confidence]").forEach(el=>el.addEventListener("click",()=>{const q=DATA.pretest[state.pretestIndex];state.confidence[q.id]=Number(el.dataset.confidence);save();render();}));
    const next=app.querySelector("[data-test-next]"); if(next) next.addEventListener("click",()=>{if(state.pretestIndex===29){state.pretestFinished=true;save();render();window.scrollTo(0,0);}else{state.pretestIndex++;save();render();window.scrollTo(0,0);}});
    const prev=app.querySelector("[data-test-prev]"); if(prev) prev.addEventListener("click",()=>{state.pretestIndex=Math.max(0,state.pretestIndex-1);save();render();window.scrollTo(0,0);});
    app.querySelectorAll("[data-lesson]").forEach(el=>el.addEventListener("click",()=>{const [m,i]=el.dataset.lesson.split(":");moduleState(m).lessons[i]=!moduleState(m).lessons[i];save();render();document.getElementById(`lesson-${i}`)?.scrollIntoView();}));
    app.querySelectorAll("[data-lab-notes]").forEach(el=>el.addEventListener("input",()=>{const [m,i]=el.dataset.labNotes.split(":");const ms=moduleState(m);ms.labs[i]=Object.assign({notes:"",safety:false,done:false},ms.labs[i],{notes:el.value});if(el.value.trim().length<20)ms.labs[i].done=false;save();const button=app.querySelector(`[data-lab-complete="${m}:${i}"]`);if(button)button.disabled=!(ms.labs[i].safety&&el.value.trim().length>=20);const small=el.parentElement.querySelector("small");if(small)small.textContent=`${el.value.length} characters · safety confirmation required`;}));
    app.querySelectorAll("[data-lab-safety]").forEach(el=>el.addEventListener("change",()=>{const [m,i]=el.dataset.labSafety.split(":");const ms=moduleState(m);ms.labs[i]=Object.assign({notes:"",safety:false,done:false},ms.labs[i],{safety:el.checked});if(!el.checked)ms.labs[i].done=false;save();render();document.getElementById("lab")?.scrollIntoView();}));
    app.querySelectorAll("[data-lab-complete]").forEach(el=>el.addEventListener("click",()=>{const [m,i]=el.dataset.labComplete.split(":");const lab=moduleState(m).labs[i];if(lab&&lab.safety&&lab.notes.trim().length>=20){lab.done=true;save();render();document.getElementById("lab")?.scrollIntoView();}}));
    app.querySelectorAll("[data-gate-answer]").forEach(el=>el.addEventListener("click",()=>{const [m,q,a]=el.dataset.gateAnswer.split(":");const gate=moduleState(m).gate;if(!gate.submitted){gate.answers[q]=Number(a);save();render();document.getElementById("gate")?.scrollIntoView();}}));
    app.querySelectorAll("[data-gate-submit]").forEach(el=>el.addEventListener("click",()=>{const id=Number(el.dataset.gateSubmit);const gate=moduleState(id).gate;const items=gateQuestions(DATA.modules[id-1]);gate.score=items.filter((q,i)=>gate.answers[i]===q.a).length;gate.attempts++;gate.submitted=true;if(gate.score>=4)gate.passed=true;save();render();document.getElementById("gate")?.scrollIntoView();}));
    app.querySelectorAll("[data-gate-retry]").forEach(el=>el.addEventListener("click",()=>{const gate=moduleState(el.dataset.gateRetry).gate;gate.answers={};gate.submitted=false;save();render();document.getElementById("gate")?.scrollIntoView();}));
    app.querySelectorAll("[data-print]").forEach(el=>el.addEventListener("click",()=>window.print()));
    app.querySelectorAll("[data-copy-report]").forEach(el=>el.addEventListener("click",async()=>{await navigator.clipboard.writeText(reportText());el.textContent="Copied!";setTimeout(()=>el.textContent="Copy progress report",1500);}));
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("DOMContentLoaded", () => {
    if (!state.startedAt) { state.startedAt = new Date().toISOString(); save(); }
    render();
  });
})();
