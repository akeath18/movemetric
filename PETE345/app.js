(function () {
  const DATA = window.PETE345_DATA;
  const STORAGE_KEY = "movemetric-pete345-course-v1";
  const COURSE_VERSION = 3;
  const PROGRESS_API = "https://pete345-baseline-lab.akeath.chatgpt.site/api/progress";
  const app = document.getElementById("app");

  const blank = () => ({
    studentName: "",
    pretestStarted: false,
    pretestFinished: false,
    pretestIndex: 0,
    pretestAnswers: {},
    confidence: {},
    modules: {},
    events: [],
    syncId: "",
    syncKey: "",
    syncStatus: "local",
    lastSyncedAt: null,
    instructorAdjustments: [],
    version: COURSE_VERSION,
    startedAt: null,
    lastVisit: null
  });

  let state = load();
  if (state.version !== COURSE_VERSION) state = Object.assign(blank(), state, { version: COURSE_VERSION, events: state.events || [] });

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved ? Object.assign(blank(), saved, { version: saved.version || 1 }) : blank();
    } catch (_) {
      return blank();
    }
  }

  function save() {
    state.lastVisit = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    scheduleSync();
  }

  let syncTimer;
  function scheduleSync() {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(syncProgress, 1200);
  }

  function syncSummary() {
    const ordered = state.pretestFinished ? prescribedModules() : DATA.modules;
    const next = state.pretestFinished ? nextAction() : { module:null, title:"Baseline pretest" };
    const totalSteps = DATA.modules.reduce((sum,m)=>sum+m.lessons.length+m.labs.length+1,0);
    const stepsComplete = DATA.modules.reduce((sum,m)=>sum+m.lessons.filter((_,i)=>lessonRecord(m.id,i).done).length+m.labs.filter((_,i)=>moduleState(m.id).labs[i]?.done).length+(moduleComplete(m.id)?1:0),0);
    return {
      studentId:state.syncId,syncKey:state.syncKey,displayName:state.studentName||"Student",pretestFinished:state.pretestFinished,
      pretestScore:scores().reduce((sum,item)=>sum+item.correct,0),modulesMastered:courseProgress(),currentModule:next.module?.id||ordered.find(m=>!moduleComplete(m.id))?.id||10,currentStep:next.title,
      stepsComplete,totalSteps,eventCount:(state.events||[]).length,
      modules:DATA.modules.map(module=>{const ms=moduleState(module.id);return {id:module.id,pathMode:prescription(module.id).key,lessonsComplete:module.lessons.filter((_,i)=>lessonRecord(module.id,i).done).length,lessonTotal:module.lessons.length,labsComplete:module.labs.filter((_,i)=>ms.labs[i]?.done).length,labTotal:module.labs.length,gateAttempts:ms.gate.attempts||0,gateScore:ms.gate.score||0,mastered:!!ms.gate.passed};})
    };
  }

  async function syncProgress() {
    if (!state.syncId || !state.syncKey || !navigator.onLine) return;
    try {
      state.syncStatus="syncing";
      const response=await fetch(PROGRESS_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(syncSummary())});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||"sync failed");
      state.syncStatus="synced";state.lastSyncedAt=new Date(result.syncedAt).toISOString();state.instructorAdjustments=result.adjustments||[];
      localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    } catch (_) { state.syncStatus="local"; localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
  }

  function track(type, detail = {}) {
    state.events = state.events || [];
    state.events.push({ type, detail, at: new Date().toISOString() });
    if (state.events.length > 250) state.events = state.events.slice(-250);
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function moduleState(id) {
    if (!state.modules[id]) state.modules[id] = { lessons: {}, labs: {}, gate: { answers: {}, attempts: 0, submitted: false, score: 0, passed: false, form: [], lastForm: [], remediationRequired: false, requiredLessons: [] } };
    const gate = state.modules[id].gate;
    Object.assign(gate, { form: gate.form || [], lastForm: gate.lastForm || [], requiredLessons: gate.requiredLessons || [] });
    return state.modules[id];
  }

  function lessonRecord(moduleId, index) {
    const ms = moduleState(moduleId);
    const current = ms.lessons[index];
    if (!current || current === true) ms.lessons[index] = { answers: {}, explanation: "", done: false, mediaSlide: 0, mediaComplete: false };
    Object.assign(ms.lessons[index], { mediaSlide: ms.lessons[index].mediaSlide || 0, mediaComplete: !!ms.lessons[index].mediaComplete });
    return ms.lessons[index];
  }

  function scores() {
    return DATA.modules.map(module => {
      const items = DATA.pretest.filter(q => q.m === module.id);
      const correct = items.filter(q => state.pretestAnswers[q.id] === q.a).length;
      return { id: module.id, correct, total: 3, percent: Math.round(correct / 3 * 100) };
    });
  }

  function prescription(id) {
    const adjustment = adjustmentFor(id);
    if (adjustment?.directive === "required_review") return { key:"required", label:"Instructor: full review", detail:adjustment.note||"Your instructor has prescribed the complete learning sequence before the next gate.", directive:adjustment.directive };
    if (adjustment?.directive === "targeted_review") return { key:"targeted", label:"Instructor: targeted review", detail:adjustment.note||"Your instructor has prescribed targeted instruction and lab evidence before the next gate.", directive:adjustment.directive };
    if (adjustment?.directive === "gate_first") return { key:"accelerated", label:"Instructor: gate first", detail:adjustment.note||"Your instructor has authorized a gate-first attempt.", directive:adjustment.directive };
    if (adjustment?.directive === "check_in") return { key:"required", label:"Instructor check-in", detail:adjustment.note||"Pause here and check in with your instructor before continuing.", directive:adjustment.directive };
    const score = scores().find(s => s.id === id)?.correct || 0;
    if (score === 3) return { key: "accelerated", label: "Gate first", detail: "Pretest indicates readiness. Attempt the competency gate now; use the lecture and lab if needed." };
    if (score === 2) return { key: "targeted", label: "Targeted review", detail: "Complete the lecture and lab, concentrating on the missed concept, before the competency gate." };
    return { key: "required", label: "Complete module", detail: "Build the full foundation through the lecture, application, lab, and competency gate." };
  }

  function adjustmentFor(id) { return (state.instructorAdjustments||[]).find(item=>Number(item.moduleId)===Number(id)); }

  function moduleComplete(id) {
    return !!moduleState(id).gate.passed;
  }

  function lessonComplete(module) {
    return module.lessons.every((_, index) => lessonRecord(module.id, index).done);
  }

  function labsComplete(module) {
    const ms = moduleState(module.id);
    return module.labs.every((_, index) => ms.labs[index]?.done);
  }

  function gateOpen(module) {
    const ms = moduleState(module.id);
    if (adjustmentFor(module.id)?.directive === "check_in") return false;
    if (ms.gate.remediationRequired) {
      const reviewed = ms.gate.requiredLessons.every(index => lessonRecord(module.id, index).done);
      return reviewed && labsComplete(module);
    }
    return prescription(module.id).key === "accelerated" || (lessonComplete(module) && labsComplete(module));
  }

  function courseProgress() {
    return DATA.modules.filter(m => moduleComplete(m.id)).length;
  }

  function prescribedModules() {
    return [...DATA.modules].sort((a,b) => {
      const rank = id => ({required:0,targeted:1,accelerated:2})[prescription(id).key];
      return rank(a.id) - rank(b.id) || a.id - b.id;
    });
  }

  function nextAction() {
    if (!state.pretestFinished) return { kind:"pretest", title: state.pretestStarted ? "Continue your baseline" : "Build your baseline", detail:`${Object.keys(state.pretestAnswers).length}/30 questions complete`, minutes: Math.max(4, Math.ceil((30-Object.keys(state.pretestAnswers).length)*0.6)), hash:"#/pretest", label:"Continue pretest" };
    for (const module of prescribedModules()) {
      if (moduleComplete(module.id)) continue;
      const p = prescription(module.id);
      if (p.directive === "check_in") return { kind:"checkin", module, title:`Module ${module.id} · Instructor check-in`, detail:p.detail, minutes:0, hash:`#/module/${module.id}`, label:"Review instructor note" };
      if (p.key === "accelerated" && moduleState(module.id).gate.attempts === 0) return { kind:"gate", module, title:`Try the Module ${module.id} gate`, detail:"Your baseline supports a gate-first attempt. If it reveals a gap, the course will prescribe exactly what to review.", minutes:15, hash:`#/module/${module.id}`, anchor:"gate", label:"Attempt gate" };
      const lessonIndex = module.lessons.findIndex((_,i)=>!lessonRecord(module.id,i).done);
      if (lessonIndex >= 0) {
        const lesson = module.lessons[lessonIndex];
        const record = lessonRecord(module.id, lessonIndex);
        return { kind:"lesson", module, lessonIndex, title:`Module ${module.id} · Visual lesson ${lessonIndex+1}`, detail:lesson.guidingQuestion, minutes:Math.min(25, lesson.minutes), hash:`#/study/${module.id}/${lessonIndex}`, label:record.mediaSlide ? "Resume visual lesson" : "Start visual lesson" };
      }
      const labIndex = module.labs.findIndex((_,i)=>!moduleState(module.id).labs[i]?.done);
      if (labIndex >= 0) return { kind:"lab", module, title:`Module ${module.id} · Evidence lab`, detail:module.labs[labIndex].question, minutes:module.labs[labIndex].minutes, hash:`#/module/${module.id}`, anchor:"lab", label:"Open the lab" };
      return { kind:"gate", module, title:`Module ${module.id} · Mastery gate`, detail:"Demonstrate competency with five applied questions. You need 4 of 5 correct.", minutes:15, hash:`#/module/${module.id}`, anchor:"gate", label:"Take the gate" };
    }
    return { kind:"complete", title:"Course pathway mastered", detail:"You have demonstrated competency in all ten modules.", minutes:0, hash:"#/path", label:"Review your record" };
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
            <div class="hero-facts"><div><strong>10</strong><span>learning modules</span></div><div><strong>16</strong><span>taught segments</span></div><div><strong>80%</strong><span>mastery threshold</span></div></div>
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
            <article><span>03</span><h3>Learn + practice</h3><p>Explicit explanations, worked examples, retrieval checks, self-explanations, and evidence-producing labs teach every assessed concept.</p></article>
            <article><span>04</span><h3>Demonstrate</h3><p>Score at least 80% on every gate. An unsuccessful attempt prescribes corrective study and then generates five different questions.</p></article>
          </div>
        </section>

        <section class="course-map" id="course-map">
          <div class="map-heading"><div><span class="section-label">Course map</span><h2>Foundation to professional judgment.</h2></div><p>Four phases gradually move from precise description to evidence-based decisions you can defend.</p></div>
          <div class="phase-track"><span class="phase describe">Describe <small>Modules 1–2</small></span><span class="phase explain">Explain <small>Modules 3–5</small></span><span class="phase prescribe">Prescribe <small>Modules 6–8</small></span><span class="phase defend">Defend <small>Modules 9–10</small></span></div>
          <div class="module-grid">
            ${DATA.modules.map(module => `<article class="module-tile phase-${module.phase.toLowerCase()}">
              <div class="tile-top"><span>Module ${String(module.id).padStart(2,"0")}</span><i>${module.weeks}</i></div>
              <h3>${esc(module.title)}</h3><p>${esc(module.purpose)}</p>
              <div class="tile-foot"><span>${module.lessons.length} learning segment${module.lessons.length > 1 ? "s" : ""} · ${module.labs.length} evidence lab${module.labs.length > 1 ? "s" : ""}</span><button data-module="${module.id}" aria-label="Open ${esc(module.title)}">↗</button></div>
            </article>`).join("")}
          </div>
        </section>

        <section class="learning-design"><div><span class="section-label">How learning is built</span><h2>Study less passively. Retrieve, explain, test, and revise.</h2><p>The course uses learner-paced segmentation, explicit teaching, worked examples, self-explanation, distributed retrieval, corrective feedback, and mastery learning.</p></div><ol>${DATA.learningDesign.principles.map((item,index)=>`<li><b>0${index+1}</b><span>${esc(item)}</span></li>`).join("")}</ol><div class="research-links">${DATA.learningDesign.sources.map(source=>`<a href="${source.url}" target="_blank" rel="noopener">${esc(source.label)} ↗</a>`).join("")}</div></section>
        <section class="privacy-strip"><div><span>Public course · no student login required</span><h2>Your place is remembered.</h2></div><p>Your course work saves in this browser. A random course record shares your preferred name, pace, current step, and mastery results with your instructor; it does not require or collect a student email address.</p></section>
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
    const ordered = prescribedModules();
    const next = nextAction();
    const totalSteps = DATA.modules.reduce((sum,m)=>sum+m.lessons.length+m.labs.length+1,0);
    const finishedSteps = DATA.modules.reduce((sum,m)=>sum+m.lessons.filter((_,i)=>lessonRecord(m.id,i).done).length+m.labs.filter((_,i)=>moduleState(m.id).labs[i]?.done).length+(moduleComplete(m.id)?1:0),0);
    return `${header("path")}
      <main class="dashboard-page">
        <section class="dashboard-head"><div><span class="section-label">Personal learning path</span><h1>${state.studentName ? `Welcome back, ${esc(state.studentName)}.` : "Your course dashboard."}</h1><p>Complete each taught learning segment, demonstrate the reasoning in an evidence lab, and earn 80% or better on every competency gate.</p></div><div class="mastery-total"><strong>${complete}<small>/10</small></strong><span>modules mastered</span><i><b style="width:${complete * 10}%"></b></i></div></section>
        <section class="dashboard-body">
          <section class="next-session-card ${next.kind}">
            <div class="next-session-label"><span>DO THIS NEXT</span><b>${next.minutes ? `${next.minutes} min` : "complete"}</b></div>
            <div class="next-session-copy"><small>${next.module ? `YOUR CURRENT STOP · MODULE ${String(next.module.id).padStart(2,"0")}` : "YOUR CURRENT STOP"}</small><h2>${esc(next.title)}</h2><p>${esc(next.detail)}</p><div class="session-expect"><span>1 focused activity</span><span>Pause when complete</span><span>Your work saves automatically</span></div></div>
            <button class="button primary" data-next-action="${next.hash}" data-anchor="${next.anchor||""}">${esc(next.label)} <span>→</span></button>
          </section>
          <section class="pace-guide"><div><span class="content-kicker">How to pace yourself</span><h2>One focused session, then stop.</h2><p>Most weeks: complete two 25–45 minute sessions on different days. Begin with the card above; do not try to finish an entire module in one sitting.</p></div><ol><li><b>01</b><span>Watch and control the visual explanation</span></li><li><b>02</b><span>Retrieve and explain without looking</span></li><li><b>03</b><span>Return later for the evidence lab</span></li><li><b>04</b><span>Attempt the gate when it unlocks</span></li></ol><div class="course-step-meter"><strong>${finishedSteps}<small> / ${totalSteps}</small></strong><span>course learning steps complete</span><i><b style="width:${Math.round(finishedSteps/totalSteps*100)}%"></b></i></div></section>
          <div class="dashboard-toolbar"><div><span>YOUR PRESCRIBED ORDER</span><p>Based on your ${allScores.reduce((s,x)=>s+x.correct,0)}/30 baseline result</p></div><div><button class="small-button" data-copy-report>Copy progress report</button><button class="small-button quiet" data-print>Print</button></div></div>
          <div class="learning-route">${ordered.map((module,index) => {
            const p = prescription(module.id); const ms = moduleState(module.id); const passed = ms.gate.passed; const lessonDone = lessonComplete(module); const labDone = labsComplete(module);
            return `<article class="route-card ${p.key} ${passed ? "mastered" : ""}"><div class="route-order"><span>${String(index+1).padStart(2,"0")}</span><i></i></div><div class="route-main"><div class="route-meta"><span>Module ${String(module.id).padStart(2,"0")} · ${module.weeks}</span><b>${passed ? "Mastered" : p.label}</b></div><h2>${esc(module.title)}</h2><p>${esc(module.purpose)}</p><div class="route-checks"><span class="${lessonDone ? "done" : ""}">Instruction ${lessonDone ? "complete" : "pending"}</span><span class="${labDone ? "done" : ""}">Evidence lab ${labDone ? "complete" : "pending"}</span><span class="${passed ? "done" : ""}">Gate ${passed ? `${ms.gate.score}/5 passed` : "pending"}</span></div></div><div class="route-action"><div class="baseline-score"><strong>${allScores.find(s=>s.id===module.id).correct}/3</strong><span>pretest</span></div><button class="button ${passed ? "ghost" : "primary"}" data-module="${module.id}">${passed ? "Review module" : "Continue"}<span>→</span></button></div></article>`;
          }).join("")}</div>
          <div class="dashboard-note"><strong>Course record · ${state.syncStatus==="synced"?"instructor view updated":"saved on this device"}</strong><p>${state.syncStatus==="synced"?`Your instructor can see pace, current step, gate attempts, and mastery. Last synchronized ${new Date(state.lastSyncedAt).toLocaleString()}.`:"Your work is safe in this browser and will synchronize to the instructor view when the tracking service is available."}</p></div>
        </section>
      </main>${footer()}`;
  }

  function pretestInvite() {
    return `${header("path")}<main class="empty-state"><div><span class="section-label">One step first</span><h1>Build your baseline before opening a prescribed path.</h1><p>The 30-question pretest takes about 20 minutes and determines whether each module begins with full study, targeted review, or a direct competency-gate attempt.</p><button class="button primary" data-go="#/pretest">Start the pretest <span>→</span></button></div></main>${footer()}`;
  }

  function sessionDone(module, index) {
    if (index < module.lessons.length) return lessonRecord(module.id,index).done;
    if (index < module.learning.sessions.length-1) return labsComplete(module);
    return moduleComplete(module.id);
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
          <nav><button data-scroll="overview">Overview + pacing</button>${module.lessons.map((l,i)=>`<button data-study="${module.id}:${i}"><span class="check-dot ${lessonRecord(module.id,i).done ? "done" : ""}"></span>Visual lesson ${i+1}</button>`).join("")}<button data-scroll="lab"><span class="check-dot ${labsComplete(module) ? "done" : ""}"></span>Evidence lab</button><button data-scroll="gate"><span class="check-dot ${passed ? "done" : ""}"></span>Competency gate</button></nav>
        </aside>
        <section class="module-content">
          <section class="module-banner" id="overview"><div><span>${module.phase.toUpperCase()} · ${module.weeks} · ${module.learning.time}</span><h1>${esc(module.title)}</h1><p>${esc(module.purpose)}</p><div class="concept-strip">${module.learning.concepts.map(item=>`<i>${esc(item)}</i>`).join("")}</div></div><div class="module-status-ring ${passed ? "passed" : ""}"><strong>${passed ? "✓" : module.id}</strong><span>${passed ? "Mastered" : "In progress"}</span></div></section>
          ${adjustmentFor(module.id)?`<section class="instructor-note"><span>MESSAGE FROM YOUR INSTRUCTOR</span><div><strong>${esc(p.label)}</strong><p>${esc(p.detail)}</p></div></section>`:""}
          <section class="outcomes-block"><span class="content-kicker">By the end, you can…</span><div>${module.outcomes.map((outcome,i)=>`<article><span>0${i+1}</span><p>${esc(outcome)}</p></article>`).join("")}</div></section>
          <section class="pacing-plan"><div><span class="content-kicker">Recommended pace</span><h2>Follow these stops in order.</h2><p>Each numbered row is one study sitting. Complete it, stop, and return on another day when possible. Spacing is part of the learning design.</p></div><ol>${module.learning.sessions.map((item,index)=>`<li class="${sessionDone(module,index)?"done":""}"><b>0${index+1}</b><span>${esc(item)}</span><i>${sessionDone(module,index)?"✓ Done":"Stop here"}</i></li>`).join("")}</ol></section>
          ${module.lessons.map((lesson,index) => lectureBlock(module, lesson, index, lessonRecord(module.id,index))).join("")}
          <section class="lab-section" id="lab"><div class="section-title"><div><span class="content-kicker">Investigate with evidence</span><h2>Substantive lab work</h2></div><p>${module.labs.length} lab${module.labs.length>1?"s":""} · data, analysis, and decision required</p></div>
            ${module.labs.map((lab,index)=>labBlock(module, lab, index, ms.labs[index])).join("")}
          </section>
          ${gateBlock(module, ms, open)}
          <div class="module-bottom-nav"><button class="link-button" data-module="${Math.max(1,module.id-1)}" ${module.id===1?"disabled":""}>← Previous module</button><button class="button ${passed ? "primary" : "ghost"}" data-go="#/path">Return to my path <span>→</span></button></div>
        </section>
      </main>`;
  }

  function lessonReady(lesson, record) {
    return lesson.checkpoint.every((item, qIndex) => record.answers[qIndex] === item.a) && record.explanation.trim().length >= 80;
  }

  function lessonSlides(module, lesson) {
    return [
      { eyebrow:"Orient", title:lesson.guidingQuestion, body:[`This ${lesson.minutes}-minute learning segment is broken into short, learner-controlled chapters. Listen, pause, replay, and use the visual to build a mental model before you retrieve.`], kind:"intro" },
      ...lesson.sections.map((section,index)=>({ eyebrow:`Explain ${index+1} of ${lesson.sections.length}`, title:section.title, body:section.paragraphs, points:section.points, kind:"concept" })),
      { eyebrow:"Watch the reasoning", title:lesson.worked.title, body:[lesson.worked.situation], points:lesson.worked.steps, conclusion:lesson.worked.conclusion, kind:"worked" },
      { eyebrow:"Teach it", title:"Turn the concept into a decision", body:[lesson.case], points:lesson.teacherMoves, conclusion:"Next: close the explanation and complete the retrieval check from memory.", kind:"apply" }
    ];
  }

  function vectorVisual(moduleId) {
    const label = DATA.modules.find(m=>m.id===moduleId)?.short || "Movement model";
    const visuals = {
      1:`<svg viewBox="0 0 520 300" role="img" aria-label="Observe, explain, decide, verify movement analysis loop"><g class="loop-arrows"><path d="M110 75 H225"/><path d="M295 75 H410"/><path d="M430 95 V205"/><path d="M410 225 H295"/><path d="M225 225 H110"/><path d="M90 205 V95"/></g>${[[90,75,"OBSERVE"],[260,75,"EXPLAIN"],[430,75,"DECIDE"],[260,225,"VERIFY"]].map(x=>`<g><circle cx="${x[0]}" cy="${x[1]}" r="48"/><text x="${x[0]}" y="${x[1]+5}">${x[2]}</text></g>`).join("")}<text class="visual-center" x="260" y="158">MOVEMENT EVIDENCE</text></svg>`,
      2:`<svg viewBox="0 0 520 300" role="img" aria-label="Joint demand changes across lowering, pause, and raising phases"><line x1="70" y1="242" x2="455" y2="242"/><g class="phase-bars"><rect x="90" y="115" width="90" height="127"/><rect x="215" y="175" width="90" height="67"/><rect x="340" y="75" width="90" height="167"/></g><text x="135" y="270">LOWER</text><text x="260" y="270">PAUSE</text><text x="385" y="270">RAISE</text><text class="visual-center" x="260" y="35">MUSCLE ACTION CHANGES WITH THE PHASE</text></svg>`,
      3:`<svg viewBox="0 0 520 300" role="img" aria-label="Neural signal to muscle force sequence"><g class="signal-path">${[[50,"SIGNAL"],[150,"ACh"],[250,"Ca²+"],[350,"BRIDGE"],[450,"FORCE"]].map((x,i)=>`<g><circle cx="${x[0]}" cy="150" r="38"/><text x="${x[0]}" y="155">${x[1]}</text>${i<4?`<path d="M${x[0]+40} 150 H${x[0]+60}"/>`:""}</g>`).join("")}</g><text class="visual-center" x="260" y="60">EXCITATION → CONTRACTION</text></svg>`,
      4:`<svg viewBox="0 0 520 300" role="img" aria-label="Lever arm and torque diagram"><line x1="80" y1="215" x2="430" y2="120"/><circle cx="80" cy="215" r="18"/><path class="force-arrow" d="M430 45 V112"/><path class="force-arrow" d="M255 235 V160"/><text x="390" y="35">EXTERNAL FORCE</text><text x="205" y="270">MUSCLE FORCE</text><text class="visual-center" x="260" y="90">TORQUE = FORCE × MOMENT ARM</text></svg>`,
      5:`<svg viewBox="0 0 520 300" role="img" aria-label="Energy system contribution over time"><path class="energy e1" d="M40 240 C80 50 130 60 190 220 L190 240Z"/><path class="energy e2" d="M90 240 C180 85 280 85 360 225 L360 240Z"/><path class="energy e3" d="M120 240 C240 175 370 100 485 90 L485 240Z"/><text x="70" y="60">ATP-PC</text><text x="210" y="115">GLYCOLYTIC</text><text x="380" y="75">OXIDATIVE</text><line x1="35" y1="242" x2="490" y2="242"/><text x="230" y="276">TIME →</text></svg>`,
      6:`<svg viewBox="0 0 520 300" role="img" aria-label="Fitness and fatigue response after training"><path class="curve fitness" d="M30 205 C115 205 125 110 215 125 S345 75 490 88"/><path class="curve fatigue" d="M30 110 C100 105 110 245 205 215 S350 195 490 175"/><line x1="30" y1="205" x2="490" y2="205"/><text x="365" y="67">FITNESS</text><text x="365" y="228">FATIGUE</text><text class="visual-center" x="260" y="35">READINESS IS THE NET RESULT</text></svg>`,
      7:`<svg viewBox="0 0 520 300" role="img" aria-label="Progression staircase based on competence"><path class="stairs" d="M45 240 H145 V195 H245 V150 H345 V105 H455"/><g>${[[95,220,"CONTROL"],[195,175,"VOLUME"],[295,130,"LOAD"],[400,85,"COMPLEXITY"]].map(x=>`<text x="${x[0]}" y="${x[1]}">${x[2]}</text>`).join("")}</g><text class="visual-center" x="260" y="280">EARN THE NEXT STEP WITH EVIDENCE</text></svg>`,
      8:`<svg viewBox="0 0 520 300" role="img" aria-label="Force velocity tradeoff and braking impulse"><path class="curve fitness" d="M55 65 C185 80 260 145 455 235"/><line x1="55" y1="240" x2="465" y2="240"/><line x1="55" y1="240" x2="55" y2="45"/><text x="390" y="265">VELOCITY</text><text x="18" y="65" transform="rotate(-90 18 65)">FORCE</text><path class="force-arrow" d="M185 220 V115"/><text x="120" y="100">MORE TIME TO BRAKE</text></svg>`,
      9:`<svg viewBox="0 0 520 300" role="img" aria-label="Measurement target showing validity reliability and error"><g class="target">${[105,78,52,26].map(r=>`<circle cx="260" cy="150" r="${r}"/>`).join("")}<line x1="145" y1="150" x2="375" y2="150"/><line x1="260" y1="35" x2="260" y2="265"/>${[[250,145],[270,153],[257,163],[265,137],[245,155]].map(p=>`<circle class="hit" cx="${p[0]}" cy="${p[1]}" r="5"/>`).join("")}</g><text class="visual-center" x="260" y="290">CONSISTENT + ON TARGET = TRUSTWORTHY</text></svg>`,
      10:`<svg viewBox="0 0 520 300" role="img" aria-label="Evidence based decision chain"><g class="decision-chain">${[[70,"CLAIM"],[195,"EVIDENCE"],[325,"DECISION"],[450,"VERIFY"]].map((x,i)=>`<g><rect x="${x[0]-50}" y="115" width="100" height="70" rx="8"/><text x="${x[0]}" y="155">${x[1]}</text>${i<3?`<path d="M${x[0]+53} 150 H${x[0]+72}"/>`:""}</g>`).join("")}</g><text class="visual-center" x="260" y="65">PROFESSIONAL JUDGMENT MUST BE AUDITABLE</text></svg>`
    };
    return `<div class="concept-visual" data-module-visual="${moduleId}">${visuals[moduleId] || visuals[1]}<small>${esc(label)} · conceptual model</small></div>`;
  }

  function studyView(moduleId, lessonIndex) {
    const module = DATA.modules.find(m=>m.id===Number(moduleId));
    const lesson = module?.lessons[Number(lessonIndex)];
    if (!module || !lesson) return home();
    const record = lessonRecord(module.id,Number(lessonIndex));
    const slides = lessonSlides(module,lesson);
    const slideIndex = Math.min(record.mediaSlide || 0,slides.length-1);
    const slide = slides[slideIndex];
    const spoken = [slide.eyebrow,slide.title,...slide.body,...(slide.points||[]),slide.conclusion||""].join(". ");
    return `${header("path")}<main class="study-player" data-study-player="${module.id}:${lessonIndex}">
      <aside class="study-outline"><a href="#/module/${module.id}">← Module ${String(module.id).padStart(2,"0")}</a><span>VISUAL MICROLECTURE</span><h2>${esc(lesson.title)}</h2><p>${lesson.minutes} minutes total · pause whenever you need</p><ol>${slides.map((item,i)=>`<li class="${i===slideIndex?"current":""} ${i<slideIndex||record.mediaComplete?"visited":""}"><button data-slide="${i}"><b>${String(i+1).padStart(2,"0")}</b><span>${esc(item.eyebrow)}<small>${esc(item.title)}</small></span></button></li>`).join("")}</ol></aside>
      <section class="study-stage">
        <div class="study-progress"><span>Chapter ${slideIndex+1} of ${slides.length}</span><i><b style="width:${(slideIndex+1)/slides.length*100}%"></b></i><span>~${Math.max(2,Math.ceil(lesson.minutes/slides.length))} min</span></div>
        <article class="micro-slide ${slide.kind}"><div class="slide-copy"><span>${esc(slide.eyebrow)}</span><h1>${esc(slide.title)}</h1>${slide.body.map(p=>`<p>${esc(p)}</p>`).join("")}${slide.points?.length?`<ol>${slide.points.map((p,i)=>`<li><b>${i+1}</b><span>${esc(p)}</span></li>`).join("")}</ol>`:""}${slide.conclusion?`<strong>${esc(slide.conclusion)}</strong>`:""}</div>${vectorVisual(module.id)}</article>
        <div class="study-controls"><button class="study-audio" data-narrate="${esc(spoken)}" aria-label="Play narration for this chapter"><span>▶</span><div><strong>Listen to this chapter</strong><small>Browser narration · transcript remains visible</small></div></button><div><button class="link-button" data-slide="${Math.max(0,slideIndex-1)}" ${slideIndex===0?"disabled":""}>← Back</button>${slideIndex===slides.length-1?`<button class="button primary" data-finish-media="${module.id}:${lessonIndex}">Finish and retrieve <span>→</span></button>`:`<button class="button primary" data-slide="${slideIndex+1}">Next chapter <span>→</span></button>`}</div></div>
        <details class="study-transcript"><summary>Open the complete text transcript</summary>${lesson.sections.map(s=>`<section><h3>${esc(s.title)}</h3>${s.paragraphs.map(p=>`<p>${esc(p)}</p>`).join("")}</section>`).join("")}</details>
      </section></main>`;
  }

  function lectureBlock(module, lesson, index, record) {
    const ready = lessonReady(lesson, record);
    return `<section class="lecture-block" id="lesson-${index}">
      <div class="lecture-number"><span>Learning segment ${String(index+1).padStart(2,"0")} · ${lesson.minutes} minutes</span><i></i></div>
      <div class="lecture-title"><div><span class="content-kicker">Guiding question</span><h2>${esc(lesson.title)}</h2></div><span class="segment-state ${record.done ? "done" : ""}">${record.done ? "✓ Completed" : "Teach → model → retrieve → explain"}</span></div>
      <p class="guiding-question">${esc(lesson.guidingQuestion)}</p>
      <section class="media-launch"><div><span>LEARNER-PACED · NARRATED · CAPTIONED</span><h3>${record.mediaSlide ? "Resume your visual microlecture" : "Start with the visual explanation"}</h3><p>${lesson.sections.length+3} short chapters combine narration, precise diagrams, complete captions, and an optional text transcript. You control every transition.</p><div><i>◉ ${lesson.minutes} min</i><i>◉ ${lesson.sections.length+3} chapters</i><i>◉ Replay anytime</i></div></div>${vectorVisual(module.id)}<button class="button primary" data-study="${module.id}:${index}">${record.mediaSlide ? "Resume lesson" : "Open visual lesson"} <span>→</span></button></section>
      <details class="lesson-transcript"><summary>Read the lesson transcript instead</summary><div class="lesson-sections">${lesson.sections.map((section,sectionIndex)=>`<article class="lesson-section"><span>0${sectionIndex+1}</span><div><h3>${esc(section.title)}</h3>${section.paragraphs.map(paragraph=>`<p>${esc(paragraph)}</p>`).join("")}${section.points.length?`<ul>${section.points.map(point=>`<li>${esc(point)}</li>`).join("")}</ul>`:""}</div></article>`).join("")}</div></details>
      <article class="worked-example"><div><span>Worked example</span><h3>${esc(lesson.worked.title)}</h3><p>${esc(lesson.worked.situation)}</p></div><ol>${lesson.worked.steps.map((step,i)=>`<li><b>${i+1}</b><span>${esc(step)}</span></li>`).join("")}</ol><strong>${esc(lesson.worked.conclusion)}</strong></article>
      <div class="teaching-translation"><div><span class="content-kicker">Teaching translation</span><h3>Moves you can use Monday</h3></div><ul>${lesson.teacherMoves.map(move=>`<li>${esc(move)}</li>`).join("")}</ul></div>
      <div class="case-prompt"><span>APPLIED CASE</span><p>${esc(lesson.case)}</p><small>Reason through it: Observe → Explain → Decide → Verify</small></div>
      <section class="retrieval-check"><div class="retrieval-head"><span>Retrieval check</span><h3>Close the explanation above. Answer from memory.</h3><p>Both answers must be correct. Feedback is immediate so you can repair the idea before continuing.</p></div>${lesson.checkpoint.map((item,qIndex)=>{const selected=record.answers[qIndex];return `<article><h4>${qIndex+1}. ${esc(item.q)}</h4><div>${item.o.map((option,oIndex)=>`<button data-lesson-answer="${module.id}:${index}:${qIndex}:${oIndex}" class="${selected===oIndex?"selected":""} ${selected!==undefined&&oIndex===item.a?"best":""}"><span>${String.fromCharCode(65+oIndex)}</span>${esc(option)}</button>`).join("")}</div>${selected!==undefined?`<p class="${selected===item.a?"correct":"review"}"><strong>${selected===item.a?"Correct.":"Not yet."}</strong> ${esc(item.x)}</p>`:""}</article>`;}).join("")}</section>
      <section class="self-explain"><label for="explain-${module.id}-${index}"><strong>Self-explanation</strong><span>${esc(lesson.explain)}</span></label><textarea id="explain-${module.id}-${index}" data-lesson-explain="${module.id}:${index}" placeholder="Explain the mechanism in your own words and connect it to a teaching decision…">${esc(record.explanation)}</textarea><div><small>${record.explanation.length}/80 minimum characters · principle and application required</small><button class="completion-button ${record.done ? "done" : ""}" data-lesson-complete="${module.id}:${index}" ${(!ready && !record.done) ? "disabled" : ""}>${record.done ? "✓ Segment completed" : "Complete learning segment"}</button></div></section>
    </section>`;
  }

  function labBlock(module, lab, index, saved) {
    saved = saved || {notes:"",safety:false,done:false};
    return `<article class="lab-card ${saved.done ? "complete" : ""}"><div class="lab-head"><div><span>Lab ${index+1} · ${lab.minutes} minutes</span><h3>${esc(lab.title)}</h3></div><strong>${saved.done ? "✓ Complete" : "Data + analysis required"}</strong></div>
      <div class="lab-primer"><span>Purpose</span><p>${esc(lab.primer)}</p><strong>${esc(lab.question)}</strong></div>
      <div class="lab-layout"><div><h4>Materials</h4><p>${esc(lab.materials)}</p><h4>Variables and controls</h4><ul>${lab.variables.map(item=>`<li>${esc(item)}</li>`).join("")}</ul><h4>Safety confirmation</h4><label class="safety-check"><input type="checkbox" data-lab-safety="${module.id}:${index}" ${saved.safety ? "checked" : ""}><span></span><p>${esc(lab.safety)}</p></label></div><div><h4>Procedure</h4><ol>${lab.steps.map(step=>`<li>${esc(step)}</li>`).join("")}</ol></div></div>
      <div class="lab-analysis-grid"><article><h4>Record these data</h4><ul>${lab.data.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></article><article><h4>Required calculations</h4><ul>${lab.calculations.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></article><article><h4>Analyze</h4><ol>${lab.analysis.map(item=>`<li>${esc(item)}</li>`).join("")}</ol></article></div>
      <div class="lab-quality"><strong>Completion standard</strong>${lab.quality.map(item=>`<span>✓ ${esc(item)}</span>`).join("")}</div>
      <div class="lab-evidence"><label for="lab-${module.id}-${index}"><strong>Lab record and interpretation</strong><span>${esc(lab.evidence)}</span></label><textarea id="lab-${module.id}-${index}" data-lab-notes="${module.id}:${index}" placeholder="Enter your measurements, calculations, interpretation, and teaching decision…">${esc(saved.notes)}</textarea><div><small>${saved.notes.length}/${lab.minChars} minimum characters · safety confirmation required</small><button class="completion-button ${saved.done ? "done" : ""}" data-lab-complete="${module.id}:${index}" ${(!saved.safety || saved.notes.trim().length < lab.minChars) ? "disabled" : ""}>${saved.done ? "✓ Lab evidence saved" : "Complete this lab"}</button></div></div></article>`;
  }

  function selectGateForm(module, previous = []) {
    const available = module.gateBank.map(item=>item.id).filter(id=>!previous.includes(id));
    const pool = available.length >= 5 ? available : module.gateBank.map(item=>item.id);
    return pool.slice(0,5);
  }

  function gateQuestions(module) {
    const gate = moduleState(module.id).gate;
    if (!gate.form.length) gate.form = selectGateForm(module, gate.lastForm);
    return gate.form.map(id=>module.gateBank.find(item=>item.id===id));
  }

  function gateBlock(module, ms, open) {
    const gate = ms.gate; const items = gateQuestions(module);
    if (!state.pretestFinished) return `<section class="gate-section locked" id="gate"><div class="gate-lock">LOCKED</div><h2>Complete the baseline pretest first.</h2><p>Your pretest determines which learning work is required before this competency gate.</p><button class="button primary" data-go="#/pretest">Open pretest <span>→</span></button></section>`;
    if (!open && !gate.submitted) return `<section class="gate-section locked" id="gate"><div class="gate-lock">LOCKED</div><h2>Finish the taught segments and lab evidence first.</h2><p>The gate opens when every required learning segment includes correct retrieval plus a self-explanation, and every lab contains its complete evidence record.</p><div class="unlock-list"><span class="${lessonComplete(module)?"done":""}">Taught segments</span><span class="${labsComplete(module)?"done":""}">Evidence lab</span></div></section>`;
    const missed = gate.submitted && !gate.passed ? items.filter((item,index)=>gate.answers[index]!==item.a) : [];
    const remediationReady = gate.requiredLessons.every(index=>lessonRecord(module.id,index).done) && labsComplete(module) && (gate.remediationNote||"").trim().length >= 120;
    return `<section class="gate-section ${gate.passed ? "passed" : ""}" id="gate"><div class="section-title"><div><span class="content-kicker">Demonstrate competency</span><h2>Module ${module.id} mastery gate</h2></div><p>Fresh five-question form · pass with 4 of 5 correct</p></div>
      ${gate.passed ? `<div class="mastery-banner"><span>✓</span><div><strong>Competency demonstrated</strong><p>You scored ${gate.score}/5 (${gate.score*20}%) on attempt ${gate.attempts}. This module is complete.</p></div><button class="button ghost light" data-gate-retry="${module.id}">Practice again</button></div>` : ""}
      <div class="gate-questions">${items.map((q,index)=>{
        const selected=gate.answers[index]; const correct=gate.submitted && selected===q.a; const wrong=gate.submitted && selected!==undefined && selected!==q.a;
        return `<article class="gate-question ${correct?"correct":""} ${wrong?"wrong":""}"><span>Question ${index+1}</span><h3>${esc(q.q)}</h3><div>${q.o.map((option,oi)=>`<button data-gate-answer="${module.id}:${index}:${oi}" class="${selected===oi?"selected":""} ${gate.submitted&&oi===q.a?"best":""}" ${gate.submitted?"disabled":""}><span>${String.fromCharCode(65+oi)}</span>${esc(option)}</button>`).join("")}</div>${gate.submitted?`<p class="gate-feedback"><strong>${selected===q.a?"Correct.":"Review:"}</strong> ${esc(q.x)}</p>`:""}</article>`;
      }).join("")}</div>
      ${gate.submitted&&!gate.passed?`<section class="corrective-study"><span class="content-kicker">Corrective instruction before the next form</span><h3>Your next gate will contain five different questions.</h3><p>Use the feedback above, revisit the prescribed segments, and explain the corrected principles. A direct gate-first attempt that does not pass also requires the evidence lab.</p><div class="remediation-list">${missed.map(item=>`<a data-scroll="lesson-${item.lesson}"><b>Review segment ${item.lesson+1}</b><span>${esc(item.x)}</span></a>`).join("")}<a data-scroll="lab"><b>Complete/recheck the evidence lab</b><span>Use the principle in a measured investigation and teaching decision.</span></a></div><label><strong>Corrective self-explanation</strong><span>For each missed idea, explain why the correct principle is true and why your original choice was less defensible.</span><textarea data-remediation-note="${module.id}" placeholder="Write at least 120 characters of corrected reasoning…">${esc(gate.remediationNote||"")}</textarea><small>${(gate.remediationNote||"").length}/120 minimum characters</small></label></section>`:""}
      <div class="gate-submit">${gate.submitted&&!gate.passed?`<div><strong>${gate.score}/5 · Correct, then retry</strong><p>${remediationReady?"Corrective work complete. Generate a different five-question form.":"Complete the listed instruction, lab, and corrective explanation."}</p></div><button class="button primary" data-gate-retry="${module.id}" ${remediationReady?"":"disabled"}>Generate new questions <span>↻</span></button>`:`<div><strong>${gate.passed?"Optional practice":"Ready to submit?"}</strong><p>${gate.passed?"A new five-question form will not remove your mastery record.":"You need at least 4 correct answers."}</p></div><button class="button primary" data-gate-submit="${module.id}" ${Object.keys(gate.answers).length<5||gate.submitted?"disabled":""}>Score this gate <span>→</span></button>`}</div>
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
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (hash.startsWith("#/study/")) { const parts=hash.split("/"); app.innerHTML=studyView(parts[2],parts[3]); }
    else if (hash.startsWith("#/module/")) app.innerHTML = moduleView(hash.split("/")[2]);
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
    app.querySelectorAll("[data-study]").forEach(el=>el.addEventListener("click",()=>{const [m,i]=el.dataset.study.split(":");track("visual_lesson_opened",{module:Number(m),lesson:Number(i)});save();go(`#/study/${m}/${i}`);}));
    app.querySelectorAll("[data-next-action]").forEach(el=>el.addEventListener("click",()=>{const target=el.dataset.nextAction;const anchor=el.dataset.anchor;track("next_action_started",{target,anchor});save();go(target);if(anchor)setTimeout(()=>document.getElementById(anchor)?.scrollIntoView({behavior:"smooth"}),120);}));
    app.querySelectorAll("[data-slide]").forEach(el=>el.addEventListener("click",()=>{const player=app.querySelector("[data-study-player]");if(!player)return;const [m,i]=player.dataset.studyPlayer.split(":");const record=lessonRecord(m,i);record.mediaSlide=Number(el.dataset.slide);track("visual_chapter_viewed",{module:Number(m),lesson:Number(i),chapter:record.mediaSlide});save();render();window.scrollTo({top:0,behavior:"smooth"});}));
    app.querySelectorAll("[data-narrate]").forEach(el=>el.addEventListener("click",()=>{if(!("speechSynthesis" in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(el.dataset.narrate);utterance.rate=.96;utterance.pitch=1;utterance.onstart=()=>{el.classList.add("playing");el.querySelector("span").textContent="■";};utterance.onend=()=>{el.classList.remove("playing");el.querySelector("span").textContent="▶";};window.speechSynthesis.speak(utterance);track("narration_played",{});save();}));
    app.querySelectorAll("[data-finish-media]").forEach(el=>el.addEventListener("click",()=>{const [m,i]=el.dataset.finishMedia.split(":");const record=lessonRecord(m,i);record.mediaComplete=true;track("visual_lesson_completed",{module:Number(m),lesson:Number(i)});save();go(`#/module/${m}`);setTimeout(()=>document.getElementById(`lesson-${i}`)?.scrollIntoView({behavior:"smooth"}),120);}));
    app.querySelectorAll("[data-answer]").forEach(el=>el.addEventListener("click",()=>{const q=DATA.pretest[state.pretestIndex];state.pretestAnswers[q.id]=Number(el.dataset.answer);save();render();}));
    app.querySelectorAll("[data-confidence]").forEach(el=>el.addEventListener("click",()=>{const q=DATA.pretest[state.pretestIndex];state.confidence[q.id]=Number(el.dataset.confidence);save();render();}));
    const next=app.querySelector("[data-test-next]"); if(next) next.addEventListener("click",()=>{if(state.pretestIndex===29){state.pretestFinished=true;track("pretest_completed",{score:scores().reduce((s,x)=>s+x.correct,0)});save();render();window.scrollTo(0,0);}else{state.pretestIndex++;save();render();window.scrollTo(0,0);}});
    const prev=app.querySelector("[data-test-prev]"); if(prev) prev.addEventListener("click",()=>{state.pretestIndex=Math.max(0,state.pretestIndex-1);save();render();window.scrollTo(0,0);});
    app.querySelectorAll("[data-lesson-answer]").forEach(el=>el.addEventListener("click",()=>{const [m,i,qIndex,a]=el.dataset.lessonAnswer.split(":");const record=lessonRecord(m,i);record.answers[qIndex]=Number(a);record.done=false;save();render();document.getElementById(`lesson-${i}`)?.scrollIntoView();}));
    app.querySelectorAll("[data-lesson-explain]").forEach(el=>el.addEventListener("input",()=>{const [m,i]=el.dataset.lessonExplain.split(":");const record=lessonRecord(m,i);record.explanation=el.value;if(el.value.trim().length<80)record.done=false;save();const lesson=DATA.modules.find(item=>item.id===Number(m)).lessons[Number(i)];const button=app.querySelector(`[data-lesson-complete="${m}:${i}"]`);if(button)button.disabled=!lessonReady(lesson,record);const small=el.parentElement.querySelector("small");if(small)small.textContent=`${el.value.length}/80 minimum characters · principle and application required`;}));
    app.querySelectorAll("[data-lesson-complete]").forEach(el=>el.addEventListener("click",()=>{const [m,i]=el.dataset.lessonComplete.split(":");const record=lessonRecord(m,i);const lesson=DATA.modules.find(item=>item.id===Number(m)).lessons[Number(i)];if(lessonReady(lesson,record)){record.done=true;track("learning_segment_completed",{module:Number(m),lesson:Number(i)});save();render();document.getElementById(`lesson-${i}`)?.scrollIntoView();}}));
    app.querySelectorAll("[data-lab-notes]").forEach(el=>el.addEventListener("input",()=>{const [m,i]=el.dataset.labNotes.split(":");const ms=moduleState(m);const lab=DATA.modules.find(item=>item.id===Number(m)).labs[Number(i)];ms.labs[i]=Object.assign({notes:"",safety:false,done:false},ms.labs[i],{notes:el.value});if(el.value.trim().length<lab.minChars)ms.labs[i].done=false;save();const button=app.querySelector(`[data-lab-complete="${m}:${i}"]`);if(button)button.disabled=!(ms.labs[i].safety&&el.value.trim().length>=lab.minChars);const small=el.parentElement.querySelector("small");if(small)small.textContent=`${el.value.length}/${lab.minChars} minimum characters · safety confirmation required`;}));
    app.querySelectorAll("[data-lab-safety]").forEach(el=>el.addEventListener("change",()=>{const [m,i]=el.dataset.labSafety.split(":");const ms=moduleState(m);ms.labs[i]=Object.assign({notes:"",safety:false,done:false},ms.labs[i],{safety:el.checked});if(!el.checked)ms.labs[i].done=false;save();render();document.getElementById("lab")?.scrollIntoView();}));
    app.querySelectorAll("[data-lab-complete]").forEach(el=>el.addEventListener("click",()=>{const [m,i]=el.dataset.labComplete.split(":");const savedLab=moduleState(m).labs[i];const lab=DATA.modules.find(item=>item.id===Number(m)).labs[Number(i)];if(savedLab&&savedLab.safety&&savedLab.notes.trim().length>=lab.minChars){savedLab.done=true;track("evidence_lab_completed",{module:Number(m),lab:Number(i)});save();render();document.getElementById("lab")?.scrollIntoView();}}));
    app.querySelectorAll("[data-gate-answer]").forEach(el=>el.addEventListener("click",()=>{const [m,q,a]=el.dataset.gateAnswer.split(":");const gate=moduleState(m).gate;if(!gate.submitted){gate.answers[q]=Number(a);save();render();document.getElementById("gate")?.scrollIntoView();}}));
    app.querySelectorAll("[data-remediation-note]").forEach(el=>el.addEventListener("input",()=>{const id=Number(el.dataset.remediationNote);const gate=moduleState(id).gate;gate.remediationNote=el.value;save();const module=DATA.modules.find(item=>item.id===id);const ready=gate.requiredLessons.every(index=>lessonRecord(id,index).done)&&labsComplete(module)&&el.value.trim().length>=120;const button=app.querySelector(`[data-gate-retry="${id}"]`);if(button)button.disabled=!ready;const small=el.parentElement.querySelector("small");if(small)small.textContent=`${el.value.length}/120 minimum characters`;}));
    app.querySelectorAll("[data-gate-submit]").forEach(el=>el.addEventListener("click",()=>{const id=Number(el.dataset.gateSubmit);const gate=moduleState(id).gate;const items=gateQuestions(DATA.modules[id-1]);gate.score=items.filter((item,i)=>gate.answers[i]===item.a).length;gate.attempts++;gate.submitted=true;if(gate.score>=4){gate.passed=true;gate.remediationRequired=false;}else{gate.passed=false;gate.remediationRequired=true;gate.requiredLessons=[...new Set(items.filter((item,i)=>gate.answers[i]!==item.a).map(item=>item.lesson))];gate.remediationNote="";}track("competency_gate_submitted",{module:id,score:gate.score,attempt:gate.attempts,passed:gate.passed});save();render();document.getElementById("gate")?.scrollIntoView();}));
    app.querySelectorAll("[data-gate-retry]").forEach(el=>el.addEventListener("click",()=>{const id=Number(el.dataset.gateRetry);const module=DATA.modules.find(item=>item.id===id);const gate=moduleState(id).gate;if(gate.submitted&&!gate.passed){const ready=gate.requiredLessons.every(index=>lessonRecord(id,index).done)&&labsComplete(module)&&(gate.remediationNote||"").trim().length>=120;if(!ready)return;}gate.lastForm=[...gate.form];gate.form=selectGateForm(module,gate.lastForm);gate.answers={};gate.submitted=false;gate.score=0;gate.remediationRequired=false;gate.requiredLessons=[];gate.remediationNote="";save();render();document.getElementById("gate")?.scrollIntoView();}));
    app.querySelectorAll("[data-print]").forEach(el=>el.addEventListener("click",()=>window.print()));
    app.querySelectorAll("[data-copy-report]").forEach(el=>el.addEventListener("click",async()=>{await navigator.clipboard.writeText(reportText());el.textContent="Copied!";setTimeout(()=>el.textContent="Copy progress report",1500);}));
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("DOMContentLoaded", () => {
    if(!state.syncId) state.syncId=crypto.randomUUID();
    if(!state.syncKey){const bytes=crypto.getRandomValues(new Uint8Array(32));state.syncKey=Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("");}
    if (!state.startedAt) { state.startedAt = new Date().toISOString(); save(); }
    else { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); scheduleSync(); }
    render();
  });
})();
