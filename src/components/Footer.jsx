import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 p-4 text-white text-center">
            <p>© {new Date().getFullYear()} Marketplace Comida MX</p>
        </footer>
    );
}

export default Footer;