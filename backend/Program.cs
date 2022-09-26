using backend.Business.Generic;
using backend.Business.Implementations;
using backend.Business;
using backend.Model.Context;
using backend.Repositorio.Generic;
using backend.Repositorio.Implementations;
using backend.Repositorio;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connection = builder.Configuration["SqlServerConnection:SqlServerConnectionString"];
builder.Services.AddDbContext<SqlServerContext>(options => options.UseSqlServer(connection));

// Injeção de Dependencia 
//services.AddScoped<ICategoriaBusiness, CategoriaBusinessImpl>();
//services.AddScoped<IUsuarioBusiness, UsuarioBusinessImpl>();
builder.Services.AddScoped(typeof(IBusiness<>), typeof(GenericBusiness<>));
//builder.Services.AddScoped<IControleAcessoBusiness, ControleAcessoBusinessImpl>();
builder.Services.AddScoped<ILancamentoBusiness, LancamentoBusinessImpl>();
builder.Services.AddScoped<IRelatorioBusiness, RelatorioBusinessImpl>();
builder.Services.AddScoped<IFileBusiness, FileBusinessImpl>();

//services.AddScoped<IUsuarioRepositorio, UsuarioRepositorioImpl>();
builder.Services.AddScoped<IControleAcessoRepositorio, ControleAcessoRepositorioImpl>();
builder.Services.AddScoped<ILancamentoRepositorio, LancamentoRepositorioImpl>();
builder.Services.AddScoped<IRelatorioRepositorio, RelatorioRepositorioImpl>();

builder.Services.AddScoped(typeof(IRepositorio<>), typeof(GenericRepositorio<>));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
