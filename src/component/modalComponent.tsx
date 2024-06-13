import React, { PropsWithChildren } from "react";
import { Modal as ModalContainer, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "react-native-elements";
import stylesModal from "./stylesModal";

interface ModalProps {
  modalVisible: boolean;
  headerTitle: string;
  buttonTitle: string;
  onClose: () => void;
  onAction: () => void;
}

export function ModalComponent({
  modalVisible,
  headerTitle,
  buttonTitle,
  onClose,
  onAction,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <ModalContainer
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={stylesModal.container}>
        <View style={stylesModal.modalView}>
          <View style={stylesModal.header}>
            <View />
            <Text style={stylesModal.headerTitle}>{headerTitle}</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={30} />
            </Pressable>
          </View>
          <View style={stylesModal.content}>{children}</View>
          <View style={stylesModal.button}>
            <Button title={buttonTitle} onPress={onAction} />
          </View>
        </View>
      </View>
    </ModalContainer>
  );
}