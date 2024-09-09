import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { evaluate } from 'mathjs';

const App = () => {
  const [display, setDisplay] = useState('');
  const [deg, setDeg] = useState(false);

  const calculateSin = (value, isDeg) => {
    const angleInRadian = isDeg ? (value * Math.PI) / 180 : value; 
    return Math.sin(angleInRadian); 
  };

 
  const arr = ['sin', 'cos'];
  const removePress = (value) => {
    if (value.endsWith(arr[0]) || value.endsWith(arr[1])){
      setDisplay(value.slice(0, -3))
    }else {
      setDisplay(value.slice(0, -1))
    }
  }

  const handlePress = (value) => {
    if (value === '=') {
      try {
        const match = display.match(/sin\(([^)]+)\)/);
        if (match) {
          const a = match[1];
          const b = evaluate(a); 
          const result = calculateSin(b, deg);
          setDisplay(result.toString());
        } else {
          setDisplay(evaluate(display).toString());
        }
      } catch (e) {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
    }
    else if (value === 'DEL'){
      removePress(display);
    } else {
      setDisplay(display + value);
    }
  };

  // Bật/tắt chế độ độ (deg)
  const turnOnDeg = () => {
    setDeg(!deg);
  };

  // Custom button
  const renderButton = (value) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        {deg && <Text style={styles.textHeader}>deg</Text>}
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('/')}
          <TouchableOpacity style={styles.button} onPress={turnOnDeg}>
            <Text style={{ fontSize: 32 }}>
              Deg
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('*')}
          {renderButton('sin')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('-')}
          {renderButton('(')}
        </View>
        <View style={styles.row}>
          {renderButton('0')}
          {renderButton('.')}
          {renderButton('=')}
          {renderButton('+')}
          {renderButton(')')}
        </View>
        <View style={styles.row}>
          {renderButton('C')}
          {renderButton('DEL')}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#d3d3d3',
    padding: 20,
  },
  displayText: {
    fontSize: 48,
    textAlign: 'right',
  },
  buttons: {
    flex: 2,
    backgroundColor: '#eaeaea',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 32,
    color: '#333333',
  },
  textHeader: {
    flex: 2,
    fontSize: 15,
    color: '#000'
  }
});

export default App;
