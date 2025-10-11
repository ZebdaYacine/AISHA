package model

type SuccessResponse struct {
	Message string `json:"message"`
	Data    any    `json:"data"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

type AuthResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	User         any    `json:"user"`
}

type RefreshRequest struct {
	RefreshToken string `json:"refreshToken"`
}

type LogoutRequest struct {
	RefreshToken string `json:"refreshToken"`
}
