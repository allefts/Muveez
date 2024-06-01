const toWrittenDate = (date: Date) => {
  return date.toDateString().split(" ").slice(1).join("/");
};

export { toWrittenDate };
