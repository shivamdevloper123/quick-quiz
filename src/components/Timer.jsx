import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp(); // Call the callback function when time is up
            return; // Exit the useEffect early if timeLeft is 0
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 700);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    return (
        <div>
            <h2>{timeLeft} seconds remaining</h2>
        </div>
    );
};

export default Timer;
