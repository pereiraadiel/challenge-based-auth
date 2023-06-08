"use client"
import { useRouter } from 'next/navigation';

import { FilledButton } from "../components/button"
import { LabledInput } from "../components/input"
import { LabledSelect } from "../components/select"
import { useState } from 'react';
import { AuthStrategies, AuthStrategy } from '../../enums/authStrategy.enum';
import { api } from '../../utils/api.util';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function RegisterPage() {
  const router = useRouter()
  const [userInput, setUserInput] = useState('')
  const [userSetInput, setUserSetInput] = useState<AuthStrategy>(AuthStrategies.WordSet)
  const [storedToken, setStoredToken] = useLocalStorage<string>("@token", "");

  const handleSubmit = async () => {
    const token = await api.createUser(userInput, userSetInput)
    setStoredToken(token)
    router.push('/');
  };

  console.warn(userInput, 'userInput')
  console.warn(userSetInput, 'userSetInput')

  return (
    <>
      <div>
        <LabledInput 
          label="Username" 
          placeholder="Enter a unique username"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <LabledSelect label="Authentication Strategy" onChange={e => setUserSetInput(e.target.value as AuthStrategy)}>
          <option value={AuthStrategies.WordSet}>Select a new strategy</option>
          <option value={AuthStrategies.WordSet}>Word Set</option>
          <option value={AuthStrategies.ImageSet}>Emoji Set</option>
          <option value={AuthStrategies.Math}>Number Set</option>
        </LabledSelect>
        <FilledButton onClick={handleSubmit}>Register Account</FilledButton>
      </div>
      <div>
        <p>
          Note: Accounts are not resilient because this app is only a proof of concept {'\n'} 
          created to learn about the technologies involved like <strong>redis</strong> and <strong>reactjs</strong>
        </p>
      </div>
    </>
  )
}
