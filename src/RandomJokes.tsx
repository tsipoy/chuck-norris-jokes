import React, { useContext, useEffect} from "react";
import {Context} from "./context/Context";
import photo from "./assets/chuck-norris-photo@2x.png";
import randomPhoto from "./assets/random-photo.png";


type Props = {
    randomJokes?: string[]
    value?: string[]
    setRandomJokes?: React.Dispatch<React.SetStateAction<any>>
    firstName?: string
    setName?: React.Dispatch<React.SetStateAction<any>>
    setCounter?: React.Dispatch<React.SetStateAction<any>>
    counter?: number
    categories?: string[]
}

const RandomJokes: React.FC<Props> = () => {
    const {
        randomJokes, 
        setRandomJokes,
        name,
        setName, 
        counter, 
        setCounter,
        getRandomJokes,
        getCategoriesValue,
        categories,
        setCategories
    } = useContext(Context);

    const joke = randomJokes[0]

    const handleRandom = () => {
        const [firstName, lastName] = name.split(' ');
        getRandomJokes(firstName, lastName)
    }

    const handleIncreased = () => {
        setCounter(counter + 1)
    }

    const handleDecreased = () => { 
        if(counter > 0) {
            setCounter(counter - 1)
        }
    }
    
    useEffect(() => {
        getRandomJokes();
        getCategoriesValue();
    },[])

    return (
        <div className="Container">
            <img src={photo} alt="Random photo" />
            <div className="Joke-wrapper">
                <p>"{joke}"</p>
            </div>
            <form>
                <select className="Select">
                    <option value="null" className="Category">Select category</option>
                    {categories}
                </select>
                <div className="Input_wrapper">
                    <input 
                        id="Input-label"
                        type="text"  
                        className="Input" 
                        value={name} 
                        onChange={(e) => setName(e.currentTarget.value)} 
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