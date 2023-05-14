import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {globalStyles, SCREEN_WIDTH} from '../../constants/globalStyles';
import CategoriesList from '../../components/Project/CategoriesList/CategoriesList';
import EventsList from '../../components/Project/EventsList/EventsList';
import styles from './styles';
import {translate} from '../../utils/translate';

import {CategoryItem, IEvent, IUser} from '../../types';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import {getCategories} from '../../api/categories/getCategories';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories,} from '../../redux/GlobalRedux/actions/actionCreator';

import {useIsFocused} from '@react-navigation/native';
import ViewScreen from "../../components/Project/ViewScreen/ViewScreen";
import SubCategoriesList from "../../components/Project/SubCategoriesList/SubCategoriesList";
import {capitalizeFirstLetter} from "../../utils/text";
import ButtonAdd from "../../components/Project/ButtonAdd/ButtonAdd";
import {Dictionary} from "../../locales/dictionary";
import {colors} from "../../constants/Colors";
import {getEvents} from '../../api/events/getEvents/getEvents';
import {useDebouncedCallback} from "use-debounce";
import PostsList from "../../components/Project/PostList/PostList";
import {SCREENS} from '../../navigation/screenName';
import {navigateTo} from "../../utils/navigate";
import StoriesList from "../../components/Project/StoriesList/StoriesList";
import {getUserById} from "../../api/user/getUserById/getUserById";
import {getStories} from "../../api/user/getStories/getStories";
import { Modalize } from 'react-native-modalize';
import SortingListModal from '../../components/UI/SortingListModal/SortingListModal';
import {getServiceUsers} from "../../api/user/getUsers/getUsers";
import ServiceUsersList from "../../components/Project/ServiceUsersList/ServiceUsers";


const FEED_TYPE_ALL = 0;
const FEED_TYPE_EVENTS = 1;
const FEED_TYPE_POSTS = 2;
const FEED_TYPE_APPLICATION = 3;

const LIST_LIMIT = 16;
const LIST_THRESHOLD = 2;

interface IScreenState {
  //searchString: string,
  feedMode: 'events' | 'posts' | 'feed',
  feedType: 0 | 1 | 2,
  isEventsLoading: boolean,
  swipeStart: any,
  swipeEnd: any,
  swipeSens: number
}

interface IListState {
  items: IEvent[],
  page: number,
  lastPage: boolean,
  isRefreshing: boolean
}

interface IListUsersState {
  items: IUser[],
  page: number,
  lastPage: boolean,
  isRefreshing: boolean
}

const Home = (props: any) => {
  const focused = useIsFocused();
  const {navigation} = props;
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state?.global?.categories);
  const userInfo = useSelector((state: any) => state?.session?.userData);
  const userInfoFull = useSelector((state: any) => state?.session?.userDataFull);

  const [serviceShown, setServiceShown] = useState<boolean>(false);

  //const events = useSelector((state: any) => state?.global?.events);
  //const posts = useSelector((state: any) => state?.global?.posts);
  const [screenEvents, setScreenEvents] = useState<IListState>({
    items: [],
    page: 1,
    lastPage: false,
    isRefreshing: false,
  });
  const [screenPosts, setScreenPosts] = useState<IListState>({
    items: [],
    page: 1,
    lastPage: false,
    isRefreshing: false,
  });
  const [screenUsers, setScreenUsers] = useState<IListUsersState>({
    items: [],
    page: 1,
    lastPage: false,
    isRefreshing: false,
  });
  const [screenUserSorting, setScreenUserSorting] = useState<number>(0);

  const [categoryId, setCategoryId] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [activeSubCategory, setActiveSubCategory] = useState<number>(0);
  const [showSubCategories, setShowSubCategories] = useState<boolean>(false);
  const [visibleBlog, setVisibleBlog] = useState(true);
  const [isHeader, setIsHeader] = useState(true); //State of header visibility
  const [searchString, setSearchString] = useState<string>('');
  const [stories,setStories] = useState<any[]>([]);

  const [screenState, setScreenState] = useState<IScreenState>({
    //searchString: '',
    feedMode: 'events',
    feedType: 1,
    isEventsLoading: true,
    swipeStart: 0,
    swipeEnd: 0,
    swipeSens: SCREEN_WIDTH * 0.25,
  })

  const onSwipeLeft = () => {
    setScreenState({...screenState, feedType: FEED_TYPE_POSTS})
  }

  const onSwipeRight = () => {
    setScreenState({...screenState, feedType: FEED_TYPE_EVENTS})
  }

  const getUsersList = async (page = 0) => {
    let newPage = screenUsers.page;
    if (page !== 0) {
      newPage = page;
    }
    let payload: { [key: string]: any } = {
      page: newPage,
      limit: LIST_LIMIT,
    };
    if (searchString != '') {
      payload.keyword = searchString;
    }

    const data = await getServiceUsers(payload, screenUserSorting);
    return data;
  };

  const getEventsList = async (page = 0, feedType: number | undefined = undefined) => {
    feedType = feedType ?? screenState.feedType;
    let newPage = (screenState.feedType === FEED_TYPE_POSTS) ? screenPosts.page : screenEvents.page;
    if (page !== 0) {
      console.log("PAGE TEST 0:", page, newPage);
      newPage = page;
    }
    console.log("PAGE TEST 1:", page, newPage);
    let payload: { [key: string]: any } = {
      page: newPage,
      limit: LIST_LIMIT,
      type: feedType,
    };
    //payload.type = screenState.feedType;
    if (payload.type != FEED_TYPE_POSTS) {
      const evt_ctgy_id = (activeCategory != 0) ? activeSubCategory != 0 ? activeSubCategory : activeCategory : 0;
      if (evt_ctgy_id != 0) {
        payload.evt_ctgy_id = evt_ctgy_id;

        if((userInfoFull.lat && userInfoFull.long) != null){
          payload.order_by_user_distance = true
        }
      }
      if (searchString != '') {
        payload.keyword = searchString;
      }
    }
    const data = await getEvents(payload);
    console.log('TTT',data)
    return data;
  };

  const setUsersList = (data:IUser[], concat = false) => {

    if (concat) {
      setScreenUsers( (pre ) => ({
        ...pre,
        items: pre.items.concat(data),
        lastPage: data.length < LIST_LIMIT,
      }))
    } else {
      setScreenUsers( (pre ) => ({
        ...pre,
        items: data,
        page: 1,
        lastPage: data.length < LIST_LIMIT,
      }))
    }

    //console.log('wss users', screenUsers);
  }

  useEffect( () => {
    //console.log('wss sorting changed');
    getUsersList(1).then(resp => {
      //console.log('wss resp', resp);
      setUsersList(resp.data, false);
    });
  }, [screenUserSorting])

  const setEventsPosts = (data: IEvent[], concat = false, feedType: IScreenState["feedType"] | undefined = undefined) => {
    feedType = feedType ?? screenState.feedType;
    if (feedType == FEED_TYPE_EVENTS) {
      if (concat) {
        setScreenEvents((pre) => ({
          ...pre,
          items: pre.items.concat(data),
          lastPage: data.length < LIST_LIMIT,
        }));
      } else {
        setScreenEvents((pre) => ({
          ...pre,
          items: data,
          page: 1,
          lastPage: data.length < LIST_LIMIT,
        }));
      }
    }
    if (feedType == FEED_TYPE_POSTS) {
      if (concat) {
        setScreenPosts((pre) => ({
          ...pre,
          items: pre.items.concat(data),
          page: 1,
          lastPage: data.length < LIST_LIMIT,
        }));
      } else {
        setScreenPosts((pre) => ({
          ...pre,
          items: data,
          page: 1,
          lastPage: data.length < LIST_LIMIT,
        }));
      }
    }
  }
  const getCategoriesList = async () => {
    const data = await getCategories();
    dispatch(setCategories(data));
  };
  const swipeFalseBlog = () => {
    setScreenState({...screenState, feedType: FEED_TYPE_EVENTS})
  }

  const onCategoryItemPress = (item: CategoryItem) => {
    setActiveSubCategory(0);
    setCategoryId(item.id);
    swipeFalseBlog();
    setVisibleBlog(false);
    if (item.id == activeCategory) {
      setActiveCategory(0);
      setVisibleBlog(true);
    } else {
      setActiveCategory(item.id);
    }
  };

  const onServiceUserPress = (id:number) => {
    navigation.navigate('CommonNavigator', {screen: SCREENS.ProfileUserScreen, params: {userId: id}})

    //navigation.navigate({name: SCREENS.ProfileUserScreen, params:{userId: route?.params?.userId}});
  };

  const onSortingChange = (id:number) => {
    setScreenUserSorting(id);
  }

  const onEventPress = (id: number) => {
    //setSelectedEvent(id);
    navigation.navigate('CommonNavigator', {screen: 'EventScreen', params: {eventId: id, prevScreen: "Home"}});
  };
  const onNewEventPress = () => {
    //navigation.navigate('CommonNavigator', { screen: 'EventFormScreen', params: {category_id: categoryId} } );
    navigateTo(navigation, SCREENS.EventFormScreen, {category_id: categoryId, params: {type: "event"}});
  }
  const onNewBlogPress = () => {
    navigateTo(navigation, SCREENS.PostFormScreen, {category_id: categoryId});
    //navigation.navigate('CommonNavigator', { screen: SCREENS.PostFormScreen } );
  }
  const onTasksPress = () => {
    navigation.navigate(SCREENS.TaskScreen)
  }
  const onNewTaskPress = () => {
    navigation.navigate(SCREENS.TaskFormScreen, {category_id: categoryId, userInfo: userInfo})
  }
  const getHomeStories = async () => {
    const storiesResp = await getStories();
    if(storiesResp.success) {
      const user = await getUserById({user_id:userInfo.id})
      let storiesList = [
        {
          id: -1,
          user_id: userInfo.id,
          user: user,
          is_active: false,
          media: [],
        }
      ];
      let userIdCollector = new Set<number>([]);
      storiesResp.data.map( (item:any) => {
        if(userIdCollector.has(item.user_id)) return;
        userIdCollector.add(item.user_id);
        storiesList.push(item);
      })
      //storiesList = [...storiesList, ...storiesResp.data];
      setStories(storiesList)
      return;
    }
  }

  useEffect(() => {
    if (focused && props.route?.params?.noRefresh !== true) {
      getCategoriesList().then();
      setScreenState({...screenState, isEventsLoading: true});

      //console.log('wss get events list');

      getEventsList(1).then(resp => {
        setEventsPosts(resp);
        setScreenState((preScreenState) => ({...preScreenState, isEventsLoading: false}))
      });
      getEventsList(1, FEED_TYPE_POSTS).then(resp => {
        setEventsPosts(resp, false, FEED_TYPE_POSTS);
      });
      getHomeStories().then();
    }
  }, []);

  useEffect(() => {
    if (activeCategory != 0) {
      setShowSubCategories(true);
    } else {
      setShowSubCategories(false);
    }
  }, [activeCategory])

  useEffect(() => {
    setScreenState({...screenState, isEventsLoading: true})
    //console.log('wss events get');
    //console.log('wss active category', activeCategory);

    if (activeCategory == 3) {
      //console.log('wss get Users');
      setServiceShown(true);

      //get service users
      getUsersList(1).then(resp => {
        //console.log('wss resp', resp);
        setUsersList(resp.data, false);
      });
    } else {
      setServiceShown(false);
      getEventsList(1).then(resp => {
        setEventsPosts(resp, false);
        setScreenState({...screenState, isEventsLoading: false})
      });
    }

  }, [activeCategory, activeSubCategory])

  useEffect(() => {
    if (
        (screenEvents.page != 1 && screenState.feedType == FEED_TYPE_EVENTS)
        || (screenPosts.page !=1 && screenState.feedType == FEED_TYPE_POSTS)
    ) {
      setScreenState({...screenState, isEventsLoading: true})
      getEventsList().then(resp => {
        setEventsPosts(resp, true);
        setScreenState({...screenState, isEventsLoading: false})
      });
    }
  }, [screenEvents.page, screenPosts.page])

  const onRefresh = () => {
    getEventsList(1).then(resp => {
      setEventsPosts(resp, false);
    });
    getHomeStories().then();
  }

  const onSearch = async (text: string) => {
    setSearchString(text);
    if (text.length >= 3 || text == '') {
      debounced(text);
    }
  }
  const debounced = useDebouncedCallback(
      (value) => {
        setScreenState({...screenState, isEventsLoading: true})
        getEventsList(1).then(resp => {
          setEventsPosts(resp);
          setScreenState((preScreenState) => ({...preScreenState, isEventsLoading: false}))
        });
      },
      10,
      // The maximum time func is allowed to be delayed before it's invoked:
      {maxWait: 15}
  );
  useEffect(
      () => () => {
        debounced.flush();
      },
      [debounced]
  );




  useEffect(() => {
    setIsHeader((screenState.feedType !== FEED_TYPE_POSTS));
    if(screenState.feedType === FEED_TYPE_POSTS) {

      getHomeStories().then();
    }
  }, [screenState.feedType])

  const addPage = (feedType = FEED_TYPE_EVENTS) => {
    if (feedType == FEED_TYPE_EVENTS && !screenEvents.lastPage) {
      setScreenEvents((pre) => ({...pre, page: pre.page + 1}))
      return;
    }
    if (feedType == FEED_TYPE_POSTS  && !screenPosts.lastPage) {
      setScreenPosts((pre) => ({...pre, page: pre.page + 1}))
      return;
    }

  }


  useEffect(() => {
    //console.log("ITEMS", screenEvents.items);
  }, [screenEvents.items])

  const onChangeDataItem = (feedType = FEED_TYPE_EVENTS, newItem: any) => {
    console.log("LIKE TEST 10", feedType,FEED_TYPE_POSTS, newItem);

    if(feedType == FEED_TYPE_POSTS) {
      let newScreenPosts = [...screenPosts.items];
      const newItemIndex = newScreenPosts.findIndex(item => item.id == newItem.id);
      newScreenPosts[newItemIndex] = newItem;
      setScreenPosts({...screenPosts, items: newScreenPosts});
    }
  }
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
      <ViewScreen keyboardVerticalOffset={0}>
        <View style={{height:170}}>
          {isHeader
              ?
              <>
                <View
                    style={[styles.searchInput]}
                >
                  <SearchInput
                      placeholderText={translate('placeHolderSearchHome')}
                      onSearchPress={onSearch}
                  />
                </View>
                <View style={[styles.categoriesList]}>
                  <CategoriesList
                      onItemPress={onCategoryItemPress}
                      categories={categories}
                      activeCategory={activeCategory}
                  />
                  {showSubCategories && (
                      <SubCategoriesList
                          category_id={activeCategory}
                          subcategory_id={activeSubCategory}
                          setActiveSubCategory={setActiveSubCategory}
                          setShowSubCategories={setShowSubCategories}
                      />
                  )}
                </View>
              </>
              :

              <StoriesList nestedScrollEnabled={true} onStoryPress={ ()=>{} } stories={stories}></StoriesList>

          }
        </View>
        <View style={[globalStyles.row, styles.listTitle]} >

          <View style={{flex: 1, flexDirection:"row", alignItems: "center", justifyContent: 'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <ButtonAdd buttonSize={32} onPress={ onNewEventPress } />
              <TouchableOpacity onPress={ () => {onSwipeRight()} }>
                <Text
                    style={[
                      globalStyles.bodySectionTitle,
                      //{marginLeft:5, borderBottomColor: colors.greenPH},
                      {marginLeft: 5, borderColor: colors.brown, paddingHorizontal: 10,},
                      screenState.feedType == FEED_TYPE_EVENTS  && {borderWidth: 1, borderRadius: 5} //{borderBottomWidth:1}
                    ]}
                >
                  {capitalizeFirstLetter(translate(Dictionary.event.feed))}
                </Text>
              </TouchableOpacity>
            </View>

            {activeCategory == 3 &&
            <>
              <TouchableOpacity onPress={onOpen} style={{padding:5}}>
                <Text
                    style={{fontSize: 12}}
                >
                  {capitalizeFirstLetter(translate(Dictionary.services.filter))}
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={onTasksPress}>
                  <Text
                      style={[
                        globalStyles.bodySectionTitle,
                        //{marginLeft:5, borderBottomColor: colors.greenPH},
                        {borderColor: colors.brown, paddingHorizontal: 10,},
                        screenState.feedType == FEED_TYPE_POSTS  && {borderWidth: 1, borderRadius: 5} //{borderBottomWidth:1}
                      ]}
                  >
                    {capitalizeFirstLetter(translate(Dictionary.services.application))}
                  </Text>
                </TouchableOpacity>
                <ButtonAdd buttonSize={32} onPress={ onNewTaskPress } />
              </View>
            </>
            }

            {visibleBlog &&
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={ () => { onSwipeLeft()} }>

                <Text style={[globalStyles.bodySectionTitle,
                  //{marginLeft:10, borderBottomColor: colors.greenPH},
                  {marginLeft: 5, borderColor: colors.brown, paddingHorizontal: 10,},
                  screenState.feedType == FEED_TYPE_POSTS  && {borderWidth: 1, borderRadius: 5}//{borderBottomWidth:1}
                ]}>
                  {capitalizeFirstLetter(translate(Dictionary.post.blog))}
                </Text>
              </TouchableOpacity>
              <ButtonAdd buttonSize={32} onPress={ onNewBlogPress} />
            </View>
            }
          </View>
        </View>

        {serviceShown && (
            <View style={[styles.eventList, { width: SCREEN_WIDTH*3, flexDirection: "row", marginLeft: 0 - SCREEN_WIDTH}]}>

              <View style={[{
                flex: 1,
                marginRight:0,
                marginLeft: (screenState.feedType == FEED_TYPE_EVENTS) ? SCREEN_WIDTH:0,
              }]}>
                <ServiceUsersList
                    key={'homeListEvents'}
                    data={screenUsers.items}

                    onServiceUserPress={onServiceUserPress}
                    onTouchStart={ (e) =>  {
                      const posX = e.nativeEvent.pageX;
                      setScreenState({...screenState, swipeStart: posX});
                    } }
                    onTouchEnd={ (e) => {
                      const posX = e.nativeEvent.pageX;
                      if (screenState.swipeStart - posX > screenState.swipeSens && visibleBlog) {
                        onSwipeLeft();
                        return;
                      }
                      if (posX - screenState.swipeStart > screenState.swipeSens && visibleBlog) {
                        onSwipeRight();
                        return;
                      }
                    }}
                    onEndReached = { () => {setScreenUsers((pre) => ({...pre, page: pre.page + 1}))}}
                    onEndReachedThreshold = {LIST_THRESHOLD}
                    onRefresh = { onRefresh }
                    refreshing = {screenUsers.isRefreshing}
                    isPageLoading = {screenState.isEventsLoading}
                    activeCategory={activeCategory}
                />
                {/*screenState.isEventsLoading &&
                <ActivityIndicator size={48} />
            */}
              </View>

            </View>
        )}

        {!serviceShown && (
        <View style={[styles.eventList, { width: SCREEN_WIDTH*3, flexDirection: "row", marginLeft: 0 - SCREEN_WIDTH}]}>

          <View style={[{
              flex: 1,
              marginRight:0,
              marginLeft: (screenState.feedType == FEED_TYPE_EVENTS) ? SCREEN_WIDTH:0,
            }]}>
            <EventsList
                key={'homeListEvents'}
                data={screenEvents.items}
                //isVisible={(screenState.feedType == FEED_TYPE_EVENTS && screenEvents.length > 0)}
                onEventPress={onEventPress}
                onTouchStart={ (e) =>  {
                  const posX = e.nativeEvent.pageX;
                  setScreenState({...screenState, swipeStart: posX});
                } }
                onTouchEnd={ (e) => {
                  const posX = e.nativeEvent.pageX;
                  if (screenState.swipeStart - posX > screenState.swipeSens && visibleBlog) {
                    onSwipeLeft();
                    return;
                  }
                  if (posX - screenState.swipeStart > screenState.swipeSens && visibleBlog) {
                    onSwipeRight();
                    return;
                  }
                }}
                onEndReached = { () => {setScreenEvents((pre) => ({...pre, page: pre.page + 1}))}}
                onEndReachedThreshold = {LIST_THRESHOLD}
                onRefresh = { onRefresh }
                refreshing = {screenEvents.isRefreshing}
                isPageLoading = {screenState.isEventsLoading}
                activeCategory={activeCategory}
            />
            {/*screenState.isEventsLoading &&
                <ActivityIndicator size={48} />
            */}
          </View>

          <View style={[{flex:1,
            marginLeft: 20,
            marginRight: (screenState.feedType == FEED_TYPE_POSTS) ? SCREEN_WIDTH:0,
          }]}>
            <PostsList
                key={'homeListPosts'}
                //isVisible={(screenState.feedType == FEED_TYPE_POSTS && screenPosts.length > 0)}
                data={screenPosts.items}
                onEventPress={onEventPress}
                onTouchStart={ (e) =>  {
                  const posX = e.nativeEvent.pageX;
                  setScreenState({...screenState, swipeStart: posX});
                } }
                onTouchEnd={ (e) => {
                  const posX = e.nativeEvent.pageX;
                  if (screenState.swipeStart - posX > screenState.swipeSens) {
                    onSwipeLeft();
                    return;
                  }
                  if (posX - screenState.swipeStart > screenState.swipeSens) {
                    onSwipeRight();
                    return;
                  }
                }}
                onEndReached = { () => {addPage(FEED_TYPE_POSTS)} }
                onEndReachedThreshold = {LIST_THRESHOLD}
                onRefresh = { onRefresh }
                refreshing = {screenPosts.isRefreshing}
                isPageLoading = {screenState.isEventsLoading}
                onChangeDataItem = { (item) => {onChangeDataItem(FEED_TYPE_POSTS, item)} }
            />

          </View>

        </View>
        )}
        <SortingListModal
            modalizeRef={modalizeRef}
            screenUserSorting={screenUserSorting}
            onSortingChange={onSortingChange}
        />
      </ViewScreen>
  );
};

export default Home;
