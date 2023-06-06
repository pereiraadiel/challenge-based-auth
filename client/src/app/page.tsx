"use client"
import styled from 'styled-components'
import { Button, FilledButton } from './components/button'
import { LabledSelect } from './components/select'
import { SetContainer } from './components/setContainer'
import Link from 'next/link'
import useLocalStorage from '../hooks/useLocalStorage'
import { useEffect, useState } from 'react'
import { User } from './contracts/user.contract'
import { useRouter } from 'next/navigation'

const AuthenticatedPage = () => {
  return (
    <>
      <div>
        <h2>Hello, Username!</h2>
        <p>Welcome to your home page</p>
      </div>

      <div>
        <p>That is your set of secrets words:</p>
        <SetContainer>
          <p>Okay</p>
          <p>Beleza</p>
          <p>Legal</p>
        </SetContainer>

        <Spacer/>

        <LabledSelect label="Change strategy?">
          <option>Select a new strategy</option>
          <option>Word Set</option>
          <option>Emoji Set</option>
          <option>Number Set</option>
        </LabledSelect>

        <FilledButton>Change your strategy</FilledButton>

        <Link href='/login' onClick={() => {console.warn('captured')}}>Sign Out</Link>
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
  const [storedUser, setStoredUser] = useLocalStorage<string>("@user", "");
  const [user, setUser] = useState<User>()
  
  useEffect(() => {
    if(!storedUser) return
    setUser(JSON.parse(storedUser))
  }, [storedUser])
  
  if(user && user.token)  return (
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
