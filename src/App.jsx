import "./styles/style.css";
import CharacterCard from "./components/CharacterCard";
import HighScores from "./components/HighScores";
import Submit from "./components/Submit";
import wimm_img from "./placeholder/rp5nr2zzvio31.jpg";
import finn_img from "./placeholder/finn_new.png";
import rocko_img from "./placeholder/rocko_new.png";
import stan_img from "./placeholder/stan_new.png";

function App() {
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
            <button className="button is-link">View High Scores</button>
            <button className="button is-success">Submit High Score</button>
          </div>
          {/* Characters */}
          <p className="has-background-info-light py-5 has-text-centered">Directions: Find these {3} characters in the image:</p>
          <div className="container p-4">
            <CharacterCard charData={{name: "Finn", img: finn_img, origin: "Adventure Time"}}/>
            <CharacterCard charData={{name: "Rocko", img: rocko_img, origin: "Rocko's Modern Life"}}/>
            <CharacterCard charData={{name: "Grunkle Stan", img: stan_img, origin: "Gravity Falls"}}/>
          </div>
        </div>
        {/* Wimmelbilder */}
        <div className="column p-0">
          <img src={wimm_img} alt="A.D. 2.222 by Egor Klyuchnyk. A large collage of many characters from multiple pieces of media" className="pure-img p-0" />
        </div>
      </div>
      <HighScores/>
      <Submit/>
    </div>
  )
}

export default App
