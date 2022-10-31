const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/leaders", async (req, res) => {
  try {
    const boards = await pool.query("SELECT * FROM leaderboards");
    res.json(boards.rows);
  } catch (error) {
    console.warn(error.message);
  }
});

app.get("/leaders/:game", async (req, res) => {
  try {
    const { game } = req.params;

    const boardGame = await pool.query(
      "SELECT * FROM leaderboards WHERE game = $1 ORDER BY score DESC",
      [game]
    );
    res.json(boardGame.rows);
  } catch (error) {
    console.warn(error.message);
  }
});

app.post("/leaders/:game", async (req, res) => {
  try {
    const { game } = req.params;
    const { player, score } = req.body;

    const board = await pool.query(
      "INSERT INTO leaderboards(game, player, score) VALUES($1, $2, $3) RETURNING *",
      [game, player, score]
    );

    const del = await pool.query(
      "DELETE FROM leaderboards WHERE game = $1 AND board_id NOT IN (SELECT board_id FROM leaderboards WHERE game = $1 ORDER BY score DESC limit $2)",
      [game, 5]
    );

    return res.json(board.rows[0]);
  } catch (error) {
    console.warn(error.message);
  }
});

app.listen(PORT, () => {
  console.log("server running...");
});
