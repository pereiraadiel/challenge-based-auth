"use client"

import { useRouter } from "next/navigation"
import { Button, FilledButton } from "../../components/button"
import { LabledInput } from "../../components/input"
import { SetContainer } from "../../components/setContainer"
import { SetGroup } from "../../components/setGroup"
import useLocalStorage from "../../../hooks/useLocalStorage"
import { User } from "../../contracts/user.contract"
import { useEffect, useState } from "react"

const setMock = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

const ChallengePage: React.FC = () => {
  const router = useRouter();
  const [storedUser, setStoredUser] = useLocalStorage<string>("@user", "");
  const [user, setUser] = useState<User>()
  
  useEffect(() => {
    setUser(JSON.parse(storedUser))
  }, [storedUser])
  
  if(!user) {
    return <></>
  }

  const handleNavigateToHome = () => {
    router.push('/');
  };

  return (
    <>
      <div>
        <h2>Hello, {user.username}!</h2>
        <p>Select all the sets that contains at least one word of your secret word set</p>
      </div>
      <SetGroup>
        {
          setMock.map(item => {
            return (
              <>
                <SetContainer>
                  <p>word</p>
                  <p>world</p>
                  <p>okay</p>
                </SetContainer>
              </>
            )
          })
        }
      </SetGroup>
      <div>
        <FilledButton onClick={handleNavigateToHome}>Authenticate</FilledButton>
      </div>
    </>
  )
}

export default ChallengePage;
