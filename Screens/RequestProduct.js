import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  getDistributorProducts,
  useLazyGetDistributorProductsQuery,
  useLazyGetDistributorsQuery,
  useLazyGetShopsQuery,
} from '../Redux/Slices/Network/networkSlice';

const RequestProduct = ({route}) => {
  console.log(route?.params?.distributorId);

  const [billId, setBillId] = useState('');
  const [date, setDate] = useState('');
  const [shopName, setShopName] = useState('');
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');

  const [shopList, setShopList] = useState([]);

  //   const shopList = [
  //     {label: 'Shop 1', value: 'shop1'},
  //     {label: 'Shop 2', value: 'shop2'},
  //     {label: 'Shop 3', value: 'shop3'},
  //   ];

  const productCodes = [
    {label: 'Code A', value: 'A'},
    {label: 'Code B', value: 'B'},
    {label: 'Code C', value: 'C'},
  ];

  const quantities = ['1', '2', '3', '4', '5'];

  const [getShops] = useLazyGetShopsQuery();

  const [getDistributorProducts] = useLazyGetDistributorProductsQuery();

  const handleGetShops = async () => {
    const {data, error} = await getShops();

    if (data) {
      setShopList(data);
    }

    // console.log(data, error);
  };

  const handleGetProduct = async distributorId => {
    const {data, error} = await getDistributorProducts({distributorId});

    console.log(data, error)

    


    


  };

  useEffect(() => {
    handleGetShops();
    handleGetProduct(route?.params?.distributorId)
  }, [route?.params?.distributorId]);



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../Images/pb3.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Bill ID"
        value={billId}
        onChangeText={setBillId}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#888"
      />

      {/* Shop Name Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={shopName}
          onValueChange={value => setShopName(value)}
          style={styles.picker}>
          <Picker.Item label="ShopName" value="" />
          {shopList.map(item => (
            <Picker.Item
              key={item?._id}
              label={item?.shopName}
              value={item?.shopId}
            />
          ))}
        </Picker>
        {/* <Ionicons name="chevron-down" size={20} color="green" style={styles.icon} /> */}
      </View>

      {/* Code and Quantity in row */}
      <View style={styles.row}>
        <View style={[styles.pickerContainer, {flex: 1, marginRight: 8}]}>
          <Picker
            selectedValue={code}
            onValueChange={value => setCode(value)}
            style={styles.picker}>
            <Picker.Item label="Code" value="" />
            {productCodes.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          {/* <Ionicons name="chevron-down" size={20} color="green" style={styles.icon} /> */}
        </View>

        <View style={[styles.pickerContainer, {flex: 1}]}>
          <Picker
            selectedValue={quantity}
            onValueChange={value => setQuantity(value)}
            style={styles.picker}>
            <Picker.Item label="Quantity" value="" />
            {quantities.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
          {/* <Ionicons name="chevron-down" size={20} color="green" style={styles.icon} /> */}
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.addMore}>+ Add More Items</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RequestProduct;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 100,
    flex: 1,
  },
  logo: {
    height: 100,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'Rubik',
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
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  addMore: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Rubik',
  },
  saveButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#70B570',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Rubik',
  },
});
