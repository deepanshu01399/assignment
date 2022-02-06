import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Picker from './Picker';

let workstation = [
  {
    key: 0,
    label: 'WorkStation A',
  },
  {
    key: 1,
    label: 'WorkStation B',
  },
];

const Dashboard = () => {
  const USERDETAILFORA = 'userdetailA';
  const USERDETAILFORB = 'userdetailB';

  const [user, setUser] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [logedInUser, setLogedInUserDetail] = useState([]);

  const dataStoretableObj = {
    workStatation: 0,
    userName: '',
    isAdmin: '',
  };

  const onChangeText = userDetail => setUser(userDetail);
  const onSubmit = () => {
    setLogedInUserDetail([]);
    if (!user) return;
    else {
      let userInLowerCase = user.toLowerCase();
      if (
        ((userInLowerCase == 'u1a' ||
          userInLowerCase == 'u2a' ||
          userInLowerCase == 'u3a') &&
          selectedIndex === 0) ||
        ((userInLowerCase == 'u1b' ||
          userInLowerCase == 'u2b' ||
          userInLowerCase == 'u3b') &&
          selectedIndex === 1) ||
        userInLowerCase == 'u1' ||
        userInLowerCase == 'u2'
      ) {
        saveData(user);
      } else {
        Alert.alert(
          'Info',
          'Invalid userName or u have selected wrong WorkStation...',
        );
      }
    }
  };

  const saveData = async () => {
    try {
      if (user.toLowerCase() == 'u1' || user.toLowerCase() == 'u2')
        getUserDetailsForAdmin(user);
      else {
        const previousUser = await AsyncStorage.getItem(
          selectedIndex ? USERDETAILFORA : USERDETAILFORB,
        );
        if (previousUser == null) {
          dataStoretableObj.isAdmin =
            user == 'U1' || user == 'U2' ? true : false;
          dataStoretableObj.userName = user;
          dataStoretableObj.workStatation = workstation[selectedIndex].key;
          await AsyncStorage.setItem(
            selectedIndex ? USERDETAILFORA : USERDETAILFORB,
            JSON.stringify(dataStoretableObj),
            Alert.alert(
              `Hey user ${user}`,
              `you are now logged in to  ${workstation[selectedIndex].label}`,
            ),
          );
        } else {
          const prevUserOBj = JSON.parse(previousUser);
          if (prevUserOBj.userName.toLowerCase() === user.toLowerCase()) {
            Alert.alert(
              `Hey user ${user}`,
              `you are already logged in to ${workstation[selectedIndex].label}`,
            );
          } else
            alert(
              `A User ${prevUserOBj.userName}  is already logged in to ${
                workstation[prevUserOBj.workStatation].label
              }`,
            );
        }
      }
    } catch (e) {
      alert(`Something went wrong!...`);
    }
  };

  const getUserDetailsForAdmin = async user => {
    const userDetailArray = [];
    try {
      const userfromA = await AsyncStorage.getItem(USERDETAILFORA);
      if (userfromA != null) userDetailArray.push(JSON.parse(userfromA));
      const userfromB = await AsyncStorage.getItem(USERDETAILFORB);
      if (userfromB != null) userDetailArray.push(JSON.parse(userfromB));
      if (userfromA !== null || userfromB !== null) {
        setLogedInUserDetail(userDetailArray);
      } else {
        Alert.alert(`Hey  Admin ${user}`, 'No user logged in till now');
      }
    } catch (e) {
      alert('Failed to get UserDetails...');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(
        selectedIndex ? USERDETAILFORA : USERDETAILFORB,
      );
      setLogedInUserDetail([]);
      setUser('');
      alert('User logout successfully');
    } catch (e) {
      alert('Something went wrong!...');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingText}>Select any One Workstation</Text>
          <Picker
            data={workstation ?? []}
            onChange={option => {
              setSelectedIndex(option.key);
            }}>
            <TouchableOpacity>
              <View style={styles.spinnerBoxStyle}>
                <Text style={styles.spinnerTxtStyle}>
                  {workstation[selectedIndex].label}
                </Text>
                <Image source={require('./assets/blueDownArrow.png')} />
              </View>
            </TouchableOpacity>
          </Picker>
        </View>
        <Text style={styles.notetxt}>
          Note: for WorkStation A: users are U1A,U2A,U3A ,{`\n`} for WorkStation B users are
          U1B,U2B,U3B and {`\n`} for Admin use U1 and U2
        </Text>

        <View style={styles.rowPanel}>
          <TextInput
            style={styles.input}
            value={user}
            placeholder="Enter Username"
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            onPress={onSubmit}
            style={[styles.button, {backgroundColor: 'cyan'}]}>
            <Text style={styles.buttonText}>Login </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.columnPanel}>
          {logedInUser.map(user => (
            <Text style={styles.admintextData}>
              {user.userName} is logged in to {' '}
              {workstation[user.workStatation].label}
            </Text>
          ))}

          <TouchableOpacity
            onPress={clearStorage}
            style={[styles.button, {backgroundColor: 'red'}]}>
            <Text style={styles.buttonText}>Log out user from {workstation[selectedIndex].label}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent:"center",
  },

  notetxt: {
    fontSize: 13,
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
  },
  spinnerBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'cyan',
    borderRadius: 7,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 1.2,
    backgroundColor: 'lightgrey',
  },
  spinnerTxtStyle: {
    fontSize: 13,
    color: 'black',
    marginRight: 10,
  },
  headingText: {
    fontSize: 18,
    marginTop: 30,
    color: 'black',
  },
  rowPanel: {
    paddingTop: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnPanel: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    padding: 5,
    marginVertical: 10,
    backgroundColor: '#dcdcdc',
    textAlign: 'center',
  },
  admintextData: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
  input: {
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    margin: 10,
    width: '40%',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal:30,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});

export default Dashboard;
