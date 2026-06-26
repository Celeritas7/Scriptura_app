// Scriptura — Burmese study data.
// The 33 consonants in their traditional order, grouped into the six teaching
// units used in Burmese schools (five vargas by place of articulation + a
// "miscellaneous" group). Each carries:
//   char    — the letter
//   roman   — its sound
//   name    — its AUTHENTIC Burmese letter-name (what learners actually recite)
//   gloss   — a plain-English reading of that name (the built-in mnemonic)
//   cognate — the Devanagari cognate (kept from the source app, as a cross-ref)
// `srs` (review queue) and `mastery` (heatmap) are illustrative sample state.

window.ScripturaData = {
  language: { id: 'burmese', name: 'Burmese', native: 'မြန်မာ', font: 'var(--font-burmese)' },

  units: [
    {
      id: 'ka', title: 'Ka group', subtitle: 'Velar · ကဝဂ်', accent: 'practice',
      chars: [
        { char: 'က', roman: 'ka',  name: 'ကကြီး',  gloss: 'big ka',        cognate: 'क', mastery: 'strong', srs: 'learned' },
        { char: 'ခ', roman: 'kha', name: 'ခကွေး',  gloss: 'curved kha',    cognate: 'ख', mastery: 'strong', srs: 'learned' },
        { char: 'ဂ', roman: 'ga',  name: 'ဂငယ်',   gloss: 'small ga',      cognate: 'ग', mastery: 'good',   srs: 'due' },
        { char: 'ဃ', roman: 'gha', name: 'ဃကြီး',  gloss: 'big ga',        cognate: 'घ', mastery: 'medium', srs: 'due' },
        { char: 'င', roman: 'nga', name: 'င',       gloss: 'nga',           cognate: 'ङ', mastery: 'good',   srs: 'learned' },
      ],
    },
    {
      id: 'sa', title: 'Sa group', subtitle: 'Palatal · စဝဂ်', accent: 'quiz',
      chars: [
        { char: 'စ', roman: 'sa',  name: 'စလုံး',     gloss: 'round sa',      cognate: 'च', mastery: 'strong', srs: 'learned' },
        { char: 'ဆ', roman: 'hsa', name: 'ဆလိမ်',     gloss: 'twisted hsa',   cognate: 'छ', mastery: 'weak',   srs: 'due' },
        { char: 'ဇ', roman: 'za',  name: 'ဇကွဲ',      gloss: 'split za',      cognate: 'ज', mastery: 'medium', srs: 'due' },
        { char: 'ဈ', roman: 'jha', name: 'ဈမျဉ်းဆွဲ',  gloss: 'lined za',      cognate: 'झ', mastery: 'very-weak', srs: 'due' },
        { char: 'ည', roman: 'nya', name: 'ညကြီး',     gloss: 'big nya',       cognate: 'ञ', mastery: 'good',   srs: 'due' },
      ],
    },
    {
      id: 'tta', title: 'Ta group', subtitle: 'Retroflex · ဋဝဂ်', accent: 'sheet',
      chars: [
        { char: 'ဋ', roman: 'ta',  name: 'ဋသန်လျင်းချိတ်', gloss: 'hooked ta',  cognate: 'ट', mastery: 'medium', srs: 'new' },
        { char: 'ဌ', roman: 'hta', name: 'ဌဝမ်းဘဲ',        gloss: 'duck-belly hta', cognate: 'ठ', mastery: 'not-attempted', srs: 'new' },
        { char: 'ဍ', roman: 'da',  name: 'ဍရင်ကောက်',     gloss: 'curved-chest da', cognate: 'ड', mastery: 'weak', srs: 'new' },
        { char: 'ဎ', roman: 'dha', name: 'ဎရေမှုတ်',       gloss: 'water-blown dha', cognate: 'ढ', mastery: 'not-attempted', srs: 'new' },
        { char: 'ဏ', roman: 'na',  name: 'ဏကြီး',         gloss: 'big na',     cognate: 'ण', mastery: 'good', srs: 'new' },
      ],
    },
    {
      id: 'ta', title: 'Ta group', subtitle: 'Dental · တဝဂ်', accent: 'review',
      chars: [
        { char: 'တ', roman: 'ta',  name: 'တဝမ်းပူ',    gloss: 'pot-belly ta', cognate: 'त', mastery: 'strong', srs: 'new' },
        { char: 'ထ', roman: 'hta', name: 'ထဆင်ထူး',   gloss: 'elephant-fetter hta', cognate: 'थ', mastery: 'medium', srs: 'new' },
        { char: 'ဒ', roman: 'da',  name: 'ဒထွေး',      gloss: 'forked da',    cognate: 'द', mastery: 'not-attempted', srs: 'new' },
        { char: 'ဓ', roman: 'dha', name: 'ဓအောက်ခြိုက်', gloss: 'dented-below dha', cognate: 'ध', mastery: 'new', srs: 'new' },
        { char: 'န', roman: 'na',  name: 'နငယ်',       gloss: 'small na',     cognate: 'न', mastery: 'good', srs: 'new' },
      ],
    },
    {
      id: 'pa', title: 'Pa group', subtitle: 'Labial · ပဝဂ်', accent: 'indic',
      chars: [
        { char: 'ပ', roman: 'pa',  name: 'ပစောက်',     gloss: 'deep pa',      cognate: 'प', mastery: 'medium', srs: 'new' },
        { char: 'ဖ', roman: 'pha', name: 'ဖဦးထုပ်',    gloss: 'capped pha',   cognate: 'फ', mastery: 'not-attempted', srs: 'new' },
        { char: 'ဗ', roman: 'ba',  name: 'ဗထက်ခြိုက်', gloss: 'dented-above ba', cognate: 'ब', mastery: 'not-attempted', srs: 'new' },
        { char: 'ဘ', roman: 'bha', name: 'ဘကုန်း',     gloss: 'humped bha',   cognate: 'भ', mastery: 'new', srs: 'new' },
        { char: 'မ', roman: 'ma',  name: 'မ',          gloss: 'ma',           cognate: 'म', mastery: 'good', srs: 'new' },
      ],
    },
    {
      id: 'misc', title: 'Miscellaneous', subtitle: 'အမျိုးမျိုး', accent: 'cjk',
      chars: [
        { char: 'ယ', roman: 'ya', name: 'ယပက်လက်', gloss: 'supine ya',   cognate: 'य', mastery: 'medium', srs: 'new' },
        { char: 'ရ', roman: 'ya', name: 'ရကောက်',  gloss: 'curved ya',   cognate: 'र', mastery: 'not-attempted', srs: 'new' },
        { char: 'လ', roman: 'la', name: 'လ',        gloss: 'la',          cognate: 'ल', mastery: 'good', srs: 'new' },
        { char: 'ဝ', roman: 'wa', name: 'ဝ',        gloss: 'wa',          cognate: 'व', mastery: 'medium', srs: 'new' },
        { char: 'သ', roman: 'tha', name: 'သ',       gloss: 'tha',         cognate: 'स', mastery: 'good', srs: 'new' },
        { char: 'ဟ', roman: 'ha', name: 'ဟ',        gloss: 'ha',          cognate: 'ह', mastery: 'not-attempted', srs: 'new' },
        { char: 'ဠ', roman: 'la', name: 'ဠကြီး',    gloss: 'big la',      cognate: 'ळ', mastery: 'new', srs: 'new' },
        { char: 'အ', roman: 'a',  name: 'အ',        gloss: 'a',           cognate: 'अ', mastery: 'good', srs: 'new' },
      ],
    },
  ],

  // Dependent vowel signs for the Word Builder (consonant + sign → syllable).
  vowels: [
    { sign: 'ာ', label: 'ā', name: 'a-shape' },
    { sign: 'ိ', label: 'i', name: 'lone dot above' },
    { sign: 'ီ', label: 'ī', name: 'two dots above' },
    { sign: 'ု', label: 'u', name: 'hook below' },
    { sign: 'ူ', label: 'ū', name: 'double hook below' },
    { sign: 'ေ', label: 'e', name: 'stroke before' },
    { sign: 'ဲ', label: 'ai', name: 'slant above' },
    { sign: 'ော', label: 'aw', name: 'stroke + a-shape' },
  ],

  // Gamification sample state.
  profile: {
    name: 'Learner',
    streak: 6,
    dailyGoalXp: 30,
    todayXp: 20,
    level: 4,
    levelXp: 180,
    levelMax: 250,
    xpPerCard: 5,
  },
};

// Flattened helpers.
window.ScripturaData.allChars = window.ScripturaData.units.flatMap((u) =>
  u.chars.map((c) => ({ ...c, unitId: u.id, unitTitle: u.title, accent: u.accent })));
window.ScripturaData.dueChars = window.ScripturaData.allChars.filter((c) => c.srs === 'due');
