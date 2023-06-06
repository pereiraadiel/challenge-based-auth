"use client"
import styles from './page.module.css'
import { Header } from './components/header'
import { Button, FilledButton } from './components/button'
import { LabledSelect } from './components/select'
import { LabledInput } from './components/input'
import { SetContainer } from './components/setContainer'
import { SetGroup } from './components/setGroup'

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

export default function Home() {
  return (
    <main className={styles.main}>
     <Header/>
      {/* <div> */}
        {/* <FilledButton>Try to Authenticate</FilledButton>
        <Button>Register an Account</Button>

        <LabledInput label='Username' placeholder='Enter your username'/>
        <LabledSelect label='Authentication Strategy' placeholder='Select an Option'>
          <option>Select a strategy</option>
          <option>Numeric Set</option>
          <option>Word Set</option>
          <option>Emoji Set</option>
        </LabledSelect> */}
        <SetGroup>
          {setMock.map((item, index) => {
            const selected = index % 2 === 0
            return <>
              <SetContainer className={selected ? 'selected' : ''}>
                <p>primeira</p>
                <p>segunda</p>
                <p>terceira</p>
              </SetContainer>
            </>
          })}
        </SetGroup>
        <FilledButton>Authenticate</FilledButton>
      {/* </div> */}
     <p> {'<'}Developed by <a href='https://adiel.dev' target='_blank' rel='noreferrer noopener'>Adiel Pereira</a> {'/>'}</p>
    </main>
  )
}
