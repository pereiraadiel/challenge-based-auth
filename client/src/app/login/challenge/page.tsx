"use client"

import { useRouter } from "next/navigation"
import { FilledButton } from "../../components/button"
import { SetContainer } from "../../components/setContainer"
import { SetGroup } from "../../components/setGroup"
import useLocalStorage from "../../../hooks/useLocalStorage"
import { User, UserSet } from "../../contracts/user.contract"
import { useEffect, useState } from "react"
import { api } from "../../../utils/api.util"

const ChallengePage: React.FC = () => {
  const router = useRouter();
  const [storedUser, setStoredUser] = useLocalStorage<string>("@user", "");
  const [storedToken, setStoredToken] = useLocalStorage<string>("@token", "");
  const [user, setUser] = useState<User>()
  const [userAuthSet, setUserAuthSet] = useState<UserSet>()
  const [selectedSetIds, setSelectedSetIds] = useState<string[]>([])
  
  useEffect(() => {
    if(!storedUser) router.back()
    setUser(JSON.parse(storedUser))
  }, [storedUser])
  

  const fetchUserAuthSet = async () => {
    const data =await api.getAuthenticationUserSet(user?.username as any);
    if(!data) {
      router.back()
    }
    setUserAuthSet(data);
  };

  useEffect(() => {
    if (!userAuthSet) {
      fetchUserAuthSet();
    }
  }, [userAuthSet, user]);

  if(!user) {
    // router.back()
    return <></>
  }

  const handleAuthenticate = () => {
    if(!userAuthSet) return
    let secret = ''
    userAuthSet.set.forEach(({ item, id}: any) => {
      if(selectedSetIds.includes(id)) {
        secret += id
      }
    })
    if(!secret) return

    secret = Buffer.from(secret).toString('base64')

    api.authenticateUser(user.username, secret).then((token) => {
      setStoredToken(token)
      router.push('/');
    }).catch(() => {
      fetchUserAuthSet()
    })
  };

  const handleSelectSet = (id: string) => {
    const oldSelection = selectedSetIds
    const index = oldSelection.findIndex(item => item === id)
    if(index < 0) {
      setSelectedSetIds([...oldSelection, id])
      return
    }
    setSelectedSetIds(oldSelection.filter(item => item !== id))
  }

  return (
    <>
      <div>
        <h2>Hello, {user.username}!</h2>
        <p>Select all the sets that contains at least one word of your secret word set</p>
      </div>
      <SetGroup>
        {
          userAuthSet?.set.map(({item, id}: any) => {
            return (
              <>
                <SetContainer key={id} onClick={() => handleSelectSet(id)} className={selectedSetIds.includes(id) ? 'selected' : ''} >
                  {item.map((value: any) => {
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
        <FilledButton onClick={handleAuthenticate}>Authenticate</FilledButton>
      </div>
    </>
  )
}

export default ChallengePage;
