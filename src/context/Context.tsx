import { stringify } from "querystring";
import React, {createContext, useState} from "react";

export type ContextType = {
    randomJokes:string[]
    setRandomJokes: React.Dispatch<React.SetStateAction<any>>
    name: string
    setName: React.Dispatch<React.SetStateAction<any>>
    setCounter: React.Dispatch<React.SetStateAction<any>>
    counter: number;
    getRandomJokes: (
        firstName?: string, 
        lastName?: string, 
        number?: number, 
    ) => Promise<any>
    getCategoriesValue: (
        categories?: string[]
    ) => Promise<any>
    categories?: string[]
    setCategories?:React.Dispatch<React.SetStateAction<any>>
}

const contextDefault: ContextType = {
    randomJokes: [],
    setRandomJokes: () => {},
    name: "",
    setName: () => {},
    setCounter: () => {},
    counter: 0,
    getRandomJokes: () => Promise.resolve(),
    getCategoriesValue: () => Promise.resolve(),
    categories: [],
    setCategories: () => {}
}

export const Context = createContext<ContextType>(contextDefault);
const ContextProvider: React.FC = ({ children }) => {
    
    const [randomJokes, setRandomJokes] = useState<string[]>([])
    const [name, setName] = useState<string>('')
    const [counter, setCounter] = useState<number>(0)
    const [categories, setCategories] = useState<string[]>([])

    // Fetch jokes value
    const getRandomJokes = async (firstName: string='Chuck', lastName: string='Norris', number: number=1, categories: string[]=[]) => {
        try {
            const url = `http://api.icndb.com/jokes/random/${number}?firstName=${firstName}&lastName=${lastName}`;
            const response = await fetch(url);
            const {value} = await response.json() as {value: {joke:string}[]}
            const jokes = value.map((jokeData) => jokeData.joke)
            setRandomJokes(jokes)
        } catch(e) {
            return e
        }
    }

    //Fetch category value
    const getCategoriesValue = async () => {
        try {
            const categoriesUrl = 'http://api.icndb.com/categories';
            const res = await fetch(categoriesUrl);
            const {value} = await res.json();
            const values = value.map((category: any, key: any) => <option value={category} key={category}>{category}</option>)
            setCategories(values)
        } catch(e) {
            return e
        } 
    }

    return (
        <Context.Provider value={{ 
            randomJokes, 
            setRandomJokes, 
            name, 
            setName,
            counter, 
            setCounter,
            getRandomJokes,
            getCategoriesValue,
            categories,
            setCategories,
            }}
        >
            {children}
        </Context.Provider>
        )
}

export default ContextProvider