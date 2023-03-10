export class Teacher {
    constructor(fullName, cpf, register, turma) {
        this.nome = fullName;
        this.cpf = cpf;
        this.registro = register
        this.turma = turma || false
    }
}



