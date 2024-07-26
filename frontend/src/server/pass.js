import axios from 'axios';

export class PassService {

  async getPassage({ occupation, genres, bookType }) {
    try {
      const response = await axios.post('/api/v1/model/passage', {
        occupation,
        genres,
        bookType
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        throw new Error(error.response.data.message || 'An error occurred while fetching the passage.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response from the server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        throw new Error('An error occurred while setting up the request.');
      }
    }
  }
  async generateQuestions(passageId) {
    try {
      const response = await axios.post('/api/v1/model/questions', { passageId });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        throw new Error(error.response.data.message || 'An error occurred while generating questions.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response from the server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        throw new Error('An error occurred while setting up the request.');
      }
    }
  }
  async saveAnswers(passageId, answers) {
    try {
      const response = await axios.post(`/api/v1/model/passage/${passageId}`, { answers });
      console.log(response)
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        throw new Error(error.response.data.message || 'An error occurred while saving the answers.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response from the server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        throw new Error('An error occurred while setting up the request.');
      }
    }
  }
  async getRecommendation({ occupation, genres, bookType, mythology, scripturesName, selectedType, type }) {
    try {
      const response = await axios.post('/api/v1/model/recommendation', {
        occupation,
        genres,
        bookType,
        mythology,
        scripturesName,
        selectedType,
        type
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        throw new Error(error.response.data.message || 'An error occurred while fetching the recommendation.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response from the server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        throw new Error('An error occurred while setting up the request.');
      }
    }
  }

}

const passService = new PassService()
export default passService;