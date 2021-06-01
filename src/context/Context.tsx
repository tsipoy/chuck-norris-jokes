import { stringify } from "querystring";
import React, {createContext, useEffect, useState} from "react";

export type ContextType = {
    randomJokes:string[];
    setRandomJokes: React.Dispatch<React.SetStateAction<any>>
    firstName: string;
    lastName: string;
    setFirstName: React.Dispatch<React.SetStateAction<any>>;
    setLastName: React.Dispatch<React.SetStateAction<any>>;
    setCounter: React.Dispatch<React.SetStateAction<any>>;
    counter: number;
}

const contextDefault: ContextType = {
    randomJokes: [],
    setRandomJokes: () => {},
    // categories: '',
    firstName: "",
    lastName: "",
    setFirstName: () => {},
    setLastName: () => {},
    setCounter: () => {},
    counter: 0,
}

export const Context = createContext<ContextType>(contextDefault);
const ContextProvider: React.FC = ({ children }) => {

    const [randomJokes, setRandomJokes] = useState<string[]>([])
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [counter, setCounter] = useState<number>(0)

    const getRandomJokes = async () => {
        try {
            // Fetch jokes value
            const response = await fetch(`http://api.icndb.com/jokes/random/30?firstName=${firstName}&lastName=${lastName}`);
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
        <Context.Provider value={{ 
            randomJokes, 
            setRandomJokes, 
            firstName, 
            lastName, 
            setFirstName, 
            setLastName,
            counter, 
            setCounter 
            }}
        >
            {children}
        </Context.Provider>
        )
}

export default ContextProvider