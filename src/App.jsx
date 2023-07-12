import { useState, useEffect, useRef } from 'react';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from './firebase';
import "./styles/style.css";
import CharacterCard from "./components/CharacterCard";
import HighScores from "./components/HighScores";
import Dropdown from './components/DropDown';
import Submit from "./components/Submit";

function App() {
  const [isViewModalActive, setIsViewScoreActive] = useState(false);
  const [isSubmitModalActive, setIsSubmitModalActive] = useState(false);
  const [isCharModalActive, setIsCharModalActive] = useState(false);
  const [clickLocation, setClickLocation] = useState({x: 0, y:0});
  const [clickedCoords, setClickedCoords] = useState({x: 0, y:0});
  const [isShifted, setIsShifted] = useState(false);
  const [isBottomShifted, setIsBottomShifted] = useState(false);
  const [wimmelImgPath, setWimmelImgPath] = useState(null);
  const [characterData, setCharacterData] = useState([]);
  const [timeScore, setTimeScore] = useState(0.0);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [userName, setUserName] = useState('Anonymous');
  const [userScoreId, setUseScoreId] = useState('');
  const [highScoreList, setHighScoreList] = useState([]);
  const imageRef = useRef(null);

  useEffect(() => {
    // Load wimmel img path
    (async () => {
      const docRef = doc(db, "ad2222", "wimmelbilder");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWimmelImgPath(docSnap.data().image_path);
      }
    })();

    (async() => {
      const querySnapshot = await getDocs(collection(db, "ad2222_chars"));
      const fetchedChars = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const newChar = {
          id: doc.id,
          name: docData.name,
          img: docData.img_path,
          origin: docData.origin,
          hitbox: {x: docData.x, y: docData.y, w: docData.w, h: docData.h},
          isFound: false
        }
        fetchedChars.push(newChar);
      });
      setCharacterData(fetchedChars);

      // Get high scores
      fetchHighScores()
    })();
  }, [])

  useEffect(() => {
    // Set timer
    let timer = null; 

    if (gameInProgress) {
      timer = setInterval(() => {
        setTimeScore((prevSeconds) => prevSeconds + 0.01);
      }, 10);
    }

    return () => {
      clearInterval(timer);
    }
  }, [gameInProgress]);

  function checkClickedCharacter(id) {
    const charIndex = characterData.findIndex(char => char.id === id);
    if (isInHitBox(clickedCoords, characterData[charIndex].hitbox)) {
      alert('Correct!');
      characterData[charIndex].isFound = true;
      if (characterData.every(char => char.isFound)) {
        alert('You win!');
        setGameInProgress(false);
        setIsSubmitModalActive(true);
      }
    }
    else {
      alert('Try again.');
    }
    setIsCharModalActive(false);
  }

  function isInHitBox(coordinate, hitbox) {
    const xDist = Math.abs(coordinate.x - hitbox.x);
    const yDist = Math.abs(coordinate.y - hitbox.y);

    if (xDist < hitbox.w && yDist < hitbox.h) {
      return true;
    }

    return false;
  }

  function onViewHighScoreClick() {
    console.log('view high score.');
    setIsViewScoreActive(true);
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

  if (!wimmelImgPath || characterData.length === 0) {
    return (
      <p>Loading...</p>
    )
  }

  async function fetchHighScores() {
    const querySnapshot = await getDocs(collection(db, "high_scores"));
    const fetchedScores = [];
    querySnapshot.forEach((doc) => {
        const scoreItem = {
            id: doc.id,
            scoreName: doc.data().name,
            scoreTime: doc.data().score,
            scoreDate: new Date(doc.data().submissionDate.seconds * 1000 + doc.data().submissionDate.nanoseconds/1000000)
        }
        fetchedScores.push(scoreItem);
    });
    // Sort high score list
    fetchedScores.sort((a, b) => (a.scoreTime > b.scoreTime) ? 1 : -1);
    setHighScoreList(fetchedScores);
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
            <p className="is-size-7 mb-2">By Ray Allen Datuin 2023</p>
            <p className="is-size-6 mb-4"><strong>A.D. 2.222</strong> by Egor Klyuchnyk</p>
            <button className="button is-link" onClick={onViewHighScoreClick}>View High Scores</button>
            {(!gameInProgress && !scoreSubmitted) ? <button className="button is-success" onClick={() => setIsSubmitModalActive(true)}>Submit High Score</button> : null}
            <p className="is-size-5">Score: <strong>{timeScore.toFixed(2)}s</strong></p>
            {gameInProgress ? null : <p>Name: {userName}</p>}
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
          <Dropdown charData={characterData} isActive={isCharModalActive} setIsActive={setIsCharModalActive} clickLoc={clickLocation} isShifted={isShifted} isBottomShift={isBottomShifted} checkFn={checkClickedCharacter}/>
          <img 
            src={wimmelImgPath} 
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
      <HighScores isActive={isViewModalActive} setIsActive={setIsViewScoreActive} scores={highScoreList} userScoreId={userScoreId}/>
      <Submit isActive={isSubmitModalActive} setIsActive={setIsSubmitModalActive} timeScore={timeScore} userName={userName} userNameFn={setUserName} scoreSubmittedFn={setScoreSubmitted} scoreFetchFn={fetchHighScores} setViewActiveFn={setIsViewScoreActive} setScoreidFn={setUseScoreId} highScoreList={highScoreList}/>
    </div>
  )
}

export default App
