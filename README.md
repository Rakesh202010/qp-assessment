# qp-assessment
 Technical Assessment Submission
 API documentation:

# Grocery Booking API Documentation


## Admin Endpoints

### 1. Add New Grocery Item

- **Endpoint:**
POST /admin/addItem

- **Request:**
```
{
  "name": "Tomato",
  "price": 2.5,
  "quantity": 100
}
```
- **Response:**
```
{
  "success": true,
  "message": "Grocery item added successfully"
}
```
### 2. View Existing Grocery Items

- **Endpoint:**
GET /admin/viewItems

- **Response:**
```
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Tomato",
      "price": 2.5,
      "quantity": 100
    },
    // ... other grocery items
  ]
}
```

### 3. Remove Grocery Item

- **Endpoint:**
DELETE /admin/removeItem?itemId=1

- **Response:**
```
{
  "success": true,
  "message": "Grocery item removed successfully"
}
```
### 4. Update Grocery Item

- **Endpoint:**
PUT /admin/updateItem?itemId=1

- **Request:**
```
{
  "name": "New Tomato",
  "price": 3.0,
  "quantity": 50
}
```

- **Response:**
```
{
  "success": true,
  "message": "Grocery item updated successfully"
}
```
### 5. Manage Inventory of Grocery Item
   
- **Endpoint:**
PUT /admin/manageInventory?itemId=1

- **Request:**
```
{
  "quantity": 50
}
```
- **Response:**
```
{
  "success": true,
  "message": "Inventory managed successfully"
}
```


## User Endpoints
### 1. View Available Grocery Items
   
- **Endpoint:**
GET /user/viewItems

- **Response:**
```
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Tomato",
      "price": 2.5,
      "quantity": 50
    },
    // ... other available grocery items
  ]
}
```
### 2. Book Multiple Grocery Items

- **Endpoint:**
POST /user/bookItems
  
- **Request:**
```
 {
    "items": [
      { "itemId": 1, "quantity": 2 },
      { "itemId": 2, "quantity": 3 }
    ],
    "userName": "JohnDoe"
}
```

- **Response:**
```
  {
    "success": true,
    "data": {
      "orders": [
        { "itemId": 1, "status": "Success", "userName": "JohnDoe", "groceryName": "Tomato", "quantity": 2 },
        { "itemId": 2, "status": "Not Found" }
      ]
    },
    "message": "Order processing completed"
  }
```
``
