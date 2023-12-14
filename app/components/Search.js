import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';

const countries = ['USA', 'Canada', 'Mexico', 'Brazil', 'India', 'China', 'Germany', 'France', 'Spain', 'Italy', 'Australia', 'Argentina', 'Japan', 'Russia', 'South Korea', 'Netherlands', 'United Kingdom', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 'Greece', 'Portugal', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Morocco', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Thailand', 'Indonesia', 'Malaysia', 'Singapore', 'Vietnam', 'Philippines', 'New Zealand']; // Array of country names

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);

    const handleSearch = (text) => {
        setSearchText(text);
        const filteredCountries = countries.filter((country) =>
            country.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(filteredCountries);
    };

    const handleSelectCountry = (country) => {
        setSelectedCountries([...selectedCountries, country]);
        setSearchText('');
        setSuggestions([]);
    };

    return (
        <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Search country"
                value={searchText}
                onChangeText={handleSearch}
            />
            <FlatList
                data={suggestions}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectCountry(item)}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                style={{ maxHeight: 50 }}
            />
            <Text>Selected Countries:</Text>
            <ScrollView style={{ maxHeight: 100 }}>
                <FlatList
                    data={selectedCountries}
                    renderItem={({ item }) => <Text>{item}</Text>}
                    keyExtractor={(item) => item}
                />
            </ScrollView>
        </View>
    );
};

export default Search;
