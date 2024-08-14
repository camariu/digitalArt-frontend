import { useState, useContext } from 'react';
import { PortfolioContext } from '../../contexts/PortofolioContext/PortofolioContext';
import { updateWork, deleteWork } from '../../services/api';
import EditPortfolioModal from '../EditPortfolioModal/EditPortfolioModal';
import { Link } from 'react-router-dom';

function PortfolioListCreated() {
  const { data: portfolios, loading, error, setData } = useContext(PortfolioContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [portfolioToEdit, setPortfolioToEdit] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false); 
  const [expandedPortfolioId, setExpandedPortfolioId] = useState(null); 

  const openEditModal = (portfolio) => {
    setPortfolioToEdit(portfolio);
    setIsEditModalOpen(true);
  };

  const handleUpdatePortfolio = async (updatedPortfolio) => {
    try {
      await updateWork(updatedPortfolio._id, updatedPortfolio);
      setData(prevData =>
        prevData.map(portfolio =>
          portfolio._id === updatedPortfolio._id ? updatedPortfolio : portfolio
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Failed to update portfolio:', error);
    }
  };

  const handleDeletePortfolio = async (_id) => {
    try {
      await deleteWork(_id);
      setData(prevData => prevData.filter(portfolio => portfolio._id !== _id));
    } catch (error) {
      console.error('Failed to delete portfolio:', error);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setPortfolioToEdit(null);
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const handleReadMoreClick = (portfolioId) => {
    setExpandedPortfolioId(expandedPortfolioId === portfolioId ? null : portfolioId);
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(' ')}... `;
    }
    return text;
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading portfolios: {error.message}</p>;

  if (!portfolios.length) {
    return <p className="text-center text-gray-500">You haven&apos;t created a portfolio yet.</p>;
  }

  return (
    <div className="container mx-auto sm:px-6 pt-2">
      <div className="flex mb-4 justify-center sm:justify-start text-sm sm:text-md">
        <button
          onClick={toggleListVisibility}
          className="bg-blue-500 text-stone-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-blue-600 transition text-xs sm:text-sm md:text-base"
        >
          {isListVisible ? 'Hide Portfolios' : 'See your portfolios'}
        </button>
        <Link
          to="/portfolio-public" 
          className="bg-green-500 text-stone-50 text-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-green-600 transition text-xs sm:text-sm md:text-base ml-5"
        >
          See your portfolio public
        </Link>
      </div>
      {isListVisible && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio._id}
                className="bg-stone-100 rounded-lg shadow-lg overflow-hidden flex flex-col min-w-[300px] max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
              >
                <img
                  src={portfolio.image_url}
                  alt={portfolio.title}
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{portfolio.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">
                    {expandedPortfolioId === portfolio._id 
                      ? portfolio.description
                      : truncateText(portfolio.description, 25)}
                    {portfolio.description.split(' ').length > 25 && (
                      <button
                        className="text-blue-500 underline ml-1 text-xs sm:text-sm md:text-base"
                        onClick={() => handleReadMoreClick(portfolio._id)}
                      >
                        {expandedPortfolioId === portfolio._id ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </p>
                  <div className="flex items-center mb-4">
                    <span
                      className={`inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                        portfolio.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {portfolio.status ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <a
                    href={portfolio.client_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mb-4 block text-xs sm:text-sm md:text-base"
                  >
                    View Client Website
                  </a>
                  <p className="text-gray-500 text-xs sm:text-sm mb-4">
                    Created At: {new Date(portfolio.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mb-4">
                    Updated At: {new Date(portfolio.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2 mt-auto">
                    <button
                      onClick={() => openEditModal(portfolio)}
                      className="bg-teal-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-teal-600 transition text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePortfolio(portfolio._id)}
                      className="bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-red-700 transition text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <EditPortfolioModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          portfolio={portfolioToEdit}
          onSave={handleUpdatePortfolio}
        />
      )}
    </div>
  );
}

export default PortfolioListCreated;
