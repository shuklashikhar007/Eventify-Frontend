package helpers

import (
	"errors"

	"github.com/golang-jwt/jwt/v5"
	"github.com/shuklashikhar007/Eventify/backend/internal/config"
)

// CreateToken generates a JWT token with the provided claims.
// It uses the secret key from the environment variable JWT_SECRET.
func CreateToken(claims *jwt.MapClaims) (string, error) {
	secret := []byte(config.Env.JWTSecretKey)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, *claims)

	return token.SignedString(secret)
}

// VerifyToken validates a JWT token and returns the claims if valid.
func VerifyToken(tokenString string) (jwt.MapClaims, error) {
	secret := []byte(config.Env.JWTSecretKey)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("could not parse claims as MapClaims")
	}

	return claims, nil
}
