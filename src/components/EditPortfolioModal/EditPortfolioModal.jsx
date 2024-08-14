import { useState } from 'react';
import PropTypes from 'prop-types';

function EditPortfolioModal({ isOpen, onClose, portfolio, onSave }) {
  const [title, setTitle] = useState(portfolio.title);
  const [description, setDescription] = useState(portfolio.description);
  const [imageUrl, setImageUrl] = useState(portfolio.image_url);
  const [clientUrl, setClientUrl] = useState(portfolio.client_url);
  const [status, setStatus] = useState(portfolio.status);
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...portfolio, title, description, image_url: imageUrl, client_url: clientUrl, status });
    setIsSaved(true); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Edit Portfolio</h2>
        {isSaved ? (
          <div className="space-y-4">
            <p className="text-green-600 font-semibold">Changes have been saved.</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-800">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-800">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="imageUpload" className="block text-sm font-semibold text-gray-800">Upload Image</label>
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
                  className="mt-4 w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
            <div>
              <label htmlFor="clientUrl" className="block text-sm font-semibold text-gray-800">Client URL</label>
              <input
                type="url"
                id="clientUrl"
                value={clientUrl}
                onChange={(e) => setClientUrl(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-lg py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Status</label>
              <div className="flex flex-wrap items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setStatus(true)}
                  className={`py-2 px-4 rounded-lg text-white ${status ? 'bg-blue-600' : 'bg-gray-300 text-gray-800'} hover:bg-blue-700`}
                >
                  Visible
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(false)}
                  className={`py-2 px-4 rounded-lg text-white ${!status ? 'bg-red-600' : 'bg-gray-300 text-gray-800'} hover:bg-red-700`}
                >
                  Hidden
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

EditPortfolioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditPortfolioModal;
