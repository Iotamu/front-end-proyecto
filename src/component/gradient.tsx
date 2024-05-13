import React from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 

interface GradientButtonProps {
    onPress?: () => void; 
    style?: object;
    text?: string;
}

export function GradientButton(props: GradientButtonProps) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['royalblue', 'hotpink']}
                style={styles.gradient}
            >
                {props.text && <Text style={styles.text}>{props.text}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    width: '100%',
    alignItems: 'center',
  },
    gradient: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 10,
        width: '160%',
    },
    text: {
        backgroundColor: 'transparent',
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});