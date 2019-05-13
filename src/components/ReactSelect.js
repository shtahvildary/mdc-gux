/* eslint-disable react/prop-types, react/jsx-handler-names */

/*
example: 
 <ReactSelect id="vlan" name="VLAN" items={this.state.vlans} selectedId={this.setId.bind(this,"vlans")} isMulti={false} isClearable={true}/>
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        width: 200,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {

        position: 'center',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class IntegrationReactSelect extends React.Component {
    state = {
        single: null,
        multi: null,
        suggestions: []
    };
    componentWillMount() {

        if (!this.props.items) return;
        var suggestions = [];
        var  defaultValues= [];
        var defaultLabels=""
        var label = this.props.name
        this.props.items.map((item) => {
            suggestions.push({ label: item.name, value: item._id })
        })
        if(this.props.defaultValues)
        this.props.defaultValues.map((item) => {
            defaultValues.push({ label: item.name, value: item._id })
            defaultLabels+=item.name+" "

        })
        this.setState({ suggestions, label,defaultValues,defaultLabels }, () => {})
    }

    handleChange = name => value => {
        var idList = []
        var selectedId=null;
        if (value)
            if (name == 'single') selectedId = value.value
            else {
                value.map(item => {
                    idList.push(item.value)
                })
                selectedId = idList
            }
        this.setState({
            //name= single or multi
            [name]: value,
            selectedId
        }, () => {});
        var json = {}
        json[this.props.id] = selectedId
        this.props.selectedId(json)
       
    };

    render() {

        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };
        var type = 'single'
        var value = this.state.single
        if (this.props.isMulti) {
            type = 'multi'
            value = this.state.multi
        }

        return (
            <Grid container justify='center'>
                <NoSsr>
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        options={this.state.suggestions}
                        components={components}
                        value={value}
                        textFieldProps={{
                            label: this.state.label,
                            InputLabelProps: {
                                shrink: true,
                            },
                        }}
                      
                        // defaultInputValue ={this.state.defaultValues[0].label}
                        defaultInputValue ={this.state.defaultLabels}
                        onChange={this.handleChange(type)}
                        placeholder="انتخاب کنید ..."
                        isClearable={this.props.isClearable}
                        isMulti={this.props.isMulti}
                    />
                </NoSsr>
            </Grid>
        );
    }
}

IntegrationReactSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
