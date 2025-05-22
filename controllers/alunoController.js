const Aluno = require('../models/alunoModel');

exports.index = async (req, res) => {
  const alunos = await Aluno.findAll();
  res.render('alunos/index', { alunos });
};

exports.store = async (req, res) => {
  await Aluno.create(req.body);
  res.redirect('/alunos');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Aluno.update(id, req.body);
  res.redirect('/alunos');
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Aluno.delete(id);
  res.redirect('/alunos');
};

// ...existing code...
exports.index = async (req, res) => {
  // MOCK: Dados fictícios para visualização
  const alunos = [
    { id: 1, nome: 'Aluno Exemplo', email: 'aluno@exemplo.com' },
    { id: 2, nome: 'Maria Teste', email: 'maria@teste.com' }
  ];
  res.render('alunos/index', {alunos });
};
// ...existing code...