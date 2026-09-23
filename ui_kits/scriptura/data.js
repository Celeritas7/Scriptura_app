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
        cognate: c.cognate || '', font,
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
      { char: 'က', roman: 'ka',  name: 'ကကြီး',  gloss: 'big ka',     cognate: 'क', font: BUR },
      { char: 'ခ', roman: 'kha', name: 'ခကွေး',  gloss: 'curved kha', cognate: 'ख', font: BUR },
      { char: 'ဂ', roman: 'ga',  name: 'ဂငယ်',   gloss: 'small ga',   cognate: 'ग', font: BUR, demoDue: true },
      { char: 'ဃ', roman: 'gha', name: 'ဃကြီး',  gloss: 'big ga',     cognate: 'घ', font: BUR, demoDue: true },
      { char: 'င', roman: 'nga', name: 'င',       gloss: 'nga',        cognate: 'ङ', font: BUR },
    ]},
    { id: 'sa', title: 'Sa group', subtitle: 'Palatal · စဝဂ်', accent: 'quiz', font: BUR, chars: [
      { char: 'စ', roman: 'sa',  name: 'စလုံး',     gloss: 'round sa',    cognate: 'च', font: BUR },
      { char: 'ဆ', roman: 'hsa', name: 'ဆလိမ်',     gloss: 'twisted hsa', cognate: 'छ', font: BUR, demoDue: true },
      { char: 'ဇ', roman: 'za',  name: 'ဇကွဲ',      gloss: 'split za',    cognate: 'ज', font: BUR, demoDue: true },
      { char: 'ဈ', roman: 'jha', name: 'ဈမျဉ်းဆွဲ',  gloss: 'lined za',    cognate: 'झ', font: BUR, demoDue: true },
      { char: 'ည', roman: 'nya', name: 'ညကြီး',     gloss: 'big nya',     cognate: 'ञ', font: BUR, demoDue: true },
    ]},
    { id: 'tta', title: 'Ta group', subtitle: 'Retroflex · ဋဝဂ်', accent: 'sheet', font: BUR, chars: [
      { char: 'ဋ', roman: 'ta',  name: 'ဋသန်လျင်းချိတ်', gloss: 'hooked ta', cognate: 'ट', font: BUR },
      { char: 'ဌ', roman: 'hta', name: 'ဌဝမ်းဘဲ',        gloss: 'duck-belly hta', cognate: 'ठ', font: BUR },
      { char: 'ဍ', roman: 'da',  name: 'ဍရင်ကောက်',     gloss: 'curved-chest da', cognate: 'ड', font: BUR },
      { char: 'ဎ', roman: 'dha', name: 'ဎရေမှုတ်',       gloss: 'water-blown dha', cognate: 'ढ', font: BUR },
      { char: 'ဏ', roman: 'na',  name: 'ဏကြီး',         gloss: 'big na',   cognate: 'ण', font: BUR },
    ]},
    { id: 'ta', title: 'Ta group', subtitle: 'Dental · တဝဂ်', accent: 'review', font: BUR, chars: [
      { char: 'တ', roman: 'ta',  name: 'တဝမ်းပူ',    gloss: 'pot-belly ta', cognate: 'त', font: BUR },
      { char: 'ထ', roman: 'hta', name: 'ထဆင်ထူး',   gloss: 'elephant-fetter hta', cognate: 'थ', font: BUR },
      { char: 'ဒ', roman: 'da',  name: 'ဒထွေး',      gloss: 'forked da',    cognate: 'द', font: BUR },
      { char: 'ဓ', roman: 'dha', name: 'ဓအောက်ခြိုက်', gloss: 'dented-below dha', cognate: 'ध', font: BUR },
      { char: 'န', roman: 'na',  name: 'နငယ်',       gloss: 'small na',     cognate: 'न', font: BUR },
    ]},
    { id: 'pa', title: 'Pa group', subtitle: 'Labial · ပဝဂ်', accent: 'indic', font: BUR, chars: [
      { char: 'ပ', roman: 'pa',  name: 'ပစောက်',     gloss: 'deep pa',    cognate: 'प', font: BUR },
      { char: 'ဖ', roman: 'pha', name: 'ဖဦးထုပ်',    gloss: 'capped pha', cognate: 'फ', font: BUR },
      { char: 'ဗ', roman: 'ba',  name: 'ဗထက်ခြိုက်', gloss: 'dented-above ba', cognate: 'ब', font: BUR },
      { char: 'ဘ', roman: 'bha', name: 'ဘကုန်း',     gloss: 'humped bha', cognate: 'भ', font: BUR },
      { char: 'မ', roman: 'ma',  name: 'မ',          gloss: 'ma',         cognate: 'म', font: BUR },
    ]},
    { id: 'misc', title: 'Miscellaneous', subtitle: 'အမျိုးမျိုး', accent: 'cjk', font: BUR, chars: [
      { char: 'ယ', roman: 'ya', name: 'ယပက်လက်', gloss: 'supine ya', cognate: 'य', font: BUR },
      { char: 'ရ', roman: 'ya', name: 'ရကောက်',  gloss: 'curved ya', cognate: 'र', font: BUR },
      { char: 'လ', roman: 'la', name: 'လ',        gloss: 'la',        cognate: 'ल', font: BUR },
      { char: 'ဝ', roman: 'wa', name: 'ဝ',        gloss: 'wa',        cognate: 'व', font: BUR },
      { char: 'သ', roman: 'tha', name: 'သ',       gloss: 'tha',       cognate: 'स', font: BUR },
      { char: 'ဟ', roman: 'ha', name: 'ဟ',        gloss: 'ha',        cognate: 'ह', font: BUR },
      { char: 'ဠ', roman: 'la', name: 'ဠကြီး',    gloss: 'big la',    cognate: 'ळ', font: BUR },
      { char: 'အ', roman: 'a',  name: 'အ',        gloss: 'a',         cognate: 'अ', font: BUR },
    ]},
  ];
  const burmeseVowels = [
    { sign: 'ာ', label: 'ā' }, { sign: 'ိ', label: 'i' }, { sign: 'ီ', label: 'ī' },
    { sign: 'ု', label: 'u' }, { sign: 'ူ', label: 'ū' }, { sign: 'ေ', label: 'e' },
    { sign: 'ဲ', label: 'ai' }, { sign: 'ော', label: 'aw' },
  ];

  // ============================ HINDI ============================
  const hindiFlat = 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ'.split(' ')
    .map((ch, i) => ({ char: ch, roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha ḷa kṣa jña'.split(' ')[i] }));

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

  // ============================ TAMIL ============================
  // 18 consonants in the traditional three-way grouping.
  const TAM = f('tamil');
  const tamilUnits = [
    { id: 'uyir', title: 'Uyir', subtitle: 'Vowels · உயிர்', accent: 'practice', font: TAM, chars: [
      { char: 'அ', roman: 'a', name: 'அ', gloss: 'vowel a', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஆ', roman: 'ā', name: 'ஆ', gloss: 'long ā', cognate: '', font: TAM, noVowelSign: true },
      { char: 'இ', roman: 'i', name: 'இ', gloss: 'i', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஈ', roman: 'ī', name: 'ஈ', gloss: 'long ī', cognate: '', font: TAM, noVowelSign: true },
      { char: 'உ', roman: 'u', name: 'உ', gloss: 'u', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஊ', roman: 'ū', name: 'ஊ', gloss: 'long ū', cognate: '', font: TAM, noVowelSign: true },
      { char: 'எ', roman: 'e', name: 'எ', gloss: 'e', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஏ', roman: 'ē', name: 'ஏ', gloss: 'long ē', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஐ', roman: 'ai', name: 'ஐ', gloss: 'ai', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஒ', roman: 'o', name: 'ஒ', gloss: 'o', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஓ', roman: 'ō', name: 'ஓ', gloss: 'long ō', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஔ', roman: 'au', name: 'ஔ', gloss: 'au', cognate: '', font: TAM, noVowelSign: true },
    ]},
    { id: 'ka', title: 'Ka group', subtitle: 'Velar · க ங', accent: 'quiz', font: TAM,
      // Read-once explainer, surfaced by LessonView before the first character.
      concept: {
        id: 'tamil-ka-allophony',
        title: 'One letter, two sounds',
        blurb: 'Tamil doesn’t spell the difference between k and g — where the letter sits in the word decides it.',
        note: 'Read once before the Ka group',
        glyph: 'க',
        positions: [
          { id: 'initial', tab: 'Start of word', sound: 'k', ipa: '/k/', rule: 'Word-initial க is always a hard k.',
            parts: [{ t: 'க', hi: 1 }, { t: 'டல்' }], roman: [{ t: 'ka', hi: 1 }, { t: 'dal' }], mean: 'sea' },
          { id: 'double', tab: 'Doubled', sound: 'k', ipa: '/k/', rule: 'Doubled க்க stays hard — this is how Tamil writes a real k between vowels.',
            parts: [{ t: 'ப' }, { t: 'க்க', hi: 1 }, { t: 'ம்' }], roman: [{ t: 'pa' }, { t: 'kka', hi: 1 }, { t: 'm' }], mean: 'page, side' },
          { id: 'medial', tab: 'Between vowels', sound: 'g', ipa: '/ɣ~g/', rule: 'A single க between two vowels softens to g — in some words closer to h.',
            parts: [{ t: 'ம' }, { t: 'க', hi: 1 }, { t: 'ன்' }], roman: [{ t: 'ma' }, { t: 'ga', hi: 1 }, { t: 'n' }], mean: 'son' },
          { id: 'nasal', tab: 'After ங', sound: 'g', ipa: '/ŋg/', rule: 'After its own nasal ங, க voices to g.',
            parts: [{ t: 'தங்' }, { t: 'க', hi: 1 }, { t: 'ம்' }], roman: [{ t: 'tha' }, { t: 'nga', hi: 1 }, { t: 'm' }], mean: 'gold' },
        ],
        contrast: {
          from: { text: 'क ख ग घ', font: 'var(--font-devanagari)', label: 'Hindi · 4 letters' },
          to: { text: 'க', label: 'Tamil · 1 letter' },
          note: 'Tamil has no aspirates and no separate voiced stops, so there was never a kha or gha to spell. The same holds for ச · ட · த · ப.',
        },
      },
      chars: [
        { char: 'க', roman: 'ka', name: 'க', gloss: 'ka · ga between vowels', cognate: 'क', font: TAM },
        { char: 'ங', roman: 'ṅa', name: 'ங', gloss: 'nga', cognate: 'ङ', font: TAM },
      ],
      // nasal sits in the Devanagari nasal column; the three middle cells stay blank
      slots: [0, null, null, null, 1] },
    { id: 'ca', title: 'Ca group', subtitle: 'Palatal · ச ஞ', accent: 'sheet', font: TAM,
      chars: [
        { char: 'ச', roman: 'ca', name: 'ச', gloss: 'cha · sa at word start', cognate: 'च', font: TAM },
        { char: 'ஞ', roman: 'ña', name: 'ஞ', gloss: 'nya', cognate: 'ञ', font: TAM },
      ],
      // nasal sits in the Devanagari nasal column; the three middle cells stay blank
      slots: [0, null, null, null, 1] },
    { id: 'tta', title: 'Ta group', subtitle: 'Retroflex · ட ண', accent: 'review', font: TAM,
      chars: [
        { char: 'ட', roman: 'ṭa', name: 'ட', gloss: 'retroflex ta · da between vowels', cognate: 'ट', font: TAM },
        { char: 'ண', roman: 'ṇa', name: 'ண', gloss: 'retroflex na', cognate: 'ण', font: TAM },
      ],
      // nasal sits in the Devanagari nasal column; the three middle cells stay blank
      slots: [0, null, null, null, 1] },
    { id: 'ta', title: 'Ta group', subtitle: 'Dental · த ந', accent: 'indic', font: TAM,
      chars: [
        { char: 'த', roman: 'ta', name: 'த', gloss: 'dental ta · dha between vowels', cognate: 'त', font: TAM },
        { char: 'ந', roman: 'na', name: 'ந', gloss: 'dental na', cognate: 'न', font: TAM },
      ],
      // nasal sits in the Devanagari nasal column; the three middle cells stay blank
      slots: [0, null, null, null, 1] },
    { id: 'pa', title: 'Pa group', subtitle: 'Labial · ப ம', accent: 'cjk', font: TAM,
      chars: [
        { char: 'ப', roman: 'pa', name: 'ப', gloss: 'pa · ba between vowels', cognate: 'प', font: TAM },
        { char: 'ம', roman: 'ma', name: 'ம', gloss: 'ma', cognate: 'म', font: TAM },
      ],
      // nasal sits in the Devanagari nasal column; the three middle cells stay blank
      slots: [0, null, null, null, 1] },
    { id: 'ra', title: 'Ra group', subtitle: 'Alveolar · ற ன', accent: 'practice', font: TAM,
      chars: [
        { char: 'ற', roman: 'ṟa', name: 'ற', gloss: 'trilled ra · tra when doubled', cognate: '', font: TAM },
        { char: 'ன', roman: 'ṉa', name: 'ன', gloss: 'alveolar na', cognate: '', font: TAM },
      ],
      // nasal sits in the Devanagari nasal column; the three middle cells stay blank
      slots: [0, null, null, null, 1] },
    { id: 'idaiyinam', title: 'Idaiyinam', subtitle: 'Semivowels & liquids · இடையினம்', accent: 'quiz', font: TAM, chars: [
      { char: 'ய', roman: 'ya', name: 'ய', gloss: 'ya', cognate: 'य', font: TAM },
      { char: 'ர', roman: 'ra', name: 'ர', gloss: 'ra', cognate: 'र', font: TAM },
      { char: 'ல', roman: 'la', name: 'ல', gloss: 'la', cognate: 'ल', font: TAM },
      { char: 'வ', roman: 'va', name: 'வ', gloss: 'va', cognate: 'व', font: TAM },
      { char: 'ழ', roman: 'ḻa', name: 'ழ', gloss: 'retroflex zha · unique to Tamil', cognate: '', font: TAM },
      { char: 'ள', roman: 'ḷa', name: 'ள', gloss: 'retroflex la', cognate: 'ळ', font: TAM },
    ]},
    { id: 'grantha', title: 'Grantha & Āytam', subtitle: 'Borrowed · கிரந்தம்', accent: 'indic', font: TAM, chars: [
      { char: 'ஃ', roman: 'ḵ', name: 'ஆய்த எழுத்து', gloss: 'āytam · ஃப = f, ஃஜ = z', cognate: '', font: TAM, noVowelSign: true },
      { char: 'ஜ', roman: 'ja', name: 'ஜ', gloss: 'ja · loanwords only', cognate: 'ज', font: TAM },
      { char: 'ஷ', roman: 'ṣa', name: 'ஷ', gloss: 'retroflex sha', cognate: 'ष', font: TAM },
      { char: 'ஸ', roman: 'sa', name: 'ஸ', gloss: 'sibilant sa', cognate: 'स', font: TAM },
      { char: 'ஹ', roman: 'ha', name: 'ஹ', gloss: 'ha', cognate: 'ह', font: TAM },
      { char: 'க்ஷ', roman: 'kṣa', name: 'க்ஷ', gloss: 'ksha · ligature', cognate: 'क्ष', font: TAM },
      { char: 'ஸ்ரீ', roman: 'śrī', name: 'ஸ்ரீ', gloss: 'shri · ligature', cognate: 'श्री', font: TAM, noVowelSign: true },
    ]},
  ];
  const tamilVowels = [
    { sign: 'ா', label: 'ā' }, { sign: 'ி', label: 'i' }, { sign: 'ீ', label: 'ī' },
    { sign: 'ு', label: 'u' }, { sign: 'ூ', label: 'ū' }, { sign: 'ெ', label: 'e' },
    { sign: 'ே', label: 'ē' }, { sign: 'ை', label: 'ai' }, { sign: 'ொ', label: 'o' }, { sign: 'ோ', label: 'ō' },
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
    // startIndex lets a unit map its Nth character to the language-wide index
    // the SRS and stats stores key on.
    let at = 0;
    units.forEach((u) => { u.startIndex = at; at += u.chars.length; });
    const allChars = units.flatMap((u) => u.chars.map((c) => ({ ...c, unitId: u.id, unitTitle: u.title, accent: u.accent })));
    return { id, name, native, group, font: f(scriptKey), units, vowels: vowels || null,
      // demoDue marks the starter review queue shown to a learner with no history yet
      allChars, dueChars: allChars.filter((c) => c.demoDue) };
  }

  const languages = {
    burmese: lang('burmese', 'Burmese', 'မြန်မာ', 'burmese', 'Southeast Asian', burmeseUnits, burmeseVowels),
    hindi: lang('hindi', 'Hindi', 'हिन्दी', 'devanagari', 'South Asian', makeUnits(hindiFlat, indicPlan(11), f('devanagari'))),
    telugu: lang('telugu', 'Telugu', 'తెలుగు', 'telugu', 'South Asian', makeUnits(teluguFlat, indicPlan(10), f('telugu'))),
    sinhala: lang('sinhala', 'Sinhala', 'සිංහල', 'sinhala', 'South Asian', makeUnits(sinhalaFlat, indicPlan(10), f('sinhala')), sinhalaVowels),
    tamil: lang('tamil', 'Tamil', 'தமிழ்', 'tamil', 'South Asian', tamilUnits, tamilVowels),
    hiragana: lang('hiragana', 'Hiragana', 'ひらがな', 'japanese', 'East Asian', makeUnits(hiraFlat, kanaPlan(['あ','か','さ','た','な','は','ま','や','ら','わ']), f('japanese'))),
    katakana: lang('katakana', 'Katakana', 'カタカナ', 'japanese', 'East Asian', makeUnits(kataFlat, kanaPlan(['ア','カ','サ','タ','ナ','ハ','マ','ヤ','ラ','ワ']), f('japanese'))),
    korean: lang('korean', 'Korean', '한국어', 'korean', 'East Asian', makeUnits(korFlat, korPlan, f('korean'))),
    chinese: lang('chinese', 'Chinese', '汉字', 'chinese', 'East Asian', makeUnits(zhFlat, zhPlan, f('chinese'))),
  };

  // ============================ CONCEPT CARDS ============================
  // Read-once explainers shown before a unit is drilled (see ConceptCard.jsx).
  // Attached here, after the units exist, so a card is a pure data addition.
  const DEV = f('devanagari');
  const attach = (lid, uid, concept) => {
    const u = languages[lid] && languages[lid].units.find((x) => x.id === uid);
    if (u) u.concept = concept;
  };
  const seg = (...a) => a.map((x) => (Array.isArray(x) ? { t: x[0], hi: 1 } : { t: x }));

  // Tamil: the same one-letter-two-sounds rule as க, per stop.
  const tamilStop = (id, glyph, nasal, hard, soft, dev, pos, note) => ({
    id: `tamil-${id}-allophony`, glyph, title: `${glyph} — one letter, two sounds`,
    blurb: `Same rule as க: where ${glyph} sits in the word decides whether it is ${hard} or ${soft}.`,
    note: `Read once before the ${id === 'tta' ? 'retroflex Ta' : id === 'ta' ? 'dental Ta' : id[0].toUpperCase() + id.slice(1)} group`,
    positions: pos,
    contrast: { from: { text: dev, font: DEV, label: 'Hindi · 4 letters' }, to: { text: glyph, label: 'Tamil · 1 letter' }, note },
  });
  attach('tamil', 'ca', tamilStop('ca', 'ச', 'ஞ', 'ch', 's / j', 'च छ ज झ', [
    { id: 'initial', tab: 'Start of word', sound: 's', ipa: '/s~tʃ/', rule: 'Word-initial ச is usually s in speech (ch in careful reading).',
      parts: seg(['ச'], 'ட்டை'), roman: seg(['sa'], 'ṭṭai'), mean: 'shirt' },
    { id: 'double', tab: 'Doubled', sound: 'ch', ipa: '/ttʃ/', rule: 'Doubled ச்ச is always a hard ch.',
      parts: seg('ப', ['ச்சை']), roman: seg('pa', ['cc'], 'ai'), mean: 'green' },
    { id: 'medial', tab: 'Between vowels', sound: 's', ipa: '/s/', rule: 'A single ச between vowels is s.',
      parts: seg('ப', ['சு']), roman: seg('pa', ['su']), mean: 'cow' },
    { id: 'nasal', tab: 'After ஞ', sound: 'j', ipa: '/ɲdʒ/', rule: 'After its own nasal ஞ, ச voices to j.',
      parts: seg('பஞ்', ['சு']), roman: seg('pañ', ['ju']), mean: 'cotton' },
  ], 'No aspirates, no separate voiced letter — one ச covers all four Hindi sounds.'));
  attach('tamil', 'tta', tamilStop('tta', 'ட', 'ண', 'ṭ', 'ḍ', 'ट ठ ड ढ', [
    { id: 'initial', tab: 'Start of word', sound: 'ṭ', ipa: '/ʈ/', rule: 'Native Tamil words never start with ட — you only see it first in loanwords.',
      parts: seg(['ட'], 'ம்ளர்'), roman: seg(['ṭa'], 'mḷar'), mean: 'tumbler (loanword)' },
    { id: 'double', tab: 'Doubled', sound: 'ṭṭ', ipa: '/ʈʈ/', rule: 'Doubled ட்ட stays hard.',
      parts: seg('ப', ['ட்ட'], 'ம்'), roman: seg('pa', ['ṭṭa'], 'm'), mean: 'kite; title' },
    { id: 'medial', tab: 'Between vowels', sound: 'ḍ', ipa: '/ɖ~ɽ/', rule: 'A single ட between vowels softens to ḍ, often a quick flap.',
      parts: seg('வீ', ['டு']), roman: seg('vī', ['ḍu']), mean: 'house' },
    { id: 'nasal', tab: 'After ண', sound: 'ḍ', ipa: '/ɳɖ/', rule: 'After its own nasal ண, ட voices to ḍ.',
      parts: seg('வண்', ['டி']), roman: seg('vaṇ', ['ḍi']), mean: 'cart' },
  ], 'Tongue curled back for all of them — Tamil just doesn\u2019t spell voicing.'));
  attach('tamil', 'ta', tamilStop('ta', 'த', 'ந', 't', 'd', 'त थ द ध', [
    { id: 'initial', tab: 'Start of word', sound: 't', ipa: '/t̪/', rule: 'Word-initial த is a hard dental t — tongue on the teeth.',
      parts: seg(['த'], 'மிழ்'), roman: seg(['ta'], 'miḻ'), mean: 'Tamil' },
    { id: 'double', tab: 'Doubled', sound: 'tt', ipa: '/t̪t̪/', rule: 'Doubled த்த stays hard.',
      parts: seg('ப', ['த்து']), roman: seg('pa', ['ttu']), mean: 'ten' },
    { id: 'medial', tab: 'Between vowels', sound: 'd', ipa: '/d̪~ð/', rule: 'A single த between vowels softens to d, close to the th in “this”.',
      parts: seg('பா', ['த'], 'ம்'), roman: seg('pā', ['da'], 'm'), mean: 'foot' },
    { id: 'nasal', tab: 'After ந', sound: 'd', ipa: '/n̪d̪/', rule: 'After its own nasal ந, த voices to d.',
      parts: seg('பந்', ['து']), roman: seg('pan', ['du']), mean: 'ball' },
  ], 'Keep it dental: த is a different letter from the retroflex ட you just learned.'));
  attach('tamil', 'pa', tamilStop('pa', 'ப', 'ம', 'p', 'b', 'प फ ब भ', [
    { id: 'initial', tab: 'Start of word', sound: 'p', ipa: '/p/', rule: 'Word-initial ப is a hard p.',
      parts: seg(['ப'], 'ல்'), roman: seg(['pa'], 'l'), mean: 'tooth' },
    { id: 'double', tab: 'Doubled', sound: 'pp', ipa: '/pp/', rule: 'Doubled ப்ப stays hard.',
      parts: seg('அ', ['ப்பா']), roman: seg('a', ['ppā']), mean: 'father' },
    { id: 'medial', tab: 'Between vowels', sound: 'b', ipa: '/b~β/', rule: 'A single ப between vowels softens to b, lips barely touching.',
      parts: seg('கோ', ['ப'], 'ம்'), roman: seg('kō', ['ba'], 'm'), mean: 'anger' },
    { id: 'nasal', tab: 'After ம', sound: 'b', ipa: '/mb/', rule: 'After its own nasal ம, ப voices to b.',
      parts: seg('பாம்', ['பு']), roman: seg('pām', ['bu']), mean: 'snake' },
  ], 'That completes the pattern: க ச ட த ப each stand for a hard and a soft sound.'));

  // Burmese: stacked consonants, once every consonant is known.
  attach('burmese', 'misc', {
    id: 'burmese-stacking', glyph: 'န္တ', title: 'Letters that stack',
    blurb: 'In some words — mostly from Pali and Sanskrit — one consonant is tucked underneath another instead of being written after it.',
    note: 'Read once before the last consonant group',
    positions: [
      { id: 'nta', tab: 'န + တ', sound: 'n · d', ipa: '', rule: 'The top letter closes the syllable before it (as if it had ်); the bottom one starts the next.',
        parts: seg('မ', ['န္တ'], 'လေး'), roman: seg('ma', ['nda'], 'lay'), mean: 'Mandalay' },
      { id: 'dda', tab: 'ဒ + ဓ', sound: 'k · d', ipa: '', rule: 'Stacks usually pair letters from the same row of the grid — here both are dentals. The top one closes as a stop.',
        parts: seg('ဗု', ['ဒ္ဓ']), roman: seg('bou', ['k-da']), mean: 'Buddha' },
      { id: 'ssa', tab: 'စ + စ', sound: 't · s', ipa: '', rule: 'A letter can also stack on itself: the top copy closes the syllable, the bottom one opens the next.',
        parts: seg('ပ', ['စ္စ'], 'ည်း'), roman: seg('pyi', ['t-s'], 'i'), mean: 'thing, belongings' },
    ],
    contrast: { from: { text: 'န် + တ', font: BUR, label: 'written in a row' }, to: { text: 'န္တ', label: 'stacked' },
      note: 'Same sounds either way — stacking drops the ် and moves the second letter underneath. Read top, then bottom.' },
  });

  // Kana: dakuten / handakuten, before the K-row (the first row they apply to).
  // ex: [plain, marked, [marked-part, rest], [roman-hi, roman-rest], meaning] per row
  const kanaMarks = (lid, rows) => ({
    id: `${lid}-dakuten`, glyph: rows[0][1], title: 'Two small marks, a new sound',
    blurb: 'A tiny ゛ (dakuten) voices the consonant; a tiny ゜ (handakuten), only on the H-row, turns it into p. No new shapes to learn.',
    note: 'Read once before the K-row',
    positions: rows.map(([plain, marked, word, rom, mean, snd, rule]) => ({
      id: snd, tab: `${plain} → ${marked}`, sound: snd, ipa: `/${snd === 'g' ? 'ɡ' : snd}/`, rule,
      parts: seg([word[0]], word[1]), roman: seg([rom[0]], rom[1]), mean })),
    contrast: { from: { text: rows.slice(0, 4).map((r) => r[0]).join(' '), font: f('japanese'), label: 'plain' },
      to: { text: rows.map((r) => r[1]).join(' '), label: 'marked' },
      note: 'Five rows you already know give you 25 more sounds for free.' },
  });
  const R = { g: '゛ turns k into g.', z: '゛ turns s into z.', d: '゛ turns t into d.', b: '゛ on the H-row gives b, not v.', p: '゜ — the small circle — only goes on the H-row, and gives p.' };
  attach('hiragana', 'k', kanaMarks('hiragana', [
    ['か', 'が', ['が', 'っこう'], ['ga', 'kkō'], 'school', 'g', R.g],
    ['さ', 'ざ', ['ざ', 'っし'], ['za', 'sshi'], 'magazine', 'z', R.z],
    ['た', 'だ', ['だ', 'いがく'], ['da', 'igaku'], 'university', 'd', R.d],
    ['は', 'ば', ['ば', 'んごはん'], ['ba', 'ngohan'], 'dinner', 'b', R.b],
    ['は', 'ぱ', ['ぱ', 'ん'], ['pa', 'n'], 'bread', 'p', R.p],
  ]));
  // katakana words are loanwords, which is what katakana is actually used for
  attach('katakana', 'k', kanaMarks('katakana', [
    ['カ', 'ガ', ['ガ', 'ム'], ['ga', 'mu'], 'chewing gum', 'g', R.g],
    ['サ', 'ザ', ['ゼ', 'ロ'], ['ze', 'ro'], 'zero', 'z', R.z],
    ['タ', 'ダ', ['ド', 'ア'], ['do', 'a'], 'door', 'd', R.d],
    ['ハ', 'バ', ['バ', 'ス'], ['ba', 'su'], 'bus', 'b', R.b],
    ['ハ', 'パ', ['パ', 'ン'], ['pa', 'n'], 'bread', 'p', R.p],
  ]));

  // Per-language visual identity — signature color, native greeting, emblem,
  // and a watermark glyph. Gives each script a distinct dashboard & card look.
  const themes = {
    burmese:  { color: '#f59e0b', color2: '#d97706', greeting: 'မင်္ဂလာပါ',  hello: 'Mingalaba',  emblem: '🛕', motif: 'က', blurb: 'Abugida · 33 consonants' },
    hindi:    { color: '#ef4444', color2: '#b91c1c', greeting: 'नमस्ते',      hello: 'Namaste',    emblem: '🪔', motif: 'अ', blurb: 'Devanagari · 36 letters' },
    telugu:   { color: '#22c55e', color2: '#15803d', greeting: 'నమస్కారం',   hello: 'Namaskaram', emblem: '🌾', motif: 'క', blurb: 'Abugida · 35 consonants' },
    sinhala:  { color: '#14b8a6', color2: '#0f766e', greeting: 'ආයුබෝවන්', hello: 'Āyubōwan',  emblem: '🦚', motif: 'ස', blurb: 'Abugida · 35 consonants' },
    tamil:    { color: '#8b5cf6', color2: '#6d28d9', greeting: 'வணக்கம்',    hello: 'Vaṇakkam',   emblem: '🪷', motif: 'அ', blurb: 'Abugida · 12 vowels + 18 consonants + Grantha' },
    hiragana: { color: '#ec4899', color2: '#be185d', greeting: 'こんにちは',   hello: 'Konnichiwa', emblem: '🌸', motif: 'あ', blurb: 'Syllabary · 46 kana' },
    katakana: { color: '#6366f1', color2: '#4338ca', greeting: 'コンニチハ',   hello: 'Konnichiwa', emblem: '⛩️', motif: 'カ', blurb: 'Syllabary · 46 kana' },
    korean:   { color: '#3b82f6', color2: '#1d4ed8', greeting: '안녕하세요',   hello: 'Annyeong',   emblem: '☯',  motif: '한', blurb: 'Hangul · 19 consonants' },
    chinese:  { color: '#e11d48', color2: '#9f1239', greeting: '你好',         hello: 'Nǐ hǎo',     emblem: '🏮', motif: '汉', blurb: 'Logographic · starter set' },
  };

  window.ScripturaData = {
    languages,
    themes,
    languageList: [
      { id: 'burmese', name: 'Burmese', native: 'မြန်မာ', font: f('burmese'), group: 'Southeast Asian' },
      { id: 'hindi', name: 'Hindi', native: 'हिन्दी', font: f('devanagari'), group: 'South Asian' },
      { id: 'telugu', name: 'Telugu', native: 'తెలుగు', font: f('telugu'), group: 'South Asian' },
      { id: 'sinhala', name: 'Sinhala', native: 'සිංහල', font: f('sinhala'), group: 'South Asian' },
      { id: 'tamil', name: 'Tamil', native: 'தமிழ்', font: f('tamil'), group: 'South Asian' },
      { id: 'hiragana', name: 'Hiragana', native: 'ひらがな', font: f('japanese'), group: 'East Asian' },
      { id: 'katakana', name: 'Katakana', native: 'カタカナ', font: f('japanese'), group: 'East Asian' },
      { id: 'korean', name: 'Korean', native: '한국어', font: f('korean'), group: 'East Asian' },
      { id: 'chinese', name: 'Chinese', native: '汉字', font: f('chinese'), group: 'East Asian' },
    ],
    defaultLang: 'burmese',
    // Seed prior progress for Burmese so the demo opens mid-journey.
    seed: { burmese: ['က','ခ','ဂ','ဃ','င','စ','ဇ','ည'] },
    profile: { name: 'Learner', streak: 6, dailyGoalXp: 30, todayXp: 20, level: 4, levelXp: 180, levelMax: 250, xpPerCard: 5 },
  };
})();
