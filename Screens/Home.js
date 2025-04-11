import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useLazyGetDistributorsQuery} from '../Redux/Slices/Network/networkSlice';
import {COLORS} from '../Utility';
import {useNavigation} from '@react-navigation/native';

// const distributorList = [
//   {label: 'Alpha Traders', value: 'alpha'},
//   {label: 'Beta Distributors', value: 'beta'},
//   {label: 'Gamma Supplies', value: 'gamma'},
//   {label: 'Delta Ventures', value: 'delta'},
//   {label: 'Epsilon Mart', value: 'epsilon'},
//   {label: 'Alpha Traders', value: 'alpha'},
//   {label: 'Beta Distributors', value: 'beta'},
//   {label: 'Gamma Supplies', value: 'gamma'},
//   {label: 'Delta Ventures', value: 'delta'},
//   {label: 'Epsilon Mart', value: 'epsilon'},
// ];

const Home = () => {
  const [selectedName, setSelectedName] = useState('');
  const [distributorId, setDistributorId] = useState('');

  const navigation = useNavigation();

  const [distributorList, setDistributorList] = useState([]);

  const [getDistributors] = useLazyGetDistributorsQuery();

  const distributorHandler = async () => {
    const {data, error} = await getDistributors();

    if (data) {
      setDistributorList(data);
    }
  };

  useEffect(() => {
    distributorHandler();
  }, []);

  const handleNext = () => {
    navigation.navigate('productRequest', {distributorId});
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/pb3.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedName}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue, '::selected item'); // this will be an object now
            setSelectedName(itemValue.distributorId);
            setDistributorId(itemValue._id);
          }}
          style={styles.picker}
          dropdownIconColor="green"
          mode="dropdown">
          <Picker.Item label="Select Distributor" value="" />
          {distributorList.map(item => (
            <Picker.Item
              key={item._id}
              label={item.name}
              value={{distributorId: item.distributorId, _id: item._id}}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Distributor ID"
        value={selectedName}
        onChangeText={setDistributorId}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: 100,
    marginBottom: 40,
  },
  pickerContainer: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  picker: {
    width: '100%',
    height: '100%',
    fontFamily: 'Rubik',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 12,
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: COLORS.borderGreen,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 25,
    paddingHorizontal: 10,
    fontFamily: 'Rubik-Regular',
    color: '#1e1e1e',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Rubik-SemiBold',
  },
});
