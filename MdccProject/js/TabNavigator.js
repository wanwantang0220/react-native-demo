import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {Image, StyleSheet} from 'react-native';
import MySchedulesPage from './components/MySchedulesPage'
import SchedulesPage from './components/SchedulesPage'
import PropTypes from 'prop-types';

import {Image, StyleSheet} from 'react-native'

const SCHEDULE_IMAGES = [
    {
        active: require('./assets/schedule-23-active.png'),
        inactive: require('./assets/schedule-23.png')
    },
    {
        active: require('./assets/schedule-24-active.png'),
        inactive: require('./assets/schedule-24.png')
    }

]


export default class TabNavigator extends Component {
    static propTypes = {
        navigator: PropTypes.object,
        user: PropTypes.object
    };

    state={
        selectedTab: 'schedules',
        selectedSegment: 0
    }

    render () {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'schedules'}
                    title='日程安排'
                    selectedTitleStyle={{color: '#032250'}}
                    renderIcon={() => <Image source={SCHEDULE_IMAGES[this.state.selectedSegment].inactive} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={SCHEDULE_IMAGES[this.state.selectedSegment].active} style={styles.icon} />}
                    onPress={() => this.setState({ selectedTab: 'schedules' })}>
                    <SchedulesPage
                        navigator={this.props.navigator}
                        onSegmentSelected={this.onSegmentSelected}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'mySchedules'}
                    title='我的订阅'
                    selectedTitleStyle={{color: '#032250'}}
                    renderIcon={() => <Image source={require('./assets/my-schedule.png')} style={[styles.icon, {height: 28.5}]} />}
                    renderSelectedIcon={() => <Image source={require('./assets/my-schedule-active.png')} style={styles.icon} />}
                    onPress={() => this.setState({ selectedTab: 'mySchedules' })}>
                    <MySchedulesPage navigator={this.props.navigator} emptyOperation={this.goHome}/>
                </TabNavigator.Item>
            </TabNavigator>
        )
    }

    goHome = () => {
        this.setState({
            selectedTab: 'schedules'
        })
    };

    onSegmentSelected = (selectedSegment) => {
        this.setState({
            selectedSegment
        })
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 28,
        width: 28
    }
})
