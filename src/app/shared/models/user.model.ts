export interface User {
	id: number;
	Nom: string;
  prenom: string;
	password: string|undefined;
	email: string;
	photoProfil: Text;
	role: any;
	createdAt: Date;
	token: string;
	tokenCreatedAt: Date;
}

/*


{
    "status": "ok",
    "message": "Connect\u00e9 !",
    "result": {
        "id": 3,
        "Nom": "Lacoque",
        "email": "mathlacq@gmail.com",
        "photoProfil": "",
        "createdAt": "2026-03-31T21:26:32+00:00",
        "token": "6e99a8807954268dd23d2ccf6386ca6450a3d1c44c1f95ad52f3e917ccfb78c7",
        "tokenCreatedAt": "2026-03-31T21:26:32+00:00",
        "prenom": "Mathys",
        "annonces": [],
        "role": [
            "ROLE_USER"
        ]
    }
}





 */
