import React, {useState} from 'react';
import './App.css';

function App() {
  const [uName, setUName] = useState('');
  const [githubUsers, setGithubUsers] = useState([]);
  const [error, setError] = useState(null);

  const findUsers = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${uName}&sort=followers`);
      if (!response.ok) {
        throw new Error('Failed to fetch users Details!');
      }
      const data = await response.json();
      setGithubUsers(data.items);
      setError(null);
    } catch (error) {
      console.error('💀 Error 404 Not Found 💀.', error);
      setError('💀 404 Not Found 💀.');
    }
  };

  return (
    <div className="App">
      <h1>Finda Fiesta</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter Username"
          value={uName}
          onChange={(e) => setUName(e.target.value)}
        />
        <button onClick={findUsers}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="output">
        <table>
          <thead>
            <tr>
              <th>GitHub Avatar</th>
              <th>GitHub Username</th>
            </tr>
          </thead>
          <tbody>
            {githubUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src = {user.avatar_url} alt = "Avatar" width = "150" height = "100" />
                </td>
                <td>{user.login}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
