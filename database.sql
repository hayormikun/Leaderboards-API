CREATE DATABASE leaderboard;

CREATE TABLE leaderboards(
    board_id SERIAL PRIMARY KEY,
    game VARCHAR(30),
    player VARCHAR(30),
    score INT
);

SELECT * FROM leaderboards;
 

--psql -U postgres
--\c leaderboad