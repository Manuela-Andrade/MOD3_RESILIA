import { Teacher } from "../entities/Teacher"
import {AxiosApi} from "../services/RequisitionAPI"

export class TeacherUseCases {
    static async CreateTeacher(fullName, cpf, matter) {
        const teacher = new Teacher(fullName, cpf, matter)
        const connection = await AxiosApi.Post('/professores', teacher)
        return connection.status == 201 ? "Professor criado com sucesso!" : "Erro interno, Tente novamente mais tarde.(error code: 8L TUC)"
    }
    static async DeleteTeacher(id){
        const connection = await AxiosApi.Get(id)
        if (connection.data.turma) {
            return "Não é possível excluir um professor cadastrado em uma turma, remova o professor da turma antes de deletar o cadastro."
        }
        const deleteInfos = await AxiosApi.Delete(id)
       return deleteInfos.status == 200 ? 'Cadastro Excluído' :'Erro interno, tente novamente mais tarde.(error code: 12L TUC)'
    }
    static async EditTeacher(id, teacher) {
        teacher.id = id
        if(teacher.turma) {
            const connection = await AxiosApi.Get(`/turmas/?turma=${teacher.turma}`)
            const updateClassRoom = connection.data['0']
            updateClassRoom.professor = teacher
            await AxiosApi.Put(`/turmas/${updateClassRoom.id}`, updateClassRoom)
        }
        const update = await AxiosApi.Put(`/professores/${id}`, teacher)
        return update.status == 200 ? "200" : "Erro interno, tente novamente mais tarde.(error code: 34L SUC)"
    }
}
