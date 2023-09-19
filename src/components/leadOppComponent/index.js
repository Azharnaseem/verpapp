import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import { LeadIcon, Oppartunity } from "~assets/images";
import AppColors from "~utills/AppColors";

// import LinearGradient from "react-native-linear-gradient";
const LeadsOppComponent = ({
  containerViewStyle = {},
  companyName = "Agrius It",
  leadNo = "123",
  type = "It Support",
  leadOwner = "Azhar Naseem",
  opportunityOwner = "Azhar Naseem",
  showLead = true,
  opportunityName = "Rammes It Solution",
  documentNo = "32",
  stage = "New stage",
  onPress,
  docNo="20YT-uu-2",
  opportunityType="Support",
  chatTextStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerViewStyle]}>
      {/* <LinearGradient
      style={[styles.container, containerViewStyle]}
      useAngle
      angle={180}
      colors={AppColors.red}
    > */}
      {showLead ? (
      
          <View style={{ width:width(88), flexDirection: "row" }}>
            <Image
              source={showLead ? LeadIcon : Oppartunity}
              style={{
                tintColor: AppColors.primary,
                width: width(10),
                height: width(10),
                alignSelf: "center",
              }}
            />
            <View style={{ paddingLeft: width(1.5) }}>
              <View style={{ alignItems:"center",flexDirection:"row",}}>
              <Text numberOfLines={1} style={styles.nameText}>
                Leader Owner:
              </Text>
              <Text numberOfLines={1} style={styles.valueName}>{` ${leadOwner}`}</Text>
              </View>
              <View style={{ alignItems:"center",flexDirection:"row",}}>
              <Text  style={styles.nameText}>
                Company Name:
              </Text>
              <Text numberOfLines={1} style={styles.valueName}>{` ${companyName}`}</Text>
              </View>
              <View style={{ alignItems:"center",flexDirection:"row",}}>
              <Text numberOfLines={1} style={styles.nameText}>
                Type:
              </Text>
              <Text numberOfLines={1} style={styles.valueName}>{` ${type}`}</Text>
            </View>
          </View>
          </View>

         
        
      ) : (
        <View style={{ width:width(88), flexDirection: "row" }}>
          <Image
            source={showLead ? LeadIcon : Oppartunity}
            style={{
              // borderWidth: 2,
              // borderColor: AppColors.scndry,
              tintColor: AppColors.primary,
              width: width(10),
              height: width(10),
              // backgroundColor: AppColors.darkGrey + "90",
              alignSelf: "center",
            }}
          />
          <View style={{ paddingLeft: width(1.5) }}>
          <View style={{ width:width(76), alignItems:"center",flexDirection:"row",}}>
             
              <Text numberOfLines={2} style={styles.nameText}>
              Opportunity Name:
              <Text style={styles.valueName}>{` ${opportunityName}`}</Text>
            </Text>
              </View>
            
            {/* <Text numberOfLines={2}  style={styles.nameText}>
            Document No:
            <Text style={styles.valueName}> {documentNo}</Text>
          </Text> */}
           <View style={{ width:width(76), alignItems:"center",flexDirection:"row",}}>
            <Text numberOfLines={2} style={styles.nameText}>
              Company Name:
              <Text style={styles.valueName}>{` ${companyName}`}</Text>
            </Text>
            </View>
            {/* <View style={{ alignItems:"center",flexDirection:"row",}}>
              <Text numberOfLines={1} style={styles.nameText}>
              Stage:
              </Text>
              <Text numberOfLines={2} style={styles.stageName}>{` ${stage}`}</Text>
              </View> */}
            <Text numberOfLines={1} style={[styles.stageName]}>
              Stage:
              <Text style={styles.valueName}>{` ${stage}`}</Text>
            </Text>
            <Text numberOfLines={2} style={[styles.stageName]}>
              Opportunity Owner:
              <Text style={[styles.valueName,{paddingRight:width(6)}]}>{` ${opportunityOwner}`}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.stageName}>
              Opportunity Type:
              <Text style={styles.valueName}>{` ${opportunityType}`}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.stageName}>
              Doc No:
              <Text style={styles.valueName}>{` ${docNo}`}</Text>
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default LeadsOppComponent;
