import localforage from "localforage";

export const saveQuizResult = async (score) => {
    let history = await localforage.getItem("quizHistory") || [];
    history.push({ date: new Date().toISOString(), score });
    await localforage.setItem("quizHistory", history);
};

export const getQuizHistory = async () => {
    return await localforage.getItem("quizHistory") || [];
};
