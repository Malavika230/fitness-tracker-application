package models

import (
	"time"
)

type User struct {
	UserID   uint   `gorm:"column:user_id;primaryKey;autoIncrement" json:"userId"`
	FullName string `gorm:"column:fullname;size:255;not null;unique" json:"fullname"`
	Email    string `gorm:"column:email;size:255;not null;unique" json:"email"`
	Password string `gorm:"column:password;size:255;not null" json:"-"`
}

type Activity struct {
	ActivityID   uint      `gorm:"column:activity_id;primaryKey;autoIncrement" json:"activityId"`
	ActivityType string    `gorm:"column:activity_type;type:varchar(255);not null;unique" json:"activityType"`
	UserID       uint      `gorm:"column:user_id;not null" json:"userId"`
	ActivityDate time.Time `gorm:"column:activity_date;type:timestamp" json:"activityDate"`
	Calories     string    `gorm:"column:calories;type:varchar(255)" json:"calories"`
}
