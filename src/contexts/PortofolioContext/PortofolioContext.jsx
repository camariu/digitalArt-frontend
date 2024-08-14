import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchAllWorks } from '../../services/api';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchAllWorks();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};


PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,  
};