import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
// common variable
const Constants = {
    App: {
        Name: 'App',
    },
    Screen: {
        Login: 'Login',
        Products: 'Products',
        ProductForm: 'ProductForm',
    },
    Preferences: {
        User: 'user',
    },
    FontFamily: {
       Black: 'Poppins-Black',
    },
    Ratio: {
        Width: width,
        Height: height
    },
    AppLink: ''
}

export default Constants;
