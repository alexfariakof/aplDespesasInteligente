using backend.Model;
using backend.Model.Context;
using backend.Data.VO;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Net.Mail;

namespace backend.Repositorio.Implementations
{
    public class ControleAcessoRepositorioImpl : IControleAcessoRepositorio
    {
        private readonly SqlServerContext _context;

        public ControleAcessoRepositorioImpl(SqlServerContext context)
        {
            _context = context;
        }

        public bool Create(ControleAcessoVO controleAcessoVO)
        {
            DbSet<Usuario> dsUsuario = null;

            using (_context)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        dsUsuario = _context.Set<Usuario>();
                        Usuario usuario = new Usuario
                        {
                            Nome = controleAcessoVO.Nome,
                            SobreNome = controleAcessoVO.SobreNome,
                            Email = controleAcessoVO.Email,
                            Telefone = controleAcessoVO.Telefone
                        };
                        dsUsuario.Add(usuario);

                        _context.SaveChanges();

                        string sql = "INSERT INTO[dbo].[ControleAcesso] ([login], [senha], [idUsuario]) VALUES (@login, @senha, @idUsuario)";
                        _context.Database.ExecuteSqlRaw(sql, new SqlParameter("@login", usuario.Email), new SqlParameter("@senha", controleAcessoVO.Senha), new SqlParameter("@idUsuario", usuario.Id.Value));

                        dbContextTransaction.Commit();
                        return true;
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                    }
                }

            }
            return false;
        }

        public ControleAcesso FindByEmail(ControleAcesso controleAcesso)
        {
            return _context.ControleAcesso.SingleOrDefault(prop => prop.Login.Equals(controleAcesso.Login));
        }

        public Usuario GetUsuarioByEmail(string login)
        {
            return _context.Usuario.SingleOrDefault(prop => prop.Email.Equals(login));
        }

        public bool RecoveryPassword(string email)
        {
            Usuario usuario = GetUsuarioByEmail(email);
            if (usuario == null)
                return false;

            using (_context)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {

                        string sql = "UPDATE ControleAcesso SET senha = @senha WHERE login = @login";

                        var senhaNova = Guid.NewGuid().ToString().Substring(0,8);

                        _context.Database.ExecuteSqlRaw(sql, new SqlParameter("@senha", senhaNova), new SqlParameter("@login", usuario.Email));

                        EnviarEmail(usuario, "<b>Nova senha:</b>" + senhaNova);
                        
                        dbContextTransaction.Commit();
                        return true;
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                    }
                }
            }
            return false;
        }

        private void EnviarEmail(Usuario usuario, String message)
        {
            System.Net.Mail.SmtpClient client = new SmtpClient();
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.Credentials = new System.Net.NetworkCredential("appdespesaspessoais@gmail.com", "roottoor");
            MailMessage mail = new MailMessage();
            mail.Sender = new System.Net.Mail.MailAddress("appdespesaspessoais@gmail.com", "App Despesas Pessoais");
            mail.From = new MailAddress("appdespesaspessoais@gmail.com", "App Despesas Pessoais");
            mail.To.Add(new MailAddress(usuario.Email, usuario.Nome + " " + usuario.SobreNome));
            mail.Subject = "Contato";
            mail.Body = " Mensagem do site:<br/> Prezado(a)   " + usuario.Nome + " " + usuario.SobreNome + "<br/>Segue dados para acesso a conta cadastrada.<br><b>E-mail:</b> " + usuario.Email + " <br/> " + message;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;
            try
            {
                //client.Send(mail);
            }
            catch (Exception erro)
            {
                throw erro;
            }
            finally
            {
                mail = null;
            }
        }
    }
}
