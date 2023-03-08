// import './App.css';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Input, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { updateDoc, doc } from 'firebase/firestore';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import { orange } from '@mui/material/colors';
import { db } from '../firebase-cong';

const useStyles = makeStyles({
  text: {
    marginLeft: '2px',
    cursor: 'pointer',
    
  },
  textComplete: {
    textDecoration: 'line-through',
    marginLeft: '2px',
    cursor: 'pointer',
    color:'red'
  },
  main:{
    backgroundColor: '#cbcdd1',
    width: '100%', 
    maxWidth: 560,
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '500px',
  bgcolor:'#cbcdd1',
  border: '2px solid white',
  p: 10,
};

const TodoResult = (props) => {
  const { todo, deleteTodo,toggleComplete } = props;
  const [open, setOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [empty, setEmpty] = useState(false);

  const togglestyle = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Edit Todo
  const edititem = async () => {
    if (!editedTodo.trim()) {
      setEmpty(true);
    } else {
      await updateDoc(doc(db, 'todotable', todo.id), {
        todotext: editedTodo,
      });
      setOpen(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
  };
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div  style={{display: 'flex', justifyContent: 'center',}} >
      <List className={togglestyle.main}>  
      <ListItem >
        <Checkbox  {...label}   onChange={() => toggleComplete(todo)}
        sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(200%, -50%)',color: orange[800],
         '&.Mui-checked': {color: orange[600],},}} />
      <ListItemText sx={{border: '1px solid gray', borderRadius: '4px', padding:'.9rem'}} primary={todo.todotext} onClick={() => toggleComplete(todo)} className={todo.completed ?
          `${togglestyle.textComplete}`:`${togglestyle.text}`} >
       </ListItemText>
       <Button onClick={handleOpen}><span><EditIcon sx={{color: 'green', marginTop: '8px'}} /></span></Button>
           <Button onClick={() => deleteTodo(todo.id)}><DeleteIcon sx={{color: 'red'}} /></Button>
      </ListItem>
      </List>
      <div>
        <Modal  sx={{bgcolor:'#cbcdd1'}}  open={open} onClose={handleClose}>
          <Box  sx={style}>
            <label style={{color:'black'}}>Edit Todo</label>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <form onClick={handleSubmit}>
              <Input placeholder={todo.todotext} sx={{color: 'green','&::placeholder': {color: 'green',},}}
               value={editedTodo} onChange={(e) => { setEditedTodo(e.target.value);
                setEmpty(false);}} />
              {empty && <p style={{ color: 'red' }}>Please enter some text</p>}
              <Button sx={{marginLeft:'2rem'}} onClick={edititem} type="submit" variant="contained" size="medium">Save Edit</Button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default TodoResult;
