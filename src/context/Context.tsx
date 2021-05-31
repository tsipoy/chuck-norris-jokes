import React, {createContext, useEffect, useState} from "react";

export type ContextType = {
    randomJokes:string[];
    setRandomJokes: React.Dispatch<React.SetStateAction<any>>
}

const contextDefault: ContextType = {
    randomJokes: [],
    setRandomJokes: () => {}
}

export const Context = createContext<ContextType>(contextDefault);
const ContextProvider: React.FC = ({ children }) => {
    const [randomJokes, setRandomJokes] = useState<string[]>([])
    const getRandomJokes = async () => {
        try {
            const response = await fetch('http://api.icndb.com/jokes/random/30');
            const {value} = await response.json() as {value: {joke:string}[]}
            const jokes = value.map((jokeData) => jokeData.joke)
            setRandomJokes(jokes)
        } catch(e) {
            return e
        }
    }
    
    useEffect(() => {
        getRandomJokes()
    },[])

    return (
        <Context.Provider value={{ randomJokes, setRandomJokes }}>
            {children}
        </Context.Provider>
        )
}

export default ContextProvider