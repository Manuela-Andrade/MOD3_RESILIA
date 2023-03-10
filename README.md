# Projeto em grupo do Módulo 3 - AGAPT
### Integrantes do SQUAD
- <a href="https://github.com/DevPhde">Diego Baumbach</a> - Pessoa Gestora do Conhecimento
- <a href="https://github.com/isabelaalvesc">Isabela Alves</a> - Pessoa Gestora de Gente e Engajamento
- <a href="https://github.com/gabirc26">Gabriela Rocha</a> - Pessoa Co-Facilitadora
- <a href="https://github.com/Igorzpqd">Igor de Sousa</a> - Colaborador I
- <a href="https://github.com/igorgonzalez96">Igor Gonzalez</a> - Colaborador II
##
### Proposta
- Criar um site utilizando o json.server. O projeto deverá ser construído usando o framework React aprendido em aula, nele iremos desenvolver um site que deverá utilizar um servidor Json construído anteriormente. Este projeto deverá seguir um tema dos utilizados pelos integrantes no projeto individual.
##
### Requisitos
- ✅ Utilize endpoints do Json-server que foi criado no Projeto individual.
- ✅ Utilizar o /README do repositório para documentação do projeto;
- ✅ Utilizar a biblioteca react-router-dom para roteamento das páginas;
- O site deve realizar todos os métodos HTTP:
- ✅ GET - Página para listar os cadastros ou produtos com opção de busca;
- ✅ POST - Página para incluir um novo registro ou produto;
- ✅ PUT - Página para editar os cadastros ou produtos;
- ✅ DELETE - Opção de excluir itens cadastrados.
##
### Introdução ao projeto
- Nosso projeto simula o sistema de gerenciamento de uma escola onde é possível cadastrar alunos, professores e turmas. Também é possível editar o cadastro de cada um deles e excluir o cadastro.
- Escolhemos a API produzida pela Isabela com o tema "Escola"
> Disponível no repositório: [/isabelaalvesc/escola](https://github.com/isabelaalvesc/Escola.git)
- Para o projeto utilizamos uma versão adaptada da API com o mesmo tema.
> Disponível no repositório: [/DEVPhde/Escola](https://github.com/DevPhde/Escola.git)<br>
> O deploy no Render:  [/escola-4888.onrender.com](https://escola-4888.onrender.com)
- A API conta com três rotas/endpoints:
> [/Turma](https://github.com/DevPhde/Escola/blob/DEV/src/routes/NewClass.jsx)<br>
> [/Alunos](https://github.com/DevPhde/Escola/blob/DEV/src/routes/NewStudent.jsx)<br>
> [/Professores](https://github.com/DevPhde/Escola/blob/DEV/src/routes/NewTeacher.jsx)
- Cada rota conta com três entidades pré definidas e cada uma delas conta com cinco atributos (com excessão da rota aluno, que tem seis atributos).

<img src="/README/Fluxograma.jpeg">

> Aluno
> {<br>
    id: '',
    name: "",
    birthday: "",
    cpf: "",
    registration: "",
    classRoom: ""
   }

> Professor
> {<br>
    id: "",
    name: "",
    cpf: "",
    registration: "",
    classRoom: ""
    }

> Turma
> {<br>
    id: "",
    ClassRoom: "",
    Teacher: "",
    Students: "",
    Serie: ""
    }

##
### Executando o projeto
- O projeto recebeu deploy em Vercel e pode ser executado online acessado através do link <https://agapt.vercel.app/>
- O projeto também pode ser executado em servidor local, baixando uma cópia dos arquivos no repositório acessando o link <https://github.com/DevPhde/Escola>
- Após o download e a inicialização, será necessário utilizar os comandos a seguir no terminal.
>npm install<br>
>npm run dev
- O servidor local será iniciado no navegador.
##
# AGPT
### Home:
<img src="/README/home.jpeg">
<img src="/README/home2.jpeg">
<i>A Home conta com a barra de navegação com ancoragem para as demais rotas. Possui espaço para logo. Além disso conta com um menu de cadastro, onde é possível visualizar os alunos, professores, um painel para visualização da lista de alunos, professores ou turmas com suas respectivas informações e um botão de busca por nome.</i><br><br>

### Cadastros: 
<img src="/README/cadastros.jpeg"><br>

### Cadastro de Aluno: 
<img src="/README/cadastroaluno.jpeg"><br>
<i>Ao clicar no botão cadastrar do card Aluno, uma página com um formulário é aberta. O usuário deve preencher os dados como indicado. Em caso de sucesso, poderá clicar em cadastrar e concluir a operação. Caso contrário, o sistema irá indicar os campos que precisam ser digitados e/ou corrigidos. O botão Gerar Matrícula gera um código único para este aluno.
</i><br><br>

### Cadastro de Professor: 
<img src="/README/cadastroprofessor.jpeg"><br>
<i>Ao clicar no botão cadastrar do card Professor, uma página com um formulário é aberta. O usuário deve preencher os dados como indicado. Em caso de sucesso, poderá clicar em cadastrar e concluir a operação. Caso contrário, o sistema irá indicar os campos que precisam ser digitados e/ou corrigidos.</i><br><br>

### Cadastro de Turma: 
<img src="/README/cadastroturma.jpeg"><br>
<i>Ao clicar no botão cadastrar do card Professor, uma página com um formulário é aberta. Após preencher o número da turma e a série e clicar em prosseguir, abre um novo campo para informar o professor desta turma.</i><br><br>
<img src="/README/cadastroturma2.jpeg"><br>
<i>Ao inserir o professor desta turma e prosseguir, aparecem duas listagens: Lista de alunos, que se refere aos alunos disponíveis para cadastrar nesta turma; e Alunos selecionados, mostrando os alunos que já foram alocados à turma. Ao clicar no ícone com o símbolo +, um aluno é adicionando na turma. </i><br><br>

### Rotas:
<img src="/README/informacoesturma.jpeg"><br>
<i>As informações são exibidas em uma página. Sempre com um botão de voltar, que redireciona para a página anterior.</i><br><br>
<i>Há uma pequena animação que é exibida enquanto as informações estão sendo requisitadas para serem exibidas para o usuário.</i><br><br>
<img src="/README/carregando.jpeg"><br>
<i></i><br><br>

### Editar:
<img src="/README/informacoesaluno.jpeg"><br>
<i>Na página de informações, as informações são exibidas em coluna para diferenciar do menu anterior. Abaixo ficam os botões: um para abrir o menu de edição e o outro botão de Deletar Cadastro.</i><br><br>
<img src="/README/edicaoaluno.jpeg"><br>
<i>Ao clicar no botão editar, uma página é aberta com um formulário já preenchido com as informações atuais. O usuário deve selecionar a informação que deseja editar e ao final deve clicar no botão de confirmação. Se houver erro, o formulário informa ao usuário o que deve ser corrigido. Em caso de sucesso, o usuário é redirecionado para a página de visualização.</i><br><br>

### Deletar Cadastro
<img src="/README/informacoesprofessor.jpeg"><br>
<i>Ao clicar no botão Deletar Cadastro, uma página é aberta com um alerta informando que a exclusão de um cadastro é ireversível e questionado se o usuário deseja mesmo continuar a exclusão ou se deseja cancelar a operação.</i><br><br>
<img src="/README/excluir.jpeg"><br>
