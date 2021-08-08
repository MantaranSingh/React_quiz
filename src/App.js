import React, { useState, useRef } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import Quiz from './components/Quiz';
import FinalScore from './components/FinalScore';

function App() {
  const [finalScore, setFinalScore] = useState([]);
  const [question, setQuestion] = useState(2);
  const [quesStarted, setQuesStarted] = useState(false);
  const questionRef = useRef();

  const responseHandler = (response) => {

    setFinalScore(prev => {
      return [
        ...prev,
        ...response,
      ];
    });

  };
  const questionHandler = () => {
    let noOfQues = questionRef.current.value;
    if (noOfQues) {
      setQuestion(noOfQues);
    }
    noOfQues = '';
    setQuesStarted(true);
  };

  return (
    <div style={{ padding: 20 }}>
      {!quesStarted && <Grid container justifyContent='center' style={{ margin: '2rem 0' }}>
        <TextField label="No questions in 1 quiz?" type="number" inputRef={questionRef} helperText="By default 2" />
        <Button style={{ margin: '0px 10px' }} variant="contained" color="primary" onClick={questionHandler}> Ok </Button>
      </Grid>}
      {finalScore.length < question * 2 ? <Grid container spacing={2}>
        <Grid item xs={6}>
          <Quiz title='Quiz 1' onEnd={responseHandler} question={question} started={() => setQuesStarted(true)} />
        </Grid>
        <Grid item xs={6}>
          <Quiz title='Quiz 2' onEnd={responseHandler} question={question} started={() => setQuesStarted(true)} />
        </Grid>
      </Grid> : <FinalScore result={finalScore} />}
    </div>
  );
}

export default App;
