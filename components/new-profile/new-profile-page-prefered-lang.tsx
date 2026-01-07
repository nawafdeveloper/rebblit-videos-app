import { Colors } from '@/constants/theme';
import { useNewProfileStore } from '@/store/new-profile-store';
import { LANGUAGES } from '@/types/langs';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const NewProfilePagePreferedLang = () => {
    const colorScheme = useColorScheme();
    const { preferedLang, setPreferedLang, setScreen } = useNewProfileStore();

    const [isNextDisabled, setIsNextDisables] = useState(true);
    const [selectedItem, setSelectedItem] = useState(0);

    useEffect(() => {
        if (preferedLang) {
            setIsNextDisables(false);
        } else {
            setIsNextDisables(true);
        }
    }, [preferedLang]);

    return (
        <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.title}>
                Choose your prefered language
            </ThemedText>
            <FlatList
                data={LANGUAGES}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.itemContainer}
                        onPress={() => {
                            setSelectedItem(item.id);
                            setPreferedLang(item.lang_code);
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 3,
                                borderColor: selectedItem === item.id ? Colors.dark.blue : Colors[colorScheme ?? 'dark'].card,
                                borderRadius: 99,
                                padding: 2,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: selectedItem === item.id ? Colors.dark.blue : 'transparent',
                                    borderRadius: 99,
                                    width: 12,
                                    height: 12,
                                }}
                            />
                        </View>
                        <ThemedText>{item.title}</ThemedText>
                    </Pressable>
                )}
                contentContainerStyle={{
                    padding: 16,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
            <ThemedView style={[styles.bottomContainer, { borderTopColor: Colors[colorScheme ?? 'dark'].card }]}>
                <Pressable
                    style={[
                        styles.nextButton,
                        { backgroundColor: Colors[colorScheme ?? 'dark'].text, opacity: isNextDisabled ? 0.3 : 1 },
                    ]}
                    disabled={isNextDisabled}
                    onPress={() => setScreen('gender')}
                >
                    <ThemedText
                        style={[
                            styles.nextButtonText,
                            { color: Colors[colorScheme ?? 'dark'].background },
                        ]}
                    >
                        Next step
                    </ThemedText>
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default NewProfilePagePreferedLang

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    title: {
        fontWeight: '800',
        fontSize: 44,
        lineHeight: 58,
        padding: 16
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    bottomContainer: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: 16,
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    nextButtonText: {
        fontWeight: '600'
    },
})