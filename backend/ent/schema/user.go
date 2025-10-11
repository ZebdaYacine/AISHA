package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			Unique(),
		field.String("provider").
			NotEmpty(),
		field.String("provider_id").
			NotEmpty().
			StructTag(`json:"providerId"`),
		field.String("email").
			Optional().
			Nillable(),
		field.String("name").
			Optional().
			Nillable(),
		field.String("picture").
			Optional().
			Nillable(),
		field.String("access_token").
			Optional().
			Nillable().
			Sensitive(),
		field.String("refresh_token").
			Optional().
			Nillable().
			Sensitive(),
		field.String("token_type").
			Optional().
			Nillable(),
		field.Time("expires_at").
			Optional().
			Nillable(),
		field.String("role").
			Default("user"),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}

// Indexes for the User.
func (User) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("provider", "provider_id").Unique(),
	}
}
