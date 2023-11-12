export interface customerData {
    "name": string,
    "cpf": number,
    "rg": string,
    "birth": Date,
    "email": string,
    "places": string,
    "tripDates": string,
    "dependents": [
      {
        "name": string,
        "description": string,
        "rg": string,
        "cpf": number
      }
    ],
    "phone": [
      {
        "whats": string,
        "personal": string
      }
    ]
  }