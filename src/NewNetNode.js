import React, { component } from 'React';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { muiThemeable } from 'material-ui/styles/muiThemeable';

class NewNetNode extends component {
    constructor(props) {
        super(props);
        var localComponent = []
        localComponent.push(
            <MuiThemeProvider>
                <div>
                    <TextField floatingLabelText="شماره patch panel" />
                    <TextField floatingLabelText="شماره کابل" />
                    <br/>
                    <TextField floatingLabelText="سوییچ" />
                    <TextField floatingLabelText="شماره پورت سوییچ" />
                    <br/>
                    <TextField floatingLabelText="شبکه مجازی" />
                    <TextField floatingLabelText="نوع" />
                    <TextField floatingLabelText="مکان" />
                    <br/>
           <Button label="ذخیره" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

                </div>
            </MuiThemeProvider>

        )
    }
}


