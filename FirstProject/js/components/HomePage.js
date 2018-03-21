import React, {Component} from 'react';
import {Text, Platform, StatusBar, FlatList, View, TouchableHighlight, Image} from 'react-native';

import {connect} from 'react-redux';
import {getLatest, getNodeList, setTopicDetial} from "../actions/Actions";
import API from '../utils/API';
import TopicsListItem from './TopicsListItem';
import TopicDetail from './TopicDetail';
import TopicStyle from '../styles/Topics';
import Color from '../utils/Color';

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
        Platform.OS === 'android' ? StatusBar.setBackgroundColor(Color.SUB) : null;
        const {navigate} = this.props.navigation;
        return (
            <FlatList
                data={this.props.topics}
                onRefresh={()=>{
                    const {topicType, dispatch} = this.props;
                    if (this.state.pageLoading) {
                        return;
                    }
                    this.setState({
                        pageLoading: true
                    });
                    let getter = topicType.type === 'latest' ? API.getLatestTopic : API.getNodeInfo;
                    let action = topicType.type === 'latest' ? getLatest : getNodeList;
                    getter(null).then(res => {
                        this.setState({
                            loading: false,
                            pageLoading: false
                        });
                        dispatch(action(res));
                    }).done();
                }}
                refreshing={this.state.pageLoading}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={({item}) => {
                    return (
                        <TouchableHighlight onPress={() => {
                            const {dispatch} = this.props;
                            dispatch(setTopicDetial(item.id));
                            navigate('TopicDetail', {name: 'TopicDetail'})}} underlayColor={Color.BORDER}>
                            <View style={TopicStyle.cell}>
                                <View style={TopicStyle.cellWrapper}>
                                    <View style={TopicStyle.titleWrapper}>
                                        <Text style={TopicStyle.cellTitle}>
                                            {item.title}
                                        </Text>
                                        <View style={TopicStyle.cellCategory}>
                                            <View style={TopicStyle.cellCategoryText}>
                                                <Text style={TopicStyle.cellCategoryTextColor}>{item.node.title}</Text>
                                            </View>
                                            <Text style={TopicStyle.cellOtherInfoText}>{item.member.username}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={TopicStyle.cellOtherWrapper}>
                                    <Image style={TopicStyle.cellAvatar}
                                           source={{uri: `https:${item.member.avatar_normal}`}}/>
                                    <View style={TopicStyle.cellReplies}>
                                        <Text style={TopicStyle.cellRepliesText}>{item.replies}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    );
                }}
            />
        )
    }

    keyExtractor = (data) => {
        return data.id;
    };


    renderTopicCell = (data) => {
        const {navigate} = this.props.navigation;
        return (<TopicsListItem data={data} {...this.props} onSelect={this.handleTopicDetail}/>)
    }


    handleTopicDetail = (item) => {
        const {dispatch} = this.props;
        dispatch(setTopicDetial(item.id));

        if (this.props.navigation) {
            this.props.navigation.push({
                name: 'TopicDetail',
                component: TopicDetail,
                title: '',
                backButtonTitle: '',
                leftButtonTitle: ''
            });
        }

    };

    fetchData() {
        const {topicType, dispatch} = this.props;
        if (this.state.pageLoading) {
            return;
        }
        this.setState({
            pageLoading: true
        });
        let getter = topicType.type === 'latest' ? API.getLatestTopic : API.getNodeInfo;
        let action = topicType.type === 'latest' ? getLatest : getNodeList;
        getter(null).then(res => {
            this.setState({
                loading: false,
                pageLoading: false
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