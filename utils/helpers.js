module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_plural: (word, number) => {
      return number > 1 ? `${word}s` : word;
    }
  };