package utils

import (
	"fmt"
	"time"
)

func TimeToYear(stringTime string) time.Time {
	//Just year - month - date
	t, err := time.Parse("2006-01-02", stringTime)
	if err != nil {
		fmt.Println("Error parsing time:", err)
		return time.Time{}
	}
	return t
}
