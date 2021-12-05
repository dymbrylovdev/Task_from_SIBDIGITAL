
CREATE TABLE arrays (
    Id SERIAL PRIMARY KEY,
    array VARCHAR,
)

CREATE TABLE numbers (
    Id SERIAL PRIMARY KEY,
    number INTEGER,
    arrays_id INTEGER,
    FOREIGN KEY (arrays_id) REFERENCES arrays (Id)
)