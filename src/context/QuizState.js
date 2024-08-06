import QuizContext from "./quizContext";
import { useEffect, useState } from "react";

const QuizState = (props) => {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState({ 'rightAnswers': 0, 'wrongAnswers': 0 });
    const [next, setNext] = useState(0);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [answerList, setAnswerList] = useState([]);
    const len = questions.length;

    const fetchQuestions = async (api) => {
        try {
            setLoading(true); // Set loading state to true before fetch
            const response = await fetch(api);

            // Check if the response is an HTML document
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error('Received an HTML response instead of JSON.');
            }

            const data = await response.json();
            setQuestions(data.results);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false); // Ensure loading state is reset even if there's an error
        }
    };

    useEffect(() => {
        if (url) { // Only fetch if URL is not empty
            fetchQuestions(url);
        }
    }, [url]);

    return (
        <QuizContext.Provider value={{ answerList, setAnswerList, len, questions, setQuestions, url, setUrl, fetchQuestions, loading, setLoading, score, setScore, next, setNext }}>
            {props.children}
        </QuizContext.Provider>
    );
}

export default QuizState;
