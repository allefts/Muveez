type LineErrorProps = {
  error: string;
};

const LineError = ({ error }: LineErrorProps) => {
  return <span style={{ color: "red" }}>{error}</span>;
};

export default LineError;
