import { View, StyleSheet, Text } from 'react-native'
import Cardbox from '../Components/Card/Card'
import { BtIconeM, BtIconeAct, BtIconePgt } from '../Components/IconButton/IconButton'
import { BotãoEditarConta, BotãoEditarPgto, BotãoHist, BotãoSair } from '../Components/Button/Button'
import { Footer } from '../Components/Footer/footer'


export default function Profile() {
    return (
        <View style={styles.container}>

                <Cardbox>
                    <Text style={styles.title}>SUA CONTA</Text>
                    <BotãoEditarConta />
                    <BotãoEditarPgto />
                    <BotãoHist />
                    <BotãoSair />
                </Cardbox>
                <Footer></Footer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1C1635',
        padding: 20,
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    }
})