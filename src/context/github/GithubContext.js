import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const initialState = {
    users: [],
    user: {}, //User Object von Github
    repos: [],
    loading: false
}

const GithubContext = createContext(initialState)

//Global State
export const GithubProvider = ({children}) => {   
    const [state, dispatch] = useReducer(githubReducer, initialState)    

    return <GithubContext.Provider value={{
        ...state, //einzelne Objekte im State sind zugreifbar
        dispatch
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext