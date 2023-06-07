"use client"

import { useRouter } from "next/navigation"
import { Button, FilledButton } from "../../components/button"
import { LabledInput } from "../../components/input"
import { SetContainer } from "../../components/setContainer"
import { SetGroup } from "../../components/setGroup"
import useLocalStorage from "../../../hooks/useLocalStorage"
import { User, UserSet } from "../../contracts/user.contract"
import { useEffect, useState } from "react"
import { api } from "../../../utils/api.util"

const ChallengePage: React.FC = () => {
  const router = useRouter();
  const [storedUser, setStoredUser] = useLocalStorage<string>("@user", "");
  const [user, setUser] = useState<User>()
  const [userSet, setUserSet] = useState<UserSet>()
  
  useEffect(() => {
    if(!storedUser) router.back()
    setUser(JSON.parse(storedUser))
  }, [storedUser])
  

  const fetchUserSet = async () => {
    const data = user ? await api.getAuthenticationUserSet(user?.username) : undefined;
    setUserSet(data);
  };

  useEffect(() => {
    if (!userSet) {
      fetchUserSet();
    }
  }, [userSet, user]);

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
          userSet?.set.map(({item, id}: any) => {
            console.warn('set...', item)
            console.warn(Object.keys(item))
            return (
              <>
                <SetContainer key={id}>
                  {item.map((value: any) => {
                    console.warn(value, 'value')
                    if(typeof value === 'string') {
                      return <p key={value}>{value}</p>
                    }
                    if(value.link !== undefined) {
                      return <img key={value.id} src={value.link} alt={value.id}/>
                    }
                    return <p key={value.id}>{value.word}</p>
                  })}
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
