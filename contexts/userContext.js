import React, { Component, createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
// export const UserContext = createContext();
// class UserContextProvider extends React.Component {
// 	constructor(props) {
// 		console.log('no')
// 		this.state = {

// 		}
// 	}
// 	storeUser = (user) => {

// 	}
	
//   const storeUser = (user) => {
//     setUser(user)
// 	}
// 	const userExists = () => {
// 		return !(Object.keys(user).length === 0 && user.constructor === Object)
// 	}
//   const logout = () => {
//     setUser({});
// 	}
// 	useEffect(() => {
// 		console.log('useEffect user', user)
// 	})
//   return (
//     <UserContext.Provider value={{ user, setUser, userExists }}>
//       {props.children}
//     </UserContext.Provider>
//   )
// }
// const UserContextProvider = (props) => {
//   const [ user, setUser ] = useState({});
//   const storeUser = (user) => {
//     setUser(user)
// 	}
// 	const userExists = () => {
// 		return !(Object.keys(user).length === 0 && user.constructor === Object)
// 	}
//   const logout = () => {
//     setUser({});
// 	}
// 	useEffect(() => {
// 		console.log('useEffect user', user)
// 	})
//   return (
//     <UserContext.Provider value={[ user, setUser, userExists ]}>
//       {props.children}
//     </UserContext.Provider>
//   )
// }


const UserContext = createContext();

export default UserContext;

// export default UserContextProvider;