(function () {
  const DATA = window.PETE345_DATA;
  const q = (question, options, answer, explanation) => ({ q: question, o: options, a: answer, x: explanation });
  const s = (title, paragraphs, points = []) => ({ title, paragraphs, points });
  const lesson = (minutes, guidingQuestion, sections, worked, checkpoint, explain) => ({ minutes, guidingQuestion, sections, worked, checkpoint, explain });
  const lab = (config) => config;

  const learning = {
    1: {
      time: "2 hours 10 minutes", sessions: ["Session 1 · Movement evidence (35 min)", "Session 2 · Anatomical language (35 min)", "Session 3 · Observation calibration lab (45 min)", "Session 4 · Retrieval and gate (15 min)"],
      concepts: ["task-specific efficiency", "observation versus inference", "anatomical position", "directional terms", "planes and axes", "joint actions"],
      lessons: [
        lesson(35, "What evidence must a teacher collect before changing a movement?", [
          s("Kinesiology explains a movement through four connected lenses", [
            `Anatomy identifies the structures and joint actions that make movement possible. Physiology explains how the body supplies energy, transports oxygen, and responds to repeated work. Biomechanics explains how forces, time, and body geometry change motion. Motor behavior explains how perception, practice, and feedback organize a skill. A useful analysis may use all four lenses, but it must not blur them together.`,
            `Begin with an observable statement. “The performer took three recovery steps after the turn” is evidence. “The performer has weak legs” is an inference. The inference might eventually be supported, but it cannot be the starting point because several causes—speed, surface, strategy, confidence, or fatigue—could produce the same observation.`
          ], ["Anatomy: structures and joint actions", "Physiology: energy, response, and recovery", "Biomechanics: forces and motion", "Motor behavior: learning and control"]),
          s("Efficiency is the fit between a solution and its goal", [
            `Efficient movement is not one ideal-looking technique. It is a task-appropriate solution that balances outcome, effort, control, and safety for a particular learner in a particular environment. A basketball pass that arrives accurately but causes shoulder pain is not efficient. A wheelchair turn and a running turn can both be efficient even though their movement strategies are different.`,
            `Use the sequence Observe → Explain → Decide → Verify. First define the goal and record neutral evidence. Then use course concepts to propose a mechanism. Change one cue, constraint, or dose. Finally, repeat the observation. If the evidence does not improve, revise the explanation rather than blaming the learner.`
          ], ["Outcome: did the task succeed?", "Effort: was unnecessary work reduced?", "Control: was the result repeatable?", "Safety: was load managed appropriately?"]),
          s("Constraints shape the movement solution", [
            `Individual constraints include body dimensions, prior experience, current capacity, confidence, pain, and sensory or mobility needs. Task constraints include the goal, rules, equipment, space, and time. Environmental constraints include surface, light, temperature, noise, and other people. These factors interact; they do not determine one inevitable technique.`,
            `A teacher can change a task or environmental constraint immediately, while many individual capacities change only through practice and training. Changing ball size, target distance, support, or space is therefore not “making it easier” by default. It is a controlled way to test an explanation and create access to the intended learning problem.`
          ], ["Individual: current learner characteristics", "Task: goal, rules, equipment, and space", "Environment: physical and social context"])
        ], {
          title: "Worked example · two equal shuttle times", situation: "Jordan and Alex both finish in 12.4 seconds. Jordan lowers before the line, plants once, and accelerates away. Alex stays tall, slips, and uses three recovery steps.",
          steps: ["Observe: equal time, but different turn mechanics and recovery steps.", "Explain: Alex’s high center of mass and late braking reduce control; the extra steps add work.", "Decide: move the braking cue earlier—‘sink before the line’—without changing the course.", "Verify: repeat three trials and compare time, slips, and recovery steps."],
          conclusion: "Jordan currently shows the more efficient solution because the same outcome is produced with better control and less unnecessary work. The claim is based on evidence, not appearance."
        }, [
          q("Which statement is an observation rather than an inference?", ["The learner is unmotivated", "The knee moved inward during landing", "The learner has weak hip muscles", "The task is too hard"], 1, "An observation names a visible event. The other statements propose causes or judgments."),
          q("A cue changes the movement but the outcome becomes worse. What should the teacher do next?", ["Repeat the cue louder", "Blame effort", "Revise the explanation and test another change", "Keep the cue because it sounded correct"], 2, "The analysis is a testable hypothesis. Evidence should determine whether the explanation is kept or revised.")
        ], "Explain why two different techniques can both be efficient. Use outcome, effort, control, safety, and one learner or environmental constraint."),
        lesson(35, "How does anatomical language make movement observations precise and shareable?", [
          s("Anatomical position is the reference system", [
            `Anatomical position describes a person standing upright, facing forward, arms at the sides, palms forward, and feet directed forward. Directional terms are always interpreted from the performer’s perspective: right and left belong to the performer, not the observer. Anterior means toward the front; posterior means toward the back. Superior and inferior mean above and below. Medial and lateral mean toward and away from the midline. Proximal and distal compare positions nearer to or farther from the trunk or point of attachment.`,
            `The reference system prevents ambiguity. “Move the arm out” can mean several things. “Abduct the right shoulder in the frontal plane” names the side, joint, action, and plane. In teaching, technical language supports accurate analysis; the student-facing cue can remain simpler.`
          ]),
          s("Planes describe motion; axes describe rotation", [
            `The sagittal plane divides the body into left and right portions. Flexion and extension usually dominate in this plane around a mediolateral axis. The frontal plane divides front and back; abduction, adduction, and lateral flexion usually occur around an anteroposterior axis. The transverse plane divides upper and lower portions; rotation and horizontal abduction or adduction usually occur around a longitudinal axis.`,
            `Real skills are multiplanar. A throw includes trunk rotation, shoulder horizontal motion, elbow extension, and weight transfer. Identify a meaningful phase, choose one joint, and name the dominant action. This avoids the common error of assigning an entire skill to one plane.`
          ], ["Sagittal ↔ mediolateral axis", "Frontal ↔ anteroposterior axis", "Transverse ↔ longitudinal axis"]),
          s("Joint action belongs to a phase", [
            `A joint can reverse action across phases. The hip and knee flex during the descent of a squat and extend during the ascent. The shoulder externally rotates during preparation for a throw and rapidly internally rotates during acceleration. Always write the phase before the action: “During descent, the knee flexes,” not simply “the squat is knee flexion.”`]
          )
        ], {
          title: "Worked example · overhand throw preparation", situation: "Freeze the final instant of the preparation phase before forward acceleration.",
          steps: ["Use the performer’s perspective to name right and left.", "At the trunk: rotation occurs primarily in the transverse plane around a longitudinal axis.", "At the throwing shoulder: horizontal abduction and external rotation prepare the arm.", "At the elbow: flexion positions the forearm before later extension."],
          conclusion: "The whole throw is not assigned one plane. Each joint action is named within one phase."
        }, [
          q("Which plane-axis pair is correct for most flexion and extension?", ["Sagittal–mediolateral", "Frontal–longitudinal", "Transverse–anteroposterior", "Sagittal–longitudinal"], 0, "Sagittal-plane motion rotates around a mediolateral axis."),
          q("Why should a movement phase be named before a joint action?", ["Joint actions never repeat", "A joint can perform different actions in different phases", "Planes change with the observer", "It eliminates the need to name the joint"], 1, "The same joint often reverses or changes action across preparation, propulsion, and recovery phases.")
        ], "Describe one phase of a familiar skill using performer perspective, one joint action, its plane, and its axis. Then translate the description into a short learner-facing cue."),
      ],
      labs: [lab({
        title: "Movement observation and inter-rater calibration", minutes: 45,
        primer: "This lab tests whether precise language produces more dependable observation. You will compare an unstructured first rating with a phase-based, operationally defined second rating.",
        question: "Does a shared observation protocol increase agreement between two movement observers?",
        materials: "A phone with slow-motion video, a safe squat/throw/jump clip, timer, and two observers.",
        safety: "Record only a low-risk submaximal movement in a clear area. Do not diagnose injury or ask a performer to reproduce pain.",
        variables: ["Independent variable: unstructured versus structured observation", "Dependent variable: observer agreement", "Controlled features: same clip, same phase, same playback speed"],
        steps: ["Choose one 5–10 second movement clip and identify three meaningful phases.", "Without discussing criteria, each observer independently writes five observations.", "Compare the lists and count exact or conceptually equivalent matches.", "Create three operational definitions. Example: ‘controlled landing’ = feet remain planted and balance is held for two seconds.", "Rewatch the same clip. Each observer independently codes the three definitions by phase.", "Calculate agreement: agreements ÷ total decisions × 100.", "Discuss which vague terms were replaced and how the new language changed agreement."],
        data: ["Unstructured matches / 5", "Structured agreements / total decisions", "Agreement percentage", "One observation that changed after phase identification"],
        calculations: ["Percent agreement = agreements ÷ total decisions × 100", "Change in agreement = structured % − unstructured %"],
        analysis: ["Why can two observers watch the same performance and disagree?", "Which definition most improved agreement, and why?", "What can percent agreement show—and what can it not prove?", "Write one cue that follows directly from the strongest observation."],
        evidence: "Report both agreement calculations, list the three operational definitions, interpret the change without overclaiming, and write one observation → explanation → cue → verification chain.",
        quality: ["Contains numerical evidence", "Separates observation from inference", "Uses phase, joint action, plane, and performer perspective", "Makes a testable teaching decision"], minChars: 220
      })],
      gate: [
        q("A teacher says, ‘The student lacks confidence.’ What is the best first revision?", ["Keep it because confidence is visible", "Name the observable behavior and phase", "Replace it with a muscle diagnosis", "Assign a grade"], 1, "Start with observable behavior before inferring a cause."),
        q("During the upward phase of a squat, the knees move from flexion toward straight. What action is occurring?", ["Knee flexion", "Knee extension", "Hip abduction", "Ankle inversion"], 1, "Moving from a flexed knee toward anatomical position is extension."),
        q("Which analysis correctly uses performer perspective?", ["The observer’s right determines the label", "Right and left belong to the performer", "Right and left change with camera angle", "Perspective is irrelevant"], 1, "Anatomical right and left always refer to the performer."),
        q("Two students use different techniques with equal safe and repeatable outcomes. What is the most defensible conclusion?", ["Only the textbook technique is efficient", "Both may be efficient for their constraints", "The taller student is more efficient", "Efficiency cannot be observed"], 1, "Efficiency is task- and learner-specific rather than a single appearance."),
        q("What makes a teaching cue testable?", ["It sounds scientific", "It names every body part", "It predicts an observable change on the next attempt", "It is repeated often"], 2, "A testable cue predicts evidence that can be checked after the next performance.")
      ]
    },

    2: {
      time: "2 hours 15 minutes", sessions: ["Session 1 · Joint structure and usable range (35 min)", "Session 2 · Muscle roles across phases (40 min)", "Session 3 · Constraint-manipulation lab (45 min)", "Session 4 · Retrieval and gate (15 min)"],
      concepts: ["joint classification", "mobility and stability", "tendon versus ligament", "concentric, eccentric, and isometric action", "agonist, antagonist, and stabilizer", "open and closed chain"],
      lessons: [
        lesson(35, "How does structure create both movement opportunity and constraint?", [
          s("Bones, joints, and connective tissues form a linked system", [
            `The axial skeleton organizes and protects the head, neck, and trunk. The appendicular skeleton includes the shoulder and pelvic girdles and the limbs that produce locomotion and object control. Bones act as levers, joints provide axes of rotation, and muscles create forces that produce joint torque.`,
            `Fibrous joints permit little movement, cartilaginous joints permit limited movement, and synovial joints provide the greatest mobility. Synovial joint shape affects available motion: a hinge joint such as the elbow favors flexion and extension, while a ball-and-socket joint such as the hip permits motion in multiple planes. Mobility is purchased with a greater control demand.`
          ]),
          s("Ligaments, tendons, and cartilage do different jobs", [
            `Ligaments connect bone to bone and help guide or limit joint motion. Tendons connect muscle to bone and transmit muscular force. Articular cartilage reduces friction and distributes compressive load at joint surfaces. These tissues adapt at different rates and respond differently to tension, compression, and repeated loading. A teacher should not use the terms interchangeably.`,
            `Available range is the motion a joint can reach; usable range is motion the learner can control for the task. More range is not automatically better. A deep squat is useful only when the learner can maintain the required balance, alignment, and load tolerance.`
          ]),
          s("Modify the task before labeling the learner", [
            `When movement breaks down, test one constraint at a time. Raising the squat target reduces required hip, knee, and ankle range. Holding a stable support reduces balance demand. Moving a load closer reduces the external moment arm. If the pattern changes, the modification supplies evidence about the limiting demand; it does not prove a medical diagnosis.`]
          )
        ], {
          title: "Worked example · heels rise in a squat", situation: "A learner’s heels rise near the bottom of a bodyweight squat.",
          steps: ["Observe the phase and exact event: heel rise begins after the thighs pass parallel.", "Generate more than one hypothesis: ankle range, balance strategy, trunk position, or chosen depth.", "Test one constraint: use a higher target while keeping stance and speed constant.", "Reobserve: if heels remain down at the reduced depth, required range or control at deeper positions is implicated."],
          conclusion: "The modification narrows the explanation but does not diagnose the ankle. Progress controlled range gradually and refer pain."
        }, [
          q("Which tissue connects muscle to bone?", ["Ligament", "Tendon", "Cartilage", "Bursa"], 1, "Tendons transmit muscular force to bone."),
          q("A learner can be placed into a position but cannot control it during a task. This is primarily a limitation in…", ["Available range only", "Usable range and control", "Bone length", "Motivation"], 1, "The passive position exists, but task-specific control is not yet available.")
        ], "Explain why ‘more mobility’ is not always the correct goal. Include joint structure, usable range, task demand, and one safe modification."),
        lesson(40, "How can the same muscle act as a mover, brake, or stabilizer?", [
          s("Muscle action is defined by what happens while tension is produced", [
            `In a concentric action, a muscle shortens while producing tension and the internal torque overcomes the external demand. In an eccentric action, the active muscle lengthens while controlling motion or absorbing energy. In an isometric action, muscle length remains approximately constant while tension holds a position. These labels describe action, not exercise type; a squat includes eccentric, isometric, and concentric demands across its phases.`,
            `During squat descent, the knees and hips flex because gravity creates an external flexion demand. The quadriceps and hip extensors remain active but lengthen to control the descent—an eccentric role. During ascent, they shorten to create extension torque. Trunk muscles largely create isometric control so the torso does not collapse.`
          ]),
          s("Roles depend on the joint, phase, and task", [
            `The agonist contributes to the desired joint torque; an antagonist can oppose or fine-tune it; a stabilizer limits unwanted motion. These are functional roles, not permanent labels attached to a muscle. The hamstrings can flex the knee, extend the hip, contribute to co-contraction, or control motion eccentrically depending on the task.`,
            `In an open-chain action, the distal segment is relatively free, as in a seated knee extension. In a closed-chain action, the distal segment is fixed or heavily constrained, as in a squat. Closed-chain tasks distribute motion across several joints and increase stabilization demands; neither category is universally superior.`
          ]),
          s("Teach the joint action, phase, and purpose", [
            `“Squeeze the muscle” gives little information about the movement goal. A stronger cue names the action or external result: “Push the floor away as you stand” directs attention to force application and hip-knee extension. Use the least technical learner-facing cue that reliably produces the technically correct change.`]
          )
        ], {
          title: "Worked example · push-up phases", situation: "Analyze a controlled push-up from the top position to the floor and back.",
          steps: ["Descent: the elbow flexes and the shoulder horizontally abducts.", "The elbow extensors and horizontal adductors remain active while lengthening to control descent.", "The trunk resists spinal extension and rotation primarily through isometric stabilization.", "Ascent: the elbow extends and shoulder horizontally adducts as the prime movers shorten."],
          conclusion: "The same muscles can brake on the way down, move on the way up, and stabilize throughout."
        }, [
          q("During a slow squat descent, the quadriceps are active while lengthening. This is…", ["Concentric", "Eccentric", "Isometric", "Passive"], 1, "The active quadriceps lengthen while controlling knee flexion."),
          q("Which statement about muscle roles is accurate?", ["A muscle has one permanent role", "The role changes with joint, phase, and task", "Stabilizers never create tension", "Antagonists are always inactive"], 1, "Functional roles change as the movement demand changes.")
        ], "Choose a two-phase movement. For each phase, name the joint action, the muscle group creating or controlling torque, its type of action, and one stabilizing demand."),
      ],
      labs: [lab({
        title: "Joint-demand and muscle-role constraint experiment", minutes: 45,
        primer: "This lab turns a movement modification into evidence. You will change one demand, measure the response, and explain the result using joint range, moment arm, and muscle action.",
        question: "Which single task modification most improves controlled repetitions while preserving the movement goal?",
        materials: "Chair or box, wall or stable support, light object, phone video, tape measure.",
        safety: "Use pain-free range and submaximal load. Stop with sharp pain, instability, numbness, or loss of balance.",
        variables: ["Independent variable: depth, support, or load position—choose one", "Dependent variables: controlled repetitions, heel contact, trunk position, or tempo", "Controls: stance, instructions, movement speed, and number of trials"],
        steps: ["Choose a squat, lunge, push-up, or overhead reach and define success in observable terms.", "Record three baseline repetitions at a controlled tempo.", "Map the primary joint actions and muscle roles during lowering and raising/return phases.", "Change only one variable: range, external support, or load distance.", "Record three new repetitions with the same tempo and instructions.", "Score each repetition against your operational definition.", "Explain how the modification changed required range, external moment arm, or stabilization demand.", "Choose a progression criterion that would justify removing the modification."],
        data: ["Baseline: successful reps / 3", "Modified: successful reps / 3", "Joint action by phase", "Muscle action by phase", "Observed effect of the changed constraint"],
        calculations: ["Improvement = modified successful reps − baseline successful reps", "If a load was moved: compare perpendicular distance from load to the joint axis"],
        analysis: ["Did the modification preserve the task goal?", "What changed mechanically or anatomically?", "What alternative explanation remains possible?", "What evidence would justify progression?"],
        evidence: "Submit the baseline and modified scores, a two-phase joint-and-muscle map, a causal explanation of the observed change, and an objective progression criterion.",
        quality: ["Only one variable changed", "Muscle actions are tied to phases", "Explanation distinguishes range from control", "Progression is based on observable evidence"], minChars: 240
      })],
      gate: [
        q("Which modification most directly reduces the external shoulder moment during a front hold?", ["Move the load farther away", "Move the load closer", "Hold the breath", "Narrow the grip only"], 1, "Moving the load closer shortens the external moment arm."),
        q("At the bottom of a squat, a brief pause requires the hip and knee extensors primarily to act…", ["Concentrically", "Eccentrically", "Isometrically", "Passively"], 2, "During the pause they produce tension with little change in length."),
        q("Which is the best evidence that support improved usable range?", ["The learner says it felt easy", "The learner reaches the same goal with repeatable control", "The teacher prefers the appearance", "The range is larger once"], 1, "Usable range requires task-appropriate, repeatable control."),
        q("A ligament primarily…", ["Connects muscle to bone", "Connects bone to bone and guides joint motion", "Creates ATP", "Shortens concentrically"], 1, "Ligaments connect bone to bone and help guide or limit joint motion."),
        q("Why is ‘the hamstrings are antagonists’ incomplete?", ["Hamstrings are not muscles", "Muscle roles change with the joint, phase, and task", "Antagonists never produce force", "Only upper-body muscles have roles"], 1, "Agonist, antagonist, and stabilizer are context-dependent functional roles.")
      ]
    },

    3: {
      time: "1 hour 50 minutes", sessions: ["Session 1 · Neural control and contraction (45 min)", "Session 2 · Feedback experiment (45 min)", "Session 3 · Delayed retrieval and gate (20 min)"],
      concepts: ["motor unit", "size principle", "rate coding", "neuromuscular junction", "excitation–contraction coupling", "feedback frequency", "retention and transfer"],
      lessons: [
        lesson(45, "How does the nervous system grade force, coordinate action, and learn from practice?", [
          s("A motor unit links a neural command to muscle fibers", [
            `A motor unit contains one alpha motor neuron and all muscle fibers it innervates. When that motor neuron reaches threshold, its fibers are activated. The nervous system grades whole-muscle force mainly by recruiting additional motor units and changing their firing rate, called rate coding. Small, fatigue-resistant units are generally recruited before larger, higher-force units as demand increases.`,
            `Early strength improvement often occurs before meaningful hypertrophy because the learner recruits available motor units more effectively, coordinates muscles more efficiently, reduces unnecessary co-contraction, and becomes more skilled at the task. Strength expression is therefore neural, muscular, and skill-specific.`
          ]),
          s("Excitation–contraction coupling converts an electrical signal into force", [
            `At the neuromuscular junction, a motor neuron releases acetylcholine. Binding at the muscle membrane helps create an action potential that travels along the sarcolemma and into transverse tubules. This signal triggers calcium release from the sarcoplasmic reticulum. Calcium binds to troponin, shifts tropomyosin, and exposes binding sites on actin. Myosin cross-bridges then cycle, using ATP. ATP is also required to detach myosin and pump calcium back for relaxation.`,
            `ATP does not directly “make a muscle contract” by itself; it supports cross-bridge cycling and ion handling. The sequence matters because a disruption anywhere from neural drive to calcium handling can change force expression.`
          ], ["Signal", "Acetylcholine", "Action potential", "Calcium", "Cross-bridge cycling", "Relaxation"]),
          s("Practice performance is not the same as learning", [
            `Knowledge of results describes the outcome—“the ball landed 40 centimeters left.” Knowledge of performance describes the movement—“your plant foot crossed the target line.” Feedback can be immediate or delayed, frequent or faded, internal or external in attentional focus. Too much feedback can improve today’s repetitions while creating dependence.`,
            `Learning is inferred from retention and transfer. A retention test asks the learner to perform later without the original support. A transfer test changes the distance, speed, environment, or problem. Effective instruction often gives a concise external-focus cue, allows several attempts, asks the learner to self-assess, and fades feedback as control improves.`
          ]),
          s("Practice conditions determine what the learner must solve", [
            `Blocked practice repeats one skill or condition before switching. It can help a novice stabilize a basic coordination pattern, but success may partly reflect knowing what comes next. Variable or interleaved practice mixes distances, speeds, directions, or skills. It often makes practice look harder because the learner must repeatedly identify the problem and reconstruct the solution, yet that effort can support transfer.`,
            `Whole practice preserves the complete skill; part practice isolates a component. Part practice is most useful when the parts are relatively independent or when complexity overwhelms the learner. For highly integrated skills, excessive part practice can remove the timing relationships that define the task.`,
            `Design practice backward from the transfer demand. If a learner must choose a pass under pressure, stationary blocked passing is a starting point, not the destination. Add variable targets, perception, and decision making after the basic pattern is controlled.`
          ], ["Blocked practice supports early stability", "Variable practice requires reconstruction", "Retention removes support", "Transfer changes the problem"])
        ], {
          title: "Worked example · rapid novice strength gain", situation: "A novice adds four repetitions to a resistance exercise in ten days, and the movement becomes smoother.",
          steps: ["The time period is short for large changes in muscle cross-sectional area.", "Improved recruitment and rate coding can increase neural drive.", "Better timing and less unnecessary co-contraction improve coordination.", "Familiarity with setup and pacing improves task-specific skill."],
          conclusion: "The most defensible explanation emphasizes neural adaptation and learning; hypertrophy may contribute later with sufficient training and recovery."
        }, [
          q("What is a motor unit?", ["One muscle and one tendon", "One motor neuron and all fibers it innervates", "All neurons in a spinal segment", "One actin and myosin pair"], 1, "A motor unit is the functional neural-to-muscle unit."),
          q("Which test best shows that practice produced learning?", ["A better score with continuous coaching", "A retention or transfer test without the original support", "More feedback during practice", "A higher confidence rating"], 1, "Durable learning is inferred when performance persists or transfers beyond supported practice.")
        ], "Explain a rapid early improvement in a movement skill without using hypertrophy as the main cause. Include recruitment, rate coding, coordination, feedback, and a way to test learning."),
      ],
      labs: [lab({
        title: "Feedback frequency, retention, and transfer experiment", minutes: 45,
        primer: "Immediate performance can be misleading. This experiment compares no feedback, feedback after every attempt, and faded feedback, then removes feedback to test retention and transfer.",
        question: "Which feedback schedule produces the strongest independent retention and transfer?",
        materials: "Ten soft objects, floor target, tape measure, score sheet, partner, timer.",
        safety: "Use a clear underhand-toss lane and light objects. Retrieve only after the full set is complete.",
        variables: ["Independent variable: feedback schedule", "Acquisition outcome: distance from target", "Learning outcomes: delayed no-feedback retention and changed-distance transfer"],
        steps: ["Choose a reproducible underhand toss and measure error as distance from the target center.", "Complete five baseline attempts with outcome visible but no coaching.", "Complete five attempts with precise knowledge of results after every toss.", "Complete five attempts with faded feedback after attempts 1, 3, and 5; self-estimate error first.", "Rest or complete another task for five minutes.", "Complete five retention attempts with no feedback.", "Move the target 25% farther or closer and complete five transfer attempts with no feedback.", "Compare acquisition, retention, and transfer rather than choosing the condition with the best practice score."],
        data: ["Mean absolute error for each acquisition condition", "Mean retention error", "Mean transfer error", "Learner self-estimate versus measured error"],
        calculations: ["Mean absolute error = sum of absolute distances ÷ attempts", "Retention change = retention mean − best acquisition mean"],
        analysis: ["Which condition looked best during practice?", "Did that advantage remain during retention?", "How did faded feedback affect self-detection of error?", "What feedback schedule would you prescribe to a novice and how would you fade it?"],
        evidence: "Report all condition means, distinguish acquisition from learning, interpret the retention and transfer results, and prescribe a feedback schedule supported by your data.",
        quality: ["Uses numerical error rather than impressions", "Includes a true no-feedback retention test", "Does not equate practice success with learning", "Connects findings to a teaching decision"], minChars: 240
      })],
      gate: [
        q("Which change can increase muscle force without recruiting additional motor units?", ["Lower firing rate", "Higher rate coding", "Remove calcium", "Block acetylcholine"], 1, "Increasing firing frequency can increase force from active motor units."),
        q("Calcium directly enables contraction by…", ["Breaking down glycogen", "Exposing actin binding sites through troponin and tropomyosin", "Creating a motor neuron", "Lengthening the tendon"], 1, "Calcium binding shifts the regulatory proteins so cross-bridges can form."),
        q("A coach gives the correct answer after every attempt. Practice improves, but performance collapses without the coach. The main problem is…", ["Insufficient hypertrophy", "Feedback dependence", "Low ATP", "The size principle"], 1, "Very frequent feedback can suppress error detection and create dependence."),
        q("Which cue has an external attentional focus?", ["Contract your quadriceps", "Keep your elbow at 90 degrees", "Push the floor away", "Think about your hamstrings"], 2, "‘Push the floor away’ directs attention to the movement effect on the environment."),
        q("What is the best evidence of transfer?", ["Repeating the identical task with coaching", "Performing accurately when distance or context changes", "Reporting high confidence", "Watching an expert"], 1, "Transfer requires applying learning to a changed task or context.")
      ]
    },

    4: {
      time: "2 hours 20 minutes", sessions: ["Session 1 · Motion, balance, and projectiles (40 min)", "Session 2 · Force, impulse, and torque (45 min)", "Session 3 · Quantitative mechanics lab (40 min)", "Session 4 · Retrieval and gate (15 min)"],
      concepts: ["position, velocity, acceleration", "center of mass and base of support", "projectile velocity and angle", "net force", "impulse and momentum", "torque and moment arm", "lever classes"],
      lessons: [
        lesson(40, "How can movement be described before its causes are explained?", [
          s("Kinematics describes motion", [
            `Position locates a body or object relative to a reference. Displacement is the directed change in position. Speed describes how fast distance is covered; velocity includes direction and is calculated as displacement divided by time. Acceleration is the change in velocity divided by time, so acceleration occurs when speed increases, speed decreases, or direction changes.`,
            `A learner running a curved path can have nearly constant speed but still accelerate because velocity direction changes. Video becomes useful when the teacher defines the phase, reference points, distance scale, and time interval before measuring.`
          ], ["Velocity = displacement ÷ time", "Acceleration = change in velocity ÷ time"]),
          s("Stability depends on geometry and task demands", [
            `A wider base of support and a lower center of mass generally increase stability because the line of gravity can move farther before leaving the base. Greater mass and friction can also resist unwanted motion. But stability competes with mobility: a defender widens and lowers to react to contact, while a sprinter uses a narrower base at top speed to reposition rapidly.`,
            `The best stance is therefore not the widest stance; it is the amount of stability needed without preventing the movement goal.`
          ]),
          s("Projectile motion begins with release conditions", [
            `After release, a projectile’s horizontal motion is shaped mainly by its horizontal velocity, while vertical motion changes under gravity. Release speed strongly influences range. Release angle trades horizontal and vertical velocity, and the best angle depends on release height, landing height, air resistance, and the task. Teachers should avoid treating 45 degrees as a universal answer. Spin can also change flight through aerodynamic forces.`]
          )
        ], {
          title: "Worked example · defender versus sprinter", situation: "A defender lowers and widens the stance; a sprinter at top speed uses a narrow alternating base.",
          steps: ["The defender must resist perturbation and redirect in several directions.", "A lower center of mass and wider base increase the margin for controlling the line of gravity.", "The sprinter must cycle the limbs rapidly and direct force backward against the ground.", "Excess width would slow repositioning and redirect force away from the running task."],
          conclusion: "Stability is valuable only in the amount and direction required by the task."
        }, [
          q("A runner turns while maintaining the same speed. Is the runner accelerating?", ["No, speed is unchanged", "Yes, velocity direction changed", "Only if stride length changes", "Only if mass changes"], 1, "Acceleration includes any change in velocity, including direction."),
          q("Why is a wider base not always better?", ["It always lowers friction", "It may reduce mobility and force direction needed for the task", "It raises the center of mass", "It removes gravity"], 1, "More stability can interfere with rapid movement or task-specific force application.")
        ], "Describe a movement using displacement, time, velocity, and acceleration before proposing any force-based cause. Then explain how the task determines the appropriate stability."),
        lesson(45, "How do force, time, and moment arms change linear and angular motion?", [
          s("Net external force changes acceleration", [
            `Newton’s first law describes inertia: motion remains unchanged unless a net external force acts. Newton’s second law states that net force equals mass times acceleration. Newton’s third law states that forces occur as interactions: when a performer pushes backward and downward on the ground, the ground pushes forward and upward on the performer. The two forces act on different objects and do not cancel each other.`,
            `A free-body diagram must define the system first. If the system is the ball, include forces acting on the ball—not the force the ball exerts on the hand.`
          ], ["Net force = mass × acceleration"]),
          s("Impulse changes momentum", [
            `Momentum equals mass times velocity. Impulse equals average force multiplied by the time that force acts, and impulse equals the change in momentum. To catch the same ball and bring it to rest, the momentum change is similar whether the arms are rigid or yield. Increasing stopping time reduces the average force required for that momentum change.`,
            `In jumping, a larger propulsive impulse produces a larger takeoff momentum change. Both force and time matter, so a brief large force and a longer moderate force can sometimes create similar impulse.`
          ], ["Momentum = mass × velocity", "Impulse = average force × time = change in momentum"]),
          s("Torque depends on force and perpendicular distance", [
            `Torque is the turning effect of a force about an axis. It equals force multiplied by the perpendicular moment arm. Holding the same dumbbell farther from the shoulder increases external shoulder torque even though mass has not changed. Moving the load closer, changing body position, or reducing the force can reduce joint demand.`,
            `Most human musculoskeletal levers are third class: muscle force is applied between the axis and external resistance. This arrangement has poor mechanical advantage for force but favors speed and range of motion at the distal segment.`
          ], ["Torque = force × perpendicular moment arm"])
        ], {
          title: "Worked example · yielding catch", situation: "A 0.40 kg ball approaches at 12 m/s and is brought to rest. Compare stopping in 0.05 s with stopping in 0.20 s.",
          steps: ["Initial momentum = 0.40 × 12 = 4.8 kg·m/s; final momentum = 0.", "Magnitude of momentum change = 4.8 kg·m/s.", "Rigid catch average force ≈ 4.8 ÷ 0.05 = 96 N.", "Yielding catch average force ≈ 4.8 ÷ 0.20 = 24 N."],
          conclusion: "Four times more stopping time produces one-fourth the average force for the same momentum change."
        }, [
          q("For the same momentum change, increasing stopping time generally does what to average force?", ["Increases it", "Decreases it", "Has no effect", "Changes mass"], 1, "Average force equals impulse divided by time."),
          q("The same load is moved farther from a joint axis. External torque will generally…", ["Decrease", "Increase", "Stay constant", "Become zero"], 1, "The perpendicular moment arm becomes longer, increasing torque.")
        ], "Explain one safety or performance cue using a complete causal chain: changed force, time, or moment arm → changed impulse or torque → changed observable movement."),
      ],
      labs: [lab({
        title: "Measure impulse and torque instead of guessing", minutes: 40,
        primer: "You will use simple measurements to test two mechanical predictions: more stopping time reduces average force for a given momentum change, and a longer moment arm increases torque for the same load.",
        question: "How do stopping time and load distance change estimated force and joint torque?",
        materials: "Phone slow-motion video, soft ball, meter stick or tape, very light object of known mass, calculator.",
        safety: "Use a soft ball and light load. Keep the throwing lane clear and avoid maximal or painful positions.",
        variables: ["Catch comparison: rigid-looking versus yielding strategy", "Lever comparison: load near versus farther from the joint", "Controls: same ball speed estimate, same load, same joint position except distance"],
        steps: ["Record two catches of the same gentle toss: one with less arm travel and one with more yielding travel.", "Count video frames from first contact until the ball is controlled. Divide frames by frame rate to estimate stopping time.", "Use the same estimated momentum change for both catches and calculate relative average force as Δp ÷ time.", "Hold a light known load at two measured perpendicular distances from the shoulder or elbow.", "Convert mass to weight: force ≈ mass × 9.81 N/kg.", "Calculate external torque for each position: force × distance in meters.", "State whether each result matches the prediction and identify the largest source of measurement error."],
        data: ["Frames and stopping time for each catch", "Estimated average force for each catch", "Load mass and force", "Near and far moment arms", "Near and far torque"],
        calculations: ["Time = frames ÷ frames per second", "Average force = momentum change ÷ stopping time", "Weight = mass × 9.81", "Torque = force × perpendicular distance"],
        analysis: ["How much did estimated force change when stopping time changed?", "How much did torque change when distance changed?", "What assumptions make these estimates imperfect?", "Write one teaching cue justified by each comparison."],
        evidence: "Show both force estimates and both torque calculations with units, explain whether the predictions were supported, identify one measurement limitation, and write two evidence-based teaching cues.",
        quality: ["Calculations include units", "System and phase are defined", "Claims match the measurements", "Limitations are acknowledged"], minChars: 260
      })],
      gate: [
        q("A player runs a semicircle at constant speed. Which quantity must change?", ["Mass", "Velocity", "Gravity", "Inertia"], 1, "Velocity changes because its direction changes."),
        q("A 2 kg object accelerates at 3 m/s². What net force acts on it?", ["0.67 N", "1.5 N", "5 N", "6 N"], 3, "Net force = mass × acceleration = 2 × 3 = 6 N."),
        q("Why do ground-reaction and foot-on-ground forces not cancel each other?", ["They occur at different times", "They act on different objects", "One is not a force", "Gravity removes one"], 1, "Newton’s third-law pair acts on two different bodies."),
        q("Which change increases external knee torque if force is unchanged?", ["Shorten the moment arm", "Lengthen the perpendicular moment arm", "Increase stopping time", "Widen the base only"], 1, "Torque increases with perpendicular distance from the axis."),
        q("Which claim about projectile release angle is most accurate?", ["45° is always optimal", "The useful angle depends on speed, release height, and task", "Angle does not affect flight", "Only spin matters"], 1, "Release conditions and task constraints determine the useful angle.")
      ]
    },

    5: {
      time: "2 hours 30 minutes", sessions: ["Session 1 · ATP and overlapping pathways (45 min)", "Session 2 · Oxygen delivery and Fick (40 min)", "Session 3 · Dose-response lab (50 min)", "Session 4 · Retrieval and gate (15 min)"],
      concepts: ["ATP resynthesis", "phosphagen, glycolytic, and oxidative pathways", "lactate shuttle", "cardiac output", "Fick principle", "RPE, talk test, and recovery", "metabolic flexibility"],
      lessons: [
        lesson(45, "How does the body continually resynthesize ATP as movement demands change?", [
          s("ATP transfers usable energy, but stored ATP is limited", [
            `Muscle contraction, calcium reuptake, and many cellular processes require ATP. Because muscle stores only a small amount, ATP must be continually resynthesized from ADP and phosphate. The phosphagen, glycolytic, and oxidative pathways all contribute from the beginning of activity; intensity and duration shift their relative contribution. Activities are not purely aerobic or anaerobic.`,
            `The phosphagen system uses stored phosphocreatine to resynthesize ATP at a very high rate but for a small capacity. Glycolysis rapidly breaks down glucose or glycogen and can support hard efforts beyond the first seconds. Oxidative metabolism in mitochondria uses carbohydrate, fat, and sometimes amino-acid carbon skeletons to supply ATP at a lower maximum rate but much larger capacity.`
          ], ["Phosphagen: highest rate, lowest capacity", "Glycolytic: rapid carbohydrate-supported ATP", "Oxidative: lower rate, high capacity"]),
          s("Lactate is a transportable fuel and signal—not useless waste", [
            `Rapid glycolysis produces pyruvate. When glycolytic flux is high, conversion of pyruvate to lactate helps regenerate NAD+ so glycolysis can continue. Lactate can leave the producing fiber, travel to other muscle fibers or the heart, and be oxidized for energy; it can also contribute carbon for glucose production.`,
            `The burning sensation and fatigue of intense exercise cannot be blamed on lactate alone. Fatigue is multifactorial, and lactate concentration reflects production, transport, and clearance. In teaching, say that a pathway is dominant or contributes more—not that a game “uses only” one system.`
          ]),
          s("Work-to-rest structure changes the physiological problem", [
            `A six-second sprint with long recovery emphasizes high power and phosphocreatine restoration. Repeated 20-second efforts with short rest increase glycolytic and oxidative demand. Continuous conversational movement emphasizes oxidative supply. The same activity can create different demands when work duration, intensity, rest, number of repetitions, or learner fitness changes.`]
          )
        ], {
          title: "Worked example · three work-rest prescriptions", situation: "Choose a structure for sprint mechanics, repeated court movement, and an aerobic activity game.",
          steps: ["Sprint mechanics: 5–8 seconds of high-quality work with 45–90 seconds recovery to protect speed and technique.", "Repeated court movement: 15–30 seconds work with incomplete recovery to practice repeated efforts.", "Aerobic game: longer work bouts or continuous play with intensity adjusted by space, rules, and substitutions.", "Monitor actual response; written work-rest ratios do not guarantee the same dose for every learner."],
          conclusion: "The task goal determines the dose, and response measures verify what dose the learner actually received."
        }, [
          q("Which statement about energy systems is correct?", ["Only one operates at a time", "All contribute, with proportions changing by demand", "Oxidative metabolism begins after two minutes", "Lactate stops ATP production"], 1, "The pathways overlap continuously from the beginning of activity."),
          q("A coach wants maximal sprint quality. Which rest strategy is most defensible?", ["Very short rest to maximize fatigue", "Enough recovery to preserve speed and mechanics", "No rest because phosphocreatine is unlimited", "Rest only after technique fails"], 1, "High-quality power work requires sufficient recovery to restore capacity and control.")
        ], "Explain why calling an activity ‘aerobic’ or ‘anaerobic’ can mislead instruction. Use ATP demand, pathway overlap, intensity, duration, and recovery."),
        lesson(40, "How does oxygen travel from the environment to mitochondria, and how can teachers monitor the response?", [
          s("Oxygen delivery is a linked chain", [
            `Ventilation moves air into and out of the lungs. Diffusion moves oxygen across the alveolar-capillary membrane into blood. Hemoglobin carries most oxygen. Cardiac output transports oxygenated blood to active tissue. At the muscle, oxygen diffuses to mitochondria, where it supports oxidative phosphorylation. A limitation at any link can change whole-body performance.`,
            `Cardiac output equals heart rate multiplied by stroke volume. The Fick principle states that oxygen uptake equals cardiac output multiplied by the arterial–venous oxygen difference. The first factor describes delivery; the second reflects how much oxygen tissue extracts from the blood.`
          ], ["Q = HR × SV", "VO₂ = Q × (a−vO₂ difference)"]),
          s("Training changes central and peripheral capacity", [
            `Endurance training can increase stroke volume and plasma volume, so a lower heart rate may produce the same cardiac output at a familiar submaximal workload. Peripheral adaptations include greater capillary density, mitochondrial content, oxidative enzyme activity, and oxygen extraction. A lower heart rate at the same standardized task may reflect adaptation, but one measurement is not a diagnosis.`
          ]),
          s("Use multiple practical indicators", [
            `Heart rate provides physiological context. Rating of perceived exertion captures the learner’s integrated sense of difficulty. The talk test reflects whether speech remains comfortable. Recovery heart rate shows how response changes after work. Conditions, medication, heat, emotion, hydration, and measurement error affect each indicator. Use patterns across standardized conditions and protect student privacy; do not use heart rate as a public effort grade.`]
          )
        ], {
          title: "Worked example · Fick calculation", situation: "During exercise, heart rate is 150 beats/min, stroke volume is 100 mL/beat, and a−vO₂ difference is 12 mL O₂ per 100 mL blood.",
          steps: ["Cardiac output = 150 × 100 mL = 15,000 mL/min = 15 L/min.", "Convert extraction: 12 mL O₂ per 100 mL blood = 120 mL O₂ per liter.", "VO₂ = 15 L/min × 120 mL/L = 1,800 mL/min.", "VO₂ = 1.8 L/min."],
          conclusion: "Fick separates oxygen delivery from tissue extraction and requires consistent units."
        }, [
          q("Cardiac output equals…", ["Heart rate × stroke volume", "Ventilation × diffusion", "VO₂ ÷ body mass only", "RPE × duration"], 0, "Cardiac output is the volume pumped per minute: heart rate times stroke volume."),
          q("Why should heart rate be paired with RPE or talk test?", ["Heart rate is never useful", "Multiple indicators improve interpretation of individual response", "RPE directly measures oxygen", "Talk test diagnoses disease"], 1, "Each indicator is incomplete and affected by context; together they support a better teaching decision.")
        ], "Trace oxygen from room air to ATP production, then explain how heart rate, RPE, talk test, and recovery would help a teacher individualize one activity."),
      ],
      labs: [lab({
        title: "Work-rest dose, recovery, and Fick interpretation", minutes: 50,
        primer: "This lab connects task design to the physiological dose a learner actually receives. It combines a safe three-stage activity comparison with an oxygen-delivery calculation.",
        question: "How does changing work duration and recovery alter heart rate, perceived exertion, talk-test response, and two-minute recovery?",
        materials: "Timer, cones, RPE scale, heart-rate monitor or manual pulse option, talk-test phrase, calculator, water.",
        safety: "Complete readiness screening, use submaximal self-selected movement, provide an equivalent low-impact option, stop for chest pain, faintness, unusual shortness of breath, or concerning symptoms, and follow emergency procedures.",
        variables: ["Independent variable: work-rest structure across three stages", "Responses: heart rate, RPE, talk-test category, and recovery", "Controls: movement mode, environment, measurement timing"],
        steps: ["Measure resting heart rate and record readiness/context.", "Stage A: complete 6 × 6-second brisk efforts with 45 seconds easy recovery.", "Stage B: complete 4 × 20-second efforts with 20 seconds easy recovery.", "Stage C: complete 4 minutes of continuous conversational movement.", "After each stage, immediately record heart rate, RPE, and talk-test category.", "Record heart rate again at one and two minutes after the final stage.", "For the supplied Fick case, calculate cardiac output and VO₂ with units.", "Prescribe one change for a learner whose response exceeds the intended dose and one for a learner below it."],
        data: ["Resting HR and context", "Work, rest, post-HR, RPE, and talk test for A/B/C", "One- and two-minute recovery HR", "Fick variables, cardiac output, and VO₂"],
        calculations: ["One-minute HR recovery = final HR − one-minute HR", "Q = HR × SV", "VO₂ = Q × a−vO₂ difference after unit conversion"],
        analysis: ["Which stage had the highest rate demand? Which had the greatest sustained demand?", "How did subjective and physiological measures agree or disagree?", "Why can two learners receive different doses from the same written activity?", "How would you change work, rest, space, or movement mode without public comparison?"],
        evidence: "Submit the complete response table, recovery calculation, Fick calculation with units, and two individualized task adjustments justified by multiple indicators.",
        quality: ["Uses at least two response measures", "Describes pathway dominance without single-system claims", "Calculations show unit conversion", "Recommendations preserve access and privacy"], minChars: 280
      })],
      gate: [
        q("What is the most accurate role of lactate during intense exercise?", ["It is only toxic waste", "It can be transported and oxidized as fuel", "It permanently blocks glycolysis", "It is stored ATP"], 1, "Lactate is a reusable fuel and part of metabolic transport, not merely waste."),
        q("If heart rate is 120 beats/min and stroke volume is 80 mL/beat, cardiac output is…", ["1.5 L/min", "9.6 L/min", "15 L/min", "96 L/min"], 1, "120 × 80 = 9,600 mL/min = 9.6 L/min."),
        q("Which change most directly protects power quality across repeated six-second sprints?", ["Shorten recovery", "Increase recovery", "Add more continuous running first", "Remove technique criteria"], 1, "More recovery helps restore phosphocreatine and preserve high-rate force production."),
        q("A lower heart rate at the same standardized submaximal workload may reflect…", ["Higher stroke volume", "No oxygen extraction", "Complete reliance on fat", "Loss of mitochondria"], 0, "A greater stroke volume can maintain cardiac output with fewer beats."),
        q("Which statement best interprets a high exercise heart rate?", ["It proves low effort", "It proves poor fitness", "It is one response measure that requires workload and context", "It should determine a public grade"], 2, "Heart rate must be interpreted with workload, individual context, and other indicators.")
      ]
    },

    6: {
      time: "1 hour 55 minutes", sessions: ["Session 1 · Stress, fatigue, and adaptation (45 min)", "Session 2 · Readiness decision lab (50 min)", "Session 3 · Delayed retrieval and gate (20 min)"],
      concepts: ["acute response versus chronic adaptation", "overload, specificity, and reversibility", "fitness–fatigue model", "central and peripheral fatigue", "readiness trends", "recovery decisions"],
      lessons: [
        lesson(45, "How can a teacher distinguish productive training stress from fatigue that should change the plan?", [
          s("An acute response supports today’s work; adaptation changes future capacity", [
            `Heart rate, ventilation, temperature, neural drive, and hormone concentrations can change during or soon after one session. These are acute responses. Chronic adaptations develop after repeated exposures and recovery: greater stroke volume, mitochondrial content, neural coordination, tissue capacity, or movement economy. A temporary response is not itself proof that adaptation occurred.`,
            `Overload means the demand exceeds what is habitual enough to create an adaptive signal. Specificity means adaptations reflect the movement, force, speed, range, energy demand, and tissues trained. Reversibility means capacity declines when the stimulus is removed. Progression changes the dose over time so overload remains appropriate.`
          ]),
          s("Performance reflects both fitness and fatigue", [
            `A useful model treats the observed performance on a given day as the combination of longer-lasting fitness and shorter-lasting fatigue. A productive session may temporarily reduce performance even while contributing to future adaptation. The goal is not to eliminate fatigue; it is to manage its magnitude and duration so the next important task can be completed safely and well.`,
            `Fatigue can reflect reduced substrate availability, changes in metabolites and ion balance, excitation–contraction limitations, reduced neural drive, heat strain, dehydration, sleep loss, psychological stress, or altered motivation. Because no single measure captures all of these, readiness decisions should combine indicators.`
          ]),
          s("Use trends and decision rules—not punishment", [
            `Compare a learner with their own standardized baseline. A practical readiness screen can combine one performance measure, one physiological measure, and one perceptual measure. For example: submaximal jump or grip result, resting or warm-up heart rate, and sleep/soreness/RPE. One unusual score invites context; a repeated cluster supports changing the plan.`,
            `Adjust the smallest useful variable: volume, intensity, density, complexity, or exercise selection. Sharp pain, chest pain, fainting, neurological symptoms, or illness red flags require stopping and following appropriate referral or emergency procedures. Soreness is information, not proof of an effective workout, and muscle damage is not required as the primary cause of hypertrophy.`
          ]),
          s("Recovery is the condition that allows the next useful exposure", [
            `Sleep, energy and nutrient availability, hydration, temperature management, psychological recovery, and time between demanding exposures all influence readiness. No single recovery product replaces these foundations. Active recovery may support comfort and circulation, but it does not instantly remove every source of fatigue.`,
            `The popular supercompensation curve is a teaching model, not a precise clock for every tissue and learner. Neural, muscular, metabolic, and connective-tissue systems recover and adapt on different timelines. Schedule important high-skill or high-power work when quality can be protected, and place lower-demand learning, technique, or recovery work when readiness is reduced.`,
            `Document the decision and recheck the same indicators. A good recovery adjustment is confirmed when the next exposure returns toward the intended quality and response—not merely when the calendar advances.`
          ], ["Protect sleep and basic fueling", "Separate demanding exposures", "Match the session to today’s readiness", "Recheck the same evidence"])
        ], {
          title: "Worked example · three-session decline", situation: "For three sessions, an athlete’s submaximal jump drops 8%, resting heart rate is elevated, soreness increases, and mood worsens.",
          steps: ["The pattern occurs across performance, physiological, and perceptual domains.", "The change persists across more than one day, making random error less likely.", "Adding overload would increase demand when readiness evidence is already poor.", "Reduce volume or intensity, investigate sleep/illness/stress, and reassess under standardized conditions."],
          conclusion: "The decision is not a diagnosis. It is a conservative dose adjustment supported by a multi-signal trend."
        }, [
          q("Which is a chronic adaptation rather than an acute response?", ["Heart rate rises during exercise", "Ventilation increases during a sprint", "Stroke volume improves after repeated training", "Body temperature rises in class"], 2, "A sustained change after repeated training and recovery is an adaptation."),
          q("Why use multiple readiness indicators?", ["One measure is always invalid", "Fatigue has multiple contributors and measures contain noise", "It guarantees a diagnosis", "It removes the need for a baseline"], 1, "Triangulating performance, physiological, and perceptual evidence supports a better decision.")
        ], "Write a keep, modify, or stop decision rule using one performance, one physiological, and one perceptual signal. Explain how it avoids treating fatigue as a character judgment."),
      ],
      labs: [lab({
        title: "Build and test a three-signal readiness rule", minutes: 50,
        primer: "A readiness rule should detect meaningful change without overreacting to one noisy score. You will measure a rested baseline, apply a safe submaximal dose, and test how multiple signals change the decision.",
        question: "Does a short standardized work bout change performance, physiological, and perceptual readiness signals in the same direction?",
        materials: "Timer, submaximal grip/jump/balance option, RPE and wellness scale, heart-rate option, calculator.",
        safety: "Use a familiar submaximal task, provide a no-impact option, stop for pain or concerning symptoms, and do not use the results to diagnose health conditions.",
        variables: ["Performance: repeatable submaximal task result", "Physiological: heart rate or breathing recovery", "Perceptual: RPE plus sleep/soreness/stress context"],
        steps: ["Standardize time, instructions, warm-up, and task technique.", "Collect two baseline trials and record wellness context.", "Complete a 3–5 minute moderate work bout at RPE 5–6 of 10.", "Retest performance immediately using identical instructions.", "Record immediate RPE and physiological response, then one-minute recovery.", "Calculate percent performance change from the baseline mean.", "Apply your prewritten keep/modify/stop rule.", "Identify what additional evidence would be needed if the three signals disagree."],
        data: ["Two baseline trials and mean", "Post-work performance and percent change", "Heart rate/breathing response and recovery", "RPE and wellness context", "Decision produced by the rule"],
        calculations: ["Baseline mean = (trial 1 + trial 2) ÷ 2", "Percent change = (post − baseline mean) ÷ baseline mean × 100"],
        analysis: ["Did all signals change in the same direction?", "Which measure was most likely to contain error?", "Would the result justify overload, maintenance, recovery, or further investigation?", "How would the rule change for a school PE class rather than competitive sport?"],
        evidence: "Submit the data and calculations, the exact decision rule written before interpretation, the decision it produced, and a limitation that prevents diagnosis or overclaiming.",
        quality: ["Uses a personal standardized baseline", "Combines three signal types", "Decision follows the prewritten rule", "Acknowledges measurement noise and referral boundaries"], minChars: 260
      })],
      gate: [
        q("Which principle explains why sprint training does not automatically maximize long-duration endurance?", ["Reversibility", "Specificity", "Randomization", "Validity"], 1, "Adaptations reflect the demands imposed."),
        q("A demanding session temporarily lowers performance. What is the best interpretation?", ["Training failed", "Short-term fatigue may coexist with a useful adaptive signal", "Hypertrophy disappeared", "The athlete lacks motivation"], 1, "Observed performance reflects both fitness and temporary fatigue."),
        q("Which decision is most defensible after one unusually low readiness score?", ["Diagnose overtraining", "Gather context and repeat standardized measurement", "Add punishment work", "End training for a month"], 1, "One noisy score should prompt context and confirmation rather than diagnosis."),
        q("Which variable describes how compressed work and rest are?", ["Volume", "Intensity", "Density", "Specificity"], 2, "Density reflects work performed relative to available recovery time."),
        q("Which statement about soreness is accurate?", ["It proves muscle growth", "It is one recovery signal, not a quality score", "It must be eliminated", "It directly measures neural drive"], 1, "Soreness can inform decisions but is not proof of adaptation or session quality.")
      ]
    },

    7: {
      time: "2 hours", sessions: ["Session 1 · Strength mechanisms and youth practice (45 min)", "Session 2 · Teach-and-progress lab (55 min)", "Session 3 · Retrieval and gate (20 min)"],
      concepts: ["strength as force and skill", "neural adaptation", "hypertrophy", "progressive overload", "volume load", "RPE and repetitions in reserve", "youth resistance-training supervision"],
      lessons: [
        lesson(45, "How can teachers develop strength while protecting technique, access, and long-term progression?", [
          s("Strength expression is neural, muscular, mechanical, and technical", [
            `Strength is the capacity to produce force in a specific task. Neural recruitment and rate coding, intermuscular coordination, muscle cross-sectional area, tendon properties, leverage, range of motion, and skill all affect the result. Early gains often come largely from neural and technical improvement; longer-term hypertrophy can increase force-producing capacity when repeated tension, adequate training volume, nutrition, and recovery are present.`,
            `Muscle damage may occur, but it is not a required primary mechanism for hypertrophy. Seeking extreme soreness can reduce practice quality and recovery without improving the training stimulus.`
          ]),
          s("Dose includes more than load", [
            `Training dose can be changed through load, repetitions, sets, range of motion, tempo, velocity intent, complexity, rest, and weekly frequency. Volume load is often estimated as sets × repetitions × external load, but it does not capture technique, internal effort, body mass moved, or exercise differences. It is a planning estimate, not a complete measure.`,
            `RPE estimates whole-set difficulty. Repetitions in reserve estimate how many technically acceptable repetitions remained. Beginners generally benefit from stopping with reserve while movement remains repeatable. A practical progression rule is to change one variable only after the learner meets a technique criterion across the prescribed repetitions at an appropriate effort.`
          ], ["Volume load = sets × reps × external load", "Progress one variable at a time"]),
          s("Youth resistance training is supervised skill learning", [
            `Appropriately designed youth resistance training can improve strength, motor competence, confidence, and injury resilience. Safety depends on qualified supervision, appropriate equipment and spacing, technical instruction, gradual progression, and an emergency plan—not on an arbitrary age cutoff.`,
            `Teach movement patterns such as squat, hinge, push, pull, brace, carry, rotate, and locomote. Provide dignified regressions that preserve the goal: change support, range, resistance, tempo, or implement rather than removing the learner from meaningful participation.`]
          ),
          s("Exercise selection follows the outcome and the learner", [
            `Choose exercises for the movement demand they create, not for novelty. A squat pattern trains coordinated lower-body force through a chosen range; a hinge emphasizes hip-dominant force while the trunk resists unwanted motion; a carry challenges posture and locomotion under load. The same pattern can be taught with body mass, bands, medicine balls, free weights, machines, or partner resistance when equipment and supervision differ.`,
            `Demonstrate from a visible angle, name two or three success criteria, and use one cue at a time. Feedback should identify the earliest important deviation, not list every imperfection. If technique changes because the set is too demanding, adjust dose. If the learner does not understand the goal, adjust information. If pain appears, stop and follow the referral process.`,
            `A balanced youth program develops major movement patterns across the week while preserving time for skill, play, conditioning, and recovery. It does not copy a specialized adult bodybuilding split or require maximal testing to be effective.`
          ], ["Select the pattern for the goal", "Teach observable success criteria", "Match the change to information, dose, or safety", "Balance stress across the week"])
        ], {
          title: "Worked example · deciding whether to add load", situation: "A learner completes 2 × 10 goblet squats. Repetitions 1–7 meet the criteria; the last three lose depth control and trunk position. The learner reports 0 repetitions in reserve.",
          steps: ["The prescribed technique was not repeatable through the set.", "Zero repetitions in reserve indicates the set reached the learner’s current limit.", "Adding load would increase demand before the present dose is controlled.", "Keep or reduce load, shorten the set, and require repeatable technique with 2–3 repetitions in reserve before progressing."],
          conclusion: "Progression is earned by quality and appropriate effort, not by completing a number at any cost."
        }, [
          q("Which mechanism best explains many early strength gains?", ["Large hypertrophy in days", "Improved recruitment, coordination, and skill", "Bone length change", "Lactate accumulation"], 1, "Neural and technical adaptation can improve strength expression quickly."),
          q("What does two repetitions in reserve mean?", ["Two repetitions were completed", "About two technically acceptable repetitions remained", "The load is two kilograms", "The set was maximal"], 1, "RIR estimates remaining good repetitions at the end of a set.")
        ], "Design a progression rule for one youth strength pattern. Include observable technique, effort or repetitions in reserve, dose, and a dignified regression."),
      ],
      labs: [lab({
        title: "Teach, quantify, and progress a youth strength pattern", minutes: 55,
        primer: "You will teach one pattern, collect technique and effort evidence, calculate dose, then test a single-variable progression or regression.",
        question: "Which dose allows the learner to maintain the movement criteria while finishing with appropriate reserve?",
        materials: "Bodyweight or light resistance, stable box/bench, bands if available, timer, technique rubric.",
        safety: "Use qualified spotting/supervision, clear equipment checks, pain-free range, submaximal resistance, and immediate stopping criteria for pain or loss of control.",
        variables: ["Independent variable: load, range, support, tempo, or repetitions—choose one", "Outcomes: criteria met per repetition and reported RIR/RPE", "Controls: exercise pattern, cue, rest, and evaluation rubric"],
        steps: ["Choose one pattern and write three observable technique criteria.", "Demonstrate the task and give one external-focus cue.", "Complete or coach a baseline set of 6–10 repetitions with a light dose.", "Score every repetition and record RPE or RIR immediately.", "Choose one evidence-based progression or regression and predict the result.", "Repeat after standardized rest, changing only that variable.", "Calculate volume load when external load is used; otherwise report total quality repetitions and time under tension.", "Write the next-session decision rule."],
        data: ["Three operational technique criteria", "Baseline quality reps and RPE/RIR", "Changed variable and prediction", "Second-set quality reps and RPE/RIR", "Volume load or alternative dose measure"],
        calculations: ["Volume load = sets × reps × external load", "Technique success = criteria-meeting reps ÷ total reps × 100"],
        analysis: ["Did the changed variable improve productive effort without reducing control?", "Which criterion failed first and what demand explains it?", "What evidence would justify another progression?", "How would the station include a learner with different mobility, equipment access, or confidence?"],
        evidence: "Submit the rubric, repetition-by-repetition scores, effort rating, dose calculation, comparison of the two conditions, and a next-session progression/regression rule.",
        quality: ["Criteria are observable", "Only one variable changes", "Effort and technique are both considered", "Inclusion and supervision are explicit"], minChars: 280
      })],
      gate: [
        q("Which change is most appropriate when technique fails late in every set and RIR is zero?", ["Add load", "Reduce the set demand and preserve quality", "Remove rest", "Test a maximum"], 1, "The current dose exceeds the quality target; progression is not yet supported."),
        q("Which is NOT required as the primary mechanism for hypertrophy?", ["Repeated muscular tension", "Recovery", "Appropriate training volume", "Muscle damage and severe soreness"], 3, "Muscle damage is not required as the primary cause of hypertrophy."),
        q("Three sets of eight repetitions at 20 kg produce what external volume load?", ["160 kg", "240 kg", "480 kg", "640 kg"], 2, "3 × 8 × 20 = 480 kg."),
        q("What is the strongest youth-training safety strategy?", ["An age cutoff alone", "Qualified supervision, technique, appropriate dose, and equipment checks", "Maximal testing first", "Identical loads for all"], 1, "Safety is created by instruction, supervision, environment, and progression."),
        q("Which progression preserves the task goal most directly for a learner who cannot control full squat depth?", ["Exclude the learner", "Use a higher target and progress controlled range", "Add speed", "Add an unstable surface"], 1, "Scaling range preserves the squat goal while matching current control.")
      ]
    },

    8: {
      time: "2 hours", sessions: ["Session 1 · Power, braking, and agility (45 min)", "Session 2 · Landing-to-reactive lab (55 min)", "Session 3 · Retrieval and gate (20 min)"],
      concepts: ["power and force–velocity", "rate of force development", "stretch-shortening cycle", "momentum absorption", "deceleration", "change of direction versus agility", "progression criteria"],
      lessons: [
        lesson(45, "Why must fast movement be taught with equal attention to braking and decision making?", [
          s("Power combines force and velocity", [
            `Mechanical power is the rate of doing work and can be expressed as force × velocity in translational movement. Strength is the capacity to produce force; speed describes how fast position changes; power reflects producing useful force quickly. Maximum power usually occurs at a task-specific combination of force and velocity, not at the heaviest load or greatest unloaded speed.`,
            `Rate of force development matters when little time is available. A learner may be strong in a slow task but unable to express force rapidly during a jump or first step. Power training therefore protects movement quality while using high intent, manageable resistance, sufficient rest, and low fatigue.`
          ], ["Power = force × velocity", "High intent requires adequate recovery"]),
          s("The stretch-shortening cycle links braking to propulsion", [
            `A rapid eccentric action can be followed by a more forceful concentric action through stored elastic energy, muscle-tendon behavior, and neural contributions. The transition time matters: a long pause allows much of the elastic contribution to dissipate. This does not mean every learner should immediately perform high-intensity plyometrics.`,
            `Landing and deceleration are eccentric braking tasks. To reduce momentum, the performer must apply an impulse opposite the direction of travel. More available distance and time can reduce required average force. Trunk position, hip-knee flexion, foot placement, and the ability to hold the finish reveal whether braking capacity matches approach speed.`
          ]),
          s("Change of direction is planned; agility responds to information", [
            `A preplanned cone drill measures change-of-direction performance. Agility adds perception and decision making in response to a stimulus, opponent, or changing environment. Progress from landing control to planned stopping, planned change of direction, and only then reactive agility. Increase one demand—speed, space, angle, or decision complexity—after the learner meets a braking criterion.`]
          ),
          s("Dose power work for quality, not exhaustion", [
            `Power repetitions should end when jump height, throw distance, sprint time, or movement quality declines beyond the planned threshold. Continuing through large velocity loss changes the training problem toward fatigue resistance. That may be useful in another session, but it is not the same goal.`,
            `Use low repetition counts, complete recovery, and enough space for safe landing or stopping. Beginners first need force-production skill and landing capacity; advanced learners may add load, height, speed, unilateral demand, or reactive complexity. Add one demand at a time so the source of success or failure remains visible.`,
            `A simple quality rule might require three of three landings inside a defined area with no more than one adjustment step and a two-second stable hold. Only then does approach speed or decision demand increase. This turns “looks athletic” into a teachable, measurable progression.`
          ], ["Stop when quality or velocity meaningfully declines", "Recover enough to express high intent", "Progress one demand", "Use an observable braking gate"])
        ], {
          title: "Worked example · fastest athlete, poorest stop", situation: "An athlete reaches every cone first but takes four uncontrolled steps beyond the finish line.",
          steps: ["Approach speed creates greater momentum that must be removed.", "The extra steps show that braking impulse was spread beyond the intended stopping zone.", "Shorten the approach or reduce speed until the athlete can lower, align, and hold the stop.", "Progress speed only after stopping within the zone on repeated trials."],
          conclusion: "The fastest completion is not the best agility performance when the task includes controlled stopping."
        }, [
          q("Which equation represents mechanical power?", ["Mass ÷ time", "Force × velocity", "Torque ÷ distance", "Heart rate × stroke volume"], 1, "Power reflects how quickly force produces movement or work."),
          q("What distinguishes agility from a planned change-of-direction drill?", ["Agility always uses cones", "Agility includes perception and a decision", "Agility has no braking", "Change of direction is always slower"], 1, "Agility requires responding to information rather than following only a known route.")
        ], "Build a four-stage progression from landing to reactive agility. For each stage, name the new demand and the observable braking criterion required before progression."),
      ],
      labs: [lab({
        title: "Landing, deceleration, and reactive-agility progression", minutes: 55,
        primer: "This lab tests whether a learner’s braking capacity keeps pace as approach speed and decision demand increase.",
        question: "At what progression level does stopping control begin to deteriorate, and which demand should be adjusted?",
        materials: "Cones or tape, timer/video, stable surface, low target or line, partner-held visual signal.",
        safety: "Use a progressive warm-up, low initial speed and jump height, clear landing zones, adequate footwear, and stop before fatigue or loss of control.",
        variables: ["Progression demand: landing → planned stop → planned cut → reactive choice", "Outcomes: stopping-zone success, adjustment steps, time to stable hold, and alignment criteria", "Controls: surface, footwear, instructions, and rest"],
        steps: ["Define a successful stop: inside the zone, no more than one adjustment step, stable hold for two seconds, and pain-free alignment.", "Complete three low drop-or-step landings and score each criterion.", "Complete three short planned accelerations to a stop.", "Complete three planned 45-degree cuts at controlled speed.", "Complete three trials reacting left or right to a late visual signal.", "Record success, adjustment steps, and time to stability for every trial.", "Identify the first level where success falls below 2 of 3 trials.", "Regress one demand and write the criterion for progressing again."],
        data: ["Success criteria and trial scores", "Adjustment steps", "Time to stability", "First failed progression level", "Selected regression and progression rule"],
        calculations: ["Level success rate = successful trials ÷ 3 × 100", "Mean time to stability for each level"],
        analysis: ["Did speed or decision demand change the braking strategy most?", "Which observation indicates momentum was not controlled?", "How much rest is needed to keep this a power/skill task rather than fatigue conditioning?", "How can space, signal type, or movement mode be adapted inclusively?"],
        evidence: "Submit trial-by-trial scores, success percentages and mean stability times, identify the first limiting level, and prescribe a regression plus objective return criterion.",
        quality: ["Braking criteria are operationalized", "Progression changes one major demand at a time", "Rest protects movement quality", "Reactive work truly includes perception and decision"], minChars: 280
      })],
      gate: [
        q("Which training condition best supports high-quality power practice?", ["High fatigue and minimal rest", "High movement intent with sufficient recovery", "Maximal load for every learner", "No technique criteria"], 1, "Power quality requires high intent and enough recovery to preserve velocity and control."),
        q("To stop from a higher approach speed, the performer must manage greater…", ["Momentum", "Flexibility only", "Bone length", "Resting heart rate"], 0, "Higher velocity increases momentum that must be reduced through braking impulse."),
        q("Which is a reactive-agility task?", ["Following a memorized cone pattern", "Cutting left or right after an unpredictable visual signal", "Holding a plank", "Running a known straight sprint"], 1, "The learner must perceive information and choose a response."),
        q("Why can increased stopping distance reduce average braking force?", ["It reduces mass", "It can increase the time over which momentum changes", "It removes gravity", "It increases approach speed"], 1, "More stopping time lowers average force for a given momentum change."),
        q("Which criterion best supports progression from planned cuts to reactive agility?", ["One fast trial", "Repeated control of the stop and direction change at the planned level", "Visible fatigue", "A larger cone layout only"], 1, "Progression should follow repeatable control, not one successful or fast attempt.")
      ]
    },

    9: {
      time: "2 hours 25 minutes", sessions: ["Session 1 · Measurement quality and interpretation (40 min)", "Session 2 · Motor assessment and feedback (40 min)", "Session 3 · Reliability and video-calibration labs (50 min)", "Session 4 · Retrieval and gate (15 min)"],
      concepts: ["validity and reliability", "objectivity", "standard error and typical error", "norm- and criterion-referenced interpretation", "measurement bias", "motor-skill process and product", "ethical feedback"],
      lessons: [
        lesson(40, "When is a measurement trustworthy enough to guide instruction?", [
          s("Validity asks whether the interpretation is supported", [
            `A test is not simply “valid” in all settings. Validity concerns the evidence supporting a particular interpretation and use of scores. A shuttle test may provide useful evidence about intermittent running performance under standardized conditions; it does not directly diagnose motivation or all dimensions of fitness. Content evidence asks whether the assessment represents the intended domain. Criterion evidence compares scores with a defensible external measure. Construct evidence examines whether results behave as the underlying concept predicts.`,
            `Alignment begins with the decision: what will the teacher do differently because of the score? Choose the least burdensome measure that provides adequate evidence for that decision.`
          ]),
          s("Reliability limits what change can be interpreted", [
            `Reliability is the consistency of scores across repeated measurements, raters, or equivalent forms. Random error comes from the learner, administrator, device, environment, and scoring process. Standardized instructions, warm-up, equipment, order, and timing reduce avoidable error. Inter-rater reliability requires operational definitions and rater calibration.`,
            `A score change smaller than normal measurement variation should not be treated as definite improvement. At a basic level, use repeated trials and the typical variation observed in your own setting. A mean can improve precision, but repeated trials may also introduce learning or fatigue, so trial order matters.`
          ]),
          s("Interpret against the correct reference", [
            `Norm-referenced interpretation compares a learner with a defined group. Criterion-referenced interpretation compares performance with a standard or competency. Ipsative interpretation compares the learner with their own prior performance. PE decisions often benefit from criterion and ipsative evidence because public rank comparisons can undermine privacy and do not explain what to teach next.`,
            `Fair measurement requires accessible instructions and equipment, appropriate accommodations, confidential handling, and restraint in what is inferred. Report the measure, conditions, uncertainty, and intended use.`]
          )
        ], {
          title: "Worked example · grip change", situation: "A student’s best grip score rises from 31 kg to 32 kg. Across repeated baseline days, scores normally vary by about ±2 kg.",
          steps: ["The observed change is +1 kg.", "The change is smaller than the learner’s typical ±2 kg variation.", "The new score may reflect improvement, normal error, learning, or conditions.", "Continue standardized measurement and interpret the trend rather than declaring a definite gain."],
          conclusion: "Measurement uncertainty places a limit on the strength of the claim."
        }, [
          q("Which question is primarily about validity?", ["Do two raters agree?", "Does the score support the intended interpretation and decision?", "Was the stopwatch charged?", "Were two trials averaged?"], 1, "Validity concerns the justification for interpreting and using the score."),
          q("A score change is smaller than normal test variation. What is the best conclusion?", ["Improvement is certain", "Decline is certain", "The change is inconclusive without more evidence", "The test has no value"], 2, "Small changes may be indistinguishable from normal measurement error.")
        ], "Choose a familiar PE test. State its intended decision, validity claim, likely error sources, reference type, and one inference the score cannot support."),
        lesson(40, "How should movement process and outcome be combined in assessment and feedback?", [
          s("Product and process answer different questions", [
            `Product measures describe the result: accuracy, distance, time, successful contacts, or completed repetitions. Process measures describe how the movement was organized: sequencing, joint actions, balance, or control. A learner can achieve the product with an unsafe or nonrepeatable process, and a developing learner can show improved process before the product changes. Both forms of evidence may be needed.`]
          ),
          s("Rubric criteria must be observable and phase-specific", [
            `“Good form” is not an operational criterion. “During preparation, steps with the opposite foot” can be observed and scored. Keep the rubric short enough for dependable use, identify the phase, and define what counts. Calibrate by scoring the same video independently, comparing disagreements, revising definitions, and rescoring.`,
            `Video supports replay and phase identification but introduces camera angle, frame rate, distance scaling, and privacy issues. Record only what is necessary, store it appropriately, and avoid medical diagnosis from visual screening.`]
          ),
          s("Feedback should identify the next learnable action", [
            `A score alone does not teach. Effective feedback names the evidence, interprets it against the goal, and specifies one next action: “Three of four throws reached the target, and the plant foot crossed the line on two misses. Keep the target; practice stepping beside the line for three trials.” This preserves the link from measurement to instruction.`]
          )
        ], {
          title: "Worked example · two raters disagree", situation: "Two teachers score the same throw 3/4 and 1/4 on a four-item rubric.",
          steps: ["Locate the exact criteria that differed rather than averaging the scores immediately.", "Check whether each criterion identifies a phase and observable event.", "Watch agreed video frames and revise ambiguous wording.", "Score new clips independently and calculate percent agreement."],
          conclusion: "Rater disagreement is evidence about the measurement process, not a change in the learner."
        }, [
          q("Which is a product measure for an overhand throw?", ["Sequential trunk rotation", "Opposite-foot step", "Distance or target accuracy", "Elbow position during preparation"], 2, "Distance or accuracy describes the result; the others describe process."),
          q("Which rubric criterion is most observable?", ["Uses good form", "Shows confidence", "Holds balance for two seconds after landing", "Tries hard"], 2, "The action and duration are directly observable and can be applied consistently.")
        ], "Write feedback from one product measure and one process measure. Include evidence, interpretation, and one next action without labeling character or diagnosing injury."),
      ],
      labs: [
        lab({
          title: "Grip-test reliability and meaningful-change audit", minutes: 30,
          primer: "The grip test becomes instructionally useful only when administration is standardized and normal trial variation is understood.",
          question: "How much do repeated grip scores vary when posture, handle position, instructions, and rest are standardized?",
          materials: "Handgrip dynamometer or consistent squeeze device, chair, timer, recording sheet.",
          safety: "Screen for hand/wrist pain or recent injury; use submaximal practice before maximal trials and stop with pain.",
          variables: ["Repeated-trial score", "Hand and order", "Standardized posture, handle, instruction, and rest"],
          steps: ["Write the exact administration protocol before testing.", "Complete one familiarization trial per hand.", "Collect three scored trials per hand with consistent rest.", "Calculate mean, range, and percent difference between the highest and lowest score.", "Identify a learning, fatigue, or order pattern.", "State the smallest change you would treat cautiously based on observed variation."],
          data: ["Three trials per hand", "Mean and range", "Highest–lowest percent difference", "Order or fatigue pattern"],
          calculations: ["Mean = sum ÷ 3", "Range = highest − lowest", "Percent difference = range ÷ mean × 100"],
          analysis: ["Would best score or mean be more defensible here?", "Which protocol detail most affects comparability?", "What interpretation is supported—and what is not?"],
          evidence: "Submit all trials and calculations, the written protocol, an interpretation of normal variation, and a cautious meaningful-change rule.",
          quality: ["Protocol is replicable", "Calculations are correct", "Learning/fatigue is considered", "Interpretation stays within the test’s purpose"], minChars: 220
        }),
        lab({
          title: "Video-rubric rater calibration", minutes: 30,
          primer: "A movement rubric must create consistent evidence before it can guide feedback.",
          question: "Can two raters improve agreement by revising phase-specific operational definitions?",
          materials: "Three short movement clips, a 3–5 item draft rubric, two raters.",
          safety: "Use consented or course-provided video, protect identity, and avoid diagnostic claims.",
          variables: ["Rater decisions before and after calibration", "Rubric wording", "Same clips and viewing conditions"],
          steps: ["Each rater independently scores all clips.", "Calculate item-level percent agreement.", "Identify the two criteria with the most disagreement.", "Rewrite them with phase, observable action, and threshold.", "Score the clips again independently.", "Recalculate agreement and write feedback from one product and one process result."],
          data: ["Agreement decisions before calibration", "Revised operational definitions", "Agreement decisions after calibration", "Product + process feedback"],
          calculations: ["Percent agreement = agreements ÷ total decisions × 100", "Agreement change = after % − before %"],
          analysis: ["Which ambiguity caused disagreement?", "Did agreement improve enough for the intended use?", "What bias or video limitation remains?"],
          evidence: "Submit both agreement calculations, the original and revised criteria, the remaining limitation, and feedback that states evidence plus next action.",
          quality: ["Raters work independently", "Definitions are phase-specific", "Agreement is calculated", "Feedback is actionable and ethical"], minChars: 220
        })
      ],
      gate: [
        q("A test is highly consistent but does not measure the intended construct. It is…", ["Valid and reliable", "Reliable but not valid for that interpretation", "Valid but never reliable", "Automatically objective"], 1, "Consistency alone does not justify the intended interpretation."),
        q("Which comparison is ipsative?", ["Student versus national percentile", "Student versus a fixed standard", "Student versus their own prior score", "Two classes versus each other"], 2, "Ipsative interpretation compares the learner with their own performance history."),
        q("Two raters disagree because ‘good control’ is undefined. What is the best next step?", ["Average and ignore", "Create an observable phase-specific definition and recalibrate", "Remove all process criteria", "Choose the higher score"], 1, "Operational definitions and calibration address rater inconsistency."),
        q("Which feedback best links assessment to learning?", ["Score: 2", "Try harder", "Two of four landings held for two seconds; reduce height and repeat", "You are not athletic"], 2, "It states evidence, interprets it, and provides a specific next action."),
        q("Why should camera position be standardized in video assessment?", ["It changes the performer’s mass", "Perspective can change what joint actions and positions appear visible", "It eliminates all bias", "It increases heart rate"], 1, "Viewpoint affects observable geometry and therefore scoring comparability.")
      ]
    },

    10: {
      time: "2 hours 35 minutes", sessions: ["Session 1 · Goal, demand, and dose (40 min)", "Session 2 · Integrated case reasoning (40 min)", "Session 3 · Program-design studio (50 min)", "Session 4 · Capstone defense (30 min)", "Session 5 · Gate (15 min)"],
      concepts: ["needs and demand analysis", "FITT-VP", "progression and variation", "microcycle", "alignment", "inclusion and risk management", "assessment-driven revision", "integrated professional reasoning"],
      lessons: [
        lesson(40, "How does a teacher turn an outcome into an aligned, individualized learning and training plan?", [
          s("Begin with the learner, task, and decision", [
            `A needs analysis identifies the learner’s current capacity, relevant constraints, and the demands of the desired task. A demand analysis describes the movement patterns, force direction and speed, energy and recovery requirements, perceptual decisions, and environmental conditions. Together they reveal the gap the plan must address.`,
            `Write an outcome that can be demonstrated and measured. “Improve fitness” is too broad. “Sustain four six-minute small-sided game bouts at RPE 5–7 while maintaining the agreed movement role” connects performance, dose, and an observable criterion.`]
          ),
          s("FITT-VP organizes dose", [
            `Frequency describes how often. Intensity describes how demanding. Time describes duration. Type describes mode. Volume summarizes total work. Progression describes how the dose changes. A plan should also specify rest, movement-quality criteria, and a regression. The variables interact: increasing intensity may require lower volume or more recovery.`,
            `A microcycle is a short planning unit, commonly a week. Arrange demanding and easier sessions so quality and recovery match priorities. Progress only the variable supported by evidence; variation changes the stimulus or context without abandoning the outcome.`
          ], ["Frequency", "Intensity", "Time", "Type", "Volume", "Progression"]),
          s("Alignment connects outcome, practice, evidence, and revision", [
            `Every activity should create practice for the stated outcome. Every assessment should provide evidence about that outcome. Every progression rule should explain how evidence changes the next dose. Inclusion is not an added station at the end; it is planned through task, equipment, space, communication, and meaningful role options. Safety requires readiness checks, environmental controls, equipment inspection, stop criteria, and emergency procedures.`]
          )
        ], {
          title: "Worked example · mixed-readiness four-week unit", situation: "A class must improve repeated movement capacity and controlled change of direction, but learners begin with different fitness, mobility, and confidence.",
          steps: ["Outcome: complete repeated game bouts while meeting an individualized RPE zone and braking criterion.", "Baseline: work-rest response plus controlled-stop assessment.", "Practice: common game goal with adjustable space, work time, recovery, and movement mode.", "Progression: increase one of work duration, speed, or decision demand after two successful sessions.", "Assessment: weekly response trend and movement criterion; revise dose when either falls outside target."],
          conclusion: "The class shares a meaningful outcome while dose and access vary according to evidence."
        }, [
          q("Which FITT-VP variable describes how the plan changes over time?", ["Frequency", "Type", "Volume", "Progression"], 3, "Progression specifies how demand changes as the learner adapts."),
          q("What is constructive alignment?", ["All students use identical loads", "Outcomes, practice, assessment, and revision rules support the same capability", "The final test is hardest", "The plan uses many activities"], 1, "Alignment makes every course element serve the intended demonstrated outcome.")
        ], "Write one measurable outcome and map it to a matching practice task, assessment, progression rule, inclusion option, and safety stop criterion."),
        lesson(40, "How can anatomy, physiology, biomechanics, motor learning, and measurement produce one defensible decision?", [
          s("Use an evidence chain rather than a list of facts", [
            `Professional reasoning begins with an observable movement and a defined goal. Anatomy identifies joint actions and structural demands. Biomechanics explains forces, time, and geometry. Physiology explains the energy and recovery cost. Motor learning determines cue, practice, and feedback. Measurement checks whether the change occurred. A strong answer connects these lenses causally instead of naming them separately.`]
          ),
          s("Choose the smallest effective change", [
            `When evidence suggests several problems, prioritize the constraint most likely to improve outcome, safety, or access. Change one major variable so its effect can be observed. A cue changes information; a task modification changes the problem; a training dose builds capacity. Select the tool that matches the proposed mechanism.`,
            `Then define what would confirm or disconfirm the decision. This prevents hindsight reasoning and makes revision normal.`]
          ),
          s("Defend the decision and its boundaries", [
            `A defensible explanation states the evidence, principle, decision, expected result, and limitation. It protects privacy, avoids medical diagnosis, and names referral or emergency boundaries. For GACE-style cases, identify the principle being tested, eliminate options that are unsafe or misaligned, and explain why the best response supports learning in context.`]
          )
        ], {
          title: "Worked example · late-game landing errors", situation: "A student lands well early in a lesson but becomes stiff and unstable late in repeated games.",
          steps: ["Observe: adjustment steps and reduced hip-knee flexion rise during later bouts.", "Physiology: fatigue and recovery density may reduce force-control capacity.", "Biomechanics: less stopping time can increase average force and challenge balance.", "Motor learning: simplify the decision and cue the external goal—‘land and freeze inside the box.’", "Dose decision: shorten work or increase substitutions; recheck the same landing criteria late in the next bout."],
          conclusion: "The intervention changes both information and physiological density, and the repeated measure tests the explanation."
        }, [
          q("A cue is most appropriate when the primary need is to change…", ["Available tissue range", "The learner’s attentional information", "The gym temperature", "The testing instrument"], 1, "Cues direct attention; they do not create missing capacity or change environmental risk by themselves."),
          q("Which answer is most defensible in an applied case?", ["The one with the most vocabulary", "The one linking evidence, mechanism, action, and verification", "The strictest option", "The same plan for everyone"], 1, "Professional reasoning connects evidence to a testable decision.")
        ], "Analyze one unfamiliar movement case through all four lenses. Select one intervention, predict the evidence that should change, and state a limitation or referral boundary."),
      ],
      labs: [
        lab({
          title: "Four-week microcycle design studio", minutes: 50,
          primer: "A program is a sequence of testable dose decisions, not a calendar filled with activities.",
          question: "Can a four-week plan progress one priority while maintaining movement quality, recovery, access, and measurable alignment?",
          materials: "Planning grid, course measures, activity space/equipment inventory, calculator.",
          safety: "Include readiness, environment, equipment, stop, referral, and emergency considerations appropriate to the setting.",
          variables: ["Primary outcome and baseline", "FITT-VP dose", "Weekly quality and response evidence", "Progression/regression rule"],
          steps: ["Write a measurable learner-centered outcome and baseline measure.", "Complete the movement, physiological, and environmental demand analysis.", "Plan two or three weekly exposures using FITT-VP plus rest and quality criteria.", "Build a hard/easy or high/low structure that protects the priority task.", "Add an inclusive equivalent for at least two learner constraints.", "Specify weekly evidence and the threshold for progress, maintain, regress, or refer.", "Audit every activity for alignment with the outcome.", "Run one hypothetical poor-response case through the revision rule."],
          data: ["Outcome and baseline", "Four-week FITT-VP grid", "Quality and response measures", "Progression/regression thresholds", "Inclusion and safety plan"],
          calculations: ["Weekly volume or quality repetitions", "Work:rest density", "Percent change from baseline when appropriate"],
          analysis: ["Which variable progresses and why?", "Where is recovery protected?", "Which activity does not directly support the outcome and should be removed?", "How does evidence change week 3 or 4?"],
          evidence: "Submit the four-week grid, demand analysis, dose calculations, two inclusion adaptations, complete safety plan, and one evidence-triggered revision scenario.",
          quality: ["Outcome, practice, and assessment align", "Progression changes are evidence-based", "Recovery and quality criteria are explicit", "Inclusion preserves a meaningful shared goal"], minChars: 320
        }),
        lab({
          title: "Unknown-movement capstone defense", minutes: 30,
          primer: "This is the transfer task: apply the full reasoning chain to a movement that was not used in the worked examples.",
          question: "Can the student produce and defend an evidence-based teaching decision under a new constraint?",
          materials: "Instructor- or peer-selected unfamiliar movement clip/case, analysis template, timer.",
          safety: "Analyze provided movement; do not reproduce a risky or painful task. Keep health information private and respect referral boundaries.",
          variables: ["Observation and goal", "Four-lens mechanism", "Chosen intervention", "Verification evidence and limitation"],
          steps: ["Write five neutral observations and define the task goal.", "Identify one relevant anatomical action, biomechanical mechanism, physiological demand, and motor-learning consideration.", "Select the highest-priority constraint and one intervention.", "Predict exactly what evidence should change on the next attempt.", "Identify one plausible alternative explanation.", "Give a two-minute defense and revise once after a challenge question."],
          data: ["Neutral observations", "Four-lens evidence chain", "Intervention and prediction", "Alternative explanation", "Revision after challenge"],
          calculations: ["Use at least one relevant course calculation or operational score when the case permits"],
          analysis: ["Why is this intervention preferable to two alternatives?", "What evidence would cause you to abandon it?", "Where is the safety or referral boundary?"],
          evidence: "Submit the complete evidence chain and the revised defense after challenge. Include at least one measurable verification criterion and one limitation.",
          quality: ["Observations precede inference", "Mechanisms are causally connected", "Intervention is the smallest effective change", "Verification could disconfirm the explanation"], minChars: 300
        })
      ],
      gate: [
        q("Which sequence best represents evidence-based programming?", ["Activity → harder activity → final grade", "Goal → baseline → aligned dose → evidence → revision", "Pretest → identical plan → posttest", "Equipment → exercise list → motivation"], 1, "Programming begins with a goal and uses evidence to revise an aligned dose."),
        q("A class meets the skill goal but RPE is consistently above the intended zone. What is the best response?", ["Ignore physiology", "Adjust dose while preserving the skill goal", "Lower the grade", "Remove assessment"], 1, "The task can be modified so the physiological dose matches the intended outcome."),
        q("Which is the strongest progression rule?", ["Add 10% every week", "Progress when quality and response criteria are met across repeated sessions", "Progress when peers do", "Progress after soreness"], 1, "Progression should follow repeatable evidence rather than an automatic percentage."),
        q("What makes an inclusion adaptation equivalent rather than easier in a meaningless way?", ["It removes the common goal", "It preserves the important learning or performance demand", "It uses different equipment only", "It prevents assessment"], 1, "An equivalent adaptation preserves the construct or task goal while changing access demands."),
        q("What should happen when verification evidence contradicts the predicted result?", ["Keep the explanation", "Revise the mechanism or intervention", "Blame compliance", "Stop measuring"], 1, "A testable plan is a hypothesis that must change when evidence disconfirms it.")
      ]
    }
  };

  DATA.learningDesign = {
    principles: [
      "Short, learner-controlled segments reduce unnecessary cognitive load.",
      "Every lesson moves from explicit explanation to a worked example, retrieval check, and self-explanation.",
      "Labs manipulate one variable, collect evidence, calculate a result, and require a teaching decision.",
      "Mastery gates use corrective feedback and a completely different five-question form after an unsuccessful attempt.",
      "Suggested sessions distribute learning over time rather than encouraging one long sitting."
    ],
    sources: [
      { label: "Dunlosky et al. (2013) · practice testing and distributed practice", url: "https://pubmed.ncbi.nlm.nih.gov/26173288/" },
      { label: "Roediger & Karpicke (2006) · retrieval improves delayed retention", url: "https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x" },
      { label: "Renkl et al. (1998) · worked examples and self-explanation", url: "https://pubmed.ncbi.nlm.nih.gov/9514690/" },
      { label: "Kulik et al. (1990) · mastery learning meta-analysis", url: "https://www.ic.unicamp.br/~wainer/cursos/2s2004/impactos2004/kulik90.pdf" }
    ]
  };

  DATA.modules.forEach((module) => {
    const extension = learning[module.id];
    module.learning = extension;
    module.lessons = module.lessons.map((base, index) => Object.assign({}, base, extension.lessons[index]));
    module.labs = extension.labs;

    const baseQuestions = [
      ...DATA.pretest.filter((item) => item.m === module.id),
      ...(DATA.gateExtra[module.id] || [])
    ].map((item, index) => ({ q: item.q, o: item.o, a: item.a, x: item.x, lesson: Math.min(index < 3 ? Math.floor(index / 2) : module.lessons.length - 1, module.lessons.length - 1) }));
    const newQuestions = extension.gate.map((item, index) => Object.assign({ lesson: index % module.lessons.length }, item));
    module.gateBank = [...newQuestions, ...baseQuestions].map((item, index) => Object.assign({ id: `${module.id}-${index + 1}` }, item));
  });
})();
