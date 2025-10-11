package feature

type User struct {
	ID           string `json:"id"`
	Provider     string `json:"provider"`
	ProviderID   string `json:"providerId"`
	Email        string `json:"email"`
	Name         string `json:"name"`
	Picture      string `json:"picture"`
	AccessToken  string `json:"-"`
	RefreshToken string `json:"-"`
	TokenType    string `json:"tokenType"`
	ExpiresAt    int64  `json:"expiresAt"`
	Role         string `json:"role"`
}
