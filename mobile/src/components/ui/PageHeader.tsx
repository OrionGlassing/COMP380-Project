import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Arrow from './Arrow';
import AccountBtn from './AccountBtn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { theme } from '@/src/constants/theme';


interface Props {
    logoText: String;
    backButtonEnabled: boolean;
    profileButtonEnabled: boolean;
}

const PageHeader = ({ logoText, backButtonEnabled, profileButtonEnabled }: Props) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, {paddingTop: insets.top}]}>
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
                    {/*<CoKitchenLogo width={35} height={35}/>*/}
                    <Text style={styles.title}>{logoText}</Text>
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
        backgroundColor: theme.colors.background,
        boxShadow: [{
            offsetX: 0,
            offsetY: 1,
            blurRadius: 15,
            spreadDistance: 2,
            color: 'rgba(0,0,0,0.4)',
            //inset: true, 
        }],
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 10,
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
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.darkinput,
        textAlign: 'center',
        letterSpacing: 0.3,
    },
});