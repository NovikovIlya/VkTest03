import { useState } from 'react'
import './App.css'
import { Button, Flex, Input  } from 'antd';

const { TextArea } = Input;

function App() {
  
  const fetch =async()=>{

  }
  return (
    <>
      <Button onClick={fetch} type="primary">Получить факт!</Button>
      <textarea >
      </textarea>
    </>
  )
}

export default App
