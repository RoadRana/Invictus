const Footer = () => {
  return (
    <div>
      <footer
        className="rounded-x1 rounded-br-lg md:p-9 px-4 py-9"
        style={{
          background: 'linear-gradient(90deg, #7BD5F5 0%, #787FF6 100%)',
        }}
      >
        {' '}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 leading-snug text-white opacity-90">
              Revolutionizing Maritime Industries with Eco-Friendly, Intelligent
              Unmanned Marine Vehicles.
            </h3>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white opacity-90">
              Our Company
            </h4>
            <ul>
              <li>
                <a
                  href="#aboutus"
                  className="hover:underline text-white opacity-80"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:underline text-white opacity-80"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:underline text-white opacity-80"
                >
                  Products
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white opacity-90">
              Our Services
            </h4>
            <ul className="list-disc list-inside text-white opacity-80">
              <li>Research & Development</li>
              <li>Inspection</li>
              <li>Exploration</li>
              <li>Environmental Assessment</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white opacity-90">
              Contact Details
            </h4>
            <p className="text-white opacity-80">
              Address: 398 Abu Qir Street, Mostafa Kamel, Al Fanar Tower,
              Alexandria Governorate
            </p>
            <p className="text-white opacity-80">
              Phone:{' '}
              <a href="tel:+201006584054" className="hover:underline">
                +201006584054
              </a>
            </p>
            <p className="text-white opacity-80">
              Email:{' '}
              <a
                href="mailto:info@invictusumvs.com"
                className="hover:underline"
              >
                info@invictusumvs.com
              </a>
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-8 text-center border-t border-white opacity-40 pt-4">
          <p className="text-sm text-white opacity-80">
            &copy; 2024 INVICTUS UMVs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
