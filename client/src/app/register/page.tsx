"use client"
import { useRouter } from 'next/navigation';

import { FilledButton } from "../components/button"
import { LabledInput } from "../components/input"
import { LabledSelect } from "../components/select"

export default function RegisterPage() {
  const router = useRouter()
  return (
    <>
      <div>
        <LabledInput label="Username" placeholder="Enter a unique username"/>
        <LabledSelect label="Authentication Strategy">
          <option>Select an auth strategy</option>
          <option>Word Set</option>
          <option>Emoji Set</option>
          <option>Number Set</option>
        </LabledSelect>
        <FilledButton>Register Account</FilledButton>
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
