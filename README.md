# Sistema de Agendamento de Procedimentos

Desenvolvido por **José Magno**

Este repositório contém o **frontend** de um sistema completo de gerenciamento e agendamento de procedimentos médicos, desenvolvido com **Angular** e integrado a uma API RESTful construída em **Laravel**.

> ⚠️ **Atenção**: Por motivos de privacidade e confidencialidade contratual, o código-fonte do **backend (Laravel)** não está incluído neste repositório.

## 🚀 Tecnologias Utilizadas

### Frontend (Angular)
- Angular 15+
- Angular Material
- TypeScript
- RxJS
- SCSS

### Backend (Laravel) – *Não incluído neste repositório*
- Laravel 10+
- PHP 8+
- MySQL
- API RESTful
- Traits reutilizáveis para respostas padronizadas
- Testes automatizados com PHPUnit

## 📋 Funcionalidades do Frontend

- Autenticação (login/logout)
- CRUD de procedimentos, pacientes, farmácias e medicamentos
- Subformulários integrados (ex: Insegurança Alimentar do Paciente)
- Agendamento com definição de tipo e urgência
- Exportação de relatórios em PDF
- Interface responsiva com Angular Material

## ⚠️ Status do Projeto

O projeto **não está 100% finalizado no frontend**. Algumas funcionalidades foram implementadas apenas na versão utilizada pelo cliente final e não estão presentes neste repositório público. Mesmo assim, este repositório demonstra claramente minha capacidade de:

- Estruturar projetos Angular de forma escalável
- Integrar com APIs RESTful
- Trabalhar com formulários dinâmicos e comunicação assíncrona
- Manter código limpo e bem organizado

## 🧱 Organização do Código

- Componentes reutilizáveis
- Serviços Angular para comunicação com API
- Roteamento estruturado
- Estilização padronizada com SCSS

## ⚙️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- Angular CLI
- Backend com API REST configurada (não incluída neste repositório)

### Instalação

```bash
git clone https://github.com/seu-usuario/sistema-agendamento-procedimentos.git
cd sistema-agendamento-procedimentos
npm install
ng serve
