import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import React, { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Register(props) {

    const [camera, setCamera] = useState();
    const [type, setType] = useState(CameraType.back);
    const [imgSrc, setImgSrc] = useState('');
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);

    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();


    const handleAddImage = () => {
      setShowCamera(true);
    }

    const handleBack = () => {
      setShowCamera(false);
    }
  
    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  
    const takePicture = () => {
      if (camera) {
        camera.takePictureAsync({ onPictureSaved: onPictureSaved });
      }
    };
  
    const onPictureSaved = photo => {
      setImgSrc(photo.uri);
      console.log(imgSrc);
      setShowCamera(false);
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
    });
      if (!result.canceled) {
        setImgSrc(result.assets[0].uri);
    }
  };

    const handleRegister = () => {
      console.log(email, phone, userName, imgSrc, password, confirm);
      if (email && phone && userName && imgSrc && password && confirm) {
        props.navigation.navigate("Login");
      } else {
        alert('Invalid Error')
      }
    };

  return (
    <View style={styles.container}> 
       {showCamera ? (<Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
       <TouchableOpacity onPress={toggleCameraType}>
         <MaterialIcons style={styles.btnCam} name="screen-rotation" />
       </TouchableOpacity>
       <TouchableOpacity onPress={takePicture}>
         <MaterialIcons style={styles.btnCam} name="camera" />
       </TouchableOpacity>
       <TouchableOpacity onPress={handleBack}>
         <MaterialIcons style={styles.btnCam} name="undo"/>
       </TouchableOpacity>
     </Camera> ) : (
      <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
       <View style={styles.iconCon}>
            <Image source={require("../assets/icon.png")} style={styles.icon}/>
            <Text style={styles.text}>DineInTime</Text>
          </View>
          <View style={styles.inputCon}>
          <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              onChangeText={setPhone}
              value={phone}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={setUserName}
              value={userName}
            />
            <View style={{flexDirection:'row-reverse', justifyContent:'center'}}>
              <TouchableOpacity onPress={handleAddImage}><MaterialIcons style={styles.imgBtn} name="add-a-photo" /></TouchableOpacity>
              <TouchableOpacity onPress={pickImage}><MaterialIcons style={styles.imgBtn} name="add-photo-alternate" /></TouchableOpacity>
            </View>
            {imgSrc && <Image source={{ uri: imgSrc }} style={{ width: 100, height: 100, alignSelf:'center' }} />}
            <View style={{flexDirection:'row-reverse', justifyContent:'center'}}>
            <TextInput
              style={styles.pass}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <TextInput
              style={styles.pass}
              placeholder="Verify"
              secureTextEntry
              onChangeText={setConfirm}
              value={confirm}
            />
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.title}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomCon}>
            <TouchableOpacity>
              <Text style={styles.reg} onPress={() => props.navigation.navigate("Login")}>
                Already signed up?
              </Text>
            </TouchableOpacity>
          </View> 
      </ScrollView> )}
      </View>
  )
}


const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: "#94B285",
      width: "100%",
      height: "100%",
    },
    iconCon: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    icon: {
      width: 100,
      height: 100,
      alignSelf: "center",
    },
    inputCon: {
      flex: 1,
      backgroundColor: "#D9D9D9",
      borderRadius: 30,
      margin: 30,
      padding: 20,
      marginTop: 10,
      height: '100%',
      justifyContent: "center",
    },
    input: {
      height: 50,
      width: "75%",
      alignSelf: "center",
      borderColor: "#B0B0B0",
      borderWidth: 1,
      margin: 10,
      padding: 5,
    },
    pass: {
        height: 50,
        width: "35%",
        alignSelf: "center",
        borderColor: "#B0B0B0",
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
    imgBtn: {
      fontSize: 50,
      alignSelf: "center",
      borderColor: "#B0B0B0",
      borderWidth: 1,
      margin: 10,
      padding: 5,
    },
    camera: {
        width: windowWidth-50, 
        height: windowHeight-50, 
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    btnCam: {
        fontSize: 50,
        height: 60,
        justifyContent: 'center',
        borderRadius: 30,
        padding: 5,
        margin: 10,
        backgroundColor: 'white',
    },
    text: {
      alignSelf: "center",
      color: "#D9D9D9",
      fontSize: 30,
      fontFamily: "sans-serif-condensed",
      fontWeight: 700,
    },
    btn: {
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      width: "75%",
      backgroundColor: "#B0B0B0",
      borderColor: "#838383",
      borderWidth: 3,
      margin: 10,
    },
    title: {
      alignSelf: "center",
      fontSize: 20,
    },
    bottomCon: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    reg: {
      alignSelf: "center",
      fontSize: 18,
      color: "#D9D9D9",
    },
  });
