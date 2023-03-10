export class ClassRoom {
    constructor(ClassRoom, teacher, year, students){
        this.turma = ClassRoom;
        this.professor = teacher;
        this.serie = year;
        this.alunos = students || [];
    }
}