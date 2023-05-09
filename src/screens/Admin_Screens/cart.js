import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const OrdersList = ({ orders, onEdit, onDelete }) => {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={[styles.headerText, styles.name]}>Name</Text>
        <Text style={[styles.headerText, styles.edit]}>Edit</Text>
        <Text style={[styles.headerText, styles.delete]}>Delete</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onEdit(item)}>
        <Text style={styles.id}>{item.id}</Text>
        <Text style={[styles.name, styles.itemText]}>{item.name}</Text>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(item)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  id: {
    flex: 1,
    textAlign: "center",
  },
  name: {
    flex: 2,
  },
  edit: {
    flex: 1,
    textAlign: "center",
  },
  delete: {
    flex: 1,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    flex: 2,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#2196F3",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
const ContactStackNavigator = () => {
  return (
    <View><Text> hi there</Text></View>);
}
export { OrdersList, ContactStackNavigator };
// export default OrdersList;