import React, { useState } from 'react';
import { fetchChatGPTResponse } from './api/openai';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetchChatGPTResponse(subject, topic);
      setResponse(result);
    } catch (error) {
      setResponse('Error fetching response from the API.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            교과
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topic">
            주제
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            보내기
          </button>
        </div>
      </form>
      {loading ? (
        <div className="w-full max-w-md flex justify-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        response && (
          <div className="w-full max-w-md bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
            <h2 className="text-gray-700 text-sm font-bold mb-2">Response:</h2>
            <p>{response}</p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
