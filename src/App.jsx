import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentInfoForm from './components/StudentInfoForm';
import STPQuestionnaire from './components/STPQuestionnaire';
import InterestQuestionnaire from './components/InterestQuestionnaire';
import Notepad from './components/Notepad';
import Result from './components/Result';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentInfoForm />} />
        <Route path="/questionnaire" element={<STPQuestionnaire />} />
        <Route path="/interest" element={<InterestQuestionnaire />} />
        <Route path="/notepad" element={<Notepad />} /> 
        <Route path="/result" element={<Result/>} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;