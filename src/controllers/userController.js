"use strict";
const Utility = require("../lib/utils/util");
const UtilityInstance = new Utility();
const db = require('../db');
const { response } = require("express");

const viewItems = async (request, response) =>{
    let data;
    let status = 200;
    let message;
    
    try {
        // SQL query to retrieve available grocery items
        const selectQuery = 'SELECT * FROM grocery_items where quantity > 0';

        // Execute the query
        db.query(selectQuery, (err, results) => {
            if (err) {
                return response.status(500).json({ success: false, message: 'Internal server error' });
            }

            // Successful retrieval
            const groceryItems = results.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));

            return response.send(UtilityInstance.formatResponse(status, { groceryItems }, 'Grocery items retrieved successfully'));
        });
    }
    catch(error) {
        message = error.message;
        status = error.status === (void 0) ? 500 : error.status;
        data = {
            Error:
                error.data === (void 0)
                    ? "Unable to feth detail !"
                    : error.data
        };
        return response.send(UtilityInstance.formatResponse(status, data, message));
    }
}

const bookItems = async (request, response) => {
    let data;
    let status = 200;
    let message;

    try {
        const { items, userName } = request.body;

        if (!items || !Array.isArray(items) || items.length === 0 || !userName) {
            return response.status(400).json({ success: false, message: 'Invalid or empty items array or missing user name' });
        }

        const orders = [];

        for (const item of items) {
            const { itemId, quantity } = item;

            if (!itemId || !quantity || isNaN(quantity) || quantity < 1) {
                return response.status(400).json({ success: false, message: 'Invalid item structure' });
            }

            const fetchGroceryNameQuery = 'SELECT name AS groceryName FROM grocery_items WHERE id = ?';
            db.query(fetchGroceryNameQuery, [itemId], (err, result) => {
                if (err) {
                    message = 'Internal server error';
                    status = 500;
                    data = { success: false };
                    return response.send(UtilityInstance.formatResponse(status, data, message));
                }

                // Check if the itemId was not found
                if (result.length === 0) {
                    orders.push({
                        itemId,
                        status: 'Not Found'
                    });

                    // If all items processed, send the final response
                    if (orders.length === items.length) {
                        message = 'Order processing completed';
                        status = 200;
                        data = { orders };
                        return response.send(UtilityInstance.formatResponse(status, data, message));
                    }
                } else {
                    const groceryName = result[0].groceryName;

                    // Update the inventory in the grocery_items table
                    const updateQuery = 'UPDATE grocery_items SET quantity = quantity - ? WHERE id = ?';
                    db.query(updateQuery, [quantity, itemId], (updateErr, updateResult) => {
                        if (updateErr) {
                            message = `Error updating inventory for item ${itemId}`;
                            status = 500;
                            data = { success: false };
                            return response.send(UtilityInstance.formatResponse(status, data, message));
                        }

                        // Insert order history record
                        const orderHistoryQuery = 'INSERT INTO order_history (user_name, grocery_name, quantity) VALUES (?, ?, ?)';
                        db.query(orderHistoryQuery, [userName, groceryName, quantity], (orderHistoryErr, orderHistoryResult) => {
                            if (orderHistoryErr) {
                                message = 'Error inserting order history record';
                                status = 500;
                                data = { success: false };
                                return response.send(UtilityInstance.formatResponse(status, data, message));
                            }

                            orders.push({
                                itemId,
                                status: 'Success',
                                userName,
                                groceryName,
                                quantity
                            });

                            // If all items processed, send the final response
                            if (orders.length === items.length) {
                                message = 'Grocery items booked successfully';
                                status = 200;
                                data = { orders };
                                return response.send(UtilityInstance.formatResponse(status, data, message));
                            }
                        });
                    });
                }
            });
        }
    } catch (error) {
        message = error.message;
        status = error.status === (void 0) ? 500 : error.status;
        data = {
            Error: error.data === (void 0)
                ? 'Unable to fetch detail!'
                : error.data
        };
        return response.send(UtilityInstance.formatResponse(status, data, message));
    }
};

module.exports = {viewItems, bookItems};
