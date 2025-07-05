CREATE TABLE IF NOT EXISTS [auditing] (
    `ID`	        INTEGER PRIMARY KEY AUTOINCREMENT,
    'created_at'    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `ID_paziente`   integer,
	`ID_entity`   	integer,
	`entity`        nvarchar,
	`crud`          nvarchar(1)
);