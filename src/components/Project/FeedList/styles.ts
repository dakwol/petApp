import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from "../../../constants/globalStyles";
import { colors } from "../../../constants/Colors";

const ITEM_WIDTH = (SCREEN_WIDTH - 40) / 3;
//const ITEM_HEIGHT = ITEM_WIDTH * 1.55;
const ITEM_HEIGHT = ITEM_WIDTH;

const styles = StyleSheet.create({
    listEvent: {},
    flatlistColumn: {
        justifyContent: 'flex-start',
    },
    separator: {
        width: 10,
    },

    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImg: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT - 3,
        resizeMode: "cover",
        borderRadius: 10
    },
});

export default styles;
