import {FaBoxOpen} from 'react-icons/fa';

const EmptyResponse = ({text}) => {
    return (
        <div className="relative w-full flex flex-col justify-center items-center min-h-[50vh] overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                    {text.toUpperCase()}
                </h2>

                <div className="relative">
                    <FaBoxOpen className="text-8xl text-gray-400 opacity-90 w-100"/>
                </div>

                <p className="mt-6 text-gray-400 text-center max-w-md px-4">
                    <p> Nothing was found for your search.</p>
                </p>
            </div>
        </div>
    );
};

export default EmptyResponse;