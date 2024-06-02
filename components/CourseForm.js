import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Input from './Input';

export default function CourseForm() {
  return (
    <View>
      <Input
        label="Tutar"
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: () => {},
        }}
      />
      <Input
        label="Tarih"
        textInputConfig={{
          placeHolder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Başlık"
        textInputConfig={{
          multiline: true,
          onChangeText: () => {},
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
