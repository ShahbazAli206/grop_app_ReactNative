import React, { useContext, useState, useEffect } from "react";
import {
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const Categories = () => {
  const bckimage = require("../../../assets/bck3.jpg");
  const [categories, setcategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [itemClicked, setitemClicked] = useState("");
  const [name, setName] = useState("");
  const [nameadd, setNameadd] = useState("");

  const updatedColumns = { name: name };

  const handleAddButtonPress = () => {
    setModalVisibleAdd(true);
    console.log("Add button pressed\n");
  };

  const onEdit = (item) => {
    setitemClicked(item);
    setModalVisible(true);
    add_var(item);
    console.log("Edit button pressed\n");
  };

  const onDelete = (item) => {
    // handle the add button press here
    console.log("onDelete button pressed\n");
  };

  const renderHeader = () => {
    return (
      <LinearGradient
        colors={["#f24220", "#00ffff", "#ffff", "#f2ff"]}
        style={styles.header}
      >
        <Text style={styles.headerText}>ID</Text>
        <Text style={[styles.headerText, styles.name]}>Name</Text>
        <Text style={[styles.headerText, styles.edit]}>Edit</Text>
        <Text style={[styles.headerText, styles.delete]}>Delete</Text>
      </LinearGradient>
    );
  };

  const Add_Category = () => {
    axios
      .post("api/category_add", { name: nameadd })

      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    clear_var_add();
    data_category();
  };

  const update_Category = () => {
    axios
      .put(`/api/category_update/${itemClicked.id}`, updatedColumns)
      .then((response) => {
        console.log(
          "\n aa gaya ******* data of categories \n ",
          response.data.message
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log("\n this is data for call \n", updatedColumns);
    clear_var();
    data_category();
  };
  const add_var = (daattaa) => {
    setName(daattaa.name);
  };
  const clear_var = () => {
    setName("");
  };
  const clear_var_add = () => {
    setNameadd("");
  };
  const data_category = () => {
    axios
      .get("/api/categories")
      .then((response) => {
        console.log("\n aa gaya ******* data of categories \n ");
        setcategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    data_category();
  }, []);
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onEdit(item)}>
      <LinearGradient
        colors={[
          "#f2ff",
          "#ffff",
          "#00ffff",
          "#00ffff",
          // "#ffff",
          // "#f2ff",
        ]}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          // marginVertical: 5,
          // marginHorizontal: 10,
          backgroundColor: "#9fffff",
          borderRadius: 10,
          shadowColor: "blue",
          shadowOffset: { width: 6, height: 6 },
          shadowOpacity: 0.9,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View style={styles.itemLeft}>
          <View style={styles.itemid_view}>
            <Text style={styles.itemText_id}>{item.id}</Text>
          </View>
          <View style={styles.itemText_view}>
            <Text style={styles.itemText_name}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.itemRight}>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <AntDesign name="edit" size={24} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
        <FlatList
          data={categories}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          style={styles.list}
        />
        {itemClicked && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              setitemClicked("");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.form_header}>
                  Edit Category
                  <Text style={styles.form_header_id}>
                    ( ' {itemClicked.id} ' )
                  </Text>
                </Text>
                <View>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.form_input}
                    value={name}
                    onChangeText={setName}
                    placeholder={itemClicked.name}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.UpdateButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setitemClicked("");
                      update_Category();
                      console.log(
                        "\n this is data for call \n",
                        updatedColumns
                      );
                    }}
                  >
                    <Text style={styles.UpdateButtonText}>Update</Text>
                  </Pressable>

                  <Pressable
                    style={styles.CloseButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      clear_var();
                    }}
                  >
                    <Text style={styles.UpdateButtonText}>Close Modal</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleAdd}
          onRequestClose={() => {
            setModalVisibleAdd(!modalVisibleAdd);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.form_header}>Add New Category</Text>
              <View>
                <Text style={styles.label}>Name of Category : </Text>
                <TextInput
                  style={styles.form_input}
                  value={nameadd}
                  onChangeText={setNameadd}
                  placeholder={"New Category Name ..."}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.UpdateButton}
                  onPress={() => {
                    setModalVisibleAdd(!modalVisibleAdd);
                    Add_Category();
                    console.log("\n this is data for call \n", updatedColumns);
                  }}
                >
                  <Text style={styles.UpdateButtonText}>Submit</Text>
                </Pressable>

                <Pressable
                  style={styles.CloseButton}
                  onPress={() => {
                    setModalVisibleAdd(!modalVisibleAdd);
                    clear_var_add();
                  }}
                >
                  <Text style={styles.UpdateButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={handleAddButtonPress}
          style={styles.addButton}
        >
          <Ionicons name="add" size={36} color="white" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
    // padding: 10,
  },
  image_bck_vew: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "#f24220",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
  },

  header: {
    flexDirection: "row",
    backgroundColor: "purple",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 15,
  },
  headerText: {
    fontSize: 18,
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  id: {
    flex: 1,
    textAlign: "center",
  },
  name: {
    flex: 3,
  },
  edit: {
    flex: 1,
    textAlign: "center",
  },
  delete: {
    flex: 1,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "84%",
  },
  // updated style after space
  item: {
    borderRadius: 5,

    flexDirection: "row",
    marginVertical: 15,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  list: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  itemLeft: {
    flex: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  itemRight: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  itemText_id: {
    color: "purple",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemText_name: {
    flex: 3,
    fontSize: 16,
    marginRight: 15,
  },
  itemText_view: {
    flex: 5,
  },
  itemid_view: {
    flex: 2,
  },
  itemDetails: {
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#72511b",
    marginBottom: 5,
    fontWeight: "normal",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    alignItems: "center",
    textAlign: "center",
  },
  itemSubtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemStatus: {
    fontSize: 16,
    color: "#9900cc",
    marginTop: 5,
    marginBottom: 5,
  },
  itemTitle_id: {
    fontSize: 16,
    color: "brown",
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#552b2b",
    fontWeight: "bold",
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "#ff9f",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  form_header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  form_header_id: {
    fontSize: 16,
    color: "purple",
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    textAlignVertical: "top",
    fontSize: 16,
    fontWeight: "bold",
    color: "purple",
    marginTop: 3,
    marginBottom: 2,
  },
  form_input: {
    backgroundColor: "#F6F6F6",
    height: 40,
    width: 250,
    borderColor: "#907AFF",
    borderWidth: 2,
    borderRadius: 9,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  UpdateButton: {
    backgroundColor: "#907AFF",
    padding: 10,
    borderRadius: 19,
    alignItems: "center",
    width: 120,
    fontSize: 24,
    marginBottom: 8,
  },
  CloseButton: {
    backgroundColor: "#9f6A12",
    padding: 10,
    borderRadius: 19,
    alignItems: "center",
    width: 120,
    fontSize: 24,
    marginBottom: 8,
  },
  UpdateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Categories;
