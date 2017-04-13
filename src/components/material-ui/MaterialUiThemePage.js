import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange100, deepOrange300 } from 'material-ui/styles/colors';

import MaterialUiPage from './MaterialUiPage';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: deepOrange300,
        primary2Color: deepOrange300
    }
});

class MaterialUiThemePage extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <MaterialUiPage />
            </MuiThemeProvider>
        );
    }
}
export default MaterialUiThemePage;