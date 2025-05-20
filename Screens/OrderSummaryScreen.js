import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONT_SIZES} from '../Utility';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {showMessage} from 'react-native-flash-message';

const screenWidth = Dimensions.get('window').width;

const OrderSummaryScreen = ({route}) => {
  const navigation = useNavigation();
  const {products, totalAmount, billId, shopId, date} = route.params;
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHTML = () => {
    const productRows = products
      .map(
        item => `
      <tr>
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>₹${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `,
      )
      .join('');

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 16px; }
            h1 { color: #27ae60; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            .total { font-weight: bold; margin-top: 20px; text-align: right; }
          </style>
        </head>
        <body>
          <h1>🧾 Receipt</h1>
          <div><strong>Bill ID:</strong> ${billId}</div>
          <div><strong>Shop ID:</strong> ${shopId}</div>
          <div><strong>Date:</strong> ${date}</div>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>
          <div class="total">Total: ₹${totalAmount.toFixed(2)}</div>
        </body>
      </html>
    `;
  };

  const generateAndSharePDF = async () => {
    try {
      setIsGenerating(true);
      const options = {
        html: generateHTML(),
        fileName: `Receipt_${billId}`,
        directory: 'Caches',
      };
      const pdf = await RNHTMLtoPDF.convert(options);

      await Share.open({
        url: `file://${pdf.filePath}`,
        type: 'application/pdf',
        title: 'Share Receipt',
        subject: `Receipt #${billId}`,
      });
    } catch (error) {
      showMessage({
        message: 'Error sharing receipt',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.receiptTitle}>Receipt</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Bill ID:</Text>
          <Text style={styles.value}>{billId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Shop ID:</Text>
          <Text style={styles.value}>{shopId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.header, {flex: 2}]}>Code</Text>
          <Text style={[styles.cell, styles.header]}>Qty</Text>
          <Text style={[styles.cell, styles.header]}>Price</Text>
          <Text style={[styles.cell, styles.header]}>Subtotal</Text>
        </View>

        {products.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.cell, {flex: 2}]}>{item.code}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>₹{item.price}</Text>
            <Text style={styles.cell}>
              ₹{(item.quantity * item.price).toFixed(1)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: COLORS.primaryGreen}]}
        onPress={() => navigation.navigate('home')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#e74c3c'}]}
        onPress={generateAndSharePDF}
        disabled={isGenerating}>
        <Text style={styles.buttonText}>
          {isGenerating ? 'Preparing...' : 'Share Receipt as PDF'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    width: screenWidth - 10,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  receiptTitle: {
    fontSize: 24,
    fontFamily: 'Rubik-SemiBold',
    color: COLORS.primaryGreen,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Rubik-Medium',
    fontSize: FONT_SIZES[14],
    color: '#333',
  },
  value: {
    fontFamily: 'Rubik-Regular',
    fontSize: FONT_SIZES[14],
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  cell: {
    flex: 1,
    fontSize: FONT_SIZES[14],
    fontFamily: 'Rubik-Regular',
    color: '#444',
  },
  header: {
    fontFamily: 'Rubik-Medium',
    color: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: FONT_SIZES[16],
    fontFamily: 'Rubik-SemiBold',
    color: '#000',
  },
  totalValue: {
    fontSize: FONT_SIZES[16],
    fontFamily: 'Rubik-SemiBold',
    color: '#000',
  },
  button: {
    width: screenWidth - 40,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: FONT_SIZES[16],
    fontFamily: 'Rubik-Medium',
  },
});
