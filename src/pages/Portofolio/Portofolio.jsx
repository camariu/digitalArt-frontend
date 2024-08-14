import { useState } from 'react';
import AddPortfolio from '../../components/AddPortfolio/AddPortfolio';
import PortfolioListCreated from '../../components/PortfolioListCreated/PortfolioListCreated';

function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  const handleOnSubmit = (newPortfolio) => {
    setPortfolios([...portfolios, newPortfolio]);
    console.log('Portfolio card created successfully!');
    setIsFormVisible(false); 
  };

  const handleEditPortfolio = (index, updatedPortfolio) => {
    const updatedPortfolios = portfolios.map((portfolio, i) =>
      i === index ? updatedPortfolio : portfolio
    );
    setPortfolios(updatedPortfolios);
  };

  const handleDeletePortfolio = (index) => {
    const updatedPortfolios = portfolios.filter((_, i) => i !== index);
    setPortfolios(updatedPortfolios);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4 px-5 py-10">
        <div className="order-2 lg:order-1 lg:w-2/3 flex-1">
          <PortfolioListCreated
            portfolios={portfolios}
            onEdit={handleEditPortfolio}
            onDelete={handleDeletePortfolio}
          />
        </div>
        <div className="order-1 lg:order-2 lg:w-1/3 flex-1">
          {!isFormVisible ? (
            <div className='flex flex-col justify-center '>
              
              <p className="sm:text-lg text-stone-200 mb-5  leading-5">
                Ready to showcase your artwork? Click the button below to create a new portfolio card and start sharing your creative work with the world.
              </p>
             
              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-400 transition duration-300 text-xs sm:text-sm"
              >
                Create Portfolio Now
              </button>
            </div>
          ) : (
            <AddPortfolio onSubmit={handleOnSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
