import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <section className="bg-gray-800 text-stone-200 text-center py-20 p-5">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Artfolio
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6">
            Create, showcase, and manage your artistic portfolio effortlessly.
          </p>
          <Link
            to="/portfolio-create"
            className="bg-yellow-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-yellow-400 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto text-center p-5">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">About Artfolio</h2>
          <p className="text-sm sm:text-base md:text-lg mb-4">
            Artfolio is a powerful tool designed for artists to showcase their work and manage their portfolios with ease. Whether you&apos;re a painter, photographer, or digital artist, Artfolio provides a platform to present your art in a professional manner.
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            With a user-friendly interface and customizable options, Artfolio helps you create a stunning portfolio that reflects your artistic vision.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center p-5">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Customizable Templates</h3>
              <p className="text-base sm:text-lg">
                Choose from a variety of templates to personalize your portfolio and make it uniquely yours.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Easy to Use</h3>
              <p className="text-base sm:text-lg">
                Our intuitive interface allows you to add, edit, and organize your artwork with just a few clicks.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Share and Showcase</h3>
              <p className="text-base sm:text-lg">
                Share your portfolio with potential clients and showcase your best work to the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-800 text-white text-center py-20">
        <div className="container mx-auto p-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            Join the Artfolio community and take the first step towards building your professional portfolio.
          </p>
          <Link
            to="/portfolio-create"
            className="bg-yellow-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-yellow-400 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
