import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://react-my-burger-f85df.firebaseio.com/'
});


export default instance;