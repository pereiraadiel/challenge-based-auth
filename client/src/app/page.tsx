"use client"
import styled from 'styled-components'
import { Button, FilledButton } from './components/button'
import { LabledSelect } from './components/select'
import { SetContainer } from './components/setContainer'
import Link from 'next/link'
import useLocalStorage from '../hooks/useLocalStorage'
import { User } from './contracts/user.contract'
import { useRouter } from 'next/navigation'
import { api } from '../utils/api.util'
import { AuthStrategies, AuthStrategy } from '../enums/authStrategy.enum'

import { useState, useEffect, useMemo } from 'react';

const AuthenticatedPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<User>();
  const [storedUser, setStoredUser] = useLocalStorage<string>("@user", "");
  const [storedToken, setStoredToken] = useLocalStorage<string>("@token", "");
  const [strategy, setStrategy] = useState<AuthStrategy>(AuthStrategies.WordSet)
  

  const handleUpdateUser = async () => {
    const data = await api.updateUser(storedToken, 'username', strategy)
    setStoredToken(data)
    setUser(undefined)
    fetchUser()
  }

  const handleLogout = () => {
    localStorage.removeItem("@user");
    localStorage.removeItem("@token");
    router.push('/')
  }

  const fetchUser = async () => {
    const data = await api.getUser(storedToken, 'username');
    setUser(data);
    setStoredUser(JSON.stringify(data))
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  const loading = useMemo(() => {
    return !user;
  }, [user]);

  if (!user) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div>
        <h2>Hello, {user.username}!</h2>
        <p>Welcome to your home page</p>
      </div>

      <div>
        <p>That is your set of secrets...<br/>you will need it  to authenticate</p>
        <SetContainer>
          {user.authSet.map((item: any) => {
            console.warn(item)
            if(typeof item === 'string') {
              return (
                <p key={item}>{item}</p>
              )
            }
            else if(item?.word !== undefined) {
              return (
                <p key={item.id}>{item.word}</p>
              )
            }
            return (
              <img key={item.id} src={item.link} alt={item.id}/>
            )
          })}
        </SetContainer>

        <Spacer/>

        <LabledSelect label="Change strategy?" onChange={e => setStrategy(e.target.value as AuthStrategy)}>
          <option value={AuthStrategies.WordSet}>Select a new strategy</option>
          <option value={AuthStrategies.WordSet}>Word Set</option>
          <option value={AuthStrategies.ImageSet}>Emoji Set</option>
          <option value={AuthStrategies.Math}>Number Set</option>
        </LabledSelect>

        <FilledButton onClick={handleUpdateUser}>Change your strategy</FilledButton>

        <Link href='#' onClick={handleLogout}>Sign Out</Link>
      </div>
    </>
  )
}


const PublicPage = () => {
  const router = useRouter();
  const handleNavigateToLogin = () => {
    router.push('/login');
  };
  const handleNavigateToRegister = () => {
    router.push('/register');
  };

  return (
    <>
      <div>
        <p>
          This is a proof-of-concept on authentication using emojis/words/number sets,
          where the user needs to select from multiple sets of emojis/words/numbers, 
          those that contain at least one element from the user set
        </p>
      </div>
      <div>
        <FilledButton onClick={handleNavigateToLogin}>Try to Authenticate</FilledButton>
        <Button onClick={handleNavigateToRegister}>Register an Account</Button>
      </div>
    </>
  )
}

const Spacer = styled.div`
  margin: 4rem 0;
`;


export default function HomePage() {
  const [storedToken, setStoredToken] = useLocalStorage<string>("@token", "");

  if(storedToken)  return (
    <>
      <AuthenticatedPage/>
    </>
  )

  return (
    <>
      <PublicPage/>
    </>
  )
}
