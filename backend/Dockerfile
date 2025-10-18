FROM golang:1.24-alpine AS builder
WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/main.go

FROM gcr.io/distroless/base-debian12 AS runner
WORKDIR /app

COPY --from=builder /src/server ./server

EXPOSE 8080
ENTRYPOINT ["./server"]
