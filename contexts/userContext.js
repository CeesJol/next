import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router'
export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [ user, setUser ] = useState({});
  const storeUser = user => {
      setUser({
        username: user.username,
      })
	}
	const userExists = () => {
		return !(Object.keys(user).length === 0 && user.constructor === Object)
	}
  const logout = () => {
    setUser({});
  }
  return (
    <UserContext.Provider value={{ user, storeUser, userExists }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContextProvider;