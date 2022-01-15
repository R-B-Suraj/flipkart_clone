// to change the login button to username after successful log in we are using context and not just button replace 
// in header from parent component
// we need a context because we may need user login information in many parts of out app.
// whether use logged in or not etc... 

import { useState } from "react";
import { createContext } from "react";




export const LoginContext = createContext(null);

// we need to wrap the contextProvider on whichever component we want to use the context 
// so we need to destructure the children  components 
const Contextprovider = ({children})=>{
    const [account, setAccount] = useState('');
    

    return (
        <LoginContext.Provider
            value={{account,setAccount}}    
        >
            {children}
        </LoginContext.Provider>
    )
}


export default Contextprovider;