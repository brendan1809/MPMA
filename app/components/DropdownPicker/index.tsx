/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DropdownSelectProps } from './props';
import { styles } from './styles';

export const DropdownPicker = (props: DropdownSelectProps) => {
    const { items, placeholder, onSelect } = props

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                items={items}
                value={selectedValue}
                setValue={setSelectedValue}
                open={open}
                setOpen={setOpen}
                placeholder={placeholder}
                containerStyle={{ height: open === true ? 200 : null }}
                maxHeight={150}
                style={{ backgroundColor: '#fafafa' }}
                labelStyle={{
                    fontSize: 16,
                }}
                autoScroll={true}
                onSelectItem={(item) => handleSelect(item.value)}
            />
        </View>
    );
};