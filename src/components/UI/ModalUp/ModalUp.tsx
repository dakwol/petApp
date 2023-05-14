import React, {FC, PropsWithChildren} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
// import Modal from 'react-native-modal';
import styles from './styles';
import Modal from 'react-native-modalbox';

type Props = {
    onHideModal: () => void;
    onShowModal: () => void;
    visible: boolean;
};

const ModalUp:FC<PropsWithChildren<Props>> = (props) => {
    return (
        <Modal
            position={'bottom'}
            isOpen={props.visible}
            style={styles.modalUp}
            onClosed={props.onHideModal}
            swipeArea={50}
            // onSwipeComplete={props.onHideModal}
            // animationIn={'fadeInUp'}
            // animationOut={'fadeOutDown'}
            // swipeDirection="down"
        >

            <View style={styles.modalHeader}>
                <TouchableOpacity
                    style={styles.toggleBar}
                    onPress={props.onHideModal}
                />
            </View>
            <ScrollView>
                <View style={styles.modalUpContainer}>{props.children}</View>
            </ScrollView>
        </Modal>
    );
};
export default ModalUp;
