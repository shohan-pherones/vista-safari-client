interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className='text-center text-red-600'>
      <p>{error}</p>
    </div>
  );
};

export default Error;
