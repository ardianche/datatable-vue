var character_codes = [ 104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115 ]

var string = "";

character_codes.forEach(character => {
  string += String.fromCharCode(character);
});

console.log(string);

let Fernet = require('fernet')
let secret_code = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcKjNBR25GRdHnV0oIGNJJ6M2Vk3pSYKLUWIh8a6Hsgs9xwKOFD6XjTIc5HAJov1yk5gVJPPXeMEB5PeNOeRitm9LnVTkO4YxME05r_g4tHRDXmcGleiiGuA1HSqHDR2tsxXM9ukTOUjLTPyR4Ofklx12EE9T-MMVcVSByLwJHZxp4I6fls_wOD69oGpTWdo5NqOXM'
let token = new Fernet.Token({secret: secret_code, token: message, ttl:0})
token.decode();