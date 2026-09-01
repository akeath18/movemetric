window.PETE345_DATA = {
  course: {
    code: "PETE 345",
    title: "Kinesiology & Efficiency of Human Movement",
    audience: "Preservice P–12 health and physical education teachers",
    throughline: "Observe movement, explain it with anatomy, physiology, and biomechanics, then change the task, cue, or training dose to improve learning, performance, health, and safety.",
    mastery: 80
  },
  modules: [
    {
      id: 1, weeks: "Weeks 1–2", phase: "Describe", title: "Movement Lens & Anatomical Language", short: "Movement language",
      purpose: "Build the precise observation language that every later analysis depends on.",
      outcomes: ["Distinguish anatomy, physiology, biomechanics, and motor behavior", "Judge efficiency as a fit among outcome, effort, control, and safety", "Name joint actions using planes, axes, phases, and the performer’s perspective"],
      lessons: [
        {
          title: "Movement as a system", bigIdea: "Efficient movement is task-specific. It solves a movement problem with an appropriate balance of outcome, effort, control, and safety.",
          modelTitle: "Four lenses explain one movement", model: ["Anatomy: what structures can move?", "Physiology: how is work fueled and sustained?", "Biomechanics: what forces create the motion?", "Motor behavior: how is the action learned and controlled?"],
          mechanismTitle: "Efficiency is a fit, not a look", mechanism: ["Name the task goal", "Identify the mover, task, and environment constraints", "Observe outcome plus process", "Change one variable and recheck"],
          teacherMoves: ["Start with what the learner is trying to accomplish", "Use neutral, observable language", "Cue one high-value change at a time", "Retest before deciding the cue worked"],
          case: "Two students complete the same shuttle time. One uses controlled turns; the other slips and takes extra recovery steps. Who is more efficient, and what evidence supports the claim?"
        },
        {
          title: "Planes, axes, and joint actions", bigIdea: "Precise anatomical language lets teachers describe movement consistently from the performer’s perspective.",
          modelTitle: "Plane and axis work as a pair", model: ["Sagittal plane / mediolateral axis", "Frontal plane / anteroposterior axis", "Transverse plane / longitudinal axis", "Most sport skills are multiplanar even when one plane dominates"],
          mechanismTitle: "Describe one joint in one phase", mechanism: ["Choose the performer’s perspective", "Freeze a meaningful phase", "Name the joint action", "State the plane and axis"],
          teacherMoves: ["Model left and right from the student’s perspective", "Use body landmarks before memorized labels", "Ask students to justify the dominant plane", "Connect the term to a teachable cue"],
          case: "During the preparation phase of an overhand throw, the trunk rotates while the shoulder horizontally abducts. Which plane dominates each action?"
        }
      ],
      labs: [
        { title: "Grip-strength baseline and testing audit", materials: "Handgrip dynamometer or squeeze device, recording sheet, timer", steps: ["Standardize posture and handle position", "Collect three trials per hand", "Compare consistency, fatigue, and learning effects", "Write one testing cue and one validity threat"], safety: "Screen for hand or wrist pain; do not perform a maximal trial after injury.", evidence: "Record the six trials, identify the most consistent hand, and name one threat to a fair comparison." },
        { title: "Human compass and movement match-up", materials: "Movement cards, tape lines, optional phone for slow-motion replay", steps: ["Perform sagittal, frontal, and transverse examples", "Select a meaningful phase of a familiar skill", "Name one joint action, plane, and axis", "Teach the analysis to a partner"], safety: "Use low-speed, noncontact movements and adequate spacing.", evidence: "Describe two phases of one skill with joint action, plane, axis, and performer perspective." }
      ],
      application: "Produce a four-lens analysis of a squat, throw, jump, or sprint start. Separate what you observed from what you inferred."
    },
    {
      id: 2, weeks: "Weeks 3–4", phase: "Describe", title: "Joints & Muscles in Action", short: "Joints & muscles",
      purpose: "Connect body structure and muscle action to safe, teachable movement choices.",
      outcomes: ["Relate joint structure to mobility and stability", "Distinguish concentric, eccentric, and isometric muscle action", "Modify range, support, or load while preserving the task goal"],
      lessons: [
        {
          title: "Skeletal and joint foundations", bigIdea: "Joint structure creates both movement opportunity and movement constraint.",
          modelTitle: "The skeleton is a linked framework", model: ["Axial structures protect and organize the trunk", "Appendicular structures support locomotion and manipulation", "Joints trade mobility for stability", "Cartilage, ligaments, and tendons manage load differently"],
          mechanismTitle: "Structure shapes the available solution", mechanism: ["Joint geometry limits degrees of freedom", "Alignment changes how load is distributed", "Range must match the task", "Control matters more than maximal range"],
          teacherMoves: ["Teach landmarks through movement", "Avoid one-size-fits-all depth rules", "Scale range before adding load or speed", "Treat pain as a stop signal"],
          case: "A student’s heels rise early in a squat. Name two possible contributors and one task modification that preserves the learning goal."
        },
        {
          title: "Muscles as movers, brakes, and stabilizers", bigIdea: "Muscles accelerate, decelerate, stabilize, maintain posture, and produce heat—not merely shorten.",
          modelTitle: "Muscle role depends on the phase", model: ["Concentric action overcomes resistance", "Eccentric action controls or absorbs load", "Isometric action holds position", "The same muscle can change roles across a skill"],
          mechanismTitle: "Map muscles to joint actions", mechanism: ["Name the joint motion", "Identify the torque-producing muscle group", "Decide whether it shortens, lengthens, or holds", "Identify the stabilizing demand"],
          teacherMoves: ["Teach function before memorized lists", "Use lowering phases to teach control", "Cue the joint action, not vague muscle squeezing", "Compare open- and closed-chain versions"],
          case: "In the lowering and rising phases of a squat, how do the quadriceps and gluteals act, and what must the trunk muscles do?"
        }
      ],
      labs: [
        { title: "Mobility and stability stations", materials: "Dowels, low boxes, wall space, tape", steps: ["Observe ankle, knee, hip, trunk, and shoulder tasks", "Separate available range from controlled range", "Change stance, support, or depth", "Record which constraint improved the pattern"], safety: "Do not force range; maintain stable surfaces and stop with pain.", evidence: "Build a three-step modification ladder for a squat, lunge, push-up, or overhead reach." },
        { title: "Muscle role and action circuit", materials: "Resistance bands, mats, light medicine balls", steps: ["Perform a squat, row, push-up, and overhead hold", "Name the prime joint action", "Classify the muscle action by phase", "Give a cue that changes control without changing the goal"], safety: "Use submaximal resistance and check every band anchor.", evidence: "Create a two-phase muscle map for one locomotor and one object-control skill." }
      ],
      application: "Explain how one structural constraint and one muscle-action demand shape a safe movement progression."
    },
    {
      id: 3, weeks: "Week 5", phase: "Explain", title: "Neuromuscular Control & Skill Learning", short: "Motor control",
      purpose: "Explain how the nervous system grades force and how feedback changes learning.",
      outcomes: ["Explain motor units, recruitment, and rate coding", "Trace the signal from motor neuron to contraction", "Select feedback that supports learning without creating dependence"],
      lessons: [
        {
          title: "From neural signal to coordinated action", bigIdea: "The nervous system grades force and coordinates timing by recruiting motor units and refining patterns through practice and feedback.",
          modelTitle: "Force is graded by the nervous system", model: ["A motor unit is one motor neuron plus its fibers", "Smaller, fatigue-resistant units are generally recruited first", "More units and faster firing increase force", "Coordination can improve before muscle size changes"],
          mechanismTitle: "Signal to contraction", mechanism: ["Motor neuron releases acetylcholine", "A muscle action potential triggers calcium release", "Calcium exposes actin binding sites", "ATP supports cross-bridge cycling and calcium reuptake"],
          teacherMoves: ["Use external-focus cues when possible", "Allow attempts before adding feedback", "Give one correction tied to an observable feature", "Vary practice after the learner stabilizes the basic pattern"],
          case: "A novice improves a lift in two sessions without visible hypertrophy. Explain the likely neural and learning contributions."
        }
      ],
      labs: [
        { title: "Force grading and feedback experiment", materials: "Light balls, targets, resistance bands, rating sheet", steps: ["Produce three intended force levels", "Compare self-rating with outcome", "Repeat with immediate and delayed feedback", "Decide which feedback schedule supported control"], safety: "Use light implements and clear throwing lanes.", evidence: "Report which feedback schedule supported the best control and explain why using knowledge of results or performance." }
      ],
      application: "Design a three-cue progression and feedback schedule for a novice movement skill."
    },
    {
      id: 4, weeks: "Weeks 6–7", phase: "Explain", title: "Applied Biomechanics", short: "Biomechanics",
      purpose: "Describe motion precisely, then explain how force, time, and lever arms change it.",
      outcomes: ["Distinguish kinematics from kinetics", "Use center of mass and base of support to explain balance", "Apply impulse, momentum, torque, and lever arms to PE tasks"],
      lessons: [
        {
          title: "Kinematics, balance, and projectiles", bigIdea: "Kinematics describes what moved; teachers use it to make observation measurable before explaining causes.",
          modelTitle: "Describe motion before explaining force", model: ["Position changes across time", "Velocity includes direction", "Acceleration is a change in velocity", "Angular and linear motion occur together in most skills"],
          mechanismTitle: "Stability changes with geometry", mechanism: ["A wider base generally increases stability", "A lower center of mass generally increases stability", "The line of gravity must be controlled relative to the base", "More stability can reduce mobility and speed"],
          teacherMoves: ["Use video frames as evidence", "Measure one variable reliably", "Compare phases instead of judging the whole skill", "Choose stability or mobility based on task intent"],
          case: "Why does a defender lower and widen the stance while a sprinter uses a narrow base at top speed?"
        },
        {
          title: "Force, impulse, torque, and levers", bigIdea: "Motion changes when net force acts; technique changes how force is produced, timed, directed, and absorbed.",
          modelTitle: "Force has magnitude, direction, and time", model: ["Net force changes acceleration", "Action-reaction forces occur as pairs", "Impulse equals force multiplied by time", "Momentum change depends on impulse"],
          mechanismTitle: "Torque depends on the moment arm", mechanism: ["Torque is a turning effect of force", "A longer perpendicular moment arm increases torque", "External load position changes joint demand", "Third-class levers favor speed and range over force advantage"],
          teacherMoves: ["Cue force direction relative to the task", "Teach soft landings by increasing stopping time", "Move the load closer before reducing range", "Use cause-effect language before formulas"],
          case: "Compare catching a fast ball with rigid arms versus yielding arms. How does stopping time change average force?"
        }
      ],
      labs: [
        { title: "Phone-video kinematics mini-lab", materials: "Phone or tablet, tape measure, cones, stopwatch", steps: ["Record a short acceleration or jump", "Mark start, midpoint, and finish frames", "Estimate displacement and average velocity", "Identify one contributing angular motion"], safety: "Use one-way lanes and a designated filming zone.", evidence: "Use three frames to describe position, time, velocity, and balance without explaining causes yet." },
        { title: "Impulse and lever stations", materials: "Soft balls, mats, light dumbbells, meter sticks", steps: ["Catch with rigid then yielding arms", "Land with two stopping strategies", "Hold the same load near and far from a joint", "Explain the force or torque difference"], safety: "Use soft balls, low jumps, and light loads.", evidence: "Explain one performance cue and one safety cue using force, impulse, or torque." }
      ],
      application: "Analyze one skill by separating a kinematic observation from a kinetic explanation and a testable teaching cue."
    },
    {
      id: 5, weeks: "Weeks 8–9", phase: "Explain", title: "Energy Metabolism & Cardiorespiratory Function", short: "Energy & oxygen",
      purpose: "Connect ATP supply and oxygen delivery to work-rest decisions in PE and training.",
      outcomes: ["Explain overlapping energy-system contributions", "Trace oxygen from air to working muscle", "Use heart rate, RPE, talk test, and recovery without overdiagnosing"],
      lessons: [
        {
          title: "Energy systems and metabolic health", bigIdea: "All energy systems contribute at once; intensity and duration shift their relative contribution and preferred fuels.",
          modelTitle: "Three systems share one job: resynthesize ATP", model: ["Phosphagen: highest rate, smallest capacity", "Glycolytic: rapid ATP from carbohydrate", "Oxidative: slower rate, large capacity", "System contribution overlaps from the first second"],
          mechanismTitle: "Intensity changes fuel use", mechanism: ["Higher intensity increases carbohydrate reliance", "Lower intensities permit greater relative fat oxidation", "Lactate can be transported and oxidized", "Training improves capacity, recovery, and metabolic flexibility"],
          teacherMoves: ["Match work-rest ratios to the learning goal", "Do not call lactate a waste product", "Separate percent fat use from total energy expenditure", "Use RPE and talk test when equipment is limited"],
          case: "Design different work-rest ratios for sprint mechanics, repeated court movement, and an aerobic game."
        },
        {
          title: "Cardiorespiratory function and oxygen delivery", bigIdea: "Aerobic performance depends on moving oxygen from air to blood to muscle, then using it in mitochondria.",
          modelTitle: "Oxygen delivery is a chain", model: ["Ventilation moves air", "Diffusion exchanges gases", "Cardiac output transports oxygen", "Muscle extraction and mitochondria use oxygen"],
          mechanismTitle: "Fick links delivery and use", mechanism: ["Cardiac output = heart rate × stroke volume", "VO₂ = cardiac output × arterial-venous oxygen difference", "Training may lower heart rate at the same workload through higher stroke volume", "Recovery rate provides context, not a diagnosis"],
          teacherMoves: ["Use talk test and RPE alongside heart rate", "Compare the same learner across standardized conditions", "Avoid diagnosing fitness from one number", "Explain delivery and extraction as separate targets"],
          case: "Two students run the same pace. One has lower heart rate and RPE. What central and peripheral adaptations could explain the difference?"
        }
      ],
      labs: [
        { title: "Energy-system circuit and recovery profile", materials: "Cones, timer, RPE scale, heart-rate monitors if available", steps: ["Complete short-power, repeated-effort, and sustained stations", "Record heart rate and RPE", "Track recovery for two minutes", "Classify dominant and supporting pathways"], safety: "Use progressive intensity, hydration access, and opt-out alternatives.", evidence: "Create a work-rest prescription for three activities and justify dominant and supporting systems." },
        { title: "Graded exercise, talk test, and Fick worksheet", materials: "Shuttle area or treadmill, heart-rate monitor, timer, worksheet", steps: ["Collect resting heart rate and breathing rate", "Complete graded stages", "Record talk-test category and heart rate", "Estimate cardiac output and interpret recovery"], safety: "Use readiness screening, gradual stages, clear termination criteria, and active recovery.", evidence: "Interpret the profile using heart rate, RPE, talk test, and recovery without making a clinical diagnosis." }
      ],
      application: "Prescribe a work-rest structure and monitoring plan for one PE activity, using both energy and oxygen-delivery evidence."
    },
    {
      id: 6, weeks: "Week 10", phase: "Prescribe", title: "Adaptation, Fatigue & Recovery", short: "Adaptation",
      purpose: "Use multiple readiness signals to adjust training stress before performance and safety decline.",
      outcomes: ["Differentiate acute responses from chronic adaptations", "Explain fatigue as multifactorial", "Write a recovery decision rule using trends rather than one score"],
      lessons: [
        {
          title: "Stress, recovery, and adaptation", bigIdea: "An acute response helps the body meet today’s demand; repeated, recoverable stress drives longer-term adaptation.",
          modelTitle: "Stress → signal → recovery → adaptation", model: ["Acute neural, cardiovascular, respiratory, and endocrine responses support work", "Adaptation requires repeated exposure", "The dose must exceed habitual demand", "Recovery permits remodeling and restores readiness"],
          mechanismTitle: "Fatigue has multiple contributors", mechanism: ["Substrate availability and metabolite accumulation", "Neural drive and excitation-contraction changes", "Heat, hydration, sleep, and motivation", "Task-specific pacing and technique"],
          teacherMoves: ["Use trends, not single-day readiness scores", "Plan hard-easy contrasts", "Treat soreness as information, not proof of quality", "Use active recovery without claiming it removes all fatigue"],
          case: "Performance drops for three sessions while resting heart rate, soreness, and mood worsen. What should change before more overload is added?"
        }
      ],
      labs: [
        { title: "Fatigue signature lab", materials: "Timer, jump or grip test, RPE and wellness card", steps: ["Collect a low-fatigue baseline", "Complete a standardized work bout", "Retest outcome and technique", "Compare physiological, perceptual, and performance indicators"], safety: "Keep fatigue submaximal; stop for dizziness, chest pain, or unusual symptoms.", evidence: "Write a decision rule using at least one performance, one physiological, and one perceptual measure." }
      ],
      application: "Defend a keep, reduce, or progress decision using a three-signal readiness trend."
    },
    {
      id: 7, weeks: "Week 11", phase: "Prescribe", title: "Strength Development & Youth Training", short: "Strength",
      purpose: "Build safe novice strength experiences from technique, readiness, and individualized progression.",
      outcomes: ["Explain neural and muscular contributions to strength", "Apply progressive overload without a universal percentage rule", "Design developmentally appropriate youth strength sessions"],
      lessons: [
        {
          title: "Strength as skill and tissue capacity", bigIdea: "Strength develops through neural skill, muscle remodeling, and progressive exposure to force with sound technique and supervision.",
          modelTitle: "Strength is a skill and a tissue capacity", model: ["Early gains often reflect improved coordination and recruitment", "Hypertrophy increases contractile cross-sectional area", "Connective tissues adapt more slowly", "Technique, maturity, and training age shape progression"],
          mechanismTitle: "Overload is individualized", mechanism: ["Increase load, repetitions, sets, range, speed, or complexity", "Change one major variable at a time", "Keep repetitions in reserve for most novices", "Progress only when technique remains repeatable"],
          teacherMoves: ["Teach positions before load", "Use bodyweight, bands, and medicine balls as legitimate resistance", "Avoid maximal testing when skill is unstable", "Record performance and RPE"],
          case: "A ninth-grade beginner completes every squat repetition but loses trunk control on the final two. How should the next session progress?"
        }
      ],
      labs: [
        { title: "Teach-and-progress strength stations", materials: "Bands, light dumbbells, medicine balls, benches", steps: ["Teach squat, hinge, push, pull, and carry patterns", "Use a technique checklist", "Select a conservative starting dose", "Progress one variable and justify it"], safety: "Use qualified supervision, clear lifting zones, equipment checks, and no forced maximal attempts.", evidence: "Design a two-week, two-session microcycle with a repeatable technique criterion for progression." }
      ],
      application: "Revise a novice strength session after a technique or readiness warning appears."
    },
    {
      id: 8, weeks: "Week 12", phase: "Prescribe", title: "Power, Speed, Agility & Deceleration", short: "Power & agility",
      purpose: "Teach force quickly while making braking, landing, and decision-making visible.",
      outcomes: ["Distinguish strength, power, speed, change of direction, and agility", "Relate force-time characteristics to explosive tasks", "Build a landing-to-agility progression with observable criteria"],
      lessons: [
        {
          title: "Explode, brake, reposition", bigIdea: "Power expresses force quickly; safe speed and agility depend as much on braking and repositioning as acceleration.",
          modelTitle: "Explosive performance links force and time", model: ["Power = work ÷ time", "High force produced quickly supports acceleration", "Elastic energy can contribute during rapid stretch-shortening actions", "Fatigue changes both output and landing strategy"],
          mechanismTitle: "Braking creates the next movement", mechanism: ["Lower the center of mass before direction change", "Use multiple steps when high speed requires more braking distance", "Align the task with the intended exit direction", "Increase speed only after control is repeatable"],
          teacherMoves: ["Teach quiet, balanced landings", "Progress bilateral to unilateral", "Separate planned change of direction from reactive agility", "Use full recovery for true speed work"],
          case: "Why is a fast cone drill with a memorized route a change-of-direction test rather than a complete agility test?"
        }
      ],
      labs: [
        { title: "Jump-land-cut progression", materials: "Cones, low boxes, tape lines, soft balls", steps: ["Practice snap-down and stick", "Progress to jump-land", "Add planned 45° and 90° cuts", "Add a simple visual reaction cue"], safety: "Use low volume, nonslip surfaces, adequate recovery, and no depth jumps for unprepared learners.", evidence: "Build a four-step landing-to-agility progression with an observable advancement criterion at every step." }
      ],
      application: "Choose whether a task measures speed, change of direction, or agility and defend the label."
    },
    {
      id: 9, weeks: "Weeks 13–14", phase: "Defend", title: "Measurement & Movement Assessment", short: "Assessment",
      purpose: "Turn fair, observable evidence into the next instructional decision.",
      outcomes: ["Distinguish validity, reliability, objectivity, and feasibility", "Separate movement outcome from process", "Calibrate observable scoring criteria across raters"],
      lessons: [
        {
          title: "Valid, reliable, ethical, and useful measurement", bigIdea: "A test is useful only when it measures the intended construct consistently and leads to an appropriate decision.",
          modelTitle: "Start with the decision, then choose the test", model: ["Define the construct", "Choose a feasible and safe protocol", "Standardize conditions", "Interpret results with error, development, and opportunity in mind"],
          mechanismTitle: "A number is not automatically evidence", mechanism: ["Reliability asks whether scores are consistent", "Validity asks whether the interpretation is supported", "Objectivity asks whether scorers agree", "Feasibility asks whether the protocol works in context"],
          teacherMoves: ["Do not grade fitness level as moral worth", "Use private, growth-oriented reporting", "Offer accessible protocols", "Retest under comparable conditions"],
          case: "A student improves a PACER score after learning pacing. Is the change physiological, procedural, or both? What evidence would clarify?"
        },
        {
          title: "Motor skill assessment, video, and feedback", bigIdea: "Good movement assessment separates outcome from process and turns observable evidence into the next teachable step.",
          modelTitle: "Observe → interpret → decide → recheck", model: ["Outcome shows whether the task was achieved", "Process shows how the action was organized", "Criteria must be visible and countable", "The assessment should identify a next instructional move"],
          mechanismTitle: "Reliable observation requires calibration", mechanism: ["Define each criterion", "Use the same viewing angle", "Score independently", "Compare disagreements and refine descriptors"],
          teacherMoves: ["Observe without coaching during the scored trial", "Use age- and opportunity-sensitive expectations", "Limit cues to the highest-leverage feature", "Provide chances to apply feedback"],
          case: "A throw hits the target, but the student shows no trunk rotation and same-side stepping. How should outcome and process scores differ?"
        }
      ],
      labs: [
        { title: "Build and audit a fitness test battery", materials: "Timers, cones, grip device, jump measure, test cards", steps: ["Define the decision the battery should support", "Select three complementary measures", "Run a small pilot", "Audit safety, time, reliability, access, and data use"], safety: "Use readiness screening and nonpublic score handling; avoid unnecessary maximal tests.", evidence: "Create a one-page battery rationale and administration map for a class of 30." },
        { title: "PLAYfun-style video calibration", materials: "Short skill video, rubric template, phone or tablet", steps: ["Select three observable critical elements", "Score one video independently", "Calculate simple agreement", "Revise descriptors and rescore"], safety: "Secure consent for recording and keep video within course rules.", evidence: "Report agreement before and after revision, then prescribe one next-step learning task." }
      ],
      application: "Defend why an assessment is fair, useful, and aligned with the decision it will support."
    },
    {
      id: 10, weeks: "Weeks 15–16", phase: "Defend", title: "Programming, Integration & Capstone", short: "Programming",
      purpose: "Integrate anatomy, physiology, biomechanics, pedagogy, safety, and access into a defensible program.",
      outcomes: ["Use FITT-VP and introductory periodization", "Create progressions and regressions that preserve learning intent", "Defend a decision through Observe → Explain → Decide → Verify"],
      lessons: [
        {
          title: "Programming for PE and sport", bigIdea: "A good program connects demand analysis, learner readiness, training dose, and feedback while preserving access and safety.",
          modelTitle: "Program from demands to dose", model: ["Profile the activity and learner", "Choose measurable priorities", "Set frequency, intensity, time, type, volume, and progression", "Monitor response and adjust"],
          mechanismTitle: "Progression changes one constraint at a time", mechanism: ["Volume before intensity for many novices", "Simple before complex", "Stable before reactive", "Accessible options should preserve the same learning intent"],
          teacherMoves: ["Use short cycles with explicit targets", "Plan regressions before class", "Separate conditioning from punishment", "Use RPE and performance trends to autoregulate"],
          case: "A six-week soccer unit needs aerobic capacity, repeated-sprint ability, lower-body strength, and skill learning. How will you avoid training every quality hard every day?"
        },
        {
          title: "Analyze, teach, train, and defend", bigIdea: "Professional judgment integrates systems: describe the movement, explain the cause, choose a change, and verify its effect.",
          modelTitle: "The final reasoning chain", model: ["Observe: what happened?", "Explain: which system and mechanism matter most?", "Decide: what cue, task, or dose should change?", "Verify: what measure will show whether it worked?"],
          mechanismTitle: "Strong answers compare plausible choices", mechanism: ["Name the task goal", "Eliminate options that violate anatomy, mechanics, or safety", "Select the most direct instructional response", "Check whether the evidence supports the conclusion"],
          teacherMoves: ["Ask learners to defend the why", "Reward revision after evidence", "Use multiple acceptable movement solutions", "Make safety and access part of expertise"],
          case: "A fatigued student lands stiffly, loses balance, and reports high RPE late in a circuit. Build an integrated explanation and a next-step decision."
        }
      ],
      labs: [
        { title: "Four-to-six-week microcycle studio", materials: "Planning template, sample learner profile, assessment data", steps: ["Complete a demand analysis", "Choose three priority metrics", "Map weekly exposures and recovery", "Add an inclusive alternative and adjustment rule"], safety: "Respect scope of practice; refer medical concerns and individualize high-risk loading.", evidence: "Draft a cycle and audit alignment among demands, metrics, dose, recovery, and adaptations." },
        { title: "Unknown-movement practical and capstone defense", materials: "Novel movement clip, analysis sheet, capstone notes", steps: ["Analyze an unseen movement", "Defend one intervention in a two-minute response", "Identify the measure that would verify the effect", "Build a targeted GACE study map"], safety: "Use video cases for high-risk scenarios; keep demonstrations low intensity.", evidence: "Submit the Observe → Explain → Decide → Verify chain and one alternative you rejected with a reason." }
      ],
      application: "Present a complete Train, Measure, Perform decision and defend its causal chain, safety, access, and verification plan."
    }
  ],
  pretest: [
    {id:1,m:1,t:"Concept",q:"Which discipline most directly explains how external force changes human motion?",o:["Anatomy","Biomechanics","Exercise physiology","Motor behavior"],a:1,x:"Biomechanics applies mechanical principles such as force and torque to biological movement."},
    {id:2,m:1,t:"Concept",q:"Shoulder abduction during a jumping jack occurs mainly in which plane?",o:["Sagittal","Frontal","Transverse","Oblique"],a:1,x:"Abduction and adduction are primarily frontal-plane actions."},
    {id:3,m:1,t:"Application",q:"Two students finish the same shuttle in the same time. One turns under control; the other slips and needs recovery steps. What is the best conclusion?",o:["They are equally efficient because time is identical","The faster-looking student is more efficient","The controlled turn is likely more efficient, but outcome, effort, control, and safety should all be checked","Efficiency cannot be observed"],a:2,x:"Efficiency is task-specific and should be judged with multiple forms of evidence."},
    {id:4,m:2,t:"Concept",q:"Which structure primarily connects bone to bone?",o:["Tendon","Ligament","Muscle belly","Articular cartilage"],a:1,x:"Ligaments connect bone to bone; tendons connect muscle to bone."},
    {id:5,m:2,t:"Concept",q:"During the controlled lowering phase of a squat, the quadriceps act mainly…",o:["Concentrically","Eccentrically","Isokinetically","Without producing force"],a:1,x:"The quadriceps produce force while lengthening to control knee flexion."},
    {id:6,m:2,t:"Application",q:"A student’s heels rise early in a squat. Which first adjustment best preserves the task while reducing mobility demand?",o:["Add heavier load","Require greater depth","Raise the heels slightly or reduce depth, then recheck control","Push through pain"],a:2,x:"Scaling range or support can preserve the goal while reducing an ankle-mobility demand."},
    {id:7,m:3,t:"Concept",q:"A motor unit consists of…",o:["One muscle and one tendon","One motor neuron and all muscle fibers it innervates","All nerves entering a limb","One joint and its stabilizers"],a:1,x:"A motor unit is a motor neuron plus the fibers controlled by that neuron."},
    {id:8,m:3,t:"Concept",q:"Feedback that tells a learner whether a throw hit the target is called…",o:["Knowledge of performance","Knowledge of results","Intrinsic loading","Blocked practice"],a:1,x:"Knowledge of results describes the outcome."},
    {id:9,m:3,t:"Application",q:"A novice improves a lift after two sessions with no visible change in muscle size. What most likely explains the improvement?",o:["New muscle fibers formed","Neural coordination and movement skill improved","More lactate was stored","Bone length increased"],a:1,x:"Early gains commonly reflect recruitment, coordination, timing, and skill."},
    {id:10,m:4,t:"Concept",q:"Which quantity describes both how fast an object moves and its direction?",o:["Distance","Speed","Velocity","Time"],a:2,x:"Velocity is a vector; speed has magnitude but no direction."},
    {id:11,m:4,t:"Concept",q:"If the same momentum change occurs over a longer stopping time, average force will generally…",o:["Increase","Decrease","Always stay identical","Become zero"],a:1,x:"The same impulse spread over more time requires less average force."},
    {id:12,m:4,t:"Application",q:"Why does the same dumbbell feel harder when held farther from the shoulder?",o:["Its mass increases","Gravity increases","The external moment arm and shoulder torque increase","The shoulder becomes a first-class lever"],a:2,x:"Increasing the perpendicular moment arm increases external torque demand."},
    {id:13,m:5,t:"Concept",q:"During a 90-second maximal effort, ATP is supplied by…",o:["Only glycolysis","Only oxidative metabolism","All energy systems with changing contributions","Only stored ATP"],a:2,x:"Energy systems overlap continuously; intensity and duration shift contribution."},
    {id:14,m:5,t:"Concept",q:"Cardiac output is calculated as…",o:["Heart rate × stroke volume","VO₂ × heart rate","Blood pressure × ventilation","Stroke volume ÷ heart rate"],a:0,x:"Cardiac output is volume per beat multiplied by beats per minute."},
    {id:15,m:5,t:"Application",q:"Which statement about lactate is most accurate?",o:["It is useless waste","It solely causes next-day soreness","It is a transportable fuel and metabolic intermediate","It prevents oxidative metabolism"],a:2,x:"Lactate can be transported, oxidized, and used in gluconeogenesis."},
    {id:16,m:6,t:"Concept",q:"Which is a chronic adaptation to repeated endurance training?",o:["Immediate heart-rate rise","Increased capillary density","Acute sweating","Temporary increased ventilation"],a:1,x:"Capillary density can increase after repeated training exposure."},
    {id:17,m:6,t:"Concept",q:"EPOC refers to…",o:["Elevated oxygen consumption during recovery","Only lactate removal","Stored ATP before exercise","Delayed-onset soreness"],a:0,x:"Recovery processes keep oxygen use above baseline for a period after exercise."},
    {id:18,m:6,t:"Application",q:"Performance drops for three sessions while resting heart rate, soreness, and mood worsen. What is the best next step?",o:["Add overload immediately","Reduce load and investigate recovery before progressing","Test a maximum","Ignore the pattern"],a:1,x:"A cluster of warning signs calls for adjustment before more overload."},
    {id:19,m:7,t:"Concept",q:"A major source of early strength gain in a novice is…",o:["Neural coordination","New muscle fibers","Bone lengthening","Lactate storage"],a:0,x:"Recruitment, coordination, and movement skill improve quickly."},
    {id:20,m:7,t:"Concept",q:"Which statement about hypertrophy is best supported?",o:["Muscle damage is required","Only very heavy loads work","Progressive mechanical tension is central; damage is not a required primary mechanism","Soreness proves growth"],a:2,x:"Mechanical tension and adequate volume matter; damage and soreness are not required proof."},
    {id:21,m:7,t:"Application",q:"A ninth-grade beginner loses trunk control on the final two squat repetitions. How should the next session progress?",o:["Increase load","Keep or reduce the dose until technique is repeatable","Train every set to failure","Test a maximum"],a:1,x:"Progress from repeatable technique and readiness, not repetition count alone."},
    {id:22,m:8,t:"Concept",q:"Power is best described as…",o:["Force only","Work performed per unit of time","Maximum speed only","Total volume"],a:1,x:"Power reflects how quickly work is performed."},
    {id:23,m:8,t:"Concept",q:"What makes agility different from a preplanned change-of-direction drill?",o:["Agility always uses cones","Agility includes perception and response to a stimulus","Agility never includes deceleration","Agility equals maximal speed"],a:1,x:"Agility requires perceiving information and making a movement decision."},
    {id:24,m:8,t:"Application",q:"Why are longer recoveries used between maximal sprint repetitions?",o:["To preserve speed quality and phosphagen readiness","To maximize soreness","To make each sprint aerobic","To increase body mass"],a:0,x:"True speed work requires high neural and phosphagen readiness."},
    {id:25,m:9,t:"Concept",q:"A test that produces similar results under the same conditions demonstrates…",o:["Reliability","Validity","Specificity","Overload"],a:0,x:"Reliability is consistency; validity concerns the intended interpretation."},
    {id:26,m:9,t:"Concept",q:"Which is a process measure for an overhand throw?",o:["Distance thrown","Target hit","Opposition step","Ball speed"],a:2,x:"An opposition step describes how the skill is performed."},
    {id:27,m:9,t:"Application",q:"Two observers disagree because the rubric says only ‘good rotation.’ What should be fixed first?",o:["Average scores","Define observable performance criteria","Use a harder task","Remove both observers"],a:1,x:"Clear observable criteria improve scoring consistency and feedback."},
    {id:28,m:10,t:"Concept",q:"Which sequence represents the course reasoning chain?",o:["Test → overload → explain → observe","Observe → Explain → Decide → Verify","Decide → observe → grade → repeat","Explain → decide → assume → advance"],a:1,x:"The chain separates observation, mechanism, intervention, and evidence."},
    {id:29,m:10,t:"Application",q:"A student with a disability needs an adapted assessment. Which choice is best?",o:["Use the identical protocol","Remove assessment","Preserve the intended construct while reducing irrelevant barriers","Compare only with classmates"],a:2,x:"Appropriate adaptation provides valid access while preserving the construct."},
    {id:30,m:10,t:"Application",q:"After changing one cue in a landing lesson, what is the strongest evidence that it worked?",o:["The cue sounded scientific","The teacher liked it","The targeted feature improved when the task was repeated","The student became tired"],a:2,x:"A teaching decision becomes testable when the targeted feature is reobserved."}
  ],
  gateExtra: {
    1: [
      {q:"Rotation in the transverse plane occurs around which axis?",o:["Mediolateral","Longitudinal","Anteroposterior","Diagonal"],a:1,x:"The longitudinal axis is perpendicular to the transverse plane."},
      {q:"Changing ball size to improve catching primarily changes which constraint?",o:["Task","Individual","Maturational","Social"],a:0,x:"Equipment is a task constraint."}
    ],
    2: [
      {q:"A muscle that holds a joint steady while another produces motion is a…",o:["Prime mover","Stabilizer","Flexor only","Tendon"],a:1,x:"A stabilizer creates a firm base for intended motion."},
      {q:"A ball-and-socket joint generally permits…",o:["One-plane motion","Multiplanar motion","No rotation","Only gliding"],a:1,x:"Its geometry permits movement around multiple axes."}
    ],
    3: [
      {q:"Whole-muscle force can increase by…",o:["Making one fiber partially contract","Recruiting more motor units","Stopping calcium release","Reducing neural drive"],a:1,x:"Individual fibers respond all-or-none; recruitment grades whole-muscle force."},
      {q:"Which feedback is most likely to limit dependence?",o:["Continuous correction before every attempt","A delayed, specific cue after the learner first evaluates the attempt","Several corrections at once","Only praise"],a:1,x:"Delayed, focused feedback preserves learner problem solving."}
    ],
    4: [
      {q:"A wider base of support usually makes a stationary stance…",o:["Less stable","More stable","Automatically more powerful","Faster"],a:1,x:"It increases the area in which the line of gravity can be controlled."},
      {q:"Kinematics primarily describes…",o:["The forces causing motion","What moved across time","Only muscle action","Energy-system contribution"],a:1,x:"Kinematics describes motion; kinetics addresses its causes."}
    ],
    5: [
      {q:"A larger arterial-venous oxygen difference indicates that tissues…",o:["Extracted more oxygen","Pumped less blood","Stopped ventilating","Stored more lactate"],a:0,x:"The difference reflects oxygen extraction by working tissues."},
      {q:"At the same submaximal workload, a trained learner may have lower heart rate partly because of…",o:["Lower stroke volume","Higher stroke volume","No oxygen extraction","Less cardiac output in every case"],a:1,x:"A larger stroke volume can maintain cardiac output with fewer beats."}
    ],
    6: [
      {q:"Which is an acute response rather than a chronic adaptation?",o:["Increased capillary density","Immediate ventilation increase","Improved mitochondrial density","Long-term lower heart rate at a standard workload"],a:1,x:"Ventilation rises during the current bout; the other changes develop across exposure."},
      {q:"Which readiness decision uses the strongest evidence?",o:["Progress because soreness is high","Reduce load after a multi-day decline across performance, mood, and resting heart rate","Ignore all subjective measures","Change the plan from one isolated score"],a:1,x:"Trends across multiple signal types are more useful than one isolated score."}
    ],
    7: [
      {q:"For most novices, progression should occur when…",o:["Every set reaches failure","Technique remains repeatable at the current dose","Soreness is severe","A universal 10% increase is due"],a:1,x:"Readiness and repeatable technique guide safe overload."},
      {q:"Which is a legitimate way to progress overload?",o:["Change load, repetitions, sets, range, speed, or complexity one major variable at a time","Only add weight","Test a maximum each session","Remove recovery"],a:0,x:"Overload can be manipulated through several variables and should remain observable."}
    ],
    8: [
      {q:"A memorized cone route primarily tests…",o:["Reactive agility","Change of direction","Aerobic power only","Motor-unit size"],a:1,x:"Without a stimulus and decision, the task is planned change of direction."},
      {q:"Which progression best supports landing control?",o:["Reactive unilateral cutting first","Bilateral stick → jump-land → planned cut → reactive cue","Depth jumps to fatigue","Maximal speed before braking skill"],a:1,x:"Control and complexity should progress before reactive speed."}
    ],
    9: [
      {q:"Validity asks whether…",o:["Scores are consistent","The intended interpretation is supported","Scorers agree","The test is inexpensive"],a:1,x:"Validity concerns the meaning and use of the score."},
      {q:"A throw hits the target but lacks trunk rotation. The best scoring response is to…",o:["Give full outcome and process credit","Separate successful outcome from incomplete process criteria","Ignore the outcome","Score only effort"],a:1,x:"Outcome and process provide distinct evidence and should be scored separately."}
    ],
    10: [
      {q:"Specificity means adaptation is most related to…",o:["The imposed demand","Any physical activity equally","Soreness","A fixed weekly increase"],a:0,x:"Adaptation reflects the movement, force, speed, and metabolic demand imposed."},
      {q:"Autoregulation adjusts a planned dose using…",o:["Current performance or RPE","Only calendar date","Punishment","An unchanging percentage"],a:0,x:"Autoregulation uses current response to make a bounded adjustment."}
    ]
  }
};
