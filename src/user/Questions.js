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
import {list} from './api-question.js'

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
    state = {
        questions: []
    }

    componentDidMount() {
        list().then((data) => {
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
                        return <Link to={"/question/" + item._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.question} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
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