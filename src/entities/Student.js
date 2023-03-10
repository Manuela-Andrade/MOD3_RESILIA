export class Student {
    constructor(fullName, cpf, birthday, registration, turma){
        this.nome = fullName;
        this.cpf = cpf;
        this.dataNascimento = birthday;
        this.matricula = registration;
        this.turma = turma || false
    }
}