import React, { useState, useEffect } from "react";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieChoice = localStorage.getItem("cookieChoice");
        if (!cookieChoice) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieChoice", "accepted");
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookieChoice", "rejected");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white text-gray-900 px-6 p-5 shadow-md border-t border-gray-300">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-0 md:gap-4 items-start md:items-center justify-between">
                    {/* Text Content */}
                    <div className="flex-grow">
                        <p className="text-sm mb-2">
                            This site uses cookies and related technologies, as described in our Cookie Statement, for purposes that may include site operation, analytics, enhanced user experience, or advertising. You may choose to consent to our use of these technologies, or manage your own preferences.
                        </p>
                        <div className="mb-4 md:mb-0">
                            <a href="/privacy" className="text-sm border-b text-blue-600 underline">Privacy Statement</a>
                            <span className="text-sm mx-3">|</span>
                            <a href="/cookies" className="text-sm border-b text-blue-600 underline">Cookie Statement</a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 md:pl-8 mt-2 md:mt-0">
                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            Accept All Cookies
                        </button>
                        <button
                            onClick={handleReject}
                            className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            Reject All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
