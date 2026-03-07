import { useState, useRef } from "react";
import "./roastMe.css";
import axios from "axios";

const roasts = [
  "Your solution runs in O(n²) and so does your dating life. 💀",
  "You've been on Easy problems for 6 months. My grandma solves faster — she's been dead for 3 years. 🪦",
  "404: Talent Not Found. We searched everywhere. 🔍",
  "Your code passes 2/100 test cases. The other 98 are just embarrassed for you. 😬",
  "You googled 'what is a linked list' at midnight. The linked list cried. 📚",
  "Your GitHub contribution graph looks like a desert. A barren, hopeless desert. 🏜️",
  "You've attempted Two Sum 7 times and still got it wrong. That's not even the hard part. 🤦",
  "Your time complexity is worse than your time management. Both are O(disaster). ⏰",
  "Bro hit 'run code' and the server asked to be put on Do Not Disturb. 🔕",
  "Even your brute force solutions are too dumb to be called brute. 🧱",
];

export default function RoastMe() {
  const [username, setUsername] = useState("");
  const [roast, setRoast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const roastRef = useRef(null);

  const handleRoast = () => {
    if (!username.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    setRoast(null);
    setTimeout( async () => {
       const random = await axios.get('http://localhost:3000/roast', {
        params : {username : username}
      }); 
       
      
      //only have to make an axios request to the backend here
      // roasts[Math.floor(Math.random() * roasts.length)]

      setRoast(random.data.res);
      setLoading(false);
      setTimeout(() => roastRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRoast();
  };

  return (
    <div className="page">
      <div className="bg-glow" />
      <div className="bg-grid" />

      <div className="container">
        <div className="badge">🔥 leetcode roast engine</div>

        <h1 className="title">
          roast<span>Me</span>
        </h1>

        <p className="subtitle">// enter at your own risk</p>

        <div className="input-row">
          <input
            type="text"
            placeholder="enter leetcode username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className={shake ? "shake" : ""}
          />
          <button className="btn" onClick={handleRoast} disabled={loading}>
            {loading ? "..." : "ROAST"}
          </button>
        </div>

        {loading && (
          <div className="loading-bar">
            <div className="loading-bar-inner" />
          </div>
        )}

        {roast && (
          <div className="roast-card" ref={roastRef}>
            <div className="roast-label">Roast Report</div>
            <div className="roast-username">
              target: <span>@{username}</span>
            </div>
            <div className="roast-text">{roast}</div>
            <div className="roast-footer">
              <span className="severity">severity: catastrophic</span>
              <button className="retry-btn" onClick={handleRoast}>
                roast again →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}