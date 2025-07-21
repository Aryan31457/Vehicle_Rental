package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true // Allow all origins in development
		},
	}

	// Clients holds all connected WebSocket clients
	clients = make(map[*websocket.Conn]bool)
	// Mutex to protect clients map
	clientsMutex sync.RWMutex
)

type WSMessage struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

// handleWebSocket upgrades HTTP connection to WebSocket
func HandleWebSocket(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("Error upgrading to websocket: %v\n", err)
		return
	}
	defer ws.Close()

	// Register client
	clientsMutex.Lock()
	clients[ws] = true
	clientsMutex.Unlock()

	// Remove client when function returns
	defer func() {
		clientsMutex.Lock()
		delete(clients, ws)
		clientsMutex.Unlock()
	}()

	// Listen for messages
	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Printf("Error reading message: %v\n", err)
			break
		}

		var message WSMessage
		if err := json.Unmarshal(msg, &message); err != nil {
			log.Printf("Error unmarshaling message: %v\n", err)
			continue
		}

		// Handle different message types
		switch message.Type {
		case "ping":
			ws.WriteJSON(WSMessage{
				Type:    "pong",
				Payload: nil,
			})
		}
	}
}

// BroadcastMessage sends a message to all connected clients
func BroadcastMessage(messageType string, payload interface{}) {
	message := WSMessage{
		Type:    messageType,
		Payload: payload,
	}

	clientsMutex.RLock()
	defer clientsMutex.RUnlock()

	for client := range clients {
		err := client.WriteJSON(message)
		if err != nil {
			log.Printf("Error broadcasting message: %v\n", err)
			client.Close()
			delete(clients, client)
		}
	}
}

// SendMessageToClient sends a message to a specific client
func SendMessageToClient(client *websocket.Conn, messageType string, payload interface{}) error {
	message := WSMessage{
		Type:    messageType,
		Payload: payload,
	}

	return client.WriteJSON(message)
}
