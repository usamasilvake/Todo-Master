
import './App.css';
import { useState, useEffect } from "react";
import TodoResult from './compoents/TodoResult';
import { collection, query, onSnapshot, Timestamp, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase-cong';
import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  inputtext: {
    width: '28rem',
    '& .MuiInputBase-input': {
      fontSize: '1.2rem',
      color: '#333',
    },
    '& .MuiInputLabel-root': {
      fontSize: '1.3rem', fontWeight: 'bold',
      color: 'white',
    },
    '& .MuiInputBase-root': {
      borderBottom: '2px solid yellow',
    }

  },
  inputbutton:{
    margin: '10px 0 0px 30px',
  }
});



function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const formstyle = useStyles();

  // create todo from firebase
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (!input.trim()) {
      return;
    } else {
      await addDoc(collection(db, 'todotable'), {
        todotext: input,
        completed: false,
        datetime: Timestamp.now(),
      });
      setInput('');
    }
  }

  // Read data from firebase
  useEffect(() => {
    const q = query(collection(db, 'todotable'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((document) => {
        todosArr.push({ ...document.data(), id: document.id });
      });
      setTodos(todosArr);
    });
    return () => unsub();
  }, []);

  // update todo from firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todotable', todo.id), {
      completed: !todo.completed,
    });
  };
  // Delete todo 
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todotable', id));
  };

  return (
    <div>
      <form className='todo_form' onSubmit={createTodo}>
        <TextField className={formstyle.inputtext} color="warning" id="standard-search" label="Search Todo"
          type="search" variant="standard" placeholder="Enter message" value={input}
          onChange={(e) => setInput(e.target.value)} />

        <Button className={formstyle.inputbutton} type="submit" variant="contained" size="large">add</Button>
      </form>
      {todos.map((todo, index) => (
        <TodoResult todo={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default App;
