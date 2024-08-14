import { useState } from 'react';
import PropTypes from 'prop-types';
import { createWork } from '../../services/api';

function AddPortfolio({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [clientUrl, setClientUrl] = useState('');
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await createWork({
        title,
        description,
        image_url: imageUrl,
        client_url: clientUrl,
        status,
      });
      setTitle('');
      setDescription('');
      setImageUrl('');
      setClientUrl('');
      setStatus(true);
      setSuccessMessage('Portfolio card created successfully!');
      onSubmit();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900">Create Portfolio Card</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm sm:text-base font-semibold text-gray-800">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            placeholder="Enter title"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm sm:text-base font-semibold text-gray-800">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label htmlFor="imageUpload" className="block text-sm sm:text-base font-semibold text-gray-800">Upload Image</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-gray-800"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Selected"
              className="mt-4 w-full h-40 sm:h-48 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="clientUrl" className="block text-sm sm:text-base font-semibold text-gray-800">Client URL</label>
          <input
            type="url"
            id="clientUrl"
            value={clientUrl}
            onChange={(e) => setClientUrl(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            placeholder="Enter client URL"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-gray-800">Status</label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setStatus(true)}
              className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm text-white ${status ? 'bg-blue-600' : 'bg-gray-300 text-gray-800'} hover:bg-blue-700`}
            >
              Visible
            </button>
            <button
              type="button"
              onClick={() => setStatus(false)}
              className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm text-white ${!status ? 'bg-red-600' : 'bg-gray-300 text-gray-800'} hover:bg-red-700`}
            >
              Hidden
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs sm:text-sm">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-xs sm:text-sm">{successMessage}</p>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onSubmit}
            className="bg-gray-300 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 text-xs sm:text-sm"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-yellow-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300 text-xs sm:text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

AddPortfolio.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddPortfolio;
