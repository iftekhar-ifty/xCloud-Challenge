
## xCloud Software Engineer – Open-Stack Coding Challenge

- Clear commit history
    - e2765f8 (HEAD -> main) adding repository with service layer
    - 10fd40c (origin/main) update readme file
    - 2ca9059 first commit
    - fc45555 first commit




- Track chosen

# Setup instructions


```bash
git clone https://github.com/your-username/your-project.git

cd your-project

composer install

npm install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

npm run dev

php artisan serve



```

# API docs & screenshots/GIFs

## Overview

This document provides detailed information about the RESTful API endpoints for server management. All endpoints are versioned under `v1`.

## Base URL
    https://yourdomain.com/api/v1

## Authentication

Currently, authentication is disabled (commented out). When enabled, the API will use Laravel Sanctum for authentication.

    Authorization: Bearer {token}

## Endpoints

### Get All Servers

Retrieve a list of all servers.

GET /server

**Response:**

    json
    
    {
        "status": "success",
        "message": "All recode load successfully",
        "data": {
            "current_page": 1,
            "data": [
                        {
                            "id": 5,
                            "name": "Josianne Bernhard Sr.",
                            "ip_address": "225.56.106.127",
                            "provider": "aws",
                            "status": "active",
                            "cpu_cores": "34",
                            "ram_mb": "2048",
                            "storage_gb": "5",
                            "created_at": "2025-09-13T09:59:09.000000Z",
                            "updated_at": "2025-09-13T09:59:09.000000Z"
                        },
                    ]
                }
    }

### For Search and other filter
| Parameter|Type|Description|
|--|--|--|
|  id|integer|**Required**. ID of the server to retrieve|

### Create a New Server

Create a new server record.

POST /server/store

**Request Body:**

    json 
    {
      "name": "New Server",
      "ip_address": "192.168.1.1",
      "provider": "aws",
      "cpu_cores": "6",
      "ram_mb": "1024",
      "storage_gb": "10",
      "status": "active",
    }

**Response:**

    json
    
    {
        "status": "success",
        "message": "Recode created successfully",
        "data": {
            "name": "john doe",
            "provider": "aws",
            "status": "active",
            "cpu_cores": "12",
            "ram_mb": "512",
            "storage_gb": "10",
            "ip_address": "192.168.1.9",
            "updated_at": "2025-09-13T16:06:47.000000Z",
            "created_at": "2025-09-13T16:06:47.000000Z",
            "id": 5003
        }
    }

### Get a Specific Server

Retrieve details of a specific server by ID.

http

GET /server/find/{id}

| Parameter|Type|Description|
|--|--|--|
|  id|integer|**Required**. ID of the server to retrieve|

**Response:**

    json
    
    {
      "data": {
        "id": 1,
        "name": "john doe",
        "provider": "aws",
        "status": "active",
        "cpu_cores": "12",
        "ram_mb": "512",
        "storage_gb": "10",
        "ip_address": "192.168.1.9",
        "updated_at": "2025-09-13T16:06:47.000000Z",
        "created_at": "2025-09-13T16:06:47.000000Z",
      }
    }

### Update a Server

Update an existing server's information.

    PUT /server/update/{id}

**Parameters:**



**Request Body:**

    json
    
    {
      "name": "Updated Server Name",
      "status": "offline"
    }

**Response:**

json

    {
        "status": "success",
        "message": "Recode updated successfully",
        "data": {
            "id": 5003,
            "name": "john doe new",
            "ip_address": "192.168.1.9",
            "provider": "aws",
            "status": "active",
            "cpu_cores": "12",
            "ram_mb": "512",
            "storage_gb": "10",
            "created_at": "2025-09-13T16:06:47.000000Z",
            "updated_at": "2025-09-13T16:10:36.000000Z"
        }
    }

### Delete a Server

Remove a server from the system.

http

DELETE /server/delete/{id}



**Response:**

json

    {
        "status": "success",
        "message": "Recode deleted successfully",
        "data": []
    }


# AI Collaboration Process

  - Tools used (ChatGpt, Claude)
    - I ask ai multiple question which help me to move fast here some example what i ask & why
    
      - act as a laravel expert i want some suggestion like i am using some code structure on my laravel project . now i want to how is right approach  to scalable ? if not then why? here my structure i follow
repositoryInterface>UserRepository > and controller. and if u have any idea to improve this approach
show me and explain me why its best ? pros and cons . 
      - acta s as inertia expert and react now making a simple pagination at controller i passing data like that
User::paginate(10)
all u have to making a simple tailwindcss system pagination button should text-gray-600
      - i want to optimize this code what i have right now . i ahve doing filter 3 separate methods so what i want i making a dynamic approch so that each of method working perfectly . making a commin function so that i can use future uses as well.
here my code. after generate code explained me why i implement this version. guide me each and every deatils
     const handleSearch = (value) => { 
          const queryParams = new URLSearchParams({
              perPage: 10,
          });
          const filter_fields = Object.keys(filters);
          const filter_values = Object.values(filters);
        
          setSearchQuery(value)
          router.get('/', {
              search_value:value,
              filter_field: filter_fields,
              filter_value: filter_values
          }, { preserveState: true })
      }
      const handleFilterChange = (field, value) => {
          const newFilters = { ...filters, [field]: value }
          setFilters(newFilters)

          const filter_fields = Object.keys(newFilters);
          const filter_values = Object.values(newFilters);

          router.get("/", {
              filter_field: filter_fields,
              filter_value: filter_values
          }, {
              preserveState: true,
              replace: true
          })
      }
      function handlePerPage(value){
          router.get("/", {
              perPage:value
          }, {
              preserveState: true,
              replace: true
          })
      }
      - act as a frontend expert over 5 years . also have UI/UX experience. now i want a table which have multiple headers called name,provider, ram,stoarge action. here some specific requirement i want
        1. at action row u have to show svg icon edit,show, and delete. each one button clickable and when we click it should open a modal.
        2. on top section of table u have to adding search input with button, adding multiple filter like dropdown.  
        3. at table header adding sort button 
        4. and adding a bottom side of table adding simple pagination
        5. for theme color u can adding bg-gray-600 each button

        only generate html file using tailwindcss and for modal open u can adding little bit of alpine js that's it
 
    - What you accepted vs. rewrote

        - for frontend i accept design but change the action button bg color to plan svg icon, change pagination
        - implement service layer with custom messages
    - 

- Debugging Journey
  - No one want their code facing some bugs. sometime debugging journey really frustrating to prevent this i check every data i get from response or passing data on response also use exception with try catch and here i log throw like that $exception->messages and which line i am getting error.For doing this it really easy to debugging 

- Tech decisions & trade-offs
    - for building rest api i use reuseable service layer with repository design it helps me whole application and 
    - for frontend i use react,inertia & laravel 

- Time spent
