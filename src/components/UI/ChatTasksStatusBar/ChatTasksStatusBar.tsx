import React, {FC, useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../constants/Colors';
import {closeIcon} from '../../../constants/images';
import styles from './styles';
import Button from "../Button/Button";
import {Badge} from "react-native-elements";

interface IChatTasksStatusBar {
    countTotal: number;
    countOpen: number;
    countInwork: number;
    countArchive: number;
    tabActive: number;
    onTabPress: (data:number) => void;
};

const ChatTasksStatusBar: FC<IChatTasksStatusBar> = ({
                                                            countTotal,
                                                            countOpen,
                                                            countInwork,
                                                            countArchive,
                                                            tabActive,
                                                            onTabPress = (data) => {},
                                            }) => {

    const [inputValue, setInputValue] = useState<number>(1);

    useEffect(() => {
        onTabPress(inputValue);
    }, [inputValue])

    return (
        <View style={styles.container}>
            <View style={(tabActive == 1) ? styles.tabActive : styles.tab}>
                <TouchableOpacity onPress={ () => { onTabPress(1); } }>
                    <Text style={(tabActive == 1) ? styles.tabTextActive : styles.tabText}>Все</Text>
                </TouchableOpacity>
                {countTotal > 0 &&
                    <Badge
                        value={countTotal}
                        status="error"
                        containerStyle={{ position: 'absolute', top: -8, right: -8 }}
                    />
                }
            </View>
            <View style={(tabActive == 2) ? styles.tabActive : styles.tab}>
                <TouchableOpacity onPress={ () => { onTabPress(2); } }>
                    <Text style={(tabActive == 2) ? styles.tabTextActive : styles.tabText}>Открытые</Text>
                </TouchableOpacity>
                {countOpen > 0 &&
                    <Badge
                        value={countOpen}
                        status="error"
                        containerStyle={{position: 'absolute', top: -8, right: -8}}
                    />
                }
            </View>
            <View style={(tabActive == 3) ? styles.tabActive : styles.tab}>
                <TouchableOpacity onPress={ () => { onTabPress(3); } }>
                    <Text style={(tabActive == 3) ? styles.tabTextActive : styles.tabText}>В работе</Text>
                </TouchableOpacity>
                {countInwork > 0 &&
                    <Badge
                        value={countInwork}
                        status="error"
                        containerStyle={{ position: 'absolute', top: -8, right: -8 }}
                    />
                }
            </View>
            <View style={(tabActive == 4) ? styles.tabActive : styles.tab}>
                <TouchableOpacity onPress={ () => { onTabPress(4); } }>
                    <Text style={(tabActive == 4) ? styles.tabTextActive : styles.tabText}>Архив</Text>
                </TouchableOpacity>
                {countArchive > 0 &&
                    <Badge
                        value={countArchive}
                        status="error"
                        containerStyle={{ position: 'absolute', top: -8, right: -8 }}
                    />
                }
            </View>
        </View>
    );
};
export default ChatTasksStatusBar;