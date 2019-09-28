import axios from "axios";

const url = "http://localhost:8000/api/scores/";

class ScoreService {
  //Get Scores
  static getScores() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(score => ({
            ...score,
            createdAt: new Date(score.createdAt)
          }))
        );
        console.log("resolved!");
      } catch (err) {
        reject(err);
        console.log("error!");
      }
    });
  }

  // Create Score
  static insertScore(text) {
    return axios.post(url, {
      text
    });
  }

  // Delete Score
  static deleteScore(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default ScoreService;
