import axios from 'axios';
import cheerio from 'cheerio';

const fetchShutdownData = async () => {
    try {
        const response = await axios.get('https://www.cnn.com/politics/')
        const $ = cheerio.load(response.data)
        const headline =  $('.top-story-headline').text;
        const summary = $('.top-story-summary').text;
        
        return {headline, summary};
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
};

export default fetchShutdownData;