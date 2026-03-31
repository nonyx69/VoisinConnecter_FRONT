export interface User {
	id: number;
	Nom: string;
	password: string;
	email: string;
	photoProfil: Text;
	role: string;
	createdAt: Date;
	token: string;
	tokenCreatedAt: Date;
}