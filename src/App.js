import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => setPosts(data));

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => setUsers(data));
  }, []);

  const Ids = () => {
    const postIds = posts.map((post) => {
    const userIds = users.find(user => user.id === post.userId);
    return {
      ...post,
      userIds: userIds || null
    }
   });
  return postIds;
  };
  
  return (
    <div className="App">
      {Ids().slice(0, 20).map((post) => (
       <div className='post' key={post.userId}>
         <h4>{post.title}</h4>
         <p>{post.body}</p>
         {post.userIds ? <p><strong>Name:</strong> {post.userIds.name}</p> : <p><strong>Name:</strong> no name</p>}
       </div>
      ))} 
    </div>
  );
}

export default App;
