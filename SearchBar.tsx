import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ 
  placeholder = 'Search...', 
  onSearch, 
  initialValue = '' 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  
  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };
  
  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };
  
  return (
    <View style={styles.container}>
      <Search size={20} color="#888" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleChangeText}
      />
      {searchQuery ? (
        <TouchableOpacity onPress={handleClear}>
          <X size={20} color="#888" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
});