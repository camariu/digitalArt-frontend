import { useContext } from 'react';
import { PortfolioContext } from '../../contexts/PortofolioContext/PortofolioContext';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

const PortfolioList = () => {
  const { data, loading, error } = useContext(PortfolioContext);

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Something went wrong: {error.message}</p>;
  }

  return (
    <div className="container mx-auto px-16 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-20 text-stone-200">Portfolio Gallery</h1>
        
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
          {data.length > 0 ? (
            data.map(item => (
              <PortfolioItem
                key={item._id} 
                title={item.title}
                description={item.description}
                imageUrl={item.image_url}
                clientUrl={item.client_url}
                status={item.status}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No portfolios available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;
