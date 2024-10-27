# 📞 2FA Verification Server for Yemot Hamashiach

Welcome to the **2FA Verification Server**! This server is designed to work with **Yemot Hamashiach's** telephony systems for seamless phone-based 2FA verification. Just a few simple steps, and your telephony system will be ready to verify codes without storing any sensitive data. 

## 🚀 How It Works

This server is a minimalist solution for verifying **Time-based One-Time Passwords (TOTP)** using your custom secret codes. It only receives the 2FA code, validates it, and responds with a success message — all while keeping things secure and anonymous. Nothing is stored, no user information is required, and the server discards the code once verification is complete. 

## 🛠️ Setting Up on Yemot Hamashiach

1. **Create a new extension** in your telephony system's configuration.
2. Edit the `ext.ini` file for this extension with the following settings:

   ```ini
   type=api
   api_link=https://my-2fa-server.onrender.com/api/2fa
   api_url_post=yes
   api_hangup_send=no
   api_add_0=secret={{secret_code}} 
   api_call_id_send=no
   api_phone_send=no
   api_did_send=no
   api_extension_send=no
   api_enter_id_send=no
   api_enter_id_name_send=no
   api_time_send=no
   ```

   Replace `{{secret_code}}` with your unique 2FA secret code. 

3. That's it! Now your telephony system will send the code to the server, and receive a validation response without any additional data being shared. Simple and secure. 

## 🔒 Why It’s Secure

- **No Sensitive Data**: The server only accepts the 2FA code for validation. No phone numbers, IDs, or other personal data is processed or stored.
- **Stateless**: Each request is independent and doesn't rely on any prior data. The server validates the code and forgets about it.
- **Privacy by Design**: The server doesn't keep logs or connect the code to any user. It simply verifies the code and responds with the result.

## 🌐 API URL

The server endpoint is:

```
POST https://my-2fa-server.onrender.com/api/2fa
```

### Request Body

The request should contain the following JSON structure:

```json
{
  "secret": "YOUR_2FA_SECRET"
}
```

Replace `"YOUR_2FA_SECRET"` with your 2FA code secret, and `"YOUR_API_KEY"` with your API key if your server uses one for extra security.

### Response

If successful, you'll receive a response with the following format:

```json
{
  "id_list_message": "t-הקוד הוא!.d-123456"
}
```

> **Note**: Replace `123456` with the actual generated 2FA code.

---

Happy authenticating! 😎

<sub><sup>⚙️ This content was generated with the assistance of Gen AI.</sup></sub>