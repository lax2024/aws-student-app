AWS Student Management Platform
Project Overview
This project is a full-stack Student Management Platform deployed using Amazon Web Services.
The application uses React for the frontend, Django for the backend, MySQL for database management, and AWS services for deployment and infrastructure.
The project demonstrates practical experience with EC2, S3, RDS, Lambda, IAM, Security Groups, Nginx, Gunicorn, SSH, SCP, REST APIs, CRUD operations, and GitHub.
Technologies Used
React
Vite
JavaScript
CSS
Python
Django
Gunicorn
Nginx
MySQL
Amazon EC2
Amazon RDS
Amazon S3
AWS Lambda
AWS IAM
AWS Security Groups
Elastic IP
AWS CLI
Git
GitHub
TASK 1 — IAM User & Permissions
Objective
Create and configure an IAM user for working with AWS services.
IAM Configuration
IAM User:
aws-student-user
AWS services used:
Amazon EC2
Amazon S3
Amazon RDS
AWS Lambda
Work Completed
Created an IAM user.
Configured AWS access.
Configured AWS CLI.
Verified the AWS identity using AWS STS.
Used IAM permissions to work with AWS resources.
TASK 2 — Launch and Configure EC2
Objective
Launch an EC2 instance and configure it to host the application.
EC2 Configuration
Operating System:
Amazon Linux 2023
Instance Type:
t3.micro
Instance Name:
AWS-Student-App
Elastic IP:
13.63.200.106
Key Pair:
aws-student-key
Security Group
Security Group:
AWS-Student-SG
Configured access:
SSH — Port 22
HTTP — Port 80
Work Completed
Created an EC2 instance.
Created an RSA key pair.
Connected to EC2 using SSH.
Practiced Linux commands.
Configured the EC2 Security Group.
Associated an Elastic IP.
Verified that the EC2 server was accessible.
Installed required software on EC2.
TASK 3 — Host a React Application
Objective
Deploy the React application and make it accessible through the EC2 public IP.
Frontend
The application was developed using React and Vite.
The production build was generated using:
npm install
npm run build
The generated dist directory was transferred to EC2 using SCP.
Example:
scp -i ~/Downloads/aws-student-key.pem -r dist ec2-user@EC2-PUBLIC-IP:/home/ec2-user/
Nginx Web Server
Nginx was installed and configured as the web server and reverse proxy.
The React production files are served through Nginx.
The application can be accessed using:
http://13.63.200.106
React Application Features
The application contains:
Dashboard
Student Management
Student Search
Add Student
Edit Student
Delete Student
Student Statistics
AWS Architecture page
TASK 4 — Django Backend
Objective
Create a backend API for managing student information.
Backend Framework
Python Django
Django application:
students
Application Server
Gunicorn
Gunicorn runs the Django application on:
127.0.0.1:8000
Nginx forwards API requests to Gunicorn.
API Endpoints
Get Students
GET /api/students/
Returns the student records from the database.
Add Student
POST /api/students/
Example request:
{
"name": "Test Student",
"email": "test@example.com",
"course": "MCA",
"age": 22
}
Update Student
PUT /api/students/<id>/
Example request:
{
"name": "Updated Student",
"email": "updated@example.com",
"course": "BCA",
"age": 23
}
Delete Student
DELETE /api/students/<id>/
Deletes the selected student.
CRUD Operations
The following operations were successfully implemented and tested:
CREATE
READ
UPDATE
DELETE
TASK 5 — Create RDS MySQL Database
Objective
Create a MySQL database using Amazon RDS and connect it to the Django application.
RDS Configuration
Database Engine:
MySQL
Database Name:
studentdb
Master Username:
admin
RDS Endpoint:
aws-student-db.cfk02yiww73w.eu-north-1.rds.amazonaws.com
Database Table
Table Name:
students
Columns:
id — INT
name — VARCHAR(100)
email — VARCHAR(100)
course — VARCHAR(100)
age — INT
Work Completed
Created an Amazon RDS MySQL database.
Configured database credentials.
Configured the RDS Security Group.
Allowed MySQL access from the EC2 Security Group.
Installed the MySQL/MariaDB client on EC2.
Connected from EC2 to RDS.
Created the studentdb database.
Created the students table.
Inserted student records.
Updated student records.
Deleted student records.
Connected Django to RDS.
Tested CRUD operations through the Django API.
Database Architecture
Django
↓
Django ORM
↓
Amazon RDS MySQL
↓
studentdb
↓
students
TASK 6 — Amazon S3 Static Website Hosting
Objective
Host the React production build using Amazon S3.
S3 Bucket
aws-student-app-lax2024
Work Completed
Created an S3 bucket.
Uploaded the React production build.
Enabled static website hosting.
Configured index.html.
Configured public access for the practice deployment.
Verified the website in a browser.
Upload Command
aws s3 cp dist/ s3://aws-student-app-lax2024/ --recursive
The S3 bucket was used to practice static website hosting for the React frontend.
TASK 7 — AWS Lambda
Objective
Create and test a serverless AWS Lambda function.
Lambda Configuration
Function Name:
student-count-lambda
Runtime:
Python 3.12
Architecture:
x86_64
Handler:
lambda_function.lambda_handler
Lambda Code
def lambda_handler(event, context):
return {
"statusCode": 200,
"body": "Student Management Lambda is working!"
}
Result
The Lambda function was successfully executed and tested.
The function returned:
{
"statusCode": 200,
"body": "Student Management Lambda is working!"
}
TASK 8 — Security Groups
EC2 Security Group
Security Group:
AWS-Student-SG
Configured ports:
22 — SSH
80 — HTTP
RDS Security Group
Configured MySQL access:
3306 — MySQL
The RDS database was configured to accept MySQL connections from the EC2 Security Group.
This allows the EC2 application server to communicate with RDS without requiring public database access.
TASK 9 — Linux, SSH and SCP
Linux Commands Practiced
The following Linux commands were practiced on the EC2 instance:
pwd
ls
cd
mkdir
touch
cp
rm
SSH
The EC2 instance was accessed from the Mac using SSH.
Command:
ssh -i ~/Downloads/aws-student-key.pem ec2-user@EC2-PUBLIC-IP
SCP
SCP was used to transfer the React production build from the local Mac to EC2.
Command:
scp -i ~/Downloads/aws-student-key.pem -r dist ec2-user@EC2-PUBLIC-IP:/home/ec2-user/
TASK 10 — Apache/httpd
Objective
Practice installing and configuring Apache on the EC2 instance.
Apache/httpd was installed and tested on EC2.
The React application was initially served using Apache.
After verifying the deployment, Apache was stopped and disabled so that Nginx could be used as the primary web server and reverse proxy.
Commands used:
sudo systemctl stop httpd
sudo systemctl disable httpd
TASK 11 — Nginx Reverse Proxy
Nginx was installed on EC2 and configured to:
Serve the React frontend.
Handle HTTP requests.
Forward /api/ requests to Django/Gunicorn.
Support React client-side routing.
The application architecture is:
Browser
↓
Nginx — Port 80
↓
React Frontend
For API requests:
Browser
↓
Nginx
↓
Gunicorn — Port 8000
↓
Django
↓
Amazon RDS MySQL
TASK 12 — Application Architecture
The complete application architecture is:
                INTERNET

                    |

                    v

             +-------------+
             |   Browser   |
             +------+------+
                    |
                    v
             +-------------+
             |    Nginx    |
             |   Port 80   |
             +------+------+
                    |
         +----------+----------+
         |                     |
         v                     v
  React Frontend            /api/
                              |
                              v
                       +-------------+
                       |  Gunicorn   |
                       +------+------+
                              |
                              v
                       +-------------+
                       |   Django    |
                       +------+------+
                              |
                              v
                       +-------------+
                       | RDS MySQL   |
                       +-------------+
Additional AWS Services:
Amazon S3
AWS Lambda
AWS IAM
Security Groups
Elastic IP
TASK 13 — Environment Variables and Security
Database credentials are not stored directly in the GitHub repository.
Django accesses the database password through an environment variable:
os.getenv('DB_PASSWORD')
The project contains an example environment configuration:
backend/.env.example
Example configuration:
DB_NAME=studentdb
DB_USER=admin
DB_PASSWORD=your-rds-password
DB_HOST=aws-student-db.cfk02yiww73w.eu-north-1.rds.amazonaws.com
DB_PORT=3306
The .env file is excluded through .gitignore.
TASK 14 — GitHub
The project source code is maintained using Git and GitHub.
Repository:
https://github.com/lax2024/aws-student-app
The repository contains:
frontend/
backend/
.gitignore
README.md
The frontend contains the React/Vite application.
The backend contains the Django project and students application.
The backend also contains requirements.txt and .env.example.
Sensitive credentials are not included in the repository.
Project Structure
aws-student-app/
frontend/

    src/

        App.jsx

        App.css

    package.json

backend/

    backend/

        settings.py

        urls.py

        asgi.py

        wsgi.py

    students/

        models.py

        views.py

        urls.py

        admin.py

        apps.py

    manage.py

    requirements.txt

    .env.example

.gitignore

README.md
Testing Performed
Frontend Testing
React application successfully built.
React application successfully deployed.
Dashboard tested.
Student list tested.
Search tested.
Add Student tested.
Edit Student tested.
Delete Student tested.
Backend Testing
Django system check completed successfully.
GET API tested.
POST API tested.
PUT API tested.
DELETE API tested.
Database Testing
RDS connection tested.
Database creation tested.
Table creation tested.
INSERT tested.
SELECT tested.
UPDATE tested.
DELETE tested.
AWS Testing
EC2 SSH connection tested.
SCP file transfer tested.
Apache deployment tested.
Nginx deployment tested.
S3 static website hosting tested.
RDS connection tested.
Lambda function tested.
IAM access tested.
Security Groups configured and tested.
Final Application Flow
The main application follows this flow:
React
↓
Nginx
↓
Gunicorn
↓
Django
↓
Amazon RDS MySQL
The project also uses:
Amazon S3
AWS Lambda
AWS IAM
Security Groups
Elastic IP
Project Result
The Student Management Platform was successfully developed, deployed, and tested using AWS.
The project demonstrates practical implementation of:
Cloud computing
EC2 deployment
React deployment
Django backend development
REST API development
MySQL database management
Amazon RDS
Amazon S3
AWS Lambda
IAM
Security Groups
Nginx
Gunicorn
Apache
SSH
SCP
Linux administration
Git
GitHub
CRUD operations
Project Status
COMPLETED
The full-stack Student Management Platform is functional and the source code is available on GitHub.

