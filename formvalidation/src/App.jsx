import './App.css'
import Form from './form'
import Submission from './submission'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Submission />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
