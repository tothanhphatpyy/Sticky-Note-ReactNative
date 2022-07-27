import { Dimensions, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useReducer, useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'; 

import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ModalInput = ({modalVisible, setModalVisible, state, dispatch, listNote, setPopupVisible}) => {

    const [alert, setAlert ] = useState(false);

    const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, value: event.nativeEvent.text });
    };

    const handleSubmit = () => {
        if(state.title == '' && state.detail == ''){
          setAlert(!alert);
        }
        else {
          setModalVisible(!modalVisible);
          listNote.push(state);
          
          Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Alert',
              textBody: 'Congrats! this task is add ListNote',
              autoClose: 1000,
          })
        }
        
      }
      
  return (
    <View style={{}}>

      {/* Modal add task */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#000000aa',flex:1}} onPress={()=>setModalVisible(!modalVisible)}/>
            <View style={{flex: 2, backgroundColor:'#282828', borderRadius: 10,}}>
            <ScrollView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

              <View>
              <TextInput
                  /* // Sử dụng bằng cách gọi trực tiếp với type
                  onChange={event => dispatch({ type: "ON_CHANGE", value: event.nativeEvent.text })} */

                  //Sử dụng bằng cách truyền tham số qua hàm
                  onChange={updateFieldValue("title")} 
                  multiline={true}
                  placeholder='  Name task'
                  style={{borderWidth: 0.2, borderColor:'gray', marginTop: 30, marginLeft: 20, width: '90%'}}
                />
                <TextInput
                  onChange={updateFieldValue("detail")} 
                  multiline={true}
                  placeholder='  Detail task'
                  style={{borderWidth: 0.2, borderColor:'gray', marginTop: 30, marginLeft: 20, paddingBottom: 100, width: '90%'}}
                />
                <TouchableOpacity style={{marginTop: 20, marginHorizontal: 50}}
                                  onPress={() => { handleSubmit()}}>
                    <Text style={{textAlign: 'center', padding: 13, fontSize: 15, backgroundColor: '#FF9900', color: 'white', fontWeight: 'bold', 
                                borderRadius: 10}}>Add Task</Text>
                </TouchableOpacity>
              </View>

              </TouchableWithoutFeedback>
            </ScrollView>
                
            </View>
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#000000aa',flex:1}} onPress={()=>setModalVisible(!modalVisible)}/>
      </Modal>

      <AwesomeAlert
          contentContainerStyle={{backgroundColor: '#585858', borderRadius: 25}}
          titleStyle={{ color: 'white' }}
          messageStyle={{ color: 'white' }}
          show={alert}
          showProgress={false}
          title="Error"
          message="Please type name or detail Task"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Try again"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlert(!alert)
          }}
      />

    </View>
  )
}

export default ModalInput

const styles = StyleSheet.create({})