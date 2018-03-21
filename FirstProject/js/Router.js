import { StackNavigator } from "react-navigation";
import MainPage from './components/MainPage';
import TopicDetail from './components/TopicDetail';

const TopicNavigator = StackNavigator({
    TopicsView: {
        screen: MainPage,
        navigationOptions: {
            title: '首页'
        }
    },
    TopicDetail: {
        screen: TopicDetail,
        path: 'TopicDetail/:id',
        navigationOptions: {
            title: '详情'
        }
    },
});

module.exports = TopicNavigator;
