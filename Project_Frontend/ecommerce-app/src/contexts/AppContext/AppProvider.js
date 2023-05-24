import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import AppContext from './index';
import { initState, reducer } from './appReducer';


function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const mapRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);
  return (
    <AppContext.Provider value={[state, dispatch,mapRef, containerRef]}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;