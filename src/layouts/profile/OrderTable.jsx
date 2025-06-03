import FilterDropdown from "src/layouts/profile/FilterDropdown.jsx";
import PriceFilter from "src/layouts/profile/PriceFilter.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {getOffersByCreator, getOffersFilters} from "src/services/orderApi.js";
import FilterIcon from "src/assets/icons/FilterIcon.jsx";
import EmptyResponse from "src/layouts/EmptyResponse.jsx";

const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    const [openFilter, setOpenFilter] = useState(null);
    const [filters, setFilters] = useState({
        statuses: [],
        gameNames: [],
        price: {priceMin: 0, priceMax: 10000}
    });

    const [selectedFilters, setSelectedFilters] = useState({
        gameName: null,
        status: null,
        price: {
            priceFrom: null,
            priceTo: null
        }
    });

    const fetchOrdersData = useCallback(async () => {
        try {
            const ordersApi = await getOffersByCreator(selectedFilters)
            setOrders(ordersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getOffersByCreator, selectedFilters]);

    const fetchOrdersFilterData = useCallback(async () => {
        try {
            const orderFiltersApi = await getOffersFilters()
            setFilters(orderFiltersApi);
        } catch (error) {
            console.log(error);
        }
    }, [getOffersFilters]);

    const handleGameSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            gameName: value
        }));
    }, []);

    const handleStatusSelect = useCallback((value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            status: value
        }));
    }, []);

    const handlePriceApply = useCallback(({priceFrom, priceTo}) => {
        setSelectedFilters((prev) => ({
            ...prev,
            price: {
                priceFrom: priceFrom,
                priceTo: priceTo
            }
        }));
    }, []);


    useEffect(() => {
        fetchOrdersData();
    }, [fetchOrdersData]);

    useEffect(() => {
        fetchOrdersFilterData();
    }, [fetchOrdersFilterData]);

    return (
        <div className="relative">
            <table className="min-w-full table-auto border border-gray-700 text-white">
                <thead className="bg-[#1E1930]">
                <tr>
                    <th className="px-4 py-2 border border-gray-700">Order</th>
                    <th className="px-4 py-2 border border-gray-700 relative">
                        Game
                        <button onClick={() => setOpenFilter(openFilter === 'game' ? null : 'game')} className="ml-2">
                            <FilterIcon/>
                        </button>
                        {openFilter === 'game' && (
                            <FilterDropdown
                                title="Select Game"
                                options={filters.gameNames}
                                onSelect={handleGameSelect}
                                onClose={() => setOpenFilter(null)}
                            />
                        )}
                    </th>
                    <th className="px-4 py-2 border border-gray-700 relative">
                        Status
                        <button onClick={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
                                className="ml-2">
                            <FilterIcon/>
                        </button>
                        {openFilter === 'status' && (
                            <FilterDropdown
                                title="Select Status"
                                options={filters.statuses}
                                onSelect={handleStatusSelect}
                                onClose={() => setOpenFilter(null)}
                            />
                        )}
                    </th>
                    <th className="px-4 py-2 border border-gray-700 relative">
                        Price
                        <button onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')} className="ml-2">
                            <FilterIcon/>
                        </button>
                        {openFilter === 'price' && (
                            <PriceFilter
                                onApply={handlePriceApply}
                                currentPrice={selectedFilters.price}
                                onClose={() => setOpenFilter(null)}
                            />
                        )}
                    </th>
                </tr>
                </thead>
                <tbody>
                {orders && (
                    <>
                        {orders.map((order) => (
                            <tr key={order.uuid} className="bg-[#1E1930]">
                                <td className="px-4 py-2 border border-gray-700">{order.orderName}</td>
                                <td className="px-4 py-2 border border-gray-700">{order.gameName}</td>
                                <td className="px-4 py-2 border border-gray-700">{order.orderStatus}</td>
                                <td className="px-4 py-2 border border-gray-700">$ {order.totalPrice}</td>
                            </tr>
                        ))}
                    </>
                )}
                {orders.length === 0 && (
                    <tr key={1} className="bg-[#1E1930] h-20">
                        <td colSpan={4} className="px-4 py-2 border border-gray-700">
                            <EmptyResponse text={'no orders by filter'}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
};

export default OrderTable;