import { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
const PlaySound = memo(function PlaySound({ sound }) {
  return (
    <View style={styles.contText}>
      <Text style={styles.textTitle} className="h-11 ">
        {sound.filename}
      </Text>
    </View>
  );
});
const styles = StyleSheet.create({
  contText: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textTitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: 17,
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: 15,
    width: 230
  }
});

export default PlaySound;
