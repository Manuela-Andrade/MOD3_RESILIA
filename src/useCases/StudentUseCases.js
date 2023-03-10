import { AxiosApi } from "../services/RequisitionAPI";
import { Student } from "../entities/Student";
import { registrationGenerator } from "../services/RegistrationGen"
export class StudentUseCases {

    static async StudentRegistration() {
        const registration = await registrationGenerator()
        const connection = await AxiosApi.Get(`/alunos?matricula=${registration}`)
        return connection.status == 200 ? connection.data.length != 0 ? this.StudentRegistration() : registration : "Falha Interna, tente novamente. (error code: 9L SUC)"

    }
    static async CreateStudent(fullName, cpf, birthday, registration) {
        const student = new Student(fullName, cpf, birthday, registration)
        const connection = await AxiosApi.Post('/alunos', student)
        return connection.status == 201 ? "Aluno Criado com sucesso!" : "Erro interno, Tente novamente mais tarde.(error code: 15L SUC)"
    }
    static async DeleteStudent(id) {
        const connection = await AxiosApi.Get(id)
        if (connection.data.turma) {
            const classRoom = await AxiosApi.Get(`/turmas?turma=${connection.data.turma}`)
            const updateClassRoom = classRoom.data['0']
            let index = updateClassRoom.alunos.findIndex(aluno => aluno.id === connection.data.id);

            if (index !== -1) {
                updateClassRoom.alunos.splice(index, 1);
            }
            await AxiosApi.Put(`/turmas/${classRoom.data['0'].id}`, updateClassRoom)
        }
        const deleteInfos = await AxiosApi.Delete(id)
        return deleteInfos.status == 200 ? 'Cadastro Excluído' : 'Erro interno, tente novamente mais tarde.(error code: 19L SUC)'
    }
    static async EditStudent(id, student) {
        student.id = id
        if (student.turma) {
            const connection = await AxiosApi.Get(`/turmas/?turma=${student.turma}`)
            const updateClassRoom = connection.data['0']
            updateClassRoom.alunos.forEach((aluno, index) => {
                if (aluno.id === id) {
                    updateClassRoom.alunos[index] = student;
                }
            });
            await AxiosApi.Put(`/turmas/${updateClassRoom.id}`, updateClassRoom)
        }
        const update = await AxiosApi.Put(`/alunos/${id}`, student)
        return update.status == 200 ? "200" : "Erro interno, tente novamente mais tarde.(error code: 34L SUC)"
    }
}