import { useState } from 'react'
import FormComponent from '/src/components/FormComponent.jsx'
import './App.css'
import Main from './components/Main/Main'

function App() {
  const [first, setFirst] = useState(1)

  return (
    <>
        {/* <FormComponent />  */}
        <Main />
    </>
  )
}

export default App