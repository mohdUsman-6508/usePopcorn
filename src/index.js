import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import StarRating from "./StarRating";

// function Test() {
//   const [times, setTimes] = useState(0);
//   return (
//     <div>
//       <StarRating setState={setTimes} />
//       <p>This is the game of perseverence,Love you {times} times.</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/*   
    <StarRating
      maxRating={3}
      color="yellow"
      ratingDefault={0}
      messages={["terrible", "bad", "ok", "good", "amazing"]}
    />
    <Test /> */}
  </React.StrictMode>
);
