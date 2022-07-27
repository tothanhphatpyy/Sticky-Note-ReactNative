import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Alert, TouchableWithoutFeedback, Keyboard, TextInput, Button } from 'react-native'
import React, { useReducer, useRef, useState } from 'react'
import ListNote from './Component/ListNote';
import ModalInput from './Component/ModalInput';
import {Root} from 'react-native-alert-notification';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  
  const listNote = useRef([
    {
      title: ' Ghi chu 1.',
      detail: 'Day la ghi chu 1.Day la ghi chu 1.Day la ghi chu 1.Day la ghi chu 1.Day la ghi chu 1.Day la ghi chu 1.Day la ghi chu 1.Day la ghi chu 1.Day la ghi chu 1.'
    },
    {
      title: ' Ghi chu 2',
      detail: 'Day la ghi chu 2'
    },

  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [checkPopup, setCheckPopup] = useState();
  
  const INITIAL_STATE = {
    title : '', 
    detail: '',
  };
  
  const reducer = (state, action) => {
    switch (action.type){
      case "updateFieldValue" : 
        return {...state, [action.field] : action.value}
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <Root>
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 10}}
          >Sticky Note
        </Text>
        <ListNote listNote={listNote.current} state={state} dispatch={dispatch} />
        <View style={{height : 100}}></View>
      </ScrollView>

      <TouchableOpacity style={{ alignItems: 'center', marginTop: 10, position: 'absolute', top: windowHeight- 150, left: windowWidth/2 - 15 }}
                        onPress={() => { setModalVisible(!modalVisible) }}>
                       
        <Text style={{fontSize: 35, fontWeight: '300', borderRadius: 20,
                    backgroundColor: 'orange', color: 'white', paddingHorizontal: 15}}
        >+</Text>
      </TouchableOpacity> 

      {modalVisible && <ModalInput modalVisible={modalVisible} 
                                   setModalVisible={setModalVisible} 
                                   setPopupVisible={setPopupVisible} 
                                   setCheckPopup={setCheckPopup}
                                   state={state} dispatch={dispatch} 
                                   listNote={listNote.current} />}              
    </View>
    </Root>
    
  )
}

export default App

const styles = StyleSheet.create({})