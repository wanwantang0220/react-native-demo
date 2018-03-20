import { StackNavigator } from "react-navigation";
import MainPage from './components/MainPage';
import TopicDetail from './components/TopicDetail';

const Routers = StackNavigator({
    Main: {
        title: 'MainPage',
        screen: MainPage,
    },
    TopicDetail:{
        title: 'TopicDetail',
        screen: TopicDetail,
    },
});

module.exports = Routers;
