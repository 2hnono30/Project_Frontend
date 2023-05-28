import { createContext } from "react";
import { initState } from "./appReducer";


const AppContext = createContext(initState);

export default AppContext;