// Scriptura — multi-script study data (static; no backend).
// Burmese is the deepest set (authentic letter-names + mnemonics + word builder).
// The other scripts use their real character inventories from the source app,
// grouped into teaching units. Each char carries at least { char, roman }.

(function () {
  const ACCENTS = ['practice', 'quiz', 'sheet', 'review', 'indic', 'cjk'];

  // Slice a flat char array into units per a plan; attach unit/char metadata.
  function makeUnits(flat, plan, font) {
    let i = 0;
    return plan.map((p, idx) => {
      const chars = flat.slice(i, i + p.count).map((c) => ({
        char: c.char, roman: c.roman, name: c.name || c.roman, gloss: c.gloss || '',
        cognate: c.cognate || '', font, mastery: 'new', srs: 'new',
      }));
      i += p.count;
      return { id: p.id || ('u' + idx), title: p.title, subtitle: p.subtitle || '',
        accent: p.accent || ACCENTS[idx % ACCENTS.length], font, chars };
    });
  }

  const f = (s) => `var(--font-${s})`;

  // ---- Indic shared plan (5 vargas + misc) ----
  const indicPlan = (miscCount) => ([
    { id: 'ka', title: 'Ka group', subtitle: 'Velar', accent: 'practice', count: 5 },
    { id: 'sa', title: 'Sa group', subtitle: 'Palatal', accent: 'quiz', count: 5 },
    { id: 'tta', title: 'Ta group', subtitle: 'Retroflex', accent: 'sheet', count: 5 },
    { id: 'ta', title: 'Ta group', subtitle: 'Dental', accent: 'review', count: 5 },
    { id: 'pa', title: 'Pa group', subtitle: 'Labial', accent: 'indic', count: 5 },
    { id: 'misc', title: 'Miscellaneous', subtitle: 'Semivowels & sibilants', accent: 'cjk', count: miscCount },
  ]);

  // ============================ BURMESE (rich) ============================
  const BUR = f('burmese');
  const burmeseUnits = [
    { id: 'ka', title: 'Ka group', subtitle: 'Velar · ကဝဂ်', accent: 'practice', font: BUR, chars: [
      { char: 'က', roman: 'ka',  name: 'ကကြီး',  gloss: 'big ka',     cognate: 'क', font: BUR, mastery: 'strong', srs: 'learned' },
      { char: 'ခ', roman: 'kha', name: 'ခကွေး',  gloss: 'curved kha', cognate: 'ख', font: BUR, mastery: 'strong', srs: 'learned' },
      { char: 'ဂ', roman: 'ga',  name: 'ဂငယ်',   gloss: 'small ga',   cognate: 'ग', font: BUR, mastery: 'good',   srs: 'due' },
      { char: 'ဃ', roman: 'gha', name: 'ဃကြီး',  gloss: 'big ga',     cognate: 'घ', font: BUR, mastery: 'medium', srs: 'due' },
      { char: 'င', roman: 'nga', name: 'င',       gloss: 'nga',        cognate: 'ङ', font: BUR, mastery: 'good',   srs: 'learned' },
    ]},
    { id: 'sa', title: 'Sa group', subtitle: 'Palatal · စဝဂ်', accent: 'quiz', font: BUR, chars: [
      { char: 'စ', roman: 'sa',  name: 'စလုံး',     gloss: 'round sa',    cognate: 'च', font: BUR, mastery: 'strong', srs: 'learned' },
      { char: 'ဆ', roman: 'hsa', name: 'ဆလိမ်',     gloss: 'twisted hsa', cognate: 'छ', font: BUR, mastery: 'weak',   srs: 'due' },
      { char: 'ဇ', roman: 'za',  name: 'ဇကွဲ',      gloss: 'split za',    cognate: 'ज', font: BUR, mastery: 'medium', srs: 'due' },
      { char: 'ဈ', roman: 'jha', name: 'ဈမျဉ်းဆွဲ',  gloss: 'lined za',    cognate: 'झ', font: BUR, mastery: 'very-weak', srs: 'due' },
      { char: 'ည', roman: 'nya', name: 'ညကြီး',     gloss: 'big nya',     cognate: 'ञ', font: BUR, mastery: 'good',   srs: 'due' },
    ]},
    { id: 'tta', title: 'Ta group', subtitle: 'Retroflex · ဋဝဂ်', accent: 'sheet', font: BUR, chars: [
      { char: 'ဋ', roman: 'ta',  name: 'ဋသန်လျင်းချိတ်', gloss: 'hooked ta', cognate: 'ट', font: BUR, mastery: 'medium', srs: 'new' },
      { char: 'ဌ', roman: 'hta', name: 'ဌဝမ်းဘဲ',        gloss: 'duck-belly hta', cognate: 'ठ', font: BUR, mastery: 'not-attempted', srs: 'new' },
      { char: 'ဍ', roman: 'da',  name: 'ဍရင်ကောက်',     gloss: 'curved-chest da', cognate: 'ड', font: BUR, mastery: 'weak', srs: 'new' },
      { char: 'ဎ', roman: 'dha', name: 'ဎရေမှုတ်',       gloss: 'water-blown dha', cognate: 'ढ', font: BUR, mastery: 'not-attempted', srs: 'new' },
      { char: 'ဏ', roman: 'na',  name: 'ဏကြီး',         gloss: 'big na',   cognate: 'ण', font: BUR, mastery: 'good', srs: 'new' },
    ]},
    { id: 'ta', title: 'Ta group', subtitle: 'Dental · တဝဂ်', accent: 'review', font: BUR, chars: [
      { char: 'တ', roman: 'ta',  name: 'တဝမ်းပူ',    gloss: 'pot-belly ta', cognate: 'त', font: BUR, mastery: 'strong', srs: 'new' },
      { char: 'ထ', roman: 'hta', name: 'ထဆင်ထူး',   gloss: 'elephant-fetter hta', cognate: 'थ', font: BUR, mastery: 'medium', srs: 'new' },
      { char: 'ဒ', roman: 'da',  name: 'ဒထွေး',      gloss: 'forked da',    cognate: 'द', font: BUR, mastery: 'not-attempted', srs: 'new' },
      { char: 'ဓ', roman: 'dha', name: 'ဓအောက်ခြိုက်', gloss: 'dented-below dha', cognate: 'ध', font: BUR, mastery: 'new', srs: 'new' },
      { char: 'န', roman: 'na',  name: 'နငယ်',       gloss: 'small na',     cognate: 'न', font: BUR, mastery: 'good', srs: 'new' },
    ]},
    { id: 'pa', title: 'Pa group', subtitle: 'Labial · ပဝဂ်', accent: 'indic', font: BUR, chars: [
      { char: 'ပ', roman: 'pa',  name: 'ပစောက်',     gloss: 'deep pa',    cognate: 'प', font: BUR, mastery: 'medium', srs: 'new' },
      { char: 'ဖ', roman: 'pha', name: 'ဖဦးထုပ်',    gloss: 'capped pha', cognate: 'फ', font: BUR, mastery: 'not-attempted', srs: 'new' },
      { char: 'ဗ', roman: 'ba',  name: 'ဗထက်ခြိုက်', gloss: 'dented-above ba', cognate: 'ब', font: BUR, mastery: 'not-attempted', srs: 'new' },
      { char: 'ဘ', roman: 'bha', name: 'ဘကုန်း',     gloss: 'humped bha', cognate: 'भ', font: BUR, mastery: 'new', srs: 'new' },
      { char: 'မ', roman: 'ma',  name: 'မ',          gloss: 'ma',         cognate: 'म', font: BUR, mastery: 'good', srs: 'new' },
    ]},
    { id: 'misc', title: 'Miscellaneous', subtitle: 'အမျိုးမျိုး', accent: 'cjk', font: BUR, chars: [
      { char: 'ယ', roman: 'ya', name: 'ယပက်လက်', gloss: 'supine ya', cognate: 'य', font: BUR, mastery: 'medium', srs: 'new' },
      { char: 'ရ', roman: 'ya', name: 'ရကောက်',  gloss: 'curved ya', cognate: 'र', font: BUR, mastery: 'not-attempted', srs: 'new' },
      { char: 'လ', roman: 'la', name: 'လ',        gloss: 'la',        cognate: 'ल', font: BUR, mastery: 'good', srs: 'new' },
      { char: 'ဝ', roman: 'wa', name: 'ဝ',        gloss: 'wa',        cognate: 'व', font: BUR, mastery: 'medium', srs: 'new' },
      { char: 'သ', roman: 'tha', name: 'သ',       gloss: 'tha',       cognate: 'स', font: BUR, mastery: 'good', srs: 'new' },
      { char: 'ဟ', roman: 'ha', name: 'ဟ',        gloss: 'ha',        cognate: 'ह', font: BUR, mastery: 'not-attempted', srs: 'new' },
      { char: 'ဠ', roman: 'la', name: 'ဠကြီး',    gloss: 'big la',    cognate: 'ळ', font: BUR, mastery: 'new', srs: 'new' },
      { char: 'အ', roman: 'a',  name: 'အ',        gloss: 'a',         cognate: 'अ', font: BUR, mastery: 'good', srs: 'new' },
    ]},
  ];
  const burmeseVowels = [
    { sign: 'ာ', label: 'ā' }, { sign: 'ိ', label: 'i' }, { sign: 'ီ', label: 'ī' },
    { sign: 'ု', label: 'u' }, { sign: 'ူ', label: 'ū' }, { sign: 'ေ', label: 'e' },
    { sign: 'ဲ', label: 'ai' }, { sign: 'ော', label: 'aw' },
  ];

  // ============================ HINDI ============================
  const hindiFlat = 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह'.split(' ')
    .map((ch, i) => ({ char: ch, roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha'.split(' ')[i] }));

  // ============================ TELUGU ============================
  const teluguFlat = 'క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ ఱ'.split(' ')
    .map((ch, i) => ({ char: ch, roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha ḷa ṟa'.split(' ')[i] }));

  // ============================ SINHALA ============================
  const sinhalaFlat = 'ක ඛ ග ඝ ඞ ච ඡ ජ ඣ ඤ ට ඨ ඩ ඪ ණ ත ථ ද ධ න ප ඵ බ භ ම ය ර ල ව ශ ෂ ස හ ළ ෆ'.split(' ')
    .map((ch, i) => ({ char: ch, roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha ḷa fa'.split(' ')[i] }));
  const sinhalaVowels = [
    { sign: 'ා', label: 'ā' }, { sign: 'ි', label: 'i' }, { sign: 'ී', label: 'ī' },
    { sign: 'ු', label: 'u' }, { sign: 'ූ', label: 'ū' }, { sign: 'ෙ', label: 'e' },
    { sign: 'ේ', label: 'ē' }, { sign: 'ො', label: 'o' },
  ];

  // ============================ HIRAGANA / KATAKANA ============================
  const hiraChars = 'あ い う え お か き く け こ さ し す せ そ た ち つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ ら り る れ ろ わ を ん'.split(' ');
  const kataChars = 'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン'.split(' ');
  const kanaRoman = 'a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to na ni nu ne no ha hi fu he ho ma mi mu me mo ya yu yo ra ri ru re ro wa wo n'.split(' ');
  const kanaPlan = (lead) => ([
    { id: 'vowels', title: 'Vowels', subtitle: lead[0], accent: 'practice', count: 5 },
    { id: 'k', title: 'K-row', subtitle: lead[1], accent: 'quiz', count: 5 },
    { id: 's', title: 'S-row', subtitle: lead[2], accent: 'sheet', count: 5 },
    { id: 't', title: 'T-row', subtitle: lead[3], accent: 'review', count: 5 },
    { id: 'n', title: 'N-row', subtitle: lead[4], accent: 'indic', count: 5 },
    { id: 'h', title: 'H-row', subtitle: lead[5], accent: 'cjk', count: 5 },
    { id: 'm', title: 'M-row', subtitle: lead[6], accent: 'practice', count: 5 },
    { id: 'y', title: 'Y-row', subtitle: lead[7], accent: 'quiz', count: 3 },
    { id: 'r', title: 'R-row', subtitle: lead[8], accent: 'sheet', count: 5 },
    { id: 'w', title: 'W-row & N', subtitle: lead[9], accent: 'review', count: 3 },
  ]);
  const hiraFlat = hiraChars.map((ch, i) => ({ char: ch, roman: kanaRoman[i] }));
  const kataFlat = kataChars.map((ch, i) => ({ char: ch, roman: kanaRoman[i] }));

  // ============================ KOREAN ============================
  const korChars = 'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ ㄲ ㄸ ㅃ ㅆ ㅉ'.split(' ');
  const korRoman = 'g/k n d/t r/l m b/p s ng j ch k t p h kk tt pp ss jj'.split(' ');
  const korFlat = korChars.map((ch, i) => ({ char: ch, roman: korRoman[i] }));
  const korPlan = [
    { id: 'basic1', title: 'Basic I', subtitle: 'ㄱ–ㅅ', accent: 'practice', count: 7 },
    { id: 'basic2', title: 'Basic II', subtitle: 'ㅇ–ㅎ', accent: 'quiz', count: 7 },
    { id: 'tense', title: 'Tense', subtitle: 'ㄲ–ㅉ', accent: 'sheet', count: 5 },
  ];

  // ============================ CHINESE ============================
  const zhRaw = [
    ['一', 'yī', 'one'], ['二', 'èr', 'two'], ['三', 'sān', 'three'], ['四', 'sì', 'four'], ['五', 'wǔ', 'five'],
    ['六', 'liù', 'six'], ['七', 'qī', 'seven'], ['八', 'bā', 'eight'], ['九', 'jiǔ', 'nine'], ['十', 'shí', 'ten'],
    ['大', 'dà', 'big'], ['小', 'xiǎo', 'small'], ['人', 'rén', 'person'], ['口', 'kǒu', 'mouth'], ['日', 'rì', 'sun'],
    ['月', 'yuè', 'moon'], ['山', 'shān', 'mountain'], ['水', 'shuǐ', 'water'], ['火', 'huǒ', 'fire'], ['木', 'mù', 'wood'],
  ];
  const zhFlat = zhRaw.map(([char, roman, gloss]) => ({ char, roman, gloss }));
  const zhPlan = [
    { id: 'numbers', title: 'Numbers', subtitle: '一 – 十', accent: 'practice', count: 10 },
    { id: 'nature', title: 'Nature & body', subtitle: '大 – 木', accent: 'indic', count: 10 },
  ];

  // ---- assemble languages ----
  function lang(id, name, native, scriptKey, group, units, vowels) {
    const allChars = units.flatMap((u) => u.chars.map((c) => ({ ...c, unitId: u.id, unitTitle: u.title, accent: u.accent })));
    return { id, name, native, group, font: f(scriptKey), units, vowels: vowels || null,
      allChars, dueChars: allChars.filter((c) => c.srs === 'due') };
  }

  const languages = {
    burmese: lang('burmese', 'Burmese', 'မြန်မာ', 'burmese', 'indic', burmeseUnits, burmeseVowels),
    hindi: lang('hindi', 'Hindi', 'हिन्दी', 'devanagari', 'indic', makeUnits(hindiFlat, indicPlan(8), f('devanagari'))),
    telugu: lang('telugu', 'Telugu', 'తెలుగు', 'telugu', 'indic', makeUnits(teluguFlat, indicPlan(10), f('telugu'))),
    sinhala: lang('sinhala', 'Sinhala', 'සිංහල', 'sinhala', 'indic', makeUnits(sinhalaFlat, indicPlan(10), f('sinhala')), sinhalaVowels),
    hiragana: lang('hiragana', 'Hiragana', 'ひらがな', 'japanese', 'cjk', makeUnits(hiraFlat, kanaPlan(['あ','か','さ','た','な','は','ま','や','ら','わ']), f('japanese'))),
    katakana: lang('katakana', 'Katakana', 'カタカナ', 'japanese', 'cjk', makeUnits(kataFlat, kanaPlan(['ア','カ','サ','タ','ナ','ハ','マ','ヤ','ラ','ワ']), f('japanese'))),
    korean: lang('korean', 'Korean', '한국어', 'korean', 'cjk', makeUnits(korFlat, korPlan, f('korean'))),
    chinese: lang('chinese', 'Chinese', '汉字', 'chinese', 'cjk', makeUnits(zhFlat, zhPlan, f('chinese'))),
  };

  // Per-language visual identity — signature color, native greeting, emblem,
  // and a watermark glyph. Gives each script a distinct dashboard & card look.
  const themes = {
    burmese:  { color: '#f59e0b', color2: '#d97706', greeting: 'မင်္ဂလာပါ',  hello: 'Mingalaba',  emblem: '🛕', motif: 'က', blurb: 'Abugida · 33 consonants' },
    hindi:    { color: '#ef4444', color2: '#b91c1c', greeting: 'नमस्ते',      hello: 'Namaste',    emblem: '🪔', motif: 'अ', blurb: 'Devanagari · 33 consonants' },
    telugu:   { color: '#22c55e', color2: '#15803d', greeting: 'నమస్కారం',   hello: 'Namaskaram', emblem: '🌾', motif: 'క', blurb: 'Abugida · 35 consonants' },
    sinhala:  { color: '#14b8a6', color2: '#0f766e', greeting: 'ආයුබෝවන්', hello: 'Āyubōwan',  emblem: '🦚', motif: 'ස', blurb: 'Abugida · 35 consonants' },    hiragana: { color: '#ec4899', color2: '#be185d', greeting: 'こんにちは',   hello: 'Konnichiwa', emblem: '🌸', motif: 'あ', blurb: 'Syllabary · 46 kana' },
    katakana: { color: '#6366f1', color2: '#4338ca', greeting: 'コンニチハ',   hello: 'Konnichiwa', emblem: '⛩️', motif: 'カ', blurb: 'Syllabary · 46 kana' },
    korean:   { color: '#3b82f6', color2: '#1d4ed8', greeting: '안녕하세요',   hello: 'Annyeong',   emblem: '☯',  motif: '한', blurb: 'Hangul · 19 consonants' },
    chinese:  { color: '#e11d48', color2: '#9f1239', greeting: '你好',         hello: 'Nǐ hǎo',     emblem: '🏮', motif: '汉', blurb: 'Logographic · starter set' },
  };

  window.ScripturaData = {
    languages,
    themes,
    languageList: [
      { id: 'burmese', name: 'Burmese', native: 'မြန်မာ', font: f('burmese'), group: 'Indic' },
      { id: 'hindi', name: 'Hindi', native: 'हिन्दी', font: f('devanagari'), group: 'Indic' },
      { id: 'telugu', name: 'Telugu', native: 'తెలుగు', font: f('telugu'), group: 'Indic' },
      { id: 'sinhala', name: 'Sinhala', native: 'සිංහල', font: f('sinhala'), group: 'Indic' },
      { id: 'hiragana', name: 'Hiragana', native: 'ひらがな', font: f('japanese'), group: 'CJK' },
      { id: 'katakana', name: 'Katakana', native: 'カタカナ', font: f('japanese'), group: 'CJK' },
      { id: 'korean', name: 'Korean', native: '한국어', font: f('korean'), group: 'CJK' },
      { id: 'chinese', name: 'Chinese', native: '汉字', font: f('chinese'), group: 'CJK' },
    ],
    defaultLang: 'burmese',
    // Seed prior progress for Burmese so the demo opens mid-journey.
    seed: { burmese: ['က','ခ','ဂ','ဃ','င','စ','ဇ','ည'] },
    profile: { name: 'Learner', streak: 6, dailyGoalXp: 30, todayXp: 20, level: 4, levelXp: 180, levelMax: 250, xpPerCard: 5 },
  };
})();
