import React, {Component} from 'react'
import {Text,  Image, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';


const SCHEDULE_IMAGES = [
    {
        active: require('../assets/schedule-23-active.png'),
        inactive: require('../assets/schedule-23.png')
    },
    {
        active: require('../assets/schedule-24-active.png'),
        inactive: require('../assets/schedule-24.png')
    }
]

export default class MainPage extends Component {

    static propTypes = {
        navigator: PropTypes.object,
        user: PropTypes.object
    };

    state={
        selectedTab: 'schedules',
        selectedSegment: 0
    }

    // static navigationOptions = {
    //     tabBarLabel: '日程安排',
    //     title: '日程安排',
    //     headerTitleStyle: {
    //         alignSelf: 'center'
    //     },
    // }


    render() {

        return (
            <Text>ceshi</Text>
        )
    }
}

