import { pseudoRandomBytes } from "crypto";
import { type } from "os";
import React, { useContext } from "react";
import {Context} from "./context/Context";

type Props = {
    randomJokes?: string[]
}

const RandomJokes: React.FC<Props> = () => {
    const {randomJokes} = useContext(Context);  
    return (
        <div>
        <div>{randomJokes.map((randomJoke) => <p key={randomJoke}>{randomJoke}</p>)}</div>
            <form>
                <fieldset className="Select-wrapper">
                    <select placeholder="Categories">
                        <option value="null">Categories</option>
                    </select>
                </fieldset>
                <fieldset className="Input-wrapper">
                    <input type="text" placeholder="Input-label" />
                </fieldset>
            </form>
            <button className="Random-botton">Draw a random Chuck Norris Joke</button>
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