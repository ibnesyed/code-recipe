import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { responsiveSizes, resposiveFontSize, FONTS } from "../../utils";

const TPINInputModal = ({ visible, onOkPressed, onCancelPressed }) => {
  const [tpin, setTpin] = useState("");

  const onOk = () => {
    onOkPressed(tpin);
    setTpin("");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Please enter your TPIN code</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter TPIN"
            onChangeText={(value) => setTpin(value)}
            value={tpin}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onCancelPressed}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOk}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: responsiveSizes(height, width, scale, fontScale, 20),
    borderRadius: responsiveSizes(height, width, scale, fontScale, 10),
    width: "100%",
  },
  modalTitle: {
    fontSize: resposiveFontSize(height, width, scale, fontScale, 20),
    fontWeight: "bold",
    marginBottom: responsiveSizes(height, width, scale, fontScale, 10),
  },
  textInput: {
    width: "80%",
    height: responsiveSizes(height, width, scale, fontScale, 40),
    borderColor: "gray",
    borderWidth: responsiveSizes(height, width, scale, fontScale, 1),
    marginBottom: responsiveSizes(height, width, scale, fontScale, 20),
    backgroundColor: "white",
    fontFamily: FONTS.interRegular,
    fontSize: resposiveFontSize(height, width, scale, fontScale, 14),
    color: "black",
    borderRadius: responsiveSizes(height, width, scale, fontScale, 5),
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    color: "black",
    fontFamily: FONTS.interRegular,
    fontSize: resposiveFontSize(height, width, scale, fontScale, 16),
    marginHorizontal: responsiveSizes(height, width, scale, fontScale, 15),
  },
});

export default TPINInputModal;
