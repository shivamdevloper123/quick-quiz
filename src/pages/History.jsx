import { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/storage";

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getQuizHistory();
            setHistory(data);
        };
        fetchHistory();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Quiz History</h2>

            {history.length === 0 ? (
                <p className="text-center text-muted">No quiz history available.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped text-center">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Attempt #</th>
                                <th scope="col">Date</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((record, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(record.date).toLocaleString()}</td>
                                    <td>{record.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default History;
