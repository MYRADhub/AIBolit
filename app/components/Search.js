import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Box, IconButton, Icon, Input, CloseIcon } from 'native-base';

const differentSymptoms = ['Fever', 'Cough', 'Shortness of breath or difficulty breathing', 'Tiredness', 'Aches', 'Chills', 'Sore throat', 'Loss of smell', 'Loss of taste', 'Headache', 'Diarrhea', 'Severe vomiting', 'Confusion', 'Chest pain', 'Bluish lips or face']; // Array of symptoms

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [symptoms, setSymptoms] = useState(differentSymptoms);

    const handleSearch = (text) => {
        setSearchText(text);
        const filteredSymptoms = symptoms.filter((country) =>
            country.toLowerCase().includes(text.toLowerCase())
        );
        filteredSymptoms.sort();
        setSuggestions(filteredSymptoms);
    };

    const handleSelectCountry = (country) => {
        setSelectedSymptoms([...selectedSymptoms, country]);
        setSymptoms(symptoms.filter((item) => item !== country));
        setSearchText('');
        setSuggestions([]);
    };

    const handleCountryDeletion = (country) => {
        const newSelectedSymptoms = selectedSymptoms.filter(
            (item) => item !== country
        );
        setSelectedSymptoms(newSelectedSymptoms);
        setSymptoms([...symptoms, country]);
    };

    const renderSelectedItem = ({ item }) => (
        <Box
          key={item}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 0.75,
          }}
        >
            <View style={{paddingLeft: 10, paddingRight: 2,
            borderRadius: 5,
            borderColor: 'gray',
            borderWidth: 1,
            opacity: 0.6,
            backgroundColor: 'lightgray', flexDirection: 'row',}}>
                <Text style={{top:4, fontSize:16}}>{item}</Text>
                <IconButton
                    size="sm"
                    onPress={() => handleCountryDeletion(item)}
                    icon={<CloseIcon color={'black'} style={{opacity: 0.5}} />}
                />
            </View>
        </Box>
      );

    return (
        <ImageBackground source={require('../../assets/main_page.png')} style={{ flex: 1, marginBottom: 30, resizeMode: 'cover', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: 24, left:60, padding: 10, width: 266.7 }}>
                <Input w='245'
                    variant={'unstyled'}
                    style={{ height: 50, fontSize: 20 }}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={handleSearch}
                    focusOutlineColor={'white'}
                    
                />
                <FlatList
                    data={suggestions}
                    renderItem={({ item, index }) => (
                        searchText.length > 0 && (
                            <TouchableOpacity key={index} style={{ backgroundColor: 'white', borderColor: '#CECECE', borderWidth: 1, width: '100%', borderRadius: 5}} onPress={() => handleSelectCountry(item)}>
                                <Text style={{ fontSize: 20, textAlign: 'left', padding: 10 }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    )}
                    keyExtractor={(item) => item}
                    style={{ maxHeight: 180 }}
                />
                {searchText === '' && (
                    <>
                        <ScrollView style={{ maxHeight: 180}}>
                            <FlatList
                                contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}} 
                                data={selectedSymptoms}
                                renderItem={({ item }) => renderSelectedItem({ item })}
                                keyExtractor={(item) => item}
                            />
                        </ScrollView>
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

export default Search;
