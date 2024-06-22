import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
  }
});

export const fetchChatGPTResponse = async (subject, topic) => {
  const prompt = `${subject}과의 ${topic}와 관련한 핵심 개념을 5개 뽑으세요. 맥락에 적절하지 않은 내용이 나오면 답변을 거절하세요.`;
  try {
    const response = await api.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching data from OpenAI API', error);
    throw error;
  }
};
