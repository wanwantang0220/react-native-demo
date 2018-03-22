import { StackNavigator } from "react-navigation";
import TabNavigatorPage from './components/TabNavigatorPage';
import MinePage from './components/MinePage';

const TopicNavigator = StackNavigator({
    Main: {
        screen: TabNavigatorPage,
        navigationOptions: {
            title: '首页'
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
