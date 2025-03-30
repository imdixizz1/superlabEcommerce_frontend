"use client";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-3 gap-6">
                <div>
                    <h3 className="text-lg font-semibold">About Beauty Barn</h3>
                    <ul className="mt-2 space-y-2">
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Values</li>
                        <li>Consultation</li>
                        <li>Gift Cards</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Help</h3>
                    <ul className="mt-2 space-y-2">
                        <li>Customer Service</li>
                        <li>Returns & Exchange</li>
                        <li>Shipping</li>
                        <li>FAQ</li>
                        <li>Accessibility</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex flex-col sm:flex-row space-x-4 mt-2">
                        <span className="cursor-pointer">Instagram</span>
                        <span className="cursor-pointer">Facebook</span>
                        <span className="cursor-pointer">Twitter</span>
                    </div>
                </div>
            </div>
            <div className="text-center mt-6 border-t border-gray-700 pt-4">
                <p>&copy; 2024 Beauty Barn. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
