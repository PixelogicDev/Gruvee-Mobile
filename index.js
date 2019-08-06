/**
 * @format
 */

import React from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

class HelloGruvee extends React.Component {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
        },
        title: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hello, Grüvee!</Text>
            </View>
        );
    }
}

// Module name
AppRegistry.registerComponent('HelloGruvee');
