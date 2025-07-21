#!/bin/bash

# Initialize Go module
go mod init vehicle-rental

# Get dependencies
go get -u github.com/gin-gonic/gin
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
go get -u github.com/golang-jwt/jwt/v5
go get -u github.com/joho/godotenv
go get -u github.com/gorilla/websocket

# Tidy up dependencies
go mod tidy 