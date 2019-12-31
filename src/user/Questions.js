import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import List, {  } from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import { list } from './api-question.js'
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button'


const styles = theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing.unit,
        margin: theme.spacing.unit * 5
    }),
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
        color: theme.palette.openTitle
    }
})

class Questions extends Component {
    constructor({ match }) {
        super();
        this.state = {
            questions: []
        }
        this.match = match;
    }
  

    componentDidMount() {
        list({ subjectId: this.match.params.subjectId }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ questions: data })
            }
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    All Questions
                </Typography>
                <List dense>
                    {this.state.questions.map((item, i) => {
                        console.log(item.option);
                        return <>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.question} />
                               
                            </ListItem>
                            <ListItem >
                                <ListItemAvatar>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemAvatar>
                                <IconButton >
                                    <ListItemText primary={item.option[0]}/>
                                </IconButton>
                                <IconButton >
                                    <ListItemText primary={item.option[1]} />
                                </IconButton>
                                <IconButton >
                                    <ListItemText primary={item.option[2]} />
                                </IconButton>
                                <IconButton >
                                    <ListItemText primary={item.option[3]} />
                                </IconButton>
                            </ListItem>
                           

                        </>
                    })
                    }
                </List>
            </Paper>
        )
    }
}

Questions.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Questions)