import React, { useContext } from "react";
import {Context} from "./context/Context";
import Image from "./assets/chuck-norris-photo@2x.png";

type Props = {
    randomJokes?: string[]
    value?: string[]
    setRandomJokes?: React.Dispatch<React.SetStateAction<any>>
}

const RandomJokes: React.FC<Props> = () => {
    const {randomJokes, setRandomJokes} = useContext(Context);
    const jokes = randomJokes.map((randomJoke) =><i key={randomJoke}>{randomJoke}</i>)
    const randoms = jokes[Math.floor(Math.random() * jokes.length)];

    const handleRandom = () => {
        setRandomJokes(jokes)
    }
    return (
        <div>
            <img src={Image} alt="random-photo" />
            <div>{randoms}</div>
            <form>
                <select placeholder="Categories" className="Select">
                    <option value="null">Categories</option>
                </select>
                <input type="text" placeholder="Impersonate Chuck Norris" className="Input" />
            </form>
            <button className="Random-botton" onClick={handleRandom}>Draw a random Chuck Norris Joke</button>
            <div className="Save-jokes-wrapper">
                <div className="Counter-save-button">
                    <button className="Couter-button-decreased">-</button>
                    <span>0</span>
                    <button className="Couter-button-increased">+</button>
                </div>
                <button className="Save-jokes-button">Save Jokes</button>
            </div>
        </div>

    )
}

export default RandomJokes;