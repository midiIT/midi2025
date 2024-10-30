import { Link } from 'react-router-dom';

type Props = {
  buttonText: string;
  to: string;
};

function Button({ buttonText, to }: Props) {
  return (
    <Link
      to={to}
      className="px-6 py-3 bg-blue-500 text-white rounded text-lg hover:bg-blue-600"
    >
      {buttonText}
    </Link>
  );
}

export default Button;
