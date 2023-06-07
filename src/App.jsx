import { useState } from 'react';
import "./styles/style.css";
import CharacterCard from "./components/CharacterCard";
import HighScores from "./components/HighScores";
import Dropdown from './components/DropDown';
import Submit from "./components/Submit";
import data from "./placeholder/data.json";
import finn_img from "./placeholder/finn_new.png";
import rocko_img from "./placeholder/rocko_new.png";
import stan_img from "./placeholder/stan_new.png";

function App() {
  const [isViewModalActive, setIsViewScoreActive] = useState(false);
  const [isSubmitModalActive, setIsSubmitModalActive] = useState(false);
  
  function onViewHighScoreClick() {
    console.log('view high score.');
    setIsViewScoreActive(true);
  }

  function onSubmitHighScoreClick() {
    console.log('submit high score.');
    setIsSubmitModalActive(true);
  }

  return (
    <div className="has-background-white">
      <div className="columns m-0">
        {/* Menu Bar */}
        <div className="column is-one-fifth px-0 pt-0">
          {/* Logo */}
          <div className="has-text-centered p-4 pt-5">
            <p className="title is-5">Where&apos;s [Waldo]?</p>
            <p className="subtitle is-6 mb-2">Find the hidden characters!</p>
            <p className="is-size-7 mb-4">By Ray Allen Datuin 2023</p>
            <button className="button is-link" onClick={onViewHighScoreClick}>View High Scores</button>
            <button className="button is-success" onClick={onSubmitHighScoreClick}>Submit High Score</button>
            <p className="is-size-5">Score: <em>{20.12}s</em></p>
          </div>
          {/* Characters */}
          <p className="has-background-info-light py-5 has-text-centered">Directions: Find these {3} characters in the image:</p>
          <div className="container p-4">
            {
              data.hidden_objs.map((char) => <CharacterCard key={char.id} charData={char}/>)
            }
          </div>
        </div>
        {/* Wimmelbilder */}
        <div className="column p-0">
          <Dropdown/>
          <img src={data.wimmel_img} alt="A.D. 2.222 by Egor Klyuchnyk. A large collage of many characters from multiple pieces of media" className="pure-img p-0" />
        </div>
      </div>
      <HighScores isActive={isViewModalActive} setIsActive={setIsViewScoreActive}/>
      <Submit isActive={isSubmitModalActive} setIsActive={setIsSubmitModalActive}/>
    </div>
  )
}

export default App
