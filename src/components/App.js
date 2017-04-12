import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink, Router, browserHistory } from 'react-router';

import { getPathOnly } from '../common/path';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: getPathOnly(window.location.href)
        };
    }
    componentDidMount() {
        browserHistory.listen((e) => {
            this.setState({
                active: e.pathname
            });
        });
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand" href="#">Sample</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className={this.state.active === "/" && "active"}><IndexLink to="/" activeClassName="active">Simple</IndexLink></li>
                                <li className={this.state.active === "/react-bootstrap" && "active"}><Link to="/react-bootstrap" activeClassName="active">react-bootstrap</Link></li>
                                <li className={this.state.active === "/material-ui" && "active"}><Link to="/material-ui" activeClassName="active">material-ui</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;