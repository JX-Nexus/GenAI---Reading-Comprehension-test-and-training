import axios from 'axios';


export class AuthService {
    

    async createAccount({ fullname, email, username, password, occupation, preferredGenres, preferredReadingTime, DOB }) {
        try {
            const response = await axios.post('/api/v1/users/register', {
                fullname,
                email,
                username,
                password,
                occupation,
                preferredGenres,
                preferredReadingTime,
                DOB
            });
    
            if (response && response.data) {
                return this.login({ email, password});
            }
    
            
            console.error("Unexpected response format:", response);
            return null;
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }
    

     async login ({ email, password }) {
        try {
            const response = await axios.post('/api/v1/users/login', { email, password });
            return response.data;

        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                throw new Error(error.response.data.message || 'An error occurred during login.');
            } else if (error.request) {
                console.error('Error request:', error.request);
                throw new Error('No response from the server. Please try again.');
            } else {
                console.error('Error message:', error.message);
                throw new Error('An error occurred while setting up the login request.');
            }
        }
    };
    
    

    async getCurrentUser() {
        try {
            
            const response = await axios.get('/api/v1/users/current-user');

            
            return response.data
        } catch (error) {   
            console.log("backend service :: getCurrentUser :: error", error);
            throw error
        }

        
    }

    async logout() {
        try {
            
            await axios.post('/api/v1/users/logout');
        } catch (error) {
            console.log("backend service :: logout :: error",);
            throw error
        }
    }
  
}

const authService = new AuthService();

export default authService;
