// Test file to validate webhook payload structure
// This can be deleted after testing

const testUserCreatedPayload = {
  "type": "user.created",
  "data": {
    "id": "user_test123",
    "email_addresses": [
      {
        "email_address": "test@example.com",
        "verification": {
          "status": "verified"
        }
      }
    ],
    "first_name": "Test",
    "last_name": "User",
    "username": "testuser",
    "phone_numbers": [
      {
        "phone_number": "+1234567890",
        "verification": {
          "status": "verified"
        }
      }
    ],
    "image_url": "https://example.com/avatar.jpg",
    "profile_image_url": "https://example.com/avatar.jpg",
    "public_metadata": {
      "role": "customer"
    }
  }
};

const testUserUpdatedPayload = {
  "type": "user.updated",
  "data": {
    "id": "user_test123",
    "email_addresses": [
      {
        "email_address": "updated@example.com",
        "verification": {
          "status": "verified"
        }
      }
    ],
    "first_name": "Updated",
    "last_name": "User",
    "public_metadata": {
      "role": "hotel_owner"
    }
  }
};

console.log('Test payloads ready for webhook testing');
