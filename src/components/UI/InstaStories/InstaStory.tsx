import React, {FC, useRef} from 'react';
import {StyleSheet} from "react-native";
import InstaStoryContainer from "./InstaStoryContainer/InstaStoryContainer";

const { CubeNavigationHorizontal } = require("react-native-3dcube-navigation");

interface ILocalProps  {
    isModalOpen: boolean,
    title: string,
    stories: any,
    //onStoryPrevious?: () => void
    //onStoryNext?: () => void
    onClose?: () => void
}
const InstaStory:FC<ILocalProps> = ({
                                        isModalOpen = false,
                                        title="",
                                        stories = [],
                                        onClose= () => {}
                                    }) => {
    const modalScroll = useRef();
    return (
        <InstaStoryContainer
            key={title}
            onClose={ onClose }
            onStoryNext={ onClose }
            onStoryPrevious={ onClose  }
            dataStories={{stories:stories}}
            isNewStory={false}
        />
    );
};

export default InstaStory;

const styles = StyleSheet.create({
    boxStory: {
        marginLeft: 15,
    },
    ItemSeparator: { height: 1, backgroundColor: "#ccc" },
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,255)",
        paddingBottom: 5,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#FFF",
    },
    superCircle: {
        borderWidth: 3,
        borderColor: "blue",
        borderRadius: 60,
    },
    modal: {
        flex: 1,
    },
    title: {
        fontSize: 8,
        textAlign: "center",
    },
});
