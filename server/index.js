const express = require('express')
const cors = require('cors')
const Groq = require("groq-sdk");
require("dotenv").config();

const axios = require('axios')
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const PORT = process.env.PORT || 3000;


const app = express();

app.use(cors());

app.listen(PORT, () => {
    console.log("server running on port 3000");
})




app.get('/roast', async (req, res) => {
  const username = req.query.username;

  try {

    const ql_response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `query getUserStats($username: String!, $year: Int!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            userCalendar(year: $year) {
              streak
              submissionCalendar
            }
          }
          userContestRanking(username: $username) {
            rating
          }
          recentSubmissionList(username: $username, limit: 1) {
            timestamp
          }
        }`,
        variables: {
          username: username,
          year: 2026
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com",
          "Origin": "https://leetcode.com"
        }
      }
    );

    const data = ql_response?.data?.data;

    if (!data || !data.matchedUser) {
      return res.json({ res: "User not found or profile is private" });
    }

    const stats = data?.matchedUser?.submitStats?.acSubmissionNum || [];

    const totalSolved = stats.find(s => s.difficulty === "All")?.count || 0;
    const easySolved = stats.find(s => s.difficulty === "Easy")?.count || 0;
    const mediumSolved = stats.find(s => s.difficulty === "Medium")?.count || 0;
    const hardSolved = stats.find(s => s.difficulty === "Hard")?.count || 0;

    const longestStreak = data?.matchedUser?.userCalendar?.streak || 0;

    const lastTimestamp = Number(data?.recentSubmissionList?.[0]?.timestamp || 0);

    const daysSinceLastSolved = lastTimestamp
      ? Math.floor((Date.now() / 1000 - lastTimestamp) / 86400)
      : -1;

    const contestRating = data?.userContestRanking?.rating || 0;

    const prompt = `
Roast this LeetCode user brutally using ONLY the stats below.

Stats:
Total solved: ${totalSolved}
Easy: ${easySolved}
Medium: ${mediumSolved}
Hard: ${hardSolved}
Longest streak: ${longestStreak}
Days since last solved: ${daysSinceLastSolved}
Contest rating: ${contestRating}

Rules:
- Dont mention the Days since last solved directly (only hint inactivity indirectly)
- Maximum 3 sentences.
- Be savage and sarcastic.
- Mention the numbers directly.
- Focus on imbalance (too many easy, too few hard, weak rating, short streak, etc.)
- If hard problems are low, mock it.
- If rating is average/low, mock it.
- If streak is small, mock consistency.
- Make it sound personal and insulting, not analytical.
- No explanations, no filler.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ res: response.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.json({ res: "Failed to fetch LeetCode stats" });
  }
}); 