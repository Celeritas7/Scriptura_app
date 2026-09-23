-- ============================================================
-- Scriptura — Supabase schema + seed (content & progress)
-- All tables prefixed scriptura_app_ (lowercase, unquoted). Run this whole file in the
-- Supabase SQL editor (Project → SQL editor → New query → paste → Run).
-- ============================================================

-- ---------- CONTENT TABLES ----------
create table if not exists scriptura_app_languages (
  id    text primary key,
  name  text not null,
  native text,
  grp   text,            -- 'Indic' | 'CJK'
  font  text,            -- CSS font-family token
  sort  int default 0
);

create table if not exists scriptura_app_units (
  id        text primary key,   -- e.g. 'burmese_ka'
  language_id text not null references scriptura_app_languages(id),
  title     text not null,
  subtitle  text,
  accent    text,               -- practice|quiz|sheet|review|indic|cjk
  sort      int default 0
);

create table if not exists scriptura_app_characters (
  id        bigserial primary key,
  language_id text not null references scriptura_app_languages(id),
  unit_id   text references scriptura_app_units(id),
  char_index int not null,      -- global index within the language (matches the app)
  char      text not null,
  roman     text,
  name      text,               -- native letter-name (Burmese only, etc.)
  gloss     text,               -- plain-English reading of the name
  cognate   text,               -- Devanagari cross-reference
  sort      int default 0,
  unique (language_id, char_index)
);

create table if not exists scriptura_app_vowels (
  id        bigserial primary key,
  language_id text not null references scriptura_app_languages(id),
  sign      text not null,
  label     text,
  name      text,
  sort      int default 0
);

-- ---------- PROGRESS TABLE ----------
create table if not exists scriptura_app_sheet_stats (
  user_id    text not null,
  language_id text not null,
  char_index int  not null,
  char       text,
  correct    int  not null default 0,
  wrong      int  not null default 0,
  updated_at timestamptz default now(),
  primary key (user_id, language_id, char_index)
);

-- ---------- ROW LEVEL SECURITY ----------
-- Content is public (read-only for anon); progress is open for the anon-key demo.
alter table scriptura_app_languages  enable row level security;
alter table scriptura_app_units      enable row level security;
alter table scriptura_app_characters enable row level security;
alter table scriptura_app_vowels     enable row level security;
alter table scriptura_app_sheet_stats enable row level security;

create policy "read languages"  on scriptura_app_languages  for select using (true);
create policy "read units"      on scriptura_app_units      for select using (true);
create policy "read characters" on scriptura_app_characters for select using (true);
create policy "read vowels"     on scriptura_app_vowels     for select using (true);
-- Demo policy: anyone with the anon key can read/write progress. For real
-- multi-user auth, swap user_id for auth.uid() and scope this to it.
create policy "all stats" on scriptura_app_sheet_stats for all using (true) with check (true);

-- ============================================================
-- SEED DATA
-- ============================================================

-- languages
insert into scriptura_app_languages (id,name,native,grp,font,sort) values ('burmese','Burmese','မြန်မာ','Indic','var(--font-burmese)',0) on conflict (id) do nothing;
insert into scriptura_app_languages (id,name,native,grp,font,sort) values ('hindi','Hindi','हिन्दी','Indic','var(--font-devanagari)',1) on conflict (id) do nothing;
insert into scriptura_app_languages (id,name,native,grp,font,sort) values ('telugu','Telugu','తెలుగు','Indic','var(--font-telugu)',2) on conflict (id) do nothing;
insert into scriptura_app_languages (id,name,native,grp,font,sort) values ('hiragana','Hiragana','ひらがな','CJK','var(--font-japanese)',3) on conflict (id) do nothing;
insert into scriptura_app_languages (id,name,native,grp,font,sort) values ('katakana','Katakana','カタカナ','CJK','var(--font-japanese)',4) on conflict (id) do nothing;
insert into scriptura_app_languages (id,name,native,grp,font,sort) values ('korean','Korean','한국어','CJK','var(--font-korean)',5) on conflict (id) do nothing;
insert into scriptura_app_languages (id,name,native,grp,font,sort) values ('chinese','Chinese','汉字','CJK','var(--font-chinese)',6) on conflict (id) do nothing;

-- Burmese: units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('burmese_ka','burmese','Ka group','Velar · ကဝဂ်','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('burmese_sa','burmese','Sa group','Palatal · စဝဂ်','quiz',1) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('burmese_tta','burmese','Ta group','Retroflex · ဋဝဂ်','sheet',2) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('burmese_ta','burmese','Ta group','Dental · တဝဂ်','review',3) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('burmese_pa','burmese','Pa group','Labial · ပဝဂ်','indic',4) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('burmese_misc','burmese','Miscellaneous','အမျိုးမျိုး','cjk',5) on conflict (id) do nothing;
-- Burmese: characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ka',0,'က','ka','ကကြီး','big ka','क',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ka',1,'ခ','kha','ခကွေး','curved kha','ख',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ka',2,'ဂ','ga','ဂငယ်','small ga','ग',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ka',3,'ဃ','gha','ဃကြီး','big ga','घ',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ka',4,'င','nga','င','nga','ङ',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_sa',5,'စ','sa','စလုံး','round sa','च',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_sa',6,'ဆ','hsa','ဆလိမ်','twisted hsa','छ',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_sa',7,'ဇ','za','ဇကွဲ','split za','ज',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_sa',8,'ဈ','jha','ဈမျဉ်းဆွဲ','lined za','झ',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_sa',9,'ည','nya','ညကြီး','big nya','ञ',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_tta',10,'ဋ','ta','ဋသန်လျင်းချိတ်','hooked ta','ट',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_tta',11,'ဌ','hta','ဌဝမ်းဘဲ','duck-belly hta','ठ',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_tta',12,'ဍ','da','ဍရင်ကောက်','curved-chest da','ड',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_tta',13,'ဎ','dha','ဎရေမှုတ်','water-blown dha','ढ',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_tta',14,'ဏ','na','ဏကြီး','big na','ण',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ta',15,'တ','ta','တဝမ်းပူ','pot-belly ta','त',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ta',16,'ထ','hta','ထဆင်ထူး','elephant-fetter hta','थ',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ta',17,'ဒ','da','ဒထွေး','forked da','द',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ta',18,'ဓ','dha','ဓအောက်ခြိုက်','dented-below dha','ध',18) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_ta',19,'န','na','နငယ်','small na','न',19) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_pa',20,'ပ','pa','ပစောက်','deep pa','प',20) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_pa',21,'ဖ','pha','ဖဦးထုပ်','capped pha','फ',21) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_pa',22,'ဗ','ba','ဗထက်ခြိုက်','dented-above ba','ब',22) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_pa',23,'ဘ','bha','ဘကုန်း','humped bha','भ',23) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_pa',24,'မ','ma','မ','ma','म',24) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',25,'ယ','ya','ယပက်လက်','supine ya','य',25) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',26,'ရ','ya','ရကောက်','curved ya','र',26) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',27,'လ','la','လ','la','ल',27) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',28,'ဝ','wa','ဝ','wa','व',28) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',29,'သ','tha','သ','tha','स',29) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',30,'ဟ','ha','ဟ','ha','ह',30) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',31,'ဠ','la','ဠကြီး','big la','ळ',31) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('burmese','burmese_misc',32,'အ','a','အ','a','अ',32) on conflict (language_id,char_index) do nothing;
-- Burmese: vowels
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ာ','ā',NULL,0);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ိ','i',NULL,1);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ီ','ī',NULL,2);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ု','u',NULL,3);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ူ','ū',NULL,4);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ေ','e',NULL,5);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ဲ','ai',NULL,6);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('burmese','ော','aw',NULL,7);

-- Hindi: units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hindi_ka','hindi','Ka group','Velar','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hindi_sa','hindi','Sa group','Palatal','quiz',1) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hindi_tta','hindi','Ta group','Retroflex','sheet',2) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hindi_ta','hindi','Ta group','Dental','review',3) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hindi_pa','hindi','Pa group','Labial','indic',4) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hindi_misc','hindi','Miscellaneous','Semivowels & sibilants','cjk',5) on conflict (id) do nothing;
-- Hindi: characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ka',0,'क','ka','ka','','',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ka',1,'ख','kha','kha','','',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ka',2,'ग','ga','ga','','',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ka',3,'घ','gha','gha','','',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ka',4,'ङ','ṅa','ṅa','','',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_sa',5,'च','ca','ca','','',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_sa',6,'छ','cha','cha','','',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_sa',7,'ज','ja','ja','','',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_sa',8,'झ','jha','jha','','',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_sa',9,'ञ','ña','ña','','',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_tta',10,'ट','ṭa','ṭa','','',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_tta',11,'ठ','ṭha','ṭha','','',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_tta',12,'ड','ḍa','ḍa','','',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_tta',13,'ढ','ḍha','ḍha','','',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_tta',14,'ण','ṇa','ṇa','','',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ta',15,'त','ta','ta','','',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ta',16,'थ','tha','tha','','',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ta',17,'द','da','da','','',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ta',18,'ध','dha','dha','','',18) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_ta',19,'न','na','na','','',19) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_pa',20,'प','pa','pa','','',20) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_pa',21,'फ','pha','pha','','',21) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_pa',22,'ब','ba','ba','','',22) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_pa',23,'भ','bha','bha','','',23) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_pa',24,'म','ma','ma','','',24) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',25,'य','ya','ya','','',25) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',26,'र','ra','ra','','',26) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',27,'ल','la','la','','',27) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',28,'व','va','va','','',28) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',29,'श','śa','śa','','',29) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',30,'ष','ṣa','ṣa','','',30) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',31,'स','sa','sa','','',31) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hindi','hindi_misc',32,'ह','ha','ha','','',32) on conflict (language_id,char_index) do nothing;

-- Telugu: units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('telugu_ka','telugu','Ka group','Velar','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('telugu_sa','telugu','Sa group','Palatal','quiz',1) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('telugu_tta','telugu','Ta group','Retroflex','sheet',2) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('telugu_ta','telugu','Ta group','Dental','review',3) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('telugu_pa','telugu','Pa group','Labial','indic',4) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('telugu_misc','telugu','Miscellaneous','Semivowels & sibilants','cjk',5) on conflict (id) do nothing;
-- Telugu: characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ka',0,'క','ka','ka','','',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ka',1,'ఖ','kha','kha','','',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ka',2,'గ','ga','ga','','',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ka',3,'ఘ','gha','gha','','',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ka',4,'ఙ','ṅa','ṅa','','',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_sa',5,'చ','ca','ca','','',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_sa',6,'ఛ','cha','cha','','',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_sa',7,'జ','ja','ja','','',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_sa',8,'ఝ','jha','jha','','',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_sa',9,'ఞ','ña','ña','','',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_tta',10,'ట','ṭa','ṭa','','',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_tta',11,'ఠ','ṭha','ṭha','','',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_tta',12,'డ','ḍa','ḍa','','',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_tta',13,'ఢ','ḍha','ḍha','','',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_tta',14,'ణ','ṇa','ṇa','','',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ta',15,'త','ta','ta','','',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ta',16,'థ','tha','tha','','',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ta',17,'ద','da','da','','',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ta',18,'ధ','dha','dha','','',18) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_ta',19,'న','na','na','','',19) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_pa',20,'ప','pa','pa','','',20) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_pa',21,'ఫ','pha','pha','','',21) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_pa',22,'బ','ba','ba','','',22) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_pa',23,'భ','bha','bha','','',23) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_pa',24,'మ','ma','ma','','',24) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',25,'య','ya','ya','','',25) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',26,'ర','ra','ra','','',26) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',27,'ల','la','la','','',27) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',28,'వ','va','va','','',28) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',29,'శ','śa','śa','','',29) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',30,'ష','ṣa','ṣa','','',30) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',31,'స','sa','sa','','',31) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',32,'హ','ha','ha','','',32) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',33,'ళ','ḷa','ḷa','','',33) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('telugu','telugu_misc',34,'ఱ','ṟa','ṟa','','',34) on conflict (language_id,char_index) do nothing;

-- Hiragana: units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_vowels','hiragana','Vowels','あ','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_k','hiragana','K-row','か','quiz',1) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_s','hiragana','S-row','さ','sheet',2) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_t','hiragana','T-row','た','review',3) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_n','hiragana','N-row','な','indic',4) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_h','hiragana','H-row','は','cjk',5) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_m','hiragana','M-row','ま','practice',6) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_y','hiragana','Y-row','や','quiz',7) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_r','hiragana','R-row','ら','sheet',8) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('hiragana_w','hiragana','W-row & N','わ','review',9) on conflict (id) do nothing;
-- Hiragana: characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_vowels',0,'あ','a','a','','',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_vowels',1,'い','i','i','','',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_vowels',2,'う','u','u','','',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_vowels',3,'え','e','e','','',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_vowels',4,'お','o','o','','',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_k',5,'か','ka','ka','','',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_k',6,'き','ki','ki','','',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_k',7,'く','ku','ku','','',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_k',8,'け','ke','ke','','',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_k',9,'こ','ko','ko','','',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_s',10,'さ','sa','sa','','',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_s',11,'し','shi','shi','','',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_s',12,'す','su','su','','',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_s',13,'せ','se','se','','',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_s',14,'そ','so','so','','',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_t',15,'た','ta','ta','','',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_t',16,'ち','chi','chi','','',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_t',17,'つ','tsu','tsu','','',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_t',18,'て','te','te','','',18) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_t',19,'と','to','to','','',19) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_n',20,'な','na','na','','',20) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_n',21,'に','ni','ni','','',21) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_n',22,'ぬ','nu','nu','','',22) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_n',23,'ね','ne','ne','','',23) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_n',24,'の','no','no','','',24) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_h',25,'は','ha','ha','','',25) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_h',26,'ひ','hi','hi','','',26) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_h',27,'ふ','fu','fu','','',27) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_h',28,'へ','he','he','','',28) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_h',29,'ほ','ho','ho','','',29) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_m',30,'ま','ma','ma','','',30) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_m',31,'み','mi','mi','','',31) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_m',32,'む','mu','mu','','',32) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_m',33,'め','me','me','','',33) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_m',34,'も','mo','mo','','',34) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_y',35,'や','ya','ya','','',35) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_y',36,'ゆ','yu','yu','','',36) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_y',37,'よ','yo','yo','','',37) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_r',38,'ら','ra','ra','','',38) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_r',39,'り','ri','ri','','',39) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_r',40,'る','ru','ru','','',40) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_r',41,'れ','re','re','','',41) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_r',42,'ろ','ro','ro','','',42) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_w',43,'わ','wa','wa','','',43) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_w',44,'を','wo','wo','','',44) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('hiragana','hiragana_w',45,'ん','n','n','','',45) on conflict (language_id,char_index) do nothing;

-- Katakana: units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_vowels','katakana','Vowels','ア','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_k','katakana','K-row','カ','quiz',1) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_s','katakana','S-row','サ','sheet',2) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_t','katakana','T-row','タ','review',3) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_n','katakana','N-row','ナ','indic',4) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_h','katakana','H-row','ハ','cjk',5) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_m','katakana','M-row','マ','practice',6) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_y','katakana','Y-row','ヤ','quiz',7) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_r','katakana','R-row','ラ','sheet',8) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('katakana_w','katakana','W-row & N','ワ','review',9) on conflict (id) do nothing;
-- Katakana: characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_vowels',0,'ア','a','a','','',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_vowels',1,'イ','i','i','','',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_vowels',2,'ウ','u','u','','',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_vowels',3,'エ','e','e','','',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_vowels',4,'オ','o','o','','',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_k',5,'カ','ka','ka','','',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_k',6,'キ','ki','ki','','',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_k',7,'ク','ku','ku','','',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_k',8,'ケ','ke','ke','','',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_k',9,'コ','ko','ko','','',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_s',10,'サ','sa','sa','','',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_s',11,'シ','shi','shi','','',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_s',12,'ス','su','su','','',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_s',13,'セ','se','se','','',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_s',14,'ソ','so','so','','',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_t',15,'タ','ta','ta','','',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_t',16,'チ','chi','chi','','',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_t',17,'ツ','tsu','tsu','','',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_t',18,'テ','te','te','','',18) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_t',19,'ト','to','to','','',19) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_n',20,'ナ','na','na','','',20) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_n',21,'ニ','ni','ni','','',21) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_n',22,'ヌ','nu','nu','','',22) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_n',23,'ネ','ne','ne','','',23) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_n',24,'ノ','no','no','','',24) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_h',25,'ハ','ha','ha','','',25) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_h',26,'ヒ','hi','hi','','',26) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_h',27,'フ','fu','fu','','',27) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_h',28,'ヘ','he','he','','',28) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_h',29,'ホ','ho','ho','','',29) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_m',30,'マ','ma','ma','','',30) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_m',31,'ミ','mi','mi','','',31) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_m',32,'ム','mu','mu','','',32) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_m',33,'メ','me','me','','',33) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_m',34,'モ','mo','mo','','',34) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_y',35,'ヤ','ya','ya','','',35) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_y',36,'ユ','yu','yu','','',36) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_y',37,'ヨ','yo','yo','','',37) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_r',38,'ラ','ra','ra','','',38) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_r',39,'リ','ri','ri','','',39) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_r',40,'ル','ru','ru','','',40) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_r',41,'レ','re','re','','',41) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_r',42,'ロ','ro','ro','','',42) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_w',43,'ワ','wa','wa','','',43) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_w',44,'ヲ','wo','wo','','',44) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('katakana','katakana_w',45,'ン','n','n','','',45) on conflict (language_id,char_index) do nothing;

-- Korean: units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('korean_basic1','korean','Basic I','ㄱ–ㅅ','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('korean_basic2','korean','Basic II','ㅇ–ㅎ','quiz',1) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('korean_tense','korean','Tense','ㄲ–ㅉ','sheet',2) on conflict (id) do nothing;
-- Korean: characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic1',0,'ㄱ','g/k','g/k','','',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic1',1,'ㄴ','n','n','','',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic1',2,'ㄷ','d/t','d/t','','',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic1',3,'ㄹ','r/l','r/l','','',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic1',4,'ㅁ','m','m','','',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic1',5,'ㅂ','b/p','b/p','','',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic1',6,'ㅅ','s','s','','',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic2',7,'ㅇ','ng','ng','','',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic2',8,'ㅈ','j','j','','',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic2',9,'ㅊ','ch','ch','','',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic2',10,'ㅋ','k','k','','',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic2',11,'ㅌ','t','t','','',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic2',12,'ㅍ','p','p','','',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_basic2',13,'ㅎ','h','h','','',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_tense',14,'ㄲ','kk','kk','','',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_tense',15,'ㄸ','tt','tt','','',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_tense',16,'ㅃ','pp','pp','','',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_tense',17,'ㅆ','ss','ss','','',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('korean','korean_tense',18,'ㅉ','jj','jj','','',18) on conflict (language_id,char_index) do nothing;

-- Chinese: units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('chinese_numbers','chinese','Numbers','一 – 十','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('chinese_nature','chinese','Nature & body','大 – 木','indic',1) on conflict (id) do nothing;
-- Chinese: characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',0,'一','yī','yī','one','',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',1,'二','èr','èr','two','',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',2,'三','sān','sān','three','',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',3,'四','sì','sì','four','',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',4,'五','wǔ','wǔ','five','',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',5,'六','liù','liù','six','',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',6,'七','qī','qī','seven','',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',7,'八','bā','bā','eight','',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',8,'九','jiǔ','jiǔ','nine','',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_numbers',9,'十','shí','shí','ten','',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',10,'大','dà','dà','big','',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',11,'小','xiǎo','xiǎo','small','',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',12,'人','rén','rén','person','',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',13,'口','kǒu','kǒu','mouth','',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',14,'日','rì','rì','sun','',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',15,'月','yuè','yuè','moon','',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',16,'山','shān','shān','mountain','',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',17,'水','shuǐ','shuǐ','water','',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',18,'火','huǒ','huǒ','fire','',18) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('chinese','chinese_nature',19,'木','mù','mù','wood','',19) on conflict (language_id,char_index) do nothing;
