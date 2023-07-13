import "./App.css";
import { useState } from "react";

function App() {
  const [giphyData, setGiphyData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [weirdness, setWeirdness] = useState(1);

  const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

  const handleTranslate = () => {
    if (inputValue === "") {
      alert("Please enter something then I can translate!");
      return;
    }
    fetch(
      `https://api.giphy.com/v1/gifs/translate?s=${inputValue}&weirdness=${weirdness}&api_key=${GIPHY_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setGiphyData([res.data.images.original.url]));
  };

  const handleSearch = () => {
    if (inputValue === "") {
      alert("Please enter something then I can translate!");
      return;
    }
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${inputValue}&limit=20&api_key=${GIPHY_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) =>
        setGiphyData(res.data.map((item) => item.images.original.url))
      );
  };

  return (
    <div className="App">
      <h1>Giphy Translate</h1>
      <h5>
        Make your online conversations and expressions more fun, lively, and
        engaging. Add a touch of humor, or simply enhance your message, I've got
        you covered!
      </h5>
      <div className="form">
        <input
          type="text"
          placeholder="Type some message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <label>weirdness:</label>
        <select
          name="weirdness"
          value={weirdness}
          onChange={(e) => setWeirdness(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button onClick={handleTranslate}>Get Perfect GIF</button>
        <button onClick={handleSearch}>Get a Bundle</button>
      </div>

      {giphyData.map((item) => (
        <img src={item} alt="" />
      ))}
    </div>
  );
}

export default App;
