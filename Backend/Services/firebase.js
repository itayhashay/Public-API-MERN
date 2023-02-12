const axios = require('axios');

const resetPasssword = async (username) => {

} 

const login = async (username, password) => {
    try {
        const result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, { email: `${username}@public-api.com`, password });
        return result.status == 200;
    } catch (err) {
        return false;
    }
}

const register = async (username, password) => {
    try {
        const result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`, { email: `${username}@public-api.com`, password });
        return result.status == 200;
    } catch (err) {
        return false;
    }

}

module.exports = {
    resetPasssword,
    login,
    register
}