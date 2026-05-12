// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  }
  ,
  {
    files: ["app/**/*.ts", "app/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-native",
              importNames: ["Text", "Pressable", "TouchableOpacity", "TouchableHighlight", "TouchableWithoutFeedback"],
              message:
                "Use primitives from src/components/primitives instead (Text/IconButton/PressableRow/SearchField).",
            },
          ],
        },
      ],
    },
  },
]);
