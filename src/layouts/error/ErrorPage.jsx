import React from "react";

export const handleApiError = (error) => {
    if (error.response?.data) {
        return error.response.data;
    }

    return {
        error: "NETWORK_ERROR",
        message: error.message || "Failed to fetch data",
        status: 500,
        timestamp: new Date().toISOString()
    };
};

const ErrorPage = ({error}) => {
    return (
        <div className="relative w-[100%] flex flex-col justify-center items-center h-screen bg-[#0A0022] overflow-hidden">
            <div className="absolute text-[300px] font-bold text-[#FD980B] opacity-10 z-0">
                {error.status}
            </div>

            <div className="relative z-10 text-center p-8 max-w-2xl">
                <div className="text-[#FD980B] kanit-bold text-4xl mb-6">
                    {error.error}
                </div>

                <div className="text-white kanit-light text-2xl mb-8">
                    {error.message}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="text-[#FD980B] kanit-bold text-xl">
                        Status: {error.status}
                    </div>

                    <div className="text-gray-400 kanit-light text-sm mt-8">
                        {error.timestamp && error.timestamp.replace('T', ' ').slice(0, 19)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;