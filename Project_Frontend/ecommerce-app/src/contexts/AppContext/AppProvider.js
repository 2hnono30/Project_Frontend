import React, { useReducer } from 'react'
import AppContext from './index'
import { initState,reducer } from './appReducer'

function AppProvider({children}) {
    const [state,dispatch] = useReducer(reducer,initState)
  return (
    <AppContext.Provider value={[state,dispatch]}>
            {children}
    </AppContext.Provider>
  )
}

export default AppProvider