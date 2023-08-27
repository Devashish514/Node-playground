# 🌍Inter-Planetary Communication🪐

The project aims to establish communication between Earth and Mars by translating messages between plain English and encoded Nokia mobile keypad digits. Earth's messages are converted into numeric series for Mars, and Mars' messages are decoded into English for Earth. This innovative approach bridges the gap between the two worlds, enabling seamless communication across distant planets.


## API Reference

#### Send message

```http
  POST /api/earth-mars-comm/message
```

#### Request Body
```json
{
    "message":"Hello Mars"
}
```

#### Response Body
```json
{
    "data": "4433555.555666062777.7777",
    "Response from Earth": "4433555.555666062777.7777",
    "Nokia Translation": "HELLO MARS"
}
```

### Tech Stack

**Backend:** NodeJS, Express, TypesScript

**Database:** Redis



## Acknowledgements

I would like to express my heartfelt gratitude to ```ifelsecloud``` for providing me with the opportunity to work on this fascinating project.


## Authors

- [@Devashish](https://www.github.com/Devashish514)

