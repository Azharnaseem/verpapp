import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";


// import LinearGradient from "react-native-linear-gradient";
const LeadsOppComponent = ({

  containerViewStyle = {},

companyName="Agrius It",
leadNo="123",
type="It Support",
leadOwner="Azhar Naseem",
showLead=true,
opportunityName="Rammes It Solutions",
documentNo="32",
stage="New stage",

  chatTextStyle,
}) => {
  return (
    <View style={[styles.container, containerViewStyle]}>
      {/* <LinearGradient
      style={[styles.container, containerViewStyle]}
      useAngle
      angle={180}
      colors={AppColors.red}
    > */}
    { showLead ?
   ( <>
   
      <Text style={styles.nameText} >Company Name:
       <Text style={styles.valueName} >{companyName}
       </Text></Text>
       <Text style={styles.nameText} >Lead No:
       <Text style={styles.valueName} > {leadNo}
       </Text></Text>
       <Text style={styles.nameText} >Type:
       <Text style={styles.valueName} >{type}
       </Text></Text>
       <Text style={styles.nameText} >Leader Owner:
       <Text style={styles.valueName} >{leadOwner}
       </Text></Text>
      
       </>):(
        <>
   
        <Text style={styles.nameText} >Opportunity Name:
         <Text style={styles.valueName} >{opportunityName}
         </Text></Text>
         <Text style={styles.nameText} >Document No:
         <Text style={styles.valueName} > {documentNo}
         </Text></Text>
         <Text style={styles.nameText} >Company Name:
         <Text style={styles.valueName} >{companyName}
         </Text></Text>
         <Text style={styles.nameText} >Stage:
         <Text style={styles.valueName} >{stage}
         </Text></Text>
         <Text style={styles.nameText} >Opportunity Owner:
         <Text style={styles.valueName} >{leadOwner}
         </Text></Text>
        
         </>
       )
}


    </View>
  );
};

export default LeadsOppComponent;
