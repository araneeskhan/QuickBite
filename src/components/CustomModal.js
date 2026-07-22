import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
  animation = 'slide',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType={animation}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={() => closeOnBackdrop && onClose()}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {showCloseButton && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}>
                    <CustomIcon name="close" size={24} color={COLORS.grey} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.body}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  closeButton: {
    padding: 4,
  },
  body: {
    padding: 16,
  },
});

export default CustomModal;