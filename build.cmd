cd backend
call mvn clean install
cd ..
cd frontend
call npm run-script build
cd ..
call docker-compose build
call docker-compose up -d 