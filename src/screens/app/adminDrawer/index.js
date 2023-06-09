import React, { useRef, useState } from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import styles from "./styles";
// import { Button, SearchField, SuccessModal, UserProfile } from "~components";
import AppColors from "~utills/AppColors";
import ScreenNames from "~routes/routes";
import { width } from "~utills/Dimension";
// import { ProfileImage } from "~assets/images";
// import CommonStyles from "~utills/CommonStyles";
// import DrawerModal from "~components/drawerModal";
// import { width } from "~utills/Dimension";
// import { UserData } from "~utills/dataDummy";
const AdminDrawer = ({ navigation, ...props }) => {
  const drawerModalRef = useRef();
  const [active, setActive] = useState(0);
  const [modalUserImage, setModalUserImage] = useState();
  const UserListRender = ({ item, index }) => {
    // console.log("index ====", index);
    return (
      <View>
        <Text>azhar amsrrbjkcksjb</Text>
        {/* <UserProfile
          name={item?.name}
          image={item?.image}
          mail={item?.mail}
          onPressRightIcon={() => {
            setModalUserImage(item?.image);
            drawerModalRef.current.show();
          }}
          // imageCon={active && styles.imageBorder}
          selected={active == index}
          onPress={() => {
            setActive(index);
            navigation.navigate(ScreenNames.ADMINHOME);

            // console.log("item id is ===", active);
          }}
          containerViewStyle={CommonStyles.marginBottom_1}
        /> */}
      </View>
    );
  };
  // const dispatch = useDispatch();
  // const driverProfile = useSelector(state => state?.Config?.pfdata);
  // const userData = useSelector(state => state?.Auth?.user);
  const [selectedItem, setSelectedItem] = useState(null);
  // const logoutMethod = async () => {
  //   await auth().signOut();
  //   showMessage({
  //     message: "Logged Out",
  //     description: "Succfully logged out",
  //     type: "danger",
  //   });
  //   dispatch(logout());
  // };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.ProfileInfoContainer}>
        <View>
          <Text style={styles.profileName}>Azhar Naseem</Text>
          <Text style={styles.profilePhoneNumber}>+1 234 567 8900</Text>
        </View>
      </View>

      <DrawerContentScrollView
        style={styles.DrawerItem}
        contentContainerStyle={{ alignItems: "center" }}
        // style={ }
        {...props}
      >
        <DrawerItem
          style={{
            backgroundColor: "black",
            // width: width(39),
          }}
          label="Home"
          labelStyle={styles.dawerLabel}
          onPress={() => {
            setSelectedItem(1);
            navigation.navigate(ScreenNames.HOME);
          }}
        />
        <DrawerItem
          style={{
            backgroundColor:
              selectedItem == 2 ? AppColors.secndry : AppColors.black,
          }}
          label="Profile"
          labelStyle={styles.dawerLabel}
          onPress={() => {
            setSelectedItem(2);
            navigation.navigate(ScreenNames.PROFILE);
          }}
        />
        <DrawerItem
          style={{
            backgroundColor:
              selectedItem == 3 ? AppColors.secndry : AppColors.black,
          }}
          labelStyle={styles.dawerLabel}
          label="Long Text"
          onPress={() => {
            setSelectedItem(3);
            navigation.navigate(ScreenNames.CONVERSATIONSCREEN);
          }}
        />
        <DrawerItem
          style={{
            backgroundColor:
              selectedItem == 4 ? AppColors.secndry : AppColors.black,
          }}
          labelStyle={styles.dawerLabel}
          label="conversation"
          onPress={() => {
            setSelectedItem(4);
            navigation.navigate(ScreenNames.LONGTEXTSCREEN);
          }}
        />

        <DrawerItem
          style={{
            backgroundColor:
              selectedItem == 5 ? AppColors.secndry : AppColors.black,
          }}
          labelStyle={styles.dawerLabel}
          label="Settings"
          onPress={() => {
            setSelectedItem(5);
            navigation.navigate("SettingScreen");
          }}
        />
        <DrawerItem
          style={{
            backgroundColor: AppColors.black,
          }}
          labelStyle={styles.dawerLabel}
          label="LogOut "
          onPress={() => {
            logoutMethod();
          }}
        />
      </DrawerContentScrollView>
      <Text style={styles.DrawerBtmText}>
        {
          "V 2.0.0 \n Customer care: 020 3355 3743 \n Email: info@247postaltd.com \n VAT Reg. #: 340 3392 29"
        }
      </Text>
      {/* <DrawerModal ref={drawerModalRef} /> */}
    </SafeAreaView>
  );
};

export default AdminDrawer;
