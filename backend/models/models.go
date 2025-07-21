package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID          uint `gorm:"primarykey"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
	Email       string         `gorm:"unique;not null"`
	Password    string         `gorm:"not null"`
	Name        string         `gorm:"not null"`
	Role        string         `gorm:"default:'user'"` // user, admin, branch_owner
	PhoneNumber string
	Address     string
	Memberships []Membership
	Bookings    []Booking
}

type Vehicle struct {
	ID           uint `gorm:"primarykey"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
	Name         string         `gorm:"not null"`
	Type         string         `gorm:"not null"`
	Brand        string         `gorm:"not null"`
	Model        string         `gorm:"not null"`
	Year         int            `gorm:"not null"`
	Color        string
	LicensePlate string  `gorm:"unique;not null"`
	Capacity     int     `gorm:"not null"`
	Rate         float64 `gorm:"not null"`
	Status       string  `gorm:"default:'available'"` // available, booked, maintenance
	BranchID     uint    `gorm:"not null"`
	Branch       Branch
	Bookings     []Booking
	Location     string // Current location for tracking
	LastUpdated  time.Time
}

type Branch struct {
	ID          uint `gorm:"primarykey"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
	Name        string         `gorm:"not null"`
	Address     string         `gorm:"not null"`
	City        string         `gorm:"not null"`
	PhoneNumber string
	OwnerID     uint `gorm:"not null"`
	Owner       User
	Vehicles    []Vehicle
}

type Booking struct {
	ID            uint `gorm:"primarykey"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
	DeletedAt     gorm.DeletedAt `gorm:"index"`
	UserID        uint           `gorm:"not null"`
	VehicleID     uint           `gorm:"not null"`
	StartDate     time.Time      `gorm:"not null"`
	EndDate       time.Time      `gorm:"not null"`
	Status        string         `gorm:"default:'pending'"` // pending, confirmed, completed, cancelled
	TotalAmount   float64
	PaymentStatus string `gorm:"default:'unpaid'"` // unpaid, paid
	User          User
	Vehicle       Vehicle
}

type Membership struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	UserID    uint           `gorm:"not null"`
	Type      string         `gorm:"not null"` // basic, premium, platinum
	StartDate time.Time      `gorm:"not null"`
	EndDate   time.Time      `gorm:"not null"`
	Status    string         `gorm:"default:'active'"` // active, expired
	Benefits  string
	User      User
}

type Notification struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	UserID    uint           `gorm:"not null"`
	Type      string         `gorm:"not null"` // booking, membership, system
	Message   string         `gorm:"not null"`
	Read      bool           `gorm:"default:false"`
	User      User
}
