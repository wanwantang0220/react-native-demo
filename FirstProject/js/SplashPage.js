import React, {Component} from 'react';
import Router from './Router';


export default class SplashPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "default",
        };
    }

    render() {

        return (
            <Router navigator={this.props.navigator}/>
        )
    }
}