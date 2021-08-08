import React, { useState, useRef } from 'react';
import { Paper, Grid, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '75%',
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

let operators = [
    { sign: "+", method: function (a, b) { return a + b; } },
    { sign: "-", method: function (a, b) { return a - b; } },
    { sign: "*", method: function (a, b) { return a * b; } },
    { sign: "/", method: function (a, b) { return a / b; } },
];

const Quiz = (props) => {
    const classes = useStyles();
    const { title, onEnd, question, started } = props;

    const [startQuiz, setStartQuiz] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [response, setResponse] = useState([]);
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const inputRef = useRef();

    let operand1 = Math.floor(Math.random() * 10 + 1);
    let operand2 = Math.floor(Math.random() * 10 + 1);
    let index = Math.floor(Math.random() * operators.length);

    let operator = operators[index].sign;

    const clickHandler = () => {
        let answer = operators[index].method(operand1, operand2);
        let enteredValue = parseInt(inputRef.current.value);
        if (enteredValue === parseInt(answer.toFixed(2))) {
            setScore(score + 1);
        }

        if (count < question) {
            setResponse(prevState => {
                return [
                    ...prevState,
                    {
                        operand1,
                        operand2,
                        operator,
                        answer: parseInt(answer.toFixed(2)),
                        enteredValue,
                    }
                ];
            });
        } else {
            setShowScore(true);
            onEnd(response);
        }
        setCount(count + 1);
        inputRef.current.value = '';
    };

    return (
        <Grid container direction='column' alignItems='center' justifyContent='space-between' style={{ height: '50vh' }}>
            <Paper className={classes.paper}>{title}</Paper>
            {(startQuiz && !showScore) &&
                <Grid>
                    <Paper><Typography align='center'>{operand1} {operator} {operand2}</Typography></Paper>
                    <Grid container style={{ margin: '5px 0' }}>
                        <Grid item xs={9}><TextField label="" type="number" InputLabelProps={{ shrink: true, }} inputRef={inputRef} /></Grid>
                        <Grid item xs={3}><Button color="primary" onClick={clickHandler}>Next</Button></Grid>
                    </Grid>
                </Grid>}
            {!startQuiz && <Button variant="contained" color="primary" onClick={() => { started(); setStartQuiz(true); }}>Start Quiz</Button>}
            {showScore && <Typography>Score {score}</Typography>}
        </Grid>
    );
};

export default Quiz;