// app.js

const axios = require('axios');
const readline = require('readline');

const OPENAI_API_KEY = 'sk-sa-sDvs3GMsyrhg2oYzlyStT3BlbkFJFeybQd0WdXTC2KiipHPL';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function callOpenAI(text) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/gpt-4o/completions',
            {
                prompt: text,
                max_tokens: 150
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            }
        );
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('OpenAI API error:', error.response ? error.response.data : error.message);
        return 'An error occurred while fetching data from OpenAI.';
    }
}

function promptUser() {
    rl.question('Sorunuzu yazın (çıkmak için "exit" yazın): ', async (question) => {
        if (question.toLowerCase() === 'exit') {
            rl.close();
            return;
        }
        
        const response = await callOpenAI(question);
        console.log('Cevap:', response);
        promptUser();
    });
}

promptUser();
