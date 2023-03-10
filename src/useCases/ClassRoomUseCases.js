import { AxiosApi } from "../services/RequisitionAPI";
import { ClassRoom } from "../entities/ClassRoom";

export class ClassRoomUseCases {
    static async CreateClassRoom(classRoom, year, students, teacher) {
        teacher.turma = parseInt(classRoom)
        if (teacher.turma == null) {
            teacher.turma = false
        }
        for (let index = 0; index < students.length; index++) {
            classRoom == false ? students[index.turma] = false : students[index].turma = parseInt(classRoom)
        }
        const newClass = new ClassRoom(parseInt(classRoom), teacher, parseInt(year), students)
        const connection = await AxiosApi.Post('/turmas', newClass)
        return connection.status == 201 ? "200" : "Erro interno, tente novamente mais tarde.(error code: 13L CRUC)"
    }

    static async EditStudent(classRoom, students) {
        for (let index = 0; index < students.length; index++) {
            const element = students[index];
            classRoom == false ? element.turma = false : element.turma = parseInt(classRoom)
            const data = await AxiosApi.Put(`/alunos/${element.id}`, element)
            if (data.status == 200) {
                continue
            } else {
                return "Erro interno, tente novamente mais tarde.(error code: 16L CRUC)"
            }
        }
        return "200"
    }

    static async EditTeacher(classRoom, teacher) {
        classRoom == false ? teacher.turma = false : teacher.turma = parseInt(classRoom)

        const data = await AxiosApi.Put(`/professores/${teacher.id}`, teacher)
        return data.status == 200 ? "200" : "Erro interno, tenve novamente mais tarde.(error code: L25 CRUC)"
    }

    static async DeleteClassRoom(id, teacher, students) {
        const updateTeacher = await this.EditTeacher(false, teacher)
        if (updateTeacher == '200') {
            const updateStudents = await this.EditStudent(false, students)
            if (updateStudents == '200') {
                const deleteInfos = await AxiosApi.Delete(id)
                return deleteInfos.status == 200 ? 'Cadastro Excluído' : 'Erro interno, tente novamente mais tarde.(error code: 33L CRUC)'
            } else {
                return 'Erro interno, tente novamente mais tarde.(error code: 33L CRUC)'
            }
        } else {
            return 'Erro interno, tente novamente mais tarde.(error code: 33L CRUC)'
        }
    }
    static async UpdateClassRoom(id, classRoom, year, students, teacher) {

        // 1- modificar na rota professor
        if (teacher.update) {
            await this.EditTeacher(false, teacher.prevTeacher)
            await this.EditTeacher(classRoom, teacher.selectedTeacher)
        }
        // 2- modificar alunos
        if (students.update) {
            if (students.newStudent.length != 0) {
                await this.EditStudent(classRoom, students.newStudent)
            }
            if (students.removedStudent.length != 0) {
                await this.EditStudent(false, students.removedStudent)
            }
        }
        // 3 - update
        const newUpdate = new ClassRoom(classRoom, teacher.selectedTeacher, year, students.studentList)
        await AxiosApi.Put(id, newUpdate)
        return true
    }
}