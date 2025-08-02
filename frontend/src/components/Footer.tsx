import {
    CreditCard,
    Facebook,
    Heart,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Shield,
    ShoppingBag,
    Truck,
    Twitter,
    User
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", to: "/" },
        { name: "All Products", to: "/clothes/all" },
        { name: "Dogs", to: "/dogs" },
        { name: "Cats", to: "/cats" },
        { name: "Account", to: "/account" },
    ];

    const customerService = [
        { name: "Contact Us", to: "/contact" },
        { name: "Shipping Info", to: "/shipping" },
        { name: "Returns", to: "/returns" },
        { name: "Size Guide", to: "/size-guide" },
        { name: "FAQ", to: "/faq" },
    ];

    const features = [
        { icon: Shield, text: "Secure Shopping" },
        { icon: Truck, text: "Free Shipping" },
        { icon: CreditCard, text: "Easy Payment" },
        { icon: User, text: "24/7 Support" },
    ];

    return (
        <footer className="bg-white text-black min-h-[200px] border-4 border-yellow-400">
            {/* Debug info */}
            {/* <div className="bg-yellow-400 text-black p-2 text-center font-bold">
                FOOTER IS RENDERING - DEBUG MODE
            </div> */}

            {/* Main Footer Content */}
            <div className="max-w-[1400px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <ShoppingBag className="h-8 w-8 text-blue-500" />
                            <span className="text-2xl font-bold">PetStore</span>
                        </div>
                        <p className="text-gray-800 mb-6 leading-relaxed">
                            Your one-stop destination for premium pet clothing and accessories.
                            Quality products for your beloved pets.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className="text-gray-800 hover:text-black transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            {customerService.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className="text-gray-800 hover:text-black transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-800">
                                    123 Pet Street, Animal City, AC 12345
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-800">
                                    +1 (555) 123-4567
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-800">
                                    info@petstore.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <div key={feature.text} className="flex items-center gap-3">
                                <feature.icon className="h-5 w-5 text-blue-500" />
                                <span className="text-sm text-gray-800">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300 bg-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>© {currentYear} PetStore. Made with</span>
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>for your pets</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <Link to="/privacy" className="hover:text-black transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="hover:text-black transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="hover:text-black transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
