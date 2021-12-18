import './App.css';
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Container from './components/Container';
import Post from './components/Post';
import UserProfile from './components/UserProfile';
import Menu from './components/Menu';

function App() {
  const [jwt, setJwt] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    let token = Cookies.get('jwt')
    if(token){
      setJwt(token)
      setUser(JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()))
    }
  }, [])


  return (
    <Router>
      <div className="App">
        <Menu jwt={jwt} setJwt={setJwt} user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element= {<Container jwt={jwt} setJwt={setJwt} user={user} setUser={setUser}/>}/>
          <Route path="/register" element= {<Register jwt={jwt} setJwt={setJwt} setUser={setUser}/>}/>
          <Route path="/post/:postId" element= {<Post jwt={jwt} user={user}/>}/>
          <Route path="/user/:user" element= {<UserProfile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
