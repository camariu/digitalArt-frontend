import PropTypes from 'prop-types';
import { useState } from 'react';

const PortfolioItem = ({ title, description, imageUrl, clientUrl, status }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(' ')}...`;
    }
    return text;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${status ? 'block' : 'hidden'}`}>
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">
          {isExpanded ? description : truncateText(description, 25)}
          {description.split(' ').length > 25 && (
            <button
              className="text-blue-500 underline ml-1"
              onClick={handleReadMoreClick}
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </p>
        <a 
          href={clientUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Client&apos;s Website
        </a>
      </div>
    </div>
  );
};

PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  clientUrl: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};

export default PortfolioItem;
