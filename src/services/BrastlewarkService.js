import axios from 'axios';

class BrastlewarkService {
  getAllHabitants() {
    return axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
      .then(response => response);
  }
}

const brastlewarkService = new BrastlewarkService();

export default brastlewarkService;