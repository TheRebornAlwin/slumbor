import fs from "node:fs/promises";

/* ----------------------------------------------------------------------------
   SLUMBOR — 14-Night Sleep Reset workbook builder
   Emits workbook.html (24 pages, US Letter). Rendered to PDF via Chrome.
   Rhythm rule: every source line keeps its own line; blank lines become the
   gap between blocks. Multi-line thoughts (no blank between) stay one block.
---------------------------------------------------------------------------- */

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// block renderer ------------------------------------------------------------
// block forms:
//   "line"                -> single line
//   ["l1","l2"]           -> tight group (one thought across lines)
//   {m:"one."}            -> amber marker line
//   {sig:"— Slumbor"}     -> signature
function block(b) {
  if (typeof b === "string") return `<p class="b">${esc(b)}</p>`;
  if (Array.isArray(b))
    return `<p class="b">${b.map(esc).join("<br>")}</p>`;
  if (b.m) return `<p class="b mk">${esc(b.m)}</p>`;
  if (b.sig) return `<p class="b sig">${esc(b.sig)}</p>`;
  return "";
}
const prose = (blocks) => blocks.map(block).join("\n");

// fillable rule lines
const rules = (n, cls = "") =>
  Array.from({ length: n }, () => `<div class="rule ${cls}"></div>`).join("");

// checkbox option
const opt = (label) =>
  `<span class="opt"><i class="ring"></i><span>${esc(label)}</span></span>`;
// numbered circle option
const num = (n) => `<span class="num"><i class="ring"></i>${n}</span>`;

// ---------------------------------------------------------------------------
// PAGES
// ---------------------------------------------------------------------------
const pages = [];

// P1 — COVER (dark) ---------------------------------------------------------
pages.push(`
<section class="page dark cover">
  <div class="pad center">
    <div class="wordmark">SLUMBOR</div>
    <div class="cover-mid">
      <div class="hair"></div>
      <h1 class="cover-title">the fourteen-<br>night reset</h1>
      <div class="hair"></div>
    </div>
    <p class="cover-sub">a quiet workbook<br>for the people who haven't slept right<br>in a while</p>
  </div>
</section>`);

// P2 — OPENING LETTER (light, dense) ---------------------------------------
pages.push(`
<section class="page light dense">
  <div class="pad">
    <p class="lead">Hey.</p>
    <div class="prose">
${prose([
  "if you're reading this you probably already know what it's like.",
  "the 2am ceiling stare.",
  "the alarm going off when you finally just fell asleep.",
  ["the way your whole day ends up sitting on your shoulders", "by the time you get into bed."],
  "maybe you've been like this for months.",
  "maybe years.",
  ["maybe you can't even remember the last time you woke up", "feeling like an actual person."],
  "we're not going to tell you this workbook fixes that.",
  ["nobody knows what fixes anything for sure,", "and anyone who tells you they have the answer is selling you something."],
  "what we will say is the next 14 nights matter.",
  "not because 14 is a magic number.",
  ["because that's roughly how long it takes for a real pattern to show up,", "and the sleep researchers who study this stuff for a living —", "the ones with actual data behind them —", "keep coming back to the same finding."],
  ["tracking your sleep is one of the few things", "that consistently helps people see what's really happening night to night."],
  "so we built this.",
  "one page a night for two weeks.",
  "a few prompts. some space to think.",
  "not enough that it feels like another thing on your to-do list.",
  ["just enough that when you flip back at the end you'll see patterns", "you couldn't see while you were in them."],
  "if it works for you, we'd love to know.",
  ["if it doesn't, we have a refund policy for a reason —", "and we mean it."],
  "either way.",
  "give it the full 14.",
  { sig: "— Slumbor" },
])}
    </div>
  </div>
</section>`);

// P3 — HOW THIS WORKS (light, dense) ---------------------------------------
pages.push(`
<section class="page light dense">
  <div class="pad">
    <p class="eyebrow">how this works</p>
    <h2 class="h2">the deal</h2>
    <div class="prose">
${prose([
  "for the next 14 nights, here's what you're doing.",
  { m: "one." },
  "put the mask on for 15 to 20 minutes before sleep.",
  "pick whatever heat level feels right that night.",
  "pick whatever pulse mode feels right.",
  "there's no “correct” setting.",
  "some nights you'll want warmer. some nights softer.",
  "your body knows. just listen.",
  { m: "two." },
  "in the morning, fill in that night's page.",
  "should take you about two minutes.",
  "less if you're rushed.",
  "don't overthink anything you write — nobody's grading this.",
  "you can write three words if three words is all you have.",
  { m: "three." },
  "just pay attention to what's happening.",
  "this is the part most sleep guides skip completely.",
  "they tell you to fix your sleep hygiene and download an app.",
  "they don't tell you that paying attention is itself half the work.",
  ["because most of us run through our nights on autopilot", "and have no idea what our sleep actually looks like from one week to the next."],
  "one thing worth knowing now, so you don't quit early.",
  "most people don't notice changes in the first 3 or 4 nights.",
  "your nervous system has been wired for a while.",
  "habits don't break in three days, no matter what the wellness people on instagram say.",
  "by nights 5 to 7, most people start sleeping a little deeper.",
  ["by nights 10 to 14, most people start waking up feeling more like themselves again.", "the way they did before whatever started happening, started happening."],
  "so if night 3 comes and you're thinking “this isn't working” — keep going anyway.",
  "give it the full two weeks. that's where the actual change tends to live.",
  "if you've done all 14 nights and nothing has shifted, flip to the page near the end. we've got something specific to say to you.",
])}
    </div>
  </div>
</section>`);

// P4 — THE WIND-DOWN (light, dense) ----------------------------------------
pages.push(`
<section class="page light dense">
  <div class="pad">
    <p class="eyebrow">the wind-down</p>
    <h2 class="h2">before you put the mask on</h2>
    <div class="prose">
${prose([
  "here's something nobody tells you about sleep masks.",
  "they work way better when your body has already started moving toward sleep on its own.",
  ["you can't go from doom-scrolling at 11:47 to mask-on-pillow at 11:48", "and expect your brain to flip a switch."],
  "your brain doesn't have a switch. it has a slope.",
  "you have to actually walk down it.",
  "so here are four things that help. pick what fits your actual life, not the life you wish you had.",
  { m: "one." },
  "dim the lights about an hour before bed.",
  "bright overhead lights tell your brain it's still daytime.",
  "lamp light is closer to sunset, and your body has been wired since the cave era to respond to dimming light by getting sleepy.",
  { m: "two." },
  "put your phone somewhere you can't reach without standing up.",
  "not the nightstand. somewhere genuinely annoying. the bathroom counter. a chair across the room.",
  "the friction is the point. this is the one from the actual sleep research that everyone hates.",
  "nobody wants to do it. do it anyway. it works.",
  { m: "three." },
  "pick a heat level you actually like. the five settings are different on purpose.",
  "some nights you'll want level 1, a hint of warmth on a face that's already pretty calm.",
  ["some nights you'll want level 5, the deep heat for when your forehead has been tight since 3pm", "and your eyes feel like they're full of sand."],
  "test them over the 14 nights. notice what your body wants on which kind of day.",
  { m: "four." },
  "set it for 15 minutes and let your eyes close.",
  "the auto-shutoff means you don't have to think about it. you put it on. you lie back. you let the night actually start.",
  "that's the practice. that's all of it.",
])}
    </div>
  </div>
</section>`);

// P5 — A LITTLE SCIENCE (light, dense) -------------------------------------
pages.push(`
<section class="page light dense">
  <div class="pad">
    <p class="eyebrow">a little science</p>
    <h2 class="h2">the part you might find interesting</h2>
    <div class="prose">
${prose([
  "we're not going to give you a whole biology lecture. but a few things are worth knowing for what you're about to do.",
  "your face holds an enormous amount of tension. especially around the eyes and forehead, especially if you spend any time looking at screens.",
  "warm compresses on the face have been used in traditional medicine for actual centuries. way before anyone was selling them online. because they work.",
  ["the warmth tells your nervous system it's safe to let some tension go.", "your face doesn't know the difference between a hot washcloth your grandmother put on you and a heated mask you ordered online."],
  "the soft pulse around your eyes mimics rhythm, and your body recognizes rhythm as a cue to settle.",
  "that's why weighted blankets work. why babies fall asleep in cars. why the sound of rain knocks you out within ten minutes.",
  "rhythm is regulation. you don't have to know the mechanism. you just have to let it happen.",
  ["the tracking part — this workbook itself — is also research-backed.", "sleep diaries are one of the central tools in CBT-I: cognitive behavioral therapy for insomnia."],
  ["CBT-I is the gold-standard treatment recommended by every major sleep medicine organization on earth,", "including the American Academy of Sleep Medicine. this isn't a brand gimmick. tracking your sleep is what the actual experts do."],
  "one more thing, because we think you need to hear it.",
  "you are not broken. people who don't sleep well are not broken.",
  ["you're running on a nervous system that's been on alert for too long,", "and somewhere along the way it forgot how to come down from that.", "the next 14 nights are about reminding it that it can."],
])}
    </div>
  </div>
</section>`);

// P6 — BEFORE NIGHT ONE (light, fillable) ----------------------------------
pages.push(`
<section class="page light">
  <div class="pad">
    <p class="eyebrow">before night one</p>
    <h2 class="h2">two questions before we start</h2>

    <div class="qblock">
      <p class="q">what made you finally decide to try this?</p>
      <p class="qsub">not the polished version you'd tell your boss or your in-laws. the actual reason. write it the way you'd text a friend who already knows you.</p>
      ${rules(3)}
    </div>

    <div class="qblock">
      <p class="q">what does &ldquo;sleeping better&rdquo; actually look like for you?</p>
      <p class="qsub">not the magazine version. the specific everyday version. waking before your alarm. not needing two coffees to feel human. getting through 3pm without that wall. handling your kid spilling juice without snapping. whatever the actual thing is for you.</p>
      ${rules(3)}
    </div>

    <p class="footnote">we'll come back to these on night 14. so just write whatever's true right now, even if it sounds small or unrealistic on paper.</p>
  </div>
</section>`);

// P7–P20 — THE 14 NIGHTLY PAGES (light, fillable) --------------------------
const pad2 = (n) => String(n).padStart(2, "0");
for (let n = 1; n <= 14; n++) {
  pages.push(`
<section class="page light night">
  <div class="pad">
    <div class="night-head">
      <h2 class="night-title">Night <span class="night-no">${pad2(n)}</span></h2>
      <div class="dateline">Date <span class="dl">&nbsp;</span> / <span class="dl">&nbsp;</span> / <span class="dl">&nbsp;</span></div>
    </div>
    <div class="hair soft"></div>

    <div class="field">
      <p class="flabel">before bed tonight i felt</p>
      <div class="opts two">
        ${opt("wired but trying")}
        ${opt("tired but my head wouldn't stop")}
        ${opt("pretty calm")}
        ${opt("wrecked")}
      </div>
    </div>

    <div class="field">
      <p class="flabel">what i used</p>
      <div class="usedrow">
        <span class="uslabel">heat level</span>
        <span class="nums">${num(1)}${num(2)}${num(3)}${num(4)}${num(5)}</span>
      </div>
      <div class="usedrow">
        <span class="uslabel">pulse mode</span>
        <span class="nums">${num(1)}${num(2)}${num(3)}${num(4)}${num(5)}${num(6)}</span>
      </div>
    </div>

    <div class="field row2">
      <div class="col">
        <p class="flabel">how long i wore it</p>
        <div class="opts col-opts">
          ${opt("less than 10 min")}
          ${opt("15 min")}
          ${opt("longer")}
        </div>
      </div>
      <div class="col">
        <p class="flabel">roughly when i fell asleep</p>
        <div class="timeline"><span class="dl wide">&nbsp;</span> : <span class="dl wide">&nbsp;</span> <span class="ampm">pm / am</span></div>
        <p class="flabel mt">did i wake during the night</p>
        <div class="opts two tight-opts">
          ${opt("slept through")}
          ${opt("woke once")}
          ${opt("woke a couple times")}
          ${opt("kept waking up")}
        </div>
      </div>
    </div>

    <div class="field">
      <p class="flabel">this morning i woke up feeling</p>
      <div class="opts two">
        ${opt("heavy. just heavy.")}
        ${opt("slow but okay")}
        ${opt("rested")}
        ${opt("actually decent")}
      </div>
    </div>

    <div class="field">
      <p class="flabel">one line about tonight or this morning <span class="muted">— anything. you're not graded.</span></p>
      ${rules(3)}
    </div>
  </div>
</section>`);
}

// P21 — HALFWAY (light, fillable) ------------------------------------------
pages.push(`
<section class="page light halfway">
  <div class="pad">
    <p class="eyebrow">halfway</p>
    <h2 class="h2">night seven. you're halfway through.</h2>
    <p class="qsub wide">look back at the last seven pages. actually look. there's stuff there you couldn't see when you were writing it, but you can see it now.</p>

    <div class="qblock sm">
      <p class="q">what's different now compared to a week ago?</p>
      <p class="qsub">even something small. even something you're not sure counts.</p>
      ${rules(2)}
    </div>
    <div class="qblock sm">
      <p class="q">what's <em>not</em> different? what's still the same?</p>
      <p class="qsub">this is just as important as the first question.</p>
      ${rules(2)}
    </div>
    <div class="qblock sm">
      <p class="q">what heat level and pulse mode have been working best?</p>
      ${rules(1)}
    </div>

    <p class="footnote">if you've found a combination that's working, don't keep changing it just to see what else is there. consistency is what moves the needle from here, not novelty. and if nothing has shifted yet, that's still normal &mdash; about a third of people in CBT-I programs don't see real change until well into the second week. the second week is where most of the real settling happens. don't quit on night seven.</p>
  </div>
</section>`);

// P22 — NIGHT 14 (light, fillable) -----------------------------------------
pages.push(`
<section class="page light">
  <div class="pad">
    <p class="eyebrow">night fourteen</p>
    <h2 class="h2">you made it.</h2>
    <p class="qsub wide">flip back to <strong>page 6</strong> and read what you wrote before any of this started. don't read it like someone else's words. read it like your own.</p>

    <div class="field">
      <p class="q">did any of it actually happen?</p>
      <div class="opts two">
        ${opt("most of it")}
        ${opt("some of it")}
        ${opt("a little")}
        ${opt("not really")}
      </div>
      <div class="opts"><span class="opt"><i class="ring"></i><span>nothing changed</span></span></div>
    </div>

    <div class="qblock sm">
      <p class="q">the biggest difference between night 1 and night 14?</p>
      <p class="qsub">even if you're not sure it's the mask. just write what's different.</p>
      ${rules(2)}
    </div>
    <div class="qblock sm">
      <p class="q">what surprised you about this process?</p>
      ${rules(2)}
    </div>
    <div class="qblock sm">
      <p class="q">if a friend asked whether this was worth seventy bucks, what would you honestly tell them?</p>
      ${rules(2)}
    </div>

    <p class="footnote">if your sleep is better now, even a little &mdash; that counts as real. don't let your brain talk you out of it just because it's not perfect yet. better is the whole game. better compounds. give it another month and see where you land. if your sleep is honestly not better, turn the page. we have something specific to say to you.</p>
  </div>
</section>`);

// P23 — IF THIS DIDN'T WORK (light, dense) ---------------------------------
pages.push(`
<section class="page light dense">
  <div class="pad">
    <p class="eyebrow">if this didn't work for you</p>
    <h2 class="h2">we're genuinely sorry.</h2>
    <div class="prose">
${prose([
  "we built this thing because it worked for us, and for the people around us, and we believed it would probably work for you too.",
  "but bodies are different. sleep is personal. sometimes a thing that helps one person doesn't help another, even when both have the same problem on paper.",
  "if you've done the full 14 nights and you're still where you started, here's what we want you to do.",
  { m: "one." },
  "send us an email. hello@slumbor.com.",
  "tell us what happened. what you tried, what didn't work, what you noticed or didn't. we read every email. a real person responds, usually within a day.",
  "we're not going to argue with you, or try to talk you out of feeling the way you feel.",
  { m: "two." },
  "ask for a refund. you have 180 days from the day the mask arrived. no restocking fee. no questions about what you did wrong.",
  "because you didn't do anything wrong. send it back, we send your money back. that's the deal.",
  { m: "three." },
  "keep this workbook either way. it's yours.",
  ["if you want to try the framework with a different approach later — real CBT-I therapy, melatonin under a doctor's guidance, rebuilding your sleep hygiene from scratch —", "the structure still works. don't throw it away."],
  { m: "four." },
  "and this one matters. if your sleep has been bad for months and you haven't talked to a doctor, please do.",
  "chronic insomnia is genuinely treatable. there are real medical pathways that go well beyond what a sleep mask can offer.",
  ["the American Academy of Sleep Medicine specifically recommends seeing a sleep specialist", "if insomnia has been going on for three months or longer."],
  "you deserve real help. and you don't have to figure this out alone.",
  ["we would honestly rather give your money back and have you actually sleeping eventually", "than keep your money and have you still stuck."],
  "take care of yourself.",
  { sig: "— Slumbor" },
])}
    </div>
  </div>
</section>`);

// P24 — BACK COVER (dark) --------------------------------------------------
pages.push(`
<section class="page dark cover">
  <div class="pad center">
    <div class="cover-mid">
      <div class="hair"></div>
      <p class="back-line">sleep deeper.<br>wake slower.<br>come back to yourself.</p>
      <div class="hair"></div>
    </div>
    <div class="back-foot">
      <div class="wordmark sm">SLUMBOR</div>
      <p class="back-meta">slumbor.com &nbsp;·&nbsp; hello@slumbor.com</p>
      <p class="back-copy">© Slumbor 2026</p>
    </div>
  </div>
</section>`);

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------
const css = `
@page { size: 8.5in 11in; margin: 0; }
:root{
  --midnight:#0E1626;
  --cream:#F2EDE4;
  --amber:#D4A574;
  --ink:#2A2620;
  --ink-soft:#6B6155;
  --rule:#C9BBA6;
}
*{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
html,body{ margin:0; padding:0; }
body{ font-family:'Inter',sans-serif; color:var(--ink); }

.page{
  position:relative; width:8.5in; height:11in; overflow:hidden;
  page-break-after:always; break-after:page;
}
.page:last-child{ page-break-after:auto; }
.light{ background:var(--cream); color:var(--ink); }
.dark{ background:var(--midnight); color:var(--cream); }
.pad{ padding:0.92in 0.95in 0.8in; height:100%; }
.center{ display:flex; flex-direction:column; align-items:center; justify-content:space-between; text-align:center; }

/* shared type */
.eyebrow{
  font-size:8.5pt; letter-spacing:0.32em; text-transform:uppercase;
  color:var(--amber); font-weight:600; margin:0 0 0.12in;
}
.h2{
  font-family:'Fraunces',serif; font-weight:400; color:var(--midnight);
  font-size:23pt; line-height:1.12; letter-spacing:-0.01em; margin:0 0 0.26in;
}
.dense .h2{ font-size:21pt; margin-bottom:0.2in; }
.lead{
  font-family:'Fraunces',serif; font-size:22pt; color:var(--midnight);
  margin:0 0 0.18in; font-weight:400;
}

/* prose rhythm */
.prose{ font-size:11.5pt; line-height:1.62; color:var(--ink); }
.dense .prose{ font-size:10pt; line-height:1.5; }
.prose .b{ margin:0 0 0.155in; }
.dense .prose .b{ margin:0 0 0.108in; }
.prose .mk{
  font-family:'Fraunces',serif; color:var(--amber); font-weight:500;
  font-size:13pt; margin-top:0.05in; margin-bottom:0.05in; letter-spacing:0.01em;
}
.prose .sig{
  font-family:'Fraunces',serif; font-style:italic; color:var(--midnight);
  font-size:13pt; margin-top:0.16in;
}

/* cover */
.cover .pad{ padding:1.05in 0.9in 0.95in; }
.wordmark{
  font-size:11pt; letter-spacing:0.5em; font-weight:600; color:var(--amber);
  text-indent:0.5em;
}
.wordmark.sm{ font-size:10pt; }
.cover-mid{ display:flex; flex-direction:column; align-items:center; gap:0.34in; width:100%; }
.cover-title{
  font-family:'Fraunces',serif; font-weight:300; color:var(--cream);
  font-size:46pt; line-height:1.04; letter-spacing:-0.015em; margin:0;
}
.cover-sub{
  font-family:'Fraunces',serif; font-style:italic; font-weight:300;
  color:var(--cream); opacity:0.82; font-size:13.5pt; line-height:1.7; margin:0;
}
.hair{ width:1.1in; height:1px; background:var(--amber); opacity:0.8; }
.hair.soft{ width:100%; background:var(--rule); opacity:0.55; margin:0.05in 0 0.2in; }

/* back cover */
.back-line{
  font-family:'Fraunces',serif; font-weight:300; color:var(--cream);
  font-size:26pt; line-height:1.45; margin:0;
}
.back-foot{ display:flex; flex-direction:column; align-items:center; gap:0.12in; }
.back-meta{ font-size:9.5pt; letter-spacing:0.06em; color:var(--cream); opacity:0.72; margin:0; }
.back-copy{ font-size:8.5pt; letter-spacing:0.1em; color:var(--cream); opacity:0.45; margin:0; }

/* questions / fillable */
.qblock{ margin:0 0 0.3in; }
.qblock.sm{ margin:0.06in 0 0.22in; }
.q{
  font-family:'Fraunces',serif; font-size:14pt; color:var(--midnight);
  font-weight:500; margin:0 0 0.07in; line-height:1.3;
}
.qsub{ font-size:9.5pt; line-height:1.55; color:var(--ink-soft); margin:0 0 0.16in; max-width:6.1in; }
.qsub.wide{ max-width:6.4in; margin-bottom:0.22in; }
.footnote{
  font-size:9pt; line-height:1.6; color:var(--ink-soft); margin:0.26in 0 0;
  max-width:6.3in; font-style:italic;
}
.rule{ border-bottom:1.2px solid var(--rule); height:0.36in; }
.rule:last-child{ height:0.34in; }

/* nightly form */
.night .pad{ padding:0.78in 0.95in 0.7in; }
.night-head{ display:flex; align-items:baseline; justify-content:space-between; }
.night-title{ font-family:'Fraunces',serif; font-weight:400; font-size:25pt; color:var(--midnight); margin:0; }
.night-no{ color:var(--amber); }
.dateline{ font-size:10pt; color:var(--ink-soft); letter-spacing:0.04em; }
.dl{ display:inline-block; min-width:0.4in; border-bottom:1.2px solid var(--rule); }
.dl.wide{ min-width:0.55in; }

.field{ margin:0.2in 0 0.14in; }
.flabel{ font-size:9.5pt; letter-spacing:0.13em; text-transform:uppercase; color:var(--amber); font-weight:600; margin:0 0 0.1in; }
.flabel.mt{ margin-top:0.16in; }
.flabel .muted{ text-transform:none; letter-spacing:0; color:var(--ink-soft); font-weight:400; font-style:italic; }

.opts{ display:flex; flex-wrap:wrap; gap:0.1in 0.34in; }
.opts.two .opt{ width:46%; }
.opts.col-opts{ flex-direction:column; gap:0.12in; }
.opts.tight-opts .opt{ width:46%; }
.opt{ display:inline-flex; align-items:center; gap:0.1in; font-size:10.5pt; color:var(--ink); }
.ring{
  display:inline-block; width:13px; height:13px; border:1.4px solid var(--amber);
  border-radius:50%; flex:0 0 auto;
}
.usedrow{ display:flex; align-items:center; gap:0.2in; margin:0 0 0.1in; }
.uslabel{ font-size:10pt; color:var(--ink); width:1.1in; }
.nums{ display:inline-flex; gap:0.16in; }
.num{ display:inline-flex; align-items:center; gap:0.06in; font-size:10pt; color:var(--ink); }
.num .ring{ width:12px; height:12px; }

.row2{ display:flex; gap:0.5in; }
.row2 .col{ flex:1; }
.timeline{ font-size:12pt; color:var(--ink); display:flex; align-items:center; gap:0.08in; }
.ampm{ font-size:9pt; color:var(--ink-soft); margin-left:0.06in; }
`;

// ---------------------------------------------------------------------------
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="fonts.css">
<style>${css}</style>
</head>
<body>
${pages.join("\n")}
<script>
(function(){
  var m = location.hash.match(/only=(\\d+)/);
  if(!m) return;
  var i = +m[1]-1, ps = document.querySelectorAll('.page');
  ps.forEach(function(p,idx){ if(idx!==i) p.style.display='none'; });
})();
</script>
</body>
</html>`;

await fs.writeFile("workbook/workbook.html", html);
console.log("wrote workbook/workbook.html with", pages.length, "pages");
