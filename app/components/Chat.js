import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { View, Input, Button, Text } from 'native-base';

let messageCount = 0;

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');


    // const aiResponses = ['Hello!', 'How can I assist you?', 'Nice to meet you!'];

    const handleSendMessage = () => {
        messageCount += 1;
        if (inputText.trim() !== '') {

            if (messageCount % 2 === 0) {
                setMessages((prevMessages) => [
                    { text: inputText, sender: 'user' },
                    ...prevMessages,
                ]);
                setInputText('');
                return;
            }
            else {
                // messageCount += 1;
                setMessages((prevMessages) => [
                    { text: inputText, sender: 'ai' },
                    ...prevMessages,
                ]);
                setInputText('');
                return;
            }
            // setMessages((prevMessages) => [
            //     { text: inputText, sender: 'user' },
            //     ...prevMessages,
            // ]);
            // setInputText('');
        }
    };

    const renderMessage = ({ item }) => (
        <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold', color: item.sender === 'user' ? '#f4ce4d' : '#b3bedc', fontSize: 15 }} alignSelf={item.sender === 'user' ? 'flex-end' : 'flex-start'}>
                {item.sender === 'user' ? 'You' : 'AIbolit'}
            </Text>
            <View
                style={{
                    backgroundColor: item.sender === 'user' ? '#b0d194' : '#bba0c3',
                    padding: 8,
                    borderRadius: 8,
                    maxWidth: '70%',
                    alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
            >
                <Text style={{ color: 'white' }}>{item.text}</Text>
            </View>
        </View>
    );
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                inverted
            />
            <View mb={10}>
                <Input
                    size = "lg"
                    borderRadius={10}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type your message..."
                />
                <Button onPress={handleSendMessage} borderRadius={10}>
                    <Text>Send</Text>
                </Button>
            </View>
        </View>
    );
};

export default Chat;
