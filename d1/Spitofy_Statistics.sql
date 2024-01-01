BEGIN TRANSACTION;
DROP TABLE IF EXISTS "reactions";
CREATE TABLE IF NOT EXISTS "reactions" (
	"id"	INTEGER NOT NULL,
	"slug"	TEXT NOT NULL,
	"reaction"	TEXT,
	"currentTime"	REAL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "tracks";
CREATE TABLE IF NOT EXISTS "tracks" (
	"slug"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"plays"	INTEGER NOT NULL DEFAULT 0,
	"reactions"	INTEGER NOT NULL DEFAULT 0,
	"duration"	REAL NOT NULL DEFAULT 0,
	PRIMARY KEY("slug")
);
INSERT INTO "reactions" ("id","slug","reaction","currentTime") VALUES (1,'universe','heart',12.577668);
INSERT INTO "tracks" ("slug","plays","reactions","duration") VALUES ('besame',0,0,245.333333),
 ('fuck off baby',0,0,272.013025),
 ('los muros más altos',0,0,164.440775),
 ('soundtrack',0,0,273.6),
 ('traia',0,0,312.827596),
 ('universe',0,1,195.552625),
 ('we will never die',0,0,155.533025);
DROP INDEX IF EXISTS "slug";
CREATE INDEX IF NOT EXISTS "slug" ON "reactions" (
	"slug"
);
COMMIT;
