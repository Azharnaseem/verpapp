import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Text,
  Pressable,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import AppColors from "~utills/AppColors";
import styles from "./styles";
import { height, width } from "~utills/Dimension";
import {
  Accountant,
  AccountantIcon,
  Notification,
  NotificationIcon,
  ProfileImage,
  Setting,
  SettingIcon,
} from "~assets/images";

const DrawerModal = (
  {
    children,
    onClose,
    containerStyle,
    swipeDirection = "down",
    backdropColor = AppColors.black,
    backdropOpacity = 0.5,
    wraperContainer,
  },
  ref
) => {
  const [isVisible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: function () {
      setVisible(true);
    },
    hide: function () {
      setVisible(false);
    },
  }));

  return (
    <Modal
      animationIn={"slideInLeft"}
      animationOut={"slideOutLeft"}
      isVisible={isVisible}
      //  / style={[styles.modalContainer, wraperContainer]}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      onBackdropPress={() => setVisible(false)}
      // avoidKeyboard={true}
      onBackButtonPress={() => setVisible(false)}
      // swipeDirection={swipeDirection}
      onSwipeComplete={() => setVisible(false)}
      // propagateSwipe={true}
    >
      <View style={styles.modalInnerContainer}>
        <View style={styles.modalInnerrContainer}>
          <View style={{ marginTop: width(33) }}>
            <FlatList
            
              data={[
                {
                  name: "Account",
                  icon: AccountantIcon,
                },
                {
                  name: "Setting",
                  icon: SettingIcon,
                },
                {
                  name: "Notifications",
                  icon: NotificationIcon,
                },
              ]}
              renderItem={({ item, index }) => {
                console.log("==============", item);
                return (
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      width: "90%",
                      borderBottomWidth: 1,
                      borderBottomColor: AppColors.primary,
                      height: 50,
                      marginTop: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      style={{
                        // backgroundColor:"red",
                        width: width(5),
                        height: width(5),
                        borderRadius: width(100),
                      }}
                      resizeMode="contain"
                      source={item?.icon}
                    />
                    <Text
                      style={{
                        color: AppColors.black,
                        fontSize: width(3.5),
                        fontWeight: "600",
                        paddingLeft: width(2),
                      }}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <Text
              style={{
                marginTop: height(22),
                alignSelf: "center",
                color: AppColors.primary,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Azhar Naseem Mughal
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: height(15),
            position: "absolute",
            top: 50,
          }}
        >
          <View
            style={{
              width: "100%",
              height: height(12),
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: "center",
              paddingLeft: width(3),

              // borderWidth: 3,
              // borderColor: AppColors.scndry,
              flexDirection: "row",
              backgroundColor: AppColors.scndry,
            }}
          >
            <Image
              style={{
                borderWidth: 3,
                borderColor: AppColors.primary,
                width: width(12),
                height: width(12),
                borderRadius: width(100),
              }}
              resizeMode="contain"
              source={ProfileImage}
            />
            <View style={{ paddingLeft: 9 }}>
              <Text
                style={{
                  fontSize: width(4),
                  fontWeight: "600",
                  color: AppColors.white,
                }}
              >
                Arfa Cream
              </Text>
              <Text style={{ fontSize: width(3), color: AppColors.white }}>
                Software Developer
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // marginTop:-1
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,

                // borderLeftWidth:22,
                borderRightWidth: 22,
                borderBottomWidth: 20,
                borderLeftColor: "black",
                borderRightColor: AppColors.scndry + "80",
                borderBottomColor: "transparent",
              }}
            ></View>
            <View
              style={{
                width: 0,
                height: 0,

                borderLeftWidth: 22,
                // borderRtWidth:22,
                borderBottomWidth: 20,
                borderLeftColor: AppColors.scndry + "80",

                borderBottomColor: "transparent",
              }}
            ></View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default forwardRef(DrawerModal);
