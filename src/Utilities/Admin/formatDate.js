const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(newDate);
};

export default formatDate;
