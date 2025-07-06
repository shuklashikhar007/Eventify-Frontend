package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ---------------------------- Event Model ----------------------------

type Event struct {
	EventID        string         `gorm:"primaryKey" json:"event_id"`
	CreatedAt      time.Time
	UpdatedAt      time.Time

	// Event details
	Title          string         `gorm:"size:200;not null" json:"title" binding:"required,max=200"`
	Description    string         `gorm:"type:text;not null" json:"description" binding:"required,max=1000"`
	Location       string         `gorm:"size:255;not null" json:"location" binding:"required,max=255"`
	EventStartTime time.Time      `gorm:"not null" json:"event_start_time" binding:"required"`
	EventEndTime   time.Time      `gorm:"not null" json:"event_end_time" binding:"required"`

	IsCanceled     bool           `gorm:"default:false" json:"is_canceled"`
	IsRescheduled  bool           `gorm:"default:false" json:"is_rescheduled"`

	// All updates linked to this event
	EventUpdaters  []EventUpdater `gorm:"foreignKey:RefEventID;constraint:OnDelete:CASCADE" json:"event_updaters" binding:"dive"`

	// // Ownership
	CreatedByID    string         `gorm:"not null;index" json:"created_by_id"`
	CreatedBy      User           `gorm:"foreignKey:CreatedByID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"created_by" binding:"-"`
}

// Generate UUID for EventID
func (e *Event) BeforeCreate(tx *gorm.DB) (err error) {
	if e.EventID == "" {
		e.EventID           = uuid.New().String()
	}
	return
}

// ---------------------------- Event Updater Model ----------------------------

type EventUpdater struct {
	EventUpdaterID   string    `gorm:"primaryKey" json:"event_updater_id"`

	// Reference to the event being updated
	RefEventID       string    `gorm:"not null;index" json:"ref_event_id"`

	// Details of who updated the event, and when
	UpdatedByID      string    `gorm:"not null;index" json:"updated_by_id"`
	UpdatedBy        User      `gorm:"foreignKey:UpdatedByID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"updated_by"`
	UpdatedAt        time.Time
}

// Generate UUID for EventUpdaterID
func (u *EventUpdater) BeforeCreate(tx *gorm.DB) (err error) {
	if u.EventUpdaterID == "" {
		u.EventUpdaterID    = uuid.New().String()
	}
	return
}