import { Dimensions, Keyboard, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ListNote = ({listNote, state, dispatch}) => {

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [valueIndex, setValueIndex] = useState();

  const array_layout = useRef([]);

  const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, value: event.nativeEvent.text });
    };

  const onSubmitDelete=() => {
    listNote.splice(valueIndex, 1);
    setShow(!show)
  }

  const handleSubmitUpdate=() => {
    setShow(!show)
    setShowModalUpdate(!showModalUpdate);
  }

  const onSubmitUpdate= () => {
    setShowModalUpdate(!showModalUpdate)
    listNote[valueIndex].title = state.title;
    listNote[valueIndex].detail = state.detail;
  }
  
  const getLayout = (layout) =>{
    array_layout.current.push(layout.y);
  }
  const setLayout = (valueIndex) => {
      return array_layout.current[valueIndex];
  }

  const getValue = ()=>{
    if(listNote[valueIndex] !== undefined) {
      return listNote[valueIndex]
    }
    else{
      return ''
    }
  }
  
  
  return (
    <View style={{marginTop: 10}}>
      {listNote.map((item, index) => 
        <TouchableOpacity key={index} 
                          style={{marginTop: 10, marginHorizontal: 10, height: 100, borderWidth: 0.2, borderColor: 'gray'}}
                          onLayout={event => {
                            getLayout(event.nativeEvent.layout)
                          }}>
            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={1} style={{marginTop: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold'}}>{item.title}</Text>
              <TouchableOpacity 
                style={{ position: 'absolute', right: 0, padding: 10, top: -10}}
                onPress={() => {setShow(!show), setValueIndex(index)}}
                >
                <Text style={{fontSize: 20, fontWeight: 'bold',}}>...</Text>
              </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={{marginTop: 5, marginHorizontal: 15, fontSize: 15}}>{item.detail}</Text>
        </TouchableOpacity>
      )}

      {/* Modal Input Update */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalUpdate}
        >
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#000000aa',flex:1}} onPress={()=>setShowModalUpdate(!showModalUpdate)}/>
            <View style={{flex: 2, backgroundColor:'#282828', borderRadius: 10,}}>
            <ScrollView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

              <View> 
              <TextInput
                  /* // Sử dụng bằng cách gọi trực tiếp với type
                  onChange={event => dispatch({ type: "ON_CHANGE", value: event.nativeEvent.text })} */

                  //Sử dụng bằng cách truyền tham số qua hàm
                  /* onChange={updateFieldValue("title")}  */
                  defaultValue={getValue().title}
                  onChange={updateFieldValue("title")}
                  multiline={true}
                  placeholder='  Name task'
                  style={{borderWidth: 0.2, borderColor:'gray', marginTop: 30, marginLeft: 20, width: '90%'}}
                />
                <TextInput
                  defaultValue={getValue().detail}
                  onChange={updateFieldValue("detail")} 
                  multiline={true}
                  placeholder='  Detail task'
                  style={{borderWidth: 0.2, borderColor:'gray', marginTop: 30, marginLeft: 20, paddingBottom: 100, width: '90%'}}
                />
                

                <TouchableOpacity style={{marginTop: 20, marginHorizontal: 50}}
                                  onPress={() => { onSubmitUpdate()}}>
                    <Text style={{textAlign: 'center', padding: 13, fontSize: 15, backgroundColor: '#FF9900', color: 'white', fontWeight: 'bold', 
                                borderRadius: 10}}>Update Task</Text>
                </TouchableOpacity>
              </View>

              </TouchableWithoutFeedback>
            </ScrollView>
                
            </View>
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#000000aa',flex:1}} onPress={()=>setShowModalUpdate(!showModalUpdate)}/>
      </Modal>    

      <Modal
      animationType="none"
      transparent={true}
      visible={show}
      >
        <TouchableOpacity activeOpacity={1} style={{height: 80 +setLayout(valueIndex),}} onPress={()=>setShow(!show)}/>
          <View style={{height: 90, flexDirection: 'row', marginRight: 20}}>
            <TouchableOpacity style={{width: '60%'}} onPress={()=>setShow(!show)} />
            <View style={{width: '40%', backgroundColor: '#202020', borderWidth: 0.5, borderColor: '#000000'}}>
              <TouchableOpacity style={{}}
                                    onPress={() => handleSubmitUpdate() }>
                      <Text style={{ padding: 12, paddingHorizontal: 20, fontSize: 13.5, color: 'white',}}>Update Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{}}
                                    onPress={() => onSubmitDelete() }>
                      <Text style={{ padding: 12, paddingHorizontal: 20, fontSize: 13.5, color: 'white',}}>Delete Task</Text>
              </TouchableOpacity>
            </View> 
          </View>
        <TouchableOpacity activeOpacity={1} style={{height: windowHeight, }} onPress={()=>setShow(!show)}/>
      </Modal>

    </View>
   
  )
}

export default ListNote

const styles = StyleSheet.create({})