import React, { Fragment } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import classes from './FinalScore.module.css';

const FinalScore = (props) => {
    const { result } = props;

    return (
        <Fragment>
            <Typography variant="h3" gutterBottom align='center'>Final Score</Typography>
            <Grid container xs={12} item direction='column'>
                {result.map(({ operand1, operator, operand2, answer, enteredValue }, index) => {
                    return (
                        <Paper className={`${enteredValue === answer ? classes.correct : classes.wrong}`} style={{ margin: '10px 0', padding: '5px', }} key={index}>
                            <Grid container justifyContent='space-between' alignItems='center'>
                                <Typography>{operand1} {operator} {operand2} = {answer}</Typography>
                                <Typography variant="caption">response {(enteredValue || enteredValue === 0) ? enteredValue : 'N/A'}</Typography>
                            </Grid>
                        </Paper>
                    );
                })}
            </Grid>
        </Fragment>
    );
}

export default FinalScore;
