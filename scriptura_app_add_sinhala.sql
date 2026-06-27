-- ============================================================
-- Scriptura — add Sinhala to an existing scriptura_app_ database.
-- Safe to run on top of the existing schema (idempotent inserts).
-- Run in Supabase → SQL editor.
-- ============================================================

insert into scriptura_app_languages (id,name,native,grp,font,sort)
values ('sinhala','Sinhala','සිංහල','indic','var(--font-sinhala)',3)
on conflict (id) do nothing;

-- units
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('sinhala_ka','sinhala','Ka group','Velar','practice',0) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('sinhala_sa','sinhala','Sa group','Palatal','quiz',1) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('sinhala_tta','sinhala','Ta group','Retroflex','sheet',2) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('sinhala_ta','sinhala','Ta group','Dental','review',3) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('sinhala_pa','sinhala','Pa group','Labial','indic',4) on conflict (id) do nothing;
insert into scriptura_app_units (id,language_id,title,subtitle,accent,sort) values ('sinhala_misc','sinhala','Miscellaneous','Semivowels & sibilants','cjk',5) on conflict (id) do nothing;

-- characters
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ka',0,'ක','ka','ka','','',0) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ka',1,'ඛ','kha','kha','','',1) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ka',2,'ග','ga','ga','','',2) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ka',3,'ඝ','gha','gha','','',3) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ka',4,'ඞ','ṅa','ṅa','','',4) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_sa',5,'ච','ca','ca','','',5) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_sa',6,'ඡ','cha','cha','','',6) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_sa',7,'ජ','ja','ja','','',7) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_sa',8,'ඣ','jha','jha','','',8) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_sa',9,'ඤ','ña','ña','','',9) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_tta',10,'ට','ṭa','ṭa','','',10) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_tta',11,'ඨ','ṭha','ṭha','','',11) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_tta',12,'ඩ','ḍa','ḍa','','',12) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_tta',13,'ඪ','ḍha','ḍha','','',13) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_tta',14,'ණ','ṇa','ṇa','','',14) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ta',15,'ත','ta','ta','','',15) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ta',16,'ථ','tha','tha','','',16) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ta',17,'ද','da','da','','',17) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ta',18,'ධ','dha','dha','','',18) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_ta',19,'න','na','na','','',19) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_pa',20,'ප','pa','pa','','',20) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_pa',21,'ඵ','pha','pha','','',21) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_pa',22,'බ','ba','ba','','',22) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_pa',23,'භ','bha','bha','','',23) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_pa',24,'ම','ma','ma','','',24) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',25,'ය','ya','ya','','',25) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',26,'ර','ra','ra','','',26) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',27,'ල','la','la','','',27) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',28,'ව','va','va','','',28) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',29,'ශ','śa','śa','','',29) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',30,'ෂ','ṣa','ṣa','','',30) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',31,'ස','sa','sa','','',31) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',32,'හ','ha','ha','','',32) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',33,'ළ','ḷa','ḷa','','',33) on conflict (language_id,char_index) do nothing;
insert into scriptura_app_characters (language_id,unit_id,char_index,char,roman,name,gloss,cognate,sort) values ('sinhala','sinhala_misc',34,'ෆ','fa','fa','','',34) on conflict (language_id,char_index) do nothing;

-- vowels
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ා','ā',NULL,0);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ි','i',NULL,1);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ී','ī',NULL,2);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ු','u',NULL,3);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ූ','ū',NULL,4);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ෙ','e',NULL,5);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ේ','ē',NULL,6);
insert into scriptura_app_vowels (language_id,sign,label,name,sort) values ('sinhala','ො','o',NULL,7);
