CREATE DATABASE HR;
USE HR;
-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(100),
    postal_code VARCHAR(20),
    city VARCHAR(50) NOT NULL,
    state_province VARCHAR(50),
    country_id VARCHAR(2) NOT NULL
);
-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    hire_date DATE NOT NULL,
    salary DECIMAL(10, 2),
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);



-- Insert sample data into locations
INSERT INTO locations (street_address, postal_code, city, state_province, country_id) VALUES
('742 Evergreen Terrace', '62704', 'Springfield', 'IL', 'US'),
('221B Baker Street', 'NW1 6XE', 'London', 'London', 'UK'),
('12 Grimmauld Place', 'WC1N', 'London', 'London', 'UK'),
('1600 Amphitheatre Parkway', '94043', 'Mountain View', 'CA', 'US'),
('1 Infinite Loop', '95014', 'Cupertino', 'CA', 'US'),
('4059 Mt Lee Drive', '90068', 'Hollywood', 'CA', 'US'),
('350 Fifth Avenue', '10118', 'New York', 'NY', 'US'),
('100 Main Street', '10001', 'New York', 'NY', 'US'),
('1600 Pennsylvania Ave NW', '20500', 'Washington', 'DC', 'US'),
('4 Privet Drive', 'HP7', 'Little Whinging', 'Surrey', 'UK');
-- Insert sample data into employee
INSERT INTO employee (first_name, last_name, email, phone_number, hire_date, salary, location_id) VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', '2020-01-15', 50000.00, 1),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '2019-03-20', 60000.00, 2),
('Emily', 'Davis', 'emily.davis@example.com', '555-8765', '2018-06-25', 55000.00, 3),
('Michael', 'Brown', 'michael.brown@example.com', '555-4321', '2017-09-30', 65000.00, 4),
('Jessica', 'Johnson', 'jessica.johnson@example.com', '555-6789', '2021-11-10', 70000.00, 5),
('David', 'Wilson', 'david.wilson@example.com', '555-9876', '2016-12-01', 72000.00, 6),
('Sarah', 'Miller', 'sarah.miller@example.com', '555-5432', '2015-02-05', 52000.00, 7),
('Daniel', 'Martinez', 'daniel.martinez@example.com', '555-6543', '2014-08-15', 58000.00, 8),
('Laura', 'Garcia', 'laura.garcia@example.com', '555-7654', '2013-04-22', 75000.00, 9),
('James', 'Anderson', 'james.anderson@example.com', '555-8765', '2022-05-30', 80000.00, 10);


