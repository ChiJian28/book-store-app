export const formatDate = (date) => {
    const formatted = new Date(date).toLocaleString();
    return formatted;
};