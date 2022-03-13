
import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  //login url
  const url = 'http://localhost:5000/api/auth/login';

  //hold the user data
  const handleChange = (setter) => (e) => {
    setter(e.currentTarget.value);
    
  }

  const handleSubmit = async (e) => {
    //prevent the default behavior of the form
    e.preventDefault()
    try {

      const user = { email, password }

      const { data } = await axios.post(url, user)

      //set the user state
      setUser(data)

      //set user to local storage
      localStorage.setItem('user', JSON.stringify(data))

    } catch (error) {
      console.error(error);
    }
  }

  //check if the user is logged in 
  if(user) {
    return <h1>User is logged in</h1>
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label for='email'>Email</label>
        <input type='email' autoComplete='false' onChange={handleChange(setEmail) } />
        <label for='password'>Password</label>
        <input type='password' onChange={handleChange(setPassword)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default App;
