import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  useLazyGetDistributorProductsQuery,
  useLazyGetShopsQuery,
  useSaveFinalDataMutation,
} from '../Redux/Slices/Network/networkSlice';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';

const RequestProduct = ({route}) => {
  const [billId, setBillId] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopList, setShopList] = useState([]);
  const [items, setItems] = useState([{productId: '', quantity: ''}]);
  const [productList, setProductList] = useState([]);

  const [getShops] = useLazyGetShopsQuery();
  const [getDistributorProducts] = useLazyGetDistributorProductsQuery();
  const [saveFinalData] = useSaveFinalDataMutation();


  const navigation = useNavigation()

  const todayDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

  const handleGetShops = async () => {
    const {data} = await getShops();
    if (data) {
      setShopList(data);
    }
  };

  const handleGetProduct = async distributorId => {
    const {data} = await getDistributorProducts({distributorId});
    if (data) {
      setProductList(data);
    }
  };

  const handleAddItem = () => {
    const selectedIds = items.map(i => i.productId).filter(Boolean);
    const remainingProducts = productList.filter(
      p => !selectedIds.includes(p._id),
    );

    if (remainingProducts.length > 0) {
      setItems(prev => [...prev, {productId: '', quantity: ''}]);
    }
  };

  const handleSave = async () => {
    const payload = {
      billId,
      date: todayDate,
      shopId: shopName,
      distributorId: route?.params?.distributorId,
      products: items,
    };

    console.log('Payload to save:', payload);
    const {data, error} = await saveFinalData({body: payload});

    if (data) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Saved successfully',
        autoClose: true,
      });

      navigation.navigate("success")      

    }
    if (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Save error',
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    handleGetShops();
    handleGetProduct(route?.params?.distributorId);
  }, [route?.params?.distributorId]);

  const getAvailableProducts = index => {
    const selectedIds = items
      .map((i, idx) => (idx === index ? null : i.productId))
      .filter(Boolean);
    return productList.filter(p => !selectedIds.includes(p._id));
  };

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

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={shopName}
          onValueChange={value => setShopName(value)}
          style={styles.picker}>
          <Picker.Item label="Shop Name" value="" />
          {shopList.map(item => (
            <Picker.Item
              key={item._id}
              label={item.shopName}
              value={item.shopId}
            />
          ))}
        </Picker>
      </View>

      {items.map((item, index) => {
        const availableProducts = getAvailableProducts(index);
        const selectedProduct = productList.find(p => p._id === item.productId);
        const maxQty = selectedProduct?.quantity || 0;
        const quantityOptions = [];
        for (let i = 5; i <= maxQty; i += 5) {
          quantityOptions.push(i);
        }

        return (
          <View style={styles.row} key={index}>
            <View style={[styles.pickerContainer, {flex: 1, marginRight: 8}]}>
              <Picker
                selectedValue={item.productId}
                onValueChange={value => {
                  const updated = [...items];
                  updated[index].productId = value;
                  updated[index].quantity = '';
                  setItems(updated);
                }}
                style={styles.picker}>
                <Picker.Item label="Code" value="" />
                {availableProducts.map(p => (
                  <Picker.Item
                    key={p._id}
                    label={p.productCode}
                    value={p._id}
                  />
                ))}
              </Picker>
            </View>

            <View style={[styles.pickerContainer, {flex: 1}]}>
              <Picker
                selectedValue={item.quantity}
                onValueChange={value => {
                  const updated = [...items];
                  updated[index].quantity = value;
                  setItems(updated);
                }}
                style={styles.picker}>
                <Picker.Item label="Quantity" value="" />
                {quantityOptions.map(qty => (
                  <Picker.Item key={qty} label={String(qty)} value={qty} />
                ))}
              </Picker>
            </View>
          </View>
        );
      })}

      {items.length < productList.length && (
        <TouchableOpacity onPress={handleAddItem}>
          <Text style={styles.addMore}>+ Add More Items</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
