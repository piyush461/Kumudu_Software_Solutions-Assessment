import React from 'react';

const OrderHistory = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Order History</h1>
                <p className="text-xl text-gray-600">View and track all your frame orders in one place</p>
                <div className="mt-8 text-gray-500">
                    No orders yet
                </div>
            </div>
        </div>
    );
};

export default OrderHistory; 