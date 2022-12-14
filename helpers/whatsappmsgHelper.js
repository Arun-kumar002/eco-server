const fetch = require("node-fetch-commonjs");

const sendMsg = async (phoneNumber) => {
  let token =
    "EAAGwF0uIWzoBACysFwSEPRbDZBM8c76FVft9yxTx7DlKZCkp5ZAPfjmzM5qIZAkgWtD3njH9269WftxKtbXp2kLAn5J3lZAfdrb8cRweRbmMX4Js5m9tejZBEo5ZBfbDHBEx6c1WZCB0J42hDy2DTsACRvVUnPxyZAlR5Du07drabtJZBVcxVYK18YEraHai3iFZCVqSY4ZBfijxfwZDZD";
let phoneid='100940959539798'
  let user = `https://graph.facebook.com/v13.0/${phoneid}/messages`;
  let headers = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "template",
      template: {
        name: "downtime",
        language: {
          code: "en",
        },
        //comp
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: Date.now(),
              },
            ],
          },
        ],
      },
    }),
  };

  let send=await fetch(user, headers);
  console.log(send);
};
// sendMsg('8610159926')
// module.exports = { sendMsg };
