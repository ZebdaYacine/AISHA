package token

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var ErrInvalidToken = errors.New("invalid token")

const (
	tokenTypeAccess  = "access"
	tokenTypeRefresh = "refresh"
)

func createToken(userID, role, secret, tokenType string, ttl time.Duration) (string, error) {
	now := time.Now()
	claims := jwt.MapClaims{
		"id":   userID,
		"role": role,
		"type": tokenType,
		"exp":  now.Add(ttl).Unix(),
		"iat":  now.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func CreateAccessToken(userID, role, secret string, ttl time.Duration) (string, error) {
	return createToken(userID, role, secret, tokenTypeAccess, ttl)
}

func CreateRefreshToken(userID, role, secret string, ttl time.Duration) (string, error) {
	return createToken(userID, role, secret, tokenTypeRefresh, ttl)
}

func Validate(tokenString, secret string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidToken
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, ErrInvalidToken
	}
	return token, nil
}

func ValidateTokenType(tokenString, secret, expectedType string) error {
	value, err := ExtractFieldFromToken(tokenString, secret, "type")
	if err != nil {
		return err
	}
	tokenType, ok := value.(string)
	if !ok || tokenType != expectedType {
		return ErrInvalidToken
	}
	return nil
}

func ExtractFieldFromToken(tokenString, secret, field string) (any, error) {
	token, err := Validate(tokenString, secret)
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if value, exists := claims[field]; exists {
			return value, nil
		}
	}
	return nil, ErrInvalidToken
}
