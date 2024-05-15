package utils

import (
	"crypto/rand"
	"encoding/base64"
)

func GenerateState() string {
	// Generate 16 bytes of random data
	data := make([]byte, 16)
	_, err := rand.Read(data)
	if err != nil {
		// Handle error
	}

	// Encode the random data as a base64 URL-safe string
	state := base64.URLEncoding.EncodeToString(data)

	return state
}
