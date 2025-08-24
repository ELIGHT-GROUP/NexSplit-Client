```javascript
 <PopupDialog
    trigger={<Text className="text-blue-500">Open Dialog</Text>}
    header={<Text className="heading-md">Dialog Title</Text>}
    footer={(close) => (
        <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
                className="btn-orange px-4 py-2 rounded-lg"
                onPress={close}
            >
                <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="btn-primary px-4 py-2 rounded-lg"
                onPress={() => {
                    console.log("Confirmed");
                    close();
                }}
            >
                <Text className="text-white">Confirm</Text>
            </TouchableOpacity>
        </View>
    )}
>
    {(close) => (
        <Text className="body-text">
            This is a reusable popup dialog body.
            <Text className="text-blue-500" onPress={close}>
                Close inside body
            </Text>
        </Text>
    )}
</PopupDialog>
```