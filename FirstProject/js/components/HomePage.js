import React, {Component} from 'react';
import {Text,Platform,StatusBar,FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getLatest, getNodeList, setTopicDetial} from "../actions/Actions";
import API from '../utils/API';
import Color from '../utils/Color';
import TopicsListItem from './TopicsListItem';
import TopicDetail from './TopicDetail';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            pageLoading: false
        }

    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        StatusBar.setBarStyle('light-content', true);
        Platform.OS==='android' ? StatusBar.setBackgroundColor(Color.SUB) : null;

        return (
            <FlatList
            data={this.props.topics}
            onRefresh={this.fetchData}
            refreshing={this.state.pageLoading}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderTopicCell}/>
        )
    }

    keyExtractor = (data)=>{
        return data.id;
    };


    renderTopicCell = (data)=>{
        return(<TopicsListItem data={data} onSelect={this.handleTopicDetail}/>)
    }


    handleTopicDetail = (id)=>{
        const {dispatch} = this.props;
        dispatch(setTopicDetial(id));
        this.props.navigation.push({
            name: 'TopicDetail',
            component: TopicDetail,
        })
    };

    fetchData() {
        const {topicType, dispatch} = this.props;
        if(this.state.pageLoading){
            return;
        }
        this.setState({
            pageLoading:true
        });
        let getter = topicType.type === 'latest'?API.getLatestTopic:API.getNodeInfo;
        let action = topicType.type === 'latest'?getLatest:getNodeList;
        getter(null).then(res =>{
            this.setState({
                loading:false,
                pageLoading:false
            });
            dispatch(action(res));
        }).done();
    }
}

function select(state) {
    return {
        topicType: state.topicType,
        topics: state.topics
    }
}


export default connect(select)(HomePage);