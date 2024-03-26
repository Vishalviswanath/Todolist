import './App.css';
import Newtask from './insert/Newtask';
import Records from './insert/Records';

function App() {
  return (
    <div>
      <center>
        <h1>TodoList</h1>
        <Newtask />
        <hr />
        <Records />
      </center>
    </div>
  );
}

export default App;
