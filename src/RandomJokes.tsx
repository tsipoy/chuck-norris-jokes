import React, { useContext, MouseEvent} from "react";
import {Context} from "./context/Context";
import Image from "./assets/chuck-norris-photo@2x.png";

type Props = {
    randomJokes?: string[]
    value?: string[]
    setRandomJokes?: React.Dispatch<React.SetStateAction<any>>
    firstName?: string
    setFirstName?: React.Dispatch<React.SetStateAction<any>>
    setCounter?: React.Dispatch<React.SetStateAction<any>>
    counter?: number
}

const RandomJokes: React.FC<Props> = () => {
    const {randomJokes, 
        setRandomJokes,
        firstName, 
        lastName, 
        setFirstName, 
        setLastName,
        counter, 
        setCounter 
    } = useContext(Context);

    const jokes = randomJokes.map((randomJoke) =><i key={randomJoke}>{randomJoke}</i>)
    const randoms = jokes[Math.floor(Math.random() * jokes.length)];


    const handleRandom = () => {
        setRandomJokes(jokes)
    }

    const handleIncreased = () => {
        setCounter(counter + 1)
        return false
    }

    const handleDecreased = () => { 
        if(counter > 0) {
            setCounter(counter - 1)
        }
        return false
    }

    return (
        <div className="Container">
            <img src={Image} alt="Random photo" />
            <div className="Joke-wrapper">
                <p>"{randoms}"</p>
            </div>
            <form>
                <select placeholder="Categories" className="Select">
                    <ul>
                        <option value="explicit">Explicite</option>
                        <option value="nerdy">Nerdy</option>
                    </ul>
                </select>
                <div className="Input_wrapper">
                    <input 
                        id="Input-label"
                        type="text"  
                        className="Input" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.currentTarget.value)} 
                    />
                    <label className="Input-label">Impersonate Chuck Norris</label>
                </div>
            </form>
            <button 
                type="button"
                className="Random-botton" 
                onClick={() => handleRandom()}
            >Draw a random Chuck Norris Joke</button>
            <div className="Save-jokes-wrapper">
                <div className="Counter-save-button">
                    <button type="button"
                        className="Couter-button-decreased" 
                        onClick={handleDecreased}
                    >-</button>
                    <span>{counter}</span>
                    <button 
                        type="button" 
                        className="Couter-button-increased" 
                        onClick={handleIncreased}>+</button>
                </div>
                <button className="Save-jokes-button">Save Jokes</button>
            </div>
        </div>

    )
}

export default RandomJokes;