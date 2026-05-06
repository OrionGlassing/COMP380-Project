import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Arrow from './Arrow';
import AccountBtn from './AccountBtn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { theme } from '@/src/constants/theme';
import CoKitchenLogo from "@/assets/logo/CoKitchenLogo.svg";


interface Props {
    logoText: String;
    backButtonEnabled: boolean;
    profileButtonEnabled: boolean;
    transparent: boolean;
}

const PageHeader = ({ logoText, backButtonEnabled, profileButtonEnabled, transparent }: Props) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={[(transparent ? styles.transparentHeader : styles.header), {paddingTop: insets.top}]}>
            <View style={styles.backContainer}>
                {backButtonEnabled && 
                    <Arrow
                        type={"arrow-back"}
                        onPress={() => router.back()}
                    />
                }
            </View>
            <View style={styles.logoContainer}>
                <View style={styles.logoOutline}>
                    <View style={styles.logoGroup}>
                        <View style={styles.logoImageWrapper}>
                            <CoKitchenLogo width={75} height={75} />
                        </View>
                        <Text style={styles.title}>{logoText}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.profileContainer}>
                {profileButtonEnabled && 
                    <AccountBtn onPress={() => router.push("/account")} />
                }
            </View>
        </View>
    );
};

export default PageHeader;

const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 150,
        backgroundColor: theme.colors.option,
        boxShadow: [{
            offsetX: 0,
            offsetY: 1,
            blurRadius: 25,
            spreadDistance: 2,
            color: 'rgba(0,0,0,0.6)',
            //inset: true, 
        }],
    },
    transparentHeader: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 150,
    },
    backContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoOutline: {
        width: '100%',
        height: '70%',
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        /*
        boxShadow: [{
            offsetX: 0,
            offsetY: 1,
            blurRadius: 3,
            spreadDistance: 0,
            color: 'rgba(0,0,0,0.4)',
            //inset: true, 
        }],
        */
    },
    logoGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoImageWrapper: {
        width: 30,   
        height: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.darkinput,
        textAlign: 'left',
        letterSpacing: 0.3,
    },
});