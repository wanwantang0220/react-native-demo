import { StackNavigator } from "react-navigation";
import TabNavigator from './TabNavigator';
import MinePage from './components/MinePage';

const TopicNavigator = StackNavigator({
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            // title: '日程安排'
        }
    },
    Mine: {
        screen: MinePage,
        navigationOptions: {
            title: '我的'
        }
    },
});

module.exports = TopicNavigator;
