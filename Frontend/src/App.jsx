import { useEffect, useState } from 'react'
import { ToastContainer } from "react-toastify"
import './App.css'
import Form from './components/Form'
import Recent from './components/Recent';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetchContacts();
  }, [])
  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      // console.log(response.data);
      setContacts(response.data);
    } catch (err) {

    }
  }
  return (<>
  <ToastContainer position="top-right" />
    <div className='pageCont'>
      <Form contacts={contacts} setContacts={setContacts} />
      <Recent contacts={contacts} setContacts={setContacts} />
    </div>
  </>
  )
}

export default App
