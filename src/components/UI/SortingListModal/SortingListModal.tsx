import { TouchableOpacity } from "@gorhom/bottom-sheet";
import CheckBox from "@react-native-community/checkbox";
import React, { FC, useState } from "react";
import { Platform, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { colors } from "../../../constants/Colors";
import { Dictionary } from "../../../locales/dictionary";
import { capitalizeFirstLetter } from "../../../utils/text";
import { translate } from "../../../utils/translate";
import Button from "../Button/Button";

interface IEventListProps {
    modalizeRef: any,
    screenUserSorting:number,
    onSortingChange:(e:any) => void
};

const SortingListModal : FC<IEventListProps> = ({
    modalizeRef,
    screenUserSorting,
    onSortingChange

}) => {

    let activated = [false, false, false, false, false, false];

    activated[screenUserSorting] = true;

    const [isSelected, setSelection] = useState([
        {
            id: '1',
            checkbox: "По рейтингу",
            activated: activated[1]
        },
        {
            id: '2',
            checkbox: "По удалённости",
            activated: activated[2]
        },
        {
            id: '3',
            checkbox: "По стоимости, по возрастанию",
            activated: activated[3]
        },
        {
            id: '4',
            checkbox: "По стоимости, по убыванию",
            activated: activated[4]
        },
        {
            id: '5',
            checkbox: "По дате",
            activated: activated[5]
        }
    ]);

    const handleSelectOption = (checkbox: any) => {
        const newItems = [...isSelected];
        const newOptions = newItems.map(item => {
          return {
            ...item,
            activated: item.checkbox === checkbox,
          }
        });

        setSelection(newOptions);
    }

    const setSort = (id:number) => {
        onSortingChange(id);
    }

    return (
        <Modalize
            ref={modalizeRef}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
            snapPoint={350}
            modalHeight={350}
            modalStyle={{paddingVertical: 22}}
        >
            <Text style={{marginHorizontal: 22, marginBottom: 10, fontSize: 14}}>{capitalizeFirstLetter(translate(Dictionary.services.filter))}</Text>
            <View style={{paddingHorizontal: 20}}>
                {isSelected.map((item:any, index:number)=>{
                    return (
                        <TouchableOpacity key={index} onPress={() => handleSelectOption(item.checkbox)} style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                            {Platform.OS === 'ios' ? (
                                <CheckBox
                                    boxType={'square'}
                                    value={item.activated}
                                    onValueChange={() => setSort(item.id)}
                                    style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
                                    lineWidth={3}
                                    tintColor={colors.rainee}
                                    onTintColor={colors.greenPH}
                                    onCheckColor={colors.greenPH}
                                />
                            ) : (
                                    <CheckBox
                                        value={item.activated}
                                        onValueChange={() => setSort(item.id)}
                                    />
                        )}
                            <Text style={{color: colors.zcBrown, fontSize: 16}}>{item.checkbox}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={{alignSelf: "center", marginTop: 15}}>
                <Button
                    text={'Сохранить'}
                    action={()=>{modalizeRef.current?.close()}}
                />
            </View>
        </Modalize>
    )
}

export default SortingListModal;
