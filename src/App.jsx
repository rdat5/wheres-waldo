import { useState, useEffect, useRef } from 'react';
import "./styles/style.css";
import CharacterCard from "./components/CharacterCard";
import HighScores from "./components/HighScores";
import Dropdown from './components/DropDown';
import Submit from "./components/Submit";
import data from "./placeholder/data.json";

function App() {
  const [isViewModalActive, setIsViewScoreActive] = useState(false);
  const [isSubmitModalActive, setIsSubmitModalActive] = useState(false);
  const [isCharModalActive, setIsCharModalActive] = useState(false);
  const [clickLocation, setClickLocation] = useState({x: 0, y:0});
  const [clickedCoords, setClickedCoords] = useState({x: 0, y:0});
  const [isShifted, setIsShifted] = useState(false);
  const [isBottomShifted, setIsBottomShifted] = useState(false);
  const [characterData, setCharacterData] = useState([]);
  const imageRef = useRef(null);

  useEffect(() => {
    // Load characters
    const newCharData = data.hidden_objs.map(char => (
        {
          id: char.id,
          name: char.name,
          img: char.img,
          origin: char.origin,
          hitbox: char.hitbox,
          isFound: false
        }
      ));
    setCharacterData(newCharData);
  }, [])

  function onViewHighScoreClick() {
    console.log('view high score.');
    setIsViewScoreActive(true);
  }

  function onSubmitHighScoreClick() {
    console.log('submit high score.');
    setIsSubmitModalActive(true);
  }

  function isRightHalf(elem, clickLocX) {
    const {left, width} = elem.getBoundingClientRect();
    const imageCenter = left + width / 2;

    if (clickLocX < imageCenter) {
      return false;
    }

    return true;
  }

  function isBottomHalf(elem, clickLocY) {
    const {top, height} = elem.getBoundingClientRect();
    const imageCenter = top + height / 2;

    if (clickLocY < imageCenter) {
      return false;
    }

    return true;
  }

  function getCoordinates(elem, e) {
    const rect = elem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = Number((x / rect.width).toPrecision(3));
    const normalizedY = Number((y / rect.height).toPrecision(3));

    return {x: normalizedX, y: normalizedY};
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
              characterData.map((char) => <CharacterCard key={char.id} charData={char}/>)
            }
          </div>
        </div>
        {/* Wimmelbilder */}
        <div className="column p-0">
          <Dropdown charData={characterData} isActive={isCharModalActive} setIsActive={setIsCharModalActive} clickLoc={clickLocation} isShifted={isShifted} isBottomShift={isBottomShifted}/>
          <img 
            src={data.wimmel_img} 
            ref={imageRef}
            alt="A.D. 2.222 by Egor Klyuchnyk. A large collage of many characters from multiple pieces of media" 
            className="pure-img p-0" 
            onClick={(e) => {
              if (imageRef.current) {
                  setIsCharModalActive(!isCharModalActive);
                  setClickLocation({x: e.pageX, y:e.pageY});
                  setClickedCoords(getCoordinates(imageRef.current, e));
                  setIsShifted(isRightHalf(imageRef.current, e.pageX));
                  setIsBottomShifted(isBottomHalf(imageRef.current, e.pageY));
                }
              }
            }/>
        </div>
      </div>
      <HighScores isActive={isViewModalActive} setIsActive={setIsViewScoreActive}/>
      <Submit isActive={isSubmitModalActive} setIsActive={setIsSubmitModalActive}/>
    </div>
  )
}

export default App
