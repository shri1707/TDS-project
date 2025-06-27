import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [links, setLinks] = useState<{ url: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    setLinks([]);

    try {
      const response = await axios.post('https://tds-virtual-ta-api-gvxw.onrender.com', {
        question,
      });
      setAnswer(response.data.answer);
      setLinks(response.data.links);
    } catch (err: any) {
      setAnswer('Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          IITM Virtual TA for Tools in Data Science
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Ask any question related to Tools in Data Science course from IITM
          </p>
        </form>

        {answer && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Answer</h2>
            <p className="bg-gray-50 p-4 rounded-md border">{answer}</p>
            {links.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-1">Sources</h3>
                <ul className="list-disc list-inside">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-8">
        Created by{' '}
        <a
          href="https://in.linkedin.com/in/shrijan-kumar-b46186282"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shrijan Kumar
        </a>
      </footer>
    </div>
  );
}

export default App;
