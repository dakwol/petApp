import React, {FC, useEffect, useState} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../constants/Colors';
import {closeIcon} from '../../../constants/images';
import styles from './styles';
import {useDebounce, useDebouncedCallback} from "use-debounce";


interface ISearchInputProps {
    onSearchPress: (data:string) => void;
    //onClearPress: () => void;
    placeholderText: string;
};

interface ISearchInputState {
    text: string
}

const SearchInput: FC<ISearchInputProps> = ({
                                                placeholderText,
                                                onSearchPress = (data) => {},
                                                //onClearPress = () => {}
                                            }) => {

    const [inputValue, setInputValue] = useState<string>("");
    useEffect(() => {
        onSearchPress(inputValue);
    }, [inputValue])

    /*
    const [searchTerm, setSearchTerm] = useState<string>("");

        const debounced = useDebouncedCallback(
            (value) => {
                setSearchTerm(value);
            },
            500,
            // The maximum time func is allowed to be delayed before it's invoked:
            { maxWait: 600 }
        );

        const onChangeText = (text:any) => {
            setInputValue(text);
            debounced(text);
        }

        useEffect(() => {
            console.log('RETURNED SEARCH TERM 1', searchTerm);
            if (searchTerm.length >= 3 || searchTerm == '') {
                console.log('RETURNED SEARCH TERM 2', searchTerm);
                onSearchPress(searchTerm);
            }
        }, [searchTerm])


        const debounced = useDebounce(searchTerm, 1000);

        useEffect(() => {
            console.log('SEARCH DEBOUNCED');
            console.log(searchTerm);
            if (debounced.length >= 3 || debounced == '') {
                console.log('SEARCH DEBOUNCED FIRE');
                onSearch()
            }
        }, [debounced])

        const onChangeText = (data:string) => {
            setSearchTerm(data);
            if(searchTerm.length > searchTerm.length && data.length < 3) {
                onSearch('')
            }
        }

        const onSearch = (text?: any) => {
            const searchText = text ? text:debounced;
            console.log('SEARCH FIRE TEXT', searchText)
            onSearchPress(searchText)
        }

        const onClear = () => {
            setSearchTerm('');
        }
    */
    return (
        <View style={styles.container}>
            {/*
            <TouchableOpacity onPress={onSearch}>
                <Image source={searchIcon} style={styles.iconLeft} />
            </TouchableOpacity>
            */}
            <TextInput
                value={inputValue}
                style={styles.textInput}
                placeholder={placeholderText}
                placeholderTextColor={colors.black}
                onChangeText={ (text) => { setInputValue(text) }  }
            />
            <TouchableOpacity onPress={ () => { setInputValue('') } }>
                <Image source={closeIcon} style={styles.iconRight} />
            </TouchableOpacity>
        </View>
    );
};
export default SearchInput;
