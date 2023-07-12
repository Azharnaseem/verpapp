import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import { LeadIcon, Oppartunity, Tickets } from "~assets/images";
import AppColors from "~utills/AppColors";

// import LinearGradient from "react-native-linear-gradient";
const TicketDetailBox = ({
  containerViewStyle = {},
  partNo = "6E32DH",
  quantity = "1",
  partDescription = "FM323 JDF  Yes ...",
  faultyPartner = "nill",
  leadNo = "123",
  pmUsed = "012139492",
  onsiteEngineering = "Azhar Naseem",
  timeOn = "12:21:22 PM",
  activityPreferance = "Ticket Open",
  ticketState = "Open",
  escalation = "No",
  onPress,

  chatTextStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerViewStyle]}>
      <View>
        {/* <View
          style={{
            alignSelf: "center",
            marginBottom: height(1),
            justifyContent: "center",
            alignItems: "center",
            width: width(15),
            height: width(15),
            borderRadius: width(100),
            backgroundColor: AppColors.scndry,
            shadowColor: AppColors.primary,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
          }}
        >
          <Image
            source={Tickets}
            style={{
              tintColor: AppColors.primary,
              width: width(10),
              height: width(10),
              alignSelf: "center",
            }}
          />
        </View> */}

        <View style={{ paddingLeft: width(1.5) }}>
          <Text numberOfLines={2} style={styles.nameText}>
            Onsite Engineering:
            <Text style={styles.valueName}>{` ${onsiteEngineering}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Time On:
            <Text style={styles.valueName}>{` ${timeOn}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Activity Preferance:
            <Text style={styles.valueName}>{` ${activityPreferance}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Ticket State:
            <Text style={styles.valueName}>{` ${ticketState}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Escalation:
            <Text style={styles.valueName}>{` ${escalation}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            PN Used:
            <Text style={styles.valueName}>{` ${pmUsed}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Activity Preferance:
            <Text style={styles.valueName}>{` ${activityPreferance}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Part No:
            <Text style={styles.valueName}>{` ${partNo}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Quantity:
            <Text style={styles.valueName}>{` ${quantity}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Part Description:
            <Text style={styles.valueName}>{` ${partDescription}`}</Text>
          </Text>
          <Text numberOfLines={2} style={styles.nameText}>
            Faulty Partner:
            <Text style={styles.valueName}>{` ${faultyPartner}`}</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TicketDetailBox;
