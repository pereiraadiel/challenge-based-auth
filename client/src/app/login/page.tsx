"use client"

import { useRouter } from "next/navigation";
import { FilledButton } from "../components/button";
import { LabledInput } from "../components/input";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { User } from "../contracts/user.contract";
import { AuthStrategies } from "../../enums/authStrategy.enum";

const LoginPageWrapper: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>()
  const [_, setStoredUser] = useLocalStorage<string>("@user", "");
  const [username, setUsername] = useState('');

  const handleNavigateToChallenge = () => {
    if(!user) return
    setStoredUser(JSON.stringify(user))
    router.push('/login/challenge');
  };

  useEffect(() => {
    setUser({
      username,
      authSet: [],
      authStrategy: AuthStrategies.WordSet
    })
    console.warn(username)
  }, [username])


  return (
    <LoginPage username={username} setUsername={setUsername} handleNavigateToChallenge={handleNavigateToChallenge} />
  );
};

interface LoginPageProps {
  username: string;
  setUsername: (username: string) => void;
  handleNavigateToChallenge: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ username, setUsername, handleNavigateToChallenge }) => {
  return (
    <>
      <div>
        <LabledInput label="Username" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
        <FilledButton onClick={handleNavigateToChallenge}>Continue</FilledButton>
      </div>
    </>
  );
};

export default LoginPageWrapper;
