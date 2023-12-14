import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Box, IconButton, Icon, Input, CloseIcon } from 'native-base';

const allCountries = ['USA', 'Canada', 'Mexico', 'Brazil', 'India', 'China', 'Germany', 'France', 'Spain', 'Italy', 'Australia', 'Argentina', 'Japan', 'Russia', 'South Korea', 'Netherlands', 'United Kingdom', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 'Greece', 'Portugal', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Morocco', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Thailand', 'Indonesia', 'Malaysia', 'Singapore', 'Vietnam', 'Philippines', 'New Zealand']; // Array of country names

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [countries, setCountries] = useState(allCountries);

    const handleSearch = (text) => {
        setSearchText(text);
        const filteredCountries = countries.filter((country) =>
            country.toLowerCase().includes(text.toLowerCase())
        );
        filteredCountries.sort();
        setSuggestions(filteredCountries);
    };

    const handleSelectCountry = (country) => {
        setSelectedCountries([...selectedCountries, country]);
        setCountries(countries.filter((item) => item !== country));
        setSearchText('');
        setSuggestions([]);
    };

    const handleCountryDeletion = (country) => {
        const newSelectedCountries = selectedCountries.filter(
            (item) => item !== country
        );
        setSelectedCountries(newSelectedCountries);
        setCountries([...countries, country]);
    };

    const renderSkillItem = ({ item }) => (
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
            <View style={{ position: 'absolute', top: 22, left:60, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, width: 266.7 }}>
                <Input w='245'
                    style={{ height: 50, fontSize: 20 }}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={handleSearch}
                />
                <FlatList
                    data={suggestions}
                    renderItem={({ item }) => (
                        searchText.length > 0 && (
                            <TouchableOpacity onPress={() => handleSelectCountry(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )
                    )}
                    keyExtractor={(item) => item}
                    style={{ maxHeight: 50 }}
                />
                {searchText === '' && (
                    <>
                        <ScrollView style={{ maxHeight: 180}}>
                            <FlatList
                                contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}} 
                                data={selectedCountries}
                                renderItem={({ item }) => renderSkillItem({ item })}
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
