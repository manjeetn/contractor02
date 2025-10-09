import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-center p-8 mt-auto">
      <p className="text-gray-300 text-md">
        &copy; {new Date().getFullYear()} Contractor Management System. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
